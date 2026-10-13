/* Tropic Theory: data-driven product page.
   product.html?id=<fruit-id>&format=<format-id>. Unknown ids get a not-found state. */
(function (w, d) {
  'use strict';

  var TT = w.TT, esc = TT.esc, cat = TT.catalog;
  var DEFAULT_ID = 'red-dragon-fruit';

  function $(sel) { return d.querySelector(sel); }

  function setMeta(title, desc) {
    d.title = title;
    var m = d.querySelector('meta[name="description"]');
    if (m && desc) m.setAttribute('content', desc);
  }

  function notFound(id) {
    setMeta('Product not found | Tropic Theory', 'This Tropic Theory product could not be found. Browse the full range of frozen tropical fruit.');
    $('[data-crumb]').textContent = 'Not found';
    var box = $('[data-not-found]');
    box.innerHTML =
      '<section class="not-found" aria-labelledby="nf-title"><div class="wrap not-found__grid">' +
        '<div class="not-found__art" aria-hidden="true">' +
          '<svg viewBox="0 0 320 400" class="pack pack--ghost"><path d="M60 30 H260 V330 Q262 360 252 372 H68 Q58 360 60 330 Z" fill="none" stroke="#20231F" stroke-width="2" stroke-dasharray="6 6"/>' +
          '<path d="M70 80 H250" stroke="#20231F" stroke-opacity="0.3" stroke-width="2"/>' +
          '<text x="160" y="220" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-style="italic" font-size="34" fill="#20231F">Not here</text></svg>' +
        '</div>' +
        '<div class="not-found__copy">' +
          '<p class="eyebrow">Product not found</p>' +
          '<h1 id="nf-title" class="page-title">This pack isn’t on the shelf.</h1>' +
          '<p class="page-lede">We couldn’t find a product called “<span class="nf-id">' + esc(id) + '</span>”. The link may be mistyped, or the product may not be part of this prototype range.</p>' +
          '<div class="empty__actions"><a class="btn btn--ink" href="shop.html">Shop the range</a>' +
          '<a class="link-arrow" href="product.html?id=' + DEFAULT_ID + '">See red dragon fruit</a></div>' +
          '<p class="not-found__pick">Or pick a fruit</p>' +
          '<ul class="fruit-links">' + cat.fruits.map(function (f) {
            return '<li><a href="product.html?id=' + esc(f.id) + '" style="--swatch:' + f.color + '">' + esc(f.name) + '</a></li>';
          }).join('') + '</ul>' +
        '</div>' +
      '</div></section>';
    box.hidden = false;
  }

  function init() {
    if (!$('[data-pdp]')) return;
    var params = new URLSearchParams(w.location.search);
    var id = params.get('id');
    if (id === null || id === '') id = DEFAULT_ID;
    var fruit = cat.getFruit(id);
    if (!fruit) { notFound(id); return; }

    var formats = cat.formatsFor(fruit);
    var state = {
      format: formats.some(function (f) { return f.id === params.get('format'); }) ? params.get('format') : formats[0].id,
      view: 'front',
      qty: 1
    };

    // Static copy
    setMeta(fruit.name + ', frozen | Tropic Theory',
      'Tropic Theory frozen ' + fruit.name.toLowerCase() + ': packaging concept, formats and sample prices. ' + fruit.tagline + ' Prototype preview.');
    $('[data-crumb]').textContent = fruit.name;
    $('[data-pdp-eyebrow]').textContent = fruit.launch ? 'Launch focus · Frozen fruit' : 'Frozen fruit · Proposed range';
    $('[data-pdp-title]').textContent = fruit.name;
    $('[data-pdp-tagline]').textContent = fruit.tagline;
    $('[data-pdp-desc]').textContent = fruit.description;
    $('[data-pdp-serve]').textContent = fruit.serve;
    $('[data-pdp]').style.setProperty('--tint', fruit.tint);
    $('[data-pdp]').style.setProperty('--fruit', fruit.color);

    // Format picker
    var optBox = $('[data-format-options]');
    optBox.innerHTML = formats.map(function (fm) {
      return '<label class="format-opt">' +
        '<input type="radio" name="format" value="' + fm.id + '"' + (fm.id === state.format ? ' checked' : '') + '>' +
        '<span class="format-opt__box">' +
          '<span class="format-opt__name">' + esc(fm.name) + '</span>' +
          '<span class="format-opt__size">' + esc(fm.size) + '</span>' +
          '<span class="format-opt__price">' + TT.money(fruit.prices[fm.id]) + '</span>' +
        '</span></label>';
    }).join('');

    var stage = $('[data-gallery-stage]'), thumbs = $('[data-gallery-thumbs]'), caption = $('[data-gallery-caption]');
    var qtyInput = $('[data-qty]'), addBtn = $('[data-add-btn]');

    function sku() { return cat.getSku(cat.skuId(fruit.id, state.format)); }

    function renderGallery() {
      var fm = cat.getFormat(state.format);
      stage.innerHTML = TT.packs.render(fruit, fm.id, state.view);
      caption.textContent = (state.view === 'back' ? 'Back view, placeholder panels (copy TBC)' : 'Front view') + ' · ' + fm.short + '. Concept artwork, not final packaging.';
      var views = [{ format: fm.id, view: 'front', label: 'Front' }, { format: fm.id, view: 'back', label: 'Back' }]
        .concat(formats.filter(function (o) { return o.id !== fm.id; }).map(function (o) {
          return { format: o.id, view: 'front', label: o.size + ' ' + o.name.toLowerCase() };
        }));
      thumbs.innerHTML = views.map(function (v) {
        var current = v.format === state.format && v.view === state.view;
        return '<li><button type="button" class="thumb" data-format="' + v.format + '" data-view="' + v.view + '" aria-pressed="' + current + '">' +
          '<span class="thumb__art">' + TT.packs.render(fruit, v.format, v.view, { decorative: true }) + '</span>' +
          '<span class="thumb__label">' + esc(v.label) + '</span></button></li>';
      }).join('');
    }

    function renderPrice() {
      var s = sku();
      $('[data-pdp-price]').textContent = TT.money(s.price);
      $('[data-pdp-per]').textContent = 'per ' + s.format.short;
      addBtn.textContent = 'Add to cart · ' + TT.money(s.price * state.qty);
      qtyInput.value = String(state.qty);
      $('[data-qty-dec]').disabled = state.qty <= 1;
      $('[data-qty-inc]').disabled = state.qty >= TT.MAX_QTY;
    }

    function setFormat(fid, keepView) {
      state.format = fid;
      if (!keepView) state.view = 'front';
      var radio = optBox.querySelector('input[value="' + fid + '"]');
      if (radio) radio.checked = true;
      try {
        w.history.replaceState(null, '', '?id=' + encodeURIComponent(fruit.id) + '&format=' + encodeURIComponent(fid));
      } catch (e) { /* ignore */ }
      renderGallery();
      renderPrice();
    }

    function setQty(q) {
      q = Math.floor(Number(q));
      state.qty = isFinite(q) ? Math.max(1, Math.min(TT.MAX_QTY, q)) : 1;
      renderPrice();
    }

    optBox.addEventListener('change', function (e) { if (e.target.name === 'format') setFormat(e.target.value); });
    thumbs.addEventListener('click', function (e) {
      var b = e.target.closest('.thumb');
      if (!b) return;
      var sameFormat = b.getAttribute('data-format') === state.format;
      state.view = b.getAttribute('data-view');
      if (sameFormat) renderGallery(); else setFormat(b.getAttribute('data-format'), true);
      var again = thumbs.querySelector('.thumb[data-format="' + state.format + '"][data-view="' + state.view + '"]');
      if (again) again.focus();
    });
    $('[data-qty-dec]').addEventListener('click', function () {
      setQty(state.qty - 1);
      if (this.disabled) qtyInput.focus();
    });
    $('[data-qty-inc]').addEventListener('click', function () {
      setQty(state.qty + 1);
      if (this.disabled) qtyInput.focus();
    });
    qtyInput.addEventListener('change', function () { setQty(qtyInput.value); });
    $('[data-buy-form]').addEventListener('submit', function (e) {
      e.preventDefault();
      setQty(qtyInput.value);
      if (TT.cart.add(sku().id, state.qty)) TT.drawer.open(addBtn);
    });

    // Related: other fruits, in this format when offered, else their first format.
    var related = cat.fruits.filter(function (f) { return f.id !== fruit.id; }).slice(0, 4).map(function (f) {
      var fid = typeof f.prices[state.format] === 'number' ? state.format : cat.formatsFor(f)[0].id;
      return cat.getSku(cat.skuId(f.id, fid));
    });
    $('[data-related]').innerHTML = related.map(TT.cardHTML).join('');
    $('[data-related-section]').hidden = false;

    renderGallery();
    renderPrice();
    $('[data-pdp]').hidden = false;
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})(window, document);
