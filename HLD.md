# High-Level Design (HLD) — ArchiMate 3.2 Mobile-First Cheat Sheet

## 1. Executive Summary

This document outlines the architecture for a high-performance, mobile-first ArchiMate 3.2 visual reference and cheat sheet. Designed explicitly for beginner architects, the system delivers instantaneous fuzzy search and categorical filtering across approximately 50 frozen ArchiMate notations.

To guarantee zero operational costs and infinite technical durability, the system executes entirely on the client side using modern native web standards (HTML5, Vanilla ES6+ JavaScript, and CSS Custom Properties) hosted on GitHub Pages. By pre-rendering data natively inside the markup and using declarative CSS state-toggling, the platform completely eliminates traditional server-side infrastructure, database overhead, and client-side build-tool complexity.

---

## 2. Requirements

### Functional Requirements

* **FR-01: Real-Time Fuzzy Search:** Users can filter the notation repository instantly via an interactive search input matching against element names and descriptions.
* **FR-02: Categorical Layer Filtering:** Interactive UI components (chips/buttons) allow users to isolate elements by their explicit ArchiMate layer taxonomy.
* **FR-03: Responsive Card Layout:** Notations transform seamlessly from multi-column grids on desktop layouts into single-column, touch-optimized scroll feeds on mobile viewports.
* **FR-04: Rule of Thumb Matrix:** A distinct, high-readability static reference section maps architectural layers to their primary organizational query and typical core elements.
* **FR-05: Persistent Theme State:** A native user toggle changes between Light and Dark visual themes, with settings preserved across sessions.

### Non-Functional Requirements (NFRs)

* **Performance:** Time-to-Interactive (TTI) under 1.0 second on cellular mobile networks; search filter latency under 10 milliseconds per keystroke.
* **Scalability:** Capable of handling unlimited concurrent user traffic natively via GitHub's global Edge CDN without resource degradation.
* **Footprint:** Total deployment asset bundle size under 150KB, including all visual vector assets (SVGs) and configuration scripts.
* **Availability:** 99.99%+ availability backed by GitHub Pages infrastructure.
* **Compatibility:** Fully functional across all modern Evergreen mobile and desktop web browsers (Safari, Chrome, Firefox, Edge).

### Assumptions

* The ArchiMate specification is completely frozen at version 3.2; no administrative interface, content moderation, dynamic ingestion workflows, or write operations are required.
* JavaScript is enabled on the client browser for search and filtering functionality; standard CSS degradation ensures fallback text visibility if JS is absent.

### Out-of-Scope

* Downloadable or exportable SVG image assets.
* Inter-element linking or interactive modeling capabilities.
* Offline support via Progressive Web Apps (PWA) or Service Workers.
* User accounts, bookmarking, analytics tracking, or backend telemetry.

---

## 3. System Context

The system operates as an isolated, single-tier client architecture.

```
+-------------------------------------------------------+
|                    Client Browser                     |
|                                                       |
|   +-------------------+       +-------------------+   |
|   |  User Interface   | ----> |   Vanilla JS Engine|   |
|   | (DOM Grid/Cards)  | <---- | (State Controller)|   |
|   +-------------------+       +-------------------+   |
|             |                           |             |
+-------------|---------------------------|-------------+
              | (HTTPS Request)           | (Local Reads)
              v                           v
    +-------------------+       +-------------------+
    | GitHub Pages CDN  |       |   LocalStorage    |
    |  (Static Assets)  |       |  (Theme Cache)    |
    +-------------------+       +-------------------+

```

### System Actors & Boundaries

* **End User:** Accesses the site primarily via a mobile device to rapidly cross-reference ArchiMate standards.
* **GitHub Pages CDN:** The sole external infrastructure dependency, responsible for serving static compiled markup, styles, and logic over HTTPS.
* **Browser LocalStorage:** Client-side sandbox used exclusively to persist the user's Dark/Light mode theme state.

---

## 4. High-Level Architecture

The internal client architecture is broken down into three tightly integrated layers residing within a single codebase layer.

