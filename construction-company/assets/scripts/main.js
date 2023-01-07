function smoothView(btn, el, startHeight = 0) {

    if (!btn && !el) return
    
    let heightEl = el.offsetHeight

    const add = () => {
        btn.classList.add('not-active')
        el.classList.add('not-active')
    }

    const remove = () => {
        btn.classList.remove('not-active')
        el.classList.remove('not-active')
    }

    if (btn.classList.contains('active')) {
        remove()
        el.style.height = `${heightEl}px`
    } else {
        add()
        el.style.height = `${startHeight}px`
    }

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
    const header = document.querySelector('[data-header="header"]')

    if (!header) return

    const heightHeader = header.offsetHeight
    const page = document.querySelector('[data-page="page"]')

    if (page) page.style.marginTop = `${heightHeader}px`

    if (window.matchMedia("(max-width: 1200px)").matches) {
        const wrapperMobSearch = header.querySelector('[data-header="wrapper-mob-search"]')
        const wrapperMenu = header.querySelector('[data-header="wrapper-menu"]')
        const wrapperMenuContainer = wrapperMenu.querySelector('.main-container')
        const wrapperNav = header.querySelector('[data-header="wrapper-nav"]')
        const wrapperNavContainer = wrapperNav.querySelector('.main-container')
        const nav = header.querySelector('[data-header="nav"]')
        const blockInfo = header.querySelector('[data-header="block-info"]')
        const socialNetwork = header.querySelector('[data-header="social-network"]')
        const search = header.querySelector('[data-header="search"]')
        const logo = header.querySelector('[data-header="logo"]')

        const clonedNav = nav.cloneNode(true)
        const clonedBlockInfo = blockInfo.cloneNode(true)
        const clonedSocialNetwork = socialNetwork.cloneNode(true)
        const clonedSearch = search.cloneNode(true)
        const clonedLogo = logo.cloneNode(true)

        wrapperMenuContainer.append(clonedNav)
        wrapperMenuContainer.append(clonedBlockInfo)
        wrapperMenuContainer.append(clonedSocialNetwork)
        wrapperMobSearch.append(clonedSearch)
        wrapperNavContainer.prepend(clonedLogo)

        nav.remove()
        blockInfo.remove()
        socialNetwork.remove()
        search.remove()
        logo.remove()

        setTimeout(() => {
            const clonedWrapperMenu = wrapperMenu.cloneNode(true)
            wrapperNav.append(clonedWrapperMenu)
            wrapperMenu.remove()
        })

        const btnSearch = header.querySelector('[data-header="btn-search"]')
        const btnMenu = header.querySelector('[data-header="btn-menu"]')

        btnSearch.addEventListener('click', () => {
            const wrapperMenu = header.querySelector('[data-header="wrapper-menu"]')
            wrapperMenu.classList.remove('active')

            wrapperMobSearch.classList.toggle('active')
        })
 
        btnMenu.addEventListener('click', () => {
            wrapperMobSearch.classList.remove('active')

            const wrapperMenu = header.querySelector('[data-header="wrapper-menu"]')
            wrapperMenu.classList.toggle('active')

            const icon = btnMenu.querySelector('use')
            if (wrapperMenu.classList.contains('active')) {
                icon.setAttribute('xlink:href', './assets/icons/sprite-svg.svg#menu-close')
            } else {
                icon.setAttribute('xlink:href', './assets/icons/sprite-svg.svg#menu')
            }
        })
    }

    document.addEventListener('click', (event) => {
        event.stopPropagation()
        const el = event.target
        
        if (window.matchMedia("(min-width: 1200px)").matches) {
            if (el.closest('.header__menu-block-body--last')) {
                if (el.closest('[data-header="head"]')) {
                    const head = el.closest('[data-header="head"]')
                    if (head.nextElementSibling) {
                        if (head.nextElementSibling.hasAttribute('data-header')) {
                            const body = head.nextElementSibling
                            head.classList.toggle('active')
                            body.classList.toggle('active')
                        }
                    }
                }
            }
        } else {
            if (el.closest('[data-header="head"]')) {
                const head = el.closest('[data-header="head"]')
                if (head.nextElementSibling) {
                    if (head.nextElementSibling.hasAttribute('data-header')) {
                        const body = head.nextElementSibling
                        head.classList.toggle('active')
                        body.classList.toggle('active')
                    }
                }
            }
        }
    })
}

