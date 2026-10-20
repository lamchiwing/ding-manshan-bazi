import os
import subprocess

print(">>> [1/5] 修復 ChartResult.tsx (根除 ReferenceError) ...")
cr_path = "frontend/src/components/ChartResult.tsx"
if os.path.exists(cr_path):
    with open(cr_path, "r", encoding="utf-8") as f:
        cr = f.read()
    if "onOpenTwelveMonthsReport?: () => void;" not in cr:
        cr = cr.replace("onOpenStartupReport?: () => void;", "onOpenStartupReport?: () => void;\n  onOpenTwelveMonthsReport?: () => void;")
    if "onOpenTwelveMonthsReport," not in cr:
        cr = cr.replace("onOpenStartupReport,", "onOpenStartupReport,\n  onOpenTwelveMonthsReport,")
    with open(cr_path, "w", encoding="utf-8") as f:
        f.write(cr)
    print("✓ ChartResult.tsx 修復完成！")

print(">>> [2/5] 修復 App.tsx (配置狀態與防崩潰安全掛載) ...")
app_path = "frontend/src/App.tsx"
if os.path.exists(app_path):
    with open(app_path, "r", encoding="utf-8") as f:
        app = f.read()
    if "import { TwelveMonthsReportModal }" not in app:
        app = app.replace(
            "import { StartupNavigationModal } from './components/StartupNavigationModal';",
            "import { StartupNavigationModal } from './components/StartupNavigationModal';\nimport { TwelveMonthsReportModal } from './components/TwelveMonthsReportModal';"
        )
    if "isTwelveMonthsModalOpen" not in app:
        app = app.replace(
            "const [isStartupModalOpen, setIsStartupModalOpen] = useState(false);",
            "const [isStartupModalOpen, setIsStartupModalOpen] = useState(false);\n  const [isTwelveMonthsModalOpen, setIsTwelveMonthsModalOpen] = useState(false);"
        )
    if "service.id === 'srv-12-months'" not in app:
        app = app.replace(
            "if (service.id === 'srv-startup-3yr' && isPreviewDomain) {",
            "if (service.id === 'srv-12-months' && isPreviewDomain) {\n      setIsTwelveMonthsModalOpen(true);\n      return;\n    }\n    if (service.id === 'srv-startup-3yr' && isPreviewDomain) {"
        )
    if "onOpenTwelveMonthsReport={isPreviewDomain ? () => setIsTwelveMonthsModalOpen(true) : undefined}" not in app:
        app = app.replace(
            "onOpenStartupReport={isPreviewDomain ? () => setIsStartupModalOpen(true) : undefined}",
            "onOpenStartupReport={isPreviewDomain ? () => setIsStartupModalOpen(true) : undefined}\n                    onOpenTwelveMonthsReport={isPreviewDomain ? () => setIsTwelveMonthsModalOpen(true) : undefined}"
        )
    if "<TwelveMonthsReportModal" not in app:
        app = app.replace(
            "{/* Footer */}",
            """{/* Twelve Months Fortune Navigation Report Modal (HK$368) */}
      {isTwelveMonthsModalOpen && (
        <TwelveMonthsReportModal
          isOpen={isTwelveMonthsModalOpen}
          onClose={() => setIsTwelveMonthsModalOpen(false)}
          baziData={baziData}
          birthDate={currentInputParams.birthDate}
          birthTime={currentInputParams.birthTime}
          gender={currentInputParams.gender}
        />
      )}

      {/* Footer */}"""
        )
    with open(app_path, "w", encoding="utf-8") as f:
        f.write(app)
    print("✓ App.tsx 配置完成！")

print(">>> [3/5] 更新 services.ts 為 HK$368 ...")
serv_path = "frontend/src/data/services.ts"
if os.path.exists(serv_path):
    with open(serv_path, "r", encoding="utf-8") as f:
        st = f.read()
    st = st.replace('price_hkd: 488', 'price_hkd: 368')
    st = st.replace('price_display: "HK$288"', 'price_display: "HK$368"')
    st = st.replace('price_display: "即將登場"', 'price_display: "HK$368"')
    st = st.replace('isComingSoon: true', 'isComingSoon: false')
    with open(serv_path, "w", encoding="utf-8") as f:
        f.write(st)
    print("✓ services.ts 更新完成！")

print(">>> [4/5] 執行前端編譯打包 (Vite Build) ...")
subprocess.run("cd frontend && npm run build", shell=True, check=True)

print(">>> [5/5] 提交並推送到 GitHub ...")
subprocess.run("git add frontend/src frontend/dist", shell=True, check=True)
subprocess.run('git commit -m "fix: resolve black screen ReferenceError and deploy 12-month navigation modal"', shell=True, check=True)
subprocess.run("git pull --rebase origin main", shell=True, check=True)
subprocess.run("git push origin main", shell=True, check=True)
print("\n🎉 修復並部屬成功！Cloudflare Pages 將在數十秒內完成更新。")
