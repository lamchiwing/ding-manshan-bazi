import React, { useState, useMemo } from 'react';
import { computeCareerNavigationReport } from '../utils/careerNavigationLocal';

interface CareerNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  baziData?: any;
  birthDate?: string;
  birthTime?: string;
  gender?: string;
}

export const CareerNavigationModal: React.FC<CareerNavigationModalProps> = ({
  isOpen,
  onClose,
  baziData,
  birthDate = "1990-05-20",
  birthTime = "22:00",
  gender = "male"
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'pattern' | 'matrix' | 'factors'>('all');

  const report = useMemo(() => {
    return computeCareerNavigationReport(birthDate, birthTime, gender, baziData);
  }, [birthDate, birthTime, gender, baziData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in font-sans">
      <div className="bg-[#FAF7F2] text-[#2B2D2F] w-full max-w-4xl rounded-lg shadow-2xl border border-[#1E3A5F]/30 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1E3A5F] text-[#FAF7F2] px-5 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💼</span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg font-bold tracking-wide">
                  事業／財運・未來36個月
                </h3>
                <span className="bg-[#D97706] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  HK$188 官方手冊
                </span>
              </div>
              <p className="text-xs text-[#FAF7F2]/80 mt-0.5">
                檔案編號：{report.reportId} · 依據個人原局與36流月動態推演
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

        {/* Navigation Tabs */}
        <div className="bg-[#EFE9DF] border-b border-[#2B2D2F]/10 px-4 py-2 flex flex-wrap gap-1.5 overflow-x-auto shrink-0">
          {[
            { id: 'all', label: '全覽總綱' },
            { id: 'pattern', label: 'A. 事業格局' },
            { id: 'matrix', label: 'B. 未來36個月' },
            { id: 'factors', label: 'C. 事業有利因素' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#1E3A5F] text-white shadow-sm'
                  : 'bg-white/70 text-[#2B2D2F]/80 hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
          {/* Top Banner */}
          <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs text-[#2B2D2F]/70 border-b pb-2 gap-2">
              <span>生辰：{report.solarDate} · {report.gender}</span>
              <span className="font-medium text-[#1E3A5F]">
                日主：【{report.dayMaster}{report.dayElement}】· 四柱：{report.fourPillars.year} / {report.fourPillars.month} / {report.fourPillars.day} / {report.fourPillars.hour}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between pt-1 gap-2">
              <h4 className="font-serif font-bold text-base text-[#1E3A5F]">
                ✦ 命主事業格局：{report.patternName}
              </h4>
              <div className="flex items-center space-x-3 text-xs">
                <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded font-medium">
                  正財：{'★'.repeat(report.directWealthStars)}{'☆'.repeat(5 - report.directWealthStars)}
                </span>
                <span className="bg-[#D97706]/10 text-[#D97706] px-2 py-0.5 rounded font-medium">
                  偏財：{'★'.repeat(report.indirectWealthStars)}{'☆'.repeat(5 - report.indirectWealthStars)}
                </span>
              </div>
            </div>
          </div>

          {/* Section A */}
          {(activeTab === 'all' || activeTab === 'pattern') && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-2 border-b border-[#1E3A5F]/20 pb-2">
                <span>🎯</span>
                <span>A. 事業與財運格局剖析</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">🏢 適合的行業方向</span>
                  <p className="text-xs text-[#2B2D2F]/90 leading-relaxed font-medium">{report.industryDirections}</p>
                </div>
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">💼 適合的職能方向</span>
                  <p className="text-xs text-[#2B2D2F]/90 leading-relaxed font-medium">{report.functionalRoles}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                <span className="text-[11px] font-bold text-[#D97706] uppercase block">🚀 適合的工作模式</span>
                <p className="text-xs text-[#2B2D2F]/90 leading-relaxed font-semibold">{report.workMode}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 p-4 rounded space-y-2">
                  <span className="text-xs font-bold text-[#1E3A5F] block">✨ 事業核心競爭優勢</span>
                  <ul className="space-y-1.5 text-xs text-[#2B2D2F]/85">
                    {report.strengths.map((item, i) => (
                      <li key={i} className="flex items-start space-x-1.5"><span className="text-[#1E3A5F] font-bold">✓</span><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#D97706]/5 border border-[#D97706]/20 p-4 rounded space-y-2">
                  <span className="text-xs font-bold text-[#D97706] block">⚠️ 事業發展盲點與提醒</span>
                  <ul className="space-y-1.5 text-xs text-[#2B2D2F]/85">
                    {report.blindSpots.map((item, i) => (
                      <li key={i} className="flex items-start space-x-1.5"><span className="text-[#D97706] font-bold">!</span><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section B */}
          {(activeTab === 'all' || activeTab === 'matrix') && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-2 border-b border-[#1E3A5F]/20 pb-2">
                <span>📅</span>
                <span>B. 未來 36 個月運勢導航（2026/10 - 2029/09）</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 shadow-xs">
                  <span className="text-[10px] text-[#1E3A5F] font-bold uppercase block mb-1">⭐ 事業運最旺月份</span>
                  <p className="font-serif font-bold text-xs text-[#2B2D2F]">{report.topCareerMonths.join("、")}</p>
                </div>
                <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 shadow-xs">
                  <span className="text-[10px] text-[#D97706] font-bold uppercase block mb-1">💰 財運最旺月份</span>
                  <p className="font-serif font-bold text-xs text-[#2B2D2F]">{report.topWealthMonths.join("、")}</p>
                </div>
                <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 shadow-xs">
                  <span className="text-[10px] text-[#059669] font-bold uppercase block mb-1">🚀 適合轉工／轉跑道</span>
                  <p className="font-serif font-bold text-xs text-[#2B2D2F]">{report.topChangeMonths.join("、")}</p>
                </div>
                <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 shadow-xs">
                  <span className="text-[10px] text-[#DC2626] font-bold uppercase block mb-1">⚠️ 需留意事業波折</span>
                  <p className="font-serif font-bold text-xs text-[#2B2D2F]">{report.cautionMonths.join("、")}</p>
                </div>
              </div>
              <div className="border border-[#2B2D2F]/15 rounded overflow-x-auto max-h-72 shadow-inner">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#1E3A5F] text-[#FAF7F2] sticky top-0 font-serif">
                    <tr>
                      <th className="p-2">月份週期</th>
                      <th className="p-2">干支氣場</th>
                      <th className="p-2 text-center">事業運程 (0-10)</th>
                      <th className="p-2 text-center">收入增長 (0-10)</th>
                      <th className="p-2 text-center">升職機會 (0-10)</th>
                      <th className="p-2 text-center">轉工機會 (0-10)</th>
                      <th className="p-2">事業行動錦囊</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2B2D2F]/10 bg-white">
                    {report.matrix.map((row) => (
                      <tr key={row.period} className="hover:bg-[#F4EFEA]/70 transition-colors">
                        <td className="p-2 font-mono font-bold text-[#1E3A5F] whitespace-nowrap">{row.period}</td>
                        <td className="p-2 whitespace-nowrap">{row.yearStemBranch}年 {row.monthStemBranch}月</td>
                        <td className="p-2 text-center font-bold text-[#1E3A5F]">{row.careerScore}</td>
                        <td className="p-2 text-center font-bold text-[#D97706]">{row.wealthScore}</td>
                        <td className="p-2 text-center font-bold text-[#059669]">{row.promotionScore}</td>
                        <td className="p-2 text-center font-bold text-[#7C3AED]">{row.jobChangeScore}</td>
                        <td className="p-2 text-[#2B2D2F]/80 text-[11px] min-w-[200px]">{row.advice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section C */}
          {(activeTab === 'all' || activeTab === 'factors') && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-2 border-b border-[#1E3A5F]/20 pb-2">
                <span>🧭</span>
                <span>C. 事業有利環境與開運因素</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">🎨 有利事業的顏色</span>
                  <p className="text-xs text-[#2B2D2F]/90 font-semibold">{report.favorableColors}</p>
                </div>
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">🧭 有利事業的方位</span>
                  <p className="text-xs text-[#2B2D2F]/90 font-semibold">{report.favorableDirections}</p>
                </div>
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">🌿 有利事業的環境</span>
                  <p className="text-xs text-[#2B2D2F]/90">{report.favorableEnvironment}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#EFE9DF] border-t border-[#2B2D2F]/10 px-5 py-3 flex items-center justify-between text-xs shrink-0">
          <span className="text-[#2B2D2F]/70">測試網域特別授權：即時免扣款查看全覽報告</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-[#1E3A5F] hover:bg-[#2B2D2F] text-white font-sans font-bold rounded shadow transition-colors cursor-pointer">
            關閉報告
          </button>
        </div>

      </div>
    </div>
  );
};
