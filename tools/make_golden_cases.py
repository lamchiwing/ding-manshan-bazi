#!/usr/bin/env python3
"""
產生 shared/golden_cases.json —— Python 與 TypeScript 引擎共用的黃金測試案例。

預期答案「不使用兩個引擎的任何程式碼」，而是用獨立的簡單規則推算：
  * 日柱：datetime.date.toordinal() + 常數，並以已知日柱錨點交叉驗證（2000-01-01=戊午、1949-10-01=甲子、2024-02-10=甲辰）
  * 年/月柱：只選用「距離節氣至少 1.5 天」的日期（每月 1 日必在節前，12 日必在節後；立春前取 2 月 2 日、後取 2 月 6 日），
    因此預期答案不依賴節氣的分鐘精度
  * 月干：五虎遁；時干：五鼠遁；大運：陽男陰女順行、陰男陽女逆行，首運 = 月柱順/逆推一位
節氣交接前後數十分鐘的案例放在 status="pending_reference"：需以香港天文台等權威時刻核對後才能升級為斷言。
"""
import json, os, datetime as dt
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
S = "甲乙丙丁戊己庚辛壬癸"; B = "子丑寅卯辰巳午未申酉戌亥"
def gz(n): return S[n % 10] + B[n % 12]
def idx(gan_zhi):                      # 干支 -> 0..59
    s, b = S.index(gan_zhi[0]), B.index(gan_zhi[1])
    return next(n for n in range(60) if n % 10 == s and n % 12 == b)

# ---- 日柱 ----
OFFSET = (54 - dt.date(2000, 1, 1).toordinal()) % 60
def day_idx(y, m, d): return (dt.date(y, m, d).toordinal() + OFFSET) % 60
assert gz(day_idx(2000, 1, 1)) == '戊午'
assert gz(day_idx(1949, 10, 1)) == '甲子', gz(day_idx(1949, 10, 1))      # 錨點 2
assert gz(day_idx(2024, 2, 10)) == '甲辰', gz(day_idx(2024, 2, 10))      # 錨點 3（春節）

TIGER = {'甲': '丙', '己': '丙', '乙': '戊', '庚': '戊', '丙': '庚', '辛': '庚', '丁': '壬', '壬': '壬', '戊': '甲', '癸': '甲'}
RAT   = {'甲': '甲', '己': '甲', '乙': '丙', '庚': '丙', '丙': '戊', '辛': '戊', '丁': '庚', '壬': '庚', '戊': '壬', '癸': '壬'}
MONTH_BRANCH_AFTER_JIE = {1:'丑',2:'寅',3:'卯',4:'辰',5:'巳',6:'午',7:'未',8:'申',9:'酉',10:'戌',11:'亥',12:'子'}

def month_branch(m, d, safe_before_jie):
    """safe_before_jie=True：該日在本月的節之前（取上一個月令）"""
    return MONTH_BRANCH_AFTER_JIE[(m - 2) % 12 + 1] if safe_before_jie else MONTH_BRANCH_AFTER_JIE[m]

