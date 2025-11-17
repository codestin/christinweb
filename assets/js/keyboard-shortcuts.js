// Comprehensive Keyboard Shortcuts System
(function() {
  'use strict';

  let gPressed = false;
  let gPressedTime = 0;
  const G_TIMEOUT = 1000; // Time window for g+ shortcuts

  // Navigation shortcuts configuration
  const SHORTCUTS = {
    'g+h': { action: 'navigate', url: '/', description: 'Go to home' },
    'g+n': { action: 'navigate', url: '/writing', description: 'Go to writing/notes' },
    'g+g': { action: 'navigate', url: '/graph', description: 'Go to graph' },
    'g+a': { action: 'navigate', url: '/about', description: 'Go to about' },
    '/': { action: 'showSearch', description: 'Open search' },
    '?': { action: 'showHelp', description: 'Show keyboard shortcuts' },
    'f': { action: 'toggleFocus', description: 'Toggle focus mode' },
    'Escape': { action: 'closeOverlays', description: 'Close overlays' }
  };

  // Initialize shortcuts
  function init() {
    document.addEventListener('keydown', handleKeyPress);

    // Initialize search if available
    initSearch();

    // Close overlays when clicking outside
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('shortcuts-overlay') ||
          e.target.classList.contains('command-palette')) {
        closeOverlays();
      }
    });
  }

  // Main keyboard event handler
  function handleKeyPress(e) {
    // Ignore if in input field (except for Escape)
    if (isInputFocused() && e.key !== 'Escape') {
      return;
    }

    // Handle Escape key
    if (e.key === 'Escape') {
      e.preventDefault();
      closeOverlays();
      return;
    }

    // Handle g+ shortcuts
    if (e.key === 'g' || e.key === 'G') {
      gPressed = true;
      gPressedTime = Date.now();
      setTimeout(function() {
        gPressed = false;
      }, G_TIMEOUT);
      return;
    }

    // Check if we're in a g+ combo
    if (gPressed && Date.now() - gPressedTime < G_TIMEOUT) {
      const shortcutKey = 'g+' + e.key.toLowerCase();
      const shortcut = SHORTCUTS[shortcutKey];

      if (shortcut) {
        e.preventDefault();
        executeAction(shortcut);
        gPressed = false;
        return;
      }
    }

    // Handle other shortcuts
    const key = e.metaKey || e.ctrlKey ? 'Ctrl+' + e.key : e.key;
    const shortcut = SHORTCUTS[key] || SHORTCUTS[e.key];

    if (shortcut) {
      e.preventDefault();
      executeAction(shortcut);
    }

    // Handle cmd+k or ctrl+k for search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      showSearch();
    }
  }

  // Execute shortcut action
  function executeAction(shortcut) {
    switch (shortcut.action) {
      case 'navigate':
        window.location.href = shortcut.url;
        break;
      case 'showSearch':
        showSearch();
        break;
      case 'showHelp':
        showHelp();
        break;
      case 'toggleFocus':
        toggleFocusMode();
        break;
      case 'closeOverlays':
        closeOverlays();
        break;
    }
  }

  // Show search/command palette
  function showSearch() {
    const palette = document.querySelector('.command-palette');
    const overlay = document.querySelector('.shortcuts-overlay');

    if (palette) {
      palette.classList.add('visible');
      if (overlay) {
        overlay.classList.add('visible');
      }

      // Focus search input
      const input = palette.querySelector('input');
      if (input) {
        setTimeout(function() {
          input.focus();
        }, 50);
      }
    }
  }

  // Show help overlay
  function showHelp() {
    const help = document.querySelector('.shortcuts-help');
    const overlay = document.querySelector('.shortcuts-overlay');

    if (help) {
      help.classList.add('visible');
      if (overlay) {
        overlay.classList.add('visible');
      }
    }
  }

  // Toggle focus mode
  function toggleFocusMode() {
    document.body.classList.toggle('focus-mode');

    // Save preference
    const isFocusMode = document.body.classList.contains('focus-mode');
    sessionStorage.setItem('focus-mode', isFocusMode);
  }

  // Close all overlays
  function closeOverlays() {
    const overlays = document.querySelectorAll('.shortcuts-help, .command-palette, .shortcuts-overlay');
    overlays.forEach(function(overlay) {
      overlay.classList.remove('visible');
    });

    // Blur search input if focused
    const searchInput = document.querySelector('.command-palette input');
    if (searchInput) {
      searchInput.blur();
    }
  }

  // Initialize search functionality
  function initSearch() {
    const searchInput = document.querySelector('.command-palette input');
    if (!searchInput) return;

    // Prevent input from triggering keyboard shortcuts
    searchInput.addEventListener('keydown', function(e) {
      e.stopPropagation();

      // Still allow Escape to close
      if (e.key === 'Escape') {
        closeOverlays();
      }
    });

    // Simple search functionality
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      performSearch(query);
    });
  }

  // Perform search (placeholder - will need Jekyll search integration)
  function performSearch(query) {
    const resultsContainer = document.querySelector('.command-palette .results');
    if (!resultsContainer) return;

    if (!query) {
      resultsContainer.innerHTML = '';
      return;
    }

    // This is a placeholder - you'll need to integrate with Jekyll search
    // For now, just show that search is working
    resultsContainer.innerHTML = '<div class="result-item">Search for "' + query + '" - Integration pending</div>';
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

  // Restore focus mode if it was enabled
  function restoreFocusMode() {
    if (sessionStorage.getItem('focus-mode') === 'true') {
      document.body.classList.add('focus-mode');
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      init();
      restoreFocusMode();
    });
  } else {
    init();
    restoreFocusMode();
  }
})();
