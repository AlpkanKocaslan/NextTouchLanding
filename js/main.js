let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
const currentScrollY = window.scrollY;

if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // scrolling down
    navbar.classList.add('hidden');
} else {
    // scrolling up
    navbar.classList.remove('hidden');
}

if (currentScrollY > 40) {
  navbar.classList.add('scrolled');
} else {
  navbar.classList.remove('scrolled');
}


lastScrollY = currentScrollY;
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close menu when scrolling
  window.addEventListener('scroll', () => {
    mobileMenu.classList.remove('open');
  });
}

