import { calculateLocalBazi } from './baziLocalEngine';

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEM_ELEMENT: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
  "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水"
};

const BRANCH_ELEMENT: Record<string, string> = {
  "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火",
  "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水"
};

const BRANCH_MAIN_HIDDEN_STEM: Record<string, string> = {
  "子": "癸", "丑": "己", "寅": "甲", "卯": "乙", "辰": "戊", "巳": "丙",
  "午": "丁", "未": "己", "申": "庚", "酉": "辛", "戌": "戊", "亥": "壬"
};

const GENERATING_ELEMENT: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
const GENERATED_BY: Record<string, string> = { "火": "木", "土": "火", "金": "土", "水": "金", "木": "水" };
const CONTROLLED_ELEMENT: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };
const CONTROLLING_ELEMENT: Record<string, string> = { "木": "金", "火": "水", "土": "木", "金": "火", "水": "土" };

const SIX_HARMONIES: Record<string, string> = {
  "子": "丑", "丑": "子", "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯",
  "辰": "酉", "酉": "辰", "巳": "申", "申": "巳", "午": "未", "未": "午"
};

const SIX_CLASHES: Record<string, string> = {
  "子": "午", "午": "子", "丑": "未", "未": "丑", "寅": "申", "申": "寅",
  "卯": "酉", "酉": "卯", "辰": "戌", "戌": "辰", "巳": "亥", "亥": "巳"
};

const STEM_COMBINATIONS: Record<string, string> = {
  "甲": "己", "己": "甲", "乙": "庚", "庚": "乙", "丙": "辛", "辛": "丙",
  "丁": "壬", "壬": "丁", "戊": "癸", "癸": "戊"
};

function getTenGodType(selfStem: string, targetStem: string): string {
  const selfElem = STEM_ELEMENT[selfStem];
  const targetElem = STEM_ELEMENT[targetStem];
  const samePolarity = (STEMS.indexOf(selfStem) % 2) === (STEMS.indexOf(targetStem) % 2);

  if (selfElem === targetElem) return samePolarity ? "比肩" : "劫財";
  if (GENERATING_ELEMENT[selfElem] === targetElem) return samePolarity ? "食神" : "傷官";
  if (CONTROLLED_ELEMENT[selfElem] === targetElem) return samePolarity ? "偏財" : "正財";
  if (CONTROLLING_ELEMENT[selfElem] === targetElem) return samePolarity ? "七殺" : "正官";
  if (GENERATED_BY[selfElem] === targetElem) return samePolarity ? "偏印" : "正印";
  return "比肩";
}

const INDUSTRY_CONFIGS: Record<string, {
  industries: string; roles: string; colors: string; directions: string; environment: string;
}> = {
  "木": {
    industries: "文化教育、傳媒出版、醫藥大健康、綠色環保、設計諮詢、農業林業",
    roles: "內容研發、人才培養、品牌企劃、策略諮詢、非營利項目運作",
    colors: "青綠色、翠綠、碧綠、原木色", directions: "東方、東南方",
    environment: "採光柔和、多綠植點綴、木質家具陳設、通風良好的清幽空間"
  },
  "火": {
    industries: "人工智能（AI）、新能源、電子科技、文化娛樂、傳媒影視、餐飲品牌",
    roles: "市場拓展、品牌公關、演講主持、創意設計、前沿科技推廣",
    colors: "朱砂紅、紫羅蘭、暖橙色、亮粉紅", directions: "南方",
    environment: "光線充足、明亮大氣、視野開闊、活力充沛的高層現代化辦公空間"
  },
  "土": {
    industries: "房地產建築、基礎建設、資產管理、倉儲物流、諮詢管理、農業土地",
    roles: "財務風控、資產審計、後勤保障、大型物資調配、團隊中樞協調",
    colors: "駝色、米黃色、咖啡色、大地棕", directions: "出生本地、西南方、東北方",
    environment: "厚重穩健、格局方正、靠山厚實（背有實牆）、安靜沈穩的辦公環境"
  },
  "金": {
    industries: "金融證券、精密製造、五金硬體、法律稽核、高端鐘錶、硬體科技",
    roles: "財務管理、法務合規、精算分析、質量把控、核心技術攻堅",
    colors: "純白、銀灰、香檳金、金屬亮色", directions: "西方、西北方",
    environment: "極簡線條、金屬質感裝飾、整潔俐落、高效無雜亂的現代化格局"
  },
  "水": {
    industries: "現代物流、跨國商貿、國際貿易、電子商務、諮詢顧問、水利海洋",
    roles: "商務拓展（BD）、公關傳播、全球供應鏈協同、動態市場分析",
    colors: "深海藍、墨黑、霧霾藍、藏青色", directions: "北方",
    environment: "動線靈活流暢、臨水或配備流動水景、空間靈動多變的開放式辦公格局"
  }
};

