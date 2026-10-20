// TropicBlenz range landing page: all copy and product data, in English and Vietnamese.
// Edit this file, then run `node scripts/build-range.mjs` to regenerate range.html (EN) and range-vi.html (VI).
// Copy strings may contain simple inline HTML (<em>, <strong>, <a>).
//
// Ground rules for anyone editing:
// - No nutrition, health, sourcing, certification, processing or sustainability claims until they are verified.
// - Blend names and combinations below are concepts. Keep the "concept" labelling until they are confirmed.

export const BRAND = 'TropicBlenz';
export const SITE_URL = 'https://rayvtt.github.io/TropicBlenz/';

// Single frozen fruits. `tint` is the colour field behind the card; `ink` is the text colour on it.
export const fruits = [
  {
    id: 'red-dragon-fruit', tint: '#D93672', ink: '#FFFDF8',
    name: { en: 'Red dragon fruit', vi: 'Thanh long ruột đỏ' },
    notes: {
      en: 'Deep magenta flesh flecked with tiny black seeds, and a gentle, mild sweetness. It brings colour more than sharpness.',
      vi: 'Ruột đỏ thắm điểm hạt đen li ti, vị ngọt dịu và thanh. Món nào có thanh long ruột đỏ cũng lên màu rực rỡ.',
    },
    uses: {
      en: ['Smoothies', 'Smoothie bowls', 'Sorbet-style desserts'],
      vi: ['Sinh tố', 'Smoothie bowl', 'Kem, tráng miệng đá xay'],
    },
  },
  {
    id: 'aloe-vera', tint: '#CFE3C8', ink: '#20231F',
    name: { en: 'Aloe vera cubes', vi: 'Nha đam cắt khối' },
    notes: {
      en: 'Clear, jelly-like cubes with a soft bite and a very mild flavour. They add texture rather than sweetness.',
      vi: 'Những khối nha đam trong veo, dai giòn nhẹ, vị rất thanh. Thêm độ giòn sần sật hơn là thêm vị ngọt.',
    },
    uses: {
      en: ['Fruit drinks', 'Chè-style desserts', 'Yoghurt cups'],
      vi: ['Nước trái cây', 'Các món chè', 'Sữa chua trái cây'],
    },
  },
  {
    id: 'soursop', tint: '#EDEBD9', ink: '#20231F',
    name: { en: 'Seedless soursop', vi: 'Mãng cầu xiêm tách hạt' },
    notes: {
      en: 'Soft, creamy white flesh with a bright sweet-and-sour flavour. No seeds to pick out, so it goes straight into the blender.',
      vi: 'Thịt trắng mềm, béo nhẹ, vị chua ngọt hài hoà. Không còn hạt nên có thể cho thẳng vào máy xay.',
    },
    uses: {
      en: ['Soursop smoothies', 'Bowls', 'Homemade ice lollies'],
      vi: ['Sinh tố mãng cầu', 'Smoothie bowl', 'Kem que tự làm'],
    },
  },
  {
    id: 'mango', tint: '#F5A623', ink: '#20231F',
    name: { en: 'Tangy ripe mango', vi: 'Xoài chín chua ngọt' },
    notes: {
      en: 'Ripe golden mango with a little tang to balance the sweetness. The backbone of most blends.',
      vi: 'Xoài chín vàng ươm, ngọt đậm xen chút chua nhẹ cho tròn vị. Linh hồn của hầu hết các công thức blend.',
    },
    uses: {
      en: ['Smoothies', 'Mango yoghurt', 'Sorbet'],
      vi: ['Sinh tố', 'Sữa chua xoài', 'Kem xoài'],
    },
  },
  {
    id: 'papaya', tint: '#F06F68', ink: '#20231F',
    name: { en: 'Papaya', vi: 'Đu đủ' },
    notes: {
      en: 'Soft, mellow orange flesh with a honeyed sweetness. It blends silky-smooth.',
      vi: 'Thịt cam mềm, ngọt dịu như mật ong. Xay lên mịn như nhung.',
    },
    uses: {
      en: ['Papaya milk smoothies', 'Bowls', 'Breakfast parfaits'],
      vi: ['Sinh tố đu đủ sữa', 'Smoothie bowl', 'Ly sữa chua buổi sáng'],
    },
  },
];

