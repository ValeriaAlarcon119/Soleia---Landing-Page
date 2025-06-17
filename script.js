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


  if (!grid) return;
  
  grid.innerHTML = '';
  lotes.forEach((lote, idx) => {
    const div = document.createElement('div');
    div.className = `lote ${lote.estado}`;
    div.title = lote.nombre;
    div.tabIndex = 0;
    div.setAttribute('data-idx', idx);

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


let slideActual = 0;
const totalSlides = 6;
const slidesPorVista = 4;

function mostrarSlides() {
    const slider = document.querySelector('.slider-images');
    const images = document.querySelectorAll('.img-container');
    
    
    const desplazamiento = -slideActual * (100 / slidesPorVista);
 
    images.forEach((img, index) => {
        img.style.transform = `translateX(${desplazamiento}%)`;
        img.style.display = 'flex';
    });
    

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

    const slider = document.querySelector('.slider-images');
    const images = document.querySelectorAll('.img-container');
    

    images.forEach((img, index) => {
        img.style.flex = '0 0 calc(25% - 10px)';
        img.style.transition = 'transform 0.5s ease';
    });
    
    mostrarSlides();


    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    
    if (leftButton) {
        leftButton.addEventListener('click', anteriorSlide);
    }
    
    if (rightButton) {
        rightButton.addEventListener('click', siguienteSlide);
    }


    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => irASlide(index));
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    const slider = document.querySelector('.slider-images');
    const images = document.querySelectorAll('.img-container');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const dots = document.querySelectorAll('.dot');


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
    

    if (slider && images.length > 0) {
        images.forEach((img, index) => {
            img.style.flex = '0 0 calc(25% - 10px)';
            img.style.transition = 'transform 0.5s ease';
        });
        
        mostrarSlides();

        if (leftButton) {
            leftButton.addEventListener('click', anteriorSlide);
        }
        
        if (rightButton) {
            rightButton.addEventListener('click', siguienteSlide);
        }

        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => irASlide(index));
            });
        }
    }
    

    renderLotes();
    

    const filaArriba = document.getElementById('amenidades-carrusel-fila');
    const filaAbajo = document.getElementById('amenidades-fijas-fila');
    const amenitiesDots = document.querySelectorAll('.combined-amenities-cta .gallery-dots .dot');
    const amenitiesLeftBtn = document.querySelector('.combined-amenities-cta .gallery-button.left-button');
    const amenitiesRightBtn = document.querySelector('.combined-amenities-cta .gallery-button.right-button');

    if (filaArriba && filaAbajo) {
        let amenitiesCurrentIndex = 0;
        const amenitiesTotal = 8;
        const imagenes = [
            'image 1.png','image 1.png','image 1.png','image 1.png',
            'image 1.png','image 1.png','image 1.png','image 1.png'
        ];

        function renderAmenidades() {
            filaArriba.innerHTML = '';
            filaAbajo.innerHTML = '';

            for (let i = 0; i < 4; i++) {
                const idx = (amenitiesCurrentIndex + i) % amenitiesTotal;
                const clase = i % 2 === 0 ? 'gallery-item-tall' : 'gallery-item-short';
                const div = document.createElement('div');
                div.className = `gallery-item ${clase}`;
                div.innerHTML = `<img src="${imagenes[idx]}" alt="Amenidad ${idx+1}">`;
                filaArriba.appendChild(div);
            }

            for (let i = 0; i < 4; i++) {
                const idx = (amenitiesCurrentIndex + 4 + i) % amenitiesTotal;
                const clase = i % 2 === 0 ? 'gallery-item-short' : 'gallery-item-tall';
                const div = document.createElement('div');
                div.className = `gallery-item ${clase}`;
                div.innerHTML = `<img src="${imagenes[idx]}" alt="Amenidad ${idx+5}">`;
                filaAbajo.appendChild(div);
            }

            if (amenitiesDots.length > 0) {
                amenitiesDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === (amenitiesCurrentIndex % 4));
                });
            }
        }

        if (amenitiesLeftBtn) {
            amenitiesLeftBtn.addEventListener('click', () => {
                amenitiesCurrentIndex = (amenitiesCurrentIndex - 1 + amenitiesTotal) % amenitiesTotal;
                renderAmenidades();
            });
        }

        if (amenitiesRightBtn) {
            amenitiesRightBtn.addEventListener('click', () => {
                amenitiesCurrentIndex = (amenitiesCurrentIndex + 1) % amenitiesTotal;
                renderAmenidades();
            });
        }

        renderAmenidades();
    }
});


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


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-images');
    const dots = document.querySelectorAll('.dot');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const images = document.querySelectorAll('.img-container');

    if (slider && dots.length > 0 && leftButton && rightButton && images.length > 0) {
        let currentIndex = 0;
        const totalImages = images.length;

        function updateSlider(direction) {
            if (direction === 'next') {
                currentIndex = (currentIndex + 1) % totalImages;
            } else {
                currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            }
            
            slider.scrollTo({
                left: images[currentIndex].offsetLeft,
                behavior: 'smooth'
            });
            
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }

        leftButton.addEventListener('click', () => updateSlider('prev'));
        rightButton.addEventListener('click', () => updateSlider('next'));

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

        let autoScrollInterval = setInterval(() => updateSlider('next'), 3000);

        slider.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
        slider.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(() => updateSlider('next'), 3000);
        });

        slider.addEventListener('scroll', () => {
            const scrollPosition = slider.scrollLeft;
            const imageWidth = images[0].offsetWidth;
            currentIndex = Math.round(scrollPosition / imageWidth);
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        });
    }


    const filaArriba = document.getElementById('amenidades-carrusel-fila');
    const filaAbajo = document.getElementById('amenidades-fijas-fila');
    const amenitiesDots = document.querySelectorAll('.combined-amenities-cta .gallery-dots .dot');
    const amenitiesLeftBtn = document.querySelector('.combined-amenities-cta .gallery-button.left-button');
    const amenitiesRightBtn = document.querySelector('.combined-amenities-cta .gallery-button.right-button');

    if (filaArriba && filaAbajo) {
        let amenitiesCurrentIndex = 0;
        const amenitiesTotal = 8;
        const imagenes = [
            'image 1.png','image 1.png','image 1.png','image 1.png',
            'image 1.png','image 1.png','image 1.png','image 1.png'
        ];

        function renderAmenidades() {
            filaArriba.innerHTML = '';
            filaAbajo.innerHTML = '';

            for (let i = 0; i < 4; i++) {
                const idx = (amenitiesCurrentIndex + i) % amenitiesTotal;
                const clase = i % 2 === 0 ? 'gallery-item-tall' : 'gallery-item-short';
                const div = document.createElement('div');
                div.className = `gallery-item ${clase}`;
                div.innerHTML = `<img src="${imagenes[idx]}" alt="Amenidad ${idx+1}">`;
                filaArriba.appendChild(div);
            }

            for (let i = 0; i < 4; i++) {
                const idx = (amenitiesCurrentIndex + 4 + i) % amenitiesTotal;
                const clase = i % 2 === 0 ? 'gallery-item-short' : 'gallery-item-tall';
                const div = document.createElement('div');
                div.className = `gallery-item ${clase}`;
                div.innerHTML = `<img src="${imagenes[idx]}" alt="Amenidad ${idx+5}">`;
                filaAbajo.appendChild(div);
            }

            if (amenitiesDots.length > 0) {
                amenitiesDots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === (amenitiesCurrentIndex % 4));
                });
            }
        }

        if (amenitiesLeftBtn) {
            amenitiesLeftBtn.addEventListener('click', () => {
                amenitiesCurrentIndex = (amenitiesCurrentIndex - 1 + amenitiesTotal) % amenitiesTotal;
                renderAmenidades();
            });
        }

        if (amenitiesRightBtn) {
            amenitiesRightBtn.addEventListener('click', () => {
                amenitiesCurrentIndex = (amenitiesCurrentIndex + 1) % amenitiesTotal;
                renderAmenidades();
            });
        }

        renderAmenidades();
    }
});

