---
---
// Jekyll processes this file so Liquid tags are evaluated at build time.

// i18n data injected from _data/i18n.yml via Liquid
const I18N_DATA = {{ site.data.i18n | jsonify }};

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
 * Renders the experience section from i18n data.
 * @param {object} langData - The i18n data object for a specific language.
 */
function renderExperience(langData) {
  const container = document.getElementById('experience-list');
  if (!container || !langData.experience) return;

  const achievementsLabel = (langData.sections && langData.sections.achievements_label) || 'Achievements:';

  container.innerHTML = langData.experience.map(function (entry) {
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
 * Renders the education section from i18n data.
 * @param {object} langData - The i18n data object for a specific language.
 */
function renderEducation(langData) {
  const container = document.getElementById('education-list');
  if (!container || !langData.education) return;

  container.innerHTML = langData.education.map(function (entry) {
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

/**
 * Renders the skills section from i18n data.
 * @param {object} langData - The i18n data object for a specific language.
 */
function renderSkills(langData) {
  const container = document.getElementById('skills-list');
  if (!container || !langData.skills) return;

  container.innerHTML = langData.skills.map(function (skill) {
    return '<div class="sidebar-skill">' +
      '<strong>' + escapeHtml(skill.category) + ':</strong>' +
      '<span>' + escapeHtml(skill.description) + '</span>' +
      '</div>';
  }).join('');
}

/**
 * Renders the projects section from i18n data.
 * @param {object} langData - The i18n data object for a specific language.
 */
function renderProjects(langData) {
  const container = document.getElementById('projects-list');
  if (!container || !langData.projects) return;

  container.innerHTML = langData.projects.map(function (project) {
    const responsibilitiesHtml = project.responsibilities
      ? '<ul class="entry-list">' +
        project.responsibilities.map(function (r) { return '<li>' + escapeHtml(r) + '</li>'; }).join('') +
        '</ul>'
      : '';

    return '<div class="cv-entry">' +
      '<span class="entry-period">' + escapeHtml(project.period) + '</span>' +
      '<h3 class="entry-title">' + escapeHtml(project.name) + '</h3>' +
      '<p class="entry-subtitle"><em>' + escapeHtml(project.position) + '</em></p>' +
      responsibilitiesHtml +
      '</div>';
  }).join('');
}

/**
 * Renders the profile summary, title, address, and hobbies from i18n data.
 * @param {object} langData - The i18n data object for a specific language.
 */
function renderProfile(langData) {
  if (!langData.profile) return;

  const nameEl = document.getElementById('profile-name');
  if (nameEl && langData.profile.name) {
    nameEl.textContent = langData.profile.name;
  }

  const titleEl = document.getElementById('profile-title');
  if (titleEl && langData.profile.title) {
    titleEl.textContent = langData.profile.title;
  }

  const summaryEl = document.getElementById('profile-summary');
  if (summaryEl && langData.profile.summary) {
    summaryEl.textContent = langData.profile.summary;
  }

  const addressEl = document.getElementById('profile-address');
  if (addressEl && langData.profile.address) {
    addressEl.textContent = langData.profile.address;
  }

  const hobbiesContainer = document.getElementById('hobbies-list');
  if (hobbiesContainer && langData.profile.hobbies) {
    hobbiesContainer.innerHTML = langData.profile.hobbies.map(function (h) {
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
  renderProfile(langData);
  renderExperience(langData);
  renderEducation(langData);
  renderSkills(langData);
  renderProjects(langData);

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
 * Builds the export filename from a profile name and a date.
 * Spaces in the name are replaced with underscores; non-alphanumeric/underscore
 * characters are removed.
 *
 * @param {string} name - Profile name (e.g. "Nguyen Van A").
 * @param {Date}   date - Date to embed in the filename.
 * @returns {string} e.g. "Nguyen_Van_A_CV_2024-01-15.pdf"
 */
function getExportFilename(name, date) {
  const sanitized = name
    .replace(/\s+/g, '_')
    .replace(/[^A-Za-z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, '');
  const dateStr = date.toISOString().split('T')[0];
  return sanitized + '_CV_' + dateStr + '.pdf';
}

/**
 * Generates and downloads a PDF of the CV using html2pdf.js.
 * - Disables the export button and shows a loading label while generating.
 * - Clones the <main> element and strips UI-only elements from the clone.
 * - Restores the button in a finally block regardless of success or failure.
 */
async function exportPDF() {
  // Guard: html2pdf must be loaded
  if (typeof html2pdf === 'undefined') {
    alert('PDF export không khả dụng. Vui lòng dùng "In CV" để thay thế.');
    return;
  }

  // Resolve the export button
  const exportBtn = document.querySelector('.btn-export');
  const originalText = exportBtn ? exportBtn.textContent : '';
  const originalDisabled = exportBtn ? exportBtn.disabled : false;

  // Determine the "exporting" label from the current language
  let exportingLabel = 'Đang tạo...';
  try {
    const currentLang = getStoredLanguage() || DEFAULT_LANG;
    const langData = I18N_DATA[currentLang];
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

  try {
    // Resolve profile name for the filename
    let profileName = 'CV';
    const nameEl = document.querySelector('header h1') ||
                   document.querySelector('[data-profile-name]');
    if (nameEl) {
      profileName = nameEl.textContent.trim() || profileName;
    }

    const filename = getExportFilename(profileName, new Date());

    // Clone the main content element (fall back to body)
    const sourceEl = document.querySelector('main') || document.body;
    const clone = sourceEl.cloneNode(true);

    // Remove UI-only elements from the clone
    const selectorsToRemove = [
      'nav',
      '.language-switcher',
      '.btn-print',
      '.btn-export',
      '.cv-actions',
    ];
    selectorsToRemove.forEach(function (selector) {
      clone.querySelectorAll(selector).forEach(function (el) {
        el.parentNode.removeChild(el);
      });
    });

    // html2pdf options
    const options = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { avoid: '.cv-entry' },
    };

    await html2pdf().set(options).from(clone).save();
  } catch (err) {
    console.error('PDF export failed:', err);
    alert('Xuất PDF thất bại. Vui lòng thử lại hoặc dùng "In CV".');
  } finally {
    // Always restore the button
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
