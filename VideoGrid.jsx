import React, { useEffect, useRef, useState } from 'react';

const VideoGrid = ({ localStream, remoteStreams }) => {
  // هذا المكون سيعرض شبكة فيديوهات ذكية مثل ديسكورد
  return (
    <div className="flex-1 bg-[#1e1f22] p-4 overflow-y-auto custom-scrollbar">
      <div className={`grid gap-4 h-full ${
        remoteStreams.length === 0 ? 'grid-cols-1' : 
        remoteStreams.length === 1 ? 'grid-cols-2' : 'grid-cols-3'
      }`}>
        
        {/* الفيديو الخاص بك (Local Video) */}
        <div className="relative group bg-black rounded-xl overflow-hidden aspect-video border-2 border-[#5865f2] shadow-2xl">
          <video
            ref={(ref) => { if (ref) ref.srcObject = localStream }}
            autoPlay
            muted
            className="w-full h-full object-cover transform scale-X-[-1]"
          />
          <div className="absolute bottom-4 left-4 flex items-center bg-black bg-opacity-60 px-3 py-1 rounded-md">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-white text-sm font-bold">أنت (أنا)</span>
          </div>
          {/* أدوات التحكم السريعة على الفيديو */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-4 space-x-reverse">
              <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700">🎤</button>
              <button className="p-3 bg-gray-800 rounded-full hover:bg-gray-700">📷</button>
            </div>
          </div>
        </div>

        {/* فيديوهات الأصدقاء (Remote Streams) */}
        {remoteStreams.map((stream, index) => (
          <div key={index} className="relative group bg-black rounded-xl overflow-hidden aspect-video border-2 border-transparent hover:border-[#3ba55d] transition-all">
            <video
              ref={(ref) => { if (ref) ref.srcObject = stream.stream }}
              autoPlay
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 flex items-center bg-black bg-opacity-60 px-3 py-1 rounded-md">
              <span className="text-white text-sm font-bold">{stream.userName || 'صديق متصل'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* شريط التحكم السفلي في المكالمة (Call Controls) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-[#232428] px-8 py-3 rounded-full flex items-center space-x-6 space-x-reverse shadow-2xl border border-[#1e1f22]">
        <button className="group flex flex-col items-center">
          <div className="p-3 bg-[#313338] rounded-full group-hover:bg-[#404249] text-white">📷</div>
          <span className="text-[10px] text-gray-400 mt-1">كاميرا</span>
        </button>
        <button className="group flex flex-col items-center">
          <div className="p-3 bg-[#313338] rounded-full group-hover:bg-[#404249] text-white">🎤</div>
          <span className="text-[10px] text-gray-400 mt-1">كتم</span>
        </button>
        <button className="group flex flex-col items-center">
          <div className="p-3 bg-[#313338] rounded-full group-hover:bg-[#404249] text-white">🖥️</div>
          <span className="text-[10px] text-gray-400 mt-1">مشاركة</span>
        </button>
        <div className="w-[1px] h-8 bg-gray-700 mx-2"></div>
        <button className="group flex flex-col items-center">
          <div className="p-3 bg-[#f23f42] rounded-full hover:bg-[#d83c3e] text-white font-bold rotate-[135deg]">📞</div>
          <span className="text-[10px] text-gray-400 mt-1">إنهاء</span>
        </button>
      </div>
    </div>
  );
};

export default VideoGrid;
