# AI Usage Report — Assignment 3

## Tools Used & Use Cases

- **Claude (Anthropic, Claude Code CLI — model: Sonnet 5)** — the only AI
  tool used for this assignment, in an interactive back-and-forth
  conversation (not a single one-shot generation). How it was used, in order:
  1. Explained Assignment 3's requirements (API Integration, Complex Logic,
     State Management, Performance, AI documentation) so I could decide
     what to build for each category.
  2. Reviewed code **I wrote myself** for every one of the four technical
     features — the GitHub API fetch, the combined project filter+sort,
     the visitor-name state management, and the lazy-loaded images —
     confirming correctness and making small, explained fixes where
     something would actually break or look inconsistent (see Usage Log).
  3. Found and fixed one required bug I introduced myself (a literal
     `'USERNAME'` placeholder left in a fetch URL) and one copy-paste
     mistake in pasted code (a duplicated image reference) before it was
     ever written into the project files.
  4. Ran automated browser tests (Playwright) after every feature, plus one
     final comprehensive pass, and found/fixed a real visual bug (a
     dark-mode styling gap on a new dropdown) that Claude's own earlier
     structural work had introduced.
  5. Helped assemble this report and package the AI evidence.

## Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|----|--------------|------|---------|-----------------|--------------------------------------------|
| A01 | Claude (Sonnet 5) | 2026-11-21 | Review my HTML/JS for the **GitHub Repositories** feature (API Integration requirement) | `index.html`, `js/script.js`, `css/styles.css`, `docs/technical-documentation.md` | I wrote the entire `loadGitHubProjects()` async/fetch/try-catch function and the inner HTML markup myself. Claude reviewed it, fixed one required bug (`'USERNAME'` placeholder → my real GitHub username `'Hmxq'`, without which the API call 404s every time), wrapped my markup in a proper `<section>`/`.container` with a nav link (placed as its own section, not inside the existing filterable Projects list, because that list's filter logic captures cards via `querySelectorAll` at page load and would not recognize cards added later by this async fetch), and added new CSS (`.project-info a`) to style the generated "View on GitHub" links. Verified with a live Playwright test that actually called the real GitHub API and received real repository cards back. |
| A02 | Claude (Sonnet 5) | 2026-11-21 | Review my combined **filter + sort** logic for the Projects section (Complex Logic requirement) | `index.html`, `js/script.js`, `css/styles.css`, `docs/technical-documentation.md` | I wrote the entire `updateProjects()` function myself (filtering by status, sorting by name with `localeCompare`, and reordering the actual DOM nodes with `appendChild`), plus the new `<select>` dropdown. Claude made zero edits to this logic, but made three small fixes: replaced a `.projects-list`-class selector that had become ambiguous because of Claude's own earlier GitHub-section addition with a unique `id="projectsList"`; added one `updateProjects()` call on load so the initial card order matches the sort dropdown's default value; and added CSS for the previously unstyled `<select>`. This also replaced (not duplicated) Assignment 2's old simpler filter code, since both declared `const projects`. Verified with a Playwright test covering every filter/sort combination. |
| A03 | Claude (Sonnet 5) | 2026-11-21 | Review my **visitor name** save/restore/clear logic (State Management requirement) | `index.html`, `js/script.js`, `css/styles.css` | I wrote the entire visitor-name `localStorage` read/write/remove logic and the HTML markup myself; Claude made zero logic edits. Claude placed the widget inside the Home/Hero section (a placement decision, not a delegated one this time) and wrote all of the CSS for it (`.visitor-box` and its children, plus a dark-mode override), since none existed before. Claude also caught and reverted its own unnecessary rename of my `visitorName` variable (there was no real naming conflict) before finalizing. Verified with a Playwright test: save a name, reload the page for real, confirm it's restored, then clear it. |
| A04 | Claude (Sonnet 5) | 2026-11-21 | Add `loading="lazy"` to the three project-card images (Performance requirement) | `index.html`, `docs/technical-documentation.md` | My pasted snippet had a copy-paste mistake — it repeated `project-hospital.svg` for both the second and third image instead of using `project-placeholder.svg` for the third ("More Coming Soon") card. Claude applied `loading="lazy"` using each image's correct, original `src`/`alt`, so the mistake was never actually written into the file. Verified by checking the `loading` attribute on all three images in a Playwright test. |
| A05 | Claude (Sonnet 5) | 2026-11-21 | Full browser testing of all Assignment 3 features, plus regression testing of everything from Assignments 1-2, before considering the assignment done | `css/styles.css` | Claude wrote and ran a comprehensive Playwright test suite. It found a real bug introduced by Claude's own earlier work: the new sort `<select>` had no dark-mode styling and stayed light-themed inside dark mode. Fixed by adding `.project-filters select` to the existing dark-mode selector list. Verified the fix with `getComputedStyle` (confirmed the correct dark colors) and a cropped screenshot of the filter/sort control row. No other errors were found. |

## AI Usage Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Name:** Hammad Albalawi
**ID:** 202340110
**Date:** 2026-11-21

## What I Wrote Myself vs. What the AI Wrote

- **Written entirely by me, reviewed by Claude**: all four technical
  features' core logic — the GitHub API fetch and card-building code, the
  combined filter+sort function, the visitor-name state management, and
  the choice to add `loading="lazy"`. In every case, Claude's edits were
  small, explained, and either (a) a required fix to a real bug, or (b)
  new CSS/structural code needed to place and style a feature that arrived
  as logic-only.
- **Written by Claude, unprompted-by-feature but necessary**: the
  `#github-projects` section wrapper and nav link, all new CSS for the
  GitHub links/visitor box/sort dropdown (including its dark-mode
  override), and the `id="projectsList"` selector fix. None of this
  changes any feature's behavior — it only makes features placed correctly
  on the page, styled consistently, and (for the id fix) robust against a
  naming collision Claude itself had created.
- **Found and fixed during review/testing, not written by either of us as
  "new" code**: the `'USERNAME'` placeholder bug (A01), the duplicated
  image reference in my own pasted snippet (A04), and the dark-mode select
  styling gap (A05).

## Benefits & Challenges

**Benefits**
- Writing the actual feature logic myself first, then having Claude review
  it, meant every bug Claude caught was either a genuine mistake on my
  part (the `USERNAME` placeholder, the duplicated image) or a genuine
  side-effect of Claude's own earlier work (the `.projects-list` id
  collision, the dark-mode select gap) — not something I'd have to guess
  whether I actually understood.
