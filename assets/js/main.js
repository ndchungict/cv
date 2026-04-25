---
---
// Jekyll processes this file so Liquid tags are evaluated at build time.

// i18n UI strings from _data/i18n.yml
const I18N_DATA = {{ site.data.i18n | jsonify }};

// Content data from individual data files (multi-language)
const PROFILE_DATA = {{ site.data.profile | jsonify }};
const EXPERIENCE_DATA = {{ site.data.experience | jsonify }};
const EDUCATION_DATA = {{ site.data.education | jsonify }};
const SKILLS_DATA = {{ site.data.skills | jsonify }};
const PROJECTS_DATA = {{ site.data.projects | jsonify }};

const DEFAULT_LANG = 'vi';
const STORAGE_KEY = 'cv_lang';

/**
 * Reads the stored language preference from localStorage.
 * Returns null if localStorage is unavailable (e.g. private browsing).
 */
function getStoredLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

/**
 * Resolves a dot-separated key path (e.g. "nav.about") against a language
 * data object and returns the corresponding string value, or null if not found.
 *
 * @param {object} langData - The i18n data object for a specific language.
 * @param {string} key - Dot-separated key path.
 * @returns {string|null}
 */
function getI18nValue(langData, key) {
  if (!langData || !key) return null;
  const parts = key.split('.');
  let value = langData;
  for (const part of parts) {
    if (value == null || typeof value !== 'object') return null;
    value = value[part];
  }
  return typeof value === 'string' ? value : null;
}

// ---------------------------------------------------------------------------
// Dynamic content renderers
// ---------------------------------------------------------------------------

/**
 * Renders the experience section from the experience data file.
 * @param {string} lang - Language code: 'vi', 'en', or 'zh'.
 */
function renderExperience(lang) {
  const container = document.getElementById('experience-list');
  const entries = EXPERIENCE_DATA[lang];
  if (!container || !entries) return;

  const langData = I18N_DATA[lang] || {};
  const achievementsLabel = (langData.sections && langData.sections.achievements_label) || 'Achievements:';

  container.innerHTML = entries.map(function (entry) {
    const responsibilitiesHtml = entry.responsibilities
      ? '<ul class="entry-list">' +
        entry.responsibilities.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join('') +
        '</ul>'
      : '';

    const achievementsHtml = entry.achievements
      ? '<p class="entry-achievements-label">' + escapeHtml(achievementsLabel) + '</p>' +
        '<ul class="entry-list">' +
        entry.achievements.map(function (a) { return '<li>' + escapeHtml(a) + '</li>'; }).join('') +
        '</ul>'
      : '';

    return '<div class="cv-entry">' +
      '<div class="entry-header">' +
        '<div class="entry-header-left">' +
          '<h3 class="entry-company">' + escapeHtml(entry.company) + '</h3>' +
          '<p class="entry-title-role"><em>' + escapeHtml(entry.title) + '</em></p>' +
        '</div>' +
        '<span class="entry-period">' + escapeHtml(entry.start) + ' - ' + escapeHtml(entry.end) + '</span>' +
      '</div>' +
      responsibilitiesHtml +
      achievementsHtml +
      '</div>';
  }).join('');
}

/**
 * Renders the education section from the education data file.
 * Targets both sidebar (#sidebar-education-list) and main (#education-list).
 * @param {string} lang - Language code: 'vi', 'en', or 'zh'.
 */
