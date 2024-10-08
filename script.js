document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    const submenus = document.querySelectorAll('.submenu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    function handleSubmenuToggle(e) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        if (window.innerWidth <= 768) {
            submenu.classList.toggle('active');
        }
    }

    document.querySelectorAll('[data-toggle="submenu"]').forEach(function(element) {
        element.addEventListener('click', handleSubmenuToggle);
    });

    document.addEventListener('click', function(e) {
        if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
            menu.classList.remove('active');
            submenus.forEach(function(submenu) {
                submenu.classList.remove('active');
            });
        }
    });

    function handleDesktopHover() {
        const isDesktop = window.innerWidth > 768;
        
        document.querySelectorAll('.menu > li').forEach(function(item) {
            const submenu = item.querySelector('.submenu');
            if (!submenu) return;

            if (isDesktop) {
                item.addEventListener('mouseenter', function() {
                    submenu.classList.add('active');
                });
                item.addEventListener('mouseleave', function() {
                    submenu.classList.remove('active');
                });
                item.removeEventListener('click', handleSubmenuToggle);
            } else {
                item.removeEventListener('mouseenter', null);
                item.removeEventListener('mouseleave', null);
                item.querySelector('[data-toggle="submenu"]').addEventListener('click', handleSubmenuToggle);
            }
        });

        document.querySelectorAll('.submenu > li').forEach(function(item) {
            const nestedSubmenu = item.querySelector('.submenu');
            if (!nestedSubmenu) return;

            if (isDesktop) {
                item.addEventListener('mouseenter', function() {
                    nestedSubmenu.classList.add('active');
                });
                item.addEventListener('mouseleave', function() {
                    nestedSubmenu.classList.remove('active');
                });
                item.removeEventListener('click', handleSubmenuToggle);
            } else {
                item.removeEventListener('mouseenter', null);
                item.removeEventListener('mouseleave', null);
                item.querySelector('[data-toggle="submenu"]').addEventListener('click', handleSubmenuToggle);
            }
        });
    }

    handleDesktopHover();

    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleDesktopHover, 250);
    });
});