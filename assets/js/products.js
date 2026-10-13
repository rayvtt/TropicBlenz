/* Tropic Theory: shared catalogue data (PROTOTYPE).
   Every fruit, format, price and line of copy here is sample content for a
   front-end prototype. Prices are integers in minor units (cents) and are
   demo values only. Nothing here is a product, sourcing or availability claim. */
(function (w) {
  'use strict';

  var TT = w.TT = w.TT || {};

  // Pack formats. `order` drives sort order everywhere.
  var FORMATS = [
    {
      id: 'pouch-500', order: 1,
      name: 'Retail pouch', size: '500 g', short: '500 g pouch',
      packLabel: '500 G',
      use: 'A stand-up pouch with a zip-top concept, sized for the home freezer.'
    },
    {
      id: 'sachet-5x100', order: 2,
      name: 'Sachet strip', size: '5 × 100 g', short: '5 × 100 g sachets',
      packLabel: '5 × 100 G',
      use: 'Five slim single-blend portions. Tear one off, blend, done.'
    },
    {
      id: 'bag-1kg', order: 3,
      name: 'Food-service bag', size: '1 kg', short: '1 kg food-service bag',
      packLabel: '1 KG',
      use: 'A gusseted bag built for cafés, juice bars and busy kitchens.'
    },
    {
      id: 'tub-1kg', order: 4,
      name: 'Scoop tub', size: '1 kg', short: '1 kg scoop tub',
      packLabel: '1 KG',
      use: 'A lidded tub to scoop from, for bowls, desserts and the bar.'
    }
  ];

  /* Fruits. Colours drive the packaging concept:
     color  = pack field, tint = page stage behind the pack,
     accent = motif fill, ink = type on the pack, seed = small details. */
  var FRUITS = [
    {
      id: 'red-dragon-fruit', name: 'Red dragon fruit', packLines: ['Red dragon', 'fruit'],
      launch: true,
      color: '#D93672', tint: '#F6D8E2', accent: '#8E1846', ink: '#F8F4EA', seed: '#20231F',
      tagline: 'Magenta to the core.',
      description: 'The launch focus. Red-fleshed dragon fruit, frozen and ready to blend. Its colour arrives before the first sip: deep magenta, flecked with tiny black seeds, gently sweet and clean.',
      serve: 'Blend with banana and a splash of coconut water for a bowl that needs no filter.',
      prices: { 'pouch-500': 1290, 'sachet-5x100': 1190, 'bag-1kg': 2490, 'tub-1kg': 2790 }
    },
    {
      id: 'mango', name: 'Mango', packLines: ['Mango'],
      color: '#F5A623', tint: '#FBE7C2', accent: '#FFD98A', ink: '#20231F', seed: '#20231F',
      tagline: 'Golden, generous, fragrant.',
      description: 'Ripe mango, cut and frozen. The fruit that sets the tone for almost any blend: rich, round and fragrant.',
      serve: 'Blend thick with lime and a little yoghurt, or pour over ice with sparkling water.',
      prices: { 'pouch-500': 1090, 'sachet-5x100': 990, 'bag-1kg': 2190, 'tub-1kg': 2490 }
    },
    {
      id: 'passion-fruit', name: 'Passion fruit', packLines: ['Passion', 'fruit'],
      color: '#5B3768', tint: '#E5DBE9', accent: '#F5B83A', ink: '#F8F4EA', seed: '#20231F',
      tagline: 'Sharp, perfumed, unmistakable.',
      description: 'Passion fruit pulp with its seeds, frozen. A little goes a long way: bright, tart and heady.',
      serve: 'Spoon over a mango blend, or shake into a cooler for a sharp finish.',
      prices: { 'pouch-500': 1190, 'sachet-5x100': 1090, 'bag-1kg': 2390 }
    },
    {
      id: 'pineapple', name: 'Pineapple', packLines: ['Pineapple'],
      color: '#286747', tint: '#D5E5D8', accent: '#F2C94C', ink: '#F8F4EA', seed: '#286747',
      tagline: 'Bright, juicy, with bite.',
      description: 'Frozen pineapple pieces. Juicy and bright, with the acidity every blend needs.',
      serve: 'Pair with mango and passion fruit, or blend with mint and lime.',
      prices: { 'pouch-500': 990, 'sachet-5x100': 890, 'bag-1kg': 1990 }
    },
    {
      id: 'lychee', name: 'Lychee', packLines: ['Lychee'],
      color: '#F06F68', tint: '#FBDCD8', accent: '#FBF1EA', ink: '#20231F', seed: '#5A2E1E',
      tagline: 'Floral, cool, delicate.',
      description: 'Frozen lychee. Translucent, floral and cool, a quieter fruit that lifts everything around it.',
      serve: 'Blend with red dragon fruit and ice, or float in sparkling tea.',
      prices: { 'pouch-500': 1390, 'sachet-5x100': 1290, 'tub-1kg': 2890 }
    },
    {
      id: 'longan', name: 'Longan', packLines: ['Longan'],
      color: '#94653D', tint: '#EFE2D2', accent: '#F6EBDD', ink: '#F8F4EA', seed: '#20231F',
      tagline: 'Honeyed and musky.',
      description: 'Frozen longan. Smaller than lychee, deeper and more honeyed, with a soft musky note.',
      serve: 'Blend into chilled drinks or spoon over shaved ice.',
      prices: { 'pouch-500': 1390, 'sachet-5x100': 1290 }
    },
    {
      id: 'jackfruit', name: 'Jackfruit', packLines: ['Jackfruit'],
      color: '#EFC64B', tint: '#F8EDC6', accent: '#F59E1B', ink: '#20231F', seed: '#20231F',
      tagline: 'Tropical, bold, a little wild.',
      description: 'Ripe jackfruit, frozen. Bold and tropical, somewhere between banana, mango and pineapple.',
      serve: 'Blend with coconut milk for a thick shake, or fold into desserts.',
      prices: { 'pouch-500': 1190, 'bag-1kg': 2290 }
    },
    {
      id: 'soursop', name: 'Soursop', packLines: ['Soursop'],
      color: '#8FAE8A', tint: '#E2EBDF', accent: '#F7F3E8', ink: '#20231F', seed: '#20231F',
      tagline: 'Creamy, citrus-bright.',
      description: 'Frozen soursop pulp. Creamy and soft with a bright, citrus-like tang.',
      serve: 'Blend with milk or yoghurt and a squeeze of lime.',
      prices: { 'pouch-500': 1490, 'sachet-5x100': 1390, 'tub-1kg': 2990 }
    }
  ];

  var fruitById = {}, formatById = {};
  FRUITS.forEach(function (f) { fruitById[f.id] = f; });
  FORMATS.forEach(function (f) { formatById[f.id] = f; });

  function skuId(fruitId, formatId) { return fruitId + '--' + formatId; }

  // Returns a SKU object, or null when the fruit/format pair is not in the catalogue.
  function getSku(id) {
    var parts = String(id || '').split('--');
    var fruit = fruitById[parts[0]], format = formatById[parts[1]];
    if (!fruit || !format || typeof fruit.prices[format.id] !== 'number') return null;
    return {
      id: skuId(fruit.id, format.id),
      fruit: fruit,
      format: format,
      price: fruit.prices[format.id],
      title: fruit.name + ', ' + format.short,
      url: 'product.html?id=' + encodeURIComponent(fruit.id) + '&format=' + encodeURIComponent(format.id)
    };
  }

  // Formats a fruit is offered in, in canonical order.
  function formatsFor(fruit) {
    return FORMATS.filter(function (fm) { return typeof fruit.prices[fm.id] === 'number'; });
  }

  function allSkus() {
    var out = [];
    FRUITS.forEach(function (f) {
      formatsFor(f).forEach(function (fm) { out.push(getSku(skuId(f.id, fm.id))); });
    });
    return out;
  }

  // Integer minor units -> "$12.90". Demo currency display only.
  function money(minor) {
    var n = Math.round(Number(minor) || 0);
    var sign = n < 0 ? '-' : '';
    n = Math.abs(n);
    var major = Math.floor(n / 100), cents = n % 100;
    return sign + '$' + String(major).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + (cents < 10 ? '0' : '') + cents;
  }

  TT.catalog = {
    fruits: FRUITS,
    formats: FORMATS,
    getFruit: function (id) { return fruitById[id] || null; },
    getFormat: function (id) { return formatById[id] || null; },
    getSku: getSku,
    skuId: skuId,
    formatsFor: formatsFor,
    allSkus: allSkus,
    fromPrice: function (fruit) {
      return Math.min.apply(null, formatsFor(fruit).map(function (fm) { return fruit.prices[fm.id]; }));
    }
  };
  TT.money = money;
  TT.MAX_QTY = 20;
  TT.DELIVERY = [
    { id: 'standard', name: 'Standard delivery', note: 'Sample option', price: 690 },
    { id: 'express', name: 'Express delivery', note: 'Sample option', price: 1490 }
  ];

  // Small shared helper: HTML-escape for template strings.
  TT.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
})(window);
