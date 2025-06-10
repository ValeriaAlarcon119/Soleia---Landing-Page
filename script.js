// script.js
// Por ahora vacío, solo para futuras interacciones visuales si se requieren. 

// Simulación de 59 lotes con datos de ejemplo
const lotes = Array.from({ length: 59 }, (_, i) => {
  const estados = ['disponible', 'apartado', 'vendido'];
  return {
    id: i + 1,
    nombre: `Lote ${i + 1}`,
    estado: estados[Math.floor(Math.random() * estados.length)],
    etapa: Math.ceil((i + 1) / 10),
    superficie: `${Math.floor(Math.random() * 200) + 200} m²`,
    precio: `$${(Math.floor(Math.random() * 500) + 500) * 1000}`
  };
});

function renderLotes() {
const grid = document.getElementById('cotizador-grid');
const loteInfo = document.getElementById('lote-info');
const loteSeleccionadoInput = document.getElementById('lote-seleccionado');

  // Solo ejecutar si los elementos existen (estamos en la página del cotizador)
  if (!grid) return;
  
  grid.innerHTML = '';
  lotes.forEach((lote, idx) => {
    const div = document.createElement('div');
    div.className = `lote ${lote.estado}`;
    div.title = lote.nombre;
    div.tabIndex = 0;
    div.setAttribute('data-idx', idx);

    // Tooltip personalizado
    const tooltip = document.createElement('div');
    tooltip.className = 'lote-tooltip';
    tooltip.innerHTML = `
      <strong>${lote.nombre}</strong><br>
      Estado: <b>${lote.estado.toUpperCase()}</b><br>
      Etapa: ${lote.etapa}<br>
      Superficie: ${lote.superficie}<br>
      Precio: ${lote.precio}<br>
      <span style='font-size:0.9em;color:#888;'>Click para más información</span>
    `;
    div.appendChild(tooltip);

    div.addEventListener('mouseenter', () => {
      tooltip.style.opacity = 1;
    });
    div.addEventListener('mouseleave', () => {
      tooltip.style.opacity = 0;
    });
    div.addEventListener('click', () => {
      document.querySelectorAll('.lote.selected').forEach(el => el.classList.remove('selected'));
      div.classList.add('selected');
      mostrarInfoLote(lote);
    });
    grid.appendChild(div);
  });
}

function mostrarInfoLote(lote) {
  const loteInfo = document.getElementById('lote-info');
  const loteSeleccionadoInput = document.getElementById('lote-seleccionado');
  
  if (loteInfo) {
  loteInfo.innerHTML = `
    <h3>${lote.nombre}</h3>
    <p><b>Estado:</b> ${lote.estado.charAt(0).toUpperCase() + lote.estado.slice(1)}</p>
    <p><b>Etapa:</b> ${lote.etapa}</p>
    <p><b>Superficie:</b> ${lote.superficie}</p>
    <p><b>Precio:</b> ${lote.precio}</p>
  `;
  }
  
  if (loteSeleccionadoInput) {
  loteSeleccionadoInput.value = lote.nombre;
  }
}

// -- CARRUSEL VARIABLES GLOBALES --
let slideActual = 0;
const totalSlides = 6;
const slidesPorVista = 4;

function mostrarSlides() {
    const slider = document.querySelector('.slider-images');
    const images = document.querySelectorAll('.img-container');
    
    // Calcular la posición de desplazamiento
    const desplazamiento = -slideActual * (100 / slidesPorVista);
    
    // Aplicar la transformación a todas las imágenes
    images.forEach((img, index) => {
        img.style.transform = `translateX(${desplazamiento}%)`;
        img.style.display = 'flex';
    });
    
    // Actualizar dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === (slideActual % 4));
        dot.style.backgroundColor = index === (slideActual % 4) ? '#FAEACD' : '#D9D9D9';
    });
}

