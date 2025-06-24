// Rich Minds Website - JavaScript Functionality

// ======================
// Global Variables
// ======================
let currentLang = "en";
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slider .slide");
const sliderBtns = document.querySelectorAll(".slider-btn");

// ======================
// Loading Animation
// ======================
window.addEventListener("load", function () {
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.style.opacity = "0";
      setTimeout(() => {
        loadingOverlay.style.display = "none";
      }, 500);
    }, 1000);
  }
});

// ======================
// Hero Image Slider
// ======================
function changeSlide(index) {
  // Remove active class from current slide and button
  if (slides[currentSlide]) {
    slides[currentSlide].classList.remove("active");
  }
  if (sliderBtns[currentSlide]) {
    sliderBtns[currentSlide].classList.remove("active");
  }

  // Set new current slide
  currentSlide = index;

  // Add active class to new slide and button
  if (slides[currentSlide]) {
    slides[currentSlide].classList.add("active");
  }
  if (sliderBtns[currentSlide]) {
    sliderBtns[currentSlide].classList.add("active");
  }
}

function autoSlide() {
  const nextSlide = (currentSlide + 1) % slides.length;
  changeSlide(nextSlide);
}

// Start auto-slide if slides exist
if (slides.length > 0) {
  setInterval(autoSlide, 5000); // Change slide every 5 seconds
}

// ======================
// Language Toggle
// ======================
function toggleLanguage() {
  const newLang = currentLang === "en" ? "ar" : "en";
  const elements = document.querySelectorAll("[data-en][data-ar]");
  const html = document.documentElement;
  const langText = document.getElementById("langText");

  currentLang = newLang;

  if (currentLang === "ar") {
    html.setAttribute("dir", "rtl");
    html.setAttribute("lang", "ar");
    langText.textContent = "English";
    elements.forEach((el) => {
      el.textContent = el.getAttribute("data-ar");
    });
  } else {
    html.setAttribute("dir", "ltr");
    html.setAttribute("lang", "en");
    langText.textContent = "عربي";
    elements.forEach((el) => {
      el.textContent = el.getAttribute("data-en");
    });
  }

  // Update placeholders
  document
    .querySelectorAll(`[data-${currentLang}-placeholder]`)
    .forEach((element) => {
      const newPlaceholder = element.getAttribute(
        `data-${currentLang}-placeholder`
      );
      if (newPlaceholder) {
        element.placeholder = newPlaceholder;
      }
    });

  // Store language preference
  localStorage.setItem("preferredLanguage", currentLang);
}

// ======================
// FAQ Search Functionality
// ======================
const faqSearch = document.getElementById("faqSearch");
const accordionItems = document.querySelectorAll(".accordion-item");

if (faqSearch) {
  faqSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    accordionItems.forEach((item) => {
      const questionElement = item.querySelector(".accordion-button span");
      const answerElement = item.querySelector(".accordion-body span");
      const tags = item.querySelectorAll(".tag");

      let questionText = questionElement
        ? questionElement.textContent.toLowerCase()
        : "";
      let answerText = answerElement
        ? answerElement.textContent.toLowerCase()
        : "";
      let tagText = "";

      tags.forEach((tag) => {
        tagText += tag.textContent.toLowerCase() + " ";
      });

      if (
        questionText.includes(searchTerm) ||
        answerText.includes(searchTerm) ||
        tagText.includes(searchTerm)
      ) {
        item.style.display = "block";
        item.style.animation = "slideInUp 0.5s ease-out";
      } else {
        item.style.display = "none";
      }
    });

    // Show all items if search is empty
    if (searchTerm === "") {
      accordionItems.forEach((item) => {
        item.style.display = "block";
      });
    }
  });
}

// ======================
// Navbar Scroll Effect
// ======================
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-custom");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// ======================
// Smooth Scrolling
// ======================
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

// ======================
// Counter Animation
// ======================
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Observer for company stats
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

// Observe company stats section
const companyStats = document.querySelector(".company-stats");
if (companyStats) {
  statsObserver.observe(companyStats);
}

// ======================
// Company Gallery Animation
// ======================
function initCompanyGallery() {
  const companyCards = document.querySelectorAll(".company-image-card");

  // Add stagger animation to company images
  companyCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}

// Initialize company gallery when section is visible
const companyGallery = document.querySelector(".company-gallery-section");
if (companyGallery) {
  const galleryObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          initCompanyGallery();
          galleryObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  galleryObserver.observe(companyGallery);
}

// ======================
// Animations on Scroll
// ======================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// Observe feature cards
document.querySelectorAll(".feature-card").forEach((card) => {
  observer.observe(card);
});

