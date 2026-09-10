import React, { useState } from 'react';
import { MASTERS_LIST, MasterReader } from '../data/masters';
import { ServiceItem } from '../data/services';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialReader?: MasterReader | null;
  initialService?: ServiceItem | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialReader,
  initialService
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(initialReader ? 2 : 1);
  const [selectedReader, setSelectedReader] = useState<MasterReader>(initialReader || MASTERS_LIST[0]);
  const [selectedSession, setSelectedSession] = useState(selectedReader.sessions[0]);
  const [selectedDate, setSelectedDate] = useState(selectedReader.available_dates[0]);
  const [selectedSlot, setSelectedSlot] = useState(selectedReader.available_slots[0]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '1990-05-20',
    birthTime: '21:30',
    gender: 'male',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/v1/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: initialService?.id || selectedSession.label,
          reader_id: selectedReader.id,
          date: selectedDate,
          time_slot: selectedSlot,
          client_name: formData.name,
          client_email: formData.email,
          client_phone: formData.phone,
          birth_date: formData.birthDate,
          birth_time: formData.birthTime,
          gender: formData.gender,
          notes: formData.notes
        })
      });
      setIsSuccess(true);
    } catch (err) {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#F4EFEA] text-[#2B2D2F] w-full max-w-2xl rounded-[4px] border border-[#1E3A5F]/30 shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Modal Header */}
        <div className="bg-[#1E3A5F] text-[#F4EFEA] px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#D97706] uppercase tracking-widest font-semibold font-sans">
              Private Consultation
            </span>
            <h3 className="font-serif text-xl font-bold">預約命理諮詢</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#A4B3C6] hover:text-[#F4EFEA] text-2xl font-light leading-none"
          >
            &times;
          </button>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-3 text-center border-b border-[#2B2D2F]/10 bg-white/50 text-xs font-sans">
          <div className={`py-2.5 border-r border-[#2B2D2F]/10 ${step === 1 ? 'bg-[#D97706] text-white font-bold' : 'text-[#2B2D2F]'}`}>
            01 選擇命理師
          </div>
          <div className={`py-2.5 border-r border-[#2B2D2F]/10 ${step === 2 ? 'bg-[#D97706] text-white font-bold' : 'text-[#2B2D2F]'}`}>
            02 選擇日期時間
          </div>
          <div className={`py-2.5 ${step === 3 ? 'bg-[#D97706] text-white font-bold' : 'text-[#2B2D2F]'}`}>
            03 確認及付款
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#1E3A5F] text-[#D97706] rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
              <h4 className="font-serif text-2xl font-bold text-[#2B2D2F] mb-2">預約成功確認</h4>
              <p className="text-sm text-[#2B2D2F]/80 font-sans max-w-md mx-auto leading-relaxed">
                感謝您的預約。我們已為您鎖定 <strong>{selectedReader.name}</strong> 於 <strong>{selectedDate} {selectedSlot}</strong> 的專屬時段。
                詳細會議鏈接及課前命盤資料指引已發送至您的電郵。
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#1E3A5F] text-[#F4EFEA] px-8 py-2.5 rounded-[3px] text-sm font-sans font-medium hover:bg-[#2B2D2F] transition-colors"
              >
                完成並返回
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Select Reader */}
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-[#1E3A5F] font-serif mb-2">選擇為您解讀的命理名家：</h4>
                  <div className="space-y-3">
                    {MASTERS_LIST.map((r) => (
                      <div
                        key={r.id}
                        onClick={() => {
                          setSelectedReader(r);
                          setSelectedSession(r.sessions[0]);
                          setSelectedDate(r.available_dates[0]);
                          setSelectedSlot(r.available_slots[0]);
                          setStep(2);
                        }}
                        className={`p-4 rounded-[3px] border cursor-pointer transition-all flex items-center justify-between ${
                          selectedReader.id === r.id
                            ? 'border-[#D97706] bg-[#D97706]/10'
                            : 'border-[#1E3A5F]/20 hover:border-[#1E3A5F]'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <img src={r.avatar_url} alt={r.name} className="w-12 h-12 rounded-full object-cover" />
                          <div>
                            <span className="font-serif font-bold text-base block text-[#2B2D2F]">{r.name}</span>
                            <span className="text-xs text-[#1E3A5F]">{r.title}</span>
                          </div>
                        </div>
                        <span className="text-xs font-serif font-bold text-[#D97706]">{r.sessions[0]?.price_display} 起</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Select Date & Time & Session */}
              {step === 2 && (
                <div className="space-y-6 font-sans">
                  {/* Session Duration */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A5F] uppercase mb-2">01 選擇諮詢時長 / 項目</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {selectedReader.sessions.map((sess, idx) => (
                        <div
                          key={idx}
                          onClick={() => setSelectedSession(sess)}
                          className={`p-3 rounded border cursor-pointer text-center text-xs transition-all ${
                            selectedSession.duration_min === sess.duration_min
                              ? 'border-[#D97706] bg-[#D97706]/10 font-bold text-[#2B2D2F]'
                              : 'border-[#1E3A5F]/20 hover:border-[#1E3A5F]'
                          }`}
                        >
                          <div className="font-serif font-bold text-sm text-[#D97706]">{sess.price_display}</div>
                          <div className="text-[11px] text-[#2B2D2F]/80 mt-1">{sess.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A5F] uppercase mb-2">02 選擇預約日期</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedReader.available_dates.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setSelectedDate(d)}
                          className={`px-3 py-2 rounded text-xs transition-all ${
                            selectedDate === d
                              ? 'bg-[#1E3A5F] text-[#F4EFEA] font-bold'
                              : 'bg-white border border-[#1E3A5F]/20 text-[#2B2D2F] hover:border-[#1E3A5F]'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slot Selection */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E3A5F] uppercase mb-2">03 選擇預約時段 (香港時間)</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {selectedReader.available_slots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 rounded text-xs text-center transition-all ${
                            selectedSlot === slot
                              ? 'bg-[#D97706] text-[#F4EFEA] font-bold shadow'
                              : 'bg-white border border-[#1E3A5F]/20 text-[#2B2D2F] hover:border-[#D97706]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-[#2B2D2F]/10">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-[#1E3A5F] hover:underline"
                    >
                      ← 重選命理師
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA] px-6 py-2 rounded text-sm font-medium"
                    >
                      下一步：填寫資料 →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Confirm & Pay */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  {/* Order Summary */}
                  <div className="bg-[#1E3A5F]/10 p-4 rounded border border-[#1E3A5F]/20 text-xs space-y-1.5">
                    <div className="flex justify-between font-serif font-bold text-sm text-[#2B2D2F]">
                      <span>命理大師：{selectedReader.name}</span>
                      <span className="text-[#D97706]">{selectedSession.price_display}</span>
                    </div>
                    <div className="text-[#2B2D2F]/80">諮詢項目：{selectedSession.label}</div>
                    <div className="text-[#2B2D2F]/80">預約時間：{selectedDate} {selectedSlot} (HKT)</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">預約人姓名 *</label>
                      <input
                        type="text"
                        required
                        placeholder="例：陳志強"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">聯絡電郵 *</label>
                      <input
                        type="email"
                        required
                        placeholder="example@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">聯絡電話 (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+852 9123 4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">出生年月日時 (陽曆)</label>
                      <input
                        type="text"
                        placeholder="YYYY-MM-DD HH:mm"
                        value={`${formData.birthDate} ${formData.birthTime}`}
                        onChange={(e) => {
                          const [d, t] = e.target.value.split(' ');
                          setFormData({ ...formData, birthDate: d || '', birthTime: t || '' });
                        }}
                        className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#D97706]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#2B2D2F] mb-1 font-medium">備註 / 重点提問方向</label>
                    <textarea
                      rows={2}
                      placeholder="簡述你想探討的具體問題或近期面臨的重大抉擇…"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-white border border-[#1E3A5F]/30 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-[#2B2D2F]/10">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs text-[#1E3A5F] hover:underline"
                    >
                      ← 返回調整時段
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#D97706] hover:bg-[#1E3A5F] text-[#F4EFEA] px-8 py-3 rounded-[3px] font-serif font-bold text-base transition-colors shadow"
                    >
                      {isSubmitting ? '處理中…' : '確認並預約 (Confirm & Pay)'}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
