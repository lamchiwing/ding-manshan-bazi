export interface ArticleItem {
  id: string;
  category: string;
  title: string;
  readTime: string;
  summary: string;
  publishedDate: string;
  author: string;
}

export type LibraryArticle = ArticleItem;

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "art-1",
    category: "八字",
    title: "解構四柱八字：年、月、日、時所承載的人生密碼",
    readTime: "4 分鐘閱讀",
    summary: "從根基、成長、自我到晚年，四柱如何像時空座標般折射一個人的能量場與命運節律。",
    publishedDate: "2026.08",
    author: "丁蔓山"
  },
  {
    id: "art-2",
    category: "四柱推命",
    title: "四柱推命與子平八字的流變與精微異同",
    readTime: "6 分鐘閱讀",
    summary: "從古典命理到現代詮釋，如何以更細膩客觀的視角重新理解十神與行運變遷。",
    publishedDate: "2026.07",
    author: "丁蔓山"
  },
  {
    id: "art-3",
    category: "九運風水",
    title: "2024–2043 離九運大勢：科技、女性與南方火旺的二十年佈局",
    readTime: "8 分鐘閱讀",
    summary: "九運當令，玄空風水正神零神易位，住宅與商業物業如何借火運之力順勢調和。",
    publishedDate: "2026.06",
    author: "丁蔓山"
  },
  {
    id: "art-4",
    category: "十神",
    title: "何謂「正官」與「七殺」？職場權力與責任的雙重維度",
    readTime: "5 分鐘閱讀",
    summary: "官殺代表約束與權力。清貴之官與威烈之殺，在現代商業架構中如何轉化為領導力。",
    publishedDate: "2026.05",
    author: "丁蔓山"
  },
  {
    id: "art-5",
    category: "合婚",
    title: "雙人合盤不是迷信配對，而是親密關係的情緒溝通地圖",
    readTime: "5 分鐘閱讀",
    summary: "以五行生剋洞悉伴侶間的底層價值觀差異，學習在相沖之處建立包容，在相生之處昇華默契。",
    publishedDate: "2026.04",
    author: "命理誌"
  },
  {
    id: "art-6",
    category: "五行",
    title: "五行不平衡時的自我調適：以空間、色彩與心念補充元氣",
    readTime: "4 分鐘閱讀",
    summary: "缺火者如何藉光明與熱誠補氣？金過旺者如何以水之柔和化解剛烈？極簡五行日常指南。",
    publishedDate: "2026.03",
    author: "命理誌"
  }
];

export const LIBRARY_ARTICLES = ARTICLES_DATA;
