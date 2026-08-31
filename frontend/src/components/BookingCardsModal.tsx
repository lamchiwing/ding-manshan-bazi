import React from 'react';
import { SERVICES_LIST, ServiceItem } from '../data/services';

interface BookingCardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBookingService: (service: ServiceItem) => void;
}

export const BookingCardsModal: React.FC<BookingCardsModalProps> = ({
  isOpen,
  onClose,
  onSelectBookingService
}) => {
  if (!isOpen) return null;

  // Filter only services that require 1-on-1 online booking
  const bookingServices = SERVICES_LIST.filter(s => s.requires_booking);

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F4EFEA] text-[#2B2D2F] w-full max-w-5xl rounded-[4px] border border-[#1E3A5F]/30 shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#1E3A5F] text-[#F4EFEA] px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] text-[#D97706] uppercase tracking-widest font-sans font-semibold">
              Online 1-on-1 Consultations
            </span>
            <h3 className="font-serif text-xl md:text-2xl font-bold">
              丁蔓山 · 線上一對一預約項目
            </h3>
            <p className="text-xs text-[#A4B3C6] font-sans mt-0.5">
              所有諮詢項目均為線上視像（Zoom / Google Meet）或語音進行，由丁蔓山親自對接。
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#A4B3C6] hover:text-[#F4EFEA] text-2xl font-light leading-none p-1"
          >
            &times;
          </button>
        </div>

        {/* Cards Grid */}
        <div className="p-6 overflow-y-auto font-sans flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookingServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-[3px] border border-[#1E3A5F]/20 p-5 flex flex-col justify-between hover:border-[#D97706] transition-all shadow-sm group hover:-translate-y-0.5"
              >
                <div>
                  {/* Category */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium text-[#1E3A5F] bg-[#1E3A5F]/10 px-2 py-0.5 rounded">
                      {service.category_name}
                    </span>
                    <span className="text-[10px] text-[#A4B3C6]">
                      線上進行
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="font-serif text-lg font-bold text-[#2B2D2F] group-hover:text-[#1E3A5F] transition-colors mb-1.5">
                    {service.title}
                  </h4>

                  {/* Price */}
                  <div className="font-serif text-2xl font-extrabold text-[#D97706] mb-2">
                    {service.price_display}
                  </div>

                  <p className="text-xs text-[#2B2D2F]/80 leading-relaxed mb-3">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-1 text-xs text-[#2B2D2F]/90 bg-[#F4EFEA]/60 p-2.5 rounded border border-[#1E3A5F]/10 mb-4">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-[#D97706] font-bold">✓</span>
                        <span className="text-[11px]">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  onClick={() => {
                    onClose();
                    onSelectBookingService(service);
                  }}
                  className="w-full bg-[#1E3A5F] hover:bg-[#D97706] text-[#F4EFEA] text-xs font-serif font-bold py-2 rounded-[2px] transition-colors"
                >
                  選擇預約時段及付款 →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#1E3A5F]/10 px-6 py-3 border-t border-[#1E3A5F]/20 flex justify-between items-center text-xs text-[#A4B3C6] shrink-0">
          <span>※ 所有諮詢均享有私隱保障</span>
          <button
            onClick={onClose}
            className="text-[#1E3A5F] font-medium hover:underline"
          >
            關閉視窗
          </button>
        </div>
      </div>
    </div>
  );
};
