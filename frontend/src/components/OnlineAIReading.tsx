import React, { useState } from 'react';

interface OnlineAIReadingProps {
  baziData: any;
  onOpenBooking: () => void;
}

export const OnlineAIReading: React.FC<OnlineAIReadingProps> = ({ baziData, onOpenBooking }) => {
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
      // Send to backend API
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
      // Fallback offline response
      const dayMaster = baziData?.day_master?.display || "丙火";
      const domElem = baziData?.elements?.dominant_element || "火";
      setReadingResult({
        question: qText,
        day_master: dayMaster,
        dominant_element: domElem,
        response: `觀閣下原局以【${dayMaster}】為核心，主導能量為【${domElem}】。當前時序運行至交接轉折之期。\n\n◆ **命盤氣場解讀**：針對「${qText}」，原局食傷與財星得令，下半年起將迎來貴人相助之良機。此時宜穩扎穩打，深耕專業，不宜衝動冒進。\n\n◆ **修身與開運建議**：多穿著五行平衡色系，保持心境清明，遇事多從長遠視角審視，吉星自會相隨。`,
        conversion: {
          title: "想要更深入的客製化指引？",
          subtitle: "Continue your reading with a professional fortune teller.",
          prompt: "與丁蔓山大師或駐站專家進行 1 對 1 深度視像諮詢，獲取專屬命書與長遠決策佈局。",
          action_text: "預約命理師諮詢"
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-reading" className="w-full bg-[#1E3A5F]/15 py-16 border-b border-[#1E3A5F]/30">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="mb-10">
          <span className="text-xs text-[#D97706] tracking-widest uppercase font-semibold">AI Fortune Reading</span>
          <h2 className="text-3xl md:text-4xl font-serif text-[#F4EFEA] mt-1">線上命理</h2>
          <p className="text-[#A4B3C6] text-base md:text-lg mt-2 font-sans font-light">
            與你的命盤對話 · 沉靜、精微、啟迪人心。
          </p>
        </div>

        {/* Quick Query Input & Shortcuts */}
        <div className="bg-charcoal border border-[#1E3A5F] p-6 md:p-8 rounded-[4px] shadow-lg mb-10">
          <label className="block text-sm text-[#A4B3C6] mb-3 font-sans">
            選擇快捷提問，或輸入你想探索的人生決策：
          </label>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2.5 mb-6">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(q)}
                className="bg-[#1E3A5F]/40 hover:bg-[#1E3A5F] border border-[#1E3A5F] text-[#F4EFEA] text-sm px-4 py-2 rounded-full transition-all duration-200 hover:border-[#D97706]"
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
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：我適合與朋友合夥開公司嗎？未來兩年感情走向如何？"
              className="flex-1 bg-[#F4EFEA] text-[#2B2D2F] px-4 py-3 rounded-[3px] text-base focus:outline-none focus:ring-1 focus:ring-[#D97706] font-medium placeholder:text-[#2B2D2F]/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#D97706] hover:bg-[#F4EFEA] text-[#F4EFEA] hover:text-[#2B2D2F] font-serif px-8 py-3 rounded-[3px] font-semibold text-base transition-all duration-200 flex items-center justify-center min-w-[150px]"
            >
              {loading ? '推演中…' : '開始線上命理'}
            </button>
          </form>
        </div>

        {/* Quiet Luxury AI Reading Result Card */}
        {readingResult && (
          <div className="bg-[#F4EFEA] text-[#2B2D2F] p-8 md:p-10 rounded-[4px] border border-[#1E3A5F]/30 animate-fade-in-up shadow-xl">
            <div className="flex items-center justify-between border-b border-[#2B2D2F]/10 pb-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                <span className="font-serif font-bold text-xl text-[#2B2D2F]">
                  命理推演：{readingResult.question}
                </span>
              </div>
              <span className="text-xs text-[#1E3A5F] font-mono bg-[#1E3A5F]/10 px-2.5 py-1 rounded">
                元神：{readingResult.day_master}
              </span>
            </div>

            {/* Editorial Response Content */}
            <div className="font-serif text-lg leading-relaxed text-[#2B2D2F]/90 space-y-4 whitespace-pre-line">
              {readingResult.response}
            </div>

            {/* AI -> Human Conversion Layer adhering to UI brief */}
            <div className="mt-10 pt-6 border-t border-[#2B2D2F]/15 bg-[#1E3A5F]/5 p-6 rounded-[3px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-base text-[#1E3A5F]">
                  {readingResult.conversion?.title || "需要更深入了解？"}
                </h4>
                <p className="text-sm text-[#2B2D2F]/70 mt-1 font-sans">
                  {readingResult.conversion?.prompt || "與丁蔓山大師或駐站專家進行一對一線上深度解讀。"}
                </p>
              </div>
              <button
                onClick={onOpenBooking}
                className="bg-[#1E3A5F] hover:bg-[#2B2D2F] text-[#F4EFEA] px-6 py-2.5 rounded-[3px] text-sm font-sans font-medium transition-colors shadow-sm shrink-0"
              >
                {readingResult.conversion?.action_text || "預約命理師 →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
