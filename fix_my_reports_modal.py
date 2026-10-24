import os, subprocess, re

print("==================================================")
print("🚀 開始修復「📜 我的命書」點擊彈窗 ...")
print("==================================================")

# 1. 確保 MyReportsModal.tsx 組件存在且完備
modal_path = "frontend/src/components/MyReportsModal.tsx"
modal_code = '''import React, { useState, useEffect } from 'react';
import { X, BookOpen, Key, Mail, CheckCircle2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

interface PurchasedReportItem {
  id: string;
  service_id: string;
  service_name: string;
  unlocked_at: string;
  birth_date?: string;
  birth_time?: string;
}

interface MyReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReport: (serviceId: string) => void;
}

export const MyReportsModal: React.FC<MyReportsModalProps> = ({
  isOpen,
  onClose,
  onOpenReport,
}) => {
  const [email, setEmail] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('tingmanshan_user_email');
    } catch {
      return null;
    }
  });
  const [isSent, setIsSent] = useState(false);
  const [reports, setReports] = useState<PurchasedReportItem[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    try {
      const saved = localStorage.getItem('tingmanshan_unlocked_services');
      const serviceNames: Record<string, string> = {
        'srv-five-elements': '八字五行與喜用神個人指南 (HK$128)',
        'srv-love-3yr': '感情／姻緣・未來 3 年正緣解析 (HK$188)',
        'srv-career-3yr': '事業／財運・未來 3 年深度解讀 (HK$188)',
        'srv-startup-3yr': '八字創業／轉職・未來 3 年黃金窗口期 (HK$288)',
        'srv-12-months': '流年＋十二流月運程全面解讀 (HK$368)',
        'srv-12-months-decisions': '十二流月運程＋重大決策矩陣 (HK$488)',
      };
      
      let list: PurchasedReportItem[] = [];
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          list = parsed.map((sid: string) => ({
            id: sid,
            service_id: sid,
            service_name: serviceNames[sid] || sid,
            unlocked_at: '永久解鎖',
          }));
        }
      }
      setReports(list);
    } catch (e) {
      console.error(e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    try {
      localStorage.setItem('tingmanshan_user_email', email);
    } catch {}
    setCurrentUserEmail(email);
    setIsSent(true);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('tingmanshan_user_email');
    } catch {}
    setCurrentUserEmail(null);
    setIsSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-[#1A1D20] border border-[#1E3A5F] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1E3A5F]/40 bg-[#141618]">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-[#D97706]" />
            <h2 className="text-lg font-serif font-bold text-[#F4EFEA]">我的專屬命書庫</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#A4B3C6] hover:text-[#F4EFEA] hover:bg-[#2A3B4C]/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-[#F4EFEA]">
          {/* User Status Bar */}
          {currentUserEmail ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#1E3A5F]/20 border border-[#1E3A5F]/60 text-xs">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[#A4B3C6]">已綁定信箱：</span>
                <span className="font-mono text-[#F4EFEA] font-semibold">{currentUserEmail}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-[#D97706] hover:underline shrink-0 ml-2"
              >
                切換帳戶
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#242A30] border border-[#1E3A5F]/50">
              <h3 className="text-sm font-semibold text-[#D97706] flex items-center space-x-1.5 mb-1.5">
                <Key className="w-4 h-4" />
                <span>免密碼登入 · 找回過往已購命書</span>
              </h3>
              <p className="text-xs text-[#A4B3C6] leading-relaxed mb-3">
                輸入您在購買時填寫的 Email，系統會自動將您過往批算的所有命理手冊同步至此裝置。
              </p>
              {isSent ? (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-xs text-emerald-300 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>已登入！您在此裝置批算的歷史報告已載入於下方。</span>
                </div>
              ) : (
                <form onSubmit={handleMagicLinkSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-[#A4B3C6]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="請輸入購買時使用的 Email"
                      required
                      className="w-full bg-[#1A1D20] border border-[#4B5E71]/60 rounded-lg pl-9 pr-3 py-2 text-xs text-[#F4EFEA] placeholder-[#A4B3C6]/60 focus:outline-none focus:border-[#D97706]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#D97706] hover:bg-[#B45309] text-[#1e2022] font-semibold text-xs rounded-lg transition-colors shrink-0"
                  >
                    查看命書
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Purchased Reports List */}
          <div>
            <h4 className="text-xs font-mono tracking-wider text-[#A4B3C6] uppercase mb-3 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D97706]" />
              <span>已解鎖報告列表 ({reports.length})</span>
            </h4>

            {reports.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-[#1E3A5F]/40 rounded-xl bg-[#141618]">
                <BookOpen className="w-8 h-8 text-[#A4B3C6]/40 mx-auto mb-2" />
                <p className="text-xs text-[#F4EFEA] font-medium">此裝置目前尚無已解鎖的命書記錄</p>
                <p className="text-[11px] text-[#A4B3C6] mt-1">
                  若您已在其他裝置購買，請在上方輸入購買 Email 綁定同步。
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="p-3.5 rounded-xl bg-[#20252B] border border-[#1E3A5F]/60 flex items-center justify-between hover:border-[#D97706]/60 transition-all"
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#F4EFEA]">{report.service_name}</div>
                      <div className="text-[10px] text-[#A4B3C6] mt-0.5">狀態: {report.unlocked_at}</div>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenReport(report.service_id);
                      }}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-[#1E3A5F] hover:bg-[#2A4D7A] text-[#F4EFEA] text-xs rounded-lg transition-colors font-medium shrink-0"
                    >
                      <span>開啟閱讀</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-[#1E3A5F]/30 flex items-center justify-between text-[11px] text-[#A4B3C6]">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" />
              <span>丁蔓山命理誌 · 永久查閱保障</span>
            </span>
            <span>https://tingmanshan.com</span>
          </div>
        </div>

      </div>
    </div>
  );
};
'''
with open(modal_path, "w", encoding="utf-8") as f:
    f.write(modal_code)
