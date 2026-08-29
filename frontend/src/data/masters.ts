export interface MasterReader {
  id: string;
  name: string;
  title: string;
  region: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reading_count: number;
  avatar_url: string;
  bio: string;
  sessions: {
    duration_min: number;
    price_display: string;
    price_val: number;
    label: string;
  }[];
  available_dates: string[];
  available_slots: string[];
}

export const MASTERS_LIST: MasterReader[] = [
  {
    id: "reader-ding",
    name: "丁蔓山",
    title: "命理誌創辦人 · 三元玄空與子平八字宗師",
    region: "香港 · Hong Kong",
    languages: ["粵語", "普通話", "English"],
    specialties: ["八字格局", "玄空九運風水", "商業謀劃", "家族傳承"],
    rating: 5.0,
    reading_count: 1420,
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "研習子平八字與三元九運堪輿逾廿載，倡導以現代極簡邏輯解構傳統玄學，曾為逾百家上市公司高管及各界名流提供深度決策與命理顧問服務。",
    sessions: [
      { duration_min: 45, price_display: "HK$2,800", price_val: 2800, label: "單項問事 / 45分鐘" },
      { duration_min: 60, price_display: "HK$4,800", price_val: 4800, label: "八字詳論 / 60分鐘" },
      { duration_min: 90, price_display: "HK$6,800", price_val: 6800, label: "深度人生導航與風水諮詢 / 90分鐘" }
    ],
    available_dates: ["2026-08-30", "2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04"],
    available_slots: ["10:00", "11:30", "14:00", "15:30", "17:00", "20:00"]
  },
  {
    id: "reader-yamada",
    name: "山田 拓真 (Yuki Tanaka)",
    title: "日本四柱推命學會理事 · 東洋命理研究者",
    region: "京都 · 日本 / 線上",
    languages: ["日本語", "English", "普通話"],
    specialties: ["四柱推命", "事業轉折", "感情姻緣", "心理命理學"],
    rating: 4.9,
    reading_count: 328,
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "畢業於京都大學哲學系，融合傳統日本四柱推命與現代心理學框架，專長於職場轉職評估、個人心靈調和與重大抉擇推演。",
    sessions: [
      { duration_min: 30, price_display: "¥4,800 (約HK$280)", price_val: 280, label: "精準諮詢 / 30分鐘" },
      { duration_min: 60, price_display: "¥8,800 (約HK$520)", price_val: 520, label: "標準四柱推命 / 60分鐘" },
      { duration_min: 90, price_display: "¥12,800 (約HK$750)", price_val: 750, label: "全面深度鑑定 / 90分鐘" }
    ],
    available_dates: ["2026-08-30", "2026-08-31", "2026-09-01", "2026-09-03"],
    available_slots: ["13:00", "14:30", "16:00", "19:00", "20:30"]
  },
  {
    id: "reader-lin",
    name: "林承安 師傅",
    title: "資深堪輿命理顧問 · 九運風水實戰名家",
    region: "香港 · Hong Kong",
    languages: ["粵語", "普通話"],
    specialties: ["家居風水", "公司查宅", "小兒命名", "擇日吉課"],
    rating: 4.9,
    reading_count: 890,
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "師承嶺南玄學名家，精通玄空大卦與巒頭理氣合一，專攻中高端住宅及企業空間佈局，實戰案例遍及香港、大灣區及海外。",
    sessions: [
      { duration_min: 45, price_display: "HK$2,800", price_val: 2800, label: "流年吉凶與起名擇日 / 45分鐘" },
      { duration_min: 60, price_display: "HK$4,800", price_val: 4800, label: "八字詳批 / 60分鐘" },
      { duration_min: 180, price_display: "HK$18,000+", price_val: 18000, label: "家居風水實地勘測 / 預約" }
    ],
    available_dates: ["2026-08-31", "2026-09-02", "2026-09-04", "2026-09-05"],
    available_slots: ["10:30", "14:00", "16:30"]
  }
];
