-- =========================================================================
-- Ding Manshan Bazi Classical Knowledge Base Schema for Supabase
-- 丁蔓山命理誌 - 5大古籍數據庫結構與古書知識檢索表
-- 包含：《子平真詮評注》、《滴天髓》、《窮通寶鑒》、《淵海子平》、《三命通會》
-- =========================================================================

-- 1. 古籍專書目錄表 (Books Metadata)
create table if not exists public.bazi_classics_books (
  id text primary key,
  title text not null,
  author text not null,
  dynasty text not null,
  description text not null,
  created_at timestamptz default now()
);

insert into public.bazi_classics_books (id, title, author, dynasty, description) values
('ziping_zhenquan', '子平真詮評注', '沈孝瞻 原著 / 徐樂吾 評注', '清代', '專論月令用神、格局成敗救應、行運喜忌、干支純雜之權威經典。'),
('ditian_sui', '滴天髓', '京圖 原著 / 劉伯溫 注', '明代', '闡述天道陰陽、十干體象、地支合衝、氣勢清濁、體用精神之總綱。'),
('qiongtong_baojian', '窮通寶鑒', '余春台 編', '清代', '十天干生於十二月之調候用神總論、金木水火土寒暖燥濕金科玉律。'),
('yuanhai_ziping', '淵海子平', '徐子平 著 / 徐升 編', '宋代', '八字命理開山鼻祖之作，詳載正格變格、十神體象、神煞吉凶賦文。'),
('sanming_tonghui', '三命通會', '萬民英 著', '明代', '命理百科全書，收錄五行納音、神煞源流、十干坐支與六十甲子日時斷語。')
on conflict (id) do update set
  title = excluded.title,
  author = excluded.author,
  dynasty = excluded.dynasty,
  description = excluded.description;

-- 2. 古籍章節與原文庫 (Full Chapters & Sections)
create table if not exists public.bazi_classics_chapters (
  id serial primary key,
  book_id text references public.bazi_classics_books(id) on delete cascade,
  chapter_title text not null,
  section_title text,
  content text not null,
  tags text[],
  created_at timestamptz default now()
);

-- 3. 命盤精確規則檢索表 (Deterministic Classical Rules Matrix)
create table if not exists public.bazi_classical_rules (
  id serial primary key,
  book_id text references public.bazi_classics_books(id) on delete cascade,
  category text not null, -- 'day_master_nature', 'seasonal_regulation', 'pattern_evaluation', 'hour_pillar_verse'
  day_stem text,          -- 甲, 乙, 丙...
  month_branch text,      -- 寅, 卯, 辰...
  hour_branch text,       -- 子, 丑, 寅...
  hour_pillar text,       -- 甲子, 乙丑...
  pattern_name text,      -- 正官格, 七殺格, 食神生財...
  quote text not null,    -- 原文精髓
  analysis text not null, -- 白話深度解析
  created_at timestamptz default now()
);

-- 4. 插入十天干體象（滴天髓）
insert into public.bazi_classical_rules (book_id, category, day_stem, quote, analysis) values
('ditian_sui', 'day_master_nature', '甲', '甲木參天，脫胎要火，春不容金，秋不容土，火熾乘龍，水蕩騎虎，地潤天和，植立千古。', '甲木為純陽之木，參天雄壯，喜火以洩秀發榮。生於春夏宜水火既濟，秋冬宜金火相制。'),
('ditian_sui', 'day_master_nature', '乙', '乙木雖柔，刲羊解牛，懷丁抱丙，跨雞乘猴，虛濕之地，騎馬亦憂，籐蘿繫甲，可春可秋。', '乙木為柔順花卉之木，見丙丁火則不畏金克，遇甲木藤蘿繫甲則生生不息。'),
('ditian_sui', 'day_master_nature', '丙', '丙火猛烈，欺霜侮雪，能煆庚金，逢辛反怯，土眾成慈，水猖顯節，虎馬犬鄉，甲來焚滅。', '丙火為陽火純精，能爍庚金，遇壬水相濟則顯其尊貴與忠節。'),
('ditian_sui', 'day_master_nature', '丁', '丁火柔中，內性昭融，抱乙而孝，合壬而忠，旺而不烈，衰而不窮，如有嫡母，可秋可冬。', '丁火為文明之火，內性昭融，得甲乙生扶則四時不竭。'),
('ditian_sui', 'day_master_nature', '戊', '戊土固重，既中且正，靜翕動闢，萬物司合，水旺物生，火燥喜潤，若在坤艮，怕沖宜靜。', '戊土為高厚山岡之土，喜潤澤惡燥熱，得水潤物生，得火溫土暖。'),
('ditian_sui', 'day_master_nature', '己', '己土卑濕，中正蓄藏，不愁木盛，不畏水旺，火少火晦，金多金明，若要物昌，宜助宜幫。', '己土為田園培木之土，其性卑濕，能納水蓄藏萬物，喜丙火照暖。'),
('ditian_sui', 'day_master_nature', '庚', '庚金帶煞，剛強為最，得水而清，得火而銳，土潤則生，土乾則脆，能勝甲兄，輸於乙妹。', '庚金為太白剛金，得水淘洗則清白，得丁火煆煉則成棟樑寶器。'),
('ditian_sui', 'day_master_nature', '辛', '辛金軟弱，溫潤而清，畏土之疊，樂水之盈，能扶社稷，能救生靈，熱則喜母，寒則喜丁。', '辛金為珠玉溫潤之金，最喜壬水淘洗以顯其光澤，畏厚土埋沒。'),
('ditian_sui', 'day_master_nature', '壬', '壬水汪洋，能洩金氣，剛中之德，周流不滯，通根透癸，沖天奔地，化則有情，從則相濟。', '壬水為百川大海之水，周流不息，得戊土堤防則成大器。'),
('ditian_sui', 'day_master_nature', '癸', '癸水至弱，達於天津，龍德而運，功化斯神，不畏火土，不論庚辛，合戊見火，火根乃真。', '癸水為雨露純陰之水，潤澤萬物，見辛金生身、丙火照暖則顯奇功。');

