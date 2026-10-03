const config = window.RDM_SITE || {};
const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('nav');
const lightbox = document.querySelector('.lightbox');

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#trial-version').textContent = config.trialVersion || 'Trial preview';

document.querySelectorAll('.trial-download').forEach(link => {
  if (config.trialReady && config.trialUrl) {
    link.href = config.trialUrl;
    link.setAttribute('download', '');
    link.classList.add('is-ready');
    const label = link.querySelector('span');
    if (label) label.textContent = 'Download Windows trial';
  } else {
    link.href = '#download';
    link.classList.add('is-pending');
    const label = link.querySelector('span');
    if (label) label.textContent = 'Trial coming soon';
  }
});

if (config.trialReady) {
  document.querySelector('#trial-note').textContent = 'Download the installer, run it, and follow the first-start checklist.';
}

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = '☰';
}));

window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 24), {passive:true});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold: .12});
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.querySelectorAll('.shot, .feature-shot').forEach(shot => shot.addEventListener('click', () => {
  lightbox.querySelector('img').src = shot.dataset.image;
  lightbox.querySelector('img').alt = shot.dataset.title;
  lightbox.querySelector('strong').textContent = shot.dataset.title;
  lightbox.showModal();
}));
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
