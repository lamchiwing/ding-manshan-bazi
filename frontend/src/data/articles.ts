export interface ArticleConversionProduct {
  serviceId: string;
  badge: string;
  title: string;
  price: string;
  ctaText: string;
}

export interface ArticleItem {
  id: string;
  category: '八字' | '五行' | '風水' | '流月運程' | '流年運程' | '面相';
  title: string;
  readTime: string;
  summary: string;
  publishedDate: string;
  author: string;
  conversionProduct: ArticleConversionProduct;
  contentParagraphs?: string[];
}

export type LibraryArticle = ArticleItem;

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "art-1",
    category: "八字",
    title: "解構四柱八字：年柱、月令、日柱與時柱所承載的生命底色",
    readTime: "4 分鐘閱讀",
    summary: "從根基祖業、青年奮鬥、自我本質到晚年歸宿，四柱如同時空座標般折射出一個人的能量流動與命運節律。",
    publishedDate: "2026.11",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-12-months-decisions",
      badge: "人生決策必讀",
      title: "十二流月運程＋重大決策矩陣 (個人化決策版)",
      price: "HK$ 488",
      ctaText: "立即開始個人化推演"
    },
    contentParagraphs: [
      "在子平八字學說中，四柱（年、月、日、時）並非孤立的八個干支，而是一套嚴密的時間能量座標體系。年柱代表個人的根基、家族門第與童年稟賦；月柱為月令提綱，主宰全局五行氣候與青年時期的事業開拓；日柱日干代表真正的自我核心（日主），日支則為配偶宮與內心歸屬；時柱則主晚年造化、個人作品與潛在歸宿。",
      "很多人常問：相同八字的人是否會有一樣的人生？答案顯然是否定的。八字折射的是生命底層的五行格局與動能傾向，就如同航海圖標示了洋流與風向。真正決定航程終點的，是命主在面臨重大轉折時所做出的時空決策。"
    ]
  },
  {
    id: "art-2",
    category: "五行",
    title: "五行欠火或金水過旺？以空間、色彩與日常心念補足本命喜用神",
    readTime: "5 分鐘閱讀",
    summary: "五行並非抽象哲學，而是體現於生活作息、色彩光影與居住環境的氣場調和。極簡五行日常能量自調指南。",
    publishedDate: "2026.11",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-five-elements",
      badge: "基礎五行精批",
      title: "八字五行與喜用神個人指南 (精準調候版)",
      price: "HK$ 128",
      ctaText: "解鎖個人五行指南"
    },
    contentParagraphs: [
      "人體與命盤皆是一個微型宇宙。當命中五行嚴重失衡，例如冬生水旺而滴火全無，人容易陷入情緒低落、缺乏開拓熱情；反之，若夏生火炎土燥，則往往思慮過急、容易衝動誤事。",
      "了解自己的喜用神，目的是學會在生活中『借力』。喜火者宜多引進晨光、多接觸南向開闊空間與明朗色彩；喜水者則宜臨水而居、保持沉潛思維。五行調和的核心不在於盲目配戴飾物，而在於從心態、作息到空間環境建立共振。"
    ]
  },
  {
    id: "art-3",
    category: "風水",
    title: "2024–2043 離九運大勢：家居與辦公室正神零神旺財佈局全解析",
    readTime: "7 分鐘閱讀",
    summary: "離九運二十年大運當令，玄空風水正神零神易位。住宅坐向與商務動線如何借南方火運之力順勢聚財避凶。",
    publishedDate: "2026.10",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-master-bazi",
      badge: "大師深度批命",
      title: "丁蔓山大師 · 住宅／辦公室風水及八字深度諮詢",
      price: "HK$ 2,800 起",
      ctaText: "預約丁蔓山親批"
    },
    contentParagraphs: [
      "三元九運中，2024年至2043年正式步入離九火運。離為火、為麗、為明，代表文化、科技、人工智慧、身心靈與美學產業將迎來前所未有的繁榮，同時也代表虛火上升、躁動不安的社會氛圍。",
      "在玄空風水法則中，九運以『正神正位裝，零神零位裝』為核心。南方為正神方，宜見山、見高大建築以穩固氣場與人丁；北方為零神方，宜見水、見開闊動線以催動財祿。住宅若能順應九運理氣，自能居安得利。"
    ]
  },
  {
    id: "art-4",
    category: "流月運程",
    title: "流月吉凶交替規律：如何借月令十神避開職場暗礁與財務陷阱",
    readTime: "6 分鐘閱讀",
    summary: "年運定基調，月運見真章。每月節令交替之際，五行氣機轉變如何影響個人情緒、談判時機與合約簽署。",
    publishedDate: "2026.10",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-12-months",
      badge: "全年流月全景",
      title: "流年＋十二流月運程全面解讀 (吉凶全覽)",
      price: "HK$ 368",
      ctaText: "解鎖 12 流月運程"
    },
    contentParagraphs: [
      "許多人在一年之中常有幾個月特別順風順水，也有幾個月諸事不順。這背後的原因正是『流月與原局日主的十神碰撞』。",
      "逢官殺之月，職場壓力與考核權責增加，適合向上匯報爭取責任，但不宜任性抗上；逢食傷之月，靈感迸發、業務擴張動能強烈，但需慎防口舌是非；逢比劫爭財之月，則要嚴守現金流，避免盲目借貸與非理性擴張。"
    ]
  },
  {
    id: "art-5",
    category: "流年運程",
    title: "丙午年歲君火旺天干相映：十天干日主流年機遇與重大決策矩陣",
    readTime: "8 分鐘閱讀",
    summary: "2026丙午歲君坐羊刃帝旺，烈火淬煉。十個天干日主在極陽之年中，如何確立攻守策略與關鍵轉折點。",
    publishedDate: "2026.10",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-12-months-decisions",
      badge: "重大決策必看",
      title: "十二流月運程＋重大決策矩陣 (HK$ 488)",
      price: "HK$ 488",
      ctaText: "獲取專屬決策矩陣"
    },
    contentParagraphs: [
      "丙午流年，天干丙火、地支午火，純粹烈焰，氣勢浩大。對於命局喜火者而言，此年是破繭而出、聲名鵲起、跨越階級的絕佳跳板；但對於命局忌火、原局燥烈者，則恐面臨健康心血管負荷與財務劇烈波動。",
      "金水日主（庚、辛、壬、癸）與木火日主（甲、乙、丙、丁）將呈現截然不同的機遇走勢。掌握歲君的生剋節奏，便能在狂風巨浪中穩握舵盤。"
    ]
  },
  {
    id: "art-6",
    category: "面相",
    title: "面相十二宮與三停氣色：從額相、鼻翼與眼神洞悉個人行運走勢",
    readTime: "5 分鐘閱讀",
    summary: "相由心生，氣色隨運轉。上停天庭看少年貴人，中停鼻顴看中年財權，下停地閣看晚歲豐足。",
    publishedDate: "2026.09",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-master-bazi",
      badge: "真人一對一",
      title: "丁蔓山大師 · 1對1 八字命理深度諮詢 (含面相氣色指引)",
      price: "HK$ 4,800",
      ctaText: "預約大師一對一"
    },
    contentParagraphs: [
      "古典相法有雲：『有其內必形諸外』。面相並非僵化不變的骨骼尺寸，而是一個人長期心念、健康狀態與當前行運氣色的即時投影儀。",
      "印堂發亮、雙目神藏者，往往處於即將突破的吉運期；反之，若印堂暗沉、鼻準發赤，則往往預示著近期財務支出過劇或面臨決策盲區。結合八字命盤與即時面相觀察，能大幅提高吉凶判斷的精準度。"
    ]
  },
  {
    id: "art-7",
    category: "八字",
    title: "夫妻宮逢沖逢合之年：親密關係的情緒溝通地圖與正緣引動",
    readTime: "5 分鐘閱讀",
    summary: "婚姻宮是內心情感的晴雨表。逢沖往往引動摩擦或異地分居，逢合則促成定局或正緣相遇。",
    publishedDate: "2026.09",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-love-3yr",
      badge: "感情深度解析",
      title: "感情／姻緣・未來 3 年正緣解析 (36個月全覽)",
      price: "HK$ 188",
      ctaText: "立即解析正緣走勢"
    },
    contentParagraphs: [
      "日支為夫妻宮，也是個人情感安全感的居所。當流年地支與日支產生六合或三合時，往往是單身者最容易遇見心動對象、戀愛成熟步入婚姻的黃金窗口；然而，當夫妻宮逢六沖時，則容易因微小生活細節引發冷戰。",
      "合婚的目的不是非黑即白地判定『合或不合』，而是透過雙方的命理特質，看清彼此的情緒觸發點，學會在相生之處昇華默契，在相剋相沖之處給予對方空間。"
    ]
  },
  {
    id: "art-8",
    category: "八字",
    title: "打工還是創業？從八字七殺與食傷配置看人生黃金創業窗口期",
    readTime: "6 分鐘閱讀",
    summary: "並非所有人都適合開拓新局。七殺賦予冒險魄力，食傷賦予技術創新，身強財旺方能立足商海。",
    publishedDate: "2026.08",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-startup-3yr",
      badge: "創業窗口評估",
      title: "八字創業／轉職・未來 3 年黃金窗口期 (個人化指南)",
      price: "HK$ 288",
      ctaText: "解鎖創業窗口評估"
    },
    contentParagraphs: [
      "創業是一場高強度的能量消耗戰。命帶正官正印者，天生具有制度感、信譽度與體制親和力，在大型企業或專業機構往往能走得更穩；而命帶七殺、偏財與傷官者，天生對商業利差敏感，勇於顛覆傳統，適合主導新創業務。",
      "但最重要的前提在於日主能量強弱。身弱逢財殺大運，貿然創業往往容易背負債務；唯有在日主得印比生扶、行運通達的黃金窗口期進場，才能事半功倍。"
    ]
  },
  {
    id: "art-9",
    category: "八字",
    title: "何謂「身強任財」與「財多身弱」？破除職場無效努力與虧損困局",
    readTime: "5 分鐘閱讀",
    summary: "八字中財星旺盛並不等於一定發財。為何有人拼命求財反而身心俱疲？深度解析命理財運底層邏輯。",
    publishedDate: "2026.08",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-career-3yr",
      badge: "職涯財運精析",
      title: "事業／財運・未來 3 年深度解讀 (財運走勢全覽)",
      price: "HK$ 188",
      ctaText: "解讀事業財運走勢"
    },
    contentParagraphs: [
      "在子平八字中，『我剋者為財』。財星代表個人所掌控的資源、金錢、業務與慾望。既然是『我剋』，首先要求日主本身具有足夠的承擔力與抗壓性。",
      "若是『財多身弱』，眼前機會雖多，但個人精力與體制承載力不足，盲目承接大項目往往引發內耗甚至財務虧損。此時首要之務不是拼命追逐外部回報，而是以印星（深造、考證、養精蓄銳）與比劫（尋求可靠合夥人）強健本體。"
    ]
  },
  {
    id: "art-10",
    category: "風水",
    title: "現代都市大廈玄空納氣法：門窗朝向與動線對家運的深層影響",
    readTime: "6 分鐘閱讀",
    summary: "高層住宅如何判定向首？電梯井、走廊氣流與採光落地窗，如何共同構築現代都市住宅的吉凶氣場。",
    publishedDate: "2026.07",
    author: "丁蔓山",
    conversionProduct: {
      serviceId: "srv-master-bazi",
      badge: "大師深度批命",
      title: "丁蔓山大師 · 住宅／辦公室風水及八字深度諮詢",
      price: "HK$ 2,800 起",
      ctaText: "預約大師風水諮詢"
    },
    contentParagraphs: [
      "古代風水以大門為氣口，現代高樓大廈則以採光最足、動線最活躍的大面積落地窗與陽台為主要納氣面。",
      "住宅內部的『動線分佈』直接關係到居住者的健康與思考清晰度。避開門窗直通的『穿堂煞』、確保主臥床頭穩重靠實、以及客廳財位避免雜物堆積，都是現代人無需耗費巨資即可立即改善居家微氣候的實用原則。"
    ]
  }
];

export const LIBRARY_ARTICLES = ARTICLES_DATA;
