// ============================================
// keyjey-portfolio script.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- enter portfolio (cover -> about) ---------- */
  const enterBtn = document.getElementById('enterPortfolioBtn');
  const aboutSection = document.getElementById('about');
  const coverEl = document.getElementById('cover');
  const sidebarLogo = document.querySelector('.sidebar .logo');
  const contentEl = document.querySelector('.content');

  const openAppView = () => {
    document.body.classList.add('app-visible');
    showPanel('about');
  };

  const openCoverView = () => {
    document.body.classList.remove('app-visible');
  };

  enterBtn.addEventListener('click', () => {
    if (enterBtn.classList.contains('is-loading')) return;
    enterBtn.classList.add('is-loading');
    setTimeout(() => {
      openAppView();
      enterBtn.classList.remove('is-loading');
    }, 650);
  });

  if (sidebarLogo && coverEl) {
    sidebarLogo.addEventListener('click', () => {
      openCoverView();
    });
  }

  /* ---------- sidebar nav: click to switch full-page panels ---------- */
  const navPills = Array.from(document.querySelectorAll('.nav-pill'));
  const panels = navPills.map(p => document.getElementById(p.dataset.target));

  const setActivePill = (id) => {
    navPills.forEach(p => p.classList.toggle('active', p.dataset.target === id));
  };

  function showPanel(id) {
    panels.forEach(panel => {
      if (panel) panel.classList.toggle('active', panel.id === id);
    });
    setActivePill(id);
    const activePanel = document.getElementById(id);
    if (activePanel) activePanel.scrollTop = 0;
  }

  navPills.forEach(pill => {
    pill.addEventListener('click', () => {
      showPanel(pill.dataset.target);
    });
  });

  /* ---------- carousels ---------- */
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const left = carousel.querySelector('.car-arrow--left');
    const right = carousel.querySelector('.car-arrow--right');

    const scrollByCard = (dir) => {
      const card = track.querySelector('.feature-card');
      const gap = 24; // matches CSS gap
      const distance = card ? card.offsetWidth + gap : 300;
      track.scrollBy({ left: dir * distance, behavior: 'smooth' });
    };

    left.addEventListener('click', () => scrollByCard(-1));
    right.addEventListener('click', () => scrollByCard(1));
  });

  /* ---------- lightbox (click-to-zoom) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxInner = document.getElementById('lightboxInner');
  const lightboxClose = document.getElementById('lightboxClose');

  const openLightbox = (mediaEl) => {
    const img = mediaEl.querySelector('img');
    if (img && img.src) {
      lightboxInner.style.backgroundImage = `url("${img.src}")`;
    } else {
      lightboxInner.style.background = getComputedStyle(mediaEl).background;
    }
    lightbox.classList.add('is-open');
    lightboxClose.focus();
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-zoomable]').forEach(card => {
    const media = card.querySelector('.feature-media');
    if (!media) return;
    media.addEventListener('click', () => openLightbox(media));
    media.setAttribute('tabindex', '0');
    media.setAttribute('role', 'button');
    media.setAttribute('aria-label', 'Click to zoom image');
    media.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(media);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
  });

  /* ---------- contact form (no backend wired up yet) ---------- */
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    note.textContent = "Thanks! This form isn't connected to an inbox yet — hook it up to a backend or a service like Formspree to start receiving messages.";
    form.reset();
  });

});