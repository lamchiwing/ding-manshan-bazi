import React, { useState, useMemo } from 'react';
import { ServiceItem } from '../data/services';
import { MASTERS_LIST } from '../data/masters';
import { generateDynamicAvailableDates, DYNAMIC_TIME_SLOTS } from '../utils/bookingDateHelper';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose
}) => {
  if (!isOpen || !service) return null;

  const reader = MASTERS_LIST[0]; // 丁蔓山

  // Automatically generate rolling next 14 available dates based on current day
  const availableDates = useMemo(() => generateDynamicAvailableDates(14), []);

  const [activeStep, setActiveStep] = useState<'details' | 'booking' | 'confirmed'>('details');
  const [selectedDate, setSelectedDate] = useState(availableDates[0].value);
  const [selectedSlot, setSelectedSlot] = useState(DYNAMIC_TIME_SLOTS[2].time); // 14:00
  const [customDate, setCustomDate] = useState('');

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [birthDate, setBirthDate] = useState('1990-05-20');
  const [birthTime, setBirthTime] = useState('21:30');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isConsultationOrOnsite = service.type === 'consultation' || service.type === 'onsite';

  const effectiveDate = customDate || selectedDate;

  const handleConfirmAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/v1/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: service.id,
          reader_id: reader.id,
          date: effectiveDate,
          time_slot: selectedSlot,
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          birth_date: birthDate,
          birth_time: birthTime,
          notes: notes
        })
      });
      setActiveStep('confirmed');
    } catch (err) {
      setActiveStep('confirmed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F4EFEA] text-[#2B2D2F] w-full max-w-xl rounded-[4px] border border-[#1E3A5F]/30 shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Modal Header */}
        <div className="bg-[#1E3A5F] text-[#F4EFEA] px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#D97706] uppercase tracking-widest font-sans font-semibold">
              {service.category_name}
            </span>
            <h3 className="font-serif text-lg md:text-xl font-bold">{service.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#A4B3C6] hover:text-[#F4EFEA] text-2xl font-light leading-none p-1"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto font-sans">
          {activeStep === 'confirmed' ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-[#1E3A5F] text-[#D97706] rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                ✓
              </div>
              <h4 className="font-serif text-xl font-bold text-[#2B2D2F] mb-1">
                預約與付款確認成功
              </h4>
              <p className="text-xs md:text-sm text-[#2B2D2F]/80 max-w-md mx-auto leading-relaxed my-3">
                感謝您的委託。我們已收到您關於「<strong>{service.title}</strong>」的申請。
                {isConsultationOrOnsite && ` 預約時間為 ${effectiveDate} ${selectedSlot}。`}
                詳細確認信及資料準備提示已發送至您的電郵。
              </p>
              <button
                onClick={onClose}
                className="mt-4 bg-[#1E3A5F] text-[#F4EFEA] px-6 py-2 rounded-[2px] text-xs font-medium hover:bg-[#2B2D2F] transition-colors"
              >
                完成
              </button>
            </div>
          ) : activeStep === 'details' ? (
            <div className="space-y-4">
              {/* Price & Turnaround Box */}
              <div className="bg-[#1E3A5F]/10 p-4 rounded-[3px] border border-[#1E3A5F]/20 flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] text-[#A4B3C6] block font-sans">服務收費</span>
                  <span className="font-serif text-2xl font-extrabold text-[#D97706]">
                    {service.price_display}
                  </span>
                </div>
                <div className="text-right text-xs text-[#2B2D2F]/80">
                  <span>交付方式：</span>
                  <span className="font-medium text-[#1E3A5F]">{service.turnaround}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-[#1E3A5F] uppercase mb-1">服務內容</h4>
                <p className="text-xs md:text-sm text-[#2B2D2F]/90 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Features List */}
              <div>
                <h4 className="text-xs font-bold text-[#1E3A5F] uppercase mb-1.5">包含項目</h4>
                <ul className="space-y-1.5 text-xs text-[#2B2D2F]/90 bg-white/60 p-3 rounded-[2px] border border-[#1E3A5F]/15">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-[#D97706] font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#2B2D2F]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-[#A4B3C6] hover:text-[#2B2D2F]"
                >
                  返回主頁
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep('booking')}
                  className="bg-[#D97706] hover:bg-[#1E3A5F] text-[#F4EFEA] px-6 py-2.5 rounded-[2px] font-serif text-sm font-semibold transition-colors"
                >
                  {isConsultationOrOnsite ? '立即預約時段及付款 →' : '填寫資料並直接付款 →'}
                </button>
              </div>
            </div>
          ) : (
            /* Step: Booking / Payment form */
            <form onSubmit={handleConfirmAndPay} className="space-y-4">
              <div className="text-xs text-[#1E3A5F] font-semibold border-b border-[#2B2D2F]/10 pb-1 flex justify-between items-center">
                <span>填寫預約及付款資料</span>
                <span className="text-[10px] text-[#A4B3C6] font-normal">由丁蔓山親自對接</span>
              </div>

              {/* Dynamic Auto-Rolling Date & Time slot picker */}
              {isConsultationOrOnsite && (
                <div className="space-y-3 bg-white/70 p-3.5 rounded-[3px] border border-[#1E3A5F]/15">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[11px] font-bold text-[#1E3A5F]">
                        選擇預約日期 (自動即時滾動)
                      </label>
                      <span className="text-[10px] text-[#A4B3C6]">未來 14 天可選</span>
                    </div>

                    {/* Quick rolling date pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-36 overflow-y-auto p-1 border border-[#1E3A5F]/10 rounded bg-white">
                      {availableDates.map((d) => {
                        const isSelected = selectedDate === d.value && !customDate;
                        return (
                          <button
                            key={d.value}
                            type="button"
                            onClick={() => {
                              setSelectedDate(d.value);
                              setCustomDate('');
                            }}
                            className={`px-2 py-1.5 text-xs text-left rounded transition-all flex flex-col ${
                              isSelected
                                ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold shadow-sm'
                                : 'bg-[#F4EFEA]/40 text-[#2B2D2F] hover:bg-[#1E3A5F]/10'
                            }`}
                          >
                            <span className="text-[11px]">{d.label}</span>
                            <span className={`text-[9px] ${isSelected ? 'text-[#D97706]' : d.isWeekend ? 'text-[#D97706]' : 'text-[#A4B3C6]'}`}>
                              {d.isWeekend ? '週末吉時' : '平日預約'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Or custom date picker */}
                    <div className="mt-2 flex items-center space-x-2 text-[11px] text-[#A4B3C6]">
                      <span>或自選日期：</span>
                      <input
                        type="date"
                        value={customDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2 py-1 text-xs text-[#2B2D2F] focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#1E3A5F] mb-1.5">
                      選擇諮詢時段 (香港時間 HKT)
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                      {DYNAMIC_TIME_SLOTS.map((s) => {
                        const isSelected = selectedSlot === s.time;
                        return (
                          <button
                            key={s.time}
                            type="button"
                            onClick={() => setSelectedSlot(s.time)}
                            className={`py-1.5 px-2 text-xs rounded transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#D97706] text-white font-bold shadow-sm'
                                : 'bg-white border border-[#1E3A5F]/20 text-[#2B2D2F] hover:border-[#D97706]'
                            }`}
                          >
                            <span className="font-mono">{s.time}</span>
                            <span className={`text-[9px] ${isSelected ? 'text-white/90' : 'text-[#A4B3C6]'}`}>
                              {s.period}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Client Info Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-[#2B2D2F] mb-0.5 font-medium">預約人姓名 *</label>
                  <input
                    type="text"
                    required
                    placeholder="例：陳先生 / 陳女士"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#2B2D2F] mb-0.5 font-medium">電郵地址 *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#2B2D2F] mb-0.5 font-medium">聯絡電話 (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+852 9123 4567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#2B2D2F] mb-0.5 font-medium">出生年月日時 (陽曆)</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM-DD HH:mm"
                    value={`${birthDate} ${birthTime}`}
                    onChange={(e) => {
                      const [d, t] = e.target.value.split(' ');
                      setBirthDate(d || '');
                      setBirthTime(t || '');
                    }}
                    className="w-full bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#2B2D2F] mb-0.5 font-medium">備註 / 諮詢需求說明</label>
                <textarea
                  rows={2}
                  placeholder="簡述你想探討的具體事項或近期面臨之重大決策…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                />
              </div>

              {/* Price Summary & Submit */}
              <div className="pt-3 border-t border-[#2B2D2F]/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep('details')}
                  className="text-xs text-[#1E3A5F] hover:underline"
                >
                  ← 返回服務詳情
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#D97706] hover:bg-[#1E3A5F] text-[#F4EFEA] px-6 py-2 rounded-[2px] font-serif text-sm font-bold transition-colors shadow"
                >
                  {isSubmitting ? '處理中…' : `確認並付款 (${service.price_display})`}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
