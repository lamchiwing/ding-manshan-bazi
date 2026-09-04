import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from app.engine.bazi_calculator import calculate_bazi

class TestZiHourCalculation(unittest.TestCase):
    def test_early_zi_hour(self):
        # 1990-05-20 00:30 (早子時)
        res_early = calculate_bazi("1990-05-20", "00:30", "male")
        # Hour branch must be 子
        self.assertEqual(res_early["pillars"]["hour"]["branch"], "子")
        self.assertEqual(res_early["pillars"]["hour"]["stem"], "丙") # 乙酉日起丙子時 (乙庚丙作初)
        self.assertEqual(res_early["pillars"]["day"]["gan_zhi"], "乙酉")
        self.assertEqual(res_early["pillars"]["hour"]["zi_type"], "早子時 (00:00-00:59)")

    def test_late_zi_hour(self):
        # 1990-05-20 23:30 (夜子時)
        res_late = calculate_bazi("1990-05-20", "23:30", "male")
        # Hour branch must be 子
        self.assertEqual(res_late["pillars"]["hour"]["branch"], "子")
        self.assertEqual(res_late["pillars"]["hour"]["stem"], "丙") # 乙酉日起丙子時 (乙庚丙作初)
        # Day pillar remains 乙酉 (stays as current date, not advanced prematurely)
        self.assertEqual(res_late["pillars"]["day"]["gan_zhi"], "乙酉")
        self.assertEqual(res_late["pillars"]["hour"]["zi_type"], "夜子時 (23:00-23:59)")

if __name__ == '__main__':
    unittest.main()
