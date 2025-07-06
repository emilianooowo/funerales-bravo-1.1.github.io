const galleryData = [
    { src: 'imgs/cementerio/urna-b-1.webp', title: 'urna basica 1' },
    { src: 'imgs/cementerio/urna-p-1.webp', title: 'urna personalizada 2' },
    { src: 'imgs/cementerio/urna-p-2.webp', title: 'urna personalizada 3' },
    { src: 'imgs/cementerio/urna-p-3.webp', title: 'urna personalizada  4' },
    { src: 'imgs/cementerio/urna-p-4.webp', title: 'urna personalizada 5' },
    { src: 'imgs/cementerio/urna-p-5.webp', title: 'urna personalizada 6' },
    { src: 'imgs/cementerio/urna-p-6.webp', title: 'urna personalizada 7' },
    { src: 'imgs/cementerio/urna-p-7.webp', title: 'urna personalizada 8' },
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

const observerOptions = {
    threshold: 0.4,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const titleLine = entry.target.querySelector('.title-line');
            if (titleLine) {
                titleLine.classList.add('animate');

                setTimeout(() => {
                    const title = entry.target.querySelector('.section-title');
                    title.classList.add('animate');
                }, 600);

                setTimeout(() => {
                    const description = entry.target.querySelector('.section-description');
                    description.classList.add('animate');
                }, 1000);
            }
        }
    });
}, observerOptions);

const section = document.querySelector('.funeral-section');
observer.observe(section);

const planButtons = document.querySelectorAll('.plan-btn');
const planContents = document.querySelectorAll('.plan-content');

planButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedPlan = button.dataset.plan;

        planButtons.forEach(btn => btn.classList.remove('active'));

        planContents.forEach(content => {
            content.classList.remove('active', 'entering');
            content.style.display = 'none';

            const serviceColumns = content.querySelectorAll('.service-column');
            const dividerLine = content.querySelector('.divider-line');
            const images = content.querySelectorAll('.gallery-image');

            serviceColumns.forEach(column => column.classList.remove('animate'));
            if (dividerLine) dividerLine.classList.remove('animate');
            images.forEach(img => img.classList.remove('animate'));
        });

        button.classList.add('active');

        const selectedContent = document.getElementById(`plan-${selectedPlan}`);
        if (selectedContent) {
            selectedContent.style.display = 'block';

            selectedContent.offsetHeight;

            selectedContent.classList.add('entering');

            setTimeout(() => {
                selectedContent.classList.add('active');

                const serviceColumns = selectedContent.querySelectorAll('.service-column');
                serviceColumns.forEach((column, index) => {
                    setTimeout(() => {
                        column.classList.add('animate');

                        const images = column.querySelectorAll('.gallery-image');
                        setTimeout(() => {
                            images.forEach(img => img.classList.add('animate'));
                        }, 200);
                    }, index * 200);
                });

                setTimeout(() => {
                    const dividerLine = selectedContent.querySelector('.divider-line');
                    if (dividerLine) {
                        dividerLine.classList.add('animate');
                    }
                }, 600);

                setTimeout(() => {
                    selectedContent.classList.remove('entering');
                }, 800);
            }, 50);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const basicoBtn = document.querySelector('[data-plan="basico"]');
    if (basicoBtn) {
        basicoBtn.click();
    }
});

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