function infoBar() {
    const mains = document.querySelectorAll('[data-info-bar="main"]')

    if (!mains.length) return

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-info-bar="main"]') && el.closest('[data-info-bar="btn-close"]')) {
            const infoBar = el.closest('[data-info-bar="main"]')
            infoBar.classList.add('not-active')
        }
    })
}

function sliderCardsMob() {
    const sliders = document.querySelectorAll('[data-slider-cards-mob="main"]')

    if (!sliders.length) return

    if (window.matchMedia("(max-width: 576px)").matches) {
        sliders.forEach(itemSlider => {
            const slider = itemSlider.querySelector('[data-slider-cards-mob="slider"]')
            const pagination = itemSlider.querySelector('[data-slider-cards-mob="pagination"]')
            const btnNext = itemSlider.querySelector('[data-slider-cards-mob="btn-next"]')
            const btnPrev = itemSlider.querySelector('[data-slider-cards-mob="btn-prev"]')

            const swiper = new Swiper(slider, {
                spaceBetween: 10,
                pagination: {
                    el: pagination,
                    type: "progressbar",
                },
                navigation: {
                    nextEl: btnNext,
                    prevEl: btnPrev,
                },
            })
        })
    }
}

function sliderCards() {
    const sliders = document.querySelectorAll('[data-slider-cards="main"]')

    if (!sliders.length) return


    sliders.forEach(itemSlider => {
        const slider = itemSlider.querySelector('[data-slider-cards="slider"]')
        const pagination = itemSlider.querySelector('[data-slider-cards="pagination"]')
        const btnNext = itemSlider.querySelector('[data-slider-cards="btn-next"]')
        const btnPrev = itemSlider.querySelector('[data-slider-cards="btn-prev"]')
        const numberLines = slider.getAttribute('data-slider-cards-lines')

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 24,
            pagination: {
                el: pagination,
                type: "progressbar",
            },
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                992: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                    grid: {
                        rows: numberLines,
                    },
                }
            }
        })
    })
}

function tabs() {
    const mains = document.querySelectorAll('[data-tabs="main"]')

    if (!mains.length) return

    const remove = () => {
        mains.forEach(main => {
            const lis = main.querySelectorAll('[data-tabs="li"]')
            const tabs = main.querySelectorAll('[data-tabs="tab"]')
    
            lis.forEach((li, index) => {
                li.classList.remove('active')
                tabs[index].classList.remove('active')
            })
        })
    }

    mains.forEach(main => {
        const lis = main.querySelectorAll('[data-tabs="li"]')

        lis.forEach((li, index) => {
            li.setAttribute('data-tabs-index', index)
        })
    })

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-tabs="main"]')) {
            const main = el.closest('[data-tabs="main"]')

            if (el.closest('[data-tabs="li"]')) {
                const li = el.closest('[data-tabs="li"]')
                const index = li.getAttribute('data-tabs-index')
                const tabs = main.querySelectorAll('[data-tabs="tab"]')

                if (!li.classList.contains('active')) {
                    remove()
                    li.classList.add('active')
                    tabs[index].classList.add('active')
                }
            }
        }
    })
}

function faq() {
    const mains = document.querySelectorAll('[data-faq="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const cards = main.querySelectorAll('[data-faq="card"]')

        cards.forEach(card => {
            const head = card.querySelector('[data-faq="head"]')
            const body = card.querySelector('[data-faq="body"]')
            
            smoothView(head, body)
        })
    })
}

