// CARRUSEL MÓVIL SIMPLE PARA "SOBRE SOLEIA"
document.addEventListener('DOMContentLoaded', function() {
    const imgContainers = document.querySelectorAll('.img-container');
    const dots = document.querySelectorAll('.dot');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    
    let currentIndex = 0;
    let autoPlayInterval;
    
    // Función para mostrar imagen específica
    function showImage(index) {
        // Ocultar todas las imágenes
        imgContainers.forEach(container => {
            container.classList.remove('active');
        });
        
        // Ocultar todos los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar imagen actual
        if (imgContainers[index]) {
            imgContainers[index].classList.add('active');
        }
        
        // Activar dot actual
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentIndex = index;
    }
    
    // Función para siguiente imagen
    function nextImage() {
        const nextIndex = (currentIndex + 1) % imgContainers.length;
        showImage(nextIndex);
    }
    
    // Función para imagen anterior
    function prevImage() {
        const prevIndex = (currentIndex - 1 + imgContainers.length) % imgContainers.length;
        showImage(prevIndex);
    }
    
    // Event listeners para botones
    if (leftButton) {
        leftButton.addEventListener('click', prevImage);
    }
    
    if (rightButton) {
        rightButton.addEventListener('click', nextImage);
    }

    // Event listeners para dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showImage(index);
            resetAutoPlay();
        });
    });
    
    // Función para reiniciar autoplay
    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        startAutoPlay();
    }
    
    // Función para iniciar autoplay
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextImage, 3000);
    }
    
    // Mostrar primera imagen
    if (imgContainers.length > 0) {
        showImage(0);
        startAutoPlay();
    }
});

// FAQ
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            }
        });
    }
}); 