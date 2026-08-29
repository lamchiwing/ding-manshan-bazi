"""
Bazi Engine Constants and Reference Tables
Deterministic Lookups for Stems, Branches, Hidden Stems, Five Elements, Ten Gods, Changsheng, Relations & Shen Sha.
"""

STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"]
BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"]

# Stem Properties: (Yin/Yang, Element)
STEM_PROPERTIES = {
    "甲": {"yin_yang": "陽", "element": "木", "index": 0},
    "乙": {"yin_yang": "陰", "element": "木", "index": 1},
    "丙": {"yin_yang": "陽", "element": "火", "index": 2},
    "丁": {"yin_yang": "陰", "element": "火", "index": 3},
    "戊": {"yin_yang": "陽", "element": "土", "index": 4},
    "己": {"yin_yang": "陰", "element": "土", "index": 5},
    "庚": {"yin_yang": "陽", "element": "金", "index": 6},
    "辛": {"yin_yang": "陰", "element": "金", "index": 7},
    "壬": {"yin_yang": "陽", "element": "水", "index": 8},
    "癸": {"yin_yang": "陰", "element": "水", "index": 9},
}

# Branch Properties: (Yin/Yang, Element)
BRANCH_PROPERTIES = {
    "子": {"yin_yang": "陽", "element": "水", "index": 0},
    "丑": {"yin_yang": "陰", "element": "土", "index": 1},
    "寅": {"yin_yang": "陽", "element": "木", "index": 2},
    "卯": {"yin_yang": "陰", "element": "木", "index": 3},
    "辰": {"yin_yang": "陽", "element": "土", "index": 4},
    "巳": {"yin_yang": "陰", "element": "火", "index": 5},
    "午": {"yin_yang": "陽", "element": "火", "index": 6},
    "未": {"yin_yang": "陰", "element": "土", "index": 7},
    "申": {"yin_yang": "陽", "element": "金", "index": 8},
    "酉": {"yin_yang": "陰", "element": "金", "index": 9},
    "戌": {"yin_yang": "陽", "element": "土", "index": 10},
    "亥": {"yin_yang": "陰", "element": "水", "index": 11},
}

# Hidden Stems in Branches: [ (stem, position: main/middle/residual, weight) ]
HIDDEN_STEMS = {
    "子": [("癸", "main", 1.0)],
    "丑": [("己", "main", 0.6), ("癸", "middle", 0.3), ("辛", "residual", 0.1)],
    "寅": [("甲", "main", 0.6), ("丙", "middle", 0.3), ("戊", "residual", 0.1)],
    "卯": [("乙", "main", 1.0)],
    "辰": [("戊", "main", 0.6), ("乙", "middle", 0.3), ("癸", "residual", 0.1)],
    "巳": [("丙", "main", 0.6), ("庚", "middle", 0.3), ("戊", "residual", 0.1)],
    "午": [("丁", "main", 0.7), ("己", "middle", 0.3)],
    "未": [("己", "main", 0.6), ("丁", "middle", 0.3), ("乙", "residual", 0.1)],
    "申": [("庚", "main", 0.6), ("壬", "middle", 0.3), ("戊", "residual", 0.1)],
    "酉": [("辛", "main", 1.0)],
    "戌": [("戊", "main", 0.6), ("辛", "middle", 0.3), ("丁", "residual", 0.1)],
    "亥": [("壬", "main", 0.7), ("甲", "middle", 0.3)],
}

# Five Elements Relationships
ELEMENT_GENERATION = {
    "木": "火", "火": "土", "土": "金", "金": "水", "水": "木"
}

ELEMENT_RESTRICTION = {
    "木": "土", "土": "水", "水": "火", "火": "金", "金": "木"
}

# Five Tiger Rule (五虎遁): Year Stem -> Month Stem starting from Yin (寅)
FIVE_TIGER_BASE = {
    "甲": "丙", "己": "丙",
    "乙": "戊", "庚": "戊",
    "丙": "庚", "辛": "庚",
    "丁": "壬", "壬": "壬",
    "戊": "甲", "癸": "甲",
}

# Five Rat Rule (五鼠遁): Day Stem -> Hour Stem starting from Zi (子)
FIVE_RAT_BASE = {
    "甲": "甲", "己": "甲",
    "乙": "丙", "庚": "丙",
    "丙": "戊", "辛": "戊",
    "丁": "庚", "壬": "庚",
    "戊": "壬", "癸": "壬",
}

# 12 Changsheng (十二長生) Order
CHANGSHENG_STAGES = ["長生", "沐浴", "冠帶", "臨官", "帝旺", "衰", "病", "死", "墓", "絕", "胎", "養"]

