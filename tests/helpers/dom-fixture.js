// tests/helpers/dom-fixture.js
// Sets up a minimal DOM fixture for testing
export function setupMinimalDOM() {
  document.body.innerHTML = `
    <header>
      <h1>Nguyen Van A</h1>
      <nav>
        <a href="#about" data-i18n="nav.about">Giới thiệu</a>
        <a href="#experience" data-i18n="nav.experience">Kinh nghiệm</a>
        <a href="#education" data-i18n="nav.education">Học vấn</a>
        <a href="#skills" data-i18n="nav.skills">Kỹ năng</a>
        <a href="#projects" data-i18n="nav.projects">Dự án</a>
      </nav>
      <div class="language-switcher">
        <button data-lang="vi" onclick="applyLanguage('vi')">VI</button>
        <button data-lang="en" onclick="applyLanguage('en')">EN</button>
        <button data-lang="zh" onclick="applyLanguage('zh')">ZH</button>
      </div>
    </header>
    <main>
      <section id="about" class="cv-section">
        <h2 data-i18n="nav.about">Giới thiệu</h2>
        <p id="profile-title" class="profile-title">Automation Test Engineer</p>
        <p id="profile-summary" class="profile-summary">Tóm tắt.</p>
        <span id="profile-address" class="profile-address">Hà Nội</span>
        <ul id="hobbies-list">
          <li>Sở thích 1</li>
        </ul>
      </section>
      <section id="experience" class="main-section">
        <h2 class="main-section-title" data-i18n="sections.experience_title">Kinh Nghiệm Làm Việc</h2>
        <div id="experience-list">
          <div class="cv-entry"><h3>Senior Developer</h3></div>
        </div>
      </section>
      <section id="education" class="main-section">
        <h2 class="main-section-title" data-i18n="sections.education_title">Học Vấn</h2>
        <div id="education-list">
          <div class="cv-entry"><h3>University</h3></div>
        </div>
      </section>
      <section id="skills" class="main-section">
        <h2 class="main-section-title" data-i18n="sections.skills_title">Kỹ Năng</h2>
        <div id="skills-list">
          <div class="skill-category"><h3>Coding</h3></div>
        </div>
      </section>
      <div class="cv-actions">
        <button class="btn-print" data-i18n="buttons.print">In CV</button>
        <button class="btn-export" data-i18n="buttons.export_pdf">Xuất PDF</button>
      </div>
    </main>
    <footer>
      <p>&copy; 2024 Nguyen Van A</p>
    </footer>
  `;
}
