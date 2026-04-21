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

export function escapeHtml(str) {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderExperience(langData) {
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

export function renderEducation(langData) {
  const container = document.getElementById('education-list');
  if (!container || !langData.education) return;

  container.innerHTML = langData.education.map(function (entry) {
    const periodHtml = (entry.start || entry.end)
      ? '<span class="entry-period">' + escapeHtml(entry.start || '') + ' - ' + escapeHtml(entry.end || '') + '</span>'
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

export function renderSkills(langData) {
  const container = document.getElementById('skills-list');
  if (!container || !langData.skills) return;

  container.innerHTML = langData.skills.map(function (skill) {
    return '<div class="skill-category">' +
      '<h3 class="category-name">' + escapeHtml(skill.category) + '</h3>' +
      '<p class="skill-description">' + escapeHtml(skill.description) + '</p>' +
      '</div>';
  }).join('');
}

export function renderProfile(langData) {
  if (!langData.profile) return;

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
      return '<li><span class="hobby-icon" aria-hidden="true">' + h.icon + '</span>' +
        '<span>' + escapeHtml(h.name) + '</span></li>';
    }).join('');
  }
}

export function applyLanguage(lang, i18nData) {
  const langData = i18nData[lang];
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

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {}

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

export function getExportFilename(name, date) {
  const sanitized = name
    .replace(/\s+/g, '_')
    .replace(/[^A-Za-z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, '');
  const dateStr = date.toISOString().split('T')[0];
  return sanitized + '_CV_' + dateStr + '.pdf';
}
