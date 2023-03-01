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

function modalPicture() {

    const blockPictures = document.querySelectorAll('[data-modal-picture="main"]')

    if (!blockPictures.length) return

    let bp = BiggerPicture({
        target: document.body,
    })

    const openGallery = (event, pictures) => {
        event.preventDefault()
        bp.open({
            items: pictures,
            el: event.currentTarget,
        })
    }

    blockPictures.forEach(blockPicture => {
        const pictures = blockPicture.querySelectorAll('a[data-modal-picture="link"]')

        if (pictures.length) {

            pictures.forEach(picture => {
                const image = picture.querySelector('img')
                const imageSource = image.getAttribute('src')
                const img = new Image()

                img.onload = function () {
                    const width = this.width
                    const hight = this.height

                    picture.setAttribute('data-height', hight * 4)
                    picture.setAttribute('data-width', width * 4)
                }

                img.src = imageSource;

                picture.addEventListener("click", (event) => {
                    openGallery(event, pictures)
                })
            })
        }
    })
}

function program() {
    const mains = document.querySelectorAll('[data-program="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-program="slider"]')
        const btnPrev = main.querySelector('[data-program="btn-prev"]')
        const btnNext = main.querySelector('[data-program="btn-next"]')

        const swiper = new Swiper(slider, {
            spaceBetween: 20,
            autoHeight: true,
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
        });
    })
}

function scrollParallax() {
    const items = document.querySelectorAll('[data-scroll-parallax]')

    if (!items.length) return

    new simpleParallax(items, {
        delay: .3,
        scale: 1.2,
        transition: 'cubic-bezier(0,0,0,1)'
    })
}

header()
presentation()
modalPicture()
program()
scrollParallax()
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgIGNvbnN0IG1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWVudVwiXScpXG4gICAgY29uc3QgYnRuTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJidG4tbWVudVwiXScpXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0ID8gd2luZG93LnBhZ2VZT2Zmc2V0IDogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cbiAgICAgICAgaWYgKHNjcm9sbGVkID49IDEwMCkge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDk5MnB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIGJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBidG5NZW51LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcmVzZW50YXRpb24oKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByZXNlbnRhdGlvbj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWluKSByZXR1cm5cblxuICAgIGNvbnN0IGJsb2NrUGFyYWxsYXggPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByZXNlbnRhdGlvbj1cImJsb2NrLXBhcmFsbGF4XCJdJylcblxuICAgIGNvbnN0IHBhcmFsbGF4SW5zdGFuY2UgPSBuZXcgUGFyYWxsYXgoYmxvY2tQYXJhbGxheCwge1xuICAgICAgICBob3Zlck9ubHk6IHRydWVcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBtb2RhbFBpY3R1cmUoKSB7XG5cbiAgICBjb25zdCBibG9ja1BpY3R1cmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWwtcGljdHVyZT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFibG9ja1BpY3R1cmVzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBsZXQgYnAgPSBCaWdnZXJQaWN0dXJlKHtcbiAgICAgICAgdGFyZ2V0OiBkb2N1bWVudC5ib2R5LFxuICAgIH0pXG5cbiAgICBjb25zdCBvcGVuR2FsbGVyeSA9IChldmVudCwgcGljdHVyZXMpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBicC5vcGVuKHtcbiAgICAgICAgICAgIGl0ZW1zOiBwaWN0dXJlcyxcbiAgICAgICAgICAgIGVsOiBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGJsb2NrUGljdHVyZXMuZm9yRWFjaChibG9ja1BpY3R1cmUgPT4ge1xuICAgICAgICBjb25zdCBwaWN0dXJlcyA9IGJsb2NrUGljdHVyZS5xdWVyeVNlbGVjdG9yQWxsKCdhW2RhdGEtbW9kYWwtcGljdHVyZT1cImxpbmtcIl0nKVxuXG4gICAgICAgIGlmIChwaWN0dXJlcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgcGljdHVyZXMuZm9yRWFjaChwaWN0dXJlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZSA9IHBpY3R1cmUucXVlcnlTZWxlY3RvcignaW1nJylcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZVNvdXJjZSA9IGltYWdlLmdldEF0dHJpYnV0ZSgnc3JjJylcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxuXG4gICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLndpZHRoXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpZ2h0ID0gdGhpcy5oZWlnaHRcblxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlLnNldEF0dHJpYnV0ZSgnZGF0YS1oZWlnaHQnLCBoaWdodCAqIDQpXG4gICAgICAgICAgICAgICAgICAgIHBpY3R1cmUuc2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJywgd2lkdGggKiA0KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBpbWFnZVNvdXJjZTtcblxuICAgICAgICAgICAgICAgIHBpY3R1cmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcGVuR2FsbGVyeShldmVudCwgcGljdHVyZXMpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBwcm9ncmFtKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJvZ3JhbT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9ncmFtPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZ3JhbT1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZ3JhbT1cImJ0bi1uZXh0XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyMCxcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2Nyb2xsUGFyYWxsYXgoKSB7XG4gICAgY29uc3QgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zY3JvbGwtcGFyYWxsYXhdJylcblxuICAgIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm5cblxuICAgIG5ldyBzaW1wbGVQYXJhbGxheChpdGVtcywge1xuICAgICAgICBkZWxheTogLjMsXG4gICAgICAgIHNjYWxlOiAxLjIsXG4gICAgICAgIHRyYW5zaXRpb246ICdjdWJpYy1iZXppZXIoMCwwLDAsMSknXG4gICAgfSlcbn1cblxuaGVhZGVyKClcbnByZXNlbnRhdGlvbigpXG5tb2RhbFBpY3R1cmUoKVxucHJvZ3JhbSgpXG5zY3JvbGxQYXJhbGxheCgpIl0sImZpbGUiOiJtYWluLmpzIn0=