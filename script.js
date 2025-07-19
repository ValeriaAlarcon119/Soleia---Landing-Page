document.addEventListener('DOMContentLoaded', function() {
  const imgContainers = document.querySelectorAll('.img-container');
  const dotsContainer = document.querySelector('.slider-dots');
  const sliderImages = document.querySelector('.slider-images');
  const leftButton = document.querySelector('.left-button');
  const rightButton = document.querySelector('.right-button');
  let currentIndex = 0;
  let autoPlayInterval;

  function isMobile() {
      return window.innerWidth <= 1024;
  }

  const imgContainersSorted = Array.from(document.querySelectorAll('.img-container'))
    .sort((a, b) => {
      const numA = parseInt(a.id.replace('img-', ''), 10);
      const numB = parseInt(b.id.replace('img-', ''), 10);
      return numA - numB;
    });

  function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      let numDots = isTablet() ? Math.ceil(imgContainersSorted.length / 2) : imgContainersSorted.length;
      for (let i = 0; i < numDots; i++) {
          const dot = document.createElement('div');
          dot.className = 'dot' + (i === 0 ? ' active' : '');
          dot.addEventListener('click', () => {
              showImage(i * 2, false);
              resetAutoPlay();
          });
          dotsContainer.appendChild(dot);
      }
  }

  function updateDots(idx) {
      const dots = document.querySelectorAll('.slider-dots .dot');
      if (isTablet()) {
          const numDots = Math.ceil(imgContainersSorted.length / 2);
          let dotIdx = Math.floor(idx / 2);
          if (dotIdx >= numDots) dotIdx = numDots - 1;
          dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === dotIdx);
          });
      } else {
          dots.forEach((dot, i) => {
              dot.classList.toggle('active', i === idx);
          });
      }
  }

  function showImage(idx, isAuto = false) {
      if (typeof idx !== 'number' || idx < 0 || idx >= imgContainersSorted.length) return;
      
      if (isMobile()) {
          const viewportWidth = window.innerWidth;
          const imageWidth = viewportWidth - 100; 
          const gap = 60; 
          const scrollLeft = idx * (imageWidth + gap);
          
          sliderImages.scrollTo({
              left: scrollLeft,
              behavior: isAuto ? 'auto' : 'smooth'
          });
      } else if (isTablet()) {
      
          const containerWidth = 600; 
          let pairIdx = Math.floor(idx / 2);
          let scrollLeft = pairIdx * (containerWidth / 2 + 12);
          sliderImages.scrollTo({
              left: scrollLeft,
              behavior: isAuto ? 'auto' : 'smooth'
          });
          updateDots(pairIdx * 2);
          currentIndex = pairIdx * 2;
          return;
      } else {
     
          imgContainersSorted[idx].scrollIntoView({
              behavior: isAuto ? 'auto' : 'smooth',
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
      let nextIndex;
      if (isTablet()) {
          const numDots = Math.ceil(imgContainersSorted.length / 2);
          let dotIdx = Math.floor(currentIndex / 2);
          dotIdx = (dotIdx + 1) % numDots;
          nextIndex = dotIdx * 2;
          if (nextIndex >= imgContainersSorted.length) {
              nextIndex = imgContainersSorted.length - 1;
          }
          showImage(nextIndex, false);
          return;
      } else {
          nextIndex = (currentIndex + 1) % imgContainersSorted.length;
      }
      showImage(nextIndex, false);
  }

  function prevImage() {
      let prevIndex;
      if (isTablet()) {
          const numDots = Math.ceil(imgContainersSorted.length / 2);
          let dotIdx = Math.floor(currentIndex / 2);
          dotIdx = (dotIdx - 1 + numDots) % numDots;
          prevIndex = dotIdx * 2;
          if (prevIndex >= imgContainersSorted.length) {
              prevIndex = imgContainersSorted.length - 1;
          }
          showImage(prevIndex, false);
          return;
      } else {
          prevIndex = (currentIndex - 1 + imgContainersSorted.length) % imgContainersSorted.length;
      }
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

  const introSection = document.querySelector('.intro-section');
  let observer;
  let isIntroVisible = true;
  function startAutoplayIfVisible() {
      if (isIntroVisible) {
          startAutoPlay();
      } else {
          if (autoPlayInterval) clearInterval(autoPlayInterval);
      }
  }
  if ('IntersectionObserver' in window && introSection) {
      observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              isIntroVisible = entry.isIntersecting;
              startAutoplayIfVisible();
          });
      }, { threshold: 0.2 }); 
      observer.observe(introSection);
  }

  function startAutoPlay() {
      if (!isIntroVisible) return;
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
          // No avanzar si el usuario está interactuando en tablet
          if (isTablet() && typeof userInteractedTablet !== 'undefined' && userInteractedTablet) return;
          let nextIndex;
          if (isTablet()) {
              const numDots = Math.ceil(imgContainersSorted.length / 2);
              let dotIdx = Math.floor(currentIndex / 2);
              dotIdx = (dotIdx + 1) % numDots;
              nextIndex = dotIdx * 2;
              if (nextIndex >= imgContainersSorted.length) {
                  nextIndex = imgContainersSorted.length - 1;
              }
              showImage(nextIndex, true);
              return;
          } else {
              nextIndex = (currentIndex + 1) % imgContainersSorted.length;
          }
          showImage(nextIndex, true);
      }, 2500);
  }

  if (imgContainersSorted.length > 0) {
      showImage(0, false);
      startAutoplayIfVisible();
  }

  renderDots();

  window.addEventListener('resize', () => {
      renderDots();
      showImage(currentIndex, false);
  });

  if (sliderImages) {
      let isTabletSnapping = false;
      let userInteractedTablet = false;
      let userScrollTimeoutTablet;
      let lastPairIdx = 0;

      // Pausar autoplay al tocar o empezar a deslizar
      ['pointerdown', 'touchstart'].forEach(evt => {
          sliderImages.addEventListener(evt, function() {
              if (isTablet()) {
                  userInteractedTablet = true;
                  if (autoPlayInterval) clearInterval(autoPlayInterval);
                  if (userScrollTimeoutTablet) clearTimeout(userScrollTimeoutTablet);
              }
          }, { passive: true });
      });

      // Snap y reactivar autoplay solo al soltar (no en cada scroll)
      ['pointerup', 'touchend'].forEach(evt => {
          sliderImages.addEventListener(evt, function() {
              if (isTablet()) {
                  const containerWidth = 600; // Debe coincidir con el CSS
                  const scrollLeft = sliderImages.scrollLeft;
                  const pairIdx = Math.round(scrollLeft / (containerWidth / 2 + 22.5));
                  const snapTo = pairIdx * (containerWidth / 2 + 22.5);
                  isTabletSnapping = true;
                  sliderImages.scrollTo({ left: snapTo, behavior: 'smooth' });
                  setTimeout(() => { isTabletSnapping = false; }, 400);
                  updateDots(pairIdx * 2);
                  currentIndex = pairIdx * 2;
                  lastPairIdx = pairIdx;
                  if (userScrollTimeoutTablet) clearTimeout(userScrollTimeoutTablet);
                  userScrollTimeoutTablet = setTimeout(() => {
                      userInteractedTablet = false;
                      startAutoPlay();
                  }, 2000);
              }
          }, { passive: true });
      });

      // El scroll solo actualiza el dot, no hace snap ni pausa autoplay
      sliderImages.addEventListener('scroll', function() {
          if (isTablet()) {
              if (isTabletSnapping) return;
              const containerWidth = 600;
              const scrollLeft = sliderImages.scrollLeft;
              const pairIdx = Math.round(scrollLeft / (containerWidth / 2 + 22.5));
              updateDots(pairIdx * 2);
              currentIndex = pairIdx * 2;
              lastPairIdx = pairIdx;
          } else {
              let closestIdx = 0;
              let minDiff = Infinity;
              const sliderRect = sliderImages.getBoundingClientRect();
              imgContainersSorted.forEach((container, idx) => {
                  const rect = container.getBoundingClientRect();
                  const diff = Math.abs(rect.left - sliderRect.left);
                  if (diff < minDiff) {
                      minDiff = diff;
                      closestIdx = idx;
                  }
              });
              updateDots(closestIdx);
              currentIndex = closestIdx;
          }
      });
  }


  if (isMobile() && sliderImages) {
      let touchStartX = 0;
      let touchEndX = 0;
      let touchMoved = false;
      let userInteracted = false;
      let userScrollTimeout;

      function pauseAutoplayForUser() {
          userInteracted = true;
          if (autoPlayInterval) clearInterval(autoPlayInterval);
          if (userScrollTimeout) clearTimeout(userScrollTimeout);
          userScrollTimeout = setTimeout(() => {
              userInteracted = false;
              startAutoplayIfVisible();
          }, 2000); 
      }
      sliderImages.addEventListener('touchstart', function(e) {
          if (e.touches.length === 1) {
              touchStartX = e.touches[0].clientX;
              touchMoved = false;
          }
      }, { passive: true });

      sliderImages.addEventListener('touchmove', function(e) {
          if (e.touches.length === 1) {
              touchEndX = e.touches[0].clientX;
              touchMoved = true;
          }
      }, { passive: true });

      sliderImages.addEventListener('touchend', function(e) {
          if (!touchMoved) return;
          const deltaX = touchEndX - touchStartX;
          if (Math.abs(deltaX) > 50) { 
              if (deltaX < 0) {
                  nextImage();
              } else {
                  prevImage();
              }
              pauseAutoplayForUser();
          }
      });

    
      sliderImages.addEventListener('scroll', function() {
          pauseAutoplayForUser();
      });
  }

  // GUARDA el HTML original de la galería de amenidades
  const amenidadesGallery = document.querySelector('.combined-amenities-cta .gallery-images');
  let originalAmenidadesHTML = '';
  if (amenidadesGallery) {
    originalAmenidadesHTML = amenidadesGallery.innerHTML;
  }

  let lastBreakpoint = getBreakpoint();

  window.addEventListener('resize', function() {
    const currentBreakpoint = getBreakpoint();
    if (currentBreakpoint !== lastBreakpoint) {
      // Restaura el HTML original SOLO para amenidades
      if (amenidadesGallery) {
        amenidadesGallery.innerHTML = originalAmenidadesHTML;
      }
      // Vuelve a ejecutar la lógica de pares SOLO si es móvil o tablet
      if (currentBreakpoint === 'mobile' || currentBreakpoint === 'tablet') {
        // --- INICIO LÓGICA DE PARES AMENIDADES ---
        const gallery = amenidadesGallery;
        const items = Array.from(gallery.querySelectorAll('.gallery-item'));
        if (items.length < 2) return;
        let pairs = [];
        for (let i = 0; i < items.length; i += 2) {
          const pair = document.createElement('div');
          pair.className = 'amenidades-slide-pair amenidades-slide-horizontal';
          const first = items[i];
          const second = items[i+1];
          if (((i/2) % 2) === 0) {
            if (first) pair.appendChild(first.cloneNode(true));
            if (second) pair.appendChild(second.cloneNode(true));
          } else {
            if (second) pair.appendChild(second.cloneNode(true));
            if (first) pair.appendChild(first.cloneNode(true));
          }
          gallery.appendChild(pair);
          pairs.push(pair);
        }
        const slideTrack = document.createElement('div');
        slideTrack.className = 'amenidades-slide-track';
        while (gallery.firstChild) {
          slideTrack.appendChild(gallery.firstChild);
        }
        gallery.appendChild(slideTrack);
        let currentPair = 1; 
        let isTransitioning = false;
        function showPair(idx, animate = true) {
          currentPair = idx;
          const offset = -idx * 100;
          slideTrack.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none';
          slideTrack.style.transform = `translateX(${offset}vw)`;
          let dotIdx = idx-1;
          if (idx === 0) dotIdx = pairs.length-1;
          if (idx === pairs.length+1) dotIdx = 0;
          updateDots(dotIdx);
          isTransitioning = animate;
        }
        let dots = gallery.parentElement.querySelector('.gallery-dots');
        if (dots) dots.innerHTML = '';
        pairs.forEach((_, i) => {
          const dot = document.createElement('div');
          dot.className = 'dot' + (i === 0 ? ' active' : '');
          dot.addEventListener('click', () => {
            showPair(i+1);
            resetAutoPlay();
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
          showPair(currentPair-1);
          resetAutoPlay();
        };
        if (right) right.onclick = () => {
          showPair(currentPair+1);
          resetAutoPlay();
        };
        let autoInterval = null;
        function startAutoPlay() {
          if (autoInterval) clearInterval(autoInterval);
          autoInterval = setInterval(() => {
            showPair(currentPair+1);
          }, 3500);
        }
        function resetAutoPlay() {
          if (autoInterval) clearInterval(autoInterval);
          startAutoPlay();
        }
        let touchStartX = 0;
        let touchEndX = 0;
        let touchMoved = false;
        slideTrack.addEventListener('touchstart', function(e) {
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchMoved = false;
            slideTrack.style.transition = 'none';
          }
        }, { passive: true });
        slideTrack.addEventListener('touchmove', function(e) {
          if (e.touches.length === 1) {
            touchEndX = e.touches[0].clientX;
            touchMoved = true;
            const deltaX = touchEndX - touchStartX;
            slideTrack.style.transform = `translateX(${-currentPair * 100 + (deltaX / window.innerWidth) * 100}vw)`;
          }
        }, { passive: true });
        slideTrack.addEventListener('touchend', function(e) {
          if (!touchMoved) {
            showPair(currentPair);
            startAutoPlay();
            return;
          }
          const deltaX = touchEndX - touchStartX;
          if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) {
              showPair(currentPair+1);
            } else {
              showPair(currentPair-1);
            }
            resetAutoPlay();
          } else {
            showPair(currentPair);
            startAutoPlay();
          }
        });
        slideTrack.addEventListener('transitionend', function() {
          if (!isTransitioning) return;
          if (currentPair === 0) {
            showPair(pairs.length, false);
          } else if (currentPair === pairs.length+1) {
            showPair(1, false);
          }
          isTransitioning = false;
        });
        showPair(1, false);
        startAutoPlay();
        // --- FIN LÓGICA DE PARES AMENIDADES ---
      }
      // Si es desktop, no hagas nada más: el HTML original ya es el correcto
    }
    lastBreakpoint = currentBreakpoint;
  });

  function getBreakpoint() {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
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
  return window.innerWidth <= 1024;
}
const gallery = document.querySelector('.combined-amenities-cta .gallery-images');
if (!gallery) return;
const items = Array.from(gallery.querySelectorAll('.gallery-item'));
if (!isMobile() || items.length < 2) return;

