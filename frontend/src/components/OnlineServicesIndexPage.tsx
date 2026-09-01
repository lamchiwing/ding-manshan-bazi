import React from 'react';
import { SIDEBAR_PRICE_LIST, ServiceItem } from '../data/services';

interface OnlineServicesIndexPageProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigateHome: () => void;
  onNavigateBooking: () => void;
}

export const OnlineServicesIndexPage: React.FC<OnlineServicesIndexPageProps> = ({
  onSelectService,
  onNavigateHome,
  onNavigateBooking
}) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-8 animate-fade-in-up font-sans">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-[#1E3A5F]/40 pb-4 mb-6">
        <div className="flex items-center space-x-2 text-xs text-[#A4B3C6]">
          <button onClick={onNavigateHome} className="hover:text-[#F4EFEA] transition-colors">
            主頁
          </button>
          <span>/</span>
          <span className="text-[#D97706] font-semibold">線上命理服務</span>
        </div>
        <button
          onClick={onNavigateBooking}
          className="bg-[#D97706] hover:bg-[#b45309] text-white text-xs font-serif font-bold px-4 py-2 rounded-[2px] transition-all shadow"
        >
          切換至：線上一對一預約服務 →
        </button>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#F4EFEA] mb-2">
          丁蔓山 · 線上命理服務項目
        </h1>
        <p className="text-xs md:text-sm text-[#A4B3C6] max-w-2xl leading-relaxed">
          輸入生辰資料即時推演生成專屬深度解讀報告，涵蓋五行喜忌、感情姻緣、事業財運、流年流月與空間風水布局。
        </p>
      </div>

      {/* Cards Grid (Same visual format as Booking Index) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SIDEBAR_PRICE_LIST.map((service, index) => {
          const isComing = service.isComingSoon;

          return (
            <div
              key={service.id}
              className="bg-[#F4EFEA] text-[#2B2D2F] rounded-[3px] border border-[#1E3A5F]/20 p-6 flex flex-col justify-between hover:border-[#D97706] transition-all shadow-sm group hover:-translate-y-0.5"
            >
              <div>
                {/* Top Index & Turnaround */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="font-mono text-xs font-bold text-[#D97706]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] text-[#1E3A5F] bg-[#1E3A5F]/10 px-2.5 py-0.5 rounded font-medium">
                    {service.turnaround}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg md:text-xl font-bold text-[#2B2D2F] group-hover:text-[#1E3A5F] transition-colors mb-2">
                  {service.title}
                </h3>

                {/* Price */}
                <div className={`font-serif text-2xl font-extrabold mb-3 ${isComing ? 'text-[#A4B3C6] text-lg' : 'text-[#D97706]'}`}>
                  {service.price_display}
                </div>

                {/* Description */}
                <p className="text-xs text-[#2B2D2F]/85 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Included Features List (Index view) */}
                {service.indexFeatures && (
                  <div className="mb-6">
                    <div className="text-[11px] font-bold text-[#1E3A5F] uppercase mb-1.5">
                      服務包括：
                    </div>
                    <ul className="space-y-1 text-xs text-[#2B2D2F]/90 bg-white/70 p-3 rounded border border-[#1E3A5F]/10">
                      {service.indexFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start space-x-1.5">
                          <span className="text-[#D97706] font-bold">✓</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Button leading to Solo Page */}
              <div className="pt-3 border-t border-[#2B2D2F]/10">
                {isComing ? (
                  <button
                    disabled
                    className="w-full bg-[#A4B3C6] text-white text-xs font-serif font-bold py-2.5 rounded-[2px] cursor-not-allowed"
                  >
                    即將登場 · 敬請期待
                  </button>
                ) : (
                  <button
                    onClick={() => onSelectService(service)}
                    className="w-full bg-[#1E3A5F] hover:bg-[#D97706] text-[#F4EFEA] text-xs font-serif font-bold py-2.5 rounded-[2px] transition-colors shadow-sm flex items-center justify-center space-x-1"
                  >
                    <span>查看詳情與購買 (Solo Page)</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
