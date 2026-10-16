import { calculateLocalBazi } from './baziLocalEngine';

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const STEM_ELEMENT: Record<string, string> = { "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土", "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水" };
const BRANCH_ELEMENT: Record<string, string> = { "子": "水", "丑": "土", "寅": "木", "卯": "木", "辰": "土", "巳": "火", "午": "火", "未": "土", "申": "金", "酉": "金", "戌": "土", "亥": "水" };
const BRANCH_MAIN_HIDDEN_STEM: Record<string, string> = { "子": "癸", "丑": "己", "寅": "甲", "卯": "乙", "辰": "戊", "巳": "丙", "午": "丁", "未": "己", "申": "庚", "酉": "辛", "戌": "戊", "亥": "壬" };

const GENERATING_ELEMENT: Record<string, string> = { "木": "火", "火": "土", "土": "金", "金": "水", "水": "木" };
const GENERATED_BY: Record<string, string> = { "火": "木", "土": "火", "金": "土", "水": "金", "木": "水" };
const CONTROLLED_ELEMENT: Record<string, string> = { "木": "土", "土": "水", "水": "火", "火": "金", "金": "木" };
const CONTROLLING_ELEMENT: Record<string, string> = { "木": "金", "火": "水", "土": "木", "金": "火", "水": "土" };

const SIX_HARMONIES: Record<string, string> = { "子": "丑", "丑": "子", "寅": "亥", "亥": "寅", "卯": "戌", "戌": "卯", "辰": "酉", "酉": "辰", "巳": "申", "申": "巳", "午": "未", "未": "午" };
const SIX_CLASHES: Record<string, string> = { "子": "午", "午": "子", "丑": "未", "未": "丑", "寅": "申", "申": "寅", "卯": "酉", "酉": "卯", "辰": "戌", "戌": "辰", "巳": "亥", "亥": "巳" };
const STEM_COMBINATIONS: Record<string, string> = { "甲": "己", "己": "甲", "乙": "庚", "庚": "乙", "丙": "辛", "辛": "丙", "丁": "壬", "壬": "丁", "戊": "癸", "癸": "戊" };

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

const INDUSTRY_CONFIGS: Record<string, { industries: string; colors: string; directions: string; environment: string; }> = {
  "木": { industries: "文創教育、綠色環保科技、大健康醫藥研發、生物科技、設計諮詢、農業林業、新品牌孵化", colors: "青綠色、翠綠、碧綠、原木色", directions: "東方、東南方", environment: "採光柔和、多綠植點綴、木質家具陳設、通風良好的清幽空間" },
  "火": { industries: "人工智能（AI）、新能源、晶片半導體、餐飲連鎖、文化娛樂、傳媒影視、電商直播、新零售", colors: "朱砂紅、紫羅蘭、暖橙色、亮粉紅", directions: "南方", environment: "光線充足、明亮大氣、視野開闊、活力充沛的高層現代化辦公空間" },
  "土": { industries: "房地產建築、基礎建設、資產管理、倉儲物流、農業土產、不動產租賃、諮詢管理", colors: "駝色、米黃色、咖啡色、大地棕", directions: "出生本地、西南方、東北方", environment: "厚重穩健、格局方正、靠山厚實（背有實牆）、安靜沈穩的辦公環境" },
  "金": { industries: "金融證券、精密製造、五金硬體、法律稽核、高端鐘錶、硬體科技、醫療器械、黃金珠寶", colors: "純白、銀灰、香檳金、金屬亮色", directions: "西方、西北方", environment: "極簡線條、金屬質感裝飾、整潔俐落、高效無雜亂的現代化格局" },
  "水": { industries: "現代物流、跨國貿易、國際商貿、電子商務、水利海洋、數位營銷、供應鏈管理、流動商業", colors: "深海藍、墨黑、霧霾藍、藏青色", directions: "北方", environment: "動線靈活流暢、臨水或配備流動水景、空間靈動多變的開放式辦公格局" }
};

export interface StartupMatrixItem {
  period: string; yearStemBranch: string; monthStemBranch: string;
  opportunityScore: number; wealthAccumScore: number; expansionScore: number;
  defenseScore: number; riskScore: number; actionStrategy: '積極開拓' | '可試推進' | '穩健守成'; advice: string;
}

