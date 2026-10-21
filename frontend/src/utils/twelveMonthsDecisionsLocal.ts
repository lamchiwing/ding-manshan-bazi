import { calculateLocalBazi } from './baziLocalEngine';

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEM_ELEMENT: Record<string, string> = {
  "甲": "木", "乙": "木", "丙": "火", "丁": "火", "戊": "土",
  "己": "土", "庚": "金", "辛": "金", "壬": "水", "癸": "水"
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

export const ANNUAL_THEME_CATALOG: Record<string, { title: string; desc: string }> = {
  "甲": { title: "食神吐秀 · 專業立身與商機轉化", desc: "未來12個月正逢丙火食神照耀，木火相生，象徵深層專業智慧與獨創想法轉化為實質商機的黃金週期。適合聚焦個人核心專長、研發拳頭產品或建立不可替代的專業壁壘，以才智生財。" },
  "乙": { title: "傷官生財 · 破格創新與品牌聲譽躍升", desc: "未來12個月靈感奔湧、表達力極強，是打破常規思維、進行商業破局與品牌對外傳播的高光年份。適合大膽跨界拓展、經營個人IP或爭取舞台聚光燈，但需留意職場口舌與合約嚴謹度。" },
  "丙": { title: "比肩聚力 · 賽道重塑與強強聯合", desc: "未來12個月自主魄力與前進動能極為充沛，是告別被動等待、主動召集優質合夥人並肩開拓新天地的進取之年。需強化利潤分配機制與團隊授權，避免單打獨鬥或比劫爭奪。" },
  "丁": { title: "借勢騰飛 · 平台賦能與借力破局", desc: "未來12個月歲君丙火光芒普照，適合借大平台之勢、傍強者之光，透過借力打力完成階層與業務躍升。需明確界定自身不可替代的深耕價值，防範成果遭同僚稀釋。" },
  "戊": { title: "厚積薄發 · 專精技術與資產奠基", desc: "未來12個月丙火烈烈生旺戊土，思維轉向深邃宏觀，是考取高門檻資質、沉澱獨門技術、深耕重資產或調整組織架構的沉潛積蓄之年。適合以靜制動，練好內功。" },
  "己": { title: "正印護身 · 權柄歸心與制度信任確立", desc: "未來12個月得歲君正印庇佑，長輩、官方或高層貴人暗中相扶，有利於在大型組織或核心機構中取得關鍵信任、確立正式管轄權限。凡事循規蹈矩，必能水到渠成。" },
  "庚": { title: "七殺淬煉 · 逆境突破與開闢疆土", desc: "火旺煉金，未來12個月是命主跳脫舒適圈、迎面接下高難度攻堅任務的英雄之年。壓力與機遇並存，每一次重大考驗都是權力擴張的墊腳石，極易在危機中脫穎而出。" },
  "辛": { title: "正官合身 · 體制晉升與名望階梯確立", desc: "未來12個月天干逢丙辛相合，官星來合我，象徵名正言順的晉升任命、跨部門主導權或與權威機構建立長期合約。利於走體制、晉級考評及確立不可撼動的行業名位。" },
  "壬": { title: "偏財宏圖 · 資本運作與資源槓桿放大", desc: "水火既濟，丙火偏財萬丈光芒，未來12個月對市場機會與商業脈搏極具嗅覺，適合大膽進行商業談判、股權投資、大宗交易或副業裂變。注意鎖定階段利潤，防範過度擴張。" },
  "癸": { title: "正財潤局 · 業務深耕與現金流穩健擴增", desc: "雨露得日光照耀，未來12個月財源脈絡清晰，主要收入、諮詢收益或商業訂單呈現持續攀升趨勢。適合深耕高價值付費用戶、打磨高毛利產品，將流量穩穩轉化為真金白銀。" }
};

export interface DecisionConfigItem {
  key: string;
  name: string;
  icon: string;
  targetGods: string[];
  favorableDesc: string;
  cautionDesc: string;
}

export const DECISION_CONFIG_MAP: Record<string, DecisionConfigItem> = {
  "轉工／轉跑道": { key: "job_change", name: "轉工／轉跑道", icon: "💼", targetGods: ["正官", "七殺", "正印", "偏印"], favorableDesc: "體制貴人相照，職位躍遷與薪資談判勝率顯著提高", cautionDesc: "月逢官殺相混或地支見沖，防承諾落空或新環境人事複雜" },
  "升職／爭取新職位": { key: "promotion", name: "升職／爭取新職位", icon: "🎖️", targetGods: ["正官", "正印", "比肩"], favorableDesc: "印官相生，個人權威與管轄權利獲核心高層正式確立", cautionDesc: "比劫爭位或官星受制，爭奪激烈需低調蓄力防止被借題發揮" },
  "創業／開始新項目": { key: "entrepreneurship", name: "創業／開始新項目", icon: "🚀", targetGods: ["食神", "傷官", "偏財"], favorableDesc: "才智與市場需求共鳴，利於輕資產破局與建立第一曲線", cautionDesc: "逢比劫奪財，資金鏈容易承壓，切忌盲目擴大初期固定開銷" },
  "擴張／開新市場": { key: "expansion", name: "擴張／開新市場", icon: "🌍", targetGods: ["偏財", "七殺", "傷官"], favorableDesc: "外拓氣場高漲，利於跨區域合作、大客戶開發或裂變新渠道", cautionDesc: "市場節奏過熱或管理半徑過寬，易造成後端運維失衡" },
  "投資／重大財務決定": { key: "investment", name: "投資／重大財務決定", icon: "💰", targetGods: ["正財", "偏財", "食神"], favorableDesc: "財源穩固有庫，適合佈局核心優質資產與中長線價值配置", cautionDesc: "偏印奪食或劫財耗損，高槓桿投機項目極易產生流動性陷阱" },
  "結婚／訂婚": { key: "marriage", name: "結婚／訂婚", icon: "💍", targetGods: ["正官", "正財", "六合"], favorableDesc: "夫妻宮氣場和合，雙方家庭共識凝聚，締結良緣水到渠成", cautionDesc: "夫妻宮逢沖或情緒浮動，商討婚俗或瑣事宜包容退讓" },
  "分手／結束一段關係": { key: "breakup", name: "分手／結束一段關係", icon: "🕊️", targetGods: ["傷官", "七殺", "偏印"], favorableDesc: "理智清明，利於和平劃定界限、解開彼此精神牽絆與財務切割", cautionDesc: "心境極端動盪之時容易口出惡言或激化矛盾，宜冷靜協商" },
  "搬屋／搬遷": { key: "relocation", name: "搬屋／搬遷", icon: "🏠", targetGods: ["正印", "偏印", "驛馬"], favorableDesc: "驛馬吉神得生，新居藏風聚氣，能帶動健康與家庭人際提升", cautionDesc: "地支動盪逢破，搬遷過程中易有物品損毀或合約產權口舌" },
  "移民／海外發展": { key: "immigration", name: "移民／海外發展", icon: "✈️", targetGods: ["偏印", "七殺", "偏財"], favorableDesc: "遠行大運臨門，跨國跨文化適應力強，利於落實簽證與定居手續", cautionDesc: "政策或文件流程易生延宕，需預留彈性預備期並核實手續" },
  "合夥／加入新合作": { key: "partnership", name: "合夥／加入新合作", icon: "🤝", targetGods: ["比肩", "正印", "食神"], favorableDesc: "優勢互補、資源互通，利於以清晰股權架構達成雙贏成果", cautionDesc: "比劫奪財之月，權責邊界不清或財務記賬模糊最易埋下隱患" }
};

export const ALL_DECISION_OPTIONS = Object.keys(DECISION_CONFIG_MAP);

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

export interface DecisionTimingResult {
  decisionName: string;
  icon: string;
  tendency: "較有利" | "較需審慎" | "適合觀察";
  tendencyColor: "emerald" | "rose" | "amber";
  tendencyDesc: string;
  bestMonth: string;
  bestMonthStars: string;
  bestMonthAnalysis: string;
  secondaryMonth: string;
  secondaryMonthStars: string;
  secondaryMonthAnalysis: string;
  cautionMonth: string;
  cautionMonthStars: string;
  cautionMonthAnalysis: string;
  timingFitAnalysis: string;
  strategies: string[];
}

export interface TwelveMonthsDecisionsReportResult {
  dayMaster: string;
  dominantElement: string;
  fourPillarsText: string;
  annualTheme: string;
  annualThemeDesc: string;
  userInput: {
    selectedDecisions: string[];
    planStatus: string;
    expectedTiming: string;
  };
  decisionReports: DecisionTimingResult[];
  monthlyBreakdown: Array<{
    monthIndex: number;
    period: string;
    lunarRange: string;
    yearStemBranch: string;
    monthStemBranch: string;
    tenGod: string;
    score: number;
    level: string;
    isClash: boolean;
    isHarmony: boolean;
  }>;
  turningPoints: string[];
}

export function computeTwelveMonthsDecisionsReport(
  birthDate: string,
  birthTime: string,
  gender: string = "male",
  selectedDecisions: string[] = ["轉工／轉跑道"],
  planStatus: string = "正在考慮",
  expectedTiming: string = "未確定",
  baziDataInput?: any
): TwelveMonthsDecisionsReportResult {
  const bazi = baziDataInput || calculateLocalBazi(birthDate, birthTime, gender);
  const dayStem = bazi?.day_master?.stem || "甲";
  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const dayBranch = bazi?.pillars?.day?.branch || "子";
  const monthBranch = bazi?.pillars?.month?.branch || "寅";
  const dominantElement = bazi?.elements?.dominant_element || dayElem;

  const sanitizedDecisions = selectedDecisions.filter(d => DECISION_CONFIG_MAP[d]).slice(0, 3);
  const effectiveDecisions = sanitizedDecisions.length > 0 ? sanitizedDecisions : ["轉工／轉跑道"];

  const wealthElem = CONTROLLED_ELEMENT[dayElem] || "土";
  const officerElem = CONTROLLING_ELEMENT[dayElem] || "金";

  const fourPillarsText = bazi?.pillars
    ? `${bazi.pillars.year.stem}${bazi.pillars.year.branch}年 / ${bazi.pillars.month.stem}${bazi.pillars.month.branch}月 / ${bazi.pillars.day.stem}${bazi.pillars.day.branch}日 / ${bazi.pillars.hour.stem}${bazi.pillars.hour.branch}時`
    : "排盤推演中";

  const startYear = 2026;
  const startMonth = 10;
  const monthlyBreakdown = [];

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
    const score = Math.round(Math.max(3.8, Math.min(9.8, base + pseudoSeed * 0.15)) * 10) / 10;

    let level = "平順 · 蓄力積累";
    if (score >= 8.8) level = "大吉 · 乘勢進取";
    else if (score >= 7.8) level = "次吉 · 穩步上升";
    else if (score <= 5.2) level = "守成 · 防守為先";

    monthlyBreakdown.push({
      monthIndex: idx + 1,
      period: periodStr,
      lunarRange: SOLAR_TERM_NAMES[idx % 12],
      yearStemBranch: `${yStem}${yBranch}`,
      monthStemBranch,
      tenGod,
      score,
      level,
      isClash,
      isHarmony,
      isStemCombine
    });
  }

  const themeCandidate = ANNUAL_THEME_CATALOG[dayStem] || ANNUAL_THEME_CATALOG["甲"];

  const decisionReports: DecisionTimingResult[] = effectiveDecisions.map((decName) => {
    const cfg = DECISION_CONFIG_MAP[decName];
    const targetGods = cfg.targetGods;

    const scoredMonths = monthlyBreakdown.map((m) => {
      let matchScore = m.score;
      if (targetGods.includes(m.tenGod)) matchScore += 1.2;
      if (m.isHarmony || m.isStemCombine) matchScore += 0.8;
      if (m.isClash) matchScore -= 1.8;
      return { matchScore, m };
    });

    scoredMonths.sort((a, b) => b.matchScore - a.matchScore);
    const bestMonthItem = scoredMonths[0].m;
    const secondaryMonthItem = scoredMonths.length > 1 ? scoredMonths[1].m : scoredMonths[0].m;
    
    const cautionMonthItem = [...monthlyBreakdown].sort((a, b) => {
      const aRisk = a.score - (a.isClash ? 3.0 : 0);
      const bRisk = b.score - (b.isClash ? 3.0 : 0);
      return aRisk - bRisk;
    })[0];

    const targetMonths = monthlyBreakdown.filter(m => targetGods.includes(m.tenGod));
    const avgTarget = targetMonths.length > 0
      ? targetMonths.reduce((acc, x) => acc + x.score, 0) / targetMonths.length
      : 7.0;

    let tendency: "較有利" | "較需審慎" | "適合觀察" = "適合觀察";
    let tendencyColor: "emerald" | "rose" | "amber" = "amber";
    let tendencyDesc = `氣候平穩，宜先進行調研摸底與前期鋪陳，待吉神到位再正式全面啟動。`;

    if (avgTarget >= 7.6 || bestMonthItem.score >= 8.6) {
      tendency = "較有利";
      tendencyColor = "emerald";
      tendencyDesc = `流年氣場生旺【${cfg.name}】關鍵星宿，原局受助良多，主動籌謀大有可為。`;
    } else if (cautionMonthItem.isClash && avgTarget < 6.8) {
      tendency = "較需審慎";
      tendencyColor = "rose";
      tendencyDesc = `當前歲月干支有相沖之氣，推進過程阻力稍多，需嚴格控制邊際風險，以防守蓄力為上策。`;
    }

    let timingFitAnalysis = "";
    if (planStatus === "已有明確計劃") {
      timingFitAnalysis = `閣下已有具體規劃（預計進行時點：${expectedTiming}）。經八字流月矩陣推算，建議將關鍵簽約、面試談判或公開發布之節點精準鎖定在【${bestMonthItem.period}（${bestMonthItem.monthStemBranch}月）】，而將前期溝通或法務合約校對安排在【${secondaryMonthItem.period}】。請嚴格避開【${cautionMonthItem.period}】之動盪窗口。`;
    } else if (planStatus === "正在考慮") {
      timingFitAnalysis = `目前處於深度權衡階段（預期窗口：${expectedTiming}）。此心態極度契合命理節奏，當前至【${secondaryMonthItem.period}】為最佳沙盤推演期，可透過小步快跑驗證可行性；若各項要素齊備，於【${bestMonthItem.period}】發力推進能取得倍增效果。`;
    } else {
      timingFitAnalysis = `目前尚未下定決心。八字建議順應時令節奏，不急於盲動承諾。可先行關注【${bestMonthItem.period}】前後出現之貴人引薦或外界契機，若信號明朗再作定奪。`;
    }

    return {
      decisionName: cfg.name,
      icon: cfg.icon,
      tendency,
      tendencyColor,
      tendencyDesc,
      bestMonth: `${bestMonthItem.period}（${bestMonthItem.monthStemBranch}月 · ${bestMonthItem.score}分）`,
      bestMonthStars: "★★★★★",
      bestMonthAnalysis: `此月逢【${bestMonthItem.tenGod}】得地，${cfg.favorableDesc}。宜重拳出擊，落實關鍵決定。`,
      secondaryMonth: `${secondaryMonthItem.period}（${secondaryMonthItem.monthStemBranch}月 · ${secondaryMonthItem.score}分）`,
      secondaryMonthStars: "★★★★☆",
      secondaryMonthAnalysis: `氣場漸進上揚，適合作為【${cfg.name}】的籌備、私下接觸或小規模測試期。`,
      cautionMonth: `${cautionMonthItem.period}（${cautionMonthItem.monthStemBranch}月 · ${cautionMonthItem.score}分）`,
      cautionMonthStars: "★★☆☆☆",
      cautionMonthAnalysis: `此月逢【${cautionMonthItem.tenGod}】與原局氣場激盪，${cfg.cautionDesc}。切忌在該月做出衝動式重大承諾。`,
      timingFitAnalysis,
      strategies: [
        `【主動借力】：在【${bestMonthItem.period}】善用五行喜用神方位的貴人與資源，確立主導話語權。`,
        `【風險鎖定】：避開【${cautionMonthItem.period}】簽署長期硬性合約，凡事需保留二次談判退路。`,
        `【執行閉環】：落實「先謀而後動」，在【${secondaryMonthItem.period}】做好資源底牌盤點。`
      ]
    };
  });

  const sortedM = [...monthlyBreakdown].sort((a, b) => b.score - a.score);
  const turningPoints = [
    `第 1 階段（${monthlyBreakdown[0].period} - ${monthlyBreakdown[3].period} · 摸底籌備期）：重點在於理清過往責任，梳理【${effectiveDecisions.join("、")}】所需資源。`,
    `第 2 階段（${monthlyBreakdown[4].period} - ${monthlyBreakdown[7].period} · 決策突破期）：全年度能量峰值顯現於【${sortedM[0].period}（${sortedM[0].score}分）】，為推動重大決策之黃金窗口。`,
    `第 3 階段（${monthlyBreakdown[8].period} - ${monthlyBreakdown[11].period} · 固化驗收期）：轉入成果收割，防範尾部波動，鎖定既得收益。`
  ];

  return {
    dayMaster: bazi?.day_master?.display || `${dayStem}${dayElem}`,
    dominantElement,
    fourPillarsText,
    annualTheme: themeCandidate.title,
    annualThemeDesc: themeCandidate.desc,
    userInput: {
      selectedDecisions: effectiveDecisions,
      planStatus,
      expectedTiming
    },
    decisionReports,
    monthlyBreakdown,
    turningPoints
  };
}
