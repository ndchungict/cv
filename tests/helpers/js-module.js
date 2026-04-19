// tests/helpers/js-module.js
// Re-implements the pure JS functions from assets/js/main.js for testing
// (main.js has Jekyll Liquid tags that can't be parsed by Node.js directly)

export const DEFAULT_LANG = 'vi';
export const STORAGE_KEY = 'cv_lang';

export function getStoredLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

export function getI18nValue(langData, key) {
  if (!langData || !key) return null;
  const parts = key.split('.');
  let value = langData;
  for (const part of parts) {
    if (value == null || typeof value !== 'object') return null;
    value = value[part];
  }
  return typeof value === 'string' ? value : null;
}

export function applyLanguage(lang, i18nData) {
  const langData = i18nData[lang];
  if (!langData) return;
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(function (el) {
    const key = el.getAttribute('data-i18n');
    const value = getI18nValue(langData, key);
    if (value !== null) {
      el.textContent = value;
    }
  });
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {}
  const buttons = document.querySelectorAll('.language-switcher button');
  buttons.forEach(function (btn) {
    const btnLang = btn.textContent.trim().toLowerCase();
    if (btnLang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

export function getExportFilename(name, date) {
  const sanitized = name
    .replace(/\s+/g, '_')
    .replace(/[^A-Za-z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, '');
  const dateStr = date.toISOString().split('T')[0];
  return sanitized + '_CV_' + dateStr + '.pdf';
}
