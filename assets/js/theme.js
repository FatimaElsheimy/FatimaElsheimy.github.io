(function () {
  function createFallbackToggle() {
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
    button.onclick = function () {
      if (window.toggleSiteTheme) window.toggleSiteTheme();
    };

    document.body.appendChild(button);

    if (document.documentElement.getAttribute("data-theme") === "dark") {
      button.setAttribute("aria-label", "Switch to light mode");
      button.setAttribute("title", "Switch to light mode");
      button.setAttribute("aria-pressed", "true");
    } else {
      button.setAttribute("aria-label", "Switch to dark mode");
      button.setAttribute("title", "Switch to dark mode");
      button.setAttribute("aria-pressed", "false");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createFallbackToggle);
  } else {
    createFallbackToggle();
  }
})();