```
+---------------------------------------------------------------------------------------+
|                                    Client DOM Space                                   |
|                                                                                       |
|   +-------------------------------------------------------------------------------+   |
|   | Search & Filter Controls                                                      |   |
|   | [ Text Input Field ]  [ Layer Selector Buttons (Strategy, Business, etc.) ]   |   |
|   +-------------------------------------------------------------------------------+   |
|                                           |                                           |
|                                           v (Dispatches Events)                       |
|   +-------------------------------------------------------------------------------+   |
|   | Vanilla JS Controller (State Processing)                                      |   |
|   | - Listens to input & click vectors                                            |   |
|   | - Tokenizes search string; reads target layer                                 |   |
|   | - Executes fast loop over element NodeList checking data-* boundaries          |   |
|   +-------------------------------------------------------------------------------+   |
|                                           |                                           |
|                                           v (Applies/Removes Classes)                 |
|   +-------------------------------------------------------------------------------+   |
|   | Presentation Card Grid                                                        |   |
|   | +-----------------------+ +-----------------------+ +-----------------------+ |   |
|   | | Card (Active)         | | Card (Active)         | | Card (.hidden)        | |   |
|   | +-----------------------+ +-----------------------+ +-----------------------+ |   |
|   +-------------------------------------------------------------------------------+   |
+---------------------------------------------------------------------------------------+

```

### Core Components

* **Layout Structure (`index.html`):** Contains the complete skeleton, the static "Rule of Thumb" table, and all ~50 notation cards pre-rendered server-side/compile-time into the standard DOM tree.
* **Design Engine (`styles.css`):** Formulated entirely using native modern CSS properties. Implements a responsive Flexbox/Grid system based on `auto-fit` or `auto-fill` boundaries, along with a high-performance utility system mapping hidden states to a strict performance utility class:
```css
.card.hidden { display: none !important; }

```


* **Application Controller (`app.js`):** Instantiates event hooks to intercept text queries and filter interactions. It maintains state exclusively within the DOM by altering specific element class lists based on declarative criteria.

---

## 5. Data Architecture

### Core Data Structure

Because all components are pre-rendered, the HTML element structure serves directly as the indexed data layer. To optimize extraction without parsing nested text nodes at runtime, every card wraps its schema elements cleanly inside native HTML5 data attributes:

```html
<div class="card" 
     data-name="material" 
     data-description="physical matter used or produced by the enterprise" 
     data-layer="technology">
  <div class="card-visual">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 17">
       </svg>
  </div>
  <h3 class="card-title">Material</h3>
  <p class="card-body">Physical matter used or produced by the enterprise.</p>
  <span class="card-badge">Technology</span>
</div>

```

### Storage Choices & Retention

* **Primary Storage:** In-memory browser DOM nodes.
* **Data Lifecycle:** Immutable at runtime. Edits are implemented purely by modifying the hardcoded static `index.html` source repository file.
* **Theme Persistence:** A simple key-value string mapping stored locally inside the client user agent: `theme: "dark"` or `theme: "light"`.

---

## 6. API & Integration Design

* **External Endpoints:** None. The application runs autonomously and requires no API gateway, third-party backend tokens, or database connections.
* **Integration Patterns:** Isolated runtime loop. The JavaScript execution layer queries the DOM NodeList natively using standard query selectors:
```javascript
const cards = document.querySelectorAll('.card');

```



---

## 7. Scalability & Performance

### Scaling Strategy

Because hosting relies entirely on GitHub Pages, scaling capabilities are shifted directly to GitHub's infrastructure providers. Traffic spikes are seamlessly absorbed via edge-caching mechanics, meaning the host can handle millions of concurrent requests effortlessly without increasing backend compute loads.

### Bottleneck Analysis & Caching

Traditional frontend bottlenecks stem from dynamic template interpolation or heavy framework hydration loops. This architecture completely prevents these issues by executing structural filtering loops via pre-cached DOM nodes:

