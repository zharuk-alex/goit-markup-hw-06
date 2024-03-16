const navigationActiveToggle = () => {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-link') ?? [];
  const isIndex =
    window.location.pathname === '/' ||
    currentPage === 'index.html' ||
    currentPage?.length == 0;

  if (isIndex) {
    return false;
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-href') === currentPage) {
      link.classList.add('active');
    }
  });
};

(() => {
  navigationActiveToggle();
})();
