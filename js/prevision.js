document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');

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

    if (menuToggle && menuDropdown) {
        console.log('Inicializando menú PC');

        menuToggle.addEventListener('click', toggleMenuPC);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

        document.querySelectorAll('.menu-pc-link').forEach(link => {
            link.addEventListener('click', () => {
                console.log('Clic en enlace del menú PC');
                closeMenuPC();
            });
        });

        if (menuDropdown) {
            menuDropdown.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    console.log('Clic en enlace del dropdown');
                    closeMenuPC();
                });
            });
        }

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

    const galleryData = [
        { src: 'assets/imgs/cementerio/urna-b-1.webp', title: 'urna basica 1' },
        { src: 'assets/imgs/cementerio/urna-p-1.webp', title: 'urna personalizada 2' },
        { src: 'assets/imgs/cementerio/urna-p-2.webp', title: 'urna personalizada 3' },
        { src: 'assets/imgs/cementerio/urna-p-3.webp', title: 'urna personalizada  4' },
        { src: 'assets/imgs/cementerio/urna-p-4.webp', title: 'urna personalizada 5' },
        { src: 'assets/imgs/cementerio/urna-p-5.webp', title: 'urna personalizada 6' },
        { src: 'assets/imgs/cementerio/urna-p-6.webp', title: 'urna personalizada 7' },
        { src: 'assets/imgs/cementerio/urna-p-7.webp', title: 'urna personalizada 8' },
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
                "Barra de alimentos: 100 pzas. de pan",
                "1 arreglo floral"
            ],
            instalaciones: [
                "Salas de velación por 24 hrs.",
                "Personal de Apoyo en Sala",
                "Barra de Bebidas ilimitadas (agua, café, té y refresco)"
            ],
            domicilio: [
                "Se agrega 1 biombo al kit de velación",
                "2 kilos de café, 1 kilo de azúcar, préstamo de 1 cafetera 24 hrs",
                "50 sillas de madera"
            ]
        },
        platino: {
            title: "Plan Platino",
            included: [
                "Féretro de Madera con herrajes (3 opciones a elegir)",
                "2 Arreglos Floral",
                "Placa memorial Qr",
                "Barra de Alimentos limitados: 200 pzas. Pan, 150 bocadillos"
            ],
            instalaciones: [
                "Salas de velación por 24 hrs.",
                "Personal de apoyo en sala",
                "Alfombra y 4 Cirios se agregan al kit de velación",
                "Barra de Bebidas Ilimitadas (agua, café, té y refresco)"
            ],
            domicilio: [
                "1 Carpa por 24 Horas, 100 Sillas por 24 Horas",
                "1 Cafetera por 24 Horas, 2 Kilos de Café, 2 Kilos de Azúcar, 100 Vasos Desechables",
                "1 Paquete de Refrescos Desechables de 2 Litros (12 piezas)",
                "Alfombra y 1 biombo se agrega al kit de velacion",
            ]
        },
        diamante: {
            title: "Plan Diamante",
            included: [
                "Féretro de Madera de lujo barnizado con herrajes",
                "Corona funebre",
                "Placa memorial Qr",
                "Lámpara de onix memorial",
                "Vehículo para Traslado de Ofrendas Florales"
            ],
            instalaciones: [
                "Salas de velación por 24 hrs",
                "Personal de Apoyo en Sala",
                "Habitación de Reposo (hotel kamico)",
                "Arreglo floral se agrega al kit de velación",
                "Barra de Bebidas Ilimitadas (agua, café, Té y refresco)",
                "Barra de alimentos limitados (300 pzas pan, y 200 bocadillos)"
            ],
            domicilio: [
                "2 Carpa por 24 Horas, 150 Sillas por 24 Horas",
                "2 Cafetera por 24 Horas, 3 Kilos de Café, 4 Kilos de Azúcar",
                "2 Paquete de Refrescos (12 pzas de 2 lts.)",
                "Alfombra y 1 biombo se agrega al kit de velacion",
                "Barra de alimentos limitados (300 pzas pan, y 100 bocadillos)",
                "200 Vasos Desechables"
            ]
        }
    };

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

        document.getElementById('planTitle1').textContent = planData[plan1].title;
        document.getElementById('serviceType1').textContent = service1 === 'instalaciones' ? 'En Instalaciones' : 'A Domicilio';
        document.getElementById('planContent1').innerHTML = generatePlanContent(plan1, service1);

        document.getElementById('planTitle2').textContent = planData[plan2].title;
        document.getElementById('serviceType2').textContent = service2 === 'instalaciones' ? 'En Instalaciones' : 'A Domicilio';
        document.getElementById('planContent2').innerHTML = generatePlanContent(plan2, service2);

        document.getElementById('comparisonResult').classList.add('active');
    }

    function generatePlanContent(plan, service) {
        const data = planData[plan];
        let content = `<h4 class="titulo-plan">Servicios <span class="plan-elegido">incluidos</span> en el <span class="plan-elegido"> ${data.title}</span>:</h4>`;
        content += '<ul class="service-list">';
        data.included.forEach(item => {
            content += `<li>${item}</li>`;
        });
        content += '</ul>';

        content += `<h4 style="color: #000; margin-bottom: 15px;"><span class="plan-elegido">Adicional</span> ${service === 'instalaciones' ? 'en instalaciones' : 'a domicilio'}:</h4>`;
        content += '<ul class="service-list">';
        data[service].forEach(item => {
            content += `<li>${item}</li>`;
        });
        content += '</ul>';

        return content;
    }

    // Event listeners
    document.getElementById('plan1').addEventListener('change', updateComparison);
    document.getElementById('service1').addEventListener('change', updateComparison);
    document.getElementById('plan2').addEventListener('change', updateComparison);
    document.getElementById('service2').addEventListener('change', updateComparison);
});