```javascript
// Extremely fast, low-memory filtering pattern
const query = inputField.value.toLowerCase().trim();
const activeLayer = currentLayerFilter;

cards.forEach(card => {
  const matchesSearch = card.dataset.name.includes(query) || card.dataset.description.includes(query);
  const matchesLayer = (activeLayer === 'all') || (card.dataset.layer === activeLayer);

  if (matchesSearch && matchesLayer) {
    card.classList.remove('hidden');
  } else {
    card.classList.add('hidden');
  }
});

```

Because the total loop size is tightly capped at roughly 50 iterations, execution takes less than 2 milliseconds, maintaining a locked 60 FPS profile even on underpowered mobile processors.

---

## 8. Security & Compliance

### AuthN / AuthZ

Not applicable. All reference data is entirely public and unauthenticated.

### Threat Landscape Mitigation

| Threat Vector | Severity | Architectural Defense |
| --- | --- | --- |
| **Cross-Site Scripting (XSS)** | Low | Because the runtime logic uses **zero** dynamic evaluation commands (`eval()`, `innerHTML`, or `dangerouslySetInnerHTML`), it is impossible to inject malicious executable strings into the application context via search fields. |
| **Content Defacement** | Medium | Protected by standard GitHub repository authorization controls. Changes require explicit write clearance to the primary repository or approved Pull Request triggers. |
| **Data Privacy (PII)** | None | The platform operates with no telemetry, tracking scripts, tracking cookies, or dynamic logging inputs, making it fully compliant with GDPR and CCPA out-of-the-box. |

---

## 9. Reliability & Operations

### High Availability (HA) & Disaster Recovery (DR)

High availability is achieved through geographic distribution provided natively by GitHub's globally decentralized Content Delivery Network. If a local CDN node suffers an outage, upstream DNS routing automatically pushes user sessions to adjacent web server clusters. Backups match the strict commit tracking history of the master Git repository version log.

### Monitoring, Logging & Alerting

To preserve absolute user privacy and ensure a small footprint, tracking tools are completely absent. Health status queries can be performed using native browser error trackers or external site uptime monitors (e.g., UptimeRobot).

---

## 10. Architecture Decision Records (ADRs)

### ADR 01: Rejection of Single-Page Application (SPA) Frameworks

* **Context:** The application needs a modern look and must support rapid client-side text filtering and card layout rendering.
* **Decision:** Reject frameworks like React, Vue, or Alpine.js in favor of native Vanilla ES6 JavaScript.
* **Rationale:** Introducing an abstraction layer adds unnecessary script weight, hydration delays, and build pipeline dependencies for a simple, frozen 50-item dataset.
* **Tradeoffs:** Requires writing manual DOM traversal selectors and setting up explicit class management wrappers, but provides maximum longevity and optimal performance.

### ADR 02: Selection of Dom State Toggling over Dynamic Component Generation

* **Context:** Choosing between generating markup dynamically from raw JSON data inputs or filtering pre-rendered components.
* **Decision:** Pre-render all 50 items directly in the raw HTML template and toggle visibility with a `.hidden` CSS class.
* **Rationale:** Eliminates client-side template processing bottlenecks, makes structural assets crawlable by search engine bots for optimal SEO without SSR middleware, and radically simplifies search filtering code.
* **Tradeoffs:** The initial raw HTML asset payload is slightly larger, but this is offset by the fact that it eliminates the need to fetch separate external JSON data files over HTTP.

---

## 11. Risks & Open Questions

* **Browser Compatibility Risk:** Relying on cutting-edge modern CSS features (like native CSS Nesting or Container Queries) might lead to layout inconsistencies on ancient legacy devices.
* *Mitigation:* Stick to widely supported CSS specifications (Flexbox, standard Grid, CSS variables) that are robustly implemented across all mobile browsers released within the past decade.



---

## 12. Future Evolution

If the target scope expands in future iterations to include later standard specifications (e.g., ArchiMate 4.0), the application can cleanly scale by simply injecting additional pre-rendered card nodes into the main layout container or utilizing a local build script to loop over JSON definitions and output a single compiled `index.html` file. No core structural changes to the search engine, style layouts, or hosting infrastructure will be required.
