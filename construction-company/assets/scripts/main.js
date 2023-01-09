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

function fixedHeader() {
    const header = document.querySelector('[data-header="header"]')

    if (!header) return

    let fixedClass

    window.matchMedia("(min-width: 1200px)").matches ? fixedClass = 'header--fixed' : fixedClass = 'header--fixed-mob'

    const logic = (scrolled) => {
        if (scrolled >= 100) {
            header.classList.add(fixedClass)
        } else {
            header.classList.remove(fixedClass)
        }
    }

    logic(window.pageYOffset)

    window.addEventListener('scroll', (event) => {
        const scrolled = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;
        
        logic(scrolled)
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

function select() {
    const selects = document.querySelectorAll('[data-select="select"]')

    if (!selects.length) return

    const hideAll = () => {
        selects.forEach(elSelect => {
            elSelect.classList.remove('active')
        })
    }

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-select="select"]')) {
            const select = el.closest('[data-select="select"]')
            const title = select.querySelector('[data-select="title"]')

            const removeClassSelected = () => {
                const listItems = select.querySelectorAll('[data-select="list"] > li')

                listItems.forEach(listItem => {
                    listItem.classList.remove('select__li--selected')
                })
            }
            
            if (el.closest('[data-select="block-title"]')) {
                selects.forEach(elSelect => {
                    if (elSelect !== select) elSelect.classList.remove('active')
                })

                select.classList.toggle('active')
            }

            if (el.closest('[data-select="list"] > li span')) {
                const li = el.closest('[data-select="list"] > li')
                const textLi = el.closest('[data-select="list"] > li > span')
                removeClassSelected()
                li.classList.add('select__li--selected')
                const liContent = textLi.textContent
                title.textContent = liContent
                select.setAttribute('data-select-value', liContent)
                select.classList.remove('active')
            }
        } else {
            hideAll()
        }
    })
}

function examplesWorks() {
    const mains = document.querySelectorAll('[data-examples-works="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-examples-works="slider"]')
        const pagination = main.querySelector('[data-examples-works="pagination"]')
        const btnPrev = main.querySelector('[data-examples-works="btn-prev"]')
        const btnNext = main.querySelector('[data-examples-works="btn-next"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 24,
            watchSlidesProgress: true,
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
            pagination: {
              el: pagination,
              type: "fraction",
            },
            breakpoints: {
                1200: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 1.5,
                },
                768: {
                    slidesPerView: 1.3,
                }
            }
        })

        const swiperPaginationCurrent = pagination.querySelector('.swiper-pagination-current').textContent
        const swiperPaginationTotal = pagination.querySelector('.swiper-pagination-total').textContent

        const currentNumberSlide = main.querySelector('[data-examples-works="current-number-slide"]')
        const allQuantitySlides = main.querySelector('[data-examples-works="all-quantity-slides"]')

        allQuantitySlides.textContent = swiperPaginationTotal
        currentNumberSlide.textContent = swiperPaginationCurrent  


        let observer = new MutationObserver(mutationRecords => {
            const swiperPaginationCurrent = pagination.querySelector('.swiper-pagination-current').textContent
            currentNumberSlide.textContent = swiperPaginationCurrent   
        })
            
        observer.observe(pagination.querySelector('.swiper-pagination-current'), {
            childList: true, 
            subtree: true,
            characterDataOldValue: true
        })
    })
}

function bigRepairCard() {
    const mains = document.querySelectorAll('[data-big-repair-card="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-big-repair-card="slider"]')
        const pagination = main.querySelector('[data-big-repair-card="pagination"]')
        const btnPrev = main.querySelector('[data-big-repair-card="btn-prev"]')
        const btnNext = main.querySelector('[data-big-repair-card="btn-next"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 24,
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
            pagination: {
              el: pagination,
            },
        })
    })
}

function tooltip() {
    const mains = document.querySelectorAll('[data-tooltip="main"]')

    if (!mains.length) return

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-tooltip="main"]')) {
            const main = el.closest('[data-tooltip="main"]')
            const tooltip = main.querySelector('[data-tooltip="tooltip"]')

            if (el.closest('[data-tooltip="btn-close"]')) {
                tooltip.classList.remove('active')
            } else {
                mains.forEach(itemMain => {
                    if (itemMain !== main) {
                        const tooltip = itemMain.querySelector('[data-tooltip="tooltip"]')
                        tooltip.classList.remove('active')
                    }
                })
                
                tooltip.classList.add('active')
            }
        } else {
            mains.forEach(itemMain => {
                const tooltip = itemMain.querySelector('[data-tooltip="tooltip"]')
                tooltip.classList.remove('active')
            })
        }
    })
}

