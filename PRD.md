# Product Requirements Document (PRD)

# ArchiMate 3.2 Mobile-First Cheat Sheet

Version: 1.0
Status: Approved for Engineering
Platform: Web (Mobile-First)
Hosting: GitHub Pages

---

# 1. Product Summary

## Product Overview

The ArchiMate 3.2 Mobile-First Cheat Sheet is a lightweight, static web application that provides enterprise architects with a fast, searchable reference for ArchiMate 3.2 notation, layers, and concepts.

The application is optimized for rapid lookup, learning, and reference usage across mobile, tablet, and desktop devices.

The product is intentionally implemented without:

* Servers
* Databases
* APIs
* Authentication
* Build frameworks

All content is pre-rendered and delivered through GitHub Pages.

---

## Core Value Proposition

Users can find and understand ArchiMate concepts in seconds through:

* Instant search
* Layer-based filtering
* Mobile-first design
* High-visibility reference material
* Accessible interactions

without navigating lengthy documentation.

---

## Problem Statement

Enterprise architects frequently need quick access to notation definitions, layer classifications, and modeling guidance.

Existing resources are often:

* Difficult to navigate
* Not mobile-friendly
* Slow to search
* Too comprehensive for quick reference needs

This product provides a fast, focused alternative optimized specifically for lookup and learning.

---

## Target Users

### Primary Users

* Beginner enterprise architects
* Intermediate enterprise architects
* Solution architects learning ArchiMate
* Certification candidates

### Secondary Users

* Consultants
* Business analysts
* Architecture trainers
* Technical leads

---

# 2. Goals & Non-Goals

## Goals

### Business Goals

* Deliver a high-quality ArchiMate reference experience
* Maintain a zero-maintenance architecture
* Maximize discoverability through SEO
* Ensure long-term sustainability through static deployment

### User Goals

Users should be able to:

1. Find notation quickly
2. Understand notation definitions
3. Browse by architecture layer
4. Understand layer context
5. Access the tool comfortably on mobile devices
6. Use the application with assistive technologies

---

## Non-Goals

### Content Management

* CMS
* Runtime editing
* Administrative tools

### User Features

* Accounts
* Authentication
* User profiles
* Personalization
* Favorites
* Bookmarks
* Saved searches

### Analytics

* User tracking
* Telemetry
* Behavioral analytics

### Modeling Features

* Diagram creation
* Diagram editing
* Relationship visualization
* Interactive modeling

### Export Features

* PDF export
* SVG export
* Image export

### Offline Features

* Service workers
* PWA support
* Offline access

---

# 3. Personas

## Persona 1: New Enterprise Architect

### Characteristics

* Learning ArchiMate
* Frequently references definitions
* Uses mobile devices during meetings

### Motivations

* Learn notation quickly
* Improve modeling confidence
* Reduce dependency on large reference documents

### Pain Points

* Difficulty remembering notation meanings
* Overwhelming documentation
* Context switching during work

---

## Persona 2: Practicing Architect

### Characteristics

* Familiar with ArchiMate fundamentals
* Needs quick validation during modeling

### Motivations

* Verify notation usage
* Confirm layer placement
* Resolve uncertainty rapidly

### Pain Points

* Slow documentation navigation
* Interrupted workflow

---

## Persona 3: Student / Certification Candidate

### Characteristics

* Preparing for exams
* Learning notation taxonomy

### Motivations

* Memorize concepts
* Understand layer relationships

### Pain Points

* Large amount of material
* Difficulty connecting concepts

---

# 4. User Problems & Jobs-To-Be-Done

## JTBD 1

When I remember part of a notation name or description, I want to search instantly so that I can identify the correct ArchiMate concept.

---

## JTBD 2

When working within a specific architecture layer, I want to see only relevant elements so that I can focus on applicable concepts.

---

## JTBD 3

When I am unsure where a concept belongs, I want a reference matrix so that I can understand its architectural context.

---

## JTBD 4

When I am away from my desk, I want a mobile-friendly reference so that I can access information from any device.

---

# 5. Core User Flows

## Flow 1: Search for a Notation

### Entry Points

* Initial page load
* Existing browsing session

### User Journey

1. User enters text into search field
2. Results update immediately
3. Result count updates
4. Matching cards remain visible
5. User reads notation details

### Edge Cases

* Empty query
* Whitespace-only query
* Long search strings
* Mixed-case input

---

## Flow 2: Filter by Layer

### User Journey

1. User selects a filter chip
2. Matching cards remain visible
3. Result count updates

### Edge Cases

* Layer with zero matching search results
* Rapid filter switching

---

## Flow 3: Combined Search and Filtering

### User Journey

1. User selects layer filter
2. User enters search query
3. Search and filter criteria are applied simultaneously
4. Result count updates

---

## Flow 4: Theme Selection

### User Journey

