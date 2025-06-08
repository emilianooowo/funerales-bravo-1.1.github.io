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
            }, 3000);
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

//FOOTER
fetch('global.html')
    .then(res => res.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const header = doc.querySelector('header');
        if (header) document.getElementById('header-placeholder').innerHTML = header.outerHTML;

        const footer = doc.querySelector('footer');
        if (footer) document.getElementById('footer-placeholder').innerHTML = footer.outerHTML;

        document.body.style.visibility = 'visible';
    })
    .catch(err => {
        console.error('Error al cargar global.html:', err);
        document.body.style.visibility = 'visible';
    });

window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName('form')) {
        form.reset();
    }
}

//TIRA

document.addEventListener('DOMContentLoaded', function () {
    // Usar el contenedor correcto según tu HTML
    const stripContainer = document.querySelector('.strip-container');
    const strip = document.querySelector('.strip');

    if (!stripContainer || !strip) {
        console.error('Contenedores no encontrados');
        return;
    }

    let isMobile = window.innerWidth <= 768;

    // Obtener elementos originales
    const originalStripItems = Array.from(document.querySelectorAll('.strip-item'));
    const originalContentAreas = Array.from(document.querySelectorAll('.content-area'));

    if (originalStripItems.length === 0 || originalContentAreas.length === 0) {
        console.error('No se encontraron elementos strip-item o content-area');
        return;
    }

    function isMobileView() {
        return window.innerWidth <= 768;
    }

    function applyMobileLayout() {
        // Crear estructura móvil: item1 -> content1 -> item2 -> content2...
        const mobileContainer = document.createElement('div');
        mobileContainer.className = 'strip-container mobile-layout';

        originalStripItems.forEach((item, index) => {
            // Clonar elementos para evitar problemas de referencia
            const itemClone = item.cloneNode(true);
            const contentClone = originalContentAreas[index].cloneNode(true);

            mobileContainer.appendChild(itemClone);
            mobileContainer.appendChild(contentClone);
        });

        // Reemplazar el contenedor original
        stripContainer.parentNode.replaceChild(mobileContainer, stripContainer);

        // Actualizar referencia global
        window.currentContainer = mobileContainer;
    }

    function applyDesktopLayout() {
        // Crear estructura desktop: strip con todos los items + todos los contents
        const desktopContainer = document.createElement('div');
        desktopContainer.className = 'strip-container desktop-layout';

        const stripDiv = document.createElement('div');
        stripDiv.className = 'strip';

        // Agregar todos los strip-items al strip
        originalStripItems.forEach(item => {
            const itemClone = item.cloneNode(true);
            stripDiv.appendChild(itemClone);
        });

        desktopContainer.appendChild(stripDiv);

        // Agregar todos los content-areas después del strip
        originalContentAreas.forEach(content => {
            const contentClone = content.cloneNode(true);
            desktopContainer.appendChild(contentClone);
        });

        // Reemplazar el contenedor original
        const currentContainer = document.querySelector('.strip-container');
        currentContainer.parentNode.replaceChild(desktopContainer, currentContainer);

        // Actualizar referencia global
        window.currentContainer = desktopContainer;
    }

    function setupAccordionBehavior() {
        const currentContainer = window.currentContainer || document.querySelector('.strip-container');

        // Usar delegación de eventos
        currentContainer.addEventListener('click', function (e) {
            const clickedItem = e.target.closest('.strip-item');

            if (!clickedItem) return;

            const targetId = clickedItem.getAttribute('data-target');
            const targetContent = currentContainer.querySelector(`#${targetId}`);

            if (!targetContent) {
                console.warn(`Contenido ${targetId} no encontrado`);
                return;
            }

            // Obtener todos los elementos actuales
            const currentStripItems = currentContainer.querySelectorAll('.strip-item');
            const currentContentAreas = currentContainer.querySelectorAll('.content-area');

            // Verificar si ya está activo
            const isCurrentlyActive = clickedItem.classList.contains('active');

            // Desactivar todos
            currentStripItems.forEach(item => {
                item.classList.remove('active');
            });

            currentContentAreas.forEach(content => {
                content.classList.remove('active');
            });

            // Activar el clickeado si no estaba activo
            if (!isCurrentlyActive) {
                clickedItem.classList.add('active');
                targetContent.classList.add('active');
            }
        });
    }

    function initLayout() {
        // Determinar y aplicar layout
        if (isMobileView()) {
            applyMobileLayout();
        } else {
            applyDesktopLayout();
        }

        // Configurar event listeners
        setupAccordionBehavior();
    }

    // Función de debounce para resize
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Inicializar
    try {
        initLayout();
    } catch (error) {
        console.error('Error al inicializar:', error);
    }

    // Manejar resize
    const handleResize = debounce(() => {
        const wasMobile = isMobile;
        isMobile = isMobileView();

        if (wasMobile !== isMobile) {
            try {
                initLayout();
            } catch (error) {
                console.error('Error en resize:', error);
            }
        }
    }, 250);

    window.addEventListener('resize', handleResize);
});