function popularServices() {
    const mains = document.querySelectorAll('[data-popular-services="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-popular-services="slider"]')
        const pagination = main.querySelector('[data-popular-services="pagination"]')
        const btnPrev = main.querySelector('[data-popular-services="btn-prev"]')
        const btnNext = main.querySelector('[data-popular-services="btn-next"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 16,
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
            pagination: {
                el: pagination,
                type: "progressbar",
            },
            breakpoints: {
                992: {
                    slidesPerView: 3.2,
                },
                768: {
                    slidesPerView: 2.2,
                },
                576: {
                    slidesPerView: 2,
                },
            }
        })

        const blockTags = main.querySelector('[data-popular-services="block-tags"]')

        if (blockTags) {
            const btnMoreTags = main.querySelector('[data-popular-services="btn-more-tags"]')
            const btnMoreTagsText = main.querySelector('[data-popular-services="btn-more-tags-text"]')

            btnMoreTags.addEventListener('click', () => {
                blockTags.classList.toggle('active')

                if (blockTags.classList.contains('active')) {
                    btnMoreTags.classList.add('active')
                    btnMoreTagsText.textContent = 'Свернуть'
                } else {
                    btnMoreTags.classList.remove('active')
                    btnMoreTagsText.textContent = 'Показать все'
                }
            })
        }
    })
}

function warehouse() {
    const mains = document.querySelectorAll('[data-warehouse="main"]')

    mains.forEach(main => {
        const slider = main.querySelector('[data-warehouse="slider"]')
        const pagination = main.querySelector('[data-warehouse="pagination"]')
        const btnPrev = main.querySelector('[data-warehouse="btn-prev"]')
        const btnNext = main.querySelector('[data-warehouse="btn-next"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 2.5,
            spaceBetween: 4,
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
            pagination: {
                el: pagination,
                type: "progressbar",
            },
            breakpoints: {
                992: {
                    slidesPerView: 2.2,
                    spaceBetween: 8,
                },
                768: {
                    slidesPerView: 3.2,
                    spaceBetween: 8,
                },
                576: {
                    slidesPerView: 2.2,
                    spaceBetween: 8,
                },
            }
        })
    })
}

function guarantees() {
    const mains = document.querySelectorAll('[data-guarantees="main"]')

    mains.forEach(main => {
        const slider = main.querySelector('[data-guarantees="slider"]')
        const pagination = main.querySelector('[data-guarantees="pagination"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            pagination: {
                el: pagination,
            }
        })
    })
}

function discount() {
    const mains = document.querySelectorAll('[data-discount="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-discount="slider"]')
        const pagination = main.querySelector('[data-discount="pagination"]')
        const btnNext = main.querySelector('[data-discount="btn-next"]')
        const btnPrev = main.querySelector('[data-discount="btn-prev"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1.4,
            spaceBetween: 15,
            pagination: {
                el: pagination,
                type: "progressbar",
            },
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            grid: {
                rows: 2,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 5.5,
                },
                992: {
                    slidesPerView: 4.5,
                },
                768: {
                    slidesPerView: 3.5,
                },
                576: {
                    slidesPerView: 2.5,
                }
            }
        })
    })
}

