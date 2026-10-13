/* Tropic Theory prototype: shared page behaviour.
   Mobile navigation, demo newsletter form and pack placeholders.
   Page-specific logic lives in shop.js, product.js, cart-page.js and checkout.js. */
(function (w, d) {
  'use strict';

  var TT = w.TT, esc = TT.esc;

  // Product card markup: used by the shop grid and related products.
  TT.cardHTML = function (sku) {
    var f = sku.fruit, fm = sku.format;
    return '<li class="card" style="--tint:' + f.tint + '">' +
      '<a class="card__stage" href="' + esc(sku.url) + '" tabindex="-1" aria-hidden="true">' +
        TT.packs.render(f, fm.id, 'front', { decorative: true }) +
        (f.launch ? '<span class="card__badge">Launch focus</span>' : '') +
      '</a>' +
      '<div class="card__body">' +
        '<p class="card__concept">Packaging concept</p>' +
        '<h3 class="card__name"><a href="' + esc(sku.url) + '">' + esc(f.name) + '</a></h3>' +
        '<p class="card__meta">' + esc(fm.name) + ' · ' + esc(fm.size) + '</p>' +
        '<div class="card__buy">' +
          '<p class="card__price">' + TT.money(sku.price) + ' <span class="sample">Sample price</span></p>' +
          '<button class="btn btn--small btn--ink card__add" type="button" data-add-sku="' + esc(sku.id) + '" aria-label="Add ' + esc(sku.title) + ' to cart">Add</button>' +
        '</div>' +
      '</div>' +
    '</li>';
  };

  function initNav() {
    var toggle = d.querySelector('[data-nav-toggle]');
    var nav = d.querySelector('[data-nav]');
    if (!toggle || !nav) return;
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
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Demo newsletter: validates, then confirms that nothing was sent or stored.
  function initNewsletter() {
    d.querySelectorAll('[data-newsletter]').forEach(function (form) {
      var status = form.querySelector('[data-form-status]');
      var input = form.querySelector('input[type="email"]');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = input.checkValidity();
        input.setAttribute('aria-invalid', ok ? 'false' : 'true');
        if (!ok) {
          status.textContent = 'Please enter a valid email address.';
          input.focus();
          return;
        }
        status.textContent = 'Thank you. This is a demo, so your email was not sent or stored.';
        form.reset();
      });
    });
  }

  // Homepage range: one pouch per fruit, from the shared catalogue.
  function initRange() {
    var list = d.querySelector('[data-range]');
    if (!list) return;
    list.innerHTML = TT.catalog.fruits.map(function (f, i) {
      return '<li class="range-item" style="--tint:' + f.tint + '">' +
        '<a class="range-item__link" href="product.html?id=' + esc(f.id) + '">' +
          '<span class="range-item__stage">' + TT.packs.render(f, 'pouch-500', 'front', { decorative: true }) + '</span>' +
          '<span class="range-item__num">' + (i < 9 ? '0' : '') + (i + 1) + (f.launch ? ' · Launch focus' : '') + '</span>' +
          '<span class="range-item__name">' + esc(f.name) + '</span>' +
          '<span class="range-item__tag">' + esc(f.tagline) + '</span>' +
          '<span class="range-item__price">From ' + TT.money(TT.catalog.fromPrice(f)) + ' <span class="sample">Sample price</span></span>' +
        '</a></li>';
    }).join('');
  }

  function boot() {
    initNav();
    initNewsletter();
    initRange();
    if (TT.packs) TT.packs.hydrate(d);
    var year = d.querySelector('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot); else boot();
})(window, document);
