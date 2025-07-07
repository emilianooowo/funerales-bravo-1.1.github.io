document.addEventListener('DOMContentLoaded', () => {
    // --- MENÚ PC ---
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');

    // Debug: Verificar si los elementos existen
    console.log('Menu PC Elements:', {
        menuToggle: menuToggle,
        menuDropdown: menuDropdown
    });

    function openMenuPC() {
        console.log('Abriendo menú PC');
        if (menuToggle) menuToggle.classList.add('active');
        if (menuDropdown) menuDropdown.classList.add('active');
    }

    function closeMenuPC() {
        console.log('Cerrando menú PC');
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuDropdown) menuDropdown.classList.remove('active');
    }

    function toggleMenuPC(e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = menuToggle && menuToggle.classList.contains('active');
        console.log('Toggle menú PC - Estado actual:', isActive);

        if (isActive) {
            closeMenuPC();
        } else {
            openMenuPC();
        }
    }

    // Inicializar menú PC solo si los elementos existen
    if (menuToggle && menuDropdown) {
        console.log('Inicializando menú PC');

        // Event listener para el botón toggle
        menuToggle.addEventListener('click', toggleMenuPC);

        // Cerrar con tecla Escape
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

        // Cerrar menú al hacer clic en los enlaces
        document.querySelectorAll('.menu-pc-link').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Clic en enlace del menú PC');
                closeMenuPC();
            });
        });

        // También cerrar al hacer clic en enlaces dentro del dropdown
        if (menuDropdown) {
            menuDropdown.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    console.log('Clic en enlace del dropdown');
                    closeMenuPC();
                });
            });
        }

        // Cerrar menú al hacer clic fuera del menú
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

    // --- MENÚ MÓVIL ---
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

    // --- GALERÍA ---
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
        if (!galleryGrid) return;
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
                galleryItem.addEventListener('click', () => openLightbox(index));
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
        const img = document.getElementById('lightboxImage');
        const overlay = document.getElementById('lightboxOverlay');
        if (img && overlay) {
            img.src = currentImages[currentIndex].src;
            overlay.classList.remove('hidden');
        }
    }

    function closeLightbox() {
        const overlay = document.getElementById('lightboxOverlay');
        if (overlay) overlay.classList.add('hidden');
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        document.getElementById('lightboxImage').src = currentImages[currentIndex].src;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentImages.length;
        document.getElementById('lightboxImage').src = currentImages[currentIndex].src;
    }

    document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
    document.getElementById('prevBtn')?.addEventListener('click', showPrev);
    document.getElementById('nextBtn')?.addEventListener('click', showNext);

    document.addEventListener('keydown', (e) => {
        const overlay = document.getElementById('lightboxOverlay');
        const overlayVisible = overlay && !overlay.classList.contains('hidden');
        if (!overlayVisible) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    showGallery();
    preloadImages();

    // --- OBSERVER ---
    const section = document.querySelector('.funeral-section');
    if (section) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const titleLine = entry.target.querySelector('.title-line');
                    const title = entry.target.querySelector('.section-title');
                    const description = entry.target.querySelector('.section-description');

                    if (titleLine) {
                        titleLine.classList.add('animate');
                        setTimeout(() => title?.classList.add('animate'), 600);
                        setTimeout(() => description?.classList.add('animate'), 1000);
                    }
                }
            });
        }, observerOptions);

        observer.observe(section);
    }

    const planData = {
        basico: {
            title: "Plan Básico Empresarial",
            included: [
                "Féretro Básico (madera forrado de tela, metálico y madera con herrajes básico)",
                "Barra de alimentos: 100 pzas. de pan tradicional",
                "1 arreglo floral natural"
            ],
            instalaciones: [
                "Salas de velación por 24 hrs.",
                "Personal de Apoyo en Sala",
                "Barra de Bebidas ilimitadas (agua, café, té y refresco)"
            ],
            domicilio: [
                "+1 biombo al kit de velación",
                "2 kilos de café, 1 kilo de azúcar, préstamo de 1 cafetera 24 hrs",
                "50 sillas de madera"
            ]
        },
        platino: {
            title: "Plan Platino",
            included: [
                "Féretro de Madera con herrajes (3 opciones a elegir)",
                "2 Arreglos Floral natural",
                "Formato de Certificado Médico Cuando el familiar fallece en domicilio",
                "Placa memorial Qr",
                "Barra de Alimentos limitados: 200 pzas. Pan tradicional, 150 bocadillos rellenos de jamón y queso"
            ],
            instalaciones: [
                "Salas de velación por 24 hrs.",
                "Personal de apoyo en sala",
                "+ alfombra y 4 Cirios al kit de velación",
                "Barra de Bebidas Ilimitadas (agua, café, té y refresco)"
            ],
            domicilio: [
                "1 Carpa por 24 Horas, 100 Sillas por 24 Horas",
                "1 Cafetera por 24 Horas, 2 Kilos de Café, 2 Kilos de Azúcar, 100 Vasos Desechables",
                "1 Paquete de Refrescos Desechables de 2 Litros (12 piezas)",
                "+ Alfombra y 1 biombo al kit de velacion"
            ]
        },
        diamante: {
            title: "Plan Diamante",
            included: [
                "Féretro de Madera de lujo barnizado con herrajes",
                "Corona funebre",
                "Formato Certificado Médico Cuando el familiar fallece en domicilio",
                "Placa memorial Qr",
                "Lámpara de onix memorial",
                "Vehículo para Traslado de Ofrendas Florales"
            ],
            instalaciones: [
                "Salas de velación por 24 hrs",
                "Personal de Apoyo en Sala",
                "Habitación de Reposo (referencia: hotel kamico)",
                "+ floreros al kit de velación",
                "Barra de Bebidas Ilimitadas (agua, café, Té y refresco)",
                "Barra de alimentos limitados (300 pzas pan tradicional, y 200 bocadillos rellenos de jamón y queso)"
            ],
            domicilio: [
                "2 Carpa por 24 Horas, 150 Sillas por 24 Horas",
                "2 Cafetera por 24 Horas, 3 Kilos de Café, 4 Kilos de Azúcar",
                "2 Paquete de Refrescos (12 pzas de 2 lts.)",
                "+ Alfombra y 1 biombo al kit de velación",
                "Barra de alimentos limitados (300 pzas pan tradicional, y 100 bocadillos rellenos de jamón y queso)",
                "200 Vasos Desechables"
            ]
        }
    };

    const disclaimer = "IMPORTANTE A TOMAR EN CUENTA: SI LA PERSONA A LA CUAL FUE DADA EL SERVICIO FALLECE AL PASAR 6 MESES CON 1 DÍA DESPUÉS DE CONTRATAR ESTE PLAN EL 50% DE LA DEUDA RESTANTE PASA A PAGARSE DE CONTADO Y EL OTRO 50% SE PAGA EN UN PLAZO DE 6 MESES.";

    function updateComparison() {
        const plan1 = document.getElementById('plan1').value;
        const service1 = document.getElementById('service1').value;
        const plan2 = document.getElementById('plan2').value;
        const service2 = document.getElementById('service2').value;

        if (plan1 && service1 && plan2 && service2) {
            showComparison(plan1, service1, plan2, service2);
        } else {
            document.getElementById('comparisonResult').classList.remove('active');
        }
    }

    function showComparison(plan1, service1, plan2, service2) {
        const comparison1 = document.getElementById('comparison1');
        const comparison2 = document.getElementById('comparison2');

        // Plan 1
        document.getElementById('planTitle1').textContent = planData[plan1].title;
        document.getElementById('serviceType1').textContent = service1 === 'instalaciones' ? 'En Instalaciones' : 'A Domicilio';
        document.getElementById('planContent1').innerHTML = generatePlanContent(plan1, service1);

        // Plan 2
        document.getElementById('planTitle2').textContent = planData[plan2].title;
        document.getElementById('serviceType2').textContent = service2 === 'instalaciones' ? 'En Instalaciones' : 'A Domicilio';
        document.getElementById('planContent2').innerHTML = generatePlanContent(plan2, service2);

        document.getElementById('comparisonResult').classList.add('active');
    }

    function generatePlanContent(plan, service) {
        const data = planData[plan];
        let content = '<h4 style="color: #000; margin-bottom: 15px;">Servicios Incluidos:</h4>';
        content += '<ul class="service-list">';
        data.included.forEach(item => {
            content += `<li>${item}</li>`;
        });
        content += '</ul>';

        content += `<h4 style="color: #000; margin-bottom: 15px;">Adicional ${service === 'instalaciones' ? 'en instalaciones' : 'a domicilio'}:</h4>`;
        content += '<ul class="service-list">';
        data[service].forEach(item => {
            content += `<li>${item}</li>`;
        });
        content += '</ul>';

        content += `<p class="disclaimer">${disclaimer}</p>`;

        return content;
    }

    // Event listeners
    document.getElementById('plan1').addEventListener('change', updateComparison);
    document.getElementById('service1').addEventListener('change', updateComparison);
    document.getElementById('plan2').addEventListener('change', updateComparison);
    document.getElementById('service2').addEventListener('change', updateComparison);
});