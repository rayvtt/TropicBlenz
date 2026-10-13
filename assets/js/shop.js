/* Tropic Theory: shop catalogue grid with fruit/format filters.
   Filters are mirrored to the URL (?fruit=&format=) so links can deep-link. */
(function (w, d) {
  'use strict';

  var TT = w.TT, esc = TT.esc;

  function init() {
    var grid = d.querySelector('[data-product-grid]');
    if (!grid) return;
    var fruitBox = d.querySelector('[data-filter="fruit"]');
    var formatBox = d.querySelector('[data-filter="format"]');
    var count = d.querySelector('[data-results-count]');
    var empty = d.querySelector('[data-shop-empty]');

    var params = new URLSearchParams(w.location.search);
    var state = {
      fruit: TT.catalog.getFruit(params.get('fruit')) ? params.get('fruit') : 'all',
      format: TT.catalog.getFormat(params.get('format')) ? params.get('format') : 'all'
    };

    function chips(box, key, options) {
      box.innerHTML = [{ id: 'all', name: 'All' }].concat(options).map(function (o) {
        return '<button type="button" class="chip" data-key="' + key + '" data-value="' + esc(o.id) + '" aria-pressed="' + (state[key] === o.id) + '">' + esc(o.name) + '</button>';
      }).join('');
    }
    chips(fruitBox, 'fruit', TT.catalog.fruits);
    chips(formatBox, 'format', TT.catalog.formats.map(function (f) { return { id: f.id, name: f.name + ' ' + f.size }; }));

    function render() {
      var list = TT.catalog.allSkus().filter(function (s) {
        return (state.fruit === 'all' || s.fruit.id === state.fruit) && (state.format === 'all' || s.format.id === state.format);
      });
      grid.innerHTML = list.map(TT.cardHTML).join('');
      empty.hidden = list.length > 0;
      count.textContent = list.length === 1 ? '1 pack' : list.length + ' packs';
      d.querySelectorAll('.chip').forEach(function (c) {
        c.setAttribute('aria-pressed', String(state[c.getAttribute('data-key')] === c.getAttribute('data-value')));
      });
      var q = new URLSearchParams();
      if (state.fruit !== 'all') q.set('fruit', state.fruit);
      if (state.format !== 'all') q.set('format', state.format);
      var qs = q.toString();
      try { w.history.replaceState(null, '', qs ? '?' + qs : w.location.pathname); } catch (e) { /* ignore */ }
    }

    d.querySelector('.filters').addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state[chip.getAttribute('data-key')] = chip.getAttribute('data-value');
      render();
    });
    d.querySelector('[data-filter-reset]').addEventListener('click', function () {
      state.fruit = 'all'; state.format = 'all';
      render();
      fruitBox.querySelector('.chip').focus();
    });

    render();
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})(window, document);
