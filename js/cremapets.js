function showPlan(planType) {
    const plans = document.querySelectorAll('.plan-content');
    plans.forEach(plan => plan.classList.remove('active'));

    const buttons = document.querySelectorAll('.plan-button');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(planType).classList.add('active');

    document.querySelector(`.plan-button.${planType}`).classList.add('active');
}

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightboxImg.src = imageSrc;
    lightbox.style.display = 'block';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    showPlan('basic');
    showGallery();
});

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section-title').forEach(el => titleObserver.observe(el));

const galleryData = [
    { src: 'assets/imgs/cremapets/urna-gato-1.webp' },
    { src: 'assets/imgs/cremapets/urna-gato-2.webp' },
    { src: 'assets/imgs/cremapets/urna-gato-3.webp' },
    { src: 'assets/imgs/cremapets/urna-perro-1.webp' },
    { src: 'assets/imgs/cremapets/urna-perro-2.webp' },
    { src: 'assets/imgs/cremapets/urna-perro-3.webp' },
    { src: 'assets/imgs/cremapets/urna-perro-4.webp' },
    { src: 'assets/imgs/cremapets/urna-perro-5.webp' },
    { src: 'assets/imgs/cremapets/urna-perro-6.webp' },
    { src: 'assets/imgs/cremapets/urna-perro-7.webp' },
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

document.addEventListener('DOMContentLoaded', () => {
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
        menuToggle.addEventListener('click', toggleMenuPC);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

        document.querySelectorAll('.menu-pc-link').forEach(link => {
            link.addEventListener('click', closeMenuPC);
        });

        menuDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenuPC);
        });

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