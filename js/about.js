let aboutCurrentSlide = 0;
const aboutSlides = document.querySelectorAll(".bg-slider .slide");
let aboutSlideInterval;

document.addEventListener("DOMContentLoaded", function () {
  initializeAboutPage();
  initializeAOSAnimations();
  setupScrollAnimations();
  setupBackgroundSlider();
  setupStatCounters();
  setupFloatingElements();
});

function initializeAboutPage() {
  // Smooth scroll for indicators
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      const targetSection = document.querySelector(".about-story");
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Enhanced hover effects for service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Parallax effect for floating elements
  window.addEventListener("scroll", handleParallaxEffect);
}

// ======================
// Initialize AOS Animations
// ======================
function initializeAOSAnimations() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
      delay: 0,
      anchorPlacement: "top-bottom",
    });

    // Custom animation triggers
    const customAnimationElements = document.querySelectorAll(
      "[data-custom-animation]"
    );
    customAnimationElements.forEach((element) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerCustomAnimation(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(element);
    });
  }
}

// ======================
// Background Slider
// ======================
function setupBackgroundSlider() {
  if (aboutSlides.length > 0) {
    // Start auto-slide
    startAboutSlider();

    // Pause slider on hover
    const heroSection = document.querySelector(".about-hero");
    if (heroSection) {
      heroSection.addEventListener("mouseenter", pauseAboutSlider);
      heroSection.addEventListener("mouseleave", startAboutSlider);
    }
  }
}

function changeAboutSlide(index) {
  if (aboutSlides[aboutCurrentSlide]) {
    aboutSlides[aboutCurrentSlide].classList.remove("active");
  }

  aboutCurrentSlide = index >= aboutSlides.length ? 0 : index;

  if (aboutSlides[aboutCurrentSlide]) {
    aboutSlides[aboutCurrentSlide].classList.add("active");
  }
}

function nextAboutSlide() {
  changeAboutSlide(aboutCurrentSlide + 1);
}

function startAboutSlider() {
  if (aboutSlideInterval) clearInterval(aboutSlideInterval);
  aboutSlideInterval = setInterval(nextAboutSlide, 4000);
}

function pauseAboutSlider() {
  if (aboutSlideInterval) {
    clearInterval(aboutSlideInterval);
    aboutSlideInterval = null;
  }
}

// ======================
// Scroll Animations
// ======================
function setupScrollAnimations() {
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Add animated class
        element.classList.add("animate-in");

        // Trigger specific animations based on element
        if (element.classList.contains("why-card")) {
          animateWhyCard(element);
        } else if (element.classList.contains("service-card")) {
          animateServiceCard(element);
        } else if (element.classList.contains("value-item")) {
          animateValueItem(element);
        }
      }
    });
  }, observerOptions);

  // Observe elements
  const animatableElements = document.querySelectorAll(
    ".why-card, .service-card, .value-item, .story-image"
  );
  animatableElements.forEach((element) => {
    scrollObserver.observe(element);
  });
}

// ======================
// Element Animations
// ======================
function animateWhyCard(element) {
  const icon = element.querySelector(".why-icon");
  if (icon) {
    setTimeout(() => {
      icon.style.transform = "rotate(360deg) scale(1.1)";
      setTimeout(() => {
        icon.style.transform = "rotate(0deg) scale(1)";
      }, 600);
    }, 200);
  }
}

function animateServiceCard(element) {
  const icon = element.querySelector(".service-icon");
  const tags = element.querySelectorAll(".feature-tag");

  if (icon) {
    setTimeout(() => {
      icon.style.animation = "bounce 0.6s ease";
    }, 300);
  }

  tags.forEach((tag, index) => {
    setTimeout(() => {
      tag.style.transform = "scale(1.1)";
      setTimeout(() => {
        tag.style.transform = "scale(1)";
      }, 200);
    }, 400 + index * 80); // Reduced delay for more tags
  });

  // Special animation for visa service card (3rd card)
  if (element.querySelector('h3[data-en="UAE Visas"]')) {
    setTimeout(() => {
      element.style.transform += " rotateY(5deg)";
      setTimeout(() => {
        element.style.transform = element.style.transform.replace(
          " rotateY(5deg)",
          ""
        );
      }, 300);
    }, 600);
  }
}

function animateValueItem(element) {
  const icon = element.querySelector(".value-icon");
  if (icon) {
    setTimeout(() => {
      icon.style.transform = "scale(1.2) rotate(10deg)";
      setTimeout(() => {
        icon.style.transform = "scale(1) rotate(0deg)";
      }, 300);
    }, 200);
  }
}

