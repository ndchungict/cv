# Requirements Document

## Introduction

Tính năng này tạo một Jekyll project hoàn chỉnh để xây dựng CV (Curriculum Vitae) dạng website tĩnh, có thể deploy lên GitHub Pages. Website CV sẽ hiển thị thông tin cá nhân, kinh nghiệm làm việc, học vấn, kỹ năng và các dự án nổi bật của người dùng. Jekyll được chọn vì tích hợp sẵn với GitHub Pages, hỗ trợ Markdown và Liquid templating, giúp dễ dàng cập nhật nội dung.

## Glossary

- **Jekyll**: Static site generator viết bằng Ruby, được GitHub Pages hỗ trợ chính thức.
- **GitHub Pages**: Dịch vụ hosting miễn phí của GitHub cho các static website từ repository.
- **CV_Site**: Hệ thống Jekyll website CV được xây dựng trong spec này.
- **Front Matter**: Phần metadata YAML ở đầu mỗi file Markdown/HTML trong Jekyll.
- **Layout**: Template HTML trong Jekyll dùng để bọc nội dung trang.
- **_config.yml**: File cấu hình chính của Jekyll project.
- **Gemfile**: File khai báo Ruby gem dependencies cho Jekyll project.
- **Section**: Một phần nội dung CV (ví dụ: About, Experience, Education, Skills, Projects).
- **Responsive**: Giao diện tự động điều chỉnh hiển thị phù hợp với các kích thước màn hình khác nhau.
- **PDF_Exporter**: Thành phần client-side chịu trách nhiệm tạo và tải xuống file PDF từ nội dung HTML của CV.
- **html2pdf.js**: Thư viện JavaScript client-side dùng để chuyển đổi nội dung HTML thành file PDF có thể tải xuống, không cần server.
- **Export_Filename**: Tên file PDF được tạo tự động, bao gồm tên người dùng và ngày xuất file theo định dạng `{name}_CV_{YYYY-MM-DD}.pdf`.

## Requirements

### Requirement 1: Cấu trúc Jekyll Project

**User Story:** As a developer, I want a properly structured Jekyll project, so that I can build and deploy the CV website to GitHub Pages without additional configuration.

#### Acceptance Criteria

1. THE CV_Site SHALL include a `_config.yml` file with `baseurl`, `url`, `title`, `description`, and `theme` fields configured for GitHub Pages deployment.
2. THE CV_Site SHALL include a `Gemfile` that specifies `github-pages` gem as a dependency to ensure compatibility with GitHub Pages build environment.
3. THE CV_Site SHALL include a `.gitignore` file that excludes `_site/`, `.jekyll-cache/`, and `vendor/` directories from version control.
4. THE CV_Site SHALL include a `Gemfile.lock` exclusion in `.gitignore` to prevent Ruby version conflicts across environments.
5. THE CV_Site SHALL include a `README.md` file with instructions on how to run the site locally and deploy to GitHub Pages.

---

### Requirement 2: Layout và Template

**User Story:** As a developer, I want reusable HTML layouts and includes, so that I can maintain a consistent look and feel across all pages of the CV website.

#### Acceptance Criteria

1. THE CV_Site SHALL include a `_layouts/default.html` layout that defines the base HTML structure with `<head>`, `<header>`, `<main>`, and `<footer>` sections.
2. THE CV_Site SHALL include a `_layouts/home.html` layout that extends `default.html` and renders all CV sections in sequence.
3. THE CV_Site SHALL include a `_includes/head.html` partial that contains meta tags, CSS links, and the page title.
4. THE CV_Site SHALL include a `_includes/header.html` partial that displays the person's name and navigation links to each CV section.
5. THE CV_Site SHALL include a `_includes/footer.html` partial that displays copyright information and social media links.
6. WHEN Jekyll builds the site, THE CV_Site SHALL render all Liquid template tags in layouts and includes into valid HTML output.

---

### Requirement 3: Nội dung CV — Thông tin cá nhân (About)

**User Story:** As a CV owner, I want to display my personal information and professional summary, so that visitors can quickly understand who I am and what I do.

#### Acceptance Criteria

1. THE CV_Site SHALL include an About section that displays the person's full name, job title, profile photo, and professional summary.
2. THE CV_Site SHALL read About section content from a `_data/profile.yml` data file so that content can be updated without modifying HTML templates.
3. WHEN the `_data/profile.yml` file contains an `email` field, THE CV_Site SHALL render a clickable `mailto:` link in the About section.
4. WHEN the `_data/profile.yml` file contains a `linkedin` field, THE CV_Site SHALL render a clickable link to the LinkedIn profile.
5. WHEN the `_data/profile.yml` file contains a `github` field, THE CV_Site SHALL render a clickable link to the GitHub profile.

---

### Requirement 4: Nội dung CV — Kinh nghiệm làm việc (Experience)

**User Story:** As a CV owner, I want to list my work experience in reverse chronological order, so that employers can see my most recent positions first.

#### Acceptance Criteria

