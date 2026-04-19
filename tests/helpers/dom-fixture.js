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
        <button onclick="applyLanguage('vi')">VI</button>
        <button onclick="applyLanguage('en')">EN</button>
        <button onclick="applyLanguage('zh')">ZH</button>
      </div>
    </header>
    <main>
      <section id="about" class="cv-section">
        <h2 data-i18n="nav.about">Giới thiệu</h2>
      </section>
      <section id="experience" class="cv-section">
        <h2 data-i18n="nav.experience">Kinh nghiệm</h2>
        <div class="cv-entry"><h3>Senior Developer</h3></div>
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
