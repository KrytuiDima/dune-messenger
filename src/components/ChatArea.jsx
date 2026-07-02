import React, { useState, useRef, useEffect } from 'react';
import { Info, Paperclip, Smile, Send } from 'lucide-react';
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
      <header className="h-16 flex items-center justify-between px-6 border-b border-border-subtle shrink-0">
        <div className="flex items-center min-w-0">
          <div className="text-left">
            <h2 className="font-bold text-white leading-tight truncate">{chat.name}</h2>
            <p className="text-xs text-green-500 font-medium">
              {chat.status || 'active now'}
            </p>
          </div>
        </div>

        <button className="p-2 text-gray-400 hover:text-white hover:bg-hover/50 rounded-full transition-all">
          <Info size={20} />
        </button>
      </header>

      {/* Message Feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
      >
        {chat.messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col",
              msg.self ? "items-end" : "items-start"
            )}
          >
            <div className={cn(
              "max-w-[75%] px-4 py-2.5 rounded-2xl text-[15px] shadow-sm",
              msg.self
                ? "bg-accent text-white rounded-tr-none"
                : "bg-panel-raised text-gray-200 rounded-tl-none"
            )}>
              {msg.text}
            </div>
            <span className="text-[10px] text-gray-500 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="px-6 py-4 shrink-0">
        <form
          onSubmit={handleSend}
          className="max-w-4xl mx-auto bg-panel-raised rounded-2xl flex items-center px-4 py-1.5 border border-border-subtle focus-within:border-accent/50 transition-all shadow-lg"
        >
          <button type="button" className="p-2 text-gray-400 hover:text-accent transition-colors">
            <Paperclip size={22} />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-transparent border-none outline-none py-3 px-2 text-[15px] text-white placeholder-gray-500"
          />

          <button type="button" className="p-2 text-gray-400 hover:text-accent transition-colors">
            <Smile size={22} />
          </button>

          <button
            type="submit"
            disabled={!inputText.trim()}
            className={cn(
              "p-2 rounded-xl transition-all",
              inputText.trim()
                ? "text-accent bg-accent/10 hover:bg-accent hover:text-white"
                : "text-gray-600 cursor-not-allowed"
            )}
          >
            <Send size={22} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
