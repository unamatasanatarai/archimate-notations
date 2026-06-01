# High-Level Design (HLD) — ArchiMate 3.2 Mobile-First Cheat Sheet

---

# 1. Executive Summary

This document defines the architecture for a high-performance, mobile-first ArchiMate 3.2 visual reference and cheat sheet.

The application is designed primarily for beginner and intermediate enterprise architects who need rapid access to ArchiMate concepts, notation definitions, layer classifications, and modeling guidance.

The platform provides:

* Instantaneous substring-matching search
* Layer-based filtering
* Responsive mobile-first navigation
* Rule-of-Thumb reference matrix
* Dark/Light theme support
* Accessibility-compliant interactions
* Zero-backend deployment architecture

The solution is implemented entirely using native web technologies:

* HTML5
* Vanilla ES6+ JavaScript
* CSS Custom Properties

and hosted via GitHub Pages.

The architecture intentionally eliminates:

* Servers
* Databases
* APIs
* Build pipelines
* Framework dependencies

to maximize longevity, simplicity, performance, and maintainability.

---

# 2. Requirements

## 2.1 Functional Requirements

### FR-01: Real-Time Substring Search

Users can instantly search across all ArchiMate notations by:

* Element name
* Element description

Search updates results in real time as users type.

---

### FR-02: Layer-Based Filtering

Users can filter notation cards by ArchiMate layer taxonomy using interactive filter chips/buttons.

---

### FR-03: Responsive Card Layout

The interface shall adapt automatically:

| Device  | Layout                    |
| ------- | ------------------------- |
| Desktop | Multi-column grid         |
| Tablet  | Reduced-column grid       |
| Mobile  | Single-column scroll feed |

---

### FR-04: Rule-of-Thumb Matrix

A static high-visibility reference section maps:

* Architectural layers
* Typical architectural questions
* Common element types

This section is visible without requiring filtering.

---

### FR-05: Persistent Theme State

Users can switch between:

* Light Theme
* Dark Theme

Theme preference is persisted using LocalStorage.

Fallback order:

1. Saved user preference
2. Browser `prefers-color-scheme`
3. Light theme

---

### FR-06: Accessibility Support

The application shall comply with WCAG 2.1 AA requirements.

Features include:

* Keyboard navigation
* Proper semantic HTML
* ARIA labels
* Screen-reader announcements
* Focus indicators
* Color contrast compliance

---

### FR-07: Search Result Feedback

Users shall receive immediate feedback showing:

```text
Showing X of Y results
```

Results update dynamically while searching.

---

### FR-08: Search Reset Control

A clear-search ("×") button shall appear inside the search input when text is entered.

Selecting it resets:

* Search query
* Result count
* Filtered state

---

### FR-09: Empty State Handling

When no matching results exist:

```text
No results found
```

The interface displays:

* Empty-state message
* Clear Search action

---

# 3. Non-Functional Requirements

## Performance

| Metric                    | Target     |
| ------------------------- | ---------- |
| Time to Interactive (TTI) | < 1 second |
| Search Latency            | < 10 ms    |
| Frame Rate                | 60 FPS     |
| Initial Payload           | < 150 KB   |

Performance targets apply on:

* Mid-tier mobile hardware
* 4G network conditions

---

## Scalability

The system shall support effectively unlimited concurrent users through GitHub Pages CDN edge distribution.

No server-side scaling activities are required.

---

## Availability

Target availability:

```text
99.99%+
```

provided by GitHub Pages infrastructure.

---

## Compatibility

Supported browsers:

* Chrome
* Safari
* Firefox
* Edge

All current evergreen browser releases are supported.

---

## Accessibility

Target:

```text
WCAG 2.1 AA
```

---

# 4. Assumptions

* ArchiMate 3.2 content is frozen.
* No administrative interface is required.
* No content editing occurs at runtime.
* JavaScript is enabled.
* All notation data is known before deployment.
* GitHub Pages remains the hosting platform.

---

# 5. Out of Scope

The following capabilities are intentionally excluded:

### Content Management

* CMS
* Runtime editing
* Admin console

### User Features

* User accounts
* Authentication
* Favorites/bookmarks
* Personalization

### Analytics

* User tracking
* Behavioral analytics
* Telemetry

### Modeling Features

* Diagram editing
* Inter-element relationships
* Interactive modeling

### Offline Features

* PWA support
* Service Workers

### Asset Export

* SVG download
* Image export

---

# 6. System Context

The application operates as a single-tier architecture.

