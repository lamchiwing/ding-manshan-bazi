import os

cwd = os.getcwd()
if os.path.exists('frontend') and os.path.exists('.git'):
    base_dir = os.path.abspath('.')
    frontend_dir = os.path.join(base_dir, 'frontend')
elif os.path.exists('src') and os.path.exists('package.json'):
    frontend_dir = os.path.abspath('.')
    base_dir = os.path.abspath('..')
else:
    base_dir = os.path.abspath('.')
    frontend_dir = os.path.join(base_dir, 'frontend') if os.path.exists(os.path.join(base_dir, 'frontend')) else base_dir

print(f"[*] 工作目錄: {base_dir}")

# 1. 確保目錄
os.makedirs(os.path.join(frontend_dir, 'src/components'), exist_ok=True)
os.makedirs(os.path.join(frontend_dir, 'src/utils'), exist_ok=True)

# 2. 寫入 twelveMonthsNavigationLocal.ts
ts_path = os.path.join(frontend_dir, 'src/utils/twelveMonthsNavigationLocal.ts')
ts_code = '''import { calculateLocalBazi } from './baziLocalEngine';
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
'''
with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(ts_code)
print(f"[✓] 已建立前端推演引擎: {ts_path}")

# 3. 寫入 TwelveMonthsReportModal.tsx
modal_path = os.path.join(frontend_dir, 'src/components/TwelveMonthsReportModal.tsx')
modal_code = '''import React, { useState, useMemo } from 'react';
import { computeTwelveMonthsReport, TwelveMonthsReportResult } from '../utils/twelveMonthsNavigationLocal';

interface TwelveMonthsReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  baziData?: any;
  birthDate?: string;
  birthTime?: string;
  gender?: string;
}

export const TwelveMonthsReportModal: React.FC<TwelveMonthsReportModalProps> = ({
  isOpen,
  onClose,
  baziData,
  birthDate = '1990-05-20',
  birthTime = '22:00',
  gender = 'male'
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'monthly'>('overview');
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(0);

  const report: TwelveMonthsReportResult = useMemo(() => {
    return computeTwelveMonthsReport(birthDate, birthTime, gender, baziData);
  }, [birthDate, birthTime, gender, baziData]);

  if (Boolean(isOpen) === false) return null;
  const currentMonth = report.monthlyBreakdown[selectedMonthIdx] || report.monthlyBreakdown[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] text-[#2B2D2F] w-full max-w-4xl max-h-[92vh] rounded-md shadow-2xl border border-[#1E3A5F]/20 flex flex-col overflow-hidden">
        <div className="bg-[#1E3A5F] text-[#F4EFEA] px-5 py-3.5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🌙</span>
            <div>
              <h3 className="font-serif font-bold text-base sm:text-lg tracking-wide text-white">丁蔓山｜命理誌 · 流年＋12流月運程報告</h3>
              <p className="text-[11px] text-[#A4B3C6]">未來12個月事業、財運、愛情、人際、重要事件＋逐月深度詳批 (HK$368)</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => window.print()} className="px-2.5 py-1 text-xs bg-white/10 hover:bg-white/20 text-[#F4EFEA] rounded border border-white/20 transition-colors">列印 / PDF</button>
            <button onClick={onClose} className="text-[#F4EFEA]/80 hover:text-white text-xl px-2 py-0.5 rounded transition-colors cursor-pointer">✕</button>
          </div>
        </div>
        <div className="bg-[#EFE9DF] border-b border-[#2B2D2F]/10 px-5 py-2.5 flex flex-wrap items-center justify-between text-xs text-[#2B2D2F]/90 gap-2 shrink-0">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-[#1E3A5F]">日主：【{report.dayMaster}】</span>
            <span>四柱：{report.fourPillarsText}</span>
            <span>主導五行：<strong className="text-[#D97706]">{report.dominantElement}</strong></span>
          </div>
          <div className="font-mono text-[#1E3A5F] font-bold">推演區間：{report.startPeriod} ～ {report.endPeriod}</div>
        </div>
        <div className="bg-white border-b border-[#2B2D2F]/10 px-5 py-2 flex items-center space-x-3 shrink-0">
          <button onClick={() => setActiveTab('overview')} className={'px-3.5 py-1.5 rounded text-xs font-bold transition-all ' + (activeTab === 'overview' ? 'bg-[#1E3A5F] text-white shadow-xs' : 'bg-white/80 text-[#2B2D2F]/80 hover:bg-[#1E3A5F]/10')}>A. 流年總覽 (整體/維度評分/重大轉折)</button>
          <button onClick={() => setActiveTab('monthly')} className={'px-3.5 py-1.5 rounded text-xs font-bold transition-all ' + (activeTab === 'monthly' ? 'bg-[#1E3A5F] text-white shadow-xs' : 'bg-white/80 text-[#2B2D2F]/80 hover:bg-[#1E3A5F]/10')}>B. 未來12個月逐月分析 (八大維度全景)</button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto font-sans text-xs sm:text-sm leading-relaxed space-y-5 flex-1">
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs">
                <h4 className="font-serif font-bold text-sm text-[#1E3A5F] mb-3 flex items-center space-x-1.5"><span>📊</span><span>未來 12 個月整體與專項運勢評分 (0–10)</span></h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-[#1E3A5F]/5 p-3 rounded border border-[#1E3A5F]/20 text-center"><span className="text-[11px] text-[#2B2D2F]/70 block mb-1">整體運勢</span><span className="text-2xl font-serif font-bold text-[#1E3A5F]">{report.annualOverview.overallScore}</span><span className="text-[10px] text-[#2B2D2F]/60 block mt-1">/ 10 分</span></div>
                  <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 text-center"><span className="text-[11px] text-[#2B2D2F]/70 block mb-1">事業運</span><span className="text-2xl font-serif font-bold text-[#2B547E]">{report.annualOverview.careerScore}</span><span className="text-[10px] text-[#2B2D2F]/60 block mt-1">/ 10 分</span></div>
                  <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 text-center"><span className="text-[11px] text-[#2B2D2F]/70 block mb-1">財運</span><span className="text-2xl font-serif font-bold text-[#D97706]">{report.annualOverview.wealthScore}</span><span className="text-[10px] text-[#2B2D2F]/60 block mt-1">/ 10 分</span></div>
                  <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 text-center"><span className="text-[11px] text-[#2B2D2F]/70 block mb-1">愛情運</span><span className="text-2xl font-serif font-bold text-[#9B2C2C]">{report.annualOverview.loveScore}</span><span className="text-[10px] text-[#2B2D2F]/60 block mt-1">/ 10 分</span></div>
                  <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 text-center col-span-2 sm:col-span-1"><span className="text-[11px] text-[#2B2D2F]/70 block mb-1">人際運</span><span className="text-2xl font-serif font-bold text-[#0D9488]">{report.annualOverview.interpersonalScore}</span><span className="text-[10px] text-[#2B2D2F]/60 block mt-1">/ 10 分</span></div>
                </div>
              </div>
              <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-2">
                <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block">6. 未來12個月主要發展主題</span>
                <h5 className="font-serif font-bold text-base text-[#1E3A5F]">{report.annualOverview.mainTheme}</h5>
                <p className="text-xs text-[#2B2D2F]/85 leading-relaxed">{report.annualOverview.mainThemeDesc}</p>
              </div>
              <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-2">
                <span className="text-[11px] font-bold text-[#1E3A5F] uppercase tracking-wider block">7. 未來12個月重要事件／轉折預測</span>
                <div className="space-y-2 pt-1">
                  {report.annualOverview.keyTurningPoints.map((tp, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-[#2B2D2F]/90 bg-[#F4EFEA]/60 p-2.5 rounded border border-[#2B2D2F]/10"><span className="text-[#D97706] font-bold">◆</span><span>{tp}</span></div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded shadow-xs space-y-2">
                  <span className="text-xs font-bold text-emerald-800 flex items-center space-x-1.5"><span>🌟</span><span>8. 年度最旺月份（宜開拓進取）</span></span>
                  <ul className="space-y-1.5 text-xs text-emerald-950">{report.annualOverview.bestMonths.map((bm, i) => (<li key={i} className="flex items-center space-x-1.5"><span className="font-bold">✓</span><span className="font-mono">{bm}</span></li>))}</ul>
                </div>
                <div className="bg-rose-50/70 border border-rose-200 p-4 rounded shadow-xs space-y-2">
                  <span className="text-xs font-bold text-rose-800 flex items-center space-x-1.5"><span>⚠️</span><span>9. 最需要留意月份（宜穩健防守）</span></span>
                  <ul className="space-y-1.5 text-xs text-rose-950">{report.annualOverview.cautionMonths.map((cm, i) => (<li key={i} className="flex items-center space-x-1.5"><span className="font-bold">!</span><span className="font-mono">{cm}</span></li>))}</ul>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'monthly' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-[#2B2D2F]/10">
                {report.monthlyBreakdown.map((m, idx) => (
                  <button key={idx} onClick={() => setSelectedMonthIdx(idx)} className={'px-2.5 py-1.5 rounded text-xs transition-all flex flex-col items-center ' + (selectedMonthIdx === idx ? 'bg-[#1E3A5F] text-white font-bold shadow-xs' : 'bg-white border border-[#2B2D2F]/15 text-[#2B2D2F]/80 hover:bg-[#1E3A5F]/10')}><span className="text-[10px] opacity-80">{m.period}</span><span className="font-serif font-bold">{m.monthStemBranch}</span></button>
                ))}
              </div>
              <div className="bg-white p-5 rounded border border-[#2B2D2F]/10 shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#2B2D2F]/10 gap-2">
                  <div><h4 className="font-serif font-bold text-lg text-[#1E3A5F]">【第 {currentMonth.monthIndex} 個月】{currentMonth.period} · {currentMonth.monthStemBranch}月</h4><p className="text-xs text-[#2B2D2F]/70">節氣時序：{currentMonth.lunarRange} · 歲月干支：{currentMonth.yearStemBranch}</p></div>
                  <div className="flex items-center space-x-2"><span className="text-xs text-[#2B2D2F]/80">運勢評級：</span><span className={'px-2.5 py-1 rounded text-xs font-bold ' + (currentMonth.score >= 8.5 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : currentMonth.score <= 5.5 ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-blue-100 text-blue-800 border border-blue-300')}>{currentMonth.score} 分 · {currentMonth.level}</span></div>
                </div>
                <div className="bg-[#1E3A5F]/5 p-3 rounded text-xs text-[#1E3A5F] font-medium leading-relaxed"><strong>整體概況：</strong>{currentMonth.overallSummary}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded border border-[#2B2D2F]/10 bg-[#FAF7F2] space-y-1"><span className="font-bold text-[#2B547E] text-xs flex items-center space-x-1"><span>💼</span><span>2. 事業運勢</span></span><p className="text-xs text-[#2B2D2F]/85">{currentMonth.career}</p></div>
                  <div className="p-3.5 rounded border border-[#2B2D2F]/10 bg-[#FAF7F2] space-y-1"><span className="font-bold text-[#D97706] text-xs flex items-center space-x-1"><span>💰</span><span>3. 財運走勢</span></span><p className="text-xs text-[#2B2D2F]/85">{currentMonth.wealth}</p></div>
                  <div className="p-3.5 rounded border border-[#2B2D2F]/10 bg-[#FAF7F2] space-y-1"><span className="font-bold text-[#9B2C2C] text-xs flex items-center space-x-1"><span>💖</span><span>4. 愛情姻緣</span></span><p className="text-xs text-[#2B2D2F]/85">{currentMonth.love}</p></div>
                  <div className="p-3.5 rounded border border-[#2B2D2F]/10 bg-[#FAF7F2] space-y-1"><span className="font-bold text-[#0D9488] text-xs flex items-center space-x-1"><span>🤝</span><span>5. 人際關係</span></span><p className="text-xs text-[#2B2D2F]/85">{currentMonth.interpersonal}</p></div>
                </div>
                <div className="p-3.5 rounded border border-[#D97706]/30 bg-amber-50/40 space-y-1"><span className="font-bold text-[#D97706] text-xs flex items-center space-x-1"><span>⚡</span><span>6. 重要事件／關鍵轉折</span></span><p className="text-xs text-[#2B2D2F]/90 font-medium">{currentMonth.turningPoint}</p></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="p-3 rounded border border-emerald-200 bg-emerald-50/50 space-y-1"><span className="text-[11px] font-bold text-emerald-800 flex items-center space-x-1"><span>🌿</span><span>7. 當月有利事項（宜）</span></span><p className="text-xs text-emerald-950">{currentMonth.favorableActions}</p></div>
                  <div className="p-3 rounded border border-rose-200 bg-rose-50/50 space-y-1"><span className="text-[11px] font-bold text-rose-800 flex items-center space-x-1"><span>⚠️</span><span>8. 當月需要留意事項（忌）</span></span><p className="text-xs text-rose-950">{currentMonth.cautionNotes}</p></div>
                </div>
              </div>
            </div>
          )}
          <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded p-4 text-xs text-[#2B2D2F]/85 space-y-1.5 mt-4">
            <div className="flex items-center space-x-1.5 font-bold text-[#1E3A5F]"><span>🔒</span><span>專屬命書授權與防偽提示</span></div>
            <p className="leading-relaxed">本報告為依據閣下生辰專屬客製之命書。如需批算家人或合作夥伴八字，請返回線上服務選購專屬項目。</p>
          </div>
        </div>
        <div className="bg-[#EFE9DF] border-t border-[#2B2D2F]/10 px-5 py-3 flex items-center justify-between text-xs shrink-0">
          <span className="text-[#2B2D2F]/70">丁蔓山｜命理誌 · 流年＋12流月專項命書</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-[#1E3A5F] hover:bg-[#2B2D2F] text-white font-sans font-bold rounded shadow transition-colors cursor-pointer">關閉報告</button>
        </div>
      </div>
    </div>
  );
};
'''
with open(modal_path, 'w', encoding='utf-8') as f:
    f.write(modal_code)
