const navbar = document.querySelector('.navbar');
const menu = document.querySelector('.navbar-links');
const toggle = document.querySelector('.navbar-toggle');
const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

const updateNavbar = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);

  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

const setMenuOpen = isOpen => {
  menu.classList.toggle('active', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
};

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

toggle.addEventListener('click', () => {
  const isOpen = !menu.classList.contains('active');
  setMenuOpen(isOpen);
  if (isOpen) {
    menu.querySelector('a').focus();
  }
});

menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('active')) {
    setMenuOpen(false);
    toggle.focus();
  }
});

const year = new Date().getFullYear();
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = year;
});
