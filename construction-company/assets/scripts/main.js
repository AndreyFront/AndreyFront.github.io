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

function modal() {
    return new HystModal({
        linkAttributeName: "data-hystmodal",
        waitTransitions: true,
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

function modalPicture(blockPictures) {

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
        const pictures = blockPicture.querySelectorAll('[data-modal-picture="main"] a[data-modal-picture="link"]')

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

function header() {
    const header = document.querySelector('[data-header="header"]')

    if (!header) return

    // const heightHeader = header.offsetHeight
    // const page = document.querySelector('[data-page="page"]')

    // if (page) page.style.marginTop = `${heightHeader}px`

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

function floatingBlock() {
    if (window.matchMedia("(max-width: 1200px)").matches) {
        const main = document.querySelector('[data-floating-block="main"]')

        if (!main) return

        window.addEventListener('scroll', (event) => {
            const scrolled = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

            if (scrolled >= 10) {
                main.classList.add('active')
            } else {
                main.classList.remove('active')
            }
        })
    }
}

function fixedHeader() {
    const header = document.querySelector('[data-header="header"]')

    if (!header) return

    let fixedClass

    window.matchMedia("(min-width: 1200px)").matches ? fixedClass = 'header--fixed' : fixedClass = 'header--fixed-mob'

    const logic = (scrolled) => {
        if (scrolled >= 10) {
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

            const page = document.querySelector('[data-page="page"]')
            if (page.classList.contains('main-page')) {
                page.style.marginTop = '168px'
            } else {
                page.style.marginTop = '230px'
            }
        }
    })

    if (window.matchMedia("(max-width: 576px)").matches) {
        setTimeout(() => {
            mains.forEach(main => main.classList.add('not-active'))
            const page = document.querySelector('[data-page="page"]')
            if (page.classList.contains('main-page')) {
                page.style.marginTop = '168px'
            } else {
                page.style.marginTop = '230px'
            }
        }, 10000)
    }
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
                    grid: {
                        rows: numberLines,
                    },
                },
                767: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                    grid: {
                        rows: numberLines,
                    },
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

function atvRental() {
    const mains = document.querySelectorAll('[data-atv-rental="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-atv-rental="slider"]')
        const pagination = main.querySelector('[data-atv-rental="pagination"]')
        const btnNext = main.querySelector('[data-atv-rental="btn-next"]')
        const btnPrev = main.querySelector('[data-atv-rental="btn-prev"]')

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
                    slidesPerView: 3,
                },
                576: {
                    slidesPerView: 2,
                },
            }
        })
    })
}

function tabs() {
    const mains = document.querySelectorAll('[data-tabs="main"]')

    if (!mains.length) return

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

            const remove = () => {
                const lis = main.querySelectorAll('[data-tabs="li"]')
                const tabs = main.querySelectorAll('[data-tabs="tab"]')

                lis.forEach((li, index) => {
                    li.classList.remove('active')
                    tabs[index].classList.remove('active')
                })
            }

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

    modalPicture(certificates)

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
        let btnPrev = main.querySelector('[data-examples-works="btn-prev"]')
        let btnNext = main.querySelector('[data-examples-works="btn-next"]')


        if (window.matchMedia("(max-width: 576px)").matches) {
            const navInfo = main.querySelector('[data-examples-works="nav-info"]')
            const cloned = navInfo.cloneNode(true)
            slider.before(cloned)
            navInfo.remove()

            btnPrev = main.querySelector('[data-examples-works="btn-prev"]')
            btnNext = main.querySelector('[data-examples-works="btn-next"]')
        }

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

function bestWorks() {
    const mains = document.querySelectorAll('[data-best-works="main"]')

    if (!mains.length) return

    modalPicture(mains)
}

function projectCard() {
    const mains = document.querySelectorAll('[data-project-card="main"]')

    if (!mains.length) return

    modalPicture(mains)
}

function bigRepairCard() {
    const mains = document.querySelectorAll('[data-big-repair-card="main"]')

    if (!mains.length) return

    modalPicture(mains)

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
                    btnMoreTags.classList.add('active-more')
                    btnMoreTagsText.textContent = 'Свернуть'
                } else {
                    btnMoreTags.classList.remove('active-more')
                    btnMoreTagsText.textContent = 'Показать все'
                }
            })
        }
    })
}

function warehouse() {
    const mains = document.querySelectorAll('[data-warehouse="main"]')

    if (!mains.length) return

    modalPicture(mains)

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

    if (!mains.length) return

    modalPicture(mains)

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

function videoSlider() {
    const mains = document.querySelectorAll('[data-video-slider="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-video-slider="slider"]')
        const pagination = main.querySelector('[data-video-slider="pagination"]')
        const btnNext = main.querySelector('[data-video-slider="btn-next"]')
        const btnPrev = main.querySelector('[data-video-slider="btn-prev"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 16,
            pagination: {
                el: pagination,
                type: "progressbar",
            },
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                1200: {
                    slidesPerView: 3.4,
                },
                768: {
                    slidesPerView: 2.4,
                },
                576: {
                    slidesPerView: 2,
                }
            }
        })
    })
}

function largeSection() {
    const mains = document.querySelectorAll('[data-large-section="main"]')

    if (!mains.length) return

    modalPicture(mains)

    mains.forEach(main => {
        const blocksSlider = main.querySelectorAll('[data-large-section="block-slider"]')

        if (blocksSlider.length) {
            blocksSlider.forEach(blockSlider => {
                const slider = blockSlider.querySelector('[data-large-section="slider"]')
                const btnNext = blockSlider.querySelector('[data-large-section="btn-next"]')
                const btnPrev = blockSlider.querySelector('[data-large-section="btn-prev"]')

                const swiper = new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 16,
                    navigation: {
                        nextEl: btnNext,
                        prevEl: btnPrev,
                    },
                })
            })
        }
    })
}

