**Development Task Breakdown**  
**ArchiMate 3.2 Mobile-First Cheat Sheet**

---

### Overall Objective
Build a sleek, modern, mobile-first, static vanilla web app for fast lookup of ArchiMate 3.2 notations. Prioritize **readability**, **ease of use**, and **performance**.

**Key Updates from Clarifications**:
- Rule-of-Thumb Matrix content finalized.
- Use a **one-time script** to generate HTML cards from `data.json`.
- Filters: `Application, Business, Composite, Implementation & Migration, Motivation, Physical, Relationship, Strategy, Technology`.
- Design direction: Sleek & modern with excellent readability.

---

### Task 1: Project Setup & Core Structure
**Description**: Set up repository, core files, and foundational HTML/CSS/JS with modern, clean structure.

**Acceptance Criteria**
- Files: `index.html`, `styles.css`, `app.js`, `generate-cards.js` (script), `data.json`.
- Proper semantic HTML, viewport meta, SEO metadata (OG, Twitter, JSON-LD).
- CSS Custom Properties defined for light/dark themes.
- Basic header (logo, search, theme toggle, filters) and footer skeleton.
- Lighthouse: Performance ≥95, Accessibility ≥95.

**Dependencies**: None  
**Priority**: High

---

### Task 2: One-Time Card Generation Script
**Description**: Create a Node.js script (`generate-cards.js`) that reads `data.json` and outputs clean, static HTML cards for `index.html`.

**Acceptance Criteria**
- Script reads `/attachments/data.json`.
- Generates one `<article class="card">` per entry.
- Each card includes:
  - Inline SVG (with `role="img"` and accessible title).
  - `data-name`, `data-description`, `data-layer` attributes.
  - Slugified `id` based on name (e.g., `business-actor`).
- Output is clean, well-formatted HTML ready to paste into `index.html`.
- Handles all 71 elements correctly.

**Dependencies**: Task 1  
**Priority**: High

**Technical Notes**: Run once during development. Output should be manually integrated (or use a simple build step if preferred).

---

### Task 3: Responsive Card Grid & Modern Styling
**Description**: Implement sleek, modern card design and responsive grid with strong emphasis on readability.

**Acceptance Criteria**
- Mobile-first CSS Grid:
  - 1 column (<480px)
  - 2 columns (480–767px)
  - 3 columns (768–1023px)
  - 4 columns (≥1024px)
- Cards are visually appealing: clean typography, balanced spacing, prominent SVG, subtle shadows/hover effects.
- Excellent readability (font sizes, contrast, line-height).
- Modern aesthetic (rounded corners, clean hierarchy, generous whitespace).

**Dependencies**: Task 2  
**Priority**: High

---

### Task 4: Real-Time Search
**Description**: Build fast, responsive search functionality.

**Acceptance Criteria**
- Substring search (case-insensitive) on name + description.
- Updates instantly on keystroke.
- Clear (`×`) button appears when input has text.
- "Showing X of Y results" counter.
- Empty state: "No results found" with prominent "Clear Search" button.

**Dependencies**: Task 2 & 3  
**Priority**: High

---

### Task 5: Layer Filtering
**Description**: Implement filter chips using the specified layer list.

**Acceptance Criteria**
- Filter chips exactly as: All, 


- Filters combine with search.
- Active chip has clear visual distinction.
- Result counter updates correctly.
- "All" resets filter.

**Dependencies**: Task 4  
**Priority**: High

---

### Task 6: Theme Toggle & Persistence
**Description**: Sleek light/dark theme switch with persistence.

**Acceptance Criteria**
- Toggle button in header (icon-based, modern look).
- Priority: Saved preference → `prefers-color-scheme` → Light.
- Smooth transition between themes.
- Persisted in LocalStorage.

**Dependencies**: Task 1 & 3  
**Priority**: High

---

### Task 7: Rule-of-Thumb Matrix
**Description**: Build the static reference matrix using the provided content.

**Acceptance Criteria**
- Clean, modern table or card-based layout (highly readable on mobile).
- Columns: **Layer**, **Primary Question**, **Typical Elements**.
- Exact content as provided (7 rows).
- Header link scrolls smoothly to the section (`#rule-of-thumb-matrix`).
- Fully responsive and accessible.

**Dependencies**: Task 3  
**Priority**: Medium

---

### Task 8: Accessibility & Polish
**Description**: Achieve WCAG 2.1 AA compliance and final UX polish.

**Acceptance Criteria**
- Full keyboard navigation.
- ARIA live region for search/filter results.
- Proper contrast, focus styles, labels.
- Screen reader friendly SVGs and cards.
- Smooth scrolling for anchors.
- All edge cases handled (whitespace, rapid input, JS disabled fallback).

**Dependencies**: Tasks 1–7  
**Priority**: High

---

### Task 9: Deep Linking
**Description**: Enable direct links to cards and matrix.

**Acceptance Criteria**
- Each card has stable `id` (e.g., `#business-role`).
- Matrix accessible via `#rule-of-thumb-matrix`.
- Anchor links work on page load and after filtering.

**Dependencies**: Task 2  
**Priority**: Medium

---

### Task 10: Final Optimization & Testing
**Description**: Performance tuning, cross-browser testing, and final validation.

**Acceptance Criteria**
- Initial payload <150KB.
- TTI <1s on mid-tier mobile (4G).
- No console errors.
- All PRD edge cases covered.
- Lighthouse scores ≥95 across categories.

**Dependencies**: Previous tasks  
**Priority**: High

---

### Task 11: Documentation & Deployment
**Description**: Prepare project for public release on GitHub Pages.

**Acceptance Criteria**
- Detailed `README.md` with screenshots, usage instructions, and how to run the generation script.
- `.nojekyll` file if needed.
- Clear deployment instructions for GitHub Pages.
- License file.

**Dependencies**: Task 10  
**Priority**: Medium

---

### Sequencing & Parallel Work
**Sequential Core**:
1 → 2 → 3 → 4 → 5 → 6 → 10

**Can Parallelize**:
- Task 7 (Matrix) after Task 3
- Task 8 (Accessibility) can run in parallel with UI tasks
- Task 9 (Deep Linking)
- Task 11 (Docs)

**Total Estimated Effort**: 2–3 weeks for a single developer.

