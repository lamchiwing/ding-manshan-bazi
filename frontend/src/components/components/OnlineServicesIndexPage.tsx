import React from 'react';
import { SIDEBAR_PRICE_LIST, ServiceItem } from '../data/services';

interface OnlineServicesIndexPageProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigateHome: () => void;
  onNavigateBooking: () => void;
}

export const OnlineServicesIndexPage: React.FC<OnlineServicesIndexPageProps> = ({
  onNavigateHome,
  onNavigateBooking
}) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-10 animate-fade-in-up font-sans">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-[#1E3A5F]/40 pb-4 mb-6">
        <div className="flex items-center space-x-2 text-sm text-[#A4B3C6]">
          <button onClick={onNavigateHome} className="hover:text-[#F4EFEA] transition-colors">
            主頁
          </button>
          <span>/</span>
          <span className="text-[#D97706] font-semibold">線上服務</span>
        </div>
        <button
          onClick={onNavigateBooking}
          className="bg-[#D97706] hover:bg-[#b45309] text-white text-xs sm:text-sm font-serif font-bold px-4 py-2 rounded-[2px] transition-all shadow"
        >
          切換至：線上一對一預約 →
        </button>
      </div>

      {/* Page Header */}
      <div className="mb-8 md:mb-10">
        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#F4EFEA] mb-3">
          線上命理服務項目
        </h1>
        <p className="text-sm md:text-base text-[#A4B3C6] max-w-2xl leading-relaxed">
          輸入生辰資料即時推演生成專屬深度解讀報告，涵蓋五行喜忌、感情姻緣、事業財運、流年流月與空間風水布局。
        </p>
      </div>

      {/* Cards Grid (No 01-09 numbers, all 9 marked as 即將登場) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {SIDEBAR_PRICE_LIST.map((service) => (
          <div
            key={service.id}
            className="bg-[#F4EFEA] text-[#2B2D2F] rounded-[4px] border border-[#1E3A5F]/20 p-6 md:p-7 flex flex-col justify-between hover:border-[#D97706] transition-all shadow-sm group hover:-translate-y-0.5"
          >
            <div>
              {/* Top Tag: 即將登場 */}
              <div className="flex items-center justify-end mb-3">
                <span className="text-xs bg-[#D97706]/15 text-[#D97706] px-2.5 py-0.5 rounded font-bold border border-[#D97706]/30">
                  即將登場
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2B2D2F] group-hover:text-[#1E3A5F] transition-colors mb-2.5">
                {service.title}
              </h3>

              {/* Price / Status */}
              <div className="font-serif text-xl font-bold text-[#D97706] mb-3">
                即將登場
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#2B2D2F]/85 leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Included Features List */}
              {service.indexFeatures && (
                <div className="mb-6">
                  <div className="text-xs font-bold text-[#1E3A5F] uppercase mb-2">
                    服務包括：
                  </div>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#2B2D2F]/90 bg-white/70 p-3.5 rounded border border-[#1E3A5F]/10">
                    {service.indexFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#D97706] font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Button: Disabled 即將登場 · 敬請期待 */}
            <div className="pt-4 border-t border-[#2B2D2F]/10">
              <button
                disabled
                className="w-full bg-[#A4B3C6]/60 text-[#2B2D2F]/70 text-sm font-serif font-bold py-3 rounded-[2px] cursor-not-allowed border border-[#A4B3C6]/40"
              >
                即將登場 · 敬請期待
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
