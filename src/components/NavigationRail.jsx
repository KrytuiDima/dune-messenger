import React from 'react';
import { MessageSquare, LayoutGrid, Plus, Compass } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NavigationRail = ({ activeTab, onTabChange }) => {
  const servers = [
    { id: 'server-1', name: 'Dune Official', initial: 'D' },
    { id: 'server-2', name: 'Plugin Hub', initial: 'P' },
  ];

  return (
    <nav className="w-[72px] bg-panel flex flex-col items-center py-3 space-y-2 border-r border-border-subtle shrink-0">
      <NavItem
        active={activeTab === 'dms'}
        onClick={() => onTabChange('dms')}
        icon={<MessageSquare size={24} />}
        label="Direct Messages"
      />

      <div className="w-8 h-[2px] bg-border-subtle rounded-full mx-auto my-1" />

      {servers.map((server) => (
        <NavItem
          key={server.id}
          active={activeTab === server.id}
          onClick={() => onTabChange(server.id)}
          label={server.name}
        >
          {server.initial}
        </NavItem>
      ))}

      <NavItem icon={<Plus size={24} />} label="Add a Server" className="text-success hover:bg-success hover:text-white" />
      <NavItem icon={<Compass size={24} />} label="Explore Discoverable Servers" />
    </nav>
  );
};

const NavItem = ({ children, icon, active, onClick, label, className }) => {
  return (
    <div className="group relative flex items-center justify-center w-full">
      {/* Active Indicator */}
      <div className={cn(
        "absolute left-0 w-1 bg-white rounded-r-full transition-all duration-200",
        active ? "h-10" : "h-0 group-hover:h-5"
      )} />

      <button
        onClick={onClick}
        title={label}
        className={cn(
          "w-12 h-12 flex items-center justify-center rounded-[24px] transition-all duration-200 overflow-hidden",
          "bg-panel-raised text-accent hover:rounded-[16px] hover:bg-accent hover:text-white",
          active && "rounded-[16px] bg-accent text-white",
          className
        )}
      >
        {icon || children}
      </button>
    </div>
  );
};

export default NavigationRail;
