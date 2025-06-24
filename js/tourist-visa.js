// Tourist Visa Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
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

  // Enhanced navbar behavior
  const navbar = document.querySelector(".navbar");
  let lastScrollTop = 0;
  let scrollTimeout;

  function handleScroll() {
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

    // Clear existing timeout
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    // Show navbar after scrolling stops
    scrollTimeout = setTimeout(() => {
      navbar.style.transform = "translateY(0)";
    }, 150);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if href is just "#" or empty
      if (href === "#" || href.length <= 1) {
        return;
      }

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Enhanced card hover effects
  const enhancedCards = document.querySelectorAll(
    ".enhanced-card, .enhanced-card-dark"
  );
  enhancedCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
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

  // Stats counter animation
  function animateNumber(element, start, end, suffix = "") {
    const duration = 2000;
    const increment = (end - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  // Stats animation on scroll
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const finalValue = stat.textContent;
          const number = parseInt(finalValue);
          if (!isNaN(number)) {
            animateNumber(stat, 0, number, finalValue.replace(number, ""));
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const heroStats = document.querySelector(".hero-quick-stats");
  if (heroStats) {
    statsObserver.observe(heroStats);
  }

  // Requirements animation
  const requirementsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const items = entry.target.querySelectorAll(".requirement-item");
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
          }, index * 100);
        });
        requirementsObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".requirements-list").forEach((list) => {
    const items = list.querySelectorAll(".requirement-item");
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-30px)";
      item.style.transition = "all 0.6s ease";
    });
    requirementsObserver.observe(list);
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
  const scrollProgress = document.createElement("div");
  scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #ffd700, #ffed4e);
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(scrollProgress);

  window.addEventListener("scroll", () => {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    scrollProgress.style.width = scrolled + "%";
  });

  // Enhanced image loading with lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        img.style.opacity = "1";
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img").forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.6s ease";
    if (img.complete) {
      img.style.opacity = "1";
    } else {
      imageObserver.observe(img);
    }
  });

  // Form validation and accessibility
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const inputs = this.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "#dc3545";
          input.setAttribute("aria-invalid", "true");
        } else {
          input.style.borderColor = "";
          input.setAttribute("aria-invalid", "false");
        }
      });

      if (!isValid) {
        e.preventDefault();
      }
    });
  });

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
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const loadTime =
        performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log(`Tourist Visa page loaded in ${loadTime}ms`);
    });
  }

  // CTA Features animation
  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const features = entry.target.querySelectorAll(".cta-feature-item");
        features.forEach((feature, index) => {
          setTimeout(() => {
            feature.style.opacity = "1";
            feature.style.transform = "translateX(0)";
          }, index * 150);
        });
        ctaObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const ctaFeatures = document.querySelector(".cta-features");
  if (ctaFeatures) {
    const items = ctaFeatures.querySelectorAll(".cta-feature-item");
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";
      item.style.transition = "all 0.6s ease";
    });
    ctaObserver.observe(ctaFeatures);
  }

  // Enhanced card grid animation
  const cardGridObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll(
          ".enhanced-card, .enhanced-card-dark"
        );
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, index * 100);
        });
        cardGridObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".row").forEach((row) => {
    const cards = row.querySelectorAll(".enhanced-card, .enhanced-card-dark");
    if (cards.length > 0) {
      cards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease";
      });
      cardGridObserver.observe(row);
    }
  });

  // Images are now static - no parallax effect

  console.log("Tourist Visa page initialized successfully");
});
