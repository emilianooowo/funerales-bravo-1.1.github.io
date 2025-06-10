
//IMGS
const galleryData = [
    { src: './imgs/cremapets/urna-perro-1.webp', title: 'urna 1' },
    { src: './imgs/cremapets/urna-gato-2.webp', title: 'urna 2' },
    { src: './imgs/cremapets/urna-gato-3.webp', title: 'urna 1' },
    { src: './imgs/cremapets/urna-perro-2.webp', title: 'urna 2' },
    { src: './imgs/cremapets/urna-perro-3.webp', title: 'urna 1' },
    { src: './imgs/cremapets/urna-perro-4.webp', title: 'urna 2' },
    { src: './imgs/cremapets/urna-perro-5.webp', title: 'urna 1' },
    { src: './imgs/cremapets/urna-perro-6.webp', title: 'urna 2' },
];

const galleryGrid = document.getElementById('galleryGrid');

function renderGallery() {
    galleryGrid.innerHTML = '';

    galleryData.forEach(item => {
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
}

function preloadImages() {
    galleryData.forEach(item => {
        const img = new Image();
        img.src = item.src;
    });
}

window.addEventListener('load', () => {
    renderGallery();
    preloadImages();
});


//MENU
const menuTrigger = document.getElementById('menuTrigger');
const slideMenu = document.getElementById('slideMenu');
const menuOverlay = document.getElementById('menuOverlay');
const tooltip = document.querySelector('.menu-tooltip');

let tooltipTimeout;
let hasShownTooltip = false;

function showTooltip() {
    if (!hasShownTooltip) {
        tooltip.classList.add('show');
        hasShownTooltip = true;

        tooltipTimeout = setTimeout(() => {
            hideTooltip();
        }, 6000);
    }
}

function hideTooltip() {
    tooltip.classList.remove('show');
    if (tooltipTimeout) {
        clearTimeout(tooltipTimeout);
    }
}

function toggleMenu() {
    menuTrigger.classList.toggle('active');
    slideMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');

    if (slideMenu.classList.contains('active')) {
        hideTooltip();
    }
}

setTimeout(() => {
    showTooltip();
}, 1500);

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!hasShownTooltip) return;

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (!slideMenu.classList.contains('active')) {
            tooltip.classList.add('show');
            setTimeout(() => {
                hideTooltip();
            }, 4000);
        }
    }, 1000);
});

menuTrigger.addEventListener('click', toggleMenu);

menuOverlay.addEventListener('click', toggleMenu);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && slideMenu.classList.contains('active')) {
        toggleMenu();
    }
});

document.addEventListener('click', function (e) {
    if (!menuTrigger.contains(e.target)) {
        hideTooltip();
    }
});