export interface StartupNavigationData {
  reportId: string; solarDate: string; gender: string;
  fourPillars: { year: string; month: string; day: string; hour: string; };
  dayMaster: string; dayElement: string; patternName: string; startupSuitability: number;
  industryDirections: string; startupRisks: string[]; startupMode: string;
  partnerType: string; partnerRisks: string; financialStrategy: string;
  overallWealthStars: number; wealthAccumulationStars: number; incomeGrowthStars: number;
  topNewProjectMonths: string[]; topExpansionMonths: string[]; topDefenseMonths: string[]; topRiskMonths: string[];
  favorableColors: string; favorableDirections: string; favorableEnvironment: string; matrix: StartupMatrixItem[];
}

export function computeStartupNavigationReport(birthDate: string = "1990-05-20", birthTime: string = "22:00", gender: string = "male", baziData?: any): StartupNavigationData {
  let chart = baziData;
  if (!chart || (!chart.pillars && !chart.fourPillars)) {
    try { chart = calculateLocalBazi(birthDate, birthTime, gender); } catch (e) { chart = null; }
  }
  const p = chart?.pillars || chart?.fourPillars || {};
  const yearStem = p.year?.stem || "庚", yearBranch = p.year?.branch || "午";
  const monthStem = p.month?.stem || "辛", monthBranch = p.month?.branch || "巳";
  const dayStem = p.day?.stem || "乙", dayBranch = p.day?.branch || "酉";
  const hourStem = p.hour?.stem || "丁", hourBranch = p.hour?.branch || "亥";
  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const wealthElem = CONTROLLED_ELEMENT[dayElem] || "土";
  const officerElem = CONTROLLING_ELEMENT[dayElem] || "金";

  let selfSupport = 0;
  if ([dayElem, GENERATED_BY[dayElem]].includes(BRANCH_ELEMENT[monthBranch])) selfSupport += 40;
  [yearStem, monthStem, hourStem].forEach(st => { if ([dayElem, GENERATED_BY[dayElem]].includes(STEM_ELEMENT[st])) selfSupport += 12; });
  [yearBranch, dayBranch, hourBranch].forEach(br => { if ([dayElem, GENERATED_BY[dayElem]].includes(BRANCH_ELEMENT[br])) selfSupport += 10; });
  const isStrong = selfSupport >= 45;

  const monthMainStem = BRANCH_MAIN_HIDDEN_STEM[monthBranch] || monthStem;
  let dominantStem = [yearStem, monthStem, hourStem].includes(monthMainStem) ? monthMainStem : monthStem;
  const mainTenGod = getTenGodType(dayStem, dominantStem);

  let patternName = "官印雙全 · 貴氣統籌格", suitabilityScore = 8.0;
  let startupMode = "合夥創辦／股權協同模式", partnerType = "具備強大後勤執行力與財務風控思維的副手";
  let partnerRisks = "權責模糊時容易引發控制權爭奪，需建立單一最終決策機制";
  let financialStrategy = "穩健型（重視負債比與持續正向現金流）";
  let startupRisks = ["戰線拉得過長時容易因細節失控導致資源分散", "需嚴格落實法務合約與合規風控，防範盲點漏洞"];

  if (mainTenGod === "食神" || mainTenGod === "傷官") {
    if (dayElem === "木") patternName = "木火通明 · 菁英策劃格";
    else if (dayElem === "金") patternName = "金水吐秀 · 專業智囊格";
    else if (dayElem === "水") patternName = "水木清奇 · 創新研發格";
    else if (dayElem === "火") patternName = "火土成慈 · 實務架構格";
    else patternName = "土金毓秀 · 卓越工匠格";
    suitabilityScore = isStrong ? 8.8 : 7.6;
    startupMode = "精品工作室／合夥顧問機構／輕資產獨立商業IP";
    partnerType = "擅長商務拓展（BD）、融資談判、市場渠道行銷與合約合規高手";
    partnerRisks = "過於聚焦專業產品，容易在商業博弈與收益拆分中居於被動";
    financialStrategy = "穩健蓄勢型（以智慧資產與口碑驅動，避免盲目重資產借貸）";
    startupRisks = ["過度追求完美主義，容易在前期準備中延誤商業化最佳窗口", "對純商業博弈或人事管理耐性有限，需搭配專職營運合夥人"];
  } else if (mainTenGod === "正財" || mainTenGod === "偏財") {
    patternName = isStrong ? "食傷生財 · 巨商拓殖格" : "財氣通門戶 · 務實營運格";
    suitabilityScore = isStrong ? 9.5 : 8.2;
    startupMode = "合夥創辦／股權激勵模式（主導商業核心與市場變現）";
    partnerType = "細節執行力強、精通日常內部營運與行政合規的二把手搭檔";
    partnerRisks = "商業步伐邁進太快，合夥人跟不上節奏時容易產生信任猜忌";
    financialStrategy = "積極型（善於以小博大、捕捉商業風口，以現金流擴張再投資）";
    startupRisks = ["戰線拉得過長、多項目並行時資金周轉壓力遞增", "早期輕視常規行政流程與法律合約細節，容易埋下暗雷"];
  } else if (mainTenGod === "正官" || mainTenGod === "七殺") {
    patternName = isStrong ? "殺印相生 · 決策統帥格" : "官印相生 · 雅正中樞格";
    suitabilityScore = isStrong ? 8.8 : 7.8;
    startupMode = "平台孵化／產業鏈資源合資／大型集團控股（絕對權責制）";
    partnerType = "垂直領域技術專家、外部政商公共關係合夥人、強執行力事業部總裁";
    partnerRisks = "控制權拉鋸，切忌50/50平分股權結構，必須建立單一決策核心";
    financialStrategy = "穩健中求突破型（重視資產負債率、注重核心牌照與護城河建造）";
    startupRisks = ["決策評估鏈條過長，在瞬息萬變的新興市場中可能略失搶灘先機", "管理作風偏向強勢高壓，需注意團隊骨幹的人性化激勵"];
  } else if (mainTenGod === "正印" || mainTenGod === "偏印") {
    patternName = "印綬護身 · 智庫顧問格";
    suitabilityScore = isStrong ? 7.2 : 6.5;
    startupMode = "精品智庫／技術壁壘研發中心／專業特許經營";
    partnerType = "熟悉市場變現、具備極強狼性銷售能力的前端商務合夥人";
    partnerRisks = "不擅處理商業撕扯與股權談判，容易在專案收益分配中妥協";
    financialStrategy = "穩健保守型（靠核心技術壁壘與持續研發投入維持競爭力）";
    startupRisks = ["容易重技術研發而輕市場客戶反饋，缺乏敏捷商業變現節奏", "防備心較強，不輕易向新進入的核心團隊授權"];
  } else {
    patternName = "建祿陽刃 · 開疆先鋒格";
    suitabilityScore = isStrong ? 9.0 : 7.9;
    startupMode = "獨立獨資創辦（或持有>70%絕對控股權）";
    partnerType = "財務風控專家、性格沉穩包容、擅長宏觀輔助決策的後勤大管家";
    partnerRisks = "比劫重疊易出現「同甘苦易、共富貴難」的利益衝突與分家風險";
    financialStrategy = "積極進取型（敢打硬仗、敢為人先，但必須設立強制備用金底線）";
    startupRisks = ["凡事親力親為，授權機制不足，容易造成個人心力過載", "為人直爽豪邁，需提防核心合夥人私下另起爐灶或帶走核心資源"];
  }

  let wealthCount = 0;
  [yearStem, monthStem, dayStem, hourStem].forEach(st => { if (STEM_ELEMENT[st] === wealthElem) wealthCount += 1; });
  [yearBranch, monthBranch, dayBranch, hourBranch].forEach(br => { if (BRANCH_ELEMENT[br] === wealthElem) wealthCount += 1; });

  const favInfo = INDUSTRY_CONFIGS[!isStrong ? GENERATED_BY[dayElem] : (["正官", "七殺"].includes(mainTenGod) ? officerElem : wealthElem)] || INDUSTRY_CONFIGS["金"];

  const matrix: StartupMatrixItem[] = [];
  const startYear = 2026, startMonth = 10;
  for (let idx = 0; idx < 36; idx++) {
    const totalMonths = startYear * 12 + (startMonth - 1) + idx;
    const y = Math.floor(totalMonths / 12), m = (totalMonths % 12) + 1;
    const periodStr = `${y}/${String(m).padStart(2, "0")}`;
    const yearStemCalc = STEMS[(y - 4) % 10], yearBranchCalc = BRANCHES[(y - 4) % 12];
    const monthBranchCalc = BRANCHES[(m + 1) % 12], monthStemCalc = STEMS[((y % 5) * 2 + m + 1) % 10];

    let oppScore = 6.6, wealthScore = 6.5, expScore = 6.2, defScore = 5.8, rskScore = 4.5;
    if (SIX_HARMONIES[dayBranch] === monthBranchCalc) { oppScore += 2.0; wealthScore += 1.8; expScore += 2.2; defScore -= 1.5; rskScore -= 1.5; }
    if (STEM_COMBINATIONS[dayStem] === monthStemCalc) { oppScore += 1.6; wealthScore += 1.6; expScore += 1.8; }
    if (BRANCH_ELEMENT[monthBranchCalc] === wealthElem || STEM_ELEMENT[monthStemCalc] === wealthElem) { wealthScore += 1.8; oppScore += 1.2; expScore += 1.4; }
    if (BRANCH_ELEMENT[monthBranchCalc] === officerElem || STEM_ELEMENT[monthStemCalc] === officerElem) { oppScore += 1.5; expScore += 1.2; }
    if (SIX_CLASHES[dayBranch] === monthBranchCalc) { oppScore -= 1.8; wealthScore -= 1.5; expScore -= 2.2; defScore += 3.0; rskScore += 3.5; }

    const wave = ((idx * 7 + dayStem.charCodeAt(0)) % 10 - 4.5) * 0.15;
    const opp = Math.round(Math.min(9.9, Math.max(3.0, oppScore + wave)) * 10) / 10;
    const exp = Math.round(Math.min(9.9, Math.max(2.5, expScore + wave)) * 10) / 10;
    const def_s = Math.round(Math.min(9.9, Math.max(2.5, defScore - wave)) * 10) / 10;
    const rsk = Math.round(Math.min(9.9, Math.max(2.0, rskScore)) * 10) / 10;

    let strategy: '積極開拓' | '可試推進' | '穩健守成' = opp >= 8.5 ? '積極開拓' : (opp < 6.8 ? '穩健守成' : '可試推進');
    let advice = "穩步經營，優化內部流程與產品服務";
    if (exp >= 8.5) advice = "風口正盛，適合簽約新客戶或融資擴展業務版圖";
    else if (rsk >= 7.5) advice = "財務動盪期，嚴控開支與應收帳款，切忌盲目擴張";
    else if (opp >= 8.5) advice = "創業貴人顯現，適合立項啟動或開展重大商務合作";
    else if (def_s >= 8.0) advice = "外部環境變數多，宜收攏戰線，深挖存量客戶價值";

    matrix.push({
      period: periodStr, yearStemBranch: `${yearStemCalc}${yearBranchCalc}`, monthStemBranch: `${monthStemCalc}${monthBranchCalc}`,
      opportunityScore: opp, wealthAccumScore: Math.round(Math.min(9.9, Math.max(3.0, wealthScore + wave)) * 10) / 10,
      expansionScore: exp, defenseScore: def_s, riskScore: rsk, actionStrategy: strategy, advice
    });
  }

  return {
    reportId: `TMS-STARTUP-${birthDate.replace(/-/g, "")}`,
    solarDate: `${birthDate} ${birthTime}`, gender: gender === "male" ? "乾造（男）" : "坤造（女）",
    fourPillars: { year: `${yearStem}${yearBranch}`, month: `${monthStem}${monthBranch}`, day: `${dayStem}${dayBranch}`, hour: `${hourStem}${hourBranch}` },
    dayMaster: dayStem, dayElement: dayElem, patternName, startupSuitability: Math.round(suitabilityScore * 10) / 10,
    industryDirections: favInfo.industries, startupRisks, startupMode, partnerType, partnerRisks, financialStrategy,
    overallWealthStars: Math.min(5, Math.max(1, 2 + (isStrong ? 1 : 0) + (wealthCount > 1 ? 1 : 0))),
    wealthAccumulationStars: Math.min(5, Math.max(1, 2 + (isStrong ? 2 : 1))),
    incomeGrowthStars: Math.min(5, Math.max(1, 2 + (["食神", "傷官", "偏財"].includes(mainTenGod) ? 2 : 1))),
    topNewProjectMonths: [...matrix].sort((a,b)=>b.opportunityScore-a.opportunityScore).slice(0,3).map(x=>`${x.period}（${x.opportunityScore}分）`),
    topExpansionMonths: [...matrix].sort((a,b)=>b.expansionScore-a.expansionScore).slice(0,3).map(x=>`${x.period}（${x.expansionScore}分）`),
    topDefenseMonths: [...matrix].sort((a,b)=>b.defenseScore-a.defenseScore).slice(0,3).map(x=>`${x.period}（防禦值 ${x.defenseScore}分）`),
    topRiskMonths: [...matrix].sort((a,b)=>b.riskScore-a.riskScore).slice(0,3).map(x=>`${x.period}（風險值 ${x.riskScore}分）`),
    favorableColors: favInfo.colors, favorableDirections: favInfo.directions, favorableEnvironment: favInfo.environment, matrix
  };
}
