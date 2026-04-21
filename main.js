// JavaScript for Self Portrait Studio Interaction

// Modal Logic
window.openVideoModal = function() {
  document.getElementById('video-modal').classList.add('active');
};

window.closeVideoModal = function() {
  document.getElementById('video-modal').classList.remove('active');
};

// Close modal on outside click
document.getElementById('video-modal').addEventListener('click', function(e) {
  if (e.target === this) {
    closeVideoModal();
  }
});

// Mobile menu toggle mockup
window.toggleMenu = function() {
  alert("Menú móvil en desarrollo (Mockup).");
}

// Backdrop Gallery Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
  const colorBtns = document.querySelectorAll('.color-btn');
  const studioBackdrop = document.getElementById('studio-backdrop');
  const backdropInfo = document.getElementById('backdrop-info');

  const backdropData = {
    'negro': {
      color: '#0F0F0F',
      title: 'Negro Profundo',
      desc: 'Ideal para retratos dramáticos, formales y artísticos.'
    },
    'blanco': {
      color: '#F8F9FA',
      title: 'Blanco Puro',
      desc: 'Luminoso, limpio y perfecto para fotos de moda o familiares.'
    },
    'rojo': {
      color: '#5C161E',
      title: 'Rojo Oscuro',
      desc: 'Sofisticado y apasionado. Excelente para destacar texturas y retratos audaces.'
    },
    'gris': {
      color: '#6C757D',
      title: 'Gris Corporativo',
      desc: 'Neutral y elegante. La mejor elección para fotos de perfil o LinkedIn.'
    },
    'eggshell': {
      color: '#F0E6D2',
      title: 'Eggshell (Cáscara de Huevo)',
      desc: 'Cálido, suave y familiar. Transmite paz y naturalidad.'
    }
  };

  colorBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active class from all
      colorBtns.forEach(b => b.classList.remove('active'));
      
      // Add active to clicked
      const targetBtn = e.target;
      targetBtn.classList.add('active');

      // Update color and info
      const colorKey = targetBtn.getAttribute('data-color');
      const data = backdropData[colorKey];

      if (data) {
        studioBackdrop.style.backgroundColor = data.color;
        
        // Add a subtle animation to info update
        backdropInfo.style.opacity = 0;
        setTimeout(() => {
          backdropInfo.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.desc}</p>
          `;
          backdropInfo.style.opacity = 1;
        }, 300);
      }
    });
  });
});
