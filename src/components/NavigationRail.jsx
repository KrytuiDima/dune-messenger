import React from 'react';
import { MessageSquare, Users, Radio, Settings, Puzzle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NavigationRail = ({ activeTab, onTabChange, onOpenSettings }) => {
  const folders = [
    { id: 'all', icon: <MessageSquare size={22} />, label: 'All Chats' },
    { id: 'groups', icon: <Users size={22} />, label: 'Groups' },
    { id: 'channels', icon: <Radio size={22} />, label: 'Channels' },
  ];

  return (
    <nav className="w-16 bg-panel flex flex-col items-center py-4 border-r border-border-subtle shrink-0">
      <div className="flex-1 w-full space-y-4">
        {folders.map((folder) => (
          <NavItem
            key={folder.id}
            active={activeTab === folder.id}
            onClick={() => onTabChange(folder.id)}
            icon={folder.icon}
            label={folder.label}
          />
        ))}
      </div>

      <div className="space-y-4 w-full">
        <NavItem
            icon={<Puzzle size={22} />}
            label="Plugins"
            onClick={onOpenSettings}
        />
        <NavItem
            icon={<Settings size={22} />}
            label="Settings"
            onClick={onOpenSettings}
        />
      </div>
    </nav>
  );
};

const NavItem = ({ icon, active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "w-full flex flex-col items-center justify-center py-2 transition-all relative group",
        active ? "text-accent" : "text-gray-500 hover:text-gray-300"
      )}
    >
      {active && (
        <div className="absolute left-0 w-0.5 h-6 bg-accent rounded-r-full" />
      )}
      <div className={cn(
          "p-2 rounded-xl transition-all",
          active && "bg-accent/10"
      )}>
        {icon}
      </div>
    </button>
  );
};

export default NavigationRail;