gallery.querySelectorAll('.amenidades-slide-pair').forEach(e => e.remove());


let pairs = [];
for (let i = 0; i < items.length; i += 2) {
  const pair = document.createElement('div');
  pair.className = 'amenidades-slide-pair amenidades-slide-horizontal';
  const first = items[i];
  const second = items[i+1];
  if (((i/2) % 2) === 0) {
    
    if (first) pair.appendChild(first.cloneNode(true));
    if (second) pair.appendChild(second.cloneNode(true));
  } else {
   
    if (second) pair.appendChild(second.cloneNode(true));
    if (first) pair.appendChild(first.cloneNode(true));
  }
  gallery.appendChild(pair);
  pairs.push(pair);
}


const slideTrack = document.createElement('div');
slideTrack.className = 'amenidades-slide-track';
while (gallery.firstChild) {
  slideTrack.appendChild(gallery.firstChild);
}
gallery.appendChild(slideTrack);

let currentPair = 0;
function showPair(idx, animate = true) {
  currentPair = idx;
  const offset = -idx * 100;
  slideTrack.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none';
  slideTrack.style.transform = `translateX(${offset}vw)`;
  updateDots(idx);
}

let dots = gallery.parentElement.querySelector('.gallery-dots');
if (dots) dots.innerHTML = '';
pairs.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => {
    showPair(i);
    resetAutoPlay();
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
  resetAutoPlay();
};
if (right) right.onclick = () => {
  let idx = (currentPair + 1) % pairs.length;
  showPair(idx);
  resetAutoPlay();
};

