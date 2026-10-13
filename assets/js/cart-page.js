/* Tropic Theory: full cart page (cart.html). Uses the shared line renderer from cart.js. */
(function (w, d) {
  'use strict';

  var TT = w.TT;

  function init() {
    var full = d.querySelector('[data-cart-full]');
    if (!full) return;
    var list = d.querySelector('[data-cart-lines]');
    var empty = d.querySelector('[data-cart-empty]');
    TT.cartUI.bind(list);

    function render() {
      var n = TT.cart.count();
      var wasFull = !full.hidden;
      full.hidden = n === 0;
      empty.hidden = n !== 0;
      TT.cartUI.renderPreservingFocus(list, function () {
        list.innerHTML = TT.cartUI.linesHTML(false);
      }, function () { return list.querySelector('[data-action]'); });
      d.querySelector('[data-cart-items]').textContent = String(n);
      d.querySelector('[data-cart-subtotal]').textContent = TT.money(TT.cart.subtotal());
      // Cart just emptied while the user was in it: move focus to the empty state.
      if (n === 0 && wasFull && (!d.activeElement || d.activeElement === d.body)) {
        var cta = empty.querySelector('a');
        if (cta) cta.focus();
      }
    }

    d.addEventListener('tt:cart', render);
    render();
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})(window, document);
