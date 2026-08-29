from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/services", tags=["Services & Pricing"])

SERVICES_CATALOG = [
    # --- Category 1: Online AI & Digital Metaphysics Services ---
    {
        "id": "srv-elem-guide",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "五行生活指南",
        "price_hkd": 128,
        "price_display": "HK$128",
        "badge": "入門首選",
        "turnaround": "即時生成 · PDF 報告",
        "description": "精準解碼個人八字五行強弱喜忌，度身定做專屬穿著顏色、飲食調養、日常方位與生活起居調理指引。",
        "features": ["個人五行能量分佈圖", "開運顏色／幸運數字／座向指南", "健康弱項預防與飲食調理建議", "可下載保存之專屬生活指南卡"],
        "type": "digital"
    },
    {
        "id": "srv-love-3yr",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "感情／姻緣・未來3年",
        "price_hkd": 188,
        "price_display": "HK$188",
        "badge": "熱門推介",
        "turnaround": "即時生成 · 深度解讀",
        "description": "剖析命盤夫妻宮與桃花星動向，推算未來 36 個月姻緣契機、正緣出現時機、感情相處盲點與穩定轉化法則。",
        "features": ["夫妻宮及配偶特徵畫像", "未來 3 年桃花運勢走勢波段", "感情危機月與修復指南", "單身脫單與復合契機時間表"],
        "type": "digital"
    },
    {
        "id": "srv-career-3yr",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "事業／財運・未來3年",
        "price_hkd": 188,
        "price_display": "HK$188",
        "badge": "職場必看",
        "turnaround": "即時生成 · 深度解讀",
        "description": "專注官殺與財星配置，精確預測未來 3 年職場升遷機會、轉工跳槽最佳月份、正財與偏財收益高低峰期。",
        "features": ["個人天賦行業與貴人屬性", "轉職跳槽關鍵決策月", "未來 3 年財帛運勢走勢曲線", "防破財與守財策略指引"],
        "type": "digital"
    },
    {
        "id": "srv-biz-3yr",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "創業／投資・未來3年",
        "price_hkd": 288,
        "price_display": "HK$288",
        "badge": "高階商業",
        "turnaround": "即時生成 · 商業評估",
        "description": "針對合夥創業、投資風控與擴張時機深度推演，識別食傷生財或比劫爭財之局，降低決策風險。",
        "features": ["合夥人五行互補與防背叛指標", "資金流向與投資風險評級", "市場切入吉月與擴張時間點", "商業避坑策略報告"],
        "type": "digital"
    },
    {
        "id": "srv-monthly-12",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "十二流月吉凶",
        "price_hkd": 368,
        "price_display": "HK$368",
        "badge": "年度必備",
        "turnaround": "即時生成 · 全年流月曆",
        "description": "按二十四節氣精確推算整年 12 個流月之天干地支與原局生剋刑沖，每月吉凶提點一目了然。",
        "features": ["12 個流月吉凶指數與關鍵詞", "每月貴人方位與幸運日標記", "月度刑沖破害預警", "月度行動策略建議"],
        "type": "digital"
    },
    {
        "id": "srv-monthly-decision",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "十二流月吉凶＋重大決策",
        "price_hkd": 488,
        "price_display": "HK$488",
        "badge": "決策升級版",
        "turnaround": "即時生成 · 決策矩陣",
        "description": "包含完整 12 流月預測，並額外加入針對置業、簽約、重大交易、搬遷或訴訟的專項時機推演模型。",
        "features": ["全套十二流月吉凶排盤", "置業／簽約／訴訟專屬時機推薦", "重大決策風險評級矩陣", "專屬錦囊解法"],
        "type": "digital"
    },
    {
        "id": "srv-life-nav-3yr",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "八字人生導航・未來3年",
        "price_hkd": 588,
        "price_display": "HK$588",
        "badge": "全方位旗艦",
        "turnaround": "即時生成 · 綜合長篇報告",
        "description": "全面貫通事業、財運、感情、健康、六親與大運流年轉折點，提供長達 3 年的全面人生推演導航手冊。",
        "features": ["360度原局深度剖析", "大運與流年交接期吉凶變動", "三年里程碑規劃建議", "重大機遇與考驗應對策略"],
        "type": "digital"
    },
    {
        "id": "srv-synastry-love",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "雙人合盤・愛情／婚姻",
        "price_hkd": 688,
        "price_display": "HK$688",
        "badge": "雙人合盤",
        "turnaround": "即時生成 · 雙人八字對照",
        "description": "輸入男女雙方出生年月日時，進行天干五合、地支三合六合、五行互補度與性格契合度深度推算。",
        "features": ["雙方五行互補指數評估", "天干地支相合相沖深度分析", "長久相處盲點與化解良方", "未來婚姻穩定度預警指標"],
        "type": "digital"
    },
    {
        "id": "srv-ai-face",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "AI 面相運程分析",
        "price_hkd": 188,
        "price_display": "HK$188",
        "badge": "智能相術",
        "turnaround": "上傳照片 · 1分鐘生成",
        "description": "上傳正面清晰照片，由 AI 相術引擎識別三停五嶽、十二宮位與氣色分佈，結合年齡推算當前流年面相吉凶。",
        "features": ["三停五嶽比例與性格特徵", "十二宮（事業、財帛、夫妻等）評級", "近期氣色與機遇提示", "相學修飾與氣場提升指引"],
        "type": "digital"
    },
    {
        "id": "srv-ai-photo-fengshui",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "AI 相片風水分析",
        "price_hkd": 188,
        "price_display": "HK$188",
        "badge": "智能風水",
        "turnaround": "上傳空間照 · 1分鐘生成",
        "description": "上傳客廳、睡房、書房或辦公桌照片，AI 識別常見形煞（橫樑壓頂、穿堂風、尖角沖煞）並提供化解方案。",
        "features": ["室內空間格局形煞檢測", "財位／文昌位／明堂評估", "常見風水禁忌避坑指引", "簡易擺設化煞建議"],
        "type": "digital"
    },
    {
        "id": "srv-house-5yr",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "住宅風水・5年布局",
        "price_hkd": 688,
        "price_display": "HK$688",
        "badge": "家居風水",
        "turnaround": "提供戶型圖 · 智能推演",
        "description": "結合八宅明鏡與玄空九星，推算未來 5 年住宅各方位之吉凶飛星流轉，為全家人定制催財、催旺、保健康之佈局。",
        "features": ["房屋九宮格飛星排盤", "未來 5 年九星流轉催旺點", "玄關／主臥／廚房專項調理", "全屋能量調和指引"],
        "type": "digital"
    },
    {
        "id": "srv-period-9-deep",
        "category": "online_ai",
        "category_name": "線上 AI 及數位分析報告",
        "title": "九運住宅深度風水",
        "price_hkd": 1388,
        "price_display": "HK$1,388",
        "badge": "九運大潮 (2024-2043)",
        "turnaround": "深度玄空排盤 · 專家校驗",
        "description": "九運（離火二十年）專屬深度住宅風水全方案，精確評估當前物業在離九運之旺衰走向、零正神方位與二十年旺運佈局。",
        "features": ["三元九運離火運物業契合度", "正神正位裝水／零神零位放水精確坐向", "2024–2043 頂層旺運佈局規劃", "高階玄空大卦調和法則"],
        "type": "digital"
    },

    # --- Category 2: Master Consultations & On-site Feng Shui (1-on-1) ---
    {
        "id": "srv-master-bazi",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "八字論命",
        "price_hkd": 4800,
        "price_display": "HK$4,800",
        "badge": "大師一對一",
        "turnaround": "60-90 分鐘專屬視像/面談",
        "description": "丁蔓山大師或資深名家親自排盤詳論，深究格局喜忌、一生大運起伏、六親緣分與人生關鍵轉捩點，附贈命書一份。",
        "features": ["大師親自推演四柱八字精微命盤", "一生大運走勢與重大關卡詳解", "專屬 1 對 1 深度解惑與答疑", "紙質精裝 / 數位典藏版命書"],
        "type": "consultation"
    },
    {
        "id": "srv-inquiry-matter",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "問事求謀",
        "price_hkd": 2800,
        "price_display": "HK$2,800",
        "badge": "單項決策",
        "turnaround": "45 分鐘專項諮詢",
        "description": "針對特定重大事件（如訴訟、合約簽署、升遷調職、大額投資、感情取捨）進行專項起卦與八字推演，提供明確決策指引。",
        "features": ["針對單一特定事件深層起卦與八字契合度", "事情發展進程與勝算機率評估", "阻礙破除方案與關鍵時機指引", "一對一即時諮詢答疑"],
        "type": "consultation"
    },
    {
        "id": "srv-annual-inquiry",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "流年問事",
        "price_hkd": 2800,
        "price_display": "HK$2,800",
        "badge": "年度批命",
        "turnaround": "45 分鐘專屬面談",
        "description": "大師針對即將到來或當前流年進行全方位批算，涵蓋 12 流月動態、犯太歲化解、行運高峰與健康平安提點。",
        "features": ["流年太歲生剋沖合詳解", "12 個月吉凶波段與防範要點", "年度開運物配戴與風水擺設建議", "化解流年不利之秘法指南"],
        "type": "consultation"
    },
    {
        "id": "srv-baby-naming",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "小兒定名",
        "price_hkd": 2800,
        "price_display": "HK$2,800",
        "badge": "姓名學",
        "turnaround": "3-5 工作日交付",
        "description": "根據新生兒精確八字生辰，嚴格遵循五行補救、三才五格數理、生肖喜忌與音律意蘊，量身定製 5–8 組吉祥大名。",
        "features": ["八字五行精確缺補平衡", "三才五格吉數配置（81數理）", "5-8 組寓意高雅、朗朗上口備選名", "完整名字寓意與命盤解析書"],
        "type": "naming"
    },
    {
        "id": "srv-company-naming",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "公司定號",
        "price_hkd": 3800,
        "price_display": "HK$3,800",
        "badge": "商業起名",
        "turnaround": "3-5 工作日交付",
        "description": "結合創辦人及核心合夥人八字命盤、行業屬性與品牌定位，定製旺財順運、易於傳播與商標註冊之商業名號。",
        "features": ["創辦人八字與行業五行深度匹配", "商業數理吉凶與財星加持", "提供 6–10 組原創商號選擇", "品牌五行格局與商標註冊建議"],
        "type": "naming"
    },
    {
        "id": "srv-auspicious-date",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "吉時擇日",
        "price_hkd": 2800,
        "price_display": "HK$2,800",
        "badge": "擇日吉課",
        "turnaround": "2-3 工作日交付",
        "description": "嫁娶大婚、開張開業、新居入伙、動土開工或剖腹產子吉日良辰推算，避開三煞歲破，選取大吉天時。",
        "features": ["主事人八字生肖避沖避煞", "選取多組天德月德貴人吉日吉時", "詳細儀軌及進門/開張程序指南", "擇日吉課專用報告"],
        "type": "date_selection"
    },
    {
        "id": "srv-home-fengshui-layout",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "家居風水佈局",
        "price_hkd": 18000,
        "price_display": "HK$18,000+",
        "badge": "現場勘察",
        "turnaround": "預約上門 · 實地勘測",
        "description": "大師親臨住宅現場羅盤定針，勘測外巒頭環境與內理氣格局，提供催旺財帛、文昌升遷、夫妻和睦之全套佈局方案。",
        "features": ["大師親臨現場（香港及周邊地區）", "精準羅盤定坐向與玄空飛星立極", "全屋各房定制化開運佈置平面圖", "一年期風水售後追蹤與調整"],
        "type": "onsite"
    },
    {
        "id": "srv-home-inspection",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "家居查宅",
        "price_hkd": 18000,
        "price_display": "HK$18,000+",
        "badge": "置業把關",
        "turnaround": "實地/線上雙軌",
        "description": "置業買樓、租屋入住前專業把關。全面勘察單位地氣吉凶、歷任磁場殘留、周邊煞氣與戶主八字契合度。",
        "features": ["買樓置業前凶吉鑑定與避坑", "周邊道路、建築形煞與氣場檢測", "物業是否旺戶主八字深度評估", "出具權威查宅診斷報告書"],
        "type": "onsite"
    },
    {
        "id": "srv-corp-fengshui-layout",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "公司風水佈局",
        "price_hkd": 28000,
        "price_display": "HK$28,000+",
        "badge": "企業級定制",
        "turnaround": "預約上門 · 旗艦項目",
        "description": "針對企業辦公室、總部大樓、商舖旗艦店進行全方位商業風水佈局。重點規劃老闆房、財務室、大門氣口與團隊旺財位。",
        "features": ["企業大門納氣口與財位立向", "董事長／總經理辦公位專屬加持", "財務部門與核心業務區旺財鎖氣", "員工動線與向心力風水佈置"],
        "type": "onsite"
    },
    {
        "id": "srv-corp-inspection",
        "category": "master_consult",
        "category_name": "大師親算及現場勘察諮詢",
        "title": "公司查宅",
        "price_hkd": 28000,
        "price_display": "HK$28,000+",
        "badge": "商業選址",
        "turnaround": "選址實地勘測",
        "description": "企業擴張、搬遷新辦公室或選址展店前的風水評估。衡量商場人流磁場、大廈氣運與公司行業五行契合度。",
        "features": ["多處候選商廈/地舖地氣對比", "商業大廈明堂與青龍白虎勢位勘查", "選址商業回報與風險預警", "選址評估結論與建議排序"],
        "type": "onsite"
    }
]

@router.get("/", response_model=List[Dict[str, Any]])
def get_services():
    """Retrieve all 22 active services and pricing catalog."""
    return SERVICES_CATALOG

@router.get("/{service_id}", response_model=Dict[str, Any])
def get_service_by_id(service_id: str):
    for s in SERVICES_CATALOG:
        if s["id"] == service_id:
            return s
    return {"error": "Service not found"}
