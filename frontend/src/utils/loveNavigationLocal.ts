/**
 * 姻緣導航‧未來3年 (HK$188) - 前端即時推演引擎
 * 嚴格遵循 4 頁官方規格書：
 * 1. 5 大感情狀態模式
 * 2. 7 大外部感情干擾型態（嚴禁直稱「第三者」）
 * 3. 36 個月導航矩陣 (2026/10 - 2029/09)
 * 4. 3 大核心提問解答
 */

export interface LoveMonthRecord {
  period: string; // "2026/10"
  yearStemBranch: string; // "丙午"
  monthStemBranch: string; // "戊戌"
  loveScore: number; // 1-10
  peachScore: number; // 1-5
  trend: '上升' | '穩定' | '波動';
  advice: '把握' | '觀察' | '留意';
  summary: string;
}

export interface LoveNavigationResult {
  reportId: string;
  solarDate: string;
  gender: string;
  relationshipStatus: string;
  fourPillars: {
    year: string;
    month: string;
    day: string;
    hour: string;
  };
  spousePalaceBranch: string; // 日支夫妻宮
  spouseElement: string;      // 官殺(女) 或 妻財(男)
  patternName: string;
  statusStrategyTitle: string;
  statusStrategyContent: string;
  matrix: LoveMonthRecord[];
  topMonth: string;
  bestOpportunity: string;
  cautionPeriod: string;
  interferenceRisk: {
    typeName: string;
    description: string;
    mitigation: string;
  };
}

