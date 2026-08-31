import React from 'react';

interface FiveElementsChartProps {
  elements: {
    percentages: Record<string, number>;
  };
}

export const FiveElementsChart: React.FC<FiveElementsChartProps> = ({ elements }) => {
  const elementOrder = [
    { key: "木", label: "木 (Wood)" },
    { key: "火", label: "火 (Fire)" },
    { key: "土", label: "土 (Earth)" },
    { key: "金", label: "金 (Metal)" },
    { key: "水", label: "水 (Water)" },
  ];

  return (
    <div className="bg-[#F4EFEA] text-[#2B2D2F] p-5 rounded-[3px] border border-[#1E3A5F]/20">
      <div className="border-b border-[#2B2D2F]/10 pb-2 mb-3.5">
        <h3 className="font-serif text-sm md:text-base font-bold tracking-wide text-[#2B2D2F]">
          五行能量分佈 (Element Balance)
        </h3>
      </div>

      <div className="space-y-3 font-sans">
        {elementOrder.map((elem) => {
          const pct = elements?.percentages?.[elem.key] ?? 20;

          return (
            <div key={elem.key} className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-[#2B2D2F]">
                <span>{elem.label}</span>
                <span className="font-mono text-xs text-[#1E3A5F]">{pct}%</span>
              </div>
              <div className="w-full bg-[#2B2D2F]/10 h-2.5 rounded-sm overflow-hidden">
                <div
                  className="h-full bg-[#1E3A5F] transition-all duration-700 ease-out rounded-sm"
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
