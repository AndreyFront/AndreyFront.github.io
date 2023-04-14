window.onload = () => {
    function fixedHeader() {
        const header = document.querySelector('[data-header="main"]')

        if (!header) return

        if (window.matchMedia("(min-width: 992px)").matches) {
            window.addEventListener('scroll', (event) => {
                const scrolled = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

                if (scrolled >= 20) {
                    header.classList.add('scroll-active')
                } else {
                    header.classList.remove('scroll-active')
                }
            })
        }
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

    function navigation() {
        const header = document.querySelector('[data-header="main"]')

        if (!header) return

        window.addEventListener('scroll', () => {
            const scrollDistance = window.scrollY
            const blockNav = header.querySelector('[data-header="nav"]')
            const navListItem = blockNav.querySelectorAll('li')
            const navLink = blockNav.querySelectorAll('a')

            const removeActive = () => {
                navLink.forEach((el) => {
                    if (el.classList.contains('active')) {
                        el.classList.remove('active')
                    }
                })
            }

            let replacementBlockNav


            if (window.matchMedia("(max-width: 992px)").matches) {
                replacementBlockNav = header
            } else {
                replacementBlockNav = blockNav
            }

            document.querySelectorAll('section[data-smooth-scrolling]').forEach((el, index) => {
                if (el.offsetTop - replacementBlockNav.clientHeight <= scrollDistance) {
                    removeActive()
                    // let localIndex = index
                    const dataValue = el.getAttribute('data-smooth-scrolling')
                    navListItem.forEach(elNavListItem => {
                        const anchor = elNavListItem.querySelector('[data-smooth-scrolling*="#"]')
                        const blockID = anchor.getAttribute('data-smooth-scrolling').substr(1)
                        if (blockID === dataValue) {
                            elNavListItem.querySelector('a').classList.add('active')
                        }
                    })
                }

                if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                    removeActive()
                    const dataValue = el.getAttribute('data-smooth-scrolling')
                    navListItem.forEach(elNavListItem => {
                        const anchor = elNavListItem.querySelector('[data-smooth-scrolling*="#"]')
                        const blockID = anchor.getAttribute('data-smooth-scrolling').substr(1)
                        if (blockID === dataValue) {
                            elNavListItem.querySelector('a').classList.add('active')
                        }
                    })
                }
            })
        })
    }

    function menu() {
        const header = document.querySelector('[data-header="main"]')

        if (!header) return

        if (window.matchMedia("(max-width: 992px)").matches) {
            const btnMenu = header.querySelector('[data-header="btn-menu"]')

            btnMenu.addEventListener('click', () => {
                header.classList.toggle('active-menu')
            })

            document.addEventListener('click', (event) => {
                const el = event.target

                if (el.closest('[data-header="nav"]')) {
                    if (el.closest('a[data-smooth-scrolling]')) {
                        header.classList.remove('active-menu')
                    }
                }
            })
        }
    }

    function reviews() {
        const main = document.querySelector('[data-reviews="main"]')

        if (!main) return

        const slider = main.querySelector('[data-reviews="slider"]')
        const btnNext = slider.querySelector('[data-reviews="btn-next"]')
        const btnPrev = slider.querySelector('[data-reviews="btn-prev"]')

        const swiper = new Swiper(slider, {
            centeredSlides: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            effect: "fade",
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
        })
    }

    function input() {
        const inputs = document.querySelectorAll('[data-input="block-input"]')

        if (!inputs.length) return

        const removeClass = () => {
            inputs.forEach(elInput => {
                const input = elInput.querySelector('[data-input="input"]')
                const btnClearing = elInput.querySelector('[data-input="btn-clearing"]')
                elInput.classList.remove('input--viewed')
                if (!input.value) {
                    elInput.classList.remove('input--focus')
                    btnClearing.classList.remove('active')
                } else {
                    elInput.classList.add('input--focus')
                    btnClearing.classList.add('active')
                }
            })
        }

        const logic = (event) => {
            if (event.target.closest('[data-input="block-input"]')) {
                const blockInput = event.target.closest('[data-input="block-input"]')
                const input = blockInput.querySelector('[data-input="input"]')
                const btnClearing = blockInput.querySelector('[data-input="btn-clearing"]')

                removeClass()

                blockInput.classList.add('input--focus')
                blockInput.classList.add('input--viewed')

                input.addEventListener('input', (event) => {
                    const value = event.target.value

                    if (value) {
                        btnClearing.classList.add('active')
                    } else {
                        btnClearing.classList.remove('active')
                    }
                })

                if (btnClearing.classList.contains('active')) {
                    btnClearing.addEventListener('click', () => {
                        input.value = ''
                        btnClearing.classList.remove('active')
                        removeClass()
                    })
                }
            } else {
                removeClass()
            }
        }

        inputs.forEach(elInput => {
            const input = elInput.querySelector('[data-input="input"]')
            if (input.value) {
                const btnClearing = elInput.querySelector('[data-input="btn-clearing"]')

                elInput.classList.add('input--focus')
                btnClearing.classList.add('active')
            }
        })

        document.addEventListener('focusin', (event) => logic(event))

        document.addEventListener('pointerup', (event) => logic(event))
    }

    function textarea() {
        const textareas = document.querySelectorAll('[data-textarea="block-textarea"]')

        if (!textareas.length) return

        const removeClass = () => {
            textareas.forEach(elTextarea => {
                const textarea = elTextarea.querySelector('[data-textarea="textarea"]')
                elTextarea.classList.remove('textarea--viewed')
                if (!textarea.value) {
                    elTextarea.classList.remove('textarea--focus')
                }
            })
        }

        document.addEventListener('click', (event) => {
            if (event.target.closest('[data-textarea="block-textarea"]')) {
                const blockTextarea = event.target.closest('[data-textarea="block-textarea"]')

                removeClass()

                blockTextarea.classList.add('textarea--focus')
                blockTextarea.classList.add('textarea--viewed')
            } else {
                removeClass()
            }
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

    page()
    fixedHeader()
    menu()
    navigation()
    smoothScrolling()
    reviews()
    input()
    textarea()
    scrollParallax()
}