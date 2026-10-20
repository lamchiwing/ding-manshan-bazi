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
const SOLAR_TERM_NAMES = ["立春～驚蟄", "驚蟄～清明", "清明～立夏", "立夏～芒種", "芒種～小暑", "小暑～立秋", "立秋～白露", "白露～寒露", "寒露～立冬", "立冬～大雪", "大雪～小寒", "小寒～立春"];

function getTenGod(dayStem: string, targetStem: string): string {
  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const targetElem = STEM_ELEMENT[targetStem] || "木";
  const isSame = (STEMS.indexOf(dayStem) % 2) === (STEMS.indexOf(targetStem) % 2);
  if (dayElem === targetElem) return isSame ? "比肩" : "劫財";
  if (GENERATING_ELEMENT[dayElem] === targetElem) return isSame ? "食神" : "傷官";
  if (CONTROLLED_ELEMENT[dayElem] === targetElem) return isSame ? "偏財" : "正財";
  if (CONTROLLING_ELEMENT[dayElem] === targetElem) return isSame ? "七殺" : "正官";
  return isSame ? "偏印" : "正印";
}

export interface MonthlyDetailItem {
  monthIndex: number; period: string; lunarRange: string; yearStemBranch: string; monthStemBranch: string; score: number; level: string; overallSummary: string; career: string; wealth: string; love: string; interpersonal: string; turningPoint: string; favorableActions: string; cautionNotes: string; isClash: boolean; isHarmony: boolean;
}
export interface TwelveMonthsAnnualOverview {
  overallScore: number; careerScore: number; wealthScore: number; loveScore: number; interpersonalScore: number; mainTheme: string; mainThemeDesc: string; keyTurningPoints: string[]; bestMonths: string[]; cautionMonths: string[];
}
export interface TwelveMonthsReportResult {
  dayMaster: string; fourPillarsText: string; dominantElement: string; startPeriod: string; endPeriod: string; annualOverview: TwelveMonthsAnnualOverview; monthlyBreakdown: MonthlyDetailItem[];
}

