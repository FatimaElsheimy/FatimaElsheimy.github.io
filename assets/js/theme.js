(function () {
  const STORAGE_KEY = "fatima-site-theme";
  const root = document.documentElement;

  function preferredTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") return saved;
    } catch (_) {}

    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#171518" : "#fffdfb");

    const button = document.getElementById("theme-toggle");
    if (!button) return;

    const nextTheme = theme === "dark" ? "light" : "dark";
    const icon = button.querySelector(".theme-toggle__icon");
    const label = button.querySelector(".theme-toggle__label");

    button.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    button.setAttribute("title", `Switch to ${nextTheme} mode`);
    if (icon) icon.textContent = theme === "dark" ? "☀" : "◐";
    if (label) label.textContent = theme === "dark" ? "Light" : "Dark";
  }

  function createToggle() {
    if (document.getElementById("theme-toggle")) return;

    const button = document.createElement("button");
    button.id = "theme-toggle";
    button.className = "theme-toggle";
    button.type = "button";
    button.innerHTML = '<span class="theme-toggle__icon" aria-hidden="true"></span><span class="theme-toggle__label"></span>';

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
