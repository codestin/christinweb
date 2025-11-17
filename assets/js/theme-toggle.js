// Theme Toggle with localStorage persistence and keyboard shortcut
(function() {
  'use strict';

  const THEME_KEY = 'theme-preference';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';

  // Get stored theme or use system preference
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored) {
      return stored;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_THEME;
    }

    return LIGHT_THEME;
  }

  // Apply theme to document
  function applyTheme(theme) {
    if (theme === DARK_THEME) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Update toggle button icon if it exists
    updateToggleButton(theme);
  }

  // Update the toggle button icon
  function updateToggleButton(theme) {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = theme === DARK_THEME ? '☀' : '🌙';
      toggleBtn.setAttribute('aria-label', `Switch to ${theme === DARK_THEME ? 'light' : 'dark'} mode`);
    }
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = getPreferredTheme();
    const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

    localStorage.setItem(THEME_KEY, newTheme);
    applyTheme(newTheme);
  }

  // Initialize theme on page load
  function init() {
    const theme = getPreferredTheme();
    applyTheme(theme);

    // Add click listener to toggle button
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleTheme);
    }

    // Add keyboard shortcut (d key)
    document.addEventListener('keydown', function(e) {
      // Only trigger if not in an input field and d key is pressed
      if (e.key === 'd' && !isInputFocused()) {
        e.preventDefault();
        toggleTheme();
      }
    });

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only apply if no manual preference is set
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
      });
    }
  }

  // Helper to check if an input element has focus
  function isInputFocused() {
    const activeElement = document.activeElement;
    return activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.isContentEditable
    );
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Also apply immediately to avoid flash
  applyTheme(getPreferredTheme());
})();
