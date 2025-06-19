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
        threshold: 0.3 // Se activa cuando el 30% del elemento es visible
    });

    dividers.forEach(divider => {
        observer.observe(divider);
    });
}

document.addEventListener('DOMContentLoaded', observeElements);

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

function showPlan(planName) {
    const allTabs = document.querySelectorAll('.tab-content');
    const allTabButtons = document.querySelectorAll('.tab');

    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    allTabButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(planName).classList.add('active');
    event.target.classList.add('active');
}