1. THE CV_Site SHALL include an Experience section that displays work history entries in reverse chronological order (most recent first).
2. THE CV_Site SHALL read Experience section content from a `_data/experience.yml` data file.
3. WHEN rendering each experience entry, THE CV_Site SHALL display the job title, company name, employment period (start date and end date or "Present"), and a list of responsibilities or achievements.
4. WHEN an experience entry contains a `url` field, THE CV_Site SHALL render the company name as a clickable hyperlink.

---

### Requirement 5: Nội dung CV — Học vấn (Education)

**User Story:** As a CV owner, I want to display my educational background, so that employers can verify my academic qualifications.

#### Acceptance Criteria

1. THE CV_Site SHALL include an Education section that displays academic history entries in reverse chronological order.
2. THE CV_Site SHALL read Education section content from a `_data/education.yml` data file.
3. WHEN rendering each education entry, THE CV_Site SHALL display the degree name, institution name, graduation year, and an optional description or GPA field.

---

### Requirement 6: Nội dung CV — Kỹ năng (Skills)

**User Story:** As a CV owner, I want to showcase my technical and soft skills grouped by category, so that employers can quickly assess my competencies.

#### Acceptance Criteria

1. THE CV_Site SHALL include a Skills section that displays skills grouped by category (e.g., "Programming Languages", "Frameworks", "Tools").
2. THE CV_Site SHALL read Skills section content from a `_data/skills.yml` data file.
3. WHEN rendering each skill category, THE CV_Site SHALL display the category name and a list of skills within that category.

---

### Requirement 7: Nội dung CV — Dự án (Projects)

**User Story:** As a CV owner, I want to highlight my notable projects, so that employers can evaluate my practical experience and portfolio.

#### Acceptance Criteria

1. THE CV_Site SHALL include a Projects section that displays project entries.
2. THE CV_Site SHALL read Projects section content from a `_data/projects.yml` data file.
3. WHEN rendering each project entry, THE CV_Site SHALL display the project name, description, and technologies used.
4. WHEN a project entry contains a `url` field, THE CV_Site SHALL render a clickable link to the project's live demo or repository.
5. WHEN a project entry contains a `github` field, THE CV_Site SHALL render a clickable link to the project's GitHub repository.

---

### Requirement 8: Giao diện Responsive

**User Story:** As a visitor, I want the CV website to display correctly on desktop, tablet, and mobile devices, so that I can view the CV from any device.

#### Acceptance Criteria

1. THE CV_Site SHALL include a CSS stylesheet that implements a responsive layout using CSS media queries.
2. WHILE the viewport width is 768px or greater, THE CV_Site SHALL display the navigation and content in a multi-column layout.
3. WHILE the viewport width is less than 768px, THE CV_Site SHALL display the navigation and content in a single-column stacked layout.
4. THE CV_Site SHALL use relative units (rem, em, %) for font sizes and spacing to ensure consistent scaling across devices.

---

### Requirement 9: GitHub Pages Deployment

**User Story:** As a developer, I want to deploy the CV website to GitHub Pages, so that the CV is publicly accessible via a URL without any server setup.

#### Acceptance Criteria

1. THE CV_Site SHALL be deployable to GitHub Pages by pushing the repository to a GitHub repository's `main` branch without requiring additional build scripts.
2. THE CV_Site SHALL include a `_config.yml` with a `baseurl` field set to the repository name (e.g., `/jekyll-cv-website`) to ensure all asset paths resolve correctly on GitHub Pages.
3. WHEN Jekyll builds the site with `JEKYLL_ENV=production`, THE CV_Site SHALL generate all output files into the `_site/` directory.
4. THE CV_Site SHALL include a `.nojekyll` file option documentation in `README.md` explaining when to use it for bypassing GitHub Pages' default Jekyll processing.

---

### Requirement 10: Build và Local Development

**User Story:** As a developer, I want to run the CV website locally before deploying, so that I can preview and verify changes before they go live.

#### Acceptance Criteria

1. WHEN the command `bundle exec jekyll serve` is run in the project root, THE CV_Site SHALL start a local development server accessible at `http://localhost:4000`.
2. WHEN the command `bundle exec jekyll build` is run in the project root, THE CV_Site SHALL generate the static site into the `_site/` directory without errors.
3. IF a required data file (e.g., `_data/profile.yml`) is missing, THEN THE CV_Site SHALL display a meaningful error message during the build process rather than silently producing incorrect output.
4. THE CV_Site SHALL be buildable using Ruby version 3.0 or higher with the `github-pages` gem installed via Bundler.

---

### Requirement 11: Hỗ trợ Đa Ngôn Ngữ (Multilingual)

**User Story:** As a CV owner, I want to switch the CV website between English, Vietnamese, and Chinese, so that I can present my CV to audiences in different languages without maintaining separate websites.

#### Acceptance Criteria

