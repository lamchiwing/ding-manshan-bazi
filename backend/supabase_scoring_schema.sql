-- =========================================================================
-- Ding Manshan Bazi 100-Point Quantitative Scoring & DataBasic Schema
-- 丁蔓山｜命理誌 · 八字五行100分量化計算法（天干36分，地支64分，含餘氣與乾濕土）
-- =========================================================================

-- 1. 地支藏干（本氣、中氣、餘氣）權重表 (Branch Hidden Stem Points)
create table if not exists public.bazi_branch_weights (
  branch text primary key,
  mode text not null, -- 'single', 'double', 'triple'
  ben_qi_stem text not null,
  ben_qi_element text not null,
  zhong_qi_stem text,
  zhong_qi_element text,
  yu_qi_stem text,
  yu_qi_element text
);

insert into public.bazi_branch_weights values
('子', 'single', '癸', '水', null, null, null, null),
('丑', 'triple', '己', '濕土', '癸', '水', '辛', '金'),
('寅', 'triple', '甲', '木', '丙', '火', '戊', '乾土'),
('卯', 'single', '乙', '木', null, null, null, null),
('辰', 'triple', '戊', '濕土', '乙', '木', '癸', '水'),
('巳', 'triple', '丙', '火', '庚', '金', '戊', '乾土'),
('午', 'double', '丁', '火', '己', '乾土', null, null),
('未', 'triple', '己', '乾土', '丁', '火', '乙', '木'),
('申', 'triple', '庚', '金', '壬', '水', '戊', '濕土'),
('酉', 'single', '辛', '金', null, null, null, null),
('戌', 'triple', '戊', '乾土', '辛', '金', '丁', '火'),
('亥', 'double', '壬', '水', '甲', '木', null, null)
on conflict (branch) do update set
  ben_qi_stem = excluded.ben_qi_stem,
  ben_qi_element = excluded.ben_qi_element,
  zhong_qi_stem = excluded.zhong_qi_stem,
  zhong_qi_element = excluded.zhong_qi_element,
  yu_qi_stem = excluded.yu_qi_stem,
  yu_qi_element = excluded.yu_qi_element;

-- 2. 6 大五行生活場景映射表 (DataBasic Six Categories Matrix)
create table if not exists public.bazi_databasic_categories (
  element_type text primary key, -- '木', '火', '乾土', '濕土', '金', '水'
  personal_traits text not null,
  major_colors text not null,
  minor_colors text not null,
  avoid_colors text not null,
  shapes text not null,
  natural_elements text not null,
  design_language text not null,
  suitable_patterns text not null,
  avoid_patterns text not null,
  industries text not null,
  roles text not null,
  work_environment text not null,
  work_mode text not null,
  financial_mode text not null,
  favorable_direction text not null,
  neutral_direction text not null,
  avoid_direction text not null,
  outdoor_env text not null,
  indoor_env text not null,
  compatible_traits text not null,
  partner_type text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.bazi_branch_weights enable row level security;
alter table public.bazi_databasic_categories enable row level security;

create policy "Allow public read bazi_branch_weights" on public.bazi_branch_weights for select using (true);
create policy "Allow public read bazi_databasic_categories" on public.bazi_databasic_categories for select using (true);
