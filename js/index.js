document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('dynamicHeader');
    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 400) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
    updateHeader();
});

class SalaCarousel {
    constructor(card) {
        this.card = card;
        this.imageElement = card.querySelector('.sala-image');
        this.dots = card.querySelectorAll('.dot');
        this.currentIndex = 0;
        this.intervalId = null;

        this.imagesSets = {
            'Sala Principal': [
                'assets/imgs/inicio/img-galeria-4.webp',
                'assets/imgs/inicio/img-galeria-8.webp'
            ],
            'Sala Familiar': [
                'assets/imgs/inicio/img-galeria-5.webp',
                'assets/imgs/inicio/img-galeria-7.webp',
                'assets/imgs/inicio/img-galeria-6.webp'
            ],
            'Sala Íntima': [
                'assets/imgs/inicio/img-galeria-1.webp',
                'assets/imgs/inicio/img-galeria-2.webp'
            ]
        };

        this.salaName = card.querySelector('.sala-name').textContent;
        this.images = this.imagesSets[this.salaName];

        this.init();
    }

    init() {
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                this.goToSlide(index);
            });
        });

        this.startAutoPlay();

        this.card.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        this.card.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }

    goToSlide(index) {
        if (index === this.currentIndex) return;

        this.imageElement.classList.add('fade');

        setTimeout(() => {
            this.imageElement.src = this.images[index];

            this.dots[this.currentIndex].classList.remove('active');
            this.dots[index].classList.add('active');

            this.currentIndex = index;

            this.imageElement.classList.remove('fade');
        }, 500);
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.goToSlide(nextIndex);
    }

    startAutoPlay() {
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const salaCards = document.querySelectorAll('.sala-card');
    salaCards.forEach(card => {
        new SalaCarousel(card);
    });
});

(function () {
    'use strict';

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            faqItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
})();

document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});