/**
 * ArchiMate 3.2 Mobile-First Cheat Sheet - Application Controller Core Execution Engine
 * * Description: Client-side event-driven script governing state tracking, performance-optimized
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
    cards: document.querySelectorAll('.card'),
    cardsContainer: document.getElementById('cards-container'),
    emptyState: document.getElementById('empty-state'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    searchStatus: document.getElementById('search-status')
  };

  /**
   * Application Initialization Lifecycle Framework Routine
   */
  function init() {
    setupThemeArchitecture();
    attachEventHandlers();
    evaluateUrlHashDeepLink();
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
   * Toggles and Commits Active Application Theme Styles State Profiles
   */
  function toggleThemeProfile() {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('archimate-theme', targetTheme);
  }

  /**
   * Binds Performance-Optimized Client Execution Event Interface Listeners
   */
  function attachEventHandlers() {
    // Theme Click Router Trigger
    elements.themeToggle.addEventListener('click', toggleThemeProfile);

    // Optimized Core Real-Time Search Handler Matrix
    elements.searchInput.addEventListener('input', handleSearchInputChange);
    elements.searchClear.addEventListener('click', clearSearchInputField);

    // Filter Chips Interactive Category Iteration Mapping
    elements.filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const targetCategory = chip.getAttribute('data-layer');
        updateLayerFilterState(targetCategory);
      });
    });

    // Reset CTA Trigger Handler Linkage
    elements.resetFiltersBtn.addEventListener('click', resetAllConstraintsView);

    // Listen to Hash Changes dynamically across lifecycle window executions
    window.addEventListener('hashchange', evaluateUrlHashDeepLink);
  }

  /**
   * Process and Route text characters input inside structural components
   */
  function handleSearchInputChange(event) {
    state.searchQuery = event.target.value.toLowerCase().trim();
    
    // Toggle clean utility button state profiles
    if (state.searchQuery.length > 0) {
      elements.searchClear.classList.add('visible');
    } else {
      elements.searchClear.classList.remove('visible');
    }
    
    executeFilteringEngine();
  }

  /**
   * Forces clean state tracking over textual input components
   */
  function clearSearchInputField() {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.searchClear.classList.remove('visible');
    elements.searchInput.focus();
    executeFilteringEngine();
  }

  /**
   * Mutates and Synchronizes taxonomy-oriented layout states
   */
  function updateLayerFilterState(selectedLayer) {
    state.activeLayer = selectedLayer;

    // Redraw and reclassify UI chips elements selection states
    elements.filterChips.forEach(chip => {
      const chipLayer = chip.getAttribute('data-layer');
      if (chipLayer === selectedLayer) {
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
      } else {
        chip.classList.remove('active');
        chip.setAttribute('aria-pressed', 'false');
      }
    });

    executeFilteringEngine();
  }

  /**
   * High-Performance Pipeline matching state metrics with display grids instantly (<10ms)
   */
  function executeFilteringEngine() {
    let structuredVisibleCounter = 0;

    elements.cards.forEach(card => {
      const cardName = card.getAttribute('data-name').toLowerCase();
      const cardDescription = card.querySelector('.card-description').textContent.toLowerCase();
      const cardLayer = card.getAttribute('data-layer');

      // Verify intersection parameters against user selection metrics
      const matchesSearch = cardName.includes(state.searchQuery) || cardDescription.includes(state.searchQuery);
      const matchesLayer = state.activeLayer === 'all' || cardLayer === state.activeLayer;

      if (matchesSearch && matchesLayer) {
        card.classList.remove('hidden');
        structuredVisibleCounter++;
      } else {
        card.classList.add('hidden');
      }
    });

    // Update Accessible live status region for users utilizing screen readers
    elements.searchStatus.textContent = `Displaying ${structuredVisibleCounter} notation entries matching parameters.`;

    // Process structural display properties over fallback views
    if (structuredVisibleCounter === 0) {
      elements.emptyState.classList.remove('hidden');
      elements.cardsContainer.style.display = 'none';
    } else {
      elements.emptyState.classList.add('hidden');
      elements.cardsContainer.style.display = '';
    }
  }

  /**
   * Clears state parameters across visual criteria frameworks
   */
  function resetAllConstraintsView() {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.searchClear.classList.remove('visible');
    updateLayerFilterState('all');
  }

  /**
   * Parses and Routes Window Anchors to load requested targets directly
   */
  function evaluateUrlHashDeepLink() {
    const currentHash = window.location.hash.trim();
    if (!currentHash) return;

    const targetedElementId = currentHash.replace('#', '');
    const matchedDomElement = document.getElementById(targetedElementId);

    if (matchedDomElement) {
      // Check if target is a Card or the Matrix
      if (matchedDomElement.classList.contains('card')) {
        const associatedLayer = matchedDomElement.getAttribute('data-layer');
        // Clear conflicting filters to ensure element visibility
        updateLayerFilterState(associatedLayer);
      }
      
      // Delay navigation fractionally to ensure rendering passes populate structural dimensions
      setTimeout(() => {
        matchedDomElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        matchedDomElement.focus();
      }, 80);
    }
  }

  // Inject execution hook into context processing pipeline thread loops
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();