let autoInterval = null;
function startAutoPlay() {
  if (autoInterval) clearInterval(autoInterval);
  autoInterval = setInterval(() => {
    let idx = (currentPair + 1) % pairs.length;
    showPair(idx);
  }, 3500);
}
function resetAutoPlay() {
  if (autoInterval) clearInterval(autoInterval);
  startAutoPlay();
}

let touchStartX = 0;
let touchEndX = 0;
let touchMoved = false;

slideTrack.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchMoved = false;
    slideTrack.style.transition = 'none';
  }
}, { passive: true });

slideTrack.addEventListener('touchmove', function(e) {
  if (e.touches.length === 1) {
    touchEndX = e.touches[0].clientX;
    touchMoved = true;
    const deltaX = touchEndX - touchStartX;
    slideTrack.style.transform = `translateX(${-currentPair * 100 + (deltaX / window.innerWidth) * 100}vw)`;
  }
}, { passive: true });

slideTrack.addEventListener('touchend', function(e) {
  if (!touchMoved) {
    showPair(currentPair);
    startAutoPlay();
    return;
  }
  const deltaX = touchEndX - touchStartX;
  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0) {
      let idx = (currentPair + 1) % pairs.length;
      showPair(idx);
    } else {
      let idx = (currentPair - 1 + pairs.length) % pairs.length;
      showPair(idx);
    }
    resetAutoPlay();
  } else {
    showPair(currentPair);
    startAutoPlay();
  }
});