print(f"[✓] 已建立彈窗組件: {modal_path}")

# 4. 更新 App.tsx
app_path = os.path.join(frontend_dir, 'src/App.tsx')
with open(app_path, 'r', encoding='utf-8') as f:
    app_text = f.read()

if 'TwelveMonthsReportModal' not in app_text:
    app_text = app_text.replace("import { StartupNavigationModal } from './components/StartupNavigationModal';", "import { StartupNavigationModal } from './components/StartupNavigationModal';\nimport { TwelveMonthsReportModal } from './components/TwelveMonthsReportModal';")
    app_text = app_text.replace("const [isStartupNavigationModalOpen, setIsStartupNavigationModalOpen] = useState(false);", "const [isStartupNavigationModalOpen, setIsStartupNavigationModalOpen] = useState(false);\n  const [isTwelveMonthsModalOpen, setIsTwelveMonthsModalOpen] = useState(false);")
    app_text = app_text.replace("if (service.id === 'srv-startup-3yr' && isPreviewDomain) {\n      setIsStartupNavigationModalOpen(true);\n      return;\n    }", "if (service.id === 'srv-startup-3yr' && isPreviewDomain) {\n      setIsStartupNavigationModalOpen(true);\n      return;\n    }\n    if (service.id === 'srv-12-months' && isPreviewDomain) {\n      setIsTwelveMonthsModalOpen(true);\n      return;\n    }")
    app_text = app_text.replace("onOpenStartupNavigationReport={isPreviewDomain ? () => setIsStartupNavigationModalOpen(true) : undefined}", "onOpenStartupNavigationReport={isPreviewDomain ? () => setIsStartupNavigationModalOpen(true) : undefined}\n                    onOpenTwelveMonthsReport={isPreviewDomain ? () => setIsTwelveMonthsModalOpen(true) : undefined}")
    app_text = app_text.replace("onOpenStartupNavigationReport={isPreviewDomain ? () => setIsStartupNavigationModalOpen(true) : undefined}\n            baziData={baziData}", "onOpenStartupNavigationReport={isPreviewDomain ? () => setIsStartupNavigationModalOpen(true) : undefined}\n            onOpenTwelveMonthsReport={isPreviewDomain ? () => setIsTwelveMonthsModalOpen(true) : undefined}\n            baziData={baziData}")
    app_text = app_text.replace("<StartupNavigationModal\n        isOpen={isStartupNavigationModalOpen}\n        onClose={() => setIsStartupNavigationModalOpen(false)}\n        baziData={baziData}\n        birthDate={currentInputParams.birthDate}\n        birthTime={currentInputParams.birthTime}\n        gender={currentInputParams.gender}\n      />", "<StartupNavigationModal\n        isOpen={isStartupNavigationModalOpen}\n        onClose={() => setIsStartupNavigationModalOpen(false)}\n        baziData={baziData}\n        birthDate={currentInputParams.birthDate}\n        birthTime={currentInputParams.birthTime}\n        gender={currentInputParams.gender}\n      />\n\n      {/* Twelve Months Fortune Navigation Report Modal (HK$368) */}\n      <TwelveMonthsReportModal\n        isOpen={isTwelveMonthsModalOpen}\n        onClose={() => setIsTwelveMonthsModalOpen(false)}\n        baziData={baziData}\n        birthDate={currentInputParams.birthDate}\n        birthTime={currentInputParams.birthTime}\n        gender={currentInputParams.gender}\n      />")
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(app_text)
    print(f"[✓] 已更新 App.tsx")

