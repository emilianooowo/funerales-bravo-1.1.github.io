const spacesData = {
    mural: {
        title: "Espacios de columbario",
        description: "El columbario es un espacio especialmente diseñado para conservar las cenizas de tus seres queridos en un ambiente digno, tranquilo y seguro. Es una alternativa práctica y respetuosa que permite rendir homenaje en un lugar permanente y accesible para la familia.",
        images: [
            {
                url: "assets/imgs/cementerio/col-0.webp",
                size: "tall",
                span: 1
            },
            {
                url: "assets/imgs/cementerio/col-1.webp",
                size: "tall",
                span: 1,
                rows: 2
            },
            {
                url: "assets/imgs/cementerio/col-2.webp",
                size: "tall",
                span: 1,
                rows: 2
            }
        ]
    },
    jardin: {
        title: "Espacios en Jardín",
        description: "El espacio tipo jardín está destinado a la inhumación tradicional, ofreciendo un entorno armonioso y digno para honrar a quienes ya no están. Es una opción que brinda un lugar permanente donde las familias pueden recordar, visitar y acompañar en la distancia.",
        images: [
            {
                url: "assets/imgs/cementerio/cementerio-0.webp",
                size: "tall",
                span: 1
            },
            {
                url: "assets/imgs/cementerio/cementerio-2.webp",
                size: "tall",
                span: 2
            },
            {
                url: "assets/imgs/cementerio/cementerio-3.webp",
                size: "tall",
                span: 1
            },
            {
                url: "assets/imgs/cementerio/cementerio-4.webp",
                size: "tall",
                span: 1
            },
            {
                url: "assets/imgs/cementerio/cementerio-5.webp",
                size: "medium",
                span: 1
            },
            {
                url: "assets/imgs/cementerio/cementerio-6.webp",
                size: "medium",
                span: 1
            }
        ]
    },
    nicho: {
        title: "Nichos Ecológicos",
        description: "Nuestros nichos ecológicos representan una propuesta innovadora y armoniosa con la naturaleza. En lugar de una lápida tradicional, se planta un árbol conmemorativo en el centro del espacio, alrededor del cual se asignan hasta cuatro lugares para el descanso eterno. Es una opción ecológica y simbólica que honra la vida mientras contribuye al entorno natural, diferenciándose de los espacios tipo jardín por su enfoque sostenible y colectivo.",
         images: [
            {
                url: "assets/imgs/cementerio/nicho-4.webp",
                size: "tall",
                span: 1
            },
            {
                url: "assets/imgs/cementerio/nicho-0.webp",
                size: "tall",
                span: 1
            },
            {
                url: "assets/imgs/cementerio/nicho-1.webp",
                size: "tall",
                span: 1,
                rows: 2
            },
            {
                url: "assets/imgs/cementerio/nicho-3.webp",
                size: "medium",
                span: 1
            }
        ]
    }
};

let currentImageIndex = 0;
let currentImages = [];
let currentSpace = null;

const spaceContent = document.getElementById('space-content');
const contentGrid = document.getElementById('content-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxThumbnails = document.getElementById('lightboxThumbnails');

function createThumbnailUrl(url) {
    return url.replace(/w=\d+&h=\d+/, 'w=200&h=200');
}

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

function createContentGrid(spaceType) {
    const data = spacesData[spaceType];
    if (!data) return;

    currentSpace = spaceType;
    currentImages = data.images.map(img => img.url);
    contentGrid.innerHTML = '';

    const textItem = document.createElement('div');
    textItem.className = 'grid-item tall text span-1';
    textItem.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.description}</p>
            `;
    contentGrid.appendChild(textItem);

    data.images.forEach((imageData, index) => {
        const item = document.createElement('div');
        let classes = ['grid-item', 'image', imageData.size];

        if (imageData.span === 2) classes.push('span-2');
        if (imageData.rows === 2) classes.push('span-2-rows');

        item.className = classes.join(' ');
        item.setAttribute('data-index', index);

        const img = document.createElement('img');
        img.setAttribute('data-src', imageData.url);
        img.alt = `${data.title} - Imagen ${index + 1}`;

        item.appendChild(img);
        contentGrid.appendChild(item);

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        lazyLoadImage(entry.target, item);
                        imageObserver.unobserve(entry.target);
                    }
                });
            });
            imageObserver.observe(img);
        } else {
            lazyLoadImage(img, item);
        }

        item.addEventListener('click', () => openLightbox(index));
    });
}

function createLightboxThumbnails() {
    lightboxThumbnails.innerHTML = '';

    currentImages.forEach((url, index) => {
        const thumb = document.createElement('img');
        thumb.className = 'lightbox-thumb';
        thumb.src = createThumbnailUrl(url);
        thumb.alt = `Thumbnail ${index + 1}`;
        thumb.addEventListener('click', () => showImage(index));
        lightboxThumbnails.appendChild(thumb);
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    lightbox.classList.add('active');
    showImage(index);
    createLightboxThumbnails();
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

document.addEventListener('DOMContentLoaded', function () {
    const spaceCards = document.querySelectorAll('.space-card');
    spaceCards.forEach(card => {
        card.addEventListener('click', function () {
            const spaceType = this.getAttribute('data-space');

            createContentGrid(spaceType);

            spaceContent.classList.add('active');

            setTimeout(() => {
                spaceContent.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        });
    });

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
});

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
    const logoImg = document.getElementById('logoImg');

    const logoClaro = 'assets/logos/logo-header-simple-black.webp';
    const logoOscuro = 'assets/logos/logo-header-simple-black.webp';

    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 400) {
            header.classList.add('scrolled');
            logoImg.src = logoOscuro;
        } else {
            header.classList.remove('scrolled');
            logoImg.src = logoClaro;
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

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    console.log('Menu PC Elements:', {
        menuToggle: menuToggle,
        menuDropdown: menuDropdown,
        closeMenu: closeMenu
    });

    function openMenuPC() {
        console.log('Abriendo menú PC');
        if (menuToggle) menuToggle.classList.add('active');
        if (menuDropdown) menuDropdown.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuPC() {
        console.log('Cerrando menú PC');
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuDropdown) menuDropdown.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenuPC(e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = menuToggle && menuToggle.classList.contains('active');
        console.log('Toggle menú PC - Estado actual:', isActive);

        if (isActive) {
            closeMenuPC();
        } else {
            openMenuPC();
        }
    }

    if (menuToggle && menuDropdown) {
        console.log('Inicializando menú PC');

        menuToggle.addEventListener('click', toggleMenuPC);

        if (closeMenu) {
            closeMenu.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeMenuPC();
            });
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

        document.querySelectorAll('.menu-pc-link').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Clic en enlace del menú PC');
                closeMenuPC();
            });
        });

        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenuPC);
        }

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) &&
                !menuDropdown.contains(e.target) &&
                menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

    } else {
        console.error('Elementos del menú PC no encontrados:', {
            menuToggle: !!menuToggle,
            menuDropdown: !!menuDropdown
        });
    }
});