export function computeTwelveMonthsReport(birthDate: string, birthTime: string, gender: string = "male", baziDataInput?: any): TwelveMonthsReportResult {
  const bazi = baziDataInput || calculateLocalBazi(birthDate, birthTime, gender);
  const dayStem = bazi?.day_master?.stem || "甲";
  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const dayBranch = bazi?.pillars?.day?.branch || "子";
  const monthBranch = bazi?.pillars?.month?.branch || "寅";
  const dominantElement = bazi?.elements?.dominant_element || dayElem;
  const wealthElem = CONTROLLED_ELEMENT[dayElem] || "土";
  const officerElem = CONTROLLING_ELEMENT[dayElem] || "金";
  const fourPillarsText = bazi?.pillars ? (bazi.pillars.year.stem + bazi.pillars.year.branch + '年 / ' + bazi.pillars.month.stem + bazi.pillars.month.branch + '月 / ' + bazi.pillars.day.stem + bazi.pillars.day.branch + '日 / ' + bazi.pillars.hour.stem + bazi.pillars.hour.branch + '時') : '排盤推演中';

  const startYear = 2026;
  const startMonth = 10;
  const monthlyBreakdown: MonthlyDetailItem[] = [];

  for (let idx = 0; idx < 12; idx++) {
    const total = startYear * 12 + (startMonth - 1) + idx;
    const y = Math.floor(total / 12);
    const m = (total % 12) + 1;
    const periodStr = y + '/' + String(m).padStart(2, '0');
    const yStem = STEMS[(y - 4) % 10];
    const yBranch = BRANCHES[(y - 4) % 12];
    const mBranch = BRANCHES[(m + 1) % 12];
    const mStem = STEMS[((y % 5) * 2 + m + 1) % 10];
    const monthStemBranch = mStem + mBranch;
    const tenGod = getTenGod(dayStem, mStem);
    const isHarmony = SIX_HARMONIES[dayBranch] === mBranch || SIX_HARMONIES[monthBranch] === mBranch;
    const isClash = SIX_CLASHES[dayBranch] === mBranch || SIX_CLASHES[monthBranch] === mBranch;
    const isStemCombine = STEM_COMBINATIONS[dayStem] === mStem;

    let base = 6.8;
    if (isHarmony) base += 1.8;
    if (isStemCombine) base += 1.2;
    if (isClash) base -= 2.2;
    const wave = ((idx * 7 + dayStem.charCodeAt(0)) % 9 - 4) * 0.2;
    const score = Math.round(Math.max(3.5, Math.min(9.8, base + wave)) * 10) / 10;

    let level = '平順 · 蓄力積累';
    if (score >= 8.8) level = '大吉 · 乘勢進取';
    else if (score >= 7.8) level = '次吉 · 穩步上升';
    else if (score <= 5.0) level = '守成 · 防守為先';

    let summary = '歲月相安，生機勃發。個人實力得以自然展現，按部就班推進必有回報。';
    if (isHarmony) summary = '地支逢合，貴人相照。多方協同順暢，行事阻力消融，利於落實合作與長期規劃。';
    else if (isClash) summary = '地支逢沖，動盪驛馬顯現。環境或心境面臨轉折，凡事宜留有退路，不宜孤注一擲。';

    let career = '工作推進穩健，按部就班，適合鞏固基礎。';
    if (['正官', '七殺'].includes(tenGod)) career = '工作面臨責任加重與關鍵考驗。若主動迎難而上，易在主管面前樹立威信。';
    else if (['食神', '傷官'].includes(tenGod)) career = '創意思維敏銳，專業策劃與表達力倍受青睞。適合推動創新業務或公關展示。';
    else if (['偏財', '正財'].includes(tenGod)) career = '商務業務與項目產出進入收穫期。KPI達成度高，適合洽談資源置換與爭取預算。';

    let wealth = '收支平衡，正財平穩。宜檢視每月固定現金流支出，注重長線價值定投。';
    if (BRANCH_ELEMENT[mBranch] === wealthElem || STEM_ELEMENT[mStem] === wealthElem) wealth = '正財源頭開朗，有額外績效獎金或分紅進帳之機。投資理財可適度把握確定性機會。';
    else if (isClash) wealth = '偏財受沖，易有突發性開銷或家庭大額支出。投資需見好就收，切勿盲目投機。';

    let love = '感情平穩如水。單身者宜充實自身生活；戀愛或已婚者宜安排溫馨日常交流。';
    if (isStemCombine || isHarmony) love = '桃花磁場柔和。單身者容易在工作或友人聚會中結識有默契之對象；有伴者感情升溫。';
    else if (isClash) love = '情緒起伏易投射至親密關係。雙方易因瑣事產生分歧，宜多傾聽包容，冷靜溝通。';

    let interpersonal = '社交氛圍清平，維持禮貌界限為上。多親近正向專業人士。';
    if (isHarmony || isStemCombine) interpersonal = '人氣凝聚，貴人暗中相挺。對外溝通和煦得體，深獲前輩、合作方或客戶信賴。';
    else if (isClash) interpersonal = '人際暗湧增多，需防口舌是非與信息不對稱。重要決策白紙黑字，切勿隨意捲入是非。';

    let turningPoint = isClash ? '職位調動、差旅出差或居家環境微調；迎來跳脫既有舒適圈的關鍵觸點。' : (isHarmony ? '重要協議簽署、跨團隊深度結盟或重大里程碑驗收完成。' : '承先啟後的蓄力轉折點，確立下階段核心前進目標。');
    let favorableActions = (isHarmony || score >= 7.8) ? '主動向高層提案、簽署商業合同、拜訪行業貴人、發表代表作、拓展社交圈' : '深耕既有業務、研讀專業書籍、維繫核心客戶、盤點財務資產、優化工作流程';
    let cautionNotes = isClash ? '慎防口舌官非、避免衝動簽約或辭職、開車出行注意交通安全、防範情緒化支出' : '防因安逸懈怠錯失先機、注意飲食與作息規律、謹慎審核所有文書細節';

    monthlyBreakdown.push({
      monthIndex: idx + 1, period: periodStr, lunarRange: SOLAR_TERM_NAMES[idx % 12],
      yearStemBranch: yStem + yBranch, monthStemBranch, score, level, overallSummary: summary,
      career, wealth, love, interpersonal, turningPoint, favorableActions, cautionNotes, isClash, isHarmony
    });
  }

  const avgScore = Math.round((monthlyBreakdown.reduce((s, i) => s + i.score, 0) / 12) * 10) / 10;
  const careerScore = Math.round(Math.min(9.8, Math.max(4.0, avgScore + 0.3)) * 10) / 10;
  const wealthScore = Math.round(Math.min(9.8, Math.max(4.0, avgScore + (dominantElement === wealthElem ? 0.4 : -0.1))) * 10) / 10;
  const loveScore = Math.round(Math.min(9.8, Math.max(4.0, avgScore + 0.1)) * 10) / 10;
  const interpersonalScore = Math.round(Math.min(9.8, Math.max(4.0, avgScore + 0.2)) * 10) / 10;

  let mainTheme = '官印相生 · 職權升遷與制度確立';
  let mainThemeDesc = '未來12個月正逢官星與印星相映，是命主在體制、企業或專業領域確立個人權威與權責範疇的黃金之年。適合向上爭取主導核心業務、升職進階或取得重要行業資質。';
  if (dominantElement === CONTROLLED_ELEMENT[dayElem]) {
    mainTheme = '食傷生財 · 商機開拓與商業變現';
    mainThemeDesc = '未來12個月才智與商機高度共振，是將創新想法、專業技術與市場資源迅速轉化為真金白銀的豐收時期。適合開闢新產品線、拓展副業或擴大客戶群體。';
  } else if (dominantElement === GENERATING_ELEMENT[dayElem]) {
    mainTheme = '木火通明／金水吐秀 · 專業深耕與聲譽爆發';
    mainThemeDesc = '未來12個月才華外溢，靈感奔湧，適合透過內容創作、技術研發、演講發表或公關傳播樹立個人在行業內的獨特地位與聲譽。';
  }

  const sorted = [...monthlyBreakdown].sort((a, b) => b.score - a.score);
  const bestMonths = sorted.slice(0, 3).map(m => m.period + '（' + m.monthStemBranch + '月·' + m.score + '分）');
  const cautionMonths = sorted.slice(-2).map(m => m.period + '（' + m.monthStemBranch + '月·' + m.score + '分）');
  const keyTurningPoints = [
    '第 1 階段（' + monthlyBreakdown[0].period + ' - ' + monthlyBreakdown[3].period + '）：盤點梳理期，確立主攻方向，清除歷史包袱。',
    '第 2 階段（' + monthlyBreakdown[4].period + ' - ' + monthlyBreakdown[7].period + '）：資源聚合期，' + sorted[0].period + ' 迎來年度運勢峰值，業務與收益顯著放大。',
    '第 3 階段（' + monthlyBreakdown[8].period + ' - ' + monthlyBreakdown[11].period + '）：成果固化與轉型期，注意防範低谷月震盪，為下個週期蓄積能量。'
  ];

  return {
    dayMaster: bazi?.day_master?.display || (dayStem + dayElem),
    fourPillarsText, dominantElement, startPeriod: monthlyBreakdown[0].period, endPeriod: monthlyBreakdown[11].period,
    annualOverview: { overallScore: avgScore, careerScore, wealthScore, loveScore, interpersonalScore, mainTheme, mainThemeDesc, keyTurningPoints, bestMonths, cautionMonths },
    monthlyBreakdown
  };
}
