/* Tropic Theory: packaging CONCEPT renderer.
   TT.packs.render(fruit, formatId, view, opts) returns an inline SVG string.
   One design language for every pack: a flat fruit-colour field, a hairline
   frame, a letterspaced wordmark, a line-drawn fruit motif and an italic
   Fraunces fruit name. Formats differ by silhouette only.
   All artwork is concept illustration, not final packaging. */
(function (w) {
  'use strict';

  var TT = w.TT = w.TT || {};
  var esc = TT.esc;
  var uid = 0;

  var INK = '#20231F', COCONUT = '#F8F4EA', KRAFT = '#ECE3CF', DRAGON = '#D93672';
  var SERIF = "Fraunces, Georgia, 'Times New Roman', serif";
  var SANS = "Manrope, system-ui, -apple-system, 'Segoe UI', sans-serif";

  // Deterministic pseudo-random so seeds/stipple never shift between renders.
  function rng(seed) {
    var s = seed >>> 0;
    return function () { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  }
  function r1(n) { return Math.round(n * 10) / 10; }

  // Scatter `count` points inside an ellipse.
  function scatter(seed, count, cx, cy, rx, ry) {
    var rand = rng(seed), pts = [], guard = 0;
    while (pts.length < count && guard++ < count * 20) {
      var x = rand() * 2 - 1, y = rand() * 2 - 1;
      if (x * x + y * y <= 0.86) pts.push([r1(cx + x * rx), r1(cy + y * ry)]);
    }
    return pts;
  }

  /* ---------- Fruit motifs: drawn in a 100 x 100 box ---------- */
  var MOTIFS = {
    'red-dragon-fruit': function (c) {
      var seeds = scatter(11, 44, 50, 53, 25, 34).map(function (p) {
        return '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="0.9" ry="1.3"/>';
      }).join('');
      return '<g fill="none" stroke="' + c.ink + '" stroke-width="1.5" stroke-linecap="round">' +
        '<path d="M50 10 Q47 3 41 1"/><path d="M22 24 Q14 18 8 20"/><path d="M78 24 Q86 18 92 20"/>' +
        '<path d="M17 74 Q9 79 8 86"/><path d="M83 74 Q91 79 92 86"/><path d="M50 96 Q53 99 58 99"/></g>' +
        '<ellipse cx="50" cy="53" rx="35" ry="43" fill="none" stroke="' + c.ink + '" stroke-width="1.6"/>' +
        '<ellipse cx="50" cy="53" rx="29.5" ry="37.5" fill="' + c.accent + '"/>' +
        '<g fill="' + c.seed + '" opacity="0.9">' + seeds + '</g>';
    },
    'mango': function (c, id) {
      var shape = 'M53 9 C78 11 92 38 88 62 C84 84 64 96 46 94 C26 92 12 76 14 56 C16 34 30 8 53 9 Z';
      var grid = '';
      for (var i = -60; i <= 160; i += 11) {
        grid += '<path d="M' + i + ' 0 L' + (i + 100) + ' 100"/><path d="M' + (i + 100) + ' 0 L' + i + ' 100"/>';
      }
      return '<defs><clipPath id="' + id + '-m"><path d="' + shape + '"/></clipPath></defs>' +
        '<path d="' + shape + '" fill="' + c.accent + '"/>' +
        '<g clip-path="url(#' + id + '-m)" stroke="' + c.color + '" stroke-width="1.1" opacity="0.9">' + grid + '</g>' +
        '<path d="' + shape + '" fill="none" stroke="' + c.ink + '" stroke-width="1.6"/>' +
        '<path d="M53 9 Q56 3 62 1" fill="none" stroke="' + c.ink + '" stroke-width="1.6" stroke-linecap="round"/>';
    },
    'passion-fruit': function (c) {
      var seeds = '', rings = [[9, 6], [17, 11], [25, 16]];
      rings.forEach(function (ring, k) {
        for (var i = 0; i < ring[1]; i++) {
          var a = (i / ring[1]) * Math.PI * 2 + k * 0.4;
          var x = r1(50 + Math.cos(a) * ring[0]), y = r1(50 + Math.sin(a) * ring[0]);
          seeds += '<ellipse cx="' + x + '" cy="' + y + '" rx="1.4" ry="2.4" transform="rotate(' + r1(a * 57.3 + 90) + ' ' + x + ' ' + y + ')"/>';
        }
      });
      return '<circle cx="50" cy="50" r="41" fill="none" stroke="' + c.ink + '" stroke-width="1.6"/>' +
        '<circle cx="50" cy="50" r="34" fill="' + c.accent + '"/>' +
        '<g fill="' + c.seed + '">' + seeds + '<circle cx="50" cy="50" r="2"/></g>';
    },
    'pineapple': function (c, id) {
      var body = '<ellipse cx="50" cy="64" rx="25" ry="32"/>', grid = '';
      for (var i = -40; i <= 140; i += 9) {
        grid += '<path d="M' + i + ' 30 L' + (i + 70) + ' 100"/><path d="M' + (i + 70) + ' 30 L' + i + ' 100"/>';
      }
      return '<defs><clipPath id="' + id + '-p">' + body + '</clipPath></defs>' +
        '<ellipse cx="50" cy="64" rx="25" ry="32" fill="' + c.accent + '"/>' +
        '<g clip-path="url(#' + id + '-p)" stroke="' + c.color + '" stroke-width="1.2">' + grid + '</g>' +
        '<ellipse cx="50" cy="64" rx="25" ry="32" fill="none" stroke="' + c.ink + '" stroke-width="1.6"/>' +
        '<g fill="none" stroke="' + c.ink + '" stroke-width="1.6" stroke-linecap="round">' +
        '<path d="M50 32 Q48 16 50 2"/><path d="M49 32 Q40 17 31 9"/><path d="M51 32 Q60 17 69 9"/>' +
        '<path d="M48 32 Q36 25 24 24"/><path d="M52 32 Q64 25 76 24"/></g>';
    },
    'lychee': function (c) {
      return '<circle cx="50" cy="54" r="40" fill="none" stroke="' + c.ink + '" stroke-width="2.4" stroke-dasharray="0.1 4.2" stroke-linecap="round"/>' +
        '<circle cx="50" cy="54" r="36" fill="none" stroke="' + c.ink + '" stroke-width="1.6"/>' +
        '<circle cx="50" cy="54" r="30" fill="' + c.accent + '"/>' +
        '<ellipse cx="50" cy="56" rx="9" ry="13" fill="' + c.seed + '"/>' +
        '<path d="M34 40 Q38 33 46 31" fill="none" stroke="' + c.color + '" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>' +
        '<path d="M50 18 Q52 9 59 4" fill="none" stroke="' + c.ink + '" stroke-width="1.6" stroke-linecap="round"/>';
    },
    'longan': function (c) {
      var whole = '#B98B60';
      return '<g fill="none" stroke="' + c.ink + '" stroke-width="1.5" stroke-linecap="round">' +
        '<path d="M8 10 Q50 2 92 14"/><path d="M30 8 L30 34"/><path d="M67 8 L66 29"/><path d="M50 5 Q51 30 50 60"/></g>' +
        '<circle cx="30" cy="50" r="17" fill="' + whole + '" stroke="' + c.ink + '" stroke-width="1.5"/>' +
        '<circle cx="66" cy="45" r="17" fill="' + whole + '" stroke="' + c.ink + '" stroke-width="1.5"/>' +
        '<circle cx="50" cy="77" r="19" fill="none" stroke="' + c.ink + '" stroke-width="1.5"/>' +
        '<circle cx="50" cy="77" r="15" fill="' + c.accent + '"/>' +
        '<circle cx="50" cy="77" r="6.5" fill="' + c.seed + '"/>' +
        '<circle cx="48" cy="75" r="1.6" fill="' + c.accent + '"/>';
    },
    'jackfruit': function (c, id) {
      var dots = '', rand = rng(5);
      for (var y = 14; y < 96; y += 5.2) {
        for (var x = 16; x < 50; x += 5.2) {
          dots += '<circle cx="' + r1(x + ((y / 5.2) % 2) * 2.6) + '" cy="' + r1(y + rand()) + '" r="1"/>';
        }
      }
      return '<defs><clipPath id="' + id + '-j"><ellipse cx="50" cy="54" rx="32" ry="43"/></clipPath></defs>' +
        '<g clip-path="url(#' + id + '-j)">' +
        '<rect x="50" y="0" width="50" height="100" fill="' + c.accent + '"/>' +
        '<g fill="' + c.ink + '" opacity="0.75">' + dots + '</g>' +
        '<g fill="#F8D886" stroke="' + c.ink + '" stroke-width="1">' +
        '<ellipse cx="66" cy="29" rx="12" ry="10"/><ellipse cx="68" cy="53" rx="13" ry="11"/><ellipse cx="66" cy="77" rx="12" ry="10"/></g></g>' +
        '<ellipse cx="50" cy="54" rx="32" ry="43" fill="none" stroke="' + c.ink + '" stroke-width="1.6"/>' +
        '<path d="M50 11 L50 97" stroke="' + c.ink + '" stroke-width="1.2"/>' +
        '<path d="M50 11 Q49 5 53 1" fill="none" stroke="' + c.ink + '" stroke-width="1.6" stroke-linecap="round"/>';
    },
    'soursop': function (c) {
      var shape = 'M50 95 C24 84 12 60 16 39 C20 19 36 9 50 15 C64 9 80 19 84 39 C88 60 76 84 50 95 Z';
      var seeds = [[40, 42, -20], [60, 44, 20], [36, 60, -10], [50, 58, 0], [64, 62, 15], [44, 76, -15], [57, 77, 10]]
        .map(function (s) { return '<ellipse cx="' + s[0] + '" cy="' + s[1] + '" rx="2.6" ry="4.2" transform="rotate(' + s[2] + ' ' + s[0] + ' ' + s[1] + ')"/>'; }).join('');
      return '<path d="' + shape + '" fill="none" stroke="' + c.ink + '" stroke-width="2.6" stroke-dasharray="0.1 5" stroke-linecap="round" transform="translate(50 54) scale(1.09) translate(-50 -54)"/>' +
        '<path d="' + shape + '" fill="' + c.accent + '" stroke="' + c.ink + '" stroke-width="1.6"/>' +
        '<g fill="' + c.seed + '">' + seeds + '</g>' +
        '<path d="M50 15 Q48 7 53 2" fill="none" stroke="' + c.ink + '" stroke-width="1.6" stroke-linecap="round"/>';
    }
  };

  function motif(fruit, id) {
    var fn = MOTIFS[fruit.id] || MOTIFS['mango'];
    return fn(fruit, id);
  }

  /* ---------- Front label: drawn in a 200 x 300 box ---------- */
  function nameSize(lines, max, width) {
    var longest = Math.max.apply(null, lines.map(function (l) { return l.length; }));
    return Math.min(max, r1(width / (longest * 0.5)));
  }

  function frontLabel(fruit, format, id) {
    var lines = fruit.packLines;
    var size = nameSize(lines, 33, 186);
    var nameY = lines.length > 1 ? 222 : 240;
    var name = lines.map(function (l, i) {
      return '<tspan x="100" y="' + (nameY + i * size * 0.98) + '">' + esc(l) + '</tspan>';
    }).join('');
    return '<g fill="' + fruit.ink + '">' +
      '<text x="100" y="20" text-anchor="middle" font-family="' + SANS + '" font-weight="700" font-size="10.5" letter-spacing="3.4">TROPIC THEORY</text>' +
      '<path d="M88 32 H112" stroke="' + fruit.ink + '" stroke-width="1"/>' +
      '<g transform="translate(38 48) scale(1.24)">' + motif(fruit, id) + '</g>' +
      '<text text-anchor="middle" font-family="' + SERIF + '" font-style="italic" font-weight="400" font-size="' + size + '" letter-spacing="-0.6">' + name + '</text>' +
      '<text x="100" y="290" text-anchor="middle" font-family="' + SANS + '" font-weight="700" font-size="9.5" letter-spacing="2.6">FROZEN FRUIT · ' + esc(format.packLabel) + '</text>' +
      '</g>';
  }

  /* ---------- Back label: drawn in a 200 x 300 box ---------- */
  function backLabel(fruit, format) {
    function box(y, title) {
      return '<rect x="14" y="' + y + '" width="172" height="46" fill="none" stroke="' + INK + '" stroke-opacity="0.35"/>' +
        '<text x="24" y="' + (y + 18) + '" font-family="' + SANS + '" font-weight="700" font-size="8.5" letter-spacing="1.6" fill="' + INK + '">' + title + '</text>' +
        '<text x="24" y="' + (y + 34) + '" font-family="' + SERIF + '" font-style="italic" font-size="10" fill="' + DRAGON + '">Concept: copy TBC</text>';
    }
    return '<rect x="0" y="0" width="200" height="300" fill="' + COCONUT + '"/>' +
      '<text x="100" y="28" text-anchor="middle" font-family="' + SANS + '" font-weight="700" font-size="10" letter-spacing="3.2" fill="' + INK + '">TROPIC THEORY</text>' +
      '<text x="100" y="47" text-anchor="middle" font-family="' + SERIF + '" font-style="italic" font-size="13" fill="' + INK + '">Better Blends Begin Here.</text>' +
      '<rect x="14" y="60" width="172" height="4" fill="' + fruit.color + '"/>' +
      box(76, 'INGREDIENTS') + box(130, 'STORAGE &amp; USE') + box(184, 'NUTRITION INFORMATION') +
      '<text x="14" y="258" font-family="' + SANS + '" font-weight="700" font-size="8.5" letter-spacing="1.6" fill="' + INK + '">' + esc(fruit.name.toUpperCase()) + '</text>' +
      '<text x="14" y="272" font-family="' + SANS + '" font-weight="700" font-size="8.5" letter-spacing="1.6" fill="' + INK + '">NET ' + esc(format.packLabel) + '</text>' +
      '<rect x="120" y="244" width="66" height="40" fill="none" stroke="' + INK + '" stroke-opacity="0.35" stroke-dasharray="3 2"/>' +
      '<text x="153" y="268" text-anchor="middle" font-family="' + SANS + '" font-size="8" fill="' + INK + '">Barcode TBC</text>';
  }

  // Place a 200 x 300 label group into a panel, scaled to fit and centred.
  function place(inner, x, y, wd, ht) {
    var s = Math.min(wd / 200, ht / 300);
    var ox = r1(x + (wd - 200 * s) / 2), oy = r1(y + (ht - 300 * s) / 2);
    return '<g transform="translate(' + ox + ' ' + oy + ') scale(' + r1(s * 1000) / 1000 + ')">' + inner + '</g>';
  }

  function sheen(id) {
    return '<linearGradient id="' + id + '-sh" x1="0" x2="1" y1="0" y2="0">' +
      '<stop offset="0" stop-color="#fff" stop-opacity="0.22"/><stop offset="0.16" stop-color="#fff" stop-opacity="0"/>' +
      '<stop offset="0.78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.16"/></linearGradient>';
  }
  function crimp(x1, x2, y1, y2, color) {
    var d = '';
    for (var x = x1 + 3; x < x2; x += 4) d += 'M' + x + ' ' + y1 + 'V' + y2;
    return '<path d="' + d + '" stroke="' + color + '" stroke-opacity="0.18" stroke-width="1"/>';
  }

  /* ---------- Formats: each draws into a 320 x 400 canvas ---------- */
  var FORMAT_ART = {
    'pouch-500': function (fruit, format, view, id) {
      var body = 'M64 30 H256 L257 58 C263 130 266 250 264 336 C263 360 254 372 238 373 Q160 378 82 373 C66 372 57 360 56 336 C54 250 57 130 63 58 Z';
      var label = view === 'back' ? place(backLabel(fruit, format), 74, 88, 172, 266) : place(frontLabel(fruit, format, id), 70, 90, 180, 272);
      return '<defs>' + sheen(id) +
        '<mask id="' + id + '-n"><rect width="320" height="400" fill="#fff"/><path d="M262 60 L253 66 L262 72 Z" fill="#000"/><path d="M58 60 L67 66 L58 72 Z" fill="#000"/></mask></defs>' +
        '<g mask="url(#' + id + '-n)">' +
        '<path d="' + body + '" fill="' + fruit.color + '"/>' +
        crimp(64, 256, 32, 54, INK) +
        '<path d="M63 57 H257" stroke="' + INK + '" stroke-opacity="0.2"/>' +
        '<path d="M70 80 H250" stroke="' + INK + '" stroke-opacity="0.28" stroke-width="2"/>' +
        '<path d="M70 83.5 H250" stroke="#fff" stroke-opacity="0.25"/>' +
        '<path d="M62 340 Q160 354 258 340" fill="none" stroke="' + INK + '" stroke-opacity="0.2"/>' +
        '<path d="M58 300 Q57 200 62 90" fill="none" stroke="#fff" stroke-opacity="0.22" stroke-width="3" stroke-linecap="round"/>' +
        label +
        '<path d="' + body + '" fill="url(#' + id + '-sh)"/>' +
        '</g>';
    },

    'sachet-5x100': function (fruit, format, view, id) {
      var x0 = 35, sw = 50, n = 5, top = 40, bot = 368;
      var zz = function (y, dir) {
        var d = '';
        for (var x = x0 + 250; x >= x0; x -= 5) d += 'L' + x + ' ' + (y + (((x - x0) / 5) % 2 ? dir * 3 : 0));
        return d;
      };
      // zig-zag top edge left->right, straight sides, zig-zag bottom right->left
      var topEdge = '';
      for (var x = x0; x <= x0 + 250; x += 5) topEdge += (x === x0 ? 'M' : 'L') + x + ' ' + (top + (((x - x0) / 5) % 2 ? 3 : 0));
      var outline = topEdge + 'L' + (x0 + 250) + ' ' + bot + zz(bot, -1) + 'Z';
      var parts = '';
      for (var i = 0; i < n; i++) {
        var cx = x0 + sw * i + sw / 2;
        if (i % 2) parts += '<rect x="' + (x0 + sw * i) + '" y="' + top + '" width="' + sw + '" height="' + (bot - top) + '" fill="#000" opacity="0.045"/>';
        if (view === 'back') {
          parts += '<rect x="' + (cx - 19) + '" y="74" width="38" height="262" fill="' + COCONUT + '"/>' +
            '<text transform="translate(' + (cx - 2) + ' 205) rotate(-90)" text-anchor="middle" font-family="' + SERIF + '" font-style="italic" font-size="12" fill="' + DRAGON + '">Concept: copy TBC</text>' +
            '<text transform="translate(' + (cx + 11) + ' 205) rotate(-90)" text-anchor="middle" font-family="' + SANS + '" font-weight="700" font-size="7" letter-spacing="1.4" fill="' + INK + '">INGREDIENTS · STORAGE · BARCODE</text>';
        } else {
          parts += '<g transform="translate(' + (cx - 17) + ' 72) scale(0.34)">' + motif(fruit, id + '-' + i) + '</g>' +
            '<text transform="translate(' + (cx + 6) + ' 228) rotate(-90)" text-anchor="middle" font-family="' + SERIF + '" font-style="italic" font-size="21" letter-spacing="-0.4" fill="' + fruit.ink + '">' + esc(fruit.packLines.join(' ')) + '</text>' +
            '<text transform="translate(' + (cx - 13) + ' 228) rotate(-90)" text-anchor="middle" font-family="' + SANS + '" font-weight="700" font-size="6.5" letter-spacing="2.4" fill="' + fruit.ink + '">TROPIC THEORY</text>';
        }
        parts += '<text x="' + cx + '" y="346" text-anchor="middle" font-family="' + SANS + '" font-weight="700" font-size="7.5" letter-spacing="1.2" fill="' + (view === 'back' ? fruit.ink : fruit.ink) + '">100 G</text>';
        if (i > 0) parts += '<path d="M' + (x0 + sw * i) + ' ' + top + ' V' + bot + '" stroke="' + INK + '" stroke-opacity="0.35" stroke-dasharray="2 3"/>';
      }
      return '<defs>' + sheen(id) + '<clipPath id="' + id + '-c"><path d="' + outline + '"/></clipPath></defs>' +
        '<g clip-path="url(#' + id + '-c)">' +
        '<rect x="0" y="0" width="320" height="400" fill="' + fruit.color + '"/>' +
        crimp(x0, x0 + 250, top, top + 18, INK) + crimp(x0, x0 + 250, bot - 18, bot, INK) +
        '<path d="M' + x0 + ' ' + (top + 20) + ' H' + (x0 + 250) + ' M' + x0 + ' ' + (bot - 20) + ' H' + (x0 + 250) + '" stroke="' + INK + '" stroke-opacity="0.2"/>' +
        parts +
        '<rect x="0" y="0" width="320" height="400" fill="url(#' + id + '-sh)"/>' +
        '</g>';
    },

    'bag-1kg': function (fruit, format, view, id) {
      var body = 'M40 38 H280 V364 L272 374 H48 L40 364 Z';
      var inner = view === 'back' ? place(backLabel(fruit, format), 68, 102, 184, 252)
        : '<rect x="66" y="104" width="188" height="252" fill="' + fruit.color + '"/>' + place(frontLabel(fruit, format, id), 72, 110, 176, 240);
      return '<defs>' + sheen(id) + '</defs>' +
        '<path d="' + body + '" fill="' + KRAFT + '"/>' +
        '<path d="M40 38 H56 V374 H48 L40 364 Z M264 38 H280 V364 L272 374 H264 Z" fill="#000" opacity="0.07"/>' +
        '<path d="M48 66 V368 M272 66 V368" stroke="' + INK + '" stroke-opacity="0.16"/>' +
        crimp(40, 280, 40, 62, INK) +
        '<path d="M40 64 H280" stroke="' + INK + '" stroke-opacity="0.22"/>' +
        '<text x="68" y="90" font-family="' + SANS + '" font-weight="700" font-size="10" letter-spacing="2.6" fill="' + INK + '">FOOD SERVICE</text>' +
        '<text x="252" y="90" text-anchor="end" font-family="' + SERIF + '" font-weight="600" font-size="15" fill="' + INK + '">1 kg</text>' +
        inner +
        '<path d="' + body + '" fill="url(#' + id + '-sh)"/>';
    },

    'tub-1kg': function (fruit, format, view, id) {
      var body = 'M64 128 H256 L240 368 Q239 374 233 374 H87 Q81 374 80 368 Z';
      var label = view === 'back' ? place(backLabel(fruit, format), 86, 142, 148, 222) : place(frontLabel(fruit, format, id), 84, 142, 152, 222);
      return '<defs>' + sheen(id) + '<clipPath id="' + id + '-t"><path d="' + body + '"/></clipPath></defs>' +
        '<path d="' + body + '" fill="' + fruit.color + '"/>' +
        '<g clip-path="url(#' + id + '-t)">' + label +
        '<path d="M60 136 H260" stroke="' + INK + '" stroke-opacity="0.18"/>' +
        '<rect x="0" y="0" width="320" height="400" fill="url(#' + id + '-sh)"/></g>' +
        '<rect x="54" y="98" width="212" height="32" fill="' + INK + '"/>' +
        '<rect x="54" y="98" width="212" height="32" fill="url(#' + id + '-sh)"/>' +
        '<path d="M54 106 H266" stroke="' + COCONUT + '" stroke-opacity="0.18"/>' +
        '<path d="M40 112 H54 V122 H44 Z" fill="' + INK + '"/>' +
        '<text x="160" y="122" text-anchor="middle" font-family="' + SANS + '" font-weight="700" font-size="9" letter-spacing="3.4" fill="' + COCONUT + '">SCOOP TUB · 1 KG</text>';
    }
  };

  function render(fruit, formatId, view, opts) {
    opts = opts || {};
    if (typeof fruit === 'string') fruit = TT.catalog.getFruit(fruit);
    var format = TT.catalog.getFormat(formatId);
    if (!fruit || !format) return '';
    view = view === 'back' ? 'back' : 'front';
    var id = 'tt' + (++uid);
    var label = 'Packaging concept: ' + fruit.name + ', ' + format.short + ', ' + view + ' view';
    var a11y = opts.decorative ? 'aria-hidden="true" focusable="false"' : 'role="img" aria-label="' + esc(label) + '"';
    return '<svg class="pack ' + (opts.className || '') + '" viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" ' + a11y + '>' +
      '<defs><radialGradient id="' + id + '-g"><stop offset="0" stop-color="#20231F" stop-opacity="0.28"/><stop offset="1" stop-color="#20231F" stop-opacity="0"/></radialGradient></defs>' +
      '<ellipse cx="160" cy="380" rx="138" ry="12" fill="url(#' + id + '-g)"/>' +
      FORMAT_ART[format.id](fruit, format, view, id) +
      '</svg>';
  }

  // Fill every [data-pack="fruit:format:view"] placeholder on the page.
  function hydrate(root) {
    (root || document).querySelectorAll('[data-pack]').forEach(function (el) {
      var p = el.getAttribute('data-pack').split(':');
      el.innerHTML = render(p[0], p[1], p[2], { decorative: el.hasAttribute('data-pack-decorative') });
    });
  }

  TT.packs = { render: render, hydrate: hydrate };
})(window);
