import React, { useState } from 'react';

interface OnlineReadingProps {
  baziData: any;
  onOpenBooking: () => void;
}

export const OnlineReading: React.FC<OnlineReadingProps> = ({ baziData, onOpenBooking }) => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [readingResult, setReadingResult] = useState<any>(null);

  const SUGGESTED_QUESTIONS = [
    "我今年適合轉工嗎？",
    "我適合創業嗎？",
    "未來三年財運如何？",
    "我的感情運勢如何？",
  ];

  const handleAsk = async (qText: string) => {
    if (!qText.trim()) return;
    setLoading(true);
    setQuestion(qText);

    try {
      const res = await fetch('/api/v1/bazi/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bazi_data: baziData,
          question: qText
        })
      });
      if (res.ok) {
        const data = await res.json();
        setReadingResult(data);
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      const dayMaster = baziData?.day_master?.display || "丙火";
      const domElem = baziData?.elements?.dominant_element || "火";
      setReadingResult({
        question: qText,
        day_master: dayMaster,
        dominant_element: domElem,
        response: `觀閣下原局以【${dayMaster}】為核心，主導能量為【${domElem}】。當前時序運行至交接轉折之期。\n\n◆ **命盤氣場解讀**：針對「${qText}」，原局食傷與財星得令，下半年起將迎來貴人相助之良機。此時宜穩扎穩打，深耕專業，不宜衝動冒進。\n\n◆ **修身與開運建議**：多穿著五行平衡色系，保持心境清明，遇事多從長遠視角審視，吉星自會相隨。`,
        conversion: {
          title: "需要更深入的指引？",
          prompt: "與丁蔓山進行一對一線上諮詢，梳理命盤與長遠時窗佈局。",
          action_text: "預約丁蔓山諮詢"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reading" className="w-full bg-[#1E3A5F]/15 py-10 border-t border-[#1E3A5F]/30">
      <div className="w-full">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-serif text-[#F4EFEA]">線上命理</h2>
          <p className="text-[#A4B3C6] text-xs md:text-sm mt-1 font-sans font-light">
            與你的命盤對話 · 沉靜客觀的人生推演。
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-charcoal border border-[#1E3A5F] p-5 md:p-6 rounded-[3px] shadow mb-6">
          <label className="block text-xs text-[#A4B3C6] mb-2.5 font-sans">
            選擇提問，或輸入你想探討的議題：
          </label>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(q)}
                className="bg-[#1E3A5F]/40 hover:bg-[#1E3A5F] border border-[#1E3A5F] text-[#F4EFEA] text-xs px-3 py-1.5 rounded-full transition-all hover:border-[#D97706]"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Custom Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk(question);
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：我適合與朋友合夥開公司嗎？未來兩年感情走向如何？"
              className="flex-1 bg-[#F4EFEA] text-[#2B2D2F] px-3.5 py-2 rounded-[2px] text-sm focus:outline-none focus:ring-1 focus:ring-[#D97706] font-medium placeholder:text-[#2B2D2F]/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#D97706] hover:bg-[#F4EFEA] text-[#F4EFEA] hover:text-[#2B2D2F] font-serif px-5 py-2 rounded-[2px] font-semibold text-sm transition-all flex items-center justify-center min-w-[120px]"
            >
              {loading ? '推演中…' : '線上解讀'}
            </button>
          </form>
        </div>

        {/* Reading Result Card */}
        {readingResult && (
          <div className="bg-[#F4EFEA] text-[#2B2D2F] p-6 md:p-8 rounded-[3px] border border-[#1E3A5F]/30 animate-fade-in-up shadow-md">
            <div className="flex items-center justify-between border-b border-[#2B2D2F]/10 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                <span className="font-serif font-bold text-base md:text-lg text-[#2B2D2F]">
                  命理解讀：{readingResult.question}
                </span>
              </div>
              <span className="text-[11px] text-[#1E3A5F] font-mono bg-[#1E3A5F]/10 px-2 py-0.5 rounded">
                元神：{readingResult.day_master}
              </span>
            </div>

            {/* Content */}
            <div className="font-serif text-sm md:text-base leading-relaxed text-[#2B2D2F]/90 space-y-3 whitespace-pre-line">
              {readingResult.response}
            </div>

            {/* Humble Conversion */}
            <div className="mt-6 pt-4 border-t border-[#2B2D2F]/15 bg-[#1E3A5F]/5 p-4 rounded-[2px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-serif font-bold text-xs md:text-sm text-[#1E3A5F]">
                  {readingResult.conversion?.title || "需要更深入了解？"}
                </h4>
                <p className="text-xs text-[#2B2D2F]/70 mt-0.5 font-sans">
                  {readingResult.conversion?.prompt || "與丁蔓山進行一對一線上交流。"}
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA] px-4 py-1.5 rounded-[2px] text-xs font-sans font-medium transition-colors shadow-sm shrink-0"
              >
                {readingResult.conversion?.action_text || "預約諮詢 →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
