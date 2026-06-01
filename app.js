/**
 * ArchiMate 3.2 Mobile-First Cheat Sheet - Application Controller Core Execution Engine
 * Description: Client-side event-driven script governing state tracking, performance-optimized
 * text filtering engines, theme customization routines, and web standard accessibility constraints.
 */

(() => {
  'use strict';

  // Application-wide Runtime State Object
  const state = {
    searchQuery: '',
    activeLayer: 'all'
  };

  // DOM Elements Selector Cache Mapping
  const elements = {
    themeToggle: document.getElementById('theme-toggle'),
    searchInput: document.getElementById('search-input'),
    searchClear: document.getElementById('search-clear'),
    filterChips: document.querySelectorAll('.filter-chip'),
    chipsContainer: document.getElementById('chips-container'),
    scrollLeftBtn: document.getElementById('scroll-left-btn'),
    scrollRightBtn: document.getElementById('scroll-right-btn'),
    cardsContainer: document.getElementById('cards-container'),
    searchStatus: document.getElementById('search-status'),
    toastNotification: document.getElementById('toast-notification'),
    emptyStateCard: null // Will instantiate if needed dynamically
  };

  /**
   * Application Initialization Lifecycle Framework Routine
   */
  function init() {
    setupThemeArchitecture();
    createStaticEmptyStateCard();
    attachEventHandlers();
    evaluateUrlHashDeepLink();
    filterPrerenderedCardsGrid();
  }

  /**
   * Sets up Theme Configuration Rules extracted from local browser profiles
   */
  function setupThemeArchitecture() {
    const savedTheme = localStorage.getItem('archimate-theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  /**
   * Injects a structural template node fallback for empty query result scenarios
   */
  function createStaticEmptyStateCard() {
    const emptyStateDiv = document.createElement('div');
    emptyStateDiv.className = 'empty-state-card';
    emptyStateDiv.id = 'static-empty-state';
    emptyStateDiv.innerHTML = `
      <p class="empty-state-title">No Matching Elements Found</p>
      <p class="empty-state-text">Refine your active search criteria text constraints or pick alternative layer categories.</p>
      <button id="reset-filters-btn" class="reset-btn">Reset Filters</button>
    `;
    elements.cardsContainer.appendChild(emptyStateDiv);
    elements.emptyStateCard = emptyStateDiv;

    document.getElementById('reset-filters-btn').addEventListener('click', () => {
      resetAllConstraintsView();
      filterPrerenderedCardsGrid();
    });
  }

  /**
   * Helper utility to safely construct structural alphanumeric slugs for clean hash strings
   */
  function generateElementSlugId(name) {
    return name.toLowerCase()
               .replace(/[^a-z0-9\s-]/g, '')
               .replace(/\s+/g, '-');
  }

  /**
   * Filters and toggles visual visibility classes across pre-rendered card nodes
   */
  function filterPrerenderedCardsGrid() {
    const queryTokens = state.searchQuery.toLowerCase().tokenizeExpression();
    let matchCount = 0;
    
    const cards = elements.cardsContainer.querySelectorAll('.card:not(.empty-state-card)');

    cards.forEach((card) => {
      const itemLayer = card.getAttribute('data-layer') || '';
      const itemName = card.getAttribute('data-name') || '';
      const itemDesc = card.querySelector('.card-description')?.textContent || '';
      const tags = Array.from(card.querySelectorAll('.taxonomy-tag')).map(t => t.textContent).join(' ');

      // Evaluate taxonomy category filter constraint matching criteria
      const matchesLayer = (state.activeLayer === 'all' || itemLayer === state.activeLayer);

      // Evaluate advanced multi-token query matching criteria
      const unifiedSearchText = `${itemName} ${itemDesc} ${tags}`.toLowerCase();
      const matchesSearch = queryTokens.every(token => unifiedSearchText.includes(token));

      if (matchesLayer && matchesSearch) {
        card.classList.remove('hidden-by-filter');
        matchCount++;
      } else {
        card.classList.add('hidden-by-filter');
      }
    });

    // Populate live region accessibility feedback status bounds
    elements.searchStatus.textContent = `${matchCount} notation elements found matching criteria options.`;

    if (matchCount === 0) {
      elements.emptyStateCard.classList.add('visible');
    } else {
      elements.emptyStateCard.classList.remove('visible');
    }
  }

  /**
   * Prototype Extension Layer providing tokenize strings capabilities safely
   */
  String.prototype.tokenizeExpression = function() {
    return this.trim().split(/\s+/).filter(Boolean);
  };

  /**
   * Helper utility to show a toast message when copying text to clipboard
   */
  function showToastMessage() {
    elements.toastNotification.classList.add('show');
    elements.toastNotification.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      elements.toastNotification.classList.remove('show');
      elements.toastNotification.setAttribute('aria-hidden', 'true');
    }, 2500);
  }

  /**
   * Attaches Interactive UI Interaction Handlers and Listeners
   */
  function attachEventHandlers() {
    // Theme Architecture Controller
    elements.themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      if (activeTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('archimate-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('archimate-theme', 'dark');
      }
    });

    // Text Engine Filter Controller Input Loop
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      if (state.searchQuery.trim().length > 0) {
        elements.searchClear.classList.add('visible');
      } else {
        elements.searchClear.classList.remove('visible');
      }
      filterPrerenderedCardsGrid();
    });

    // Clear Text Control Trigger
    elements.searchClear.addEventListener('click', () => {
      elements.searchInput.value = '';
      state.searchQuery = '';
      elements.searchClear.classList.remove('visible');
      elements.searchInput.focus();
      filterPrerenderedCardsGrid();
    });

    // Layer Category Filter Chip Select Loop Routing
    elements.filterChips.forEach((chip) => {
      chip.addEventListener('click', () => {
        elements.filterChips.forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        state.activeLayer = chip.getAttribute('data-layer');
        filterPrerenderedCardsGrid();
      });
    });

    // Horizontal Scroll Arrow Listeners for Pills Carousel Navigation Indicator
    elements.scrollLeftBtn.addEventListener('click', () => {
      elements.chipsContainer.scrollLeft -= 150;
    });

    elements.scrollRightBtn.addEventListener('click', () => {
      elements.chipsContainer.scrollLeft += 150;
    });

    // Handle permalink click actions: change URL hash, scroll, and copy link to clipboard
    elements.cardsContainer.addEventListener('click', (e) => {
      const permalinkButton = e.target.closest('.card-permalink');
      if (permalinkButton) {
        const targetHash = permalinkButton.getAttribute('data-hash');
        
        // Update URL hash state dynamically
        window.location.hash = targetHash;

        // Build fully absolute URL reference path
        const absoluteUrl = `${window.location.origin}${window.location.pathname}${targetHash}`;

        // Perform programmatic write execution directly to system clipboard API registers
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(absoluteUrl)
            .then(showToastMessage)
            .catch(err => console.error('Clipboard copy registration fault:', err));
        } else {
          // Alternative fallback for older engine frameworks
          const textArea = document.createElement('textarea');
          textArea.value = absoluteUrl;
          textArea.style.position = 'fixed';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
            showToastMessage();
          } catch (err) {
            console.error('Fallback copy registration fault:', err);
          }
          document.body.removeChild(textArea);
        }
      }
    });

    // Monitor for browser historical popstate changes to maintain anchor sync tracking 
    window.addEventListener('hashchange', () => {
      evaluateUrlHashDeepLink();
    });
  }

  /**
   * Clears state parameters across visual criteria frameworks
   */
  function resetAllConstraintsView() {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.searchClear.classList.remove('visible');
    
    elements.filterChips.forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-pressed', 'false');
    });
    const defaultChip = Array.from(elements.filterChips).find(c => c.getAttribute('data-layer') === 'all');
    if (defaultChip) {
      defaultChip.classList.add('active');
      defaultChip.setAttribute('aria-pressed', 'true');
    }
    state.activeLayer = 'all';
  }

  /**
   * Parses and Routes Window Anchors to load requested targets directly
   */
  function evaluateUrlHashDeepLink() {
    const currentHash = window.location.hash.trim();
    if (!currentHash) return;

    const targetedElementId = currentHash.replace('#', '');
    let matchedDomElement = document.getElementById(targetedElementId);

    // If card is hidden, reset filters to allow structural matching and smooth scrolling
    if (matchedDomElement && matchedDomElement.classList.contains('hidden-by-filter')) {
      resetAllConstraintsView();
      const targetLayer = matchedDomElement.getAttribute('data-layer');
      state.activeLayer = targetLayer;
      
      const matchingChip = Array.from(elements.filterChips).find(c => c.getAttribute('data-layer') === targetLayer);
      if (matchingChip) {
        elements.filterChips.forEach(c => c.classList.remove('active'));
        matchingChip.classList.add('active');
        matchingChip.setAttribute('aria-pressed', 'true');
      }
      filterPrerenderedCardsGrid();
    }

    if (matchedDomElement && matchedDomElement.classList.contains('card')) {
      setTimeout(() => {
        matchedDomElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        matchedDomElement.focus();
      }, 50);
    }
  }

  // Inject execution hook into context processing pipeline thread loops
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();