import React, { useState, useMemo } from 'react';
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
