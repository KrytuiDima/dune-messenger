// Dune Messenger - Frontend Logic

const { invoke } = window.__TAURI__.tauri;

// ---------- Simulated Chat State ----------

const chatState = {
  activeChatId: "chat-1",
  chats: [
    {
      id: "chat-1",
      name: "# general",
      preview: "Welcome to Dune.",
      messages: [
        { sender: "Arrakis_Bot", self: false, text: "Welcome to Dune Messenger. This channel is for general discussion." },
        { sender: "You", self: true, text: "Glad to be here." },
      ],
    },
    {
      id: "chat-2",
      name: "# plugin-devs",
      preview: "Sandbox runtime update...",
      messages: [
        { sender: "Liet", self: false, text: "The sandbox runtime update is looking solid so far." },
        { sender: "You", self: true, text: "Nice, does it isolate crashes fully?" },
        { sender: "Liet", self: false, text: "Yep, a broken plugin can't take down the core app anymore." },
      ],
    },
    {
      id: "chat-3",
      name: "Paul Atreides",
      preview: "See you at the meeting.",
      messages: [
        { sender: "Paul Atreides", self: false, text: "Are we still on for the architecture review?" },
        { sender: "You", self: true, text: "Yes, 3pm works." },
        { sender: "Paul Atreides", self: false, text: "See you at the meeting." },
      ],
    },
  ],
};

// ---------- DOM References ----------

const chatListEl = document.getElementById("chat-list");
const activeChatNameEl = document.getElementById("active-chat-name");
const messageViewportEl = document.getElementById("message-viewport");
const messageInputEl = document.getElementById("message-input");
const sendBtnEl = document.getElementById("send-btn");

const openSettingsBtn = document.getElementById("open-settings-btn");
const closeSettingsBtn = document.getElementById("close-settings-btn");
const settingsOverlayEl = document.getElementById("settings-overlay");
const installPluginBtn = document.getElementById("install-plugin-btn");
const pluginListEl = document.getElementById("plugin-list");

// ---------- Chat List Rendering ----------

function getActiveChat() {
  return chatState.chats.find((c) => c.id === chatState.activeChatId);
}

function renderChatList() {
  chatListEl.innerHTML = "";

  chatState.chats.forEach((chat) => {
    const item = document.createElement("div");
    item.className = "chat-list-item" + (chat.id === chatState.activeChatId ? " active" : "");
    item.dataset.chatId = chat.id;

    const nameEl = document.createElement("div");
    nameEl.className = "chat-list-item-name";
    nameEl.textContent = chat.name;

    const previewEl = document.createElement("div");
    previewEl.className = "chat-list-item-preview";
    previewEl.textContent = chat.preview;

    item.appendChild(nameEl);
    item.appendChild(previewEl);

    item.addEventListener("click", () => {
      chatState.activeChatId = chat.id;
      renderChatList();
      renderMessageViewport();
    });

    chatListEl.appendChild(item);
  });
}

// ---------- Message Viewport Rendering ----------

function renderMessageViewport() {
  const chat = getActiveChat();
  if (!chat) return;

  activeChatNameEl.textContent = chat.name;
  messageViewportEl.innerHTML = "";

  chat.messages.forEach((msg) => {
    const row = document.createElement("div");
    row.className = "message-row " + (msg.self ? "self" : "other");

    const senderEl = document.createElement("div");
    senderEl.className = "message-sender";
    senderEl.textContent = msg.sender;

    const bubbleEl = document.createElement("div");
    bubbleEl.className = "message-bubble";
    bubbleEl.textContent = msg.text;

    row.appendChild(senderEl);
    row.appendChild(bubbleEl);
    messageViewportEl.appendChild(row);
  });

  messageViewportEl.scrollTop = messageViewportEl.scrollHeight;
}

// ---------- Sending Messages ----------

function sendCurrentMessage() {
  const text = messageInputEl.value.trim();
  if (!text) return;

  const chat = getActiveChat();
  if (!chat) return;

  const newMessage = { sender: "You", self: true, text: text };
  chat.messages.push(newMessage);
  chat.preview = text;

  messageInputEl.value = "";
  renderChatList();
  renderMessageViewport();
}

sendBtnEl.addEventListener("click", sendCurrentMessage);

messageInputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendCurrentMessage();
  }
});

// ---------- Settings Panel: Modifications & Plugins ----------

function openSettingsPanel() {
  settingsOverlayEl.classList.remove("hidden");
  refreshPluginList();
}

function closeSettingsPanel() {
  settingsOverlayEl.classList.add("hidden");
}

openSettingsBtn.addEventListener("click", openSettingsPanel);
closeSettingsBtn.addEventListener("click", closeSettingsPanel);

settingsOverlayEl.addEventListener("click", (event) => {
  if (event.target === settingsOverlayEl) {
    closeSettingsPanel();
  }
});

function renderPluginList(plugins) {
  pluginListEl.innerHTML = "";

  if (!plugins || plugins.length === 0) {
    const emptyEl = document.createElement("div");
    emptyEl.className = "plugin-empty-state";
    emptyEl.textContent = "No plugins installed yet.";
    pluginListEl.appendChild(emptyEl);
    return;
  }

  plugins.forEach((pluginFileName) => {
    const item = document.createElement("div");
    item.className = "plugin-list-item";

    const label = document.createElement("span");
    label.innerHTML = "";

    const dot = document.createElement("span");
    dot.className = "plugin-status-dot";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = pluginFileName;

    label.appendChild(dot);
    label.appendChild(nameSpan);

    item.appendChild(label);
    pluginListEl.appendChild(item);
  });
}

async function refreshPluginList() {
  try {
    const plugins = await invoke("get_installed_plugins");
    renderPluginList(plugins);
  } catch (err) {
    console.error("Failed to fetch installed plugins:", err);
    pluginListEl.innerHTML = "";
    const errorEl = document.createElement("div");
    errorEl.className = "plugin-empty-state";
    errorEl.textContent = "Could not load plugins: " + err;
    pluginListEl.appendChild(errorEl);
  }
}

async function installPluginFromFile() {
  installPluginBtn.disabled = true;
  const originalLabel = installPluginBtn.textContent;
  installPluginBtn.textContent = "Installing...";

  try {
    // In a full build this path would come from a native file picker dialog.
    // For now we pass a descriptive placeholder path; the backend detects
    // that it doesn't exist on disk and synthesizes a valid mock plugin,
    // exercising the full install -> verify -> list pipeline end-to-end.
    const mockSourcePath = "user_selected_plugin.dunebin";

    const result = await invoke("install_plugin_manually", { sourcePath: mockSourcePath });
    console.log("Install result:", result);

    await refreshPluginList();
  } catch (err) {
    console.error("Plugin installation failed:", err);
    alert("Plugin installation failed: " + err);
  } finally {
    installPluginBtn.disabled = false;
    installPluginBtn.textContent = originalLabel;
  }
}

installPluginBtn.addEventListener("click", installPluginFromFile);

// ---------- Initial Boot ----------

function boot() {
  renderChatList();
  renderMessageViewport();
}

boot();