showPair(0, false);
startAutoPlay();
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
if (window.innerWidth > 1024) {
  resetAmenidadesGallery();
}
});

if (window.innerWidth <= 1024) {
const imgContainers = document.querySelectorAll('.img-container');
const progressDot = document.querySelector('.slider-dots .dot');
if (progressDot && imgContainers.length > 0) {
    const progress = ((index + 1) / imgContainers.length) * 100;
    progressDot.style.width = progress + '%';
}
}

if (isMobile() && gallery.classList.contains('gallery-images')) {

  while (gallery.firstChild) gallery.removeChild(gallery.firstChild);

  const firstPair = pairs[0].cloneNode(true);
  const lastPair = pairs[pairs.length-1].cloneNode(true);
  const slideTrack = document.createElement('div');
  slideTrack.className = 'amenidades-slide-track';
  slideTrack.appendChild(lastPair);
  pairs.forEach(p => slideTrack.appendChild(p));
  slideTrack.appendChild(firstPair); 
  gallery.appendChild(slideTrack);

  let currentPair = 1; 
  let isTransitioning = false;
  function showPair(idx, animate = true) {
    currentPair = idx;
    const offset = -idx * 100;
    slideTrack.style.transition = animate ? 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' : 'none';
    slideTrack.style.transform = `translateX(${offset}vw)`;

    let dotIdx = idx-1;
    if (idx === 0) dotIdx = pairs.length-1;
    if (idx === pairs.length+1) dotIdx = 0;
    updateDots(dotIdx);
    isTransitioning = animate;
  }

  let dots = gallery.parentElement.querySelector('.gallery-dots');
  if (dots) dots.innerHTML = '';
  pairs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      showPair(i+1);
      resetAutoPlay();
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
    showPair(currentPair-1);
    resetAutoPlay();
  };
  if (right) right.onclick = () => {
    showPair(currentPair+1);
    resetAutoPlay();
  };

  let autoInterval = null;
  function startAutoPlay() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
      showPair(currentPair+1);
    }, 3500);
  }
  function resetAutoPlay() {
    if (autoInterval) clearInterval(autoInterval);
    startAutoPlay();
  }

  let touchStartX = 0;
  let touchEndX = 0;
  let touchMoved = false;
  slideTrack.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchMoved = false;
      slideTrack.style.transition = 'none';
    }
  }, { passive: true });
  slideTrack.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
      touchMoved = true;
      const deltaX = touchEndX - touchStartX;
      slideTrack.style.transform = `translateX(${-currentPair * 100 + (deltaX / window.innerWidth) * 100}vw)`;
    }
  }, { passive: true });
  slideTrack.addEventListener('touchend', function(e) {
    if (!touchMoved) {
      showPair(currentPair);
      startAutoPlay();
      return;
    }
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        showPair(currentPair+1);
      } else {
        showPair(currentPair-1);
      }
      resetAutoPlay();
    } else {
      showPair(currentPair);
      startAutoPlay();
    }
  });

  slideTrack.addEventListener('transitionend', function() {
    if (!isTransitioning) return;
    if (currentPair === 0) {
      showPair(pairs.length, false);
    } else if (currentPair === pairs.length+1) {
      showPair(1, false);
    }
    isTransitioning = false;
  });


  showPair(1, false);
  startAutoPlay();
}
function isTablet() {
  return window.innerWidth >= 768 && window.innerWidth <= 1024;
}
(function() {
  let lastBreakpoint = getBreakpoint();

  window.addEventListener('resize', function() {
    const currentBreakpoint = getBreakpoint();
    if (currentBreakpoint !== lastBreakpoint) {
      // Destruye el carrusel de amenidades
      resetAmenidadesGallery();
      // Espera un poco y vuelve a inicializar el carrusel
      setTimeout(() => {
        // Vuelve a ejecutar el código de inicialización del carrusel de amenidades
        // Puedes copiar la función que tienes para inicializar el carrusel aquí
        // O simplemente recarga la página si prefieres:
        window.location.reload();
      }, 200);
    }
    lastBreakpoint = currentBreakpoint;
  });

  function getBreakpoint() {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }
})();

