const eventDate = new Date('2026-05-09T10:00:00+02:00');
const signupForm = document.getElementById('signup-form');
const questionForm = document.getElementById('question-form');
const googleFormButton = document.getElementById('open-google-form');
const googleQuestionButton = document.getElementById('open-google-question');
const shirtOrderForm = document.getElementById('shirt-order-form');
const shirtGoogleFormButton = document.getElementById('open-shirt-google-form');
const hamburgerButton = document.querySelector('.hamburger');
const navLinks = document.getElementById('nav-links');
const faqItems = document.querySelectorAll('.faq-item');

function updateCountdown() {
  const diff = Math.max(0, eventDate - new Date());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const days = document.getElementById('cd-days');
  const hours = document.getElementById('cd-hours');
  const mins = document.getElementById('cd-mins');
  const secs = document.getElementById('cd-secs');

  if (!days || !hours || !mins || !secs) {
    return;
  }

  days.textContent = String(d).padStart(3, '0');
  hours.textContent = String(h).padStart(2, '0');
  mins.textContent = String(m).padStart(2, '0');
  secs.textContent = String(s).padStart(2, '0');
}

if (document.getElementById('cd-days')) {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function toggleFaq(item) {
  const open = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach((i) => {
    i.classList.remove('open');
    i.setAttribute('aria-expanded', 'false');
  });
  if (!open) {
    item.classList.add('open');
    item.setAttribute('aria-expanded', 'true');
  }
}

faqItems.forEach((item) => {
  item.setAttribute('role', 'button');
  item.setAttribute('tabindex', '0');
  item.setAttribute('aria-expanded', 'false');
  item.addEventListener('click', () => toggleFaq(item));
  item.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFaq(item);
    }
  });
});

function buildGoogleFormUrl() {
  const data = new FormData(signupForm);
  const base =
    'https://docs.google.com/forms/d/e/1FAIpQLSeKPP9ncG38lDMVBHHVuccXY132fAQhCEambGXnK1bIMbd2tg/viewform?usp=pp_url';
  const params = new URLSearchParams({
    'entry.400830538': data.get('name') || '',
    'entry.143882926': data.get('email') || '',
    'entry.1837363461': data.get('phone') || '',
    'entry.1721693178': data.get('distance') || '',
    'entry.60763173': data.get('goal') || '',
    'entry.389495788': data.get('crew') || '',
    'entry.1434576566': data.get('emergency_name') || '',
    'entry.547912208': data.get('emergency_phone') || '',
    'entry.735766526': data.get('terms') ? 'Ik ga akkoord met bovenstaande' : '',
    'entry.1297399281': data.get('notes') || '',
  });
  return `${base}&${params.toString()}`;
}

function buildGoogleQuestionUrl() {
  const data = new FormData(questionForm);
  const base =
    'https://docs.google.com/forms/d/e/1FAIpQLSckzBhiKhJdEEZTL9cTp57QW2KSA93FETKEgkXs8v1OqHa4RA/viewform?usp=pp_url';
  const params = new URLSearchParams({
    'entry.400830538': data.get('name') || '',
    'entry.143882926': data.get('email') || '',
    'entry.1297399281': data.get('question') || '',
  });
  return `${base}&${params.toString()}`;
}

function buildShirtGoogleFormUrl() {
  const data = new FormData(shirtOrderForm);
  const base =
    'https://docs.google.com/forms/d/e/1FAIpQLSdtNWEhJobv5iT03UiYxauWCCTAhB8uvUWd4J9mDieqDtI9rg/viewform?usp=pp_url';
  const params = new URLSearchParams({
    'entry.400830538': data.get('name') || '',
    'entry.143882926': data.get('email') || '',
    'entry.1297399281': data.get('street') || '',
    'entry.1380445980': data.get('postcode_city') || '',
    'entry.1034802175': data.get('model') || '',
    'entry.213513514': data.get('size') || '',
    'entry.1284577302': data.get('color') || '',
    'entry.1540657583': data.get('terms') || '',
  });
  return `${base}&${params.toString()}`;
}

if (googleFormButton && signupForm) {
  googleFormButton.addEventListener('click', () => {
    if (!signupForm.reportValidity()) {
      return;
    }
    window.open(buildGoogleFormUrl(), '_blank', 'noopener');
  });
}

if (googleQuestionButton && questionForm) {
  googleQuestionButton.addEventListener('click', () => {
    if (!questionForm.reportValidity()) {
      return;
    }
    window.open(buildGoogleQuestionUrl(), '_blank', 'noopener');
  });
}

if (shirtGoogleFormButton && shirtOrderForm) {
  const updateShirtButtonState = () => {
    shirtGoogleFormButton.disabled = !shirtOrderForm.checkValidity();
  };

  shirtOrderForm.addEventListener('input', updateShirtButtonState);
  shirtOrderForm.addEventListener('change', updateShirtButtonState);
  updateShirtButtonState();

  shirtOrderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!shirtOrderForm.reportValidity()) {
      updateShirtButtonState();
      return;
    }
    window.open(buildShirtGoogleFormUrl(), '_blank', 'noopener');
  });
}

if (hamburgerButton && navLinks) {
  const setMenuState = (open) => {
    document.body.classList.toggle('nav-open', open);
    hamburgerButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburgerButton.setAttribute('aria-label', open ? 'Sluit menu' : 'Open menu');
  };

  hamburgerButton.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('nav-open');
    setMenuState(!isOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      setMenuState(false);
    }
  });
}
