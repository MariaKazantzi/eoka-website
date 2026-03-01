// Set up active button state as soon as this script loads (synchronously)
// This runs before DOMContentLoaded to prevent flashing
function initializeButtonsSync() {
  const savedLanguage = localStorage.getItem('language') || 'el';
  const langButtons = document.querySelectorAll('.lang-btn');
  if (langButtons.length > 0) {
    langButtons.forEach(btn => {
      btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-lang="${savedLanguage}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }
  }
}

// Try to initialize buttons immediately if DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeButtonsSync);
} else {
  initializeButtonsSync();
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedLanguage = localStorage.getItem('language') || 'el';
  applyTranslations(savedLanguage);
  setupLanguageButtons();
});

function setupLanguageButtons() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      const lang = this.dataset.lang;
      setLanguage(lang);
    });
  });
}

function initializeLanguage(lang) {
  // Set active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
  
  // Apply translations
  applyTranslations(lang);
  
  // Save preference
  localStorage.setItem('language', lang);
}

function setLanguage(lang) {
  initializeLanguage(lang);
  // Dispatch custom event so other scripts can react to language change
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

function applyTranslations(lang) {
  // Translate all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update placeholders
  document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
    const key = element.dataset.translatePlaceholder;
    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });
  
  // Update button and input values/text
  document.querySelectorAll('[data-translate-value]').forEach(element => {
    const key = element.dataset.translateValue;
    if (translations[lang] && translations[lang][key]) {
      // For buttons and other elements, update textContent
      if (element.tagName === 'BUTTON' || element.tagName === 'A') {
        element.textContent = translations[lang][key];
      } else {
        element.value = translations[lang][key];
      }
    }
  });
  
  // Update form labels - handle label elements with data-translate
  document.querySelectorAll('label[data-translate]').forEach(label => {
    const key = label.dataset.translate;
    if (translations[lang] && translations[lang][key]) {
      label.textContent = translations[lang][key];
    }
  });
}
