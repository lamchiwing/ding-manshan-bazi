import React, { useState, useMemo } from 'react';
import { ServiceItem } from '../data/services';
import { MASTERS_LIST } from '../data/masters';
import { generateDynamicAvailableDates, DYNAMIC_TIME_SLOTS } from '../utils/bookingDateHelper';

interface ServiceSoloPageProps {
  service: ServiceItem;
  onBack: () => void;
  onNavigateHome: () => void;
}

export const ServiceSoloPage: React.FC<ServiceSoloPageProps> = ({
  service,
  onBack,
  onNavigateHome
}) => {
  const reader = MASTERS_LIST[0]; // 丁蔓山

  // Dynamic booking dates for consultations
  const availableDates = useMemo(() => generateDynamicAvailableDates(14), []);

  const [activeStep, setActiveStep] = useState<'details' | 'booking' | 'confirmed'>('details');
  const [selectedDate, setSelectedDate] = useState(availableDates[0].value);
  const [selectedSlot, setSelectedSlot] = useState(DYNAMIC_TIME_SLOTS[2].time);
  const [customDate, setCustomDate] = useState('');

  // Interactive selectors for specific services
  const [selectedLoveCategory, setSelectedLoveCategory] = useState<string>(
    service.categoriesOptions ? service.categoriesOptions[0] : ''
  );
  const [selectedDecisions, setSelectedDecisions] = useState<string[]>([]);
  const [hasPlanStatus, setHasPlanStatus] = useState<'已有明確計劃' | '正在考慮' | '尚未決定'>('已有明確計劃');
  const [planTimeframe, setPlanTimeframe] = useState('2026年內');

  // Client Info Inputs
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [birthDate, setBirthDate] = useState('1990-05-20');
  const [birthTime, setBirthTime] = useState('21:30');
  const [partnerBirthDate, setPartnerBirthDate] = useState('1992-08-15');
  const [partnerBirthTime, setPartnerBirthTime] = useState('14:00');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [moveInYear, setMoveInYear] = useState('2024');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isConsultationOrOnsite = service.requires_booking;
  const isSynastry = service.id.includes('synastry');
  const isFengshui5yr = service.id.includes('house-fengshui');
  const effectiveDate = customDate || selectedDate;

  const toggleDecision = (dec: string) => {
    if (selectedDecisions.includes(dec)) {
      setSelectedDecisions(selectedDecisions.filter(d => d !== dec));
    } else {
      if (selectedDecisions.length < 3) {
        setSelectedDecisions([...selectedDecisions, dec]);
      }
    }
  };

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
          date: isConsultationOrOnsite ? effectiveDate : new Date().toISOString().split('T')[0],
          time_slot: isConsultationOrOnsite ? selectedSlot : '即時生成',
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          birth_date: birthDate,
          birth_time: birthTime,
          custom_options: {
            selectedLoveCategory,
            selectedDecisions,
            hasPlanStatus,
            planTimeframe,
            partnerBirthDate,
            partnerBirthTime,
            propertyAddress,
            moveInYear
          },
          notes: notes
        })
      });
      setActiveStep('confirmed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setActiveStep('confirmed');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 md:px-12 py-8 animate-fade-in-up font-sans">
      {/* Navigation Breadcrumb (Full Page Navigation) */}
      <div className="flex items-center justify-between border-b border-[#1E3A5F]/40 pb-4 mb-6">
        <div className="flex items-center space-x-2 text-xs text-[#A4B3C6]">
          <button onClick={onNavigateHome} className="hover:text-[#F4EFEA] transition-colors">
            主頁
          </button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-[#F4EFEA] transition-colors">
            {isConsultationOrOnsite ? '線上一對一預約服務' : '線上命理服務'}
          </button>
          <span>/</span>
          <span className="text-[#D97706] font-semibold">{service.title}</span>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-[#A4B3C6] hover:text-[#F4EFEA] flex items-center space-x-1"
        >
          <span>← 返回列表</span>
        </button>
      </div>

      {/* Main Solo Page Content Card */}
      <div className="bg-[#F4EFEA] text-[#2B2D2F] rounded-[4px] border border-[#1E3A5F]/30 shadow-xl overflow-hidden">
        {/* Solo Page Header */}
        <div className="bg-[#1E3A5F] text-[#F4EFEA] px-6 sm:px-10 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-[#D97706] uppercase tracking-widest font-semibold block mb-1">
                {isConsultationOrOnsite ? '1-on-1 Consultation' : 'Instant Report'}
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-bold">
                {service.title}
              </h1>
              <p className="text-xs md:text-sm text-[#A4B3C6] mt-1">
                {service.turnaround}
              </p>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[11px] text-[#A4B3C6] block">服務收費</span>
              <span className="font-serif text-3xl font-extrabold text-[#D97706]">
                {service.price_display}
              </span>
            </div>
          </div>
        </div>

        {/* Solo Page Body */}
        <div className="p-6 sm:p-10">
          {activeStep === 'confirmed' ? (
            <div className="text-center py-12 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-[#1E3A5F] text-[#D97706] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2B2D2F] mb-2">
                {isConsultationOrOnsite ? '預約確認成功' : '訂單確認成功'}
              </h2>
              <p className="text-sm text-[#2B2D2F]/80 leading-relaxed my-4">
                感謝您的委託。我們已收到您關於「<strong>{service.title}</strong>」的申請。
                {isConsultationOrOnsite && ` 預約時間為 ${effectiveDate} ${selectedSlot}。`}
                詳細確認信及報告資料已發送至您的電郵。
              </p>
              <div className="pt-4 flex justify-center space-x-3">
                <button
                  onClick={onNavigateHome}
                  className="bg-[#1E3A5F] text-[#F4EFEA] px-6 py-2.5 rounded-[2px] text-xs font-medium hover:bg-[#2B2D2F] transition-colors"
                >
                  返回首頁
                </button>
                <button
                  onClick={onBack}
                  className="bg-[#D97706] text-[#F4EFEA] px-6 py-2.5 rounded-[2px] text-xs font-medium hover:bg-[#b45309] transition-colors"
                >
                  查看其他服務
                </button>
              </div>
            </div>
          ) : activeStep === 'details' ? (
            <div className="space-y-8">
              {/* Description */}
              <div className="bg-white/80 p-5 rounded-[3px] border border-[#1E3A5F]/15">
                <h3 className="text-xs font-bold text-[#1E3A5F] uppercase mb-2">服務內容</h3>
                <p className="text-sm md:text-base text-[#2B2D2F]/90 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Category Selector (e.g. 姻緣導航, 雙人合盤) */}
              {service.categoriesOptions && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#1E3A5F] uppercase">服務分類選擇</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.categoriesOptions.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedLoveCategory(cat)}
                        className={`px-4 py-2 text-xs sm:text-sm rounded transition-all font-medium ${
                          selectedLoveCategory === cat
                            ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold shadow'
                            : 'bg-white border border-[#1E3A5F]/20 text-[#2B2D2F] hover:border-[#D97706]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Decision Options (十二流月運程＋重大決策) */}
              {service.decisionOptions && (
                <div className="bg-white/90 p-5 rounded-[3px] border border-[#1E3A5F]/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs font-bold text-[#1E3A5F] uppercase">
                      自選重大決策（最多選 3 項進行 Timing 評級）
                    </h3>
                    <span className="text-xs text-[#D97706] font-mono font-bold">
                      已選 {selectedDecisions.length}/3
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {service.decisionOptions.map((opt) => {
                      const isChecked = selectedDecisions.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => toggleDecision(opt)}
                          className={`p-2.5 text-xs text-left rounded transition-all border ${
                            isChecked
                              ? 'bg-[#1E3A5F] text-[#F4EFEA] border-[#1E3A5F] font-bold shadow-xs'
                              : 'bg-white text-[#2B2D2F] border-[#1E3A5F]/20 hover:border-[#D97706]'
                          }`}
                        >
                          <span>{isChecked ? '✓ ' : '+ '}</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedDecisions.length > 0 && (
                    <div className="pt-3 border-t border-[#2B2D2F]/10 space-y-3">
                      <div>
                        <span className="text-xs font-bold text-[#1E3A5F] block mb-1.5">
                          你目前是否已有相關計劃？
                        </span>
                        <div className="flex flex-wrap gap-4 text-xs">
                          {(['已有明確計劃', '正在考慮', '尚未決定'] as const).map((st) => (
                            <label key={st} className="flex items-center space-x-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="solo_plan_status"
                                checked={hasPlanStatus === st}
                                onChange={() => setHasPlanStatus(st)}
                                className="accent-[#D97706]"
                              />
                              <span>{st}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {hasPlanStatus === '已有明確計劃' && (
                        <div>
                          <span className="text-xs font-bold text-[#1E3A5F] block mb-1">
                            預計何時進行？
                          </span>
                          <select
                            value={planTimeframe}
                            onChange={(e) => setPlanTimeframe(e.target.value)}
                            className="bg-white border border-[#1E3A5F]/30 rounded px-3 py-1.5 text-xs text-[#2B2D2F]"
                          >
                            <option value="2026年內">2026年內</option>
                            <option value="2027年">2027年</option>
                            <option value="1–3個月內">1–3個月內</option>
                            <option value="3–6個月內">3–6個月內</option>
                            <option value="6–12個月內">6–12個月內</option>
                            <option value="未確定">未確定</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Detailed Breakdown Sections / Solo Page Content */}
              {service.soloSections && (
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#1E3A5F] uppercase tracking-wider">
                    服務包括項目詳解 (Solo Page Breakdown)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.soloSections.map((sec, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-[3px] border border-[#1E3A5F]/15">
                        <h4 className="font-serif text-sm font-bold text-[#D97706] mb-2.5 pb-1 border-b border-[#2B2D2F]/10">
                          {sec.groupTitle}
                        </h4>
                        <ul className="space-y-1.5 text-xs text-[#2B2D2F]/90">
                          {sec.items.map((item, i) => (
                            <li key={i} className="flex items-center space-x-1.5">
                              <span className="text-[#1E3A5F]">▪</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#2B2D2F]/15 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-xs text-[#A4B3C6] hover:text-[#2B2D2F]"
                >
                  ← 返回服務列表
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveStep('booking');
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="bg-[#D97706] hover:bg-[#b45309] text-white px-8 py-3 rounded-[2px] font-serif text-sm font-bold transition-all shadow"
                >
                  {isConsultationOrOnsite ? '立即預約時段及付款 →' : '填寫資料並直接付款 →'}
                </button>
              </div>
            </div>
          ) : (
            /* Step: Booking / Payment form */
            <form onSubmit={handleConfirmAndPay} className="space-y-6 max-w-2xl mx-auto">
              <div className="border-b border-[#2B2D2F]/10 pb-2 flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#1E3A5F]">填寫預約及付款資料</h3>
                <span className="text-xs text-[#A4B3C6]">
                  {isConsultationOrOnsite ? '由丁蔓山親自對接' : '即時生成深度分析報告'}
                </span>
              </div>

              {/* Auto-rolling date picker for consultations */}
              {isConsultationOrOnsite && (
                <div className="bg-white p-5 rounded-[3px] border border-[#1E3A5F]/20 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A5F] mb-2">
                      選擇預約日期 (自動即時滾動)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 border border-[#1E3A5F]/10 rounded bg-[#F4EFEA]/30">
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
                            className={`p-2 text-xs text-left rounded transition-all flex flex-col ${
                              isSelected
                                ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold shadow'
                                : 'bg-white text-[#2B2D2F] hover:bg-[#1E3A5F]/10'
                            }`}
                          >
                            <span className="text-xs">{d.label}</span>
                            <span className={`text-[9px] ${isSelected ? 'text-[#D97706]' : d.isWeekend ? 'text-[#D97706]' : 'text-[#A4B3C6]'}`}>
                              {d.isWeekend ? '週末吉時' : '平日預約'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E3A5F] mb-2">
                      選擇諮詢時段 (香港時間 HKT)
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {DYNAMIC_TIME_SLOTS.map((s) => {
                        const isSelected = selectedSlot === s.time;
                        return (
                          <button
                            key={s.time}
                            type="button"
                            onClick={() => setSelectedSlot(s.time)}
                            className={`py-2 px-3 text-xs rounded transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#D97706] text-white font-bold shadow'
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

              {/* Client Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">姓名 *</label>
                  <input
                    type="text"
                    required
                    placeholder="例：陳先生 / 陳女士"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">電郵地址 (接收報告) *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">聯絡電話 (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+852 9123 4567"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">出生年月日時 (陽曆)</label>
                  <input
                    type="text"
                    placeholder="YYYY-MM-DD HH:mm"
                    value={`${birthDate} ${birthTime}`}
                    onChange={(e) => {
                      const [d, t] = e.target.value.split(' ');
                      setBirthDate(d || '');
                      setBirthTime(t || '');
                    }}
                    className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D97706]"
                  />
                </div>
              </div>

              {/* Extra Synastry inputs */}
              {isSynastry && (
                <div className="p-4 bg-white rounded border border-[#1E3A5F]/20 space-y-2">
                  <h4 className="text-xs font-bold text-[#1E3A5F]">對方（伴侶／合盤對象）生辰資料</h4>
                  <div>
                    <label className="block text-xs text-[#2B2D2F] mb-1">對方出生年月日時 (陽曆)</label>
                    <input
                      type="text"
                      placeholder="YYYY-MM-DD HH:mm"
                      value={`${partnerBirthDate} ${partnerBirthTime}`}
                      onChange={(e) => {
                        const [d, t] = e.target.value.split(' ');
                        setPartnerBirthDate(d || '');
                        setPartnerBirthTime(t || '');
                      }}
                      className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>
              )}

              {/* Extra Fengshui inputs */}
              {isFengshui5yr && (
                <div className="p-4 bg-white rounded border border-[#1E3A5F]/20 space-y-3">
                  <h4 className="text-xs font-bold text-[#1E3A5F]">住宅物業基本資料</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#2B2D2F] mb-1">物業地址／大廈名稱</label>
                      <input
                        type="text"
                        placeholder="例：香港九龍尖沙咀..."
                        value={propertyAddress}
                        onChange={(e) => setPropertyAddress(e.target.value)}
                        className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#2B2D2F] mb-1">入住年份</label>
                      <input
                        type="text"
                        placeholder="例：2024"
                        value={moveInYear}
                        onChange={(e) => setMoveInYear(e.target.value)}
                        className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">備註說明</label>
                <textarea
                  rows={2}
                  placeholder="可補充你想了解的具體事項…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#D97706]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#2B2D2F]/10 flex items-center justify-between">
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
                  className="bg-[#D97706] hover:bg-[#b45309] text-white px-8 py-2.5 rounded-[2px] font-serif text-sm font-bold transition-all shadow"
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