header()
fixedHeader()
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
select()
examplesWorks()
bigRepairCard()
tooltip()
popularServices()
warehouse()
guarantees()
discount()
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XG5cbiAgICBpZiAoIWJ0biAmJiAhZWwpIHJldHVyblxuICAgIFxuICAgIGxldCBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJylcbiAgICB9XG5cbiAgICBpZiAoYnRuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWRkKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xuICAgICAgICBpZiAoaGVpZ2h0RWwgPCBzdGFydEhlaWdodCkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgIHVwZGF0ZSgpXG4gICAgfSlcbiAgICAgICAgXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCwge1xuICAgICAgICBjaGlsZExpc3Q6IHRydWUsIFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICB9KVxufVxuXG5cbmZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJoZWFkZXJcIl0nKVxuXG4gICAgaWYgKCFoZWFkZXIpIHJldHVyblxuXG4gICAgY29uc3QgaGVpZ2h0SGVhZGVyID0gaGVhZGVyLm9mZnNldEhlaWdodFxuICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wYWdlPVwicGFnZVwiXScpXG5cbiAgICBpZiAocGFnZSkgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSBgJHtoZWlnaHRIZWFkZXJ9cHhgXG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlck1vYlNlYXJjaCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1vYi1zZWFyY2hcIl0nKVxuICAgICAgICBjb25zdCB3cmFwcGVyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1lbnVcIl0nKVxuICAgICAgICBjb25zdCB3cmFwcGVyTWVudUNvbnRhaW5lciA9IHdyYXBwZXJNZW51LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRhaW5lcicpXG4gICAgICAgIGNvbnN0IHdyYXBwZXJOYXYgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1uYXZcIl0nKVxuICAgICAgICBjb25zdCB3cmFwcGVyTmF2Q29udGFpbmVyID0gd3JhcHBlck5hdi5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250YWluZXInKVxuICAgICAgICBjb25zdCBuYXYgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibmF2XCJdJylcbiAgICAgICAgY29uc3QgYmxvY2tJbmZvID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImJsb2NrLWluZm9cIl0nKVxuICAgICAgICBjb25zdCBzb2NpYWxOZXR3b3JrID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cInNvY2lhbC1uZXR3b3JrXCJdJylcbiAgICAgICAgY29uc3Qgc2VhcmNoID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cInNlYXJjaFwiXScpXG4gICAgICAgIGNvbnN0IGxvZ28gPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibG9nb1wiXScpXG5cbiAgICAgICAgY29uc3QgY2xvbmVkTmF2ID0gbmF2LmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjb25zdCBjbG9uZWRCbG9ja0luZm8gPSBibG9ja0luZm8uY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIGNvbnN0IGNsb25lZFNvY2lhbE5ldHdvcmsgPSBzb2NpYWxOZXR3b3JrLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjb25zdCBjbG9uZWRTZWFyY2ggPSBzZWFyY2guY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIGNvbnN0IGNsb25lZExvZ28gPSBsb2dvLmNsb25lTm9kZSh0cnVlKVxuXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWROYXYpXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWRCbG9ja0luZm8pXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWRTb2NpYWxOZXR3b3JrKVxuICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmFwcGVuZChjbG9uZWRTZWFyY2gpXG4gICAgICAgIHdyYXBwZXJOYXZDb250YWluZXIucHJlcGVuZChjbG9uZWRMb2dvKVxuXG4gICAgICAgIG5hdi5yZW1vdmUoKVxuICAgICAgICBibG9ja0luZm8ucmVtb3ZlKClcbiAgICAgICAgc29jaWFsTmV0d29yay5yZW1vdmUoKVxuICAgICAgICBzZWFyY2gucmVtb3ZlKClcbiAgICAgICAgbG9nby5yZW1vdmUoKVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xvbmVkV3JhcHBlck1lbnUgPSB3cmFwcGVyTWVudS5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgICAgICAgIHdyYXBwZXJOYXYuYXBwZW5kKGNsb25lZFdyYXBwZXJNZW51KVxuICAgICAgICAgICAgd3JhcHBlck1lbnUucmVtb3ZlKClcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBidG5TZWFyY2ggPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiYnRuLXNlYXJjaFwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiYnRuLW1lbnVcIl0nKVxuXG4gICAgICAgIGJ0blNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJNZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbWVudVwiXScpXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgIH0pXG4gXG4gICAgICAgIGJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJNZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbWVudVwiXScpXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICBjb25zdCBpY29uID0gYnRuTWVudS5xdWVyeVNlbGVjdG9yKCd1c2UnKVxuICAgICAgICAgICAgaWYgKHdyYXBwZXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgneGxpbms6aHJlZicsICcuL2Fzc2V0cy9pY29ucy9zcHJpdGUtc3ZnLnN2ZyNtZW51LWNsb3NlJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnLCAnLi9hc3NldHMvaWNvbnMvc3ByaXRlLXN2Zy5zdmcjbWVudScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcbiAgICAgICAgXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJy5oZWFkZXJfX21lbnUtYmxvY2stYm9keS0tbGFzdCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwiaGVhZFwiXScpXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZGF0YS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBoZWFkLm5leHRFbGVtZW50U2libGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwiaGVhZFwiXScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKVxuICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZC5uZXh0RWxlbWVudFNpYmxpbmcuaGFzQXR0cmlidXRlKCdkYXRhLWhlYWRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gaGVhZC5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZpeGVkSGVhZGVyKCkge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImhlYWRlclwiXScpXG5cbiAgICBpZiAoIWhlYWRlcikgcmV0dXJuXG5cbiAgICBsZXQgZml4ZWRDbGFzc1xuXG4gICAgd2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMgPyBmaXhlZENsYXNzID0gJ2hlYWRlci0tZml4ZWQnIDogZml4ZWRDbGFzcyA9ICdoZWFkZXItLWZpeGVkLW1vYidcblxuICAgIGNvbnN0IGxvZ2ljID0gKHNjcm9sbGVkKSA9PiB7XG4gICAgICAgIGlmIChzY3JvbGxlZCA+PSAxMDApIHtcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGZpeGVkQ2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShmaXhlZENsYXNzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9naWMod2luZG93LnBhZ2VZT2Zmc2V0KVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICBcbiAgICAgICAgbG9naWMoc2Nyb2xsZWQpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5mb0JhcigpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxuXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1pbmZvLWJhcj1cIm1haW5cIl0nKSAmJiBlbC5jbG9zZXN0KCdbZGF0YS1pbmZvLWJhcj1cImJ0bi1jbG9zZVwiXScpKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvQmFyID0gZWwuY2xvc2VzdCgnW2RhdGEtaW5mby1iYXI9XCJtYWluXCJdJylcbiAgICAgICAgICAgIGluZm9CYXIuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzbGlkZXJDYXJkc01vYigpIHtcbiAgICBjb25zdCBzbGlkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA1NzZweClcIikubWF0Y2hlcykge1xuICAgICAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXIgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJzbGlkZXJcIl0nKVxuICAgICAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cInBhZ2luYXRpb25cIl0nKVxuICAgICAgICAgICAgY29uc3QgYnRuTmV4dCA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJ0blByZXYgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJidG4tcHJldlwiXScpXG5cbiAgICAgICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2xpZGVyQ2FyZHMoKSB7XG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1jYXJkcz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXG5cblxuICAgIHNsaWRlcnMuZm9yRWFjaChpdGVtU2xpZGVyID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IG51bWJlckxpbmVzID0gc2xpZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZXItY2FyZHMtbGluZXMnKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2Nzoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTc2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXG4gICAgICAgICAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IG51bWJlckxpbmVzLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB0YWJzKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgY29uc3QgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICAgICAgY29uc3QgbGlzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwibGlcIl0nKVxuICAgICAgICAgICAgY29uc3QgdGFicyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicz1cInRhYlwiXScpXG4gICAgXG4gICAgICAgICAgICBsaXMuZm9yRWFjaCgobGksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB0YWJzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBsaXMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJsaVwiXScpXG5cbiAgICAgICAgbGlzLmZvckVhY2goKGxpLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtaW5kZXgnLCBpbmRleClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtdGFicz1cIm1haW5cIl0nKSkge1xuICAgICAgICAgICAgY29uc3QgbWFpbiA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXRhYnM9XCJtYWluXCJdJylcblxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXRhYnM9XCJsaVwiXScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibGlcIl0nKVxuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gbGkuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtaW5kZXgnKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYnMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJ0YWJcIl0nKVxuXG4gICAgICAgICAgICAgICAgaWYgKCFsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIHRhYnNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZmFxKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmFxPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBjYXJkcyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmFxPVwiY2FyZFwiXScpXG5cbiAgICAgICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImhlYWRcIl0nKVxuICAgICAgICAgICAgY29uc3QgYm9keSA9IGNhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiYm9keVwiXScpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHNtb290aFZpZXcoaGVhZCwgYm9keSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzbGlkZXJSYW5nZSgpIHtcbiAgICBjb25zdCBzbGlkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyLXJhbmdlPVwibWFpblwiXScpXG5cbiAgICBpZiAoIXNsaWRlcnMubGVuZ3RoKSByZXR1cm5cbiAgICBcbiAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXJhbmdlPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAraXRlbVNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLXJhbmdlLXN0YXJ0JylcbiAgICAgICAgY29uc3QgbWluID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1taW4nKVxuICAgICAgICBjb25zdCBtYXggPSAraXRlbVNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLXJhbmdlLW1heCcpXG5cbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBjb25uZWN0OiAnbG93ZXInLFxuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICAnbWluJzogW21pbl0sXG4gICAgICAgICAgICAgICAgJ21heCc6IFttYXhdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNvdW50ZXIoKSB7XG4gICAgY29uc3QgcGFyZW50QmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY291bnRlcj1cImNvdW50ZXJcIl1gKVxuICAgIGlmICghcGFyZW50QmxvY2tzLmxlbmd0aCkgcmV0dXJuXG4gICAgcGFyZW50QmxvY2tzLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY291bnRlcj1cInJlbW92ZVwiXScpXG4gICAgICAgIGNvbnN0IGFkZCA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY291bnRlcj1cImFkZFwiXScpXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyPVwiaW5wdXRcIl0nKVxuICAgIFxuICAgICAgICBjb25zdCBtYXggPSAraW5wdXQuZ2V0QXR0cmlidXRlKCdtYXgnKVxuICAgICAgICBjb25zdCBtaW4gPSAraW5wdXQuZ2V0QXR0cmlidXRlKCdtaW4nKVxuICAgIFxuICAgICAgICBjb25zdCB2YWxpZElucHV0ID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dFZhbHVlID0gK3ZhbHVlXG4gICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGlucHV0VmFsdWUgPD0gbWluOlxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IG1pblxuICAgICAgICAgICAgICAgICAgICByZW1vdmUuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSBpbnB1dFZhbHVlID49IG1heDpcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBtYXhcbiAgICAgICAgICAgICAgICAgICAgYWRkLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICAgICAgICAgICAgICAgICAgYWRkLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXG4gICAgXG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0LnZhbHVlKVxuICAgICAgICAgICAgdmFsaWRJbnB1dChpbnB1dC52YWx1ZSlcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgYWRkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUrK1xuICAgICAgICAgICAgdmFsaWRJbnB1dChpbnB1dC52YWx1ZSlcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgcmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUtLVxuICAgICAgICAgICAgdmFsaWRJbnB1dChpbnB1dC52YWx1ZSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjZXJ0aWZpY2F0ZXMoKSB7XG4gICAgY29uc3QgY2VydGlmaWNhdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2VydGlmaWNhdGVzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIWNlcnRpZmljYXRlcy5sZW5ndGgpIHJldHVyblxuXG4gICAgY2VydGlmaWNhdGVzLmZvckVhY2goY2VydGlmaWNhdGUgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gY2VydGlmaWNhdGUucXVlcnlTZWxlY3RvcignW2RhdGEtY2VydGlmaWNhdGVzPVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJidG4tbmV4dFwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJidG4tcHJldlwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMyxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2Nzoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTc2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuNSxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc3BlY2lhbGlzdENhcmQoKSB7XG4gICAgY29uc3Qgc3BlY2lhbGlzdENhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwibWFpblwiXScpXG5cbiAgICBpZiAoIXNwZWNpYWxpc3RDYXJkcy5sZW5ndGgpIHJldHVyblxuXG4gICAgc3BlY2lhbGlzdENhcmRzLmZvckVhY2goc3BlY2lhbGlzdENhcmQgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXJTcGVjaWFsaXN0cyA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cInNsaWRlci1zcGVjaWFsaXN0c1wiXScpXG4gICAgICAgIGNvbnN0IHNsaWRlckluZm9TcGVjaWFsaXN0cyA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cInNsaWRlci1pbmZvLXNwZWNpYWxpc3RzXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cImJ0bi1wcmV2XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXJTcGVjaWFsaXN0cyA9IG5ldyBTd2lwZXIoc2xpZGVyU3BlY2lhbGlzdHMsIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHN3aXBlckluZm9TcGVjaWFsaXN0cyA9IG5ldyBTd2lwZXIoc2xpZGVySW5mb1NwZWNpYWxpc3RzLCB7XG4gICAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXG4gICAgICAgICAgICBlZmZlY3Q6IFwiZmFkZVwiLFxuICAgICAgICB9KVxuXG4gICAgICAgIHN3aXBlckluZm9TcGVjaWFsaXN0cy5jb250cm9sbGVyLmNvbnRyb2wgPSBzd2lwZXJTcGVjaWFsaXN0c1xuICAgICAgICBzd2lwZXJTcGVjaWFsaXN0cy5jb250cm9sbGVyLmNvbnRyb2wgPSBzd2lwZXJJbmZvU3BlY2lhbGlzdHNcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBmZWVkYmFjaygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZlZWRiYWNrPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZlZWRiYWNrPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJidG4tbmV4dFwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZlZWRiYWNrPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mZWVkYmFjaz1cInBhZ2luYXRpb25cIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDQwLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBvcmRlcldvcmsoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vcmRlci13b3JrPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBoZWlnaHRTbGlkZXIgPSBzbGlkZXIub2Zmc2V0SGVpZ2h0XG4gICAgICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vcmRlci13b3JrPVwic2xpZGVyXCJdIC5zd2lwZXItc2xpZGUnKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci13b3JrPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci13b3JrPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci13b3JrPVwicGFnaW5hdGlvblwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuMixcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNzIsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAxMjAwOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTc2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHRTbGlkZXJ9cHhgKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNvbnRhY3RzKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29udGFjdHM9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IGJsb2Nrc0luZm8gPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbnRhY3RzPVwiYmxvY2staW5mb1wiXScpXG5cbiAgICAgICAgYmxvY2tzSW5mby5mb3JFYWNoKGJsb2NrSW5mbyA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkID0gYmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnRhY3RzPVwiaGVhZFwiXScpXG4gICAgICAgICAgICBjb25zdCBib2R5ID0gYmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnRhY3RzPVwiYm9keVwiXScpXG5cbiAgICAgICAgICAgIHNtb290aFZpZXcoaGVhZCwgYm9keSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzZWxlY3QoKSB7XG4gICAgY29uc3Qgc2VsZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlbGVjdD1cInNlbGVjdFwiXScpXG5cbiAgICBpZiAoIXNlbGVjdHMubGVuZ3RoKSByZXR1cm5cblxuICAgIGNvbnN0IGhpZGVBbGwgPSAoKSA9PiB7XG4gICAgICAgIHNlbGVjdHMuZm9yRWFjaChlbFNlbGVjdCA9PiB7XG4gICAgICAgICAgICBlbFNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XG5cbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cInNlbGVjdFwiXScpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJzZWxlY3RcIl0nKVxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignW2RhdGEtc2VsZWN0PVwidGl0bGVcIl0nKVxuXG4gICAgICAgICAgICBjb25zdCByZW1vdmVDbGFzc1NlbGVjdGVkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtcyA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGknKVxuXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1zLmZvckVhY2gobGlzdEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RfX2xpLS1zZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImJsb2NrLXRpdGxlXCJdJykpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RzLmZvckVhY2goZWxTZWxlY3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxTZWxlY3QgIT09IHNlbGVjdCkgZWxTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGkgc3BhbicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGknKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRMaSA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImxpc3RcIl0gPiBsaSA+IHNwYW4nKVxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzU2VsZWN0ZWQoKVxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdF9fbGktLXNlbGVjdGVkJylcbiAgICAgICAgICAgICAgICBjb25zdCBsaUNvbnRlbnQgPSB0ZXh0TGkudGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGxpQ29udGVudFxuICAgICAgICAgICAgICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0LXZhbHVlJywgbGlDb250ZW50KVxuICAgICAgICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGlkZUFsbCgpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBleGFtcGxlc1dvcmtzKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cInBhZ2luYXRpb25cIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJidG4tbmV4dFwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxuICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgMTIwMDoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLnRleHRDb250ZW50XG4gICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25Ub3RhbCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLXRvdGFsJykudGV4dENvbnRlbnRcblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyU2xpZGUgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwiY3VycmVudC1udW1iZXItc2xpZGVcIl0nKVxuICAgICAgICBjb25zdCBhbGxRdWFudGl0eVNsaWRlcyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJhbGwtcXVhbnRpdHktc2xpZGVzXCJdJylcblxuICAgICAgICBhbGxRdWFudGl0eVNsaWRlcy50ZXh0Q29udGVudCA9IHN3aXBlclBhZ2luYXRpb25Ub3RhbFxuICAgICAgICBjdXJyZW50TnVtYmVyU2xpZGUudGV4dENvbnRlbnQgPSBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCAgXG5cblxuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvblJlY29yZHMgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3dpcGVyUGFnaW5hdGlvbkN1cnJlbnQgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JykudGV4dENvbnRlbnRcbiAgICAgICAgICAgIGN1cnJlbnROdW1iZXJTbGlkZS50ZXh0Q29udGVudCA9IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ICAgXG4gICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JyksIHtcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSwgXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiB0cnVlXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gYmlnUmVwYWlyQ2FyZCgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJidG4tbmV4dFwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB0b29sdGlwKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9vbHRpcD1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtdG9vbHRpcD1cIm1haW5cIl0nKSkge1xuICAgICAgICAgICAgY29uc3QgbWFpbiA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXRvb2x0aXA9XCJtYWluXCJdJylcbiAgICAgICAgICAgIGNvbnN0IHRvb2x0aXAgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvb2x0aXA9XCJ0b29sdGlwXCJdJylcblxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXRvb2x0aXA9XCJidG4tY2xvc2VcIl0nKSkge1xuICAgICAgICAgICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFpbnMuZm9yRWFjaChpdGVtTWFpbiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtTWFpbiAhPT0gbWFpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9vbHRpcCA9IGl0ZW1NYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvb2x0aXA9XCJ0b29sdGlwXCJdJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWFpbnMuZm9yRWFjaChpdGVtTWFpbiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9vbHRpcCA9IGl0ZW1NYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvb2x0aXA9XCJ0b29sdGlwXCJdJylcbiAgICAgICAgICAgICAgICB0b29sdGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcG9wdWxhclNlcnZpY2VzKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cInBhZ2luYXRpb25cIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwiYnRuLW5leHRcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLjIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4yLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTc2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBibG9ja1RhZ3MgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJibG9jay10YWdzXCJdJylcblxuICAgICAgICBpZiAoYmxvY2tUYWdzKSB7XG4gICAgICAgICAgICBjb25zdCBidG5Nb3JlVGFncyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1tb3JlLXRhZ3NcIl0nKVxuICAgICAgICAgICAgY29uc3QgYnRuTW9yZVRhZ3NUZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwiYnRuLW1vcmUtdGFncy10ZXh0XCJdJylcblxuICAgICAgICAgICAgYnRuTW9yZVRhZ3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYmxvY2tUYWdzLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG5cbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tUYWdzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3MuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3NUZXh0LnRleHRDb250ZW50ID0gJ9Ch0LLQtdGA0L3Rg9GC0YwnXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3MuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3NUZXh0LnRleHRDb250ZW50ID0gJ9Cf0L7QutCw0LfQsNGC0Ywg0LLRgdC1J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiB3YXJlaG91c2UoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS13YXJlaG91c2U9XCJtYWluXCJdJylcblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdhcmVob3VzZT1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwiYnRuLW5leHRcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjUsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDQsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1NzY6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBndWFyYW50ZWVzKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZ3VhcmFudGVlcz1cIm1haW5cIl0nKVxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ndWFyYW50ZWVzPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZ3VhcmFudGVlcz1cInBhZ2luYXRpb25cIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGRpc2NvdW50KCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZGlzY291bnQ9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaXNjb3VudD1cInBhZ2luYXRpb25cIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaXNjb3VudD1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJidG4tcHJldlwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNCxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyaWQ6IHtcbiAgICAgICAgICAgICAgICByb3dzOiAyLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgMTIwMDoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LjUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNC41LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMuNSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDU3Njoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmhlYWRlcigpXG5maXhlZEhlYWRlcigpXG5pbmZvQmFyKClcbnNsaWRlckNhcmRzTW9iKClcbnNsaWRlckNhcmRzKClcbnRhYnMoKVxuZmFxKClcbnNsaWRlclJhbmdlKClcbmNvdW50ZXIoKVxuY2VydGlmaWNhdGVzKClcbnNwZWNpYWxpc3RDYXJkKClcbmZlZWRiYWNrKClcbm9yZGVyV29yaygpXG5jb250YWN0cygpXG5zZWxlY3QoKVxuZXhhbXBsZXNXb3JrcygpXG5iaWdSZXBhaXJDYXJkKClcbnRvb2x0aXAoKVxucG9wdWxhclNlcnZpY2VzKClcbndhcmVob3VzZSgpXG5ndWFyYW50ZWVzKClcbmRpc2NvdW50KCkiXSwiZmlsZSI6Im1haW4uanMifQ==