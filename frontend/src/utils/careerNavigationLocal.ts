import { calculateLocalBazi } from './baziLocalEngine';

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEM_ELEMENT: Record<string, string> = { "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水" };
const BRANCH_ELEMENT: Record<string, string> = { "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水" };
const GENERATING_ELEMENT: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
const CONTROLLED_ELEMENT: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };
const CONTROLLING_ELEMENT: Record<string, string> = { "木": "金", "火": "水", "土": "木", "金": "火", "水": "土" };

const SIX_HARMONIES: Record<string, string> = { "子": "丑", "丑": "子", "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯", "辰": "酉", "酉": "辰", "巳": "申", "申": "巳", "午": "未", "未": "午" };
const SIX_CLASHES: Record<string, string> = { "子": "午", "午": "子", "丑": "未", "未": "丑", "寅": "申", "申": "寅", "卯": "酉", "酉": "卯", "辰": "戌", "戌": "辰", "巳": "亥", "亥": "巳" };
const STEM_COMBINATIONS: Record<string, string> = { "甲": "己", "己": "甲", "乙": "庚", "庚": "乙", "丙": "辛", "辛": "丙", "丁": "壬", "壬": "丁", "戊": "癸", "癸": "戊" };

const INDUSTRY_CONFIGS: Record<string, { industries: string; roles: string; colors: string; directions: string; environment: string; }> = {
  "木": { industries: "文化教育、傳媒出版、醫藥大健康、綠色環保、設計諮詢、林業農業", roles: "內容研發、人才培養、品牌企劃、策略諮詢、非營利項目運作", colors: "青綠色、翠綠、碧綠、原木色", directions: "東方、東南方", environment: "採光柔和、多綠植點綴、木質家具陳設、通風良好的清幽空間" },
  "火": { industries: "人工智能（AI）、新能源、電子科技、文化娛樂、傳媒影視、餐飲品牌", roles: "市場拓展、品牌公關、演講主持、創意設計、前沿科技推廣", colors: "朱砂紅、紫羅蘭、暖橙色、亮粉紅", directions: "南方", environment: "光線充足、明亮大氣、視野開闊、活力充沛的高層現代化辦公空間" },
  "土": { industries: "房地產建築、基礎建設、資產管理、倉儲物流、諮詢管理、農業土地", roles: "財務風控、資產審計、後勤保障、大型物資調配、團隊中樞協調", colors: "駝色、米黃色、咖啡色、大地棕", directions: "出生本地、西南方、東北方", environment: "厚重穩健、格局方正、靠山厚實（背有實牆）、安靜沈穩的辦公環境" },
  "金": { industries: "金融證券、精密製造、五金硬體、法律稽核、高端鐘錶、硬體科技", roles: "財務管理、法務合規、精算分析、質量把控、核心技術攻堅", colors: "純白、銀灰、香檳金、金屬亮色", directions: "西方、西北方", environment: "極簡線條、金屬質感裝飾、整潔俐落、高效無雜亂的現代化格局" },
  "水": { industries: "現代物流、跨國商貿、國際貿易、電子商務、諮詢顧問、水利海洋", roles: "商務拓展（BD）、公關傳播、全球供應鏈協同、動態市場分析", colors: "深海藍、墨黑、霧霾藍、藏青色", directions: "北方", environment: "動線靈活流暢、臨水或配備流動水景、空間靈動多變的開放式辦公格局" }
};

export interface CareerMatrixItem {
  period: string;
  yearStemBranch: string;
  monthStemBranch: string;
  careerScore: number;
  wealthScore: number;
  promotionScore: number;
  jobChangeScore: number;
  isClash: boolean;
  isHarmony: boolean;
  advice: string;
}

export interface CareerNavigationData {
  reportId: string;
  solarDate: string;
  gender: string;
  fourPillars: { year: string; month: string; day: string; hour: string; };
  dayMaster: string;
  dayElement: string;
  patternName: string;
  industryDirections: string;
  functionalRoles: string;
  workMode: string;
  directWealthStars: number;
  indirectWealthStars: number;
  strengths: string[];
  blindSpots: string[];
  topCareerMonths: string[];
  topWealthMonths: string[];
  topChangeMonths: string[];
  cautionMonths: string[];
  favorableColors: string;
  favorableDirections: string;
  favorableEnvironment: string;
  matrix: CareerMatrixItem[];
}

