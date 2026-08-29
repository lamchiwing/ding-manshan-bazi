#!/bin/bash
set -e

echo "========================================================="
echo "   丁蔓山｜命理誌 — Premium Bazi Platform (本地啟動腳本)"
echo "========================================================="

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ 找不到 python3，請先安裝 Python 3.10+"
    exit 1
fi

# Check Node
if ! command -v npm &> /dev/null; then
    echo "❌ 找不到 npm，請先安裝 Node.js 18+"
    exit 1
fi

echo "📦 正在檢查並啟動 Backend (FastAPI)..."
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt -q
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..

echo "🎨 正在檢查並啟動 Frontend (Vite + React)..."
cd frontend
npm install --silent
npm run dev &
FRONTEND_PID=$!
cd ..

echo "========================================================="
echo "✅ 系統已成功在本地啟動！"
echo "🌐 前端訪問網址： http://localhost:3000"
echo "🚀 後端 API 文檔： http://localhost:8000/docs"
echo "========================================================="
echo "按 Ctrl+C 可停止所有服務"

trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM
wait
