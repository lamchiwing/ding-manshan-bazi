from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.schemas.bazi import BaziInput, AIChatInput
from app.engine.bazi_calculator import calculate_bazi

router = APIRouter(prefix="/bazi", tags=["Bazi Calculation & AI"])

@router.post("/calculate", response_model=Dict[str, Any])
def api_calculate_bazi(payload: BaziInput):
    """
    100% Deterministic Bazi Calculation.
    Follows Bazi Database & Calculation Engine Brief v1.0.0.
    """
    try:
        result = calculate_bazi(
            birth_date_str=payload.birth_date,
            birth_time_str=payload.birth_time,
            gender=payload.gender,
            day_boundary_rule=payload.day_boundary_rule or "ZI_START_NEXT_DAY"
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Calculation Error: {str(e)}")

@router.post("/chat", response_model=Dict[str, Any])
def api_bazi_ai_chat(payload: AIChatInput):
    """
    Calm, Editorial AI Reading for Bazi.
    Adheres to Brief: 'AI interface should feel calm, premium and intelligent — not like a generic chatbot.'
    Includes natural conversion to human fortune teller.
    """
    bazi = payload.bazi_data
    if not bazi and payload.birth_date and payload.birth_time:
        bazi = calculate_bazi(payload.birth_date, payload.birth_time, payload.gender or "male")

    day_master = bazi.get("day_master", {}).get("display", "丙火") if bazi else "丙火"
    dominant_elem = bazi.get("elements", {}).get("dominant_element", "火") if bazi else "火"
    year_gz = bazi.get("pillars", {}).get("year", {}).get("gan_zhi", "丙午") if bazi else "丙午"
    
    q = payload.question.strip()
    
    # Sophisticated editorial responses crafted according to Chinese Metaphysics + Modern Editorial tone
    if "轉工" in q or "工作" in q or "事業" in q:
        response_text = (
            f"觀閣下原局以【{day_master}】為核心，主導能量為【{dominant_elem}】。"
            f"今年歲君與命盤官殺星呈互動之勢，氣機正處於蓄力轉化期。\n\n"
            f"◆ **職場氣場解讀**：目前工作環境中雖有隱性牽制，但下半年（特別是秋令金旺至冬月水旺時節）"
            f"將出現貴人引路之轉機。若考慮轉職，建議選擇五行相生之平台或領域，不宜衝動盲動。\n\n"
            f"◆ **行動箴言**：蓄力守靜，以專業立身。吉運將於農曆八、十月逐步明朗。"
        )
    elif "創業" in q or "投資" in q:
        response_text = (
            f"命局日主【{day_master}】，局中食傷生財之機暗湧，具備靈敏的市場嗅覺與謀略。"
            f"然而當前流年地支逢合化，商機中伴隨邊際風險。\n\n"
            f"◆ **商業決策推演**：今年適合輕資產佈局、深化產品核心競爭力，而非盲目大額槓桿擴張。"
            f"若有合夥人，需特別注意合約細節與權責劃分，防範比劫爭財之局。\n\n"
            f"◆ **投資吉時**：建議於立秋後再做重大資金配置，方可得天時地利。"
        )
    elif "財運" in q or "三年" in q or "未來" in q:
        response_text = (
            f"從未來三年之流年干支氣運推演，閣下之財帛星正由【積蓄期】步入【收穫期】。\n\n"
            f"◆ **三年波段**：第一年（今年）重在穩固根基、清理沉沒成本；第二年正財星得生，收入與事業平台有實質躍升；"
            f"第三年則利於開拓副業或多元化收益。\n\n"
            f"◆ **守財策略**：注重流動性資產管理，避免高風險投機，厚積薄發方成大器。"
        )
    elif "感情" in q or "姻緣" in q or "愛" in q:
        response_text = (
            f"夫命局夫妻宮逢【{dominant_elem}】生旺，感情世界追求精神共鳴與純粹之信任。\n\n"
            f"◆ **姻緣氣息**：近階段紅鸞星動向平穩，若為單身，桃花機緣多顯於工作社交或長輩貴人引薦之中；"
            f"若已有伴侶，則需注意溝通中少一分執念，多一分傾聽與體諒，避開口舌之爭。\n\n"
            f"◆ **緣分時窗**：春末與中秋前後為情感升溫之良機。"
        )
    else:
        response_text = (
            f"以閣下之【{day_master}】命格，命盤結構清奇，五行以【{dominant_elem}】為重。\n\n"
            f"針對問題「{q}」，命理核心在於順應時序節律。當前運勢利於深耕內在、梳理架構，"
            f"靜待四時之序自然推移。凡事抱持中道，則吉無不利。"
        )

    # Editorial conversion suggestion
    conversion_card = {
        "title": "需要更深入的客製化指引？",
        "subtitle": "Continue your reading with a professional fortune teller.",
        "prompt": "與丁蔓山大師或駐站專家進行 1 對 1 深度視像諮詢，獲取專屬命書與長遠決策佈局。",
        "action_text": "預約命理師諮詢",
        "recommended_reader_id": "reader-ding"
    }

    return {
        "question": q,
        "response": response_text,
        "day_master": day_master,
        "dominant_element": dominant_elem,
        "conversion": conversion_card
    }
