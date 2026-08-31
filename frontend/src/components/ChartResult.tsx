import React, { useState } from 'react';

interface ChartResultProps {
  baziData: any;
  onOpenReading?: () => void;
}

export const ChartResult: React.FC<ChartResultProps> = ({ baziData, onOpenReading }) => {
  if (!baziData) return null;

  const [activeCycleTab, setActiveCycleTab] = useState<'dayun' | 'liunian' | 'liuyue'>('dayun');

  const pillars = baziData.pillars || {};
  const dayMaster = baziData.day_master?.display || "丙火";
  
  // Strict Left-to-Right Order: 時柱 -> 日柱 -> 月柱 -> 年柱
  const pKeys = [
    { key: "hour", label: "時柱", sub: "歸宿" },
    { key: "day", label: "日柱", sub: "自身" },
    { key: "month", label: "月柱", sub: "提綱" },
    { key: "year", label: "年柱", sub: "根基" },
  ];

  const luckCycles = baziData.luck_cycles || [];
  const annualCycles = baziData.annual_cycles || [];
  const monthlyCycles = baziData.monthly_cycles || [];

  return (
    <section className="w-full bg-charcoal text-ivory py-8 border-t border-[#1E3A5F]/30 animate-fade-in-up">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-[#1E3A5F]/40">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#F4EFEA]">命盤總覽</h2>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center space-x-4 text-xs md:text-sm text-[#A4B3C6]">
            <div>
              <span>日主：</span>
              <span className="text-[#D97706] font-bold font-serif ml-1">{dayMaster}</span>
            </div>
            <div>
              <span>節氣：</span>
              <span className="text-[#F4EFEA] font-mono ml-1">{baziData.calendar?.solar_term?.current_jie || "精確節氣"}</span>
            </div>
          </div>
        </div>

        {/* Four Pillars: 時柱 -> 日柱 -> 月柱 -> 年柱 (由左至右) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6">
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
                style={{ animationDelay: `${idx * 100}ms` }}
                className={`bg-[#F4EFEA] text-[#2B2D2F] p-4 rounded-[3px] border ${
                  isDay ? 'border-[#D97706] ring-1 ring-[#D97706]/30' : 'border-[#1E3A5F]/20'
                } flex flex-col justify-between shadow-sm`}
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[#2B2D2F]/10 pb-1.5 mb-2">
                  <div className="flex items-center space-x-1">
                    <span className="font-serif font-bold text-sm">{p.label}</span>
                    {isDay && <span className="bg-[#D97706] text-white text-[9px] px-1 py-0.2 rounded font-sans font-bold">元神</span>}
                  </div>
                  <span className="text-[10px] text-[#A4B3C6] font-sans">{p.sub}</span>
                </div>

                {/* Main Characters (Vertical) */}
                <div className="text-center my-1.5">
                  <div className="text-[11px] text-[#1E3A5F] font-serif mb-0.5 font-semibold">
                    {tenGod}
                  </div>
                  <div className="text-3xl md:text-4xl font-serif font-extrabold tracking-wider text-[#2B2D2F] leading-tight">
                    <span className={isDay ? "text-[#D97706]" : ""}>{stem}</span>
                    <span className="block mt-0.5">{branch}</span>
                  </div>
                  <div className="mt-1.5 text-[10px] text-[#1E3A5F] font-medium bg-[#1E3A5F]/5 py-0.5 rounded">
                    長生：{changsheng}
                  </div>
                </div>

                {/* Hidden Stems */}
                <div className="mt-2.5 pt-2 border-t border-[#2B2D2F]/10 text-[11px] font-sans">
                  <span className="text-[10px] text-[#A4B3C6] block mb-0.5">支藏干</span>
                  <div className="space-y-0.5">
                    {hiddenStems.map((hs: any, i: number) => (
                      <div key={i} className="flex justify-between items-center text-[#2B2D2F]/80">
                        <span className="font-serif font-medium">{hs.stem} ({hs.element})</span>
                        <span className="text-[9px] text-[#1E3A5F]">{hs.ten_god}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Da Yun & Liu Nian & Shen Sha Main Box */}
        <div className="bg-[#F4EFEA] text-[#2B2D2F] p-4 md:p-5 rounded-[3px] border border-[#1E3A5F]/20 mb-6">
          {/* Cycle Tabs Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2B2D2F]/10 pb-2.5 mb-4 gap-2">
            <div className="flex items-center space-x-2 font-sans text-xs">
              <button
                onClick={() => setActiveCycleTab('dayun')}
                className={`px-3 py-1 rounded-[2px] font-medium transition-all ${
                  activeCycleTab === 'dayun'
                    ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold'
                    : 'bg-white/80 text-[#2B2D2F] hover:bg-[#1E3A5F]/10'
                }`}
              >
                大運排盤 (十年一柱)
              </button>
              <button
                onClick={() => setActiveCycleTab('liunian')}
                className={`px-3 py-1 rounded-[2px] font-medium transition-all ${
                  activeCycleTab === 'liunian'
                    ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold'
                    : 'bg-white/80 text-[#2B2D2F] hover:bg-[#1E3A5F]/10'
                }`}
              >
                流年運勢盤 (當前/未來)
              </button>
              <button
                onClick={() => setActiveCycleTab('liuyue')}
                className={`px-3 py-1 rounded-[2px] font-medium transition-all ${
                  activeCycleTab === 'liuyue'
                    ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold'
                    : 'bg-white/80 text-[#2B2D2F] hover:bg-[#1E3A5F]/10'
                }`}
              >
                十二流月盤
              </button>
            </div>
            <span className="text-[11px] text-[#A4B3C6] font-sans">
              干支直行排列 · 十神長生對照
            </span>
          </div>

          {/* 1. Da Yun (大運排盤) - Vertical Gan-Zhi like Four Pillars */}
          {activeCycleTab === 'dayun' && (
            <div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-4">
                {luckCycles.slice(0, 8).map((lc: any, i: number) => {
                  const stem = lc.stem || (lc.gan_zhi ? lc.gan_zhi[0] : "");
                  const branch = lc.branch || (lc.gan_zhi ? lc.gan_zhi[1] : "");

                  return (
                    <div
                      key={i}
                      className="bg-white p-2.5 rounded-[2px] border border-[#1E3A5F]/20 text-center flex flex-col justify-between shadow-xs hover:border-[#D97706] transition-colors"
                    >
                      {/* Age */}
                      <div className="text-[10px] text-[#A4B3C6] font-mono border-b border-[#2B2D2F]/5 pb-1">
                        {lc.start_age}歲起
                      </div>

                      {/* Ten God */}
                      <div className="text-[10px] text-[#1E3A5F] font-serif font-medium mt-1">
                        {lc.ten_god}
                      </div>

                      {/* Vertical Gan-Zhi (戊 上 寅 下 直行排列) */}
                      <div className="font-serif font-extrabold text-xl sm:text-2xl text-[#2B2D2F] leading-tight my-1.5">
                        <span className="block">{stem}</span>
                        <span className="block mt-0.5">{branch}</span>
                      </div>

                      {/* Changsheng & Element */}
                      <div className="pt-1 border-t border-[#2B2D2F]/5 space-y-0.5">
                        <div className="text-[9px] text-[#D97706] font-medium">{lc.changsheng}</div>
                        <div className="text-[9px] text-[#A4B3C6]">{lc.element}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Liu Nian (流年運勢盤) - Vertical Gan-Zhi */}
          {activeCycleTab === 'liunian' && (
            <div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {annualCycles.map((ac: any, i: number) => {
                  const stem = ac.stem || (ac.gan_zhi ? ac.gan_zhi[0] : "");
                  const branch = ac.branch || (ac.gan_zhi ? ac.gan_zhi[1] : "");

                  return (
                    <div
                      key={i}
                      className="bg-white p-2.5 rounded-[2px] border border-[#1E3A5F]/20 text-center flex flex-col justify-between shadow-xs hover:border-[#D97706] transition-colors"
                    >
                      {/* Year */}
                      <div className="text-[10px] text-[#1E3A5F] font-mono font-bold border-b border-[#2B2D2F]/5 pb-1">
                        {ac.year}年
                      </div>

                      {/* Ten God */}
                      <div className="text-[10px] text-[#1E3A5F] font-serif font-medium mt-1">
                        {ac.ten_god}
                      </div>

                      {/* Vertical Gan-Zhi */}
                      <div className="font-serif font-extrabold text-xl sm:text-2xl text-[#2B2D2F] leading-tight my-1.5">
                        <span className="block">{stem}</span>
                        <span className="block mt-0.5">{branch}</span>
                      </div>

                      {/* Changsheng & Element */}
                      <div className="pt-1 border-t border-[#2B2D2F]/5 space-y-0.5">
                        <div className="text-[9px] text-[#D97706] font-medium">{ac.changsheng}</div>
                        <div className="text-[9px] text-[#A4B3C6]">{ac.element}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Liu Yue (十二流月盤) */}
          {activeCycleTab === 'liuyue' && (
            <div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                {monthlyCycles.map((mc: any, i: number) => {
                  const stem = mc.month_stem || (mc.gan_zhi ? mc.gan_zhi[0] : "");
                  const branch = mc.month_branch || (mc.gan_zhi ? mc.gan_zhi[1] : "");

                  return (
                    <div
                      key={i}
                      className="bg-white p-2 rounded-[2px] border border-[#1E3A5F]/20 text-center flex flex-col justify-between"
                    >
                      <div className="text-[9px] text-[#A4B3C6] font-mono">{i + 1}月 ({branch}月)</div>
                      <div className="text-[9px] text-[#1E3A5F] font-serif mt-0.5">{mc.ten_god}</div>
                      <div className="font-serif font-bold text-lg text-[#2B2D2F] leading-tight my-1">
                        <span className="block">{stem}</span>
                        <span className="block mt-0.5">{branch}</span>
                      </div>
                      <div className="text-[8px] text-[#D97706]">{mc.changsheng}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Shen Sha Section */}
          <div className="border-t border-[#2B2D2F]/10 pt-3">
            <h4 className="font-serif text-xs font-bold text-[#2B2D2F] mb-1.5 flex items-center justify-between">
              <span>神煞吉凶 (Active Shen Sha)</span>
              <span className="text-[10px] text-[#A4B3C6] font-sans font-normal">
                共發現 {baziData.shen_sha?.list?.length || 0} 個神煞
              </span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {(baziData.shen_sha?.list || []).map((ss: any, idx: number) => (
                <span
                  key={idx}
                  className={`text-[10px] px-2 py-0.5 rounded-[2px] font-sans ${
                    ss.type === "吉神" 
                      ? "bg-[#1E3A5F] text-[#F4EFEA]" 
                      : "bg-[#D97706]/15 text-[#D97706] font-medium border border-[#D97706]/30"
                  }`}
                >
                  {ss.name} · {ss.pillar}
                </span>
              ))}
              {(!baziData.shen_sha?.list || baziData.shen_sha.list.length === 0) && (
                <span className="text-[11px] text-[#A4B3C6]">原局氣象平和</span>
              )}
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-4 pt-3 border-t border-[#2B2D2F]/10 flex items-center justify-between">
            <span className="text-[11px] text-[#2B2D2F]/70">
              深入解讀大運、流年走向與重要決策？
            </span>
            <button
              onClick={onOpenReading}
              className="bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA] px-3 py-1.5 text-xs font-sans rounded transition-colors font-medium"
            >
              線上命理對話 →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
