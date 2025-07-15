document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const menuDropdown = document.getElementById('menuDropdown');

    function openMenuPC() {
        if (menuToggle) menuToggle.classList.add('active');
        if (menuDropdown) menuDropdown.classList.add('active');
    }

    function closeMenuPC() {
        if (menuToggle) menuToggle.classList.remove('active');
        if (menuDropdown) menuDropdown.classList.remove('active');
    }

    function toggleMenuPC(e) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = menuToggle && menuToggle.classList.contains('active');
        isActive ? closeMenuPC() : openMenuPC();
    }

    if (menuToggle && menuDropdown) {
        menuToggle.addEventListener('click', toggleMenuPC);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuToggle.classList.contains('active')) {
                closeMenuPC();
            }
        });

        document.querySelectorAll('.menu-pc-link').forEach(link => {
            link.addEventListener('click', closeMenuPC);
        });

        menuDropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenuPC);
        });

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
});