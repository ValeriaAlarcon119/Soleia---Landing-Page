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
          let nextIndex = (currentIndex + 1) % imgContainersSorted.length;
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
