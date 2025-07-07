const galleryData = [
    { src: 'imgs/cementerio/cementerio-1.webp', title: 'cementerio' },
    { src: 'imgs/cementerio/cementerio-2.webp', title: 'cementerio' },
    { src: 'imgs/cementerio/cementerio-3.webp', title: 'cementerio' },
    { src: 'imgs/cementerio/cementerio-4.webp', title: 'cementerio' },
    { src: 'imgs/cementerio/col-0.webp', title: 'cementerio' },
    { src: 'imgs/cementerio/col-1.webp', title: 'cementerio' },
    { src: 'imgs/cementerio/eco-0.webp', title: 'cementerio' },
    { src: 'imgs/cementerio/eco-1.webp', title: 'cementerio' },
    { src: 'imgs/cementerio/eco-2.webp', title: 'cementerio' },
    { src: 'imgs/cementerio/nicho.webp', title: 'cementerio' }
];

const galleryGrid = document.getElementById('galleryGrid');
let currentImages = galleryData;
let currentIndex = 0;

function showGallery() {
    galleryGrid.classList.remove('show');

    setTimeout(() => {
        galleryGrid.innerHTML = '';

        currentImages.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="item-title">${item.title}</div>
            `;

            galleryItem.addEventListener('click', () => {
                openLightbox(index);
            });

            galleryGrid.appendChild(galleryItem);

            observer.observe(galleryItem);
        });

        galleryGrid.classList.add('show');
    }, 250);
}

function preloadImages() {
    galleryData.forEach(item => {
        const img = new Image();
        img.src = item.src;
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.4
});

function openLightbox(index) {
    currentIndex = index;
    document.getElementById('lightboxImage').src = currentImages[currentIndex].src;
    document.getElementById('lightboxOverlay').classList.remove('hidden');
}

function closeLightbox() {
    document.getElementById('lightboxOverlay').classList.add('hidden');
}

function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    document.getElementById('lightboxImage').src = currentImages[currentIndex].src;
}

function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    document.getElementById('lightboxImage').src = currentImages[currentIndex].src;
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('prevBtn').addEventListener('click', showPrev);
document.getElementById('nextBtn').addEventListener('click', showNext);

document.addEventListener('keydown', (e) => {
    const overlayVisible = !document.getElementById('lightboxOverlay').classList.contains('hidden');
    if (!overlayVisible) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        showPrev();
    } else if (e.key === 'ArrowRight') {
        showNext();
    }
});

const observerInfo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const container = entry.target;

            const line = container.querySelector('.animated-line');
            const title = container.querySelector('.info-title');
            const description = container.querySelector('.info-description');
            const features = container.querySelector('.info-features');
            const image = document.querySelector('.info-image');

            line.classList.add('animate-in');

            line.addEventListener('transitionend', () => {
                title.classList.add('animate-in');
                setTimeout(() => {
                    description.classList.add('animate-in');
                    features.classList.add('animate-in');
                    image.classList.add('animate-in');
                }, 400);
            }, { once: true });

            observerInfo.unobserve(container);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.info-content').forEach(el => observerInfo.observe(el));

document.addEventListener('DOMContentLoaded', function () {
    showGallery();
    preloadImages();

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

document.addEventListener('DOMContentLoaded', () => {
    // --- MENÚ PC ---
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');

    function openMenuPC() {
        if (menuToggle) menuToggle.classList.add('active');
        if (menuDropdown) menuDropdown.classList.add('active');
    }

    function closeMenuPC() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuDropdown) menuDropdown.classList.remove('active');
    }

    function toggleMenuPC(e) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = menuToggle && menuToggle.classList.contains('active');
        isActive ? closeMenuPC() : openMenuPC();
    }

    if (menuToggle && menuDropdown) {
        // Click en el botón
        menuToggle.addEventListener('click', toggleMenuPC);

        // Tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

        // Click en enlaces del menú
        document.querySelectorAll('.menu-pc-link').forEach(link => {
            link.addEventListener('click', closeMenuPC);
        });

        // Click en enlaces dentro del dropdown
        menuDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenuPC);
        });

        // Clic fuera del menú
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
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