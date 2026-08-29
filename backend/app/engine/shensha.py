"""
Shen Sha (神煞) Calculation Module
Deterministic lookup of all auspicious and ominous stars across pillars.
"""

def calculate_shen_sha(year_stem: str, year_branch: str, month_branch: str, day_stem: str, day_branch: str, hour_branch: str) -> dict:
    """
    Calculate active Shen Sha in the 4 pillars.
    """
    all_branches = [
        ("年柱", year_branch),
        ("月柱", month_branch),
        ("日柱", day_branch),
        ("時柱", hour_branch),
    ]
    all_stems = [
        ("年柱", year_stem),
        ("日柱", day_stem),
    ]

    detected = []

    # 1. 天乙貴人 (Based on Day Stem & Year Stem)
    tian_yi_map = {
        "甲": ["丑", "未"], "戊": ["丑", "未"], "庚": ["丑", "未"],
        "乙": ["子", "申"], "己": ["子", "申"],
        "丙": ["亥", "酉"], "丁": ["亥", "酉"],
        "壬": ["卯", "巳"], "癸": ["卯", "巳"],
        "辛": ["午", "寅"],
    }
    for stem_name, stem in [("日主", day_stem), ("年干", year_stem)]:
        if stem in tian_yi_map:
            targets = tian_yi_map[stem]
            for p_name, b in all_branches:
                if b in targets:
                    detected.append({"name": "天乙貴人", "pillar": p_name, "source": f"{stem_name}{stem}見{b}", "type": "吉神"})

    # 2. 文昌貴人 (Based on Day Stem)
    wen_chang_map = {
        "甲": "巳", "乙": "午", "丙": "申", "丁": "酉", "戊": "申",
        "己": "酉", "庚": "亥", "辛": "子", "壬": "寅", "癸": "卯"
    }
    if day_stem in wen_chang_map:
        target = wen_chang_map[day_stem]
        for p_name, b in all_branches:
            if b == target:
                detected.append({"name": "文昌貴人", "pillar": p_name, "source": f"日干{day_stem}見{b}", "type": "吉神"})

    # 3. 桃花 (Based on Year Branch and Day Branch)
    taohua_map = {
        "申": "酉", "子": "酉", "辰": "酉",
        "寅": "卯", "午": "卯", "戌": "卯",
        "巳": "午", "酉": "午", "丑": "午",
        "亥": "子", "卯": "子", "未": "子",
    }
    for ref_name, ref_b in [("年支", year_branch), ("日支", day_branch)]:
        if ref_b in taohua_map:
            target = taohua_map[ref_b]
            for p_name, b in all_branches:
                if b == target:
                    detected.append({"name": "桃花", "pillar": p_name, "source": f"{ref_name}{ref_b}見{b}", "type": "神煞"})

    # 4. 驛馬 (Based on Year/Day Branch)
    yima_map = {
        "申": "寅", "子": "寅", "辰": "寅",
        "寅": "申", "午": "申", "戌": "申",
        "巳": "亥", "酉": "亥", "丑": "亥",
        "亥": "巳", "卯": "巳", "未": "巳",
    }
    for ref_name, ref_b in [("年支", year_branch), ("日支", day_branch)]:
        if ref_b in yima_map:
            target = yima_map[ref_b]
            for p_name, b in all_branches:
                if b == target:
                    detected.append({"name": "驛馬", "pillar": p_name, "source": f"{ref_name}{ref_b}見{b}", "type": "神煞"})

    # 5. 華蓋 (Based on Year/Day Branch)
    huagai_map = {
        "申": "辰", "子": "辰", "辰": "辰",
        "寅": "戌", "午": "戌", "戌": "戌",
        "巳": "丑", "酉": "丑", "丑": "丑",
        "亥": "未", "卯": "未", "未": "未",
    }
    for ref_name, ref_b in [("年支", year_branch), ("日支", day_branch)]:
        if ref_b in huagai_map:
            target = huagai_map[ref_b]
            for p_name, b in all_branches:
                if b == target and (ref_name != "日支" or p_name != "日柱"):
                    detected.append({"name": "華蓋", "pillar": p_name, "source": f"{ref_name}{ref_b}見{b}", "type": "吉神"})

    # 6. 將星 (Based on Year/Day Branch)
    jiangxing_map = {
        "申": "子", "子": "子", "辰": "子",
        "寅": "午", "午": "午", "戌": "午",
        "巳": "酉", "酉": "酉", "丑": "酉",
        "亥": "卯", "卯": "卯", "未": "卯",
    }
    for ref_name, ref_b in [("年支", year_branch), ("日支", day_branch)]:
        if ref_b in jiangxing_map:
            target = jiangxing_map[ref_b]
            for p_name, b in all_branches:
                if b == target:
                    detected.append({"name": "將星", "pillar": p_name, "source": f"{ref_name}{ref_b}見{b}", "type": "吉神"})

    # 7. 太極貴人 (Day Stem)
    taiji_map = {
        "甲": ["子", "午"], "乙": ["子", "午"],
        "丙": ["卯", "酉"], "丁": ["卯", "酉"],
        "戊": ["辰", "戌", "丑", "未"], "己": ["辰", "戌", "丑", "未"],
        "庚": ["寅", "亥"], "辛": ["寅", "亥"],
        "壬": ["巳", "申"], "癸": ["巳", "申"],
    }
    if day_stem in taiji_map:
        for p_name, b in all_branches:
            if b in taiji_map[day_stem]:
                detected.append({"name": "太極貴人", "pillar": p_name, "source": f"日干{day_stem}見{b}", "type": "吉神"})

    # 8. 福星貴人 (Day Stem)
    fuxing_map = {
        "甲": "寅", "乙": "丑", "丙": "子", "丁": "酉", "戊": "申",
        "己": "未", "庚": "午", "辛": "巳", "壬": "辰", "癸": "卯"
    }
    if day_stem in fuxing_map:
        target = fuxing_map[day_stem]
        for p_name, b in all_branches:
            if b == target:
                detected.append({"name": "福星貴人", "pillar": p_name, "source": f"日干{day_stem}見{b}", "type": "吉神"})

    # 9. 國印貴人 (Day Stem)
    guoyin_map = {
        "甲": "戌", "乙": "亥", "丙": "丑", "丁": "寅", "戊": "丑",
        "己": "寅", "庚": "辰", "辛": "巳", "壬": "未", "癸": "申"
    }
    if day_stem in guoyin_map:
        target = guoyin_map[day_stem]
        for p_name, b in all_branches:
            if b == target:
                detected.append({"name": "國印貴人", "pillar": p_name, "source": f"日干{day_stem}見{b}", "type": "吉神"})

    # 10. 金輿 (Day Stem)
    jinyu_map = {
        "甲": "辰", "乙": "巳", "丙": "未", "丁": "申", "戊": "未",
        "己": "申", "庚": "戌", "辛": "亥", "壬": "丑", "癸": "寅"
    }
    if day_stem in jinyu_map:
        target = jinyu_map[day_stem]
        for p_name, b in all_branches:
            if b == target:
                detected.append({"name": "金輿", "pillar": p_name, "source": f"日干{day_stem}見{b}", "type": "吉神"})

    # 11. 天德貴人 & 月德貴人 (Month Branch)
    tiande_map = {
        "寅": "丁", "卯": "申", "辰": "壬", "巳": "辛",
        "午": "亥", "未": "甲", "申": "癸", "酉": "寅",
        "戌": "丙", "亥": "乙", "子": "巳", "丑": "庚"
    }
    yuede_map = {
        "寅": "丙", "午": "丙", "戌": "丙",
        "申": "壬", "子": "壬", "辰": "壬",
        "亥": "甲", "卯": "甲", "未": "甲",
        "巳": "庚", "酉": "庚", "丑": "庚",
    }
    if month_branch in tiande_map:
        t_val = tiande_map[month_branch]
        # check stems and branches
        for p_name, s in [("年柱", year_stem), ("日柱", day_stem)]:
            if s == t_val:
                detected.append({"name": "天德貴人", "pillar": p_name, "source": f"月支{month_branch}見{s}", "type": "吉神"})
    if month_branch in yuede_map:
        y_val = yuede_map[month_branch]
        for p_name, s in [("年柱", year_stem), ("日柱", day_stem)]:
            if s == y_val:
                detected.append({"name": "月德貴人", "pillar": p_name, "source": f"月支{month_branch}見{s}", "type": "吉神"})

    # 12. 紅鸞 / 天喜 (Year Branch)
    hongluan_map = {
        "子": "卯", "丑": "寅", "寅": "丑", "卯": "子",
        "辰": "亥", "巳": "戌", "午": "酉", "未": "申",
        "申": "未", "酉": "午", "戌": "巳", "亥": "辰"
    }
    tianxi_map = {
        "子": "酉", "丑": "申", "寅": "未", "卯": "午",
        "辰": "巳", "巳": "辰", "午": "卯", "未": "寅",
        "申": "丑", "酉": "子", "戌": "亥", "亥": "戌"
    }
    if year_branch in hongluan_map:
        target = hongluan_map[year_branch]
        for p_name, b in all_branches:
            if b == target:
                detected.append({"name": "紅鸞", "pillar": p_name, "source": f"年支{year_branch}見{b}", "type": "吉神"})
    if year_branch in tianxi_map:
        target = tianxi_map[year_branch]
        for p_name, b in all_branches:
            if b == target:
                detected.append({"name": "天喜", "pillar": p_name, "source": f"年支{year_branch}見{b}", "type": "吉神"})

    # 13. 孤辰 / 寡宿 (Year Branch)
    guchen_map = {
        "亥": "寅", "子": "寅", "丑": "寅",
        "寅": "巳", "卯": "巳", "辰": "巳",
        "巳": "申", "午": "申", "未": "申",
        "申": "亥", "酉": "亥", "戌": "亥"
    }
    guasu_map = {
        "亥": "戌", "子": "戌", "丑": "戌",
        "寅": "丑", "卯": "丑", "辰": "丑",
        "巳": "辰", "午": "辰", "未": "辰",
        "申": "未", "酉": "未", "戌": "未"
    }
    if year_branch in guchen_map:
        target = guchen_map[year_branch]
        for p_name, b in all_branches:
            if b == target:
                detected.append({"name": "孤辰", "pillar": p_name, "source": f"年支{year_branch}見{b}", "type": "凶煞"})
    if year_branch in guasu_map:
        target = guasu_map[year_branch]
        for p_name, b in all_branches:
            if b == target:
                detected.append({"name": "寡宿", "pillar": p_name, "source": f"年支{year_branch}見{b}", "type": "凶煞"})

    # 14. 亡神 / 劫煞 / 災煞 (Year/Day Branch)
    wangshen_map = {
        "申": "亥", "子": "亥", "辰": "亥",
        "寅": "巳", "午": "巳", "戌": "巳",
        "巳": "申", "酉": "申", "丑": "申",
        "亥": "寅", "卯": "寅", "未": "寅"
    }
    jiesha_map = {
        "申": "巳", "子": "巳", "辰": "巳",
        "寅": "亥", "午": "亥", "戌": "亥",
        "巳": "寅", "酉": "寅", "丑": "寅",
        "亥": "申", "卯": "申", "未": "申"
    }
    zaisha_map = {
        "申": "午", "子": "午", "辰": "午",
        "寅": "子", "午": "子", "戌": "子",
        "巳": "卯", "酉": "卯", "丑": "卯",
        "亥": "酉", "卯": "酉", "未": "酉"
    }
    for ref_name, ref_b in [("年支", year_branch), ("日支", day_branch)]:
        if ref_b in wangshen_map:
            t = wangshen_map[ref_b]
            for p_name, b in all_branches:
                if b == t:
                    detected.append({"name": "亡神", "pillar": p_name, "source": f"{ref_name}{ref_b}見{b}", "type": "凶煞"})
        if ref_b in jiesha_map:
            t = jiesha_map[ref_b]
            for p_name, b in all_branches:
                if b == t:
                    detected.append({"name": "劫煞", "pillar": p_name, "source": f"{ref_name}{ref_b}見{b}", "type": "凶煞"})
        if ref_b in zaisha_map:
            t = zaisha_map[ref_b]
            for p_name, b in all_branches:
                if b == t:
                    detected.append({"name": "災煞", "pillar": p_name, "source": f"{ref_name}{ref_b}見{b}", "type": "凶煞"})

    # 15. 白虎
    baihu_map = {
        "申": "辰", "子": "辰", "辰": "辰",
        "寅": "戌", "午": "戌", "戌": "戌",
        "巳": "丑", "酉": "丑", "丑": "丑",
        "亥": "未", "卯": "未", "未": "未"
    }
    if year_branch in baihu_map:
        t = baihu_map[year_branch]
        for p_name, b in all_branches:
            if b == t and p_name != "年柱":
                detected.append({"name": "白虎", "pillar": p_name, "source": f"年支{year_branch}見{b}", "type": "凶煞"})

    return {"list": detected}