def pillars(y, m, d, hh, mm, before_jie, before_lichun, late_zi_next_day=True):
    by = y - 1 if before_lichun else y
    ystem, ybr = S[(by - 4) % 10], B[(by - 4) % 12]
    mb = month_branch(m, d, before_jie)
    off = "寅卯辰巳午未申酉戌亥子丑".index(mb)
    mst = S[(S.index(TIGER[ystem]) + off) % 10]
    di = day_idx(y, m, d)
    dstem = S[di % 10]
    if hh == 23 and late_zi_next_day:
        hstem_src = S[(di + 1) % 10]; hb = '子'
    elif hh == 23 or hh == 0:
        hstem_src = dstem; hb = '子'
    else:
        hstem_src = dstem; hb = B[((hh * 60 + mm) + 60) // 120 % 12]
    hst = S[(S.index(RAT[hstem_src]) + B.index(hb)) % 10]
    return {'year': ystem+ybr, 'month': mst+mb, 'day': gz(di), 'hour': hst+hb}

def luck(p, gender):
    yang = S.index(p['year'][0]) % 2 == 0
    fwd = (gender == 'male') == yang
    n = idx(p['month']); return ('forward' if fwd else 'backward', gz(n + 1 if fwd else n - 1))

cases = []
def add(cid, date, time, gender, before_jie, before_lichun, status='asserted', note='', late_zi=True):
    y, m, d = map(int, date.split('-')); hh, mm = map(int, time.split(':'))
    p = pillars(y, m, d, hh, mm, before_jie, before_lichun, late_zi)
    direction, first = luck(p, gender)
    cases.append({'id': cid, 'birth_date': date, 'birth_time': time, 'gender': gender,
        'timezone': 'UTC+8 civil time (Beijing/HK)', 'zi_convention': 'late_zi_hour_uses_next_day_stem', 'true_solar_time': False,
        'expected': p, 'expected_luck': {'direction': direction, 'first_pillar': first}, 'status': status, 'note': note})

YEARS = [1949, 1984, 2000, 2024, 2025, 2026]
for i, y in enumerate(YEARS):
    for m in range(1, 13):
        g = 'male' if (i + m) % 2 == 0 else 'female'
        # 每月 1 日（節前）：Jan 1 屬上一個八字年的子月；Feb 1 屬上一個八字年的丑月
        add(f'm{m:02d}d01-{y}', f'{y}-{m:02d}-01', '12:00', g, True, m <= 2, note='月初（節前）')
        # 每月 12 日（節後）：Feb 12 已過立春
        add(f'm{m:02d}d12-{y}', f'{y}-{m:02d}-12', '12:00', g, False, m == 1, note='月中（節後）；1 月 12 日雖過小寒但仍在立春前，屬上一個八字年')
    # 舊 bug 的高風險窗口：小寒～立春之間
    add(f'jan08-{y}', f'{y}-01-08', '09:30', 'male', False, True, note='小寒後、立春前')
    add(f'jan20-{y}', f'{y}-01-20', '18:10', 'female', False, True, note='小寒後、立春前')
    add(f'feb02-{y}', f'{y}-02-02', '23:20', 'male', True, True, note='立春前 1.5 天以上，月令仍是丑月；晚子時')
    add(f'feb06-{y}', f'{y}-02-06', '00:20', 'female', False, False, note='立春後；早子時')

# 子時／時辰邊界（日期取 5 月 20 日：離節氣遠）
for t in ['22:59', '23:00', '23:30', '23:59', '00:00', '00:30', '00:59', '01:00', '12:59', '13:00']:
    add(f'zi-2024-05-20-{t}', '2024-05-20', t, 'male', False, False, note='時辰邊界；晚子時日柱不變、時干用次日')

# 節氣前後分鐘級（尚未有權威時刻，只供參考，不作斷言）
PENDING = [
  ('lichun-2024-before', '2024-02-04', '16:20', 'male', True, True), ('lichun-2024-after', '2024-02-04', '16:35', 'male', False, False),
  ('lichun-2023-before', '2023-02-04', '10:30', 'male', True, True), ('lichun-2023-after',  '2023-02-04', '10:55', 'male', False, False),
  ('lichun-2025-before', '2025-02-03', '22:00', 'male', True, True), ('lichun-2025-after',  '2025-02-03', '22:20', 'male', False, False),
  ('jingzhe-2024-before', '2024-03-05', '04:00', 'male', True, False), ('jingzhe-2024-after', '2024-03-05', '04:45', 'male', False, False),
]
for cid, d, t, g, bj, bl in PENDING:
    add(cid, d, t, g, bj, bl, status='pending_reference', note='需用香港天文台/紫金山天文台公佈的節氣時刻核對，現不作斷言')

out = {'meta': {'version': '0.1-draft', 'oracle': 'tools/make_golden_cases.py (independent of engines)',
        'anchors_verified': ['2000-01-01=戊午', '1949-10-01=甲子', '2024-02-10=甲辰'],
        'counts': {'asserted': sum(c['status']=='asserted' for c in cases), 'pending_reference': sum(c['status']=='pending_reference' for c in cases)}},
       'cases': cases}
json.dump(out, open(os.path.join(ROOT, 'shared', 'golden_cases.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(out['meta']['counts'])
