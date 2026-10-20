/* TropicBlenz range landing page (range.html, range-vi.html).
   Mobile navigation, language links that keep the current section, and the demo enquiry form.
   Stands alone: it does not need the storefront scripts. */
(function (d) {
  'use strict';

  function initNav() {
    var toggle = d.querySelector('[data-nav-toggle]');
    var nav = d.querySelector('[data-nav]');
    if (!toggle || !nav) return;
    var label = toggle.querySelector('.nav-toggle__label');
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      label.textContent = open ? toggle.getAttribute('data-label-close') : toggle.getAttribute('data-label-open');
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Switching language keeps the reader on the same section: both pages share section ids.
  function initLangLinks() {
    d.querySelectorAll('[data-lang-link]').forEach(function (link) {
      link.addEventListener('click', function () {
        var base = link.getAttribute('href').split('#')[0];
        if (location.hash) link.setAttribute('href', base + location.hash);
      });
    });
  }

  // Demo enquiry form: validates, then confirms that nothing was sent or stored.
  function initEnquire() {
    var form = d.querySelector('[data-enquire]');
    if (!form) return;
    var status = form.querySelector('[data-form-status]');
    var checks = [
      { input: form.querySelector('#eq-name'), msg: form.getAttribute('data-err-name') },
      { input: form.querySelector('#eq-email'), msg: form.getAttribute('data-err-email') }
    ];
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      checks.forEach(function (c) {
        var ok = c.input.value.trim() !== '' && c.input.checkValidity();
        c.input.setAttribute('aria-invalid', ok ? 'false' : 'true');
        d.getElementById(c.input.getAttribute('aria-describedby')).textContent = ok ? '' : c.msg;
        if (!ok && !firstBad) firstBad = c.input;
      });
      if (firstBad) {
        status.textContent = '';
        firstBad.focus();
        return;
      }
      status.textContent = form.getAttribute('data-ok');
      form.reset();
    });
  }

  initNav();
  initLangLinks();
  initEnquire();
})(document);