# 5. 更新 ChartResult.tsx
cr_path = os.path.join(frontend_dir, 'src/components/ChartResult.tsx')
with open(cr_path, 'r', encoding='utf-8') as f:
    cr_text = f.read()

if 'onOpenTwelveMonthsReport' not in cr_text:
    cr_text = cr_text.replace("onOpenStartupNavigationReport?: () => void;", "onOpenStartupNavigationReport?: () => void;\n  onOpenTwelveMonthsReport?: () => void;")
    cr_text = cr_text.replace("onOpenStartupNavigationReport,", "onOpenStartupNavigationReport,\n  onOpenTwelveMonthsReport,")
    cr_text = cr_text.replace("<span>🚀 創業／拓展・未來3年 (HK$288)</span>\n                </button>\n              )}", "<span>🚀 創業／拓展・未來3年 (HK$288)</span>\n                </button>\n              )}\n              {onOpenTwelveMonthsReport && (\n                <button\n                  onClick={onOpenTwelveMonthsReport}\n                  className=\"bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA] px-3.5 py-2 text-xs font-sans rounded transition-colors font-bold shadow-sm flex items-center space-x-1.5 cursor-pointer\"\n                >\n                  <span>🌙 流年＋12流月 (HK$368)</span>\n                </button>\n              )}")
    with open(cr_path, 'w', encoding='utf-8') as f:
        f.write(cr_text)
    print(f"[✓] 已更新 ChartResult.tsx")

