-- ==============================================================================
-- 姻緣導航・未來3年 (HK$188) - Supabase 資料庫架構
-- 包含：5 大感情狀態模式、7 大外部感情干擾型態、36 個月矩陣儲存結構
-- ==============================================================================

-- 1. 感情狀態設定表
CREATE TABLE IF NOT EXISTS public.bazi_relationship_status_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status_key VARCHAR(50) UNIQUE NOT NULL,
    status_name VARCHAR(100) NOT NULL,
    focus_guidance TEXT NOT NULL,
    action_strategy TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.bazi_relationship_status_configs (status_key, status_name, focus_guidance, action_strategy)
VALUES 
('single', '單身', '正緣特徵識別與進場時機把握', '主動拓展優質圈子，明確擇偶標準，避免沉溺於無意義社交。'),
('ambiguous', '曖昧／正在了解中', '打破僵局與升級關係之決策點', '設定明確考察時限，在吉利月份創造深度溝通契機確立名分。'),
('in_relationship', '穩定交往中', '磨合卡點突破與步入婚姻時機', '聚焦家庭觀念與金錢觀共識，逢合動之年為最佳提親或登記時機。'),
('married', '已婚／有固定伴侶', '親密維度加深與防感情波動策略', '建立日常情感儀式感，地支逢沖之時多以共同旅行化解潛在摩擦。'),
('pure_bazi', '不透露｜純八字感情分析', '原局夫妻星與大運流年客觀剖析', '以中立客觀五行生剋引導，掌握自身感情格局底色與能量消長。')
ON CONFLICT (status_key) DO UPDATE 
SET focus_guidance = EXCLUDED.focus_guidance,
    action_strategy = EXCLUDED.action_strategy;

-- 2. 7 大外部感情干擾型態表（避開直接稱「第三者」）
CREATE TABLE IF NOT EXISTS public.bazi_love_interference_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type_code VARCHAR(50) UNIQUE NOT NULL,
    type_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    remedy_strategy TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.bazi_love_interference_types (type_code, type_name, description, remedy_strategy)
VALUES
('playful', '玩玩型', '以短期歡愉為目的，欠缺長期責任與人生規劃承諾。', '及早明確對未來的價值觀與核心底線，不以青春為試錯成本。'),
('multi_line', '多線型', '同時與多位對象保持模糊曖昧，難以收心專一。', '拉長觀察週期，多方求證其真實生活圈與日常行蹤透明度。'),
('concealed', '隱瞞型', '對個人過往、財務真實狀況或現有家庭關係有所隱瞞。', '重透明溝通，凡涉及財務與重大決策務必實質驗證。'),
('hot_cold', '忽冷忽熱型', '情緒與反饋波動極大，使對方陷入內耗自責。', '保持個人生活重心獨立，不隨對方的情緒節奏起舞。'),
('delaying', '曖昧拖延型', '享受曖昧紅利卻遲遲不願給予明確名分與承諾。', '設定明確的時間停損點，以具體承諾為持續投入的前提。'),
('controlling', '控制型', '初期過度熱情，後期逐步干涉個人隱私與獨立社交圈。', '堅守心理與社交邊界，確保經濟與人格完全自主。'),
('ephemeral', '短暫型', '因特定氛圍產生的激情，環境轉換後熱度驟降。', '切忌在激情上頭時草率做出終身決策，待心境沉澱後再定奪。')
ON CONFLICT (type_code) DO UPDATE
SET description = EXCLUDED.description,
    remedy_strategy = EXCLUDED.remedy_strategy;

-- 3. 姻緣導航報告儲存表記錄
CREATE TABLE IF NOT EXISTS public.bazi_love_navigation_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id VARCHAR(100),
    user_birth_date VARCHAR(50) NOT NULL,
    user_birth_time VARCHAR(20) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    relationship_status VARCHAR(50) NOT NULL,
    spouse_palace_branch VARCHAR(10),
    spouse_star_element VARCHAR(20),
    top_month VARCHAR(50),
    best_opportunity TEXT,
    caution_period TEXT,
    interference_type VARCHAR(50),
    matrix_36_months JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
