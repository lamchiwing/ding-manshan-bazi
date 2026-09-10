export interface SectionGroup {
  groupTitle: string;
  items: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  price_hkd: number;
  price_display: string;
  turnaround: string;
  description: string;
  indexFeatures?: string[];
  soloSections?: SectionGroup[];
  categoriesOptions?: string[];
  decisionOptions?: string[];
  isComingSoon?: boolean;
  type: 'consultation' | 'naming' | 'date_selection' | 'digital';
  requires_booking: boolean;
}

// 1. 線上一對一預約服務項目 (10 項專屬一對一線上服務 - 依指定順序由上至下排列)
export const BOOKING_SERVICES: ServiceItem[] = [
  {
    id: "srv-master-bazi",
    title: "八字論命",
    price_hkd: 4800,
    price_display: "HK$4,800",
    turnaround: "60分鐘視像/語音諮詢",
    description: "由丁蔓山親自排盤詳論，梳理格局喜忌、大運起伏、六親緣分與重要轉折點，附專屬命書一份。",
    indexFeatures: [
      "丁蔓山親自推演四柱八字命盤",
      "大運走勢與轉折點詳解",
      "1 對 1 深度線上解答",
      "專屬命書一份"
    ],
    type: "consultation",
    requires_booking: true
  },
  {
    id: "srv-annual-inquiry",
    title: "流年問事",
    price_hkd: 2800,
    price_display: "HK$2,800",
    turnaround: "30分鐘視像/語音諮詢",
    description: "針對當前或即將到來之一年進行批算，涵蓋十二流月動態、太歲關係與生活起居調和。",
    indexFeatures: [
      "流年太歲與原局關係詳解",
      "十二流月變化提點",
      "開運方位與日常調理建議",
      "1 對 1 線上解答"
    ],
    type: "consultation",
    requires_booking: true
  },
  {
    id: "srv-inquiry-matter",
    title: "問事求謀",
    price_hkd: 2800,
    price_display: "HK$2,800",
    turnaround: "20分鐘視像/語音諮詢",
    description: "針對特定單一事件（如工作轉換、合約簽署、重大投資、感情抉擇）進行專項起卦與命理推演。",
    indexFeatures: [
      "針對具體問題深入推演",
      "事件進展與時機分析",
      "應對策略與時窗建議",
      "1 對 1 即時線上交流"
    ],
    type: "consultation",
    requires_booking: true
  },
  {
    id: "srv-baby-naming",
    title: "小兒定名",
    price_hkd: 2800,
    price_display: "HK$2,800",
    turnaround: "30分鐘視像/語音諮詢",
    description: "根據新生兒生辰八字，遵循五行平衡、數理結構、生肖喜忌與音律意蘊，定製吉祥名字。",
    indexFeatures: [
      "生辰五行缺補平衡分析",
      "姓名數理格局配置",
      "提供 5–8 組名字建議",
      "寓意與解析書"
    ],
    type: "naming",
    requires_booking: true
  },
  {
    id: "srv-auspicious-date",
    title: "吉時擇日（生育免問）",
    price_hkd: 2800,
    price_display: "HK$2,800",
    turnaround: "30分鐘視像/語音諮詢",
    description: "嫁娶、開張、入伙、動土或重要儀式吉日良辰推算，避開相沖時辰，選取吉利天時（生育免問）。",
    indexFeatures: [
      "主事人八字生肖避沖避煞",
      "精選吉日吉時",
      "儀式與時間節點提示",
      "擇日報告一份"
    ],
    type: "date_selection",
    requires_booking: true
  },
  {
    id: "srv-company-naming",
    title: "公司定號",
    price_hkd: 3800,
    price_display: "HK$3,800",
    turnaround: "30分鐘視像/語音諮詢",
    description: "結合創辦人生辰五行、行業屬性與品牌定位，挑選合適數理與五行契合之商業名號。",
    indexFeatures: [
      "創辦人生辰與行業五行匹配",
      "數理吉凶評估",
      "提供 6–10 組商號建議",
      "名稱意涵與五行分析書"
    ],
    type: "naming",
    requires_booking: true
  },
  {
    id: "srv-home-fengshui-layout",
    title: "家居風水佈局",
    price_hkd: 18000,
    price_display: "HK$18,000+",
    turnaround: "60分鐘視像/語音諮詢",
    description: "透過線上視像與戶型平面圖，勘測住宅外在環境與室內格局，提供和諧起居與安穩聚氣的專業佈局建議。",
    indexFeatures: [
      "丁蔓山親自 1 對 1 線上視像諮詢",
      "精準戶型圖坐向與玄空飛星排盤",
      "全屋各房佈置平面圖",
      "一年內線上跟進諮詢"
    ],
    type: "consultation",
    requires_booking: true
  },
  {
    id: "srv-home-inspection",
    title: "家居查宅",
    price_hkd: 18000,
    price_display: "HK$18,000+",
    turnaround: "30分鐘視像/語音諮詢",
    description: "買樓置業或租屋前線上把關。檢視單位格局、環境採光、周邊形煞與住戶生辰五行契合度。",
    indexFeatures: [
      "置業租屋前吉凶評估與避坑",
      "周邊環境與建築格局線上檢視",
      "物業契合度分析",
      "出具查宅診斷記錄"
    ],
    type: "consultation",
    requires_booking: true
  },
  {
    id: "srv-corp-fengshui-layout",
    title: "公司風水佈局",
    price_hkd: 28000,
    price_display: "HK$28,000+",
    turnaround: "60分鐘視像/語音諮詢",
    description: "透過線上視像與建築戶型圖，針對企業辦公室、總部或商舖進行全面風水規劃。著重負責人辦公室、財務位置、大門納氣與團隊動線配置。",
    indexFeatures: [
      "丁蔓山親自 1 對 1 線上視像深入諮詢",
      "精確戶型圖坐向測定與玄空飛星立極",
      "負責人辦公位與財務區域佈局圖",
      "一年內線上跟進與調整"
    ],
    type: "consultation",
    requires_booking: true
  },
  {
    id: "srv-corp-inspection",
    title: "公司查宅",
    price_hkd: 28000,
    price_display: "HK$28,000+",
    turnaround: "30分鐘視像/語音諮詢",
    description: "企業擴張、搬遷或新店選址前線上深度評估。透過地圖、照片與平面圖，衡量商廈周邊環境、大廈納氣與行業五行契合度。",
    indexFeatures: [
      "多處候選商廈/地舖線上環境對比",
      "周邊道路與形煞線上檢測",
      "選址綜合評估與建議",
      "出具查宅分析報告"
    ],
    type: "consultation",
    requires_booking: true
  }
];

