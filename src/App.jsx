import React, { useState, useMemo } from 'react';
import NavigationRail from './components/NavigationRail';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import WelcomeScreen from './components/WelcomeScreen';
import SettingsModal from './components/SettingsModal';
import { useChat } from './hooks/useChat';

function App() {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'groups', 'channels'
  const { chats, activeChat, setActiveChatId, sendMessage } = useChat();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filteredChats = useMemo(() => {
    switch (activeTab) {
        case 'groups':
            return chats.filter(c => c.type === 'dm' && c.isGroup); // assuming mock data might have isGroup
        case 'channels':
            return chats.filter(c => c.type === 'channel');
        default:
            return chats;
    }
  }, [chats, activeTab]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-void text-slate-50 flex font-sans">
      <NavigationRail
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          chats={filteredChats}
          activeChatId={activeChat?.id}
          onSelectChat={setActiveChatId}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="flex-1 flex flex-col min-w-0 bg-void relative">
          {activeChat ? (
            <ChatArea chat={activeChat} onSendMessage={sendMessage} />
          ) : (
            <WelcomeScreen />
          )}
        </main>
      </div>

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
}

export default App;
