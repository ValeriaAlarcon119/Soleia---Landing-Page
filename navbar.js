document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const menuLinks = document.querySelectorAll('.navbar-menu a');
    const body = document.body;

    // Función para abrir/cerrar el menú
    function toggleMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        menuToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Evento click en el botón hamburguesa
    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer click en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', (e) => {
        if (navbarMenu.classList.contains('active') && 
            !navbarMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Cerrar menú con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Prevenir scroll en dispositivos táctiles cuando el menú está abierto
    document.addEventListener('touchmove', (e) => {
        if (body.classList.contains('menu-open')) {
            e.preventDefault();
        }
    }, { passive: false });
}); 