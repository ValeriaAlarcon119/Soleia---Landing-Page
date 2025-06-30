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

// CARRUSEL DE AMENIDADES EN MÓVIL (2 imágenes por slide alternando orden)
document.addEventListener('DOMContentLoaded', function() {
  function isMobile() {
    return window.innerWidth <= 768;
  }
  const gallery = document.querySelector('.combined-amenities-cta .gallery-images');
  if (!gallery) return;
  const items = Array.from(gallery.querySelectorAll('.gallery-item'));
  if (!isMobile() || items.length < 2) return;

  // Eliminar slides previos si recarga
  gallery.querySelectorAll('.amenidades-slide-pair').forEach(e => e.remove());

  // Crear pares alternando orden
  let pairs = [];
  for (let i = 0; i < items.length; i += 2) {
    const pair = document.createElement('div');
    pair.className = 'amenidades-slide-pair';
    // Alternar orden: par (larga arriba), impar (corta arriba)
    const first = items[i];
    const second = items[i+1];
    let isLongFirst = first && first.classList.contains('needs-item-tall');
    let isLongSecond = second && second.classList.contains('needs-item-tall');
    if ((pairs.length % 2 === 0 && isLongFirst) || (pairs.length % 2 === 1 && isLongSecond)) {
      if (first) pair.appendChild(first.cloneNode(true));
      if (second) pair.appendChild(second.cloneNode(true));
    } else {
      if (second) pair.appendChild(second.cloneNode(true));
      if (first) pair.appendChild(first.cloneNode(true));
    }
    gallery.appendChild(pair);
    pairs.push(pair);
  }

  let currentPair = 0;
  function showPair(idx) {
    pairs.forEach((p, i) => {
      p.classList.toggle('active', i === idx);
    });
    currentPair = idx;
  }

  // Dots
  let dots = gallery.parentElement.querySelector('.gallery-dots');
  if (dots) dots.innerHTML = '';
  pairs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      showPair(i);
      updateDots(i);
    });
    if (dots) dots.appendChild(dot);
  });
  function updateDots(idx) {
    if (!dots) return;
    dots.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  }

  // Flechas (si existen)
  const left = gallery.parentElement.querySelector('.left-button');
  const right = gallery.parentElement.querySelector('.right-button');
  if (left) left.onclick = () => {
    let idx = (currentPair - 1 + pairs.length) % pairs.length;
    showPair(idx);
    updateDots(idx);
  };
  if (right) right.onclick = () => {
    let idx = (currentPair + 1) % pairs.length;
    showPair(idx);
    updateDots(idx);
  };

  // Auto-slide
  let autoInterval = setInterval(() => {
    let idx = (currentPair + 1) % pairs.length;
    showPair(idx);
    updateDots(idx);
  }, 3500);
  gallery.addEventListener('touchstart', () => clearInterval(autoInterval), {once:true});

  // Mostrar primer par
  showPair(0);
}); 