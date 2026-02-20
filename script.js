const eventDate = new Date('2026-05-09T10:00:00');

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

function handleSubmit(e, type) {
  e.preventDefault();
  showToast(
    type === 'reg'
      ? 'Ingeschreven! Check je inbox. Tot 9 mei in Meddo.'
      : 'Bericht verstuurd! We lopen zo snel mogelijk terug.'
  );
  e.target.reset();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4500);
}