// 2. 主項右側列表 (9 項線上即時分析服務 · 全面標註「即將登場」)
export const SIDEBAR_PRICE_LIST: ServiceItem[] = [
  {
    id: "srv-five-elements",
    title: "五行喜忌指南",
    price_hkd: 128,
    price_display: "即將登場",
    turnaround: "即將登場 · 深度解讀",
    isComingSoon: true,
    description: "解讀個人八字五行分佈，提供專屬顏色、日常方位、起居調和、飲食與生活作息指引。",
    indexFeatures: [
      "個人五行能量分佈圖與喜忌",
      "合適顏色、方位與日常作息建議",
      "事業環境與財務管理五行指南",
      "專屬五行生活調和卡"
    ],
    soloSections: [
      {
        groupTitle: "A. 核心五行分析",
        items: [
          "喜用神",
          "忌神",
          "五行強弱比例"
        ]
      },
      {
        groupTitle: "B. 日常生活元素",
        items: [
          "最合適顏色 (主色／副色／需避開的顏色)",
          "幸運數字",
          "開運飾物材質 (如：水晶、金屬、玉石、木質)",
          "日常飲食五行調和建議",
          "最合適的運動類型",
          "生活作息調養建議"
        ]
      },
      {
        groupTitle: "C. 事業與財務指南",
        items: [
          "最合適發展的行業屬性",
          "工作環境佈置建議",
          "求財方向",
          "理財／投資風格建議",
          "適合的合作夥伴五行特質",
          "職場人際溝通盲點與應對"
        ]
      },
      {
        groupTitle: "D. 方位與環境",
        items: [
          "最有利的居住／工作方位",
          "書桌／辦公桌最佳朝向",
          "有利的發展城市／地區方向",
          "需避開的方位",
          "家居／辦公室開運擺設建議"
        ]
      },
      {
        groupTitle: "E. 適合的關係特質",
        items: [
          "有利於你的伴侶／朋友五行特質",
          "與不同五行人士的相處之道",
          "感情相處中的五行調和"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-love-3yr",
    title: "姻緣導航‧未來3年",
    price_hkd: 188,
    price_display: "即將登場",
    turnaround: "即將登場 · 深度解讀",
    isComingSoon: true,
    description: "全面剖析感情模式、正緣時機與未來 3 年感情運勢走向。",
    categoriesOptions: [
      "單身",
      "曖昧／了解中",
      "穩定交往中",
      "已婚／固定伴侶",
      "不透露／純八字感情分析"
    ],
    indexFeatures: [
      "個人感情原局特質與桃花格局",
      "正緣特徵、相遇時機與相處模式",
      "未來 36 個月感情運勢走向",
      "針對目前感情狀態的專屬指引"
    ],
    soloSections: [
      {
        groupTitle: "A. 核心感情格局",
        items: [
          "夫妻宮特質與配偶形象",
          "感情優勢與盲點",
          "正緣特徵（外貌氣質、性格、年齡差距、行業領域）"
        ]
      },
      {
        groupTitle: "B. 未來 3 年感情運勢走向",
        items: [
          "未來 36 個月感情起伏波段",
          "關鍵月份提示",
          "可能出現的關係轉折點",
          "感情高危期與平穩期"
        ]
      },
      {
        groupTitle: "C. 感情有利因素",
        items: [
          "有利脫單／增進感情的月份與方位",
          "社交／認識對象的最佳場合",
          "感情開運顏色與飾物"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-career-3yr",
    title: "事業／財運・未來3年",
    price_hkd: 188,
    price_display: "即將登場",
    turnaround: "即將登場 · 深度解讀",
    isComingSoon: true,
    description: "分析事業格局、正偏財運勢與未來 3 年最佳發力期與轉折點。",
    indexFeatures: [
      "事業格局分析與職場優勢",
      "未來 36 個月事業與財運走向",
      "轉工、升遷與求財有利時機",
      "事業有利因素與避坑提示"
    ],
    soloSections: [
      {
        groupTitle: "A. 事業與財運格局",
        items: [
          "事業優勢與核心競爭力",
          "適合的發展路向（大機構、專業技術、管理、自由職業）",
          "正財運 vs 偏財運強弱",
          "求財模式（穩定積累、波動爆發、技能變現）"
        ]
      },
      {
        groupTitle: "B. 未來 3 年事業／財運走向",
        items: [
          "未來 36 個月事業起伏",
          "轉工／跳槽／升職最佳時機",
          "財運高峰期與低谷期",
          "破財高危期與防範策略"
        ]
      },
      {
        groupTitle: "C. 事業有利因素",
        items: [
          "貴人方位與行業特質",
          "有利發展方向",
          "辦公桌開運佈局建議"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-startup-3yr",
    title: "創業／拓展 ・未來3年",
    price_hkd: 288,
    price_display: "即將登場",
    turnaround: "即將登場 · 商業推演",
    isComingSoon: true,
    description: "專為創業者與業務拓展者設計，評估創業命格、合夥運勢與資金節奏。",
    indexFeatures: [
      "創業格局與商業潛力評估",
      "財運／投資模式分析",
      "未來 3 年創業／投資 Timing 矩陣",
      "事業有利因素與風險防範"
    ],
    soloSections: [
      {
        groupTitle: "A. 創業格局分析",
        items: [
          "適合獨立創業、合夥還是內部孵化",
          "適合重資產還是輕資產模式",
          "適合的行業賽道（按五行及十神）",
          "合夥人五行及十神特質建議",
          "管理風格與團隊搭建建議"
        ]
      },
      {
        groupTitle: "B. 財運／投資分析",
        items: [
          "偏財／正財配比",
          "風險承受能力評估",
          "融資／借貸／現金流風險期提示"
        ]
      },
      {
        groupTitle: "C. 創業／投資 Timing（未來 3 年）",
        items: [
          "啟動項目的最佳月份",
          "擴張／加大投入的黃金期",
          "宜守不宜攻的防守期",
          "合夥／股權變動高危期"
        ]
      },
      {
        groupTitle: "D. 事業有利因素",
        items: [
          "利好方位與城市",
          "貴人特質",
          "辦公室／商舖選址風水要點"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-12-months",
    title: "十二流月運程",
    price_hkd: 488,
    price_display: "即將登場",
    turnaround: "即將登場 · 深度解讀",
    isComingSoon: true,
    description: "精確推演未來 12 個月每月的吉凶起伏、事業、財運與感情變化。",
    indexFeatures: [
      "未來 12 個月逐月運勢推演",
      "每月事業、財運、感情、健康重點",
      "關鍵吉凶月份標註",
      "每月行動指南與注意事項"
    ],
    soloSections: [
      {
        groupTitle: "未來 12 個月逐月分析",
        items: [
          "每月綜合運勢評級（吉／平／凶）",
          "事業與職場走向",
          "財運與投資時機",
          "感情與人際關係",
          "健康與日常起居提點",
          "每月關鍵行動建議"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-12-months-decisions",
    title: "十二流月運程＋重大決策",
    price_hkd: 688,
    price_display: "即將登場",
    turnaround: "即將登場 · 決策矩陣",
    isComingSoon: true,
    description: "包含十二流月運程，並針對您自選的重大決策進行專項 Timing 評級分析。",
    decisionOptions: [
      "轉工／跳槽",
      "創業／開新業務",
      "買樓／置業",
      "搬屋／移居",
      "重大投資／理財",
      "進修／考牌",
      "結婚／同居",
      "生育計劃",
      "結束關係／離婚",
      "合夥／拆夥"
    ],
    indexFeatures: [
      "完整十二流月逐月深度分析",
      "自選最多 3 項重大決策（10 選 3）",
      "決策可行性評估與 Timing 評級",
      "最佳行動月份與風險防範策略"
    ],
    soloSections: [
      {
        groupTitle: "A. 十二流月逐月運程",
        items: [
          "未來 12 個月逐月吉凶起伏",
          "事業、財運、感情、健康月度指引"
        ]
      },
      {
        groupTitle: "B. 重大決策專項分析",
        items: [
          "決策可行性與八字契合度",
          "Timing 評級（★★★★★ 至 ★☆☆☆☆）",
          "最佳執行時窗（精確至月份）",
          "潛在風險與替代方案"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-bazi-navigation-3yr",
    title: "八字人生導航・未來3年",
    price_hkd: 588,
    price_display: "即將登場",
    turnaround: "即將登場 · 深度綜合",
    isComingSoon: true,
    description: "全方位人生大數據推演，跨越事業、財富、情感與健康的三年總覽。",
    indexFeatures: [
      "人生大格局與大運交接分析",
      "三年綜合運勢矩陣",
      "人生重大拐點預判",
      "即將登場 · 敬請期待"
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-synastry",
    title: "雙人合盤・愛情／婚姻",
    price_hkd: 688,
    price_display: "即將登場",
    turnaround: "即將登場 · 深度合盤",
    isComingSoon: true,
    description: "深度推演雙方八字五行生剋、緣分深淺、契合度與未來相處建議。",
    categoriesOptions: [
      "計劃發展關係（追求中／曖昧中）",
      "對現有關係有懷疑（交往中／已婚）",
      "破鏡重圓（分手／冷戰中）"
    ],
    indexFeatures: [
      "雙方八字五行生剋與互補性",
      "性格契合度與溝通模式分析",
      "未來 3 年關係走向預測",
      "相處改善建議與化解之道"
    ],
    soloSections: [
      {
        groupTitle: "A. 雙人核心合盤",
        items: [
          "五行互補指數",
          "日柱天合地合／相沖相剋分析",
          "性格默契度與潛在摩擦點",
          "雙方對彼此的命理影響"
        ]
      },
      {
        groupTitle: "B. 關係走勢預測",
        items: [
          "未來 1–3 年感情穩定度",
          "關鍵考驗期與甜蜜期",
          "長遠發展潛力評估"
        ]
      },
      {
        groupTitle: "C. 專屬相處建議",
        items: [
          "日常溝通化解策略",
          "有利雙方的開運顏色與居家擺設",
          "感情升溫指南"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-house-fengshui",
    title: "住宅風水・5年布局",
    price_hkd: 888,
    price_display: "即將登場",
    turnaround: "即將登場 · 即時生成",
    isComingSoon: true,
    description: "結合屋主八字與住宅戶型圖，打造九運 5 年旺財旺丁旺健康的空間佈局。",
    indexFeatures: [
      "九運住宅玄空飛星立極",
      "客廳、主臥、廚房、財位專項佈局",
      "未來 5 年流年凶星避開指引",
      "全屋開運色彩與吉祥物建議"
    ],
    soloSections: [
      {
        groupTitle: "01. 住宅基礎測定",
        items: [
          "房屋坐向與九運飛星盤",
          "大門納氣吉凶評估"
        ]
      },
      {
        groupTitle: "02. 核心區域佈局",
        items: [
          "明財位與暗財位催旺法",
          "主臥室睡床安放與感情保溫",
          "書房／文昌位催旺（利進修升職）"
        ]
      },
      {
        groupTitle: "03. 廚衛化煞",
        items: [
          "廚房水火相衝化解",
          "洗手間污氣抑制與除穢"
        ]
      },
      {
        groupTitle: "04. 5 年流年避凶",
        items: [
          "2026–2030 年二黑五黃凶星方位",
          "各年簡易化煞指南"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  }
];
