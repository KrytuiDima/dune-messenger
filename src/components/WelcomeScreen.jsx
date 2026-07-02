import React from 'react';
import { MessageSquare } from 'lucide-react';

const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-void text-center p-8">
      <div className="w-20 h-20 bg-panel-raised rounded-3xl flex items-center justify-center text-accent mb-6 shadow-xl">
        <MessageSquare size={40} />
      </div>
      <h1 className="text-2xl font-bold text-white mb-2">Welcome to Dune</h1>
      <p className="text-gray-400 max-w-md">
        Select a channel or a friend from the sidebar to start messaging.
        Dune is a secure, plugin-extensible messenger for the next generation.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 w-full max-w-sm">
        <button className="flex items-center px-4 py-3 bg-panel-raised hover:bg-hover rounded-lg border border-border-subtle transition-colors group">
          <div className="w-8 h-8 bg-accent/20 text-accent rounded flex items-center justify-center mr-3 group-hover:bg-accent group-hover:text-white transition-colors">
            +
          </div>
          <span className="font-medium">Create a Server</span>
        </button>
        <button className="flex items-center px-4 py-3 bg-panel-raised hover:bg-hover rounded-lg border border-border-subtle transition-colors group">
          <div className="w-8 h-8 bg-green-500/20 text-green-500 rounded flex items-center justify-center mr-3 group-hover:bg-green-500 group-hover:text-white transition-colors">
            🧭
          </div>
          <span className="font-medium">Explore Discoverable Servers</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
