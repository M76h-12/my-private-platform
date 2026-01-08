import { useEffect } from 'react';

const useNotifications = (socket, currentUserId) => {
  useEffect(() => {
    if (!socket) return;

    const playSound = (url) => {
      const audio = new Audio(url);
      audio.volume = 0.4;
      audio.play().catch(e => console.log("تفاعل المستخدم مطلوب لتشغيل الصوت"));
    };

    // استقبال رسالة جديدة
    socket.on('new-message', (msg) => {
      if (msg.senderId !== currentUserId) {
        playSound('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3');
      }
    });

    // دخول مستخدم جديد للقناة الصوتية
    socket.on('user-joined-voice', () => {
      playSound('https://www.myinstants.com/media/sounds/discord-join.mp3');
    });

    return () => {
      socket.off('new-message');
      socket.off('user-joined-voice');
    };
  }, [socket, currentUserId]);
};

export default useNotifications;
