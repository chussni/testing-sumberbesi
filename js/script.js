const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const links = document.querySelectorAll('.nav-link');
const revealItems = document.querySelectorAll('.reveal');
const waFloat = document.querySelector('.wa-float');
const waPopup = document.querySelector('.wa-popup');
const waOverlay = document.querySelector('.wa-overlay');
const waClose = document.querySelector('.wa-close');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const lightboxClose = document.querySelector('.lightbox-close');
const galleryImages = document.querySelectorAll('.gallery-item img, .compro-item img');

if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

if (toggle && navMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

links.forEach((link) => {
  if (link.getAttribute('data-page-link') === document.body.dataset.page) {
    link.classList.add('active');
  }
});

const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item) => observer.observe(item));

const openWaPopup = () => {
  waPopup?.classList.add('is-active');
  waOverlay?.classList.add('is-active');
};

const closeWaPopup = () => {
  waPopup?.classList.remove('is-active');
  waOverlay?.classList.remove('is-active');
};

waFloat?.addEventListener('click', openWaPopup);
waClose?.addEventListener('click', closeWaPopup);
waOverlay?.addEventListener('click', closeWaPopup);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeWaPopup();
});

const openLightbox = (src) => {
  lightboxImg.src = src;
  lightbox?.classList.add('is-active');
};

const closeLightbox = () => {
  lightbox?.classList.remove('is-active');
  lightboxImg.src = '';
};

galleryImages.forEach((img) => {
  img.addEventListener('click', () => openLightbox(img.getAttribute('src')));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
