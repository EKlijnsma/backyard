const eventDate = new Date('2026-05-09T10:00:00');
const signupForm = document.getElementById('signup-form');
const questionForm = document.getElementById('question-form');
const googleFormButton = document.getElementById('open-google-form');
const googleQuestionButton = document.getElementById('open-google-question');

function updateCountdown() {
  const diff = Math.max(0, eventDate - new Date());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent = String(d).padStart(3, '0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

function toggleFaq(el) {
  const open = el.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
  if (!open) {
    el.classList.add('open');
  }
}

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
