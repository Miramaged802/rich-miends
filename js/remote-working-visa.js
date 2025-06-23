// Remote Working Visa Page JavaScript
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
  setTimeout(() => {
    const loadingOverlay = document.getElementById("loadingOverlay");
    if (loadingOverlay) {
      loadingOverlay.style.opacity = "0";
      setTimeout(() => {
        loadingOverlay.style.display = "none";
      }, 500);
    }
  }, 1000);

  // Enhanced navbar scroll effect
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

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Enhanced card hover effects
  const cards = document.querySelectorAll(
    ".enhanced-card, .enhanced-card-dark"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Feature items animation with Intersection Observer
  const featureItems = document.querySelectorAll(".feature-item");
  const featureObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  featureItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    featureObserver.observe(item);
  });

  // Quick stats counter animation
  const statNumbers = document.querySelectorAll(".stat-number");
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const finalValue = target.textContent;

          // Only animate numeric values
          if (!isNaN(parseInt(finalValue))) {
            animateCounter(target, 0, parseInt(finalValue), 2000);
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat);
  });

  // Counter animation function
  function animateCounter(element, start, end, duration) {
    let startTime = null;

    function animate(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const currentValue = Math.floor(progress * (end - start) + start);
      element.textContent =
        currentValue + (element.textContent.includes("%") ? "%" : "");

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  // Image overlay effects
  const imageContainers = document.querySelectorAll(".image-container");
  imageContainers.forEach((container) => {
    const overlay = container.querySelector(".image-overlay");
    if (overlay) {
      container.addEventListener("mouseenter", () => {
        overlay.style.opacity = "1";
      });
      container.addEventListener("mouseleave", () => {
        overlay.style.opacity = "0";
      });
    }
  });

  // Button ripple effects
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
      `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation keyframes
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Scroll progress indicator
  function createScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #ffd700, #ffed4e);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    });
  }

  createScrollProgress();

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

  // Form validation and accessibility improvements
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const inputs = form.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          input.setAttribute("aria-invalid", "true");
          input.style.borderColor = "#dc3545";
          isValid = false;
        } else {
          input.setAttribute("aria-invalid", "false");
          input.style.borderColor = "";
        }
      });

      if (!isValid) {
        e.preventDefault();
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
  });

  // Debounced resize handler
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
          "Page Load Time:",
          perfData.loadEventEnd - perfData.loadEventStart,
          "ms"
        );
      }, 0);
    });
  }

  // Keyboard navigation improvements
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });

  // Add keyboard navigation styles
  const keyboardStyle = document.createElement("style");
  keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
      outline: 2px solid #ffd700 !important;
      outline-offset: 2px !important;
    }
  `;
  document.head.appendChild(keyboardStyle);

  // Process timeline animation
  const processSteps = document.querySelectorAll(".process-step");
  const processObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 200);
        }
      });
    },
    { threshold: 0.2 }
  );

  processSteps.forEach((step) => {
    step.style.opacity = "0";
    step.style.transform = "translateY(30px)";
    step.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    processObserver.observe(step);
  });

  // Requirements items animation
  const requirementItems = document.querySelectorAll(".requirement-item");
  const requirementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  requirementItems.forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    requirementObserver.observe(item);
  });

  // Enhanced card animations
  const enhancedCards = document.querySelectorAll(
    ".enhanced-card, .enhanced-card-dark"
  );
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 150);
        }
      });
    },
    { threshold: 0.1 }
  );

  enhancedCards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    cardObserver.observe(card);
  });

  // Floating icons interaction
  const floatingIcons = document.querySelectorAll(".floating-icon");
  floatingIcons.forEach((icon, index) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.2)";
      this.style.color = "rgba(255, 215, 0, 0.8)";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.color = "rgba(255, 215, 0, 0.3)";
    });
  });

  // Hero badge pulse interaction
  const heroBadge = document.querySelector(".hero-badge");
  if (heroBadge) {
    heroBadge.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
      this.style.transform = "scale(1.1)";
    });

    heroBadge.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
      this.style.transform = "scale(1)";
    });
  }

  console.log("Remote Working Visa page loaded successfully!");
});
