import { useState, useEffect, useCallback } from 'react';

export function usePlugins() {
  const [plugins, setPlugins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshPlugins = useCallback(async () => {
    if (!window.__TAURI__) {
        console.warn("Tauri API not available");
        setPlugins(["mock-plugin-1.dunebin", "mock-plugin-2.dunebin"]);
        return;
    }

    setLoading(true);
    try {
      const { invoke } = window.__TAURI__.core;
      const result = await invoke("get_installed_plugins");
      setPlugins(result);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch installed plugins:", err);
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  }, []);

  const installPlugin = useCallback(async (sourcePath = "user_selected_plugin.dunebin") => {
    if (!window.__TAURI__) {
        alert("Tauri API not available - mock install");
        setPlugins(prev => [...prev, sourcePath]);
        return;
    }

    setLoading(true);
    try {
      const { invoke } = window.__TAURI__.core;
      await invoke("install_plugin_manually", { sourcePath });
      await refreshPlugins();
      setError(null);
    } catch (err) {
      console.error("Plugin installation failed:", err);
      setError(err.toString());
      throw err;
    } finally {
      setLoading(false);
    }
  }, [refreshPlugins]);

  useEffect(() => {
    refreshPlugins();
  }, [refreshPlugins]);

  return {
    plugins,
    loading,
    error,
    refreshPlugins,
    installPlugin
  };
}
