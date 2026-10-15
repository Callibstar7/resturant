const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    });
  });
}

document.querySelectorAll('[data-account-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelector('.form-message').textContent = 'Account access is a preview and is not connected yet.';
  });
});

document.querySelectorAll('[data-provider]').forEach((button) => {
  button.addEventListener('click', () => {
    const scope = button.closest('.login-content') || button.closest('form');
    const message = scope?.querySelector('.provider-message');
    if (!message) return;
    const action = document.body.classList.contains('signup-page') ? 'sign-up' : 'sign-in';
    message.textContent = `${button.dataset.provider} ${action} is a preview and needs to be connected.`;
  });
});




document.querySelectorAll('[data-reset-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelector('.reset-message').textContent = 'Password reset email delivery is not connected yet. Connect an authentication service to send this link.';
  });
});


document.querySelectorAll('[data-demo-login]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try { sessionStorage.setItem('juniper-demo-authenticated', 'yes'); } catch {}
    window.location.href = 'dashboard.html?previewAuth=1';
  });
});

document.querySelectorAll('[data-reservation-form]').forEach((form) => {
  const date = form.querySelector('[data-reservation-date]');
  if (date) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    date.min = localDate;
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.querySelector('.reservation-feedback').textContent = 'Your table request is ready to connect. A booking service is needed to send it to the restaurant.';
  });
});


document.querySelectorAll('[data-demo-signout]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    try { sessionStorage.removeItem('juniper-demo-authenticated'); } catch {}
    window.location.href = link.href;
  });
});

const reservationAccess = document.querySelector('#reservation-access');
const reservationGate = document.querySelector('#reservation-gate');
if (reservationAccess && reservationGate) {
  let isSignedIn = false;
  try { isSignedIn = sessionStorage.getItem('juniper-demo-authenticated') === 'yes'; } catch {}
  const previewAuth = new URLSearchParams(window.location.search).get('previewAuth') === '1';
  if (previewAuth) {
    isSignedIn = true;
    try { sessionStorage.setItem('juniper-demo-authenticated', 'yes'); } catch {}
    try { window.history.replaceState(null, '', window.location.pathname + window.location.hash); } catch {}
  }
  reservationAccess.hidden = !isSignedIn;
  reservationGate.hidden = isSignedIn;
}