# 6. 更新 OnlineServicesIndexPage.tsx
os_path = os.path.join(frontend_dir, 'src/components/OnlineServicesIndexPage.tsx')
with open(os_path, 'r', encoding='utf-8') as f:
    os_text = f.read()

if 'srv-12-months' not in os_text:
    os_text = os_text.replace("service.id === 'srv-startup-3yr'", "service.id === 'srv-startup-3yr' || service.id === 'srv-12-months'")
    with open(os_path, 'w', encoding='utf-8') as f:
        f.write(os_text)
    print(f"[✓] 已更新 OnlineServicesIndexPage.tsx")

# 7. 更新 services.ts
serv_path = os.path.join(frontend_dir, 'src/data/services.ts')
if os.path.exists(serv_path):
    with open(serv_path, 'r', encoding='utf-8') as f:
        serv_text = f.read()
    serv_text = serv_text.replace('price_hkd: 488', 'price_hkd: 368')
    serv_text = serv_text.replace('price_display: "HK$288"', 'price_display: "HK$368"')
    serv_text = serv_text.replace('price_display: "即將登場"', 'price_display: "HK$368"')
    serv_text = serv_text.replace('isComingSoon: true', 'isComingSoon: false')
    with open(serv_path, 'w', encoding='utf-8') as f:
        f.write(serv_text)
    print(f"[✓] 已更新 services.ts")

print("\n[*] 全部前端檔案準備就緒！")
