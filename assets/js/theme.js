(function () {
  const STORAGE_KEY = "fatima-site-theme";
  const root = document.documentElement;

  function preferredTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (_) {}
    return "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#171518" : "#ffffff");

    const button = document.getElementById("theme-toggle");
    if (!button) return;

    const nextTheme = theme === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    button.setAttribute("title", `Switch to ${nextTheme} mode`);
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  function toggleTheme() {
    const current = root.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {}
    applyTheme(next);
  }

  function ensureToggle() {
    let button = document.getElementById("theme-toggle");

    // Fallback for non-home pages: keep the same control available globally.
    if (!button) {
      button = document.createElement("button");
      button.id = "theme-toggle";
      button.className = "theme-toggle";
      button.type = "button";
      button.innerHTML = [
        '<span class="theme-toggle__sun" aria-hidden="true">☀</span>',
        '<span class="theme-toggle__track" aria-hidden="true"><span class="theme-toggle__thumb"></span></span>',
        '<span class="theme-toggle__moon" aria-hidden="true">☾</span>'
      ].join("");
      document.body.appendChild(button);
    }

    if (!button.dataset.themeBound) {
      button.addEventListener("click", toggleTheme);
      button.dataset.themeBound = "true";
    }

    applyTheme(root.dataset.theme || preferredTheme());
  }

  if (!root.dataset.theme) root.dataset.theme = preferredTheme();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ensureToggle);
  } else {
    ensureToggle();
  }
})();