// ======================
// Counter Animation
// ======================
function setupStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    counterObserver.observe(stat);
  });
}

function animateCounter(element) {
  const target = parseInt(element.textContent.replace(/\+|%/g, ""));
  const suffix = element.textContent.includes("+")
    ? "+"
    : element.textContent.includes("%")
    ? "%"
    : "";
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current) + suffix;
  }, 16);
}

// ======================
// Floating Elements Animation
// ======================
function setupFloatingElements() {
  const floatingElements = document.querySelectorAll(
    ".floating-element, .floating-stats"
  );

  floatingElements.forEach((element, index) => {
    // Add unique animation delays
    element.style.animationDelay = `${index * 0.5}s`;

    // Add mouseover effects
    element.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
      this.style.transform = "translateY(-10px) scale(1.1)";
    });

    element.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
      this.style.transform = "";
    });
  });

  // Setup new floating icons
  const floatingIcons = document.querySelectorAll(".floating-icon");
  floatingIcons.forEach((icon, index) => {
    icon.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.2) rotate(45deg)";
      this.style.borderColor = "var(--primary-gold)";
      this.style.background = "rgba(221, 189, 127, 0.4)";
    });

    icon.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.borderColor = "";
      this.style.background = "";
    });
  });

  // Setup morphing shapes
  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape, index) => {
    setInterval(() => {
      const randomScale = 0.8 + Math.random() * 0.4;
      const randomOpacity = 0.2 + Math.random() * 0.3;
      shape.style.transform += ` scale(${randomScale})`;
      shape.style.opacity = randomOpacity;
    }, 3000 + index * 1000);
  });
}

// ======================
// Parallax Effect
// ======================
function handleParallaxEffect() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(
    ".floating-element, .hero-badge"
  );

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

// ======================
// Text Animation Effects
// ======================
function animateText(element, delay = 0) {
  const text = element.textContent;
  const letters = text.split("");
  element.textContent = "";

  letters.forEach((letter, index) => {
    const span = document.createElement("span");
    span.textContent = letter === " " ? "\u00A0" : letter;
    span.style.opacity = "0";
    span.style.transform = "translateY(20px)";
    span.style.transition = `all 0.3s ease ${delay + index * 50}ms`;
    element.appendChild(span);

    setTimeout(() => {
      span.style.opacity = "1";
      span.style.transform = "translateY(0)";
    }, delay + index * 50);
  });
}

// ======================
// Custom Animation Triggers
// ======================
function triggerCustomAnimation(element) {
  const animationType = element.getAttribute("data-custom-animation");

  switch (animationType) {
    case "text-reveal":
      animateText(element);
      break;
    case "scale-in":
      element.style.transform = "scale(0)";
      element.style.opacity = "0";
      setTimeout(() => {
        element.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        element.style.transform = "scale(1)";
        element.style.opacity = "1";
      }, 100);
      break;
    case "slide-up":
      element.style.transform = "translateY(50px)";
      element.style.opacity = "0";
      setTimeout(() => {
        element.style.transition = "all 0.8s ease";
        element.style.transform = "translateY(0)";
        element.style.opacity = "1";
      }, 100);
      break;
  }
}

// ======================
// Interactive Hover Effects
// ======================
function setupHoverEffects() {
  // Enhanced card hover effects
  const interactiveCards = document.querySelectorAll(
    ".service-card, .why-card"
  );

  interactiveCards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
}

// ======================
// Performance Optimization
// ======================
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

// Optimize scroll handler
const optimizedParallaxHandler = debounce(handleParallaxEffect, 10);
window.addEventListener("scroll", optimizedParallaxHandler);

// ======================
// Cleanup on Page Unload
// ======================
window.addEventListener("beforeunload", function () {
  if (aboutSlideInterval) {
    clearInterval(aboutSlideInterval);
  }
});

// ======================
// Error Handling
// ======================
window.addEventListener("error", function (e) {
  console.warn("About page script error:", e.message);
});

// ======================
// Mobile Optimizations
// ======================
function setupMobileOptimizations() {
  if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    const complexAnimations = document.querySelectorAll("[data-aos]");
    complexAnimations.forEach((element) => {
      element.setAttribute("data-aos-duration", "600");
      element.setAttribute("data-aos-delay", "0");
    });

    // Disable parallax on mobile for performance
    window.removeEventListener("scroll", optimizedParallaxHandler);
  }
}

// Initialize mobile optimizations
setupMobileOptimizations();
setupHoverEffects();

// Re-initialize on resize
window.addEventListener("resize", debounce(setupMobileOptimizations, 250));

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
