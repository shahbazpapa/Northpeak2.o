/* ==========================================================================
   NORTH PEAK DIGITAL MARKETING - INTERACTIVE SCRIPT ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initTypingEffect();
  initCounterAnimation();
  initRoiCalculator();
  initCaseStudyFilter();
  initModalBookingForm();
  initInlineForm();
  initModals();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Hamburger Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Dynamic Animated Text Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const phrases = [
    "Social Media Dominance",
    "High-ROAS Meta Ads",
    "Full-to-Full Marketing",
    "High-Ticket Clients",
    "Unstoppable Scale"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 45;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingDelay = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingDelay = 400;
    }

    setTimeout(type, typingDelay);
  }

  type();
}

/* --------------------------------------------------------------------------
   4. Animated Stat Counters
   -------------------------------------------------------------------------- */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length === 0) return;

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => observer.observe(stat));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals')) || 0;
    const duration = 2000;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = (easeOutProgress * target).toFixed(decimals);

      el.innerHTML = `${prefix}${currentVal}<span class="highlight">${suffix}</span>`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.innerHTML = `${prefix}${target}<span class="highlight">${suffix}</span>`;
      }
    }

    requestAnimationFrame(updateCount);
  }
}

/* --------------------------------------------------------------------------
   5. Interactive ROI & Growth Calculator
   -------------------------------------------------------------------------- */
function initRoiCalculator() {
  const spendSlider = document.getElementById('ad-spend-range');
  const roasSlider = document.getElementById('roas-range');
  const spendValDisplay = document.getElementById('ad-spend-val');
  const roasValDisplay = document.getElementById('roas-val');
  const projectedRevenueEl = document.getElementById('projected-revenue');
  const profitLiftEl = document.getElementById('projected-profit-lift');

  if (!spendSlider || !roasSlider) return;

  function calculateROI() {
    const spend = parseFloat(spendSlider.value);
    const currentRoas = parseFloat(roasSlider.value);

    const targetRoas = Math.max(currentRoas * 1.5, 4.2);
    const projectedRevenue = Math.round(spend * targetRoas);
    const projectedProfitLift = Math.round(projectedRevenue - (spend * currentRoas));

    spendValDisplay.textContent = `$${spend.toLocaleString()}`;
    roasValDisplay.textContent = `${currentRoas.toFixed(1)}x`;

    projectedRevenueEl.textContent = `$${projectedRevenue.toLocaleString()}`;
    profitLiftEl.textContent = `+$${projectedProfitLift.toLocaleString()}`;
  }

  spendSlider.addEventListener('input', calculateROI);
  roasSlider.addEventListener('input', calculateROI);
  calculateROI();
}

/* --------------------------------------------------------------------------
   6. Case Study Filter Tabs
   -------------------------------------------------------------------------- */
function initCaseStudyFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
      filterBtns.forEach(b => b.classList.add('btn-outline'));
      
      btn.classList.add('active', 'btn-primary');
      btn.classList.remove('btn-outline');

      const filter = btn.getAttribute('data-filter');

      caseCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. "Book A Call" Modal Booking Form Engine
   -------------------------------------------------------------------------- */
function initModalBookingForm() {
  const modalForm = document.getElementById('modal-booking-form');
  const formBox = document.getElementById('modal-form-body');
  const successBox = document.getElementById('modal-booking-success');

  if (!modalForm) return;

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('mb-name').value.trim();
    const phone = document.getElementById('mb-phone').value.trim();
    const email = document.getElementById('mb-email').value.trim();
    const serviceRadio = document.querySelector('input[name="mb_service"]:checked');
    const service = serviceRadio ? serviceRadio.value : 'Full-to-Full Marketing Handling';
    const datetime = document.getElementById('mb-datetime').value || 'Nearest Open Slot (Within 24h)';
    const refCode = 'NP-' + Math.floor(100000 + Math.random() * 900000);

    // Populate Summary Card
    document.getElementById('sum-name').textContent = name;
    document.getElementById('sum-email').textContent = email;
    document.getElementById('sum-phone').textContent = phone;
    document.getElementById('sum-service').textContent = service;
    document.getElementById('sum-time').textContent = datetime.replace('T', ' ');
    document.getElementById('sum-ref').textContent = refCode;

    // Switch View inside Modal
    formBox.style.display = 'none';
    successBox.classList.add('active');
  });

  // Reset modal when closed
  const modalCloseBtns = document.querySelectorAll('.modal-close, .reset-modal-btn');
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        if (formBox && successBox) {
          formBox.style.display = 'block';
          successBox.classList.remove('active');
          modalForm.reset();
        }
      }, 400);
    });
  });
}

/* --------------------------------------------------------------------------
   8. Inline Contact Form
   -------------------------------------------------------------------------- */
function initInlineForm() {
  const leadForm = document.getElementById('consultation-form');
  if (!leadForm) return;

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const serviceRadio = document.querySelector('input[name="inline_service"]:checked');
    const service = serviceRadio ? serviceRadio.value : 'Full-to-Full Marketing Handling';

    // Populate modal summary
    document.getElementById('sum-name').textContent = name;
    document.getElementById('sum-email').textContent = email;
    document.getElementById('sum-phone').textContent = phone;
    document.getElementById('sum-service').textContent = service;
    document.getElementById('sum-time').textContent = 'Consultation Call Request';
    document.getElementById('sum-ref').textContent = 'NP-' + Math.floor(100000 + Math.random() * 900000);

    // Show modal success
    const bookingModal = document.getElementById('booking-modal');
    const formBox = document.getElementById('modal-form-body');
    const successBox = document.getElementById('modal-booking-success');

    if (bookingModal) {
      formBox.style.display = 'none';
      successBox.classList.add('active');
      bookingModal.classList.add('active');
    }

    leadForm.reset();
  });
}

/* --------------------------------------------------------------------------
   9. Modal Handlers
   -------------------------------------------------------------------------- */
function initModals() {
  const modals = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close');
  const triggerBtns = document.querySelectorAll('[data-open-modal]');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        // Pre-select service if passed in data attribute
        const prefService = btn.getAttribute('data-service');
        if (prefService) {
          const radio = targetModal.querySelector(`input[value="${prefService}"]`);
          if (radio) radio.checked = true;
        }
        targetModal.classList.add('active');
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => m.classList.remove('active'));
    });
  });

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. Scroll Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
