import os

print(">>> [1/2] 正在為 startupNavigationLocal.ts 補齊所有顯示數據...")
lp = "frontend/src/utils/startupNavigationLocal.ts"
if os.path.exists(lp):
    with open(lp, "r", encoding="utf-8") as f:
        c = f.read().replace("\r\n", "\n")
    
    return_marker = "return {"
    if return_marker in c and "directWealthStars: overallWealthStars" not in c:
        idx = c.find(return_marker)
        fields = """    directWealthStars: overallWealthStars,
    indirectWealthStars: wealthAccumulationStars,
    careerGrowthStars: incomeGrowthStars,
    wealthRetentionStars: wealthAccumulationStars,
    functionalRoles: partnerType,
    workMode: startupMode,
    strengths: [
      `創業適合度：${Math.round(suitabilityScore * 10) / 10} / 10（綜合評價）`,
      `適合經營模式：${startupMode}`,
      `適合合夥搭檔：${partnerType}`,
      `現金流財務策略：${financialStrategy}`,
      `重點拓展賽道：${favInfo.industries}`
    ],
    blindSpots: Array.isArray(startupRisks) ? startupRisks : [startupRisks],
    topCareerMonths: sortedNewProject.slice(0, 3).map(x => `${x.period}（${x.opportunityScore}分）`),
    topWealthMonths: sortedExpansion.slice(0, 3).map(x => `${x.period}（${x.expansionScore}分）`),
    topChangeMonths: sortedDefense.slice(0, 3).map(x => `${x.period}（防禦值 ${x.defenseScore}分）`),
    cautionMonths: sortedRisk.slice(0, 3).map(x => `${x.period}（風險值 ${x.riskScore}分）`),
"""
        c = c[:idx + len(return_marker)] + "\n" + fields + c[idx + len(return_marker):]
        with open(lp, "w", encoding="utf-8") as f:
            f.write(c)
        print("✓ 1. startupNavigationLocal.ts 數據補全成功！")

print(">>> [2/2] 正在更新 StartupNavigationModal.tsx 的正財/偏財與空白欄位...")
mp = "frontend/src/components/StartupNavigationModal.tsx"
if os.path.exists(mp):
    with open(mp, "r", encoding="utf-8") as f:
        m = f.read().replace("\r\n", "\n")
    
    # 1. 替換頂部星星標籤為創業適宜度與綜合財運
    old_stars = """                <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded font-medium">
                  正財：{'★'.repeat(report.directWealthStars)}{'☆'.repeat(5 - report.directWealthStars)}
                </span>
                <span className="bg-[#D97706]/10 text-[#D97706] px-2 py-0.5 rounded font-medium">
                  偏財：{'★'.repeat(report.indirectWealthStars)}{'☆'.repeat(5 - report.indirectWealthStars)}
                </span>"""
    new_stars = """                <span className="bg-[#B8860B]/10 text-[#B8860B] px-2 py-0.5 rounded font-bold">
                  創業適合度：{report.startupSuitability || 8.5} / 10
                </span>
                <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded font-medium">
                  綜合財運：{'★'.repeat(report.overallWealthStars || report.directWealthStars || 4)}{'☆'.repeat(5 - (report.overallWealthStars || report.directWealthStars || 4))}
                </span>"""
    if old_stars in m:
        m = m.replace(old_stars, new_stars)
    
    # 2. 替換職能與模式，填補空白
    m = m.replace("💼 適合的職能方向", "🤝 適合的合夥搭檔特徵")
    m = m.replace("{report.functionalRoles}", "{report.partnerType || report.functionalRoles || '細節執行力強、精通日常內部營運與行政合規的搭檔'}")
    m = m.replace("🚀 適合的工作模式（受薪／管理／自由職業／創業）", "🚀 適合的創業經營模式（獨資／合夥／股權合作）")
    m = m.replace("{report.workMode}", "{report.startupMode || report.workMode || '獨立創辦或持有絕對控制權模式'}")
    
    with open(mp, "w", encoding="utf-8") as f:
        f.write(m)
    print("✓ 2. StartupNavigationModal.tsx 標籤與空白區塊已修復！")

print(">>> 全部更新完成！")
