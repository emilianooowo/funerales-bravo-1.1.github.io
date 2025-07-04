const galleryData = {
    urnas: [
        { src: 'imgs/cementerio/urna-b-1.webp', title: 'urna 1' },
        { src: 'imgs/cementerio/urna-p-1.webp', title: 'urna 2' },
        { src: 'imgs/cementerio/urna-p-2.webp', title: 'urna 3' },
        { src: 'imgs/cementerio/urna-p-3.webp', title: 'urna 4' },
        { src: 'imgs/cementerio/urna-p-4.webp', title: 'urna 5' },
        { src: 'imgs/cementerio/urna-p-5.webp', title: 'urna 6' },
        { src: 'imgs/cementerio/urna-p-6.webp', title: 'urna 7' },
        { src: 'imgs/cementerio/urna-p-7.webp', title: 'urna 8' }
    ],
    cementerio: [
        { src: 'imgs/cementerio/cementerio-1.webp', title: 'cementerio' },
        { src: 'imgs/cementerio/cementerio-2.webp', title: 'cementerio' },
        { src: 'imgs/cementerio/cementerio-3.webp', title: 'cementerio' },
        { src: 'imgs/cementerio/cementerio-4.webp', title: 'cementerio' },
        { src: 'imgs/cementerio/col-0.webp', title: 'cementerio' },
        { src: 'imgs/cementerio/col-1.webp', title: 'cementerio' },
        { src: 'imgs/cementerio/eco-0.webp', title: 'cementerio' },
        { src: 'imgs/cementerio/eco-1.webp', title: 'cementerio' },
        { src: 'imgs/cementerio/eco-2.webp', title: 'cementerio' },
        { src: 'imgs/cementerio/nicho.webp', title: 'cementerio' },

    ]
};

const galleryGrid = document.getElementById('galleryGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
let currentCategory = 'urnas';

function showCategory(category) {
    galleryGrid.classList.remove('show');

    setTimeout(() => {
        galleryGrid.innerHTML = '';

        galleryData[category].forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                        <img src="${item.src}" alt="${item.title}" loading="lazy">
                        <div class="item-title">${item.title}</div>
                    `;

            galleryItem.addEventListener('click', () => {
                console.log(`Clicked on: ${item.title}`);
            });

            galleryGrid.appendChild(galleryItem);
        });

        galleryGrid.classList.add('show');
    }, 250);
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        const category = button.getAttribute('data-category');
        currentCategory = category;
        showCategory(category);
    });
});

showCategory(currentCategory);

function preloadImages() {
    Object.values(galleryData).flat().forEach(item => {
        const img = new Image();
        img.src = item.src;
    });
}

window.addEventListener('load', preloadImages);

let currentImages = [];
let currentIndex = 0;

function showCategory(category) {
    galleryGrid.classList.remove('show');

    setTimeout(() => {
        galleryGrid.innerHTML = '';

        currentImages = galleryData[category];

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
        });

        galleryGrid.classList.add('show');
    }, 250);
}

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