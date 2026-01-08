import React from 'react';

const SettingsModal = ({ isOpen, onClose, serverName, setServerName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-85 backdrop-blur-sm">
      <div className="w-[600px] h-[400px] bg-[#313338] rounded-lg shadow-2xl flex overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* القائمة الجانبية للإعدادات */}
        <div className="w-48 bg-[#2b2d31] p-6 flex flex-col space-y-1">
          <h2 className="text-[11px] font-bold text-gray-400 uppercase mb-2 px-2 tracking-wider">إعدادات السيرفر</h2>
          <button className="text-left px-2 py-1.5 rounded bg-[#3f4147] text-white text-sm font-medium">نظرة عامة</button>
          <button className="text-left px-2 py-1.5 rounded hover:bg-[#35373c] text-gray-400 text-sm">الأدوار</button>
          <button className="text-left px-2 py-1.5 rounded hover:bg-[#35373c] text-gray-400 text-sm text-red-400 mt-auto">حذف السيرفر</button>
        </div>

        {/* محتوى الإعدادات الرئيسي */}
        <div className="flex-1 p-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 flex flex-col items-center group"
          >
            <div className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-gray-600 group-hover:text-white transition-all">✕</div>
            <span className="text-[10px] text-gray-500 mt-1 font-bold group-hover:text-gray-300">ESC</span>
          </button>

          <h1 className="text-xl font-bold text-white mb-6">نظرة عامة على السيرفر</h1>
          
          <div className="flex space-x-8 space-x-reverse mb-8">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 bg-[#5865f2] rounded-full flex items-center justify-center text-3xl font-bold overflow-hidden relative">
                {serverName[0]}
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-center p-2">تغيير الأيقونة</div>
              </div>
            </div>

            <div className="flex-1">
              <label className="text-xs font-bold text-gray-400 uppercase block mb-2 tracking-wide">اسم السيرفر</label>
              <input 
                type="text" 
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                className="w-full bg-[#1e1f22] p-2.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="border-t border-[#3f4147] pt-6 flex justify-end">
             <button onClick={onClose} className="bg-discord-blurple hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-bold transition-colors">حفظ التغييرات</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