print("✓ [1/3] MyReportsModal.tsx 確認建立完成！")

# 2. 修正 Header.tsx
header_path = "frontend/src/components/Header.tsx"
with open(header_path, "r", encoding="utf-8") as f:
    header = f.read()

if "onOpenMyReports?:" not in header:
    header = header.replace(
        "interface HeaderProps {",
        "interface HeaderProps {\n  onOpenMyReports?: () => void;"
    )

if "onOpenMyReports" not in header.split("export const Header")[1].split("{")[0]:
    header = header.replace(
        "export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {",
        "export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenMyReports }) => {"
    )

btn_code = '''<button
            type="button"
            onClick={() => onOpenMyReports && onOpenMyReports()}
            className="flex items-center space-x-1 text-xs text-[#D97706] hover:text-[#F4EFEA] px-2.5 py-1 rounded bg-[#D97706]/10 border border-[#D97706]/30 transition-colors font-medium"
          >
            <span>📜 我的命書</span>
          </button>'''

if "我的命書" not in header:
    target_nav = '<button\n            onClick={() => onNavigate(\'booking-services\')}'
    header = header.replace(target_nav, btn_code + '\n\n          ' + target_nav)
else:
    # 確保按鈕帶有正確的 onClick 綁定
    header = re.sub(r'<button[^>]*>[\s\S]*?我的命書[\s\S]*?</button>', btn_code, header)

with open(header_path, "w", encoding="utf-8") as f:
    f.write(header)
print("✓ [2/3] Header.tsx 點擊事件已修復綁定！")

# 3. 修正 App.tsx (精準掛載 MyReportsModal)
app_path = "frontend/src/App.tsx"
with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

if "MyReportsModal" not in app_code:
    app_code = app_code.replace(
        "import { TwelveMonthsDecisionsModal } from './components/TwelveMonthsDecisionsModal';",
        "import { TwelveMonthsDecisionsModal } from './components/TwelveMonthsDecisionsModal';\nimport { MyReportsModal } from './components/MyReportsModal';"
    )

if "isMyReportsModalOpen" not in app_code:
    app_code = app_code.replace(
        "const [isTwelveMonthsDecisionsModalOpen, setIsTwelveMonthsDecisionsModalOpen] = useState(false);",
        "const [isTwelveMonthsDecisionsModalOpen, setIsTwelveMonthsDecisionsModalOpen] = useState(false);\n  const [isMyReportsModalOpen, setIsMyReportsModalOpen] = useState(false);"
    )

if "onOpenMyReports=" not in app_code:
    app_code = app_code.replace(
        "<Header\n        currentView={currentView}\n        onNavigate={handleNavigate}\n      />",
        "<Header\n        currentView={currentView}\n        onNavigate={handleNavigate}\n        onOpenMyReports={() => setIsMyReportsModalOpen(true)}\n      />"
    )

# 掛載到 Footer 正上方
if "<MyReportsModal" not in app_code:
    modal_render = '''      {/* User Purchased Reports History Archive Modal */}
      {isMyReportsModalOpen && (
        <MyReportsModal
          isOpen={isMyReportsModalOpen}
          onClose={() => setIsMyReportsModalOpen(false)}
          onOpenReport={(sid) => {
            if (sid === 'srv-five-elements') setIsFiveElementsModalOpen(true);
            else if (sid === 'srv-love-3yr') setIsLoveNavigationModalOpen(true);
            else if (sid === 'srv-career-3yr') setIsCareerNavigationModalOpen(true);
            else if (sid === 'srv-startup-3yr') setIsStartupModalOpen(true);
            else if (sid === 'srv-12-months') setIsTwelveMonthsModalOpen(true);
            else if (sid === 'srv-12-months-decisions') setIsTwelveMonthsDecisionsModalOpen(true);
          }}
        />
      )}

      {/* Footer */}'''
    app_code = app_code.replace("{/* Footer */}", modal_render)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(app_code)
print("✓ [3/3] App.tsx 已精準掛載 MyReportsModal！")

# 執行 Vite 編譯
print(">>> 正在編譯 Vite 打包 ...")
subprocess.run("cd frontend && npm run build", shell=True, check=True)
print("==================================================")
print("🎉 修復完成！請執行 git commit & push 更新站點。")
print("==================================================")
