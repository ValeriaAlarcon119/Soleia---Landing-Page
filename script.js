document.addEventListener('DOMContentLoaded', function () {
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

    let scrollBehavior = 'smooth';
    const isWrappingForward = isAuto && idx === 0 && currentIndex === imgContainersSorted.length - 1;
    if (isWrappingForward) scrollBehavior = 'auto';

    if (isMobile()) {
      const viewportWidth = window.innerWidth;
      const imageWidth = viewportWidth - 100;
      const gap = 60;
      const scrollLeft = idx * (imageWidth + gap);

      sliderImages.scrollTo({
        left: scrollLeft,
        behavior: scrollBehavior
      });
    } else if (isTablet()) {

      const containerWidth = 600;
      let pairIdx = Math.floor(idx / 2);
      let scrollLeft = pairIdx * (containerWidth / 2 + 12);
      sliderImages.scrollTo({
        left: scrollLeft,
        behavior: scrollBehavior
      });
      updateDots(pairIdx * 2);
      currentIndex = pairIdx * 2;
      return;
    } else {

      imgContainersSorted[idx].scrollIntoView({
        behavior: scrollBehavior,
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
    }, 2000);
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
      sliderImages.addEventListener(evt, function () {
        if (isTablet()) {
          userInteractedTablet = true;
          if (autoPlayInterval) clearInterval(autoPlayInterval);
          if (userScrollTimeoutTablet) clearTimeout(userScrollTimeoutTablet);
        }
      }, { passive: true });
    });

    // Snap y reactivar autoplay solo al soltar (no en cada scroll)
    ['pointerup', 'touchend'].forEach(evt => {
      sliderImages.addEventListener(evt, function () {
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
    sliderImages.addEventListener('scroll', function () {
      if (isTablet()) {
        if (isTabletSnapping) return;
        const containerWidth = 600;
        const scrollLeft = sliderImages.scrollLeft;
        const pairIdx = Math.round(scrollLeft / (containerWidth / 2 + 22.5));
        updateDots(pairIdx * 2);
        currentIndex = pairIdx * 2;
        lastPairIdx = pairIdx;
      }
      // Removed desktop logic here ensuring currentIndex is controlled purely by showImage logic
      // to avoid visual "center" detection issues at the edges of the slider.
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
    sliderImages.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
      }
    }, { passive: true });

    sliderImages.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) {
        touchEndX = e.touches[0].clientX;
        touchMoved = true;
      }
    }, { passive: true });

    sliderImages.addEventListener('touchend', function (e) {
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


    sliderImages.addEventListener('scroll', function () {
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

  function initDesktopAmenities() {
    const gallery = document.querySelector('.combined-amenities-cta .gallery-images');
    const dotsContainer = document.querySelector('.combined-amenities-cta .gallery-dots');
    const leftBtn = document.querySelector('.combined-amenities-cta .left-button');
    const rightBtn = document.querySelector('.combined-amenities-cta .right-button');

    if (gallery && dotsContainer) {
      const numColumns = 4;
      const columnsPerPage = 4;
      const numPages = Math.ceil(numColumns / columnsPerPage);

      dotsContainer.innerHTML = '';

      const getScrollStep = () => {
        const gap = 20;
        const visibleWidth = gallery.clientWidth;
        const colWidth = (visibleWidth - (3 * gap)) / 4;
        return (colWidth + gap) * columnsPerPage;
      };

      for (let i = 0; i < numPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
          const step = getScrollStep();
          gallery.scrollTo({ left: i * step, behavior: 'smooth' });
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      }

      let autoPlayInterval;
      function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
          const step = getScrollStep();
          const maxScroll = gallery.scrollWidth - gallery.clientWidth;
          if (gallery.scrollLeft >= maxScroll - 5) {
            gallery.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            gallery.scrollBy({ left: step, behavior: 'smooth' });
          }
        }, 3500);
      }

      function resetAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        startAutoPlay();
      }

      if (leftBtn) {
        leftBtn.onclick = () => {
          gallery.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
          resetAutoPlay();
        };
      }
      if (rightBtn) {
        rightBtn.onclick = () => {
          gallery.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
          resetAutoPlay();
        };
      }

      gallery.addEventListener('scroll', () => {
        const step = getScrollStep();
        const scrollLeft = gallery.scrollLeft;
        const pageIndex = Math.round(scrollLeft / step);

        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === pageIndex);
        });
      });

      startAutoPlay();
    }
  }

  window.addEventListener('resize', function () {
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
          const second = items[i + 1];
          if (((i / 2) % 2) === 0) {
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
          let dotIdx = idx - 1;
          if (idx === 0) dotIdx = pairs.length - 1;
          if (idx === pairs.length + 1) dotIdx = 0;
          updateDots(dotIdx);
          isTransitioning = animate;
        }
        let dots = gallery.parentElement.querySelector('.gallery-dots');
        if (dots) dots.innerHTML = '';
        pairs.forEach((_, i) => {
          const dot = document.createElement('div');
          dot.className = 'dot' + (i === 0 ? ' active' : '');
          dot.addEventListener('click', () => {
            showPair(i + 1);
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
          showPair(currentPair - 1);
          resetAutoPlay();
        };
        if (right) right.onclick = () => {
          showPair(currentPair + 1);
          resetAutoPlay();
        };
        let autoInterval = null;
        function startAutoPlay() {
          if (autoInterval) clearInterval(autoInterval);
          autoInterval = setInterval(() => {
            showPair(currentPair + 1);
          }, 3500);
        }
        function resetAutoPlay() {
          if (autoInterval) clearInterval(autoInterval);
          startAutoPlay();
        }
        let touchStartX = 0;
        let touchEndX = 0;
        let touchMoved = false;
        slideTrack.addEventListener('touchstart', function (e) {
          if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchMoved = false;
            slideTrack.style.transition = 'none';
          }
        }, { passive: true });
        slideTrack.addEventListener('touchmove', function (e) {
          if (e.touches.length === 1) {
            touchEndX = e.touches[0].clientX;
            touchMoved = true;
            const deltaX = touchEndX - touchStartX;
            slideTrack.style.transform = `translateX(${-currentPair * 100 + (deltaX / window.innerWidth) * 100}vw)`;
          }
        }, { passive: true });
        slideTrack.addEventListener('touchend', function (e) {
          if (!touchMoved) {
            showPair(currentPair);
            startAutoPlay();
            return;
          }
          const deltaX = touchEndX - touchStartX;
          if (Math.abs(deltaX) > 50) {
            if (deltaX < 0) {
              showPair(currentPair + 1);
            } else {
              showPair(currentPair - 1);
            }
            resetAutoPlay();
          } else {
            showPair(currentPair);
            startAutoPlay();
          }
        });
        slideTrack.addEventListener('transitionend', function () {
          if (!isTransitioning) return;
          if (currentPair === 0) {
            showPair(pairs.length, false);
          } else if (currentPair === pairs.length + 1) {
            showPair(1, false);
          }
          isTransitioning = false;
        });
        showPair(1, false);
        startAutoPlay();
        // --- FIN LÓGICA DE PARES AMENIDADES ---
      }
      // Si es desktop, inicializar lógica de scroll y dots
      else {
        initDesktopAmenities();
      }
    }
    lastBreakpoint = currentBreakpoint;
  });

  function getBreakpoint() {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  // Initial Check
  if (getBreakpoint() === 'desktop') {
    initDesktopAmenities();
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

document.addEventListener('DOMContentLoaded', function () {
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
    const second = items[i + 1];
    if (((i / 2) % 2) === 0) {

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

  // Clear gallery logic:
  // We collected 'pairs' separately. We don't want old children (amenities-column).
  // But wait, the previous logic 'while(gallery.firstChild)' moved existing pairs?
  // No, pairs were appended to gallery in the loop above.
  // The loop above: gallery.appendChild(pair).
  // So gallery has: [Original Columns] + [New Pairs].
  // We want ONLY [New Pairs] in slideTrack.
  // We also want to remove [Original Columns].

  // Cleanest way:
  // 1. Append pairs to slideTrack instead of gallery in the loop? 
  //    (The loop above does gallery.appendChild(pair))
  // 2. Clear gallery.
  // 3. Append slideTrack.

  // Let's adjust the loop above? No, simpler to just start slideTrack empty, 
  // move pairs into it, then clear gallery, then append slideTrack.

  // Actually, simplest replacement for this block:
  // Don't append existing children blindly.
  gallery.innerHTML = ''; // This destroys pairs too if they were appended!

  // Wait, I can't overwrite the loop easily from here unless I change the loop.
  // The loop is lines 553-569. It does `gallery.appendChild(pair)`.

  // Current state when reaching line 572:
  // Gallery = [Columns] + [Pairs].
  // I want SlideTrack = [Pairs]. 
  // Gallery = [SlideTrack].

  // Code changes:
  // Re-select pairs from gallery? Or use 'pairs' array.
  // pairs.forEach(p => slideTrack.appendChild(p));
  // gallery.innerHTML = '';
  // gallery.appendChild(slideTrack);

  pairs.forEach(p => slideTrack.appendChild(p));
  gallery.innerHTML = '';
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

  slideTrack.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchMoved = false;
      slideTrack.style.transition = 'none';
    }
  }, { passive: true });

  slideTrack.addEventListener('touchmove', function (e) {
    if (e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
      touchMoved = true;
      const deltaX = touchEndX - touchStartX;
      slideTrack.style.transform = `translateX(${-currentPair * 100 + (deltaX / window.innerWidth) * 100}vw)`;
    }
  }, { passive: true });

  slideTrack.addEventListener('touchend', function (e) {
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

window.addEventListener('resize', function () {
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
  const lastPair = pairs[pairs.length - 1].cloneNode(true);
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

    let dotIdx = idx - 1;
    if (idx === 0) dotIdx = pairs.length - 1;
    if (idx === pairs.length + 1) dotIdx = 0;
    updateDots(dotIdx);
    isTransitioning = animate;
  }

  let dots = gallery.parentElement.querySelector('.gallery-dots');
  if (dots) dots.innerHTML = '';
  pairs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      showPair(i + 1);
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
    showPair(currentPair - 1);
    resetAutoPlay();
  };
  if (right) right.onclick = () => {
    showPair(currentPair + 1);
    resetAutoPlay();
  };

  let autoInterval = null;
  function startAutoPlay() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
      showPair(currentPair + 1);
    }, 3500);
  }
  function resetAutoPlay() {
    if (autoInterval) clearInterval(autoInterval);
    startAutoPlay();
  }

  let touchStartX = 0;
  let touchEndX = 0;
  let touchMoved = false;
  slideTrack.addEventListener('touchstart', function (e) {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchMoved = false;
      slideTrack.style.transition = 'none';
    }
  }, { passive: true });
  slideTrack.addEventListener('touchmove', function (e) {
    if (e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
      touchMoved = true;
      const deltaX = touchEndX - touchStartX;
      slideTrack.style.transform = `translateX(${-currentPair * 100 + (deltaX / window.innerWidth) * 100}vw)`;
    }
  }, { passive: true });
  slideTrack.addEventListener('touchend', function (e) {
    if (!touchMoved) {
      showPair(currentPair);
      startAutoPlay();
      return;
    }
    const deltaX = touchEndX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        showPair(currentPair + 1);
      } else {
        showPair(currentPair - 1);
      }
      resetAutoPlay();
    } else {
      showPair(currentPair);
      startAutoPlay();
    }
  });

  slideTrack.addEventListener('transitionend', function () {
    if (!isTransitioning) return;
    if (currentPair === 0) {
      showPair(pairs.length, false);
    } else if (currentPair === pairs.length + 1) {
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
(function () {
  let lastBreakpoint = getBreakpoint();

  window.addEventListener('resize', function () {
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
(function () {
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
    sliderImages.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) {
        touchEndX = e.touches[0].clientX;
        touchMoved = true;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchend', function (e) {
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
    sliderImages.addEventListener('scroll', function () {
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
(function () {
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
    sliderImages.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) {
        touchEndX = e.touches[0].clientX;
        touchMoved = true;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchend', function (e) {
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
    sliderImages.addEventListener('scroll', function () {
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
(function () {
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
    sliderImages.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) {
        touchEndX = e.touches[0].clientX;
        touchMoved = true;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchend', function (e) {
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
    sliderImages.addEventListener('scroll', function () {
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
(function () {
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

  function getDesktopWindows() {
    // Devuelve los índices de las ventanas de 4 imágenes
    const windows = [];
    for (let i = 0; i <= imgContainers.length - 4; i++) {
      windows.push([i, i + 1, i + 2, i + 3]);
    }
    // Si hay menos de 4 imágenes, solo una ventana
    if (imgContainers.length < 4) windows.push([0]);
    return windows;
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    let numDots = 0;
    if (isTablet()) {
      numDots = Math.ceil(imgContainers.length / 2);
    } else if (isDesktop()) {
      numDots = imgContainers.length - 3; // ventanas de 4
    } else {
      numDots = imgContainers.length;
    }
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        if (isTablet()) {
          showPair(i, false);
        } else if (isDesktop()) {
          showDesktopWindow(i, false);
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
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
  }

  // --- TABLET ---
  function showPair(pairIdx, isAuto = false) {
    const pairs = getTabletPairs();
    if (pairIdx < 0) pairIdx = pairs.length - 1;
    if (pairIdx >= pairs.length) pairIdx = 0;
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 45;
    const scrollLeft = pairIdx * (containerWidth * 2 + gap);
    isSnapping = true;
    sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
    setTimeout(() => { isSnapping = false; }, 400);
    currentIdx = pairIdx;
    updateDots(pairIdx);
  }
  function nextPair(isAuto = false) {
    showPair(currentIdx + 1, isAuto);
  }
  function prevPair() {
    showPair(currentIdx - 1, false);
  }

  // --- DESKTOP (4 visibles) ---
  function showDesktopWindow(winIdx, isAuto = false) {
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 40;
    // Cada ventana empieza en winIdx
    const scrollLeft = winIdx * (containerWidth + gap);
    isSnapping = true;
    sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
    setTimeout(() => { isSnapping = false; }, 400);
    currentIdx = winIdx;
    updateDots(winIdx);
  }
  function nextDesktopWindow(isAuto = false) {
    const maxWin = imgContainers.length - 4;
    let nextIdx = currentIdx + 1;
    if (nextIdx > maxWin) nextIdx = 0;
    showDesktopWindow(nextIdx, isAuto);
  }
  function prevDesktopWindow() {
    const maxWin = imgContainers.length - 4;
    let prevIdx = currentIdx - 1;
    if (prevIdx < 0) prevIdx = maxWin;
    showDesktopWindow(prevIdx, false);
  }

  // --- MOBILE ---
  function showImage(idx, isAuto = false) {
    let maxIdx = imgContainers.length - 1;
    if (idx < 0) idx = maxIdx;
    if (idx > maxIdx) idx = 0;
    const containerWidth = imgContainers[0].offsetWidth;
    const gap = parseInt(getComputedStyle(sliderImages).gap) || 20;
    const scrollLeft = idx * (containerWidth + gap);
    sliderImages.scrollTo({ left: scrollLeft, behavior: isAuto ? 'auto' : 'smooth' });
    currentIdx = idx;
    updateDots(idx);
  }
  function nextImage(isAuto = false) {
    showImage(currentIdx + 1, isAuto);
  }
  function prevImage() {
    showImage(currentIdx - 1, false);
  }

  // --- AUTOPLAY ---
  function startAutoPlay() {
    if (autoPlayInterval) clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => {
      if (!userInteracted) {
        if (isTablet()) nextPair(true);
        else if (isDesktop()) nextDesktopWindow(true);
        else nextImage(true);
      }
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

  // Flechas
  if (leftButton) {
    leftButton.onclick = () => {
      if (isTablet()) {
        prevPair();
      } else if (isDesktop()) {
        prevDesktopWindow();
      } else {
        prevImage();
      }
      pauseAutoplayForUser();
    };
  }
  if (rightButton) {
    rightButton.onclick = () => {
      if (isTablet()) {
        nextPair();
      } else if (isDesktop()) {
        nextDesktopWindow();
      } else {
        nextImage();
      }
      pauseAutoplayForUser();
    };
  }

  // Touch para tablet y desktop
  if (sliderImages) {
    sliderImages.addEventListener('touchstart', function (e) {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchMoved = false;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchmove', function (e) {
      if (e.touches.length === 1) {
        touchEndX = e.touches[0].clientX;
        touchMoved = true;
      }
    }, { passive: true });
    sliderImages.addEventListener('touchend', function (e) {
      if (!touchMoved) return;
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > 50) {
        if (isTablet()) {
          if (deltaX < 0) nextPair();
          else prevPair();
        } else if (isDesktop()) {
          if (deltaX < 0) nextDesktopWindow();
          else prevDesktopWindow();
        } else {
          if (deltaX < 0) nextImage();
          else prevImage();
        }
        pauseAutoplayForUser();
      }
    });
  }

  // Sincronizar dots con scroll manual (tablet y desktop)
  if (sliderImages) {
    sliderImages.addEventListener('scroll', function () {
      if (isTablet()) {
        if (isSnapping) return;
        const containerWidth = imgContainers[0].offsetWidth;
        const gap = parseInt(getComputedStyle(sliderImages).gap) || 45;
        let pairIdx = Math.round(sliderImages.scrollLeft / (containerWidth * 2 + gap));
        let pairCount = Math.ceil(imgContainers.length / 2);
        if (pairIdx < 0) pairIdx = 0;
        if (pairIdx >= pairCount) pairIdx = pairCount - 1;
        currentIdx = pairIdx;
        updateDots(pairIdx);
      } else if (isDesktop()) {
        if (isSnapping) return;
        const containerWidth = imgContainers[0].offsetWidth;
        const gap = parseInt(getComputedStyle(sliderImages).gap) || 40;
        let idx = Math.round(sliderImages.scrollLeft / (containerWidth + gap));
        let maxIdx = imgContainers.length - 1;
        if (idx < 0) idx = 0;
        if (idx > maxIdx) idx = maxIdx;
        currentIdx = idx;
        updateDots(idx);
      }
    });
  }

  window.addEventListener('resize', () => {
    renderDots();
    if (isTablet()) {
      showPair(currentIdx, false);
    } else if (isDesktop()) {
      showDesktopWindow(currentIdx, false);
    } else {
      showImage(currentIdx, false);
    }
  });

  // Inicialización
  renderDots();
  if (isTablet()) {
    showPair(0, true);
  } else if (isDesktop()) {
    showDesktopWindow(0, true);
  } else {
    showImage(0, true);
  }
  startAutoPlay();
})();
// === FIN CARRUSEL UNIFICADO Y ROBUSTO ===




function initAmenitiesDesktop() {
  if (window.innerWidth <= 1024) return;
  const gallery = document.querySelector('.combined-amenities-cta .gallery-images');
  const dotsContainer = document.querySelector('.combined-amenities-cta .gallery-dots');
  const leftBtn = document.querySelector('.combined-amenities-cta .left-button');
  const rightBtn = document.querySelector('.combined-amenities-cta .right-button');

  if (gallery && dotsContainer) {
    // Reset content to original state (remove clones if any from previous inits)
    const existingClones = gallery.querySelectorAll('.cloned-col');
    existingClones.forEach(el => el.remove());

    const columns = Array.from(gallery.querySelectorAll('.amenities-column'));
    if (columns.length === 0) return;

    // We need 4 visible columns.
    const visibleCount = 4;
    const totalReal = columns.length; // 10

    // Clone Last 4
    const clonesStart = [];
    for (let i = totalReal - visibleCount; i < totalReal; i++) {
      const clone = columns[i].cloneNode(true);
      clone.classList.add('cloned-col');
      clonesStart.push(clone);
    }
    // Clone First 4
    const clonesEnd = [];
    for (let i = 0; i < visibleCount; i++) {
      const clone = columns[i].cloneNode(true);
      clone.classList.add('cloned-col');
      clonesEnd.push(clone);
    }

    // Prepend and Append
    clonesStart.forEach(c => gallery.insertBefore(c, gallery.firstChild));
    clonesEnd.forEach(c => gallery.appendChild(c));

    // Initialize state
    // Real index 0 starts at position 4.
    let currentIndex = visibleCount; // 4
    let isTransitioning = false;

    // Generate Dots (10 dots)
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalReal; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        if (isTransitioning) return;
        goToIndex(i + visibleCount);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }

    function updateDots() {
      let safeIndex = (currentIndex - visibleCount) % totalReal;
      if (safeIndex < 0) safeIndex += totalReal;

      dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === safeIndex);
      });
    }

    function getStep() {
      const containerWidth = gallery.getBoundingClientRect().width;
      if (containerWidth > 0) {
        return containerWidth / 4;
      }
      return gallery.clientWidth / 4 || 300; // Fallback
    }

    function updatePosition(animate = true) {
      gallery.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
      const step = getStep();
      const currentTranslate = -(currentIndex * step);
      gallery.style.transform = `translateX(${currentTranslate}px)`;
      updateDots();
    }

    function goToIndex(index) {
      if (isTransitioning) return;
      isTransitioning = true;
      currentIndex = index;
      updatePosition(true);

      // Use setTimeout instead of transitionend for robustness
      setTimeout(() => {
        isTransitioning = false;
        // Infinite Loop Jump Logic
        if (currentIndex >= totalReal + visibleCount) {
          currentIndex = currentIndex - totalReal;
          updatePosition(false);
        } else if (currentIndex < visibleCount) {
          currentIndex = currentIndex + totalReal;
          updatePosition(false);
        }
      }, 500); // Match CSS transition duration
    }

    // Button Listeners
    if (leftBtn) {
      leftBtn.onclick = (e) => {
        e.preventDefault();
        if (isTransitioning) return;
        goToIndex(currentIndex - 1);
        resetAutoPlay();
      };
    }
    if (rightBtn) {
      rightBtn.onclick = (e) => {
        e.preventDefault();
        if (isTransitioning) return;
        goToIndex(currentIndex + 1);
        resetAutoPlay();
      };
    }

    // Auto Play Logic
    let autoPlayInterval = null;
    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        goToIndex(currentIndex + 1);
      }, 3000);
    }

    function stopAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pause on interaction
    gallery.onmouseenter = stopAutoPlay;
    gallery.onmouseleave = startAutoPlay;

    // Start initial
    startAutoPlay();

    // Initial Position
    const forceUpdate = () => {
      updatePosition(false);
      // Ensure transitions are unlocked initially
      isTransitioning = false;
    };

    setTimeout(forceUpdate, 100);

    // Resize Handler
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        updatePosition(false);
      } else {
        stopAutoPlay();
      }
    });
  }
}

// Call on load and on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAmenitiesDesktop);
} else {
  initAmenitiesDesktop();
}
window.addEventListener('load', initAmenitiesDesktop);
