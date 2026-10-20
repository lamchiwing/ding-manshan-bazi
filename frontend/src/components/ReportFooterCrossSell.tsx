import React from 'react';

export type ProductId =
  | 'career-wealth'
  | 'love-marriage'
  | 'life-navigator'
  | 'monthly-calendar'
  | 'master-consultation'
  | 'five-elements';

interface ReportFooterCrossSellProps {
  currentProductId: ProductId;
}

interface ProductItem {
  id: ProductId;
  icon: string;
  name: string;
  price: string;
  url: string;
}

const ALL_CROSS_SELL_PRODUCTS: ProductItem[] = [
  {
    id: 'career-wealth',
    icon: '💼',
    name: '事業／財運・未來 3 年深度解讀',
    price: 'HK$ 188',
    url: 'https://tingmanshan.com/services/career-wealth'
  },
  {
    id: 'love-marriage',
    icon: '💖',
    name: '感情／姻緣・未來 3 年正緣解析',
    price: 'HK$ 188',
    url: 'https://tingmanshan.com/services/love-marriage'
  },
  {
    id: 'life-navigator',
    icon: '🧭',
    name: '八字人生導航・未來 3 年全覽手冊',
    price: 'HK$ 588',
    url: 'https://tingmanshan.com/services/life-navigator'
  },
  {
    id: 'monthly-calendar',
    icon: '🗓',
    name: '十二流月吉凶＋重大決策矩陣',
    price: 'HK$ 488',
    url: 'https://tingmanshan.com/services/monthly-calendar'
  },
  {
    id: 'master-consultation',
    icon: '🍵',
    name: '丁蔓山大師 · 1對1 八字命理深度諮詢',
    price: 'HK$ 4,800',
    url: 'https://tingmanshan.com/services/master-consultation'
  }
];

export const ReportFooterCrossSell: React.FC<ReportFooterCrossSellProps> = ({ currentProductId }) => {
  // 自動排除當前報告自身所屬的產品 (除了 report belonging product)
  const recommendations = ALL_CROSS_SELL_PRODUCTS.filter(p => p.id !== currentProductId);

  return (
    <div className="mt-8 pt-6 border-t border-[#2B2D2F]/15 space-y-4 print:mt-6 print:pt-4">
      {/* 1. 專屬命書授權與防偽提示 */}
      <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded p-3.5 text-xs text-[#2B2D2F]/85 space-y-1">
        <div className="flex items-center space-x-1.5 font-bold text-[#1E3A5F]">
          <span>🔒</span>
          <span>專屬命書授權與防偽提示</span>
        </div>
        <p className="leading-relaxed">
          本報告為依據閣下生辰專屬客製之命書。如需批算家人或合作夥伴八字，請返回線上服務選購專屬項目。
        </p>
      </div>

      {/* 2. 延伸產品跨項目推薦 */}
      <div className="bg-white/95 p-4 sm:p-5 rounded border border-[#2B2D2F]/15 shadow-xs space-y-3">
        <div className="flex items-center space-x-1.5 font-serif font-bold text-sm sm:text-base text-[#1E3A5F]">
          <span className="text-[#D97706]">✦</span>
          <span>探尋更深層的人生藍圖與流年機遇：</span>
        </div>

        <div className="space-y-2 pt-1">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded bg-[#FAF7F2] border border-[#2B2D2F]/10 hover:border-[#D97706]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">{item.icon}</span>
                <span className="font-serif font-bold text-[#2B2D2F] text-xs sm:text-sm">
                  {item.name}
                </span>
                <span className="font-sans font-bold text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded text-[11px] whitespace-nowrap">
                  ({item.price})
                </span>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-[#1E3A5F] hover:text-[#D97706] hover:underline flex items-center space-x-1 break-all"
              >
                <span>{item.url}</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          ))}
        </div>

        <div className="text-[10px] text-[#2B2D2F]/60 pt-1 text-right">
          ※ 丁蔓山｜命理誌 · 現代極簡命理與風水環境哲學
        </div>
      </div>
    </div>
  );
};
