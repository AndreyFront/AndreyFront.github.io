function smoothView(btn, el, startHeight = 0) {

    if (!btn && !el) return

    const add = () => {
        btn.classList.add('not-active')
        el.classList.add('not-active')
    }

    const remove = () => {
        btn.classList.remove('not-active')
        el.classList.remove('not-active')
    }

    let heightEl = el.offsetHeight
    add()
    el.style.height = `${startHeight}px`

    if (startHeight > 0) {
        if (heightEl < startHeight) {
            remove()
            el.style.height = `${heightEl}px`
        }
    }

    const update = () => {
        el.style.height = 'auto'
        setTimeout(() => {
            heightEl = el.offsetHeight
            el.style.height = `${heightEl}px`
        }, 100)
    }

    btn.addEventListener('click', () => {
        if (el.classList.contains('not-active')) {
            remove()
            el.style.height = `${heightEl}px`
        } else {
            add()
            el.style.height = `${startHeight}px`
        }
    })

    let observer = new MutationObserver(mutationRecords => {
        update()
    })

    observer.observe(el, {
        childList: true,
        subtree: true,
        characterDataOldValue: true
    })
}

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
        })
    })
}

function reviews() {
    const mains = document.querySelectorAll('[data-reviews="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-reviews="slider"]')
        const btnPrev = main.querySelector('[data-reviews="btn-prev"]')
        const btnNext = main.querySelector('[data-reviews="btn-next"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 20,
            autoHeight: true,
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
            breakpoints: {
                992: {
                  slidesPerView: 2,
                },
            }
        })
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

function faq() {
    const mains = document.querySelectorAll('[data-faq="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const blocks = main.querySelectorAll('[data-faq="block"]')

        blocks.forEach(block => {
            const head = block.querySelector('[data-faq="head"]')
            const body = block.querySelector('[data-faq="body"]')

            smoothView(head, body)
        })
    })
}

function smoothScrolling() {
    const anchors = document.querySelectorAll('[data-smooth-scrolling*="#"]')

    if (!anchors.length) return

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-smooth-scrolling*="#"]')) {
            event.preventDefault()
            const anchor = el.closest('[data-smooth-scrolling*="#"]')
            
            const blockID = anchor.getAttribute('data-smooth-scrolling').substr(1)
            
            document.querySelector(`[data-smooth-scrolling="${blockID}"]`).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    })
}

function phoneMask() {
    const phoneMasks = document.querySelectorAll('[data-phone-mask]')

    if (!phoneMasks.length) return

    phoneMasks.forEach(phoneMask => {
        IMask(phoneMask, {
            mask: '+{7}(000)000-00-00'
        }
        )
    })
}

function sorting() {
    const mains = document.querySelectorAll('[data-sorting="main"]')

    if (!mains.length) return

    document.addEventListener('click', (event) => {
        const el = event.target
        if (el.closest('[data-sorting="main"]')) {
            const sorting = el.closest('[data-sorting="main"]')

            mains.forEach(main => {
                if (main != sorting) {
                    main.classList.remove('active')
                }
            })

            if (el.closest('[data-sorting="block-head"]')) {
                sorting.classList.toggle('active')
            }

            if (el.closest('.radio')) {
                sorting.classList.remove('active')
            }

        } else {
            mains.forEach(main => main.classList.remove('active'))
        }
    })
}

