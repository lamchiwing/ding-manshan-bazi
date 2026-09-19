import React from 'react';

interface HeaderProps {
  currentView: 'home' | 'online-services' | 'booking-services' | 'service-solo';
  onNavigate: (view: 'home' | 'online-services' | 'booking-services') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#1e2022]/95 backdrop-blur border-b border-[#1E3A5F]/40 font-sans">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="cursor-pointer text-xl md:text-2xl font-serif tracking-widest flex items-center select-none"
        >
          <span className="text-[#D97706] font-bold">丁</span>
          <span className="text-[#D97706] mx-1 font-light">｜</span>
          <span className="text-[#F4EFEA] font-semibold">蔓山</span>
          <span className="text-[#A4B3C6] text-sm ml-2 font-sans font-light">命理誌</span>
        </div>

        {/* Clean Navigation: 主頁 | 線上服務 | 線上一對一預約 | 命理誌 */}
        <nav className="flex items-center space-x-4 sm:space-x-8 text-xs sm:text-sm text-[#A4B3C6]">
          <button
            onClick={() => onNavigate('home')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 ${
              currentView === 'home' ? 'text-[#D97706] font-semibold border-b-2 border-[#D97706]' : ''
            }`}
          >
            主頁
          </button>

          <button
            onClick={() => onNavigate('online-services')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 ${
              currentView === 'online-services' ? 'text-[#D97706] font-semibold border-b-2 border-[#D97706]' : ''
            }`}
          >
            線上服務
          </button>

          <button
            onClick={() => onNavigate('booking-services')}
            className={`hover:text-[#F4EFEA] transition-colors py-1 ${
              currentView === 'booking-services' ? 'text-[#D97706] font-semibold border-b-2 border-[#D97706]' : ''
            }`}
          >
            線上一對一預約
          </button>

          <a
            href="#magazine"
            onClick={(e) => {
              if (currentView !== 'home') {
                onNavigate('home');
                setTimeout(() => {
                  const el = document.getElementById('magazine');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                const el = document.getElementById('magazine');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hover:text-[#F4EFEA] transition-colors py-1"
          >
            命理誌
          </a>

          {/* Social Follow: Threads */}
          <a
            href="https://www.threads.net/@ting.manshan"
            target="_blank"
            rel="noopener noreferrer"
            title="在 Threads 追蹤丁蔓山 (@ting.manshan)"
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#2A3B4C]/60 hover:bg-[#1E3A5F] text-[#F4EFEA] border border-[#4B5E71]/40 hover:border-[#D97706]/60 transition-all text-xs font-mono group"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#D97706] group-hover:scale-110 transition-transform" viewBox="0 0 192 192">
              <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4384 44.7443 97.3155 44.7443 97.193 44.745C75.8398 44.745 59.2064 57.5147 55.4386 76.7828C55.0569 78.7351 56.3262 80.6401 58.2721 81.034C60.218 81.4279 62.1154 80.1652 62.5022 78.2195C65.5562 62.6074 78.8953 52.338 97.193 52.338C97.2917 52.3373 97.3905 52.3373 97.4893 52.338C117.164 52.4639 129.542 64.9126 131.066 87.7121C122.951 88.3582 113.805 90.0767 104.093 92.9972C80.2014 100.187 67.2415 111.455 69.4589 127.348C70.6105 135.602 75.8778 142.348 83.7431 145.674C90.2882 148.444 98.2435 148.749 106.185 146.536C117.151 143.479 125.753 136.216 131.62 125.044C137.261 133.568 144.783 138.895 154.215 140.088C154.825 140.165 155.438 140.203 156.049 140.203C166.702 140.203 175.767 131.785 178.694 119.165C182.029 104.782 178.835 88.8927 169.704 74.4578C159.083 57.6698 141.488 47.4579 120.158 45.698C89.5432 43.1706 63.8569 58.7471 52.7937 83.1818C42.4776 105.968 45.6429 133.398 60.751 151.78C73.4939 167.28 92.2046 176.001 113.356 176.326C113.864 176.334 114.373 176.338 114.881 176.338C127.287 176.338 139.066 172.936 148.971 166.505C150.609 165.441 151.077 163.245 150.013 161.607C148.948 159.969 146.752 159.501 145.114 160.565C136.195 166.356 125.603 169.418 114.471 169.418C114.009 169.418 113.548 169.414 113.088 169.407C94.2057 169.117 77.4913 161.319 66.0827 147.433C52.4347 130.826 49.5694 106.012 58.8927 85.4056C68.9103 63.267 92.2227 49.0984 119.98 51.3892C138.865 52.9469 154.409 61.9687 163.784 76.7865C171.97 89.7289 174.832 103.957 171.868 116.732C169.584 126.577 162.593 133.284 154.269 133.284C153.866 133.284 153.46 133.255 153.053 133.204C144.331 132.1 137.378 126.155 133.626 116.516C137.893 108.318 140.71 98.9798 141.537 88.9883ZM131.785 96.0872C130.407 105.748 127.359 114.477 122.951 121.78C117.891 130.165 111.026 135.539 103.206 137.728C96.9016 139.49 90.7383 139.115 85.9922 136.684C80.8988 134.075 77.2917 129.288 76.438 123.18C74.6542 110.377 85.9084 100.751 106.398 94.5776C114.619 92.1009 122.936 90.5846 131.785 96.0872Z" />
            </svg>
            <span className="hidden sm:inline">Threads</span>
          </a>
        </nav>

      </div>
    </header>
  );
};