- The live Playwright test against the real GitHub API was a good forcing
  function: it's easy to write `fetch()` code that looks right but never
  actually gets exercised against a real network response until someone
  tests it for real.

**Challenges**
- Working across three assignments in the same growing codebase means new
  features can quietly collide with earlier ones in ways that are easy to
  miss (the `.projects-list` class reused for two different containers is
  a direct example) — review has to consider the whole file, not just the
  new snippet in isolation.
- Deciding where a new feature belongs on the page (a new section vs.
  inside an existing one) isn't always obvious from the code alone; it
  needed a real understanding of how the existing filter logic worked
  before placement could be decided safely.

## Learning Outcomes

- Learned how `async`/`await`/`fetch()` work together, what `response.ok`
  checks for, and why `try/catch` is needed around an API call that can
  fail for reasons outside my control (network, rate limits).
- Learned that a `NodeList` from `querySelectorAll` doesn't have `.sort()`,
  so `Array.from()` is needed to get a real array — and that calling
  `appendChild()` on an element already in the DOM *moves* it rather than
  duplicating it, which is what makes the DOM-reordering-by-sorted-array
  technique work.
- Learned that reusing a CSS class name on a second, unrelated container
  (as happened with `.projects-list`) can silently break a `querySelector`
  call elsewhere in the same file that assumed the class was unique.
- Learned that `loading="lazy"` is a zero-JavaScript, one-attribute way to
  defer offscreen image loading, directly from this assignment's
  Performance requirement.

## Responsible Use & Understanding

I can explain every feature in this project:
- The GitHub fetch, the filter+sort logic, and the visitor-name state
  management are mine — I wrote them, and Claude explained exactly what
  it changed and why for every edit, before applying it.
- The CSS and structural placement decisions were Claude's, explained
  clearly enough that I can describe why the GitHub section is separate
  from the filterable Projects list, and why the `id="projectsList"` fix
  was needed.
- I tested every feature myself in the rendered site in addition to
  reviewing Claude's automated test results before accepting the work as
  done.

This is disclosed per the assignment's academic integrity policy: AI use in
this assignment is fully declared above, nothing here is submitted as
unmodified AI output represented as entirely my own unassisted work, and I
take responsibility for understanding and being able to explain the
resulting solution.
