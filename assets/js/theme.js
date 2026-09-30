(function () {
  const STORAGE_KEY = "fatima-site-theme";
  const root = document.documentElement;

  function preferredTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (_) {}

    // The site intentionally opens in light mode unless the visitor has
    // explicitly selected dark mode before.
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

  function createToggle() {
    if (document.getElementById("theme-toggle")) return;

    const button = document.createElement("button");
    button.id = "theme-toggle";
    button.className = "theme-toggle";
    button.type = "button";
    button.innerHTML = [
      '<span class="theme-toggle__sun" aria-hidden="true">☀</span>',
      '<span class="theme-toggle__track" aria-hidden="true"><span class="theme-toggle__thumb"></span></span>',
      '<span class="theme-toggle__moon" aria-hidden="true">☾</span>'
    ].join("");

    button.addEventListener("click", function () {
      const current = root.dataset.theme === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {}
      applyTheme(next);
    });

    document.body.appendChild(button);
    applyTheme(root.dataset.theme || preferredTheme());
  }

  if (!root.dataset.theme) applyTheme(preferredTheme());

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createToggle);
  } else {
    createToggle();
  }
})();
