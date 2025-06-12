document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const body = document.body;

    // Función para abrir/cerrar el menú
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Evento click en el botón del menú
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });

    // Cerrar menú al hacer click en un enlace
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (navbarMenu.classList.contains('active') && 
            !navbarMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Prevenir scroll cuando el menú está abierto
    navbarMenu.addEventListener('touchmove', function(e) {
        if (navbarMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });

    if(menuToggle && navbarMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navbarMenu.classList.toggle('active');
        });
    }
}); 