function quiz() {
    const mains = document.querySelectorAll('[data-quiz="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const performance = main.querySelector('[data-quiz="performance"]')
        const btnStart = main.querySelector('[data-quiz="btn-start"]')
        const quiz = main.querySelector('[data-quiz="quiz"]')
        const slider = main.querySelector('[data-quiz="slider"]')
        const btnNext = main.querySelector('[data-quiz="btn-next"]')
        const btnPrev = main.querySelector('[data-quiz="btn-prev"]')
        const pagination = main.querySelector('[data-quiz="pagination"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 16,
            watchSlidesProgress: true,
            allowTouchMove: false,
            autoHeight: true,
            pagination: {
                el: pagination,
                type: "fraction",
            },
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
        })

        // swiperMain.slideTo(index, 400, true)

        btnStart.addEventListener('click', () => {
            main.classList.add('active')
            performance.classList.remove('active')
            quiz.classList.add('active')
        })

        const slides = slider.querySelectorAll('.swiper-slide')

        slides.forEach(slide => {
            const radios = slide.querySelectorAll('.radio')

            radios.forEach(radio => {
                radio.addEventListener('click', () => {
                    radios.forEach(radio2 => radio2.classList.remove('active'))
                    radio.classList.add('active')
                })
            })
        })

        const navList = main.querySelector('[data-quiz="nav-list"]')
        const coutSlides = slider.querySelectorAll('.swiper-slide')

        if (coutSlides.length) {
            for (let i = 1; i <= coutSlides.length; i++) {
                let firstElem
                if (i === 1) {
                    firstElem = true
                } else {
                    firstElem = false
                }
                navList.insertAdjacentHTML('beforeend', `
                    <li class="quiz__slider-nav-li ${firstElem ? 'active-current' : ''}">
                        <div class="quiz__slider-nav-li-content">${i}</div>
                    </li>
                `)
            }
        }

        let observer = new MutationObserver(mutationRecords => {
            const swiperPaginationCurrent = +pagination.querySelector('.swiper-pagination-current').textContent
            const navList = main.querySelector('[data-quiz="nav-list"]')
            const listItems = navList.querySelectorAll('li')
            listItems.forEach((listItem, index) => {
                const newIndex = index + 1
                if (newIndex < swiperPaginationCurrent) {
                    listItem.classList.add('active-passed')
                } else {
                    listItem.classList.remove('active-passed')
                    listItem.classList.remove('active-current')
                }

                if (newIndex === swiperPaginationCurrent) {
                    listItem.classList.add('active-current')
                }
            })
        })

        observer.observe(pagination.querySelector('.swiper-pagination-current'), {
            childList: true,
            subtree: true,
            characterDataOldValue: true
        })
    })
}

function pricesTypeWork() {
    const mains = document.querySelectorAll('[data-prices-type-work="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const wrapperTable = main.querySelector('[data-prices-type-work="wrapper-table"]')
        const btnMore = main.querySelector('[data-prices-type-work="btn-more"]')

        btnMore.addEventListener('click', () => {
            wrapperTable.classList.add('active')
            btnMore.style.display = 'none'
        })
    })
}

function reviews() {
    const mains = document.querySelectorAll('[data-reviews="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        if (window.matchMedia("(min-width: 992px)").matches) {
            const wrapperReviews = main.querySelector('[data-reviews="wrapper-reviews"]')
            const btnMore = main.querySelector('[data-reviews="btn-more"]')

            btnMore.addEventListener('click', () => {
                wrapperReviews.classList.add('active')
                btnMore.style.display = 'none'
            })
        } else {
            const wrapInnerReviews = main.querySelectorAll('[data-reviews="wrap-inner-reviews"]')

            wrapInnerReviews.forEach(wrapInnerReview => {
                const innerReviews = wrapInnerReview.querySelector('[data-reviews="inner-reviews"]')
                const btnColumnMore = wrapInnerReview.querySelector('[data-reviews="btn-column-more"]')

                btnColumnMore.addEventListener('click', () => {
                    innerReviews.classList.add('active')
                    btnColumnMore.style.display = 'none'
                })
            })
        }
    })
}

function video() {
    const mains = document.querySelectorAll('[data-video="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-video="slider"]')
        const btnNext = main.querySelector('[data-video="btn-next"]')
        const btnPrev = main.querySelector('[data-video="btn-prev"]')
        const pagination = main.querySelector('[data-video="pagination"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1.2,
            spaceBetween: 16,
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

function technic() {
    const mains = document.querySelectorAll('[data-technic="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-technic="slider"]')
        const btnNext = main.querySelector('[data-technic="btn-next"]')
        const btnPrev = main.querySelector('[data-technic="btn-prev"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                }
            }
        })
    })
}

function sPriceTable() {
    const mains = document.querySelectorAll('[data-s-price-table="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const secondaryTable = main.querySelector('[data-s-price-table="secondary-table"]')
        const itemsTable = secondaryTable.querySelectorAll('tr')
        const btnMore = main.querySelector('[data-s-price-table="btn-more"]')

        if (itemsTable.length > 5) {
            btnMore.style.display = 'grid'
            secondaryTable.classList.add('secondary-table--hidden')

            itemsTable.forEach((itemTable, index) => {
                if (index > 5) {
                    itemTable.style.display = 'none'
                }
            })

            btnMore.addEventListener('click', () => {
                btnMore.style.display = 'none'
                secondaryTable.classList.add('active')

                itemsTable.forEach((itemTable, index) => {
                    if (index > 5) {
                        itemTable.style.display = 'grid'
                    }
                })
            })
        }
    })
}

function repairCost() {
    const mains = document.querySelectorAll('[data-repair-cost="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-repair-cost="slider"]')
        const btnNext = main.querySelector('[data-repair-cost="btn-next"]')
        const btnPrev = main.querySelector('[data-repair-cost="btn-prev"]')
        const pagination = main.querySelector('[data-repair-cost="pagination"]')

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
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                }
            }
        })
    })
}

