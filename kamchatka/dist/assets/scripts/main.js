function header() {
    const header = document.querySelector('[data-header="main"]')

    if (!header) return

    const menu = header.querySelector('[data-header="menu"]')
    const btnMenu = header.querySelector('[data-header="btn-menu"]')

    window.addEventListener('scroll', (event) => {
        const scrolled = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

        if (scrolled >= 100) {
            header.classList.add('header--fixed')
        } else {
            header.classList.remove('header--fixed')
        }
    })

    if (window.matchMedia("(max-width: 992px)").matches) {
        btnMenu.addEventListener('click', () => {
            btnMenu.classList.toggle('active')
            menu.classList.toggle('active')
        })
    }
}

function presentation() {
    const main = document.querySelector('[data-presentation="main"]')

    if (!main) return

    const blockParallax = main.querySelector('[data-presentation="block-parallax"]')

    const parallaxInstance = new Parallax(blockParallax, {
        hoverOnly: true
    })
}

header()
presentation()
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgIGNvbnN0IG1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWVudVwiXScpXG4gICAgY29uc3QgYnRuTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJidG4tbWVudVwiXScpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0ID8gd2luZG93LnBhZ2VZT2Zmc2V0IDogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cbiAgICAgICAgaWYgKHNjcm9sbGVkID49IDEwMCkge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDk5MnB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIGJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBidG5NZW51LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcmVzZW50YXRpb24oKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByZXNlbnRhdGlvbj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWluKSByZXR1cm5cblxuICAgIGNvbnN0IGJsb2NrUGFyYWxsYXggPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByZXNlbnRhdGlvbj1cImJsb2NrLXBhcmFsbGF4XCJdJylcblxuICAgIGNvbnN0IHBhcmFsbGF4SW5zdGFuY2UgPSBuZXcgUGFyYWxsYXgoYmxvY2tQYXJhbGxheCwge1xuICAgICAgICBob3Zlck9ubHk6IHRydWVcbiAgICB9KVxufVxuXG5oZWFkZXIoKVxucHJlc2VudGF0aW9uKCkiXSwiZmlsZSI6Im1haW4uanMifQ==