// Mixed blend CONCEPTS. Names and combinations are provisional and can be changed freely here.
export const blends = [
  {
    id: 'pink-tropics', name: 'Pink Tropics', tint: '#D93672',
    fruits: ['red-dragon-fruit', 'mango', 'soursop'],
    notes: {
      en: 'Magenta and bright: sweet mango, mild dragon fruit and a sour lift from soursop.',
      vi: 'Sắc hồng rực rỡ: xoài ngọt, thanh long dịu và chút chua thanh của mãng cầu.',
    },
    uses: {
      en: ['Smoothie', 'Smoothie bowl'],
      vi: ['Sinh tố', 'Smoothie bowl'],
    },
  },
  {
    id: 'golden-tropics', name: 'Golden Tropics', tint: '#F5A623',
    fruits: ['mango', 'papaya', 'soursop'],
    notes: {
      en: 'Golden, creamy and mellow, with soursop keeping it fresh.',
      vi: 'Vàng óng, béo mịn và dịu ngọt, mãng cầu giữ cho vị luôn tươi.',
    },
    uses: {
      en: ['Smoothie', 'Dessert cups'],
      vi: ['Sinh tố', 'Ly tráng miệng'],
    },
  },
  {
    id: 'island-reset', name: 'Island Reset', tint: '#286747',
    fruits: ['red-dragon-fruit', 'mango', 'aloe-vera'],
    notes: {
      en: 'Light and juicy, with aloe vera cubes for a soft, jelly-like bite.',
      vi: 'Nhẹ nhàng, mọng nước, thêm nha đam dai giòn sần sật.',
    },
    uses: {
      en: ['Fruit drinks', 'Chè-style desserts'],
      vi: ['Nước trái cây', 'Các món chè'],
    },
  },
];

