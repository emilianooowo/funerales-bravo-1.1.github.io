document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  const elementosAnimados = document.querySelectorAll('.fade-up, .slide-left, .slide-right, .scale-in');
  elementosAnimados.forEach(el => {
    observer.observe(el);
  });
});


//TIRA
document.addEventListener('DOMContentLoaded', function () {
    const stripContainer = document.querySelector('.strip-container');
    const strip = document.querySelector('.strip');

    if (!stripContainer || !strip) {
        console.error('Contenedores no encontrados');
        return;
    }

    let isMobile = window.innerWidth <= 768;
    let currentContainer = stripContainer;

    const planes = ['basico', 'estandar', 'premier', 'lux'];

    function isMobileView() {
        return window.innerWidth <= 768;
    }

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
        const originalStripItems = Array.from(stripContainer.querySelectorAll('.strip-item'));
        const originalContentAreas = Array.from(stripContainer.querySelectorAll('.content-area'));

        const mobileContainer = document.createElement('div');
        mobileContainer.className = 'strip-container mobile-layout';

        originalStripItems.forEach((item, index) => {
            const itemClone = item.cloneNode(true);
            const contentClone = originalContentAreas[index].cloneNode(true);

            mobileContainer.appendChild(itemClone);
            mobileContainer.appendChild(contentClone);
        });

        stripContainer.parentNode.replaceChild(mobileContainer, stripContainer);
        currentContainer = mobileContainer;

        planes.forEach(renderExtrasFor);
    }

    function applyDesktopLayout() {
        const originalStripItems = Array.from(stripContainer.querySelectorAll('.strip-item'));
        const originalContentAreas = Array.from(stripContainer.querySelectorAll('.content-area'));

        const desktopContainer = document.createElement('div');
        desktopContainer.className = 'strip-container desktop-layout';

        const stripDiv = document.createElement('div');
        stripDiv.className = 'strip';

        originalStripItems.forEach(item => {
            const itemClone = item.cloneNode(true);
            stripDiv.appendChild(itemClone);
        });

        desktopContainer.appendChild(stripDiv);

        originalContentAreas.forEach(content => {
            const contentClone = content.cloneNode(true);
            desktopContainer.appendChild(contentClone);
        });

        stripContainer.parentNode.replaceChild(desktopContainer, stripContainer);
        currentContainer = desktopContainer;

        planes.forEach(renderExtrasFor);
    }

    function setupAccordionBehavior() {
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
    }

    function initLayout() {
        if (isMobileView()) {
            applyMobileLayout();
        } else {
            applyDesktopLayout();
        }

        setupAccordionBehavior();

        if (!isMobileView()) {
            const firstItem = currentContainer.querySelector('.strip-item[data-target="content1"]');
            const firstContent = currentContainer.querySelector('#content1');

            if (firstItem && firstContent) {
                firstItem.classList.add('active');
                firstContent.classList.add('active');
            }
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    try {
        initLayout();
    } catch (error) {
        console.error('Error al inicializar:', error);
    }

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
      <h5 class="extras-subtitle">*Todos los servicios adicionales aplican para todos los planes de velación*</h5>
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
function initAccordion() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('.card-title');

        title.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                cards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('active');
                    }
                });

                card.classList.toggle('active');
            }
        });
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