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

// 1. 預約項目 (專屬一對一線上諮詢 - 僅在「預約諮詢項目」卡片彈窗中顯示)
export const BOOKING_SERVICES: ServiceItem[] = [
  {
    id: "srv-corp-fengshui-layout",
    title: "公司風水佈局",
    price_hkd: 28000,
    price_display: "HK$28,000+",
    turnaround: "線上深度規劃 · 線上視像諮詢",
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
    turnaround: "線上選址評估 · 線上視像評估",
    description: "企業擴張、搬遷或新店選址前線上深度評估。透過地圖、照片與平面圖，衡量商廈周邊環境、大廈納氣與行業五行契合度。",
    indexFeatures: [
      "多處候選商廈/地舖線上環境對比",
      "周邊道路與形煞線上檢測",
      "選址綜合評估與建議",
      "出具查宅分析報告"
    ],
    type: "consultation",
    requires_booking: true
  },
  {
    id: "srv-home-fengshui-layout",
    title: "家居風水佈局",
    price_hkd: 18000,
    price_display: "HK$18,000+",
    turnaround: "線上深度規劃 · 線上視像諮詢",
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
    turnaround: "線上置業把關 · 線上視像評估",
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
    id: "srv-master-bazi",
    title: "八字論命",
    price_hkd: 4800,
    price_display: "HK$4,800",
    turnaround: "線上視像諮詢 · 60-90 分鐘專屬線上視像 / 語音",
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
    id: "srv-company-naming",
    title: "公司定號",
    price_hkd: 3800,
    price_display: "HK$3,800",
    turnaround: "商業起名 · 3-5 工作日交付",
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
    id: "srv-inquiry-matter",
    title: "問事求謀",
    price_hkd: 2800,
    price_display: "HK$2,800",
    turnaround: "線上專項決策 · 45 分鐘專屬線上視像 / 語音",
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
    id: "srv-annual-inquiry",
    title: "流年問事",
    price_hkd: 2800,
    price_display: "HK$2,800",
    turnaround: "線上年度諮詢 · 45 分鐘專屬線上視像 / 語音",
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
    id: "srv-baby-naming",
    title: "小兒定名",
    price_hkd: 2800,
    price_display: "HK$2,800",
    turnaround: "姓名學 · 3-5 工作日交付",
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
    title: "吉時擇日",
    price_hkd: 2800,
    price_display: "HK$2,800",
    turnaround: "擇日吉課 · 2-3 工作日交付",
    description: "嫁娶、開張、入伙、動土或重要儀式吉日良辰推算，避開相沖時辰，選取吉利天時。",
    indexFeatures: [
      "主事人八字生肖避沖避煞",
      "精選吉日吉時",
      "儀式與時間節點提示",
      "擇日報告一份"
    ],
    type: "date_selection",
    requires_booking: true
  }
];

