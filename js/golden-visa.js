// Golden Visa Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }

  // Hide loading overlay
  setTimeout(function () {
    const loadingOverlay = document.getElementById("loadingOverlay");
    if (loadingOverlay) {
      loadingOverlay.style.opacity = "0";
      setTimeout(() => {
        loadingOverlay.style.display = "none";
      }, 500);
    }
  }, 1000);

  // Language switching functionality
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

    // Update direction
    const html = document.documentElement;
    const body = document.body;

    if (currentLanguage === "ar") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ar");
      body.classList.add("rtl");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      body.classList.remove("rtl");
    }

    // Save language preference
    localStorage.setItem("preferredLanguage", currentLanguage);
  }

  // Global toggle function
  window.toggleLanguage = function () {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";
    updateLanguage();

    // Refresh AOS if available
    if (typeof AOS !== "undefined") {
      AOS.refresh();
    }
  };

  // Initialize language on page load
  updateLanguage();

  // Smooth scrolling for anchor links
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
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      } catch (error) {
        console.warn("Invalid selector:", href);
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // Animated counters for statistics
  function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ""));
    const suffix = element.textContent.replace(/\d+/, "");
    let current = 0;
    const increment = target / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 30);
  }

  // Intersection Observer for counters
  const counters = document.querySelectorAll(".stat-card h3");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.7 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });

  // Card hover effects
  const cards = document.querySelectorAll(".visa-card, .feature-item");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Button hover effects with ripple
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector(".hero-section");

    if (heroSection) {
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });

  // Image lazy loading
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Floating animations initialization
  function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll(
      ".floating-card, .floating-doc, .floating-element"
    );

    floatingElements.forEach((element, index) => {
      const delay = index * 0.5;
      const duration = 3 + index * 0.5;

      element.style.animationDelay = `${delay}s`;
      element.style.animationDuration = `${duration}s`;
    });
  }

  initFloatingAnimations();

  // Scroll progress indicator
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

  // Form validation (if forms are present)
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const inputs = form.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("is-invalid");
          showError(input, "This field is required");
        } else {
          input.classList.remove("is-invalid");
          hideError(input);
        }
      });

      if (isValid) {
        showSuccess("Form submitted successfully!");
      }
    });
  });

  function showError(input, message) {
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("invalid-feedback")) {
      errorElement = document.createElement("div");
      errorElement.className = "invalid-feedback";
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
    errorElement.textContent = message;
  }

  function hideError(input) {
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("invalid-feedback")) {
      errorElement.remove();
    }
  }

  function showSuccess(message) {
    const successDiv = document.createElement("div");
    successDiv.className = "alert alert-success position-fixed";
    successDiv.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 10000;
            min-width: 300px;
        `;
    successDiv.textContent = message;

    document.body.appendChild(successDiv);

    setTimeout(() => {
      successDiv.remove();
    }, 3000);
  }

  // Intersection Observer for animations
  const animatedElements = document.querySelectorAll(
    ".visa-card, .feature-item, .doc-category"
  );
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((element) => {
    animationObserver.observe(element);
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    // ESC key to close any open modals or dropdowns
    if (e.key === "Escape") {
      const dropdowns = document.querySelectorAll(".dropdown-menu.show");
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("show");
      });
    }

    // Enter key for language toggle when focused
    if (e.key === "Enter" && e.target.classList.contains("language-toggle")) {
      toggleLanguage();
    }
  });

  // Mobile menu handling
  const mobileToggle = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (mobileToggle && navbarCollapse) {
    mobileToggle.addEventListener("click", function () {
      navbarCollapse.classList.toggle("show");
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !navbar.contains(e.target) &&
        navbarCollapse.classList.contains("show")
      ) {
        navbarCollapse.classList.remove("show");
      }
    });
  }

  // Debounce function for performance
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Optimized scroll handler
  const optimizedScrollHandler = debounce(function () {
    // Handle any additional scroll-based animations
    updateScrollAnimations();
  }, 16); // ~60fps

  function updateScrollAnimations() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Update any scroll-based animations here
    requestAnimationFrame(() => {
      // Smooth scroll animations
    });
  }

  window.addEventListener("scroll", optimizedScrollHandler);

  // Error handling
  window.addEventListener("error", function (e) {
    console.error("JavaScript error:", e.error);
  });

  // Performance monitoring
  if ("performance" in window) {
    window.addEventListener("load", function () {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0];
        console.log(
          "Page load time:",
          perfData.loadEventEnd - perfData.loadEventStart,
          "ms"
        );
      }, 0);
    });
  }

  console.log("Golden Visa page initialized successfully");
});

// Additional CSS for animations (injected via JavaScript)
const additionalStyles = document.createElement("style");
additionalStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .is-invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
    }
    
    .invalid-feedback {
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
    }
    
    @media (max-width: 768px) {
        .floating-card,
        .floating-doc,
        .floating-element {
            position: static !important;
            animation: none !important;
            margin: 10px 0;
        }
    }
`;

document.head.appendChild(additionalStyles);
