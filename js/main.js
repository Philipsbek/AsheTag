  // ===== Mobile menu toggle =====
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  var navToggleIcon = document.getElementById('navToggleIcon');

  navToggle.addEventListener('click', function () {
    var isOpen = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggleIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  document.querySelectorAll('.nav__mobile-link').forEach(function (link) {
    link.addEventListener('click', function () {
      navMobile.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
      navToggleIcon.className = 'fa-solid fa-bars';
    });
  });

  // ===== Hero interactivity =====
  (function () {
    var hero = document.getElementById('home');
    if (!hero) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isDesktop = window.matchMedia('(min-width: 768px)').matches;

    // --- Mouse-follow parallax on the floating background layer ---
    var heroBg = document.getElementById('heroBg');
    if (heroBg && !reduceMotion && isDesktop) {
      hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        heroBg.style.transform = 'translate(' + (x * 28) + 'px, ' + (y * 28) + 'px)';
      });
      hero.addEventListener('mouseleave', function () {
        heroBg.style.transform = 'translate(0, 0)';
      });
    }

    // --- 3D tilt on the browser-frame mockup ---
    var showcaseMain = document.getElementById('heroShowcaseMain');
    if (showcaseMain && !reduceMotion && isDesktop) {
      showcaseMain.addEventListener('mousemove', function (e) {
        var r = showcaseMain.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        showcaseMain.style.transform =
          'rotateY(' + (px * 12) + 'deg) rotateX(' + (-py * 12) + 'deg) scale(1.02)';
      });
      showcaseMain.addEventListener('mouseleave', function () {
        showcaseMain.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
      });
    }

    // --- Cycling headline word ---
    // Re-queried each tick so it survives a dual-mode content swap, and the
    // word list follows the active mode's messaging.
    if (!reduceMotion) {
      var wordsByMode = {
        current: ['Grow', 'Convert', 'Rank', 'Scale', 'Shine'],
        ai: ['Scale', 'Automate', 'Accelerate', 'Grow', 'Save Time']
      };
      var idx = 0;
      setInterval(function () {
        var wordEl = document.getElementById('heroWord');
        if (!wordEl) return;
        var mode = document.documentElement.getAttribute('data-mode') === 'ai' ? 'ai' : 'current';
        var words = wordsByMode[mode];
        idx = (idx + 1) % words.length;
        wordEl.classList.add('is-swapping');
        setTimeout(function () {
          var w = document.getElementById('heroWord');
          if (!w) return;
          w.textContent = words[idx];
          w.classList.remove('is-swapping');
        }, 280);
      }, 2600);
    }
  })();

  // ===== Animated counters =====
  (function () {
    var counters = document.querySelectorAll('.stat-count');
    if (!counters.length) return;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCount(el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      if (reduceMotion) {
        el.textContent = target;
        return;
      }
      var duration = 1200;
      var startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    var counterIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterIo.observe(el); });
  })();

  // ===== Confetti burst (WhatsApp button) =====
  (function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    var colors = ['#818CF8', '#7C3AED', '#A78BFA', '#7DD3FC', '#FFFFFF'];

    function burstConfetti(x, y) {
      for (var i = 0; i < 22; i++) {
        var piece = document.createElement('span');
        piece.className = 'confetti-piece';
        piece.style.left = x + 'px';
        piece.style.top = y + 'px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(piece);

        var angle = Math.random() * Math.PI * 2;
        var distance = 60 + Math.random() * 90;
        var dx = Math.cos(angle) * distance;
        var dy = Math.sin(angle) * distance - 40;
        var rotate = Math.random() * 540 - 270;
        var duration = 700 + Math.random() * 500;

        piece.animate([
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
          { transform: 'translate(' + dx + 'px, ' + (dy + 160) + 'px) rotate(' + rotate + 'deg)', opacity: 0 }
        ], { duration: duration, easing: 'cubic-bezier(.2,.7,.3,1)' });

        setTimeout(function (el) { return function () { el.remove(); }; }(piece), duration + 50);
      }
    }

    document.querySelectorAll('.wa-float__btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        burstConfetti(e.clientX, e.clientY);
      });
    });
  })();

  // ===== Magnetic primary buttons =====
  (function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (reduceMotion || !isDesktop) return;

    document.querySelectorAll('.btn--primary, .btn--signal').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (x * 0.18) + 'px, ' + (y * 0.3) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  })();

  // ===== Subtle tilt on cards =====
  (function () {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (reduceMotion || !isDesktop) return;

    document.querySelectorAll('.card, .price-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'translateY(-4px) rotateY(' + (px * 4) + 'deg) rotateX(' + (-py * 4) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  })();

  // ===== Scroll progress bar =====
  (function () {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  })();

  // ===== Portfolio filters =====
  (function () {
    var filters = document.querySelectorAll('.portfolio-filter');
    var items = document.querySelectorAll('.portfolio-item');
    if (!filters.length) return;

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        var filter = btn.getAttribute('data-filter');

        items.forEach(function (item) {
          var match = filter === 'all' || item.getAttribute('data-category') === filter;
          item.classList.toggle('is-hidden', !match);
        });
      });
    });
  })();

  // ===== Copy-to-clipboard (WhatsApp number) =====
  (function () {
    var trigger = document.getElementById('copyPhone');
    if (!trigger) return;

    function copyNumber() {
      var number = '+60 17-981 2010';
      var resetToast = function () {
        trigger.classList.add('is-copied');
        setTimeout(function () { trigger.classList.remove('is-copied'); }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(number).then(resetToast).catch(resetToast);
      } else {
        var temp = document.createElement('textarea');
        temp.value = number;
        document.body.appendChild(temp);
        temp.select();
        try { document.execCommand('copy'); } catch (err) {}
        document.body.removeChild(temp);
        resetToast();
      }
    }

    trigger.addEventListener('click', copyNumber);
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        copyNumber();
      }
    });
  })();

  // ===== FAQ accordion =====
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-item__q');
    var answer = item.querySelector('.faq-item__a');

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('is-open');
        other.querySelector('.faq-item__a').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ===== Scroll reveal =====
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // ===== Contact form (progressive enhancement) =====
  // NOTE: There is no server-side backend wired up. On submit this validates
  // the fields client-side and opens a pre-filled WhatsApp chat to the verified
  // AsheTag number so the enquiry still reaches the business. To collect
  // submissions by email instead, point the <form action> at a form service
  // (e.g. Formspree / Web3Forms) or your own endpoint — see contact-us.html.
  (function () {
    var form = document.getElementById('contactForm');
    if (!form) return;
    var status = document.getElementById('formStatus');
    var WA_NUMBER = '60179812010';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = (form.elements.name && form.elements.name.value || '').trim();
      var email = (form.elements.email && form.elements.email.value || '').trim();
      var service = (form.elements.service && form.elements.service.value || '').trim();
      var message = (form.elements.message && form.elements.message.value || '').trim();

      var lines = [
        'Hi AsheTag, I\'d like a free consultation.',
        '',
        'Name: ' + name,
        'Email: ' + email
      ];
      if (service) lines.push('Interested in: ' + service);
      if (message) lines.push('Details: ' + message);

      var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));

      if (status) {
        status.textContent = 'Thanks, ' + (name || 'there') + '! Opening WhatsApp so you can send your enquiry…';
        status.classList.add('is-visible');
      }
      window.open(url, '_blank', 'noopener');
      form.reset();
    });
  })();

  // ===== Apple-style mega menu (desktop) =====
  (function () {
    var nav = document.getElementById('siteNav');
    var megawrap = document.getElementById('megawrap');
    var scrim = document.getElementById('navScrim');
    if (!nav || !megawrap || !scrim) return;

    var items = [].slice.call(document.querySelectorAll('.nav__item--has-menu'));
    if (!items.length) return;

    var panels = {};
    [].forEach.call(document.querySelectorAll('.megamenu'), function (p) {
      panels[p.getAttribute('data-panel')] = p;
    });

    var closeTimer = null;
    var current = null;

    function activateFirst(panel) {
      panel.querySelectorAll('.megamenu__link').forEach(function (l, i) { l.classList.toggle('is-active', i === 0); });
      panel.querySelectorAll('.mm-media').forEach(function (m, i) { m.classList.toggle('is-active', i === 0); });
    }

    function open(key) {
      clearTimeout(closeTimer);
      if (!panels[key] || current === key) { current = key; return; }
      current = key;
      Object.keys(panels).forEach(function (k) { panels[k].classList.toggle('is-active', k === key); });
      activateFirst(panels[key]);
      megawrap.classList.add('is-open');
      scrim.classList.add('is-visible');
      items.forEach(function (it) {
        var on = it.getAttribute('data-menu') === key;
        it.classList.toggle('is-open', on);
        var link = it.querySelector('.nav__link');
        if (link) link.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    }

    function close() {
      clearTimeout(closeTimer);
      current = null;
      megawrap.classList.remove('is-open');
      scrim.classList.remove('is-visible');
      items.forEach(function (it) {
        it.classList.remove('is-open');
        var l = it.querySelector('.nav__link');
        if (l) l.setAttribute('aria-expanded', 'false');
      });
    }

    function scheduleClose() { clearTimeout(closeTimer); closeTimer = setTimeout(close, 160); }

    items.forEach(function (it) {
      var key = it.getAttribute('data-menu');
      it.addEventListener('mouseenter', function () { open(key); });
      it.addEventListener('mouseleave', scheduleClose);
      var link = it.querySelector('.nav__link');
      if (link) link.addEventListener('focus', function () { open(key); });
    });

    megawrap.addEventListener('mouseenter', function () { clearTimeout(closeTimer); });
    megawrap.addEventListener('mouseleave', scheduleClose);
    scrim.addEventListener('click', close);

    // Cross-fade the preview image as each link is hovered / focused
    document.querySelectorAll('.megamenu__link[data-mm]').forEach(function (link) {
      function activate() {
        var key = link.getAttribute('data-mm');
        var panel = link.closest('.megamenu');
        if (!panel) return;
        panel.querySelectorAll('.megamenu__link').forEach(function (l) { l.classList.toggle('is-active', l === link); });
        panel.querySelectorAll('.mm-media').forEach(function (m) { m.classList.toggle('is-active', m.getAttribute('data-mm') === key); });
      }
      link.addEventListener('mouseenter', activate);
      link.addEventListener('focus', activate);
    });

    // Keyboard + scroll dismissal
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('focusin', function (e) {
      if (!current) return;
      if (e.target.closest('.nav__item--has-menu') || e.target.closest('.megawrap')) return;
      close();
    });
    window.addEventListener('scroll', function () { if (current) close(); }, { passive: true });
  })();

  // ===== Mobile nav accordion =====
  (function () {
    var parents = document.querySelectorAll('.nav__mobile-parent');
    if (!parents.length) return;

    parents.forEach(function (btn) {
      var item = btn.closest('.nav__mobile-item');
      var sub = item ? item.querySelector('.nav__mobile-sub') : null;
      if (!sub) return;
      btn.addEventListener('click', function () {
        var isOpen = item.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        sub.style.maxHeight = isOpen ? sub.scrollHeight + 'px' : null;
      });
    });

    // Close the whole mobile menu once a sub-link is chosen
    var navMobile = document.getElementById('navMobile');
    var navToggle = document.getElementById('navToggle');
    var navToggleIcon = document.getElementById('navToggleIcon');
    document.querySelectorAll('.nav__mobile-sublink').forEach(function (a) {
      a.addEventListener('click', function () {
        if (navMobile) navMobile.classList.remove('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', false);
        if (navToggleIcon) navToggleIcon.className = 'fa-solid fa-bars';
      });
    });
  })();
