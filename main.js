// ===== Wink Self Photo Studio — Main JS =====

// --- Scroll Reveal (IntersectionObserver) ---
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // --- Floating CTA visibility ---
  const floatingCta = document.querySelector('.floating-cta');
  if (floatingCta) {
    window.addEventListener('scroll', () => {
      floatingCta.classList.toggle('visible', window.scrollY > 500);
    });
  }

  // --- Feather icons ---
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
});

// --- Mobile Menu ---
window.toggleMenu = function() {
  const panel = document.querySelector('.mobile-nav-panel');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (panel && overlay) {
    panel.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = panel.classList.contains('active') ? 'hidden' : '';
  }
};

window.closeMenu = function() {
  const panel = document.querySelector('.mobile-nav-panel');
  const overlay = document.querySelector('.mobile-nav-overlay');
  if (panel && overlay) {
    panel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

// --- Video Modal ---
window.openVideoModal = function() {
  const modal = document.getElementById('video-modal');
  if (modal) modal.classList.add('active');
};

window.closeVideoModal = function() {
  const modal = document.getElementById('video-modal');
  if (modal) modal.classList.remove('active');
};

// Close modal on outside click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('video-modal');
  if (modal && e.target === modal) closeVideoModal();
});