function sliderRange() {
    const sliders = document.querySelectorAll('[data-slider-range="main"]')

    if (!sliders.length) return
    
    sliders.forEach(itemSlider => {
        const slider = itemSlider.querySelector('[data-slider-range="slider"]')
        const start = +itemSlider.getAttribute('data-slider-range-start')
        const min = +itemSlider.getAttribute('data-slider-range-min')
        const max = +itemSlider.getAttribute('data-slider-range-max')

        noUiSlider.create(slider, {
            start: start,
            connect: 'lower',
            range: {
                'min': [min],
                'max': [max]
            }
        });
    })
}

function counter() {
    const parentBlocks = document.querySelectorAll(`[data-counter="counter"]`)
    if (!parentBlocks.length) return
    parentBlocks.forEach(elem => {
        const remove = elem.querySelector('[data-counter="remove"]')
        const add = elem.querySelector('[data-counter="add"]')
        const input = elem.querySelector('[data-counter="input"]')
    
        const max = +input.getAttribute('max')
        const min = +input.getAttribute('min')
    
        const validInput = (value) => {
            const inputValue = +value
            switch (true) {
                case inputValue <= min:
                    input.value = min
                    remove.setAttribute('disabled', '')
                break
                case inputValue >= max:
                    input.value = max
                    add.setAttribute('disabled', '')
                break
                default:
                    remove.removeAttribute('disabled')
                    add.removeAttribute('disabled')
            }
        }
    
        validInput(input.value)
    
        input.addEventListener('change', () => {
            console.log(input.value)
            validInput(input.value)
        })
    
        add.addEventListener('click', () => {
            input.value++
            validInput(input.value)
        })
    
        remove.addEventListener('click', () => {
            input.value--
            validInput(input.value)
        })
    })
}

function certificates() {
    const certificates = document.querySelectorAll('[data-certificates="main"]')

    if (!certificates.length) return

    certificates.forEach(certificate => {
        const slider = certificate.querySelector('[data-certificates="slider"]')
        const pagination = certificate.querySelector('[data-certificates="pagination"]')
        const btnNext = certificate.querySelector('[data-certificates="btn-next"]')
        const btnPrev = certificate.querySelector('[data-certificates="btn-prev"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 2.3,
            spaceBetween: 5,
            pagination: {
                el: pagination,
                type: "progressbar",
            },
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                992: {
                    slidesPerView: 3,
                    spaceBetween: 33,
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                576: {
                    slidesPerView: 2.5,
                    spaceBetween: 15,
                }
            }
        })
    })
}

function specialistCard() {
    const specialistCards = document.querySelectorAll('[data-specialist-card="main"]')

    if (!specialistCards.length) return

    specialistCards.forEach(specialistCard => {
        const sliderSpecialists = specialistCard.querySelector('[data-specialist-card="slider-specialists"]')
        const sliderInfoSpecialists = specialistCard.querySelector('[data-specialist-card="slider-info-specialists"]')
        const btnNext = specialistCard.querySelector('[data-specialist-card="btn-next"]')
        const btnPrev = specialistCard.querySelector('[data-specialist-card="btn-prev"]')

        const swiperSpecialists = new Swiper(sliderSpecialists, {
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
        })

        const swiperInfoSpecialists = new Swiper(sliderInfoSpecialists, {
            allowTouchMove: false,
            effect: "fade",
        })

        swiperInfoSpecialists.controller.control = swiperSpecialists
        swiperSpecialists.controller.control = swiperInfoSpecialists
    })
}

function feedback() {
    const mains = document.querySelectorAll('[data-feedback="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-feedback="slider"]')
        const btnNext = main.querySelector('[data-feedback="btn-next"]')
        const btnPrev = main.querySelector('[data-feedback="btn-prev"]')
        const pagination = main.querySelector('[data-feedback="pagination"]')

        const swiper = new Swiper(slider, {
            spaceBetween: 40,
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
            pagination: {
                el: pagination,
                type: "progressbar",
            },
        })
    })
}

