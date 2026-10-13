/* Tropic Theory: demo cart.
   State is [{ sku, qty }] in localStorage; prices always come from products.js,
   so all maths uses integer minor units. Also renders the slide-in drawer,
   keeps the header count live and announces changes to screen readers. */
(function (w, d) {
  'use strict';

  var TT = w.TT;
  var KEY = 'tropic-theory-cart-v1';
  var items = load();

  /* ---------- Store ---------- */
  function clampQty(q) {
    q = Math.floor(Number(q));
    if (!isFinite(q) || q < 1) return 1;
    return Math.min(q, TT.MAX_QTY);
  }

  function load() {
    var raw = null;
    try { raw = JSON.parse(w.localStorage.getItem(KEY) || '[]'); } catch (e) { raw = []; }
    if (!Array.isArray(raw)) return [];
    var seen = {};
    return raw.filter(function (it) {
      if (!it || !TT.catalog.getSku(it.sku) || seen[it.sku]) return false;
      seen[it.sku] = true;
      return true;
    }).map(function (it) { return { sku: it.sku, qty: clampQty(it.qty) }; });
  }

  function save() {
    try { w.localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) { /* storage unavailable: cart lasts for this page only */ }
  }

  function find(sku) {
    for (var i = 0; i < items.length; i++) if (items[i].sku === sku) return items[i];
    return null;
  }

  function changed(message) {
    save();
    d.dispatchEvent(new CustomEvent('tt:cart', { detail: { message: message || '' } }));
  }

  var cart = {
    add: function (skuId, qty) {
      var sku = TT.catalog.getSku(skuId);
      if (!sku) return false;
      qty = clampQty(qty || 1);
      var line = find(skuId);
      var before = line ? line.qty : 0;
      if (line) line.qty = clampQty(line.qty + qty);
      else items.push({ sku: skuId, qty: qty });
      var after = find(skuId).qty;
      var msg = 'Added ' + (after - before) + ' × ' + sku.title + ' to your cart.';
      if (after - before < qty) msg += ' Maximum ' + TT.MAX_QTY + ' per item in this demo.';
      changed(msg);
      return true;
    },
    setQty: function (skuId, qty) {
      var line = find(skuId), sku = TT.catalog.getSku(skuId);
      if (!line || !sku) return;
      line.qty = clampQty(qty);
      changed(sku.title + ': quantity ' + line.qty + '.');
    },
    remove: function (skuId) {
      var sku = TT.catalog.getSku(skuId);
      items = items.filter(function (it) { return it.sku !== skuId; });
      changed((sku ? sku.title : 'Item') + ' removed from your cart.');
    },
    clear: function (message) { items = []; changed(message || 'Your cart is empty.'); },
    lines: function () {
      return items.map(function (it) {
        var sku = TT.catalog.getSku(it.sku);
        return { sku: sku, qty: it.qty, unit: sku.price, total: sku.price * it.qty };
      });
    },
    count: function () { return items.reduce(function (n, it) { return n + it.qty; }, 0); },
    subtotal: function () { return cart.lines().reduce(function (s, l) { return s + l.total; }, 0); },
    reload: function () { items = load(); changed(''); }
  };
  TT.cart = cart;

  // Keep tabs in sync.
  w.addEventListener('storage', function (e) { if (e.key === KEY) cart.reload(); });

  /* ---------- Shared line rendering (drawer + cart page) ---------- */
  function linesHTML(compact) {
    var esc = TT.esc, money = TT.money;
    return cart.lines().map(function (l) {
      var s = l.sku, id = esc(s.id), name = esc(s.fruit.name);
      return '<li class="line" data-line="' + id + '">' +
        '<a class="line__media" href="' + esc(s.url) + '" tabindex="-1" aria-hidden="true" style="--tint:' + s.fruit.tint + '">' +
          TT.packs.render(s.fruit, s.format.id, 'front', { decorative: true }) + '</a>' +
        '<div class="line__info">' +
          '<a class="line__name" href="' + esc(s.url) + '">' + name + '</a>' +
          '<p class="line__meta">' + esc(s.format.name) + ' · ' + esc(s.format.size) + '</p>' +
          '<p class="line__unit">' + money(l.unit) + ' each <span class="sample">Sample price</span></p>' +
        '</div>' +
        '<div class="line__qty stepper stepper--small">' +
          '<button type="button" class="stepper__btn" data-action="dec" data-sku="' + id + '" aria-label="Decrease quantity of ' + name + ', ' + esc(s.format.short) + '"' + (l.qty <= 1 ? ' disabled' : '') + '>−</button>' +
          '<label class="visually-hidden" for="q-' + (compact ? 'd-' : 'p-') + id + '">Quantity of ' + name + ', ' + esc(s.format.short) + '</label>' +
          '<input class="stepper__input" id="q-' + (compact ? 'd-' : 'p-') + id + '" type="number" inputmode="numeric" min="1" max="' + TT.MAX_QTY + '" value="' + l.qty + '" data-action="qty" data-sku="' + id + '">' +
          '<button type="button" class="stepper__btn" data-action="inc" data-sku="' + id + '" aria-label="Increase quantity of ' + name + ', ' + esc(s.format.short) + '"' + (l.qty >= TT.MAX_QTY ? ' disabled' : '') + '>+</button>' +
        '</div>' +
        '<p class="line__total" data-line-total>' + money(l.total) + '</p>' +
        '<button type="button" class="line__remove" data-action="remove" data-sku="' + id + '">Remove<span class="visually-hidden"> ' + name + ', ' + esc(s.format.short) + '</span></button>' +
      '</li>';
    }).join('');
  }

  // Wire +/−/input/remove inside a container (event delegation).
  function bindLineControls(container) {
    container.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-action]');
      if (!btn || !container.contains(btn)) return;
      var sku = btn.getAttribute('data-sku'), line = find(sku);
      if (!line) return;
      var act = btn.getAttribute('data-action');
      if (act === 'inc') cart.setQty(sku, line.qty + 1);
      else if (act === 'dec') cart.setQty(sku, line.qty - 1);
      else if (act === 'remove') cart.remove(sku);
    });
    container.addEventListener('change', function (e) {
      var input = e.target.closest('input[data-action="qty"]');
      if (input) cart.setQty(input.getAttribute('data-sku'), input.value);
    });
  }

  // Re-render while keeping keyboard focus on the equivalent control.
  function renderPreservingFocus(container, render, fallback) {
    var a = d.activeElement, key = null;
    if (a && container.contains(a) && a.getAttribute('data-sku')) key = [a.getAttribute('data-action'), a.getAttribute('data-sku')];
    render();
    if (!key) return;
    var target = container.querySelector('[data-action="' + key[0] + '"][data-sku="' + key[1] + '"]');
    if (target && target.disabled) target = container.querySelector('[data-action="qty"][data-sku="' + key[1] + '"]');
    if (!target) target = fallback();
    if (target) target.focus();
  }

  TT.cartUI = { linesHTML: linesHTML, bind: bindLineControls, renderPreservingFocus: renderPreservingFocus };

  /* ---------- Live region ---------- */
  var live;
  function announce(msg) {
    if (!live || !msg) return;
    live.textContent = '';
    // Small delay so repeated identical messages are still announced.
    w.setTimeout(function () { live.textContent = msg; }, 60);
  }

  /* ---------- Header count ---------- */
  function updateCount() {
    var n = cart.count();
    d.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = String(n); });
    d.querySelectorAll('[data-cart-open]').forEach(function (btn) {
      btn.setAttribute('aria-label', 'Cart, ' + n + (n === 1 ? ' item' : ' items'));
    });
  }

  /* ---------- Drawer ---------- */
  var drawer, panel, body, foot, lastFocus = null;

  function buildDrawer() {
    drawer = d.createElement('div');
    drawer.className = 'drawer';
    drawer.hidden = true;
    drawer.innerHTML =
      '<div class="drawer__scrim" data-drawer-close></div>' +
      '<div class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" tabindex="-1">' +
        '<div class="drawer__head">' +
          '<h2 id="drawer-title" class="drawer__title" tabindex="-1">Your cart</h2>' +
          '<button type="button" class="drawer__close" data-drawer-close aria-label="Close cart">Close</button>' +
        '</div>' +
        '<div class="drawer__body" data-drawer-body></div>' +
        '<div class="drawer__foot" data-drawer-foot></div>' +
      '</div>';
    d.body.appendChild(drawer);
    panel = drawer.querySelector('.drawer__panel');
    body = drawer.querySelector('[data-drawer-body]');
    foot = drawer.querySelector('[data-drawer-foot]');
    bindLineControls(body);
    drawer.addEventListener('click', function (e) { if (e.target.closest('[data-drawer-close]')) closeDrawer(); });
    drawer.addEventListener('keydown', trapKeys);
    renderDrawer();
  }

  function renderDrawer() {
    if (!drawer) return;
    var n = cart.count();
    renderPreservingFocus(body, function () {
      if (!n) {
        body.innerHTML = '<div class="empty empty--drawer">' +
          '<p class="empty__title">Your cart is empty.</p>' +
          '<p>Start with the launch fruit: frozen red dragon fruit.</p>' +
          '<a class="btn btn--ink" href="shop.html">Shop the range</a></div>';
        foot.innerHTML = '';
      } else {
        body.innerHTML = '<ul class="lines lines--compact">' + linesHTML(true) + '</ul>';
        foot.innerHTML =
          '<div class="summary-row summary-row--total"><span>Subtotal</span><span data-drawer-subtotal>' + TT.money(cart.subtotal()) + '</span></div>' +
          '<p class="fine">Sample prices for a demo. Nothing is charged or sent.</p>' +
          '<div class="drawer__actions"><a class="btn btn--ghost-ink" href="cart.html">View cart</a><a class="btn btn--ink" href="checkout.html">Checkout (demo)</a></div>';
      }
    }, function () { return body.querySelector('[data-action]') || d.getElementById('drawer-title'); });
    d.getElementById('drawer-title').textContent = 'Your cart' + (n ? ' (' + n + ')' : '');
  }

  function setInert(on) {
    d.querySelectorAll('body > *:not(.drawer):not(script)').forEach(function (el) {
      if (el === live) return;
      if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert');
    });
  }

  function openDrawer(opener) {
    if (!drawer) return;
    if (!drawer.hidden) { d.getElementById('drawer-title').focus(); return; }
    lastFocus = opener || d.activeElement;
    drawer.hidden = false;
    d.documentElement.classList.add('has-drawer');
    setInert(true);
    // next frame so the slide-in transition runs
    w.requestAnimationFrame(function () { drawer.classList.add('is-open'); });
    d.getElementById('drawer-title').focus();
  }

  function closeDrawer() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove('is-open');
    drawer.hidden = true;
    d.documentElement.classList.remove('has-drawer');
    setInert(false);
    var back = lastFocus && d.contains(lastFocus) ? lastFocus : d.querySelector('[data-cart-open]');
    if (back) back.focus();
  }

  function trapKeys(e) {
    if (e.key === 'Escape') { e.preventDefault(); closeDrawer(); return; }
    if (e.key !== 'Tab') return;
    var f = Array.prototype.filter.call(
      panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex="0"]'),
      function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (d.activeElement === first || d.activeElement === panel || d.activeElement.id === 'drawer-title')) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  TT.drawer = { open: openDrawer, close: closeDrawer, isOpen: function () { return drawer && !drawer.hidden; } };

  /* ---------- Boot ---------- */
  function boot() {
    live = d.createElement('div');
    live.className = 'visually-hidden';
    live.setAttribute('role', 'status');
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('data-cart-live', '');
    d.body.appendChild(live);

    buildDrawer();
    updateCount();

    d.addEventListener('click', function (e) {
      var opener = e.target.closest('[data-cart-open]');
      if (opener) { e.preventDefault(); openDrawer(opener); return; }
      // Quick add buttons: <button data-add-sku="fruit--format">
      var add = e.target.closest('[data-add-sku]');
      if (add) {
        if (cart.add(add.getAttribute('data-add-sku'), 1)) openDrawer(add);
      }
    });

    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && TT.drawer.isOpen()) closeDrawer();
    });

    d.addEventListener('tt:cart', function (e) {
      updateCount();
      renderDrawer();
      announce(e.detail && e.detail.message);
    });
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot); else boot();
})(window, document);
