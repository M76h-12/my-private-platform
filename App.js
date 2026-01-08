import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import VideoGrid from './components/VideoGrid';
import { Peer } from 'peerjs';
import io from 'socket.io-client';

// ربط مع السيرفر الذي أنشأناه في الجزء الأول
const socket = io('http://localhost:3000'); 

const App = () => {
  // 1. حالات الواجهة (UI States)
  const [currentChannel, setCurrentChannel] = useState('general');
  const [viewMode, setViewMode] = useState('chat'); // 'chat' أو 'video'
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 2. حالات الاتصال (Connection States)
  const [myPeerId, setMyPeerId] = useState('');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [usersOnline, setUsersOnline] = useState([]);

  // 3. إعداد PeerJS للفيديو
  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setMyPeerId(id);
      socket.emit('join-server', { userId: id, name: 'User_' + id.slice(0, 4) });
    });

    // استقبال مكالمة فيديو مفاجئة من صديق
    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        setLocalStream(stream);
        setViewMode('video');
        call.answer(stream);
        call.on('stream', (userStream) => {
          addRemoteStream(userStream, call.peer);
        });
      });
    });

    // تحديث قائمة المستخدمين من السيرفر
    socket.on('update-user-list', (users) => {
      setUsersOnline(users);
    });

    return () => peer.destroy();
  }, []);

  // وظائف مساعدة
  const addRemoteStream = (stream, peerId) => {
    setRemoteStreams((prev) => {
      if (prev.find(s => s.id === peerId)) return prev;
      return [...prev, { id: peerId, stream }];
    });
  };

  const toggleVideoMode = async () => {
    if (viewMode === 'chat') {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setLocalStream(stream);
      setViewMode('video');
    } else {
      localStream?.getTracks().forEach(track => track.stop());
      setViewMode('chat');
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#313338] overflow-hidden text-[#dbdee1]">
      
      {/* استدعاء القائمة الجانبية */}
      <Sidebar 
        currentChannel={currentChannel} 
        setChannel={setCurrentChannel}
        onVoiceChannelClick={toggleVideoMode} 
        users={usersOnline}
      />

      {/* المنطقة الرئيسية: تبديل بين الشات والفيديو */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {viewMode === 'chat' ? (
          <ChatArea channelName={currentChannel} />
        ) : (
          <div className="flex-1 flex flex-col">
            {/* شريط علوي صغير للعودة للشات */}
            <div className="h-12 bg-[#2b2d31] flex items-center px-4 border-b border-[#1e1f22]">
              <button 
                onClick={() => setViewMode('chat')}
                className="bg-[#4e5058] hover:bg-[#6d6f78] px-3 py-1 rounded text-sm font-bold text-white transition-colors"
              >
                ← العودة للدردشة
              </button>
              <span className="mx-4 text-gray-400 font-medium">مكالمة فيديو: {currentChannel}</span>
            </div>
            
            <VideoGrid 
              localStream={localStream} 
              remoteStreams={remoteStreams} 
            />
          </div>
        )}

        {/* قائمة الأعضاء الجانبية (اختياري - تظهر في اليمين) */}
        <aside className="hidden lg:flex w-60 bg-[#2b2d31] flex-col border-l border-[#26272b]">
          <div className="p-4 uppercase text-xs font-bold text-gray-400">المتصلون — {usersOnline.length}</div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {usersOnline.map(user => (
              <div key={user.id} className="flex items-center space-x-2 space-x-reverse p-2 hover:bg-[#35373c] rounded cursor-pointer group">
                <div className="relative">
                  <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center text-xs text-white">
                    {user.name[0]}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2b2d31] rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-400 group-hover:text-white">{user.name}</span>
              </div>
            ))}
          </div>
        </aside>

      </div>
    </div>
  );
};

export default App;