export const copy = {
  en: {
    lang: 'en',
    file: 'range.html',
    title: `New frozen tropical fruit range | ${BRAND}`,
    description: `${BRAND}'s proposed range of frozen tropical fruit, inspired by Vietnam: five single fruits and three blend concepts for smoothies, bowls and desserts. Prototype preview.`,
    ogLocale: 'en_GB',
    skip: 'Skip to content',
    prototype: 'Prototype preview. The range, blend names and copy are provisional, and nothing is sold.',
    homeLabel: `${BRAND} home`,
    navLabel: 'Primary',
    nav: { range: 'Range', integrity: 'Integrity', growers: 'Growers', wisdom: 'Fruit wisdom', recipes: 'Recipes', faq: 'FAQ' },
    menu: 'Menu', close: 'Close',
    langLabel: 'Language',
    langOther: 'Tiếng Việt',
    enquireShort: 'Enquire',

    hero: {
      eyebrow: 'New range · Frozen tropical fruit',
      title: 'Five fruits. Three blends. <em>One tropical table.</em>',
      lede: 'A proposed range of frozen tropical fruit inspired by Vietnam’s orchards and food traditions: single fruits for everyday cooking, and pre-portioned blends for smoothies, bowls and desserts.',
      ctaRange: 'Explore the range',
      ctaEnquire: 'Wholesale enquiry',
      imgAlt: 'Two halves of a ripe mango scored into golden cubes, on a white surface with a fern leaf and a small white flower',
      credit: `Illustrative photography, not ${BRAND} product`,
    },

    range: {
      eyebrow: '01 · The range',
      title: 'Two ways<br>to <em>reach for fruit.</em>',
      note: '<span class="tag">Provisional</span> The range below is a proposal. Fruits, blends and formats are still being confirmed.',
      singleTitle: 'Single fruits',
      singleText: 'Individual frozen fruit pieces for flexible, everyday use. Take what you need, keep the rest frozen, and mix your own combinations.',
      blendTitle: 'Mixed blends',
      blendText: 'Pre-portioned packs of fruit that work together. Open one for a smoothie, a bowl, a dessert or a recipe, with no weighing or chopping.',
      singlesHead: 'Single fruits',
      blendsHead: 'Mixed blends',
      blendsTag: 'Concept',
      blendsNote: 'Blend names and combinations are working concepts, not final products.',
      useLabel: 'Use it for',
      inLabel: 'In the blend',
      photoTag: 'Photography to come',
      tasting: 'Tasting notes describe each fruit in general. They are not test results for a finished product.',
    },

    integrity: {
      eyebrow: '02 · Integrity &amp; transparency',
      title: 'Honest about<br><em>what we know.</em>',
      lede: 'Traceability starts with telling the truth about where we are. This is a brand in development, so here is what is settled, what is still being checked and what we intend to publish.',
      cols: [
        {
          head: 'What we know',
          items: [
            'The proposed range: five single fruits and three blend concepts.',
            'The focus on tropical fruit and on Vietnam’s food culture.',
            'Everything on this page is a prototype for review.',
          ],
        },
        {
          head: 'What we are still validating',
          items: [
            'Growers, suppliers and growing regions.',
            'How the fruit is harvested, prepared, frozen and stored.',
            'Pack formats, nutrition information and any certifications.',
          ],
        },
        {
          head: 'What we will share',
          items: [
            'Sourcing and handling details, once each one is verified.',
            'Clear notes on what changes, and when.',
            'No claims we cannot back up.',
          ],
        },
      ],
      note: 'No supplier, farm, origin detail, certification, lab result or processing method is claimed on this page.',
    },

    growers: {
      eyebrow: '03 · Farmers &amp; community',
      title: 'Respect for<br>the people <em>who grow it.</em>',
      lede: 'Good fruit depends on the people who know the land, the seasons and the trees. These are the commitments we are building towards.',
      tag: 'Commitments, not claims',
      items: [
        { head: 'Respect growers', text: 'Treat farmers as partners whose work and judgement shape the product.' },
        { head: 'Value local knowledge', text: 'Learn from the agricultural know-how that already exists in growing communities.' },
        { head: 'Build lasting relationships', text: 'Explore fair, long-term sourcing relationships rather than one-off purchases.' },
        { head: 'Reduce avoidable waste', text: 'Look for ways to use good fruit that might otherwise go unsold, where it is feasible.' },
        { head: 'Make the chain visible', text: 'Show more of the journey from orchard to freezer as each step is confirmed.' },
      ],
      note: 'No grower partnerships, premiums or community benefits are in place yet. We will report them only when they are real and can be shown.',
    },

    wisdom: {
      eyebrow: '04 · Vietnamese fruit wisdom',
      title: 'Flavour, season<br><em>and balance.</em>',
      lede: 'In Vietnamese kitchens, fruit is talked about in more than one way: by taste, by season, and by its <span lang="vi">tính</span>, its traditional “nature”.',
      blocks: [
        {
          head: 'Taste first',
          text: 'Sweet, sour and the balance between them. A ripe mango with a little tang, or soursop that is both sweet and sharp, is valued for exactly that contrast.',
        },
        {
          head: 'In season',
          text: 'Fruit eaten <span lang="vi">đúng mùa</span>, in its season, is part of everyday food culture. Freezing lets a season’s fruit be enjoyed later.',
        },
        {
          head: '<span lang="vi">Tính mát</span> and <span lang="vi">tính nhiệt</span>',
          text: 'Traditional Vietnamese food culture, shaped by yin–yang (<span lang="vi">âm dương</span>) thinking, sorts foods by nature: cold (<span lang="vi">hàn</span>), cool (<span lang="vi">lương</span>, everyday <span lang="vi">mát</span>), warm (<span lang="vi">ôn</span>), hot (<span lang="vi">nhiệt</span>, everyday <span lang="vi">nóng</span>) or neutral (<span lang="vi">bình</span>). Cooks combine them to keep a meal in balance.',
        },
      ],
      source: 'Source for the food classification: Bùi Bá Linh, “Triết lý Âm Dương – Ngũ Hành trong nghệ thuật ẩm thực của người Việt Nam”, <cite>Sài Gòn Giải Phóng</cite>, 28 May 2007.',
      sourceUrl: 'https://www.sggp.org.vn/triet-ly-am-duong-ngu-hanh-trong-nghe-thuat-am-thuc-cua-nguoi-viet-nam-post264934.html',
      sourceLink: 'Read the article (Vietnamese)',
      disclaimerHead: 'Tradition, not medical advice',
      disclaimer: 'This section describes cultural tradition. It is not medical or nutritional advice, and we do not claim that any fruit treats, prevents or cures illness. We have not assigned a traditional “nature” to individual fruits here; we will add fruit-by-fruit notes only when they can be attributed to credible sources.',
    },

    recipes: {
      eyebrow: '05 · Inspiration',
      title: 'Blend it, scoop it,<br><em>share it.</em>',
      note: '<span class="tag">Provisional</span> Serving ideas only, not tested recipes.',
      credit: `Illustrative photography, not ${BRAND} product`,
      items: [
        {
          meta: 'Smoothie bowl · 10 min', title: 'Pink Tropics bowl',
          text: 'Blend a pack of Pink Tropics with a little yoghurt until thick enough to hold a spoon. Top with sliced banana, toasted coconut and seeds.',
          img: 'smoothies.jpg', w: 1000, h: 1423,
          alt: 'Three tall smoothies in glasses topped with fresh fruit, against a blue backdrop',
        },
        {
          meta: 'Smoothie · 5 min', title: 'Papaya milk smoothie',
          text: 'Papaya, milk, ice and a spoon of condensed milk: a nod to the classic <span lang="vi">sinh tố đu đủ</span> of Vietnamese street stalls.',
        },
        {
          meta: 'Drink · 5 min', title: 'Golden mango cooler',
          text: 'Blend mango with ice and a squeeze of lime, then top up with sparkling water.',
          img: 'mango-drink.jpg', w: 1000, h: 1500,
          alt: 'A tall glass of iced golden mango drink with a lime wedge, mango slices beside it',
        },
        {
          meta: 'Dessert · 10 min', title: 'Island Reset fruit cup',
          text: 'Spoon thawed Island Reset over crushed ice with a little coconut milk, in the spirit of a fruit <span lang="vi">chè</span>.',
        },
      ],
    },

    story: {
      eyebrow: '06 · Our story',
      title: 'Rooted in<br><em>Vietnam.</em>',
      lede: `${BRAND} starts from a simple idea: Vietnam’s tropical fruit deserves to be enjoyed well beyond its season, with its story told honestly.`,
      intentHead: 'Where we are heading',
      intent: 'We intend to work closely with Vietnamese growers, to share the details of where each fruit comes from as they are confirmed, and to build a range that respects the food traditions it draws on.',
      tbcHead: 'Still to be confirmed',
      tbc: 'Regions, growers, harvest and processing details. Until they are verified, we make no sourcing, farming, processing or certification claims.',
      imgAlt: 'A heap of ripe mangoes in red, orange, yellow and green, in bright sunlight',
      credit: `Illustrative photography, not ${BRAND} product`,
    },

    faq: {
      eyebrow: '07 · Questions',
      title: 'Good to <em>know.</em>',
      items: [
        { q: 'Can I buy the range yet?', a: 'Not yet. This page is a prototype. The range, packs and availability are still being confirmed. Use the enquiry form below to register interest.' },
        { q: 'Are the blend names final?', a: 'No. Pink Tropics, Golden Tropics and Island Reset are working concepts. Names and combinations may change.' },
        { q: 'Where does the fruit come from?', a: 'The range is built around Vietnam’s tropical fruit. Specific growers, regions and handling are still being validated, and we will publish them once they are verified.' },
        { q: 'Is it organic or certified?', a: 'We make no organic or certification claims. If that changes, we will show the evidence.' },
        { q: 'Where can I find nutrition information?', a: 'Nutrition information will be published once it has been measured for the final products. Until then we do not give any.' },
        { q: 'How do I use frozen fruit?', a: 'Use it straight from the freezer in smoothies and bowls, or let it thaw a little for desserts and toppings. Final storage and use guidance will be on the pack.' },
      ],
    },

    enquire: {
      eyebrow: '08 · Get in touch',
      title: 'Stock it. Serve it.<br><em>Talk to us.</em>',
      lede: 'For cafés, juice bars, retailers and distributors, or anyone who wants to follow the range as it develops.',
      notice: '<strong>Demo form.</strong> Nothing is sent or stored yet.',
      name: 'Name', email: 'Email address', company: 'Business name', optional: '(optional)',
      type: 'I am enquiring as', types: ['Café or juice bar', 'Retailer', 'Distributor or importer', 'Food service', 'Just interested'],
      message: 'Message',
      submit: 'Send enquiry',
      errName: 'Please enter your name.',
      errEmail: 'Please enter a valid email address.',
      ok: 'Thank you. This is a demo, so your enquiry was not sent or stored.',
    },

    footer: {
      tag: 'Tropical fruit, honestly told.',
      label: 'Footer',
      storefront: 'Storefront prototype',
      small: `Prototype preview. The range, blend names, copy and visuals are provisional. Nothing is sold, and no sourcing, nutrition, health or certification claims are made. Photography is illustrative stock from Unsplash (Unsplash License), not ${BRAND} product.`,
    },
  },

  vi: {
    lang: 'vi',
    file: 'range-vi.html',
    title: `Dòng trái cây nhiệt đới đông lạnh mới | ${BRAND}`,
    description: `Dòng trái cây nhiệt đới đông lạnh đang được phát triển của ${BRAND}, lấy cảm hứng từ Việt Nam: năm loại trái cây đơn và ba ý tưởng blend cho sinh tố, smoothie bowl và món tráng miệng. Bản xem trước.`,
    ogLocale: 'vi_VN',
    skip: 'Chuyển đến nội dung',
    prototype: 'Bản xem trước. Dòng sản phẩm, tên blend và nội dung đều đang hoàn thiện, chưa có sản phẩm nào được bán.',
    homeLabel: `Trang chủ ${BRAND}`,
    navLabel: 'Điều hướng chính',
    nav: { range: 'Sản phẩm', integrity: 'Minh bạch', growers: 'Nhà vườn', wisdom: 'Tinh hoa trái Việt', recipes: 'Công thức', faq: 'Hỏi đáp' },
    menu: 'Menu', close: 'Đóng',
    langLabel: 'Ngôn ngữ',
    langOther: 'English',
    enquireShort: 'Liên hệ',

    hero: {
      eyebrow: 'Dòng mới · Trái cây nhiệt đới đông lạnh',
      title: 'Năm loại trái. Ba công thức blend. <em>Một mâm nhiệt đới.</em>',
      lede: 'Dòng trái cây nhiệt đới đông lạnh đang được phát triển, lấy cảm hứng từ những vườn trái và văn hoá ẩm thực Việt: trái cây đơn cho bữa ăn hằng ngày, và các gói blend chia sẵn cho sinh tố, smoothie bowl và món tráng miệng.',
      ctaRange: 'Khám phá dòng sản phẩm',
      ctaEnquire: 'Liên hệ hợp tác',
      imgAlt: 'Hai nửa quả xoài chín được khứa thành từng khối vàng óng, đặt trên nền trắng cạnh một nhánh lá dương xỉ và một bông hoa trắng nhỏ',
      credit: `Ảnh minh hoạ, không phải sản phẩm ${BRAND}`,
    },

    range: {
      eyebrow: '01 · Dòng sản phẩm',
      title: 'Hai cách<br>để <em>thưởng thức trái cây.</em>',
      note: '<span class="tag">Dự kiến</span> Dòng sản phẩm dưới đây là đề xuất. Loại trái, công thức blend và quy cách đóng gói vẫn đang được xác nhận.',
      singleTitle: 'Trái cây đơn',
      singleText: 'Từng miếng trái cây đông lạnh riêng lẻ, linh hoạt cho mọi bữa ăn. Lấy vừa đủ dùng, phần còn lại cất ngăn đá, tự do phối theo ý thích.',
      blendTitle: 'Trái cây blend',
      blendText: 'Các gói trái cây đã phối sẵn và chia phần vừa đủ. Mở một gói là có ngay ly sinh tố, smoothie bowl, món tráng miệng hay nguyên liệu nấu nướng, không cần cân đo hay cắt gọt.',
      singlesHead: 'Trái cây đơn',
      blendsHead: 'Trái cây blend',
      blendsTag: 'Ý tưởng',
      blendsNote: 'Tên gọi và cách phối của các gói blend đang là ý tưởng, chưa phải sản phẩm chính thức.',
      useLabel: 'Gợi ý dùng',
      inLabel: 'Thành phần phối',
      photoTag: 'Ảnh sản phẩm sẽ cập nhật',
      tasting: 'Mô tả hương vị nói về đặc điểm chung của từng loại trái, không phải kết quả thử nghiệm trên sản phẩm hoàn thiện.',
    },

    integrity: {
      eyebrow: '02 · Chính trực &amp; minh bạch',
      title: 'Thật lòng về<br><em>những gì mình biết.</em>',
      lede: 'Truy xuất nguồn gốc bắt đầu từ việc nói thật về chặng đường hiện tại. Thương hiệu vẫn đang được xây dựng, nên đây là những gì đã rõ, những gì đang kiểm chứng và những gì chúng tôi dự định công bố.',
      cols: [
        {
          head: 'Điều đã rõ',
          items: [
            'Dòng sản phẩm dự kiến: năm loại trái cây đơn và ba ý tưởng blend.',
            'Định hướng tập trung vào trái cây nhiệt đới và văn hoá ẩm thực Việt Nam.',
            'Mọi nội dung trên trang này là bản mẫu để xem xét.',
          ],
        },
        {
          head: 'Điều đang kiểm chứng',
          items: [
            'Nhà vườn, nhà cung cấp và vùng trồng.',
            'Cách thu hoạch, sơ chế, cấp đông và bảo quản.',
            'Quy cách đóng gói, thông tin dinh dưỡng và các chứng nhận (nếu có).',
          ],
        },
        {
          head: 'Điều chúng tôi sẽ chia sẻ',
          items: [
            'Thông tin nguồn gốc và quy trình, khi từng thông tin được xác minh.',
            'Ghi chú rõ ràng khi có thay đổi.',
            'Không đưa ra tuyên bố nào mà chúng tôi không chứng minh được.',
          ],
        },
      ],
      note: 'Trang này không nêu tên nhà cung cấp, nông trại, vùng nguyên liệu, chứng nhận, kết quả kiểm nghiệm hay quy trình chế biến nào.',
    },

    growers: {
      eyebrow: '03 · Nhà vườn &amp; cộng đồng',
      title: 'Trân trọng<br>những người <em>làm ra trái ngọt.</em>',
      lede: 'Trái ngon nhờ những người hiểu đất, hiểu mùa, hiểu từng gốc cây. Đây là những cam kết chúng tôi đang hướng tới.',
      tag: 'Cam kết, chưa phải thành tựu',
      items: [
        { head: 'Tôn trọng nhà vườn', text: 'Xem người nông dân là đối tác, có tiếng nói và kinh nghiệm góp phần làm nên sản phẩm.' },
        { head: 'Trân quý kinh nghiệm bản địa', text: 'Học hỏi từ vốn hiểu biết canh tác sẵn có của cộng đồng trồng trọt.' },
        { head: 'Gắn bó lâu dài', text: 'Hướng tới quan hệ thu mua công bằng, bền lâu thay vì mua bán theo từng chuyến.' },
        { head: 'Giảm lãng phí', text: 'Tìm cách tận dụng những trái ngon có nguy cơ không bán được, khi điều kiện cho phép.' },
        { head: 'Minh bạch chuỗi giá trị', text: 'Cho thấy rõ hơn hành trình từ vườn đến ngăn đá, khi từng bước được xác nhận.' },
      ],
      note: 'Hiện chưa có quan hệ đối tác, mức giá ưu đãi hay lợi ích cộng đồng nào được thiết lập. Chúng tôi chỉ công bố khi những điều đó có thật và có thể chứng minh.',
    },

    wisdom: {
      eyebrow: '04 · Tinh hoa trái Việt',
      title: 'Hương vị, mùa vụ<br><em>và sự cân bằng.</em>',
      lede: 'Trong gian bếp Việt, trái cây được nhắc đến theo nhiều cách: theo vị, theo mùa, và theo <em>tính</em> của nó trong quan niệm truyền thống.',
      blocks: [
        {
          head: 'Trước hết là vị',
          text: 'Ngọt, chua và sự hài hoà giữa hai vị. Trái xoài chín có chút chua, hay mãng cầu vừa ngọt vừa chua, được ưa chuộng chính vì sự đối lập ấy.',
        },
        {
          head: 'Ăn đúng mùa',
          text: 'Ăn trái cây đúng mùa là nếp quen trong đời sống ẩm thực. Cấp đông giúp hương vị của một mùa trái được thưởng thức về sau.',
        },
        {
          head: 'Tính mát và tính nhiệt',
          text: 'Ẩm thực truyền thống Việt, chịu ảnh hưởng của triết lý âm dương, phân loại thực phẩm theo tính hàn, lương (mát), ôn (ấm), nhiệt (nóng) hay bình (trung tính), và người nấu phối hợp chúng để bữa ăn được cân bằng.',
        },
      ],
      source: 'Nguồn tham khảo về cách phân loại thực phẩm: TS Bùi Bá Linh, “Triết lý Âm Dương – Ngũ Hành trong nghệ thuật ẩm thực của người Việt Nam”, <cite>Sài Gòn Giải Phóng</cite>, 28/5/2007.',
      sourceUrl: 'https://www.sggp.org.vn/triet-ly-am-duong-ngu-hanh-trong-nghe-thuat-am-thuc-cua-nguoi-viet-nam-post264934.html',
      sourceLink: 'Đọc bài viết',
      disclaimerHead: 'Văn hoá truyền thống, không phải lời khuyên y khoa',
      disclaimer: 'Phần này giới thiệu quan niệm văn hoá truyền thống, không phải lời khuyên y khoa hay dinh dưỡng. Chúng tôi không khẳng định bất kỳ loại trái cây nào giúp chữa, phòng ngừa hay điều trị bệnh. Trang này chưa gán “tính” cho từng loại trái; chúng tôi chỉ bổ sung khi có nguồn tham khảo đáng tin cậy.',
    },

    recipes: {
      eyebrow: '05 · Cảm hứng',
      title: 'Xay, múc,<br><em>và cùng thưởng thức.</em>',
      note: '<span class="tag">Dự kiến</span> Chỉ là gợi ý cách dùng, chưa phải công thức đã thử nghiệm.',
      credit: `Ảnh minh hoạ, không phải sản phẩm ${BRAND}`,
      items: [
        {
          meta: 'Smoothie bowl · 10 phút', title: 'Smoothie bowl Pink Tropics',
          text: 'Xay một gói Pink Tropics với chút sữa chua đến khi sánh đặc, múc thìa không chảy. Rắc chuối cắt lát, dừa nạo rang và các loại hạt lên trên.',
          img: 'smoothies.jpg', w: 1000, h: 1423,
          alt: 'Ba ly sinh tố cao phủ trái cây tươi bên trên, đặt trước phông nền xanh dương',
        },
        {
          meta: 'Sinh tố · 5 phút', title: 'Sinh tố đu đủ sữa',
          text: 'Đu đủ, sữa tươi, đá và một thìa sữa đặc: gợi nhớ ly sinh tố đu đủ quen thuộc ở những quầy sinh tố vỉa hè.',
        },
        {
          meta: 'Thức uống · 5 phút', title: 'Xoài mát lạnh',
          text: 'Xay xoài cùng đá và chút nước cốt chanh, rồi rót thêm nước có ga.',
          img: 'mango-drink.jpg', w: 1000, h: 1500,
          alt: 'Ly cao đựng nước xoài vàng ướp đá kèm lát chanh, bên cạnh là những lát xoài',
        },
        {
          meta: 'Tráng miệng · 10 phút', title: 'Chè trái cây Island Reset',
          text: 'Rã đông nhẹ một gói Island Reset, cho lên đá bào, chan chút nước cốt dừa theo kiểu chè trái cây.',
        },
      ],
    },

    story: {
      eyebrow: '06 · Câu chuyện',
      title: 'Bắt nguồn từ<br><em>Việt Nam.</em>',
      lede: `${BRAND} bắt đầu từ một ý tưởng giản dị: trái cây nhiệt đới Việt Nam xứng đáng được thưởng thức cả khi đã qua mùa, và câu chuyện của nó cần được kể một cách trung thực.`,
      intentHead: 'Định hướng của chúng tôi',
      intent: 'Chúng tôi mong muốn hợp tác chặt chẽ với nhà vườn Việt Nam, chia sẻ nguồn gốc của từng loại trái khi thông tin được xác nhận, và xây dựng một dòng sản phẩm tôn trọng những truyền thống ẩm thực đã tạo cảm hứng cho nó.',
      tbcHead: 'Đang chờ xác nhận',
      tbc: 'Vùng trồng, nhà vườn, thông tin thu hoạch và chế biến. Cho đến khi được xác minh, chúng tôi không đưa ra tuyên bố nào về nguồn gốc, canh tác, chế biến hay chứng nhận.',
      imgAlt: 'Một đống xoài chín nhiều màu đỏ, cam, vàng và xanh dưới nắng',
      credit: `Ảnh minh hoạ, không phải sản phẩm ${BRAND}`,
    },

    faq: {
      eyebrow: '07 · Hỏi đáp',
      title: 'Những điều <em>nên biết.</em>',
      items: [
        { q: 'Tôi đã có thể mua sản phẩm chưa?', a: 'Chưa. Trang này là bản mẫu. Dòng sản phẩm, bao bì và thời điểm ra mắt vẫn đang được xác nhận. Bạn có thể để lại thông tin qua biểu mẫu bên dưới.' },
        { q: 'Tên các gói blend đã chính thức chưa?', a: 'Chưa. Pink Tropics, Golden Tropics và Island Reset là tên tạm thời. Tên gọi và cách phối có thể thay đổi.' },
        { q: 'Trái cây có nguồn gốc từ đâu?', a: 'Dòng sản phẩm được xây dựng quanh trái cây nhiệt đới Việt Nam. Nhà vườn, vùng trồng và quy trình cụ thể vẫn đang được kiểm chứng, và sẽ được công bố khi đã xác minh.' },
        { q: 'Sản phẩm có hữu cơ hay có chứng nhận không?', a: 'Chúng tôi không đưa ra tuyên bố nào về hữu cơ hay chứng nhận. Nếu điều đó thay đổi, chúng tôi sẽ công bố kèm bằng chứng.' },
        { q: 'Thông tin dinh dưỡng ở đâu?', a: 'Thông tin dinh dưỡng sẽ được công bố khi đã được đo cho sản phẩm hoàn thiện. Trước thời điểm đó, chúng tôi không đưa ra con số nào.' },
        { q: 'Dùng trái cây đông lạnh thế nào?', a: 'Có thể cho thẳng từ ngăn đá vào sinh tố và smoothie bowl, hoặc để rã đông một chút khi làm món tráng miệng và topping. Hướng dẫn bảo quản và sử dụng chính thức sẽ in trên bao bì.' },
      ],
    },

    enquire: {
      eyebrow: '08 · Liên hệ',
      title: 'Nhập hàng, phục vụ,<br><em>hay chỉ để trò chuyện.</em>',
      lede: 'Dành cho quán cà phê, quầy sinh tố, nhà bán lẻ, nhà phân phối, hoặc bất kỳ ai muốn theo dõi dòng sản phẩm.',
      notice: '<strong>Biểu mẫu minh hoạ.</strong> Hiện chưa có thông tin nào được gửi đi hay lưu lại.',
      name: 'Họ tên', email: 'Địa chỉ email', company: 'Tên doanh nghiệp', optional: '(không bắt buộc)',
      type: 'Bạn liên hệ với tư cách', types: ['Quán cà phê, quầy sinh tố', 'Nhà bán lẻ', 'Nhà phân phối, nhập khẩu', 'Dịch vụ ăn uống', 'Chỉ quan tâm tìm hiểu'],
      message: 'Lời nhắn',
      submit: 'Gửi thông tin',
      errName: 'Vui lòng nhập họ tên.',
      errEmail: 'Vui lòng nhập địa chỉ email hợp lệ.',
      ok: 'Cảm ơn bạn. Đây là biểu mẫu minh hoạ nên thông tin của bạn chưa được gửi đi hay lưu lại.',
    },

    footer: {
      tag: 'Trái cây nhiệt đới, kể bằng sự thật.',
      label: 'Chân trang',
      storefront: 'Bản mẫu cửa hàng',
      small: `Bản xem trước. Dòng sản phẩm, tên blend, nội dung và hình ảnh đều đang hoàn thiện. Chưa có sản phẩm nào được bán, và trang không đưa ra tuyên bố nào về nguồn gốc, dinh dưỡng, sức khoẻ hay chứng nhận. Ảnh là ảnh minh hoạ từ Unsplash (giấy phép Unsplash), không phải sản phẩm ${BRAND}.`,
    },
  },
};
