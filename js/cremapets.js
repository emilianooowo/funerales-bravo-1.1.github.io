
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
    const header = document.getElementById('dynamicHeader');
    const logoImg = document.getElementById('logoImg');

    const logoClaro = 'assets/logos/logo-header-simple-black.webp';
    const logoOscuro = 'assets/logos/logo-header-simple-black.webp';

    let ticking = false;

    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 400) {
            header.classList.add('scrolled');
            logoImg.src = logoOscuro;
        } else {
            header.classList.remove('scrolled');
            logoImg.src = logoClaro;
        }

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
    updateHeader();
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');

    console.log('Menu PC Elements:', {
        menuToggle: menuToggle,
        menuDropdown: menuDropdown,
        closeMenu: closeMenu
    });

    function openMenuPC() {
        console.log('Abriendo menú PC');
        if (menuToggle) menuToggle.classList.add('active');
        if (menuDropdown) menuDropdown.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenuPC() {
        console.log('Cerrando menú PC');
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuDropdown) menuDropdown.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
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

        if (closeMenu) {
            closeMenu.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeMenuPC();
            });
        }

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

        if (menuOverlay) {
            menuOverlay.addEventListener('click', closeMenuPC);
        }

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) &&
                !menuDropdown.contains(e.target) &&
                menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

    } else {
        console.error('Elementos del menú PC no encontrados:', {
            menuToggle: !!menuToggle,
            menuDropdown: !!menuDropdown
        });
    }
});