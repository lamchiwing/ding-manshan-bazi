import React, { useState, useMemo } from 'react';
import {
  computeTwelveMonthsDecisionsReport,
  ALL_DECISION_OPTIONS,
  TwelveMonthsDecisionsReportResult
} from '../utils/twelveMonthsDecisionsLocal';
import { ReportFooterCrossSell } from './ReportFooterCrossSell';

interface TwelveMonthsDecisionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  baziData?: any;
  birthDate?: string;
  birthTime?: string;
  gender?: string;
}

export const TwelveMonthsDecisionsModal: React.FC<TwelveMonthsDecisionsModalProps> = ({
  isOpen,
  onClose,
  baziData,
  birthDate,
  birthTime,
  gender
}) => {
  const [selectedDecisions, setSelectedDecisions] = useState<string[]>([
    "轉工／轉跑道",
    "創業／開始新項目"
  ]);

  const [planStatus, setPlanStatus] = useState<string>("已有明確計劃");
  const [expectedTiming, setExpectedTiming] = useState<string>("3–6個月內");

  const toggleDecision = (option: string) => {
    if (selectedDecisions.includes(option)) {
      if (selectedDecisions.length > 1) {
        setSelectedDecisions(selectedDecisions.filter(d => d !== option));
      }
    } else {
      if (selectedDecisions.length < 3) {
        setSelectedDecisions([...selectedDecisions, option]);
      }
    }
  };

  const report: TwelveMonthsDecisionsReportResult = useMemo(() => {
    return computeTwelveMonthsDecisionsReport(
      birthDate || "1990-05-20",
      birthTime || "21:30",
      gender || "male",
      selectedDecisions,
      planStatus,
      expectedTiming,
      baziData
    );
  }, [birthDate, birthTime, gender, selectedDecisions, planStatus, expectedTiming, baziData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white animate-fadeIn">
      <div className="bg-[#FAF7F2] text-[#2B2D2F] w-full max-w-4xl max-h-[92vh] rounded shadow-2xl flex flex-col overflow-hidden border border-[#1E3A5F]/20 print:max-h-none print:shadow-none print:border-none print:w-full">
        
        {/* Header */}
        <div className="bg-[#1E3A5F] text-[#F4EFEA] px-6 py-4 flex items-center justify-between shrink-0 shadow-xs">
          <div>
            <div className="text-[11px] font-mono tracking-wider text-[#D97706] uppercase">
              Personalized Decision Timing Edition · HK$488
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold tracking-wide flex items-center gap-2">
              <span>🗓️ 十二流月吉凶 ＋ 重大決策矩陣</span>
              <span className="text-xs font-sans font-normal px-2 py-0.5 rounded bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/40">
                測試預覽版
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-[#F4EFEA]/70 hover:text-white text-2xl leading-none transition-colors cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Scrollable Report Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans text-sm print:p-0 print:overflow-visible">
          
          {/* 客製化決策選項調整區 (Step 2 & Step 3) */}
          <div className="bg-[#FAF7F2] border-2 border-[#D97706]/30 rounded p-4 sm:p-5 space-y-4 shadow-xs print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2B2D2F]/10 pb-3">
              <div>
                <span className="font-serif font-bold text-[#1E3A5F] text-base">
                  🎯 步驟一與二：自選未來 12 個月重大決策（限制最多選 3 項）
                </span>
                <p className="text-xs text-[#2B2D2F]/70 mt-0.5">
                  限制最多 3 項，以確保專項分析深度與針對性 Timing 精度（避免泛泛全包）。
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#1E3A5F]/10 text-[#1E3A5F] self-start sm:self-auto">
                已選：{selectedDecisions.length} / 3 項
              </span>
            </div>

            {/* 10 項重大決策按鈕網格 */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
              {ALL_DECISION_OPTIONS.map((opt) => {
                const isSelected = selectedDecisions.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleDecision(opt)}
                    className={`px-3 py-2 text-xs rounded border text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#1E3A5F] text-white border-[#1E3A5F] font-bold shadow-xs"
                        : "bg-white text-[#2B2D2F] border-[#2B2D2F]/20 hover:border-[#D97706]/60"
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    <span className="text-xs ml-1 shrink-0">{isSelected ? "✓" : "+"}</span>
                  </button>
                );
              })}
            </div>

            {/* Step 3: 具體計劃與時程問答 */}
            <div className="pt-3 border-t border-[#2B2D2F]/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1E3A5F] mb-1.5">
                  📌 步驟三：你目前是否已有相關計劃？
                </label>
                <div className="flex flex-wrap gap-2">
                  {["已有明確計劃", "正在考慮", "尚未決定"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setPlanStatus(status)}
                      className={`px-3 py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                        planStatus === status
                          ? "bg-[#D97706] text-white border-[#D97706] font-bold"
                          : "bg-white text-[#2B2D2F] border-[#2B2D2F]/20 hover:border-[#D97706]/50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {planStatus === "已有明確計劃" && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-bold text-[#1E3A5F] mb-1.5">
                    ⏱️ 預計何時進行？
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {["2026年內", "2027年", "1–3個月內", "3–6個月內", "6–12個月內", "未確定"].map((tm) => (
                      <button
                        key={tm}
                        onClick={() => setExpectedTiming(tm)}
                        className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                          expectedTiming === tm
                            ? "bg-[#1E3A5F] text-white border-[#1E3A5F] font-bold"
                            : "bg-white text-[#2B2D2F] border-[#2B2D2F]/20 hover:border-[#1E3A5F]/50"
                        }`}
                      >
                        {tm}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 1. 命主八字與歲君大局 */}
          <div className="bg-white p-5 rounded border border-[#2B2D2F]/15 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2B2D2F]/10 pb-3">
              <div>
                <div className="text-xs text-[#2B2D2F]/70">命主日元八字排盤</div>
                <div className="text-base font-serif font-bold text-[#1E3A5F]">
                  日主：{report.dayMaster} · 主導五行：{report.dominantElement}
                </div>
              </div>
              <div className="text-xs font-mono text-[#2B2D2F]/70 bg-[#FAF7F2] px-3 py-1.5 rounded border border-[#2B2D2F]/10">
                {report.fourPillarsText}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-1">
                2026/2027 流年歲君發展主軸
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2B2D2F] mb-1.5">
                {report.annualTheme}
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2D2F]/85 leading-relaxed">
                {report.annualThemeDesc}
              </p>
            </div>
          </div>

          {/* 2. 【核心重磅】自選重大決策專項 Timing 矩陣 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b-2 border-[#D97706] pb-2">
              <span className="text-xl">🎯</span>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1E3A5F]">
                重大決策專項 Timing 矩陣（已選 {report.decisionReports.length} 項）
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {report.decisionReports.map((dec, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded border border-[#2B2D2F]/15 p-5 shadow-xs space-y-4 hover:border-[#D97706]/70 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2B2D2F]/10 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{dec.icon}</span>
                      <h4 className="font-serif font-bold text-lg text-[#1E3A5F]">
                        {dec.decisionName}
                      </h4>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-[#2B2D2F]/70">決策適合度：</span>
                      <span
                        className={`text-xs px-3 py-1 rounded font-bold border ${
                          dec.tendency === "較有利"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : dec.tendency === "較需審慎"
                            ? "bg-rose-50 text-rose-800 border-rose-300"
                            : "bg-amber-50 text-amber-800 border-amber-300"
                        }`}
                      >
                        {dec.tendency}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#2B2D2F]/85 italic bg-[#FAF7F2] p-3 rounded border border-[#2B2D2F]/10">
                    💡 命理總評：{dec.tendencyDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* 最佳月份 */}
                    <div className="bg-[#F0FDF4] border border-emerald-300/80 rounded p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900">
                          🌟 最佳月份（幾時做）
                        </span>
                        <span className="text-emerald-700 text-xs font-mono font-bold">
                          {dec.bestMonthStars}
                        </span>
                      </div>
                      <div className="font-mono font-bold text-sm text-emerald-800">
                        {dec.bestMonth}
                      </div>
                      <p className="text-[11px] text-emerald-950/80 leading-relaxed">
                        {dec.bestMonthAnalysis}
                      </p>
                    </div>

                    {/* 次佳／籌備月份 */}
                    <div className="bg-[#FFFBEB] border border-amber-300/80 rounded p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-900">
                          ⏳ 次佳／籌備期
                        </span>
                        <span className="text-amber-700 text-xs font-mono font-bold">
                          {dec.secondaryMonthStars}
                        </span>
                      </div>
                      <div className="font-mono font-bold text-sm text-amber-800">
                        {dec.secondaryMonth}
                      </div>
                      <p className="text-[11px] text-amber-950/80 leading-relaxed">
                        {dec.secondaryMonthAnalysis}
                      </p>
                    </div>

                    {/* 不宜啟動月份 */}
                    <div className="bg-[#FEF2F2] border border-rose-300/80 rounded p-3.5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-900">
                          ⚠️ 風險窗口（幾時避免）
                        </span>
                        <span className="text-rose-700 text-xs font-mono font-bold">
                          {dec.cautionMonthStars}
                        </span>
                      </div>
                      <div className="font-mono font-bold text-sm text-rose-800">
                        {dec.cautionMonth}
                      </div>
                      <p className="text-[11px] text-rose-950/80 leading-relaxed">
                        {dec.cautionMonthAnalysis}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded p-3.5 space-y-1 text-xs">
                    <div className="font-bold text-[#1E3A5F] flex items-center space-x-1">
                      <span>🧭</span>
                      <span>客製化時程匹配剖析（針對「{report.userInput.planStatus} · {report.userInput.expectedTiming}」）：</span>
                    </div>
                    <p className="leading-relaxed text-[#2B2D2F]/90">
                      {dec.timingFitAnalysis}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs font-bold text-[#1E3A5F] mb-1.5">
                      📋 丁蔓山大師 · 落地執行錦囊：
                    </div>
                    <ul className="space-y-1 text-xs text-[#2B2D2F]/85">
                      {dec.strategies.map((st, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-[#D97706] font-bold">✦</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 未來 12 個月逐月運程評級總覽 */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-1.5">
              <span>📅</span>
              <span>未來 12 個月逐月運勢總覽</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
              {report.monthlyBreakdown.map((m) => (
                <div
                  key={m.monthIndex}
                  className={`p-3 rounded border text-center flex flex-col justify-between ${
                    m.score >= 8.5
                      ? "bg-[#F0FDF4] border-emerald-300"
                      : m.score <= 5.5
                      ? "bg-[#FEF2F2] border-rose-300"
                      : "bg-white border-[#2B2D2F]/15"
                  }`}
                >
                  <div className="text-[11px] font-mono text-[#2B2D2F]/70 border-b border-[#2B2D2F]/10 pb-1">
                    {m.period}
                  </div>
                  <div className="my-1.5">
                    <div className="text-xs font-serif font-bold text-[#1E3A5F]">
                      {m.monthStemBranch}月
                    </div>
                    <div className="text-[11px] text-[#D97706] font-medium">
                      {m.tenGod}
                    </div>
                    <div className="text-lg font-mono font-bold text-[#2B2D2F] mt-0.5">
                      {m.score}
                    </div>
                  </div>
                  <div className="text-[10px] text-[#2B2D2F]/75 border-t border-[#2B2D2F]/10 pt-1">
                    {m.level.split(" · ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. 未來 12 個月三階段轉折點 */}
          <div className="bg-white p-5 rounded border border-[#2B2D2F]/15 space-y-2.5">
            <h3 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-1.5">
              <span>📈</span>
              <span>年度重大決策推進三階段轉折</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#2B2D2F]/85 leading-relaxed">
              {report.turningPoints.map((tp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-[#D97706] font-bold">▶</span>
                  <span>{tp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. 跨項目延伸推薦與防偽 */}
          <ReportFooterCrossSell currentProductId="monthly-calendar" />
        </div>

        {/* Modal Actions Footer */}
        <div className="bg-[#EFE9DF] border-t border-[#2B2D2F]/10 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 print:hidden">
          <span className="text-xs text-[#2B2D2F]/75">
            丁蔓山｜命理誌 · 12個月流月＋重大決策專項命書 (測試預覽)
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 bg-white hover:bg-white/80 text-[#1E3A5F] border border-[#1E3A5F]/30 font-sans text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
            >
              🖨️ 列印報告
            </button>
            <button
              onClick={onClose}
              className="px-5 py-1.5 bg-[#1E3A5F] hover:bg-[#2B2D2F] text-white font-sans text-xs font-bold rounded shadow-xs transition-colors cursor-pointer"
            >
              關閉預覽
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
