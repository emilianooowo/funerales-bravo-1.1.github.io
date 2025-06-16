class HeaderComponent {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.isMenuOpen = false;
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'inicio';
        return page;
    }

    getMenuItems() {
        const items = [
            { name: 'Inicio', href: 'index.html', page: 'inicio' },
            { name: 'Cementerio', href: 'index.html#cementerio', page: 'cementerio' },
            { name: 'CremaPets', href: 'index.html#cremapets', page: 'cremapets' },
            { name: 'Calendario', href: 'calendario.html', page: 'calendario' },
            { name: 'Cotizador', href: 'cotizador.html', page: 'cotizador' },
            { name: 'Catálogo', href: 'index.html#servicios', page: 'catalogo' },
            { name: 'Contacto', href: 'index.html#contacto', page: 'contacto' }
        ];

        return items.map(item => ({
            ...item,
            isActive: item.page === this.currentPage ||
                (this.currentPage === 'catalogo' && item.page === 'inicio') ||
                (this.currentPage === 'contacto' && item.page === 'inicio')
        }));
    }

    generateCSS() {
        return `
            <style>
            .glassmorphism-header {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 1000;
                width: 95%;
                max-width: 1080px;
                padding: 15px 30px;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 20px;
                transition: all 0.3s ease;
                text-align: center;
            }

            .header-content {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 30px;
            }

            .nav-menu {
                display: flex;
                list-style: none;
                margin: 0;
                padding: 0;
                gap: 30px;
                align-items: center;
                justify-content: center;
            }

            .nav-item {
                position: relative;
            }

            .nav-link {
                font-family: var(--fuente-secundaria);
                color: white;
                font-size: 1rem;
                font-weight: 500;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 25px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .nav-link::before {
                display: none;
            }

            .nav-link:hover {
                color: black;
                background: #e0e0e0;
                transform: translateY(-2px);
            }

            .nav-link.active {
                background: white;
                color: black;
            }

            .nav-link.active:hover {
                background: #333;
                color: white;
            }

            .hamburger {
                display: none;
                flex-direction: column;
                cursor: pointer;
                padding: 10px;
                gap: 4px;
                background: transparent;
                border-radius: 10px;
                transition: all 0.3s ease;
                border: none;
            }

            .hamburger:hover {
                background: #f0f0f0;
            }

            .hamburger-line {
                width: 25px;
                height: 3px;
                background: black;
                border-radius: 2px;
                transition: all 0.3s ease;
            }

            .hamburger.active .hamburger-line:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }

            .hamburger.active .hamburger-line:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active .hamburger-line:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }

            @media (max-width: 768px) {
                .glassmorphism-header {
                    top: 30px;
                    left: 20px;
                    right: auto;
                    transform: none;
                    width: 60px;
                    height: 60px;
                    padding: 0;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.5);
                }

                .header-content {
                    gap: 0;
                    width: 100%;
                    height: 100%;
                }

                .hamburger {
                    display: flex;
                    background: transparent;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    align-items: center;
                    justify-content: center;
                }

                .hamburger:hover {
                    background: transparent;
                }

                .hamburger-line {
                    background: white;
                    width: 20px;
                    height: 2px;
                }

                .hamburger.active .hamburger-line {
                    background: white;
                }

                .nav-menu {
                    position: fixed;
                    top: 100px;
                    left: 30px;
                    width: 200px;
                    flex-direction: column;
                    gap: 30px;
                    background: rgba(0, 0, 0, 0.8);
                    border-radius: 15px;
                    padding: 20px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: all 0.3s ease;
                }

                .nav-menu.active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .nav-link {
                    width: 100%;
                    padding: 15px 25px;
                    color: white;
                    font-size: 1.1rem;
                    font-weight: 600;
                    text-align: center;
                    border-radius: 15px;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }

                .nav-link.active {
                    background: white;
                    color: black;
                }
            }

            @media (max-width: 480px) {
                .glassmorphism-header {
                    top: 20px;
                    right: 20px;
                    width: 55px;
                    height: 55px;
                }

                .hamburger-line {
                    width: 18px;
                }

                .nav-menu {
                    right: 20px;
                    width: 180px;
                    padding: 15px;
                }

                .nav-link {
                    font-size: 1rem;
                    padding: 12px 15px;
                }
            }
            </style>
        `;
    }

    generateHTML() {
        const menuItems = this.getMenuItems();

        return `
            <header class="glassmorphism-header">
                <div class="header-content">                    
                    <nav>
                        <ul class="nav-menu" id="navMenu">
                            ${menuItems.map(item => `
                                <li class="nav-item">
                                    <a href="${item.href}" class="nav-link ${item.isActive ? 'active' : ''}">
                                        ${item.name}
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </nav>
                    
                    <div class="hamburger" id="hamburger">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </div>
                </div>
            </header>
            
            <div class="mobile-overlay" id="mobileOverlay"></div>
        `;
    }

    addEventListeners() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });

        mobileOverlay.addEventListener('click', () => {
            this.closeMenu();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMenu();
                }
            });
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');

        if (this.isMenuOpen) {
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            mobileOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            this.closeMenu();
        }
    }

    closeMenu() {
        this.isMenuOpen = false;
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');

        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    init() {
        document.head.insertAdjacentHTML('beforeend', this.generateCSS());

        document.body.insertAdjacentHTML('afterbegin', this.generateHTML());

        this.addEventListeners();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new HeaderComponent();
});

window.HeaderComponent = HeaderComponent;