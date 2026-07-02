import React, { useState, useRef, useEffect } from 'react';
import { Hash, Bell, Pin, Users, Search, Inbox, HelpCircle, PlusCircle, Gift, Sticker, Smile, Send, Paperclip } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const ChatArea = ({ chat, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-void">
      {/* Chat Header */}
      <header className="h-12 flex items-center px-4 border-b border-border-subtle shadow-sm shrink-0">
        <div className="flex items-center flex-1 min-w-0">
          {chat.type === 'channel' ? (
            <Hash size={24} className="text-gray-400 mr-2 shrink-0" />
          ) : (
            <div className="relative mr-2 shrink-0">
              <img src={chat.avatar} className="w-6 h-6 rounded-full" alt="" />
              <div className={cn(
                "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-void",
                chat.status === 'online' ? "bg-green-500" : "bg-gray-500"
              )} />
            </div>
          )}
          <span className="font-bold truncate text-white">{chat.name}</span>
          {chat.type === 'dm' && <span className="ml-2 text-xs text-gray-400">{chat.status}</span>}
        </div>

        <div className="flex items-center space-x-4 text-gray-400 ml-4">
          <Bell size={20} className="hover:text-gray-200 cursor-pointer" />
          <Pin size={20} className="hover:text-gray-200 cursor-pointer" />
          <Users size={20} className="hover:text-gray-200 cursor-pointer" />
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="bg-panel-raised text-sm px-2 py-0.5 rounded border border-transparent focus:border-accent outline-none w-36 transition-all focus:w-48"
            />
            <Search size={14} className="absolute right-2 top-1.5 pointer-events-none" />
          </div>
          <Inbox size={20} className="hover:text-gray-200 cursor-pointer" />
          <HelpCircle size={20} className="hover:text-gray-200 cursor-pointer" />
        </div>
      </header>

      {/* Message Feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-6 space-y-1"
      >
        {chat.messages.map((msg, idx) => {
            const isGroupStart = idx === 0 || chat.messages[idx-1].sender !== msg.sender;
            return (
                <div
                    key={msg.id}
                    className={cn(
                        "group flex px-2 py-0.5 -mx-2 hover:bg-[#2e33380a] transition-colors relative",
                        isGroupStart ? "mt-4" : ""
                    )}
                >
                    {isGroupStart ? (
                        <div className="flex w-full">
                            <div className="w-10 h-10 rounded-full bg-accent-dim shrink-0 mr-4 flex items-center justify-center text-white font-bold">
                                {msg.sender[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-baseline space-x-2">
                                    <span className="font-bold text-white hover:underline cursor-pointer">{msg.sender}</span>
                                    <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                                </div>
                                <div className="text-gray-300 break-words">{msg.text}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full pl-14">
                            <div className="flex-1 min-w-0">
                                <div className="text-gray-300 break-words">{msg.text}</div>
                            </div>
                            <div className="absolute left-2 top-0 opacity-0 group-hover:opacity-100 text-[10px] text-gray-400 w-10 text-center">
                                {msg.timestamp.split(' ')[0]}
                            </div>
                        </div>
                    )}
                </div>
            )
        })}
      </div>

      {/* Message Input Box */}
      <div className="px-4 pb-6 shrink-0">
        <form
          onSubmit={handleSend}
          className="bg-[#383a40] rounded-lg flex items-center px-4 py-2.5 space-x-3"
        >
          <button type="button" className="text-gray-400 hover:text-gray-200 transition-colors">
            <PlusCircle size={24} />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${chat.type === 'channel' ? '#' + chat.name : '@' + chat.name}`}
            className="flex-1 bg-transparent border-none outline-none text-gray-100 placeholder-gray-500"
          />

          <div className="flex items-center space-x-3 text-gray-400">
            <button type="button" className="hover:text-gray-200 transition-colors hidden sm:block">
              <Gift size={24} />
            </button>
            <button type="button" className="hover:text-gray-200 transition-colors">
              <Sticker size={24} />
            </button>
            <button type="button" className="hover:text-gray-200 transition-colors">
              <Smile size={24} />
            </button>
            <button
              type="submit"
              disabled={!inputText.trim()}
              className={cn(
                "transition-colors",
                inputText.trim() ? "text-accent hover:text-white" : "text-gray-600 cursor-not-allowed"
              )}
            >
              <Send size={24} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
