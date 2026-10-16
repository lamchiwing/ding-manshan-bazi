import os

print(">>> [1/2] 修復 startupNavigationLocal.ts ...")
lp = "frontend/src/utils/startupNavigationLocal.ts"
if os.path.exists(lp):
    with open(lp, "r", encoding="utf-8") as f:
        c = f.read().replace("\r\n", "\n")
    if "jobChangeScore: defScore" not in c:
        c = c.replace(
            "actionStrategy: strategy,\n      advice",
            "actionStrategy: strategy,\n      careerScore: oppScore,\n      wealthScore: wealthScore,\n      promotionScore: expScore,\n      jobChangeScore: defScore,\n      changeJobScore: defScore,\n      advice"
        )
        c = c.replace(
            "favorableEnvironment: favInfo.environment,\n    matrix\n  };",
            "favorableEnvironment: favInfo.environment,\n    matrix,\n    directWealthStars: overallWealthStars,\n    indirectWealthStars: wealthAccumulationStars,\n    careerGrowthStars: incomeGrowthStars,\n    wealthRetentionStars: wealthAccumulationStars,\n    topCareerMonths: sortedNewProject.slice(0, 3).map(x => `${x.period}（${x.opportunityScore}分）`),\n    topWealthMonths: sortedExpansion.slice(0, 3).map(x => `${x.period}（${x.expansionScore}分）`),\n    topChangeMonths: sortedDefense.slice(0, 3).map(x => `${x.period}（防禦值 ${x.defenseScore}分）`),\n    cautionMonths: sortedRisk.slice(0, 3).map(x => `${x.period}（風險值 ${x.riskScore}分）`),\n    strengths: [\n      `創業適宜指數：${Math.round(suitabilityScore * 10) / 10} / 10（綜合評估）`,\n      `最佳經營模式：${startupMode}`,\n      `合夥賦能搭檔：${partnerType}`,\n      `重點拓展賽道：${favInfo.industries}`\n    ],\n    blindSpots: startupRisks,\n    functionalRoles: startupMode,\n    workMode: startupMode,\n    workplaceAdvice: financialStrategy\n  };"
        )
        with open(lp, "w", encoding="utf-8") as f:
            f.write(c)
        print("✓ 1. startupNavigationLocal.ts 相容欄位注入成功！")

print(">>> [2/2] 修復 StartupNavigationModal.tsx 並加入防崩潰保護 ...")
mp = "frontend/src/components/StartupNavigationModal.tsx"
if os.path.exists(mp):
    with open(mp, "r", encoding="utf-8") as f:
        m = f.read().replace("\r\n", "\n")
    m = m.replace("事業／財運・未來36個月", "創業／拓展・未來36個月")
    m = m.replace("命主事業格局", "命主創業格局")
    m = m.replace("HK$188", "HK$288")
    m = m.replace("事業核心競爭優勢", "創業核心優勢")
    m = m.replace("事業發展盲點與提醒", "創業風險與防範提醒")
    # 加入雙重安全保護，確保即使資料欄位有空值也絕不拋錯黑屏
    m = m.replace("report.topCareerMonths.join", "(report.topCareerMonths || []).join")
    m = m.replace("report.topWealthMonths.join", "(report.topWealthMonths || []).join")
    m = m.replace("report.topChangeMonths.join", "(report.topChangeMonths || []).join")
    m = m.replace("report.cautionMonths.join", "(report.cautionMonths || []).join")
    m = m.replace("report.strengths.map", "(report.strengths || []).map")
    m = m.replace("report.blindSpots.map", "(report.blindSpots || []).map")
    with open(mp, "w", encoding="utf-8") as f:
        f.write(m)
    print("✓ 2. StartupNavigationModal.tsx 防黑屏保護已啟動！")

print(">>> 全部修復完成！")
