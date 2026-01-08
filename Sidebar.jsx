import React from 'react';

const Sidebar = () => {
  // بيانات وهمية لمحاكاة السيرفرات
  const servers = [
    { id: 1, name: 'Home', icon: 'H', color: 'bg-[#5865f2]' },
    { id: 2, name: 'Gaming', icon: 'G', color: 'bg-[#36393f]' },
    { id: 3, name: 'Study', icon: 'S', color: 'bg-[#36393f]' },
    { id: 4, name: 'Add', icon: '+', color: 'bg-[#36393f]', special: 'text-[#3ba55d]' },
  ];

  return (
    <div className="flex h-screen bg-[#36393f] overflow-hidden font-sans">
      
      {/* 1. قائمة السيرفرات العمودية (أقصى اليمين/اليسار) */}
      <nav className="w-[72px] bg-[#1e1f22] flex flex-col items-center py-3 space-y-2 shrink-0">
        {servers.map((server) => (
          <div key={server.id} className="relative group flex items-center">
            {/* المؤشر الأبيض الصغير عند التمرير */}
            <div className="absolute left-0 w-1 h-2 bg-white rounded-r-full scale-0 group-hover:scale-100 transition-all duration-200" />
            
            <div className={`${server.color} w-12 h-12 flex items-center justify-center rounded-[24px] group-hover:rounded-[16px] transition-all duration-200 cursor-pointer shadow-lg`}>
              <span className={`text-xl font-bold ${server.special || 'text-white'}`}>
                {server.icon}
              </span>
            </div>

            {/* اسم السيرفر يظهر عند التمرير (Tooltip) */}
            <div className="absolute left-16 bg-black text-white text-xs font-bold px-3 py-2 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              {server.name}
            </div>
          </div>
        ))}
      </nav>

      {/* 2. قائمة القنوات (Channel List) */}
      <aside className="w-60 bg-[#2b2d31] flex flex-col shrink-0">
        {/* رأس القائمة - اسم السيرفر الحالي */}
        <header className="h-12 px-4 flex items-center justify-between shadow-sm border-b border-[#1f2023] hover:bg-[#35373c] cursor-pointer transition-colors">
          <h1 className="font-bold text-white truncate">سيرفر الأصدقاء 🚀</h1>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </header>

        {/* محتوى القنوات */}
        <div className="flex-1 overflow-y-auto pt-4 custom-scrollbar">
          {/* تصنيف القنوات النصية */}
          <div className="px-2 mb-4">
            <div className="flex items-center px-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-100 cursor-pointer">
              <span className="mr-1">▼</span> القنوات الكتابية
            </div>
            <div className="mt-1 space-y-[2px]">
              {['عام-general', 'أخبار-news', 'صور-media'].map((ch) => (
                <div key={ch} className="flex items-center px-2 py-1.5 rounded-md text-gray-400 hover:bg-[#35373c] hover:text-gray-100 cursor-pointer group">
                  <span className="text-xl mr-2 text-gray-500 group-hover:text-gray-300">#</span>
                  <span className="text-[15px] font-medium">{ch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* تصنيف القنوات الصوتية */}
          <div className="px-2">
            <div className="flex items-center px-1 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-100 cursor-pointer">
              <span className="mr-1">▼</span> القنوات الصوتية
            </div>
            <div className="mt-1 space-y-[2px]">
              {['غرفة الإنتظار', 'صالة الألعاب'].map((vc) => (
                <div key={vc} className="flex items-center px-2 py-1.5 rounded-md text-gray-400 hover:bg-[#35373c] hover:text-gray-100 cursor-pointer group">
                  <svg className="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.984 3.984 0 00-1.172-2.828 1 1 0 010-1.415z" />
                  </svg>
                  <span className="text-[15px] font-medium">{vc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* لوحة المستخدم السفلية */}
        <div className="h-[52px] bg-[#232428] px-2 flex items-center space-x-2 shrink-0">
          <div className="relative cursor-pointer group">
            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-xs font-bold">ME</div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#232428] rounded-full"></div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-bold text-white truncate leading-tight">GeminiUser</div>
            <div className="text-[11px] text-gray-400 leading-tight">#9999</div>
          </div>
          <div className="flex space-x-1">
             <button className="p-1.5 hover:bg-[#3f4147] rounded-md text-gray-400 hover:text-gray-200">🎤</button>
             <button className="p-1.5 hover:bg-[#3f4147] rounded-md text-gray-400 hover:text-gray-200">🎧</button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
