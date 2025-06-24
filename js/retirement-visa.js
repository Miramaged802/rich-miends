// Retirement Visa JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });

  // Loading overlay
  const loadingOverlay = document.getElementById("loadingOverlay");
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.style.opacity = "0";
      setTimeout(() => {
        loadingOverlay.style.display = "none";
      }, 300);
    }, 500);
  }

  // Enhanced Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;
  let scrollTimeout;

  function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      navbar.classList.add("scrolled");

      if (scrollTop > lastScrollTop && scrollTop > 300) {
        // Scrolling down - hide navbar
        navbar.style.transform = "translateY(-100%)";
      } else {
        // Scrolling up - show navbar
        navbar.style.transform = "translateY(0)";
      }
    } else {
      navbar.classList.remove("scrolled");
      navbar.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  }

  // Throttled scroll event
  window.addEventListener("scroll", function () {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleNavbarScroll, 10);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 100;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Enhanced Card Hover Effects
  const enhancedCards = document.querySelectorAll(
    ".enhanced-card, .enhanced-card-dark"
  );
  enhancedCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";

      const icon = this.querySelector(".enhanced-icon");
      if (icon) {
        icon.style.transform = "scale(1.1) rotate(5deg)";
        icon.style.boxShadow = "0 10px 25px rgba(255, 215, 0, 0.3)";
      }
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";

      const icon = this.querySelector(".enhanced-icon");
      if (icon) {
        icon.style.transform = "scale(1) rotate(0deg)";
        icon.style.boxShadow = "none";
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  // Feature items animation
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".feature-item").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
    item.style.transition = "all 0.6s ease";
    featureObserver.observe(item);
  });

  // Stats animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const finalValue = stat.textContent;
          if (finalValue.includes("+")) {
            const number = parseInt(finalValue.replace("+", ""));
            animateNumber(stat, 0, number, "+");
          } else if (finalValue.includes("%")) {
            const number = parseInt(finalValue.replace("%", ""));
            animateNumber(stat, 0, number, "%");
          } else {
            const number = parseInt(finalValue);
            if (!isNaN(number)) {
              animateNumber(stat, 0, number, "");
            }
          }
        });
      }
    });
  }, observerOptions);

  const heroStats = document.querySelector(".hero-quick-stats");
  if (heroStats) {
    statsObserver.observe(heroStats);
  }

  // Number animation function
  function animateNumber(element, start, end, suffix) {
    const duration = 2000;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, stepTime);
  }

  // Process steps animation
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".process-step").forEach((step) => {
    processObserver.observe(step);
  });

  // Requirements items animation
  const requirementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".requirement-item").forEach((item) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";
    item.style.transition = "all 0.6s ease";
    requirementObserver.observe(item);
  });

  // Button ripple effect
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
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

  // Scroll progress indicator
  const progressBar = document.createElement("div");
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #ffd700, #4169e1);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = scrolled + "%";
  });

  // Image lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });

  // Enhanced form validation (if forms exist)
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", clearErrors);
    });

    form.addEventListener("submit", function (e) {
      let isValid = true;
      inputs.forEach((input) => {
        if (!validateField.call(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

  function validateField() {
    const value = this.value.trim();
    const type = this.type;
    const required = this.hasAttribute("required");

    clearErrors.call(this);

    if (required && !value) {
      showError.call(this, "This field is required");
      return false;
    }

    if (type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showError.call(this, "Please enter a valid email address");
        return false;
      }
    }

    if (type === "tel" && value) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(value.replace(/\s+/g, ""))) {
        showError.call(this, "Please enter a valid phone number");
        return false;
      }
    }

    return true;
  }

  function showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            display: block;
        `;
    this.parentNode.appendChild(errorDiv);
    this.style.borderColor = "#dc3545";
  }

  function clearErrors() {
    const errorMessage = this.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
    this.style.borderColor = "";
  }

  // Keyboard navigation enhancement
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });

  // Performance monitoring
  if ("PerformanceObserver" in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === "largest-contentful-paint") {
          console.log("LCP:", entry.startTime);
        }
      });
    });

    observer.observe({ entryTypes: ["largest-contentful-paint"] });
  }

  // Add CSS for ripple effect
  const style = document.createElement("style");
  style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
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
        
        .process-step.animate {
            animation: slideInUp 0.6s ease;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .keyboard-navigation *:focus {
            outline: 3px solid #ffd700 !important;
            outline-offset: 2px;
        }
        
        .navbar {
            transition: transform 0.3s ease, background-color 0.3s ease;
        }
        
        .navbar.scrolled {
            background-color: rgba(26, 26, 46, 0.95) !important;
            backdrop-filter: blur(10px);
        }
    `;
  document.head.appendChild(style);

  // Floating elements enhanced animation
  const floatingElements = document.querySelectorAll(".floating-icon");
  floatingElements.forEach((element, index) => {
    // Add random movement
    setInterval(() => {
      const randomX = Math.random() * 20 - 10;
      const randomY = Math.random() * 20 - 10;
      element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${
        Math.random() * 10 - 5
      }deg)`;
    }, 3000 + index * 500);
  });

  // Images are now static - parallax effect removed

  // CTA Trust indicators animation
  const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const trustNumbers = entry.target.querySelectorAll(".trust-number");
        trustNumbers.forEach((trust) => {
          const finalValue = trust.textContent;
          const number = parseInt(finalValue);
          if (!isNaN(number)) {
            animateNumber(trust, 0, number, "");
          }
        });
        trustObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const ctaTrustIndicators = document.querySelector(".cta-trust-indicators");
  if (ctaTrustIndicators) {
    trustObserver.observe(ctaTrustIndicators);
  }

  // CTA buttons enhanced animations
  const ctaButtons = document.querySelectorAll(".cta-actions .btn");
  ctaButtons.forEach((button, index) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = `translateY(-3px) scale(1.02)`;
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = `translateY(0) scale(1)`;
    });

    // Staggered animation on scroll
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 100);
          ctaObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    button.style.opacity = "0";
    button.style.transform = "translateY(20px)";
    button.style.transition = "all 0.6s ease";
    ctaObserver.observe(button);
  });

  // CTA features animation
  const ctaFeatures = document.querySelectorAll(".cta-feature-item");
  ctaFeatures.forEach((feature, index) => {
    const featureObserverCTA = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateX(0)";
          }, index * 150);
          featureObserverCTA.unobserve(entry.target);
        }
      });
    }, observerOptions);

    feature.style.opacity = "0";
    feature.style.transform = "translateX(-30px)";
    feature.style.transition = "all 0.6s ease";
    featureObserverCTA.observe(feature);
  });

  console.log("Retirement Visa page initialized successfully");
});
