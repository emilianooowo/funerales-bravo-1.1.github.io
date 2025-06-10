function initSlidingMenu() {
    const css = `
        .menu-trigger {
            position: fixed;
            bottom: 20px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1001;
            transition: all .5s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: black;
            font-size: 1.1rem;
        }

        .menu-tooltip {
            position: absolute;
            right: 70px;
            top: 50%;
            transform: translateY(-50%);
            background: #E91E63;
            color: white;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: 1.2rem;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s ease;
            pointer-events: none;
            font-family: var(--fuente-secundaria);
            border: 1px solid white;
            z-index: 1002;
        }

        .menu-tooltip::after {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 10px solid transparent;
            border-left-color: #E91E63;
        }

        .menu-tooltip.show {
            opacity: 1;
            visibility: visible;
            animation: tooltipBounceHorizontal 0.5s ease-out;
        }

        @keyframes tooltipBounceHorizontal {
            0% {
                opacity: 0;
                transform: translateY(-50%) scale(0.8) translateX(0);
            }
            20% {
                transform: translateY(-50%) scale(1.1) translateX(-6px);
            }
            40% {
                transform: translateY(-50%) scale(1.05) translateX(6px);
            }
            60% {
                transform: translateY(-50%) scale(1.03) translateX(-4px);
            }
            80% {
                transform: translateY(-50%) scale(1.01) translateX(4px);
            }
            100% {
                opacity: 1;
                transform: translateY(-50%) scale(1) translateX(0);
            }
        }

        .menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
        }

        .menu-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .slide-menu {
            position: fixed;
            bottom: 0;
            background: var(--color-beige-2, #f5f5dc);
            transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            z-index: 1000;
            max-height: 80vh;
            overflow-y: auto;
        }

        .slide-menu.active {
            transform: translateY(0);
        }

        .menu-content {
            padding: 2rem;
        }

        .menu-header {
            text-align: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid rgba(0, 0, 0, 1);
        }

        .menu-title h1 {
            color: rgb(0, 0, 0);
            margin: 0;
        }

        .menu-subtitle h2 {
            color: rgb(0, 0, 0);
            font-family: var(--fuente-secundaria);
            margin: 0.5rem 0 0 0;
        }

        .nav-list {
            list-style: none;
            display: grid;
            gap: 0.5rem;
            margin: 0;
            padding: 0;
        }

        .nav-item {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 12px;
            transition: all 0.3s ease;
            overflow: hidden;
        }

        .nav-item:hover {
            background: rgba(0, 0, 0, 0.7);
            transform: translateY(-2px);
        }

        .nav-item.instagram {
            background: linear-gradient(45deg, #833ab4, #fd1d1d, #fcb045);
        }

        .nav-item.facebook {
            background: #1877f2;
        }

        .nav-item.whatsapp {
            background: #25D366;
        }

        .nav-item.cremapets {
            background: var(--color-azul-mascotas, #4a90e2);
        }

        .nav-item.inicio {
            background: var(--color-dorado, #d4af37);
        }

        .nav-item.inicio:hover {
            background: var(--color-dorado, #d4af37);
            transform: translateY(-2px);
        }

        .nav-item.inicio .nav-link {
            color: white;
        }

        .nav-link {
            display: flex;
            align-items: center;
            padding: 1rem 1.5rem;
            color: #141414;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .nav-item.cremapets:hover .nav-link,
        .nav-item.instagram:hover .nav-link,
        .nav-item.facebook:hover .nav-link {
            color: white;
        }

        .nav-icon {
            margin-right: 1rem;
            font-size: 1.5rem;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease;
        }

        .nav-text {
            flex: 1;
        }

        .nav-title {
            font-size: 1rem;
            font-family: var(--fuente-secundaria);
            margin-bottom: 0.2rem;
            font-weight: 600;
        }

        .nav-desc {
            font-size: .9rem;
            opacity: 0.7;
            font-family: var(--fuente-secundaria);
        }

        @media (max-width: 767px) {
            .menu-trigger {
                font-size: 1.5rem;
            }

            .menu-tooltip {
                right: 75px;
                font-size: 1.2rem;
                padding: 6px 10px;
            }

            .slide-menu {
                transform: translateY(100%);
                left: 0;
                right: 0;
                width: 100%;
                border-radius: 0;
            }

            .slide-menu.active {
                transform: translateY(0);
            }
        }

        @media (min-width: 768px) {
            .slide-menu {
                left: 50%;
                transform: translateX(-50%) translateY(100%);
                width: 90%;
                max-width: 600px;
                border-radius: 25px;
                margin-bottom: 20px;
            }

            .slide-menu.active {
                transform: translateX(-50%) translateY(0);
            }

            .nav-list {
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }

            .menu-trigger {
                font-size: 1.5rem;
            }

            .menu-tooltip {
                right: 90px;
                font-size: 1.2rem;
            }
        }

        @media (min-width: 1024px) {
            .nav-list {
                grid-template-columns: repeat(3, 1fr);
            }
        }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const html = `
    <div class="menu-overlay" id="menuOverlay"></div>

    <div class="slide-menu" id="slideMenu">
        <div class="menu-content">
            <div class="menu-header">
                <div class="menu-title">
                    <h1>Navegación</h1>
                </div>
                <div class="menu-subtitle">
                    <h2>Accede a todas las secciones del sitio</h2>
                </div>
            </div>

            <ul class="nav-list">
                <li class="nav-item cremapets">
                    <a href="cremapets.html" class="nav-link">
                        <div class="nav-icon">
                            <i class="bi bi-heart"></i>
                        </div>
                        <div class="nav-text">
                            <div class="nav-title">Cremapets</div>
                            <div class="nav-desc">Servicios de cremación para mascotas</div>
                        </div>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="calendario.html" class="nav-link">
                        <div class="nav-icon">
                            <i class="bi bi-calendar3"></i>
                        </div>
                        <div class="nav-text">
                            <div class="nav-title">Calendario promocional</div>
                            <div class="nav-desc">Ofertas y promociones</div>
                        </div>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="cementerio.html" class="nav-link">
                        <div class="nav-icon">
                            <i class="bi bi-tree"></i>
                        </div>
                        <div class="nav-text">
                            <div class="nav-title">Cementerio Bravo</div>
                            <div class="nav-desc">Cementerio privado y ecológico</div>
                        </div>
                    </a>
                </li>

                <li class="nav-item instagram">
                    <a href="https://www.instagram.com/funerales_bravo/" class="nav-link" target="_blank">
                        <div class="nav-icon">
                            <i class="bi bi-instagram"></i>
                        </div>
                        <div class="nav-text">
                            <div class="nav-title">Instagram</div>
                            <div class="nav-desc">Síguenos en Instagram</div>
                        </div>
                    </a>
                </li>

                <li class="nav-item facebook">
                    <a href="https://www.facebook.com/FuneralesBravoTapachula/" class="nav-link" target="_blank">
                        <div class="nav-icon">
                            <i class="bi bi-facebook"></i>
                        </div>
                        <div class="nav-text">
                            <div class="nav-title">Facebook</div>
                            <div class="nav-desc">Síguenos en Facebook</div>
                        </div>
                    </a>
                </li>

                <a href="https://wa.me/529622361377" class="whatsapp-float" target="_blank"
                    aria-label="Chatea con nosotros por WhatsApp">
                    <i class="bi bi-whatsapp" aria-hidden="true"></i>
                </a>

                <li class="nav-item inicio">
                    <a href="index.html" class="nav-link">
                        <div class="nav-icon">
                            <i class="bi bi-house-door-fill"></i>
                        </div>
                        <div class="nav-text">
                            <div class="nav-title">Inicio</div>
                            <div class="nav-desc">Volver a la página inicio</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <button class="menu-trigger" id="menuTrigger">
        ☰
        <div class="menu-tooltip">Accede a más funciones</div>
    </button>
    `;

    document.body.insertAdjacentHTML('afterbegin', html);

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
}