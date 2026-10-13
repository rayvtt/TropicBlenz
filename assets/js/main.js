// TropicBlendz prototype — progressive enhancement only.
(function () {
  // Mobile navigation toggle
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.nav-toggle__label').textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Enquiry form: prototype only, nothing is sent.
  var form = document.querySelector('[data-enquiry-form]');
  if (form) {
    var status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      form.querySelectorAll('input, select, textarea').forEach(function (el) {
        var ok = el.checkValidity();
        el.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        status.textContent = 'Please add your name and a valid email address.';
        firstInvalid.focus();
        return;
      }
      status.textContent = 'Thanks! This is a prototype, so your enquiry was not sent. A live contact route is coming soon.';
      form.reset();
    });
  }
})();
