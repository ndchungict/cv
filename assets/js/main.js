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

/**
 * Applies the given language to the page:
 * - Updates text content of all [data-i18n] elements.
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
