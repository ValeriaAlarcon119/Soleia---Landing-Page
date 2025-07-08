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
          const viewportWidth = window.innerWidth;
          const imageWidth = viewportWidth - 100; 
          const gap = 60; 
          const scrollLeft = idx * (imageWidth + gap);
          
          sliderImages.scrollTo({
              left: scrollLeft,
              behavior: isAuto ? 'auto' : 'smooth'
          });
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

  // --- AUTOPLAY SOLO SI LA INTRO SECTION ESTÁ VISIBLE ---
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
      }, { threshold: 0.2 }); // 20% visible es suficiente
      observer.observe(introSection);
  }
  // Sobrescribe el startAutoPlay para que solo corra si está visible
  function startAutoPlay() {
      if (!isIntroVisible) return;
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
          let nextIndex = (currentIndex + 1) % imgContainersSorted.length;
          showImage(nextIndex, true);
      }, 2500);
  }
  // Cuando se monta, solo inicia autoplay si está visible
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

  // --- SWIPE Y SCROLL LIBRE EN MÓVIL ---
  if (isMobile() && sliderImages) {
      let touchStartX = 0;
      let touchEndX = 0;
      let touchMoved = false;
      let userInteracted = false;
      let userScrollTimeout;

      // Pausar autoplay cuando el usuario interactúa
      function pauseAutoplayForUser() {
          userInteracted = true;
          if (autoPlayInterval) clearInterval(autoPlayInterval);
          if (userScrollTimeout) clearTimeout(userScrollTimeout);
          userScrollTimeout = setTimeout(() => {
              userInteracted = false;
              startAutoplayIfVisible();
          }, 2000); // 2 segundos
      }

      // Swipe con el dedo
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
          if (Math.abs(deltaX) > 50) { // Solo si el swipe es suficiente
              if (deltaX < 0) {
                  nextImage();
              } else {
                  prevImage();
              }
              pauseAutoplayForUser();
          }
      });

      // Scroll libre: pausar autoplay si el usuario scrollea manualmente
      sliderImages.addEventListener('scroll', function() {
          pauseAutoplayForUser();
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

gallery.addEventListener('touchstart', () => {

  clearInterval(autoInterval);
  setTimeout(() => {
    autoInterval = setInterval(() => {
      let idx = (currentPair + 1) % pairs.length;
      showPair(idx);
      updateDots(idx);
    }, 3500);
  }, 2000);
}, {once:false});

showPair(0);

function ensureAutoPlay() {
  if (!autoInterval || autoInterval._destroyed) {
    autoInterval = setInterval(() => {
      let idx = (currentPair + 1) % pairs.length;
      showPair(idx);
      updateDots(idx);
    }, 3500);
  }
}

setInterval(ensureAutoPlay, 5000);
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
