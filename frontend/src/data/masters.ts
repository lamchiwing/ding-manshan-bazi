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
    title: "命理誌創辦人 · 八字與玄空風水研習者",
    region: "香港 · Hong Kong",
    languages: ["粵語", "普通話", "English"],
    specialties: ["八字格局", "玄空九運風水", "商業謀劃", "起名擇日"],
    rating: 5.0,
    reading_count: 1420,
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "研習子平八字與三元九運風水多年，致力於以理性、簡潔與現代邏輯呈現傳統命理，為個人及企業提供客觀務實的決策參考與空間規劃。",
    sessions: [
      { duration_min: 45, price_display: "HK$2,800", price_val: 2800, label: "單項問事 / 45分鐘" },
      { duration_min: 60, price_display: "HK$4,800", price_val: 4800, label: "八字詳論 / 60分鐘" },
      { duration_min: 90, price_display: "HK$6,800", price_val: 6800, label: "深度人生導航與風水諮詢 / 90分鐘" }
    ],
    available_dates: ["2026-08-31", "2026-09-01", "2026-09-02", "2026-09-03", "2026-09-04", "2026-09-05"],
    available_slots: ["10:00", "11:30", "14:00", "15:30", "17:00", "20:00"]
  }
];
