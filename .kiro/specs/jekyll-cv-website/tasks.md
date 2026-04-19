# Implementation Plan: Jekyll CV Website

## Overview

Build a complete Jekyll static site for a personal CV, deployable to GitHub Pages. Implementation proceeds in layers: project scaffolding → layouts & includes → data files & content sections → styling → JavaScript (i18n + PDF export) → print/export features → testing.

## Tasks

- [ ] 1. Scaffold Jekyll project structure and configuration
  - Create `_config.yml` with `title`, `description`, `baseurl`, `url`, `theme`, `markdown`, and `plugins` fields
  - Create `Gemfile` declaring `github-pages` gem as dependency
  - Create `.gitignore` excluding `_site/`, `.jekyll-cache/`, `vendor/`, and `Gemfile.lock`
  - Create `README.md` with local development instructions (`bundle exec jekyll serve`) and GitHub Pages deployment steps, including `.nojekyll` usage note
  - Create `index.html` entry point with `layout: home` front matter
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 9.1, 9.2, 9.4, 10.1, 10.2, 10.4_

- [ ] 2. Create base layouts
  - [ ] 2.1 Implement `_layouts/default.html`
    - Define full HTML skeleton: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`
    - Include `head.html`, `header.html`, `{{ content }}`, `footer.html` via Liquid tags
    - Add `<link>` to `assets/css/main.css` and `<script>` to `assets/js/main.js`
    - _Requirements: 2.1, 2.6_

  - [ ] 2.2 Implement `_layouts/home.html`
    - Set `layout: default` in front matter
    - Render section includes in order: about → experience → education → skills → projects
    - Add "Print CV" button (class `btn-print`) and "Export PDF" button (class `btn-export`)
    - _Requirements: 2.2, 12.1, 13.1_

- [ ] 3. Create HTML includes (partials)
  - [ ] 3.1 Implement `_includes/head.html`
    - Add `<meta charset>`, `<meta viewport>`, `<title>`, and CSS `<link>` tags
    - _Requirements: 2.3_

  - [ ] 3.2 Implement `_includes/header.html`
    - Display person's name from `site.data.profile.name`
    - Add navigation links to each CV section anchor (`#about`, `#experience`, `#education`, `#skills`, `#projects`) with `data-i18n` attributes
    - Add language switcher with three buttons: VI / EN / ZH
    - _Requirements: 2.4, 11.4_

  - [ ] 3.3 Implement `_includes/footer.html`
    - Display copyright text and social media links (email, LinkedIn, GitHub) from `site.data.profile`
    - _Requirements: 2.5_

- [ ] 4. Create data files with sample content
  - Create `_data/profile.yml` with `name`, `title`, `photo`, `summary`, and optional `email`, `linkedin`, `github` fields
  - Create `_data/experience.yml` with at least two sample entries (including one with `url` field)
  - Create `_data/education.yml` with at least two sample entries
  - Create `_data/skills.yml` with at least two skill categories
  - Create `_data/projects.yml` with at least two sample entries (including entries with `url` and `github` fields)
  - Create `_data/i18n.yml` with `vi`, `en`, and `zh` keys covering `nav` (about, experience, education, skills, projects) and `buttons` (print, export_pdf, exporting)
  - _Requirements: 3.2, 4.2, 5.2, 6.2, 7.2, 11.3_

