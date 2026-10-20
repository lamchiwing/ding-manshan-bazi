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

const GENERATING_ELEMENT: Record<string, string> = {
  "木": "火", "火": "土", "土": "金", "金": "水", "水": "木"
};

const CONTROLLED_ELEMENT: Record<string, string> = {
  "木": "土", "土": "水", "水": "火", "火": "金", "金": "木"
};

const CONTROLLING_ELEMENT: Record<string, string> = {
  "木": "金", "火": "水", "土": "木", "金": "火", "水": "土"
};

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

const SOLAR_TERM_NAMES = [
  "立春～驚蟄", "驚蟄～清明", "清明～立夏", "立夏～芒種",
  "芒種～小暑", "小暑～立秋", "立秋～白露", "白露～寒露",
  "寒露～立冬", "立冬～大雪", "大雪～小寒", "小寒～立春"
];

function getTenGod(dayStem: string, targetStem: string): string {
  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const targetElem = STEM_ELEMENT[targetStem] || "木";
  const isSamePolarity = (STEMS.indexOf(dayStem) % 2) === (STEMS.indexOf(targetStem) % 2);

  if (dayElem === targetElem) return isSamePolarity ? "比肩" : "劫財";
  if (GENERATING_ELEMENT[dayElem] === targetElem) return isSamePolarity ? "食神" : "傷官";
  if (CONTROLLED_ELEMENT[dayElem] === targetElem) return isSamePolarity ? "偏財" : "正財";
  if (CONTROLLING_ELEMENT[dayElem] === targetElem) return isSamePolarity ? "七殺" : "正官";
  return isSamePolarity ? "偏印" : "正印";
}

// 10 大天干日主於 2026/2027 流年歲君（丙午/丁未年）對應之主要發展主題庫
const ANNUAL_THEME_CATALOG: Record<string, { title: string; desc: string }> = {
  "甲": {
    title: "食神吐秀 · 專業立身與商機轉化",
    desc: "未來12個月正逢丙火食神照耀，木火相生，象徵深層專業智慧與獨創想法轉化為實質商機的黃金週期。適合聚焦個人核心專長、研發拳頭產品或建立不可替代的專業壁壘，以才智生財。"
  },
  "乙": {
    title: "傷官生財 · 破格創新與品牌聲譽躍升",
    desc: "未來12個月靈感奔湧、表達力極強，是打破常規思維、進行商業破局與品牌對外傳播的高光年份。適合大膽跨界拓展、經營個人IP或爭取舞台聚光燈，但需留意職場口舌與合約嚴謹度。"
  },
  "丙": {
    title: "比肩聚力 · 賽道重塑與強強聯合",
    desc: "未來12個月自主魄力與前進動能極為充沛，是告別被動等待、主動召集優質合夥人並肩開拓新天地的進取之年。需強化利潤分配機制與團隊授權，避免單打獨鬥或比劫爭奪。"
  },
  "丁": {
    title: "借勢騰飛 · 平台賦能與借力破局",
    desc: "未來12個月歲君丙火光芒普照，適合借大平台之勢、傍強者之光，透過借力打力完成階層與業務躍升。需明確界定自身不可替代的深耕價值，防範成果遭同僚稀釋。"
  },
  "戊": {
    title: "厚積薄發 · 專精技術與資產奠基",
    desc: "未來12個月丙火烈烈生旺戊土，思維轉向深邃宏觀，是考取高門檻資質、沉澱獨門技術、深耕重資產或調整組織架構的沉潛積蓄之年。適合以靜制動，練好內功。"
  },
  "己": {
    title: "正印護身 · 權柄歸心與制度信任確立",
    desc: "未來12個月得歲君正印庇佑，長輩、官方或高層貴人暗中相扶，有利於在大型組織或核心機構中取得關鍵信任、確立正式管轄權限。凡事循規蹈矩，必能水到渠成。"
  },
  "庚": {
    title: "七殺淬煉 · 逆境突破與開闢疆土",
    desc: "火旺煉金，未來12個月是命主跳脫舒適圈、迎面接下高難度攻堅任務的英雄之年。壓力與機遇並存，每一次重大考驗都是權力擴張的墊腳石，極易在危機中脫穎而出。"
  },
  "辛": {
    title: "正官合身 · 體制晉升與名望階梯確立",
    desc: "未來12個月天干逢丙辛相合，官星來合我，象徵名正言順的晉升任命、跨部門主導權或與權威機構建立長期合約。利於走體制、晉級考評及確立不可撼動的行業名位。"
  },
  "壬": {
    title: "偏財宏圖 · 資本運作與資源槓桿放大",
    desc: "水火既濟，丙火偏財萬丈光芒，未來12個月對市場機會與商業脈搏極具嗅覺，適合大膽進行商業談判、股權投資、大宗交易或副業裂變。注意鎖定階段利潤，防範過度擴張。"
  },
  "癸": {
    title: "正財潤局 · 業務深耕與現金流穩健擴增",
    desc: "雨露得日光照耀，未來12個月財源脈絡清晰，主要收入、諮詢收益或商業訂單呈現持續攀升趨勢。適合深耕高價值付費用戶、打磨高毛利產品，將流量穩穩轉化為真金白銀。"
  }
};