//EXTRAS
const extrasData = [
    {
        title: "+ Cremación",
        description: "Servicio de cremación con entrega de cenizas en urna básica",
        features: ["Proceso de cremación", "Urna básica incluida", "Certificado de cremación"],
        price: "Desde $8,500",
        extraQuery: "cremacion"
    },
    {
        title: "+ Domicilio",
        description: "Velación en la comodidad del hogar familiar",
        features: ["Instalación en domicilio", "Equipo de refrigeración", "Decoración básica"],
        price: "Desde $4,200",
        extraQuery: "domicilio"
    },
    {
        title: "+ Cremación + Domicilio",
        description: "Combinación completa de ambos servicios con descuento especial",
        features: ["Todos los beneficios anteriores", "Descuento por paquete", "Gestión integral"],
        price: "Desde $11,900",
        extraQuery: "combo"
    }
];

const planes = ["basico", "estandar", "premier", "lux"];

function renderExtrasFor(plan) {
    const container = document.getElementById(`extras-${plan}`);
    if (!container) return;

    container.innerHTML = `
    <div class="extras-container">
      <h4 class="extras-title">Servicios Adicionales Disponibles</h4>
      <div class="extras-grid">
        ${extrasData.map(extra => `
          <div class="extra-card">
            <h4>${extra.title}</h4>
            <p>${extra.description}</p>
            <ul class="extra-features">
              ${extra.features.map(f => `<li>${f}</li>`).join("")}
            </ul>
            <div class="extra-price">${extra.price}</div>
            <a href="cotizador.html?plan=${plan}&extra=${extra.extraQuery}" class="cotizar-btn">Cotiza Ya</a>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
    planes.forEach(plan => renderExtrasFor(plan));
});

//CARDS
function toggleCard(card) {
    const allCards = document.querySelectorAll('.card');
    const isExpanded = card.classList.contains('expanded');

    allCards.forEach(c => {
        if (c !== card && c.classList.contains('expanded')) {
            c.classList.remove('expanded');
            const items = c.querySelectorAll('.card-details li');
            items.forEach(item => {
                item.style.transitionDelay = '0s';
            });
        }
    });

    if (!isExpanded) {
        card.classList.add('expanded');
        const items = card.querySelectorAll('.card-details li');
        items.forEach((item, index) => {
            item.style.setProperty('--i', index);
        });
    } else {
        card.classList.remove('expanded');
    }

    if (!isExpanded) {
        setTimeout(() => {
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 400);
    }
}

document.addEventListener('click', function (event) {
    if (!event.target.closest('.card')) {
        const allCards = document.querySelectorAll('.card.expanded');
        allCards.forEach(card => {
            card.classList.remove('expanded');
            const items = card.querySelectorAll('.card-details li');
            items.forEach(item => {
                item.style.transitionDelay = '0s';
            });
        });
    }
});

if ('ontouchstart' in window) {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('touchstart', function () {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }
        }, { passive: true });

        card.addEventListener('touchend', function () {
            if (!this.classList.contains('expanded')) {
                this.style.transform = '';
                this.style.transition = '';
            }
        }, { passive: true });
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});