- [ ] 5. Implement CV section includes
  - [ ] 5.1 Implement `_includes/about.html`
    - Render `site.data.profile`: name, title, photo (`<img>`), summary
    - Conditionally render `mailto:` link if `email` field present
    - Conditionally render LinkedIn link if `linkedin` field present
    - Conditionally render GitHub link if `github` field present
    - Use Liquid `{% if site.data.profile %}` guard
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ]* 5.2 Write property test for About section rendering (Property 1)
    - **Property 1: Profile data rendering completeness**
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 5.3 Write property test for optional profile links (Property 2)
    - **Property 2: Optional profile links render conditionally**
    - **Validates: Requirements 3.3, 3.4, 3.5**

  - [ ] 5.4 Implement `_includes/experience.html`
    - Loop over `site.data.experience` and render each entry
    - Display job title, company name, employment period (`start` – `end`), and responsibilities list
    - Conditionally render company name as hyperlink if `url` field present
    - Entries must appear in reverse chronological order (sort by `start` descending in Liquid or ensure data file is ordered)
    - Add `cv-entry` class to each entry container
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 5.5 Write property test for chronological ordering (Property 3)
    - **Property 3: Chronological sections render in reverse order**
    - **Validates: Requirements 4.1, 5.1**

  - [ ]* 5.6 Write property test for CV entry rendering completeness (Property 4)
    - **Property 4: CV entry rendering completeness**
    - **Validates: Requirements 4.2, 4.3, 5.2, 5.3, 6.2, 6.3, 7.1, 7.2, 7.3**

  - [ ]* 5.7 Write property test for optional URL fields as hyperlinks (Property 5)
    - **Property 5: Optional URL fields render as hyperlinks**
    - **Validates: Requirements 4.4, 7.4, 7.5**

  - [ ] 5.8 Implement `_includes/education.html`
    - Loop over `site.data.education` and render each entry
    - Display degree, institution, graduation year, and optional description/GPA
    - Entries in reverse chronological order
    - Add `cv-entry` class to each entry container
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ] 5.9 Implement `_includes/skills.html`
    - Loop over `site.data.skills` and render each category with its skill items list
    - _Requirements: 6.1, 6.2, 6.3_

  - [ ] 5.10 Implement `_includes/projects.html`
    - Loop over `site.data.projects` and render each entry
    - Display project name, description, and technologies list
    - Conditionally render live demo link if `url` field present
    - Conditionally render GitHub repo link if `github` field present
    - Add `cv-entry` class to each entry container
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 6. Checkpoint — Verify Jekyll build
  - Ensure all templates render without Liquid errors and `bundle exec jekyll build` produces `_site/index.html` with correct content from data files. Ask the user if questions arise.

- [ ] 7. Implement CSS stylesheet (`assets/css/main.css`)
  - [ ] 7.1 Write base styles and CSS variables
    - Define CSS custom properties for colors, fonts, and spacing
    - Add reset/base typography styles
    - _Requirements: 8.4_

  - [ ] 7.2 Write layout and section styles
    - Style `<header>`, `<main>`, `<footer>`, and each CV section
    - Style language switcher buttons and Print/Export PDF buttons
    - _Requirements: 2.1, 2.4_

  - [ ] 7.3 Write responsive media query (desktop ≥768px)
    - Multi-column layout for navigation and content
    - _Requirements: 8.1, 8.2_

  - [ ] 7.4 Write responsive media query (mobile <768px)
    - Single-column stacked layout for navigation and content
    - _Requirements: 8.1, 8.3_

  - [ ] 7.5 Write print stylesheet (`@media print`)
    - Hide `nav`, `.language-switcher`, `.btn-print`, `.btn-export`
    - Single-column layout, black text on white background
    - `a[href]::after { content: " (" attr(href) ")"; }` to expand URLs
    - `page-break-inside: avoid` on `.cv-entry`
    - `@page { size: A4; margin: 15mm; }`
    - _Requirements: 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

