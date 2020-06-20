function slider() {
        //slider

        const leftArrow = document.querySelector('.offer__slider-prev'),
        rightArrow = document.querySelector('.offer__slider-next'),
        slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider');
  let currentIndex = document.querySelector('#current'),
      allIndex = document.querySelector('#total'),
      index = 1;

  slider.style.position = 'relative';

  const dots = document.createElement('ol'),
        massDots = [];
  dots.classList.add('carousel-indicators');
  dots.style.cssText = `
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 15;
      display: flex;
      justify-content: center;
      margin-right: 15%;
      margin-left: 15%;
      list-style: none;
  `;

  slider.append(dots);

  for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
      `;
      if (i == 0) {
          dot.style.opacity = 1;
      }
      dots.append(dot);
      massDots.push(dot);
  }

  showSlides(1);

  if(slides.length < 10) {
      allIndex.textContent = `0${slides.length}`;
  } else {
      allIndex.textContent = slides.length;
  }

  function showSlides(n) {
      if (n > slides.length) {
          index = 1;
      }
      if (n < 1) {
          index = slides.length;
      }

      slides.forEach(item => item.style.display = 'none');
      slides[index - 1].style.display = 'block';

      if(slides.length < 10) {
          currentIndex.textContent = `0${index}`;
      } else {
          currentIndex.textContent = index;
      }

      massDots.forEach(dot => dot.style.opacity = '0.5');
      massDots[index - 1].style.opacity = 1;

  }

  function showNSlides(n) {
      if (n > slides.length) {
          index = 1;
      }
      if (n < 1) {
          index = slides.length;
      }

      slides.forEach(item => item.style.display = 'none');
      slides[index - 1].style.display = 'block';

      if(slides.length < 10) {
          currentIndex.textContent = `0${index}`;
      } else {
          currentIndex.textContent = index;
      }

      massDots.forEach(dot => dot.style.opacity = '0.5');
      massDots[index - 1].style.opacity = 1;

  }

  function plusSlides (n) {
      showSlides(index += 1);
  }

  function minusSlides (n) {
      showNSlides(index -= 1);
  }

  leftArrow.addEventListener('click', () => {
      minusSlides(3);
  });

  rightArrow.addEventListener('click', () => {
      plusSlides(1);
  });

  massDots.forEach(dot => {

      dot.addEventListener('click' , (e) => {
          const slideTo = e.target.getAttribute('data-slide-to');
          index = slideTo;
          if (e > slides.length) {
              index = 1;
          }
          if (e < 1) {
              index = slides.length;
          }
  
          slides.forEach(item => item.style.display = 'none');
          slides[index - 1].style.display = 'block';
  
          if(slides.length < 10) {
              currentIndex.textContent = `0${index}`;
          } else {
              currentIndex.textContent = index;
          }
          massDots.forEach(dot => dot.style.opacity = '0.5');
          massDots[index - 1].style.opacity = 1;
      });
  });
}

module.exports = slider;