// === INICIO AJUSTE FINAL CARRUSEL INTRO ===
(function() {
  const sliderImages = document.querySelector('.intro-section .slider-images');
  const imgContainers = Array.from(sliderImages ? sliderImages.querySelectorAll('.img-container') : []);
  const dotsContainer = document.querySelector('.intro-section .slider-dots');
  const leftButton = document.querySelector('.intro-section .left-button');
  const rightButton = document.querySelector('.intro-section .right-button');
  let currentIndex = 0;
  let autoPlayInterval = null;
  let userInteracted = false;
  let userScrollTimeout = null;

  function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth <= 1024;
  }
  function isMobile() {
    return window.innerWidth < 768;
  }
  function isDesktop() {
    return window.innerWidth > 1024;
  }

  // --- Dots dinámicos ---
  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    let numDots = isTablet() ? Math.ceil(imgContainers.length / 2) : imgContainers.length;
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        if (isTablet()) {
          showImage(i * 2, false);
        } else {
          showImage(i, false);
        }
        pauseAutoplayForUser();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots(idx) {
    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
    if (isTablet()) {
      let dotIdx = Math.floor(idx / 2);
      dots.forEach((dot, i) => dot.classList.toggle('active', i === dotIdx));
    } else {
      dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    }
  }

  // --- Mostrar imagen/par ---
  function showImage(idx, isAuto = false) {
    if (!sliderImages) return;
    if (isTablet()) {
      // Pares: [0,1], [2,3], [4,5], [6]
      let pairCount = Math.ceil(imgContainers.length / 2);
      let pairIdx = Math.floor(idx / 2);
      if (pairIdx < 0) pairIdx = pairCount - 1;
      if (pairIdx >= pairCount) pairIdx = 0;
      const containerWidth = imgContainers[0].offsetWidth;
      const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
      let scrollLeft = pairIdx * (containerWidth * 2 + gap * 2);
      sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
      currentIndex = pairIdx * 2;
      updateDots(pairIdx);
    } else if (isMobile()) {
      // De una en una
      let maxIdx = imgContainers.length - 1;
      if (idx < 0) idx = maxIdx;
      if (idx > maxIdx) idx = 0;
      const containerWidth = imgContainers[0].offsetWidth;
      const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
      const scrollLeft = idx * (containerWidth + gap);
      sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
      currentIndex = idx;
      updateDots(idx);
    } else {
      // Desktop: la imagen activa siempre a la izquierda
      let maxIdx = imgContainers.length - 1;
      if (idx < 0) idx = maxIdx;
      if (idx > maxIdx) idx = 0;
      const containerWidth = imgContainers[0].offsetWidth;
      const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
      const scrollLeft = idx * (containerWidth + gap);
      sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
      currentIndex = idx;
      updateDots(idx);
    }
  }

  function nextImage(isAuto = false) {
    if (isTablet()) {
      let pairCount = Math.ceil(imgContainers.length / 2);
      let pairIdx = Math.floor(currentIndex / 2);
      pairIdx = (pairIdx + 1) % pairCount;
      showImage(pairIdx * 2, isAuto);
    } else {
      let maxIdx = imgContainers.length - 1;
      let nextIdx = currentIndex + 1;
      if (nextIdx > maxIdx) nextIdx = 0;
      showImage(nextIdx, isAuto);
    }
  }
  function prevImage() {
    if (isTablet()) {
      let pairCount = Math.ceil(imgContainers.length / 2);
      let pairIdx = Math.floor(currentIndex / 2);
      pairIdx = (pairIdx - 1 + pairCount) % pairCount;
      showImage(pairIdx * 2, false);
    } else {
      let maxIdx = imgContainers.length - 1;
      let prevIdx = currentIndex - 1;
      if (prevIdx < 0) prevIdx = maxIdx;
      showImage(prevIdx, false);
    }
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      if (!userInteracted) nextImage(true);
    }, 3500);
  }
  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }
  function pauseAutoplayForUser() {
    userInteracted = true;
    stopAutoPlay();
    if (userScrollTimeout) clearTimeout(userScrollTimeout);
    userScrollTimeout = setTimeout(() => {
      userInteracted = false;
      startAutoPlay();
    }, 2000);
  }

  // Flechas desktop y tablet
  if (leftButton) {
    leftButton.onclick = () => {
      prevImage();
      pauseAutoplayForUser();
    };
  }
  if (rightButton) {
    rightButton.onclick = () => {
      nextImage();
      pauseAutoplayForUser();
    };
  }

  // Touch para tablet y móvil
  if (sliderImages) {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchMoved = false;
    sliderImages.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchmove', function(e) {
      if (e.touches.length === 1) {
        touchEndX = e.touches[0].clientX;
        touchMoved = true;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchend', function(e) {
      if (!touchMoved) return;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          nextImage();
        } else {
          prevImage();
        }
        pauseAutoplayForUser();
      }
    });
  }

  // Sincronizar dots con scroll manual (tablet y desktop)
  if (sliderImages) {
    sliderImages.addEventListener('scroll', function() {
      if (isTablet()) {
        const containerWidth = imgContainers[0].offsetWidth;
        const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
        let pairIdx = Math.round(sliderImages.scrollLeft / (containerWidth * 2 + gap * 2));
        let pairCount = Math.ceil(imgContainers.length / 2);
        if (pairIdx < 0) pairIdx = 0;
        if (pairIdx >= pairCount) pairIdx = pairCount - 1;
        currentIndex = pairIdx * 2;
        updateDots(pairIdx);
      } else if (isDesktop()) {
        const containerWidth = imgContainers[0].offsetWidth;
        const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
        let idx = Math.round(sliderImages.scrollLeft / (containerWidth + gap));
        let maxIdx = imgContainers.length - 1;
        if (idx < 0) idx = 0;
        if (idx > maxIdx) idx = maxIdx;
        currentIndex = idx;
        updateDots(idx);
      }
    });
  }

  // Responsive reset
  window.addEventListener('resize', () => {
    renderDots();
    showImage(currentIndex, false);
  });

  // Inicialización
  renderDots();
  showImage(0, true);
  startAutoPlay();
})();
// === FIN AJUSTE FINAL CARRUSEL INTRO ===

