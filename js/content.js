/* =====================================================================
   AsheTag — DUAL-MODE CONTENT SOURCE
   ---------------------------------------------------------------------
   The default ("current") Web-Studio copy lives directly in the HTML, so
   it renders with zero JavaScript and stays the untouched default.

   This file holds ONLY the alternate copy for Mode 2 — the AI Workflow
   Automation experience. js/theme-mode.js captures each element's original
   markup on load, then swaps in these values when AI mode is active and
   restores the originals when the user switches back.

   Keys map to elements via data-attributes in the HTML:
     data-ck="key"        → element.innerHTML  ← SITE_CONTENT.ai.html[key]
     data-ck-class="key"  → element.className  ← SITE_CONTENT.ai.cls[key]

   Keys are namespaced:  s.* shared · h.* home · sv.* services · pr.* pricing
   ab.* about · ct.* contact · bl.* blog · bd.* blog-detail
   ===================================================================== */
window.SITE_CONTENT = {
  ai: {
    /* -----------------------------------------------------------------
       HTML (innerHTML) swaps
       ----------------------------------------------------------------- */
    html: {
      /* ============ SHARED — nav, mega-menu, footer, CTA, WA ============ */
      'brand.name': 'AsheTag AI',
      's.nav.cta': 'Book AI Demo',

      /* mega-menu: About panel */
      's.mm.about.eyebrow': 'About AsheTag AI',
      's.mm.about.0.t': 'Our Mission', 's.mm.about.0.s': 'Automate the busywork',
      's.mm.about.1.t': 'How We Build', 's.mm.about.1.s': 'AI agents that ship in weeks',
      's.mm.about.2.t': 'Why AsheTag AI', 's.mm.about.2.s': 'ROI-focused automation',
      's.mm.about.3.t': 'Industries We Serve', 's.mm.about.3.s': 'SaaS, e-commerce & services',
      's.mm.about.all': 'Learn about AsheTag AI <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
      's.mm.about.0.cap': 'Our Mission<span>Automate the busywork</span>',
      's.mm.about.1.cap': 'How We Build<span>AI agents that ship in weeks</span>',
      's.mm.about.2.cap': 'Why AsheTag AI<span>ROI-focused automation</span>',
      's.mm.about.3.cap': 'Industries We Serve<span>SaaS, e-commerce & services</span>',

      /* mega-menu: Services panel */
      's.mm.services.eyebrow': 'AI Services',
      's.mm.services.0.t': 'AI Workflow Automation', 's.mm.services.0.s': 'Connect your tools, remove manual steps',
      's.mm.services.1.t': 'AI Chatbots & Assistants', 's.mm.services.1.s': '24/7 support and internal copilots',
      's.mm.services.2.t': 'CRM & Sales Automation', 's.mm.services.2.s': 'Qualify and route leads automatically',
      's.mm.services.all': 'See all AI services <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
      's.mm.services.0.cap': 'AI Workflow Automation<span>Connect your tools, remove manual steps</span>',
      's.mm.services.1.cap': 'AI Chatbots & Assistants<span>24/7 support and internal copilots</span>',
      's.mm.services.2.cap': 'CRM & Sales Automation<span>Qualify and route leads automatically</span>',

      /* mega-menu: Pricing panel */
      's.mm.pricing.eyebrow': 'AI Plans',
      's.mm.pricing.0.t': 'Starter — from RM1,500/mo', 's.mm.pricing.0.s': 'For lean teams getting started',
      's.mm.pricing.1.t': 'Business — from RM3,500/mo', 's.mm.pricing.1.s': 'Most popular — scaling operations',
      's.mm.pricing.2.t': 'Enterprise — Custom', 's.mm.pricing.2.s': 'Bespoke, mission-critical automation',
      's.mm.pricing.all': 'Compare all plans <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
      's.mm.pricing.0.cap': 'Starter — from RM1,500/mo<span>For lean teams getting started</span>',
      's.mm.pricing.1.cap': 'Business — from RM3,500/mo<span>Most popular — scaling operations</span>',
      's.mm.pricing.2.cap': 'Enterprise — Custom<span>Bespoke, mission-critical automation</span>',

      /* mega-menu: Blog panel */
      's.mm.blog.eyebrow': 'AI Insights',
      's.mm.blog.0.t': '5 workflows every business should automate', 's.mm.blog.0.s': 'Automation · 2026',
      's.mm.blog.1.t': 'Chatbots vs. AI assistants: what to deploy', 's.mm.blog.1.s': 'AI Support',
      's.mm.blog.2.t': 'How we cut ops time by 70% with AI', 's.mm.blog.2.s': 'Case Study',
      's.mm.blog.all': 'Read AI insights <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
      's.mm.blog.0.cap': '5 workflows every business should automate<span>Automation · 2026</span>',
      's.mm.blog.1.cap': 'Chatbots vs. AI assistants: what to deploy<span>AI Support</span>',
      's.mm.blog.2.cap': 'How we cut ops time by 70% with AI<span>Case Study</span>',

      /* mobile-nav sublinks */
      's.mnav.about.0': 'Our Mission', 's.mnav.about.1': 'How We Build', 's.mnav.about.2': 'Why AsheTag AI', 's.mnav.about.3': 'Industries We Serve',
      's.mnav.services.0': 'All AI Services', 's.mnav.services.1': 'AI Workflow Automation', 's.mnav.services.2': 'AI Chatbots & Assistants', 's.mnav.services.3': 'CRM & Sales Automation',
      's.mnav.pricing.0': 'All Plans', 's.mnav.pricing.1': 'Starter — from RM1,500/mo', 's.mnav.pricing.2': 'Business — from RM3,500/mo', 's.mnav.pricing.3': 'Enterprise — Custom',
      's.mnav.blog.0': 'All Insights', 's.mnav.blog.1': '5 workflows to automate', 's.mnav.blog.2': 'Chatbots vs. AI assistants', 's.mnav.blog.3': 'How we cut ops time by 70%',
      's.mnav.cta': 'Book AI Demo',

      /* Final CTA (appears on every page) */
      's.cta.h': 'Ready to Automate Your Business with AI?',
      's.cta.p': "Book a free automation consultation and we'll map the workflows AI can take off your team's plate — and what it's worth.",
      's.cta.btn': '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Book on WhatsApp',

      /* Footer */
      's.footer.tagline': 'Automate. Scale. Grow. — AI Workflow Automation · AI Chatbots · CRM &amp; Sales Automation · Internal AI Assistants · Document Processing · AI Customer Support — for teams in Malaysia &amp; worldwide',
      's.footer.copy': 'Copyright © 2026 AsheTag AI. All rights reserved. AI workflow automation studio based in Malaysia.',

      /* WhatsApp float tooltip */
      's.wa.tooltip': 'Want to automate? Let&rsquo;s talk!',

      /* Shared "Why AsheTag" feature grid (home, services, about) */
      's.why.eyebrow': 'Why AsheTag AI',
      's.feat.0.h': 'Built Around Your Stack', 's.feat.0.p': 'We automate on the tools you already use — no rip-and-replace.',
      's.feat.1.h': 'Live in Weeks, Not Months', 's.feat.1.p': 'Focused automations shipped fast, then expanded as they prove out.',
      's.feat.2.h': 'Measurable ROI', 's.feat.2.p': 'Every workflow is scoped around hours saved and cost removed.',
      's.feat.3.h': 'Secure by Design', 's.feat.3.p': 'Least-privilege access, audit logs, and your data kept your own.',
      's.feat.4.h': 'Human-in-the-Loop', 's.feat.4.p': 'AI handles the volume; your team keeps control of what matters.',
      's.feat.5.h': 'Ongoing Optimisation', 's.feat.5.p': "We monitor, tune and extend your automations after they go live.",

      /* Shared process steps (services, about) */
      's.proc.head.eyebrow': 'How we work',
      's.proc.head.h': 'A simple, transparent rollout',
      's.proc.head.p': 'From first call to live automation, every project follows the same clear path — no jargon, no surprises.',
      's.proc.0.h': 'Map', 's.proc.0.p': 'We start on a call to map your current workflows and find the highest-ROI tasks to automate.',
      's.proc.1.h': 'Design', 's.proc.1.p': 'We design the automation and AI agents, then walk you through exactly how they will work.',
      's.proc.2.h': 'Build', 's.proc.2.p': 'We connect your tools, build the workflows, and test them against real data before go-live.',
      's.proc.3.h': 'Launch & Optimise', 's.proc.3.p': 'We deploy, monitor the results, and keep tuning so the automation compounds over time.',

      /* Shared "Areas / Industries" section (services, about) */
      's.areas.eyebrow': 'Who we help',
      's.areas.h': 'AI Automation for Every Kind of Team',
      's.areas.lead': 'We build AI automation for businesses across Malaysia and worldwide — fully remote, with a fast async workflow. If your team runs on repetitive digital tasks, we can automate them.',
      's.areas.grid':
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>SaaS &amp; Startups</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>E-commerce &amp; Retail</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Professional Services</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Agencies &amp; Marketing</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Finance &amp; Accounting</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Real Estate</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Healthcare &amp; Clinics</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Logistics &amp; Supply Chain</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Education &amp; Training</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Legal &amp; Compliance</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Recruitment &amp; HR</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Manufacturing</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Hospitality</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Insurance</div>' +
        '<div class="areas-grid__item"><i class="fa-solid fa-angle-right" aria-hidden="true"></i>Customer Support Teams</div>',
      's.areas.note': "Whether you're a startup founder drowning in manual onboarding, an e-commerce team answering the same questions all day, or a services firm buried in paperwork, AsheTag AI designs, builds and maintains the workflow automation, chatbots and AI assistants that give your people their time back — wherever in the world you're based.",
      's.areas.note.ms': 'AsheTag AI mereka bentuk dan membina automasi aliran kerja AI, chatbot dan pembantu AI dalaman untuk perniagaan kecil dan sederhana (PKS) di seluruh Malaysia dan di serata dunia — membantu pasukan anda menjimatkan masa, mengurangkan kos dan berkembang dengan lebih pantas.',

      /* ================= HOME (index.html) ================= */
      'h.hero.badge': '<span class="badge__dot"></span>Automate · Scale · Grow — AI Workflow Automation Studio',
      'h.hero.h1': 'Automate Your Business with AI — Save Time, Cut Costs, and <span class="hero-word" id="heroWord">Scale</span> Faster',
      'h.hero.lead': 'AsheTag AI designs and builds AI workflow automation, chatbots and internal assistants that take repetitive work off your team — so your business runs faster, leaner, and around the clock. Based in Malaysia, working with teams worldwide.',
      'h.hero.cta1': 'Book AI Consultation',
      'h.hero.cta2': 'View Plans',
      'h.trust':
        '<li><i class="fa-solid fa-check" aria-hidden="true"></i>Workflow Automation</li>' +
        '<li><i class="fa-solid fa-check" aria-hidden="true"></i>AI Chatbots &amp; Assistants</li>' +
        '<li><i class="fa-solid fa-check" aria-hidden="true"></i>CRM &amp; Sales Automation</li>' +
        '<li><i class="fa-solid fa-check" aria-hidden="true"></i>Malaysia-Based, Worldwide</li>',

      'h.svc.eyebrow': 'What we do',
      'h.svc.h': 'AI Workflow Automation Services',
      'h.svc.lead': 'From connecting your tools to deploying AI chatbots and assistants, every engagement is scoped to move one number: the hours your team spends on repetitive work.',
      'h.svc.0.h': 'AI Workflow Automation',
      'h.svc.0.p': 'We connect your apps and automate multi-step processes end to end — onboarding, approvals, reporting and hand-offs — so manual busywork disappears.',
      'h.svc.0.more': 'Learn more <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
      'h.svc.1.h': 'AI Chatbots & Assistants',
      'h.svc.1.p': 'Custom AI chatbots for your website and internal AI assistants trained on your docs — answering customers and staff instantly, 24/7.',
      'h.svc.1.more': 'Learn more <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
      'h.svc.2.h': 'CRM & Sales Automation',
      'h.svc.2.p': 'Automatically capture, qualify and route leads, sync your CRM, and follow up with AI-personalised email — so nothing slips through the cracks.',
      'h.svc.2.more': 'Learn more <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
      'h.svc.all': 'Explore all AI services',

      'h.why.h': 'Automation that pays for itself',

      'h.stat.0.label': 'Core AI Automation Services',
      'h.stat.1.label': 'Always-On, Every Day of the Year',
      'h.stat.2.label': 'Business Days to First Results',
      'h.stat.3.label': 'of Ops Time Teams Get Back',

      'h.work.eyebrow': 'Recent work',
      'h.work.h': 'Automations we&rsquo;re proud of',
      'h.work.lead': 'A snapshot of AI workflows built for teams across different industries.',
      'h.work.f.all': 'All', 'h.work.f.support': 'Support', 'h.work.f.sales': 'Sales', 'h.work.f.ops': 'Operations', 'h.work.f.docs': 'Documents',
      'h.work.0': '<span>AI Customer Support</span><small>Support bot · 68% auto-resolved</small>',
      'h.work.1': '<span>Lead Qualification</span><small>Sales automation · 3× faster follow-up</small>',
      'h.work.2': '<span>Onboarding Automation</span><small>Operations · 9 hrs saved / week</small>',
      'h.work.3': '<span>Document Processing</span><small>Docs · 95% less manual entry</small>',

      'h.about.eyebrow': 'Who we are',
      'h.about.h': 'A Malaysia-based studio built around Automate · Scale · Grow',
      'h.about.p1': 'AsheTag AI is an automation studio based in Malaysia, helping SMEs, startups and scaling teams put AI to work on the repetitive tasks that eat their days. We build on the tools you already use — so automation slots into your business instead of replacing it.',
      'h.about.p2': 'Every project is ROI-focused, secure by design, and built with a human in the loop. We work fully remotely with a fast async workflow, delivering the same quality whether your team is in Kuala Lumpur, Singapore, London or anywhere else.',
      'h.about.btn': 'More about AsheTag AI',

      'h.pricing.eyebrow': 'Plans',
      'h.pricing.h': 'Simple plans, clear scope',
      'h.pricing.lead': 'Three straightforward automation plans. Choose the one that fits where your operations are today — full details on the plans page.',
      'h.price.0.name': 'Starter',
      'h.price.0.desc': 'For lean teams automating their first workflows.',
      'h.price.0.amt': '<span class="num">RM1,500</span><span class="range">/mo</span>',
      'h.price.0.f': '<li><i class="fa-solid fa-check" aria-hidden="true"></i>Up to 2 Automated Workflows</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>1 AI Chatbot or Assistant</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Core Tool Integrations</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Setup in 1–2 Weeks</li>',
      'h.price.1.name': 'Business',
      'h.price.1.desc': 'Ideal for growing teams scaling their operations.',
      'h.price.1.amt': '<span class="num">RM3,500</span><span class="range">/mo</span>',
      'h.price.1.f': '<li><i class="fa-solid fa-check" aria-hidden="true"></i>Up to 6 Automated Workflows</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Multi-Channel AI Support</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>CRM &amp; Sales Automation</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Setup in 2–4 Weeks</li>',
      'h.price.2.name': 'Enterprise',
      'h.price.2.desc': 'Built for organisations automating at scale.',
      'h.price.2.amt': '<span class="num">Custom</span>',
      'h.price.2.f': '<li><i class="fa-solid fa-check" aria-hidden="true"></i>Unlimited Workflows</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Bespoke AI Agents</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Dedicated Solutions Engineer</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>SLA &amp; Priority Support</li>',
      'h.pricing.btn': 'Compare full plans',

      'h.faq.eyebrow': 'FAQ',
      'h.faq.h': 'AI Workflow Automation — Questions, Answered',
      'h.faq.0.q': 'How long does it take to launch an automation? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'h.faq.0.a': 'Most first workflows go live within 1–4 weeks depending on the plan and complexity — we start with the highest-ROI task and expand from there.',
      'h.faq.1.q': 'Will this work with the tools we already use? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'h.faq.1.a': 'Yes. We automate on top of the apps you already run — CRMs, help desks, spreadsheets, email, Slack and hundreds more — so there is no rip-and-replace.',
      'h.faq.2.q': 'Is our data secure? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'h.faq.2.a': 'Security is built in: least-privilege access, audit logging, and your data stays in your own systems. We never train public models on your private data.',
      'h.faq.3.q': 'How much does AI automation cost? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'h.faq.3.a': 'Plans start from RM1,500/month for the Starter plan and scale up to custom Enterprise engagements, depending on the number of workflows, integrations and AI agents you need.',

      /* ================= SERVICES (services.html) ================= */
      'sv.hero.crumb': '<a href="index.html">Home</a> <span>/</span> AI Services',
      'sv.hero.h1': 'AI Workflow Automation Services',
      'sv.hero.lead': 'From automating multi-step workflows to deploying AI chatbots and assistants, every engagement is scoped to move one number: the hours your team spends on repetitive work.',
      'sv.hero.cta1': 'Book AI Consultation',
      'sv.hero.cta2': 'View Plans',

      'sv.0.h': 'AI Workflow Automation',
      'sv.0.p1': 'We connect your apps and automate multi-step processes end to end — onboarding, approvals, data entry, reporting and hand-offs — so manual busywork disappears and nothing gets forgotten.',
      'sv.0.p2': "<strong>Who it's for:</strong> Teams losing hours to repetitive, multi-tool processes that should just run themselves.",
      'sv.0.b': '<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Hours of manual work removed every week</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Fewer errors and dropped hand-offs</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Processes that run 24/7 without you</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Real-time visibility into every step</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Scales as your volume grows</span></li>',
      'sv.0.i': '<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Workflow mapping &amp; automation design</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Integration across your existing tools</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>AI steps for parsing, routing &amp; drafting</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Error handling &amp; alerting</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Testing on real data before go-live</span></li>',

      'sv.1.h': 'AI Chatbots & Assistants',
      'sv.1.p1': 'Custom AI chatbots for your website and internal AI assistants trained on your own knowledge — answering customers and staff instantly, in natural language, 24/7.',
      'sv.1.p2': "<strong>Who it's for:</strong> Teams answering the same questions all day, or staff hunting through docs for information.",
      'sv.1.b': '<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Instant, accurate answers around the clock</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Deflects repetitive support tickets</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Grounded in your real content — not guesses</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Hands off to a human when needed</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Speaks your customers&rsquo; language</span></li>',
      'sv.1.i': '<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Custom chatbot trained on your knowledge base</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Website &amp; messaging-channel deployment</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Internal AI assistant for your team</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Human hand-off &amp; escalation rules</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Analytics on questions &amp; resolution</span></li>',

      'sv.2.h': 'CRM & Sales Automation',
      'sv.2.p1': 'Automatically capture, qualify and route leads, keep your CRM in sync, and follow up with AI-personalised email — so your pipeline moves faster and nothing slips through the cracks.',
      'sv.2.p2': "<strong>Who it's for:</strong> Sales and revenue teams losing deals to slow follow-up and messy CRM data.",
      'sv.2.b': '<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Faster response to every new lead</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Only qualified leads reach your reps</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>A CRM that stays clean and current</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Personalised follow-up at scale</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>More pipeline from the same traffic</span></li>',
      'sv.2.i': '<li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Lead capture &amp; enrichment</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>AI lead scoring &amp; qualification</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Automatic routing &amp; CRM sync</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>AI-personalised email follow-up</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span>Pipeline &amp; conversion reporting</span></li>',

      'sv.cta.1': 'Book a Free Consultation', 'sv.cta.2': 'See Plans',

      'sv.why.h': 'Why automate with AsheTag AI',

      'sv.faq.h': 'AI Services — Frequently Asked Questions',
      'sv.faq.0.q': 'Can you automate a process we already have? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'sv.faq.0.a': 'Yes. We map your existing workflow first, then automate it on the tools you already use — keeping the steps that matter and removing the manual ones.',
      'sv.faq.1.q': 'Will the AI chatbot give accurate answers? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'sv.faq.1.a': 'Our chatbots are grounded in your real content and documents, so they answer from your knowledge — not guesses — and hand off to a human when they are unsure.',
      'sv.faq.2.q': 'Can our team manage the automations ourselves? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'sv.faq.2.a': 'Yes. We build with clear dashboards and documentation, walk your team through everything, and stay on to support and extend the automations as you grow.',
      'sv.faq.3.q': 'Is our data kept private? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'sv.faq.3.a': 'Yes. We use least-privilege access, keep your data in your own systems, and never train public models on your private information.',

      /* ================= PRICING (pricing.html) ================= */
      'pr.hero.crumb': '<a href="index.html">Home</a> <span>/</span> Plans',
      'pr.hero.h1': 'Simple plans, clear scope',
      'pr.hero.lead': 'Choose the plan that fits where your operations are today. Transparent AI automation pricing — from RM1,500/month for your first workflows up to custom Enterprise engagements.',
      'pr.hero.cta': 'Book AI Consultation',

      'pr.0.name': 'Starter',
      'pr.0.desc': 'For lean teams automating their first workflows.',
      'pr.0.amt': '<span class="num">RM1,500</span><span class="range">/mo</span>',
      'pr.0.f': '<li><i class="fa-solid fa-check" aria-hidden="true"></i>Up to 2 Automated Workflows</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>1 AI Chatbot or Assistant</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Core Tool Integrations</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Knowledge Base Training</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Human Hand-off Rules</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Monthly Optimisation</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Email &amp; Chat Support</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Setup in 1–2 Weeks</li>',
      'pr.1.name': 'Business',
      'pr.1.desc': 'Ideal for growing teams scaling their operations.',
      'pr.1.amt': '<span class="num">RM3,500</span><span class="range">/mo</span>',
      'pr.1.f': '<li><i class="fa-solid fa-check" aria-hidden="true"></i>Up to 6 Automated Workflows</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Multi-Channel AI Support</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Internal AI Assistant</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>CRM &amp; Sales Automation</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Document Processing</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Advanced Integrations</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Bi-Weekly Optimisation</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Priority Support</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Setup in 2–4 Weeks</li>',
      'pr.2.name': 'Enterprise',
      'pr.2.desc': 'Built for organisations automating at scale.',
      'pr.2.amt': '<span class="num">Custom</span>',
      'pr.2.f': '<li><i class="fa-solid fa-check" aria-hidden="true"></i>Unlimited Automated Workflows</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Bespoke AI Agents</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Custom Model &amp; Data Pipelines</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Dedicated Solutions Engineer</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>SSO, Audit Logs &amp; Compliance</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>SLA &amp; Priority Support</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Quarterly Business Reviews</li><li><i class="fa-solid fa-check" aria-hidden="true"></i>Onboarding &amp; Team Training</li>',
      'pr.note': 'All plans are month-to-month with no long lock-in. Usage-based AI costs are billed transparently at cost — we&rsquo;re happy to estimate them up front.',

      'pr.faq.h': 'Plans — Frequently Asked Questions',
      'pr.faq.0.q': 'How much does AI automation cost? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'pr.faq.0.a': 'AI automation pricing with AsheTag AI starts from RM1,500/month for the Starter plan and scales up to custom Enterprise engagements, depending on the number of workflows, integrations and AI agents you need.',
      'pr.faq.1.q': 'How long does it take to launch? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'pr.faq.1.a': 'Most first workflows go live within 1–4 weeks depending on the plan, and we expand from there once the automation is proving its value.',
      'pr.faq.2.q': 'Are AI usage costs included? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'pr.faq.2.a': 'Plan fees cover our design, build and maintenance. Any usage-based AI/model costs are billed transparently at cost, and we estimate them for you up front.',
      'pr.faq.3.q': 'Do you only work with Malaysian teams? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'pr.faq.3.a': "No. We're based in Malaysia but work with teams worldwide. Everything runs async over calls, chat and email, so location never gets in the way.",

      /* ================= ABOUT (about-us.html) ================= */
      'ab.hero.crumb': '<a href="index.html">Home</a> <span>/</span> About Us',
      'ab.hero.h1': 'Automate. Scale. Grow. — the studio behind your AI',
      'ab.hero.lead': 'AsheTag AI is a Malaysia-based automation studio helping teams turn repetitive, manual work into AI-powered workflows that run themselves — reliably, securely and around the clock.',
      'ab.hero.cta1': 'Book AI Consultation', 'ab.hero.cta2': 'View Services',

      'ab.1.h': 'An automation studio built around three words',
      'ab.1.p1': 'AsheTag AI is an AI automation studio based in Malaysia, working with SMEs, startups and scaling teams that need their operations to do more without hiring more. Our name is built on a simple idea — <strong>Automate, Scale, Grow</strong>: automate the busywork, scale what works, and grow the business.',
      'ab.1.p2': 'We build AI workflow automation, chatbots and internal assistants on top of the tools you already use. That means automation slots into your business without a risky rip-and-replace — and your team stays in control the whole way.',
      'ab.1.p3': 'We&rsquo;re based in Malaysia and work with teams everywhere. Everything runs async over calls, chat and email, so where you&rsquo;re located never gets in the way of great work.',

      'ab.2.h': 'Automation measured on results, not hype',
      'ab.2.p': "AI is only useful when it moves a real number. That belief shapes how we work: every workflow, agent and chatbot we build is scoped around hours saved, costs removed or revenue unlocked — never automation for its own sake.",
      'ab.2.l': '<li><i class="fa-solid fa-check" aria-hidden="true"></i><span><strong>ROI-focused scoping</strong> — we start with the highest-value task, not the flashiest one.</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span><strong>Human-in-the-loop</strong> — AI handles the volume; your team keeps control of the decisions.</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span><strong>Secure by design</strong> — least-privilege access, audit logs, your data kept your own.</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span><strong>Built on your stack</strong> — automation on the tools you already run, no rip-and-replace.</span></li><li><i class="fa-solid fa-check" aria-hidden="true"></i><span><strong>Ongoing optimisation</strong> — we monitor and improve after launch, not just until go-live.</span></li>',

      'ab.why.h': 'Why teams choose AsheTag AI',

      /* ================= CONTACT (contact-us.html) ================= */
      'ct.hero.crumb': '<a href="index.html">Home</a> <span>/</span> Contact Us',
      'ct.hero.h1': "Let's automate your workflows",
      'ct.hero.lead': "Tell us a little about your team and the tasks eating your time. The fastest way to reach AsheTag AI is WhatsApp — we'll get straight back to you with next steps.",

      'ct.form.h': 'Book a free automation consultation',
      'ct.form.note': "Fill in the form and we'll open WhatsApp with your details ready to send.",
      'ct.form.svc.opt': '<option value="AI Workflow Automation">AI Workflow Automation</option><option value="AI Chatbots & Assistants">AI Chatbots &amp; Assistants</option><option value="CRM & Sales Automation">CRM &amp; Sales Automation</option><option value="Not sure yet">Not sure yet</option>',
      'ct.form.msg.label': 'What would you like to automate?',
      'ct.info.0.p': '<a href="https://wa.me/60179812010" target="_blank" rel="noopener">+60 17-981 2010</a><br>Our main line — the quickest way to reach us.',
      'ct.info.1.h': 'Based in Malaysia',
      'ct.info.1.p': 'Working with teams across Malaysia, Singapore and worldwide — fully remote and async.',
      'ct.info.2.h': 'Fully remote',
      'ct.info.2.p': 'We work with teams wherever they are. Everything runs over WhatsApp, calls and email, so location never gets in the way.',
      'ct.info.3.h': 'Free consultation',
      'ct.info.3.p': "Not sure what to automate? Start a no-pressure chat and we'll help you spot the highest-ROI workflows.",

      'ct.faq.h': 'Contact — Frequently Asked Questions',
      'ct.faq.0.q': 'Do you only work with Malaysian teams? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'ct.faq.0.a': "No. We're based in Malaysia but work with teams worldwide. Everything runs async over WhatsApp, calls and email, so location never gets in the way.",
      'ct.faq.1.q': 'How long does it take to launch an automation? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'ct.faq.1.a': 'Most first workflows go live within 1–4 weeks depending on the plan and complexity — we start with the highest-ROI task and expand from there.',
      'ct.faq.2.q': 'Can our team manage the automations ourselves? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'ct.faq.2.a': 'Yes. We build with clear dashboards and documentation, walk your team through everything, and stay on to support and extend the automations as you grow.',
      'ct.faq.3.q': 'Is our data secure? <span class="faq-item__icon"><i class="fa-solid fa-plus" aria-hidden="true"></i></span>',
      'ct.faq.3.a': 'Security is built in: least-privilege access, audit logging, and your data stays in your own systems. We never train public models on your private data.',

      /* ================= BLOG (blog.html) ================= */
      'bl.hero.h1': 'The AsheTag AI Blog',
      'bl.hero.lead': 'Practical guides on AI workflow automation, chatbots, and putting AI to work in your operations — written to help teams save time and scale.',
      'bl.0.tag': 'Automation', 'bl.0.date': '<i class="fa-regular fa-calendar" aria-hidden="true"></i> Aug 3, 2026',
      'bl.0.title': '5 Workflows Every Business Should Automate First',
      'bl.0.ex': 'Not sure where to start with AI? These five high-ROI workflows are almost always worth automating before anything else.',
      'bl.1.tag': 'AI Support', 'bl.1.date': '<i class="fa-regular fa-calendar" aria-hidden="true"></i> Jul 21, 2026',
      'bl.1.title': 'Chatbots vs. AI Assistants: What Should You Deploy?',
      'bl.1.ex': "They sound similar but solve different problems. Here's how to choose between a customer chatbot and an internal AI assistant.",
      'bl.2.tag': 'Case Study', 'bl.2.date': '<i class="fa-regular fa-calendar" aria-hidden="true"></i> Jul 9, 2026',
      'bl.2.title': 'How We Cut a Team&rsquo;s Ops Time by 70% with AI',
      'bl.2.ex': 'A walkthrough of the automations that took a services team from drowning in manual work to running mostly on autopilot.',
      'bl.3.tag': 'Integrations', 'bl.3.date': '<i class="fa-regular fa-calendar" aria-hidden="true"></i> Jun 24, 2026',
      'bl.3.title': 'Automating on the Tools You Already Use',
      'bl.3.ex': 'You don&rsquo;t need to rip out your stack to adopt AI. Here&rsquo;s how we layer automation onto your existing apps.',
      'bl.4.tag': 'AI Security', 'bl.4.date': '<i class="fa-regular fa-calendar" aria-hidden="true"></i> Jun 10, 2026',
      'bl.4.title': 'Keeping Your Data Safe When You Adopt AI',
      'bl.4.ex': 'A plain-English look at the access controls, logging and data-handling practices every AI automation should have.',
      'bl.5.tag': 'Strategy', 'bl.5.date': '<i class="fa-regular fa-calendar" aria-hidden="true"></i> May 28, 2026',
      'bl.5.title': 'How to Measure the ROI of AI Automation',
      'bl.5.ex': 'Hours saved, cost removed, revenue unlocked — here&rsquo;s how we scope and track the return on every automation we build.',

      /* ================= BLOG DETAIL (blog-detail.html) ================= */
      'bd.crumb': '<a href="index.html">Home</a> <span>/</span> <a href="blog.html">Blog</a> <span>/</span> Automation',
      'bd.meta': '<span class="post-tag">Automation</span><span><i class="fa-regular fa-calendar" aria-hidden="true"></i> Aug 3, 2026</span><span><i class="fa-regular fa-user" aria-hidden="true"></i> By AsheTag AI</span>',
      'bd.h1': '5 Workflows Every Business Should Automate First',
      'bd.lead': 'AI can automate almost anything — but a few workflows deliver outsized returns fast. Here&rsquo;s where we tell teams to start.',
      'bd.fig.cap': 'Automation isn&rsquo;t about replacing your team — it&rsquo;s about giving them their time back.',
      'bd.body': '<p>Most teams don&rsquo;t need AI everywhere. They need it on the handful of repetitive, high-volume tasks that quietly eat hours every week. Start there, prove the value, and expand — that&rsquo;s how automation compounds instead of stalling.</p><h2>Start where the busywork is worst</h2><p>The best first automation is boring and frequent: the task someone does every day, the same way, that follows clear rules. Those are the workflows where AI removes the most hours with the least risk — and where the return is easiest to measure.</p><p>That&rsquo;s why we treat automation as a business decision, not a tech showcase. Every workflow we pick has to save real time or money.</p><blockquote>An automation that runs a hundred times a week quietly earns its keep in a way a flashy demo never will.</blockquote><h2>Five workflows worth automating first</h2><p>Across almost every team we work with, the same handful of workflows deliver the fastest payback:</p><ul><li><strong>Customer support triage</strong> — an AI chatbot resolves common questions and routes the rest.</li><li><strong>Lead capture &amp; qualification</strong> — new leads get scored, enriched and routed in seconds.</li><li><strong>Onboarding &amp; hand-offs</strong> — accounts, tasks and notifications set themselves up automatically.</li><li><strong>Document processing</strong> — invoices, forms and PDFs are read and entered without manual typing.</li><li><strong>Reporting &amp; updates</strong> — recurring reports and status updates generate and send themselves.</li></ul><h3>Why we build on your existing tools</h3><p>You don&rsquo;t need to replace your stack to adopt AI. We automate on top of the apps you already run, so your team keeps working the way they know while the busywork disappears in the background.</p><h3>How to get started</h3><p>You don&rsquo;t need a big budget or a data-science team to begin. The three AsheTag AI plans — <a href="pricing.html">Starter, Business and Enterprise</a> — are scoped to match where your operations are today, from your first workflow to automation at scale. If you&rsquo;re not sure which fits, the easiest next step is a quick, free chat.</p><p>Want to talk it through? <a href="contact-us.html">Get in touch</a> and we&rsquo;ll help you find the highest-ROI workflow to automate first — no pressure, no jargon.</p>',
      'bd.prev.strong': 'How to Measure the ROI of AI Automation',
      'bd.next.strong': 'Chatbots vs. AI Assistants: What Should You Deploy?',
      'bd.rel.0.tag': 'AI Support', 'bd.rel.0.title': 'Chatbots vs. AI Assistants: What Should You Deploy?',
      'bd.rel.1.tag': 'Integrations', 'bd.rel.1.title': 'Automating on the Tools You Already Use',
      'bd.rel.2.tag': 'Case Study', 'bd.rel.2.title': 'How We Cut a Team&rsquo;s Ops Time by 70% with AI'
    },

    /* -----------------------------------------------------------------
       className swaps  (icon updates where appropriate)
       ----------------------------------------------------------------- */
    cls: {
      /* Home service-card icons */
      'h.svc.0.ico': 'fa-solid fa-diagram-project',
      'h.svc.1.ico': 'fa-solid fa-robot',
      'h.svc.2.ico': 'fa-solid fa-bezier-curve',
      /* Services page block icons */
      'sv.0.ico': 'fa-solid fa-diagram-project',
      'sv.1.ico': 'fa-solid fa-robot',
      'sv.2.ico': 'fa-solid fa-bezier-curve',
      /* Hero floating icons */
      'h.hero.fico.0': 'fa-solid fa-bolt',
      'h.hero.fico.1': 'fa-solid fa-robot',
      'h.hero.fico.2': 'fa-solid fa-brain',
      /* Contact info icons */
      'ct.info.1.ico': 'fa-solid fa-location-dot',
      'ct.info.2.ico': 'fa-solid fa-globe',
      'ct.info.3.ico': 'fa-solid fa-wand-magic-sparkles'
    },

    /* -----------------------------------------------------------------
       image (src) swaps — AI mode uses a completely different photo set
       (AI / automation / data / robotics), none shared with Studio mode.
       All URLs verified reachable on images.unsplash.com.
       ----------------------------------------------------------------- */
    img: (function () {
      var U = function (id, w, q) {
        return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=' + w + '&q=' + q;
      };
      return {
        /* ---- Home hero ---- */
        'h.hero.img.main':  U('1677442136019-21780ecad995', 900, 80),
        'h.hero.img.left':  U('1620712943543-bcc4688e7485', 400, 80),
        'h.hero.img.right': U('1485827404703-89b55fcc595e', 400, 80),
        /* ---- Home service cards ---- */
        'h.svc.0.img': U('1635070041078-e363dbe005cb', 600, 80),
        'h.svc.1.img': U('1531746790731-6c087fecd65a', 600, 80),
        'h.svc.2.img': U('1591453089816-0fbb971b454c', 600, 80),
        /* ---- Home "why" visual ---- */
        'h.why.img': U('1550751827-4bd374c3f58b', 1400, 75),
        /* ---- Home portfolio ---- */
        'h.work.0.img': U('1518709268805-4e9042af9f23', 500, 80),
        'h.work.1.img': U('1639762681485-074b7f938ba0', 500, 80),
        'h.work.2.img': U('1488229297570-58520851e868', 500, 80),
        'h.work.3.img': U('1563986768609-322da13575f3', 500, 80),
        /* ---- Home about intro ---- */
        'h.about.img': U('1581091226825-a6a2a5aee158', 900, 80),

        /* ---- Shared mega-menu previews ---- */
        's.mm.about.0.img': U('1461749280684-dccba630e2f6', 800, 80),
        's.mm.about.1.img': U('1573164713714-d95e436ab8d6', 800, 80),
        's.mm.about.2.img': U('1555255707-c07966088b7b', 800, 80),
        's.mm.about.3.img': U('1517430816045-df4b7de11d1d', 800, 80),
        's.mm.services.0.img': U('1635070041078-e363dbe005cb', 800, 80),
        's.mm.services.1.img': U('1531746790731-6c087fecd65a', 800, 80),
        's.mm.services.2.img': U('1591453089816-0fbb971b454c', 800, 80),
        's.mm.pricing.0.img': U('1563986768609-322da13575f3', 800, 80),
        's.mm.pricing.1.img': U('1550439062-609e1531270e', 800, 80),
        's.mm.pricing.2.img': U('1550751827-4bd374c3f58b', 800, 80),
        's.mm.blog.0.img': U('1526378722484-bd91ca387e72', 800, 80),
        's.mm.blog.1.img': U('1518709268805-4e9042af9f23', 800, 80),
        's.mm.blog.2.img': U('1544197150-b99a580bb7a8', 800, 80),

        /* ---- Shared areas + CTA backgrounds ---- */
        's.areas.img': U('1451187580459-43490279c0fa', 1600, 70),
        's.cta.img':   U('1518709268805-4e9042af9f23', 1600, 80),

        /* ---- About page split media ---- */
        'ab.split1.img': U('1581091226825-a6a2a5aee158', 900, 80),
        'ab.split2.img': U('1573164713714-d95e436ab8d6', 900, 80),

        /* ---- Blog listing cards ---- */
        'bl.0.img': U('1526378722484-bd91ca387e72', 800, 80),
        'bl.1.img': U('1531746790731-6c087fecd65a', 800, 80),
        'bl.2.img': U('1518709268805-4e9042af9f23', 800, 80),
        'bl.3.img': U('1544197150-b99a580bb7a8', 800, 80),
        'bl.4.img': U('1550751827-4bd374c3f58b', 800, 80),
        'bl.5.img': U('1526374965328-7f61d4dc18c5', 800, 80),

        /* ---- Blog detail ---- */
        'bd.fig.img':   U('1677442136019-21780ecad995', 1200, 80),
        'bd.rel.0.img': U('1531746790731-6c087fecd65a', 800, 80),
        'bd.rel.1.img': U('1544197150-b99a580bb7a8', 800, 80),
        'bd.rel.2.img': U('1526378722484-bd91ca387e72', 800, 80)
      };
    })()
  }
};