```text
+-------------------------------------------------------+
|                    Client Browser                     |
|                                                       |
|   +-------------------+       +-------------------+   |
|   |  User Interface   | ----> | Vanilla JS Engine |   |
|   | (DOM Grid/Cards)  | <---- | State Controller  |   |
|   +-------------------+       +-------------------+   |
|             |                           |             |
+-------------|---------------------------|-------------+
              |                           |
              v                           v
    +-------------------+       +-------------------+
    | GitHub Pages CDN  |       | LocalStorage      |
    | Static Assets     |       | Theme Preference  |
    +-------------------+       +-------------------+
```

---

## Actors

### End User

Consumes the reference site from:

* Mobile devices
* Tablets
* Desktop browsers

---

### GitHub Pages CDN

Serves:

* HTML
* CSS
* JavaScript
* SVG assets

---

### Browser LocalStorage

Stores:

```javascript
theme = "light" | "dark"
```

---

# 7. High-Level Architecture

## Client-Side Architecture

```text
+------------------------------------------------------+
| Search & Filter Controls                             |
|                                                      |
| [Search] [Clear] [Layer Chips]                       |
+---------------------------+--------------------------+
                            |
                            v
+------------------------------------------------------+
| Vanilla JS Controller                                |
|                                                      |
| - Search processing                                  |
| - Layer filtering                                    |
| - Result counting                                    |
| - Theme state                                        |
+---------------------------+--------------------------+
                            |
                            v
+------------------------------------------------------+
| Presentation Layer                                   |
|                                                      |
| - Rule of Thumb Matrix                               |
| - Notation Card Grid                                 |
| - Empty States                                       |
| - Result Count Display                               |
+------------------------------------------------------+
```

---

# 8. Layer Taxonomy

The notation repository is organized into 9 categories:

1. Application
2. Business
3. Composite
4. Implementation & Migration
5. Motivation
6. Physical
7. Relationship
8. Strategy
9. Technology

These categories drive filter generation and classification.

---

# 9. Core Components

## 9.1 Layout Structure (`index.html`)

Contains:

* Header
* Search controls
* Layer filter controls
* Rule-of-Thumb matrix
* Result count region
* Empty state region
* 71 pre-rendered notation cards

---

## 9.2 Styling Layer (`styles.css`)

Responsibilities:

* Responsive grid
* Mobile-first design
* Theme system
* Accessibility styling
* Utility classes

Example:

```css
.card.hidden {
    display: none !important;
}
```

---

## 9.3 Application Controller (`app.js`)

Responsibilities:

* Search processing
* Layer filtering
* Result counting
* Theme persistence
* Accessibility announcements

---

# 10. Data Architecture

## Data Model

Each notation is stored directly inside the DOM.

Example:

```html
<div class="card"
     data-name="material"
     data-description="physical matter used or produced by the enterprise"
     data-layer="technology">

  <div class="card-visual">
      <svg></svg>
  </div>

  <h3>Material</h3>

  <p>
      Physical matter used or produced by the enterprise.
  </p>

  <span>Technology</span>
</div>
```

---

## Storage Strategy

### Primary Storage

Browser DOM

### Persistence

LocalStorage

```javascript
theme = "dark"
theme = "light"
```

### Data Lifecycle

Immutable at runtime.

Changes require repository updates and redeployment.

---

# 11. Search & Filtering Design

## Search Algorithm

```javascript
const query = input.value.toLowerCase().trim();

cards.forEach(card => {

    const matchesSearch =
        card.dataset.name.includes(query) ||
        card.dataset.description.includes(query);

    const matchesLayer =
        activeLayer === 'all' ||
        card.dataset.layer === activeLayer;

    card.classList.toggle(
        'hidden',
        !(matchesSearch && matchesLayer)
    );
});
```

---

## Search Characteristics

| Property         | Value        |
| ---------------- | ------------ |
| Matching Style   | Substring    |
| Case Sensitivity | None         |
| Debouncing       | Not Required |
| Dataset Size     | 71 Elements  |
| Expected Latency | <10ms        |

---

## Search UX

### Result Count

```text
Showing 12 of 71 results
```

### Empty State

```text
No results found
```

### Recovery Action

```text
Clear Search
```

---

# 12. Theme Management

Initialization:

```javascript
const savedTheme =
    localStorage.getItem('theme');

const systemTheme =
    window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
      ? 'dark'
      : 'light';

const theme =
    savedTheme ||
    systemTheme ||
    'light';
```

Priority:

