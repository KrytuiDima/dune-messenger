import React from 'react';
import { Settings, Mic, Headphones } from 'lucide-react';

const UserProfile = ({ onOpenSettings }) => {
  return (
    <div className="h-14 bg-[#111214] px-2 flex items-center shrink-0">
      <div className="flex items-center flex-1 min-w-0 px-1 py-1 hover:bg-hover rounded-md cursor-pointer transition-colors group">
        <div className="relative shrink-0">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jules"
            className="w-8 h-8 rounded-full bg-accent"
            alt="User avatar"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#111214] bg-green-500" />
        </div>
        <div className="ml-2 text-left overflow-hidden">
          <div className="text-[13px] font-bold text-white leading-tight truncate">Jules</div>
          <div className="text-[11px] text-gray-400 leading-tight">Online</div>
        </div>
      </div>

      <div className="flex items-center">
        <button className="p-2 text-gray-400 hover:bg-hover hover:text-gray-200 rounded-md transition-colors" title="Mute">
          <Mic size={18} />
        </button>
        <button className="p-2 text-gray-400 hover:bg-hover hover:text-gray-200 rounded-md transition-colors" title="Deafen">
          <Headphones size={18} />
        </button>
        <button
          onClick={onOpenSettings}
          className="p-2 text-gray-400 hover:bg-hover hover:text-gray-200 rounded-md transition-colors"
          title="User Settings"
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
