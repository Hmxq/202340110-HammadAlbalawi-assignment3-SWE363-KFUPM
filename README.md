# Hammad Albalawi — Personal Portfolio (Assignment 3)

A personal portfolio website, continuing from Assignments 1 and 2, with
advanced functionality added for Assignment 3: live GitHub API integration,
combined project filtering + sorting, visitor-name state management, and
image performance optimizations.

## Features

### Carried over from Assignments 1 and 2
- **About Me** section with a short intro and tagline.
- **Projects** section featuring the Bank Management System (C++) and a
  Hospital Management System (Java).
- **Skills** section listing core technologies.
- **Time-based greeting** ("Good morning/afternoon/evening") generated with JavaScript.
- **Responsive design** using CSS Flexbox — tested on desktop, tablet, and mobile widths.
- **Mobile navigation menu** with a toggle button.
- **Persisted dark/light theme** — saved to `localStorage` and re-applied
  on load.
- **Hover transitions & fade-in animation** on buttons, links, and cards.
- **Per-field contact form validation** with color-coded feedback.

### New in Assignment 3
- **Live GitHub repositories** — fetches real repository data from the
  public GitHub API and renders a card per repo, with loading / empty /
  error states (API Integration).
- **Combined project filter + sort** — the existing Completed/In
  Progress/All filter now also sorts visible projects alphabetically
  (A-Z / Z-A), with both applied together on every interaction (Complex
  Logic).
- **Visitor name** — saves a visitor's name to `localStorage` so a
  "Welcome back" message and pre-filled input persist across visits, with
  a way to clear it (State Management).
- **Lazy-loaded images** — the three project-card images use
  `loading="lazy"` so the browser defers fetching them until needed
  (Performance).

## Project Structure

```
.
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

## Setup Instructions (Run Locally)

No build tools or dependencies are required — this is a static HTML/CSS/JS site.

1. Clone the repository:
   ```bash
   git clone https://github.com/Hmxq/202340110-HammadAlbalawi-assignment3-SWE363-KFUPM.git
   cd 202340110-HammadAlbalawi-assignment3-SWE363-KFUPM
   ```
2. Open `index.html` directly in your browser, **or** serve it locally for a
   more accurate preview (needed for the GitHub API fetch to work
   reliably, since some browsers restrict `fetch()` on `file://` pages):
   ```bash
   # Python 3
   python3 -m http.server 8000
   # then open http://localhost:8000
   ```
3. That's it — no installation, no dependencies.

## AI Usage

This project was built with help from an AI assistant (Claude, Sonnet 5).
I wrote the core logic for all four Assignment 3 features (GitHub fetch,
filter+sort, visitor name, lazy-loading) myself; Claude reviewed each one,
fixed a couple of real bugs (a leftover `'USERNAME'` placeholder, a
copy-paste image duplicate), and wrote the CSS/structural code needed to
place and style each feature. Claude also found and fixed a dark-mode
styling bug during browser testing. Full details, including a row-by-row
usage log, are in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).
Technical implementation notes are in
[`docs/technical-documentation.md`](docs/technical-documentation.md).

## Tech Stack

- HTML5 (semantic markup, `data-*` attributes, `loading="lazy"`)
- CSS3 (Flexbox, media queries, transitions, `@keyframes` animations)
- Vanilla JavaScript (no frameworks), including `async`/`await`, the
  Fetch API, and the Web Storage API (`localStorage`)
- [GitHub REST API](https://docs.github.com/en/rest) (public, unauthenticated)

## License

This project is for educational purposes as part of a course assignment.
