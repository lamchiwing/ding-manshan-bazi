#!/bin/bash
set -e

echo "========================================================="
echo "   丁蔓山｜命理誌 — 雲端伺服器一鍵部署腳本 (Docker / VPS)"
echo "========================================================="

# 1. 檢查 Docker
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "🐳 檢測到 Docker 與 Docker Compose，開始容器化構建與部署..."
    docker-compose down || true
    docker-compose build --no-cache
    docker-compose up -d
    echo "✅ Docker 容器已成功於後台啟動！"
    echo "🌐 前端訪問埠： http://<Your-Server-IP>:3000 (或 80)"
    echo "🚀 後端 API 埠： http://<Your-Server-IP>:8000"
    exit 0
fi

# 2. 原生 PM2 / Systemd 部署
echo "⚙️ 未檢測到 Docker，切換為 PM2 原生多進程部署..."

# 構建前端靜態資源
echo "📦 構建前端靜態資源..."
cd frontend
npm install
npm run build
cd ..

# 設置 Python 虛擬環境
echo "📦 部署後端服務..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cd ..

# 啟動 PM2
if command -v pm2 &> /dev/null; then
    pm2 start "cd backend && source venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000" --name "bazi-backend"
    pm2 start "cd frontend && npx serve -s dist -l 3000" --name "bazi-frontend"
    pm2 save
    echo "✅ PM2 守護進程已啟動！"
else
    echo "⚠️ 請安裝 PM2 (npm install -g pm2) 或使用 Docker Compose 進行守護進程管理。"
fi
