document.addEventListener('DOMContentLoaded', function () {
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
        return; // Swiper library not loaded
    }
    
    // Courses Swiper
    if (document.querySelector('.swiper')) {
        const courses_swiper = new Swiper('.swiper', {
            slidesPerView: 1,
            spaceBetween: 32,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            breakpoints: {
                // when window width is >= 640px (mobile)
                640: {
                    slidesPerView: 1,
                    spaceBetween: 32
                },
                // when window width is >= 768px (tablet)
                768: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is >= 1024px (desktop)
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 32
                }
            }
        });
    }

    // Reviews Swiper
    if (document.querySelector('.testimonial-section-swiper')) {
        const reviews_swiper = new Swiper('.testimonial-section-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: '.testimonial-section-pagination',
                clickable: true
            },
            slideClass: 'testimonial-swiper-slide',
            wrapperClass: 'testimonial-swiper-wrapper'
        });
    }
}); 