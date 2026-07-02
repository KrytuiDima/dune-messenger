import React from 'react';
import { Settings, Mic, Headphones, Hash } from 'lucide-react';
import UserProfile from './UserProfile';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = ({ activeTab, chats, activeChatId, onSelectChat, onOpenSettings }) => {
  return (
    <div className="w-60 bg-panel flex flex-col border-r border-border-subtle shrink-0">
      <div className="h-12 flex items-center px-4 border-bottom border-border-subtle shadow-sm shrink-0">
        <h2 className="font-bold truncate">
          {activeTab === 'dms' ? 'Direct Messages' : 'Dune Official'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {activeTab !== 'dms' && (
          <div className="px-2 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Text Channels
          </div>
        )}

        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={cn(
              "w-full flex items-center px-2 py-1.5 rounded-md transition-colors group",
              activeChatId === chat.id
                ? "bg-panel-raised text-white"
                : "text-gray-400 hover:bg-hover hover:text-gray-200"
            )}
          >
            {chat.type === 'dm' ? (
              <div className="flex items-center w-full">
                <div className="relative shrink-0">
                  <img src={chat.avatar} className="w-8 h-8 rounded-full" alt="" />
                  <div className={cn(
                    "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-panel",
                    chat.status === 'online' ? "bg-green-500" : "bg-gray-500"
                  )} />
                </div>
                <div className="ml-3 text-left overflow-hidden">
                  <div className="text-sm font-medium truncate">{chat.name}</div>
                  <div className="text-xs truncate opacity-60">{chat.preview}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Hash size={18} className="mr-1.5 text-gray-500" />
                <span className="text-sm font-medium">{chat.name}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      <UserProfile onOpenSettings={onOpenSettings} />
    </div>
  );
};

export default Sidebar;
