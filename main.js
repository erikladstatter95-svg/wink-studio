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

  // --- Dropdown Toggle on Click (Desktop) ---
  const dropdownToggle = document.querySelector('.nav-dropdown-toggle');
  const dropdownItem = document.querySelector('.nav-item-dropdown');
  if (dropdownToggle && dropdownItem) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownItem.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('active');
      }
    });
  }

  // --- Dropdown Toggle on Click (Mobile) ---
  const mobileToggleRow = document.querySelector('.mobile-nav-toggle-row');
  const mobileDropdownSub = document.querySelector('.mobile-dropdown-sub');
  if (mobileToggleRow && mobileDropdownSub) {
    mobileToggleRow.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileToggleRow.classList.toggle('active');
      mobileDropdownSub.classList.toggle('active');
    });
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

// --- Studio Gallery Interactive Slider ---
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('gallery-track');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  if (!track) return;

  let pos = 0;
  const speed = 0.8; // Velocidad estándar de movimiento continuo
  let isDragging = false;
  let startX = 0;
  let dragStartPos = 0;
  let targetDelta = 0;
  let animId = null;

  // Ancho de la mitad del contenido para loop infinito sin saltos
  function getHalfWidth() {
    return track.scrollWidth / 2;
  }

  function loop() {
    if (!isDragging) {
      // Movimiento continuo natural hacia la izquierda
      pos -= speed;
      // Añadir inercia o movimiento por botones si hubiera
      if (Math.abs(targetDelta) > 0.1) {
        pos += targetDelta * 0.1;
        targetDelta *= 0.9;
      }
    }

    const halfWidth = getHalfWidth();
    if (halfWidth > 0) {
      while (pos <= -halfWidth) pos += halfWidth;
      while (pos > 0) pos -= halfWidth;
    }

    track.style.transform = `translate3d(${pos}px, 0, 0)`;
    animId = requestAnimationFrame(loop);
  }

  animId = requestAnimationFrame(loop);

  // Botones Prev / Next
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      targetDelta += 320;
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      targetDelta -= 320;
    });
  }

  // Soporte Mouse Drag y Touch Swipe
  function handlePointerDown(e) {
    isDragging = true;
    track.classList.add('is-dragging');
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    dragStartPos = pos;
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    pos = dragStartPos + diff;

    const halfWidth = getHalfWidth();
    if (halfWidth > 0) {
      while (pos <= -halfWidth) pos += halfWidth;
      while (pos > 0) pos -= halfWidth;
    }
  }

  function handlePointerUp() {
    if (isDragging) {
      isDragging = false;
      track.classList.remove('is-dragging');
    }
  }

  track.addEventListener('mousedown', handlePointerDown);
  window.addEventListener('mousemove', handlePointerMove);
  window.addEventListener('mouseup', handlePointerUp);

  track.addEventListener('touchstart', handlePointerDown, { passive: true });
  window.addEventListener('touchmove', handlePointerMove, { passive: true });
  window.addEventListener('touchend', handlePointerUp);
});