export function computeCareerNavigationReport(birthDate: string = "1990-05-20", birthTime: string = "22:00", gender: string = "male", baziData?: any): CareerNavigationData {
  let chart = baziData;
  if (!chart || (!chart.pillars && !chart.fourPillars)) {
    try { chart = calculateLocalBazi(birthDate, birthTime, gender); } catch (e) { chart = null; }
  }

  const p = chart?.pillars || chart?.fourPillars || {};
  const yearStem = p.year?.stem || "庚";
  const yearBranch = p.year?.branch || "午";
  const monthStem = p.month?.stem || "辛";
  const monthBranch = p.month?.branch || "巳";
  const dayStem = p.day?.stem || "甲";
  const dayBranch = p.day?.branch || "子";
  const hourStem = p.hour?.stem || "乙";
  const hourBranch = p.hour?.branch || "亥";

  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const wealthElem = CONTROLLED_ELEMENT[dayElem] || "土";
  const officerElem = CONTROLLING_ELEMENT[dayElem] || "金";
  const monthBranchElem = BRANCH_ELEMENT[monthBranch] || "火";
  const isStrong = monthBranchElem === dayElem || monthBranchElem === CONTROLLING_ELEMENT[dayElem];

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

  if (isStrong) {
    if (monthBranchElem === wealthElem) {
      patternName = "食傷生財 · 巨商拓殖格";
      workMode = "合夥創業／商業操盤／項目操盤手（商業變現型）";
      strengths = ["商業敏銳度極高，善於發現盈利契機並快速落地", "資源整合力強，擅長以小博大、商務談判具說服力", "重視現金流與資金轉化效率，適應高風險高回報市場"];
      blindSpots = ["戰線容易拉得過長，耐性隨專案週期變長而減弱", "排斥常規行政審批流程，需搭配嚴謹細緻的二把手配合"];
    } else {
      patternName = "建祿陽刃 · 開疆立業格";
      workMode = "新業務開拓／項目負責人（PM）／獨立創始人（開拓先鋒型）";
      strengths = ["執行力極強，遇強則強，敢打硬仗，面對逆境韌性超群", "行動力快，善於在新領域撕開缺口，帶領團隊攻城拔寨", "為人爽朗重義，在核心團隊中極具個人號召力"];
      blindSpots = ["凡事習慣親力親為，授權意識較弱，容易造成個人精力透支", "行事風格較直率剛硬，需多注意跨部門人際溝通的圓融度"];
    }
  } else {
    patternName = "木火通明 / 金水吐秀 · 專業策劃格";
    workMode = "獨立顧問／專業技術壁壘／文化傳媒／自由職業者（專業深度型）";
    strengths = ["專業壁壘深厚，在特定領域具有不可替代的個人專業IP", "邏輯嚴密，善於攻堅複雜技術難題與創意研發", "口碑與學術聲譽卓著，依靠硬核品質贏得市場長期尊重"];
    blindSpots = ["過度追求完美主義，容易在前期準備中延誤專案推廣的最佳時機", "排斥複雜的人際博弈，不擅長主動爭取個人利益最大化"];
  }

  let directWealthCount = 0;
  let indirectWealthCount = 0;
  [yearStem, monthStem, dayStem, hourStem].forEach(st => { if (STEM_ELEMENT[st] === wealthElem) directWealthCount += 1; });
  [yearBranch, monthBranch, dayBranch, hourBranch].forEach(br => { if (BRANCH_ELEMENT[br] === wealthElem) indirectWealthCount += 1; });

  const directWealthStars = Math.min(5, Math.max(1, 2 + directWealthCount));
  const indirectWealthStars = Math.min(5, Math.max(1, 1 + indirectWealthCount + (isStrong ? 1 : 0)));

  const favElement = isStrong ? wealthElem : dayElem;
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
    const isHarmony = SIX_HARMONIES[dayBranch] === monthBranchCalc;
    const isClash = SIX_CLASHES[dayBranch] === monthBranchCalc;

    if (isHarmony) { careerScore += 1.8; wealthScore += 1.6; promotionScore += 2.0; jobChangeScore += 1.0; }
    if (STEM_COMBINATIONS[dayStem] === monthStemCalc) { careerScore += 1.5; wealthScore += 1.8; promotionScore += 1.5; }
    if (BRANCH_ELEMENT[monthBranchCalc] === wealthElem || STEM_ELEMENT[monthStemCalc] === wealthElem) { wealthScore += 1.7; careerScore += 0.8; }
    if (BRANCH_ELEMENT[monthBranchCalc] === officerElem || STEM_ELEMENT[monthStemCalc] === officerElem) { promotionScore += 2.2; careerScore += 1.2; }
    if (isClash) { careerScore -= 2.0; wealthScore -= 1.4; jobChangeScore += 3.2; }

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
      isClash, isHarmony, advice
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