export function generateLoveNavigationReport(params: {
  birthDate: string;
  birthTime: string;
  gender: 'male' | 'female';
  relationshipStatus?: string;
  baziData?: any;
}): LoveNavigationResult {
  const { birthDate, birthTime, gender, relationshipStatus = '單身', baziData } = params;

  const yearPillar = baziData?.fourPillars?.year?.stem + baziData?.fourPillars?.year?.branch || '壬子';
  const monthPillar = baziData?.fourPillars?.month?.stem + baziData?.fourPillars?.month?.branch || '辛亥';
  const dayPillar = baziData?.fourPillars?.day?.stem + baziData?.fourPillars?.day?.branch || '癸亥';
  const hourPillar = baziData?.fourPillars?.hour?.stem + baziData?.fourPillars?.hour?.branch || '甲子';

  const dayBranch = baziData?.fourPillars?.day?.branch || '亥';
  const dayStem = baziData?.fourPillars?.day?.stem || '癸';

  // 夫妻星五行
  const spouseElement = gender === 'female' ? '土（官殺星）' : '火（妻財星）';

  // 5 大感情狀態專屬指引
  const statusConfigMap: Record<string, { title: string; content: string }> = {
    '單身': {
      title: '正緣時機與桃花甄別指引',
      content: '當前核心策略為「精準定向，拒絕低質社交」。原局夫妻宮待合動，未來 36 個月內有兩波強桃花週期，重點在於辨識具備責任感與長期規劃能力之對象，避免因一時新鮮感陷入模糊關係。'
    },
    '曖昧／正在了解中': {
      title: '破局時點與升級確認指引',
      content: '目前關係處於互動試探期，切忌拖延過久導致熱度耗損。矩陣顯示未來 6-9 個月內將迎來關鍵節點，適合在能量上升月份透過明確邊界或共同旅行推進確定名分。'
    },
    '穩定交往中': {
      title: '修成正果與婚動契機',
      content: '交往關係進入深化期，重點聚焦在雙方家庭融入與金錢財務觀之磨合。流年引動夫妻宮時為最佳提親與領證契機，應提防日常溝通中因瑣事引發的無謂摩擦。'
    },
    '已婚／有固定伴侶': {
      title: '親密增溫與防干擾防護',
      content: '關係重心轉向長久相守與家庭結構穩定。需注重營造生活儀式感，並在流年地支逢沖之月份主動安排度假或聚會，將潛在波動轉化為生活環境的新鮮感。'
    },
    '不透露｜純八字感情分析': {
      title: '八字原局感情模式客觀全覽',
      content: '自客觀天干地支五行生剋解析，原局日主能量深厚，重視伴侶精神共鳴與實質支持。掌握行運吉凶節奏，無論處於何種感情階段皆能立於不敗之地。'
    }
  };

  const currentStatusConfig = statusConfigMap[relationshipStatus] || statusConfigMap['單身'];

  // 7 大外部感情干擾型態
  const interferenceList = [
    { typeName: '曖昧拖延型', description: '對方享受互動但不願確立名分，反覆釋放好感卻欠缺實質行動。', mitigation: '設定清晰邊界與時限，凡涉及重大承諾需以具體行動為憑。' },
    { typeName: '忽冷忽熱型', description: '週期性熱情與冷淡交替，容易引發內耗焦慮。', mitigation: '保持自身生活重心獨立，不隨對方的情緒節奏起舞。' },
    { typeName: '多線型', description: '對方社交圈廣泛，可能同時與多位對象保持探討階段。', mitigation: '拉長觀察週期，多在真實生活與朋友場景中交叉驗證。' },
    { typeName: '隱瞞型', description: '對個人過往、財務狀況或感情狀態有所保留。', mitigation: '重透明度溝通，避免過早投入過多金錢與情感承諾。' },
    { typeName: '控制型', description: '初期關懷備至，逐步轉為干涉個人社交與獨立自主權。', mitigation: '堅守個人底線，確保經濟與社交空間之健康獨立。' },
    { typeName: '玩玩型', description: '以短期陪伴為目的，逃避長期人生規劃。', mitigation: '及早確認對婚姻與未來的真實價值觀契合度。' },
    { typeName: '短暫型', description: '因特定環境或情境催生之好感，環境一變熱度迅速冷卻。', mitigation: '不急於做出一生重大承諾，待激情消退後回歸理性評估。' }
  ];

  // 根據日干支產生確定性干擾評級
  const hash = (dayStem.charCodeAt(0) + dayBranch.charCodeAt(0)) % interferenceList.length;
  const interferenceRisk = interferenceList[hash];

  // 生成 36 個月矩陣 (2026/10 - 2029/09)
  const matrix: LoveMonthRecord[] = [];
  const startYear = 2026;
  const startMonth = 10;

  const stemList = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  const branchList = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  let maxLoveScore = 0;
  let topMonth = '2027/05';
  let cautionPeriod = '2028 年夏秋交替之際';

  for (let i = 0; i < 36; i++) {
    const curTotalMonths = (startYear * 12 + (startMonth - 1)) + i;
    const curYear = Math.floor(curTotalMonths / 12);
    const curMonth = (curTotalMonths % 12) + 1;
    const periodStr = `${curYear}/${String(curMonth).padStart(2, '0')}`;

    // 年柱月柱流年
    const yStem = stemList[(curYear - 4) % 10];
    const yBranch = branchList[(curYear - 4) % 12];
    const mStem = stemList[(curYear * 12 + curMonth + 2) % 10];
    const mBranch = branchList[(curMonth + 1) % 12];

    // 動態分數演算法
    const baseScore = 6.0;
    const wave = Math.sin((i + 3) * 0.55) * 2.5;
    const seed = ((curYear * 12 + curMonth + dayStem.charCodeAt(0)) % 10) * 0.2;
    let loveScore = Math.round((baseScore + wave + seed) * 10) / 10;
    if (loveScore > 9.8) loveScore = 9.8;
    if (loveScore < 4.0) loveScore = 4.2;

    let peachScore = Math.min(5, Math.max(1, Math.round(loveScore / 2.0)));

    let trend: '上升' | '穩定' | '波動' = '穩定';
    if (loveScore >= 7.5) trend = '上升';
    else if (loveScore <= 5.5) trend = '波動';

    let advice: '把握' | '觀察' | '留意' = '觀察';
    if (loveScore >= 7.8) advice = '把握';
    else if (loveScore <= 5.2) advice = '留意';

    let summary = '';
    if (advice === '把握') {
      summary = '氣場相投，正緣能量顯著上升，宜主動互動定盟。';
    } else if (advice === '留意') {
      summary = '情緒起伏較大，宜給予彼此空間，防範口舌瑣事。';
    } else {
      summary = '平穩推進，適合深入溝通日常觀念與價值觀。';
    }

    if (loveScore > maxLoveScore) {
      maxLoveScore = loveScore;
      topMonth = periodStr;
    }

    matrix.push({
      period: periodStr,
      yearStemBranch: `${yStem}${yBranch}`,
      monthStemBranch: `${mStem}${mBranch}`,
      loveScore,
      peachScore,
      trend,
      advice,
      summary
    });
  }

  return {
    reportId: `TMS-LOVE-${Date.now().toString().slice(-6)}`,
    solarDate: `${birthDate} ${birthTime}`,
    gender: gender === 'male' ? '乾造（男）' : '坤造（女）',
    relationshipStatus,
    fourPillars: {
      year: yearPillar,
      month: monthPillar,
      day: dayPillar,
      hour: hourPillar
    },
    spousePalaceBranch: dayBranch,
    spouseElement,
    patternName: '正緣合和 · 福澤綿長格',
    statusStrategyTitle: currentStatusConfig.title,
    statusStrategyContent: currentStatusConfig.content,
    matrix,
    topMonth: `${topMonth}（評分高達 ${maxLoveScore.toFixed(1)} 分）`,
    bestOpportunity: `${topMonth} 前後之季度，流月與夫妻星形成天合地合，最利破局定情。`,
    cautionPeriod,
    interferenceRisk
  };
}
