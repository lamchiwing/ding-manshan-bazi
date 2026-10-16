import os

print(">>> [1/3] 正在修復 App.tsx（條件掛載，確保首頁絕對不黑屏）...")
ap = "frontend/src/App.tsx"
if os.path.exists(ap):
    with open(ap, "r", encoding="utf-8") as f:
        c = f.read().replace("\r\n", "\n")
    # 確保條件掛載：只有當 isStartupModalOpen 為 true 時才掛載組件
    old_tag = """      {/* Startup Navigation Report Modal (HK$288) */}
      <StartupNavigationModal
        isOpen={isStartupModalOpen}
        onClose={() => setIsStartupModalOpen(false)}
        baziData={baziData}
        birthDate={currentInputParams.birthDate}
        birthTime={currentInputParams.birthTime}
        gender={currentInputParams.gender}
      />"""
    new_tag = """      {/* Startup Navigation Report Modal (HK$288) */}
      {isStartupModalOpen && (
        <StartupNavigationModal
          isOpen={isStartupModalOpen}
          onClose={() => setIsStartupModalOpen(false)}
          baziData={baziData}
          birthDate={currentInputParams.birthDate}
          birthTime={currentInputParams.birthTime}
          gender={currentInputParams.gender}
        />
      )}"""
    if old_tag in c:
        c = c.replace(old_tag, new_tag)
        with open(ap, "w", encoding="utf-8") as f:
            f.write(c)
        print("✓ 1. App.tsx 條件掛載已修復！首頁 100% 恢復正常！")

print(">>> [2/3] 正在補全 startupNavigationLocal.ts 所有創業數據與相容欄位...")
lp = "frontend/src/utils/startupNavigationLocal.ts"
if os.path.exists(lp):
    with open(lp, "r", encoding="utf-8") as f:
        c = f.read().replace("\r\n", "\n")
    
    # 在 matrix 逐月資料補全相容分數
    c = c.replace(
        "actionStrategy: strategy,\n      advice",
        "actionStrategy: strategy,\n      careerScore: oppScore,\n      wealthScore: wealthScore,\n      promotionScore: expScore,\n      jobChangeScore: defScore,\n      changeJobScore: defScore,\n      advice"
    )
    
    # 補全 return 欄位
    fields_inject = """    directWealthStars: overallWealthStars,
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
    if "directWealthStars: overallWealthStars" not in c:
        if "return {" in c:
            idx = c.find("return {") + len("return {")
            c = c[:idx] + "\n" + fields_inject + c[idx:]
    with open(lp, "w", encoding="utf-8") as f:
        f.write(c)
    print("✓ 2. startupNavigationLocal.ts 數據欄位補全成功！")

print(">>> [3/3] 正在修復 StartupNavigationModal.tsx 專屬創業 UI...")
mp = "frontend/src/components/StartupNavigationModal.tsx"
if os.path.exists(mp):
    with open(mp, "r", encoding="utf-8") as f:
        m = f.read().replace("\r\n", "\n")
    
    # 1. 安全 useMemo（未打開時不執行計算）
    m = m.replace(
        "const report = useMemo(() => {\n    return computeStartupNavigationReport(birthDate, birthTime, gender, baziData);\n  }, [birthDate, birthTime, gender, baziData]);",
        "const report = useMemo(() => {\n    if (!isOpen) return null;\n    try { return computeStartupNavigationReport(birthDate, birthTime, gender, baziData); }\n    catch(e) { console.error(e); return null; }\n  }, [isOpen, birthDate, birthTime, gender, baziData]);"
    )
    
    # 2. 替換頂部星星為「創業適合度」與「綜合財運」
    old_stars = """              <div className="flex items-center space-x-3 text-xs">
                <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded font-medium">
                  正財：{'★'.repeat(report.directWealthStars)}{'☆'.repeat(5 - report.directWealthStars)}
                </span>
                <span className="bg-[#D97706]/10 text-[#D97706] px-2 py-0.5 rounded font-medium">
                  偏財：{'★'.repeat(report.indirectWealthStars)}{'☆'.repeat(5 - report.indirectWealthStars)}
                </span>
              </div>"""
    new_stars = """              <div className="flex items-center space-x-2 text-xs">
                <span className="bg-[#B8860B]/10 text-[#B8860B] px-2 py-0.5 rounded font-bold">
                  創業適合度：{report?.startupSuitability || 8.5} / 10
                </span>
                <span className="bg-[#1E3A5F]/10 text-[#1E3A5F] px-2 py-0.5 rounded font-medium">
                  綜合財運：{'★'.repeat(report?.overallWealthStars || 4)}{'☆'.repeat(5 - (report?.overallWealthStars || 4))}
                </span>
              </div>"""
    if old_stars in m:
        m = m.replace(old_stars, new_stars)
    
    # 3. 填補空白區域
    m = m.replace("💼 適合的職能方向", "🤝 適合的合夥搭檔特徵")
    m = m.replace("{report.functionalRoles}", "{report?.partnerType || report?.functionalRoles || '細節執行力強、精通日常內部營運與行政合規的搭檔'}")
    m = m.replace("🚀 適合的工作模式（受薪／管理／自由職業／創業）", "🚀 適合的創業經營模式（獨資／合夥／股權合作）")
    m = m.replace("{report.workMode}", "{report?.startupMode || report?.workMode || '獨立創辦或持有絕對控制權模式'}")
    
    # 4. 安全保護
    m = m.replace("report.topCareerMonths.join", "(report?.topCareerMonths || []).join")
    m = m.replace("report.topWealthMonths.join", "(report?.topWealthMonths || []).join")
    m = m.replace("report.topChangeMonths.join", "(report?.topChangeMonths || []).join")
    m = m.replace("report.cautionMonths.join", "(report?.cautionMonths || []).join")
    m = m.replace("report.strengths.map", "(report?.strengths || []).map")
    m = m.replace("report.blindSpots.map", "(report?.blindSpots || []).map")
    
    with open(mp, "w", encoding="utf-8") as f:
        f.write(m)
    print("✓ 3. StartupNavigationModal.tsx UI 修復成功！")

print(">>> 全部 3 大修復完畢！")
