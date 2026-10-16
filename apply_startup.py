import os

print(">>> 正在更新 創業／拓展・未來3年 (srv-startup-3yr) ...")

# 1. 啟用 services.ts 中的服務
sp = "frontend/src/data/services.ts"
if os.path.exists(sp):
    with open(sp, "r", encoding="utf-8") as f:
        c = f.read()
    c = c.replace('id: "srv-startup-3yr",\n    isComingSoon: true', 'id: "srv-startup-3yr",\n    isComingSoon: false')
    with open(sp, "w", encoding="utf-8") as f:
        f.write(c)
    print("✓ services.ts 已更新")

# 2. 開放本機/預覽環境直接免金流開啟彈窗 (OnlineServicesIndexPage.tsx)
op = "frontend/src/components/OnlineServicesIndexPage.tsx"
if os.path.exists(op):
    with open(op, "r", encoding="utf-8") as f:
        c = f.read()
    if 'service.id === "srv-career-3yr"' in c and 'service.id === "srv-startup-3yr"' not in c:
        c = c.replace(
            'service.id === "srv-career-3yr"',
            'service.id === "srv-career-3yr" || service.id === "srv-startup-3yr"'
        )
        with open(op, "w", encoding="utf-8") as f:
            f.write(c)
        print("✓ OnlineServicesIndexPage.tsx 已更新")

# 3. 在 ChartResult.tsx 加入按鈕
cp = "frontend/src/components/ChartResult.tsx"
if os.path.exists(cp):
    with open(cp, "r", encoding="utf-8") as f:
        c = f.read()
    btn = '''        <button
          onClick={onOpenStartupModal}
          className="px-3 py-1.5 text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded transition-colors"
        >
          🚀 創業／拓展・未來3年 (HK$288)
        </button>'''
    if 'onOpenStartupModal' in c and '🚀 創業／拓展' not in c:
        c = c.replace('{/* Future Services */}', btn + '\n        {/* Future Services */}')
        with open(cp, "w", encoding="utf-8") as f:
            f.write(c)
        print("✓ ChartResult.tsx 已更新")

print(">>> 全部更新完成！請進行 build 與 push。")
