export interface ServiceItem {
  id: string;
  title: string;
  price_hkd: number;
  price_display: string;
  category_name: string;
  turnaround: string;
  description: string;
  features: string[];
  type: 'onsite' | 'consultation' | 'naming' | 'date_selection' | 'digital';
}

// Ordered strictly from highest price to lowest price
export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "srv-corp-fengshui-layout",
    title: "公司風水佈局",
    price_hkd: 28000,
    price_display: "HK$28,000+",
    category_name: "現場勘察",
    turnaround: "預約上門 · 實地勘測",
    description: "針對企業辦公室、總部或商舖進行空間風水規劃。著重負責人辦公室、財務位置、大門納氣與團隊動線配置。",
    features: [
      "丁蔓山親臨現場（香港及周邊地區）",
      "精確羅盤定坐向與玄空飛星立極",
      "負責人辦公位與財務區域佈局圖",
      "跟進調整與諮詢"
    ],
    type: "onsite"
  },
  {
    id: "srv-corp-inspection",
    title: "公司查宅",
    price_hkd: 28000,
    price_display: "HK$28,000+",
    category_name: "商業選址",
    turnaround: "選址實地勘測",
    description: "企業擴張、搬遷或新店選址評估。衡量商廈周邊環境、大廈納氣與行業五行契合度。",
    features: [
      "多處候選商廈/地舖地氣對比",
      "周邊道路與形煞檢測",
      "選址綜合評估與建議",
      "出具查宅分析報告"
    ],
    type: "onsite"
  },
  {
    id: "srv-home-fengshui-layout",
    title: "家居風水佈局",
    price_hkd: 18000,
    price_display: "HK$18,000+",
    category_name: "現場勘察",
    turnaround: "預約上門 · 實地勘測",
    description: "親臨住宅現場羅盤定針，勘測外在環境與室內格局，提供和諧起居與安穩聚氣的佈局建議。",
    features: [
      "丁蔓山親臨住宅現場勘察",
      "精準羅盤定坐向與玄空飛星",
      "全屋各房佈置平面圖",
      "一年內跟進諮詢"
    ],
    type: "onsite"
  },
  {
    id: "srv-home-inspection",
    title: "家居查宅",
    price_hkd: 18000,
    price_display: "HK$18,000+",
    category_name: "置業把關",
    turnaround: "實地 / 線上勘測",
    description: "買樓置業或租屋前評估。勘察單位環境磁場、周邊形煞與住戶生辰五行契合度。",
    features: [
      "置業租屋前吉凶評估與避坑",
      "周邊道路與建築格局檢視",
      "物業契合度分析",
      "出具查宅診斷記錄"
    ],
    type: "onsite"
  },
  {
    id: "srv-master-bazi",
    title: "八字論命",
    price_hkd: 4800,
    price_display: "HK$4,800",
    category_name: "一對一諮詢",
    turnaround: "60-90 分鐘專屬視像 / 面談",
    description: "由丁蔓山親自排盤詳論，梳理格局喜忌、大運起伏、六親緣分與重要轉折點，附命書一份。",
    features: [
      "丁蔓山親自推演四柱八字命盤",
      "大運走勢與轉折點詳解",
      "一對一深度解答",
      "專屬命書一份"
    ],
    type: "consultation"
  },
  {
    id: "srv-company-naming",
    title: "公司定號",
    price_hkd: 3800,
    price_display: "HK$3,800",
    category_name: "商業起名",
    turnaround: "3-5 工作日交付",
    description: "結合創辦人生辰五行、行業屬性與品牌定位，挑選合適數理與五行契合之商業名號。",
    features: [
      "創辦人生辰與行業五行匹配",
      "數理吉凶評估",
      "提供 6–10 組商號建議",
      "名稱意涵與五行分析書"
    ],
    type: "naming"
  },
  {
    id: "srv-inquiry-matter",
    title: "問事求謀",
    price_hkd: 2800,
    price_display: "HK$2,800",
    category_name: "專項決策",
    turnaround: "45 分鐘專屬諮詢",
    description: "針對特定單一事件（如工作轉換、合約簽署、重大投資、感情抉擇）進行專項起卦與命理推演。",
    features: [
      "針對具體問題深入推演",
      "事件進展與時機分析",
      "應對策略與時窗建議",
      "一對一即時交流"
    ],
    type: "consultation"
  },
  {
    id: "srv-annual-inquiry",
    title: "流年問事",
    price_hkd: 2800,
    price_display: "HK$2,800",
    category_name: "年度諮詢",
    turnaround: "45 分鐘專屬面談",
    description: "針對當前或即將到來之一年進行批算，涵蓋十二流月動態、太歲關係與生活起居調和。",
    features: [
      "流年太歲與原局關係詳解",
      "十二流月變化提點",
      "開運方位與日常調理建議",
      "一對一解答"
    ],
    type: "consultation"
  },
  {
    id: "srv-baby-naming",
    title: "小兒定名",
    price_hkd: 2800,
    price_display: "HK$2,800",
    category_name: "姓名學",
    turnaround: "3-5 工作日交付",
    description: "根據新生兒生辰八字，遵循五行平衡、數理結構、生肖喜忌與音律意蘊，定製吉祥名字。",
    features: [
      "生辰五行缺補平衡分析",
      "姓名數理格局配置",
      "提供 5–8 組名字建議",
      "寓意與解析書"
    ],
    type: "naming"
  },
  {
    id: "srv-auspicious-date",
    title: "吉時擇日",
    price_hkd: 2800,
    price_display: "HK$2,800",
    category_name: "擇日吉課",
    turnaround: "2-3 工作日交付",
    description: "嫁娶、開張、入伙、動土或重要儀式吉日良辰推算，避開相沖時辰，選取吉利天時。",
    features: [
      "主事人八字生肖避沖避煞",
      "精選吉日吉時",
      "儀式與時間節點提示",
      "擇日報告一份"
    ],
    type: "date_selection"
  },
  {
    id: "srv-period-9-deep",
    title: "九運住宅深度風水",
    price_hkd: 1388,
    price_display: "HK$1,388",
    category_name: "深度分析報告",
    turnaround: "深度玄空排盤",
    description: "九運（2024–2043）住宅風水專項分析，評估物業在離九運之氣運走向、正神零神方位與佈局參考。",
    features: [
      "九運物業氣運分析",
      "正神與零神坐向參考",
      "長遠空間調和指引",
      "專屬分析報告"
    ],
    type: "digital"
  },
  {
    id: "srv-synastry-love",
    title: "雙人合盤・愛情／婚姻",
    price_hkd: 688,
    price_display: "HK$688",
    category_name: "雙人合盤",
    turnaround: "即時生成 · 雙人對照",
    description: "輸入雙方出生年月日時，進行天干地支相合相生、五行互補與相處溝通指引。",
    features: [
      "雙方五行互補評估",
      "干支相合與相處特質",
      "相處盲點與理解建議",
      "合盤分析報告"
    ],
    type: "digital"
  },
  {
    id: "srv-house-5yr",
    title: "住宅風水・5年布局",
    price_hkd: 688,
    price_display: "HK$688",
    category_name: "家居風水",
    turnaround: "戶型圖分析",
    description: "結合八宅與玄空九星，推算未來 5 年住宅各方位之氣流與星位流轉，提供起居調和參考。",
    features: [
      "房屋九宮格飛星排盤",
      "未來 5 年空間催旺點",
      "玄關、客廳、睡房調和建議",
      "完整佈局指引"
    ],
    type: "digital"
  },
  {
    id: "srv-life-nav-3yr",
    title: "八字人生導航・未來3年",
    price_hkd: 588,
    price_display: "HK$588",
    category_name: "綜合報告",
    turnaround: "即時生成 · 綜合報告",
    description: "貫通事業、財運、感情與大運流年變化，提供未來 3 年的全面推演手冊。",
    features: [
      "命盤原局結構剖析",
      "三年運勢節律梳理",
      "階段規劃參考建議",
      "完整分析文件"
    ],
    type: "digital"
  },
  {
    id: "srv-monthly-decision",
    title: "十二流月吉凶＋重大決策",
    price_hkd: 488,
    price_display: "HK$488",
    category_name: "決策指南",
    turnaround: "即時生成 · 決策矩陣",
    description: "包含完整十二流月預測，並額外加入置業、簽約、重大交易或變動之時機參考。",
    features: [
      "全套十二流月干支排盤",
      "重大決策時機參考",
      "風險與時窗提點",
      "決策分析報告"
    ],
    type: "digital"
  },
  {
    id: "srv-monthly-12",
    title: "十二流月吉凶",
    price_hkd: 368,
    price_display: "HK$368",
    category_name: "流月曆",
    turnaround: "即時生成 · 流月曆",
    description: "按二十四節氣精確推算整年 12 個流月之天干地支與原局關係，月度動態清晰明瞭。",
    features: [
      "12 個流月特點與標記",
      "每月重要節點提醒",
      "生活與工作節奏建議",
      "全年流月總覽"
    ],
    type: "digital"
  },
  {
    id: "srv-biz-3yr",
    title: "創業／投資・未來3年",
    price_hkd: 288,
    price_display: "HK$288",
    category_name: "商業推演",
    turnaround: "即時生成 · 分析報告",
    description: "針對合作創業、投資評估與拓展時機進行推演，分析個人命盤特質與商業節奏契合度。",
    features: [
      "合夥人五行互補考量",
      "資金節奏與時機分析",
      "適合切入月份建議",
      "商業決策參考"
    ],
    type: "digital"
  },
  {
    id: "srv-love-3yr",
    title: "感情／姻緣・未來3年",
    price_hkd: 188,
    price_display: "HK$188",
    category_name: "姻緣報告",
    turnaround: "即時生成 · 深度解讀",
    description: "分析命盤夫妻宮與桃花星動向，推算未來 3 年感情契機、相處特點與維繫建議。",
    features: [
      "夫妻宮與感情特質剖析",
      "未來 3 年感情走勢觀察",
      "相處溝通指引",
      "脫單與穩定時窗分析"
    ],
    type: "digital"
  },
  {
    id: "srv-career-3yr",
    title: "事業／財運・未來3年",
    price_hkd: 188,
    price_display: "HK$188",
    category_name: "事業報告",
    turnaround: "即時生成 · 深度解讀",
    description: "專注工作與財運配置，推算未來 3 年職場發展機會、轉職節奏與財務平穩之道。",
    features: [
      "個人適合領域與工作特點",
      "轉職與發展時機提點",
      "未來 3 年財務起伏曲線",
      "防範與規劃建議"
    ],
    type: "digital"
  },
  {
    id: "srv-ai-face",
    title: "面相運程分析",
    price_hkd: 188,
    price_display: "HK$188",
    category_name: "相學分析",
    turnaround: "提供照片 · 快速生成",
    description: "上傳正面清晰照片，分析三停五嶽、面部宮位氣色，結合年齡推算當前流年運勢特點。",
    features: [
      "三停五嶽比例與性格特質",
      "面部各宮位分析",
      "近期狀態與提點",
      "面相修飾與氣色建議"
    ],
    type: "digital"
  },
  {
    id: "srv-ai-photo-fengshui",
    title: "相片風水分析",
    price_hkd: 188,
    price_display: "HK$188",
    category_name: "空間檢測",
    turnaround: "提供空間照 · 快速生成",
    description: "上傳客廳、睡房或辦公桌照片，識別常見空間格局與動線問題，提供調和方案。",
    features: [
      "室內空間格局與動線檢視",
      "明堂與位置配置評估",
      "常見擺設禁忌提點",
      "簡易調整指引"
    ],
    type: "digital"
  },
  {
    id: "srv-elem-guide",
    title: "五行生活指南",
    price_hkd: 128,
    price_display: "HK$128",
    category_name: "生活指南",
    turnaround: "即時生成 · 專屬報告",
    description: "解讀個人八字五行分佈，提供專屬顏色、日常方位與生活起居調和參考。",
    features: [
      "個人五行能量分佈圖",
      "合適顏色與日常座向建議",
      "起居與作息調養參考",
      "專屬生活指南卡"
    ],
    type: "digital"
  }
];
