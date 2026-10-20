import os
import subprocess

print("==================================================")
print("🚀 [1/4] 還原組件並建立 ReportFooterCrossSell ...")
print("==================================================")

# 1. 還原組件檔案至最新乾淨狀態
subprocess.run("git checkout HEAD frontend/src/components/*Modal.tsx", shell=True, check=True)

# 2. 寫入 ReportFooterCrossSell.tsx
comp_path = "frontend/src/components/ReportFooterCrossSell.tsx"
comp_code = '''import React from 'react';

export type ProductId =
  | 'career-wealth'
  | 'love-marriage'
  | 'life-navigator'
  | 'monthly-calendar'
  | 'master-consultation'
  | 'five-elements';

interface ReportFooterCrossSellProps {
  currentProductId: ProductId;
}

interface ProductItem {
  id: ProductId;
  icon: string;
  name: string;
  price: string;
  url: string;
}

const ALL_CROSS_SELL_PRODUCTS: ProductItem[] = [
  {
    id: 'career-wealth',
    icon: '💼',
    name: '事業／財運・未來 3 年深度解讀',
    price: 'HK$ 188',
    url: 'https://tingmanshan.com/services/career-wealth'
  },
  {
    id: 'love-marriage',
    icon: '💖',
    name: '感情／姻緣・未來 3 年正緣解析',
    price: 'HK$ 188',
    url: 'https://tingmanshan.com/services/love-marriage'
  },
  {
    id: 'life-navigator',
    icon: '🧭',
    name: '八字人生導航・未來 3 年全覽手冊',
    price: 'HK$ 588',
    url: 'https://tingmanshan.com/services/life-navigator'
  },
  {
    id: 'monthly-calendar',
    icon: '🗓',
    name: '十二流月吉凶＋重大決策矩陣',
    price: 'HK$ 488',
    url: 'https://tingmanshan.com/services/monthly-calendar'
  },
  {
    id: 'master-consultation',
    icon: '🍵',
    name: '丁蔓山大師 · 1對1 八字命理深度諮詢',
    price: 'HK$ 4,800',
    url: 'https://tingmanshan.com/services/master-consultation'
  }
];

export const ReportFooterCrossSell: React.FC<ReportFooterCrossSellProps> = ({ currentProductId }) => {
  // 自動排除當前報告自身所屬的產品 (除了 report belonging product)
  const recommendations = ALL_CROSS_SELL_PRODUCTS.filter(p => p.id !== currentProductId);

  return (
    <div className="mt-8 pt-6 border-t border-[#2B2D2F]/15 space-y-4 print:mt-6 print:pt-4">
      {/* 1. 專屬命書授權與防偽提示 */}
      <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded p-3.5 text-xs text-[#2B2D2F]/85 space-y-1">
        <div className="flex items-center space-x-1.5 font-bold text-[#1E3A5F]">
          <span>🔒</span>
          <span>專屬命書授權與防偽提示</span>
        </div>
        <p className="leading-relaxed">
          本報告為依據閣下生辰專屬客製之命書。如需批算家人或合作夥伴八字，請返回線上服務選購專屬項目。
        </p>
      </div>

      {/* 2. 延伸產品跨項目推薦 */}
      <div className="bg-white/95 p-4 sm:p-5 rounded border border-[#2B2D2F]/15 shadow-xs space-y-3">
        <div className="flex items-center space-x-1.5 font-serif font-bold text-sm sm:text-base text-[#1E3A5F]">
          <span className="text-[#D97706]">✦</span>
          <span>探尋更深層的人生藍圖與流年機遇：</span>
        </div>

        <div className="space-y-2 pt-1">
          {recommendations.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded bg-[#FAF7F2] border border-[#2B2D2F]/10 hover:border-[#D97706]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center space-x-2">
                <span className="text-base">{item.icon}</span>
                <span className="font-serif font-bold text-[#2B2D2F] text-xs sm:text-sm">
                  {item.name}
                </span>
                <span className="font-sans font-bold text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded text-[11px] whitespace-nowrap">
                  ({item.price})
                </span>
              </div>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] text-[#1E3A5F] hover:text-[#D97706] hover:underline flex items-center space-x-1 break-all"
              >
                <span>{item.url}</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          ))}
        </div>

        <div className="text-[10px] text-[#2B2D2F]/60 pt-1 text-right">
          ※ 丁蔓山｜命理誌 · 現代極簡命理與風水環境哲學
        </div>
      </div>
    </div>
  );
};
'''
with open(comp_path, "w", encoding="utf-8") as f:
    f.write(comp_code)
print("✓ ReportFooterCrossSell.tsx 建立成功！")

print(">>> [2/4] 精確注入 5 大報告 Modal 組件 ...")

# 1. Career
with open("frontend/src/components/CareerNavigationModal.tsx", "r", encoding="utf-8") as f:
    cr = f.read()
