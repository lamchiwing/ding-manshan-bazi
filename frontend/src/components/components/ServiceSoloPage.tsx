import React, { useState, useMemo } from 'react';
import { ServiceItem } from '../data/services';
import { MASTERS_LIST } from '../data/masters';
import { generateDynamicAvailableDates, getBookingDateBounds, DYNAMIC_TIME_SLOTS } from '../utils/bookingDateHelper';

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
  const isConsultationOrOnsite = service.requires_booking;

  // Date bounds: 1 week (7 days) after today to 1 year (365 days) after today
  const dateBounds = useMemo(() => getBookingDateBounds(), []);
  const availableDates = useMemo(() => generateDynamicAvailableDates(28, 7), []);

  // For booking services, directly enter the booking form step!
  const [activeStep, setActiveStep] = useState<'details' | 'booking' | 'confirmed'>(
    isConsultationOrOnsite ? 'booking' : 'details'
  );

  const [selectedDate, setSelectedDate] = useState(dateBounds.defaultDate);
  const [selectedSlot, setSelectedSlot] = useState(DYNAMIC_TIME_SLOTS[2].time);
  const [customDate, setCustomDate] = useState(dateBounds.defaultDate);

  // Specific service options
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
  
  // Fengshui Layout specific
  const [fengshuiAddress, setFengshuiAddress] = useState('');
  const [floorPlanFile, setFloorPlanFile] = useState<string | null>(null);

  // Inspection (3 Preferred Locations) specific
  const [location1, setLocation1] = useState({ country: '香港', region: '', building: '' });
  const [location2, setLocation2] = useState({ country: '香港', region: '', building: '' });
  const [location3, setLocation3] = useState({ country: '香港', region: '', building: '' });

  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Service Type Identifiers
  const isMasterBazi = service.id === 'srv-master-bazi';
  const isFengshuiLayout = service.id === 'srv-home-fengshui-layout' || service.id === 'srv-corp-fengshui-layout';
  const isInspection = service.id === 'srv-home-inspection' || service.id === 'srv-corp-inspection';
  const isSynastry = service.id.includes('synastry');

  const effectiveDate = customDate || selectedDate;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFloorPlanFile(e.target.files[0].name);
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
            fengshuiAddress,
            floorPlanFile,
            preferredLocations: isInspection ? [location1, location2, location3] : undefined,
            isDepositPayment: isMasterBazi
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
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between border-b border-[#1E3A5F]/40 pb-4 mb-6">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-[#A4B3C6]">
          <button onClick={onNavigateHome} className="hover:text-[#F4EFEA] transition-colors">
            主頁
          </button>
          <span>/</span>
          <button onClick={onBack} className="hover:text-[#F4EFEA] transition-colors">
            {isConsultationOrOnsite ? '線上一對一預約' : '線上服務'}
          </button>
          <span>/</span>
          <span className="text-[#D97706] font-semibold">{service.title}</span>
        </div>
        <button
          onClick={onBack}
          className="text-xs sm:text-sm text-[#A4B3C6] hover:text-[#F4EFEA] flex items-center space-x-1"
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
                {isConsultationOrOnsite ? '預約申請已成功提交' : '訂單確認成功'}
              </h2>
              <p className="text-sm text-[#2B2D2F]/80 leading-relaxed my-4">
                感謝您的委託。我們已收到您關於「<strong>{service.title}</strong>」的預約申請。
                {isConsultationOrOnsite && ` 預約日期：${effectiveDate}（時段：${selectedSlot}）。`}
                詳細確認信已發送至您的電郵。
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
                  查看其他預約項目
                </button>
              </div>
            </div>
          ) : (
            /* Direct Booking Form View */
            <form onSubmit={handleConfirmAndPay} className="space-y-7 max-w-3xl mx-auto">
              {/* Form Title & Introduction */}
              <div className="border-b border-[#2B2D2F]/15 pb-3">
                <h3 className="font-serif text-lg md:text-xl font-bold text-[#1E3A5F]">
                  填寫預約資料與確認
                </h3>
                <p className="text-xs text-[#2B2D2F]/80 mt-1 leading-relaxed">
                  所有項目均由丁蔓山親自批查，透過線上視像或語音解讀。請填寫以下預約資料：
                </p>
              </div>

              {/* 1. Date & Time Selection (1 week after today to 1 year, no '自動即時滾動' text) */}
              {isConsultationOrOnsite && (
                <div className="bg-white p-5 md:p-6 rounded-[4px] border border-[#1E3A5F]/20 space-y-4 shadow-sm">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <label className="text-xs sm:text-sm font-bold text-[#1E3A5F]">
                        選擇預約日期（一星期後至一年內可選）
                      </label>
                      <span className="text-[11px] text-[#A4B3C6]">
                        可選範圍：{dateBounds.minDate} 至 {dateBounds.maxDate}
                      </span>
                    </div>

                    {/* Date Picker Input (Allows selecting any date up to 1 year) */}
                    <div className="flex items-center space-x-3 mb-3">
                      <input
                        type="date"
                        min={dateBounds.minDate}
                        max={dateBounds.maxDate}
                        value={customDate}
                        onChange={(e) => {
                          setCustomDate(e.target.value);
                          setSelectedDate(e.target.value);
                        }}
                        className="bg-[#F4EFEA] border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs sm:text-sm text-[#2B2D2F] font-medium focus:outline-none focus:border-[#D97706]"
                      />
                      <span className="text-xs text-[#2B2D2F]/70">
                        點擊日曆圖示自選未來一年內任何日期
                      </span>
                    </div>

                    {/* Quick Date Chips (Starting 7 days from today) */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto p-1.5 border border-[#1E3A5F]/10 rounded bg-[#F4EFEA]/40">
                      {availableDates.map((d) => {
                        const isSelected = selectedDate === d.value;
                        return (
                          <button
                            key={d.value}
                            type="button"
                            onClick={() => {
                              setSelectedDate(d.value);
                              setCustomDate(d.value);
                            }}
                            className={`p-2 text-xs text-left rounded transition-all flex flex-col ${
                              isSelected
                                ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold shadow'
                                : 'bg-white text-[#2B2D2F] hover:bg-[#1E3A5F]/10'
                            }`}
                          >
                            <span className="text-xs">{d.label}</span>
                            <span className={`text-[9px] ${isSelected ? 'text-[#D97706]' : d.isWeekend ? 'text-[#D97706]' : 'text-[#A4B3C6]'}`}>
                              {d.isWeekend ? '週末吉時' : '平日時段'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#1E3A5F] mb-2">
                      選擇諮詢時段（香港時間 HKT）
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                      {DYNAMIC_TIME_SLOTS.map((s) => {
                        const isSelected = selectedSlot === s.time;
                        return (
                          <button
                            key={s.time}
                            type="button"
                            onClick={() => setSelectedSlot(s.time)}
                            className={`py-2 px-2 text-xs rounded transition-all flex flex-col items-center justify-center ${
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

              {/* 2. Client Personal Contact Info */}
              <div className="bg-white p-5 md:p-6 rounded-[4px] border border-[#1E3A5F]/20 space-y-4 shadow-sm">
                <h4 className="text-xs sm:text-sm font-bold text-[#1E3A5F] uppercase border-b border-[#2B2D2F]/10 pb-2">
                  預約人基本資料
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">姓名 *</label>
                    <input
                      type="text"
                      required
                      placeholder="例：陳先生 / 陳女士"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-[#F4EFEA]/40 border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">電郵地址 (接收確認信) *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-[#F4EFEA]/40 border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#D97706]"
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
                      className="w-full bg-[#F4EFEA]/40 border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#D97706]"
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
                      className="w-full bg-[#F4EFEA]/40 border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Special Requirement: 家居風水佈局 & 公司風水佈局 (地址 + 平面圖上載) */}
              {isFengshuiLayout && (
                <div className="bg-white p-5 md:p-6 rounded-[4px] border border-[#1E3A5F]/20 space-y-4 shadow-sm">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E3A5F] uppercase border-b border-[#2B2D2F]/10 pb-2">
                    {service.id === 'srv-home-fengshui-layout' ? '家居物業地址與平面圖上載' : '公司物業地址與平面圖上載'}
                  </h4>
                  <div>
                    <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">
                      {service.id === 'srv-home-fengshui-layout'
                        ? '看風水的家居詳細地址 *'
                        : '看風水的公司詳細地址 *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={service.id === 'srv-home-fengshui-layout' ? "例：香港九龍某屋苑某座某室" : "例：香港九龍尖沙咀海港城寫字樓某座某室"}
                      value={fengshuiAddress}
                      onChange={(e) => setFengshuiAddress(e.target.value)}
                      className="w-full bg-[#F4EFEA]/40 border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">
                      {service.id === 'srv-home-fengshui-layout'
                        ? '上載家居平面圖（支援 JPG, PNG, PDF）*'
                        : '上載公司／寫字樓平面圖（支援 JPG, PNG, PDF）*'}
                    </label>
                    <div className="border-2 border-dashed border-[#1E3A5F]/30 rounded p-4 text-center bg-[#F4EFEA]/20 hover:border-[#D97706] transition-colors">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="floorplan-upload"
                      />
                      <label htmlFor="floorplan-upload" className="cursor-pointer">
                        <div className="text-2xl mb-1">📄</div>
                        <span className="text-xs sm:text-sm font-semibold text-[#1E3A5F] block">
                          {floorPlanFile ? `已選擇檔案：${floorPlanFile}` : '點擊此處上載平面圖檔案'}
                        </span>
                        <span className="text-[11px] text-[#A4B3C6] block mt-1">
                          請確保包含清晰間隔與大門位置
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* 4. Special Requirement: 家居查宅 & 公司查宅 (選出3個偏好地方：國家、地區、大廈名稱) */}
              {isInspection && (
                <div className="bg-white p-5 md:p-6 rounded-[4px] border border-[#1E3A5F]/20 space-y-4 shadow-sm">
                  <h4 className="text-xs sm:text-sm font-bold text-[#1E3A5F] uppercase border-b border-[#2B2D2F]/10 pb-2">
                    候選查宅物業（請填寫 3 個偏好地方）
                  </h4>
                  
                  {/* Location 1 */}
                  <div className="p-3.5 bg-[#F4EFEA]/40 rounded border border-[#1E3A5F]/15 space-y-2">
                    <span className="text-xs font-bold text-[#D97706]">偏好地點 1 *</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        required
                        placeholder="國家（例：香港 / 英國）"
                        value={location1.country}
                        onChange={(e) => setLocation1({ ...location1, country: e.target.value })}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                      <input
                        type="text"
                        required
                        placeholder="地區（例：中環 / 尖沙咀）"
                        value={location1.region}
                        onChange={(e) => setLocation1({ ...location1, region: e.target.value })}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                      <input
                        type="text"
                        required
                        placeholder="大廈／屋苑名稱"
                        value={location1.building}
                        onChange={(e) => setLocation1({ ...location1, building: e.target.value })}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  {/* Location 2 */}
                  <div className="p-3.5 bg-[#F4EFEA]/40 rounded border border-[#1E3A5F]/15 space-y-2">
                    <span className="text-xs font-bold text-[#1E3A5F]">偏好地點 2</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="國家"
                        value={location2.country}
                        onChange={(e) => setLocation2({ ...location2, country: e.target.value })}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                      <input
                        type="text"
                        placeholder="地區"
                        value={location2.region}
                        onChange={(e) => setLocation2({ ...location2, region: e.target.value })}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                      <input
                        type="text"
                        placeholder="大廈／屋苑名稱"
                        value={location2.building}
                        onChange={(e) => setLocation2({ ...location2, building: e.target.value })}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  {/* Location 3 */}
                  <div className="p-3.5 bg-[#F4EFEA]/40 rounded border border-[#1E3A5F]/15 space-y-2">
                    <span className="text-xs font-bold text-[#1E3A5F]">偏好地點 3</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        placeholder="國家"
                        value={location3.country}
                        onChange={(e) => setLocation3({ ...location3, country: e.target.value })}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                      <input
                        type="text"
                        placeholder="地區"
                        value={location3.region}
                        onChange={(e) => setLocation3({ ...location3, region: e.target.value })}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                      <input
                        type="text"
                        placeholder="大廈／屋苑名稱"
                        value={location3.building}
                        onChange={(e) => setLocation3({ ...location3, building: e.target.value })}
                        className="bg-white border border-[#1E3A5F]/30 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. Extra Notes */}
              <div>
                <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">備註說明（可簡述你想探討的具體事項）</label>
                <textarea
                  rows={3}
                  placeholder="可在此補充您最希望了解的具體問題或特殊背景…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-[#D97706]"
                />
              </div>

              {/* 6. Action Button & Special Terms (八字論命 Deposit Rule) */}
              <div className="pt-4 border-t border-[#2B2D2F]/15 space-y-4">
                {/* Master Bazi Specific Deposit Notice */}
                {isMasterBazi && (
                  <div className="p-3.5 bg-[#D97706]/10 border-l-4 border-[#D97706] rounded-[2px] text-xs md:text-sm text-[#2B2D2F]/90 leading-relaxed">
                    <strong>八字論命諮詢須知：</strong>
                    <p className="mt-1">
                      “先判前事，若資料有誤，續談不果，只收取訂金。續談在收取前事報告後，閣下有 7天時間決定並繳付餘額。”
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-xs text-[#1E3A5F] hover:underline"
                  >
                    ← 返回服務列表
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#D97706] hover:bg-[#b45309] text-white px-8 py-3 rounded-[2px] font-serif text-sm md:text-base font-bold transition-all shadow-md"
                  >
                    {isSubmitting
                      ? '處理中…'
                      : isMasterBazi
                      ? '繳付訂金 HK$2,400'
                      : `確認並付款 (${service.price_display})`}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
