const container = document.querySelector('.swiper');
const slideCount = container ? container.querySelectorAll('.swiper-slide').length : 0;
const enableLoop = slideCount >= 3;

const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loop: enableLoop,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: true
    }
});
