import React from 'react';

const UserProfile = ({ onOpenSettings }) => {
  return (
    <div className="h-20 px-4 flex items-center border-t border-border-subtle bg-panel shrink-0">
      <button
        onClick={onOpenSettings}
        className="flex items-center flex-1 min-w-0 p-2 hover:bg-hover/50 rounded-xl transition-all text-left"
      >
        <div className="relative shrink-0">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jules"
            className="w-10 h-10 rounded-2xl bg-accent"
            alt="User avatar"
          />
          <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-[3px] border-panel bg-green-500" />
        </div>
        <div className="ml-3 overflow-hidden">
          <div className="text-sm font-bold text-white truncate">Jules</div>
          <div className="text-xs text-gray-500">Active now</div>
        </div>
      </button>
    </div>
  );
};

export default UserProfile;
