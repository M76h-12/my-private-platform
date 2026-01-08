import React, { useState } from 'react';

const ChatArea = () => {
  const [message, setMessage] = useState('');
  
  // بيانات تجريبية لمحاكاة المحادثة
  const [chatHistory, setChatHistory] = useState([
    { id: 1, user: 'أحمد', avatar: 'A', time: '10:30 ص', text: 'يا شباب، متى نبدأ اللعب؟', color: 'text-red-400' },
    { id: 2, user: 'سارة', avatar: 'S', time: '10:31 ص', text: 'أنا جاهزة، بانتظار البقية.', color: 'text-blue-400' },
    { id: 3, user: 'خالد', avatar: 'K', time: '10:32 ص', text: 'أنا سأقوم بمشاركة الشاشة الآن لاريكم التحديث الجديد.', color: 'text-green-400' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      user: 'أنت',
      avatar: 'ME',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: message,
      color: 'text-yellow-400'
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setMessage('');
  };

  return (
    <main className="flex-1 flex flex-col bg-[#36393f] relative min-w-0">
      
      {/* 1. الشريط العلوي للقناة (Header) */}
      <header className="h-12 px-4 flex items-center shadow-sm border-b border-[#26272b] shrink-0">
        <div className="flex items-center text-gray-400 mr-2">
          <span className="text-2xl font-light">#</span>
        </div>
        <h3 className="font-bold text-white mr-4">عام-general</h3>
        <div className="hidden md:flex items-center border-r border-gray-600 h-6 mx-4"></div>
        <p className="hidden md:block text-xs text-gray-400">هذه هي بداية القناة العامة لجميع الأعضاء.</p>
        
        {/* أيقونات الأدوات العلوية */}
        <div className="mr-auto flex items-center space-x-4 space-x-reverse text-gray-400">
          <button className="hover:text-gray-200">🔔</button>
          <button className="hover:text-gray-200">📌</button>
          <button className="hover:text-gray-200">👥</button>
          <div className="bg-[#1e1f22] rounded px-2 py-0.5 flex items-center">
            <input type="text" placeholder="بحث" className="bg-transparent text-xs w-24 focus:w-40 transition-all outline-none p-1" />
            <span>🔍</span>
          </div>
        </div>
      </header>

      {/* 2. منطقة عرض الرسائل */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {/* رسالة الترحيب في بداية القناة */}
        <div className="mb-8 p-4">
          <div className="w-16 h-16 bg-[#41434a] rounded-full flex items-center justify-center text-4xl text-white mb-4">#</div>
          <h1 className="text-3xl font-bold text-white mb-2">مرحباً بك في #عام-general!</h1>
          <p className="text-gray-400">هذه هي بداية هذا السيرفر.</p>
        </div>

        {chatHistory.map((msg) => (
          <div key={msg.id} className="group flex px-4 py-1 hover:bg-[#2e3035] -mx-4 transition-colors">
            {/* الصورة الرمزية */}
            <div className="w-10 h-10 rounded-full bg-[#5865f2] flex shrink-0 items-center justify-center font-bold text-white mt-1 ml-4 cursor-pointer">
              {msg.avatar}
            </div>
            
            {/* محتوى الرسالة */}
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2 space-x-reverse">
                <span className={`font-bold hover:underline cursor-pointer ${msg.color}`}>{msg.user}</span>
                <span className="text-[10px] text-gray-400">{msg.time}</span>
              </div>
              <p className="text-[#dbdee1] text-[15px] leading-relaxed">{msg.text}</p>
            </div>

            {/* أزرار التفاعل السريع (تظهر عند التحويم فقط) */}
            <div className="absolute left-10 hidden group-hover:flex bg-[#2b2d31] border border-[#1e1f22] rounded-md shadow-xl -mt-4">
              <button className="p-1 hover:bg-[#35373c] px-2 text-sm">👍</button>
              <button className="p-1 hover:bg-[#35373c] px-2 text-sm">❤️</button>
              <button className="p-1 hover:bg-[#35373c] px-2 text-sm">💬</button>
              <button className="p-1 hover:bg-[#35373c] px-2 text-sm">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. صندوق إدخال الرسائل (Input) */}
      <div className="px-4 pb-6 shrink-0">
        <form onSubmit={handleSend} className="bg-[#383a40] rounded-lg flex flex-col p-1">
          <div className="flex items-center px-4 py-2">
            <button type="button" className="text-gray-400 hover:text-gray-200 ml-4 bg-[#b5bac1] rounded-full w-6 h-6 flex items-center justify-center text-black font-bold">+</button>
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب رسالة في #عام-general" 
              className="bg-transparent w-full text-[#dbdee1] focus:outline-none py-2"
            />
            <div className="flex items-center space-x-3 space-x-reverse mr-2 text-gray-400">
              <button type="button" className="hover:text-yellow-400">🎁</button>
              <button type="button" className="hover:text-gray-200">GIF</button>
              <button type="button" className="hover:text-gray-200">😊</button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ChatArea;