1. User toggles theme
2. Theme updates immediately
3. Preference is stored locally
4. Future visits restore preference

---

## Flow 5: Empty Search Recovery

### User Journey

1. Search returns zero results
2. Empty state appears
3. User selects Clear Search
4. Search is cleared
5. Layer filter remains active
6. Results refresh

---

## Flow 6: Access Rule-of-Thumb Matrix

### User Journey

1. User selects "Rule-of-Thumb Matrix" link in header
2. Page scrolls to matrix section
3. User reviews reference information
4. User returns to notation content

---

# 6. Functional Requirements

## Module A: Search

### FR-01.1

Users shall search notation cards by name.

### FR-01.2

Users shall search notation cards by description.

### FR-01.3

Search shall update in real time while typing.

### FR-01.4

Search shall be case-insensitive.

### FR-01.5

Leading and trailing whitespace shall be ignored.

### Acceptance Criteria

* Results update on every keystroke.
* No page reload occurs.
* Search latency remains below 10 ms.

---

## Module B: Layer Filtering

### FR-02.1

Users shall filter notation cards by taxonomy category.

### FR-02.2

Users shall clear filters using the All filter.

### FR-02.3

Layer filters shall combine with search.

### Acceptance Criteria

* Only matching cards are displayed.
* Active filter is visually distinct.
* Result count updates immediately.

---

## Module C: Result Count

### FR-03.1

The application shall display:

"Showing X of Y results"

### Acceptance Criteria

* Count updates immediately after search or filter changes.
* Count always reflects visible cards.

---

## Module D: Search Reset

### FR-04.1

A clear-search button shall appear whenever search text exists.

### FR-04.2

Selecting the clear button shall remove the search query.

### FR-04.3

Selecting the clear button shall preserve the currently selected layer filter.

### Acceptance Criteria

After clearing:

* Search field is empty.
* Layer filter remains unchanged.
* Results update immediately.
* Result count reflects active filter.

---

## Module E: Rule-of-Thumb Matrix

### FR-05.1

The matrix shall be rendered on page load.

### FR-05.2

The matrix shall be positioned below all notation cards.

### FR-05.3

A navigation link shall exist in the header.

### FR-05.4

The navigation link shall scroll users to the matrix.

### Acceptance Criteria

* Matrix is always accessible.
* Matrix requires no filtering.
* Header navigation functions correctly.

---

## Module F: Theme Management

### FR-06.1

Users shall switch between light and dark themes.

### FR-06.2

Theme preference shall be stored in LocalStorage.

### FR-06.3

Saved preference shall override browser preference.

### Theme Priority

1. Saved preference
2. Browser preference
3. Default light theme

### Acceptance Criteria

* Theme persists across sessions.
* Theme changes without page reload.

---

## Module G: Accessibility

### FR-07.1

Keyboard navigation shall be supported.

### FR-07.2

Interactive controls shall be keyboard accessible.

### FR-07.3

Search result updates shall be announced using ARIA live regions.

### FR-07.4

Focus indicators shall remain visible.

### FR-07.5

Color contrast shall satisfy WCAG 2.1 AA requirements.

---

## Module H: Deep Linking

### FR-08.1

The Rule-of-Thumb Matrix shall support anchor linking.

### FR-08.2

Individual notation cards shall support anchor linking.

### Example URLs

* #rule-of-thumb-matrix
* #application-service
* #material

### Acceptance Criteria

* Links scroll directly to the relevant content.
* Anchors remain stable across deployments.

---

## Module I: SEO

### SEO-01 Semantic HTML

The application shall use:

* header
* main
* section
* article
* footer

appropriately.

---

### SEO-02 Metadata

The application shall include:

* title
* meta description
* viewport metadata

---

### SEO-03 Open Graph

The application shall include:

* og:title
* og:description
* og:type
* og:url

---

### SEO-04 JSON-LD

The application shall provide structured data describing the application as an educational/reference resource.

---

### SEO-05 Twitter Cards

The application shall include:

* twitter:card
* twitter:title
* twitter:description

### Acceptance Criteria

* Metadata exists in rendered HTML.
* Content is indexable by search engines.
* Social sharing previews display correctly.

---

# 7. UX & Interaction Requirements

## Responsive Layout

### Breakpoints

| Width         | Layout                    |
| ------------- | ------------------------- |
| < 480px       | Single-column mobile      |
| 480px–767px   | Large mobile / landscape  |
| 768px–1023px  | Two-column tablet grid    |
| 1024px–1279px | Three-column desktop grid |
| ≥1280px       | Four-column desktop grid  |

### Acceptance Criteria

* No horizontal scrolling.
* Content remains readable without zooming.
* Controls remain accessible.

---

## Search UX

* Search field visible above content.
* Search begins immediately while typing.
* No submit button required.

---

## Search Clear Button

### Visible

* When text exists.

### Hidden

