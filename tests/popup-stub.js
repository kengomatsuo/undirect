// Stands in for the extension APIs so the popup can be rendered on its own.
window.__sent = [];
window.browser = {
  i18n: {
    getMessage: (key, args = []) => {
      const entry = MESSAGES[key];
      if (!entry) return "";
      // Named placeholders map to $1, $2... as the browser's own lookup does.
      return entry.message.replace(/\$([A-Z_]+)\$/g, (_, name) => {
        const slot = entry.placeholders?.[name.toLowerCase()]?.content ?? "$1";
        return args[Number(slot.slice(1)) - 1] ?? name;
      });
    },
  },
  runtime: {
    sendMessage: (msg) => {
      window.__sent.push(msg);
      if (msg.type === "undirect:popup") return Promise.resolve(STATE);
      return Promise.resolve({ ok: true });
    },
  },
  tabs: {
    query: () => Promise.resolve([{ id: 1 }]),
    sendMessage: () => Promise.resolve({ bridgeLoaded: true }),
  },
};
