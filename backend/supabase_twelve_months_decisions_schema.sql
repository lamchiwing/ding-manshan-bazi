-- ==============================================================================
-- 十二流月運程＋重大決策 (HK$488 個人化決策版) - Supabase 資料庫架構
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.bazi_twelve_months_decision_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    decision_key VARCHAR(50) UNIQUE NOT NULL,
    decision_name VARCHAR(100) NOT NULL,
    core_gods VARCHAR(100) NOT NULL,
    favorable_conditions TEXT NOT NULL,
    caution_conditions TEXT NOT NULL,
    recommendation_logic TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.bazi_twelve_months_decision_configs 
(decision_key, decision_name, core_gods, favorable_conditions, caution_conditions, recommendation_logic)
VALUES
('job_change', '轉工／轉跑道', '正官、七殺、正印、偏印、驛馬', '官印相生、天干合官或地支驛馬逢吉時', '傷官見官、官殺混雜或地支劇烈逢沖時', '依官殺印星之氣數評估，身旺逢官殺得位最宜主動出擊，身弱逢官殺則需先備妥退路。'),
('promotion', '升職／爭取新職位', '正官、正印、祿神', '歲月逢印綬相生、官星得地、考核主管星臨門', '官星受傷、比劫爭官爭功之月', '把握印官相照之月主動承攬核心專案，確立不可替代之權限。'),
('entrepreneurship', '創業／開始新項目', '食神、傷官、偏財', '食傷生財、財星有庫、大局生旺之月', '比劫爭財、空亡、破財煞透出之月', '食傷引導商業創新，重視第一期現金流回本週期，避開資金緊縮月份。'),
('expansion', '擴張／開新市場', '偏財、七殺、驛馬', '偏財透干、七殺化印、外拓能量鼎盛之月', '歲破動盪、伏吟停滯、市場能量萎縮之月', '順應驛馬外向能量開闢邊疆，鎖定高毛利賽道。'),
('investment', '投資／重大財務決定', '正財、偏財、食神', '財星合命、庫位開啟、穩健現金流支撐之時', '劫財分奪、梟神奪食、投機偏財受損之月', '以價值投資為基石，防範高槓桿盲動，於財星入庫月鎖定利潤。'),
('marriage', '結婚／訂婚', '正官（女）、正財（男）、天喜、紅鸞、六合', '夫妻宮逢六合、喜用星臨月、桃花合入主位', '夫妻宮逢劇烈刑沖、自刑或孤辰寡宿加會', '選取天地和合、生旺夫妻宮之吉月締結良緣，避開刑沖口舌波段。'),
('breakup', '分手／結束一段關係', '傷官、七殺、比劫', '氣場沉澱、理智回歸、印星護身化解恩怨之時', '激化相剋、羊刃交加的情緒失控之月', '以長遠人生清淨為目標，平和協議劃定界限，避免在情緒極端時撕破臉。'),
('relocation', '搬屋／搬遷', '驛馬、印星、地支合相', '驛馬得生、印星生旺象徵居所安穩之月', '坐向相沖、太歲臨門或三煞破宅之月', '擇生旺印星與日支和合之月安宅進伙，以聚氣安神。'),
('immigration', '移民／海外發展', '驛馬、偏印、水木長生', '驛馬遠行星動、天干透偏印開拓新界之月', '困頓閉塞、逢墓絕之地或出行逢沖受阻之月', '借助外向驛馬氣機辦理簽證與移居手續，順勢融入新環境。'),
('partnership', '合夥／加入新合作', '比肩、食神、正印', '比肩生食神、互通資源且權責協議清晰之月', '比劫奪財、相害相刑、利益分配模糊之月', '合作前務必白紙黑字立約，於彼此五行互補、互利共贏之時入局。')
ON CONFLICT (decision_key) DO UPDATE
SET favorable_conditions = EXCLUDED.favorable_conditions,
    caution_conditions = EXCLUDED.caution_conditions,
    recommendation_logic = EXCLUDED.recommendation_logic;

CREATE TABLE IF NOT EXISTS public.bazi_twelve_months_decisions_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(100),
    user_birth_date VARCHAR(50) NOT NULL,
    user_birth_time VARCHAR(20) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    selected_decisions JSONB NOT NULL,
    plan_status VARCHAR(50) DEFAULT '正在考慮',
    expected_timing VARCHAR(50) DEFAULT '未確定',
    annual_theme VARCHAR(200),
    report_data JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