* When input is empty.

---

## Filter Chips

### Active State

* Clearly distinguished visually.
* Accessible color contrast.

### Inactive State

* Clearly selectable.

---

## Theme Toggle

* Immediate visual update.
* No reload required.

---

## Empty State

### Message

"No results found"

### Action

"Clear Search"

### Requirements

* Prominent placement
* Keyboard accessible

---

## Error States

### LocalStorage Failure

* Continue functioning normally
* Disable persistence gracefully

### Invalid Theme Value

* Revert to fallback sequence

---

# 8. Data & System Constraints

## Architecture Constraints

| Constraint          | Impact                               |
| ------------------- | ------------------------------------ |
| No backend          | No dynamic content                   |
| No APIs             | All content bundled                  |
| Static deployment   | Redeployment required for updates    |
| JavaScript required | Search/filter unavailable without JS |
| LocalStorage only   | Theme is sole persisted preference   |

---

## Content Model

Each notation card shall contain:

* Name
* Description
* Layer
* SVG visual

---

## Dataset Constraints

* Approximately 71 notation cards
* ArchiMate 3.2 content
* Immutable at runtime

---

## Storage Model

### Persistent

LocalStorage

theme = light | dark

### Runtime

DOM-based data attributes

---

# 9. Taxonomy & Filters

## User-Facing Filter Labels

1. Application
2. Business
3. Composite
4. Implementation & Migration
5. Motivation
6. Physical
7. Relationship
8. Strategy
9. Technology

---

## Internal Mapping

| Internal Category        | Display Label |
| ------------------------ | ------------- |
| Technology               | Technology    |
| Technology (Specialized) | Technology    |
| Physical                 | Physical      |
| Physical (Specialized)   | Physical      |
| Motivation               | Motivation    |
| Motivation (Refined)     | Motivation    |

No duplicate filter chips shall be shown.

---

# 10. Success Metrics

## Performance

| Metric              | Target     |
| ------------------- | ---------- |
| Time to Interactive | < 1 second |
| Search Latency      | < 10 ms    |
| Frame Rate          | 60 FPS     |
| Initial Payload     | < 150 KB   |

---

## Lighthouse

| Category       | Target |
| -------------- | ------ |
| Performance    | ≥95    |
| Accessibility  | ≥95    |
| Best Practices | ≥95    |

---

## User Outcomes

Target outcomes:

* Users locate notation in under 10 seconds
* Search produces useful results for most sessions
* Navigation remains intuitive across devices

Note: Analytics are intentionally excluded and therefore these outcomes are not directly measured.

---

# 11. Edge Cases & Failure Scenarios

| Scenario                   | Expected Behavior                   |
| -------------------------- | ----------------------------------- |
| Empty search               | Show all cards within active filter |
| Search with spaces         | Trim input                          |
| No matches                 | Show empty state                    |
| Corrupt LocalStorage value | Apply fallback theme                |
| LocalStorage unavailable   | Continue without persistence        |
| Rapid typing               | Maintain real-time updates          |
| Rapid filter changes       | Maintain responsiveness             |
| Browser refresh            | Restore theme preference            |
| JavaScript disabled        | Static content remains visible      |

---

# 12. Open Questions & Assumptions

## Assumptions

* ArchiMate 3.2 content remains stable.
* Dataset size remains approximately 71 cards.
* GitHub Pages remains hosting provider.
* Users operate modern evergreen browsers.
* JavaScript is enabled.

## Open Questions

None. Previous ambiguities have been resolved through product decisions.

---

# 13. Future Considerations

## Content Expansion

* ArchiMate 4.x support
* Additional notation sets

## Learning Features

* Interactive learning guides
* Layer comparison views
* Guided study paths

## Build Automation

* JSON-driven content generation
* Static compilation tooling

## Utility Features

* Printable cheat-sheet mode

These enhancements should not require changes to the core client-side architecture.

---

# Risks & Mitigations

| Risk                              | Impact | Mitigation                                  |
| --------------------------------- | ------ | ------------------------------------------- |
| Browser CSS inconsistencies       | Medium | Cross-browser validation                    |
| SVG asset growth                  | Medium | Asset optimization                          |
| GitHub Pages outage               | Low    | Alternative static hosting available        |
| Future ArchiMate taxonomy changes | Low    | Content-only updates                        |
| Dataset growth                    | Low    | DOM filtering scales into hundreds of cards |

---

# Release Readiness Criteria

The product is considered release-ready when:

* All functional requirements are implemented.
* Search latency remains below target.
* Responsive layouts function across defined breakpoints.
* Theme persistence operates correctly.
* Accessibility features are implemented.
* SEO metadata is present.
* All notation cards render correctly.
* Lighthouse targets are achieved.

This version is effectively a final engineering-ready PRD with all previously unresolved product decisions closed and requirements normalized into a single source of truth.
