import { useState, useCallback } from 'react';

const INITIAL_CHATS = [
  {
    id: "chat-1",
    name: "general",
    type: "channel",
    preview: "Welcome to Dune.",
    messages: [
      { id: 1, sender: "Arrakis_Bot", self: false, text: "Welcome to Dune Messenger. This channel is for general discussion.", timestamp: "10:00 AM" },
      { id: 2, sender: "You", self: true, text: "Glad to be here.", timestamp: "10:05 AM" },
    ],
  },
  {
    id: "chat-2",
    name: "plugin-devs",
    type: "channel",
    preview: "Sandbox runtime update...",
    messages: [
      { id: 1, sender: "Liet", self: false, text: "The sandbox runtime update is looking solid so far.", timestamp: "11:00 AM" },
      { id: 2, sender: "You", self: true, text: "Nice, does it isolate crashes fully?", timestamp: "11:02 AM" },
      { id: 3, sender: "Liet", self: false, text: "Yep, a broken plugin can't take down the core app anymore.", timestamp: "11:05 AM" },
    ],
  },
  {
    id: "chat-3",
    name: "Paul Atreides",
    type: "dm",
    preview: "See you at the meeting.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paul",
    status: "online",
    messages: [
      { id: 1, sender: "Paul Atreides", self: false, text: "Are we still on for the architecture review?", timestamp: "Yesterday" },
      { id: 2, sender: "You", self: true, text: "Yes, 3pm works.", timestamp: "Yesterday" },
      { id: 3, sender: "Paul Atreides", self: false, text: "See you at the meeting.", timestamp: "Yesterday" },
    ],
  },
];

export function useChat() {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  const sendMessage = useCallback((text) => {
    if (!activeChatId || !text.trim()) return;

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        const newMessage = {
          id: Date.now(),
          sender: "You",
          self: true,
          text: text.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...chat,
          preview: text.trim(),
          messages: [...chat.messages, newMessage]
        };
      }
      return chat;
    }));

    // TODO: Connect Supabase API fetch here
    // Example: supabase.from('messages').insert({ chat_id: activeChatId, content: text })
  }, [activeChatId]);

  return {
    chats,
    activeChat,
    setActiveChatId,
    sendMessage
  };
}