function orderWork() {
    const mains = document.querySelectorAll('[data-order-work="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-order-work="slider"]')
        const heightSlider = slider.offsetHeight
        const slides = slider.querySelectorAll('[data-order-work="slider"] .swiper-slide')
        const btnNext = main.querySelector('[data-order-work="btn-next"]')
        const btnPrev = main.querySelector('[data-order-work="btn-prev"]')
        const pagination = main.querySelector('[data-order-work="pagination"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1.2,
            spaceBetween: 72,
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
            pagination: {
                el: pagination,
                type: "progressbar",
            },
            breakpoints: {
                1200: {
                    slidesPerView: 5,
                },
                992: {
                    slidesPerView: 4,
                },
                768: {
                    slidesPerView: 3,
                },
                576: {
                    slidesPerView: 2,
                },
            }
        })

        slides.forEach(slide => slide.style.height = `${heightSlider}px`)
    })
}

function contacts() {
    const mains = document.querySelectorAll('[data-contacts="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const blocksInfo = main.querySelectorAll('[data-contacts="block-info"]')

        blocksInfo.forEach(blockInfo => {
            const head = blockInfo.querySelector('[data-contacts="head"]')
            const body = blockInfo.querySelector('[data-contacts="body"]')

            smoothView(head, body)
        })
    })
}

