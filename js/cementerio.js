function observeElements() {
    const dividers = document.querySelectorAll('.section-divider, .section-divider-alt, .section-divider-leaves');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Opcional: dejar de observar después de animar
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.6 // Se activa cuando el 30% del elemento es visible
    });

    dividers.forEach(divider => {
        observer.observe(divider);
    });
}

document.addEventListener('DOMContentLoaded', observeElements);

document.addEventListener('scroll', () => {
    const dividers = document.querySelectorAll('.section-divider-leaves');
    dividers.forEach(divider => {
        const rect = divider.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (!isVisible) {
            divider.classList.remove('animate');
        }
    });
});

const galleryData = {
    urnas: [
        { src: './imgs/cementerio/urna-71.webp', title: 'urna 1' },
        { src: './imgs/cementerio/urna-03.webp', title: 'urna 2' },
        { src: './imgs/cementerio/urna-26.webp', title: 'urna 3' },
        { src: './imgs/cementerio/urna-34.webp', title: 'urna 4' },
        { src: './imgs/cementerio/urna-50.webp', title: 'urna 5' },
        { src: './imgs/cementerio/urna-57.webp', title: 'urna 6' },
        { src: './imgs/cementerio/urna-59.webp', title: 'urna 7' },
        { src: './imgs/cementerio/urna-82.webp', title: 'urna 8' }
    ],
    cementerio: [
        { src: './imgs/cementerio/img-cementerio-1.webp', title: 'cementerio' },
        { src: './imgs/cementerio/img-cementerio-3.webp', title: 'cementerio' },
        { src: './imgs/cementerio/img-cementerio-4.webp', title: 'cementerio' },
        { src: './imgs/cementerio/img-cementerio-5.webp', title: 'cementerio' },
        { src: './imgs/cementerio/img-cementerio-6.webp', title: 'cementerio' },
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

function showMainTab(tabName) {
    const mainContents = document.querySelectorAll('.main-tab-content');
    mainContents.forEach(content => {
        content.classList.remove('active');
    });

    const mainTabs = document.querySelectorAll('.main-tab');
    mainTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');

    const activeMainTab = document.getElementById(tabName);
    const firstSubTab = activeMainTab.querySelector('.sub-tab');
    if (firstSubTab && window.innerWidth <= 768) {
        const subTabs = activeMainTab.querySelectorAll('.sub-tab');
        subTabs.forEach(tab => tab.classList.remove('active'));
        firstSubTab.classList.add('active');

        const subContents = activeMainTab.querySelectorAll('.sub-tab-content');
        subContents.forEach(content => content.classList.remove('active'));
        if (subContents[0]) {
            subContents[0].classList.add('active');
        }
    }
}

function showSubTab(category, subTab) {
    if (window.innerWidth > 768) return;

    const subContents = document.querySelectorAll(`#${category}-1-persona, #${category}-2-personas, #${category}-4-personas`);
    subContents.forEach(content => {
        content.classList.remove('active');
    });

    const activeMainTab = document.querySelector('.main-tab-content.active');
    const subTabs = activeMainTab.querySelectorAll('.sub-tab');
    subTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    document.getElementById(`${category}-${subTab}`).classList.add('active');
    event.target.classList.add('active');
}

window.addEventListener('resize', function () {
    const isMobile = window.innerWidth <= 768;
    const subContents = document.querySelectorAll('.sub-tab-content');

    if (!isMobile) {
        subContents.forEach(content => {
            content.classList.add('active');
        });
    } else {
        const activeMainTab = document.querySelector('.main-tab-content.active');
        if (activeMainTab) {
            const subTabs = activeMainTab.querySelectorAll('.sub-tab');
            const subContentsInTab = activeMainTab.querySelectorAll('.sub-tab-content');

            subContentsInTab.forEach(content => content.classList.remove('active'));
            subTabs.forEach(tab => tab.classList.remove('active'));

            if (subTabs[0]) subTabs[0].classList.add('active');
            if (subContentsInTab[0]) subContentsInTab[0].classList.add('active');
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        const subContents = document.querySelectorAll('.sub-tab-content');
        subContents.forEach(content => {
            content.classList.add('active');
        });
    }
});

function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('.faq-icon');

    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
        }
    });

    faqItem.classList.toggle('active');
    answer.classList.toggle('active');
}