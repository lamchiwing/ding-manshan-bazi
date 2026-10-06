import React, { useState, useMemo } from 'react';
import { calculateLocalBazi } from '../utils/baziLocalEngine';

interface LoveNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  baziData?: any;
  birthDate?: string;
  birthTime?: string;
  gender?: string;
  initialStatus?: string;
}

const RELATIONSHIP_STATUS_OPTIONS = [
  "單身",
  "曖昧／正在了解中",
  "穩定交往中",
  "已婚／有固定伴侶",
  "不透露｜純八字感情分析"
];

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

const STEM_ELEMENT: Record<string, string> = {
  "甲": "木", "乙": "木",
  "丙": "火", "丁": "火",
  "戊": "土", "己": "土",
  "庚": "金", "辛": "金",
  "壬": "水", "癸": "水"
};

const BRANCH_ELEMENT: Record<string, string> = {
  "子": "水", "丑": "土", "寅": "木", "卯": "木",
  "辰": "土", "巳": "火", "午": "火", "未": "土",
  "申": "金", "酉": "金", "戌": "土", "亥": "水"
};

const SIX_HARMONIES: Record<string, string> = {
  "子": "丑", "丑": "子",
  "寅": "亥", "亥": "寅",
  "卯": "戌", "戌": "卯",
  "辰": "酉", "酉": "辰",
  "巳": "申", "申": "巳",
  "午": "未", "未": "午"
};

const SIX_CLASHES: Record<string, string> = {
  "子": "午", "午": "子",
  "丑": "未", "未": "丑",
  "寅": "申", "申": "寅",
  "卯": "酉", "酉": "卯",
  "辰": "戌", "戌": "辰",
  "巳": "亥", "亥": "巳"
};

const STEM_COMBINATIONS: Record<string, string> = {
  "甲": "己", "己": "甲",
  "乙": "庚", "庚": "乙",
  "丙": "辛", "辛": "丙",
  "丁": "壬", "壬": "丁",
  "戊": "癸", "癸": "戊"
};

const INTERFERENCE_TYPES = [
  {
    typeName: "曖昧拖延型",
    description: "對方享受情感互動與情緒價值，但不願確立名分，反覆釋放好感卻欠缺實質生活承諾。",
    mitigation: "設定清晰邊界與時限，凡涉及重大承諾需以具體行動為憑，不接受模糊邊界的推託。"
  },
  {
    typeName: "忽冷忽熱型",
    description: "週期性熱情與冷淡交替，容易引發內耗焦慮，往往反映對方心智未成熟或對感情猶豫不決。",
    mitigation: "保持自身生活重心獨立，不隨對方的情緒節奏起舞，以穩定節奏拉長考察期。"
  },
  {
    typeName: "多線型",
    description: "對方社交圈活躍廣泛，可能同時與多位對象保持探討試探階段，習慣保留選擇餘地。",
    mitigation: "拉長觀察週期，多在真實生活與朋友家庭圈場景中交叉驗證，注意言行一致性。"
  },
  {
    typeName: "隱瞞型",
    description: "對個人過往、真實財務狀況或過往感情狀態有所保留，關鍵問題避重就輕。",
    mitigation: "注重透明度溝通，避免過早投入過多金錢與情感承諾，理性核實關鍵生活細節。"
  },
  {
    typeName: "控制型",
    description: "相處初期關懷備至，逐步轉為干涉個人社交與獨立自主權，以愛為名施加無形束縛。",
    mitigation: "堅守個人自主底線，確保經濟與社交空間之健康獨立，及早設立健康互動界限。"
  },
  {
    typeName: "玩玩型",
    description: "以短期陪伴或滿足當下情緒為目的，刻意逃避婚姻與長期人生責任規劃。",
    mitigation: "及早確認對婚姻與長遠未來的真實價值觀契合度，發現目標不符時果斷止損。"
  },
  {
    typeName: "短暫型",
    description: "因特定環境、氛圍或外在光環催生之好感，環境一變熱度迅速冷卻，缺乏深度情感黏性。",
    mitigation: "不急於做出一生重大承諾，待激情消退後回歸生活柴米油鹽的理性評估。"
  }
];