// === INICIO AJUSTE DESKTOP CARRUSEL INTRO ===
(function() {
  const sliderImages = document.querySelector('.intro-section .slider-images');
  const imgContainers = Array.from(sliderImages ? sliderImages.querySelectorAll('.img-container') : []);
  const dotsContainer = document.querySelector('.intro-section .slider-dots');
  const leftButton = document.querySelector('.intro-section .left-button');
  const rightButton = document.querySelector('.intro-section .right-button');
  let currentIndex = 0;
  let autoPlayInterval = null;
  let userInteracted = false;
  let userScrollTimeout = null;
  let isDesktopSnapping = false;

  function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth <= 1024;
  }
  function isMobile() {
    return window.innerWidth < 768;
  }
  function isDesktop() {
    return window.innerWidth > 1024;
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    let numDots = isTablet() ? Math.ceil(imgContainers.length / 2) : imgContainers.length;
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        if (isTablet()) {
          showImage(i * 2, false);
        } else {
          showImage(i, false);
        }
        pauseAutoplayForUser();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots(idx) {
    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
    if (isTablet()) {
      let dotIdx = Math.floor(idx / 2);
      dots.forEach((dot, i) => dot.classList.toggle('active', i === dotIdx));
    } else {
      dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    }
  }

  function snapToImage(idx) {
    // Fuerza el scroll exactamente al inicio de la imagen idx
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
    const scrollLeft = idx * (containerWidth + gap);
    isDesktopSnapping = true;
    sliderImages.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    setTimeout(() => { isDesktopSnapping = false; }, 400);
  }

  function showImage(idx, isAuto = false) {
    if (!sliderImages) return;
    if (isTablet()) {
      let pairCount = Math.ceil(imgContainers.length / 2);
      let pairIdx = Math.floor(idx / 2);
      if (pairIdx < 0) pairIdx = pairCount - 1;
      if (pairIdx >= pairCount) pairIdx = 0;
      const containerWidth = imgContainers[0].offsetWidth;
      const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
      let scrollLeft = pairIdx * (containerWidth * 2 + gap * 2);
      sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
      currentIndex = pairIdx * 2;
      updateDots(pairIdx);
    } else if (isMobile()) {
      let maxIdx = imgContainers.length - 1;
      if (idx < 0) idx = maxIdx;
      if (idx > maxIdx) idx = 0;
      const containerWidth = imgContainers[0].offsetWidth;
      const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
      const scrollLeft = idx * (containerWidth + gap);
      sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
      currentIndex = idx;
      updateDots(idx);
    } else {
      // Desktop: la imagen activa siempre a la izquierda, snap exacto
      let maxIdx = imgContainers.length - 1;
      if (idx < 0) idx = maxIdx;
      if (idx > maxIdx) idx = 0;
      snapToImage(idx);
      currentIndex = idx;
      updateDots(idx);
    }
  }

  function nextImage(isAuto = false) {
    if (isTablet()) {
      let pairCount = Math.ceil(imgContainers.length / 2);
      let pairIdx = Math.floor(currentIndex / 2);
      pairIdx = (pairIdx + 1) % pairCount;
      showImage(pairIdx * 2, isAuto);
    } else {
      let maxIdx = imgContainers.length - 1;
      let nextIdx = currentIndex + 1;
      if (nextIdx > maxIdx) nextIdx = 0;
      showImage(nextIdx, isAuto);
    }
  }
  function prevImage() {
    if (isTablet()) {
      let pairCount = Math.ceil(imgContainers.length / 2);
      let pairIdx = Math.floor(currentIndex / 2);
      pairIdx = (pairIdx - 1 + pairCount) % pairCount;
      showImage(pairIdx * 2, false);
    } else {
      let maxIdx = imgContainers.length - 1;
      let prevIdx = currentIndex - 1;
      if (prevIdx < 0) prevIdx = maxIdx;
      showImage(prevIdx, false);
    }
  }

  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      if (!userInteracted) nextImage(true);
    }, 3500);
  }
  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }
  function pauseAutoplayForUser() {
    userInteracted = true;
    stopAutoPlay();
    if (userScrollTimeout) clearTimeout(userScrollTimeout);
    userScrollTimeout = setTimeout(() => {
      userInteracted = false;
      startAutoPlay();
    }, 2000);
  }

  if (leftButton) {
    leftButton.onclick = () => {
      prevImage();
      pauseAutoplayForUser();
    };
  }
  if (rightButton) {
    rightButton.onclick = () => {
      nextImage();
      pauseAutoplayForUser();
    };
  }

  if (sliderImages) {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchMoved = false;
    sliderImages.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchmove', function(e) {
      if (e.touches.length === 1) {
        touchEndX = e.touches[0].clientX;
        touchMoved = true;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchend', function(e) {
      if (!touchMoved) return;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          nextImage();
        } else {
          prevImage();
        }
        pauseAutoplayForUser();
      }
    });
  }

  // Sincronizar dots con scroll manual (tablet y desktop)
  if (sliderImages) {
    sliderImages.addEventListener('scroll', function() {
      if (isTablet()) {
        if (isDesktopSnapping) return;
        const containerWidth = imgContainers[0].offsetWidth;
        const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
        let pairIdx = Math.round(sliderImages.scrollLeft / (containerWidth * 2 + gap * 2));
        let pairCount = Math.ceil(imgContainers.length / 2);
        if (pairIdx < 0) pairIdx = 0;
        if (pairIdx >= pairCount) pairIdx = pairCount - 1;
        currentIndex = pairIdx * 2;
        updateDots(pairIdx);
      } else if (isDesktop()) {
        if (isDesktopSnapping) return;
        const containerWidth = imgContainers[0].offsetWidth;
        const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
        let idx = Math.round(sliderImages.scrollLeft / (containerWidth + gap));
        let maxIdx = imgContainers.length - 1;
        if (idx < 0) idx = 0;
        if (idx > maxIdx) idx = maxIdx;
        // Snap automático al inicio de la imagen más cercana
        snapToImage(idx);
        currentIndex = idx;
        updateDots(idx);
      }
    });
  }

  window.addEventListener('resize', () => {
    renderDots();
    showImage(currentIndex, false);
  });

  renderDots();
  showImage(0, true);
  startAutoPlay();
})();
// === FIN AJUSTE DESKTOP CARRUSEL INTRO ===

