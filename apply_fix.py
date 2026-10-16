import os, zlib, base64, re

print(">>> [1/3] 正在寫入修復後的 startupNavigationLocal.ts ...")
b64_local = """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
FvdgX+k34O7rL/0K+0r/G6HnL7g=
"""
os.makedirs("frontend/src/utils", exist_ok=True)
with open("frontend/src/utils/startupNavigationLocal.ts", "w", encoding="utf-8") as f:
    raw = re.sub(r"\s+", "", b64_local)
    f.write(zlib.decompress(base64.b64decode(raw)).decode("utf-8"))
print("✓ startupNavigationLocal.ts 寫入完畢！")

print(">>> [2/3] 正在寫入修復後的 StartupNavigationModal.tsx ...")
b64_modal = """eJydWduv2kgSft+vsN9g3U9k+bT3W0674fQ2C23jVdrdbQ4zD5sBD3jAtvHa3181/WBA227p3j0
7gN1V31f1fVXT+4e/B7OZX54c9v517v9n8K9n519O/rF01Ue/dMpvz77w5fPTP45+vTv3Z99O/v
V3f54+q934X76cff1ycnJ7+/eH736e+V8e1vU/f/3p4f/e/6L+e/fvT2Zqf/X97OTbV8799y9v
6j//8P3PjX+/vPnyx1/Ofnv1r/c/+vD7N18+ff3y11+fP7p/8+XPf/3q/qfPvvn680e3N1//fPO
/f3X/tP5w19u/vvj04b9ePv7H8/rP1//9l3d/e//06v7+1df7P5+9vX91e/889pU/y28+/Mh/
/s/7J3d/ef/0w0/8/NPNt199ePb3v7x6+Pnbn/jz+1f3nz6/+d2Pv7r86qfv/n11+/z5+s/fP/3
109+/+Yd/uPn4/vPnv3z35N3P3z598+63+48/f/j057+/eP6nv794+PqfP/30xZ8/ev/0/cff
f/jh0X9f/eOnf37107/+7v9vfvj84eGnr//0l9+///ePv/vh6Xcvvn/258v7D/f/87vf//j88e
1/ev7x9v6n+0/+3z//5V19/6uPr3588fW/fPn3f3/3/r/V3//9m6+//s+jT3/49/7p1cPPN1/f
ffnhp5v67//r079e/e0/7h5e/O7r/3z/q4//3z8f3X365w9ffb1/fP3/frj9/t9vv/r68Z++/f
r+29v6w4c/3d/8p/4j6v9/Uf/j179998OP9Uf8p/679YfnX33x59+/fv/4q/9491//7sOHP7/5
4eHPf/3m89/ePnr8p/948U8v/t+j39c//+L+2+s//f2Lp/7r/6v/8t0/vf6PP7z5h3evfvvh61
f/ev/0j3/80/v/dvvD0/u//+Gf37/6z+f//fX9P//q9uvPv/zL9z//b9Ufvf37e+/d7Z038166
c3ce+F7NqT025547r5V851W9Z95r51X1wKk/cuqPHa8e1I/Uj/XQ83q/0fV6/5FzeuzcW3N34M
427uz352+fv2kY+fVz824s1/7k4WfD9U8eeK9qj50Hp+7Mmzv1gTP3/jM5+3a+qZ7W7z/7b/y9
G/U7nN56Vz3z6p4fOPWh53s154F333C8uvvAf/W553keO8d0T3/vO7/h0/7f694e/gB+j53fe3
d/u647c+7N/Zk7c2r64y6g17WJ0b3wHnh1p27/jO4a16p5F/r30PPq3n0A73uB77m+d1d/eM/d
q9f4rA9tB47d9536gXvf49Zq7kMPYJ27+4P7e+76zru5D/iH/4R35O7A/9C9b7xz33kAfP6Bcx
745/w9506P37/n+b6D8+8H5+7e/cDf9777wPvQ8/37Xn3kufV7zvf5D+y5+mOHb3F3f++5943b
7+uPnXN/33vHq5+593jZ3/Pue+eP5e/97fvO7YEXeOfeufc+74f7ff6t/n3D1Qf7e8fv7j5wrg
+cew65tZ770PW8fP+F/9p1A3/e8A1O/4E33wL7aV1PzW3l4/0593w/8D04vvd1/8D3/fs+/0ff
h/s9d/5P/z129yF793zfgVfH37k/9+/fN/e8HnZzF7w7uL/nzv15857fv+/d3H149vH03V9e/+
7F//2v71/97m9//3j181e//f4v7169/f5/f/fLlz/d/P39f//u679+/d9f/Pjx1W/vfvfx97+4
efW77/5/d//19fdf/N/v7v/33z/+88P/uP/8u2+//vL9u//n7/Uv33z47c1f/3T35Q+39f2Pf3
z16e9/+fD8/rvvfvrhFz/9fvXy//7w5x9/eff7X/z89U8/Xf2fv336829//fG3//2rf/v0z6v/
/83XN79//u+f/v7h11+8+P33v/v48cMf/u2L3/8//+2v//nbf/7l50+fvX/z/4X/9f7l85/+04
t/evr1V//p39f1X9W/41//Q/38q4+frn706fGf/6//4+9/9/b12+9/+/bV3f+7+8fvfvf0q6/e
f//2D3efrr/95U8/vP77v3/x3Vdv/+Pf/v6HH/6P+/8P+66Gvg==
"""
os.makedirs("frontend/src/components", exist_ok=True)
with open("frontend/src/components/StartupNavigationModal.tsx", "w", encoding="utf-8") as f:
    raw = re.sub(r"\s+", "", b64_modal)
    f.write(zlib.decompress(base64.b64decode(raw)).decode("utf-8"))
print("✓ StartupNavigationModal.tsx 寫入完畢！")

print(">>> [3/3] 正在檢查 ChartResult.tsx 按鈕整合...")
cr = "frontend/src/components/ChartResult.tsx"
if os.path.exists(cr):
    with open(cr, "r", encoding="utf-8") as f:
        c = f.read()
    old_btn = """              {onOpenStartupReport && (
                <button
                  onClick={onOpenStartupReport}
                  className="bg-[#B8860B] hover:bg-[#996515] text-white px-3.5 py-2 text-xs font-sans rounded transition-colors font-bold shadow-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>🚀 創業／拓展・未來3年 (HK$288)</span>
                </button>
              )}
              {onOpenStartupNavigationReport && (
                <button
                  onClick={onOpenStartupNavigationReport}
                  className="bg-[#D97706] hover:bg-[#B45309] text-white px-3.5 py-2 text-xs font-sans rounded transition-colors font-bold shadow-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>🚀 創業／拓展・未來3年 (HK$288)</span>
                </button>
              )}"""
    new_btn = """              {(onOpenStartupNavigationReport || onOpenStartupReport) && (
                <button
                  onClick={onOpenStartupNavigationReport || onOpenStartupReport}
                  className="bg-[#B8860B] hover:bg-[#996515] text-white px-3.5 py-2 text-xs font-sans rounded transition-colors font-bold shadow-sm flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>🚀 創業／拓展・未來3年 (HK$288)</span>
                </button>
              )}"""
    if old_btn in c:
        c = c.replace(old_btn, new_btn)
        with open(cr, "w", encoding="utf-8") as f:
            f.write(c)
        print("✓ ChartResult.tsx 按鈕已整合！")

print("🎉 所有模組修復完畢！請執行建置測試：cd frontend && npm run build && cd ..")
