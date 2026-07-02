import React, { useState } from 'react';
import { Download, RefreshCw, AlertCircle, CheckCircle2, Layout, Search, Grid } from 'lucide-react';
import { usePlugins } from '../hooks/usePlugins';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const PluginsView = () => {
  const [activeTab, setActiveTab] = useState('installed');
  const { plugins, loading, error, refreshPlugins, installPlugin } = usePlugins();

  const mockBrowsePlugins = [
    { name: "BetterFolders", description: "Organize your servers into collapsible folders.", author: "ArrakisDev", downloads: "1.2k" },
    { name: "GlassTheme", description: "Apply a beautiful frosted glass effect to the entire UI.", author: "Liet", downloads: "5.4k" },
    { name: "TranslatePlus", description: "Inline translation for incoming messages.", author: "Paul_A", downloads: "800" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Modifications & Plugins</h1>
        <button
          onClick={refreshPlugins}
          className="p-2 text-gray-400 hover:text-white transition-colors"
          disabled={loading}
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div className="flex border-b border-border-subtle">
        <button
          onClick={() => setActiveTab('installed')}
          className={cn(
            "px-4 py-2 border-b-2 font-medium transition-colors",
            activeTab === 'installed' ? "border-accent text-accent" : "border-transparent text-gray-400 hover:text-gray-200"
          )}
        >
          Installed
        </button>
        <button
          onClick={() => setActiveTab('browse')}
          className={cn(
            "px-4 py-2 border-b-2 font-medium transition-colors",
            activeTab === 'browse' ? "border-accent text-accent" : "border-transparent text-gray-400 hover:text-gray-200"
          )}
        >
          Browse
        </button>
      </div>

      {activeTab === 'installed' ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 italic">
            Dune plugins run in a sandboxed environment. Manually install a plugin below or drop <code>.dunebin</code> files into your mods folder.
          </p>

          <button
            onClick={() => installPlugin()}
            disabled={loading}
            className="w-full py-2.5 bg-accent hover:bg-accent-dim text-white font-bold rounded transition-colors flex items-center justify-center space-x-2"
          >
            <Download size={18} />
            <span>Install Plugin From File</span>
          </button>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded flex items-center space-x-2 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-2">
            {plugins.length > 0 ? (
              plugins.map((plugin, idx) => (
                <div key={idx} className="bg-panel-raised p-4 rounded-lg flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-green-500" />
                    <span className="font-medium">{plugin}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-5 bg-accent rounded-full flex items-center px-1">
                        <div className="w-3.5 h-3.5 bg-white rounded-full translate-x-4" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 border-2 border-dashed border-border-subtle rounded-lg">
                No plugins installed yet.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search for plugins..."
                    className="w-full bg-panel-raised border border-border-subtle rounded-md pl-10 pr-4 py-2 outline-none focus:border-accent"
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-500" />
            </div>

            <div className="grid grid-cols-1 gap-3">
                {mockBrowsePlugins.map((plugin, idx) => (
                    <div key={idx} className="bg-panel-raised p-4 rounded-lg border border-border-subtle hover:border-accent transition-colors group">
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-white group-hover:text-accent transition-colors">{plugin.name}</h3>
                            <span className="text-[10px] bg-void px-1.5 py-0.5 rounded text-gray-400 font-bold uppercase tracking-wider">{plugin.downloads} installs</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{plugin.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-accent">by {plugin.author}</span>
                            <button className="bg-void hover:bg-hover px-3 py-1 rounded text-xs font-bold transition-colors">Install</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default PluginsView;
