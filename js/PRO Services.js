// PRO Services Page - JavaScript Functionality

// Initialize AOS (Animate On Scroll) when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS animations
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: true,
    mirror: false,
  });

  // PRO Services specific functionality
  console.log("PRO Services page loaded successfully!");
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

// Add interactive effects for PRO cards
function initializePROCards() {
  const proCards = document.querySelectorAll(
    ".pro-entity-card, .pro-service-card-dark, .pro-detailed-service"
  );

  proCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Initialize when page loads
window.addEventListener("load", function () {
  initializePROCards();

  // Ensure all sections are visible
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.display = "block";
    section.style.opacity = "1";
  });
});