cr = cr.replace("import React, { useState, useMemo } from 'react';", "import React, { useState, useMemo } from 'react';\nimport { ReportFooterCrossSell } from './ReportFooterCrossSell';")
cr = cr.replace("          )}\n        </div>\n\n        {/* Footer */}", "          )}\n          <ReportFooterCrossSell currentProductId=\"career-wealth\" />\n        </div>\n\n        {/* Footer */}")
with open("frontend/src/components/CareerNavigationModal.tsx", "w", encoding="utf-8") as f:
    f.write(cr)

# 2. Love
with open("frontend/src/components/LoveNavigationModal.tsx", "r", encoding="utf-8") as f:
    lv = f.read()
lv = lv.replace("import React, { useState, useMemo } from 'react';", "import React, { useState, useMemo } from 'react';\nimport { ReportFooterCrossSell } from './ReportFooterCrossSell';")
lv = lv.replace("          </div>\n\n        </div>\n\n        {/* Modal Footer */}", "          </div>\n          <ReportFooterCrossSell currentProductId=\"love-marriage\" />\n        </div>\n\n        {/* Modal Footer */}")
with open("frontend/src/components/LoveNavigationModal.tsx", "w", encoding="utf-8") as f:
    f.write(lv)

# 3. Startup
with open("frontend/src/components/StartupNavigationModal.tsx", "r", encoding="utf-8") as f:
    st = f.read()
st = st.replace('import React, { useState, useMemo } from "react";', 'import React, { useState, useMemo } from "react";\nimport { ReportFooterCrossSell } from "./ReportFooterCrossSell";')
st = st.replace("          )}\n\n        </div>\n\n        {/* Footer */}", "          )}\n          <ReportFooterCrossSell currentProductId=\"life-navigator\" />\n        </div>\n\n        {/* Footer */}")
with open("frontend/src/components/StartupNavigationModal.tsx", "w", encoding="utf-8") as f:
    f.write(st)

# 4. TwelveMonths
with open("frontend/src/components/TwelveMonthsReportModal.tsx", "r", encoding="utf-8") as f:
    tm = f.read()
tm = tm.replace("import { computeTwelveMonthsReport, TwelveMonthsReportResult } from '../utils/twelveMonthsNavigationLocal';", "import { computeTwelveMonthsReport, TwelveMonthsReportResult } from '../utils/twelveMonthsNavigationLocal';\nimport { ReportFooterCrossSell } from './ReportFooterCrossSell';")
old_notice = '''          {/* Anti-Counterfeit Notice */}
          <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded p-4 text-xs text-[#2B2D2F]/85 space-y-1.5 mt-4">
            <div className="flex items-center space-x-1.5 font-bold text-[#1E3A5F]"><span>🔒</span><span>專屬命書授權與防偽提示</span></div>
            <p className="leading-relaxed">本報告為依據閣下生辰專屬客製之命書。如需批算家人或合作夥伴八字，請返回線上服務選購專屬項目。</p>
          </div>'''
if old_notice in tm:
    tm = tm.replace(old_notice, '          <ReportFooterCrossSell currentProductId="monthly-calendar" />')
else:
    import re
    tm = re.sub(r'<div className=\"bg-\[#1E3A5F\]/5 border border-\[#1E3A5F\]/20[\s\S]*?選購專屬項目。<\/p>\s*<\/div>', '<ReportFooterCrossSell currentProductId="monthly-calendar" />', tm)
with open("frontend/src/components/TwelveMonthsReportModal.tsx", "w", encoding="utf-8") as f:
    f.write(tm)

# 5. FiveElements
with open("frontend/src/components/FiveElementsReportModal.tsx", "r", encoding="utf-8") as f:
    fe = f.read()
fe = fe.replace("import { generateLocalFiveElementsReport } from '../utils/fiveElementsGuideLocal';", "import { generateLocalFiveElementsReport } from '../utils/fiveElementsGuideLocal';\nimport { ReportFooterCrossSell } from './ReportFooterCrossSell';")
fe = fe.replace("              {reportText}\n            </div>\n          </div>\n        </div>\n\n        {/* Footer Actions */}", "              {reportText}\n            </div>\n          </div>\n          <ReportFooterCrossSell currentProductId=\"five-elements\" />\n        </div>\n\n        {/* Footer Actions */}")
with open("frontend/src/components/FiveElementsReportModal.tsx", "w", encoding="utf-8") as f:
    f.write(fe)

print("✓ 5 大報告 Modal 精確注入完成！")

# 4. 前端打包編譯與推送
print("\n>>> [3/4] 正在執行 Vite 打包編譯 ...")
subprocess.run("cd frontend && npm run build", shell=True, check=True)

print("\n>>> [4/4] 提交並推送到 GitHub ...")
subprocess.run("git add -A", shell=True, check=True)
subprocess.run('git commit -m "feat: add contextual report footer recommendations (excluding self)"', shell=True, check=True)
subprocess.run("git push origin main", shell=True, check=True)
print("\n🎉 成功部署！所有報告頁腳均已呈現智慧延伸推薦。")
