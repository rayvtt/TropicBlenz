/* Tropic Theory: DEMO checkout.
   Contact -> delivery -> payment -> review -> confirmation.
   The form has no action and every submit is prevented. Typed details live only
   in the DOM of this page (never localStorage) and are reset on completion. */
(function (w, d) {
  'use strict';

  var TT = w.TT, esc = TT.esc;
  var STEPS = ['contact', 'delivery', 'payment', 'review'];

  function init() {
    var root = d.querySelector('[data-checkout]');
    if (!root) return;
    var form = d.querySelector('[data-checkout-form]');
    var emptyBox = d.querySelector('[data-checkout-empty]');
    var confirmBox = d.querySelector('[data-confirmation]');
    var current = 0, done = false;

    var status = d.createElement('p');
    status.className = 'visually-hidden';
    status.setAttribute('role', 'status');
    form.appendChild(status);

    // Delivery prices come from the shared data file.
    TT.DELIVERY.forEach(function (opt) {
      var input = form.querySelector('input[name="delivery"][value="' + opt.id + '"]');
      if (input) input.closest('.choice').querySelector('.choice__price').textContent = TT.money(opt.price);
    });

    function delivery() {
      var v = (form.querySelector('input[name="delivery"]:checked') || {}).value;
      return TT.DELIVERY.filter(function (o) { return o.id === v; })[0] || TT.DELIVERY[0];
    }
    function val(id) { return (d.getElementById(id).value || '').trim(); }

    function renderSummary() {
      var lines = TT.cart.lines();
      d.querySelector('[data-co-lines]').innerHTML = lines.map(function (l) {
        return '<li class="mini-line"><span class="mini-line__art" style="--tint:' + l.sku.fruit.tint + '">' +
          TT.packs.render(l.sku.fruit, l.sku.format.id, 'front', { decorative: true }) + '</span>' +
          '<span class="mini-line__name">' + esc(l.sku.fruit.name) + '<span class="mini-line__meta">' + esc(l.sku.format.short) + ' × ' + l.qty + '</span></span>' +
          '<span class="mini-line__total">' + TT.money(l.total) + '</span></li>';
      }).join('');
      var sub = TT.cart.subtotal(), del = delivery().price;
      d.querySelector('[data-co-subtotal]').textContent = TT.money(sub);
      d.querySelector('[data-co-delivery]').textContent = TT.money(del);
      d.querySelector('[data-co-total]').textContent = TT.money(sub + del);
    }

    function showEmpty() {
      root.hidden = true;
      emptyBox.innerHTML = '<div class="empty empty--page"><div class="empty__art">' +
        TT.packs.render('red-dragon-fruit', 'sachet-5x100', 'front', { decorative: true }) + '</div><div>' +
        '<p class="empty__title">Your cart is empty.</p><p>Add something to see the demo checkout flow.</p>' +
        '<div class="empty__actions"><a class="btn btn--ink" href="shop.html">Shop the range</a></div></div></div>';
      emptyBox.hidden = false;
    }

    function renderReview() {
      var del = delivery(), lines = TT.cart.lines();
      var phone = val('c-phone');
      d.querySelector('[data-review]').innerHTML =
        '<dl class="review__list">' +
          '<div class="review__row"><dt>Contact</dt><dd>' + esc(val('c-email')) + (phone ? '<br>' + esc(phone) : '') + '</dd><dd><button type="button" class="link-btn" data-goto="0">Edit<span class="visually-hidden"> contact</span></button></dd></div>' +
          '<div class="review__row"><dt>Deliver to</dt><dd>' + esc(val('d-first') + ' ' + val('d-last')) + '<br>' + esc(val('d-address')) + '<br>' + esc(val('d-city') + ' ' + val('d-postcode')) + '</dd><dd><button type="button" class="link-btn" data-goto="1">Edit<span class="visually-hidden"> delivery address</span></button></dd></div>' +
          '<div class="review__row"><dt>Delivery</dt><dd>' + esc(del.name) + ', ' + TT.money(del.price) + ' <span class="sample">Sample</span></dd><dd><button type="button" class="link-btn" data-goto="1">Edit<span class="visually-hidden"> delivery option</span></button></dd></div>' +
          '<div class="review__row"><dt>Payment</dt><dd>Demo: no payment is taken</dd><dd></dd></div>' +
          '<div class="review__row"><dt>Items</dt><dd>' + lines.map(function (l) { return l.qty + ' × ' + esc(l.sku.title); }).join('<br>') + '</dd><dd></dd></div>' +
        '</dl>';
    }

    function validateStep(i) {
      var fs = form.querySelector('[data-step="' + STEPS[i] + '"]');
      var firstBad = null;
      fs.querySelectorAll('input[required]').forEach(function (el) {
        var ok = el.checkValidity();
        el.setAttribute('aria-invalid', ok ? 'false' : 'true');
        var msg = fs.querySelector('[data-error-for="' + el.id + '"]');
        if (msg) {
          var label = form.querySelector('label[for="' + el.id + '"]').textContent.replace(/\s*\(optional\)/, '');
          msg.textContent = ok ? '' : (el.validity.valueMissing ? label + ' is required.' : 'Please enter a valid ' + label.toLowerCase() + '.');
        }
        if (!ok && !firstBad) firstBad = el;
      });
      if (firstBad) firstBad.focus();
      return !firstBad;
    }

    function go(i, focus) {
      current = Math.max(0, Math.min(STEPS.length - 1, i));
      STEPS.forEach(function (name, k) {
        form.querySelector('[data-step="' + name + '"]').hidden = k !== current;
        var tab = d.querySelector('[data-step-tab="' + name + '"]');
        tab.classList.toggle('is-done', k < current);
        if (k === current) tab.setAttribute('aria-current', 'step'); else tab.removeAttribute('aria-current');
      });
      if (STEPS[current] === 'review') renderReview();
      status.textContent = 'Step ' + (current + 1) + ' of 4: ' + STEPS[current].charAt(0).toUpperCase() + STEPS[current].slice(1);
      if (focus) {
        var fs = form.querySelector('[data-step="' + STEPS[current] + '"]');
        var target = fs.querySelector('input:not([disabled]), button');
        if (target) target.focus();
      }
    }

    function confirmOrder() {
      var count = TT.cart.count();
      var total = TT.cart.subtotal() + delivery().price;
      var ref = 'DEMO-' + Math.random().toString(36).slice(2, 6).toUpperCase();
      done = true;
      TT.cart.clear('Demo order placed. Your cart is now empty.');
      form.reset();
      d.querySelector('[data-review]').innerHTML = '';
      root.hidden = true;
      confirmBox.innerHTML =
        '<section class="confirm" aria-labelledby="confirm-title">' +
          '<div class="confirm__art">' + TT.packs.render('red-dragon-fruit', 'pouch-500', 'front', { decorative: true }) + '</div>' +
          '<div class="confirm__copy">' +
            '<p class="eyebrow">Demo order ' + ref + '</p>' +
            '<h2 id="confirm-title" class="section-title section-title--small" tabindex="-1">Thank you. That’s the whole flow.</h2>' +
            '<p class="confirm__lede">This was a demo: nothing was charged, nothing was sent, and the details you typed have been cleared. Your cart is now empty.</p>' +
            '<dl class="confirm__facts"><div><dt>Items</dt><dd data-confirm-items>' + count + '</dd></div>' +
            '<div><dt>Demo total</dt><dd data-confirm-total>' + TT.money(total) + ' <span class="sample">Sample price</span></dd></div></dl>' +
            '<div class="empty__actions"><a class="btn btn--ink" href="shop.html">Back to the shop</a><a class="link-arrow" href="index.html">Home</a></div>' +
          '</div>' +
        '</section>';
      confirmBox.hidden = false;
      d.title = 'Demo order complete | Tropic Theory';
      d.getElementById('confirm-title').focus();
    }

    form.addEventListener('click', function (e) {
      if (e.target.closest('[data-next]')) {
        if (validateStep(current)) go(current + 1, true);
      } else if (e.target.closest('[data-back]')) {
        go(current - 1, true);
      } else if (e.target.closest('[data-goto]')) {
        go(Number(e.target.closest('[data-goto]').getAttribute('data-goto')), true);
      }
    });
    form.addEventListener('change', function (e) { if (e.target.name === 'delivery') renderSummary(); });
    form.addEventListener('input', function (e) {
      if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
        e.target.setAttribute('aria-invalid', 'false');
        var msg = form.querySelector('[data-error-for="' + e.target.id + '"]');
        if (msg) msg.textContent = '';
      }
    });
    // Nothing is ever submitted: Enter advances a step, the final step confirms the demo.
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (current < STEPS.length - 1) {
        if (validateStep(current)) go(current + 1, true);
        return;
      }
      for (var i = 0; i < STEPS.length - 1; i++) {
        if (!validateStep(i)) { go(i, false); validateStep(i); return; }
      }
      confirmOrder();
    });

    d.addEventListener('tt:cart', function () {
      if (done) return;
      if (TT.cart.count() === 0) showEmpty(); else { renderSummary(); if (STEPS[current] === 'review') renderReview(); }
    });

    if (TT.cart.count() === 0) { showEmpty(); return; }
    root.hidden = false;
    renderSummary();
    go(0, false);
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})(window, document);
