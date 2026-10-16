import React, { useState, useMemo } from "react";
import { computeStartupNavigationReport } from "../utils/startupNavigationLocal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  baziData?: any;
  birthDate?: string;
  birthTime?: string;
  gender?: string;
}

export const StartupNavigationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  baziData,
  birthDate = "1990-05-20",
  birthTime = "22:00",
  gender = "male"
}) => {
  const [tab, setTab] = useState<"all" | "pattern" | "wealth" | "timing" | "factors">("all");

  const report = useMemo(() => {
    if (!isOpen) return null;
    try {
      return computeStartupNavigationReport(birthDate, birthTime, gender, baziData);
    } catch (e) {
      console.error("computeStartupNavigationReport error:", e);
      return null;
    }
  }, [isOpen, birthDate, birthTime, gender, baziData]);

  if (!isOpen) return null;

  const r = report || ({} as any);

  // 雙重安全兜底：確保日主與四柱永不為空
  const p = baziData?.pillars || {};
  const fallbackYear = p.year?.gan_zhi || (p.year?.stem ? `${p.year.stem}${p.year.branch}` : "甲申");
  const fallbackMonth = p.month?.gan_zhi || (p.month?.stem ? `${p.month.stem}${p.month.branch}` : "己巳");
  const fallbackDay = p.day?.gan_zhi || (p.day?.stem ? `${p.day.stem}${p.day.branch}` : "壬辰");
  const fallbackHour = p.hour?.gan_zhi || (p.hour?.stem ? `${p.hour.stem}${p.hour.branch}` : "丙午");
  const safeFourPillars = r.fourPillars || {
    year: fallbackYear,
    month: fallbackMonth,
    day: fallbackDay,
    hour: fallbackHour
  };
  const safeDayMaster = r.dayMaster || baziData?.day_master?.stem || "壬";
  const safeDayElement = r.dayElement || baziData?.day_master?.element || "水";

  const stars = (n = 0) => "★".repeat(Math.max(0, Math.min(5, Math.floor(n || 0)))) + "☆".repeat(5 - Math.max(0, Math.min(5, Math.floor(n || 0))));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in font-sans">
      <div className="bg-[#FAF7F2] text-[#2B2D2F] w-full max-w-4xl rounded-lg shadow-2xl border border-[#B8860B]/30 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1E3A5F] text-[#FAF7F2] px-5 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🚀</span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg font-bold tracking-wide">創業／拓展・未來36個月</h3>
                <span className="bg-[#B8860B] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">HK$288 官方命書</span>
              </div>
              <p className="text-xs text-[#FAF7F2]/80 mt-0.5">檔案編號：{r.reportId || `TMS-STARTUP-${(birthDate || "19900520").replace(/-/g, "")}`} · 依據個人原局與36流月動態推演</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors cursor-pointer" title="關閉">✕</button>
        </div>

        {/* Tabs */}
        <div className="bg-[#EFE9DF] border-b border-[#2B2D2F]/10 px-4 py-2 flex flex-wrap gap-1.5 overflow-x-auto shrink-0">
          {[
            { id: "all", label: "全覽總綱" },
            { id: "pattern", label: "A. 創業格局" },
            { id: "wealth", label: "B. 財運與投資" },
            { id: "timing", label: "C. 創業Timing" },
            { id: "factors", label: "D. 事業有利因素" }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer whitespace-nowrap ${
                tab === t.id ? "bg-[#1E3A5F] text-white shadow-sm" : "bg-white/70 text-[#2B2D2F]/80 hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm">
          
          {/* Top Banner: Natal Overview */}
          <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between text-xs text-[#2B2D2F]/70 border-b pb-2 gap-2">
              <span>生辰：{r.solarDate || `${birthDate} ${birthTime}`} · {r.gender || (gender === "male" ? "乾造（男）" : "坤造（女）")}</span>
              <span className="font-medium text-[#1E3A5F]">
                日主：【{safeDayMaster}{safeDayElement}】· 四柱：{safeFourPillars.year} / {safeFourPillars.month} / {safeFourPillars.day} / {safeFourPillars.hour}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between pt-1 gap-2">
              <h4 className="font-serif font-bold text-base text-[#1E3A5F]">✦ 命主創業格局：{r.patternName || "建祿陽刃 · 開疆先鋒格"}</h4>
              <div className="flex items-center space-x-2 text-xs">
                <span className="bg-[#B8860B]/10 text-[#B8860B] px-2 py-0.5 rounded font-bold">創業適合度：{r.startupSuitability || 8.5} / 10</span>
                <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded font-medium">綜合財運：{stars(r.overallWealthStars || 4)}</span>
              </div>
            </div>
          </div>

          {/* Section A: 創業格局 */}
          {(tab === "all" || tab === "pattern") && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-2 border-b border-[#1E3A5F]/20 pb-2">
                <span>🎯</span><span>A. 創業與拓展格局深度剖析</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">🏢 適合拓展之產業方向</span>
                  <p className="text-xs text-[#2B2D2F]/90 leading-relaxed font-medium">{r.industryDirections || "新能源、高新科技、品牌孵化、文化娛樂"}</p>
                </div>
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#B8860B] uppercase block">🚀 適合的創業經營模式</span>
                  <p className="text-xs text-[#2B2D2F]/90 leading-relaxed font-medium">{r.startupMode || "合夥創辦／股權激勵模式"}</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">🤝 適合的合夥搭檔特徵</span>
                <p className="text-xs text-[#2B2D2F]/90 leading-relaxed font-medium">{r.partnerType || "細節執行力強、精通日常內部營運與行政合規的副手"}</p>
              </div>
              <div className="bg-[#9B2C2C]/5 border border-[#9B2C2C]/20 p-4 rounded space-y-1.5">
                <span className="text-xs font-bold text-[#9B2C2C] flex items-center space-x-1"><span>⚠️</span><span>創業風險與防範提醒</span></span>
                <ul className="space-y-1 text-xs text-[#2B2D2F]/90">
                  {(Array.isArray(r.startupRisks) ? r.startupRisks : [r.startupRisks || "戰線拉得過長時容易因細節失控導致資源分散"]).map((item: string, i: number) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-[#9B2C2C] font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Section B: 財運與投資 */}
          {(tab === "all" || tab === "wealth") && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-2 border-b border-[#1E3A5F]/20 pb-2">
                <span>💰</span><span>B. 財運量級與投資合夥佈局</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 text-center">
                  <span className="text-[11px] text-[#2B2D2F]/70 block mb-1">綜合財運量級</span>
                  <span className="text-[#B8860B] text-xs font-bold">{stars(r.overallWealthStars || 4)}</span>
                </div>
                <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 text-center">
                  <span className="text-[11px] text-[#2B2D2F]/70 block mb-1">資產沉澱聚財度</span>
                  <span className="text-[#1E3A5F] text-xs font-bold">{stars(r.wealthAccumulationStars || 3)}</span>
                </div>
                <div className="bg-white p-3 rounded border border-[#2B2D2F]/10 text-center">
                  <span className="text-[11px] text-[#2B2D2F]/70 block mb-1">創收爆發增長度</span>
                  <span className="text-[#2F5233] text-xs font-bold">{stars(r.incomeGrowthStars || 4)}</span>
                </div>
              </div>
              <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 p-4 rounded space-y-1.5">
                <span className="text-xs font-bold text-[#1E3A5F] block">💡 現金流管理與融資投資策略</span>
                <p className="text-xs text-[#2B2D2F]/90 leading-relaxed">{r.financialStrategy || "積極進取型（善於捕捉商業風口，設立強制備用金底線）"}</p>
              </div>
            </div>
          )}

          {/* Section C: Timing */}
          {(tab === "all" || tab === "timing") && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-2 border-b border-[#1E3A5F]/20 pb-2">
                <span>📅</span><span>C. 未來36個月關鍵時機導航</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">🚀 新項目啟動期</span>
                  <p className="font-serif font-bold text-xs text-emerald-950">{(r.topNewProjectMonths || ["2027/08（9.9分）", "2028/06（9.9分）"]).join("、")}</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                  <span className="text-[10px] font-bold text-blue-800 uppercase block mb-1">📈 規模擴展推進期</span>
                  <p className="font-serif font-bold text-xs text-blue-950">{(r.topExpansionMonths || ["2027/08（9.9分）", "2028/08（9.9分）"]).join("、")}</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-3 rounded">
                  <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">🛡️ 審慎防禦整頓期</span>
                  <p className="font-serif font-bold text-xs text-amber-950">{(r.topDefenseMonths || ["2027/09（防禦值 9.3分）"]).join("、")}</p>
                </div>
                <div className="bg-rose-50 border border-rose-200 p-3 rounded">
                  <span className="text-[10px] font-bold text-rose-800 uppercase block mb-1">⚡ 財務動盪預警期</span>
                  <p className="font-serif font-bold text-xs text-rose-950">{(r.topRiskMonths || ["2027/09（風險值 8.0分）"]).join("、")}</p>
                </div>
              </div>

              {/* Table */}
              <div className="border border-[#2B2D2F]/15 rounded overflow-x-auto max-h-72 shadow-inner bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#1E3A5F] text-[#FAF7F2] sticky top-0 font-serif">
                    <tr>
                      <th className="p-2">月份週期</th>
                      <th className="p-2">干支氣場</th>
                      <th className="p-2 text-center">機會值</th>
                      <th className="p-2 text-center">擴展值</th>
                      <th className="p-2 text-center">防禦值</th>
                      <th className="p-2 text-center">風險值</th>
                      <th className="p-2">商業實戰錦囊</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2B2D2F]/10">
                    {(r.matrix || []).map((row: any, idx: number) => (
                      <tr key={idx} className="hover:bg-[#F4EFEA]/70 transition-colors">
                        <td className="p-2 font-mono font-bold text-[#1E3A5F] whitespace-nowrap">{row.period}</td>
                        <td className="p-2 whitespace-nowrap text-gray-500 font-serif">{row.yearStemBranch}年 {row.monthStemBranch}月</td>
                        <td className="p-2 text-center font-bold text-emerald-600">{row.opportunityScore ?? row.careerScore ?? 8.0}</td>
                        <td className="p-2 text-center font-bold text-blue-600">{row.expansionScore ?? row.promotionScore ?? 7.5}</td>
                        <td className="p-2 text-center font-bold text-amber-600">{row.defenseScore ?? row.changeJobScore ?? 6.5}</td>
                        <td className="p-2 text-center font-bold text-rose-600">{row.riskScore ?? 5.0}</td>
                        <td className="p-2 text-[#2B2D2F]/80 text-[11px] min-w-[200px]">{row.advice || "穩步經營，深耕核心業務"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section D: 有利因素 */}
          {(tab === "all" || tab === "factors") && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#1E3A5F] flex items-center space-x-2 border-b border-[#1E3A5F]/20 pb-2">
                <span>🧭</span><span>D. 創業商務有利環境與開運因素</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">🎨 品牌／商業有利色系</span>
                  <p className="text-xs text-[#2B2D2F]/90 font-semibold">{r.favorableColors || "純白、銀灰、香檳金、金屬亮色"}</p>
                </div>
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">🧭 商業拓展吉利方位</span>
                  <p className="text-xs text-[#2B2D2F]/90 font-semibold">{r.favorableDirections || "西方、西北方"}</p>
                </div>
                <div className="bg-white p-4 rounded border border-[#2B2D2F]/10 shadow-xs space-y-1.5">
                  <span className="text-[11px] font-bold text-[#1E3A5F] uppercase block">🌿 開運辦公／經營環境</span>
                  <p className="text-xs text-[#2B2D2F]/90">{r.favorableEnvironment || "極簡線條、金屬質感裝飾、整潔俐落、高效無雜亂的現代化格局"}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-[#EFE9DF] border-t border-[#2B2D2F]/10 px-5 py-3 flex items-center justify-between text-xs shrink-0">
          <span className="text-[#2B2D2F]/70">丁蔓山｜命理誌 · 創業與投資未來3年專項命書</span>
          <button onClick={onClose} className="px-4 py-1.5 bg-[#1E3A5F] hover:bg-[#2B2D2F] text-white font-sans font-bold rounded shadow transition-colors cursor-pointer">關閉報告</button>
        </div>

      </div>
    </div>
  );
};
