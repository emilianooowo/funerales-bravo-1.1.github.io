(function () {
    'use strict';

    const spacesData = {
        mural: {
            title: "Espacios de columbario",
            description: "El columbario es un espacio especialmente diseñado para conservar las cenizas de tus seres queridos en un ambiente digno, tranquilo y seguro. Es una alternativa práctica y respetuosa que permite rendir homenaje en un lugar permanente y accesible para la familia.",
            images: [
                "assets/imgs/cementerio/col-0.webp",
                "assets/imgs/cementerio/col-1.webp",
                "assets/imgs/cementerio/col-2.webp"
            ]
        },
        jardin: {
            title: "Espacios en Jardín",
            description: "El espacio tipo jardín está destinado a la inhumación tradicional, ofreciendo un entorno armonioso y digno para honrar a quienes ya no están. Es una opción que brinda un lugar permanente donde las familias pueden recordar, visitar y acompañar en la distancia.",
            images: [
                "assets/imgs/cementerio/cementerio-0.webp",
                "assets/imgs/cementerio/cementerio-2.webp",
                "assets/imgs/cementerio/cementerio-3.webp",
                "assets/imgs/cementerio/cementerio-4.webp",
                "assets/imgs/cementerio/cementerio-5.webp",
                "assets/imgs/cementerio/cementerio-6.webp"
            ]
        },
        nicho: {
            title: "Nichos Ecológicos",
            description: "Nuestros nichos ecológicos representan una propuesta innovadora y armoniosa con la naturaleza. En lugar de una lápida tradicional, se planta un árbol conmemorativo en el centro del espacio, alrededor del cual se asignan hasta cuatro lugares para el descanso eterno. Es una opción ecológica y simbólica que honra la vida mientras contribuye al entorno natural, diferenciándose de los espacios tipo jardín por su enfoque sostenible y colectivo.",
            images: [
                "assets/imgs/cementerio/nicho-4.webp",
                "assets/imgs/cementerio/nicho-0.webp",
                "assets/imgs/cementerio/nicho-1.webp",
                "assets/imgs/cementerio/nicho-3.webp"
            ]
        }
    };

    let currentImages = [];
    let currentImageIndex = 0;
    let currentSpace = null;

    const spaceContent = document.getElementById('space-content');
    const contentGrid = document.getElementById('content-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxThumbnails = document.getElementById('lightboxThumbnails');

    function lazyLoadImage(img, item) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        img.onload = function () {
            img.classList.add('loaded');
            item.classList.add('loaded');
        };

        img.onerror = function () {
            item.classList.add('loaded');
            console.error('Error cargando imagen:', src);
        };

        img.src = src;
    }

    function createInfoElement(data) {
        const infoItem = document.createElement('div');
        infoItem.className = 'grid-item info-item';
        infoItem.style.gridColumn = 'span 2';

        infoItem.innerHTML = `
                    <h3 class="info-title">${data.title}</h3>
                    <p class="info-description">${data.description}</p>
                `;

        return infoItem;
    }

    function createImageElement(imageUrl, index) {
        const imageItem = document.createElement('div');
        imageItem.className = 'grid-item image-item';
        imageItem.setAttribute('data-index', index);

        const img = document.createElement('img');
        img.setAttribute('data-src', imageUrl);
        img.alt = `Imagen ${index + 1}`;

        imageItem.appendChild(img);
        return imageItem;
    }

    function createContentGrid(spaceType) {
        const data = spacesData[spaceType];
        if (!data) return;

        currentSpace = spaceType;
        currentImages = data.images;
        contentGrid.innerHTML = '';

        const infoElement = createInfoElement(data);
        contentGrid.appendChild(infoElement);

        data.images.forEach((imageUrl, index) => {
            const imageItem = createImageElement(imageUrl, index);
            contentGrid.appendChild(imageItem);

            const img = imageItem.querySelector('img');

            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            lazyLoadImage(entry.target, imageItem);
                            imageObserver.unobserve(entry.target);
                        }
                    });
                });
                imageObserver.observe(img);
            } else {
                lazyLoadImage(img, imageItem);
            }

            imageItem.addEventListener('click', () => openLightbox(index));
        });

        spaceContent.classList.add('active');
    }

    function createThumbnails() {
        lightboxThumbnails.innerHTML = '';

        currentImages.forEach((url, index) => {
            const thumb = document.createElement('img');
            thumb.className = 'lightbox-thumb';
            thumb.src = url;
            thumb.alt = `Thumbnail ${index + 1}`;
            thumb.addEventListener('click', () => showImage(index));
            lightboxThumbnails.appendChild(thumb);
        });
    }

    function openLightbox(index) {
        currentImageIndex = index;
        lightbox.classList.add('active');
        showImage(index);
        createThumbnails();
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showImage(index) {
        currentImageIndex = index;
        lightboxImage.src = currentImages[index];
        lightboxImage.alt = `Imagen ${index + 1}`;

        const thumbs = lightboxThumbnails.querySelectorAll('.lightbox-thumb');
        thumbs.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        const activeThumb = thumbs[index];
        if (activeThumb) {
            activeThumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    }

    function prevImage() {
        const newIndex = currentImageIndex === 0 ? currentImages.length - 1 : currentImageIndex - 1;
        showImage(newIndex);
    }

    function nextImage() {
        const newIndex = currentImageIndex === currentImages.length - 1 ? 0 : currentImageIndex + 1;
        showImage(newIndex);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    });

    lightbox.addEventListener('wheel', (e) => {
        e.preventDefault();
    });

    function init() {
        const spaceCards = document.querySelectorAll('.space-card');

        spaceCards.forEach(card => {
            card.addEventListener('click', function () {
                const spaceType = this.getAttribute('data-space');
                createContentGrid(spaceType);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

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