header()
infoBar()
sliderCardsMob()
sliderCards()
tabs()
faq()
sliderRange()
counter()
certificates()
specialistCard()
feedback()
orderWork()
contacts()
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XG5cbiAgICBpZiAoIWJ0biAmJiAhZWwpIHJldHVyblxuICAgIFxuICAgIGxldCBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJylcbiAgICB9XG5cbiAgICBpZiAoYnRuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWRkKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xuICAgICAgICBpZiAoaGVpZ2h0RWwgPCBzdGFydEhlaWdodCkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgIHVwZGF0ZSgpXG4gICAgfSlcbiAgICAgICAgXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCwge1xuICAgICAgICBjaGlsZExpc3Q6IHRydWUsIFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICB9KVxufVxuXG5cbmZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJoZWFkZXJcIl0nKVxuXG4gICAgaWYgKCFoZWFkZXIpIHJldHVyblxuXG4gICAgY29uc3QgaGVpZ2h0SGVhZGVyID0gaGVhZGVyLm9mZnNldEhlaWdodFxuICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wYWdlPVwicGFnZVwiXScpXG5cbiAgICBpZiAocGFnZSkgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSBgJHtoZWlnaHRIZWFkZXJ9cHhgXG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlck1vYlNlYXJjaCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1vYi1zZWFyY2hcIl0nKVxuICAgICAgICBjb25zdCB3cmFwcGVyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1lbnVcIl0nKVxuICAgICAgICBjb25zdCB3cmFwcGVyTWVudUNvbnRhaW5lciA9IHdyYXBwZXJNZW51LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRhaW5lcicpXG4gICAgICAgIGNvbnN0IHdyYXBwZXJOYXYgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1uYXZcIl0nKVxuICAgICAgICBjb25zdCB3cmFwcGVyTmF2Q29udGFpbmVyID0gd3JhcHBlck5hdi5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250YWluZXInKVxuICAgICAgICBjb25zdCBuYXYgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibmF2XCJdJylcbiAgICAgICAgY29uc3QgYmxvY2tJbmZvID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImJsb2NrLWluZm9cIl0nKVxuICAgICAgICBjb25zdCBzb2NpYWxOZXR3b3JrID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cInNvY2lhbC1uZXR3b3JrXCJdJylcbiAgICAgICAgY29uc3Qgc2VhcmNoID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cInNlYXJjaFwiXScpXG4gICAgICAgIGNvbnN0IGxvZ28gPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibG9nb1wiXScpXG5cbiAgICAgICAgY29uc3QgY2xvbmVkTmF2ID0gbmF2LmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjb25zdCBjbG9uZWRCbG9ja0luZm8gPSBibG9ja0luZm8uY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIGNvbnN0IGNsb25lZFNvY2lhbE5ldHdvcmsgPSBzb2NpYWxOZXR3b3JrLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjb25zdCBjbG9uZWRTZWFyY2ggPSBzZWFyY2guY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIGNvbnN0IGNsb25lZExvZ28gPSBsb2dvLmNsb25lTm9kZSh0cnVlKVxuXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWROYXYpXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWRCbG9ja0luZm8pXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWRTb2NpYWxOZXR3b3JrKVxuICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmFwcGVuZChjbG9uZWRTZWFyY2gpXG4gICAgICAgIHdyYXBwZXJOYXZDb250YWluZXIucHJlcGVuZChjbG9uZWRMb2dvKVxuXG4gICAgICAgIG5hdi5yZW1vdmUoKVxuICAgICAgICBibG9ja0luZm8ucmVtb3ZlKClcbiAgICAgICAgc29jaWFsTmV0d29yay5yZW1vdmUoKVxuICAgICAgICBzZWFyY2gucmVtb3ZlKClcbiAgICAgICAgbG9nby5yZW1vdmUoKVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xvbmVkV3JhcHBlck1lbnUgPSB3cmFwcGVyTWVudS5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgICAgICAgIHdyYXBwZXJOYXYuYXBwZW5kKGNsb25lZFdyYXBwZXJNZW51KVxuICAgICAgICAgICAgd3JhcHBlck1lbnUucmVtb3ZlKClcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBidG5TZWFyY2ggPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiYnRuLXNlYXJjaFwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiYnRuLW1lbnVcIl0nKVxuXG4gICAgICAgIGJ0blNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJNZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbWVudVwiXScpXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgIH0pXG4gXG4gICAgICAgIGJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJNZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbWVudVwiXScpXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICBjb25zdCBpY29uID0gYnRuTWVudS5xdWVyeVNlbGVjdG9yKCd1c2UnKVxuICAgICAgICAgICAgaWYgKHdyYXBwZXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgneGxpbms6aHJlZicsICcuL2Fzc2V0cy9pY29ucy9zcHJpdGUtc3ZnLnN2ZyNtZW51LWNsb3NlJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnLCAnLi9hc3NldHMvaWNvbnMvc3ByaXRlLXN2Zy5zdmcjbWVudScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcbiAgICAgICAgXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJy5oZWFkZXJfX21lbnUtYmxvY2stYm9keS0tbGFzdCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwiaGVhZFwiXScpXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZGF0YS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBoZWFkLm5leHRFbGVtZW50U2libGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwiaGVhZFwiXScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKVxuICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZC5uZXh0RWxlbWVudFNpYmxpbmcuaGFzQXR0cmlidXRlKCdkYXRhLWhlYWRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gaGVhZC5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGluZm9CYXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1pbmZvLWJhcj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaW5mby1iYXI9XCJtYWluXCJdJykgJiYgZWwuY2xvc2VzdCgnW2RhdGEtaW5mby1iYXI9XCJidG4tY2xvc2VcIl0nKSkge1xuICAgICAgICAgICAgY29uc3QgaW5mb0JhciA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpXG4gICAgICAgICAgICBpbmZvQmFyLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2xpZGVyQ2FyZHNNb2IoKSB7XG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJtYWluXCJdJylcblxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxuXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTc2cHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgc2xpZGVycy5mb3JFYWNoKGl0ZW1TbGlkZXIgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHMtbW9iPVwic2xpZGVyXCJdJylcbiAgICAgICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJ0bk5leHQgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJidG4tbmV4dFwiXScpXG4gICAgICAgICAgICBjb25zdCBidG5QcmV2ID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHMtbW9iPVwiYnRuLXByZXZcIl0nKVxuXG4gICAgICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNsaWRlckNhcmRzKCkge1xuICAgIGNvbnN0IHNsaWRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJtYWluXCJdJylcblxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxuXG5cbiAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBudW1iZXJMaW5lcyA9IHNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLWNhcmRzLWxpbmVzJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njc6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDU3Njoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxuICAgICAgICAgICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBudW1iZXJMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gdGFicygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpcyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicz1cImxpXCJdJylcbiAgICAgICAgICAgIGNvbnN0IHRhYnMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJ0YWJcIl0nKVxuICAgIFxuICAgICAgICAgICAgbGlzLmZvckVhY2goKGxpLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgdGFic1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgbGlzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwibGlcIl0nKVxuXG4gICAgICAgIGxpcy5mb3JFYWNoKChsaSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS10YWJzLWluZGV4JywgaW5kZXgpXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XG5cbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXRhYnM9XCJtYWluXCJdJykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibWFpblwiXScpXG5cbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibGlcIl0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZWwuY2xvc2VzdCgnW2RhdGEtdGFicz1cImxpXCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJzLWluZGV4JylcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwidGFiXCJdJylcblxuICAgICAgICAgICAgICAgIGlmICghbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB0YWJzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZhcSgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZhcT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgY2FyZHMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZhcT1cImNhcmRcIl0nKVxuXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkID0gY2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJoZWFkXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImJvZHlcIl0nKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzbW9vdGhWaWV3KGhlYWQsIGJvZHkpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2xpZGVyUmFuZ2UoKSB7XG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1yYW5nZT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXG4gICAgXG4gICAgc2xpZGVycy5mb3JFYWNoKGl0ZW1TbGlkZXIgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1yYW5nZT1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1zdGFydCcpXG4gICAgICAgIGNvbnN0IG1pbiA9ICtpdGVtU2xpZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZXItcmFuZ2UtbWluJylcbiAgICAgICAgY29uc3QgbWF4ID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1tYXgnKVxuXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgY29ubmVjdDogJ2xvd2VyJyxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgJ21pbic6IFttaW5dLFxuICAgICAgICAgICAgICAgICdtYXgnOiBbbWF4XVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjb3VudGVyKCkge1xuICAgIGNvbnN0IHBhcmVudEJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvdW50ZXI9XCJjb3VudGVyXCJdYClcbiAgICBpZiAoIXBhcmVudEJsb2Nrcy5sZW5ndGgpIHJldHVyblxuICAgIHBhcmVudEJsb2Nrcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICBjb25zdCByZW1vdmUgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvdW50ZXI9XCJyZW1vdmVcIl0nKVxuICAgICAgICBjb25zdCBhZGQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvdW50ZXI9XCJhZGRcIl0nKVxuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY291bnRlcj1cImlucHV0XCJdJylcbiAgICBcbiAgICAgICAgY29uc3QgbWF4ID0gK2lucHV0LmdldEF0dHJpYnV0ZSgnbWF4JylcbiAgICAgICAgY29uc3QgbWluID0gK2lucHV0LmdldEF0dHJpYnV0ZSgnbWluJylcbiAgICBcbiAgICAgICAgY29uc3QgdmFsaWRJbnB1dCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9ICt2YWx1ZVxuICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBpbnB1dFZhbHVlIDw9IG1pbjpcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBtaW5cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgaW5wdXRWYWx1ZSA+PSBtYXg6XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gbWF4XG4gICAgICAgICAgICAgICAgICAgIGFkZC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZW1vdmUucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgIGFkZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YWxpZElucHV0KGlucHV0LnZhbHVlKVxuICAgIFxuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dC52YWx1ZSlcbiAgICAgICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIGFkZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlKytcbiAgICAgICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlLS1cbiAgICAgICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gY2VydGlmaWNhdGVzKCkge1xuICAgIGNvbnN0IGNlcnRpZmljYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNlcnRpZmljYXRlcz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFjZXJ0aWZpY2F0ZXMubGVuZ3RoKSByZXR1cm5cblxuICAgIGNlcnRpZmljYXRlcy5mb3JFYWNoKGNlcnRpZmljYXRlID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gY2VydGlmaWNhdGUucXVlcnlTZWxlY3RvcignW2RhdGEtY2VydGlmaWNhdGVzPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IGNlcnRpZmljYXRlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlcnRpZmljYXRlcz1cInBhZ2luYXRpb25cIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gY2VydGlmaWNhdGUucXVlcnlTZWxlY3RvcignW2RhdGEtY2VydGlmaWNhdGVzPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gY2VydGlmaWNhdGUucXVlcnlTZWxlY3RvcignW2RhdGEtY2VydGlmaWNhdGVzPVwiYnRuLXByZXZcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjMsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDUsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njc6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDU3Njoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjUsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNwZWNpYWxpc3RDYXJkKCkge1xuICAgIGNvbnN0IHNwZWNpYWxpc3RDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFzcGVjaWFsaXN0Q2FyZHMubGVuZ3RoKSByZXR1cm5cblxuICAgIHNwZWNpYWxpc3RDYXJkcy5mb3JFYWNoKHNwZWNpYWxpc3RDYXJkID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyU3BlY2lhbGlzdHMgPSBzcGVjaWFsaXN0Q2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJzbGlkZXItc3BlY2lhbGlzdHNcIl0nKVxuICAgICAgICBjb25zdCBzbGlkZXJJbmZvU3BlY2lhbGlzdHMgPSBzcGVjaWFsaXN0Q2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJzbGlkZXItaW5mby1zcGVjaWFsaXN0c1wiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBzcGVjaWFsaXN0Q2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJidG4tbmV4dFwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBzcGVjaWFsaXN0Q2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJidG4tcHJldlwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyU3BlY2lhbGlzdHMgPSBuZXcgU3dpcGVyKHNsaWRlclNwZWNpYWxpc3RzLCB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBzd2lwZXJJbmZvU3BlY2lhbGlzdHMgPSBuZXcgU3dpcGVyKHNsaWRlckluZm9TcGVjaWFsaXN0cywge1xuICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxuICAgICAgICAgICAgZWZmZWN0OiBcImZhZGVcIixcbiAgICAgICAgfSlcblxuICAgICAgICBzd2lwZXJJbmZvU3BlY2lhbGlzdHMuY29udHJvbGxlci5jb250cm9sID0gc3dpcGVyU3BlY2lhbGlzdHNcbiAgICAgICAgc3dpcGVyU3BlY2lhbGlzdHMuY29udHJvbGxlci5jb250cm9sID0gc3dpcGVySW5mb1NwZWNpYWxpc3RzXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZmVlZGJhY2soKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mZWVkYmFjaz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mZWVkYmFjaz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZlZWRiYWNrPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mZWVkYmFjaz1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJwYWdpbmF0aW9uXCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA0MCxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gb3JkZXJXb3JrKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtb3JkZXItd29yaz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci13b3JrPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgaGVpZ2h0U2xpZGVyID0gc2xpZGVyLm9mZnNldEhlaWdodFxuICAgICAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtb3JkZXItd29yaz1cInNsaWRlclwiXSAuc3dpcGVyLXNsaWRlJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItd29yaz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItd29yaz1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItd29yaz1cInBhZ2luYXRpb25cIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjIsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDcyLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgMTIwMDoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDU3Njoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0U2xpZGVyfXB4YClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjb250YWN0cygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbnRhY3RzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBibG9ja3NJbmZvID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb250YWN0cz1cImJsb2NrLWluZm9cIl0nKVxuXG4gICAgICAgIGJsb2Nrc0luZm8uZm9yRWFjaChibG9ja0luZm8gPT4ge1xuICAgICAgICAgICAgY29uc3QgaGVhZCA9IGJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb250YWN0cz1cImhlYWRcIl0nKVxuICAgICAgICAgICAgY29uc3QgYm9keSA9IGJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb250YWN0cz1cImJvZHlcIl0nKVxuXG4gICAgICAgICAgICBzbW9vdGhWaWV3KGhlYWQsIGJvZHkpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuaGVhZGVyKClcbmluZm9CYXIoKVxuc2xpZGVyQ2FyZHNNb2IoKVxuc2xpZGVyQ2FyZHMoKVxudGFicygpXG5mYXEoKVxuc2xpZGVyUmFuZ2UoKVxuY291bnRlcigpXG5jZXJ0aWZpY2F0ZXMoKVxuc3BlY2lhbGlzdENhcmQoKVxuZmVlZGJhY2soKVxub3JkZXJXb3JrKClcbmNvbnRhY3RzKCkiXSwiZmlsZSI6Im1haW4uanMifQ==