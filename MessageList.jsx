import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
      {messages.map((msg, index) => {
        // التحقق مما إذا كانت الرسالة من نفس المستخدم لتجميعها (مثل ديسكورد)
        const isSameUser = index > 0 && messages[index - 1].user === msg.user;

        return (
          <div key={msg.id} className={`group flex px-4 ${isSameUser ? 'py-0.5' : 'py-3 mt-4'} hover:bg-[#2e3035] -mx-4 transition-colors relative`}>
            
            {/* عرض الصورة الرمزية فقط إذا كانت أول رسالة في المجموعة */}
            {!isSameUser ? (
              <div className="w-10 h-10 rounded-full bg-[#5865f2] flex shrink-0 items-center justify-center font-bold text-white ml-4 mt-1">
                {msg.avatar}
              </div>
            ) : (
              /* مساحة فارغة في حال تجميع الرسائل */
              <div className="w-10 ml-4 flex shrink-0 justify-center">
                <span className="hidden group-hover:block text-[10px] text-gray-400 mt-1">
                   {msg.time.split(' ')[0]}
                </span>
              </div>
            )}
            
            <div className="flex flex-col w-full">
              {!isSameUser && (
                <div className="flex items-baseline space-x-2 space-x-reverse">
                  <span className="font-bold text-white hover:underline cursor-pointer">
                    {msg.user}
                  </span>
                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                </div>
              )}
              
              <div className="text-[#dbdee1] text-[15px] leading-relaxed break-words">
                {/* معالجة الروابط أو المنشن (تبسيط) */}
                {msg.text.includes('@') ? (
                  <span className="bg-[#5865f2] bg-opacity-30 text-[#dee0fc] px-1 rounded hover:bg-opacity-100 cursor-pointer">
                    {msg.text}
                  </span>
                ) : (
                  msg.text
                )}

                {/* عرض الصور المرفوعة */}
                {msg.image && (
                  <div className="mt-2 max-w-[400px] rounded-lg overflow-hidden border border-[#232428]">
                    <img src={msg.image} alt="attachment" className="w-full h-auto" />
                  </div>
                )}
              </div>
            </div>

            {/* قائمة التفاعلات تظهر عند Hover */}
            <div className="absolute -top-4 left-10 hidden group-hover:flex bg-[#2b2d31] border border-[#1e1f22] rounded shadow-lg z-10">
               <button className="p-1.5 hover:bg-[#35373c] text-xs">😀</button>
               <button className="p-1.5 hover:bg-[#35373c] text-xs">📝</button>
               <button className="p-1.5 hover:bg-[#35373c] text-xs text-red-400">🗑️</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