function renderEducation(lang) {
  const entries = EDUCATION_DATA[lang];
  if (!entries) return;

  // Sidebar education list
  const sidebarContainer = document.getElementById('sidebar-education-list');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = entries.map(function (entry) {
      const periodHtml = (entry.start || entry.end)
        ? '<span class="sidebar-edu-period">' + escapeHtml(entry.start || '') + ' – ' + escapeHtml(entry.end || '') + '</span>'
        : (entry.year ? '<span class="sidebar-edu-period">' + escapeHtml(entry.year) + '</span>' : '');

      const descHtml = entry.description
        ? '<span class="sidebar-edu-desc">' + escapeHtml(entry.description) + '</span>'
        : '';

      return '<div class="sidebar-education-entry">' +
        '<strong class="sidebar-edu-institution">' + escapeHtml(entry.institution) + '</strong>' +
        '<span class="sidebar-edu-degree">' + escapeHtml(entry.degree) + '</span>' +
        periodHtml +
        descHtml +
        '</div>';
    }).join('');
  }

  // Main education list (if present)
  const mainContainer = document.getElementById('education-list');
  if (mainContainer) {
    mainContainer.innerHTML = entries.map(function (entry) {
      const periodHtml = (entry.start || entry.end)
        ? '<span class="entry-period">' + escapeHtml(entry.start || '') + ' – ' + escapeHtml(entry.end || '') + '</span>'
        : (entry.year ? '<span class="entry-period">' + escapeHtml(entry.year) + '</span>' : '');

      const descHtml = entry.description
        ? '<p class="entry-description">' + escapeHtml(entry.description) + '</p>'
        : '';

      return '<div class="cv-entry">' +
        '<div class="entry-header">' +
          '<div class="entry-header-left">' +
            '<h3 class="entry-institution">' + escapeHtml(entry.institution) + '</h3>' +
            '<p class="entry-degree">' + escapeHtml(entry.degree) + '</p>' +
          '</div>' +
          periodHtml +
        '</div>' +
        descHtml +
        '</div>';
    }).join('');
  }
}

/**
 * Renders the skills section from the skills data file.
 * Targets both sidebar (#sidebar-skills-list) and main (#skills-list).
 * @param {string} lang - Language code: 'vi', 'en', or 'zh'.
 */
function renderSkills(lang) {
  const skills = SKILLS_DATA[lang];
  if (!skills) return;

  const skillHtml = skills.map(function (skill) {
    return '<div class="sidebar-skill">' +
      '<strong>' + escapeHtml(skill.category) + ':</strong>' +
      '<span>' + escapeHtml(skill.description) + '</span>' +
      '</div>';
  }).join('');

  // Sidebar skills list
  const sidebarContainer = document.getElementById('sidebar-skills-list');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = skillHtml;
  }

  // Main skills list (if present)
  const mainContainer = document.getElementById('skills-list');
  if (mainContainer) {
    mainContainer.innerHTML = skillHtml;
  }
}

/**
 * Renders the projects section from the projects data file.
 * @param {string} lang - Language code: 'vi', 'en', or 'zh'.
 */
function renderProjects(lang) {
  const container = document.getElementById('projects-list');
  const projects = PROJECTS_DATA[lang];
  if (!container || !projects) return;

  container.innerHTML = projects.map(function (project) {
    const responsibilitiesHtml = project.responsibilities
      ? '<ul class="entry-list">' +
        project.responsibilities.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join('') +
        '</ul>'
      : '';

    const extraClass = project.pdf_exclude ? ' pdf-exclude' : '';

    return '<div class="cv-entry' + extraClass + '">' +
      '<h3 class="entry-title">' + escapeHtml(project.name) + '</h3>' +
      '<p class="entry-subtitle"><em>' + escapeHtml(project.position) + '</em></p>' +
      responsibilitiesHtml +
      '</div>';
  }).join('');
}

/**
 * Renders the profile summary, title, address, and hobbies from the profile data file.
 * @param {string} lang - Language code: 'vi', 'en', or 'zh'.
 */
function renderProfile(lang) {
  const profile = PROFILE_DATA[lang];
  if (!profile) return;

  const nameEl = document.getElementById('profile-name');
  if (nameEl && profile.name) {
    nameEl.textContent = profile.name;
  }

  const titleEl = document.getElementById('profile-title');
  if (titleEl && profile.title) {
    titleEl.textContent = profile.title;
  }

  const summaryEl = document.getElementById('profile-summary');
  if (summaryEl && profile.summary) {
    summaryEl.textContent = profile.summary;
  }

  const addressEl = document.getElementById('profile-address');
  if (addressEl && profile.address) {
    addressEl.textContent = profile.address;
  }

  const hobbiesContainer = document.getElementById('hobbies-list');
  if (hobbiesContainer && profile.hobbies) {
    hobbiesContainer.innerHTML = profile.hobbies.map(function (h) {
      return '<li><div class="sidebar-hobby">' +
        '<span class="hobby-icon" aria-hidden="true">' + h.icon + '</span>' +
        '<span>' + escapeHtml(h.name) + '</span>' +
        '</div></li>';
    }).join('');
  }
}