1. Saved preference
2. Browser preference
3. Default light

---

# 13. API & Integration Design

## External APIs

None.

## External Services

Only:

* GitHub Pages

No:

* REST APIs
* GraphQL
* Databases
* Authentication providers
* Analytics providers

---

# 14. Scalability & Performance

## Scalability Strategy

Scaling responsibility is delegated entirely to GitHub's CDN infrastructure.

Benefits:

* Global edge caching
* No compute scaling
* No database bottlenecks

---

## Performance Optimization

### Optimization Techniques

* Pre-rendered HTML
* Zero hydration
* No framework runtime
* No network fetches
* Native DOM filtering
* Inline SVG assets

### Expected Runtime

Filtering:

```text
< 2 ms
```

on modern mobile devices.

---

# 15. Security, Privacy & Compliance

## Authentication & Authorization

Not required.

All content is publicly accessible.

---

## Threat Assessment

| Threat                | Severity | Mitigation                                            |
| --------------------- | -------- | ----------------------------------------------------- |
| XSS                   | Low      | No `eval()`, `innerHTML`, or dynamic script execution |
| Repository Defacement | Medium   | GitHub access controls and PR reviews                 |
| PII Exposure          | None     | No user data collected                                |
| Privacy Compliance    | None     | No cookies, tracking, or telemetry                    |

---

## Accessibility Requirements

### WCAG 2.1 AA

Mandatory support:

* Semantic HTML
* Keyboard accessibility
* Focus indicators
* ARIA labels
* Color contrast compliance

### Screen Reader Support

```html
<div aria-live="polite">
    Showing 12 of 71 results
</div>
```

---

## SEO Requirements

The application shall include:

### Semantic HTML5

* header
* main
* section
* article
* footer

### Structured Metadata

* JSON-LD
* Open Graph tags
* Twitter Card tags (optional)

---

# 16. Reliability & Operations

## High Availability

Provided by GitHub Pages CDN distribution.

---

## Disaster Recovery

Recovery source:

```text
Git Repository Commit History
```

All content can be reconstructed from source control.

---

## Monitoring

Application intentionally contains:

* No analytics
* No telemetry
* No event tracking

Optional external monitoring:

* UptimeRobot
* GitHub availability monitoring

---

# 17. Performance Validation

Testing baseline:

| Category          | Requirement     |
| ----------------- | --------------- |
| Device            | Mid-tier mobile |
| Network           | 4G throttling   |
| Browser           | Chrome Mobile   |
| Audit Tool        | Lighthouse      |
| Synthetic Testing | WebPageTest     |

Success criteria:

* TTI < 1s
* Accessibility ≥ 95
* Performance ≥ 95
* Best Practices ≥ 95

---

# 18. Architecture Decision Records (ADRs)

## ADR-01: Reject SPA Frameworks

**Decision:** Use Vanilla ES6+ JavaScript.

**Rationale:**

* Smaller bundle size
* Faster startup
* No hydration overhead
* No build dependencies

---

## ADR-02: Pre-Rendered DOM Strategy

**Decision:** Render all 71 notation cards directly in HTML.

**Rationale:**

* SEO-friendly
* Zero fetch requests
* Simpler architecture
* Better performance

---

## ADR-03: Search Strategy

**Decision:** Use native substring matching.

**Rationale:**

* <10ms latency
* Simple implementation
* Suitable for fixed dataset size

---

## ADR-04: Accessibility Commitment

**Decision:** Adopt WCAG 2.1 AA.

**Rationale:**

* Inclusive design
* Broader usability
* Better quality standards

---

# 19. Risks & Mitigations

| Risk                                | Impact | Mitigation                                                   |
| ----------------------------------- | ------ | ------------------------------------------------------------ |
| Browser support gaps for modern CSS | Medium | Restrict implementation to well-supported CSS features       |
| Future ArchiMate taxonomy changes   | Low    | Content-only updates required                                |
| GitHub Pages outage                 | Low    | Static site can be redeployed elsewhere without code changes |
| Dataset growth beyond current scope | Low    | Filtering logic scales efficiently into hundreds of cards    |

---

# 20. Future Evolution

Future enhancements may include:

### Content Expansion

* ArchiMate 4.x support
* Additional notation sets

### Build Automation

* Optional JSON-to-HTML generation script
* Static content compilation

### Documentation Enhancements

* Layer comparison views
* Interactive learning guides
* Printable cheat-sheet mode

The architecture supports these enhancements without requiring changes to the fundamental client-side design, search engine, or hosting model.
