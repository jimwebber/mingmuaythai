let slideIndex = 0;
let slides, dots, track;
let autoPlayInterval;

function updateSlides() {
  const slideWidth = slides[0].offsetWidth;
  const offset = (slideWidth + 2) * slideIndex;

  track.style.transform = `translateX(-${offset}px)`;

  slides.forEach((slide, i) => {
    if (i === slideIndex) {
      slide.style.transform = 'scale(1)';
      slide.style.opacity = '1';
    } else if (i === slideIndex - 1 || i === slideIndex + 1) {
      slide.style.transform = 'scale(0.85)';
      slide.style.opacity = '0.8';
    } else {
      slide.style.transform = 'scale(0.75)';
      slide.style.opacity = '0.5';
    }
  });

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}

function plusSlides(n) {
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  updateSlides();
  resetAutoplay();
}

function goToSlide(n) {
  slideIndex = n;
  updateSlides();
  resetAutoplay();
}

function resetAutoplay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(() => plusSlides(1), 5000);
}

function enableSwipe() {
  let startX = 0;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 50) plusSlides(1);
    else if (diff < -50) plusSlides(-1);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  track = document.querySelector('.carousel-track');
  slides = document.querySelectorAll('.carousel-slide');
  dots = document.querySelectorAll('.dot');

  updateSlides();
  autoPlayInterval = setInterval(() => plusSlides(1), 5000);
  enableSwipe();
});