-- 5. 插入調候用神規則（窮通寶鑒示例）
insert into public.bazi_classical_rules (book_id, category, day_stem, month_branch, quote, analysis) values
('qiongtong_baojian', 'seasonal_regulation', '甲', '寅', '正月甲木，初春尚有餘寒，得丙癸逢，富貴雙全。癸藏丙透，名寒木向陽，主大富貴。', '初春甲木餘寒未消，首取丙火照暖，次取癸水滋潤，木火通明主貴。'),
('qiongtong_baojian', 'seasonal_regulation', '甲', '卯', '二月甲木，陽刃駕殺，庚金得所，可云小貴，異途顯達，但要財資之。', '二月木旺乘權，用庚金削劈成材，逢財星生官殺大吉。'),
('qiongtong_baojian', 'seasonal_regulation', '甲', '子', '十一月甲木，木性生寒，丁先庚後，丙火佐之。癸水司權，為火金之病。', '冬至一陽生，天寒地凍，首重丁火庚金劈甲引火，見丙火溫照最妙。'),
('qiongtong_baojian', 'seasonal_regulation', '癸', '亥', '十月癸水，旺中有弱，宜用庚辛為妙，得庚辛兩透，不見丁傷者，功名有准。', '初冬癸水乘旺，喜庚辛金發水源，忌丁火破印。'),
('qiongtong_baojian', 'seasonal_regulation', '癸', '子', '十一月癸水，值冰凍之時，專用丙火解凍，金溫水暖，名利雙收。', '仲冬嚴寒，癸水凍結成冰，專取丙火太陽解凍除寒，水暖金溫。');

-- 6. 插入格局評斷規則（子平真詮評注示例）
insert into public.bazi_classical_rules (book_id, category, pattern_name, quote, analysis) values
('ziping_zhenquan', 'pattern_evaluation', '正官格', '官逢財印，又無刑衝破害，官格成也。去其忌而存其喜，貴而且大。', '正官為貴氣之物，喜財生印護，忌傷官克破與刑衝混雜。'),
('ziping_zhenquan', 'pattern_evaluation', '七殺格', '身強七煞逢制，煞格成也。煞用食制，不要露財透印，以財能轉食生煞，而印能去食護煞也。', '七殺雖凶，制伏得宜則化為權威，身強殺旺逢食神制伏極品之貴。'),
('ziping_zhenquan', 'pattern_evaluation', '傷官格', '傷官雖非吉神，實為秀氣。傷官生財或佩印，傷官傷盡最為奇。', '傷官洩秀，得印制傷或生財化傷，文人學士多出於此。');

-- 7. 建立快速檢索 RPC 函數 (Fast Stored Procedure for Bazi API)
create or replace function public.get_bazi_classical_quotes(
  p_day_stem text,
  p_month_branch text,
  p_hour_pillar text default null,
  p_pattern text default null
)
returns jsonb
language plpgsql
security definer
as $$
declare
  v_result jsonb;
begin
  select jsonb_build_object(
    'day_master_nature', (
      select jsonb_build_object('quote', quote, 'analysis', analysis, 'book', '滴天髓')
      from public.bazi_classical_rules
      where category = 'day_master_nature' and day_stem = p_day_stem
      limit 1
    ),
    'seasonal_regulation', (
      select jsonb_build_object('quote', quote, 'analysis', analysis, 'book', '窮通寶鑒')
      from public.bazi_classical_rules
      where category = 'seasonal_regulation' and day_stem = p_day_stem and month_branch = p_month_branch
      limit 1
    ),
    'pattern_analysis', (
      select jsonb_build_object('quote', quote, 'analysis', analysis, 'book', '子平真詮')
      from public.bazi_classical_rules
      where category = 'pattern_evaluation' and (pattern_name = p_pattern or p_pattern is null)
      limit 1
    )
  ) into v_result;

  return v_result;
end;
$$;

-- 8. Enable Row Level Security (RLS)
alter table public.bazi_classics_books enable row level security;
alter table public.bazi_classics_chapters enable row level security;
alter table public.bazi_classical_rules enable row level security;

create policy "Allow public read bazi_classics_books" on public.bazi_classics_books for select using (true);
create policy "Allow public read bazi_classics_chapters" on public.bazi_classics_chapters for select using (true);
create policy "Allow public read bazi_classical_rules" on public.bazi_classical_rules for select using (true);
