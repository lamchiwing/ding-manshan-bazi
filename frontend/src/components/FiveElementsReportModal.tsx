import React, { useState, useEffect } from 'react';
import { generateLocalFiveElementsReport } from '../utils/fiveElementsGuideLocal';

interface FiveElementsReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  baziData: any;
  birthDate: string;
  birthTime: string;
  gender: string;
}

export const FiveElementsReportModal: React.FC<FiveElementsReportModalProps> = ({
  isOpen,
  onClose,
  baziData,
  birthDate,
  birthTime,
  gender
}) => {
  const [reportText, setReportText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    // Default fallback
    const localReport = generateLocalFiveElementsReport(baziData, birthDate, birthTime, gender);
    setReportText(localReport);

    // Try fetching live backend report if available
    setIsLoading(true);
    fetch('/api/v1/bazi/five-elements-guide', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        birth_date: birthDate,
        birth_time: birthTime,
        gender: gender,
        day_boundary_rule: "ZI_START_NEXT_DAY"
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        if (data && data.report_markdown) {
          setReportText(data.report_markdown);
        }
      })
      .catch(() => {
        // Keeps local report
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOpen, baziData, birthDate, birthTime, gender]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#F4EFEA] text-[#2B2D2F] w-full max-w-4xl rounded-[4px] border border-[#1E3A5F]/40 shadow-2xl overflow-hidden animate-fade-in-up flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#1E3A5F] text-[#F4EFEA] px-6 py-4 flex items-center justify-between shrink-0 border-b border-[#D97706]/40">
          <div>
            <span className="text-[10px] text-[#D97706] tracking-widest uppercase font-semibold block">
              丁蔓山｜命理誌 · 確定性官方標準報告
            </span>
            <h3 className="font-serif text-lg md:text-xl font-bold text-[#F4EFEA]">
              【五行生活指南 · 專屬個人開運全覽】
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#A4B3C6] hover:text-[#F4EFEA] text-2xl font-light leading-none p-1 transition-colors cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Markdown-style Content Body */}
        <div className="p-6 md:p-10 overflow-y-auto font-sans text-sm md:text-base leading-relaxed space-y-6 flex-1 bg-[#FAFAF8]">
          {isLoading && (
            <div className="text-center text-xs text-[#1E3A5F] py-2 bg-[#1E3A5F]/10 rounded mb-4">
              ⟳ 正在調用 100 分制量化數據庫與五大古籍精準引證...
            </div>
          )}
          <div className="prose prose-stone max-w-none text-[#2B2D2F]">
            <div className="whitespace-pre-line font-sans leading-relaxed text-[#2B2D2F] space-y-4">
              {reportText}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F4EFEA] px-6 py-4 border-t border-[#1E3A5F]/20 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#1E3A5F]/80">
            ✓ 100分制 DataBasic 量化模型 · 5大古籍權威引證 · HK$128
          </span>
          <div className="flex space-x-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#1E3A5F] text-[#F4EFEA] text-xs font-serif rounded hover:bg-[#2B2D2F] transition-colors cursor-pointer"
            >
              列印 / 存為 PDF
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-[#D97706] text-white text-xs font-serif font-bold rounded hover:bg-[#b45309] transition-colors shadow cursor-pointer"
            >
              關閉預覽
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
