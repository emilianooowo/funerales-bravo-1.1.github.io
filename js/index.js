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

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;

            if (target.classList.contains('section-header')) {
                target.classList.add('animate');

                const children = target.querySelectorAll('.section-title');
                children.forEach(child => child.classList.add('animate'));
            }

            else if (target.classList.contains('cards-container')) {
                const cards = target.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, index * 500);
                });
            }

            else if (target.classList.contains('section-title') || target.classList.contains('card')) {
                target.classList.add('animate');
            }

            else if (target.id === 'herramientasGrid') {
                const dividerLine = target.querySelector('.herramientas-divider-line');
                dividerLine.classList.add('animate');

                setTimeout(() => {
                    const leftContent = target.querySelector('.herramientas-left-content');
                    leftContent.classList.add('animate');
                }, 200);

                setTimeout(() => {
                    const cards = target.querySelectorAll('.herramientas-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }, 1000);
            }

            else if (target.classList.contains('timeline-container')) {
                const timelineLine = target.querySelector('.timeline-line');
                if (timelineLine) timelineLine.classList.add('animate');

                const timelineItems = target.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => item.classList.add('animate'));

                observer.unobserve(target);
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section-header, .cards-container').forEach(el => observer.observe(el));

    document.querySelectorAll('.section-title, .card').forEach(el => {
        if (!el.closest('.section-header') && !el.closest('.cards-container')) {
            observer.observe(el);
        }
    });

    // Observar herramientas
    const herramientasGrid = document.getElementById('herramientasGrid');
    if (herramientasGrid) {
        observer.observe(herramientasGrid);
    }

    // Observar timeline
    const timelineContainer = document.querySelector('.timeline-container');
    if (timelineContainer) {
        observer.observe(timelineContainer);
    }
});
