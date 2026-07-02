import React, { useState } from 'react';
import { X, User, Monitor, Bell, Lock, Puzzle } from 'lucide-react';
import PluginsView from './PluginsView';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SettingsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', label: 'My Account', icon: <User size={20} /> },
    { id: 'appearance', label: 'Appearance', icon: <Monitor size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'privacy', label: 'Privacy & Safety', icon: <Lock size={20} /> },
    { id: 'plugins', label: 'Modifications & Plugins', icon: <Puzzle size={20} /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in duration-200">
      <div className="w-full h-full md:w-[800px] md:h-[600px] bg-panel md:rounded-lg overflow-hidden flex flex-col md:flex-row relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        {/* Sidebar */}
        <div className="w-full md:w-64 bg-panel-raised p-6 flex flex-col shrink-0 border-r border-border-subtle">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">User Settings</h2>
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2 rounded-md transition-colors",
                  activeTab === tab.id
                    ? "bg-hover text-white"
                    : "text-gray-400 hover:bg-hover/50 hover:text-gray-200"
                )}
              >
                <span className="mr-3">{tab.icon}</span>
                <span className="text-[15px] font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-panel p-8 overflow-y-auto">
          {activeTab === 'account' && <AccountSettings />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
          {activeTab === 'plugins' && <PluginsView />}
        </div>
      </div>
    </div>
  );
};

const AccountSettings = () => (
    <div className="space-y-6">
        <h1 className="text-xl font-bold">My Account</h1>
        <div className="bg-panel-raised p-4 rounded-lg flex items-center">
            <div className="w-20 h-20 bg-accent rounded-full mr-4" />
            <div className="flex-1">
                <div className="text-lg font-bold">Jules</div>
                <div className="text-sm text-gray-400">jules@dune.im</div>
            </div>
            <button className="bg-accent hover:bg-accent-dim px-4 py-2 rounded font-medium transition-colors">Edit Profile</button>
        </div>
        <div className="space-y-4 pt-4">
            <div className="border-t border-border-subtle pt-4 flex justify-between items-center">
                <div>
                    <div className="font-medium">Password</div>
                    <div className="text-sm text-gray-400">Last changed 2 months ago</div>
                </div>
                <button className="text-accent hover:underline">Change Password</button>
            </div>
            <div className="border-t border-border-subtle pt-4 flex justify-between items-center text-red-500">
                <div>
                    <div className="font-medium">Account Removal</div>
                    <div className="text-sm opacity-70">Disabling your account means you can recover it at any time.</div>
                </div>
                <button className="border border-red-500/50 px-3 py-1.5 rounded hover:bg-red-500 hover:text-white transition-colors">Delete Account</button>
            </div>
        </div>
    </div>
);

const AppearanceSettings = () => (
    <div className="space-y-6">
        <h1 className="text-xl font-bold">Appearance</h1>
        <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Theme</label>
            <div className="grid grid-cols-3 gap-4">
                <div className="border-2 border-accent bg-void h-24 rounded-lg p-2 relative flex flex-col justify-end">
                    <div className="text-xs font-bold text-white">Dark (Default)</div>
                </div>
                <div className="border-2 border-border-subtle bg-white h-24 rounded-lg p-2 relative flex flex-col justify-end">
                    <div className="text-xs font-bold text-gray-900">Light</div>
                </div>
                <div className="border-2 border-border-subtle bg-indigo-950 h-24 rounded-lg p-2 relative flex flex-col justify-end text-white">
                    <div className="text-xs font-bold">Deep Space</div>
                </div>
            </div>
        </div>
    </div>
);

const NotificationSettings = () => (
    <div className="space-y-6 text-gray-300">
        <h1 className="text-xl font-bold text-white">Notifications</h1>
        <div className="flex justify-between items-center">
            <span>Enable Desktop Notifications</span>
            <div className="w-12 h-6 bg-accent rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
            </div>
        </div>
        <div className="flex justify-between items-center">
            <span>Enable Unread Message Badge</span>
            <div className="w-12 h-6 bg-accent rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
            </div>
        </div>
    </div>
);

const PrivacySettings = () => (
    <div className="space-y-6 text-gray-300">
        <h1 className="text-xl font-bold text-white">Privacy & Safety</h1>
        <p className="text-sm text-gray-400">Manage who can interact with you on Dune.</p>
        <div className="space-y-4">
            <div className="bg-panel-raised p-4 rounded-lg">
                <div className="font-bold text-white mb-1">Direct Message Filtering</div>
                <div className="text-xs text-gray-400 mb-4">Automatically scan and delete direct messages you receive that contain explicit content.</div>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <input type="radio" name="filter" id="f1" defaultChecked />
                        <label htmlFor="f1">Keep me safe (Scan everything)</label>
                    </div>
                    <div className="flex items-center space-x-2 opacity-60">
                        <input type="radio" name="filter" id="f2" />
                        <label htmlFor="f2">My friends are nice (Don't scan friends)</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default SettingsModal;