1. THE CV_Site SHALL support three display languages: English (`en`), Vietnamese (`vi`), and Traditional/Simplified Chinese (`zh`).
2. THE CV_Site SHALL default to Vietnamese (`vi`) as the active language when no language preference has been set by the visitor.
3. THE CV_Site SHALL read all UI labels and section headings for each language from a `_data/i18n.yml` data file, keyed by language code (e.g., `vi.nav.experience`, `en.nav.experience`, `zh.nav.experience`).
4. THE CV_Site SHALL include a language switcher component in the header that displays buttons or links for each of the three supported languages.
5. WHEN a visitor clicks a language button in the language switcher, THE CV_Site SHALL update all UI labels, section headings, and navigation items to the selected language without reloading the page from the server.
6. WHEN a visitor selects a language, THE CV_Site SHALL persist the selected language preference in `localStorage` so that the preference is restored on subsequent visits.
7. WHEN the page loads and a language preference exists in `localStorage`, THE CV_Site SHALL apply the stored language preference instead of the default Vietnamese.
8. THE CV_Site SHALL apply language switching exclusively to UI labels and section headings defined in `_data/i18n.yml`; CV content fields (e.g., job descriptions, project descriptions) stored in `_data/*.yml` files SHALL remain in their authored language and are not subject to automatic translation.

---

### Requirement 12: In CV (Print CV)

**User Story:** As a CV owner, I want to print the CV or save it as a PDF directly from the browser, so that I can share a formatted hard copy with employers who require a physical or PDF document.

#### Acceptance Criteria

1. THE CV_Site SHALL include a "Print CV" button that is visible on the page and, WHEN clicked, triggers the browser's native print dialog.
2. THE CV_Site SHALL include a dedicated print stylesheet (via `@media print`) that hides non-essential UI elements — including the navigation bar, language switcher, and "Print CV" button — when the page is printed.
3. WHILE the print stylesheet is active, THE CV_Site SHALL render all CV sections (About, Experience, Education, Skills, Projects) in a single continuous column layout suitable for A4 paper.
4. WHILE the print stylesheet is active, THE CV_Site SHALL use black text on a white background for all CV content to ensure legibility on monochrome printers.
5. WHILE the print stylesheet is active, THE CV_Site SHALL expand all hyperlinks so that the URL is printed in parentheses after the link text (e.g., using CSS `a[href]::after { content: " (" attr(href) ")"; }`).
6. WHILE the print stylesheet is active, THE CV_Site SHALL avoid page breaks inside individual CV entries (experience, education, project items) by applying `page-break-inside: avoid` to each entry container.
7. THE CV_Site SHALL set the print page size to A4 via the `@page` CSS rule to ensure consistent output across browsers and operating systems.

---

### Requirement 13: Xuất CV dạng PDF (Export PDF)

**User Story:** As a CV owner, I want to export and download the CV directly as a PDF file from the browser, so that I can share a self-contained PDF document with employers without relying on the browser's print dialog.

#### Acceptance Criteria

1. THE CV_Site SHALL include an "Export PDF" button that is visually distinct from the "Print CV" button and visible on the page at all times.
2. WHEN the visitor clicks the "Export PDF" button, THE PDF_Exporter SHALL generate a PDF file from the current CV HTML content entirely on the client side, without sending any data to a server.
3. THE CV_Site SHALL load the `html2pdf.js` library as a client-side dependency to perform HTML-to-PDF conversion.
4. WHEN the PDF_Exporter generates the PDF, THE PDF_Exporter SHALL set the page size to A4 (210mm × 297mm) with margins of 10mm on all sides.
5. WHEN the PDF_Exporter generates the PDF, THE PDF_Exporter SHALL name the output file using the Export_Filename format `{name}_CV_{YYYY-MM-DD}.pdf`, where `{name}` is the value of the `name` field from `_data/profile.yml` and `{YYYY-MM-DD}` is the current date at the time of export.
6. WHEN the PDF generation is complete, THE PDF_Exporter SHALL automatically trigger a file download in the visitor's browser without navigating away from the page.
7. WHILE the PDF_Exporter is generating the PDF, THE CV_Site SHALL display a visual loading indicator on the "Export PDF" button (e.g., changing button text to "Generating…" and disabling the button) to prevent duplicate export requests.
8. WHEN the PDF generation is complete or fails, THE CV_Site SHALL restore the "Export PDF" button to its original enabled state.
9. THE PDF_Exporter SHALL exclude the following UI elements from the generated PDF: the navigation bar, the language switcher, the "Print CV" button, and the "Export PDF" button itself.
10. IF the `html2pdf.js` library fails to load, THEN THE CV_Site SHALL display an error message informing the visitor that PDF export is unavailable and suggesting the use of the "Print CV" option as an alternative.
11. THE PDF_Exporter SHALL render all CV sections (About, Experience, Education, Skills, Projects) in a single continuous column layout within the generated PDF, consistent with the print stylesheet layout.
12. THE PDF_Exporter SHALL apply `pagebreak: avoid` configuration to individual CV entries (experience, education, project items) to prevent content from being split across PDF pages.
