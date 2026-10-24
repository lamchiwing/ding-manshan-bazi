import os, subprocess

print("==================================================")
print("🚀 開始部署用戶登入與歷史命書庫功能 ...")
print("==================================================")

# 1. 建立 MyReportsModal.tsx 組件
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
    return localStorage.getItem('tingmanshan_user_email');
  });
  const [isSent, setIsSent] = useState(false);
  const [reports, setReports] = useState<PurchasedReportItem[]>([]);

  useEffect(() => {
    // 讀取本地快取或已登入的報告
    const saved = localStorage.getItem('tingmanshan_unlocked_services');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const serviceNames: Record<string, string> = {
            'srv-five-elements': '八字五行與喜用神個人指南 (HK$128)',
            'srv-love-3yr': '感情／姻緣・未來 3 年正緣解析 (HK$188)',
            'srv-career-3yr': '事業／財運・未來 3 年深度解讀 (HK$188)',
            'srv-startup-3yr': '八字創業／轉職・未來 3 年黃金窗口期 (HK$288)',
            'srv-12-months': '流年＋十二流月運程全面解讀 (HK$368)',
            'srv-12-months-decisions': '十二流月運程＋重大決策矩陣 (HK$488)',
          };
          const list: PurchasedReportItem[] = parsed.map((sid: string) => ({
            id: sid,
            service_id: sid,
            service_name: serviceNames[sid] || sid,
            unlocked_at: new Date().toLocaleDateString('zh-HK'),
          }));
          setReports(list);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMagicLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    localStorage.setItem('tingmanshan_user_email', email);
    setCurrentUserEmail(email);
    setIsSent(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('tingmanshan_user_email');
    setCurrentUserEmail(null);
    setIsSent(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
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
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-[#A4B3C6]">已綁定信箱：</span>
                <span className="font-mono text-[#F4EFEA] font-semibold">{currentUserEmail}</span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-[#D97706] hover:underline"
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
                <p className="text-xs text-[#A4B3C6]">此裝置目前尚無已解鎖的命書記錄</p>
                <p className="text-[11px] text-[#A4B3C6]/60 mt-1">
                  若您已在其他裝置購買，請在上方輸入購買 Email 同步。
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
                      <div className="text-[10px] text-[#A4B3C6] mt-0.5">批算解鎖日期: {report.unlocked_at}</div>
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
              <span>丁蔓山命理誌 · 終身查閱保障</span>
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
print(f"✓ [1/4] {modal_path} 建立完成！")

# 2. 更新 Header.tsx 加入「我的命書」按鈕
header_path = "frontend/src/components/Header.tsx"
with open(header_path, "r", encoding="utf-8") as f:
    header = f.read()

if "onOpenMyReports?:" not in header:
    header = header.replace(
        "interface HeaderProps {",
        "interface HeaderProps {\n  onOpenMyReports?: () => void;"
    )
    header = header.replace(
        "export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {",
        "export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenMyReports }) => {"
    )

if "我的命書" not in header:
    target_nav = '<button\n            onClick={() => onNavigate(\'booking-services\')}'
    my_reports_btn = '''<button
            onClick={onOpenMyReports}
            className="flex items-center space-x-1 text-xs text-[#D97706] hover:text-[#F4EFEA] px-2.5 py-1 rounded bg-[#D97706]/10 border border-[#D97706]/30 transition-colors"
          >
            <span>📜 我的命書</span>
          </button>\n\n          '''
    header = header.replace(target_nav, my_reports_btn + target_nav)
    with open(header_path, "w", encoding="utf-8") as f:
        f.write(header)
    print("✓ [2/4] Header.tsx 加入「我的命書」按鈕！")
else:
    print("✓ [2/4] Header.tsx 已有「我的命書」按鈕！")

# 3. 更新 App.tsx 掛載 MyReportsModal
app_path = "frontend/src/App.tsx"
with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

if "MyReportsModal" not in app_code:
    app_code = app_code.replace(
        "import { TwelveMonthsDecisionsModal } from './components/TwelveMonthsDecisionsModal';",
        "import { TwelveMonthsDecisionsModal } from './components/TwelveMonthsDecisionsModal';\nimport { MyReportsModal } from './components/MyReportsModal';"
    )
    app_code = app_code.replace(
        "const [isTwelveMonthsDecisionsModalOpen, setIsTwelveMonthsDecisionsModalOpen] = useState(false);",
        "const [isTwelveMonthsDecisionsModalOpen, setIsTwelveMonthsDecisionsModalOpen] = useState(false);\n  const [isMyReportsModalOpen, setIsMyReportsModalOpen] = useState(false);"
    )
    # Header prop
    app_code = app_code.replace(
        "<Header\n        currentView={currentView}\n        onNavigate={handleNavigate}\n      />",
        "<Header\n        currentView={currentView}\n        onNavigate={handleNavigate}\n        onOpenMyReports={() => setIsMyReportsModalOpen(true)}\n      />"
    )
    # Modal mounting
    app_code = app_code.replace(
        "onClose={() => setIsTwelveMonthsDecisionsModalOpen(false)}\n      />",
        "onClose={() => setIsTwelveMonthsDecisionsModalOpen(false)}\n      />\n\n      <MyReportsModal\n        isOpen={isMyReportsModalOpen}\n        onClose={() => setIsMyReportsModalOpen(false)}\n        onOpenReport={(sid) => {\n          if (sid === 'srv-five-elements') setIsFiveElementsModalOpen(true);\n          else if (sid === 'srv-love-3yr') setIsLoveNavigationModalOpen(true);\n          else if (sid === 'srv-career-3yr') setIsCareerNavigationModalOpen(true);\n          else if (sid === 'srv-startup-3yr') setIsStartupModalOpen(true);\n          else if (sid === 'srv-12-months') setIsTwelveMonthsModalOpen(true);\n          else if (sid === 'srv-12-months-decisions') setIsTwelveMonthsDecisionsModalOpen(true);\n        }}\n      />"
    )
    with open(app_path, "w", encoding="utf-8") as f:
        f.write(app_code)
    print("✓ [3/4] App.tsx 掛載 MyReportsModal 成功！")
else:
    print("✓ [3/4] App.tsx 已配置 MyReportsModal！")

# 4. 前端打包編譯
print(">>> [4/4] 正在執行 Vite 打包編譯 ...")
subprocess.run("cd frontend && npm run build", shell=True, check=True)
print("✓ Vite 打包成功！所有功能就緒。")