export interface MonthlyDetailItem {
  monthIndex: number;
  period: string;
  lunarRange: string;
  yearStemBranch: string;
  monthStemBranch: string;
  score: number;
  level: string;
  overallSummary: string;
  career: string;
  wealth: string;
  love: string;
  interpersonal: string;
  turningPoint: string;
  favorableActions: string;
  cautionNotes: string;
  isClash: boolean;
  isHarmony: boolean;
}

export interface TwelveMonthsAnnualOverview {
  overallScore: number;
  careerScore: number;
  wealthScore: number;
  loveScore: number;
  interpersonalScore: number;
  mainTheme: string;
  mainThemeDesc: string;
  keyTurningPoints: string[];
  bestMonths: string[];
  cautionMonths: string[];
}

export interface TwelveMonthsReportResult {
  dayMaster: string;
  fourPillarsText: string;
  dominantElement: string;
  startPeriod: string;
  endPeriod: string;
  annualOverview: TwelveMonthsAnnualOverview;
  monthlyBreakdown: MonthlyDetailItem[];
}

export function computeTwelveMonthsReport(
  birthDate: string,
  birthTime: string,
  gender: string = "male",
  baziDataInput?: any
): TwelveMonthsReportResult {
  const bazi = baziDataInput || calculateLocalBazi(birthDate, birthTime, gender);
  const dayStem = bazi?.day_master?.stem || "甲";
  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const dayBranch = bazi?.pillars?.day?.branch || "子";
  const monthBranch = bazi?.pillars?.month?.branch || "寅";
  const dominantElement = bazi?.elements?.dominant_element || dayElem;

  const wealthElem = CONTROLLED_ELEMENT[dayElem] || "土";
  const officerElem = CONTROLLING_ELEMENT[dayElem] || "金";
  const outputElem = GENERATING_ELEMENT[dayElem] || "火";
  const sealElem = CONTROLLING_ELEMENT[outputElem] || "水";

  const fourPillarsText = bazi?.pillars
    ? `${bazi.pillars.year.stem}${bazi.pillars.year.branch}年 / ${bazi.pillars.month.stem}${bazi.pillars.month.branch}月 / ${bazi.pillars.day.stem}${bazi.pillars.day.branch}日 / ${bazi.pillars.hour.stem}${bazi.pillars.hour.branch}時`
    : "排盤推演中";

  const startYear = 2026;
  const startMonth = 10;
  const monthlyBreakdown: MonthlyDetailItem[] = [];

  for (let idx = 0; idx < 12; idx++) {
    const total = startYear * 12 + (startMonth - 1) + idx;
    const y = Math.floor(total / 12);
    const m = (total % 12) + 1;
    const periodStr = `${y}/${String(m).padStart(2, "0")}`;

    const yStem = STEMS[(y - 4) % 10];
    const yBranch = BRANCHES[(y - 4) % 12];
    const mBranch = BRANCHES[(m + 1) % 12];
    const mStem = STEMS[((y % 5) * 2 + m + 1) % 10];
    const monthStemBranch = `${mStem}${mBranch}`;
    const tenGod = getTenGod(dayStem, mStem);

    const isHarmony = SIX_HARMONIES[dayBranch] === mBranch || SIX_HARMONIES[monthBranch] === mBranch;
    const isClash = SIX_CLASHES[dayBranch] === mBranch || SIX_CLASHES[monthBranch] === mBranch;
    const isStemCombine = STEM_COMBINATIONS[dayStem] === mStem;

    let base = 6.8;
    if (isHarmony) base += 1.8;
    if (isStemCombine) base += 1.3;
    if (isClash) base -= 2.2;
    if ([wealthElem, officerElem].includes(STEM_ELEMENT[mStem])) base += 0.5;

    const pseudoSeed = (dayStem.charCodeAt(0) * 11 + mBranch.charCodeAt(0) * 7 + idx * 5) % 9 - 4;
    const wave = pseudoSeed * 0.15;
    const score = Math.round(Math.max(3.8, Math.min(9.8, base + wave)) * 10) / 10;

    let level = "平順 · 蓄力積累";
    if (score >= 8.8) level = "大吉 · 乘勢進取";
    else if (score >= 7.8) level = "次吉 · 穩步上升";
    else if (score <= 5.2) level = "守成 · 防守為先";

    let overallSummary = "歲月相安，生機勃發。個人實力得以自然展現，按部就班推進必有回報。";
    if (isHarmony) {
      overallSummary = "地支逢合，貴人相照。多方協同順暢，行事阻力消融，利於落實深度合作與簽訂長期規劃。";
    } else if (isClash) {
      overallSummary = "地支逢沖，動盪驛馬顯現。環境、職位或心境面臨轉折節點，凡事宜留有退路，切忌孤注一擲。";
    } else if (isStemCombine) {
      overallSummary = "天干相合，氣場柔和。對外公關洽談與內在思路凝聚和諧，易獲得關鍵方之認同與資源傾斜。";
    } else if (score >= 8.2) {
      overallSummary = "時運亨通，能量充沛。主動推進受阻之業務或提出關鍵提案，極易收穫高於預期之成效。";
    } else if (score <= 5.5) {
      overallSummary = "氣機沉潛，略有考驗。宜放慢擴張腳步，注重梳理合約細節與身心調節，養精蓄銳以待時機。";
    }

    let career = "工作推進穩健，按部就班，適合鞏固基礎與常規維運。";
    if (tenGod === "正官") {
      career = "體制內權責加重，易獲高層或主管委以關鍵主導職位。宜遵從規範、確立流程，展現沉穩管理魄力。";
    } else if (tenGod === "七殺") {
      career = "直面高強度攻堅任務或激烈競爭。若主動迎難而上，將迅速在行業樹立威望；需防同儕暗處博弈。";
    } else if (tenGod === "正財") {
      career = "業務產出與項目進度條清晰可控，KPI達成度高。適合穩固既有重點客戶、深化服務毛利率。";
    } else if (tenGod === "偏財") {
      career = "商務談判、大客戶引流與資源整合迎來井噴期。利於洽談跨界聯名、開闢全新市場或獲取高額提成。";
    } else if (tenGod === "食神") {
      career = "才華與專業技術外溢，策劃案與創新方案備受青睞。適合推出代表作、進行培訓演講或打磨核心產品。";
    } else if (tenGod === "傷官") {
      career = "思維敏銳打破常規，適合開展破格創新與品牌公關。需防在會議發言時過於鋒芒畢露而招致口舌。";
    } else if (tenGod === "正印") {
      career = "得官方信任、長輩提攜或政策紅利支持。適合考取行業權威資質、梳理組織架構或申請專利審批。";
    } else if (tenGod === "偏印") {
      career = "直覺靈敏，擅長處理非標業務或技術難題。適合深入研發、沉潛修復技術漏洞或調整內部戰略。";
    } else if (tenGod === "比肩") {
      career = "同儕協力，適合團隊協作攻堅或共同推進重點項目。需清晰約定各方分工權利，防範成果模糊。";
    } else if (tenGod === "劫財") {
      career = "競爭轉趨白熱化，同行爭奪資源或市場份額。宜強化防禦壁壘與獨家優勢，不可盲目跟風擴張。";
    }

    let wealth = "收支平衡，維持常態現金流運轉。宜保持審慎記賬習慣。";
    if (tenGod === "正財") {
      wealth = "正財收入穩步上揚，工資、績效獎金或主要業務回款準時入賬。適合制定嚴謹資產定投計畫。";
    } else if (tenGod === "偏財") {
      wealth = "外財機遇顯現，易有額外分紅、投資收益或非預期訂單進賬。切忌沉迷高槓桿投機，宜見好就收。";
    } else if (tenGod === "食神" || tenGod === "傷官") {
      wealth = "智慧變現之月，專業諮詢、創意版權或副業知識服務迎來高轉化。能憑一技之長拓展第二曲線。";
    } else if (tenGod === "劫財") {
      wealth = "有被動破財或同儕借貸請客之象。需看管好隨身財務與賬戶授權，重大開銷支出宜延後決定。";
    } else if (isClash) {
      wealth = "地支逢沖有突發意外支出之虞。建議提前購置必需固定資產或更換老舊設備，以主動破財化解被動消耗。";
    }

    let love = "感情平順溫馨，重在日常生活之陪伴與心靈共鳴。";
    if (isHarmony || isStemCombine) {
      love = "桃花盛放，單身者極易在社交或工作中結識談吐契合之良緣；有伴侶者相處甜美，宜深化承諾或見家長。";
    } else if (isClash) {
      love = "情緒起伏較大，雙方易因生活細節或家庭琐事發生口角。宜換位思考，多給予彼此私人獨處空間。";
    } else if (tenGod === "正官" || tenGod === "正財") {
      love = "正緣能量充沛，雙方關係走向務實規劃，適合商討置業、共同資產或未來長遠藍圖。";
    }

    let interpersonal = "人際往來如常，社交氛圍和諧，與各方保持良好交往距離。";
    if (isHarmony) {
      interpersonal = "貴人運強勁，長輩主管或行業前輩主動提供背書與資源引薦，人脈網絡極速拓寬。";
    } else if (isClash) {
      interpersonal = "人際暗湧浮動，易遇理念不合之爭辯或合作摩擦。謹言慎行，遠離是非八卦圈。";
    } else if (tenGod === "傷官" || tenGod === "劫財") {
      interpersonal = "防犯小人口舌或利益暗中爭奪。對外溝通務必客氣留餘地，重要事宜均需留存文字記錄。";
    }

    let turningPoint = "按常規節奏推進，此階段重在穩步蓄勢，不宜輕舉妄動。";
    if (isClash) {
      turningPoint = "驛馬與衝動明顯，可能面臨團隊重組、職責換崗或跨部門交接，為個人定位重大轉折關口。";
    } else if (isHarmony) {
      turningPoint = "重大合作協議敲定、核心盟友加入或獲得關鍵項目授權之黃金拐點。";
    } else if (score >= 8.5) {
      turningPoint = "年度高光峰值視窗，適合啟動重大新品發布、業務宣傳或向核心決策層提出加薪升遷訴求。";
    }

    let favorableActions = "宜專注文書校對、日常業務覆盤及常規技能鞏固。";
    if (score >= 8.0) {
      favorableActions = "宜主動出擊、簽署合約、發布重大商業方案、拜訪核心決策貴人。";
    } else if (isClash) {
      favorableActions = "宜整理行裝、清理舊有債務、修繕居家設施、調養身心進行深度覆盤。";
    } else if (tenGod === "正印" || tenGod === "偏印") {
      favorableActions = "宜進修深造、考取專業執照、閱讀行業報告、諮詢智囊專家意見。";
    }

    let cautionNotes = "防工作細節遺漏，注意勞逸結合。";
    if (isClash) {
      cautionNotes = "慎防口舌官非、衝動投資及疲勞駕駛；出行需預留充足彈性時間。";
    } else if (tenGod === "劫財") {
      cautionNotes = "慎借貸作保、慎合夥投機、慎信非官方渠道之內部小道消息。";
    } else if (score <= 5.5) {
      cautionNotes = "忌大舉借貸擴張、忌在情緒波動時簽訂重大法律協議，宜靜心守成。";
    }

    monthlyBreakdown.push({
      monthIndex: idx + 1,
      period: periodStr,
      lunarRange: SOLAR_TERM_NAMES[idx % 12],
      yearStemBranch: `${yStem}${yBranch}`,
      monthStemBranch,
      score,
      level,
      overallSummary,
      career,
      wealth,
      love,
      interpersonal,
      turningPoint,
      favorableActions,
      cautionNotes,
      isClash,
      isHarmony
    });
  }

  const avgScore = Math.round((monthlyBreakdown.reduce((s, i) => s + i.score, 0) / 12) * 10) / 10;

  const careerMonths = monthlyBreakdown.filter(m => [officerElem, sealElem, outputElem].includes(STEM_ELEMENT[m.monthStemBranch[0]]));
  const careerAvg = careerMonths.length > 0 ? (careerMonths.reduce((s, i) => s + i.score, 0) / careerMonths.length) : avgScore;
  const careerScore = Math.round(Math.min(9.8, Math.max(4.2, careerAvg * 0.7 + avgScore * 0.3 + 0.2)) * 10) / 10;

  const wealthMonths = monthlyBreakdown.filter(m => STEM_ELEMENT[m.monthStemBranch[0]] === wealthElem || BRANCH_ELEMENT[m.monthStemBranch[1]] === wealthElem);
  const wealthAvg = wealthMonths.length > 0 ? (wealthMonths.reduce((s, i) => s + i.score, 0) / wealthMonths.length) : avgScore;
  const wealthScore = Math.round(Math.min(9.8, Math.max(4.0, wealthAvg * 0.7 + avgScore * 0.3 + (dominantElement === wealthElem ? 0.3 : 0.0))) * 10) / 10;

  const loveMonths = monthlyBreakdown.filter(m => m.isHarmony || m.score >= 8.0);
  const loveAvg = loveMonths.length > 0 ? (loveMonths.reduce((s, i) => s + i.score, 0) / loveMonths.length) : avgScore;
  const loveScore = Math.round(Math.min(9.8, Math.max(4.0, loveAvg * 0.6 + avgScore * 0.4 - 0.1)) * 10) / 10;

  const interMonths = monthlyBreakdown.filter(m => !m.isClash);
  const interAvg = interMonths.length > 0 ? (interMonths.reduce((s, i) => s + i.score, 0) / interMonths.length) : avgScore;
  const interpersonalScore = Math.round(Math.min(9.8, Math.max(4.2, interAvg * 0.6 + avgScore * 0.4 + 0.1)) * 10) / 10;

  const themeCandidate = ANNUAL_THEME_CATALOG[dayStem] || ANNUAL_THEME_CATALOG["甲"];
  let mainTheme = themeCandidate.title;
  let mainThemeDesc = themeCandidate.desc;

  const sorted = [...monthlyBreakdown].sort((a, b) => b.score - a.score);
  const bestMonths = sorted.slice(0, 3).map(m => `${m.period}（${m.monthStemBranch}月 · ${m.score}分）`);
  const cautionMonths = sorted.slice(-2).map(m => `${m.period}（${m.monthStemBranch}月 · ${m.score}分）`);

  const p1Clash = monthlyBreakdown.slice(0, 4).find(m => m.isClash);
  const p1Best = [...monthlyBreakdown.slice(0, 4)].sort((a, b) => b.score - a.score)[0];
  const p2Peak = sorted[0];
  const p3Caution = monthlyBreakdown.slice(8, 12).find(m => m.isClash) || sorted[sorted.length - 1];

  const keyTurningPoints = [
    `第 1 階段（${monthlyBreakdown[0].period} - ${monthlyBreakdown[3].period} · 盤點立基期）：重點在於理清過往合約責任與資源盤點。於【${p1Best.period}】迎來年度首波貴人突破口，確立攻守節奏；${p1Clash ? `注意【${p1Clash.period}】逢沖微調，宜以退為進。` : "各月推進井然有序。"}`.trim(),
    `第 2 階段（${monthlyBreakdown[4].period} - ${monthlyBreakdown[7].period} · 資源爆發期）：歲運氣機交泰，全年度能量峰值顯現於【${p2Peak.period}（${p2Peak.score}分）】。商務合作、職位躍遷或重大決策宜於此黃金視窗期重磅推進。`,
    `第 3 階段（${monthlyBreakdown[8].period} - ${monthlyBreakdown[11].period} · 成果固化期）：轉入成果沉澱與收穫波段。需審慎防範【${p3Caution.period}】波動震盪，及早鎖定既得利潤與簽約承諾，為下一輪大運週期蓄積深層動能。`,
    `核心轉折里程碑：全年在【${p2Peak.period}】與【${sorted[1]?.period || monthlyBreakdown[2].period}】逢歲月交泰，伴隨關鍵合約簽訂、團隊擴編或商業里程碑驗收，宜大膽把握。`
  ];

  return {
    dayMaster: bazi?.day_master?.display || `${dayStem}${dayElem}`,
    fourPillarsText,
    dominantElement,
    startPeriod: monthlyBreakdown[0].period,
    endPeriod: monthlyBreakdown[11].period,
    annualOverview: {
      overallScore: avgScore,
      careerScore,
      wealthScore,
      loveScore,
      interpersonalScore,
      mainTheme,
      mainThemeDesc,
      keyTurningPoints,
      bestMonths,
      cautionMonths
    },
    monthlyBreakdown
  };
}
