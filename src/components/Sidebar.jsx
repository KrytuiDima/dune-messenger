import React from 'react';
import UserProfile from './UserProfile';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = ({ chats, activeChatId, onSelectChat, onOpenSettings }) => {
  return (
    <div className="w-72 bg-panel flex flex-col border-r border-border-subtle shrink-0">
      <div className="h-16 flex items-center px-6 shrink-0">
        <h1 className="text-xl font-bold tracking-tight text-white">Dune</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={cn(
              "w-full flex items-center px-3 py-3 rounded-xl transition-all group",
              activeChatId === chat.id
                ? "bg-panel-raised shadow-sm"
                : "hover:bg-hover/50"
            )}
          >
            <div className="relative shrink-0">
                {chat.avatar ? (
                    <img src={chat.avatar} className="w-12 h-12 rounded-2xl object-cover" alt="" />
                ) : (
                    <div className="w-12 h-12 rounded-2xl bg-accent-dim flex items-center justify-center text-white font-bold text-lg">
                        {chat.name[0].toUpperCase()}
                    </div>
                )}
                {chat.status === 'online' && (
                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-[3px] border-panel bg-green-500" />
                )}
            </div>

            <div className="ml-3 flex-1 min-w-0 text-left">
              <div className="flex justify-between items-baseline mb-0.5">
                <span className={cn(
                    "text-[15px] font-semibold truncate",
                    activeChatId === chat.id ? "text-white" : "text-gray-200"
                )}>
                  {chat.name}
                </span>
                <span className="text-[11px] text-gray-500 shrink-0">
                  {chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].timestamp.split(' ')[0] : ''}
                </span>
              </div>
              <div className="text-[13px] text-gray-500 truncate leading-snug">
                {chat.preview}
              </div>
            </div>
          </button>
        ))}
      </div>

      <UserProfile onOpenSettings={onOpenSettings} />
    </div>
  );
};

export default Sidebar;
