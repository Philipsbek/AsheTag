/* =====================================================================
   AsheTag — DUAL-MODE MANAGER  (global state + theme + content switch)
   ---------------------------------------------------------------------
   Two complete experiences share the exact same markup, layout and
   animations:
     • "current"  → default Web-Studio site (copy lives in the HTML)
     • "ai"       → AI Workflow Automation site (copy from js/content.js)

   State is a single value in localStorage, mirrored onto
   <html data-mode="current|ai">. Because it's persisted, the chosen mode
   carries across real page navigations (this is a multi-page site) with
   no flash — an inline <head> script sets data-mode before first paint.

   This script:
     1. Captures each element's original markup once (the default copy).
     2. Applies / restores the AI copy via data-ck / data-ck-class hooks.
     3. Wires the premium nav switch with a smooth transition overlay.
   No component is duplicated — the same DOM is re-skinned and re-filled.
   ===================================================================== */
(function () {
  'use strict';

  var STORE_KEY = 'ashetag-mode';

  /* TEMP (Studio focus): the Studio/AI switcher is hidden in the nav, so
     force everyone onto the Studio site and forget any saved AI choice.
     To restore the switcher later: delete these two lines AND the
     `.mode-switch{display:none !important;}` rule in css/ai-mode.css. */
  try { localStorage.removeItem(STORE_KEY); } catch (e) {}
  document.documentElement.setAttribute('data-mode', 'current');

  var AI = (window.SITE_CONTENT && window.SITE_CONTENT.ai) || { html: {}, cls: {} };
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getMode() {
    try { return localStorage.getItem(STORE_KEY) === 'ai' ? 'ai' : 'current'; }
    catch (e) { return 'current'; }
  }
  function saveMode(mode) {
    try { localStorage.setItem(STORE_KEY, mode); } catch (e) {}
  }

  /* ---------- Content capture / apply / restore ---------- */
  function captureOriginals() {
    document.querySelectorAll('[data-ck]').forEach(function (el) {
      if (el.getAttribute('data-ck-cap') !== '1') {
        el.setAttribute('data-ck-cap', '1');
        el.__ckHTML = el.innerHTML;
      }
    });
    document.querySelectorAll('[data-ck-class]').forEach(function (el) {
      if (el.getAttribute('data-ck-clscap') !== '1') {
        el.setAttribute('data-ck-clscap', '1');
        el.__ckCls = el.className;
      }
    });
    document.querySelectorAll('[data-ck-img]').forEach(function (el) {
      if (el.getAttribute('data-ck-imgcap') !== '1') {
        el.setAttribute('data-ck-imgcap', '1');
        el.__ckSrc = el.getAttribute('src');
      }
    });
  }

  function applyContent(mode) {
    var useAI = mode === 'ai';
    document.querySelectorAll('[data-ck]').forEach(function (el) {
      var key = el.getAttribute('data-ck');
      if (useAI) {
        var v = AI.html[key];
        if (v !== undefined) el.innerHTML = v;
        else if (el.__ckHTML !== undefined) el.innerHTML = el.__ckHTML;
      } else if (el.__ckHTML !== undefined) {
        el.innerHTML = el.__ckHTML;
      }
    });
    document.querySelectorAll('[data-ck-class]').forEach(function (el) {
      var key = el.getAttribute('data-ck-class');
      if (useAI) {
        var v = AI.cls[key];
        if (v !== undefined) el.className = v;
        else if (el.__ckCls !== undefined) el.className = el.__ckCls;
      } else if (el.__ckCls !== undefined) {
        el.className = el.__ckCls;
      }
    });
    document.querySelectorAll('[data-ck-img]').forEach(function (el) {
      var key = el.getAttribute('data-ck-img');
      var img = (AI.img && AI.img[key]) || undefined;
      if (useAI && img !== undefined) {
        if (el.getAttribute('src') !== img) el.setAttribute('src', img);
      } else if (el.__ckSrc !== undefined && el.getAttribute('src') !== el.__ckSrc) {
        el.setAttribute('src', el.__ckSrc);
      }
    });
  }

  /* ---------- Reflect state onto the nav switch(es) ---------- */
  function syncSwitches(mode) {
    document.querySelectorAll('.mode-switch').forEach(function (btn) {
      btn.setAttribute('aria-checked', mode === 'ai' ? 'true' : 'false');
    });
  }

  /* ---------- Transition overlay ---------- */
  var fx = null;
  function ensureFx() {
    if (fx) return fx;
    fx = document.createElement('div');
    fx.className = 'mode-fx';
    fx.setAttribute('aria-hidden', 'true');
    fx.innerHTML = '<span class="mode-fx__label"><i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i><span class="mode-fx__text"></span></span>';
    document.body.appendChild(fx);
    return fx;
  }

  /* ---------- Apply a mode (with optional animation) ---------- */
  var busy = false;
  function setMode(mode, animate) {
    mode = mode === 'ai' ? 'ai' : 'current';

    function commit() {
      root.setAttribute('data-mode', mode);
      applyContent(mode);
      saveMode(mode);
      syncSwitches(mode);
      // Let other scripts (e.g. hero word cycler) know the DOM copy changed.
      window.dispatchEvent(new CustomEvent('ashetag:modechange', { detail: { mode: mode } }));
    }

    if (!animate || reduceMotion) {
      commit();
      return;
    }

    busy = true;
    var overlay = ensureFx();
    var label = overlay.querySelector('.mode-fx__text');
    var icon = overlay.querySelector('.mode-fx__label i');
    if (mode === 'ai') {
      if (label) label.textContent = 'AI Automation';
      if (icon) icon.className = 'fa-solid fa-robot';
    } else {
      if (label) label.textContent = 'Web Studio';
      if (icon) icon.className = 'fa-solid fa-palette';
    }

    // 1. fade overlay in
    overlay.classList.add('is-active');
    // 2. at the peak, swap theme + content behind the overlay
    setTimeout(function () {
      commit();
      var main = document.querySelector('body');
      // subtle settle-in on the re-skinned page
      // 3. fade overlay back out
      setTimeout(function () {
        overlay.classList.remove('is-active');
        busy = false;
      }, 220);
    }, 300);
  }

  function toggle() {
    if (busy) return;
    setMode(getMode() === 'ai' ? 'current' : 'ai', true);
  }

  /* ---------- Init ---------- */
  function init() {
    var mode = getMode();
    // data-mode is already set by the inline <head> script; keep it in sync.
    root.setAttribute('data-mode', mode);
    captureOriginals();
    applyContent(mode);
    syncSwitches(mode);

    document.querySelectorAll('.mode-switch').forEach(function (btn) {
      btn.addEventListener('click', toggle);
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
      });
    });
  }

  // Expose a tiny API (handy for debugging / future use).
  window.AsheTagMode = { get: getMode, set: function (m) { setMode(m, false); }, toggle: toggle };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