function getSpouseStarInfo(dayStem: string, gender: string) {
  const dayElem = STEM_ELEMENT[dayStem] || "木";
  const isFemale = gender === "female";

  if (isFemale) {
    const spouseMap: Record<string, { elem: string; star: string }> = {
      "木": { elem: "金", star: "金 (官殺星)" },
      "火": { elem: "水", star: "水 (官殺星)" },
      "土": { elem: "木", star: "木 (官殺星)" },
      "金": { elem: "火", star: "火 (官殺星)" },
      "水": { elem: "土", star: "土 (官殺星)" }
    };
    return spouseMap[dayElem] || { elem: "金", star: "金 (官殺星)" };
  } else {
    const spouseMap: Record<string, { elem: string; star: string }> = {
      "木": { elem: "土", star: "土 (妻財星)" },
      "火": { elem: "金", star: "金 (妻財星)" },
      "土": { elem: "水", star: "水 (妻財星)" },
      "金": { elem: "木", star: "木 (妻財星)" },
      "水": { elem: "火", star: "火 (妻財星)" }
    };
    return spouseMap[dayElem] || { elem: "土", star: "土 (妻財星)" };
  }
}

function computeLoveReport({
  birthDate = "1990-05-20",
  birthTime = "22:00",
  gender = "male",
  relationshipStatus = "單身",
  baziData
}: {
  birthDate?: string;
  birthTime?: string;
  gender?: string;
  relationshipStatus: string;
  baziData?: any;
}) {
  let chart = baziData;
  if (!chart || (!chart.pillars && !chart.fourPillars)) {
    try {
      chart = calculateLocalBazi(birthDate, birthTime, gender);
    } catch (e) {
      chart = null;
    }
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

  const dayElement = STEM_ELEMENT[dayStem] || "木";
  const spousePalaceBranch = dayBranch;
  const spouseInfo = getSpouseStarInfo(dayStem, gender);

  const patternNames: Record<string, string> = {
    "木": gender === "female" ? "官印相生 · 雅正貴偶格" : "木土培元 · 賢妻相助格",
    "火": gender === "female" ? "水火既濟 · 鸞鳳和鳴格" : "火金相煉 · 琴瑟友之格",
    "土": gender === "female" ? "土木滋養 · 德厚配偶格" : "山水映照 · 潤澤齊家格",
    "金": gender === "female" ? "金火輝映 · 俊秀相宜格" : "金木成梁 · 璧合交輝格",
    "水": gender === "female" ? "正緣合和 · 福澤綿長格" : "江海納財 · 恩澤相生格"
  };
  const patternName = patternNames[dayElement] || "正緣合和 · 福澤綿長格";

  const statusStrategies: Record<string, { title: string; content: string }> = {
    "單身": {
      title: "正緣時機與桃花甄別指引",
      content: "當前核心策略為「精準定向，拒絕低質社交」。原局夫妻宮氣場待動，未來 36 個月內有兩波強桃花週期，重點在於辨識具備責任感與長期規劃能力之對象，避免因一時新鮮感陷入模糊關係。"
    },
    "曖昧／正在了解中": {
      title: "破局時點與升級確認指引",
      content: "目前關係處於互動試探期，切忌拖延過久導致熱度耗損。矩陣顯示未來 6-9 個月內將迎來關鍵節點，適合在能量上升月份透過明確邊界或共同旅行推進確定名分。"
    },
    "穩定交往中": {
      title: "修成正果與婚動契機",
      content: "交往關係進入深化期，重點聚焦在雙方家庭融入與金錢財務觀之磨合。流年引動夫妻宮時為最佳提親與領證契機，應提防日常溝通中因瑣事引發的無謂摩擦。"
    },
    "已婚／有固定伴侶": {
      title: "親密增溫與防干擾防護",
      content: "關係重心轉向長久相守與家庭結構穩定。需注重營造生活儀式感，並在流年地支逢沖之月份主動安排度假或聚會，將潛在波動轉化為生活環境的新鮮感。"
    },
    "不透露｜純八字感情分析": {
      title: "八字原局感情模式客觀全覽",
      content: "自客觀天干地支五行生剋解析，原局日主能量深厚，重視伴侶精神共鳴與實質支持。掌握行運吉凶節奏，無論處於何種感情階段皆能立於不敗之地。"
    }
  };
  const currentStrategy = statusStrategies[relationshipStatus] || statusStrategies["單身"];

  const seed = (dayStem.charCodeAt(0) * 7 + dayBranch.charCodeAt(0) * 13 + (gender === "female" ? 3 : 1)) % INTERFERENCE_TYPES.length;
  const interferenceRisk = INTERFERENCE_TYPES[seed];

  const matrix = [];
  let topScore = 0;
  let topMonth = "2027/05";
  let topOpportunityText = "";
  let cautionMonth = "2028/07";
  let lowestScore = 10;

  const startYear = 2026;
  const startMonth = 10;

  for (let idx = 0; idx < 36; idx++) {
    const totalMonths = startYear * 12 + (startMonth - 1) + idx;
    const y = Math.floor(totalMonths / 12);
    const m = (totalMonths % 12) + 1;
    const periodStr = `${y}/${String(m).padStart(2, "0")}`;

    const yearStemCalc = STEMS[(y - 4) % 10];
    const yearBranchCalc = BRANCHES[(y - 4) % 12];
    const monthBranchCalc = BRANCHES[(m + 1) % 12];
    const monthStemCalc = STEMS[((y % 5) * 2 + m + 1) % 10];

    let score = 6.6;
    let interactionReasons: string[] = [];

    if (SIX_HARMONIES[dayBranch] === monthBranchCalc) {
      score += 2.0;
      interactionReasons.push(`流月【${monthBranchCalc}】合動日支夫妻宮【${dayBranch}】`);
    }

    if (STEM_COMBINATIONS[dayStem] === monthStemCalc) {
      score += 1.8;
      interactionReasons.push(`流月干【${monthStemCalc}】與日干【${dayStem}】天干相合`);
    }

    if (BRANCH_ELEMENT[monthBranchCalc] === spouseInfo.elem || STEM_ELEMENT[monthStemCalc] === spouseInfo.elem) {
      score += 1.2;
      interactionReasons.push(`夫妻星氣場透出`);
    }

    if (SIX_CLASHES[dayBranch] === monthBranchCalc) {
      score -= 2.2;
      interactionReasons.push(`流月【${monthBranchCalc}】與夫妻宮【${dayBranch}】相沖`);
    }

    if (dayBranch === monthBranchCalc) {
      score -= 0.6;
      interactionReasons.push(`夫妻宮伏吟`);
    }

    const wave = Math.sin((idx + dayStem.charCodeAt(0) % 6) * 0.52) * 0.9;
    score += wave;

    score = Math.round(score * 10) / 10;
    if (score > 9.8) score = 9.8;
    if (score < 4.2) score = 4.2;

    const peachStars = Math.min(5, Math.max(1, Math.round(score / 2)));
    const trend = score >= 7.8 ? "上升" : score <= 5.5 ? "波動" : "穩定";
    const advice = score >= 7.8 ? "把握" : score <= 5.2 ? "留意" : "觀察";

    let summary = "平穩推進，適合深入溝通日常觀念與價值觀。";
    if (advice === "把握") {
      summary = interactionReasons.length > 0 
        ? `${interactionReasons.join("，")}，正緣能量顯著上升，宜主動互動定盟。`
        : "氣場相投，正緣能量顯著上升，宜主動互動定盟。";
    } else if (advice === "留意") {
      summary = interactionReasons.length > 0
        ? `${interactionReasons.join("，")}，情緒起伏較大，宜給予彼此空間，防範口舌瑣事。`
        : "情緒起伏較大，宜給予彼此空間，防範口舌瑣事。";
    }

    if (score > topScore) {
      topScore = score;
      topMonth = periodStr;
      topOpportunityText = interactionReasons.length > 0
        ? `${periodStr} 前後之季度，${interactionReasons.join("，")}，最利破局定情。`
        : `${periodStr} 前後之季度，流月與夫妻星形成天合地合，最利破局定情。`;
    }

    if (score < lowestScore) {
      lowestScore = score;
      cautionMonth = `${periodStr}（流月氣場逢沖，宜注意溝通）`;
    }

    matrix.push({
      period: periodStr,
      yearStemBranch: `${yearStemCalc}${yearBranchCalc}`,
      monthStemBranch: `${monthStemCalc}${monthBranchCalc}`,
      loveScore: score,
      peachScore: peachStars,
      trend,
      advice,
      summary
    });
  }

  const cautionPeriod = cautionMonth.includes("2028") 
    ? "2028 年春夏交替之際" 
    : cautionMonth.includes("2027") 
    ? "2027 年秋季逢沖月份" 
    : "2029 年歲末轉換時期";

  return {
    reportId: `TMS-LOVE-${birthDate.replace(/-/g, "")}`,
    solarDate: `${birthDate} ${birthTime}`,
    gender: gender === "male" ? "乾造（男）" : "坤造（女）",
    relationshipStatus,
    fourPillars: {
      year: `${yearStem}${yearBranch}`,
      month: `${monthStem}${monthBranch}`,
      day: `${dayStem}${dayBranch}`,
      hour: `${hourStem}${hourBranch}`
    },
    spousePalaceBranch,
    spouseElement: spouseInfo.star,
    patternName,
    statusStrategyTitle: currentStrategy.title,
    statusStrategyContent: currentStrategy.content,
    interferenceRisk,
    topMonth: `${topMonth}（評分高達 ${topScore.toFixed(1)} 分）`,
    bestOpportunity: topOpportunityText || `${topMonth} 前後之季度，流月與夫妻星相合，最利破局定情。`,
    cautionPeriod,
    matrix
  };
}

export const LoveNavigationModal: React.FC<LoveNavigationModalProps> = ({
  isOpen,
  onClose,
  baziData,
  birthDate = "1990-05-20",
  birthTime = "22:00",
  gender = "male",
  initialStatus = "單身"
}) => {
  const [currentStatus, setCurrentStatus] = useState<string>(initialStatus);

  const report = useMemo(() => {
    return computeLoveReport({
      birthDate,
      birthTime,
      gender,
      relationshipStatus: currentStatus,
      baziData
    });
  }, [birthDate, birthTime, gender, currentStatus, baziData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-[#FAF7F2] text-[#2B2D2F] w-full max-w-4xl rounded-lg shadow-2xl border border-[#9B2C2C]/30 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#9B2C2C] text-[#FAF7F2] px-5 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💖</span>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">
                姻緣導航‧未來 3 年正緣全覽
              </h3>
              <p className="text-xs text-[#FAF7F2]/80">
                檔案編號：{report.reportId} · 官方深度手冊 (HK$188)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors cursor-pointer"
            title="關閉"
          >
            ✕
          </button>
        </div>

        {/* 5 Relationship Status Tabs */}
        <div className="bg-[#EFE9DF] border-b border-[#2B2D2F]/10 px-4 py-2 flex flex-wrap gap-1.5 overflow-x-auto shrink-0">
          {RELATIONSHIP_STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => setCurrentStatus(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap ${
                currentStatus === status
                  ? 'bg-[#9B2C2C] text-white shadow-sm'
                  : 'bg-white/70 text-[#2B2D2F]/80 hover:bg-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 font-sans text-sm">
          
          {/* Card 1: Natal Overview & Strategy */}
          <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs text-[#2B2D2F]/70 border-b pb-2 gap-2">
              <span>生辰：{report.solarDate} · {report.gender}</span>
              <span className="font-medium text-[#1E3A5F]">
                日柱夫妻宮：【{report.spousePalaceBranch}】· 夫妻星：{report.spouseElement}
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-[#9B2C2C] pt-1">
              ✦ {report.statusStrategyTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#2B2D2F]/90 leading-relaxed">
              {report.statusStrategyContent}
            </p>
          </div>

          {/* Card 2: External Interference Alert */}
          <div className="bg-[#9B2C2C]/5 border border-[#9B2C2C]/30 p-4 rounded space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="text-base">🛡️</span>
              <h4 className="font-serif font-bold text-sm text-[#9B2C2C]">
                外部感情干擾預警：【{report.interferenceRisk.typeName}】
              </h4>
            </div>
            <p className="text-xs text-[#2B2D2F]/80 leading-relaxed">
              <strong>特徵解析：</strong>{report.interferenceRisk.description}
            </p>
            <p className="text-xs text-[#9B2C2C] font-semibold leading-relaxed">
              <strong>應對指引：</strong>{report.interferenceRisk.mitigation}
            </p>
          </div>

          {/* Card 3: 3 Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3.5 rounded border border-[#2B2D2F]/10 shadow-xs">
              <span className="text-[10px] text-[#9B2C2C] font-bold uppercase tracking-wider block mb-1">
                ⭐ 最旺感情月份
              </span>
              <p className="font-serif font-bold text-sm text-[#2B2D2F]">
                {report.topMonth}
              </p>
            </div>
            <div className="bg-white p-3.5 rounded border border-[#2B2D2F]/10 shadow-xs">
              <span className="text-[10px] text-[#D97706] font-bold uppercase tracking-wider block mb-1">
                💍 最具把握契機
              </span>
              <p className="font-serif font-bold text-xs text-[#2B2D2F] leading-snug">
                {report.bestOpportunity}
              </p>
            </div>
            <div className="bg-white p-3.5 rounded border border-[#2B2D2F]/10 shadow-xs">
              <span className="text-[10px] text-[#4A5568] font-bold uppercase tracking-wider block mb-1">
                ⚠️ 需多留意時期
              </span>
              <p className="font-serif font-bold text-xs text-[#2B2D2F]">
                {report.cautionPeriod}
              </p>
            </div>
          </div>

          {/* Card 4: 36-Month Navigation Matrix Table */}
          <div className="space-y-2">
            <h4 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-2">
              <span>📅</span>
              <span>未來 36 個月感情導航矩陣 (2026/10 - 2029/09)</span>
            </h4>
            <div className="border border-[#2B2D2F]/15 rounded overflow-x-auto max-h-72 shadow-inner">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#1E3A5F] text-[#FAF7F2] sticky top-0 font-serif">
                  <tr>
                    <th className="p-2.5">月份週期</th>
                    <th className="p-2.5">干支氣場</th>
                    <th className="p-2.5 text-center">姻緣分</th>
                    <th className="p-2.5 text-center">桃花分</th>
                    <th className="p-2.5 text-center">走勢</th>
                    <th className="p-2.5 text-center">建議</th>
                    <th className="p-2.5">導航指引</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2B2D2F]/10 bg-white">
                  {report.matrix.map((row) => (
                    <tr key={row.period} className="hover:bg-[#F4EFEA]/70 transition-colors">
                      <td className="p-2 font-mono font-bold text-[#1E3A5F] whitespace-nowrap">
                        {row.period}
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        {row.yearStemBranch}年 {row.monthStemBranch}月
                      </td>
                      <td className="p-2 text-center font-bold text-[#9B2C2C]">
                        {row.loveScore}
                      </td>
                      <td className="p-2 text-center text-[#D97706]">
                        {"★".repeat(row.peachScore)}
                      </td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          row.trend === "上升"
                            ? "bg-red-100 text-red-700"
                            : row.trend === "波動"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {row.trend}
                        </span>
                      </td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          row.advice === "把握"
                            ? "bg-green-100 text-green-800"
                            : row.advice === "留意"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {row.advice}
                        </span>
                      </td>
                      <td className="p-2 text-[#2B2D2F]/80 text-[11px] min-w-[200px]">
                        {row.summary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#EFE9DF] border-t border-[#2B2D2F]/10 px-5 py-3 flex items-center justify-between text-xs shrink-0">
          <span className="text-[#2B2D2F]/70">
            測試網域特別授權：即時免扣款查看全覽報告
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#9B2C2C] hover:bg-[#742A2A] text-white font-sans font-bold rounded shadow transition-colors cursor-pointer"
          >
            關閉報告
          </button>
        </div>

      </div>
    </div>
  );
};
