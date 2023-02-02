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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XG5cbiAgICBpZiAoIWJ0biAmJiAhZWwpIHJldHVyblxuXG4gICAgbGV0IGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XG5cbiAgICBjb25zdCBhZGQgPSAoKSA9PiB7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgIH1cblxuICAgIGlmIChidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICByZW1vdmUoKVxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHRFbH1weGBcbiAgICB9IGVsc2Uge1xuICAgICAgICBhZGQoKVxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtzdGFydEhlaWdodH1weGBcbiAgICB9XG5cbiAgICBpZiAoc3RhcnRIZWlnaHQgPiAwKSB7XG4gICAgICAgIGlmIChoZWlnaHRFbCA8IHN0YXJ0SGVpZ2h0KSB7XG4gICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9ICdhdXRvJ1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHRFbH1weGBcbiAgICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygnbm90LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGQoKVxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25SZWNvcmRzID0+IHtcbiAgICAgICAgdXBkYXRlKClcbiAgICB9KVxuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCwge1xuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgIGNoYXJhY3RlckRhdGFPbGRWYWx1ZTogdHJ1ZVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIG1vZGFsKCkge1xuICAgIHJldHVybiBuZXcgSHlzdE1vZGFsKHtcbiAgICAgICAgbGlua0F0dHJpYnV0ZU5hbWU6IFwiZGF0YS1oeXN0bW9kYWxcIixcbiAgICAgICAgd2FpdFRyYW5zaXRpb25zOiB0cnVlLFxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHBob25lTWFzaygpIHtcbiAgICBjb25zdCBwaG9uZU1hc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGhvbmUtbWFza10nKVxuXG4gICAgaWYgKCFwaG9uZU1hc2tzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBwaG9uZU1hc2tzLmZvckVhY2gocGhvbmVNYXNrID0+IHtcbiAgICAgICAgSU1hc2socGhvbmVNYXNrLCB7XG4gICAgICAgICAgICBtYXNrOiAnK3s3fSgwMDApMDAwLTAwLTAwJ1xuICAgICAgICB9XG4gICAgICAgIClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBtb2RhbFBpY3R1cmUoYmxvY2tQaWN0dXJlcykge1xuXG4gICAgaWYgKCFibG9ja1BpY3R1cmVzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBsZXQgYnAgPSBCaWdnZXJQaWN0dXJlKHtcbiAgICAgICAgdGFyZ2V0OiBkb2N1bWVudC5ib2R5LFxuICAgIH0pXG5cbiAgICBjb25zdCBvcGVuR2FsbGVyeSA9IChldmVudCwgcGljdHVyZXMpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICBicC5vcGVuKHtcbiAgICAgICAgICAgIGl0ZW1zOiBwaWN0dXJlcyxcbiAgICAgICAgICAgIGVsOiBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGJsb2NrUGljdHVyZXMuZm9yRWFjaChibG9ja1BpY3R1cmUgPT4ge1xuICAgICAgICBjb25zdCBwaWN0dXJlcyA9IGJsb2NrUGljdHVyZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1waWN0dXJlPVwibWFpblwiXSBhW2RhdGEtbW9kYWwtcGljdHVyZT1cImxpbmtcIl0nKVxuXG4gICAgICAgIGlmIChwaWN0dXJlcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgcGljdHVyZXMuZm9yRWFjaChwaWN0dXJlID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZSA9IHBpY3R1cmUucXVlcnlTZWxlY3RvcignaW1nJylcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZVNvdXJjZSA9IGltYWdlLmdldEF0dHJpYnV0ZSgnc3JjJylcbiAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxuXG4gICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLndpZHRoXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpZ2h0ID0gdGhpcy5oZWlnaHRcblxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlLnNldEF0dHJpYnV0ZSgnZGF0YS1oZWlnaHQnLCBoaWdodCAqIDQpXG4gICAgICAgICAgICAgICAgICAgIHBpY3R1cmUuc2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJywgd2lkdGggKiA0KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBpbWFnZVNvdXJjZTtcblxuICAgICAgICAgICAgICAgIHBpY3R1cmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBvcGVuR2FsbGVyeShldmVudCwgcGljdHVyZXMpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBoZWFkZXIoKSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiaGVhZGVyXCJdJylcblxuICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgIC8vIGNvbnN0IGhlaWdodEhlYWRlciA9IGhlYWRlci5vZmZzZXRIZWlnaHRcbiAgICAvLyBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGFnZT1cInBhZ2VcIl0nKVxuXG4gICAgLy8gaWYgKHBhZ2UpIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gYCR7aGVpZ2h0SGVhZGVyfXB4YFxuXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogMTIwMHB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIGNvbnN0IHdyYXBwZXJNb2JTZWFyY2ggPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1tb2Itc2VhcmNoXCJdJylcbiAgICAgICAgY29uc3Qgd3JhcHBlck1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1tZW51XCJdJylcbiAgICAgICAgY29uc3Qgd3JhcHBlck1lbnVDb250YWluZXIgPSB3cmFwcGVyTWVudS5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250YWluZXInKVxuICAgICAgICBjb25zdCB3cmFwcGVyTmF2ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbmF2XCJdJylcbiAgICAgICAgY29uc3Qgd3JhcHBlck5hdkNvbnRhaW5lciA9IHdyYXBwZXJOYXYucXVlcnlTZWxlY3RvcignLm1haW4tY29udGFpbmVyJylcbiAgICAgICAgY29uc3QgbmF2ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIm5hdlwiXScpXG4gICAgICAgIGNvbnN0IGJsb2NrSW5mbyA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJibG9jay1pbmZvXCJdJylcbiAgICAgICAgY29uc3Qgc29jaWFsTmV0d29yayA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJzb2NpYWwtbmV0d29ya1wiXScpXG4gICAgICAgIGNvbnN0IHNlYXJjaCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJzZWFyY2hcIl0nKVxuICAgICAgICBjb25zdCBsb2dvID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImxvZ29cIl0nKVxuXG4gICAgICAgIGNvbnN0IGNsb25lZE5hdiA9IG5hdi5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgICAgY29uc3QgY2xvbmVkQmxvY2tJbmZvID0gYmxvY2tJbmZvLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjb25zdCBjbG9uZWRTb2NpYWxOZXR3b3JrID0gc29jaWFsTmV0d29yay5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgICAgY29uc3QgY2xvbmVkU2VhcmNoID0gc2VhcmNoLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjb25zdCBjbG9uZWRMb2dvID0gbG9nby5jbG9uZU5vZGUodHJ1ZSlcblxuICAgICAgICB3cmFwcGVyTWVudUNvbnRhaW5lci5hcHBlbmQoY2xvbmVkTmF2KVxuICAgICAgICB3cmFwcGVyTWVudUNvbnRhaW5lci5hcHBlbmQoY2xvbmVkQmxvY2tJbmZvKVxuICAgICAgICB3cmFwcGVyTWVudUNvbnRhaW5lci5hcHBlbmQoY2xvbmVkU29jaWFsTmV0d29yaylcbiAgICAgICAgd3JhcHBlck1vYlNlYXJjaC5hcHBlbmQoY2xvbmVkU2VhcmNoKVxuICAgICAgICB3cmFwcGVyTmF2Q29udGFpbmVyLnByZXBlbmQoY2xvbmVkTG9nbylcblxuICAgICAgICBuYXYucmVtb3ZlKClcbiAgICAgICAgYmxvY2tJbmZvLnJlbW92ZSgpXG4gICAgICAgIHNvY2lhbE5ldHdvcmsucmVtb3ZlKClcbiAgICAgICAgc2VhcmNoLnJlbW92ZSgpXG4gICAgICAgIGxvZ28ucmVtb3ZlKClcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZFdyYXBwZXJNZW51ID0gd3JhcHBlck1lbnUuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgICAgICB3cmFwcGVyTmF2LmFwcGVuZChjbG9uZWRXcmFwcGVyTWVudSlcbiAgICAgICAgICAgIHdyYXBwZXJNZW51LnJlbW92ZSgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgYnRuU2VhcmNoID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImJ0bi1zZWFyY2hcIl0nKVxuICAgICAgICBjb25zdCBidG5NZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImJ0bi1tZW51XCJdJylcblxuICAgICAgICBidG5TZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1lbnVcIl0nKVxuICAgICAgICAgICAgd3JhcHBlck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcblxuICAgICAgICAgICAgd3JhcHBlck1vYlNlYXJjaC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgICAgICB9KVxuXG4gICAgICAgIGJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJNZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbWVudVwiXScpXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICBjb25zdCBpY29uID0gYnRuTWVudS5xdWVyeVNlbGVjdG9yKCd1c2UnKVxuICAgICAgICAgICAgaWYgKHdyYXBwZXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgneGxpbms6aHJlZicsICcuL2Fzc2V0cy9pY29ucy9zcHJpdGUtc3ZnLnN2ZyNtZW51LWNsb3NlJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnLCAnLi9hc3NldHMvaWNvbnMvc3ByaXRlLXN2Zy5zdmcjbWVudScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCcuaGVhZGVyX19tZW51LWJsb2NrLWJvZHktLWxhc3QnKSkge1xuICAgICAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1oZWFkZXI9XCJoZWFkXCJdJykpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKVxuICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZy5oYXNBdHRyaWJ1dGUoJ2RhdGEtaGVhZGVyJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gaGVhZC5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBlbC5jbG9zZXN0KCdbZGF0YS1oZWFkZXI9XCJoZWFkXCJdJylcbiAgICAgICAgICAgICAgICBpZiAoaGVhZC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZGF0YS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBmbG9hdGluZ0Jsb2NrKCkge1xuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xuICAgICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZmxvYXRpbmctYmxvY2s9XCJtYWluXCJdJylcblxuICAgICAgICBpZiAoIW1haW4pIHJldHVyblxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0ID8gd2luZG93LnBhZ2VZT2Zmc2V0IDogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgIGlmIChzY3JvbGxlZCA+PSAxMCkge1xuICAgICAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFpbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZml4ZWRIZWFkZXIoKSB7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiaGVhZGVyXCJdJylcblxuICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgIGxldCBmaXhlZENsYXNzXG5cbiAgICB3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcyA/IGZpeGVkQ2xhc3MgPSAnaGVhZGVyLS1maXhlZCcgOiBmaXhlZENsYXNzID0gJ2hlYWRlci0tZml4ZWQtbW9iJ1xuXG4gICAgY29uc3QgbG9naWMgPSAoc2Nyb2xsZWQpID0+IHtcbiAgICAgICAgaWYgKHNjcm9sbGVkID49IDEwKSB7XG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChmaXhlZENsYXNzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoZml4ZWRDbGFzcylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvZ2ljKHdpbmRvdy5wYWdlWU9mZnNldClcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcblxuICAgICAgICBsb2dpYyhzY3JvbGxlZClcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBpbmZvQmFyKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW5mby1iYXI9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XG5cbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpICYmIGVsLmNsb3Nlc3QoJ1tkYXRhLWluZm8tYmFyPVwiYnRuLWNsb3NlXCJdJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGluZm9CYXIgPSBlbC5jbG9zZXN0KCdbZGF0YS1pbmZvLWJhcj1cIm1haW5cIl0nKVxuICAgICAgICAgICAgaW5mb0Jhci5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcblxuICAgICAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBhZ2U9XCJwYWdlXCJdJylcbiAgICAgICAgICAgIGlmIChwYWdlLmNsYXNzTGlzdC5jb250YWlucygnbWFpbi1wYWdlJykpIHtcbiAgICAgICAgICAgICAgICBwYWdlLnN0eWxlLm1hcmdpblRvcCA9ICcxNjhweCdcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMjMwcHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTc2cHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4gbWFpbi5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJykpXG4gICAgICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGFnZT1cInBhZ2VcIl0nKVxuICAgICAgICAgICAgaWYgKHBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYWluLXBhZ2UnKSkge1xuICAgICAgICAgICAgICAgIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gJzE2OHB4J1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWdlLnN0eWxlLm1hcmdpblRvcCA9ICcyMzBweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwMDApXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzbGlkZXJDYXJkc01vYigpIHtcbiAgICBjb25zdCBzbGlkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA1NzZweClcIikubWF0Y2hlcykge1xuICAgICAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XG4gICAgICAgICAgICBjb25zdCBzbGlkZXIgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJzbGlkZXJcIl0nKVxuICAgICAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cInBhZ2luYXRpb25cIl0nKVxuICAgICAgICAgICAgY29uc3QgYnRuTmV4dCA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJ0blByZXYgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJidG4tcHJldlwiXScpXG5cbiAgICAgICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2xpZGVyQ2FyZHMoKSB7XG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1jYXJkcz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXG5cblxuICAgIHNsaWRlcnMuZm9yRWFjaChpdGVtU2xpZGVyID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IG51bWJlckxpbmVzID0gc2xpZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZXItY2FyZHMtbGluZXMnKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyTGluZXMsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njc6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyTGluZXMsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1NzY6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyTGluZXMsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGF0dlJlbnRhbCgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWF0di1yZW50YWw9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYXR2LXJlbnRhbD1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWF0di1yZW50YWw9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYXR2LXJlbnRhbD1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYXR2LXJlbnRhbD1cImJ0bi1wcmV2XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1NzY6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHRhYnMoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBsaXMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJsaVwiXScpXG5cbiAgICAgICAgbGlzLmZvckVhY2goKGxpLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtaW5kZXgnLCBpbmRleClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtdGFicz1cIm1haW5cIl0nKSkge1xuXG4gICAgICAgICAgICBjb25zdCBtYWluID0gZWwuY2xvc2VzdCgnW2RhdGEtdGFicz1cIm1haW5cIl0nKVxuXG4gICAgICAgICAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwibGlcIl0nKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYnMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJ0YWJcIl0nKVxuXG4gICAgICAgICAgICAgICAgbGlzLmZvckVhY2goKGxpLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB0YWJzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibGlcIl0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZWwuY2xvc2VzdCgnW2RhdGEtdGFicz1cImxpXCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJzLWluZGV4JylcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwidGFiXCJdJylcblxuICAgICAgICAgICAgICAgIGlmICghbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB0YWJzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZhcSgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZhcT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgY2FyZHMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZhcT1cImNhcmRcIl0nKVxuXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkID0gY2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJoZWFkXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImJvZHlcIl0nKVxuXG4gICAgICAgICAgICBzbW9vdGhWaWV3KGhlYWQsIGJvZHkpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2xpZGVyUmFuZ2UoKSB7XG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1yYW5nZT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLXJhbmdlPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAraXRlbVNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLXJhbmdlLXN0YXJ0JylcbiAgICAgICAgY29uc3QgbWluID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1taW4nKVxuICAgICAgICBjb25zdCBtYXggPSAraXRlbVNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLXJhbmdlLW1heCcpXG5cbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XG4gICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICBjb25uZWN0OiAnbG93ZXInLFxuICAgICAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICAgICAgICAnbWluJzogW21pbl0sXG4gICAgICAgICAgICAgICAgJ21heCc6IFttYXhdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNvdW50ZXIoKSB7XG4gICAgY29uc3QgcGFyZW50QmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY291bnRlcj1cImNvdW50ZXJcIl1gKVxuICAgIGlmICghcGFyZW50QmxvY2tzLmxlbmd0aCkgcmV0dXJuXG4gICAgcGFyZW50QmxvY2tzLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY291bnRlcj1cInJlbW92ZVwiXScpXG4gICAgICAgIGNvbnN0IGFkZCA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY291bnRlcj1cImFkZFwiXScpXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyPVwiaW5wdXRcIl0nKVxuXG4gICAgICAgIGNvbnN0IG1heCA9ICtpbnB1dC5nZXRBdHRyaWJ1dGUoJ21heCcpXG4gICAgICAgIGNvbnN0IG1pbiA9ICtpbnB1dC5nZXRBdHRyaWJ1dGUoJ21pbicpXG5cbiAgICAgICAgY29uc3QgdmFsaWRJbnB1dCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9ICt2YWx1ZVxuICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBpbnB1dFZhbHVlIDw9IG1pbjpcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBtaW5cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIGlucHV0VmFsdWUgPj0gbWF4OlxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IG1heFxuICAgICAgICAgICAgICAgICAgICBhZGQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZS5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICAgICAgICAgICAgICAgICAgYWRkLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFsaWRJbnB1dChpbnB1dC52YWx1ZSlcblxuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dC52YWx1ZSlcbiAgICAgICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgYWRkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgaW5wdXQudmFsdWUrK1xuICAgICAgICAgICAgdmFsaWRJbnB1dChpbnB1dC52YWx1ZSlcbiAgICAgICAgfSlcblxuICAgICAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZS0tXG4gICAgICAgICAgICB2YWxpZElucHV0KGlucHV0LnZhbHVlKVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNlcnRpZmljYXRlcygpIHtcbiAgICBjb25zdCBjZXJ0aWZpY2F0ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJtYWluXCJdJylcblxuICAgIGlmICghY2VydGlmaWNhdGVzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtb2RhbFBpY3R1cmUoY2VydGlmaWNhdGVzKVxuXG4gICAgY2VydGlmaWNhdGVzLmZvckVhY2goY2VydGlmaWNhdGUgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gY2VydGlmaWNhdGUucXVlcnlTZWxlY3RvcignW2RhdGEtY2VydGlmaWNhdGVzPVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJidG4tbmV4dFwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJidG4tcHJldlwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMyxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2Nzoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTc2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuNSxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc3BlY2lhbGlzdENhcmQoKSB7XG4gICAgY29uc3Qgc3BlY2lhbGlzdENhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwibWFpblwiXScpXG5cbiAgICBpZiAoIXNwZWNpYWxpc3RDYXJkcy5sZW5ndGgpIHJldHVyblxuXG4gICAgc3BlY2lhbGlzdENhcmRzLmZvckVhY2goc3BlY2lhbGlzdENhcmQgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXJTcGVjaWFsaXN0cyA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cInNsaWRlci1zcGVjaWFsaXN0c1wiXScpXG4gICAgICAgIGNvbnN0IHNsaWRlckluZm9TcGVjaWFsaXN0cyA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cInNsaWRlci1pbmZvLXNwZWNpYWxpc3RzXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cImJ0bi1wcmV2XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXJTcGVjaWFsaXN0cyA9IG5ldyBTd2lwZXIoc2xpZGVyU3BlY2lhbGlzdHMsIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBzd2lwZXJJbmZvU3BlY2lhbGlzdHMgPSBuZXcgU3dpcGVyKHNsaWRlckluZm9TcGVjaWFsaXN0cywge1xuICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxuICAgICAgICAgICAgZWZmZWN0OiBcImZhZGVcIixcbiAgICAgICAgfSlcblxuICAgICAgICBzd2lwZXJJbmZvU3BlY2lhbGlzdHMuY29udHJvbGxlci5jb250cm9sID0gc3dpcGVyU3BlY2lhbGlzdHNcbiAgICAgICAgc3dpcGVyU3BlY2lhbGlzdHMuY29udHJvbGxlci5jb250cm9sID0gc3dpcGVySW5mb1NwZWNpYWxpc3RzXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZmVlZGJhY2soKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mZWVkYmFjaz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mZWVkYmFjaz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZlZWRiYWNrPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mZWVkYmFjaz1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJwYWdpbmF0aW9uXCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA0MCxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIG9yZGVyV29yaygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW9yZGVyLXdvcms9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItd29yaz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGhlaWdodFNsaWRlciA9IHNsaWRlci5vZmZzZXRIZWlnaHRcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW9yZGVyLXdvcms9XCJzbGlkZXJcIl0gLnN3aXBlci1zbGlkZScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJidG4tbmV4dFwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJwYWdpbmF0aW9uXCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA3MixcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAxMjAwOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTc2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHRTbGlkZXJ9cHhgKVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGNvbnRhY3RzKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29udGFjdHM9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IGJsb2Nrc0luZm8gPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbnRhY3RzPVwiYmxvY2staW5mb1wiXScpXG5cbiAgICAgICAgYmxvY2tzSW5mby5mb3JFYWNoKGJsb2NrSW5mbyA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkID0gYmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnRhY3RzPVwiaGVhZFwiXScpXG4gICAgICAgICAgICBjb25zdCBib2R5ID0gYmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnRhY3RzPVwiYm9keVwiXScpXG5cbiAgICAgICAgICAgIHNtb290aFZpZXcoaGVhZCwgYm9keSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzZWxlY3QoKSB7XG4gICAgY29uc3Qgc2VsZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlbGVjdD1cInNlbGVjdFwiXScpXG5cbiAgICBpZiAoIXNlbGVjdHMubGVuZ3RoKSByZXR1cm5cblxuICAgIGNvbnN0IGhpZGVBbGwgPSAoKSA9PiB7XG4gICAgICAgIHNlbGVjdHMuZm9yRWFjaChlbFNlbGVjdCA9PiB7XG4gICAgICAgICAgICBlbFNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XG5cbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cInNlbGVjdFwiXScpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJzZWxlY3RcIl0nKVxuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBzZWxlY3QucXVlcnlTZWxlY3RvcignW2RhdGEtc2VsZWN0PVwidGl0bGVcIl0nKVxuXG4gICAgICAgICAgICBjb25zdCByZW1vdmVDbGFzc1NlbGVjdGVkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtcyA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGknKVxuXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1zLmZvckVhY2gobGlzdEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RfX2xpLS1zZWxlY3RlZCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImJsb2NrLXRpdGxlXCJdJykpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RzLmZvckVhY2goZWxTZWxlY3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxTZWxlY3QgIT09IHNlbGVjdCkgZWxTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGkgc3BhbicpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGknKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRMaSA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImxpc3RcIl0gPiBsaSA+IHNwYW4nKVxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzU2VsZWN0ZWQoKVxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdF9fbGktLXNlbGVjdGVkJylcbiAgICAgICAgICAgICAgICBjb25zdCBsaUNvbnRlbnQgPSB0ZXh0TGkudGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IGxpQ29udGVudFxuICAgICAgICAgICAgICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0LXZhbHVlJywgbGlDb250ZW50KVxuICAgICAgICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGlkZUFsbCgpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBleGFtcGxlc1dvcmtzKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cInBhZ2luYXRpb25cIl0nKVxuICAgICAgICBsZXQgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGxldCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImJ0bi1uZXh0XCJdJylcblxuXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDU3NnB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCBuYXZJbmZvID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cIm5hdi1pbmZvXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZCA9IG5hdkluZm8uY2xvbmVOb2RlKHRydWUpXG4gICAgICAgICAgICBzbGlkZXIuYmVmb3JlKGNsb25lZClcbiAgICAgICAgICAgIG5hdkluZm8ucmVtb3ZlKClcblxuICAgICAgICAgICAgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJidG4tcHJldlwiXScpXG4gICAgICAgICAgICBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgMTIwMDoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLnRleHRDb250ZW50XG4gICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25Ub3RhbCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLXRvdGFsJykudGV4dENvbnRlbnRcblxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyU2xpZGUgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwiY3VycmVudC1udW1iZXItc2xpZGVcIl0nKVxuICAgICAgICBjb25zdCBhbGxRdWFudGl0eVNsaWRlcyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJhbGwtcXVhbnRpdHktc2xpZGVzXCJdJylcblxuICAgICAgICBhbGxRdWFudGl0eVNsaWRlcy50ZXh0Q29udGVudCA9IHN3aXBlclBhZ2luYXRpb25Ub3RhbFxuICAgICAgICBjdXJyZW50TnVtYmVyU2xpZGUudGV4dENvbnRlbnQgPSBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudFxuXG5cbiAgICAgICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25SZWNvcmRzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLnRleHRDb250ZW50XG4gICAgICAgICAgICBjdXJyZW50TnVtYmVyU2xpZGUudGV4dENvbnRlbnQgPSBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudFxuICAgICAgICB9KVxuXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLCB7XG4gICAgICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiB0cnVlXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gYmVzdFdvcmtzKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYmVzdC13b3Jrcz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxufVxuXG5mdW5jdGlvbiBwcm9qZWN0Q2FyZCgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXByb2plY3QtY2FyZD1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxufVxuXG5mdW5jdGlvbiBiaWdSZXBhaXJDYXJkKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cInBhZ2luYXRpb25cIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cImJ0bi1uZXh0XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHRvb2x0aXAoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b29sdGlwPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxuXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10b29sdGlwPVwibWFpblwiXScpKSB7XG4gICAgICAgICAgICBjb25zdCBtYWluID0gZWwuY2xvc2VzdCgnW2RhdGEtdG9vbHRpcD1cIm1haW5cIl0nKVxuICAgICAgICAgICAgY29uc3QgdG9vbHRpcCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdG9vbHRpcD1cInRvb2x0aXBcIl0nKVxuXG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtdG9vbHRpcD1cImJ0bi1jbG9zZVwiXScpKSB7XG4gICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYWlucy5mb3JFYWNoKGl0ZW1NYWluID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1NYWluICE9PSBtYWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b29sdGlwID0gaXRlbU1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdG9vbHRpcD1cInRvb2x0aXBcIl0nKVxuICAgICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1haW5zLmZvckVhY2goaXRlbU1haW4gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvb2x0aXAgPSBpdGVtTWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b29sdGlwPVwidG9vbHRpcFwiXScpXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHBvcHVsYXJTZXJ2aWNlcygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1uZXh0XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMuMixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1NzY6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGJsb2NrVGFncyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJsb2NrLXRhZ3NcIl0nKVxuXG4gICAgICAgIGlmIChibG9ja1RhZ3MpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ0bk1vcmVUYWdzID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwiYnRuLW1vcmUtdGFnc1wiXScpXG4gICAgICAgICAgICBjb25zdCBidG5Nb3JlVGFnc1RleHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJidG4tbW9yZS10YWdzLXRleHRcIl0nKVxuXG4gICAgICAgICAgICBidG5Nb3JlVGFncy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBibG9ja1RhZ3MuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcblxuICAgICAgICAgICAgICAgIGlmIChibG9ja1RhZ3MuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICBidG5Nb3JlVGFncy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtbW9yZScpXG4gICAgICAgICAgICAgICAgICAgIGJ0bk1vcmVUYWdzVGV4dC50ZXh0Q29udGVudCA9ICfQodCy0LXRgNC90YPRgtGMJ1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ0bk1vcmVUYWdzLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1tb3JlJylcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3NUZXh0LnRleHRDb250ZW50ID0gJ9Cf0L7QutCw0LfQsNGC0Ywg0LLRgdC1J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiB3YXJlaG91c2UoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS13YXJlaG91c2U9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1vZGFsUGljdHVyZShtYWlucylcblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdhcmVob3VzZT1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwiYnRuLW5leHRcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjUsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDQsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMuMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTc2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZ3VhcmFudGVlcygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWd1YXJhbnRlZXM9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1vZGFsUGljdHVyZShtYWlucylcblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZ3VhcmFudGVlcz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWd1YXJhbnRlZXM9XCJwYWdpbmF0aW9uXCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBkaXNjb3VudCgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRpc2NvdW50PVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc2NvdW50PVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJidG4tbmV4dFwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc2NvdW50PVwiYnRuLXByZXZcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjQsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgcm93czogMixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDEyMDA6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNS41LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQuNSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLjUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1NzY6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi41LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB2aWRlb1NsaWRlcigpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvLXNsaWRlcj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1zbGlkZXI9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1zbGlkZXI9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1zbGlkZXI9XCJidG4tcHJldlwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDEyMDA6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy40LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDU3Njoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBsYXJnZVNlY3Rpb24oKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1sYXJnZS1zZWN0aW9uPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBibG9ja3NTbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWxhcmdlLXNlY3Rpb249XCJibG9jay1zbGlkZXJcIl0nKVxuXG4gICAgICAgIGlmIChibG9ja3NTbGlkZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICBibG9ja3NTbGlkZXIuZm9yRWFjaChibG9ja1NsaWRlciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVyID0gYmxvY2tTbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGFyZ2Utc2VjdGlvbj1cInNsaWRlclwiXScpXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuTmV4dCA9IGJsb2NrU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxhcmdlLXNlY3Rpb249XCJidG4tbmV4dFwiXScpXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuUHJldiA9IGJsb2NrU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxhcmdlLXNlY3Rpb249XCJidG4tcHJldlwiXScpXG5cbiAgICAgICAgICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBxdWl6KCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcXVpej1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgcGVyZm9ybWFuY2UgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJwZXJmb3JtYW5jZVwiXScpXG4gICAgICAgIGNvbnN0IGJ0blN0YXJ0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLXN0YXJ0XCJdJylcbiAgICAgICAgY29uc3QgcXVpeiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcXVpej1cInF1aXpcIl0nKVxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwicGFnaW5hdGlvblwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBzd2lwZXJNYWluLnNsaWRlVG8oaW5kZXgsIDQwMCwgdHJ1ZSlcblxuICAgICAgICBidG5TdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICBxdWl6LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItc2xpZGUnKVxuXG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJhZGlvcyA9IHNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYWRpbycpXG5cbiAgICAgICAgICAgIHJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcbiAgICAgICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zLmZvckVhY2gocmFkaW8yID0+IHJhZGlvMi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcbiAgICAgICAgICAgICAgICAgICAgcmFkaW8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBuYXZMaXN0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwibmF2LWxpc3RcIl0nKVxuICAgICAgICBjb25zdCBjb3V0U2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItc2xpZGUnKVxuXG4gICAgICAgIGlmIChjb3V0U2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291dFNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBmaXJzdEVsZW1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdEVsZW0gPSB0cnVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbGVtID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmF2TGlzdC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicXVpel9fc2xpZGVyLW5hdi1saSAke2ZpcnN0RWxlbSA/ICdhY3RpdmUtY3VycmVudCcgOiAnJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdWl6X19zbGlkZXItbmF2LWxpLWNvbnRlbnRcIj4ke2l9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgICAgICBjb25zdCBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCA9ICtwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JykudGV4dENvbnRlbnRcbiAgICAgICAgICAgIGNvbnN0IG5hdkxpc3QgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJuYXYtbGlzdFwiXScpXG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBuYXZMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAgICAgICAgIGxpc3RJdGVtcy5mb3JFYWNoKChsaXN0SXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IGluZGV4ICsgMVxuICAgICAgICAgICAgICAgIGlmIChuZXdJbmRleCA8IHN3aXBlclBhZ2luYXRpb25DdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1wYXNzZWQnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1wYXNzZWQnKVxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUtY3VycmVudCcpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0luZGV4ID09PSBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtY3VycmVudCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnKSwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGFPbGRWYWx1ZTogdHJ1ZVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHByaWNlc1R5cGVXb3JrKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJpY2VzLXR5cGUtd29yaz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgd3JhcHBlclRhYmxlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmljZXMtdHlwZS13b3JrPVwid3JhcHBlci10YWJsZVwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk1vcmUgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByaWNlcy10eXBlLXdvcms9XCJidG4tbW9yZVwiXScpXG5cbiAgICAgICAgYnRuTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHdyYXBwZXJUYWJsZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgYnRuTW9yZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcmV2aWV3cygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJldmlld3M9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDk5MnB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyUmV2aWV3cyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cIndyYXBwZXItcmV2aWV3c1wiXScpXG4gICAgICAgICAgICBjb25zdCBidG5Nb3JlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiYnRuLW1vcmVcIl0nKVxuXG4gICAgICAgICAgICBidG5Nb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHdyYXBwZXJSZXZpZXdzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgYnRuTW9yZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgd3JhcElubmVyUmV2aWV3cyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmV2aWV3cz1cIndyYXAtaW5uZXItcmV2aWV3c1wiXScpXG5cbiAgICAgICAgICAgIHdyYXBJbm5lclJldmlld3MuZm9yRWFjaCh3cmFwSW5uZXJSZXZpZXcgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlubmVyUmV2aWV3cyA9IHdyYXBJbm5lclJldmlldy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiaW5uZXItcmV2aWV3c1wiXScpXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuQ29sdW1uTW9yZSA9IHdyYXBJbm5lclJldmlldy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiYnRuLWNvbHVtbi1tb3JlXCJdJylcblxuICAgICAgICAgICAgICAgIGJ0bkNvbHVtbk1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlubmVyUmV2aWV3cy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBidG5Db2x1bW5Nb3JlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHZpZGVvKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmlkZW89XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW89XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlbz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW89XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvPVwicGFnaW5hdGlvblwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuMixcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB0ZWNobmljKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGVjaG5pYz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZWNobmljPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdGVjaG5pYz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdGVjaG5pYz1cImJ0bi1wcmV2XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjAsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDU3Njoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzUHJpY2VUYWJsZSgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXMtcHJpY2UtdGFibGU9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNlY29uZGFyeVRhYmxlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zLXByaWNlLXRhYmxlPVwic2Vjb25kYXJ5LXRhYmxlXCJdJylcbiAgICAgICAgY29uc3QgaXRlbXNUYWJsZSA9IHNlY29uZGFyeVRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RyJylcbiAgICAgICAgY29uc3QgYnRuTW9yZSA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcy1wcmljZS10YWJsZT1cImJ0bi1tb3JlXCJdJylcblxuICAgICAgICBpZiAoaXRlbXNUYWJsZS5sZW5ndGggPiA1KSB7XG4gICAgICAgICAgICBidG5Nb3JlLnN0eWxlLmRpc3BsYXkgPSAnZ3JpZCdcbiAgICAgICAgICAgIHNlY29uZGFyeVRhYmxlLmNsYXNzTGlzdC5hZGQoJ3NlY29uZGFyeS10YWJsZS0taGlkZGVuJylcblxuICAgICAgICAgICAgaXRlbXNUYWJsZS5mb3JFYWNoKChpdGVtVGFibGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID4gNSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtVGFibGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGJ0bk1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgYnRuTW9yZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgc2Vjb25kYXJ5VGFibGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcblxuICAgICAgICAgICAgICAgIGl0ZW1zVGFibGUuZm9yRWFjaCgoaXRlbVRhYmxlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiA1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVGFibGUuc3R5bGUuZGlzcGxheSA9ICdncmlkJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5oZWFkZXIoKVxuZmxvYXRpbmdCbG9jaygpXG5maXhlZEhlYWRlcigpXG5pbmZvQmFyKClcbnNsaWRlckNhcmRzTW9iKClcbnNsaWRlckNhcmRzKClcbnRhYnMoKVxuZmFxKClcbnNsaWRlclJhbmdlKClcbmNvdW50ZXIoKVxuY2VydGlmaWNhdGVzKClcbnNwZWNpYWxpc3RDYXJkKClcbmZlZWRiYWNrKClcbm9yZGVyV29yaygpXG5jb250YWN0cygpXG5zZWxlY3QoKVxuZXhhbXBsZXNXb3JrcygpXG5iZXN0V29ya3MoKVxucHJvamVjdENhcmQoKVxuYmlnUmVwYWlyQ2FyZCgpXG50b29sdGlwKClcbnBvcHVsYXJTZXJ2aWNlcygpXG53YXJlaG91c2UoKVxuZ3VhcmFudGVlcygpXG5kaXNjb3VudCgpXG52aWRlb1NsaWRlcigpXG5sYXJnZVNlY3Rpb24oKVxucXVpeigpXG5wcmljZXNUeXBlV29yaygpXG5yZXZpZXdzKClcbm1vZGFsKClcbnBob25lTWFzaygpXG52aWRlbygpXG50ZWNobmljKClcbmF0dlJlbnRhbCgpXG5zUHJpY2VUYWJsZSgpIl0sImZpbGUiOiJtYWluLmpzIn0=