const galleryData = {
    naturaleza: [
        { src: './imgs/cementerio/urna-71.webp', title: 'urna 1' },
        { src: './imgs/cementerio/urna-03.webp', title: 'urna 2' },
        { src: './imgs/cementerio/urna-26.webp', title: 'urna 3' },
        { src: './imgs/cementerio/urna-34.webp', title: 'urna 4' },
        { src: './imgs/cementerio/urna-50.webp', title: 'urna 5' },
        { src: './imgs/cementerio/urna-57.webp', title: 'urna 6' },
        { src: './imgs/cementerio/urna-59.webp', title: 'urna 7' },
        { src: './imgs/cementerio/urna-82.webp', title: 'urna 8' }
    ],
    arquitectura: [
        { src: 'https://picsum.photos/400/400?random=9', title: 'Rascacielos Moderno' },
        { src: 'https://picsum.photos/400/400?random=10', title: 'Catedral Gótica' },
        { src: 'https://picsum.photos/400/400?random=11', title: 'Puente Colgante' },
        { src: 'https://picsum.photos/400/400?random=12', title: 'Casa Minimalista' },
        { src: 'https://picsum.photos/400/400?random=13', title: 'Teatro Clásico' },
        { src: 'https://picsum.photos/400/400?random=14', title: 'Museo Contemporáneo' }
    ],
    abstracto: [
        { src: 'https://picsum.photos/400/400?random=22', title: 'Formas Geométricas' },
        { src: 'https://picsum.photos/400/400?random=23', title: 'Colores Vibrantes' },
        { src: 'https://picsum.photos/400/400?random=24', title: 'Texturas Suaves' },
        { src: 'https://picsum.photos/400/400?random=25', title: 'Líneas Dinámicas' },
        { src: 'https://picsum.photos/400/400?random=26', title: 'Composición Fluida' },
        { src: 'https://picsum.photos/400/400?random=27', title: 'Arte Digital' },
        { src: 'https://picsum.photos/400/400?random=28', title: 'Movimiento Abstracto' },
        { src: 'https://picsum.photos/400/400?random=29', title: 'Espacio Negativo' }
    ]
};

const galleryGrid = document.getElementById('galleryGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
let currentCategory = 'naturaleza';

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