// === INICIO LÓGICA TABLET REESCRITA Y ROBUSTA CARRUSEL INTRO ===
(function() {
  const sliderImages = document.querySelector('.intro-section .slider-images');
  const imgContainers = Array.from(sliderImages ? sliderImages.querySelectorAll('.img-container') : []);
  const dotsContainer = document.querySelector('.intro-section .slider-dots');
  const leftButton = document.querySelector('.intro-section .left-button');
  const rightButton = document.querySelector('.intro-section .right-button');
  let currentPair = 0;
  let autoPlayInterval = null;
  let userInteracted = false;
  let userScrollTimeout = null;
  let isTabletSnapping = false;

  function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth <= 1024;
  }

  function getTabletPairs() {
    const pairs = [];
    for (let i = 0; i < imgContainers.length; i += 2) {
      if (i + 1 < imgContainers.length) {
        pairs.push([i, i + 1]);
      } else {
        pairs.push([i]);
      }
    }
    return pairs;
  }

  function renderDotsTablet() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const pairs = getTabletPairs();
    for (let i = 0; i < pairs.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        showPair(i, false);
        pauseAutoplayForUser();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDotsTablet(pairIdx) {
    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === pairIdx));
  }

  function showPair(pairIdx, isAuto = false) {
    const pairs = getTabletPairs();
    if (pairIdx < 0) pairIdx = pairs.length - 1;
    if (pairIdx >= pairs.length) pairIdx = 0;
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
    // Solo un gap entre pares
    const scrollLeft = pairIdx * (containerWidth * 2 + gap);
    isTabletSnapping = true;
    sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
    setTimeout(() => { isTabletSnapping = false; }, 400);
    currentPair = pairIdx;
    updateDotsTablet(pairIdx);
  }

  function nextPair(isAuto = false) {
    showPair(currentPair + 1, isAuto);
  }
  function prevPair() {
    showPair(currentPair - 1, false);
  }

  function startAutoPlayTablet() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      if (!userInteracted) nextPair(true);
    }, 3500);
  }
  function stopAutoPlayTablet() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }
  function pauseAutoplayForUser() {
    userInteracted = true;
    stopAutoPlayTablet();
    if (userScrollTimeout) clearTimeout(userScrollTimeout);
    userScrollTimeout = setTimeout(() => {
      userInteracted = false;
      startAutoPlayTablet();
    }, 2000);
  }

  if (leftButton) {
    leftButton.onclick = () => {
      prevPair();
      pauseAutoplayForUser();
    };
  }
  if (rightButton) {
    rightButton.onclick = () => {
      nextPair();
      pauseAutoplayForUser();
    };
  }

  if (sliderImages) {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchMoved = false;
    sliderImages.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchmove', function(e) {
      if (e.touches.length === 1) {
        touchEndX = e.touches[0].clientX;
        touchMoved = true;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchend', function(e) {
      if (!touchMoved) return;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          nextPair();
        } else {
          prevPair();
        }
        pauseAutoplayForUser();
      }
    });
  }

  if (sliderImages) {
    sliderImages.addEventListener('scroll', function() {
      if (isTablet()) {
        if (isTabletSnapping) return;
        const containerWidth = imgContainers[0].offsetWidth;
        const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
        let pairIdx = Math.round(sliderImages.scrollLeft / (containerWidth * 2 + gap));
        const pairs = getTabletPairs();
        if (pairIdx < 0) pairIdx = 0;
        if (pairIdx >= pairs.length) pairIdx = pairs.length - 1;
        currentPair = pairIdx;
        updateDotsTablet(pairIdx);
      }
    });
  }

  window.addEventListener('resize', () => {
    if (isTablet()) {
      renderDotsTablet();
      showPair(currentPair, false);
    }
  });

  // Inicialización solo en tablet
  if (isTablet()) {
    renderDotsTablet();
    showPair(0, true);
    startAutoPlayTablet();
  }
})();
// === FIN LÓGICA TABLET REESCRITA Y ROBUSTA CARRUSEL INTRO ===