# Starting branch for Changsheng for each Day Stem (Yang forward, Yin backward)
CHANGSHENG_STARTS = {
    "甲": ("亥", 1),   # Yang wood starts at Hai, forward
    "乙": ("午", -1),  # Yin wood starts at Wu, backward
    "丙": ("寅", 1),   # Yang fire starts at Yin, forward
    "丁": ("酉", -1),  # Yin fire starts at You, backward
    "戊": ("寅", 1),   # Yang earth starts at Yin, forward
    "己": ("酉", -1),  # Yin earth starts at You, backward
    "庚": ("巳", 1),   # Yang metal starts at Si, forward
    "辛": ("子", -1),  # Yin metal starts at Zi, backward
    "壬": ("申", 1),   # Yang water starts at Shen, forward
    "癸": ("卯", -1),  # Yin water starts at Mao, backward
}

# Stem Five Combinations (天干五合)
STEM_FIVE_COMBINATIONS = {
    frozenset(["甲", "己"]): {"name": "甲己合", "result": "土"},
    frozenset(["乙", "庚"]): {"name": "乙庚合", "result": "金"},
    frozenset(["丙", "辛"]): {"name": "丙辛合", "result": "水"},
    frozenset(["丁", "壬"]): {"name": "丁壬合", "result": "木"},
    frozenset(["戊", "癸"]): {"name": "戊癸合", "result": "火"},
}

# Branch Six Combinations (地支六合)
BRANCH_SIX_COMBINATIONS = {
    frozenset(["子", "丑"]): {"name": "子丑六合", "result": "土"},
    frozenset(["寅", "亥"]): {"name": "寅亥六合", "result": "木"},
    frozenset(["卯", "戌"]): {"name": "卯戌六合", "result": "火"},
    frozenset(["辰", "酉"]): {"name": "辰酉六合", "result": "金"},
    frozenset(["巳", "申"]): {"name": "巳申六合", "result": "水"},
    frozenset(["午", "未"]): {"name": "午未六合", "result": "日月/火土"},
}

# Branch Three Harmonies (三合)
BRANCH_THREE_HARMONIES = {
    frozenset(["申", "子", "辰"]): {"name": "申子辰三合水局", "result": "水"},
    frozenset(["亥", "卯", "未"]): {"name": "亥卯未三合木局", "result": "木"},
    frozenset(["寅", "午", "戌"]): {"name": "寅午戌三合火局", "result": "火"},
    frozenset(["巳", "酉", "丑"]): {"name": "巳酉丑三合金局", "result": "金"},
}

# Branch Three Gatherings (三會)
BRANCH_THREE_GATHERINGS = {
    frozenset(["寅", "卯", "辰"]): {"name": "寅卯辰三會東方木", "result": "木"},
    frozenset(["巳", "午", "未"]): {"name": "巳午未三會南方火", "result": "火"},
    frozenset(["申", "酉", "戌"]): {"name": "申酉戌三會西方金", "result": "金"},
    frozenset(["亥", "子", "丑"]): {"name": "亥子丑三會北方水", "result": "水"},
}

# Branch Six Clashes (六沖)
BRANCH_SIX_CLASHES = {
    frozenset(["子", "午"]): "子午相沖",
    frozenset(["丑", "未"]): "丑未相沖",
    frozenset(["寅", "申"]): "寅申相沖",
    frozenset(["卯", "酉"]): "卯酉相沖",
    frozenset(["辰", "戌"]): "辰戌相沖",
    frozenset(["巳", "亥"]): "巳亥相沖",
}

# Branch Harms (六害)
BRANCH_SIX_HARMS = {
    frozenset(["子", "未"]): "子未相害",
    frozenset(["丑", "午"]): "丑午相害",
    frozenset(["寅", "巳"]): "寅巳相害",
    frozenset(["卯", "辰"]): "卯辰相害",
    frozenset(["申", "亥"]): "申亥相害",
    frozenset(["酉", "戌"]): "酉戌相害",
}

# Branch Breaks (相破)
BRANCH_BREAKS = {
    frozenset(["子", "酉"]): "子酉相破",
    frozenset(["丑", "辰"]): "丑辰相破",
    frozenset(["寅", "亥"]): "寅亥相破",
    frozenset(["卯", "午"]): "卯午相破",
    frozenset(["巳", "申"]): "巳申相破",
    frozenset(["未", "戌"]): "未戌相破",
}

# Branch Punishments (相刑)
BRANCH_PUNISHMENTS = [
    {"branches": frozenset(["寅", "巳", "申"]), "name": "寅巳申無恩之刑"},
    {"branches": frozenset(["丑", "戌", "未"]), "name": "丑戌未持勢之刑"},
    {"branches": frozenset(["子", "卯"]), "name": "子卯無禮之刑"},
    {"branches": frozenset(["辰"]), "name": "辰辰自刑", "self": True},
    {"branches": frozenset(["午"]), "name": "午午自刑", "self": True},
    {"branches": frozenset(["酉"]), "name": "酉酉自刑", "self": True},
    {"branches": frozenset(["亥"]), "name": "亥亥自刑", "self": True},
]
