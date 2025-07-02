document.addEventListener('DOMContentLoaded', function() {
    const imgContainers = document.querySelectorAll('.img-container');
    const dotsContainer = document.querySelector('.slider-dots');
    const sliderImages = document.querySelector('.slider-images');
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    let currentIndex = 0;
    let autoPlayInterval;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Selecciona y ordena los contenedores por el id img-1, img-2, ...
    const imgContainersSorted = Array.from(document.querySelectorAll('.img-container'))
      .sort((a, b) => {
        const numA = parseInt(a.id.replace('img-', ''), 10);
        const numB = parseInt(b.id.replace('img-', ''), 10);
        return numA - numB;
      });

    function renderDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i < imgContainersSorted.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => {
                showImage(i, false);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots(idx) {
        const dots = document.querySelectorAll('.slider-dots .dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
        });
    }

    function showImage(idx, isAuto = false) {
        if (typeof idx !== 'number' || idx < 0 || idx >= imgContainersSorted.length) return;
        if (isMobile()) {
            // Si es autoplay y va de la última a la primera
            if (isAuto && idx === 0 && currentIndex === imgContainersSorted.length - 1) {
                sliderImages.style.transition = 'opacity 0.4s cubic-bezier(0.4,0,0.2,1)';
                sliderImages.style.opacity = '0';
                setTimeout(() => {
                    sliderImages.scrollTo({
                        left: 0,
                        behavior: 'auto'
                    });
                    setTimeout(() => {
                        sliderImages.style.opacity = '1';
                    }, 120);
                }, 400);
            } else {
                sliderImages.scrollTo({
                    left: idx * sliderImages.offsetWidth,
                    behavior: 'smooth'
                });
            }
        } else {
            imgContainersSorted[idx].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
        updateDots(idx);
        imgContainersSorted.forEach(container => {
            container.classList.remove('active');
        });
        if (imgContainersSorted[idx]) {
            imgContainersSorted[idx].classList.add('active');
        }
        currentIndex = idx;
    }

    function nextImage() {
        const nextIndex = (currentIndex + 1) % imgContainersSorted.length;
        showImage(nextIndex, false);
    }

    function prevImage() {
        const prevIndex = (currentIndex - 1 + imgContainersSorted.length) % imgContainersSorted.length;
        showImage(prevIndex, false);
    }

    if (leftButton) {
        leftButton.addEventListener('click', prevImage);
    }
    if (rightButton) {
        rightButton.addEventListener('click', nextImage);
    }

    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        startAutoPlay();
    }
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % imgContainersSorted.length;
            showImage(nextIndex, true);
        }, 2500);
    }

    // Render dots y mostrar la primera imagen
    renderDots();
    if (imgContainersSorted.length > 0) {
        showImage(0, false);
        startAutoPlay();
    }

    // Redibujar dots al cambiar tamaño de pantalla
    window.addEventListener('resize', () => {
        renderDots();
        showImage(currentIndex, false);
    });

    // --- Actualizar dot activa al hacer scroll manual ---
    if (sliderImages) {
        sliderImages.addEventListener('scroll', function() {
            let closestIdx = 0;
            let minDiff = Infinity;
            const sliderRect = sliderImages.getBoundingClientRect();
            imgContainersSorted.forEach((container, idx) => {
                const rect = container.getBoundingClientRect();
                const diff = Math.abs((rect.left + rect.right) / 2 - (sliderRect.left + sliderRect.right) / 2);
                if (diff < minDiff) {
                    minDiff = diff;
                    closestIdx = idx;
                }
            });
            updateDots(closestIdx);
            currentIndex = closestIdx;
        });
    }
});


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

document.addEventListener('DOMContentLoaded', function() {
  function isMobile() {
    return window.innerWidth <= 768;
  }
  const gallery = document.querySelector('.combined-amenities-cta .gallery-images');
  if (!gallery) return;
  const items = Array.from(gallery.querySelectorAll('.gallery-item'));
  if (!isMobile() || items.length < 2) return;

  gallery.querySelectorAll('.amenidades-slide-pair').forEach(e => e.remove());

  let pairs = [];
  for (let i = 0; i < items.length; i += 2) {
    const pair = document.createElement('div');
    pair.className = 'amenidades-slide-pair';
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

  let autoInterval = setInterval(() => {
    let idx = (currentPair + 1) % pairs.length;
    showPair(idx);
    updateDots(idx);
  }, 3500);
  gallery.addEventListener('touchstart', () => clearInterval(autoInterval), {once:true});

  showPair(0);
}); 

function resetAmenidadesGallery() {
  const gallery = document.querySelector('.combined-amenities-cta .gallery-images');
  if (!gallery) return;
  gallery.querySelectorAll('.amenidades-slide-pair').forEach(e => e.remove());
  gallery.querySelectorAll('.gallery-item').forEach(e => {
    e.style.display = '';
  });
}

window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    resetAmenidadesGallery();
  }
});

if (window.innerWidth <= 768) {
  const imgContainers = document.querySelectorAll('.img-container');
  const progressDot = document.querySelector('.slider-dots .dot');
  if (progressDot && imgContainers.length > 0) {
      const progress = ((index + 1) / imgContainers.length) * 100;
      progressDot.style.width = progress + '%';
  }
}
