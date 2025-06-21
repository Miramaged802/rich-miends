
      // Premium Animation Features

      // Magnetic Effect for Interactive Elements
      function initMagneticButtons() {
        const magneticElements = document.querySelectorAll(
          ".submit-btn, .whatsapp-cta, .call-cta, .contact-icon"
        );

        magneticElements.forEach((element) => {
          element.addEventListener("mousemove", (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            element.style.transform = `translate(${x * 0.15}px, ${
              y * 0.15
            }px) scale(1.05)`;
            element.style.transition = "transform 0.1s ease-out";
          });

          element.addEventListener("mouseleave", () => {
            element.style.transform = "translate(0px, 0px) scale(1)";
            element.style.transition = "transform 0.3s ease-out";
          });
        });
      }

      // Advanced Typing Effect
      function createTypingEffect() {
        const heroTitle = document.querySelector(".contact-hero h1");
        if (heroTitle) {
          const text = heroTitle.textContent;
          heroTitle.textContent = "";

          let i = 0;
          const typeInterval = setInterval(() => {
            heroTitle.textContent += text.charAt(i);
            i++;

            if (i >= text.length) {
              clearInterval(typeInterval);
              // Add cursor blink effect
              heroTitle.style.borderRight = "3px solid var(--primary-gold)";
              setTimeout(() => {
                heroTitle.style.borderRight = "none";
              }, 2000);
            }
          }, 100);
        }
      }

      // 3D Card Hover Effects
      function init3DCards() {
        document.querySelectorAll(".contact-info-card").forEach((card) => {
          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;

            card.style.transform = `
              perspective(1000px) 
              rotateX(${rotateX}deg) 
              rotateY(${rotateY}deg) 
              translateY(-10px) 
              scale(1.02)
            `;
            card.style.boxShadow = "0 25px 80px rgba(0, 0, 0, 0.2)";
          });

          card.addEventListener("mouseleave", () => {
            card.style.transform =
              "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
            card.style.boxShadow = "";
          });
        });
      }

      // Dynamic Floating Elements
      function createFloatingElements() {
        const hero = document.querySelector(".contact-hero");
        const icons = [
          "fas fa-star",
          "fas fa-heart",
          "fas fa-gem",
          "fas fa-award",
        ];

        setInterval(() => {
          if (Math.random() > 0.7) {
            const element = document.createElement("div");
            element.innerHTML = `<i class="${
              icons[Math.floor(Math.random() * icons.length)]
            }"></i>`;
            element.style.cssText = `
              position: absolute;
              top: 100%;
              left: ${Math.random() * 100}%;
              color: rgba(221, 189, 127, 0.4);
              font-size: ${Math.random() * 1 + 0.5}rem;
              animation: floatUp 8s linear forwards;
              pointer-events: none;
              z-index: 1;
            `;

            hero.appendChild(element);

            setTimeout(() => {
              element.remove();
            }, 8000);
          }
        }, 2000);
      }

      // Enhanced Form Interactions
      function enhanceFormAnimations() {
        const form = document.getElementById("contactForm");
        const inputs = form.querySelectorAll(".form-control");

        inputs.forEach((input) => {
          // Focus wave effect
          input.addEventListener("focus", function () {
            const wave = document.createElement("div");
            wave.style.cssText = `
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(45deg, transparent, rgba(221, 189, 127, 0.1), transparent);
              border-radius: 15px;
              animation: waveEffect 1s ease-out;
              pointer-events: none;
              z-index: -1;
            `;

            this.parentElement.appendChild(wave);

            setTimeout(() => {
              wave.remove();
            }, 1000);
          });

          // Success pulse effect
          input.addEventListener("input", function () {
            if (this.checkValidity() && this.value.length > 0) {
              this.style.animation = "successPulse 0.5s ease-out";
              setTimeout(() => {
                this.style.animation = "";
              }, 500);
            }
          });
        });
      }

      // Scroll-triggered Animations
      function initScrollAnimations() {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("animate-visible");
              }
            });
          },
          {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
          }
        );

        // Observe all animatable elements
        document
          .querySelectorAll(
            ".contact-info-card, .form-group, .contact-info-text"
          )
          .forEach((el) => {
            el.classList.add("animate-hidden");
            observer.observe(el);
          });
      }

      // Background Animation
      function initBackgroundAnimation() {
        const hero = document.querySelector(".contact-hero");

        // Create animated background overlay
        const overlay = document.createElement("div");
        overlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, 
            rgba(221, 189, 127, 0.1) 0%,
            transparent 25%,
            rgba(55, 105, 131, 0.1) 50%,
            transparent 75%,
            rgba(221, 189, 127, 0.1) 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease-in-out infinite;
          pointer-events: none;
          z-index: 2;
        `;

        hero.appendChild(overlay);
      }

      // Add all animation CSS
      const animationCSS = document.createElement("style");
      animationCSS.textContent = `
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes waveEffect {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes successPulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.4);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 0 10px rgba(40, 167, 69, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
          }
        }
        
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-hidden {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .contact-hero {
          background-image: linear-gradient(135deg, rgba(6, 6, 6, 0.8) 0%, rgba(55, 105, 131, 0.7) 100%), 
                           url('img/pexels-kindelmedia-7979605[1].jpg');
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }
        
        @media (max-width: 768px) {
          .contact-hero {
            background-attachment: scroll;
          }
        }
      `;
      document.head.appendChild(animationCSS);

      // Initialize all premium features
      document.addEventListener("DOMContentLoaded", function () {
        // Add delay to ensure all elements are loaded
        setTimeout(() => {
          initMagneticButtons();
          init3DCards();
          enhanceFormAnimations();
          initScrollAnimations();
          initBackgroundAnimation();

          // Start dynamic elements
          setTimeout(() => {
            createFloatingElements();
            createTypingEffect();
          }, 1000);
        }, 500);
      });

      console.log("🎨✨ Premium Contact Page Animations Loaded!");
      console.log(
        "🚀 Features: 3D Effects, Magnetic Interactions, Dynamic Background, Scroll Animations"
);
      

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