header()
presentation()
modalPicture()
program()
reviews()
scrollParallax()
faq()
phoneMask()
smoothScrolling()
sorting()
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XG5cbiAgICBpZiAoIWJ0biAmJiAhZWwpIHJldHVyblxuXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJylcbiAgICB9XG5cbiAgICBsZXQgaGVpZ2h0RWwgPSBlbC5vZmZzZXRIZWlnaHRcbiAgICBhZGQoKVxuICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxuXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xuICAgICAgICBpZiAoaGVpZ2h0RWwgPCBzdGFydEhlaWdodCkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgIHVwZGF0ZSgpXG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZWwsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBoZWFkZXIoKSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWFpblwiXScpXG5cbiAgICBpZiAoIWhlYWRlcikgcmV0dXJuXG5cbiAgICBjb25zdCBtZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIm1lbnVcIl0nKVxuICAgIGNvbnN0IGJ0bk1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiYnRuLW1lbnVcIl0nKVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuXG4gICAgICAgIGlmIChzY3JvbGxlZCA+PSAxMDApIHtcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdoZWFkZXItLWZpeGVkJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXItLWZpeGVkJylcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xuICAgICAgICBidG5NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgYnRuTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgICAgICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcHJlc2VudGF0aW9uKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmVzZW50YXRpb249XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbikgcmV0dXJuXG5cbiAgICBjb25zdCBibG9ja1BhcmFsbGF4ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmVzZW50YXRpb249XCJibG9jay1wYXJhbGxheFwiXScpXG5cbiAgICBjb25zdCBwYXJhbGxheEluc3RhbmNlID0gbmV3IFBhcmFsbGF4KGJsb2NrUGFyYWxsYXgsIHtcbiAgICAgICAgaG92ZXJPbmx5OiB0cnVlXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gbW9kYWxQaWN0dXJlKCkge1xuXG4gICAgY29uc3QgYmxvY2tQaWN0dXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLXBpY3R1cmU9XCJtYWluXCJdJylcblxuICAgIGlmICghYmxvY2tQaWN0dXJlcy5sZW5ndGgpIHJldHVyblxuXG4gICAgbGV0IGJwID0gQmlnZ2VyUGljdHVyZSh7XG4gICAgICAgIHRhcmdldDogZG9jdW1lbnQuYm9keSxcbiAgICB9KVxuXG4gICAgY29uc3Qgb3BlbkdhbGxlcnkgPSAoZXZlbnQsIHBpY3R1cmVzKSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgYnAub3Blbih7XG4gICAgICAgICAgICBpdGVtczogcGljdHVyZXMsXG4gICAgICAgICAgICBlbDogZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBibG9ja1BpY3R1cmVzLmZvckVhY2goYmxvY2tQaWN0dXJlID0+IHtcbiAgICAgICAgY29uc3QgcGljdHVyZXMgPSBibG9ja1BpY3R1cmUucXVlcnlTZWxlY3RvckFsbCgnYVtkYXRhLW1vZGFsLXBpY3R1cmU9XCJsaW5rXCJdJylcblxuICAgICAgICBpZiAocGljdHVyZXMubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgIHBpY3R1cmVzLmZvckVhY2gocGljdHVyZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpXG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2VTb3VyY2UgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ3NyYycpXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKClcblxuICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy53aWR0aFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoaWdodCA9IHRoaXMuaGVpZ2h0XG5cbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JywgaGlnaHQgKiA0KVxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlLnNldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcsIHdpZHRoICogNClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gaW1hZ2VTb3VyY2U7XG5cbiAgICAgICAgICAgICAgICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbkdhbGxlcnkoZXZlbnQsIHBpY3R1cmVzKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcHJvZ3JhbSgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXByb2dyYW09XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZ3JhbT1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2dyYW09XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2dyYW09XCJidG4tbmV4dFwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcmV2aWV3cygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJldmlld3M9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJidG4tbmV4dFwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDIwLFxuICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzY3JvbGxQYXJhbGxheCgpIHtcbiAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNjcm9sbC1wYXJhbGxheF0nKVxuXG4gICAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVyblxuXG4gICAgbmV3IHNpbXBsZVBhcmFsbGF4KGl0ZW1zLCB7XG4gICAgICAgIGRlbGF5OiAuMyxcbiAgICAgICAgc2NhbGU6IDEuMixcbiAgICAgICAgdHJhbnNpdGlvbjogJ2N1YmljLWJlemllcigwLDAsMCwxKSdcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBmYXEoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mYXE9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IGJsb2NrcyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmFxPVwiYmxvY2tcIl0nKVxuXG4gICAgICAgIGJsb2Nrcy5mb3JFYWNoKGJsb2NrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBibG9jay5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJoZWFkXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBibG9jay5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJib2R5XCJdJylcblxuICAgICAgICAgICAgc21vb3RoVmlldyhoZWFkLCBib2R5KVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNtb290aFNjcm9sbGluZygpIHtcbiAgICBjb25zdCBhbmNob3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc21vb3RoLXNjcm9sbGluZyo9XCIjXCJdJylcblxuICAgIGlmICghYW5jaG9ycy5sZW5ndGgpIHJldHVyblxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtc21vb3RoLXNjcm9sbGluZyo9XCIjXCJdJykpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXNtb290aC1zY3JvbGxpbmcqPVwiI1wiXScpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGJsb2NrSUQgPSBhbmNob3IuZ2V0QXR0cmlidXRlKCdkYXRhLXNtb290aC1zY3JvbGxpbmcnKS5zdWJzdHIoMSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc21vb3RoLXNjcm9sbGluZz1cIiR7YmxvY2tJRH1cIl1gKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcGhvbmVNYXNrKCkge1xuICAgIGNvbnN0IHBob25lTWFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1waG9uZS1tYXNrXScpXG5cbiAgICBpZiAoIXBob25lTWFza3MubGVuZ3RoKSByZXR1cm5cblxuICAgIHBob25lTWFza3MuZm9yRWFjaChwaG9uZU1hc2sgPT4ge1xuICAgICAgICBJTWFzayhwaG9uZU1hc2ssIHtcbiAgICAgICAgICAgIG1hc2s6ICcrezd9KDAwMCkwMDAtMDAtMDAnXG4gICAgICAgIH1cbiAgICAgICAgKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNvcnRpbmcoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zb3J0aW5nPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtc29ydGluZz1cIm1haW5cIl0nKSkge1xuICAgICAgICAgICAgY29uc3Qgc29ydGluZyA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXNvcnRpbmc9XCJtYWluXCJdJylcblxuICAgICAgICAgICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobWFpbiAhPSBzb3J0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtc29ydGluZz1cImJsb2NrLWhlYWRcIl0nKSkge1xuICAgICAgICAgICAgICAgIHNvcnRpbmcuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJy5yYWRpbycpKSB7XG4gICAgICAgICAgICAgICAgc29ydGluZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4gbWFpbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmhlYWRlcigpXG5wcmVzZW50YXRpb24oKVxubW9kYWxQaWN0dXJlKClcbnByb2dyYW0oKVxucmV2aWV3cygpXG5zY3JvbGxQYXJhbGxheCgpXG5mYXEoKVxucGhvbmVNYXNrKClcbnNtb290aFNjcm9sbGluZygpXG5zb3J0aW5nKCkiXSwiZmlsZSI6Im1haW4uanMifQ==