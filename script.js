/* ============================================
   اغتيال المصداقية — script.js
   خلدون أكرم عكرمة × Antigravity
   © 2026 — 𝓚𝓱𝓪𝓵𝓭𝓸𝓾𝓷𝓐𝓴𝓻𝓪𝓶𝓪𝓱
============================================ */

'use strict';

/* ─── Custom Cursor ──────────────────── */
(function initCursor() {
  const glow = document.getElementById('cursor-glow');
  const dot  = document.getElementById('cursor-dot');
  if (!glow || !dot) return;

  let mx = 0, my = 0, gx = 0, gy = 0;
  const speed = 0.075;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Smooth glow lag
  (function animateGlow() {
    gx += (mx - gx) * speed;
    gy += (my - gy) * speed;
    glow.style.left = gx + 'px';
    glow.style.top  = gy + 'px';
    requestAnimationFrame(animateGlow);
  })();

  // Cursor interaction states
  const interactives = document.querySelectorAll(
    'a, button, .q-card, .label-card, .trend-step'
  );
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width  = '16px';
      dot.style.height = '16px';
      dot.style.background = 'rgba(196,163,90,0.7)';
      glow.style.background = 'radial-gradient(circle, rgba(196,163,90,0.18) 0%, rgba(196,163,90,0.06) 40%, transparent 70%)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width  = '7px';
      dot.style.height = '7px';
      dot.style.background = '#C4A35A';
      glow.style.background = 'radial-gradient(circle, rgba(196,163,90,0.10) 0%, rgba(196,163,90,0.04) 40%, transparent 70%)';
    });
  });

  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
    dot.style.opacity  = '0';
  });
  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
    dot.style.opacity  = '1';
  });
})();

/* ─── Scroll Reveal ──────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  els.forEach(el => io.observe(el));
})();

/* ─── Parallax ───────────────────────── */
(function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = [
    { selector: '.s1-image img',    rate: 0.10 },
    { selector: '.s2-image img',    rate: 0.12 },
    { selector: '.s4-image img',    rate: 0.10 },
    { selector: '.s3-fullwidth img',rate: 0.08 },
    { selector: '.s6-bg img',       rate: 0.06 },
  ];

  const items = targets.map(t => ({
    el: document.querySelector(t.selector),
    rate: t.rate,
  })).filter(i => i.el);

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const sy = window.scrollY;
        items.forEach(({ el, rate }) => {
          const parent = el.parentElement;
          const rect   = parent.getBoundingClientRect();
          const offset = (rect.top + sy - (window.scrollY + window.innerHeight / 2)) * rate;
          el.style.transform = `translateY(${offset}px) scale(1.08)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ─── Hero Background Zoom ───────────── */
(function initHeroZoom() {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  requestAnimationFrame(() => {
    setTimeout(() => bg.classList.add('loaded'), 80);
  });
})();

/* ─── Question Cards Keyboard ─────────── */
(function initQCards() {
  document.querySelectorAll('.q-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('active');
      }
    });
  });
})();

/* ─── Smooth Scroll Anchors ──────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
