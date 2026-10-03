const productToggle = document.querySelector('.product-menu-toggle');
const productLinks = document.querySelector('.product-links');
if (productToggle && productLinks) {
  productToggle.addEventListener('click', () => {
    const isOpen = productLinks.classList.toggle('open');
    productToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const closeLightbox = () => lightbox?.classList.remove('open');

document.querySelectorAll('[data-lightbox]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.lightbox;
    lightboxImage.alt = button.querySelector('img')?.alt || 'Toolkit screenshot';
    lightbox.classList.add('open');
  });
});
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target.classList.contains('lightbox-close')) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});
