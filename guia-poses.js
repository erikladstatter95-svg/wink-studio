// ===== GUIA DE POSES — FUNNEL SCRIPT =====

// Mercado Pago configuration (Update with your live credentials)
const MP_CONFIG = {
  publicKey: "APP_USR-YOUR-PUBLIC-KEY-HERE", // Tu Public Key de Mercado Pago
  // Enlaces de pago directos de Mercado Pago Checkout Pro (Opcional, si usás link directo generado en tu cuenta de MP):
  links: {
    esencial: "https://mpago.la/pos-esencial", // Reemplazar por tu link de pago de $12.000
    vip: "https://mpago.la/pos-vip"            // Reemplazar por tu link de pago de $23.000
  }
};

let currentSelectedPackage = {
  id: 'esencial',
  title: 'Pack Esencial - Guía de Poses',
  price: 12000
};

document.addEventListener('DOMContentLoaded', () => {
  // Init Feather Icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // Top Banner Countdown Timer (14 mins 59 secs)
  startCountdown();
});

// --- Countdown Timer ---
function startCountdown() {
  const timerEl = document.getElementById('banner-timer');
  if (!timerEl) return;

  let totalSeconds = 14 * 60 + 59;

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 15 * 60; // Reset loop
    }
    totalSeconds--;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    timerEl.textContent = `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

// --- Checkout Modal Control ---
window.startCheckout = function(packageId, price) {
  currentSelectedPackage = {
    id: packageId,
    title: packageId === 'vip' ? 'Pack VIP + Parejas & Marcas' : 'Pack Esencial - Guía de Poses',
    price: price
  };

  const titleEl = document.getElementById('modal-product-title');
  const priceEl = document.getElementById('modal-product-price');
  const modal = document.getElementById('checkout-modal');

  if (titleEl) titleEl.textContent = currentSelectedPackage.title;
  if (priceEl) priceEl.textContent = `$${price.toLocaleString('es-AR')} ARS`;

  if (modal) modal.classList.add('active');
};

window.closeCheckoutModal = function() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('active');
};

// --- Form Submit & Mercado Pago Redirect ---
window.handleCheckoutSubmit = function(event) {
  event.preventDefault();

  const name = document.getElementById('buyer-name').value;
  const email = document.getElementById('buyer-email').value;
  const phone = document.getElementById('buyer-phone').value;

  const btn = document.getElementById('modal-pay-btn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i data-feather="loader"></i> Redirigiendo a Mercado Pago...';
    if (typeof feather !== 'undefined') feather.replace();
  }

  // Guardar datos temporales de la orden en sessionStorage
  sessionStorage.setItem('wink_order_data', JSON.stringify({
    buyer: { name, email, phone },
    product: currentSelectedPackage,
    orderId: 'WINK-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString()
  }));

  // Si tenés configurado un link de pago directo de Mercado Pago
  const directLink = MP_CONFIG.links[currentSelectedPackage.id];
  
  setTimeout(() => {
    // Si querés probar el flujo sin cobrar, redirige a la página de gracias simulada:
    // Para producción: window.location.href = directLink;
    window.location.href = `gracias.html?collection_status=approved&payment_id=mock_${Date.now()}&package=${currentSelectedPackage.id}&email=${encodeURIComponent(email)}`;
  }, 1000);
};
