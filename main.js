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

// --- Self-Qualification Logic ---
window.switchQualifyTab = function(tabId) {
  document.querySelectorAll('.qualify-tab').forEach(btn => btn.classList.remove('active'));
  const btn = document.getElementById('tab-btn-' + tabId);
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.qualify-content').forEach(content => content.classList.remove('active'));
  const panel = document.getElementById('tab-' + tabId);
  if (panel) panel.classList.add('active');
};

window.toggleQualifyCheck = function(element, tabId) {
  element.classList.toggle('checked');
  
  const contentPanel = document.getElementById('tab-' + tabId);
  if (!contentPanel) return;
  
  const checkedCount = contentPanel.querySelectorAll('.qualify-item.checked').length;
  const totalCount = contentPanel.querySelectorAll('.qualify-item').length;
  
  const progressFill = contentPanel.querySelector('.qualify-progress-fill');
  const progressText = contentPanel.querySelector('.qualify-progress-text');
  
  if (progressFill) {
    const percentage = (checkedCount / totalCount) * 100;
    progressFill.style.width = percentage + '%';
  }
  
  const threshold = 3;
  if (checkedCount >= threshold) {
    if (progressText) progressText.textContent = "¡Tenés mucha afinidad con Wink!";
    const cta = contentPanel.querySelector('.qualify-cta');
    if (cta) cta.classList.add('visible');
  } else {
    if (progressText) progressText.textContent = "Tildá al menos " + threshold + " para ver tu resultado";
    const cta = contentPanel.querySelector('.qualify-cta');
    if (cta) cta.classList.remove('visible');
  }
};
