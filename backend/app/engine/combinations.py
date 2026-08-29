"""
Stem and Branch Combinations, Clashes, Harmonies, Punishments, Harms, and Breaks.
"""

from .constants import (
    STEM_FIVE_COMBINATIONS,
    BRANCH_SIX_COMBINATIONS,
    BRANCH_THREE_HARMONIES,
    BRANCH_THREE_GATHERINGS,
    BRANCH_SIX_CLASHES,
    BRANCH_SIX_HARMS,
    BRANCH_BREAKS,
    BRANCH_PUNISHMENTS,
    STEM_PROPERTIES,
    ELEMENT_GENERATION,
    ELEMENT_RESTRICTION
)

def analyze_stem_relations(stems: list[str]) -> dict:
    """
    Analyze relations between 4 pillar stems (year, month, day, hour).
    Returns list of combinations and element interactions.
    """
    combinations = []
    interactions = []
    
    pillar_names = ["年干", "月干", "日干", "時干"]
    n = len(stems)
    
    for i in range(n):
        for j in range(i + 1, n):
            pair = frozenset([stems[i], stems[j]])
            if pair in STEM_FIVE_COMBINATIONS:
                info = STEM_FIVE_COMBINATIONS[pair]
                combinations.append({
                    "pillars": f"{pillar_names[i]}-{pillar_names[j]}",
                    "stems": f"{stems[i]}+{stems[j]}",
                    "name": info["name"],
                    "result_element": info["result"],
                    "status": "五合"
                })
            
            # 生剋關係
            elem_i = STEM_PROPERTIES[stems[i]]["element"]
            elem_j = STEM_PROPERTIES[stems[j]]["element"]
            if elem_i == elem_j:
                interactions.append({"pillars": f"{pillar_names[i]}-{pillar_names[j]}", "stems": f"{stems[i]}-{stems[j]}", "relation": "同類"})
            elif ELEMENT_GENERATION[elem_i] == elem_j:
                interactions.append({"pillars": f"{pillar_names[i]}生{pillar_names[j]}", "stems": f"{stems[i]}生{stems[j]}", "relation": "相生"})
            elif ELEMENT_GENERATION[elem_j] == elem_i:
                interactions.append({"pillars": f"{pillar_names[j]}生{pillar_names[i]}", "stems": f"{stems[j]}生{stems[i]}", "relation": "相生"})
            elif ELEMENT_RESTRICTION[elem_i] == elem_j:
                interactions.append({"pillars": f"{pillar_names[i]}剋{pillar_names[j]}", "stems": f"{stems[i]}剋{stems[j]}", "relation": "相剋"})
            elif ELEMENT_RESTRICTION[elem_j] == elem_i:
                interactions.append({"pillars": f"{pillar_names[j]}剋{pillar_names[i]}", "stems": f"{stems[j]}剋{stems[i]}", "relation": "相剋"})
                
    return {
        "combinations": combinations,
        "interactions": interactions
    }

def analyze_branch_relations(branches: list[str]) -> dict:
    """
    Analyze branch interactions (六合, 三合, 三會, 六沖, 刑, 害, 破).
    """
    pillar_names = ["年支", "月支", "日支", "時支"]
    n = len(branches)
    
    six_combinations = []
    three_harmonies = []
    three_gatherings = []
    clashes = []
    punishments = []
    harms = []
    breaks = []
    
    branch_set = set(branches)
    
    # 1. Branch Six Combinations & Clashes & Harms & Breaks (Pairwise)
    for i in range(n):
        for j in range(i + 1, n):
            pair = frozenset([branches[i], branches[j]])
            p_desc = f"{pillar_names[i]}-{pillar_names[j]} ({branches[i]}{branches[j]})"
            
            if pair in BRANCH_SIX_COMBINATIONS:
                info = BRANCH_SIX_COMBINATIONS[pair]
                six_combinations.append({
                    "pillars": p_desc,
                    "name": info["name"],
                    "result_element": info["result"]
                })
            
            if pair in BRANCH_SIX_CLASHES:
                clashes.append({
                    "pillars": p_desc,
                    "name": BRANCH_SIX_CLASHES[pair]
                })
                
            if pair in BRANCH_SIX_HARMS:
                harms.append({
                    "pillars": p_desc,
                    "name": BRANCH_SIX_HARMS[pair]
                })
                
            if pair in BRANCH_BREAKS:
                breaks.append({
                    "pillars": p_desc,
                    "name": BRANCH_BREAKS[pair]
                })
                
    # 2. Three Harmonies & Three Gatherings
    for tri_set, info in BRANCH_THREE_HARMONIES.items():
        if tri_set.issubset(branch_set):
            three_harmonies.append({
                "branches": list(tri_set),
                "name": info["name"],
                "result_element": info["result"],
                "type": "全三合"
            })
            
    for tri_set, info in BRANCH_THREE_GATHERINGS.items():
        if tri_set.issubset(branch_set):
            three_gatherings.append({
                "branches": list(tri_set),
                "name": info["name"],
                "result_element": info["result"],
                "type": "三會"
            })
            
    # 3. Punishments (刑)
    # Check San Xing
    for p_rule in BRANCH_PUNISHMENTS:
        req = p_rule["branches"]
        if p_rule.get("self"):
            branch_char = list(req)[0]
            if branches.count(branch_char) >= 2:
                punishments.append({"name": p_rule["name"], "branches": [branch_char, branch_char]})
        else:
            if req.issubset(branch_set):
                punishments.append({"name": p_rule["name"], "branches": list(req)})
                
    return {
        "six_combinations": six_combinations,
        "three_harmonies": three_harmonies,
        "three_gatherings": three_gatherings,
        "clashes": clashes,
        "punishments": punishments,
        "harms": harms,
        "breaks": breaks
    }