- [ ] 8. Implement JavaScript module (`assets/js/main.js`)
  - [ ] 8.1 Inject i18n data and implement language switcher
    - Embed `_data/i18n.yml` content into JS via Liquid (`{{ site.data.i18n | jsonify }}`)
    - Implement `getStoredLanguage()` with `try/catch` for private-browsing `localStorage` fallback
    - Implement `applyLanguage(lang)` to update all `[data-i18n]` elements from i18n data
    - Implement `initLanguage()` to read stored preference or default to `'vi'` on page load
    - Wire language switcher buttons to call `applyLanguage(lang)` and persist to `localStorage`
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8_

  - [ ]* 8.2 Write property test for language switch updating all UI labels (Property 6)
    - **Property 6: Language switch updates all UI labels**
    - **Validates: Requirements 11.3, 11.5**

  - [ ]* 8.3 Write property test for localStorage round-trip (Property 7)
    - **Property 7: Language preference localStorage round-trip**
    - **Validates: Requirements 11.6, 11.7**

  - [ ]* 8.4 Write property test for language switch not affecting CV content (Property 8)
    - **Property 8: Language switch does not affect CV content**
    - **Validates: Requirements 11.8**

  - [ ]* 8.5 Write unit tests for language switcher
    - Test default language is `vi` when no localStorage value
    - Test localStorage fallback when storage is unavailable
    - Test unknown language code handling (no crash)
    - _Requirements: 11.2, 11.7_

  - [ ] 8.6 Implement PDF export (`exportPDF` and `getExportFilename`)
    - Implement `getExportFilename(name, date)` returning `{sanitized_name}_CV_{YYYY-MM-DD}.pdf`
    - Implement `exportPDF()`: check `html2pdf` availability, disable button with i18n `buttons.exporting` text, clone CV content, strip nav/language-switcher/btn-print/btn-export from clone, call `html2pdf().set(options).from(clone).save(filename)`, restore button in `finally`
    - Show error message if `html2pdf` is undefined, suggesting "Print CV" as fallback
    - html2pdf options: `margin: 10`, `jsPDF: { unit: 'mm', format: 'a4' }`, `html2canvas: { scale: 2 }`, `pagebreak: { avoid: '.cv-entry' }`
    - Add `html2pdf.js` CDN `<script>` tag in `_includes/head.html`
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9, 13.10, 13.11, 13.12_

  - [ ]* 8.7 Write property test for export filename format (Property 9)
    - **Property 9: Export filename format**
    - **Validates: Requirements 13.5**

  - [ ]* 8.8 Write property test for export button state restoration (Property 10)
    - **Property 10: Export button state restoration invariant**
    - **Validates: Requirements 13.8**

  - [ ]* 8.9 Write property test for PDF export excluding UI elements (Property 11)
    - **Property 11: PDF export excludes UI elements**
    - **Validates: Requirements 13.9**

  - [ ]* 8.10 Write unit tests for PDF export
    - Test error message shown when `html2pdf` is not available
    - Test correct options are passed to `html2pdf`
    - _Requirements: 13.3, 13.10_

- [ ] 9. Set up JavaScript testing framework
  - Install `fast-check` and a test runner (e.g., Jest or Vitest) as dev dependencies
  - Configure test runner to handle the JS module (mock DOM environment with jsdom)
  - Create `tests/` directory with a helper to set up a minimal DOM fixture for section rendering tests
  - _Requirements: (testing infrastructure)_

- [ ] 10. Checkpoint — Full build and test pass
  - Ensure `bundle exec jekyll build` completes without errors, all JS unit and property tests pass, and the generated `_site/index.html` contains all CV sections with correct content. Ask the user if questions arise.

- [ ] 11. Write smoke and integration tests
  - [ ]* 11.1 Write smoke tests for file existence and configuration
    - Assert `_config.yml` exists and contains `baseurl`, `url`, `title`, `description`, `theme`
    - Assert `Gemfile` contains `github-pages`
    - Assert `.gitignore` contains `_site/`, `.jekyll-cache/`, `vendor/`, `Gemfile.lock`
    - Assert `_layouts/default.html`, `_layouts/home.html` exist
    - Assert `_includes/head.html`, `header.html`, `footer.html` exist
    - Assert `_data/i18n.yml` contains keys `vi`, `en`, `zh`
    - Assert `assets/css/main.css` contains `@media print` and `@media (max-width: 767px)` rules
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 2.4, 2.5, 11.3_

  - [ ]* 11.2 Write integration tests for Jekyll build
    - Test `bundle exec jekyll build` succeeds with sample data and produces `_site/index.html`
    - Test `bundle exec jekyll build` fails with a meaningful error when `_data/profile.yml` is missing
    - Test output HTML contains content from data files
    - _Requirements: 10.1, 10.2, 10.3_

- [ ] 12. Final checkpoint — Ensure all tests pass
  - Ensure all smoke tests, unit tests, property tests, and integration tests pass. Verify the site renders correctly for all three languages and PDF export works end-to-end. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests use `fast-check` with minimum 100 iterations per property
- Unit tests cover edge cases and error conditions for JS functions
- Smoke tests validate file structure and configuration without running Jekyll
- Integration tests require Ruby and Bundler to be installed in the environment
