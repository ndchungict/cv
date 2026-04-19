// tests/setup.test.js
// Smoke test to verify the testing framework and helpers are wired up correctly.
import { describe, it, expect, beforeEach } from 'vitest';
import { setupMinimalDOM } from './helpers/dom-fixture.js';
import { I18N_DATA } from './helpers/i18n-data.js';
import {
  DEFAULT_LANG,
  STORAGE_KEY,
  getStoredLanguage,
  getI18nValue,
  applyLanguage,
  getExportFilename,
} from './helpers/js-module.js';

describe('Testing framework setup', () => {
  it('dom-fixture sets up expected elements', () => {
    setupMinimalDOM();
    expect(document.querySelector('header h1').textContent).toBe('Nguyen Van A');
    expect(document.querySelectorAll('[data-i18n]').length).toBeGreaterThan(0);
    expect(document.querySelector('.language-switcher')).not.toBeNull();
    expect(document.querySelector('.btn-export')).not.toBeNull();
  });

  it('I18N_DATA has vi, en, zh keys', () => {
    expect(I18N_DATA).toHaveProperty('vi');
    expect(I18N_DATA).toHaveProperty('en');
    expect(I18N_DATA).toHaveProperty('zh');
  });

  it('DEFAULT_LANG is vi', () => {
    expect(DEFAULT_LANG).toBe('vi');
  });

  it('getI18nValue resolves dot-separated keys', () => {
    expect(getI18nValue(I18N_DATA.en, 'nav.about')).toBe('About');
    expect(getI18nValue(I18N_DATA.vi, 'buttons.print')).toBe('In CV');
    expect(getI18nValue(I18N_DATA.zh, 'nav.experience')).toBe('工作经历');
  });

  it('getI18nValue returns null for missing keys', () => {
    expect(getI18nValue(I18N_DATA.en, 'nav.missing')).toBeNull();
    expect(getI18nValue(null, 'nav.about')).toBeNull();
    expect(getI18nValue(I18N_DATA.en, '')).toBeNull();
  });

  describe('applyLanguage', () => {
    beforeEach(() => {
      setupMinimalDOM();
      localStorage.clear();
    });

    it('updates data-i18n elements to the selected language', () => {
      applyLanguage('en', I18N_DATA);
      const aboutEl = document.querySelector('[data-i18n="nav.about"]');
      expect(aboutEl.textContent).toBe('About');
    });

    it('persists the language to localStorage', () => {
      applyLanguage('zh', I18N_DATA);
      expect(localStorage.getItem(STORAGE_KEY)).toBe('zh');
    });
  });

  describe('getExportFilename', () => {
    it('formats filename correctly', () => {
      const date = new Date('2024-01-15T00:00:00.000Z');
      expect(getExportFilename('Nguyen Van A', date)).toBe('Nguyen_Van_A_CV_2024-01-15.pdf');
    });

    it('strips special characters from name', () => {
      const date = new Date('2024-06-01T00:00:00.000Z');
      expect(getExportFilename('John & Jane', date)).toBe('John__Jane_CV_2024-06-01.pdf');
    });
  });
});
