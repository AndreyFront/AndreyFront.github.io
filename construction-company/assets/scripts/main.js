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

                img.onload = function() { 
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XHJcblxyXG4gICAgaWYgKCFidG4gJiYgIWVsKSByZXR1cm5cclxuICAgIFxyXG4gICAgbGV0IGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XHJcblxyXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIHJlbW92ZSgpXHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFkZCgpXHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xyXG4gICAgICAgIGlmIChoZWlnaHRFbCA8IHN0YXJ0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZSgpXHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxyXG4gICAgICAgIH0sIDEwMClcclxuICAgIH1cclxuXHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygnbm90LWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZSgpXHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFkZCgpXHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25SZWNvcmRzID0+IHtcclxuICAgICAgICB1cGRhdGUoKVxyXG4gICAgfSlcclxuICAgICAgICBcclxuICAgIG9ic2VydmVyLm9ic2VydmUoZWwsIHtcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsIFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiB0cnVlXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb2RhbCgpIHtcclxuICAgIHJldHVybiBuZXcgSHlzdE1vZGFsKHtcclxuICAgICAgICBsaW5rQXR0cmlidXRlTmFtZTogXCJkYXRhLWh5c3Rtb2RhbFwiLFxyXG4gICAgICAgIHdhaXRUcmFuc2l0aW9uczogdHJ1ZSxcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBob25lTWFzaygpIHtcclxuICAgIGNvbnN0IHBob25lTWFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1waG9uZS1tYXNrXScpXHJcblxyXG4gICAgaWYgKCFwaG9uZU1hc2tzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgcGhvbmVNYXNrcy5mb3JFYWNoKHBob25lTWFzayA9PiB7XHJcbiAgICAgICAgSU1hc2socGhvbmVNYXNrLCB7XHJcbiAgICAgICAgICAgICAgICBtYXNrOiAnK3s3fSgwMDApMDAwLTAwLTAwJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gbW9kYWxQaWN0dXJlKGJsb2NrUGljdHVyZXMpIHtcclxuXHJcbiAgICBpZiAoIWJsb2NrUGljdHVyZXMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBsZXQgYnAgPSBCaWdnZXJQaWN0dXJlKHtcclxuICAgICAgICB0YXJnZXQ6IGRvY3VtZW50LmJvZHksXHJcbiAgICB9KVxyXG5cclxuICAgIGNvbnN0IG9wZW5HYWxsZXJ5ID0gKGV2ZW50LCBwaWN0dXJlcykgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICBicC5vcGVuKHtcclxuICAgICAgICAgICAgaXRlbXM6IHBpY3R1cmVzLFxyXG4gICAgICAgICAgICBlbDogZXZlbnQuY3VycmVudFRhcmdldCxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGJsb2NrUGljdHVyZXMuZm9yRWFjaChibG9ja1BpY3R1cmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IHBpY3R1cmVzID0gYmxvY2tQaWN0dXJlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLXBpY3R1cmU9XCJtYWluXCJdIGFbZGF0YS1tb2RhbC1waWN0dXJlPVwibGlua1wiXScpXHJcblxyXG4gICAgICAgIGlmIChwaWN0dXJlcy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgIHBpY3R1cmVzLmZvckVhY2gocGljdHVyZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZSA9IHBpY3R1cmUucXVlcnlTZWxlY3RvcignaW1nJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlU291cmNlID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdzcmMnKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKClcclxuXHJcbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gdGhpcy53aWR0aFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpZ2h0ID0gdGhpcy5oZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlLnNldEF0dHJpYnV0ZSgnZGF0YS1oZWlnaHQnLCBoaWdodCAqIDQpXHJcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtd2lkdGgnLCB3aWR0aCAqIDQpXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IGltYWdlU291cmNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHBpY3R1cmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5HYWxsZXJ5KGV2ZW50LCBwaWN0dXJlcykgXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhlYWRlcigpIHtcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImhlYWRlclwiXScpXHJcblxyXG4gICAgaWYgKCFoZWFkZXIpIHJldHVyblxyXG5cclxuICAgIC8vIGNvbnN0IGhlaWdodEhlYWRlciA9IGhlYWRlci5vZmZzZXRIZWlnaHRcclxuICAgIC8vIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wYWdlPVwicGFnZVwiXScpXHJcblxyXG4gICAgLy8gaWYgKHBhZ2UpIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gYCR7aGVpZ2h0SGVhZGVyfXB4YFxyXG5cclxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXJNb2JTZWFyY2ggPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1tb2Itc2VhcmNoXCJdJylcclxuICAgICAgICBjb25zdCB3cmFwcGVyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1lbnVcIl0nKVxyXG4gICAgICAgIGNvbnN0IHdyYXBwZXJNZW51Q29udGFpbmVyID0gd3JhcHBlck1lbnUucXVlcnlTZWxlY3RvcignLm1haW4tY29udGFpbmVyJylcclxuICAgICAgICBjb25zdCB3cmFwcGVyTmF2ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbmF2XCJdJylcclxuICAgICAgICBjb25zdCB3cmFwcGVyTmF2Q29udGFpbmVyID0gd3JhcHBlck5hdi5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250YWluZXInKVxyXG4gICAgICAgIGNvbnN0IG5hdiA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJuYXZcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJsb2NrSW5mbyA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJibG9jay1pbmZvXCJdJylcclxuICAgICAgICBjb25zdCBzb2NpYWxOZXR3b3JrID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cInNvY2lhbC1uZXR3b3JrXCJdJylcclxuICAgICAgICBjb25zdCBzZWFyY2ggPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwic2VhcmNoXCJdJylcclxuICAgICAgICBjb25zdCBsb2dvID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImxvZ29cIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBjbG9uZWROYXYgPSBuYXYuY2xvbmVOb2RlKHRydWUpXHJcbiAgICAgICAgY29uc3QgY2xvbmVkQmxvY2tJbmZvID0gYmxvY2tJbmZvLmNsb25lTm9kZSh0cnVlKVxyXG4gICAgICAgIGNvbnN0IGNsb25lZFNvY2lhbE5ldHdvcmsgPSBzb2NpYWxOZXR3b3JrLmNsb25lTm9kZSh0cnVlKVxyXG4gICAgICAgIGNvbnN0IGNsb25lZFNlYXJjaCA9IHNlYXJjaC5jbG9uZU5vZGUodHJ1ZSlcclxuICAgICAgICBjb25zdCBjbG9uZWRMb2dvID0gbG9nby5jbG9uZU5vZGUodHJ1ZSlcclxuXHJcbiAgICAgICAgd3JhcHBlck1lbnVDb250YWluZXIuYXBwZW5kKGNsb25lZE5hdilcclxuICAgICAgICB3cmFwcGVyTWVudUNvbnRhaW5lci5hcHBlbmQoY2xvbmVkQmxvY2tJbmZvKVxyXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWRTb2NpYWxOZXR3b3JrKVxyXG4gICAgICAgIHdyYXBwZXJNb2JTZWFyY2guYXBwZW5kKGNsb25lZFNlYXJjaClcclxuICAgICAgICB3cmFwcGVyTmF2Q29udGFpbmVyLnByZXBlbmQoY2xvbmVkTG9nbylcclxuXHJcbiAgICAgICAgbmF2LnJlbW92ZSgpXHJcbiAgICAgICAgYmxvY2tJbmZvLnJlbW92ZSgpXHJcbiAgICAgICAgc29jaWFsTmV0d29yay5yZW1vdmUoKVxyXG4gICAgICAgIHNlYXJjaC5yZW1vdmUoKVxyXG4gICAgICAgIGxvZ28ucmVtb3ZlKClcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZFdyYXBwZXJNZW51ID0gd3JhcHBlck1lbnUuY2xvbmVOb2RlKHRydWUpXHJcbiAgICAgICAgICAgIHdyYXBwZXJOYXYuYXBwZW5kKGNsb25lZFdyYXBwZXJNZW51KVxyXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5yZW1vdmUoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGJ0blNlYXJjaCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJidG4tc2VhcmNoXCJdJylcclxuICAgICAgICBjb25zdCBidG5NZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImJ0bi1tZW51XCJdJylcclxuXHJcbiAgICAgICAgYnRuU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1lbnVcIl0nKVxyXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgd3JhcHBlck1vYlNlYXJjaC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgIH0pXHJcbiBcclxuICAgICAgICBidG5NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1lbnVcIl0nKVxyXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgY29uc3QgaWNvbiA9IGJ0bk1lbnUucXVlcnlTZWxlY3RvcigndXNlJylcclxuICAgICAgICAgICAgaWYgKHdyYXBwZXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0QXR0cmlidXRlKCd4bGluazpocmVmJywgJy4vYXNzZXRzL2ljb25zL3Nwcml0ZS1zdmcuc3ZnI21lbnUtY2xvc2UnKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnLCAnLi9hc3NldHMvaWNvbnMvc3ByaXRlLXN2Zy5zdmcjbWVudScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xyXG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnLmhlYWRlcl9fbWVudS1ibG9jay1ib2R5LS1sYXN0JykpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1oZWFkZXI9XCJoZWFkXCJdJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwiaGVhZFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZy5oYXNBdHRyaWJ1dGUoJ2RhdGEtaGVhZGVyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBoZWFkLm5leHRFbGVtZW50U2libGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKVxyXG4gICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZGF0YS1oZWFkZXInKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gaGVhZC5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZmxvYXRpbmdCbG9jaygpIHtcclxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xyXG4gICAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mbG9hdGluZy1ibG9jaz1cIm1haW5cIl0nKVxyXG5cclxuICAgICAgICBpZiAoIW1haW4pIHJldHVyblxyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0ID8gd2luZG93LnBhZ2VZT2Zmc2V0IDogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPj0gMTApIHtcclxuICAgICAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpeGVkSGVhZGVyKCkge1xyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiaGVhZGVyXCJdJylcclxuXHJcbiAgICBpZiAoIWhlYWRlcikgcmV0dXJuXHJcblxyXG4gICAgbGV0IGZpeGVkQ2xhc3NcclxuXHJcbiAgICB3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcyA/IGZpeGVkQ2xhc3MgPSAnaGVhZGVyLS1maXhlZCcgOiBmaXhlZENsYXNzID0gJ2hlYWRlci0tZml4ZWQtbW9iJ1xyXG5cclxuICAgIGNvbnN0IGxvZ2ljID0gKHNjcm9sbGVkKSA9PiB7XHJcbiAgICAgICAgaWYgKHNjcm9sbGVkID49IDEwKSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGZpeGVkQ2xhc3MpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoZml4ZWRDbGFzcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbG9naWMod2luZG93LnBhZ2VZT2Zmc2V0KVxyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGxvZ2ljKHNjcm9sbGVkKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gaW5mb0JhcigpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW5mby1iYXI9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxyXG5cclxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaW5mby1iYXI9XCJtYWluXCJdJykgJiYgZWwuY2xvc2VzdCgnW2RhdGEtaW5mby1iYXI9XCJidG4tY2xvc2VcIl0nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpbmZvQmFyID0gZWwuY2xvc2VzdCgnW2RhdGEtaW5mby1iYXI9XCJtYWluXCJdJylcclxuICAgICAgICAgICAgaW5mb0Jhci5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wYWdlPVwicGFnZVwiXScpXHJcbiAgICAgICAgICAgIGlmIChwYWdlLmNsYXNzTGlzdC5jb250YWlucygnbWFpbi1wYWdlJykpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gJzE2OHB4J1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMjMwcHgnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDU3NnB4KVwiKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiBtYWluLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKSlcclxuICAgICAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBhZ2U9XCJwYWdlXCJdJylcclxuICAgICAgICAgICAgaWYgKHBhZ2UuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYWluLXBhZ2UnKSkge1xyXG4gICAgICAgICAgICAgICAgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMTY4cHgnXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlLnN0eWxlLm1hcmdpblRvcCA9ICcyMzBweCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDAwKVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBzbGlkZXJDYXJkc01vYigpIHtcclxuICAgIGNvbnN0IHNsaWRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbGlkZXItY2FyZHMtbW9iPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTc2cHgpXCIpLm1hdGNoZXMpIHtcclxuICAgICAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlciA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cInNsaWRlclwiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJwYWdpbmF0aW9uXCJdJylcclxuICAgICAgICAgICAgY29uc3QgYnRuTmV4dCA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cImJ0bi1uZXh0XCJdJylcclxuICAgICAgICAgICAgY29uc3QgYnRuUHJldiA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cImJ0bi1wcmV2XCJdJylcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEwLFxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2xpZGVyQ2FyZHMoKSB7XHJcbiAgICBjb25zdCBzbGlkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyLWNhcmRzPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG5cclxuICAgIHNsaWRlcnMuZm9yRWFjaChpdGVtU2xpZGVyID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcz1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcz1cImJ0bi1wcmV2XCJdJylcclxuICAgICAgICBjb25zdCBudW1iZXJMaW5lcyA9IHNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLWNhcmRzLWxpbmVzJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDk5Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm93czogbnVtYmVyTGluZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiB0YWJzKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3QgbGlzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwibGlcIl0nKVxyXG5cclxuICAgICAgICBsaXMuZm9yRWFjaCgobGksIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgnZGF0YS10YWJzLWluZGV4JywgaW5kZXgpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcclxuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxyXG5cclxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtdGFicz1cIm1haW5cIl0nKSkgeyAgIFxyXG5cclxuICAgICAgICAgICAgY29uc3QgbWFpbiA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXRhYnM9XCJtYWluXCJdJylcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpcyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicz1cImxpXCJdJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYnMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJ0YWJcIl0nKVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgbGlzLmZvckVhY2goKGxpLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFic1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gICAgIFxyXG5cclxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXRhYnM9XCJsaVwiXScpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXRhYnM9XCJsaVwiXScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJzLWluZGV4JylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhYnMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJ0YWJcIl0nKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICB0YWJzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZmFxKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mYXE9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBjYXJkcyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmFxPVwiY2FyZFwiXScpXHJcblxyXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImhlYWRcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCBib2R5ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJib2R5XCJdJylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHNtb290aFZpZXcoaGVhZCwgYm9keSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2xpZGVyUmFuZ2UoKSB7XHJcbiAgICBjb25zdCBzbGlkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyLXJhbmdlPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXHJcbiAgICBcclxuICAgIHNsaWRlcnMuZm9yRWFjaChpdGVtU2xpZGVyID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1yYW5nZT1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3Qgc3RhcnQgPSAraXRlbVNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLXJhbmdlLXN0YXJ0JylcclxuICAgICAgICBjb25zdCBtaW4gPSAraXRlbVNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLXJhbmdlLW1pbicpXHJcbiAgICAgICAgY29uc3QgbWF4ID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1tYXgnKVxyXG5cclxuICAgICAgICBub1VpU2xpZGVyLmNyZWF0ZShzbGlkZXIsIHtcclxuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxyXG4gICAgICAgICAgICBjb25uZWN0OiAnbG93ZXInLFxyXG4gICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgJ21pbic6IFttaW5dLFxyXG4gICAgICAgICAgICAgICAgJ21heCc6IFttYXhdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvdW50ZXIoKSB7XHJcbiAgICBjb25zdCBwYXJlbnRCbG9ja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1jb3VudGVyPVwiY291bnRlclwiXWApXHJcbiAgICBpZiAoIXBhcmVudEJsb2Nrcy5sZW5ndGgpIHJldHVyblxyXG4gICAgcGFyZW50QmxvY2tzLmZvckVhY2goZWxlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVtb3ZlID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyPVwicmVtb3ZlXCJdJylcclxuICAgICAgICBjb25zdCBhZGQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvdW50ZXI9XCJhZGRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGlucHV0ID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyPVwiaW5wdXRcIl0nKVxyXG4gICAgXHJcbiAgICAgICAgY29uc3QgbWF4ID0gK2lucHV0LmdldEF0dHJpYnV0ZSgnbWF4JylcclxuICAgICAgICBjb25zdCBtaW4gPSAraW5wdXQuZ2V0QXR0cmlidXRlKCdtaW4nKVxyXG4gICAgXHJcbiAgICAgICAgY29uc3QgdmFsaWRJbnB1dCA9ICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbnB1dFZhbHVlID0gK3ZhbHVlXHJcbiAgICAgICAgICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBpbnB1dFZhbHVlIDw9IG1pbjpcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IG1pblxyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBpbnB1dFZhbHVlID49IG1heDpcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IG1heFxyXG4gICAgICAgICAgICAgICAgICAgIGFkZC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpXHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmUucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgYWRkLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgdmFsaWRJbnB1dChpbnB1dC52YWx1ZSlcclxuICAgIFxyXG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coaW5wdXQudmFsdWUpXHJcbiAgICAgICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXHJcbiAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgIGFkZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaW5wdXQudmFsdWUrK1xyXG4gICAgICAgICAgICB2YWxpZElucHV0KGlucHV0LnZhbHVlKVxyXG4gICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICByZW1vdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbHVlLS1cclxuICAgICAgICAgICAgdmFsaWRJbnB1dChpbnB1dC52YWx1ZSlcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY2VydGlmaWNhdGVzKCkge1xyXG4gICAgY29uc3QgY2VydGlmaWNhdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2VydGlmaWNhdGVzPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFjZXJ0aWZpY2F0ZXMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtb2RhbFBpY3R1cmUoY2VydGlmaWNhdGVzKVxyXG5cclxuICAgIGNlcnRpZmljYXRlcy5mb3JFYWNoKGNlcnRpZmljYXRlID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJwYWdpbmF0aW9uXCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gY2VydGlmaWNhdGUucXVlcnlTZWxlY3RvcignW2RhdGEtY2VydGlmaWNhdGVzPVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJidG4tcHJldlwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMyxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA1LFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDMzLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1NzY6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjUsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzcGVjaWFsaXN0Q2FyZCgpIHtcclxuICAgIGNvbnN0IHNwZWNpYWxpc3RDYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghc3BlY2lhbGlzdENhcmRzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgc3BlY2lhbGlzdENhcmRzLmZvckVhY2goc3BlY2lhbGlzdENhcmQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlclNwZWNpYWxpc3RzID0gc3BlY2lhbGlzdENhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwic2xpZGVyLXNwZWNpYWxpc3RzXCJdJylcclxuICAgICAgICBjb25zdCBzbGlkZXJJbmZvU3BlY2lhbGlzdHMgPSBzcGVjaWFsaXN0Q2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJzbGlkZXItaW5mby1zcGVjaWFsaXN0c1wiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cImJ0bi1uZXh0XCJdJylcclxuICAgICAgICBjb25zdCBidG5QcmV2ID0gc3BlY2lhbGlzdENhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwiYnRuLXByZXZcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXJTcGVjaWFsaXN0cyA9IG5ldyBTd2lwZXIoc2xpZGVyU3BlY2lhbGlzdHMsIHtcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVySW5mb1NwZWNpYWxpc3RzID0gbmV3IFN3aXBlcihzbGlkZXJJbmZvU3BlY2lhbGlzdHMsIHtcclxuICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxyXG4gICAgICAgICAgICBlZmZlY3Q6IFwiZmFkZVwiLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHN3aXBlckluZm9TcGVjaWFsaXN0cy5jb250cm9sbGVyLmNvbnRyb2wgPSBzd2lwZXJTcGVjaWFsaXN0c1xyXG4gICAgICAgIHN3aXBlclNwZWNpYWxpc3RzLmNvbnRyb2xsZXIuY29udHJvbCA9IHN3aXBlckluZm9TcGVjaWFsaXN0c1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZmVlZGJhY2soKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZlZWRiYWNrPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mZWVkYmFjaz1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJwYWdpbmF0aW9uXCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA0MCxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBvcmRlcldvcmsoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW9yZGVyLXdvcms9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IGhlaWdodFNsaWRlciA9IHNsaWRlci5vZmZzZXRIZWlnaHRcclxuICAgICAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtb3JkZXItd29yaz1cInNsaWRlclwiXSAuc3dpcGVyLXNsaWRlJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci13b3JrPVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItd29yaz1cInBhZ2luYXRpb25cIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjIsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNzIsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDEyMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDk5Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1NzY6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHNsaWRlLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodFNsaWRlcn1weGApXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb250YWN0cygpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29udGFjdHM9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBibG9ja3NJbmZvID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb250YWN0cz1cImJsb2NrLWluZm9cIl0nKVxyXG5cclxuICAgICAgICBibG9ja3NJbmZvLmZvckVhY2goYmxvY2tJbmZvID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGVhZCA9IGJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb250YWN0cz1cImhlYWRcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCBib2R5ID0gYmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnRhY3RzPVwiYm9keVwiXScpXHJcblxyXG4gICAgICAgICAgICBzbW9vdGhWaWV3KGhlYWQsIGJvZHkpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlbGVjdCgpIHtcclxuICAgIGNvbnN0IHNlbGVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zZWxlY3Q9XCJzZWxlY3RcIl0nKVxyXG5cclxuICAgIGlmICghc2VsZWN0cy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IGhpZGVBbGwgPSAoKSA9PiB7XHJcbiAgICAgICAgc2VsZWN0cy5mb3JFYWNoKGVsU2VsZWN0ID0+IHtcclxuICAgICAgICAgICAgZWxTZWxlY3QuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcclxuXHJcbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cInNlbGVjdFwiXScpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cInNlbGVjdFwiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlbGVjdD1cInRpdGxlXCJdJylcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUNsYXNzU2VsZWN0ZWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2VsZWN0PVwibGlzdFwiXSA+IGxpJylcclxuXHJcbiAgICAgICAgICAgICAgICBsaXN0SXRlbXMuZm9yRWFjaChsaXN0SXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0X19saS0tc2VsZWN0ZWQnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImJsb2NrLXRpdGxlXCJdJykpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdHMuZm9yRWFjaChlbFNlbGVjdCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsU2VsZWN0ICE9PSBzZWxlY3QpIGVsU2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0PVwibGlzdFwiXSA+IGxpIHNwYW4nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJsaXN0XCJdID4gbGknKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dExpID0gZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0PVwibGlzdFwiXSA+IGxpID4gc3BhbicpXHJcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzc1NlbGVjdGVkKClcclxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdF9fbGktLXNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpQ29udGVudCA9IHRleHRMaS50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBsaUNvbnRlbnRcclxuICAgICAgICAgICAgICAgIHNlbGVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0LXZhbHVlJywgbGlDb250ZW50KVxyXG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBoaWRlQWxsKClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBleGFtcGxlc1dvcmtzKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgbGV0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwiYnRuLXByZXZcIl0nKVxyXG4gICAgICAgIGxldCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImJ0bi1uZXh0XCJdJylcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTc2cHgpXCIpLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgY29uc3QgbmF2SW5mbyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJuYXYtaW5mb1wiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZCA9IG5hdkluZm8uY2xvbmVOb2RlKHRydWUpXHJcbiAgICAgICAgICAgIHNsaWRlci5iZWZvcmUoY2xvbmVkKVxyXG4gICAgICAgICAgICBuYXZJbmZvLnJlbW92ZSgpXHJcblxyXG4gICAgICAgICAgICBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImJ0bi1wcmV2XCJdJylcclxuICAgICAgICAgICAgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS41LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuMyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLnRleHRDb250ZW50XHJcbiAgICAgICAgY29uc3Qgc3dpcGVyUGFnaW5hdGlvblRvdGFsID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tdG90YWwnKS50ZXh0Q29udGVudFxyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50TnVtYmVyU2xpZGUgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwiY3VycmVudC1udW1iZXItc2xpZGVcIl0nKVxyXG4gICAgICAgIGNvbnN0IGFsbFF1YW50aXR5U2xpZGVzID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImFsbC1xdWFudGl0eS1zbGlkZXNcIl0nKVxyXG5cclxuICAgICAgICBhbGxRdWFudGl0eVNsaWRlcy50ZXh0Q29udGVudCA9IHN3aXBlclBhZ2luYXRpb25Ub3RhbFxyXG4gICAgICAgIGN1cnJlbnROdW1iZXJTbGlkZS50ZXh0Q29udGVudCA9IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ICBcclxuXHJcblxyXG4gICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLnRleHRDb250ZW50XHJcbiAgICAgICAgICAgIGN1cnJlbnROdW1iZXJTbGlkZS50ZXh0Q29udGVudCA9IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ICAgXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JyksIHtcclxuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLCBcclxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJlc3RXb3JrcygpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYmVzdC13b3Jrcz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByb2plY3RDYXJkKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9qZWN0LWNhcmQ9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcbiAgICBcclxuICAgIG1vZGFsUGljdHVyZShtYWlucylcclxufVxyXG5cclxuZnVuY3Rpb24gYmlnUmVwYWlyQ2FyZCgpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1vZGFsUGljdHVyZShtYWlucylcclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJwYWdpbmF0aW9uXCJdJylcclxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwiYnRuLW5leHRcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiB0b29sdGlwKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b29sdGlwPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcclxuXHJcbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXRvb2x0aXA9XCJtYWluXCJdJykpIHtcclxuICAgICAgICAgICAgY29uc3QgbWFpbiA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXRvb2x0aXA9XCJtYWluXCJdJylcclxuICAgICAgICAgICAgY29uc3QgdG9vbHRpcCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdG9vbHRpcD1cInRvb2x0aXBcIl0nKVxyXG5cclxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXRvb2x0aXA9XCJidG4tY2xvc2VcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFpbnMuZm9yRWFjaChpdGVtTWFpbiA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1NYWluICE9PSBtYWluKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvb2x0aXAgPSBpdGVtTWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b29sdGlwPVwidG9vbHRpcFwiXScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYWlucy5mb3JFYWNoKGl0ZW1NYWluID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRvb2x0aXAgPSBpdGVtTWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b29sdGlwPVwidG9vbHRpcFwiXScpXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcG9wdWxhclNlcnZpY2VzKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1wcmV2XCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwiYnRuLW5leHRcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA5OTI6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLjIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4yLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgYmxvY2tUYWdzID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwiYmxvY2stdGFnc1wiXScpXHJcblxyXG4gICAgICAgIGlmIChibG9ja1RhZ3MpIHtcclxuICAgICAgICAgICAgY29uc3QgYnRuTW9yZVRhZ3MgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJidG4tbW9yZS10YWdzXCJdJylcclxuICAgICAgICAgICAgY29uc3QgYnRuTW9yZVRhZ3NUZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwiYnRuLW1vcmUtdGFncy10ZXh0XCJdJylcclxuXHJcbiAgICAgICAgICAgIGJ0bk1vcmVUYWdzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYmxvY2tUYWdzLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrVGFncy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3MuY2xhc3NMaXN0LmFkZCgnYWN0aXZlLW1vcmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bk1vcmVUYWdzVGV4dC50ZXh0Q29udGVudCA9ICfQodCy0LXRgNC90YPRgtGMJ1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBidG5Nb3JlVGFncy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUtbW9yZScpXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3NUZXh0LnRleHRDb250ZW50ID0gJ9Cf0L7QutCw0LfQsNGC0Ywg0LLRgdC1J1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHdhcmVob3VzZSgpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtd2FyZWhvdXNlPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1vZGFsUGljdHVyZShtYWlucylcclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS13YXJlaG91c2U9XCJwYWdpbmF0aW9uXCJdJylcclxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS13YXJlaG91c2U9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwiYnRuLW5leHRcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjUsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNCxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4yLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLjIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDgsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGd1YXJhbnRlZXMoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWd1YXJhbnRlZXM9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ndWFyYW50ZWVzPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ndWFyYW50ZWVzPVwicGFnaW5hdGlvblwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc2NvdW50KCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaXNjb3VudD1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc2NvdW50PVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZGlzY291bnQ9XCJidG4tcHJldlwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNCxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ3JpZDoge1xyXG4gICAgICAgICAgICAgICAgcm93czogMixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDEyMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LjUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNC41LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMuNSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1NzY6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjUsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gdmlkZW9TbGlkZXIoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvLXNsaWRlcj1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1zbGlkZXI9XCJwYWdpbmF0aW9uXCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1zbGlkZXI9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwiYnRuLXByZXZcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgMTIwMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMuNCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBsYXJnZVNlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWxhcmdlLXNlY3Rpb249XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3QgYmxvY2tzU2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1sYXJnZS1zZWN0aW9uPVwiYmxvY2stc2xpZGVyXCJdJylcclxuXHJcbiAgICAgICAgaWYgKGJsb2Nrc1NsaWRlci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgYmxvY2tzU2xpZGVyLmZvckVhY2goYmxvY2tTbGlkZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVyID0gYmxvY2tTbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGFyZ2Utc2VjdGlvbj1cInNsaWRlclwiXScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBidG5OZXh0ID0gYmxvY2tTbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGFyZ2Utc2VjdGlvbj1cImJ0bi1uZXh0XCJdJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0blByZXYgPSBibG9ja1NsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1sYXJnZS1zZWN0aW9uPVwiYnRuLXByZXZcIl0nKVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBxdWl6KCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1xdWl6PVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3QgcGVyZm9ybWFuY2UgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJwZXJmb3JtYW5jZVwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuU3RhcnQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJidG4tc3RhcnRcIl0nKVxyXG4gICAgICAgIGNvbnN0IHF1aXogPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJxdWl6XCJdJylcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcXVpej1cImJ0bi1wcmV2XCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwicGFnaW5hdGlvblwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXHJcbiAgICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXHJcbiAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvLyBzd2lwZXJNYWluLnNsaWRlVG8oaW5kZXgsIDQwMCwgdHJ1ZSlcclxuXHJcbiAgICAgICAgYnRuU3RhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgcGVyZm9ybWFuY2UuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgcXVpei5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCcuc3dpcGVyLXNsaWRlJylcclxuXHJcbiAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByYWRpb3MgPSBzbGlkZS5xdWVyeVNlbGVjdG9yQWxsKCcucmFkaW8nKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgcmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xyXG4gICAgICAgICAgICAgICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zLmZvckVhY2gocmFkaW8yID0+IHJhZGlvMi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcclxuICAgICAgICAgICAgICAgICAgICByYWRpby5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBuYXZMaXN0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwibmF2LWxpc3RcIl0nKVxyXG4gICAgICAgIGNvbnN0IGNvdXRTbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1zbGlkZScpXHJcblxyXG4gICAgICAgIGlmIChjb3V0U2xpZGVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSBjb3V0U2xpZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlyc3RFbGVtXHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RWxlbSA9IHRydWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbGVtID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5hdkxpc3QuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicXVpel9fc2xpZGVyLW5hdi1saSAke2ZpcnN0RWxlbSA/ICdhY3RpdmUtY3VycmVudCcgOiAnJ31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInF1aXpfX3NsaWRlci1uYXYtbGktY29udGVudFwiPiR7aX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgYClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25SZWNvcmRzID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3dpcGVyUGFnaW5hdGlvbkN1cnJlbnQgPSArcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLnRleHRDb250ZW50XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdkxpc3QgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJuYXYtbGlzdFwiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtcyA9IG5hdkxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKVxyXG4gICAgICAgICAgICBsaXN0SXRlbXMuZm9yRWFjaCgobGlzdEl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IGluZGV4ICsgMVxyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0luZGV4IDwgc3dpcGVyUGFnaW5hdGlvbkN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtcGFzc2VkJylcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlLXBhc3NlZCcpXHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlLWN1cnJlbnQnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChuZXdJbmRleCA9PT0gc3dpcGVyUGFnaW5hdGlvbkN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtY3VycmVudCcpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JyksIHtcclxuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLCBcclxuICAgICAgICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHByaWNlc1R5cGVXb3JrKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcmljZXMtdHlwZS13b3JrPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgd3JhcHBlclRhYmxlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmljZXMtdHlwZS13b3JrPVwid3JhcHBlci10YWJsZVwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTW9yZSA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJpY2VzLXR5cGUtd29yaz1cImJ0bi1tb3JlXCJdJylcclxuXHJcbiAgICAgICAgYnRuTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgd3JhcHBlclRhYmxlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIGJ0bk1vcmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByZXZpZXdzKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXZpZXdzPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlclJldmlld3MgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJ3cmFwcGVyLXJldmlld3NcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCBidG5Nb3JlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiYnRuLW1vcmVcIl0nKVxyXG4gICAgXHJcbiAgICAgICAgICAgIGJ0bk1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyUmV2aWV3cy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgYnRuTW9yZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgd3JhcElubmVyUmV2aWV3cyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmV2aWV3cz1cIndyYXAtaW5uZXItcmV2aWV3c1wiXScpXHJcblxyXG4gICAgICAgICAgICB3cmFwSW5uZXJSZXZpZXdzLmZvckVhY2god3JhcElubmVyUmV2aWV3ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlubmVyUmV2aWV3cyA9IHdyYXBJbm5lclJldmlldy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiaW5uZXItcmV2aWV3c1wiXScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBidG5Db2x1bW5Nb3JlID0gd3JhcElubmVyUmV2aWV3LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJidG4tY29sdW1uLW1vcmVcIl0nKVxyXG5cclxuICAgICAgICAgICAgICAgIGJ0bkNvbHVtbk1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJSZXZpZXdzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgYnRuQ29sdW1uTW9yZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmhlYWRlcigpXHJcbmZsb2F0aW5nQmxvY2soKVxyXG5maXhlZEhlYWRlcigpXHJcbmluZm9CYXIoKVxyXG5zbGlkZXJDYXJkc01vYigpXHJcbnNsaWRlckNhcmRzKClcclxudGFicygpXHJcbmZhcSgpXHJcbnNsaWRlclJhbmdlKClcclxuY291bnRlcigpXHJcbmNlcnRpZmljYXRlcygpXHJcbnNwZWNpYWxpc3RDYXJkKClcclxuZmVlZGJhY2soKVxyXG5vcmRlcldvcmsoKVxyXG5jb250YWN0cygpXHJcbnNlbGVjdCgpXHJcbmV4YW1wbGVzV29ya3MoKVxyXG5iZXN0V29ya3MoKVxyXG5wcm9qZWN0Q2FyZCgpXHJcbmJpZ1JlcGFpckNhcmQoKVxyXG50b29sdGlwKClcclxucG9wdWxhclNlcnZpY2VzKClcclxud2FyZWhvdXNlKClcclxuZ3VhcmFudGVlcygpXHJcbmRpc2NvdW50KClcclxudmlkZW9TbGlkZXIoKVxyXG5sYXJnZVNlY3Rpb24oKVxyXG5xdWl6KClcclxucHJpY2VzVHlwZVdvcmsoKVxyXG5yZXZpZXdzKClcclxubW9kYWwoKVxyXG5waG9uZU1hc2soKSJdLCJmaWxlIjoibWFpbi5qcyJ9