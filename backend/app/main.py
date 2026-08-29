"""
丁蔓山｜命理誌 — Premium Bazi Calculation & Fortune API
Backend Entry Point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes_bazi import router as bazi_router
from app.api.routes_services import router as services_router
from app.api.routes_booking import router as booking_router

app = FastAPI(
    title="丁蔓山｜命理誌 Bazi & Fortune Platform API",
    description="Deterministic Bazi calculation engine, AI reading and Fortune teller booking API.",
    version="1.0.0"
)

# Enable CORS for frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers under /api/v1
app.include_router(bazi_router, prefix="/api/v1")
app.include_router(services_router, prefix="/api/v1")
app.include_router(booking_router, prefix="/api/v1")

@app.get("/")
def root():
    return {
        "brand": "丁蔓山｜命理誌",
        "description": "Premium Digital Fortune Platform API",
        "version": "1.0.0",
        "status": "operational",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "ding-manshan-bazi-api"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
