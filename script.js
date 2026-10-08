/* =========================================================
   IRONPULSE FITNESS — SCRIPT.JS
   Vanilla JavaScript only. Sections:
   1. Sticky navbar + scroll progress
   2. Mobile hamburger menu
   3. Smooth scroll + active nav link tracking
   4. Reveal-on-scroll (IntersectionObserver)
   5. Hero typing effect
   6. Counter animation for hero stats
   7. Button ripple effect
   8. BMI calculator
   9. Gallery lightbox
   10. Testimonial auto-slider
   11. FAQ accordion
   12. Contact form validation
   13. Newsletter form
   14. Back to top button
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------
     1. STICKY NAVBAR + SCROLL PROGRESS BAR
  --------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function handleScrollEffects() {
    const scrollY = window.scrollY;

    // Navbar background toggle
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    // Back to top visibility
    if (scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------------------------------------------
     2. MOBILE HAMBURGER MENU
  --------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* ---------------------------------------------------
     3. SMOOTH SCROLL + ACTIVE NAV LINK TRACKING
  --------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 90;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  /* ---------------------------------------------------
     4. REVEAL ON SCROLL (IntersectionObserver)
  --------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Small stagger for elements revealing together
        setTimeout(() => entry.target.classList.add('in-view'), i * 40);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------
     5. HERO TYPING EFFECT
  --------------------------------------------------- */
  const typingEl = document.getElementById('typingText');
  const typingWords = ['DREAM BODY', 'REAL STRENGTH', 'PEAK PERFORMANCE', 'LASTING HABITS'];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const currentWord = typingWords[wordIndex];

    if (!deleting) {
      charIndex++;
      typingEl.textContent = currentWord.slice(0, charIndex);
      if (charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = currentWord.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
      }
    }

    setTimeout(typeLoop, deleting ? 45 : 90);
  }

  if (typingEl) {
    typingEl.textContent = '';
    setTimeout(typeLoop, 900);
  }

  /* ---------------------------------------------------
     6. COUNTER ANIMATION FOR HERO STATS
  --------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const suffix = stat.dataset.suffix || '';
      const isDecimal = stat.dataset.decimal !== undefined;
      const target = isDecimal ? parseFloat(stat.dataset.decimal) : parseInt(stat.dataset.target, 10);
      const duration = 1800;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        const value = target * eased;
        stat.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          stat.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
        }
      }
      requestAnimationFrame(tick);
    });
  }

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
          countersStarted = true;
          animateCounters();
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    statsObserver.observe(heroStats);
  }

  /* ---------------------------------------------------
     7. BUTTON RIPPLE EFFECT
  --------------------------------------------------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.classList.add('ripple-circle');
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });

  /* ---------------------------------------------------
     8. BMI CALCULATOR
  --------------------------------------------------- */
  const calcBmiBtn = document.getElementById('calcBmiBtn');
  const bmiHeight = document.getElementById('bmiHeight');
  const bmiWeight = document.getElementById('bmiWeight');
  const bmiError = document.getElementById('bmiError');
  const bmiResult = document.getElementById('bmiResult');
  const bmiValue = document.getElementById('bmiValue');
  const bmiCategory = document.getElementById('bmiCategory');
  const bmiAdvice = document.getElementById('bmiAdvice');
  const bmiPointer = document.getElementById('bmiPointer');

  function getBmiCategory(bmi) {
    if (bmi < 18.5) {
      return {
        label: 'Underweight',
        color: '#4aa3ff',
        pointer: (bmi / 18.5) * 20,
        advice: 'You may benefit from a structured strength program and a calorie-surplus nutrition plan. Our coaches can build a safe plan to help you gain healthy mass.'
      };
    } else if (bmi < 25) {
      return {
        label: 'Healthy',
        color: '#4CAF50',
        pointer: 20 + ((bmi - 18.5) / (25 - 18.5)) * 30,
        advice: 'Great work — you\'re in the healthy range. Focus on strength and conditioning work to maintain and improve your fitness level.'
      };
    } else if (bmi < 30) {
      return {
        label: 'Overweight',
        color: '#ffb300',
        pointer: 50 + ((bmi - 25) / (30 - 25)) * 20,
        advice: 'A mix of resistance training and cardio, paired with a guided nutrition plan, can help you move toward a healthier range sustainably.'
      };
    } else {
      const pointer = Math.min(70 + ((bmi - 30) / 10) * 30, 100);
      return {
        label: 'Obese',
        color: '#ff4d4d',
        pointer,
        advice: 'We recommend booking a free assessment with one of our coaches to design a safe, progressive plan tailored to your starting point.'
      };
    }
  }

  function calculateBmi() {
    const heightCm = parseFloat(bmiHeight.value);
    const weightKg = parseFloat(bmiWeight.value);

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      bmiError.textContent = 'Please enter a valid height and weight to calculate your BMI.';
      bmiResult.classList.remove('show');
      return;
    }

    bmiError.textContent = '';

    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const info = getBmiCategory(bmi);

    bmiValue.textContent = bmi.toFixed(1);
    bmiCategory.textContent = info.label;
    bmiCategory.style.background = info.color + '33';
    bmiCategory.style.color = info.color;
    bmiAdvice.textContent = info.advice;
    bmiPointer.style.left = Math.min(Math.max(info.pointer, 2), 98) + '%';

    bmiResult.classList.add('show');
  }

  if (calcBmiBtn) {
    calcBmiBtn.addEventListener('click', calculateBmi);
    [bmiHeight, bmiWeight].forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calculateBmi();
      });
    });
  }

  /* ---------------------------------------------------
     9. GALLERY LIGHTBOX
  --------------------------------------------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let currentGalleryIndex = 0;

  function openLightbox(index) {
    currentGalleryIndex = index;
    const item = galleryItems[index];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img').alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showRelativeImage(step) {
    currentGalleryIndex = (currentGalleryIndex + step + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentGalleryIndex];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector('img').alt;
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', () => showRelativeImage(1));
    lightboxPrev.addEventListener('click', () => showRelativeImage(-1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showRelativeImage(1);
      if (e.key === 'ArrowLeft') showRelativeImage(-1);
    });
  }

  /* ---------------------------------------------------
     10. TESTIMONIAL AUTO-SLIDER
  --------------------------------------------------- */
  const testimonialTrack = document.getElementById('testimonialTrack');
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDotsContainer = document.getElementById('testimonialDots');
  let testimonialIndex = 0;
  let testimonialTimer;

  testimonialSlides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToTestimonial(i));
    testimonialDotsContainer.appendChild(dot);
  });

  const testimonialDots = testimonialDotsContainer.querySelectorAll('span');

  function goToTestimonial(index) {
    testimonialIndex = index;
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    testimonialDots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    resetTestimonialTimer();
  }

  function nextTestimonial() {
    goToTestimonial((testimonialIndex + 1) % testimonialSlides.length);
  }

  function resetTestimonialTimer() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(nextTestimonial, 5500);
  }

  if (testimonialTrack && testimonialSlides.length) {
    resetTestimonialTimer();
  }

  /* ---------------------------------------------------
     11. FAQ ACCORDION
  --------------------------------------------------- */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      accordionItems.forEach(other => other.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------------------------------------------------
     12. CONTACT FORM VALIDATION
  --------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  const validators = {
    name: (val) => val.trim().length >= 2 ? '' : 'Please enter your full name.',
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Please enter a valid email address.',
    phone: (val) => /^[\d\s()+-]{7,20}$/.test(val.trim()) ? '' : 'Please enter a valid phone number.',
    message: (val) => val.trim().length >= 10 ? '' : 'Message should be at least 10 characters.'
  };

  function validateField(fieldName) {
    const input = document.getElementById(fieldName);
    const errorEl = document.getElementById(fieldName + 'Error');
    const errorMsg = validators[fieldName](input.value);

    errorEl.textContent = errorMsg;
    input.closest('.form-group').classList.toggle('invalid', Boolean(errorMsg));
    return !errorMsg;
  }

  if (contactForm) {
    ['name', 'email', 'phone', 'message'].forEach(fieldName => {
      const input = document.getElementById(fieldName);
      input.addEventListener('blur', () => validateField(fieldName));
      input.addEventListener('input', () => {
        if (input.closest('.form-group').classList.contains('invalid')) {
          validateField(fieldName);
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = ['name', 'email', 'phone', 'message'];
      const allValid = fields.map(validateField).every(Boolean);

      if (allValid) {
        formSuccess.classList.add('show');
        contactForm.reset();
        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      } else {
        formSuccess.classList.remove('show');
      }
    });
  }

  /* ---------------------------------------------------
     13. NEWSLETTER FORM
  --------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      const btn = newsletterForm.querySelector('button');
      if (input.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
        const icon = btn.querySelector('i');
        icon.className = 'fa-solid fa-check';
        input.value = '';
        setTimeout(() => { icon.className = 'fa-solid fa-paper-plane'; }, 2200);
      }
    });
  }

  /* ---------------------------------------------------
     14. FOOTER YEAR
  --------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});