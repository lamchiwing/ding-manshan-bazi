import React from 'react';
import { FiveElementsChart } from './FiveElementsChart';

interface ChartResultProps {
  baziData: any;
  onOpenAIDialog?: () => void;
}

export const ChartResult: React.FC<ChartResultProps> = ({ baziData, onOpenAIDialog }) => {
  if (!baziData) return null;

  const pillars = baziData.pillars || {};
  const dayMaster = baziData.day_master?.display || "丙火";
  const pKeys = [
    { key: "year", label: "年柱", sub: "根基 · 祖蔭" },
    { key: "month", label: "月柱", sub: "事業 · 提綱" },
    { key: "day", label: "日柱", sub: "自身 · 日元" },
    { key: "hour", label: "時柱", sub: "歸宿 · 子女" },
  ];

  return (
    <section className="w-full bg-charcoal text-ivory py-10 border-b border-[#1E3A5F]/30 animate-fade-in-up">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#1E3A5F]/40">
          <div>
            <span className="text-xs text-[#D97706] tracking-widest uppercase font-semibold">Personal Chart</span>
            <h2 className="text-3xl md:text-4xl font-serif mt-1">命盤總覽</h2>
          </div>
          <div className="mt-3 md:mt-0 flex items-center space-x-6 text-sm text-[#A4B3C6]">
            <div>
              <span>日主：</span>
              <span className="text-[#D97706] font-bold text-lg font-serif ml-1">{dayMaster}</span>
            </div>
            <div>
              <span>節氣曆：</span>
              <span className="text-[#F4EFEA] font-mono ml-1">{baziData.calendar?.solar_term?.current_jie || "精確節氣"}</span>
            </div>
          </div>
        </div>

        {/* Four Pillars Sequential Reveal Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {pKeys.map((p, idx) => {
            const pData = pillars[p.key] || {};
            const isDay = p.key === "day";
            const stem = pData.stem || "";
            const branch = pData.branch || "";
            const tenGod = isDay ? "日主" : (pData.ten_god || "");
            const changsheng = pData.changsheng || "";
            const hiddenStems = pData.hidden_stems || [];

            return (
              <div
                key={p.key}
                style={{ animationDelay: `${idx * 120}ms` }}
                className={`bg-[#F4EFEA] text-[#2B2D2F] p-5 rounded-[4px] border ${
                  isDay ? 'border-[#D97706] ring-1 ring-[#D97706]/30' : 'border-[#1E3A5F]/20'
                } flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 shadow-sm`}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#2B2D2F]/10 pb-2 mb-3">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-serif font-bold text-base">{p.label}</span>
                    {isDay && <span className="bg-[#D97706] text-white text-[10px] px-1.5 py-0.2 rounded font-sans font-bold">元神</span>}
                  </div>
                  <span className="text-[11px] text-[#A4B3C6] font-sans">{p.sub}</span>
                </div>

                {/* Main Stem and Branch Characters */}
                <div className="text-center my-2">
                  <div className="text-xs text-[#1E3A5F] font-serif mb-1 font-semibold">
                    {tenGod}
                  </div>
                  <div className="text-4xl md:text-5xl font-serif font-extrabold tracking-wider text-[#2B2D2F] leading-tight">
                    <span className={isDay ? "text-[#D97706]" : ""}>{stem}</span>
                    <span className="block mt-1">{branch}</span>
                  </div>
                  <div className="mt-2 text-xs text-[#1E3A5F] font-medium bg-[#1E3A5F]/5 py-0.5 rounded">
                    長生：{changsheng}
                  </div>
                </div>

                {/* Hidden Stems List */}
                <div className="mt-4 pt-3 border-t border-[#2B2D2F]/10 text-xs font-sans">
                  <span className="text-[11px] text-[#A4B3C6] block mb-1">支藏天干 (Hidden Stems)</span>
                  <div className="space-y-1">
                    {hiddenStems.map((hs: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-[#2B2D2F]/80">
                        <span className="font-serif font-medium">{hs.stem} ({hs.element})</span>
                        <span className="text-[10px] text-[#1E3A5F]">{hs.ten_god}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lower Details: Five Elements + Shensha & Dayun */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Five Elements Visualization (5 cols) */}
          <div className="lg:col-span-5">
            <FiveElementsChart elements={baziData.elements || {}} />
          </div>

          {/* Da Yun & Shen Sha (7 cols) */}
          <div className="lg:col-span-7 bg-[#F4EFEA] text-[#2B2D2F] p-6 rounded-[4px] border border-[#1E3A5F]/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-[#2B2D2F]/10 pb-2">
                <h3 className="font-serif text-lg font-bold">大運排盤 (10-Year Luck Cycles)</h3>
                <span className="text-xs text-[#1E3A5F]">十年一柱 · 順逆推演</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-6">
                {(baziData.luck_cycles || []).slice(0, 8).map((lc: any, i: number) => (
                  <div key={i} className="bg-white/80 p-2 rounded border border-[#1E3A5F]/15 text-center">
                    <div className="text-[10px] text-[#A4B3C6] font-mono">{lc.start_age}歲</div>
                    <div className="font-serif font-bold text-base text-[#2B2D2F] my-0.5">{lc.gan_zhi}</div>
                    <div className="text-[10px] text-[#1E3A5F]">{lc.ten_god}</div>
                    <div className="text-[9px] text-[#D97706]">{lc.changsheng}</div>
                  </div>
                ))}
              </div>

              {/* Shen Sha Section */}
              <div className="border-t border-[#2B2D2F]/10 pt-3">
                <h4 className="font-serif text-sm font-bold text-[#2B2D2F] mb-2 flex items-center">
                  <span>神煞吉凶 (Active Shen Sha)</span>
                  <span className="ml-2 text-[11px] text-[#D97706] font-sans font-normal">
                    共發現 {baziData.shen_sha?.list?.length || 0} 個神煞格局
                  </span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(baziData.shen_sha?.list || []).map((ss: any, idx: number) => (
                    <span
                      key={idx}
                      className={`text-xs px-2.5 py-1 rounded-[3px] font-sans ${
                        ss.type === "吉神" 
                          ? "bg-[#1E3A5F] text-[#F4EFEA]" 
                          : "bg-[#D97706]/15 text-[#D97706] font-medium border border-[#D97706]/30"
                      }`}
                    >
                      {ss.name} · {ss.pillar}
                    </span>
                  ))}
                  {(!baziData.shen_sha?.list || baziData.shen_sha.list.length === 0) && (
                    <span className="text-xs text-[#A4B3C6]">原局氣象平和，無極端偏煞</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick CTA to AI Chat */}
            <div className="mt-6 pt-4 border-t border-[#2B2D2F]/10 flex flex-col sm:flex-row items-center justify-between">
              <span className="text-xs text-[#2B2D2F]/70 mb-2 sm:mb-0">
                想深入了解本命盤之事業、感情與流年走向？
              </span>
              <button
                onClick={onOpenAIDialog}
                className="bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA] px-4 py-2 text-sm font-sans rounded transition-colors font-medium"
              >
                與命盤開始對話 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
