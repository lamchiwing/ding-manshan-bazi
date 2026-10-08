-- Ding Manshan Bazi - Career & Wealth 36-Month Navigation Schema (HK$188)
DROP TABLE IF EXISTS public.bazi_career_industry_mappings CASCADE;
DROP TABLE IF EXISTS public.bazi_career_pattern_configs CASCADE;

CREATE TABLE public.bazi_career_pattern_configs (
  pattern_code text PRIMARY KEY,
  pattern_name text NOT NULL,
  work_mode text NOT NULL,
  core_strengths jsonb NOT NULL,
  blind_spots jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

INSERT INTO public.bazi_career_pattern_configs VALUES
('officer_seal', '官印雙全 · 貴氣統籌格', '大型體制／跨國機構／高階管理職業經理人', '["組織架構協調力強，善於制定標準與規章", "具備天然威信，深得上級與平台信任", "抗壓沉穩，善於推動跨部門大型複雜項目"]'::jsonb, '["過度重視合規與完美主義，有時決策偏向保守", "對權責邊界敏感，易在模糊人事中耗損心力"]'::jsonb, now()),
('wealth_generating', '食傷生財 · 商賈敏銳格', '合夥創業／商業開發／項目操盤／資本運作', '["市場嗅覺敏銳，能先於他人捕捉商業獲利機會", "資源整合力強，擅長以小博大、跨界借力", "商務談判具說服力，善於將理念轉化為現金流"]'::jsonb, '["求速成心切時易分散戰線，戰略定力稍嫌不足", "對常規行政審批耐性有限，需搭配細節執行搭檔"]'::jsonb, now()),
('output_show', '木火通明 / 金水吐秀 · 專業策劃格', '獨立顧問／專業技術壁壘／文化傳媒／自由職業者', '["創意與專業見解獨樹一幟，具備不可替代的個人IP", "邏輯構思嚴謹，擅長解決技術難點與創新研發", "對品質要求極高，在垂直領域易成為權威標竿"]'::jsonb, '["自視甚高不喜受制於繁文縟節，人際情商需多圓融", "情緒波動容易直接影響工作產出節奏"]'::jsonb, now()),
('self_reliant', '建祿陽刃 · 開疆拓土格', '新業務開拓／項目負責人（PM）／獨立打拼創始人', '["執行力超群，敢打硬仗，面對逆境韌性極強", "行動力極快，開疆拓土先鋒，敢為人先", "團隊帶領具江湖義氣，凝聚核心骨幹力強"]'::jsonb, '["容易獨攬重任不願分權，授權意識較弱", "性格剛烈直爽，需防職場暗流與人際口舌摩擦"]'::jsonb, now());

CREATE TABLE public.bazi_career_industry_mappings (
  element text PRIMARY KEY,
  industry_directions text NOT NULL,
  functional_roles text NOT NULL,
  favorable_colors text NOT NULL,
  favorable_directions text NOT NULL,
  favorable_environment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

INSERT INTO public.bazi_career_industry_mappings VALUES
('木', '文化教育、傳媒出版、醫藥大健康、綠色環保、設計諮詢、農業林業', '內容研發、人才培養、品牌企劃、策略諮詢、非營利項目運作', '青綠色、碧綠、原木色、翠綠', '東方、東南方', '採光柔和、多綠植點綴、木質家具陳設、通風良好的清幽空間', now()),
('火', '人工智能（AI）、新能源、電子科技、文化娛樂、傳媒影視、餐飲品牌', '市場拓展、品牌公關、演講主持、創意設計、前沿科技推廣', '朱砂紅、紫羅蘭、暖橙色、亮粉紅', '南方', '光線充足、明亮大氣、視野開闊、活力充沛的高層現代化辦公空間', now()),
('土', '房地產建築、基礎建設、資產管理、倉儲物流、諮詢管理、農業土地', '財務風控、資產審計、後勤保障、大型物資調配、團隊中樞協調', '駝色、米黃色、咖啡色、大地棕', '本地、西南方、東北方', '厚重穩健、格局方正、靠山厚實（背有實牆）、安靜沈穩的辦公環境', now()),
('金', '金融證券、精密製造、五金硬體、法律稽核、高端鐘錶、硬體科技', '財務管理、法務合規、精算分析、質量把控、核心技術攻堅', '純白、銀灰、香檳金、金屬亮色', '西方、西北方', '極簡線條、金屬質感裝飾、整潔俐落、高效無雜亂的現代化格局', now()),
('水', '現代物流、跨國商貿、國際貿易、電子商務、諮詢顧問、水利海洋', '商務拓展（BD）、公關傳播、全球供應鏈協同、動態市場分析', '深海藍、墨黑、霧霾藍、深藍色', '北方', '動線靈活流暢、臨水或配備流動水景、空間靈動多變的開放式辦公格局', now());