export interface CareerMatrixItem {
  period: string; yearStemBranch: string; monthStemBranch: string;
  careerScore: number; wealthScore: number; promotionScore: number; jobChangeScore: number;
  isClash: boolean; isHarmony: boolean; advice: string;
}

export interface CareerNavigationData {
  reportId: string; solarDate: string; gender: string;
  fourPillars: { year: string; month: string; day: string; hour: string; };
  dayMaster: string; dayElement: string; patternName: string;
  industryDirections: string; functionalRoles: string; workMode: string;
  directWealthStars: number; indirectWealthStars: number;
  strengths: string[]; blindSpots: string[];
  topCareerMonths: string[]; topWealthMonths: string[]; topChangeMonths: string[]; cautionMonths: string[];
  favorableColors: string; favorableDirections: string; favorableEnvironment: string;
  matrix: CareerMatrixItem[];
}

export function computeCareerNavigationReport(
  birthDate: string = "1990-05-20",
  birthTime: string = "22:00",
  gender: string = "male",
  baziData?: any
): CareerNavigationData {
  let chart = baziData;
  if (!chart || (!chart.pillars && !chart.fourPillars)) {
    try { chart = calculateLocalBazi(birthDate, birthTime, gender); } catch (e) { chart = null; }
  }

  const p = chart?.pillars || chart?.fourPillars || {};
  const yearStem = p.year?.stem || "庚";
  const yearBranch = p.year?.branch || "午";
  const monthStem = p.month?.stem || "辛";
  const monthBranch = p.month?.branch || "巳";
  const dayStem = p.day?.stem || "乙";
  const dayBranch = p.day?.branch || "酉";
  const hourStem = p.hour?.stem || "丁";
  const hourBranch = p.hour?.branch || "亥";

  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const wealthElem = CONTROLLED_ELEMENT[dayElem] || "土";
  const officerElem = CONTROLLING_ELEMENT[dayElem] || "金";

  // 1. 動態身強／身弱判定
  let selfSupportScore = 0;
  const monthBranchElem = BRANCH_ELEMENT[monthBranch];
  if (monthBranchElem === dayElem || monthBranchElem === GENERATED_BY[dayElem]) selfSupportScore += 40;
  [yearStem, monthStem, hourStem].forEach(st => {
    const el = STEM_ELEMENT[st];
    if (el === dayElem || el === GENERATED_BY[dayElem]) selfSupportScore += 12;
  });
  [yearBranch, dayBranch, hourBranch].forEach(br => {
    const el = BRANCH_ELEMENT[br];
    if (el === dayElem || el === GENERATED_BY[dayElem]) selfSupportScore += 10;
  });
  const isStrong = selfSupportScore >= 45;

  // 2. 月令主氣與十神定格
  const monthMainStem = BRANCH_MAIN_HIDDEN_STEM[monthBranch] || monthStem;
  let dominantStem = [yearStem, monthStem, hourStem].includes(monthMainStem) ? monthMainStem : monthStem;
  const mainTenGod = getTenGodType(dayStem, dominantStem);

  let patternName = "官印雙全 · 貴氣統籌格";
  let workMode = "大型體制／跨國機構／高階管理職業經理人";
  let strengths = [
    "組織架構協調力強，善於制定標準與規章制度",
    "具備天然威信，深得上級與平台信任，善於推動複雜跨部門專案",
    "抗壓沉穩，具備戰略定力，在逆境中能保持冷靜決策"
  ];
  let blindSpots = [
    "過度重視合規與完美主義，有時決策偏向保守而略失先機",
    "對權責邊界過於敏感，容易在人事糾葛中產生內耗"
  ];

  if (mainTenGod === "正官" || mainTenGod === "七殺") {
    if (isStrong) {
      patternName = "殺印相生 · 決策統帥格";
      workMode = "高階管理層／跨國業務總監／體制內權責領袖（決策引領型）";
      strengths = ["魄力強大，具備極強的全局統禦能力與破局手腕", "臨危不亂，善於制定關鍵架構並推動大型組織變革", "威信超卓，能帶領大部隊攻堅高難度戰略目標"];
      blindSpots = ["作風有時過於強硬，需注意團隊基層的人性化關懷", "背負責任重大時容易獨自承受超負荷精神壓力"];
    } else {
      patternName = "官印相生 · 雅正中樞格";
      workMode = "大型機構核心骨幹／行政法務風控／專家型協調主管（體制穩健型）";
      strengths = ["做事極其嚴謹規範，深諳制度合規與安全防線", "人品正派受人敬重，擅長向上管理與建立長效信任機制", "善於協同各方利益，是組織內部最穩健的中流砥柱"];
      blindSpots = ["面對突發變革時容易猶豫保守，缺乏放手一搏的冒險心", "易因他人未按規範行事而產生內部焦慮"];
    }
  } else if (mainTenGod === "正財" || mainTenGod === "偏財") {
    if (isStrong) {
      patternName = "食傷生財 · 巨商拓殖格";
      workMode = "合夥創業／商業操盤／項目操盤手／資本運作（商業變現型）";
      strengths = ["市場嗅覺極度敏銳，能第一時間捕捉商業風口並實現盈利", "商務談判說服力極強，擅長以小博大、撬動外部核心資源", "現金流觀念強，行事高效靈活，適應高風險高回報市場"];
      blindSpots = ["容易因追求高速擴張而分散戰線，需加強合約細節把控", "對繁瑣行政審批缺乏耐性，宜搭配穩健營運副手"];
    } else {
      patternName = "財氣通門戶 · 務實營運格";
      workMode = "專業財務審計／供應鏈管理／商務BD主管（穩健創收型）";
      strengths = ["成本控制與資源分配能力極強，精打細算、務實精準", "對數字與商業回報率具備天然敏感度，重視長期資產積累", "為人踏實守信，能將商業項目穩步推向收成階段"];
      blindSpots = ["格局容易受限於短期收益，需適度放眼長期戰略規劃", "面對資金大起大落時心理壓力較大，需做好風控防線"];
    }
  } else if (mainTenGod === "食神" || mainTenGod === "傷官") {
    // 依據日主五行，精準賦予唯一的吐秀格局，絕不使用模糊的斜線「/」
    if (dayElem === "木") {
      patternName = "木火通明 · 菁英策劃格";
    } else if (dayElem === "金") {
      patternName = "金水吐秀 · 專業智囊格";
    } else if (dayElem === "水") {
      patternName = "水木清奇 · 創新研發格";
    } else if (dayElem === "火") {
      patternName = "火土成慈 · 實務架構格";
    } else {
      patternName = "土金毓秀 · 卓越工匠格";
    }
    workMode = "獨立顧問／專業技術壁壘／創意總監／自由職業IP（專業深度型）";
    strengths = ["創意豐富，在專業技術或內容創作領域具備不可替代的個人IP", "邏輯嚴密，善於研發全新方法論並解決高難度技術痛點", "對品質追求極致，依靠過硬實力贏得業界長期口碑"];
    blindSpots = ["自尊心強不喜受制於繁文縟節，需多修煉職場人情世故", "工作情緒容易受外界環境波動影響，需建立穩定產出節奏"];
  } else if (mainTenGod === "正印" || mainTenGod === "偏印") {
    patternName = "印綬護身 · 智庫顧問格";
    workMode = "資深顧問／學術科研／教育培訓／策略智囊（深度智囊型）";
    strengths = ["學術與知識儲備深厚，善於在幕後運籌帷幄、制定核心戰略", "心性沉著穩重，抗干擾能力強，在混亂局面中能保持理智洞察", "深受同儕信任，是團隊最具智慧的思想領袖與精神支柱"];
    blindSpots = ["容易重理論而輕實踐落地，需加強商業化執行敏銳度", "偶爾防備心過重，不易輕易對新搭檔敞開心扉"];
  } else {
    patternName = "建祿陽刃 · 開疆立業格";
    workMode = "獨立創業者／新業務開拓先鋒／項目合夥人（先鋒打拼型）";
    strengths = ["執行力超群，敢打硬仗，面對任何逆境皆能保持旺盛鬥志", "勇於承擔責任，敢為人先，善於在空白市場開闢全新根據地", "為人爽朗重義氣，在團隊內部具備極高的號召力與感染力"];
    blindSpots = ["凡事習慣親力親為、授權意識較弱，容易造成個人體能過載", "性格直爽剛烈，需注意跨部門溝通時的語言圓融技巧"];
  }

  let directWealthCount = 0;
  let indirectWealthCount = 0;
  [yearStem, monthStem, dayStem, hourStem].forEach(st => { if (STEM_ELEMENT[st] === wealthElem) directWealthCount += 1; });
  [yearBranch, monthBranch, dayBranch, hourBranch].forEach(br => { if (BRANCH_ELEMENT[br] === wealthElem) indirectWealthCount += 1; });

  const directWealthStars = Math.min(5, Math.max(1, 2 + directWealthCount + (isStrong ? 1 : 0)));
  const indirectWealthStars = Math.min(5, Math.max(1, 1 + indirectWealthCount + (mainTenGod.includes("財") ? 2 : 0)));

  let favElement = !isStrong ? GENERATED_BY[dayElem] : ((mainTenGod === "正官" || mainTenGod === "七殺") ? officerElem : wealthElem);
  const favInfo = INDUSTRY_CONFIGS[favElement] || INDUSTRY_CONFIGS["金"];

  const matrix: CareerMatrixItem[] = [];
  const startYear = 2026, startMonth = 10;
  for (let idx = 0; idx < 36; idx++) {
    const totalMonths = startYear * 12 + (startMonth - 1) + idx;
    const y = Math.floor(totalMonths / 12);
    const m = (totalMonths % 12) + 1;
    const periodStr = `${y}/${String(m).padStart(2, "0")}`;
    const yearStemCalc = STEMS[(y - 4) % 10];
    const yearBranchCalc = BRANCHES[(y - 4) % 12];
    const monthBranchCalc = BRANCHES[(m + 1) % 12];
    const monthStemCalc = STEMS[((y % 5) * 2 + m + 1) % 10];

    let careerScore = 6.8, wealthScore = 6.6, promotionScore = 6.2, jobChangeScore = 5.5;
    if (SIX_HARMONIES[dayBranch] === monthBranchCalc) { careerScore += 1.8; wealthScore += 1.6; promotionScore += 2.0; jobChangeScore += 1.0; }
    if (STEM_COMBINATIONS[dayStem] === monthStemCalc) { careerScore += 1.5; wealthScore += 1.8; promotionScore += 1.5; }
    if (BRANCH_ELEMENT[monthBranchCalc] === wealthElem || STEM_ELEMENT[monthStemCalc] === wealthElem) { wealthScore += 1.7; careerScore += 0.8; }
    if (BRANCH_ELEMENT[monthBranchCalc] === officerElem || STEM_ELEMENT[monthStemCalc] === officerElem) { promotionScore += 2.2; careerScore += 1.2; }
    if (SIX_CLASHES[dayBranch] === monthBranchCalc) { careerScore -= 2.0; wealthScore -= 1.4; jobChangeScore += 3.2; }

    const wave = ((idx * 7 + dayStem.charCodeAt(0)) % 10 - 4.5) * 0.15;
    careerScore = Math.round(Math.min(9.9, Math.max(3.5, careerScore + wave)) * 10) / 10;
    wealthScore = Math.round(Math.min(9.9, Math.max(3.5, wealthScore + wave)) * 10) / 10;
    promotionScore = Math.round(Math.min(9.9, Math.max(3.0, promotionScore + wave)) * 10) / 10;
    jobChangeScore = Math.round(Math.min(9.9, Math.max(3.0, jobChangeScore + wave)) * 10) / 10;

    let advice = "平穩推進，深耕核心技能與人脈積累";
    if (promotionScore >= 8.5) advice = "貴人提攜，主動向上爭取核心項目主導權";
    else if (wealthScore >= 8.5) advice = "財星生旺，適合談薪調職或開展高回報副業";
    else if (jobChangeScore >= 8.5) advice = "驛馬逢動，正是跳槽換道、爭取更高待遇之良機";
    else if (careerScore <= 5.2) advice = "氣場偏弱，宜低調防守，避免衝動做重大決定";

    matrix.push({
      period: periodStr,
      yearStemBranch: `${yearStemCalc}${yearBranchCalc}`,
      monthStemBranch: `${monthStemCalc}${monthBranchCalc}`,
      careerScore, wealthScore, promotionScore, jobChangeScore,
      isClash: SIX_CLASHES[dayBranch] === monthBranchCalc,
      isHarmony: SIX_HARMONIES[dayBranch] === monthBranchCalc,
      advice
    });
  }

  const sortedCareer = [...matrix].sort((a, b) => b.careerScore - a.careerScore);
  const sortedWealth = [...matrix].sort((a, b) => b.wealthScore - a.wealthScore);
  const sortedChange = [...matrix].sort((a, b) => b.jobChangeScore - a.jobChangeScore);
  const sortedCaution = [...matrix].sort((a, b) => a.careerScore - b.careerScore);

  return {
    reportId: `TMS-CAREER-${birthDate.replace(/-/g, "")}`,
    solarDate: `${birthDate} ${birthTime}`,
    gender: gender === "male" ? "乾造（男）" : "坤造（女）",
    fourPillars: {
      year: `${yearStem}${yearBranch}`,
      month: `${monthStem}${monthBranch}`,
      day: `${dayStem}${dayBranch}`,
      hour: `${hourStem}${hourBranch}`
    },
    dayMaster: dayStem,
    dayElement: dayElem,
    patternName,
    industryDirections: favInfo.industries,
    functionalRoles: favInfo.roles,
    workMode,
    directWealthStars,
    indirectWealthStars,
    strengths,
    blindSpots,
    topCareerMonths: sortedCareer.slice(0, 3).map(x => `${x.period}（${x.careerScore}分）`),
    topWealthMonths: sortedWealth.slice(0, 3).map(x => `${x.period}（${x.wealthScore}分）`),
    topChangeMonths: sortedChange.slice(0, 3).map(x => `${x.period}（${x.jobChangeScore}分）`),
    cautionMonths: sortedCaution.slice(0, 3).map(x => `${x.period}（防口舌阻滯）`),
    favorableColors: favInfo.colors,
    favorableDirections: favInfo.directions,
    favorableEnvironment: favInfo.environment,
    matrix
  };
}
