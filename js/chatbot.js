/* =====================================================================
   AsheTag — CHAT ASSISTANT (rule-based, front-end only)
   ---------------------------------------------------------------------
   A fully functional support/sales assistant that:
     • injects its own UI (launcher + panel) on every page — no page markup
     • is MODE-AWARE: answers about web design in Studio mode and about AI
       automation in AI mode, and re-skins to match (via css/chatbot.css)
     • answers from the site's real services / pricing / FAQ / process
       content, with quick-reply chips
     • hands off to WhatsApp (+60 17-981 2010) with a pre-filled message

   UPGRADE PATH → Claude-powered bot:
     Replace the body of `resolve()` with a call to your own serverless
     endpoint, e.g.
        const r = await fetch('/api/chat', {method:'POST',
          body: JSON.stringify({message, mode, history})});
        return await r.json();   // { html, chips?, cta? }
     The UI, theming and hand-off stay exactly as they are.
   ===================================================================== */
(function () {
  'use strict';

  var WA_NUMBER = '60179812010';
  var WA_TEXT = {
    current: "Hi AsheTag, I'd like a free consultation about my website.",
    ai: "Hi AsheTag AI, I'd like to talk about automating my business."
  };
  function waLink(mode) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_TEXT[mode] || WA_TEXT.current);
  }
  function mode() {
    return document.documentElement.getAttribute('data-mode') === 'ai' ? 'ai' : 'current';
  }

  /* ---------------- Knowledge base (per mode) ---------------- */
  var CONTACT_CHIP = { t: 'Talk to a human', q: '__human__' };

  var KB = {
    current: {
      name: 'AsheTag Assistant',
      icon: 'fa-solid fa-comment-dots',
      greeting: "Hi! 👋 I'm the AsheTag assistant. I can help with our web design services, pricing, timelines and getting in touch. What would you like to know?",
      starters: [
        { t: 'Our services', q: 'What services do you offer?' },
        { t: 'Pricing', q: 'How much does a website cost?' },
        { t: 'How long does it take?', q: 'How long does it take to build a website?' },
        CONTACT_CHIP
      ],
      intents: [
        { id: 'services', kw: ['service', 'services', 'what do you do', 'what do you offer', 'offer', 'help with'],
          a: "We focus on three things:<ul><li><strong>Website Design</strong> — custom WordPress sites built with Elementor</li><li><strong>Website Redesign</strong> — modernise an outdated website</li><li><strong>Website Maintenance</strong> — keep your site secure &amp; updated</li></ul>Want details on any one?",
          chips: [{ t: 'Website Design', q: 'Tell me about website design' }, { t: 'Redesign', q: 'Tell me about website redesign' }, { t: 'Maintenance', q: 'Tell me about website maintenance' }, { t: 'Pricing', q: 'How much does it cost?' }] },
        { id: 'design', kw: ['website design', 'new website', 'build a website', 'build me', 'custom design', 'design a site', 'landing page'],
          a: "<strong>Website Design</strong> — we build custom WordPress websites with Elementor: modern, mobile-responsive, fast, and structured for basic SEO from day one, so visitors turn into customers. <a href='services.html#website-design'>See the details →</a>",
          chips: [{ t: 'Pricing', q: 'How much does a website cost?' }, CONTACT_CHIP] },
        { id: 'redesign', kw: ['redesign', 'revamp', 'outdated', 'refresh', 'modernise', 'modernize', 'update my site', 'old website'],
          a: "<strong>Website Redesign</strong> — we modernise outdated sites for better performance, cleaner UI/UX and a mobile-first rebuild, while keeping the content worth carrying over. <a href='services.html#website-redesign'>See the details →</a>",
          chips: [{ t: 'Pricing', q: 'How much does it cost?' }, CONTACT_CHIP] },
        { id: 'maintenance', kw: ['maintenance', 'maintain', 'ongoing support', 'keep updated', 'security updates', 'care plan'],
          a: "<strong>Website Maintenance</strong> — ongoing WordPress updates, security monitoring, performance tune-ups and small-change support, so you can focus on your business. <a href='services.html#website-maintenance'>See the details →</a>",
          chips: [CONTACT_CHIP] },
        { id: 'pricing', kw: ['price', 'pricing', 'cost', 'how much', 'package', 'packages', 'budget', 'rate', 'fee', 'quote', 'rm'],
          a: "Our three packages:<ul><li><strong>Launch</strong> — RM1,200–1,800 · 3–5 days · up to 3 pages</li><li><strong>Growth</strong> — RM2,000–3,500 · 5–10 days · up to 8 pages <em>(most popular)</em></li><li><strong>Authority</strong> — RM4,000–8,000+ · 10–21 days · up to 15 pages</li></ul>Full breakdown on the <a href='pricing.html'>pricing page</a>.",
          chips: [{ t: "What's in Growth?", q: 'What is included in the Growth package?' }, { t: 'Book a consultation', q: '__human__' }] },
        { id: 'launch', kw: ['launch package', 'cheapest', 'starter', 'basic package', 'in launch'],
          a: "<strong>Launch — RM1,200–1,800.</strong> Up to 3 pages, WordPress + Elementor Pro, mobile responsive, contact form, WhatsApp integration, basic on-page SEO, 2 revision rounds, delivered in 3–5 days.", chips: [{ t: 'Pricing', q: 'pricing' }, CONTACT_CHIP] },
        { id: 'growth', kw: ['growth package', 'in growth', 'most popular', 'mid package'],
          a: "<strong>Growth — RM2,000–3,500.</strong> Up to 8 pages, blog + social integration, advanced speed optimisation, semi-custom design, homepage copywriting help, 3 revision rounds, delivered in 5–10 days.", chips: [{ t: 'Pricing', q: 'pricing' }, CONTACT_CHIP] },
        { id: 'authority', kw: ['authority package', 'premium', 'in authority', 'top package', 'biggest package'],
          a: "<strong>Authority — RM4,000–8,000+.</strong> Up to 15 pages, fully custom design, premium speed optimisation, multi-page copywriting, unlimited revisions (30 days), 60 days support, delivered in 10–21 days.", chips: [{ t: 'Pricing', q: 'pricing' }, CONTACT_CHIP] },
        { id: 'timeline', kw: ['how long', 'timeline', 'turnaround', 'deliver', 'how fast', 'when will', 'how many days', 'time to build', 'ready'],
          a: "Most projects take <strong>3–21 days</strong> depending on the package — Launch 3–5 days, Growth 5–10 days, Authority 10–21 days.", chips: [{ t: 'Pricing', q: 'pricing' }, CONTACT_CHIP] },
        { id: 'process', kw: ['process', 'how do you work', 'steps', 'how does it work', 'what happens', 'get started', 'workflow'],
          a: "Every project follows four simple steps:<ul><li><strong>Discover</strong> — we learn your business &amp; goals</li><li><strong>Design</strong> — a conversion-focused layout in Elementor</li><li><strong>Build</strong> — responsive, fast, SEO-ready</li><li><strong>Launch &amp; Support</strong> — test, go live, and support you after</li></ul>", chips: [CONTACT_CHIP] },
        { id: 'tech', kw: ['wordpress', 'elementor', 'platform', 'cms', 'technology', 'built on', 'tech stack', 'framework'],
          a: "We build on <strong>WordPress with Elementor</strong> — it powers 40%+ of the web, so your site is easy to manage yourself, well-supported, and never locked to a single agency.", chips: [CONTACT_CHIP] },
        { id: 'mobile', kw: ['mobile', 'responsive', 'phone', 'tablet', 'devices'],
          a: "Yes — every site we build is fully responsive and tested across phones, tablets and desktops before launch.", chips: [CONTACT_CHIP] },
        { id: 'seo', kw: ['seo', 'rank', 'google', 'search engine', 'get found', 'keywords'],
          a: "Basic on-page SEO is built in from day one — clean structure, titles, meta and a fast, search-friendly foundation to help people find you.", chips: [CONTACT_CHIP] },
        { id: 'hosting', kw: ['hosting', 'host', 'domain', 'server'],
          a: "Hosting isn't included in our packages, but we're happy to recommend reliable providers and help you get set up.", chips: [CONTACT_CHIP] },
        { id: 'areas', kw: ['where', 'location', 'based', 'malaysia', 'kuala lumpur', 'penang', 'johor', 'worldwide', 'remote', 'country', 'international', 'overseas'],
          a: "We're based in Malaysia and work with clients across every state — and worldwide. Everything runs over WhatsApp and email, so location never gets in the way.", chips: [CONTACT_CHIP] },
        { id: 'portfolio', kw: ['portfolio', 'examples', 'samples', 'previous work', 'past work', 'case study', 'projects'],
          a: "You can see recent projects on the <a href='index.html#work'>home page</a> — we've built for retail &amp; e-commerce, professional services, hospitality and corporate clients.", chips: [CONTACT_CHIP] }
      ]
    },

    ai: {
      name: 'AsheTag AI Assistant',
      icon: 'fa-solid fa-robot',
      greeting: "Hi! 👋 I'm the AsheTag AI assistant. Ask me about our AI workflow automation, chatbots, pricing, or how we'd automate your business. What would you like to know?",
      starters: [
        { t: 'What can you automate?', q: 'What can you automate?' },
        { t: 'Pricing', q: 'How much does AI automation cost?' },
        { t: 'Is my data secure?', q: 'Is my data secure?' },
        CONTACT_CHIP
      ],
      intents: [
        { id: 'services', kw: ['service', 'services', 'what do you do', 'what do you offer', 'offer', 'help with'],
          a: "We put AI to work across three areas:<ul><li><strong>AI Workflow Automation</strong> — connect your tools, remove manual steps</li><li><strong>AI Chatbots &amp; Assistants</strong> — 24/7 support &amp; internal copilots</li><li><strong>CRM &amp; Sales Automation</strong> — qualify &amp; route leads automatically</li></ul>",
          chips: [{ t: 'What can you automate?', q: 'What can you automate?' }, { t: 'Pricing', q: 'pricing' }, CONTACT_CHIP] },
        { id: 'automate', kw: ['what can you automate', 'automate', 'use case', 'use cases', 'examples', 'tasks', 'what tasks', 'workflow', 'workflows'],
          a: "The highest-ROI workflows we automate first are usually:<ul><li>Customer support triage</li><li>Lead capture &amp; qualification</li><li>Onboarding &amp; hand-offs</li><li>Document processing (invoices, forms, PDFs)</li><li>Recurring reporting &amp; updates</li></ul>Which of these sounds like your team?",
          chips: [{ t: 'AI Chatbots', q: 'Tell me about AI chatbots' }, { t: 'Sales automation', q: 'Tell me about CRM and sales automation' }, CONTACT_CHIP] },
        { id: 'chatbots', kw: ['chatbot', 'chat bot', 'support bot', 'assistant', 'copilot', 'answer questions'],
          a: "<strong>AI Chatbots &amp; Assistants</strong> — custom chatbots for your website and internal AI assistants trained on your own docs, answering customers and staff instantly, 24/7, and handing off to a human when needed.", chips: [{ t: 'Pricing', q: 'pricing' }, CONTACT_CHIP] },
        { id: 'crm', kw: ['crm', 'sales', 'leads', 'lead', 'pipeline', 'follow up', 'follow-up', 'qualify'],
          a: "<strong>CRM &amp; Sales Automation</strong> — automatically capture, qualify and route leads, keep your CRM in sync, and follow up with AI-personalised email, so your pipeline moves faster and nothing slips.", chips: [{ t: 'Pricing', q: 'pricing' }, CONTACT_CHIP] },
        { id: 'pricing', kw: ['price', 'pricing', 'cost', 'how much', 'plan', 'plans', 'budget', 'subscription', 'per month', 'monthly', 'rm'],
          a: "Our AI automation plans:<ul><li><strong>Starter</strong> — from RM1,500/mo · up to 2 workflows + 1 AI chatbot</li><li><strong>Business</strong> — from RM3,500/mo · up to 6 workflows, CRM &amp; multi-channel support <em>(most popular)</em></li><li><strong>Enterprise</strong> — custom · unlimited workflows &amp; bespoke AI agents</li></ul>More on the <a href='pricing.html'>plans page</a>.",
          chips: [{ t: 'Book an AI demo', q: '__human__' }] },
        { id: 'timeline', kw: ['how long', 'timeline', 'turnaround', 'deliver', 'how fast', 'when', 'how many weeks', 'launch', 'go live', 'ready'],
          a: "Most first workflows go <strong>live within 1–4 weeks</strong>, depending on the plan and complexity — we start with the highest-ROI task and expand from there.", chips: [{ t: 'Pricing', q: 'pricing' }, CONTACT_CHIP] },
        { id: 'security', kw: ['secure', 'security', 'data', 'privacy', 'private', 'safe', 'confidential', 'gdpr', 'compliance', 'training'],
          a: "Security is built in: <strong>least-privilege access</strong>, audit logging, and your data stays in your own systems. We never train public models on your private data.", chips: [CONTACT_CHIP] },
        { id: 'integrations', kw: ['integrate', 'integration', 'integrations', 'tools', 'connect', 'stack', 'existing', 'apps', 'software', 'slack', 'sheets'],
          a: "We automate on top of the tools you already use — CRMs, help desks, spreadsheets, email, Slack and hundreds more — so there's <strong>no rip-and-replace</strong>.", chips: [CONTACT_CHIP] },
        { id: 'process', kw: ['process', 'how do you work', 'steps', 'how does it work', 'get started', 'rollout', 'approach'],
          a: "Our rollout has four steps:<ul><li><strong>Map</strong> — find the highest-ROI tasks</li><li><strong>Design</strong> — the automation &amp; AI agents</li><li><strong>Build</strong> — connect tools, test on real data</li><li><strong>Launch &amp; Optimise</strong> — deploy, monitor, keep tuning</li></ul>", chips: [CONTACT_CHIP] },
        { id: 'roi', kw: ['roi', 'worth it', 'save', 'savings', 'benefit', 'value', 'results', 'hours', 'reduce cost'],
          a: "Every workflow is scoped around a real number — <strong>hours saved, cost removed, or revenue unlocked</strong> — never automation for its own sake. Teams typically get back a big chunk of their ops time.", chips: [{ t: 'Pricing', q: 'pricing' }, CONTACT_CHIP] },
        { id: 'areas', kw: ['where', 'location', 'based', 'malaysia', 'worldwide', 'remote', 'country', 'international', 'overseas'],
          a: "We're based in Malaysia and work with teams worldwide — fully remote and async, so location never gets in the way.", chips: [CONTACT_CHIP] }
      ]
    }
  };

  /* ---------------- Matching engine ---------------- */
  var GREET = ['hi', 'hello', 'hey', 'yo', 'hiya', 'howdy', 'salam', 'hai', 'good morning', 'good afternoon', 'good evening'];
  var THANKS = ['thanks', 'thank you', 'thx', 'ty', 'cheers', 'appreciate'];

  function norm(s) { return (' ' + s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ') + ' '); }

  function resolve(raw) {
    // → returns { html, chips, cta } for the given user text in the active mode.
    var kb = KB[mode()];
    var text = norm(raw);

    if (raw === '__human__' || /\b(human|agent|representative|real person|talk to|speak to|whatsapp|call you|contact you|book|demo|consultation)\b/.test(text)) {
      return {
        html: "The fastest way to reach the AsheTag team is WhatsApp — tap below and we'll reply personally. 💬",
        cta: { label: 'Chat on WhatsApp', href: waLink(mode()) },
        chips: kb.starters.filter(function (c) { return c.q !== '__human__'; })
      };
    }
    if (GREET.indexOf(text.trim()) !== -1 || GREET.some(function (g) { return text.indexOf(' ' + g + ' ') !== -1 && text.trim().split(' ').length <= 3; })) {
      return { html: kb.greeting, chips: kb.starters };
    }
    if (THANKS.some(function (t) { return text.indexOf(' ' + t + ' ') !== -1; })) {
      return { html: "You're welcome! 😊 Anything else I can help with?", chips: kb.starters };
    }

    // score intents by keyword hits (longer keywords weigh more)
    var best = null, bestScore = 0;
    kb.intents.forEach(function (it) {
      var score = 0;
      it.kw.forEach(function (k) {
        if (text.indexOf(' ' + k + ' ') !== -1 || text.indexOf(' ' + k) !== -1) {
          score += 1 + Math.min(k.split(' ').length - 1, 2); // multi-word phrases score higher
        }
      });
      if (score > bestScore) { bestScore = score; best = it; }
    });

    if (best && bestScore > 0) {
      return { html: best.a, chips: best.chips || kb.starters };
    }

    // fallback
    return {
      html: "I'm not totally sure about that one 🤔 — but I can help with our " +
        (mode() === 'ai' ? 'automation services, pricing, timelines' : 'services, pricing, timelines') +
        " and getting in touch. Or chat with the team directly on WhatsApp.",
      cta: { label: 'Chat on WhatsApp', href: waLink(mode()) },
      chips: kb.starters
    };
  }

  /* ---------------- UI ---------------- */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = {};
  var opened = false;
  var greeted = false;

  function h(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function build() {
    var root = h('div', 'cbot');
    root.setAttribute('data-cbot', '');

    var launcher = h('button', 'cbot__launcher');
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Open chat assistant');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = '<span class="cbot__launcher-ico"><i class="fa-solid fa-comments" aria-hidden="true"></i></span>' +
      '<span class="cbot__launcher-label">Chat with us</span><span class="cbot__launcher-pulse" aria-hidden="true"></span>';

    var panel = h('div', 'cbot__panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'AsheTag chat assistant');
    panel.setAttribute('aria-modal', 'false');
    panel.innerHTML =
      '<div class="cbot__head">' +
        '<span class="cbot__avatar"><i class="cbot__head-icon" aria-hidden="true"></i></span>' +
        '<div class="cbot__head-meta"><div class="cbot__head-name"></div><div class="cbot__head-status">Online · typically replies instantly</div></div>' +
        '<button type="button" class="cbot__close" aria-label="Close chat"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
      '</div>' +
      '<div class="cbot__log" role="log" aria-live="polite"></div>' +
      '<div class="cbot__chips"></div>' +
      '<form class="cbot__form">' +
        '<textarea class="cbot__input" rows="1" placeholder="Ask about services, pricing…" aria-label="Type your message"></textarea>' +
        '<button type="submit" class="cbot__send" aria-label="Send message" disabled><i class="fa-solid fa-paper-plane" aria-hidden="true"></i></button>' +
      '</form>' +
      '<div class="cbot__foot">Automated assistant · for anything complex we\'ll connect you on WhatsApp</div>';

    root.appendChild(panel);
    root.appendChild(launcher);
    document.body.appendChild(root);

    els = {
      root: root, launcher: launcher, panel: panel,
      log: panel.querySelector('.cbot__log'),
      chips: panel.querySelector('.cbot__chips'),
      form: panel.querySelector('.cbot__form'),
      input: panel.querySelector('.cbot__input'),
      send: panel.querySelector('.cbot__send'),
      name: panel.querySelector('.cbot__head-name'),
      headIcon: panel.querySelector('.cbot__head-icon'),
      close: panel.querySelector('.cbot__close')
    };

    applyModeChrome();

    launcher.addEventListener('click', open);
    els.close.addEventListener('click', close);
    els.form.addEventListener('submit', function (e) { e.preventDefault(); submit(); });
    els.input.addEventListener('input', autoGrow);
    els.input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && opened) close(); });
    window.addEventListener('ashetag:modechange', onModeChange);
  }

  function applyModeChrome() {
    var kb = KB[mode()];
    els.name.textContent = kb.name;
    els.headIcon.className = 'cbot__head-icon ' + kb.icon;
  }

  function autoGrow() {
    els.input.style.height = 'auto';
    els.input.style.height = Math.min(els.input.scrollHeight, 96) + 'px';
    els.send.disabled = els.input.value.trim() === '';
  }

  function scrollDown() { els.log.scrollTop = els.log.scrollHeight; }

  function addMsg(who, html) {
    var m = h('div', 'cbot__msg cbot__msg--' + who);
    var ava = who === 'bot'
      ? '<span class="cbot__msg-ava"><i class="' + KB[mode()].icon + '" aria-hidden="true"></i></span>'
      : '';
    m.innerHTML = ava + '<div class="cbot__bubble">' + html + '</div>';
    els.log.appendChild(m);
    scrollDown();
    return m;
  }

  function showTyping() {
    var m = h('div', 'cbot__msg cbot__msg--bot');
    m.innerHTML = '<span class="cbot__msg-ava"><i class="' + KB[mode()].icon + '" aria-hidden="true"></i></span>' +
      '<div class="cbot__bubble cbot__typing"><span></span><span></span><span></span></div>';
    els.log.appendChild(m);
    scrollDown();
    return m;
  }

  function renderChips(chips) {
    els.chips.innerHTML = '';
    (chips || []).forEach(function (c) {
      var b = h('button', 'cbot__chip', c.t);
      b.type = 'button';
      b.addEventListener('click', function () {
        if (c.wa) { window.open(waLink(mode()), '_blank', 'noopener'); return; }
        if (c.href) { window.open(c.href, c.href.indexOf('http') === 0 ? '_blank' : '_self', 'noopener'); return; }
        send(c.q, c.t);
      });
      els.chips.appendChild(b);
    });
  }

  function botReply(res) {
    var typing = showTyping();
    var delay = reduce ? 150 : 500 + Math.min(res.html.length * 6, 900);
    setTimeout(function () {
      typing.remove();
      var html = res.html;
      if (res.cta) {
        html += "<div style='margin-top:.6rem'><a href='" + res.cta.href + "' target='_blank' rel='noopener' style='display:inline-flex;align-items:center;gap:.4rem'><i class='fa-brands fa-whatsapp' aria-hidden='true'></i> " + res.cta.label + "</a></div>";
      }
      addMsg('bot', html);
      renderChips(res.chips);
    }, delay);
  }

  // send a message as the user; `label` optional display text (for chips)
  function send(query, label) {
    if (!query) return;
    addMsg('user', escapeHtml(label || query));
    els.chips.innerHTML = '';
    botReply(resolve(query));
  }

  function submit() {
    var v = els.input.value.trim();
    if (!v) return;
    els.input.value = '';
    autoGrow();
    send(v);
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }

  function open() {
    opened = true;
    els.root.classList.add('is-open');
    els.launcher.setAttribute('aria-expanded', 'true');
    if (!greeted) {
      greeted = true;
      var kb = KB[mode()];
      botReply({ html: kb.greeting, chips: kb.starters });
    }
    setTimeout(function () { els.input.focus(); }, 350);
  }

  function close() {
    opened = false;
    els.root.classList.remove('is-open');
    els.launcher.setAttribute('aria-expanded', 'false');
    els.launcher.focus();
  }

  function onModeChange() {
    applyModeChrome();
    if (opened && greeted) {
      var kb = KB[mode()];
      addMsg('bot', "You've switched to <strong>" + (mode() === 'ai' ? 'AI Automation' : 'Web Studio') + "</strong>. " +
        (mode() === 'ai' ? "Ask me anything about AI automation!" : "Ask me anything about our web design services!"));
      renderChips(kb.starters);
    }
  }

  // public API (also handy for a future "open chat" button anywhere)
  window.AshetagChat = { open: open, close: close, toggle: function () { opened ? close() : open(); }, send: send };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
