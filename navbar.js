document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const menuLinks = document.querySelectorAll('.navbar-menu a');
    const body = document.body;


    function toggleMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        menuToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    menuToggle.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (navbarMenu.classList.contains('active') && 
            !navbarMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    document.addEventListener('touchmove', (e) => {
        if (body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    }, { passive: false });
}); 