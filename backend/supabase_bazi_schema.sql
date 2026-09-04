-- =========================================================================
-- Ding Manshan Bazi Complete Supabase Integration Schema
-- 丁蔓山命理誌 - 萬年曆與八字核心推演數據表及 RPC 函數
-- =========================================================================

-- 1. 五虎遁月表 (Year Stem to Month Stem Mapping)
create table if not exists public.wuhu_dun_month (
  year_stem text primary key,
  yin text not null,
  mao text not null,
  chen text not null,
  si text not null,
  wu text not null,
  wei text not null,
  shen text not null,
  you text not null,
  xu text not null,
  hai text not null,
  zi text not null,
  chou text not null
);

insert into public.wuhu_dun_month values
('甲', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'),
('己', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'),
('乙', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'),
('庚', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'),
('丙', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'),
('辛', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'),
('丁', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'),
('壬', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'),
('戊', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'),
('癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙')
on conflict (year_stem) do update set
  yin = excluded.yin, mao = excluded.mao, chen = excluded.chen, si = excluded.si,
  wu = excluded.wu, wei = excluded.wei, shen = excluded.shen, you = excluded.you,
  xu = excluded.xu, hai = excluded.hai, zi = excluded.zi, chou = excluded.chou;

-- 2. 五鼠遁時表 (Day Stem to Hour Stem Mapping)
create table if not exists public.wushu_dun_hour (
  day_stem text primary key,
  zi text not null,
  chou text not null,
  yin text not null,
  mao text not null,
  chen text not null,
  si text not null,
  wu text not null,
  wei text not null,
  shen text not null,
  you text not null,
  xu text not null,
  hai text not null
);

insert into public.wushu_dun_hour values
('甲', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'),
('己', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'),
('乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'),
('庚', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'),
('丙', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'),
('辛', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'),
('丁', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'),
('壬', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'),
('戊', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'),
('癸', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸')
on conflict (day_stem) do update set
  zi = excluded.zi, chou = excluded.chou, yin = excluded.yin, mao = excluded.mao,
  chen = excluded.chen, si = excluded.si, wu = excluded.wu, wei = excluded.wei,
  shen = excluded.shen, you = excluded.you, xu = excluded.xu, hai = excluded.hai;

-- 3. 十神對照表 (Day Stem x Target Stem => Ten God)
create table if not exists public.ten_gods_matrix (
  id serial primary key,
  day_stem text not null,
  target_stem text not null,
  ten_god text not null,
  unique (day_stem, target_stem)
);

insert into public.ten_gods_matrix (day_stem, target_stem, ten_god) values
('甲','甲','比肩'),('甲','乙','劫財'),('甲','丙','食神'),('甲','丁','傷官'),('甲','戊','偏財'),('甲','己','正財'),('甲','庚','七殺'),('甲','辛','正官'),('甲','壬','偏印'),('甲','癸','正印'),
('乙','甲','劫財'),('乙','乙','比肩'),('乙','丙','傷官'),('乙','丁','食神'),('乙','戊','正財'),('乙','己','偏財'),('乙','庚','正官'),('乙','辛','七殺'),('乙','壬','正印'),('乙','癸','偏印'),
('丙','甲','偏印'),('丙','乙','正印'),('丙','丙','比肩'),('丙','丁','劫財'),('丙','戊','食神'),('丙','己','傷官'),('丙','庚','偏財'),('丙','辛','正財'),('丙','壬','七殺'),('丙','癸','正官'),
('丁','甲','正印'),('丁','乙','偏印'),('丁','丙','劫財'),('丁','丁','比肩'),('丁','戊','傷官'),('丁','己','食神'),('丁','庚','正財'),('丁','辛','偏財'),('丁','壬','正官'),('丁','癸','七殺'),
('戊','甲','七殺'),('戊','乙','正官'),('戊','丙','偏印'),('戊','丁','正印'),('戊','戊','比肩'),('戊','己','劫財'),('戊','庚','食神'),('戊','辛','傷官'),('戊','壬','偏財'),('戊','癸','正財'),
('己','甲','正官'),('己','乙','七殺'),('己','丙','正印'),('己','丁','偏印'),('己','戊','劫財'),('己','己','比肩'),('己','庚','傷官'),('己','辛','食神'),('己','壬','正財'),('己','癸','偏財'),
('庚','甲','偏財'),('庚','乙','正財'),('庚','丙','七殺'),('庚','丁','正官'),('庚','戊','偏印'),('庚','己','正印'),('庚','庚','比肩'),('庚','辛','劫財'),('庚','壬','食神'),('庚','癸','傷官'),
('辛','甲','正財'),('辛','乙','偏財'),('辛','丙','正官'),('辛','丁','七殺'),('辛','戊','正印'),('辛','己','偏印'),('辛','庚','劫財'),('辛','辛','比肩'),('辛','壬','傷官'),('辛','癸','食神'),
('壬','甲','食神'),('壬','乙','傷官'),('壬','丙','偏財'),('壬','丁','正財'),('壬','戊','七殺'),('壬','己','正官'),('壬','庚','偏印'),('壬','辛','正印'),('壬','壬','比肩'),('壬','癸','劫財'),
('癸','甲','傷官'),('癸','乙','食神'),('癸','丙','正財'),('癸','丁','偏財'),('癸','戊','正官'),('癸','己','七殺'),('癸','庚','正印'),('癸','辛','偏印'),('癸','壬','劫財'),('癸','癸','比肩')
on conflict (day_stem, target_stem) do update set ten_god = excluded.ten_god;

-- 4. 12 節月與節氣區間對照表 (Monthly Solar Terms Range)
create table if not exists public.monthly_solar_terms (
  month_branch text primary key,
  start_term text not null,
  end_term text not null,
  approx_date text not null
);

insert into public.monthly_solar_terms values
('寅月', '立春', '驚蟄', '02-04至03-05'),
('卯月', '驚蟄', '清明', '03-05至04-04'),
('辰月', '清明', '立夏', '04-04至05-05'),
('巳月', '立夏', '芒種', '05-05至06-05'),
('午月', '芒種', '小暑', '06-05至07-07'),
('未月', '小暑', '立秋', '07-07至08-07'),
('申月', '立秋', '白露', '08-07至09-07'),
('酉月', '白露', '寒露', '09-07至10-08'),
('戌月', '寒露', '立冬', '10-08至11-07'),
('亥月', '立冬', '大雪', '11-07至12-07'),
('子月', '大雪', '小寒', '12-07至01-05'),
('丑月', '小寒', '立春', '01-05至02-04')
on conflict (month_branch) do update set
  start_term = excluded.start_term, end_term = excluded.end_term, approx_date = excluded.approx_date;

-- 5. 13 時辰時段與早晚子時規則表 (Time Slot & Zi Rules)
create table if not exists public.time_slot_rules (
  id serial primary key,
  time_range text not null,
  slot_name text not null,
  branch text not null,
  day_rule text not null
);

insert into public.time_slot_rules (time_range, slot_name, branch, day_rule) values
('00:00-00:59', '早子時', '子', '當日公曆日柱'),
('01:00-02:59', '丑時', '丑', '當日公曆日柱'),
('03:00-04:59', '寅時', '寅', '當日公曆日柱'),
('05:00-06:59', '卯時', '卯', '當日公曆日柱'),
('07:00-08:59', '辰時', '辰', '當日公曆日柱'),
('09:00-10:59', '巳時', '巳', '當日公曆日柱'),
('11:00-12:59', '午時', '午', '當日公曆日柱'),
('13:00-14:59', '未時', '未', '當日公曆日柱'),
('15:00-16:59', '申時', '申', '當日公曆日柱'),
('17:00-18:59', '酉時', '酉', '當日公曆日柱'),
('19:00-20:59', '戌時', '戌', '當日公曆日柱'),
('21:00-22:59', '亥時', '亥', '當日公曆日柱'),
('23:00-23:59', '晚子時', '子', '當日公曆日柱(禁止加一日)');

-- 6. 萬年曆每日干支基準表 (1900-2099 Perpetual Calendar)
create table if not exists public.perpetual_calendar (
  solar_date date primary key,
  year_gan_zhi text not null,
  month_gan_zhi text not null,
  day_gan_zhi text not null,
  jie_qi_name text,
  is_jie_qi boolean default false
);

-- Enable RLS & Read Policy for Public
alter table public.wuhu_dun_month enable row level security;
alter table public.wushu_dun_hour enable row level security;
alter table public.ten_gods_matrix enable row level security;
alter table public.monthly_solar_terms enable row level security;
alter table public.time_slot_rules enable row level security;
alter table public.perpetual_calendar enable row level security;

create policy "Allow public read wuhu_dun_month" on public.wuhu_dun_month for select using (true);
create policy "Allow public read wushu_dun_hour" on public.wushu_dun_hour for select using (true);
create policy "Allow public read ten_gods_matrix" on public.ten_gods_matrix for select using (true);
create policy "Allow public read monthly_solar_terms" on public.monthly_solar_terms for select using (true);
create policy "Allow public read time_slot_rules" on public.time_slot_rules for select using (true);
create policy "Allow public read perpetual_calendar" on public.perpetual_calendar for select using (true);