// ======================
// Floating Cards Animation
// ======================
function animateFloatingCards() {
  const cards = document.querySelectorAll(".floating-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    setTimeout(() => {
      card.style.transition = "all 0.8s ease-out";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// Initialize floating cards animation when hero section is visible
const heroSection = document.querySelector(".hero-section");
if (heroSection) {
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(animateFloatingCards, 1000);
          heroObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  heroObserver.observe(heroSection);
}

// ======================
// WhatsApp Button Interaction
// ======================
const whatsappFloat = document.querySelector(".whatsapp-float");
if (whatsappFloat) {
  whatsappFloat.addEventListener("mouseenter", function () {
    this.style.animationPlayState = "paused";
  });

  whatsappFloat.addEventListener("mouseleave", function () {
    this.style.animationPlayState = "running";
  });
}

// ======================
// Button Click Effects
// ======================
document.querySelectorAll(".cta-button, .language-toggle").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;

    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ======================
// Page Initialization
// ======================
document.addEventListener("DOMContentLoaded", function () {
  // Load saved language preference
  const savedLang = localStorage.getItem("preferredLanguage");
  if (savedLang && savedLang !== "en") {
    toggleLanguage();
  }

  // Add stagger animation to service list items
  const serviceItems = document.querySelectorAll(".services-list li");
  serviceItems.forEach((item, index) => {
    item.style.animationDelay = `${0.8 + index * 0.2}s`;
  });

  // Initialize reveal animations
  const reveals = document.querySelectorAll(
    ".feature-card, .accordion-item, .faq-contact-box"
  );
  reveals.forEach((reveal) => {
    observer.observe(reveal);
  });

  // Add loading states to images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.classList.add("loaded");
    });
  });
});

// ======================
// CSS Animations
// ======================
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  .cta-button, .language-toggle {
    position: relative;
    overflow: hidden;
  }
  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
  img.loaded {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
`;
document.head.appendChild(style);

// ======================
// Performance Optimization
// ======================
// Preload next slide image
function preloadNextSlide() {
  if (slides.length > 1) {
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    const nextSlide = slides[nextSlideIndex];
    if (nextSlide) {
      const bgImage = nextSlide.style.backgroundImage;
      if (bgImage) {
        const img = new Image();
        img.src = bgImage.slice(4, -1).replace(/"/g, "");
      }
    }
  }
}

// Call preload function periodically
if (slides.length > 0) {
  setInterval(preloadNextSlide, 4000);
}

// Parallax effect for hero background
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".hero-bg-animation");
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// ======================
// Scroll progress indicator
// ======================

function createScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-gold), var(--primary-blue));
            z-index: 9999;
            transition: width 0.3s ease;
        `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + "%";
  });
}

createScrollProgress();

// ======================
// Nested Dropdown Functionality
// ======================
document.addEventListener("DOMContentLoaded", function () {
  console.log("🔧 Initializing nested dropdown functionality...");

  // Handle nested dropdown clicks
  const dropdownToggles = document.querySelectorAll(
    ".dropdown-submenu .dropdown-toggle"
  );

  console.log("📋 Found dropdown toggles:", dropdownToggles.length);

  dropdownToggles.forEach(function (toggle, index) {
    console.log(
      `🎯 Setting up toggle ${index + 1}:`,
      toggle.textContent.trim()
    );

    toggle.addEventListener("click", function (e) {
      console.log("🖱️ Dropdown clicked:", this.textContent.trim());
      e.preventDefault();
      e.stopPropagation();

      const submenu = this.nextElementSibling;
      console.log("📁 Submenu found:", submenu ? "Yes" : "No");

      // Close other submenus
      document
        .querySelectorAll(".dropdown-submenu .dropdown-menu")
        .forEach(function (menu) {
          if (menu !== submenu) {
            menu.classList.remove("show");
          }
        });

      // Toggle current submenu
      if (submenu) {
        submenu.classList.toggle("show");
        console.log(
          "✅ Submenu toggled, now showing:",
          submenu.classList.contains("show")
        );
      }
    });
  });

  // Handle desktop hover for nested dropdowns
  const dropdownSubmenus = document.querySelectorAll(".dropdown-submenu");

  dropdownSubmenus.forEach(function (submenu) {
    submenu.addEventListener("mouseenter", function () {
      if (window.innerWidth > 991) {
        const menu = this.querySelector(".dropdown-menu");
        if (menu) {
          menu.classList.add("show");
        }
      }
    });

    submenu.addEventListener("mouseleave", function () {
      if (window.innerWidth > 991) {
        const menu = this.querySelector(".dropdown-menu");
        if (menu) {
          menu.classList.remove("show");
        }
      }
    });
  });

  // Close submenus when main dropdown closes
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document
        .querySelectorAll(".dropdown-submenu .dropdown-menu")
        .forEach(function (menu) {
          menu.classList.remove("show");
        });
    }
  });

  // Handle Bootstrap dropdown events
  const mainDropdowns = document.querySelectorAll(".navbar .dropdown");
  mainDropdowns.forEach(function (dropdown) {
    dropdown.addEventListener("hidden.bs.dropdown", function () {
      // Close all submenus when main dropdown closes
      this.querySelectorAll(".dropdown-submenu .dropdown-menu").forEach(
        function (menu) {
          menu.classList.remove("show");
        }
      );
    });
  });
});

console.log("🚀 Rich Minds Website Loaded Successfully!");