// 2. 右側線上命理服務列表 (即時生成 · 平價至貴價排列)
export const SIDEBAR_PRICE_LIST: ServiceItem[] = [
  {
    id: "srv-wuxing-guide",
    title: "五行喜忌指南",
    price_hkd: 128,
    price_display: "HK$128",
    turnaround: "即時生成 · 深度解讀",
    description: "根據閣下八字分析解讀五行分佈，點出喜忌，提供專屬日常方位與生活起居調和參考，終生受用。",
    indexFeatures: [
      "五行喜忌",
      "專屬特性",
      "生活指南",
      "事業方向",
      "人際關係"
    ],
    soloSections: [
      {
        groupTitle: "A｜專屬五行核心",
        items: [
          "1. 主要有利五行",
          "2. 次要有利五行",
          "3. 中性五行",
          "4. 次要忌用五行",
          "5. 主要忌用五行"
        ]
      },
      {
        groupTitle: "B｜專屬生活元素",
        items: [
          "1. 主要適合顏色",
          "2. 次要適合顏色",
          "3. 建議少用顏色",
          "4. 適合形狀",
          "5. 適合自然元素",
          "6. 適合設計語言",
          "7. 適合圖案",
          "8. 建議少用圖案"
        ]
      },
      {
        groupTitle: "C｜你的事業與財務",
        items: [
          "1. 適合行業",
          "2. 適合崗位",
          "3. 適合工作模式",
          "4. 適合收入／財務模式"
        ]
      },
      {
        groupTitle: "D｜專屬方位與環境",
        items: [
          "1. 建議方位",
          "2. 中性方位",
          "3. 建議避開方位",
          "4. 適合屋外環境",
          "5. 適合室內環境"
        ]
      },
      {
        groupTitle: "E｜專屬適合關係",
        items: [
          "1. 容易相處的人｜性格",
          "2. 容易相處的人｜行為",
          "3. 容易相處的人｜外型／氣質",
          "4. 適合朋友類型",
          "5. 適合伴侶類型",
          "6. 適合客戶類型",
          "7. 適合合作夥伴類型",
          "8. 適合同事類型",
          "9. 適合上司／下屬類型"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-love-nav-3yr",
    title: "姻緣導航‧未來3年",
    price_hkd: 188,
    price_display: "HK$188",
    turnaround: "即時生成 · 深度解讀",
    description: "分析八字命盤姻緣、夫妻宮與桃花動向，推算未來 3 年感情契機、相處特點與維繫建議。",
    categoriesOptions: [
      "單身",
      "曖昧／正在了解中",
      "穩定交往中",
      "已婚／有固定伴侶",
      "不透露｜純八字感情分析"
    ],
    indexFeatures: [
      "單身：感情底盤、正緣機會、最旺月份",
      "曖昧中：發展潛力、升降溫時機、轉折月份",
      "交往中：穩定度評估、推進時機、生活環境方位",
      "已婚：婚姻格局、衝突留意月份、修復期",
      "不透露：純八字桃花與正緣特徵分析"
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-career-3yr",
    title: "事業／財運・未來3年",
    price_hkd: 188,
    price_display: "HK$188",
    turnaround: "即時生成 · 深度解讀",
    description: "專注工作與財運配置，推算未來 3 年職場發展機會、轉職節奏與財務平穩之道。",
    indexFeatures: [
      "A. 事業格局",
      "B. 未來36個月事業運程",
      "C. 事業有利因素"
    ],
    soloSections: [
      {
        groupTitle: "A. 事業格局",
        items: [
          "1. 命主事業格局",
          "2. 適合的行業方向",
          "3. 適合的職能方向",
          "4. 適合的工作模式（受薪／管理／自由職業／創業）",
          "5. 正財運／偏財運",
          "6. 事業優勢",
          "7. 事業發展盲點"
        ]
      },
      {
        groupTitle: "B. 未來36個月",
        items: [
          "1. 未來36個月事業運程（0–10）",
          "2. 未來36個月收入增長機會（0–10）",
          "3. 未來36個月升職機會（0–10）",
          "4. 未來36個月轉工機會（0–10）",
          "5. 未來36個月事業運最旺月份（★–★★★★★）",
          "6. 未來36個月財運最旺月份（★–★★★★★）",
          "7. 未來36個月適合轉工／轉跑道月份（★–★★★★★）",
          "8. 未來36個月需要留意事業波折月份（★–★★★★★）"
        ]
      },
      {
        groupTitle: "C. 事業有利因素",
        items: [
          "1. 有利事業的顏色",
          "2. 有利事業的方位",
          "3. 有利事業的環境"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-biz-expand-3yr",
    title: "創業／拓展 ・未來3年",
    price_hkd: 288,
    price_display: "HK$288",
    turnaround: "即時生成 · 深度解讀",
    description: "針對合作創業、投資評估與拓展時機進行推演，分析個人命盤特質與商業節奏契合度。",
    indexFeatures: [
      "A. 創業格局",
      "B. 財運／投資",
      "C. 創業／投資 Timing",
      "D. 事業有利因素"
    ],
    soloSections: [
      {
        groupTitle: "A. 創業格局",
        items: [
          "1. 命主事業格局",
          "2. 命主創業適合度（0–10）",
          "3. 適合的創業行業方向",
          "4. 創業風險／盲點",
          "5. 適合獨資／合作",
          "6. 適合哪類型合作夥伴",
          "7. 合作中容易出現的問題"
        ]
      },
      {
        groupTitle: "B. 財運／投資",
        items: [
          "1. 適合積極型還是穩健型財務策略（積極型／穩健型）",
          "2. 未來36個月整體財運（★–★★★★★）",
          "3. 未來36個月財富累積能力（★–★★★★★）",
          "4. 未來36個月收入增長機會（★–★★★★★）",
          "5. 未來36個月財務風險月份（★–★★★★★）"
        ]
      },
      {
        groupTitle: "C. 創業／投資 Timing",
        items: [
          "1. 未來36個月創業機會（0–10）",
          "2. 未來36個月適合開始新項目的月份（★–★★★★★）",
          "3. 未來36個月適合擴張的月份（★–★★★★★）",
          "4. 未來36個月適合守成的月份（★–★★★★★）",
          "5. 未來36個月行動策略：保守／可試／積極（★–★★★★★）"
        ]
      },
      {
        groupTitle: "D. 事業有利因素",
        items: [
          "1. 有利事業的顏色",
          "2. 有利事業的方位",
          "3. 有利事業的環境"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-monthly-12-deep",
    title: "十二流月運程",
    price_hkd: 488,
    price_display: "HK$488",
    turnaround: "即時生成 · 深度解讀",
    description: "精確推算未來12個月事業、財運、愛情、人際、重要事件＋逐月分析，月度動態清晰明瞭。",
    indexFeatures: [
      "未來12個月逐月分析",
      "整體運勢、事業、財運、愛情、人際",
      "重要事件／轉折提點",
      "最旺月份與最需留意月份"
    ],
    soloSections: [
      {
        groupTitle: "未來12個月逐月分析項目",
        items: [
          "1. 未來12個月整體運勢",
          "2. 事業運",
          "3. 財運",
          "4. 愛情運",
          "5. 人際運",
          "6. 未來12個月主要發展主題",
          "7. 未來12個月重要事件／轉折",
          "8. 最旺月份",
          "9. 最需要留意月份"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-monthly-decision-matrix",
    title: "十二流月運程＋重大決策",
    price_hkd: 688,
    price_display: "HK$688",
    turnaround: "即時生成 · 決策矩陣",
    description: "精確推算未來12個月運程，月度動態清晰明瞭，並額外加入決策選項（最多可選 3 項進行專屬 Timing 評級）。",
    decisionOptions: [
      "轉工／轉跑道",
      "升職／爭取新職位",
      "創業／開始新項目",
      "擴張／開新市場",
      "投資／重大財務決定",
      "結婚／訂婚",
      "分手／結束一段關係",
      "搬屋／搬遷",
      "移民／海外發展",
      "合夥／加入新合作"
    ],
    indexFeatures: [
      "十二流月逐月精準預測",
      "自選 1-3 項重大決策進行針對性 Timing 評級",
      "最佳月份、次佳月份、不宜月份清晰矩陣",
      "具體計劃時間節點推進建議"
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-bazi-nav-3yr-coming",
    title: "八字人生導航・未來3年",
    price_hkd: 0,
    price_display: "即將登場",
    turnaround: "即將登場",
    description: "貫通事業、財運、感情與大運流年變化，提供未來 3 年的全面推演手冊（即將正式推出）。",
    isComingSoon: true,
    indexFeatures: [
      "命盤原局結構剖析",
      "三年運勢節律梳理",
      "階段規劃參考建議",
      "即將登場 · 敬請期待"
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-synastry-love-688",
    title: "雙人合盤・愛情／婚姻",
    price_hkd: 688,
    price_display: "HK$688",
    turnaround: "即時生成 · 雙人對照",
    description: "輸入雙方出生年月日時，進行天干地支相合相生、五行互補與相處溝通指引。",
    categoriesOptions: [
      "1. 計劃發展",
      "2. 懷疑關係",
      "3. 破鏡重圓"
    ],
    indexFeatures: [
      "共通：01 雙方特性、02 關係格局、03 未來12個月關係走勢",
      "計劃發展：長久發展潛力、向好/轉差時期、升溫關鍵月份",
      "懷疑關係：潛在問題、容易出現時期、針對性修補方式",
      "破鏡重圓：重大向好/向差轉折、突破時期、決定性月份"
    ],
    soloSections: [
      {
        groupTitle: "01｜雙方特性",
        items: [
          "A 感情特質",
          "B 感情特質",
          "互補點",
          "容易衝突點"
        ]
      },
      {
        groupTitle: "02｜關係格局",
        items: [
          "關係整體",
          "相處模式",
          "溝通模式",
          "感情穩定度",
          "關係發展潛力",
          "未來 12個月關係發展走勢"
        ]
      },
      {
        groupTitle: "03｜未來12個月關係走勢",
        items: [
          "計劃發展：長久潛力、關鍵月份、維持建議",
          "懷疑關係：潛在問題、轉好時期、針對性修補",
          "破鏡重圓：重大轉折、突破時期、應對建議"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  },
  {
    id: "srv-house-fengshui-5yr",
    title: "住宅風水・5年布局",
    price_hkd: 888,
    price_display: "HK$888",
    turnaround: "交付方式：戶型圖分析 · 即時生成",
    description: "結合八宅與玄空九星，推算未來五年住宅各方位之氣流與星位流轉，提供起居調和參考。（需提供屋主八字、地址、平面圖、入住年份）",
    indexFeatures: [
      "01｜住宅格局",
      "02｜九運風水",
      "03｜流年風水",
      "04｜空間布局",
      "05｜實際調整",
      "06｜5年布局導航"
    ],
    soloSections: [
      {
        groupTitle: "01｜住宅格局",
        items: [
          "整體住宅格局",
          "大門／客廳／睡房等主要位置",
          "有利位置",
          "需要留意位置",
          "住宅主要問題"
        ]
      },
      {
        groupTitle: "02｜九運風水",
        items: [
          "九運住宅整體布局",
          "九運有利位置",
          "九運財位",
          "九運文昌位",
          "九運桃花位",
          "九運健康／病位",
          "九運需要留意位置"
        ]
      },
      {
        groupTitle: "03｜流年風水",
        items: [
          "未來五年流年布局",
          "每年流年財位",
          "每年流年文昌位",
          "每年流年桃花位",
          "每年流年健康／病位",
          "每年流年需要留意位置",
          "每年適合／避免的布局"
        ]
      },
      {
        groupTitle: "04｜空間布局",
        items: [
          "大門",
          "客廳",
          "主人房",
          "睡房",
          "書房／工作區",
          "廚房",
          "其他重要空間"
        ]
      },
      {
        groupTitle: "05｜實際調整",
        items: [
          "家具擺位",
          "顏色",
          "材質",
          "燈光",
          "裝飾／物件",
          "建議增加／減少元素"
        ]
      },
      {
        groupTitle: "06｜5年布局導航",
        items: [
          "今年最應處理",
          "未來5年重要變化",
          "每年重點",
          "最值得優先調整3項"
        ]
      }
    ],
    type: "digital",
    requires_booking: false
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  ...BOOKING_SERVICES,
  ...SIDEBAR_PRICE_LIST
];