function siguienteSlide() {
    if (slideActual < totalSlides - slidesPorVista) {
        slideActual++;
    } else {
        slideActual = 0;
    }
    mostrarSlides();
}

function anteriorSlide() {
    if (slideActual > 0) {
        slideActual--;
    } else {
        slideActual = totalSlides - slidesPorVista;
    }
    mostrarSlides();
}

function irASlide(index) {
    slideActual = index;
    mostrarSlides();
}

document.addEventListener('DOMContentLoaded', () => {
    // Configurar el slider inicialmente
    const slider = document.querySelector('.slider-images');
    const images = document.querySelectorAll('.img-container');
    
    // Asegurar que solo se muestren 4 imágenes a la vez
    images.forEach((img, index) => {
        img.style.flex = '0 0 calc(25% - 10px)';
        img.style.transition = 'transform 0.5s ease';
    });
    
    mostrarSlides();

    // Event listeners
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    
    if (leftButton) {
        leftButton.addEventListener('click', anteriorSlide);
    }
    
    if (rightButton) {
        rightButton.addEventListener('click', siguienteSlide);
    }

    // Event listeners para los dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => irASlide(index));
    });
});

// -- Código para Preguntas Frecuentes --
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Alternar la clase 'active' en el ítem completo
            item.classList.toggle('active');
        });
    });
    
    // Inicializar carrusel
    renderLotes();
    
    setTimeout(function() {
        mostrarSlides();
        console.log('✅ CARRUSEL INICIALIZADO - LISTO PARA USAR');
    }, 100);
});

// CARRUSEL GARANTIZADO - Sección Amenidades
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INICIANDO CARRUSEL AMENIDADES ===');
    
    // Buscar elementos de amenidades
    const filaArriba = document.getElementById('amenidades-carrusel-fila');
    const filaAbajo = document.getElementById('amenidades-fijas-fila');
    const amenitiesDots = document.querySelectorAll('.combined-amenities-cta .gallery-dots .dot');
    const amenitiesLeftBtn = document.querySelector('.combined-amenities-cta .gallery-button.left-button');
    const amenitiesRightBtn = document.querySelector('.combined-amenities-cta .gallery-button.right-button');
    
    if (!filaArriba || !filaAbajo) {
        console.log('ERROR: No se encontraron elementos del carrusel de amenidades');
        return;
    }

    let amenitiesCurrentIndex = 0;
    const amenitiesTotal = 8; // Total de imágenes disponibles
    const imagenes = [
        'image 1.png','image 1.png','image 1.png','image 1.png',
        'image 1.png','image 1.png','image 1.png','image 1.png'
    ];

    function renderAmenidades() {
        console.log('RENDERIZANDO AMENIDADES - Índice:', amenitiesCurrentIndex);
        
        // Limpiar filas
        filaArriba.innerHTML = '';
        filaAbajo.innerHTML = '';

        // Primera fila: LARGA-corta-LARGA-corta
        for (let i = 0; i < 4; i++) {
            const idx = (amenitiesCurrentIndex + i) % amenitiesTotal;
            const clase = i % 2 === 0 ? 'gallery-item-tall' : 'gallery-item-short';
            const div = document.createElement('div');
            div.className = `gallery-item ${clase}`;
            div.innerHTML = `<img src="${imagenes[idx]}" alt="Amenidad ${idx+1}">`;
            filaArriba.appendChild(div);
        }

        // Segunda fila: corta-LARGA-corta-LARGA
        for (let i = 0; i < 4; i++) {
            const idx = (amenitiesCurrentIndex + 4 + i) % amenitiesTotal;
            const clase = i % 2 === 0 ? 'gallery-item-short' : 'gallery-item-tall';
            const div = document.createElement('div');
            div.className = `gallery-item ${clase}`;
            div.innerHTML = `<img src="${imagenes[idx]}" alt="Amenidad ${idx+5}">`;
            filaAbajo.appendChild(div);
        }

        // Actualizar dots
        amenitiesDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === (amenitiesCurrentIndex % 4));
        });
    }

    function nextAmenities() {
        console.log('SIGUIENTE AMENIDAD');
        amenitiesCurrentIndex = (amenitiesCurrentIndex + 1) % amenitiesTotal;
        renderAmenidades();
    }

    function prevAmenities() {
        console.log('AMENIDAD ANTERIOR');
        amenitiesCurrentIndex = (amenitiesCurrentIndex - 1 + amenitiesTotal) % amenitiesTotal;
        renderAmenidades();
    }

    // Event listeners
    if (amenitiesRightBtn) {
        amenitiesRightBtn.onclick = nextAmenities;
    }

    if (amenitiesLeftBtn) {
        amenitiesLeftBtn.onclick = prevAmenities;
    }

    // Dots
    amenitiesDots.forEach((dot, index) => {
        dot.onclick = function() {
            amenitiesCurrentIndex = index;
            renderAmenidades();
        };
    });

    // Inicializar
    renderAmenidades();
    console.log('=== CARRUSEL AMENIDADES INICIALIZADO ===');
});

