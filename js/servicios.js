function observeElements() {
    const dividers = document.querySelectorAll('.section-divider-leaves');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

            }
        });
    }, {
        threshold: 0.5
    });

    dividers.forEach(divider => {
        observer.observe(divider);
    });
}

document.addEventListener('DOMContentLoaded', observeElements);

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
    const stripContainer = document.querySelector('.strip-container');

    if (!stripContainer) {
        console.log('Strip container no encontrado - esto es normal si no estás en esa página');
        return;
    }

    let currentContainer = stripContainer;
    const planes = ['basico', 'estandar', 'premier', 'lux'];

    function isMobileView() {
        return window.innerWidth <= 768;
    }

    function setupAccordionBehavior() {
        const newContainer = currentContainer.cloneNode(true);
        currentContainer.parentNode.replaceChild(newContainer, currentContainer);
        currentContainer = newContainer;

        currentContainer.addEventListener('click', function (e) {
            const clickedItem = e.target.closest('.strip-item');
            if (!clickedItem) return;

            const targetId = clickedItem.getAttribute('data-target');
            const targetContent = currentContainer.querySelector(`#${targetId}`);

            if (!targetContent) {
                console.warn(`Contenido ${targetId} no encontrado`);
                return;
            }

            const currentStripItems = currentContainer.querySelectorAll('.strip-item');
            const currentContentAreas = currentContainer.querySelectorAll('.content-area');
            const isCurrentlyActive = clickedItem.classList.contains('active');

            currentStripItems.forEach(item => item.classList.remove('active'));
            currentContentAreas.forEach(content => content.classList.remove('active'));

            if (!isCurrentlyActive) {
                clickedItem.classList.add('active');
                targetContent.classList.add('active');
            }
        });

        ensureOneOpen();
    }

    function ensureOneOpen() {
        const stripItems = currentContainer.querySelectorAll('.strip-item');
        const contentAreas = currentContainer.querySelectorAll('.content-area');
        const anyActive = Array.from(stripItems).some(item => item.classList.contains('active'));

        if (!anyActive && stripItems.length > 0) {
            stripItems[0].classList.add('active');
            const firstTargetId = stripItems[0].getAttribute('data-target');
            const firstContent = currentContainer.querySelector(`#${firstTargetId}`);
            if (firstContent) firstContent.classList.add('active');
        }
    }

    function renderExtrasFor(plan) {
        const container = document.getElementById(`extras-${plan}`);
        if (!container) return;

        container.innerHTML = `
            <div class="extras-container">
                <h4 class="extras-title">Servicios Adicionales Disponibles</h4>
                <h5 class="extras-subtitle">*Todos los servicios adicionales aplican para todos los planes de velación*</h5>
                <div class="extras-grid">
                    ${extrasData.map(extra => `
                        <div class="extra-card">
                            <h4>${extra.title}</h4>
                            <ul class="extra-features">
                                ${extra.features.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                            <div class="extra-price">${extra.price}</div>
                            <a href="cotizador.html?plan=${plan}&extra=${extra.extraQuery}" class="cotizar-btn">Cotiza Ya</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function applyMobileLayout() {
        const stripItems = Array.from(currentContainer.querySelectorAll('.strip-item'));
        const contentAreas = Array.from(currentContainer.querySelectorAll('.content-area'));

        if (stripItems.length === 0) {
            console.warn('No se encontraron strip-items');
            return;
        }

        const mobileContainer = document.createElement('div');
        mobileContainer.className = 'strip-container mobile-layout';

        stripItems.forEach((item, index) => {
            const itemClone = item.cloneNode(true);
            mobileContainer.appendChild(itemClone);

            if (contentAreas[index]) {
                const contentClone = contentAreas[index].cloneNode(true);
                mobileContainer.appendChild(contentClone);
            }
        });

        currentContainer.parentNode.replaceChild(mobileContainer, currentContainer);
        currentContainer = mobileContainer;

        planes.forEach(renderExtrasFor);
    }

    function applyDesktopLayout() {
        const stripItems = Array.from(currentContainer.querySelectorAll('.strip-item'));
        const contentAreas = Array.from(currentContainer.querySelectorAll('.content-area'));

        if (stripItems.length === 0) {
            console.warn('No se encontraron strip-items');
            return;
        }

        const desktopContainer = document.createElement('div');
        desktopContainer.className = 'strip-container desktop-layout';

        const stripDiv = document.createElement('div');
        stripDiv.className = 'strip';

        stripItems.forEach(item => {
            const itemClone = item.cloneNode(true);
            stripDiv.appendChild(itemClone);
        });

        desktopContainer.appendChild(stripDiv);

        contentAreas.forEach(content => {
            const contentClone = content.cloneNode(true);
            desktopContainer.appendChild(contentClone);
        });

        currentContainer.parentNode.replaceChild(desktopContainer, currentContainer);
        currentContainer = desktopContainer;

        planes.forEach(renderExtrasFor);
    }

    function initLayout() {
        try {
            if (isMobileView()) {
                applyMobileLayout();
            } else {
                applyDesktopLayout();
            }

            setupAccordionBehavior();

        } catch (error) {
            console.error('Error al inicializar layout:', error);
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    let isMobile = isMobileView();

    const handleResize = debounce(() => {
        const wasMobile = isMobile;
        isMobile = isMobileView();

        if (wasMobile !== isMobile) {
            initLayout();
        }
    }, 250);

    initLayout();
    window.addEventListener('resize', handleResize);
});

const extrasData = [
    {
        title: "+ Cremación",
        price: "$8,500",
        features: ["Proceso de cremación", "Urna básica incluida", "Certificado de cremación"],
        extraQuery: "cremacion"
    },
    {
        title: "+ Domicilio",
        price: "$4,200",
        features: ["Instalación en domicilio", "Equipo de refrigeración", "Decoración básica"],
        extraQuery: "domicilio"
    },
    {
        title: "Cremación y Domicilio",
        price: "$11,900",
        features: ["Todos los beneficios anteriores", "Descuento por paquete", "Gestión integral"],
        extraQuery: "combo"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    function initAccordion() {
        const cards = document.querySelectorAll('.card');

        if (cards.length === 0) {
            console.log('No se encontraron cards - esto es normal si no estás en esa página');
            return;
        }

        cards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
        });

        const updatedCards = document.querySelectorAll('.card');

        updatedCards.forEach(card => {
            const title = card.querySelector('.card-title');

            if (title) {
                title.addEventListener('click', function () {
                    if (window.innerWidth <= 768) {
                        updatedCards.forEach(otherCard => {
                            if (otherCard !== card) {
                                otherCard.classList.remove('active');
                            }
                        });

                        card.classList.toggle('active');
                    }
                });
            }
        });
    }

    initAccordion();

    window.addEventListener('resize', function () {
        const cards = document.querySelectorAll('.card');

        if (window.innerWidth > 768) {
            cards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});

function showContent(planId) {
    const contents = document.querySelectorAll('.service-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(planId).classList.add('active');

    event.target.classList.add('active');
}