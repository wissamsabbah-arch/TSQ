const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
const form = document.querySelector('#enquiry');
if (form) {
 const subject = new URLSearchParams(location.search).get('subject');
 if ([...form.elements.subject.options].some(option => option.value === subject)) form.elements.subject.value = subject;
 form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const text = 'TSQ CAPITAL — ENQUIRY DRAFT\nNot sent. Saved locally on your device.\n\n' + ['name','company','email','subject','message'].map(key => key[0].toUpperCase() + key.slice(1) + ': ' + String(data.get(key) || '').trim()).join('\n\n');
  const url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a'); link.href = url; link.download = 'TSQ-enquiry.txt'; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  const status = document.querySelector('#form-status'); status.textContent = 'Your enquiry file is ready. It has not been sent to TSQ.'; status.focus();
 });
}
