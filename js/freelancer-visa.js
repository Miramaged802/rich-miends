// Freelancer Visa Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
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

  // Initialize floating animations
  function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll(
      ".floating-icon, .floating-card, .floating-element"
    );

    floatingElements.forEach((element, index) => {
      const delay = index * 0.5;
      const duration = 3 + index * 0.5;

      element.style.animationDelay = `${delay}s`;
      element.style.animationDuration = `${duration}s`;
    });
  }

  initFloatingAnimations();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
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

  // Enhanced card hover effects
  const enhancedCards = document.querySelectorAll(".enhanced-card-dark");
  enhancedCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Feature items animation on scroll
  const featureItems = document.querySelectorAll(".feature-item");
  const requirementItems = document.querySelectorAll(".requirement-item");

  function animateItems(items) {
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  // Intersection Observer for feature animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("features-grid")) {
            animateItems(featureItems);
          } else if (entry.target.classList.contains("requirements-list")) {
            animateItems(requirementItems);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  const featuresGrid = document.querySelector(".features-grid");
  const requirementsList = document.querySelector(".requirements-list");

  if (featuresGrid) observer.observe(featuresGrid);
  if (requirementsList) observer.observe(requirementsList);

  // Quick stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number");

  function animateStats() {
    statNumbers.forEach((stat) => {
      const finalValue = stat.textContent;
      if (finalValue.includes("%")) {
        const numValue = parseInt(finalValue);
        animateNumber(stat, 0, numValue, "%");
      } else if (finalValue.includes("-")) {
        // For ranges like "1-2", just show the text
        return;
      }
    });
  }

  function animateNumber(element, start, end, suffix = "") {
    const duration = 2000;
    const startTime = performance.now();

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }

    requestAnimationFrame(updateNumber);
  }

  // Trigger stats animation when hero section is visible
  const heroSection = document.querySelector(".freelancer-hero");
  if (heroSection) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    heroObserver.observe(heroSection);
  }

  // Image overlay effects
  const imageContainers = document.querySelectorAll(".image-container");
  imageContainers.forEach((container) => {
    container.addEventListener("mouseenter", function () {
      const overlay = this.querySelector(".image-overlay");
      if (overlay) {
        overlay.style.opacity = "0.9";
      }
    });

    container.addEventListener("mouseleave", function () {
      const overlay = this.querySelector(".image-overlay");
      if (overlay) {
        overlay.style.opacity = "0";
      }
    });
  });

  // Button click effects
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

  // Parallax effect for hero section (disabled)
  // Removed parallax transform to prevent unwanted translateY values

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

  // Form validation and submission (if consultation form exists)
  const consultationForm = document.querySelector("#consultationForm");
  if (consultationForm) {
    consultationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add form validation logic here
      const formData = new FormData(this);

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "alert alert-success mt-3";
      successMessage.innerHTML =
        '<i class="fas fa-check-circle me-2"></i>Thank you! We will contact you soon.';

      this.appendChild(successMessage);
      this.reset();

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }

  // Accessibility improvements
  document.addEventListener("keydown", function (e) {
    // ESC key to close any open modals or overlays
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal.show");
      if (activeModal) {
        const modal = bootstrap.Modal.getInstance(activeModal);
        if (modal) modal.hide();
      }
    }
  });

  // Lazy loading for images
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
});

// Utility functions
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

console.log("Freelancer Visa page initialized successfully");