header()
floatingBlock()
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
bestWorks()
projectCard()
bigRepairCard()
tooltip()
popularServices()
warehouse()
guarantees()
discount()
videoSlider()
largeSection()
quiz()
pricesTypeWork()
reviews()
modal()
phoneMask()
video()
technic()
atvRental()
sPriceTable()
repairCost()
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XHJcblxyXG4gICAgaWYgKCFidG4gJiYgIWVsKSByZXR1cm5cclxuXHJcbiAgICBsZXQgaGVpZ2h0RWwgPSBlbC5vZmZzZXRIZWlnaHRcclxuXHJcbiAgICBjb25zdCBhZGQgPSAoKSA9PiB7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnbm90LWFjdGl2ZScpXHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnbm90LWFjdGl2ZScpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgcmVtb3ZlKClcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHRFbH1weGBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWRkKClcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtzdGFydEhlaWdodH1weGBcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RhcnRIZWlnaHQgPiAwKSB7XHJcbiAgICAgICAgaWYgKGhlaWdodEVsIDwgc3RhcnRIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmVtb3ZlKClcclxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0bydcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaGVpZ2h0RWwgPSBlbC5vZmZzZXRIZWlnaHRcclxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXHJcbiAgICAgICAgfSwgMTAwKVxyXG4gICAgfVxyXG5cclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdub3QtYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgcmVtb3ZlKClcclxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWRkKClcclxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvblJlY29yZHMgPT4ge1xyXG4gICAgICAgIHVwZGF0ZSgpXHJcbiAgICB9KVxyXG5cclxuICAgIG9ic2VydmVyLm9ic2VydmUoZWwsIHtcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1vZGFsKCkge1xyXG4gICAgcmV0dXJuIG5ldyBIeXN0TW9kYWwoe1xyXG4gICAgICAgIGxpbmtBdHRyaWJ1dGVOYW1lOiBcImRhdGEtaHlzdG1vZGFsXCIsXHJcbiAgICAgICAgd2FpdFRyYW5zaXRpb25zOiB0cnVlLFxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcGhvbmVNYXNrKCkge1xyXG4gICAgY29uc3QgcGhvbmVNYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBob25lLW1hc2tdJylcclxuXHJcbiAgICBpZiAoIXBob25lTWFza3MubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBwaG9uZU1hc2tzLmZvckVhY2gocGhvbmVNYXNrID0+IHtcclxuICAgICAgICBJTWFzayhwaG9uZU1hc2ssIHtcclxuICAgICAgICAgICAgbWFzazogJyt7N30oMDAwKTAwMC0wMC0wMCdcclxuICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gbW9kYWxQaWN0dXJlKGJsb2NrUGljdHVyZXMpIHtcclxuXHJcbiAgICBpZiAoIWJsb2NrUGljdHVyZXMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBsZXQgYnAgPSBCaWdnZXJQaWN0dXJlKHtcclxuICAgICAgICB0YXJnZXQ6IGRvY3VtZW50LmJvZHksXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IG9wZW5HYWxsZXJ5ID0gKGV2ZW50LCBwaWN0dXJlcykgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICBicC5vcGVuKHtcclxuICAgICAgICAgICAgaXRlbXM6IHBpY3R1cmVzLFxyXG4gICAgICAgICAgICBlbDogZXZlbnQuY3VycmVudFRhcmdldCxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGJsb2NrUGljdHVyZXMuZm9yRWFjaChibG9ja1BpY3R1cmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBpY3R1cmVzID0gYmxvY2tQaWN0dXJlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLXBpY3R1cmU9XCJtYWluXCJdIGFbZGF0YS1tb2RhbC1waWN0dXJlPVwibGlua1wiXScpXHJcblxyXG4gICAgICAgIGlmIChwaWN0dXJlcy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIHBpY3R1cmVzLmZvckVhY2gocGljdHVyZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZSA9IHBpY3R1cmUucXVlcnlTZWxlY3RvcignaW1nJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlU291cmNlID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdzcmMnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKClcclxuXHJcbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpZ2h0ID0gdGhpcy5oZWlnaHRcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JywgaGlnaHQgKiA0KVxyXG4gICAgICAgICAgICAgICAgICAgIHBpY3R1cmUuc2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJywgd2lkdGggKiA0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBpbWFnZVNvdXJjZTtcclxuXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuR2FsbGVyeShldmVudCwgcGljdHVyZXMpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhlYWRlcigpIHtcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImhlYWRlclwiXScpXHJcblxyXG4gICAgaWYgKCFoZWFkZXIpIHJldHVyblxyXG5cclxuICAgIC8vIGNvbnN0IGhlaWdodEhlYWRlciA9IGhlYWRlci5vZmZzZXRIZWlnaHRcclxuICAgIC8vIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wYWdlPVwicGFnZVwiXScpXHJcblxyXG4gICAgLy8gaWYgKHBhZ2UpIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gYCR7aGVpZ2h0SGVhZGVyfXB4YFxyXG5cclxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXJNb2JTZWFyY2ggPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1tb2Itc2VhcmNoXCJdJylcclxuICAgICAgICBjb25zdCB3cmFwcGVyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1lbnVcIl0nKVxyXG4gICAgICAgIGNvbnN0IHdyYXBwZXJNZW51Q29udGFpbmVyID0gd3JhcHBlck1lbnUucXVlcnlTZWxlY3RvcignLm1haW4tY29udGFpbmVyJylcclxuICAgICAgICBjb25zdCB3cmFwcGVyTmF2ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbmF2XCJdJylcclxuICAgICAgICBjb25zdCB3cmFwcGVyTmF2Q29udGFpbmVyID0gd3JhcHBlck5hdi5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250YWluZXInKVxyXG4gICAgICAgIGNvbnN0IG5hdiA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJuYXZcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJsb2NrSW5mbyA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJibG9jay1pbmZvXCJdJylcclxuICAgICAgICBjb25zdCBzb2NpYWxOZXR3b3JrID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cInNvY2lhbC1uZXR3b3JrXCJdJylcclxuICAgICAgICBjb25zdCBzZWFyY2ggPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwic2VhcmNoXCJdJylcclxuICAgICAgICBjb25zdCBsb2dvID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImxvZ29cIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBjbG9uZWROYXYgPSBuYXYuY2xvbmVOb2RlKHRydWUpXHJcbiAgICAgICAgY29uc3QgY2xvbmVkQmxvY2tJbmZvID0gYmxvY2tJbmZvLmNsb25lTm9kZSh0cnVlKVxyXG4gICAgICAgIGNvbnN0IGNsb25lZFNvY2lhbE5ldHdvcmsgPSBzb2NpYWxOZXR3b3JrLmNsb25lTm9kZSh0cnVlKVxyXG4gICAgICAgIGNvbnN0IGNsb25lZFNlYXJjaCA9IHNlYXJjaC5jbG9uZU5vZGUodHJ1ZSlcclxuICAgICAgICBjb25zdCBjbG9uZWRMb2dvID0gbG9nby5jbG9uZU5vZGUodHJ1ZSlcclxuXHJcbiAgICAgICAgd3JhcHBlck1lbnVDb250YWluZXIuYXBwZW5kKGNsb25lZE5hdilcclxuICAgICAgICB3cmFwcGVyTWVudUNvbnRhaW5lci5hcHBlbmQoY2xvbmVkQmxvY2tJbmZvKVxyXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWRTb2NpYWxOZXR3b3JrKVxyXG4gICAgICAgIHdyYXBwZXJNb2JTZWFyY2guYXBwZW5kKGNsb25lZFNlYXJjaClcclxuICAgICAgICB3cmFwcGVyTmF2Q29udGFpbmVyLnByZXBlbmQoY2xvbmVkTG9nbylcclxuXHJcbiAgICAgICAgbmF2LnJlbW92ZSgpXHJcbiAgICAgICAgYmxvY2tJbmZvLnJlbW92ZSgpXHJcbiAgICAgICAgc29jaWFsTmV0d29yay5yZW1vdmUoKVxyXG4gICAgICAgIHNlYXJjaC5yZW1vdmUoKVxyXG4gICAgICAgIGxvZ28ucmVtb3ZlKClcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZFdyYXBwZXJNZW51ID0gd3JhcHBlck1lbnUuY2xvbmVOb2RlKHRydWUpXHJcbiAgICAgICAgICAgIHdyYXBwZXJOYXYuYXBwZW5kKGNsb25lZFdyYXBwZXJNZW51KVxyXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5yZW1vdmUoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGJ0blNlYXJjaCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJidG4tc2VhcmNoXCJdJylcclxuICAgICAgICBjb25zdCBidG5NZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImJ0bi1tZW51XCJdJylcclxuXHJcbiAgICAgICAgYnRuU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1lbnVcIl0nKVxyXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgd3JhcHBlck1vYlNlYXJjaC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHdyYXBwZXJNb2JTZWFyY2guY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJNZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbWVudVwiXScpXHJcbiAgICAgICAgICAgIHdyYXBwZXJNZW51LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICBjb25zdCBpY29uID0gYnRuTWVudS5xdWVyeVNlbGVjdG9yKCd1c2UnKVxyXG4gICAgICAgICAgICBpZiAod3JhcHBlck1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnLCAnLi9hc3NldHMvaWNvbnMvc3ByaXRlLXN2Zy5zdmcjbWVudS1jbG9zZScpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgneGxpbms6aHJlZicsICcuL2Fzc2V0cy9pY29ucy9zcHJpdGUtc3ZnLnN2ZyNtZW51JylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xyXG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnLmhlYWRlcl9fbWVudS1ibG9jay1ib2R5LS1sYXN0JykpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1oZWFkZXI9XCJoZWFkXCJdJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwiaGVhZFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZy5oYXNBdHRyaWJ1dGUoJ2RhdGEtaGVhZGVyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBoZWFkLm5leHRFbGVtZW50U2libGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKVxyXG4gICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZGF0YS1oZWFkZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gaGVhZC5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZmxvYXRpbmdCbG9jaygpIHtcclxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xyXG4gICAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mbG9hdGluZy1ibG9jaz1cIm1haW5cIl0nKVxyXG5cclxuICAgICAgICBpZiAoIW1haW4pIHJldHVyblxyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0ID8gd2luZG93LnBhZ2VZT2Zmc2V0IDogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPj0gMTApIHtcclxuICAgICAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpeGVkSGVhZGVyKCkge1xyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiaGVhZGVyXCJdJylcclxuXHJcbiAgICBpZiAoIWhlYWRlcikgcmV0dXJuXHJcblxyXG4gICAgbGV0IGZpeGVkQ2xhc3NcclxuXHJcbiAgICB3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcyA/IGZpeGVkQ2xhc3MgPSAnaGVhZGVyLS1maXhlZCcgOiBmaXhlZENsYXNzID0gJ2hlYWRlci0tZml4ZWQtbW9iJ1xyXG5cclxuICAgIGNvbnN0IGxvZ2ljID0gKHNjcm9sbGVkKSA9PiB7XHJcbiAgICAgICAgaWYgKHNjcm9sbGVkID49IDEwKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGZpeGVkQ2xhc3MpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoZml4ZWRDbGFzcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9naWMod2luZG93LnBhZ2VZT2Zmc2V0KVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG5cclxuICAgICAgICBsb2dpYyhzY3JvbGxlZClcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZm9CYXIoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcclxuXHJcbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpICYmIGVsLmNsb3Nlc3QoJ1tkYXRhLWluZm8tYmFyPVwiYnRuLWNsb3NlXCJdJykpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5mb0JhciA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpXHJcbiAgICAgICAgICAgIGluZm9CYXIuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGFnZT1cInBhZ2VcIl0nKVxyXG4gICAgICAgICAgICBpZiAocGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ21haW4tcGFnZScpKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlLnN0eWxlLm1hcmdpblRvcCA9ICcxNjhweCdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gJzIzMHB4J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA1NzZweClcIikubWF0Y2hlcykge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4gbWFpbi5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJykpXHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wYWdlPVwicGFnZVwiXScpXHJcbiAgICAgICAgICAgIGlmIChwYWdlLmNsYXNzTGlzdC5jb250YWlucygnbWFpbi1wYWdlJykpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gJzE2OHB4J1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMjMwcHgnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwMClcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2xpZGVyQ2FyZHNNb2IoKSB7XHJcbiAgICBjb25zdCBzbGlkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDU3NnB4KVwiKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgc2xpZGVycy5mb3JFYWNoKGl0ZW1TbGlkZXIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzbGlkZXIgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHMtbW9iPVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0bk5leHQgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0blByZXYgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJidG4tcHJldlwiXScpXHJcblxyXG4gICAgICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNsaWRlckNhcmRzKCkge1xyXG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1jYXJkcz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxyXG5cclxuXHJcbiAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcz1cInBhZ2luYXRpb25cIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcz1cImJ0bi1uZXh0XCJdJylcclxuICAgICAgICBjb25zdCBidG5QcmV2ID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgbnVtYmVyTGluZXMgPSBzbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1jYXJkcy1saW5lcycpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA5OTI6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBudW1iZXJMaW5lcyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IG51bWJlckxpbmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBhdHZSZW50YWwoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWF0di1yZW50YWw9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWF0di1yZW50YWw9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWF0di1yZW50YWw9XCJwYWdpbmF0aW9uXCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hdHYtcmVudGFsPVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWF0di1yZW50YWw9XCJidG4tcHJldlwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA5OTI6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRhYnMoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBsaXMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJsaVwiXScpXHJcblxyXG4gICAgICAgIGxpcy5mb3JFYWNoKChsaSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtaW5kZXgnLCBpbmRleClcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibWFpblwiXScpKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtYWluID0gZWwuY2xvc2VzdCgnW2RhdGEtdGFicz1cIm1haW5cIl0nKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVtb3ZlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwibGlcIl0nKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFicyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicz1cInRhYlwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgbGlzLmZvckVhY2goKGxpLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFic1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibGlcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibGlcIl0nKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy1pbmRleCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwidGFiXCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWxpLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmUoKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFic1tpbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZhcSgpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmFxPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FyZHMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZhcT1cImNhcmRcIl0nKVxyXG5cclxuICAgICAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkID0gY2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJoZWFkXCJdJylcclxuICAgICAgICAgICAgY29uc3QgYm9keSA9IGNhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiYm9keVwiXScpXHJcblxyXG4gICAgICAgICAgICBzbW9vdGhWaWV3KGhlYWQsIGJvZHkpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNsaWRlclJhbmdlKCkge1xyXG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1yYW5nZT1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIHNsaWRlcnMuZm9yRWFjaChpdGVtU2xpZGVyID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1yYW5nZT1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAraXRlbVNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLXJhbmdlLXN0YXJ0JylcclxuICAgICAgICBjb25zdCBtaW4gPSAraXRlbVNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLXJhbmdlLW1pbicpXHJcbiAgICAgICAgY29uc3QgbWF4ID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1tYXgnKVxyXG5cclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBjb25uZWN0OiAnbG93ZXInLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgJ21pbic6IFttaW5dLFxyXG4gICAgICAgICAgICAgICAgJ21heCc6IFttYXhdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvdW50ZXIoKSB7XHJcbiAgICBjb25zdCBwYXJlbnRCbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb3VudGVyPVwiY291bnRlclwiXWApXHJcbiAgICBpZiAoIXBhcmVudEJsb2Nrcy5sZW5ndGgpIHJldHVyblxyXG4gICAgcGFyZW50QmxvY2tzLmZvckVhY2goZWxlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVtb3ZlID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyPVwicmVtb3ZlXCJdJylcclxuICAgICAgICBjb25zdCBhZGQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvdW50ZXI9XCJhZGRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyPVwiaW5wdXRcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBtYXggPSAraW5wdXQuZ2V0QXR0cmlidXRlKCdtYXgnKVxyXG4gICAgICAgIGNvbnN0IG1pbiA9ICtpbnB1dC5nZXRBdHRyaWJ1dGUoJ21pbicpXHJcblxyXG4gICAgICAgIGNvbnN0IHZhbGlkSW5wdXQgPSAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9ICt2YWx1ZVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgaW5wdXRWYWx1ZSA8PSBtaW46XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBtaW5cclxuICAgICAgICAgICAgICAgICAgICByZW1vdmUuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIGlucHV0VmFsdWUgPj0gbWF4OlxyXG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gbWF4XHJcbiAgICAgICAgICAgICAgICAgICAgYWRkLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmUucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YWxpZElucHV0KGlucHV0LnZhbHVlKVxyXG5cclxuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0LnZhbHVlKVxyXG4gICAgICAgICAgICB2YWxpZElucHV0KGlucHV0LnZhbHVlKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGFkZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaW5wdXQudmFsdWUrK1xyXG4gICAgICAgICAgICB2YWxpZElucHV0KGlucHV0LnZhbHVlKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaW5wdXQudmFsdWUtLVxyXG4gICAgICAgICAgICB2YWxpZElucHV0KGlucHV0LnZhbHVlKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjZXJ0aWZpY2F0ZXMoKSB7XHJcbiAgICBjb25zdCBjZXJ0aWZpY2F0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIWNlcnRpZmljYXRlcy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1vZGFsUGljdHVyZShjZXJ0aWZpY2F0ZXMpXHJcblxyXG4gICAgY2VydGlmaWNhdGVzLmZvckVhY2goY2VydGlmaWNhdGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IGNlcnRpZmljYXRlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlcnRpZmljYXRlcz1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IGNlcnRpZmljYXRlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlcnRpZmljYXRlcz1cInBhZ2luYXRpb25cIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IGNlcnRpZmljYXRlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlcnRpZmljYXRlcz1cImJ0bi1wcmV2XCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4zLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDUsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA5OTI6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzMsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNzY3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuNSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNwZWNpYWxpc3RDYXJkKCkge1xyXG4gICAgY29uc3Qgc3BlY2lhbGlzdENhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFzcGVjaWFsaXN0Q2FyZHMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBzcGVjaWFsaXN0Q2FyZHMuZm9yRWFjaChzcGVjaWFsaXN0Q2FyZCA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyU3BlY2lhbGlzdHMgPSBzcGVjaWFsaXN0Q2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJzbGlkZXItc3BlY2lhbGlzdHNcIl0nKVxyXG4gICAgICAgIGNvbnN0IHNsaWRlckluZm9TcGVjaWFsaXN0cyA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cInNsaWRlci1pbmZvLXNwZWNpYWxpc3RzXCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gc3BlY2lhbGlzdENhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBzcGVjaWFsaXN0Q2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJidG4tcHJldlwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlclNwZWNpYWxpc3RzID0gbmV3IFN3aXBlcihzbGlkZXJTcGVjaWFsaXN0cywge1xyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVySW5mb1NwZWNpYWxpc3RzID0gbmV3IFN3aXBlcihzbGlkZXJJbmZvU3BlY2lhbGlzdHMsIHtcclxuICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBlZmZlY3Q6IFwiZmFkZVwiLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHN3aXBlckluZm9TcGVjaWFsaXN0cy5jb250cm9sbGVyLmNvbnRyb2wgPSBzd2lwZXJTcGVjaWFsaXN0c1xyXG4gICAgICAgIHN3aXBlclNwZWNpYWxpc3RzLmNvbnRyb2xsZXIuY29udHJvbCA9IHN3aXBlckluZm9TcGVjaWFsaXN0c1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZmVlZGJhY2soKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZlZWRiYWNrPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mZWVkYmFjaz1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJwYWdpbmF0aW9uXCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA0MCxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gb3JkZXJXb3JrKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vcmRlci13b3JrPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci13b3JrPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBoZWlnaHRTbGlkZXIgPSBzbGlkZXIub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW9yZGVyLXdvcms9XCJzbGlkZXJcIl0gLnN3aXBlci1zbGlkZScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItd29yaz1cImJ0bi1uZXh0XCJdJylcclxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci13b3JrPVwiYnRuLXByZXZcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJwYWdpbmF0aW9uXCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDcyLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4gc2xpZGUuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0U2xpZGVyfXB4YClcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbnRhY3RzKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb250YWN0cz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IGJsb2Nrc0luZm8gPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbnRhY3RzPVwiYmxvY2staW5mb1wiXScpXHJcblxyXG4gICAgICAgIGJsb2Nrc0luZm8uZm9yRWFjaChibG9ja0luZm8gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkID0gYmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnRhY3RzPVwiaGVhZFwiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtY29udGFjdHM9XCJib2R5XCJdJylcclxuXHJcbiAgICAgICAgICAgIHNtb290aFZpZXcoaGVhZCwgYm9keSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2VsZWN0KCkge1xyXG4gICAgY29uc3Qgc2VsZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlbGVjdD1cInNlbGVjdFwiXScpXHJcblxyXG4gICAgaWYgKCFzZWxlY3RzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgaGlkZUFsbCA9ICgpID0+IHtcclxuICAgICAgICBzZWxlY3RzLmZvckVhY2goZWxTZWxlY3QgPT4ge1xyXG4gICAgICAgICAgICBlbFNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxyXG5cclxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0PVwic2VsZWN0XCJdJykpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ID0gZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0PVwic2VsZWN0XCJdJylcclxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignW2RhdGEtc2VsZWN0PVwidGl0bGVcIl0nKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVtb3ZlQ2xhc3NTZWxlY3RlZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtcyA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGknKVxyXG5cclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtcy5mb3JFYWNoKGxpc3RJdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RfX2xpLS1zZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0PVwiYmxvY2stdGl0bGVcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0cy5mb3JFYWNoKGVsU2VsZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWxTZWxlY3QgIT09IHNlbGVjdCkgZWxTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGkgc3BhbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImxpc3RcIl0gPiBsaScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0TGkgPSBlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGkgPiBzcGFuJylcclxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzU2VsZWN0ZWQoKVxyXG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0X19saS0tc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlDb250ZW50ID0gdGV4dExpLnRleHRDb250ZW50XHJcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGxpQ29udGVudFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3QtdmFsdWUnLCBsaUNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhpZGVBbGwoKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGV4YW1wbGVzV29ya3MoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJwYWdpbmF0aW9uXCJdJylcclxuICAgICAgICBsZXQgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgbGV0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwiYnRuLW5leHRcIl0nKVxyXG5cclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTc2cHgpXCIpLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmF2SW5mbyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJuYXYtaW5mb1wiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZCA9IG5hdkluZm8uY2xvbmVOb2RlKHRydWUpXHJcbiAgICAgICAgICAgIHNsaWRlci5iZWZvcmUoY2xvbmVkKVxyXG4gICAgICAgICAgICBuYXZJbmZvLnJlbW92ZSgpXHJcblxyXG4gICAgICAgICAgICBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImJ0bi1wcmV2XCJdJylcclxuICAgICAgICAgICAgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS41LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuMyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLnRleHRDb250ZW50XHJcbiAgICAgICAgY29uc3Qgc3dpcGVyUGFnaW5hdGlvblRvdGFsID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tdG90YWwnKS50ZXh0Q29udGVudFxyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyU2xpZGUgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwiY3VycmVudC1udW1iZXItc2xpZGVcIl0nKVxyXG4gICAgICAgIGNvbnN0IGFsbFF1YW50aXR5U2xpZGVzID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImFsbC1xdWFudGl0eS1zbGlkZXNcIl0nKVxyXG5cclxuICAgICAgICBhbGxRdWFudGl0eVNsaWRlcy50ZXh0Q29udGVudCA9IHN3aXBlclBhZ2luYXRpb25Ub3RhbFxyXG4gICAgICAgIGN1cnJlbnROdW1iZXJTbGlkZS50ZXh0Q29udGVudCA9IHN3aXBlclBhZ2luYXRpb25DdXJyZW50XHJcblxyXG5cclxuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvblJlY29yZHMgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnKS50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICBjdXJyZW50TnVtYmVyU2xpZGUudGV4dENvbnRlbnQgPSBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLCB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJlc3RXb3JrcygpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYmVzdC13b3Jrcz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RDYXJkKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9qZWN0LWNhcmQ9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxyXG59XHJcblxyXG5mdW5jdGlvbiBiaWdSZXBhaXJDYXJkKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cInBhZ2luYXRpb25cIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cImJ0bi1wcmV2XCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJidG4tbmV4dFwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvb2x0aXAoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvb2x0aXA9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxyXG5cclxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtdG9vbHRpcD1cIm1haW5cIl0nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBtYWluID0gZWwuY2xvc2VzdCgnW2RhdGEtdG9vbHRpcD1cIm1haW5cIl0nKVxyXG4gICAgICAgICAgICBjb25zdCB0b29sdGlwID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b29sdGlwPVwidG9vbHRpcFwiXScpXHJcblxyXG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtdG9vbHRpcD1cImJ0bi1jbG9zZVwiXScpKSB7XHJcbiAgICAgICAgICAgICAgICB0b29sdGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYWlucy5mb3JFYWNoKGl0ZW1NYWluID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbU1haW4gIT09IG1haW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdG9vbHRpcCA9IGl0ZW1NYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvb2x0aXA9XCJ0b29sdGlwXCJdJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWFpbnMuZm9yRWFjaChpdGVtTWFpbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b29sdGlwID0gaXRlbU1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdG9vbHRpcD1cInRvb2x0aXBcIl0nKVxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXJTZXJ2aWNlcygpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cInBhZ2luYXRpb25cIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1uZXh0XCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDk5Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMuMixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBibG9ja1RhZ3MgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJibG9jay10YWdzXCJdJylcclxuXHJcbiAgICAgICAgaWYgKGJsb2NrVGFncykge1xyXG4gICAgICAgICAgICBjb25zdCBidG5Nb3JlVGFncyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1tb3JlLXRhZ3NcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCBidG5Nb3JlVGFnc1RleHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJidG4tbW9yZS10YWdzLXRleHRcIl0nKVxyXG5cclxuICAgICAgICAgICAgYnRuTW9yZVRhZ3MuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBibG9ja1RhZ3MuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoYmxvY2tUYWdzLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBidG5Nb3JlVGFncy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtbW9yZScpXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3NUZXh0LnRleHRDb250ZW50ID0gJ9Ch0LLQtdGA0L3Rg9GC0YwnXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bk1vcmVUYWdzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1tb3JlJylcclxuICAgICAgICAgICAgICAgICAgICBidG5Nb3JlVGFnc1RleHQudGV4dENvbnRlbnQgPSAn0J/QvtC60LDQt9Cw0YLRjCDQstGB0LUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gd2FyZWhvdXNlKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS13YXJlaG91c2U9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS13YXJlaG91c2U9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdhcmVob3VzZT1cInBhZ2luYXRpb25cIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdhcmVob3VzZT1cImJ0bi1wcmV2XCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS13YXJlaG91c2U9XCJidG4tbmV4dFwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuNSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA0LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4yLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLjIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDgsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGd1YXJhbnRlZXMoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWd1YXJhbnRlZXM9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ndWFyYW50ZWVzPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ndWFyYW50ZWVzPVwicGFnaW5hdGlvblwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc2NvdW50KCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaXNjb3VudD1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc2NvdW50PVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJidG4tcHJldlwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNCxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgcm93czogMixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDEyMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LjUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNC41LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMuNSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1NzY6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjUsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gdmlkZW9TbGlkZXIoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvLXNsaWRlcj1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1zbGlkZXI9XCJwYWdpbmF0aW9uXCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1zbGlkZXI9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwiYnRuLXByZXZcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMuNCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBsYXJnZVNlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWxhcmdlLXNlY3Rpb249XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3QgYmxvY2tzU2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1sYXJnZS1zZWN0aW9uPVwiYmxvY2stc2xpZGVyXCJdJylcclxuXHJcbiAgICAgICAgaWYgKGJsb2Nrc1NsaWRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYmxvY2tzU2xpZGVyLmZvckVhY2goYmxvY2tTbGlkZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVyID0gYmxvY2tTbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGFyZ2Utc2VjdGlvbj1cInNsaWRlclwiXScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBidG5OZXh0ID0gYmxvY2tTbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGFyZ2Utc2VjdGlvbj1cImJ0bi1uZXh0XCJdJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0blByZXYgPSBibG9ja1NsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1sYXJnZS1zZWN0aW9uPVwiYnRuLXByZXZcIl0nKVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcXVpeigpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcXVpej1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHBlcmZvcm1hbmNlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwicGVyZm9ybWFuY2VcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blN0YXJ0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLXN0YXJ0XCJdJylcclxuICAgICAgICBjb25zdCBxdWl6ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwicXVpelwiXScpXHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcXVpej1cInBhZ2luYXRpb25cIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gc3dpcGVyTWFpbi5zbGlkZVRvKGluZGV4LCA0MDAsIHRydWUpXHJcblxyXG4gICAgICAgIGJ0blN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIHF1aXouY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1zbGlkZScpXHJcblxyXG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmFkaW9zID0gc2xpZGUucXVlcnlTZWxlY3RvckFsbCgnLnJhZGlvJylcclxuXHJcbiAgICAgICAgICAgIHJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcclxuICAgICAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvcy5mb3JFYWNoKHJhZGlvMiA9PiByYWRpbzIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgbmF2TGlzdCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcXVpej1cIm5hdi1saXN0XCJdJylcclxuICAgICAgICBjb25zdCBjb3V0U2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItc2xpZGUnKVxyXG5cclxuICAgICAgICBpZiAoY291dFNsaWRlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291dFNsaWRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0RWxlbVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVsZW0gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RWxlbSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuYXZMaXN0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInF1aXpfX3NsaWRlci1uYXYtbGkgJHtmaXJzdEVsZW0gPyAnYWN0aXZlLWN1cnJlbnQnIDogJyd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdWl6X19zbGlkZXItbmF2LWxpLWNvbnRlbnRcIj4ke2l9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIGApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ID0gK3BhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnKS50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICBjb25zdCBuYXZMaXN0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwibmF2LWxpc3RcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBuYXZMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcclxuICAgICAgICAgICAgbGlzdEl0ZW1zLmZvckVhY2goKGxpc3RJdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBpbmRleCArIDFcclxuICAgICAgICAgICAgICAgIGlmIChuZXdJbmRleCA8IHN3aXBlclBhZ2luYXRpb25DdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlLXBhc3NlZCcpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1wYXNzZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1jdXJyZW50JylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmV3SW5kZXggPT09IHN3aXBlclBhZ2luYXRpb25DdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlLWN1cnJlbnQnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLCB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByaWNlc1R5cGVXb3JrKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcmljZXMtdHlwZS13b3JrPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgd3JhcHBlclRhYmxlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmljZXMtdHlwZS13b3JrPVwid3JhcHBlci10YWJsZVwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTW9yZSA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJpY2VzLXR5cGUtd29yaz1cImJ0bi1tb3JlXCJdJylcclxuXHJcbiAgICAgICAgYnRuTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgd3JhcHBlclRhYmxlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIGJ0bk1vcmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXZpZXdzKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXZpZXdzPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlclJldmlld3MgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJ3cmFwcGVyLXJldmlld3NcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCBidG5Nb3JlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiYnRuLW1vcmVcIl0nKVxyXG5cclxuICAgICAgICAgICAgYnRuTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXJSZXZpZXdzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICBidG5Nb3JlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zdCB3cmFwSW5uZXJSZXZpZXdzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXZpZXdzPVwid3JhcC1pbm5lci1yZXZpZXdzXCJdJylcclxuXHJcbiAgICAgICAgICAgIHdyYXBJbm5lclJldmlld3MuZm9yRWFjaCh3cmFwSW5uZXJSZXZpZXcgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5uZXJSZXZpZXdzID0gd3JhcElubmVyUmV2aWV3LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJpbm5lci1yZXZpZXdzXCJdJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0bkNvbHVtbk1vcmUgPSB3cmFwSW5uZXJSZXZpZXcucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cImJ0bi1jb2x1bW4tbW9yZVwiXScpXHJcblxyXG4gICAgICAgICAgICAgICAgYnRuQ29sdW1uTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpbm5lclJldmlld3MuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICBidG5Db2x1bW5Nb3JlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gdmlkZW8oKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlbz1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW89XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW89XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW89XCJwYWdpbmF0aW9uXCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiB0ZWNobmljKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10ZWNobmljPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZWNobmljPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZWNobmljPVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRlY2huaWM9XCJidG4tcHJldlwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc1ByaWNlVGFibGUoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXMtcHJpY2UtdGFibGU9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBzZWNvbmRhcnlUYWJsZSA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcy1wcmljZS10YWJsZT1cInNlY29uZGFyeS10YWJsZVwiXScpXHJcbiAgICAgICAgY29uc3QgaXRlbXNUYWJsZSA9IHNlY29uZGFyeVRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJylcclxuICAgICAgICBjb25zdCBidG5Nb3JlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zLXByaWNlLXRhYmxlPVwiYnRuLW1vcmVcIl0nKVxyXG5cclxuICAgICAgICBpZiAoaXRlbXNUYWJsZS5sZW5ndGggPiA1KSB7XHJcbiAgICAgICAgICAgIGJ0bk1vcmUuc3R5bGUuZGlzcGxheSA9ICdncmlkJ1xyXG4gICAgICAgICAgICBzZWNvbmRhcnlUYWJsZS5jbGFzc0xpc3QuYWRkKCdzZWNvbmRhcnktdGFibGUtLWhpZGRlbicpXHJcblxyXG4gICAgICAgICAgICBpdGVtc1RhYmxlLmZvckVhY2goKGl0ZW1UYWJsZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtVGFibGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgYnRuTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bk1vcmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGFibGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgICAgICBpdGVtc1RhYmxlLmZvckVhY2goKGl0ZW1UYWJsZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UYWJsZS5zdHlsZS5kaXNwbGF5ID0gJ2dyaWQnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXBhaXJDb3N0KCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXBhaXItY29zdD1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcmVwYWlyLWNvc3Q9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcGFpci1jb3N0PVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcGFpci1jb3N0PVwiYnRuLXByZXZcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcGFpci1jb3N0PVwicGFnaW5hdGlvblwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5oZWFkZXIoKVxyXG5mbG9hdGluZ0Jsb2NrKClcclxuZml4ZWRIZWFkZXIoKVxyXG5pbmZvQmFyKClcclxuc2xpZGVyQ2FyZHNNb2IoKVxyXG5zbGlkZXJDYXJkcygpXHJcbnRhYnMoKVxyXG5mYXEoKVxyXG5zbGlkZXJSYW5nZSgpXHJcbmNvdW50ZXIoKVxyXG5jZXJ0aWZpY2F0ZXMoKVxyXG5zcGVjaWFsaXN0Q2FyZCgpXHJcbmZlZWRiYWNrKClcclxub3JkZXJXb3JrKClcclxuY29udGFjdHMoKVxyXG5zZWxlY3QoKVxyXG5leGFtcGxlc1dvcmtzKClcclxuYmVzdFdvcmtzKClcclxucHJvamVjdENhcmQoKVxyXG5iaWdSZXBhaXJDYXJkKClcclxudG9vbHRpcCgpXHJcbnBvcHVsYXJTZXJ2aWNlcygpXHJcbndhcmVob3VzZSgpXHJcbmd1YXJhbnRlZXMoKVxyXG5kaXNjb3VudCgpXHJcbnZpZGVvU2xpZGVyKClcclxubGFyZ2VTZWN0aW9uKClcclxucXVpeigpXHJcbnByaWNlc1R5cGVXb3JrKClcclxucmV2aWV3cygpXHJcbm1vZGFsKClcclxucGhvbmVNYXNrKClcclxudmlkZW8oKVxyXG50ZWNobmljKClcclxuYXR2UmVudGFsKClcclxuc1ByaWNlVGFibGUoKVxyXG5yZXBhaXJDb3N0KCkiXSwiZmlsZSI6Im1haW4uanMifQ==