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

function bestWorks() {
    const mains = document.querySelectorAll('[data-best-works="main"]')

    if (!mains.length) return

    modalPicture(mains)
}

function videoCard() {
    const mains = document.querySelectorAll('[data-video-card="main"]')

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XG5cbiAgICBpZiAoIWJ0biAmJiAhZWwpIHJldHVyblxuICAgIFxuICAgIGxldCBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJylcbiAgICB9XG5cbiAgICBpZiAoYnRuLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgfSBlbHNlIHtcbiAgICAgICAgYWRkKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xuICAgICAgICBpZiAoaGVpZ2h0RWwgPCBzdGFydEhlaWdodCkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgIHVwZGF0ZSgpXG4gICAgfSlcbiAgICAgICAgXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCwge1xuICAgICAgICBjaGlsZExpc3Q6IHRydWUsIFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBtb2RhbCgpIHtcbiAgICByZXR1cm4gbmV3IEh5c3RNb2RhbCh7XG4gICAgICAgIGxpbmtBdHRyaWJ1dGVOYW1lOiBcImRhdGEtaHlzdG1vZGFsXCIsXG4gICAgICAgIHdhaXRUcmFuc2l0aW9uczogdHJ1ZSxcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBwaG9uZU1hc2soKSB7XG4gICAgY29uc3QgcGhvbmVNYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBob25lLW1hc2tdJylcblxuICAgIGlmICghcGhvbmVNYXNrcy5sZW5ndGgpIHJldHVyblxuXG4gICAgcGhvbmVNYXNrcy5mb3JFYWNoKHBob25lTWFzayA9PiB7XG4gICAgICAgIElNYXNrKHBob25lTWFzaywge1xuICAgICAgICAgICAgICAgIG1hc2s6ICcrezd9KDAwMCkwMDAtMDAtMDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIClcbiAgICB9KVxufVxuXG5cbmZ1bmN0aW9uIG1vZGFsUGljdHVyZShibG9ja1BpY3R1cmVzKSB7XG5cbiAgICBpZiAoIWJsb2NrUGljdHVyZXMubGVuZ3RoKSByZXR1cm5cblxuICAgIGxldCBicCA9IEJpZ2dlclBpY3R1cmUoe1xuICAgICAgICB0YXJnZXQ6IGRvY3VtZW50LmJvZHksXG4gICAgfSlcblxuICAgIGNvbnN0IG9wZW5HYWxsZXJ5ID0gKGV2ZW50LCBwaWN0dXJlcykgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIGJwLm9wZW4oe1xuICAgICAgICAgICAgaXRlbXM6IHBpY3R1cmVzLFxuICAgICAgICAgICAgZWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQsXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYmxvY2tQaWN0dXJlcy5mb3JFYWNoKGJsb2NrUGljdHVyZSA9PiB7XG4gICAgICAgIGNvbnN0IHBpY3R1cmVzID0gYmxvY2tQaWN0dXJlLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW1vZGFsLXBpY3R1cmU9XCJtYWluXCJdIGFbZGF0YS1tb2RhbC1waWN0dXJlPVwibGlua1wiXScpXG5cbiAgICAgICAgaWYgKHBpY3R1cmVzLmxlbmd0aCkge1xuXG4gICAgICAgICAgICBwaWN0dXJlcy5mb3JFYWNoKHBpY3R1cmUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlID0gcGljdHVyZS5xdWVyeVNlbGVjdG9yKCdpbWcnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGltYWdlU291cmNlID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXG5cbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7IFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMud2lkdGhcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGlnaHQgPSB0aGlzLmhlaWdodFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JywgaGlnaHQgKiA0KVxuICAgICAgICAgICAgICAgICAgICBwaWN0dXJlLnNldEF0dHJpYnV0ZSgnZGF0YS13aWR0aCcsIHdpZHRoICogNClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gaW1hZ2VTb3VyY2U7XG5cbiAgICAgICAgICAgICAgICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb3BlbkdhbGxlcnkoZXZlbnQsIHBpY3R1cmVzKSBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJoZWFkZXJcIl0nKVxuXG4gICAgaWYgKCFoZWFkZXIpIHJldHVyblxuXG4gICAgLy8gY29uc3QgaGVpZ2h0SGVhZGVyID0gaGVhZGVyLm9mZnNldEhlaWdodFxuICAgIC8vIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wYWdlPVwicGFnZVwiXScpXG5cbiAgICAvLyBpZiAocGFnZSkgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSBgJHtoZWlnaHRIZWFkZXJ9cHhgXG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlck1vYlNlYXJjaCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1vYi1zZWFyY2hcIl0nKVxuICAgICAgICBjb25zdCB3cmFwcGVyTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW1lbnVcIl0nKVxuICAgICAgICBjb25zdCB3cmFwcGVyTWVudUNvbnRhaW5lciA9IHdyYXBwZXJNZW51LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRhaW5lcicpXG4gICAgICAgIGNvbnN0IHdyYXBwZXJOYXYgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1uYXZcIl0nKVxuICAgICAgICBjb25zdCB3cmFwcGVyTmF2Q29udGFpbmVyID0gd3JhcHBlck5hdi5xdWVyeVNlbGVjdG9yKCcubWFpbi1jb250YWluZXInKVxuICAgICAgICBjb25zdCBuYXYgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibmF2XCJdJylcbiAgICAgICAgY29uc3QgYmxvY2tJbmZvID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImJsb2NrLWluZm9cIl0nKVxuICAgICAgICBjb25zdCBzb2NpYWxOZXR3b3JrID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cInNvY2lhbC1uZXR3b3JrXCJdJylcbiAgICAgICAgY29uc3Qgc2VhcmNoID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cInNlYXJjaFwiXScpXG4gICAgICAgIGNvbnN0IGxvZ28gPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibG9nb1wiXScpXG5cbiAgICAgICAgY29uc3QgY2xvbmVkTmF2ID0gbmF2LmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjb25zdCBjbG9uZWRCbG9ja0luZm8gPSBibG9ja0luZm8uY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIGNvbnN0IGNsb25lZFNvY2lhbE5ldHdvcmsgPSBzb2NpYWxOZXR3b3JrLmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjb25zdCBjbG9uZWRTZWFyY2ggPSBzZWFyY2guY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIGNvbnN0IGNsb25lZExvZ28gPSBsb2dvLmNsb25lTm9kZSh0cnVlKVxuXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWROYXYpXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWRCbG9ja0luZm8pXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWRTb2NpYWxOZXR3b3JrKVxuICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmFwcGVuZChjbG9uZWRTZWFyY2gpXG4gICAgICAgIHdyYXBwZXJOYXZDb250YWluZXIucHJlcGVuZChjbG9uZWRMb2dvKVxuXG4gICAgICAgIG5hdi5yZW1vdmUoKVxuICAgICAgICBibG9ja0luZm8ucmVtb3ZlKClcbiAgICAgICAgc29jaWFsTmV0d29yay5yZW1vdmUoKVxuICAgICAgICBzZWFyY2gucmVtb3ZlKClcbiAgICAgICAgbG9nby5yZW1vdmUoKVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2xvbmVkV3JhcHBlck1lbnUgPSB3cmFwcGVyTWVudS5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgICAgICAgIHdyYXBwZXJOYXYuYXBwZW5kKGNsb25lZFdyYXBwZXJNZW51KVxuICAgICAgICAgICAgd3JhcHBlck1lbnUucmVtb3ZlKClcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBidG5TZWFyY2ggPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiYnRuLXNlYXJjaFwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiYnRuLW1lbnVcIl0nKVxuXG4gICAgICAgIGJ0blNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJNZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbWVudVwiXScpXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgIH0pXG4gXG4gICAgICAgIGJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG5cbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJNZW51ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbWVudVwiXScpXG4gICAgICAgICAgICB3cmFwcGVyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICBjb25zdCBpY29uID0gYnRuTWVudS5xdWVyeVNlbGVjdG9yKCd1c2UnKVxuICAgICAgICAgICAgaWYgKHdyYXBwZXJNZW51LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgneGxpbms6aHJlZicsICcuL2Fzc2V0cy9pY29ucy9zcHJpdGUtc3ZnLnN2ZyNtZW51LWNsb3NlJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3hsaW5rOmhyZWYnLCAnLi9hc3NldHMvaWNvbnMvc3ByaXRlLXN2Zy5zdmcjbWVudScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcbiAgICAgICAgXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDEyMDBweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJy5oZWFkZXJfX21lbnUtYmxvY2stYm9keS0tbGFzdCcpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkID0gZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwiaGVhZFwiXScpXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nLmhhc0F0dHJpYnV0ZSgnZGF0YS1oZWFkZXInKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBoZWFkLm5leHRFbGVtZW50U2libGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwiaGVhZFwiXScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKVxuICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZC5uZXh0RWxlbWVudFNpYmxpbmcuaGFzQXR0cmlidXRlKCdkYXRhLWhlYWRlcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gaGVhZC5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZsb2F0aW5nQmxvY2soKSB7XG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogMTIwMHB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mbG9hdGluZy1ibG9jaz1cIm1haW5cIl0nKVxuXG4gICAgICAgIGlmICghbWFpbikgcmV0dXJuXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHNjcm9sbGVkID49IDEwKSB7XG4gICAgICAgICAgICAgICAgbWFpbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBmaXhlZEhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJoZWFkZXJcIl0nKVxuXG4gICAgaWYgKCFoZWFkZXIpIHJldHVyblxuXG4gICAgbGV0IGZpeGVkQ2xhc3NcblxuICAgIHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogMTIwMHB4KVwiKS5tYXRjaGVzID8gZml4ZWRDbGFzcyA9ICdoZWFkZXItLWZpeGVkJyA6IGZpeGVkQ2xhc3MgPSAnaGVhZGVyLS1maXhlZC1tb2InXG5cbiAgICBjb25zdCBsb2dpYyA9IChzY3JvbGxlZCkgPT4ge1xuICAgICAgICBpZiAoc2Nyb2xsZWQgPj0gMTApIHtcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKGZpeGVkQ2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShmaXhlZENsYXNzKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9naWMod2luZG93LnBhZ2VZT2Zmc2V0KVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgICAgICBcbiAgICAgICAgbG9naWMoc2Nyb2xsZWQpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5mb0JhcigpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxuXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1pbmZvLWJhcj1cIm1haW5cIl0nKSAmJiBlbC5jbG9zZXN0KCdbZGF0YS1pbmZvLWJhcj1cImJ0bi1jbG9zZVwiXScpKSB7XG4gICAgICAgICAgICBjb25zdCBpbmZvQmFyID0gZWwuY2xvc2VzdCgnW2RhdGEtaW5mby1iYXI9XCJtYWluXCJdJylcbiAgICAgICAgICAgIGluZm9CYXIuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG5cbiAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wYWdlPVwicGFnZVwiXScpXG4gICAgICAgICAgICBpZiAocGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ21haW4tcGFnZScpKSB7XG4gICAgICAgICAgICAgICAgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMTY4cHgnXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gJzIzMHB4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDU3NnB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbWFpbnMuZm9yRWFjaChtYWluID0+IG1haW4uY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpKVxuICAgICAgICAgICAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBhZ2U9XCJwYWdlXCJdJylcbiAgICAgICAgICAgIGlmIChwYWdlLmNsYXNzTGlzdC5jb250YWlucygnbWFpbi1wYWdlJykpIHtcbiAgICAgICAgICAgICAgICBwYWdlLnN0eWxlLm1hcmdpblRvcCA9ICcxNjhweCdcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMjMwcHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDAwKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc2xpZGVyQ2FyZHNNb2IoKSB7XG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJtYWluXCJdJylcblxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxuXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNTc2cHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgc2xpZGVycy5mb3JFYWNoKGl0ZW1TbGlkZXIgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2xpZGVyID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHMtbW9iPVwic2xpZGVyXCJdJylcbiAgICAgICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJ0bk5leHQgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJidG4tbmV4dFwiXScpXG4gICAgICAgICAgICBjb25zdCBidG5QcmV2ID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHMtbW9iPVwiYnRuLXByZXZcIl0nKVxuXG4gICAgICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNsaWRlckNhcmRzKCkge1xuICAgIGNvbnN0IHNsaWRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJtYWluXCJdJylcblxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxuXG5cbiAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IGl0ZW1TbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmRzPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBudW1iZXJMaW5lcyA9IHNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGVyLWNhcmRzLWxpbmVzJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njc6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDU3Njoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxuICAgICAgICAgICAgICAgICAgICBncmlkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzOiBudW1iZXJMaW5lcyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gdGFicygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IGxpcyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicz1cImxpXCJdJylcblxuICAgICAgICBsaXMuZm9yRWFjaCgobGksIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy1pbmRleCcsIGluZGV4KVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxuXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibWFpblwiXScpKSB7ICAgXG5cbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibWFpblwiXScpXG5cbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaXMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJsaVwiXScpXG4gICAgICAgICAgICAgICAgY29uc3QgdGFicyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicz1cInRhYlwiXScpXG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGxpcy5mb3JFYWNoKChsaSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgdGFic1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSAgICAgXG5cbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibGlcIl0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZWwuY2xvc2VzdCgnW2RhdGEtdGFicz1cImxpXCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IGxpLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJzLWluZGV4JylcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwidGFiXCJdJylcblxuICAgICAgICAgICAgICAgIGlmICghbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB0YWJzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZhcSgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZhcT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgY2FyZHMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZhcT1cImNhcmRcIl0nKVxuXG4gICAgICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBoZWFkID0gY2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJoZWFkXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImJvZHlcIl0nKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBzbW9vdGhWaWV3KGhlYWQsIGJvZHkpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2xpZGVyUmFuZ2UoKSB7XG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1yYW5nZT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFzbGlkZXJzLmxlbmd0aCkgcmV0dXJuXG4gICAgXG4gICAgc2xpZGVycy5mb3JFYWNoKGl0ZW1TbGlkZXIgPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1yYW5nZT1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1zdGFydCcpXG4gICAgICAgIGNvbnN0IG1pbiA9ICtpdGVtU2xpZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZXItcmFuZ2UtbWluJylcbiAgICAgICAgY29uc3QgbWF4ID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1tYXgnKVxuXG4gICAgICAgIG5vVWlTbGlkZXIuY3JlYXRlKHNsaWRlciwge1xuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgY29ubmVjdDogJ2xvd2VyJyxcbiAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgJ21pbic6IFttaW5dLFxuICAgICAgICAgICAgICAgICdtYXgnOiBbbWF4XVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBjb3VudGVyKCkge1xuICAgIGNvbnN0IHBhcmVudEJsb2NrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWNvdW50ZXI9XCJjb3VudGVyXCJdYClcbiAgICBpZiAoIXBhcmVudEJsb2Nrcy5sZW5ndGgpIHJldHVyblxuICAgIHBhcmVudEJsb2Nrcy5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICBjb25zdCByZW1vdmUgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvdW50ZXI9XCJyZW1vdmVcIl0nKVxuICAgICAgICBjb25zdCBhZGQgPSBlbGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvdW50ZXI9XCJhZGRcIl0nKVxuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY291bnRlcj1cImlucHV0XCJdJylcbiAgICBcbiAgICAgICAgY29uc3QgbWF4ID0gK2lucHV0LmdldEF0dHJpYnV0ZSgnbWF4JylcbiAgICAgICAgY29uc3QgbWluID0gK2lucHV0LmdldEF0dHJpYnV0ZSgnbWluJylcbiAgICBcbiAgICAgICAgY29uc3QgdmFsaWRJbnB1dCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9ICt2YWx1ZVxuICAgICAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBpbnB1dFZhbHVlIDw9IG1pbjpcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBtaW5cbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJylcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgaW5wdXRWYWx1ZSA+PSBtYXg6XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gbWF4XG4gICAgICAgICAgICAgICAgICAgIGFkZC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJycpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICByZW1vdmUucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgIGFkZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YWxpZElucHV0KGlucHV0LnZhbHVlKVxuICAgIFxuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhpbnB1dC52YWx1ZSlcbiAgICAgICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIGFkZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlKytcbiAgICAgICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIHJlbW92ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGlucHV0LnZhbHVlLS1cbiAgICAgICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gY2VydGlmaWNhdGVzKCkge1xuICAgIGNvbnN0IGNlcnRpZmljYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNlcnRpZmljYXRlcz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFjZXJ0aWZpY2F0ZXMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1vZGFsUGljdHVyZShjZXJ0aWZpY2F0ZXMpXG5cbiAgICBjZXJ0aWZpY2F0ZXMuZm9yRWFjaChjZXJ0aWZpY2F0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IGNlcnRpZmljYXRlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlcnRpZmljYXRlcz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBjZXJ0aWZpY2F0ZS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jZXJ0aWZpY2F0ZXM9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IGNlcnRpZmljYXRlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlcnRpZmljYXRlcz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IGNlcnRpZmljYXRlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlcnRpZmljYXRlcz1cImJ0bi1wcmV2XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4zLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA1LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDMzLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY3OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1NzY6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi41LFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE1LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzcGVjaWFsaXN0Q2FyZCgpIHtcbiAgICBjb25zdCBzcGVjaWFsaXN0Q2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJtYWluXCJdJylcblxuICAgIGlmICghc3BlY2lhbGlzdENhcmRzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBzcGVjaWFsaXN0Q2FyZHMuZm9yRWFjaChzcGVjaWFsaXN0Q2FyZCA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlclNwZWNpYWxpc3RzID0gc3BlY2lhbGlzdENhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwic2xpZGVyLXNwZWNpYWxpc3RzXCJdJylcbiAgICAgICAgY29uc3Qgc2xpZGVySW5mb1NwZWNpYWxpc3RzID0gc3BlY2lhbGlzdENhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwic2xpZGVyLWluZm8tc3BlY2lhbGlzdHNcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gc3BlY2lhbGlzdENhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gc3BlY2lhbGlzdENhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwiYnRuLXByZXZcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlclNwZWNpYWxpc3RzID0gbmV3IFN3aXBlcihzbGlkZXJTcGVjaWFsaXN0cywge1xuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3Qgc3dpcGVySW5mb1NwZWNpYWxpc3RzID0gbmV3IFN3aXBlcihzbGlkZXJJbmZvU3BlY2lhbGlzdHMsIHtcbiAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmYWxzZSxcbiAgICAgICAgICAgIGVmZmVjdDogXCJmYWRlXCIsXG4gICAgICAgIH0pXG5cbiAgICAgICAgc3dpcGVySW5mb1NwZWNpYWxpc3RzLmNvbnRyb2xsZXIuY29udHJvbCA9IHN3aXBlclNwZWNpYWxpc3RzXG4gICAgICAgIHN3aXBlclNwZWNpYWxpc3RzLmNvbnRyb2xsZXIuY29udHJvbCA9IHN3aXBlckluZm9TcGVjaWFsaXN0c1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZlZWRiYWNrKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmVlZGJhY2s9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mZWVkYmFjaz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZlZWRiYWNrPVwicGFnaW5hdGlvblwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNDAsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIG9yZGVyV29yaygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW9yZGVyLXdvcms9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItd29yaz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGhlaWdodFNsaWRlciA9IHNsaWRlci5vZmZzZXRIZWlnaHRcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW9yZGVyLXdvcms9XCJzbGlkZXJcIl0gLnN3aXBlci1zbGlkZScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJidG4tbmV4dFwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJwYWdpbmF0aW9uXCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA3MixcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDEyMDA6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1NzY6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHNsaWRlLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodFNsaWRlcn1weGApXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gY29udGFjdHMoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb250YWN0cz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgYmxvY2tzSW5mbyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29udGFjdHM9XCJibG9jay1pbmZvXCJdJylcblxuICAgICAgICBibG9ja3NJbmZvLmZvckVhY2goYmxvY2tJbmZvID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtY29udGFjdHM9XCJoZWFkXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJvZHkgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtY29udGFjdHM9XCJib2R5XCJdJylcblxuICAgICAgICAgICAgc21vb3RoVmlldyhoZWFkLCBib2R5KVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNlbGVjdCgpIHtcbiAgICBjb25zdCBzZWxlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2VsZWN0PVwic2VsZWN0XCJdJylcblxuICAgIGlmICghc2VsZWN0cy5sZW5ndGgpIHJldHVyblxuXG4gICAgY29uc3QgaGlkZUFsbCA9ICgpID0+IHtcbiAgICAgICAgc2VsZWN0cy5mb3JFYWNoKGVsU2VsZWN0ID0+IHtcbiAgICAgICAgICAgIGVsU2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0PVwic2VsZWN0XCJdJykpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cInNlbGVjdFwiXScpXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWxlY3Q9XCJ0aXRsZVwiXScpXG5cbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUNsYXNzU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW1zID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlbGVjdD1cImxpc3RcIl0gPiBsaScpXG5cbiAgICAgICAgICAgICAgICBsaXN0SXRlbXMuZm9yRWFjaChsaXN0SXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9fbGktLXNlbGVjdGVkJylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0PVwiYmxvY2stdGl0bGVcIl0nKSkge1xuICAgICAgICAgICAgICAgIHNlbGVjdHMuZm9yRWFjaChlbFNlbGVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbFNlbGVjdCAhPT0gc2VsZWN0KSBlbFNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImxpc3RcIl0gPiBsaSBzcGFuJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaSA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImxpc3RcIl0gPiBsaScpXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dExpID0gZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0PVwibGlzdFwiXSA+IGxpID4gc3BhbicpXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NTZWxlY3RlZCgpXG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnc2VsZWN0X19saS0tc2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGxpQ29udGVudCA9IHRleHRMaS50ZXh0Q29udGVudFxuICAgICAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gbGlDb250ZW50XG4gICAgICAgICAgICAgICAgc2VsZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3QtdmFsdWUnLCBsaUNvbnRlbnQpXG4gICAgICAgICAgICAgICAgc2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoaWRlQWxsKClcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGV4YW1wbGVzV29ya3MoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImJ0bi1uZXh0XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXG4gICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICB0eXBlOiBcImZyYWN0aW9uXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAxMjAwOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS41LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuMyxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyUGFnaW5hdGlvbkN1cnJlbnQgPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JykudGV4dENvbnRlbnRcbiAgICAgICAgY29uc3Qgc3dpcGVyUGFnaW5hdGlvblRvdGFsID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tdG90YWwnKS50ZXh0Q29udGVudFxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnROdW1iZXJTbGlkZSA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJjdXJyZW50LW51bWJlci1zbGlkZVwiXScpXG4gICAgICAgIGNvbnN0IGFsbFF1YW50aXR5U2xpZGVzID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImFsbC1xdWFudGl0eS1zbGlkZXNcIl0nKVxuXG4gICAgICAgIGFsbFF1YW50aXR5U2xpZGVzLnRleHRDb250ZW50ID0gc3dpcGVyUGFnaW5hdGlvblRvdGFsXG4gICAgICAgIGN1cnJlbnROdW1iZXJTbGlkZS50ZXh0Q29udGVudCA9IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ICBcblxuXG4gICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgICAgICBjb25zdCBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnKS50ZXh0Q29udGVudFxuICAgICAgICAgICAgY3VycmVudE51bWJlclNsaWRlLnRleHRDb250ZW50ID0gc3dpcGVyUGFnaW5hdGlvbkN1cnJlbnQgICBcbiAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnKSwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLCBcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBiZXN0V29ya3MoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1iZXN0LXdvcmtzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXG59XG5cbmZ1bmN0aW9uIHZpZGVvQ2FyZCgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvLWNhcmQ9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1vZGFsUGljdHVyZShtYWlucylcbn1cblxuZnVuY3Rpb24gcHJvamVjdENhcmQoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcm9qZWN0LWNhcmQ9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cbiAgICBcbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXG59XG5cbmZ1bmN0aW9uIGJpZ1JlcGFpckNhcmQoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1iaWctcmVwYWlyLWNhcmQ9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1vZGFsUGljdHVyZShtYWlucylcblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwiYnRuLW5leHRcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gdG9vbHRpcCgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvb2x0aXA9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XG5cbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXRvb2x0aXA9XCJtYWluXCJdJykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBlbC5jbG9zZXN0KCdbZGF0YS10b29sdGlwPVwibWFpblwiXScpXG4gICAgICAgICAgICBjb25zdCB0b29sdGlwID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b29sdGlwPVwidG9vbHRpcFwiXScpXG5cbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10b29sdGlwPVwiYnRuLWNsb3NlXCJdJykpIHtcbiAgICAgICAgICAgICAgICB0b29sdGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1haW5zLmZvckVhY2goaXRlbU1haW4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbU1haW4gIT09IG1haW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvb2x0aXAgPSBpdGVtTWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b29sdGlwPVwidG9vbHRpcFwiXScpXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1haW5zLmZvckVhY2goaXRlbU1haW4gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRvb2x0aXAgPSBpdGVtTWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b29sdGlwPVwidG9vbHRpcFwiXScpXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHBvcHVsYXJTZXJ2aWNlcygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1uZXh0XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy4yLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDU3Njoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgYmxvY2tUYWdzID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwiYmxvY2stdGFnc1wiXScpXG5cbiAgICAgICAgaWYgKGJsb2NrVGFncykge1xuICAgICAgICAgICAgY29uc3QgYnRuTW9yZVRhZ3MgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJidG4tbW9yZS10YWdzXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGJ0bk1vcmVUYWdzVGV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1tb3JlLXRhZ3MtdGV4dFwiXScpXG5cbiAgICAgICAgICAgIGJ0bk1vcmVUYWdzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGJsb2NrVGFncy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxuXG4gICAgICAgICAgICAgICAgaWYgKGJsb2NrVGFncy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ0bk1vcmVUYWdzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1tb3JlJylcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3NUZXh0LnRleHRDb250ZW50ID0gJ9Ch0LLQtdGA0L3Rg9GC0YwnXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3MuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlLW1vcmUnKVxuICAgICAgICAgICAgICAgICAgICBidG5Nb3JlVGFnc1RleHQudGV4dENvbnRlbnQgPSAn0J/QvtC60LDQt9Cw0YLRjCDQstGB0LUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHdhcmVob3VzZSgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXdhcmVob3VzZT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS13YXJlaG91c2U9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS13YXJlaG91c2U9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS13YXJlaG91c2U9XCJidG4tbmV4dFwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuNSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNCxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjIsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLjIsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDU3Njoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjIsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGd1YXJhbnRlZXMoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ndWFyYW50ZWVzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWd1YXJhbnRlZXM9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1ndWFyYW50ZWVzPVwicGFnaW5hdGlvblwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZGlzY291bnQoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kaXNjb3VudD1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaXNjb3VudD1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc2NvdW50PVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc2NvdW50PVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaXNjb3VudD1cImJ0bi1wcmV2XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS40LFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNSxcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgICAgIHJvd3M6IDIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAxMjAwOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDUuNSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LjUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy41LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNTc2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuNSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gdmlkZW9TbGlkZXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12aWRlby1zbGlkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwicGFnaW5hdGlvblwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXNsaWRlcj1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwiYnRuLXByZXZcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAxMjAwOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMuNCxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA1NzY6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gbGFyZ2VTZWN0aW9uKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbGFyZ2Utc2VjdGlvbj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgYmxvY2tzU2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1sYXJnZS1zZWN0aW9uPVwiYmxvY2stc2xpZGVyXCJdJylcblxuICAgICAgICBpZiAoYmxvY2tzU2xpZGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgYmxvY2tzU2xpZGVyLmZvckVhY2goYmxvY2tTbGlkZXIgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWRlciA9IGJsb2NrU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxhcmdlLXNlY3Rpb249XCJzbGlkZXJcIl0nKVxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0bk5leHQgPSBibG9ja1NsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1sYXJnZS1zZWN0aW9uPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0blByZXYgPSBibG9ja1NsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1sYXJnZS1zZWN0aW9uPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBxdWl6KCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcXVpej1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgcGVyZm9ybWFuY2UgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJwZXJmb3JtYW5jZVwiXScpXG4gICAgICAgIGNvbnN0IGJ0blN0YXJ0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLXN0YXJ0XCJdJylcbiAgICAgICAgY29uc3QgcXVpeiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcXVpej1cInF1aXpcIl0nKVxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwicGFnaW5hdGlvblwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBzd2lwZXJNYWluLnNsaWRlVG8oaW5kZXgsIDQwMCwgdHJ1ZSlcblxuICAgICAgICBidG5TdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICBxdWl6LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItc2xpZGUnKVxuXG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJhZGlvcyA9IHNsaWRlLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYWRpbycpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcbiAgICAgICAgICAgICAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmFkaW9zLmZvckVhY2gocmFkaW8yID0+IHJhZGlvMi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSlcbiAgICAgICAgICAgICAgICAgICAgcmFkaW8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBuYXZMaXN0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwibmF2LWxpc3RcIl0nKVxuICAgICAgICBjb25zdCBjb3V0U2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItc2xpZGUnKVxuXG4gICAgICAgIGlmIChjb3V0U2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291dFNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBmaXJzdEVsZW1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdEVsZW0gPSB0cnVlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFbGVtID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmF2TGlzdC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwicXVpel9fc2xpZGVyLW5hdi1saSAke2ZpcnN0RWxlbSA/ICdhY3RpdmUtY3VycmVudCcgOiAnJ31cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdWl6X19zbGlkZXItbmF2LWxpLWNvbnRlbnRcIj4ke2l9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgICAgICBjb25zdCBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCA9ICtwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JykudGV4dENvbnRlbnRcbiAgICAgICAgICAgIGNvbnN0IG5hdkxpc3QgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJuYXYtbGlzdFwiXScpXG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBuYXZMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcbiAgICAgICAgICAgIGxpc3RJdGVtcy5mb3JFYWNoKChsaXN0SXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IGluZGV4ICsgMVxuICAgICAgICAgICAgICAgIGlmIChuZXdJbmRleCA8IHN3aXBlclBhZ2luYXRpb25DdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1wYXNzZWQnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1wYXNzZWQnKVxuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUtY3VycmVudCcpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0luZGV4ID09PSBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtY3VycmVudCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnKSwge1xuICAgICAgICAgICAgY2hpbGRMaXN0OiB0cnVlLCBcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBwcmljZXNUeXBlV29yaygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXByaWNlcy10eXBlLXdvcms9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHdyYXBwZXJUYWJsZSA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJpY2VzLXR5cGUtd29yaz1cIndyYXBwZXItdGFibGVcIl0nKVxuICAgICAgICBjb25zdCBidG5Nb3JlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmljZXMtdHlwZS13b3JrPVwiYnRuLW1vcmVcIl0nKVxuXG4gICAgICAgIGJ0bk1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB3cmFwcGVyVGFibGUuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgIGJ0bk1vcmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHJldmlld3MoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXZpZXdzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3Qgd3JhcHBlclJldmlld3MgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJ3cmFwcGVyLXJldmlld3NcIl0nKVxuICAgICAgICAgICAgY29uc3QgYnRuTW9yZSA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cImJ0bi1tb3JlXCJdJylcbiAgICBcbiAgICAgICAgICAgIGJ0bk1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgd3JhcHBlclJldmlld3MuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICBidG5Nb3JlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB3cmFwSW5uZXJSZXZpZXdzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZXZpZXdzPVwid3JhcC1pbm5lci1yZXZpZXdzXCJdJylcblxuICAgICAgICAgICAgd3JhcElubmVyUmV2aWV3cy5mb3JFYWNoKHdyYXBJbm5lclJldmlldyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5uZXJSZXZpZXdzID0gd3JhcElubmVyUmV2aWV3LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJpbm5lci1yZXZpZXdzXCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBidG5Db2x1bW5Nb3JlID0gd3JhcElubmVyUmV2aWV3LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJidG4tY29sdW1uLW1vcmVcIl0nKVxuXG4gICAgICAgICAgICAgICAgYnRuQ29sdW1uTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJSZXZpZXdzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIGJ0bkNvbHVtbk1vcmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuaGVhZGVyKClcbmZsb2F0aW5nQmxvY2soKVxuZml4ZWRIZWFkZXIoKVxuaW5mb0JhcigpXG5zbGlkZXJDYXJkc01vYigpXG5zbGlkZXJDYXJkcygpXG50YWJzKClcbmZhcSgpXG5zbGlkZXJSYW5nZSgpXG5jb3VudGVyKClcbmNlcnRpZmljYXRlcygpXG5zcGVjaWFsaXN0Q2FyZCgpXG5mZWVkYmFjaygpXG5vcmRlcldvcmsoKVxuY29udGFjdHMoKVxuc2VsZWN0KClcbmV4YW1wbGVzV29ya3MoKVxuYmVzdFdvcmtzKClcbnByb2plY3RDYXJkKClcbmJpZ1JlcGFpckNhcmQoKVxudG9vbHRpcCgpXG5wb3B1bGFyU2VydmljZXMoKVxud2FyZWhvdXNlKClcbmd1YXJhbnRlZXMoKVxuZGlzY291bnQoKVxudmlkZW9TbGlkZXIoKVxubGFyZ2VTZWN0aW9uKClcbnF1aXooKVxucHJpY2VzVHlwZVdvcmsoKVxucmV2aWV3cygpXG5tb2RhbCgpXG5waG9uZU1hc2soKSJdLCJmaWxlIjoibWFpbi5qcyJ9