function renderLots() {
  const container = document.querySelector('.container-svg');
  const svg = container.querySelector('svg');
  
  lotes.forEach((lot, index) => {
    const batch = document.createElement('div');
    batch.className = `batch ${lot.estado}`;
    

    const statusText = lot.estado === 'disponible' ? 'Disponible' : 
                      lot.estado === 'apartado' ? 'Apartado' : 'Vendido';
    batch.setAttribute('data-lot-info', `Lote ${index + 1} - ${statusText}`);
    

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


document.addEventListener('DOMContentLoaded', function() {

    const leftButton = document.querySelector('.combined-amenities-cta .left-button');
    const rightButton = document.querySelector('.combined-amenities-cta .right-button');
    const galleryImages = document.querySelector('.combined-amenities-cta .gallery-images');
    const galleryItems = document.querySelectorAll('.combined-amenities-cta .gallery-item');

    if (leftButton && rightButton && galleryImages && galleryItems.length > 0) {
        const totalColumns = galleryItems.length / 2; 
        const visibleColumns = 4; 
        let currentColumn = 0;

    
        function getColumnWidth() {
            const firstItem = galleryItems[0];
            return firstItem ? firstItem.offsetWidth : 0;
        }

        function updateGallery() {
            const colWidth = getColumnWidth();
       
            galleryImages.style.transform = `translateX(-${currentColumn * colWidth}px)`;
        }

        leftButton.addEventListener('click', () => {
            currentColumn = (currentColumn - 1 + (totalColumns - visibleColumns + 1)) % (totalColumns - visibleColumns + 1);
            updateGallery();
        });
        rightButton.addEventListener('click', () => {
            currentColumn = (currentColumn + 1) % (totalColumns - visibleColumns + 1);
            updateGallery();
        });

        updateGallery();
     
        galleryImages.style.width = `${totalColumns * getColumnWidth()}px`;
        galleryImages.style.transition = 'transform 0.5s';
    }
});


(function() {
  const sliderSobre = document.getElementById('carrusel-imagenes-sobre');
  const imagesSobre = sliderSobre ? sliderSobre.querySelectorAll('.img-container') : [];
  const leftButtonSobre = document.getElementById('btn-anterior-sobre');
  const rightButtonSobre = document.getElementById('btn-siguiente-sobre');
  const dotsSobre = [
    ...Array(7).keys()
  ].map(i => document.getElementById(`dot-${i+1}-sobre`));

  let currentSobre = 0;
  const totalSobre = imagesSobre.length;

  function mostrarSlidesSobre() {
    if (!sliderSobre) return;
    imagesSobre.forEach((img, idx) => {
      img.style.display = (idx === currentSobre) ? 'block' : 'none';
    });
    dotsSobre.forEach((dot, idx) => {
      if (dot) dot.classList.toggle('active', idx === currentSobre);
    });
  }

  function irASlideSobre(idx) {
    currentSobre = idx;
    mostrarSlidesSobre();
  }
  function anteriorSlideSobre() {
    currentSobre = (currentSobre - 1 + totalSobre) % totalSobre;
    mostrarSlidesSobre();
  }
  function siguienteSlideSobre() {
    currentSobre = (currentSobre + 1) % totalSobre;
    mostrarSlidesSobre();
  }

  if (sliderSobre && imagesSobre.length > 0) {
    mostrarSlidesSobre();
    if (leftButtonSobre) leftButtonSobre.addEventListener('click', anteriorSlideSobre);
    if (rightButtonSobre) rightButtonSobre.addEventListener('click', siguienteSlideSobre);
    dotsSobre.forEach((dot, idx) => {
      if (dot) dot.addEventListener('click', () => irASlideSobre(idx));
    });
  }
})(); 