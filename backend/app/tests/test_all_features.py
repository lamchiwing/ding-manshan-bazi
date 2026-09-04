import unittest
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from app.engine.bazi_calculator import calculate_bazi
from app.api.routes_services import SERVICES_CATALOG

class TestAllPreservedFeatures(unittest.TestCase):
    def test_deterministic_calculation_pillars(self):
        res = calculate_bazi("1990-05-20", "23:30", "male")
        # 4 Pillars
        self.assertEqual(res["pillars"]["year"]["gan_zhi"], "庚午")
        self.assertIn("stem_element", res["pillars"]["year"])
        self.assertIn("hidden_stems", res["pillars"]["year"])
        # Day Master
        self.assertIn("day_master", res)
        # Five Elements
        self.assertIn("percentages", res["elements"])
        self.assertIn("dominant_element", res["elements"])
        # Da Yun
        self.assertTrue(len(res["luck_cycles"]) >= 8)
        # Shen Sha
        self.assertIn("list", res["shen_sha"])

    def test_22_services_present(self):
        self.assertEqual(len(SERVICES_CATALOG), 22)
        prices = [s["price_hkd"] for s in SERVICES_CATALOG]
        # Ensure all services exist
        self.assertIn(28000, prices)
        self.assertIn(18000, prices)
        self.assertIn(4800, prices)
        self.assertIn(2800, prices)
        self.assertIn(128, prices)

if __name__ == '__main__':
    unittest.main()
