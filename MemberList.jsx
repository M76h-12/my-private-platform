import React from 'react';

const MemberList = ({ users }) => {
  // تصنيف المستخدمين حسب حالتهم (Online, Offline)
  const onlineUsers = users.filter(u => u.status === 'online');
  const offlineUsers = users.filter(u => u.status === 'offline');

  return (
    <aside className="w-60 bg-[#2b2d31] flex flex-col border-l border-[#26272b] shrink-0 hidden lg:flex">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
        
        {/* قسم المتصلين الآن */}
        <div className="mb-6">
          <h3 className="px-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            متصل — {onlineUsers.length}
          </h3>
          {onlineUsers.map((user) => (
            <div key={user.id} className="group flex items-center px-2 py-1.5 rounded-md hover:bg-[#35373c] cursor-pointer transition-colors mb-1">
              <div className="relative ml-3">
                {/* الصورة الرمزية */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs bg-discord-blurple shadow-inner`}>
                  {user.name[0].toUpperCase()}
                </div>
                {/* نقطة الحالة الخضراء (Online) */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-discord-green border-[3px] border-[#2b2d31] rounded-full"></div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-gray-400 group-hover:text-white truncate">
                  {user.name}
                </span>
                {user.activity && (
                  <span className="text-[10px] text-gray-500 truncate">يلعب {user.activity}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* قسم غير المتصلين */}
        <div>
          <h3 className="px-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
            غير متصل — {offlineUsers.length}
          </h3>
          {offlineUsers.map((user) => (
            <div key={user.id} className="flex items-center px-2 py-1.5 opacity-50 grayscale">
              <div className="relative ml-3">
                <div className="w-8 h-8 rounded-full bg-[#41434a] flex items-center justify-center text-gray-300 font-bold text-xs">
                  {user.name[0].toUpperCase()}
                </div>
                {/* نقطة الحالة الرمادية (Offline) */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#747f8d] border-[3px] border-[#2b2d31] rounded-full"></div>
              </div>
              <span className="text-sm font-medium text-gray-500 truncate">{user.name}</span>
            </div>
          ))}
        </div>

      </div>

      {/* شريط البحث عن أعضاء في الأسفل */}
      <div className="p-3 bg-[#232428]">
        <div className="bg-[#1e1f22] rounded flex items-center px-2 py-1 border border-transparent focus-within:border-discord-blurple transition-all">
          <input 
            type="text" 
            placeholder="البحث عن عضو..." 
            className="bg-transparent text-[11px] w-full focus:outline-none"
          />
        </div>
      </div>
    </aside>
  );
};

export default MemberList;
