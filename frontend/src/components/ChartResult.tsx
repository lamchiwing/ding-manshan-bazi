import React from 'react';

interface ChartResultProps {
  baziData: any;
  onOpenReading?: () => void;
}

export const ChartResult: React.FC<ChartResultProps> = ({ baziData, onOpenReading }) => {
  if (!baziData) return null;

  const pillars = baziData.pillars || {};
  const dayMaster = baziData.day_master?.display || "丙火";
  
  // Strict Left-to-Right Order: 時柱 -> 日柱 -> 月柱 -> 年柱
  const pKeys = [
    { key: "hour", label: "時柱", sub: "歸宿" },
    { key: "day", label: "日柱", sub: "自身" },
    { key: "month", label: "月柱", sub: "提綱" },
    { key: "year", label: "年柱", sub: "根基" },
  ];

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

                {/* Main Characters */}
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

        {/* Da Yun & Shen Sha (Full Width - Five Elements Section completely removed) */}
        <div className="bg-[#F4EFEA] text-[#2B2D2F] p-4 md:p-5 rounded-[3px] border border-[#1E3A5F]/20 mb-6">
          <div>
            <div className="flex items-center justify-between mb-2.5 border-b border-[#2B2D2F]/10 pb-1.5">
              <h3 className="font-serif text-sm md:text-base font-bold">大運排盤</h3>
              <span className="text-[11px] text-[#1E3A5F]">十年一柱</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mb-4">
              {(baziData.luck_cycles || []).slice(0, 8).map((lc: any, i: number) => (
                <div key={i} className="bg-white/80 p-1.5 rounded border border-[#1E3A5F]/15 text-center">
                  <div className="text-[9px] text-[#A4B3C6] font-mono">{lc.start_age}歲</div>
                  <div className="font-serif font-bold text-sm text-[#2B2D2F] my-0.5">{lc.gan_zhi}</div>
                  <div className="text-[9px] text-[#1E3A5F]">{lc.ten_god}</div>
                  <div className="text-[8px] text-[#D97706]">{lc.changsheng}</div>
                </div>
              ))}
            </div>

            {/* Shen Sha */}
            <div className="border-t border-[#2B2D2F]/10 pt-2">
              <h4 className="font-serif text-xs font-bold text-[#2B2D2F] mb-1.5">
                神煞吉凶
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
          </div>

          <div className="mt-4 pt-3 border-t border-[#2B2D2F]/10 flex items-center justify-between">
            <span className="text-[11px] text-[#2B2D2F]/70">
              深入解讀事業、感情與流年走向？
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
