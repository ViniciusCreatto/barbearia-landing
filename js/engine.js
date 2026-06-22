
document.addEventListener('DOMContentLoaded', function() {
  injectWhatsAppLinks();
  injectContactInfo();
  injectFooterYear();
  injectInstagramLinks();
  initNavbarScroll();
  initMobileMenu();
  initScrollAnimations();
});

function injectWhatsAppLinks() {
  const whatsappLinks = document.querySelectorAll('[data-whatsapp-link]');
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.whatsappMensagem)}`;
  
  whatsappLinks.forEach(link => {
    link.href = whatsappUrl;
  });
}

function injectContactInfo() {
  const addressElements = document.querySelectorAll('[data-address]');
  const addressText = `${SITE_CONFIG.endereco.rua}<br>${SITE_CONFIG.endereco.bairro}<br>${SITE_CONFIG.endereco.cidade}<br>CEP ${SITE_CONFIG.endereco.cep}`;
  
  addressElements.forEach(el => {
    el.innerHTML = addressText;
  });

  const hoursElements = document.querySelectorAll('[data-hours]');
  const hoursHtml = `
    <li>Segunda a Sexta: ${SITE_CONFIG.horario.semana}</li>
    <li>Sábado: ${SITE_CONFIG.horario.sabado}</li>
    <li>Domingo: Fechado</li>
  `;
  
  hoursElements.forEach(el => {
    el.innerHTML = hoursHtml;
  });
}

function injectFooterYear() {
  const yearElements = document.querySelectorAll('[data-year]');
  yearElements.forEach(el => {
    el.textContent = SITE_CONFIG.ano;
  });
}

function injectInstagramLinks() {
  const instagramLinks = document.querySelectorAll('[data-instagram]');
  const instagramUrl = `https://instagram.com/${SITE_CONFIG.instagram}`;
  
  instagramLinks.forEach(link => {
    link.href = instagramUrl;
  });

  const instagramTextElements = document.querySelectorAll('[data-instagram-text]');
  instagramTextElements.forEach(el => {
    el.textContent = `@${SITE_CONFIG.instagram}`;
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');
  
  window.addEventListener('scroll', function() {
    // 50px de threshold, testei uns valores até ficar suave
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // offset de 200px pra ativar o link antes de chegar na seção
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

function initMobileMenu() {
  const toggle = document.querySelector('.navbar-toggle');
  const links = document.querySelector('.navbar-links');
  
  toggle.addEventListener('click', function() {
    const isActive = links.classList.toggle('active');
    toggle.setAttribute('aria-expanded', isActive);
    toggle.setAttribute('aria-label', isActive ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    if (isActive) {
      links.querySelector('a').focus();
    }
  });

  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      links.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegação');
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && links.classList.contains('active')) {
      links.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegação');
      toggle.focus();
    }
  });
}

function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    /* threshold baixo pra disparar a animação um pouco antes do elemento entrar */
  };

  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  // gambiarra, mas resolve por agora
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}
