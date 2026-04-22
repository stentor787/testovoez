    document.addEventListener('DOMContentLoaded', function() {
    const casesSwiper = new Swiper('.cases-swiper', {
     
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 400,
      
      // Бесконечная прокрутка
      loop: true,
      

      navigation: {
        nextEl: '.cases__nav--next',
        prevEl: '.cases__nav--prev',
      },
      
      // Пагинация 
      pagination: {
        el: '.cases__pagination',
        clickable: true,
        bulletClass: 'cases__dot',
        bulletActiveClass: 'active',
        renderBullet: function(index, className) {
          return '<div class="' + className + '"></div>';
        },
      },
      
      // Свайп мышкой 
      simulateTouch: true,
      grabCursor: true,
      touchRatio: 1,
      

      a11y: {
        enabled: true,
        prevSlideMessage: 'Предыдущий кейс',
        nextSlideMessage: 'Следующий кейс',
      },
    });
  });
