// Universal Language System - Shared across all website pages
// This ensures that language changes on any page affect the entire website

class LanguageSystem {
  constructor() {
    this.currentLanguage = localStorage.getItem("preferredLanguage") || "en";
    this.init();
  }

  init() {
    // Set up event listeners
    this.setupStorageListener();
    this.setupCustomEventListener();

    // Initialize language on page load
    this.updateLanguage();
  }

  updateLanguage() {
    try {
      const elements = document.querySelectorAll("[data-en][data-ar]");
      elements.forEach((element) => {
        const text = element.getAttribute(`data-${this.currentLanguage}`);
        if (text) {
          element.textContent = text;
        }
      });
    } catch (error) {
      console.warn("Error updating language elements:", error);
    }

    // Update language button text
    const langButton = document.getElementById("langText");
    if (langButton) {
      langButton.textContent =
        this.currentLanguage === "en" ? "عربي" : "English";
    }

    // Update direction and language attributes
    const html = document.documentElement;
    const body = document.body;

    if (this.currentLanguage === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      body.classList.add("rtl");
      body.style.direction = "rtl";
      body.style.textAlign = "right";
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      body.classList.remove("rtl");
      body.style.direction = "ltr";
      body.style.textAlign = "left";
    }

    // Save language preference for entire website
    localStorage.setItem("preferredLanguage", this.currentLanguage);

    // Force FontAwesome icons to reload in RTL mode
    if (this.currentLanguage === "ar") {
      this.fixFontAwesomeIcons();
    }

    // Refresh AOS if available
    if (typeof AOS !== "undefined") {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }

  fixFontAwesomeIcons() {
    // Force re-render of FontAwesome icons
    const icons = document.querySelectorAll('i[class*="fa"]');
    icons.forEach((icon) => {
      const classes = icon.className;
      icon.className = "";
      setTimeout(() => {
        icon.className = classes;
      }, 10);
    });
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === "en" ? "ar" : "en";
    this.updateLanguage();

    // Broadcast language change to other pages/tabs
    window.dispatchEvent(
      new CustomEvent("languageChanged", {
        detail: { language: this.currentLanguage },
      })
    );

    // Trigger storage event for cross-tab communication
    localStorage.setItem("preferredLanguage", this.currentLanguage);
  }

  setupStorageListener() {
    // Listen for language changes across browser tabs/windows
    window.addEventListener("storage", (e) => {
      if (
        e.key === "preferredLanguage" &&
        e.newValue !== this.currentLanguage
      ) {
        this.currentLanguage = e.newValue;
        this.updateLanguage();
      }
    });
  }

  setupCustomEventListener() {
    // Listen for real-time language changes within same tab
    window.addEventListener("languageChanged", (e) => {
      if (e.detail.language !== this.currentLanguage) {
        this.currentLanguage = e.detail.language;
        this.updateLanguage();
      }
    });
  }
}

// Initialize the language system when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  window.languageSystem = new LanguageSystem();

  // Make global toggle function available
  window.toggleLanguage = function () {
    window.languageSystem.toggleLanguage();
  };
});

// Export for module usage if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = LanguageSystem;
}
