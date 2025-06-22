// Business Setup Page - Enhanced JavaScript

// Initialize AOS (Animate On Scroll) library
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: "ease-out-cubic",
  });

  // Hide loading overlay after page loads
  setTimeout(function () {
    const loadingOverlay = document.getElementById("loadingOverlay");
    if (loadingOverlay) {
      loadingOverlay.style.opacity = "0";
      setTimeout(function () {
        loadingOverlay.style.display = "none";
      }, 500);
    }
  }, 1000);

  // Enhanced smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");

      // Skip if href is just "#" or empty
      if (!href || href === "#" || href.length <= 1) {
        return;
      }

      try {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } catch (error) {
        console.warn("Invalid selector:", href);
      }
    });
  });

  // Enhanced stats counter animation
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const text = stat.innerText;
          if (text.includes("%")) {
            animateNumber(stat, 0, parseInt(text), 2000, "%");
          } else if (text.includes("+")) {
            animateNumber(stat, 0, parseInt(text), 2500, "+");
          } else {
            stat.style.opacity = "1";
            stat.style.transform = "scale(1)";
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe stats section
  const statsSection = document.querySelector(".hero-quick-stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Initialize language system on page load
  updateLanguage();

  // Listen for language changes across browser tabs/windows
  window.addEventListener("storage", function (e) {
    if (e.key === "preferredLanguage" && e.newValue !== currentLanguage) {
      currentLanguage = e.newValue;
      updateLanguage();
    }
  });

  // Listen for real-time language changes within same tab
  window.addEventListener("languageChanged", function (e) {
    if (e.detail.language !== currentLanguage) {
      currentLanguage = e.detail.language;
      updateLanguage();
    }
  });
});

// Utility function for number animation
function animateNumber(element, start, end, duration, suffix = "") {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(start + (end - start) * easeOutQuart);

    element.textContent = current + suffix;
    element.style.opacity = "1";
    element.style.transform = "scale(1)";

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Universal Language System - Works across all pages
let currentLanguage = localStorage.getItem("preferredLanguage") || "en";

function updateLanguage() {
  const elements = document.querySelectorAll("[data-en][data-ar]");
  elements.forEach((element) => {
    const text = element.getAttribute(`data-${currentLanguage}`);
    if (text) {
      element.textContent = text;
    }
  });

  // Update language button text
  const langButton = document.getElementById("langText");
  if (langButton) {
    langButton.textContent = currentLanguage === "en" ? "عربي" : "English";
  }

  // Update direction and language attributes
  const html = document.documentElement;
  const body = document.body;

  if (currentLanguage === "ar") {
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
  localStorage.setItem("preferredLanguage", currentLanguage);

  // Force FontAwesome icons to reload in RTL mode
  if (currentLanguage === "ar") {
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
}

// Global toggle function - affects entire website
window.toggleLanguage = function () {
  currentLanguage = currentLanguage === "en" ? "ar" : "en";
  updateLanguage();

  // Broadcast language change to other pages/tabs
  window.dispatchEvent(
    new CustomEvent("languageChanged", {
      detail: { language: currentLanguage },
    })
  );

  // Refresh AOS if available
  if (typeof AOS !== "undefined") {
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  }
};