/**
 * Escapes HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------------------------------------------------------------------------
// Core language application
// ---------------------------------------------------------------------------

/**
 * Applies the given language to the page:
 * - Updates text content of all [data-i18n] elements.
 * - Re-renders dynamic content sections (experience, education, skills, profile).
 * - Persists the selection to localStorage.
 * - Updates the active state on language switcher buttons.
 *
 * @param {string} lang - Language code: 'vi', 'en', or 'zh'.
 */
function applyLanguage(lang) {
  const langData = I18N_DATA[lang];
  if (!langData) return;

  // Update all elements that carry a data-i18n key
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    const value = getI18nValue(langData, key);
    if (value !== null) {
      el.textContent = value;
    }
  });

  // Re-render dynamic content sections
  renderProfile(lang);
  renderExperience(lang);
  renderEducation(lang);
  renderSkills(lang);
  renderProjects(lang);

  // Persist preference
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {
    // Ignore write failures in private browsing
  }

  // Update active state on language switcher buttons
  const buttons = document.querySelectorAll('.language-switcher button, .language-switcher [data-lang]');
  buttons.forEach(function (btn) {
    const btnLang = btn.getAttribute('data-lang') || btn.textContent.trim().toLowerCase();
    if (btnLang === lang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // Toggle Chinese font class on body for CJK rendering
  document.body.classList.toggle('lang-zh', lang === 'zh');
}

/**
 * Reads the stored language preference (or falls back to DEFAULT_LANG)
 * and applies it to the page.
 */
function initLanguage() {
  const stored = getStoredLanguage();
  const lang = (stored && I18N_DATA[stored]) ? stored : DEFAULT_LANG;
  applyLanguage(lang);
}

// ---------------------------------------------------------------------------
// PDF Export
// ---------------------------------------------------------------------------

/**
 * Builds the export filename in the format: yyyy-MM-dd-Name-Parts-LANG.pdf
 * Uses name_latin from i18n data when available (required for non-Latin scripts
 * like Chinese). Falls back to NFD-normalizing the display name.
 *
 * @param {string} name - Profile display name (e.g. "Nguyễn Đức Chung", "阮德鍾").
 * @param {Date}   date - Date to embed in the filename.
 * @param {string} lang - Language code: 'vi', 'en', 'zh'.
 * @returns {string} e.g. "2026-04-21-Nguyen-Duc-Chung-VI.pdf"
 */
function getExportFilename(name, date, lang) {
  // Prefer the pre-defined Latin name from profile data (handles CJK scripts)
  var latinName = null;
  try {
    var profileLang = PROFILE_DATA[lang];
    if (profileLang && profileLang.name_latin) {
      latinName = profileLang.name_latin;
    }
  } catch (e) { /* ignore */ }

  var namePart;
  if (latinName) {
    // Sanitize: keep only alphanumeric and hyphens
    namePart = latinName.replace(/[^A-Za-z0-9\-]/g, '');
  } else {
    // Fallback: normalize accented/Vietnamese characters to ASCII
    namePart = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')  // strip combining diacritics
      .replace(/đ/gi, 'd')              // handle đ/Đ not covered by NFD
      .replace(/\s+/g, '-')             // spaces → hyphens
      .replace(/[^A-Za-z0-9\-]/g, ''); // remove remaining non-ASCII
  }

  // Format date as yyyy-MM-dd
  var y = date.getFullYear();
  var m = String(date.getMonth() + 1).padStart(2, '0');
  var d = String(date.getDate()).padStart(2, '0');
  var dateStr = y + '-' + m + '-' + d;

  var langCode = (lang || 'VI').toUpperCase();

  return dateStr + '-' + namePart + '-' + langCode + '.pdf';
}

/**
 * Generates and downloads a PDF of the CV using html2pdf.js.
 * - Captures the full .cv-wrapper (both sidebar + main) to preserve the
 *   two-column layout and all colours.
 * - Temporarily hides UI-only elements (toolbar, nav) instead of cloning,
 *   so that all computed styles and CSS variables are intact.
 * - Restores everything in a finally block regardless of success or failure.
 */
async function exportPDF() {
  // Guard: html2pdf must be loaded
  if (typeof html2pdf === 'undefined') {
    alert('PDF export không khả dụng. Vui lòng dùng "In CV" để thay thế.');
    return;
  }

  // Resolve the export button
  var exportBtn = document.querySelector('.btn-export');
  var originalText = exportBtn ? exportBtn.textContent : '';
  var originalDisabled = exportBtn ? exportBtn.disabled : false;

  // Determine the "exporting" label from the current language
  var exportingLabel = 'Đang tạo...';
  var currentLang = DEFAULT_LANG;
  try {
    currentLang = getStoredLanguage() || DEFAULT_LANG;
    var langData = I18N_DATA[currentLang];
    if (langData && langData.buttons && langData.buttons.exporting) {
      exportingLabel = langData.buttons.exporting;
    }
  } catch (e) {
    // Use default label
  }

  // Disable button and show loading state
  if (exportBtn) {
    exportBtn.disabled = true;
    exportBtn.textContent = exportingLabel;
  }

  // Elements to hide during capture (UI-only, not part of CV content)
  var uiSelectors = [
    '.top-menu',
    '.cv-toolbar',
    '.language-switcher',
    '.cv-actions',
    '.btn-print',
    '.btn-export',
    '.pdf-exclude',
  ];
  var hiddenEls = [];

  try {
    // Resolve profile name for the filename
    var profileName = 'CV';
    var nameEl = document.getElementById('profile-name') ||
                 document.querySelector('.main-name') ||
                 document.querySelector('h1');
    if (nameEl) {
      profileName = nameEl.textContent.trim() || profileName;
    }

    var filename = getExportFilename(profileName, new Date(), currentLang);

    // Temporarily hide UI-only elements so they don't appear in the PDF
    uiSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        if (el.style.display !== 'none') {
          el.dataset.pdfHidden = '1';
          el.style.display = 'none';
          hiddenEls.push(el);
        }
      });
    });

    // Capture the full CV wrapper (sidebar + main) — preserves 2-column layout
    var sourceEl = document.querySelector('.cv-wrapper') || document.querySelector('main') || document.body;

    // Temporarily remove box-shadow and margin so it renders cleanly
    var origBoxShadow = sourceEl.style.boxShadow;
    var origMargin = sourceEl.style.margin;
    sourceEl.style.boxShadow = 'none';
    sourceEl.style.margin = '0';

    // html2pdf options — high scale for crisp text, exact colour reproduction
    var options = {
      margin: [8, 8, 8, 8],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css'], avoid: '.cv-entry' },
    };

    try {
      await html2pdf().set(options).from(sourceEl).save();
    } finally {
      // Always restore wrapper styles
      sourceEl.style.boxShadow = origBoxShadow;
      sourceEl.style.margin = origMargin;
    }

  } catch (err) {
    console.error('PDF export failed:', err);
    alert('Xuất PDF thất bại. Vui lòng thử lại hoặc dùng "In CV".');
  } finally {
    // Restore all hidden UI elements
    hiddenEls.forEach(function (el) {
      el.style.display = '';
      delete el.dataset.pdfHidden;
    });

    // Restore the export button
    if (exportBtn) {
      exportBtn.disabled = originalDisabled;
      exportBtn.textContent = originalText;
    }
  }
}

// ---------------------------------------------------------------------------
// Expose public API on window for HTML onclick attributes
// ---------------------------------------------------------------------------
window.exportPDF = exportPDF;
window.applyLanguage = applyLanguage;

// ---------------------------------------------------------------------------
// Bootstrap on DOM ready
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  initLanguage();
});
