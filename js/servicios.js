(function () {
    'use strict';

    const imageUrls = [
        'assets/imgs/servicios/urna-b-1.webp',
        'assets/imgs/servicios/urna-p-1.webp',
        'assets/imgs/servicios/urna-p-2.webp',
        'assets/imgs/servicios/urna-p-3.webp',
        'assets/imgs/servicios/urna-p-4.webp',
        'assets/imgs/servicios/urna-p-5.webp',
        'assets/imgs/servicios/urna-p-6.webp',
        'assets/imgs/servicios/urna-p-7.webp',
    ];

    const thumbnailUrls = imageUrls.map(url => url.replace('w=800&h=800', 'w=200&h=200'));

    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxThumbnails = document.getElementById('lightboxThumbnails');

    let currentImageIndex = 0;
    let imagesLoaded = 0;

    function createImageElement(src, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.setAttribute('data-index', index);

        const img = document.createElement('img');
        img.setAttribute('data-src', src);
        img.alt = `Imagen ${index + 1}`;

        item.appendChild(img);
        return item;
    }

    function lazyLoadImage(img, item) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        img.onload = function () {
            img.classList.add('loaded');
            item.classList.add('loaded');
            imagesLoaded++;
        };

        img.onerror = function () {
            item.classList.add('loaded');
            console.error('Error cargando imagen:', src);
        };

        img.src = src;
    }

    function createGallery() {
        imageUrls.forEach((url, index) => {
            const item = createImageElement(url, index);
            galleryGrid.appendChild(item);

            const img = item.querySelector('img');

            if ('IntersectionObservicioser' in window) {
                const imageObservicioser = new IntersectionObservicioser((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            lazyLoadImage(entry.target, item);
                            imageObservicioser.unobserviciose(entry.target);
                        }
                    });
                });
                imageObservicioser.observiciose(img);
            } else {
                lazyLoadImage(img, item);
            }

            item.addEventListener('click', () => openLightbox(index));
        });
    }

    function createThumbnails() {
        thumbnailUrls.forEach((url, index) => {
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
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showImage(index) {
        currentImageIndex = index;
        lightboxImage.src = imageUrls[index];
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
        const newIndex = currentImageIndex === 0 ? imageUrls.length - 1 : currentImageIndex - 1;
        showImage(newIndex);
    }

    function nextImage() {
        const newIndex = currentImageIndex === imageUrls.length - 1 ? 0 : currentImageIndex + 1;
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
        createGallery();
        createThumbnails();
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