// Menú móvil
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const nav = document.querySelector('nav');

  if (menuToggle && navbarMenu) {
    menuToggle.addEventListener('click', function() {
      navbarMenu.classList.toggle('active');
      nav.style.right = navbarMenu.classList.contains('active') ? '0' : '-100%';
    });

    // Cerrar menú al hacer clic en un enlace
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbarMenu.classList.remove('active');
        nav.style.right = '-100%';
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        navbarMenu.classList.remove('active');
        nav.style.right = '-100%';
      }
    });
  }
});

// Scroll suave para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-images');
    const dots = document.querySelectorAll('.dot');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const images = document.querySelectorAll('.img-container');
    let currentIndex = 0;
    const totalImages = images.length;

    // Función para actualizar el slider
    function updateSlider(direction) {
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalImages;
        } else {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        }
        
        // Actualizar posición del slider
        slider.scrollTo({
            left: images[currentIndex].offsetLeft,
            behavior: 'smooth'
        });
        
        // Actualizar dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Event listeners para los botones
    rightButton.addEventListener('click', () => updateSlider('next'));
    leftButton.addEventListener('click', () => updateSlider('prev'));

    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            slider.scrollTo({
                left: images[currentIndex].offsetLeft,
                behavior: 'smooth'
            });
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });

    // Auto-scroll
    let autoScrollInterval = setInterval(() => updateSlider('next'), 3000);

    // Pausar auto-scroll cuando el usuario interactúa
    slider.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    slider.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(() => updateSlider('next'), 3000);
    });

    // Manejar el scroll del slider
    slider.addEventListener('scroll', () => {
        const scrollPosition = slider.scrollLeft;
        const imageWidth = images[0].offsetWidth;
        currentIndex = Math.round(scrollPosition / imageWidth);
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    });
});

function renderLots() {
  const container = document.querySelector('.container-svg');
  const svg = container.querySelector('svg');
  
  lotes.forEach((lot, index) => {
    const batch = document.createElement('div');
    batch.className = `batch ${lot.estado}`;
    
    // Agregar la información del lote para el tooltip
    const statusText = lot.estado === 'disponible' ? 'Disponible' : 
                      lot.estado === 'apartado' ? 'Apartado' : 'Vendido';
    batch.setAttribute('data-lot-info', `Lote ${index + 1} - ${statusText}`);
    
    // Crear el elemento SVG para el lote
    const lotElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    lotElement.setAttribute("x", lot.x);
    lotElement.setAttribute("y", lot.y);
    lotElement.setAttribute("width", lot.width);
    lotElement.setAttribute("height", lot.height);
    lotElement.setAttribute("class", "lot-path");
    
    batch.appendChild(lotElement);
    svg.appendChild(batch);
  });
} 