// === INICIO CARRUSEL UNIFICADO Y ROBUSTO ===
(function() {
  const sliderImages = document.querySelector('.intro-section .slider-images');
  const imgContainers = Array.from(sliderImages ? sliderImages.querySelectorAll('.img-container') : []);
  const dotsContainer = document.querySelector('.intro-section .slider-dots');
  const leftButton = document.querySelector('.intro-section .left-button');
  const rightButton = document.querySelector('.intro-section .right-button');

  let currentIdx = 0;
  let autoPlayInterval = null;
  let userInteracted = false;
  let userScrollTimeout = null;
  let isSnapping = false;
  let touchStartX = 0;
  let touchEndX = 0;
  let touchMoved = false;

  function isTablet() {
    return window.innerWidth >= 768 && window.innerWidth <= 1024;
  }
  function isMobile() {
    return window.innerWidth < 768;
  }
  function isDesktop() {
    return window.innerWidth > 1024;
  }

  function getTabletPairs() {
    const pairs = [];
    for (let i = 0; i < imgContainers.length; i += 2) {
      if (i + 1 < imgContainers.length) {
        pairs.push([i, i + 1]);
      } else {
        pairs.push([i]);
      }
    }
    return pairs;
  }

  function clearListeners() {
    sliderImages.replaceWith(sliderImages.cloneNode(true));
  }

  function renderDotsTablet() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const pairs = getTabletPairs();
    for (let i = 0; i < pairs.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        showPair(i, false);
        pauseAutoplayForUser();
      });
      dotsContainer.appendChild(dot);
    }
  }
  function renderDotsMobile() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < imgContainers.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        showImageMobile(i, false);
        pauseAutoplayForUser();
      });
      dotsContainer.appendChild(dot);
    }
  }
  function renderDotsDesktop() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < imgContainers.length; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        showImageDesktop(i, false);
        pauseAutoplayForUser();
      });
      dotsContainer.appendChild(dot);
    }
  }
  function updateDotsTablet(pairIdx) {
    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === pairIdx));
  }
  function updateDotsMobile(idx) {
    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
  }
  function updateDotsDesktop(idx) {
    if (!dotsContainer) return;
    const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
  }

  // --- TABLET ---
  function showPair(pairIdx, isAuto = false) {
    const pairs = getTabletPairs();
    if (pairIdx < 0) pairIdx = pairs.length - 1;
    if (pairIdx >= pairs.length) pairIdx = 0;
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
    const scrollLeft = pairIdx * (containerWidth * 2 + gap);
    isSnapping = true;
    sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
    setTimeout(() => { isSnapping = false; }, 400);
    currentIdx = pairIdx;
    updateDotsTablet(pairIdx);
  }
  function nextPair(isAuto = false) {
    showPair(currentIdx + 1, isAuto);
  }
  function prevPair() {
    showPair(currentIdx - 1, false);
  }

  // --- MOBILE ---
  function showImageMobile(idx, isAuto = false) {
    let maxIdx = imgContainers.length - 1;
    if (idx < 0) idx = maxIdx;
    if (idx > maxIdx) idx = 0;
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
    const scrollLeft = idx * (containerWidth + gap);
    sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
    currentIdx = idx;
    updateDotsMobile(idx);
  }
  function nextImageMobile(isAuto = false) {
    showImageMobile(currentIdx + 1, isAuto);
  }
  function prevImageMobile() {
    showImageMobile(currentIdx - 1, false);
  }

  // --- DESKTOP ---
  function showImageDesktop(idx, isAuto = false) {
    let maxIdx = imgContainers.length - 1;
    if (idx < 0) idx = maxIdx;
    if (idx > maxIdx) idx = 0;
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
    const scrollLeft = idx * (containerWidth + gap);
    isSnapping = true;
    sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
    setTimeout(() => { isSnapping = false; }, 400);
    currentIdx = idx;
    updateDotsDesktop(idx);
  }
  function nextImageDesktop(isAuto = false) {
    showImageDesktop(currentIdx + 1, isAuto);
  }
  function prevImageDesktop() {
    showImageDesktop(currentIdx - 1, false);
  }

  // --- AUTOPLAY ---
  function startAutoPlay(mode) {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      if (!userInteracted) {
        if (mode === 'tablet') nextPair(true);
        else if (mode === 'mobile') nextImageMobile(true);
        else if (mode === 'desktop') nextImageDesktop(true);
      }
    }, 3500);
  }
  function stopAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
  }
  function pauseAutoplayForUser(mode) {
    userInteracted = true;
    stopAutoPlay();
    if (userScrollTimeout) clearTimeout(userScrollTimeout);
    userScrollTimeout = setTimeout(() => {
      userInteracted = false;
      startAutoPlay(mode);
    }, 2000);
  }

  // --- INIT Y LISTENERS ---
  function activateTablet() {
    clearListeners();
    renderDotsTablet();
    showPair(0, true);
    startAutoPlay('tablet');
    // Touch
    sliderImages.addEventListener('touchstart', onTouchStartTablet, { passive: true });
    sliderImages.addEventListener('touchmove', onTouchMoveTablet, { passive: true });
    sliderImages.addEventListener('touchend', onTouchEndTablet);
    sliderImages.addEventListener('scroll', onScrollTablet);
    if (leftButton) leftButton.onclick = () => { prevPair(); pauseAutoplayForUser('tablet'); };
    if (rightButton) rightButton.onclick = () => { nextPair(); pauseAutoplayForUser('tablet'); };
  }
  function activateMobile() {
    clearListeners();
    renderDotsMobile();
    showImageMobile(0, true);
    startAutoPlay('mobile');
    // Touch
    sliderImages.addEventListener('touchstart', onTouchStartMobile, { passive: true });
    sliderImages.addEventListener('touchmove', onTouchMoveMobile, { passive: true });
    sliderImages.addEventListener('touchend', onTouchEndMobile);
    sliderImages.addEventListener('scroll', onScrollMobile);
    if (leftButton) leftButton.onclick = () => { prevImageMobile(); pauseAutoplayForUser('mobile'); };
    if (rightButton) rightButton.onclick = () => { nextImageMobile(); pauseAutoplayForUser('mobile'); };
  }
  function activateDesktop() {
    clearListeners();
    renderDotsDesktop();
    showImageDesktop(0, true);
    startAutoPlay('desktop');
    sliderImages.addEventListener('scroll', onScrollDesktop);
    if (leftButton) leftButton.onclick = () => { prevImageDesktop(); pauseAutoplayForUser('desktop'); };
    if (rightButton) rightButton.onclick = () => { nextImageDesktop(); pauseAutoplayForUser('desktop'); };
  }

  // --- TOUCH Y SCROLL HANDLERS ---
  function onTouchStartTablet(e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchMoved = false;
    }
  }
  function onTouchMoveTablet(e) {
    if (e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
      touchMoved = true;
    }
  }
  function onTouchEndTablet(e) {
    if (!touchMoved) return;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) nextPair();
      else prevPair();
      pauseAutoplayForUser('tablet');
    }
  }
  function onScrollTablet() {
    if (isSnapping) return;
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
    let pairIdx = Math.round(sliderImages.scrollLeft / (containerWidth * 2 + gap));
    const pairs = getTabletPairs();
    if (pairIdx < 0) pairIdx = 0;
    if (pairIdx >= pairs.length) pairIdx = pairs.length - 1;
    currentIdx = pairIdx;
    updateDotsTablet(pairIdx);
  }
  function onTouchStartMobile(e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchMoved = false;
    }
  }
  function onTouchMoveMobile(e) {
    if (e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
      touchMoved = true;
    }
  }
  function onTouchEndMobile(e) {
    if (!touchMoved) return;
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) nextImageMobile();
      else prevImageMobile();
      pauseAutoplayForUser('mobile');
    }
  }
  function onScrollMobile() {
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
    let idx = Math.round(sliderImages.scrollLeft / (containerWidth + gap));
    let maxIdx = imgContainers.length - 1;
    if (idx < 0) idx = 0;
    if (idx > maxIdx) idx = maxIdx;
    currentIdx = idx;
    updateDotsMobile(idx);
  }
  function onScrollDesktop() {
    if (isSnapping) return;
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
    let idx = Math.round(sliderImages.scrollLeft / (containerWidth + gap));
    let maxIdx = imgContainers.length - 1;
    if (idx < 0) idx = 0;
    if (idx > maxIdx) idx = maxIdx;
    currentIdx = idx;
    updateDotsDesktop(idx);
  }

  // --- RESPONSIVE HANDLER ---
  let lastMode = '';
  function handleMode() {
    stopAutoPlay();
    if (isTablet()) {
      if (lastMode !== 'tablet') {
        lastMode = 'tablet';
        activateTablet();
      }
    } else if (isMobile()) {
      if (lastMode !== 'mobile') {
        lastMode = 'mobile';
        activateMobile();
      }
    } else {
      if (lastMode !== 'desktop') {
        lastMode = 'desktop';
        activateDesktop();
      }
    }
  }

  window.addEventListener('resize', handleMode);
  handleMode();
})();
// === FIN CARRUSEL UNIFICADO Y ROBUSTO ===

