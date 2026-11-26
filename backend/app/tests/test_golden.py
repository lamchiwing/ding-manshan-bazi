"""黃金測試：Python 引擎對照 shared/golden_cases.json（獨立推算的預期答案）。
執行（在 backend/ 目錄）：python -m unittest app.tests.test_golden -v"""
import json, os, unittest
from app.engine.bazi_calculator import calculate_bazi

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DATA = json.load(open(os.path.join(ROOT, 'shared', 'golden_cases.json'), encoding='utf-8'))

class GoldenPillars(unittest.TestCase):
    def test_asserted_cases(self):
        failures = []
        for c in DATA['cases']:
            if c['status'] != 'asserted':
                continue
            r = calculate_bazi(c['birth_date'], c['birth_time'], c['gender'])
            got = {k: r['pillars'][k]['gan_zhi'] for k in ('year', 'month', 'day', 'hour')}
            first = r['luck_cycles'][0]['gan_zhi']
            if got != c['expected'] or first != c['expected_luck']['first_pillar']:
                failures.append(f"{c['id']} {c['birth_date']} {c['birth_time']} {c['gender']}: 得 {got} 首運{first} / 應為 {c['expected']} 首運{c['expected_luck']['first_pillar']}")
        self.assertEqual(failures, [], f"{len(failures)} 個案例不符:\n" + "\n".join(failures[:15]))

class SolarTermTableParity(unittest.TestCase):
    """共用節氣表必須與 Python 演算法完全一致（表由演算法產生；日後換精度來源時此測試改為對照權威資料）"""
    def test_table_matches_algorithm_sample(self):
        from datetime import timedelta
        from app.engine.solar_terms import get_all_jie_terms
        table = json.load(open(os.path.join(ROOT, 'shared', 'solar_terms_table.json'), encoding='utf-8'))['jie']
        for y in (1899, 1950, 1984, 2000, 2024, 2026, 2100):
            terms = get_all_jie_terms(y)
            for k, t in enumerate(terms):
                want = (t['local_datetime'].replace(tzinfo=None) + timedelta(seconds=0)).strftime('%Y%m%d%H%M')
                got = table[(y - 1899) * 12 + k]
                # 表為四捨五入到分鐘；演算法含秒，容許 1 分鐘內差異
                a = int(want[:8]) * 1440 + int(want[8:10]) * 60 + int(want[10:12])
                b = int(got[:8]) * 1440 + int(got[8:10]) * 60 + int(got[10:12])
                self.assertLessEqual(abs(a - b), 1, f"{y} 第{k}個節 表={got} 演算法={want}")

    def test_jan_xiaohan_is_in_next_calendar_year(self):
        from app.engine.solar_terms import get_all_jie_terms
        t = get_all_jie_terms(2023)[-1]
        self.assertEqual((t['term_name'], t['local_datetime'].year, t['local_datetime'].month), ('小寒', 2024, 1))

if __name__ == '__main__':
    unittest.main()
