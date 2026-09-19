import React from 'react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'contact';
  onNavigateHome: () => void;
  onNavigateBooking: () => void;
  onSwitchLegalTab: (tab: 'privacy' | 'terms' | 'contact') => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  type,
  onNavigateHome,
  onNavigateBooking,
  onSwitchLegalTab,
}) => {
  return (
    <div className="w-full min-h-[80vh] py-8 md:py-12 px-4 sm:px-8 md:px-12 lg:px-16 max-w-[1100px] mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-[#A4B3C6] mb-8 pb-4 border-b border-[#1E3A5F]/40">
        <button
          onClick={onNavigateHome}
          className="hover:text-[#D97706] transition-colors cursor-pointer"
        >
          主頁
        </button>
        <span>/</span>
        <span className="text-[#F4EFEA] font-medium">
          {type === 'privacy' && '隱私權政策'}
          {type === 'terms' && '服務條款'}
          {type === 'contact' && '聯絡我們'}
        </span>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-3 sm:space-x-6 border-b border-[#2A3B4C] mb-8 pb-2 text-sm overflow-x-auto">
        <button
          onClick={() => onSwitchLegalTab('privacy')}
          className={`pb-2 px-1 transition-all whitespace-nowrap cursor-pointer ${
            type === 'privacy'
              ? 'text-[#D97706] font-bold border-b-2 border-[#D97706]'
              : 'text-[#A4B3C6] hover:text-[#F4EFEA]'
          }`}
        >
          隱私權政策 (Privacy Policy)
        </button>
        <button
          onClick={() => onSwitchLegalTab('terms')}
          className={`pb-2 px-1 transition-all whitespace-nowrap cursor-pointer ${
            type === 'terms'
              ? 'text-[#D97706] font-bold border-b-2 border-[#D97706]'
              : 'text-[#A4B3C6] hover:text-[#F4EFEA]'
          }`}
        >
          服務條款 (Terms of Service)
        </button>
        <button
          onClick={() => onSwitchLegalTab('contact')}
          className={`pb-2 px-1 transition-all whitespace-nowrap cursor-pointer ${
            type === 'contact'
              ? 'text-[#D97706] font-bold border-b-2 border-[#D97706]'
              : 'text-[#A4B3C6] hover:text-[#F4EFEA]'
          }`}
        >
          聯絡我們 (Contact Us)
        </button>
      </div>

      {/* 1. Privacy Policy */}
      {type === 'privacy' && (
        <article className="bg-[#1e2022] border border-[#1E3A5F]/40 rounded-xl p-6 sm:p-10 text-[#F4EFEA] shadow-xl space-y-8 font-sans">
          <header className="border-b border-[#2A3B4C] pb-6">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4EFEA] tracking-wide mb-2">
              隱私權政策 (Privacy Policy)
            </h1>
            <p className="text-xs text-[#A4B3C6] font-mono">
              生效日期：2026 年 9 月 16 日 ｜ 適用網站：tingmanshan.com（丁蔓山｜命理誌）
            </p>
          </header>

          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            歡迎造訪 <span className="text-[#D97706] font-mono">tingmanshan.com</span>（以下簡稱「本網站」）。我們非常重視您的個人隱私與資料安全，本隱私權政策旨在說明我們如何收集、使用、處理及保護您的個人資訊。
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              一、 個人資料之收集
            </h2>
            <div className="text-sm text-[#CBD5E1] space-y-2 leading-relaxed">
              <p>當您瀏覽本網站或使用相關八字排盤、線上諮詢預約服務時，我們可能會收集以下資料：</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-[#A4B3C6]">
                <li>
                  <strong className="text-[#F4EFEA]">聯絡資訊：</strong> 包括但不限於姓名、電子郵件地址、聯絡電話（例如您於預約服務、填寫備註或透過電郵查詢時所提供之資訊）。
                </li>
                <li>
                  <strong className="text-[#F4EFEA]">命理與諮詢所需資訊：</strong> 包括出生年、月、日、時辰、性別，以及風水佈局所需之單位實用面積或地址等，僅用於命理運勢推算與專業風水規劃。
                </li>
                <li>
                  <strong className="text-[#F4EFEA]">交易資訊：</strong> 當您在本網站進行預約付款或購買服務時，相關金流處理均由國際認證第三方支付服務商（如 Stripe）以 PCI-DSS 標準安全加密處理，本網站伺服器不會直接儲存您的完整信用卡號或安全碼。
                </li>
                <li>
                  <strong className="text-[#F4EFEA]">技術數據：</strong> 包括 IP 地址、瀏覽器類型、造訪時間及瀏覽頁面等 Log 系統日誌記錄。
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              二、 資料使用目的
            </h2>
            <div className="text-sm text-[#CBD5E1] space-y-2 leading-relaxed">
              <p>我們收集的資料將嚴格用於以下合法用途：</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-[#A4B3C6]">
                <li>提供、維運、計算及優化本網站之八字命盤、流年運勢與專題專欄內容。</li>
                <li>處理預約諮詢排期、安全完成付款交易並自動發送官方電子收據或訂單確認信件。</li>
                <li>回覆您的預約查詢、提供專業客戶支援或發送重要服務相關通知（如會面準備通知、餘額繳付提醒等）。</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              三、 Cookies 與追蹤技術
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              本網站可能使用 Cookies 與本地存儲技術以保存您當前的排盤設定、提升瀏覽體驗與分析網站流量。您可隨時透過瀏覽器設定拒絕或清除 Cookies，但此舉可能會影響本網站部分功能之正常記憶與運作。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              四、 第三方服務與資料分享
            </h2>
            <div className="text-sm text-[#CBD5E1] space-y-2 leading-relaxed">
              <p>
                我們<strong>絕不會</strong>將您的個人資料出售、出租或非法披露給任何無關第三方。僅在以下必要情況下，我們可能會與受信任的技術夥伴共享必要資料：
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-[#A4B3C6]">
                <li>
                  <strong className="text-[#F4EFEA]">金流服務商：</strong> 如 Stripe，僅用於完成信用卡安全付款驗證、退款處理及發送官方電子收據。
                </li>
                <li>
                  <strong className="text-[#F4EFEA]">基礎設施服務商：</strong> 如 Cloudflare、雲端託管平台，用於確保全球高速安全訪問、防止 DDoS 攻擊與保持系統穩定運作。
                </li>
                <li>
                  <strong className="text-[#F4EFEA]">法律要求：</strong> 依據法令規定或司法機關之法定合法要求。
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              五、 資料安全保護措施
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              我們採用業界最高規格之 SSL/TLS 加密傳輸協議，保障您傳輸之命盤與個人資料免於未授權的存取、竄改或洩漏。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              六、 您的權利與聯絡方式
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              依據適用之個人資料保護法規，您有權隨時要求查詢、查閱、更正或刪除我們所持有關於您的個人資料。如有任何疑問或資料處理請求，請透過「聯絡我們」專用信箱{' '}
              <a
                href="mailto:inquiry@tingmanshan.com"
                className="text-[#D97706] hover:underline font-mono"
              >
                inquiry@tingmanshan.com
              </a>{' '}
              與我們聯繫。
            </p>
          </section>
        </article>
      )}

      {/* 2. Terms of Service */}
      {type === 'terms' && (
        <article className="bg-[#1e2022] border border-[#1E3A5F]/40 rounded-xl p-6 sm:p-10 text-[#F4EFEA] shadow-xl space-y-8 font-sans">
          <header className="border-b border-[#2A3B4C] pb-6">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4EFEA] tracking-wide mb-2">
              服務條款 (Terms of Service)
            </h1>
            <p className="text-xs text-[#A4B3C6] font-mono">
              生效日期：2026 年 9 月 16 日 ｜ 適用網站：tingmanshan.com（丁蔓山｜命理誌）
            </p>
          </header>

          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            歡迎使用 <span className="text-[#D97706] font-mono">tingmanshan.com</span>。存取或使用本網站及其提供之命理排盤、線上諮詢與風水預約服務，即表示您已完整閱讀並同意受本服務條款之約束。
          </p>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              一、 服務內容與使用規範
            </h2>
            <div className="text-sm text-[#CBD5E1] space-y-2 leading-relaxed">
              <p>
                本網站提供專業八字排盤、流年運勢分析、一對一視訊諮詢預約以及環境風水勘察規劃等服務。
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-[#A4B3C6]">
                <li>使用者應遵守所有適用之法律法規，不得利用本網站進行任何惡意攻擊、未經授權之爬蟲抓取、干擾伺服器運作或侵權行為。</li>
                <li>我們保留隨時因技術升級、排程調度需要，合理修改、暫停或更新本網站全部或部分服務內容之權利。</li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              二、 預約、付款與電子收據
            </h2>
            <div className="text-sm text-[#CBD5E1] space-y-2 leading-relaxed">
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#A4B3C6]">
                <li>
                  <strong className="text-[#F4EFEA]">安全金流：</strong> 本網站所有付費服務均透過全球頂級安全支付系統（Stripe）完成加密交易。
                </li>
                <li>
                  <strong className="text-[#F4EFEA]">電子收據派發：</strong> 完成付款後，Stripe 系統將自動發送官方電子收據至您付款時填寫之電子郵件地址。請務必確保填寫正確之 Email。
                </li>
                <li>
                  <strong className="text-[#F4EFEA]">八字論命前事排查機制：</strong> 「八字論命」預約採兩段式收費（預付前事排查訂金 HK$2,400；先判前事，若資料有誤或續談不果僅收訂金，餘款 HK$1,400 將於前事報告確認後、會面前 7 天繳付）。
                </li>
                <li>
                  <strong className="text-[#F4EFEA]">風水勘察計價標準：</strong> 家居及公司風水佈局按實用面積動態計算（分別設有最低消費標準）；查宅服務基礎方案包 3 單位及 1 個地區，額外單位與跨區加收費用均於系統即時透明計算。
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              三、 智慧財產權聲明
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              本網站上包含的所有內容（包括但不限於「丁蔓山」商標標誌、八字排盤算法邏輯、神煞與十神解析文字、風水專題刊物、圖像、版面設計及代碼架構）之智慧財產權均屬「丁蔓山｜命理誌」及相關權利人所有。未經事前書面明確授權，任何人不得擅自複製、重製、改作、散佈或作商業利用。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              四、 專業免責聲明 (Disclaimer)
            </h2>
            <div className="text-sm text-[#CBD5E1] space-y-2 leading-relaxed">
              <p>
                本網站所提供之命理排盤、五行生剋分析、流年吉凶預測與環境風水佈局建議，旨在基於中華傳統易學、哲學及統計學原理，為使用者提供客觀、冷靜與務實之生活參考與規劃指引。
              </p>
              <p className="text-[#A4B3C6]">
                命理與風水指引不能亦不應取代專業醫療診斷、法律意見或金融投資評估。對於因不可抗力、網路中斷、第三方金流異常或使用者依據建議所做出之個人商業或生活決定，本網站不承擔任何明示或暗示之連帶法律保證與責任。
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-serif font-semibold text-[#D97706] flex items-center">
              五、 條款修改與管轄
            </h2>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              我們保留隨時更新本服務條款之權利。更新後的條款自發布於本網站時起立即生效。本條款之解釋與適用均受香港特別行政區法律之管轄。
            </p>
          </section>
        </article>
      )}

      {/* 3. Contact Us */}
      {type === 'contact' && (
        <article className="bg-[#1e2022] border border-[#1E3A5F]/40 rounded-xl p-6 sm:p-10 text-[#F4EFEA] shadow-xl space-y-8 font-sans">
          <header className="border-b border-[#2A3B4C] pb-6">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#F4EFEA] tracking-wide mb-2">
              聯絡我們 (Contact Us)
            </h1>
            <p className="text-xs text-[#A4B3C6]">
              丁蔓山｜命理誌 官方客戶服務與預約支援通道
            </p>
          </header>

          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            如果您對我們的八字排盤、線上一對一預約諮詢、風水勘察服務、隱私權政策或服務條款有任何疑問、建議，或需要客戶支援，歡迎隨時透過以下專用管道與我們聯繫：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-[#141618] p-6 rounded-lg border border-[#2A3B4C] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#D97706]/10 border border-[#D97706]/30 flex items-center justify-center text-[#D97706] text-xl font-bold">
                ✉️
              </div>
              <h3 className="font-serif font-semibold text-[#F4EFEA] text-base">
                電子郵件 (Official Email)
              </h3>
              <p className="text-xs text-[#A4B3C6]">
                商務合作、預約諮詢及客戶支援專用信箱：
              </p>
              <a
                href="mailto:inquiry@tingmanshan.com"
                className="inline-block text-[#D97706] font-mono text-sm hover:underline font-bold"
              >
                inquiry@tingmanshan.com
              </a>
            </div>

            <div className="bg-[#141618] p-6 rounded-lg border border-[#2A3B4C] space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1E3A5F]/30 border border-[#1E3A5F] flex items-center justify-center text-[#A4B3C6] text-xl font-bold">
                ⏱️
              </div>
              <h3 className="font-serif font-semibold text-[#F4EFEA] text-base">
                服務時間 (Operating Hours)
              </h3>
              <p className="text-xs text-[#A4B3C6] leading-relaxed">
                週一至週五：09:00 - 18:00 (GMT+8 香港時間)<br />
                週末及公眾假期：提供線上自動排盤與預約登記服務
              </p>
              <p className="text-[11px] text-[#8A99AD]">
                我們會在收到您的訊息後 1-2 個工作天內盡快回覆。
              </p>
            </div>
          </div>

          {/* Official Threads Community Block */}
          <div className="bg-[#141618] p-6 rounded-lg border border-[#2A3B4C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-[#D97706]/15 border border-[#D97706]/40 flex items-center justify-center text-[#D97706] shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 192 192">
                  <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4384 44.7443 97.3155 44.7443 97.193 44.745C75.8398 44.745 59.2064 57.5147 55.4386 76.7828C55.0569 78.7351 56.3262 80.6401 58.2721 81.034C60.218 81.4279 62.1154 80.1652 62.5022 78.2195C65.5562 62.6074 78.8953 52.338 97.193 52.338C97.2917 52.3373 97.3905 52.3373 97.4893 52.338C117.164 52.4639 129.542 64.9126 131.066 87.7121C122.951 88.3582 113.805 90.0767 104.093 92.9972C80.2014 100.187 67.2415 111.455 69.4589 127.348C70.6105 135.602 75.8778 142.348 83.7431 145.674C90.2882 148.444 98.2435 148.749 106.185 146.536C117.151 143.479 125.753 136.216 131.62 125.044C137.261 133.568 144.783 138.895 154.215 140.088C154.825 140.165 155.438 140.203 156.049 140.203C166.702 140.203 175.767 131.785 178.694 119.165C182.029 104.782 178.835 88.8927 169.704 74.4578C159.083 57.6698 141.488 47.4579 120.158 45.698C89.5432 43.1706 63.8569 58.7471 52.7937 83.1818C42.4776 105.968 45.6429 133.398 60.751 151.78C73.4939 167.28 92.2046 176.001 113.356 176.326C113.864 176.334 114.373 176.338 114.881 176.338C127.287 176.338 139.066 172.936 148.971 166.505C150.609 165.441 151.077 163.245 150.013 161.607C148.948 159.969 146.752 159.501 145.114 160.565C136.195 166.356 125.603 169.418 114.471 169.418C114.009 169.418 113.548 169.414 113.088 169.407C94.2057 169.117 77.4913 161.319 66.0827 147.433C52.4347 130.826 49.5694 106.012 58.8927 85.4056C68.9103 63.267 92.2227 49.0984 119.98 51.3892C138.865 52.9469 154.409 61.9687 163.784 76.7865C171.97 89.7289 174.832 103.957 171.868 116.732C169.584 126.577 162.593 133.284 154.269 133.284C153.866 133.284 153.46 133.255 153.053 133.204C144.331 132.1 137.378 126.155 133.626 116.516C137.893 108.318 140.71 98.9798 141.537 88.9883ZM131.785 96.0872C130.407 105.748 127.359 114.477 122.951 121.78C117.891 130.165 111.026 135.539 103.206 137.728C96.9016 139.49 90.7383 139.115 85.9922 136.684C80.8988 134.075 77.2917 129.288 76.438 123.18C74.6542 110.377 85.9084 100.751 106.398 94.5776C114.619 92.1009 122.936 90.5846 131.785 96.0872Z" />
                </svg>
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#F4EFEA] text-sm flex items-center gap-2">
                  <span>官方社交專頁 (Threads)</span>
                  <span className="text-xs text-[#D97706] font-mono font-normal">@ting.manshan</span>
                </h4>
                <p className="text-xs text-[#A4B3C6] mt-0.5">
                  日常五行開運、流月吉凶分析與命理問答互動。
                </p>
              </div>
            </div>
            <a
              href="https://www.threads.net/@ting.manshan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold whitespace-nowrap transition-all shadow-md self-end sm:self-center"
            >
              追蹤 Threads ➜
            </a>
          </div>

          <div className="bg-[#1E3A5F]/20 border border-[#1E3A5F]/60 rounded-lg p-6 space-y-4">
            <h3 className="font-serif font-semibold text-[#D97706] text-base flex items-center">
              💡 預約與備註支援指引
            </h3>
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              若您正在進行各項服務的線上預約，您可以在預約表格的「<strong>備註與特殊需求</strong>」欄位中直接填寫您想探討的特定問題、命盤疑難或風水特殊要求；付款完成後系統會自動同步留存，老師於會面前將提前閱覽準備。
            </p>
            <div className="pt-2">
              <button
                onClick={onNavigateBooking}
                className="px-5 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                瀏覽線上一對一預約服務 ➜
              </button>
            </div>
          </div>
        </article>
      )}
    </div>
  );
};