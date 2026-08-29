import React from 'react';

interface FiveElementsChartProps {
  elements: {
    percentages: Record<string, number>;
    dominant_element?: string;
  };
}

export const FiveElementsChart: React.FC<FiveElementsChartProps> = ({ elements }) => {
  const elementOrder = [
    { key: "火", label: "Fire (火)" },
    { key: "木", label: "Wood (木)" },
    { key: "土", label: "Earth (土)" },
    { key: "金", label: "Metal (金)" },
    { key: "水", label: "Water (水)" },
  ];

  const dominant = elements.dominant_element || "火";

  return (
    <div className="bg-[#F4EFEA] text-[#2B2D2F] p-6 rounded-[4px] border border-[#1E3A5F]/20">
      <div className="flex items-center justify-between mb-4 border-b border-[#2B2D2F]/10 pb-2">
        <h3 className="font-serif text-lg font-bold tracking-wide">五行能量分佈 (Element Balance)</h3>
        <span className="text-xs text-[#1E3A5F] font-medium bg-[#1E3A5F]/10 px-2 py-0.5 rounded">
          主導五行：<strong className="text-[#D97706]">{dominant}</strong>
        </span>
      </div>

      <div className="space-y-3.5 font-sans">
        {elementOrder.map((elem) => {
          const pct = elements.percentages?.[elem.key] ?? 20;
          const isDominant = elem.key === dominant;

          return (
            <div key={elem.key} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className={isDominant ? "text-[#D97706] font-bold" : "text-[#2B2D2F]"}>
                  {elem.label} {isDominant && "★ (主導)"}
                </span>
                <span className="font-mono text-xs">{pct}%</span>
              </div>
              <div className="w-full bg-[#2B2D2F]/10 h-3 rounded-sm overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ease-out rounded-sm ${
                    isDominant ? "bg-[#D97706]" : "bg-[#1E3A5F]"
                  }`}
                  style={{ width: `${Math.max(pct, 4)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
