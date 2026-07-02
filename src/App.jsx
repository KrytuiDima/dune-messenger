import React, { useState } from 'react';
import Layout from './components/Layout';
import NavigationRail from './components/NavigationRail';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import WelcomeScreen from './components/WelcomeScreen';
import SettingsModal from './components/SettingsModal';
import { useChat } from './hooks/useChat';

function App() {
  const [activeTab, setActiveTab] = useState('dms'); // 'dms' or 'server-1', etc.
  const { chats, activeChat, setActiveChatId, sendMessage } = useChat();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const filteredChats = activeTab === 'dms'
    ? chats.filter(c => c.type === 'dm')
    : chats.filter(c => c.type === 'channel');

  return (
    <div className="h-screen w-screen overflow-hidden bg-void text-white flex">
      <NavigationRail activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          chats={filteredChats}
          activeChatId={activeChat?.id}
          onSelectChat={setActiveChatId}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="flex-1 flex flex-col min-w-0 bg-void">
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
