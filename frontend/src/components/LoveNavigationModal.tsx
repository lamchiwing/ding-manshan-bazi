import React, { useState, useMemo } from 'react';
import { generateLoveNavigationReport } from '../utils/loveNavigationLocal';

interface LoveNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  baziData?: any;
  birthDate?: string;
  birthTime?: string;
  gender?: 'male' | 'female';
}

const STATUS_TABS = [
  '單身',
  '曖昧／正在了解中',
  '穩定交往中',
  '已婚／有固定伴侶',
  '不透露｜純八字感情分析'
];

export const LoveNavigationModal: React.FC<LoveNavigationModalProps> = ({
  isOpen,
  onClose,
  baziData,
  birthDate = '1990-05-20',
  birthTime = '22:00',
  gender = 'male'
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('單身');

  const report = useMemo(() => {
    return generateLoveNavigationReport({
      birthDate,
      birthTime,
      gender,
      relationshipStatus: selectedStatus,
      baziData
    });
  }, [birthDate, birthTime, gender, selectedStatus, baziData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-[#FAF7F2] text-[#2B2D2F] w-full max-w-4xl rounded-lg shadow-2xl border border-[#9B2C2C]/30 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#9B2C2C] text-[#FAF7F2] px-5 py-4 flex items-center justify-between shadow-md">
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
          >
            ✕
          </button>
        </div>

        {/* 5 Status Switcher Tabs */}
        <div className="bg-[#EFE9DF] border-b border-[#2B2D2F]/10 px-4 py-2 flex flex-wrap gap-1.5 overflow-x-auto">
          {STATUS_TABS.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedStatus === status
                  ? 'bg-[#9B2C2C] text-white shadow-sm'
                  : 'bg-white/70 text-[#2B2D2F]/80 hover:bg-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Body Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 font-sans text-sm">
          {/* Section 1: Overview */}
          <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs text-[#2B2D2F]/70 border-b pb-2">
              <span>生辰：{report.solarDate} · {report.gender}</span>
              <span>日柱夫妻宮：【{report.spousePalaceBranch}】· 夫妻星：{report.spouseElement}</span>
            </div>
            <h4 className="font-serif font-bold text-base text-[#9B2C2C] pt-1">
              ✦ {report.statusStrategyTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#2B2D2F]/90 leading-relaxed">
              {report.statusStrategyContent}
            </p>
          </div>

          {/* Section 2: 7 Interference Protection */}
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

          {/* Section 3: 3 Key Answers */}
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
              <p className="font-serif font-bold text-xs text-[#2B2D2F]">
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

          {/* Section 4: 36 Months Navigation Matrix Table */}
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
                      <td className="p-2 font-mono font-bold text-[#1E3A5F] whitespace-nowrap">{row.period}</td>
                      <td className="p-2 whitespace-nowrap">{row.yearStemBranch}年 {row.monthStemBranch}月</td>
                      <td className="p-2 text-center font-bold text-[#9B2C2C]">{row.loveScore}</td>
                      <td className="p-2 text-center text-[#D97706]">{'★'.repeat(row.peachScore)}</td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          row.trend === '上升' ? 'bg-red-100 text-red-700' :
                          row.trend === '波動' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {row.trend}
                        </span>
                      </td>
                      <td className="p-2 text-center whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          row.advice === '把握' ? 'bg-green-100 text-green-800' :
                          row.advice === '留意' ? 'bg-rose-100 text-rose-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {row.advice}
                        </span>
                      </td>
                      <td className="p-2 text-[#2B2D2F]/80 text-[11px] min-w-[200px]">{row.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#EFE9DF] border-t border-[#2B2D2F]/10 px-5 py-3 flex items-center justify-between text-xs">
          <span className="text-[#2B2D2F]/70">
            測試網域特別授權：即時免扣款查看全覽報告
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#9B2C2C] hover:bg-[#742A2A] text-white font-serif font-bold rounded shadow-sm cursor-pointer transition-all"
          >
            關閉報告
          </button>
        </div>
      </div>
    </div>
  );
};
