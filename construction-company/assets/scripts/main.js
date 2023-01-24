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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XHJcblxyXG4gICAgaWYgKCFidG4gJiYgIWVsKSByZXR1cm5cclxuICAgIFxyXG4gICAgbGV0IGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XHJcblxyXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xyXG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgIHJlbW92ZSgpXHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFkZCgpXHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xyXG4gICAgICAgIGlmIChoZWlnaHRFbCA8IHN0YXJ0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJlbW92ZSgpXHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxyXG4gICAgICAgIH0sIDEwMClcclxuICAgIH1cclxuXHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygnbm90LWFjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIHJlbW92ZSgpXHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFkZCgpXHJcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25SZWNvcmRzID0+IHtcclxuICAgICAgICB1cGRhdGUoKVxyXG4gICAgfSlcclxuICAgICAgICBcclxuICAgIG9ic2VydmVyLm9ic2VydmUoZWwsIHtcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsIFxyXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YU9sZFZhbHVlOiB0cnVlXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBtb2RhbCgpIHtcclxuICAgIHJldHVybiBuZXcgSHlzdE1vZGFsKHtcclxuICAgICAgICBsaW5rQXR0cmlidXRlTmFtZTogXCJkYXRhLWh5c3Rtb2RhbFwiLFxyXG4gICAgICAgIHdhaXRUcmFuc2l0aW9uczogdHJ1ZSxcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBob25lTWFzaygpIHtcclxuICAgIGNvbnN0IHBob25lTWFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1waG9uZS1tYXNrXScpXHJcblxyXG4gICAgaWYgKCFwaG9uZU1hc2tzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgcGhvbmVNYXNrcy5mb3JFYWNoKHBob25lTWFzayA9PiB7XHJcbiAgICAgICAgSU1hc2socGhvbmVNYXNrLCB7XHJcbiAgICAgICAgICAgICAgICBtYXNrOiAnK3s3fSgwMDApMDAwLTAwLTAwJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1vZGFsUGljdHVyZShibG9ja1BpY3R1cmVzKSB7XHJcblxyXG4gICAgaWYgKCFibG9ja1BpY3R1cmVzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbGV0IGJwID0gQmlnZ2VyUGljdHVyZSh7XHJcbiAgICAgICAgdGFyZ2V0OiBkb2N1bWVudC5ib2R5LFxyXG4gICAgfSlcclxuXHJcbiAgICBjb25zdCBvcGVuR2FsbGVyeSA9IChldmVudCwgcGljdHVyZXMpID0+IHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgYnAub3Blbih7XHJcbiAgICAgICAgICAgIGl0ZW1zOiBwaWN0dXJlcyxcclxuICAgICAgICAgICAgZWw6IGV2ZW50LmN1cnJlbnRUYXJnZXQsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBibG9ja1BpY3R1cmVzLmZvckVhY2goYmxvY2tQaWN0dXJlID0+IHtcclxuICAgICAgICBjb25zdCBwaWN0dXJlcyA9IGJsb2NrUGljdHVyZS5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tb2RhbC1waWN0dXJlPVwibWFpblwiXSBhW2RhdGEtbW9kYWwtcGljdHVyZT1cImxpbmtcIl0nKVxyXG5cclxuICAgICAgICBpZiAocGljdHVyZXMubGVuZ3RoKSB7XHJcblxyXG4gICAgICAgICAgICBwaWN0dXJlcy5mb3JFYWNoKHBpY3R1cmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBwaWN0dXJlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbWFnZVNvdXJjZSA9IGltYWdlLmdldEF0dHJpYnV0ZSgnc3JjJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXHJcblxyXG4gICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMud2lkdGhcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoaWdodCA9IHRoaXMuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgcGljdHVyZS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaGVpZ2h0JywgaGlnaHQgKiA0KVxyXG4gICAgICAgICAgICAgICAgICAgIHBpY3R1cmUuc2V0QXR0cmlidXRlKCdkYXRhLXdpZHRoJywgd2lkdGggKiA0KVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBpbWFnZVNvdXJjZTtcclxuXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuR2FsbGVyeShldmVudCwgcGljdHVyZXMpIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBoZWFkZXIoKSB7XHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJoZWFkZXJcIl0nKVxyXG5cclxuICAgIGlmICghaGVhZGVyKSByZXR1cm5cclxuXHJcbiAgICAvLyBjb25zdCBoZWlnaHRIZWFkZXIgPSBoZWFkZXIub2Zmc2V0SGVpZ2h0XHJcbiAgICAvLyBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGFnZT1cInBhZ2VcIl0nKVxyXG5cclxuICAgIC8vIGlmIChwYWdlKSBwYWdlLnN0eWxlLm1hcmdpblRvcCA9IGAke2hlaWdodEhlYWRlcn1weGBcclxuXHJcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMpIHtcclxuICAgICAgICBjb25zdCB3cmFwcGVyTW9iU2VhcmNoID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIndyYXBwZXItbW9iLXNlYXJjaFwiXScpXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlck1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1tZW51XCJdJylcclxuICAgICAgICBjb25zdCB3cmFwcGVyTWVudUNvbnRhaW5lciA9IHdyYXBwZXJNZW51LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLWNvbnRhaW5lcicpXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlck5hdiA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJ3cmFwcGVyLW5hdlwiXScpXHJcbiAgICAgICAgY29uc3Qgd3JhcHBlck5hdkNvbnRhaW5lciA9IHdyYXBwZXJOYXYucXVlcnlTZWxlY3RvcignLm1haW4tY29udGFpbmVyJylcclxuICAgICAgICBjb25zdCBuYXYgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibmF2XCJdJylcclxuICAgICAgICBjb25zdCBibG9ja0luZm8gPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiYmxvY2staW5mb1wiXScpXHJcbiAgICAgICAgY29uc3Qgc29jaWFsTmV0d29yayA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJzb2NpYWwtbmV0d29ya1wiXScpXHJcbiAgICAgICAgY29uc3Qgc2VhcmNoID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cInNlYXJjaFwiXScpXHJcbiAgICAgICAgY29uc3QgbG9nbyA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJsb2dvXCJdJylcclxuXHJcbiAgICAgICAgY29uc3QgY2xvbmVkTmF2ID0gbmF2LmNsb25lTm9kZSh0cnVlKVxyXG4gICAgICAgIGNvbnN0IGNsb25lZEJsb2NrSW5mbyA9IGJsb2NrSW5mby5jbG9uZU5vZGUodHJ1ZSlcclxuICAgICAgICBjb25zdCBjbG9uZWRTb2NpYWxOZXR3b3JrID0gc29jaWFsTmV0d29yay5jbG9uZU5vZGUodHJ1ZSlcclxuICAgICAgICBjb25zdCBjbG9uZWRTZWFyY2ggPSBzZWFyY2guY2xvbmVOb2RlKHRydWUpXHJcbiAgICAgICAgY29uc3QgY2xvbmVkTG9nbyA9IGxvZ28uY2xvbmVOb2RlKHRydWUpXHJcblxyXG4gICAgICAgIHdyYXBwZXJNZW51Q29udGFpbmVyLmFwcGVuZChjbG9uZWROYXYpXHJcbiAgICAgICAgd3JhcHBlck1lbnVDb250YWluZXIuYXBwZW5kKGNsb25lZEJsb2NrSW5mbylcclxuICAgICAgICB3cmFwcGVyTWVudUNvbnRhaW5lci5hcHBlbmQoY2xvbmVkU29jaWFsTmV0d29yaylcclxuICAgICAgICB3cmFwcGVyTW9iU2VhcmNoLmFwcGVuZChjbG9uZWRTZWFyY2gpXHJcbiAgICAgICAgd3JhcHBlck5hdkNvbnRhaW5lci5wcmVwZW5kKGNsb25lZExvZ28pXHJcblxyXG4gICAgICAgIG5hdi5yZW1vdmUoKVxyXG4gICAgICAgIGJsb2NrSW5mby5yZW1vdmUoKVxyXG4gICAgICAgIHNvY2lhbE5ldHdvcmsucmVtb3ZlKClcclxuICAgICAgICBzZWFyY2gucmVtb3ZlKClcclxuICAgICAgICBsb2dvLnJlbW92ZSgpXHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjbG9uZWRXcmFwcGVyTWVudSA9IHdyYXBwZXJNZW51LmNsb25lTm9kZSh0cnVlKVxyXG4gICAgICAgICAgICB3cmFwcGVyTmF2LmFwcGVuZChjbG9uZWRXcmFwcGVyTWVudSlcclxuICAgICAgICAgICAgd3JhcHBlck1lbnUucmVtb3ZlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBidG5TZWFyY2ggPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwiYnRuLXNlYXJjaFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJidG4tbWVudVwiXScpXHJcblxyXG4gICAgICAgIGJ0blNlYXJjaC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlck1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1tZW51XCJdJylcclxuICAgICAgICAgICAgd3JhcHBlck1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgIHdyYXBwZXJNb2JTZWFyY2guY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICB9KVxyXG4gXHJcbiAgICAgICAgYnRuTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgd3JhcHBlck1vYlNlYXJjaC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgd3JhcHBlck1lbnUgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwid3JhcHBlci1tZW51XCJdJylcclxuICAgICAgICAgICAgd3JhcHBlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSBidG5NZW51LnF1ZXJ5U2VsZWN0b3IoJ3VzZScpXHJcbiAgICAgICAgICAgIGlmICh3cmFwcGVyTWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLnNldEF0dHJpYnV0ZSgneGxpbms6aHJlZicsICcuL2Fzc2V0cy9pY29ucy9zcHJpdGUtc3ZnLnN2ZyNtZW51LWNsb3NlJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGljb24uc2V0QXR0cmlidXRlKCd4bGluazpocmVmJywgJy4vYXNzZXRzL2ljb25zL3Nwcml0ZS1zdmcuc3ZnI21lbnUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcclxuICAgICAgICBcclxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJy5oZWFkZXJfX21lbnUtYmxvY2stYm9keS0tbGFzdCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwiaGVhZFwiXScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWhlYWRlcj1cImhlYWRcIl0nKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGVhZC5uZXh0RWxlbWVudFNpYmxpbmcuaGFzQXR0cmlidXRlKCdkYXRhLWhlYWRlcicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gaGVhZC5uZXh0RWxlbWVudFNpYmxpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1oZWFkZXI9XCJoZWFkXCJdJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBlbC5jbG9zZXN0KCdbZGF0YS1oZWFkZXI9XCJoZWFkXCJdJylcclxuICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoZWFkLm5leHRFbGVtZW50U2libGluZy5oYXNBdHRyaWJ1dGUoJ2RhdGEtaGVhZGVyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYm9keSA9IGhlYWQubmV4dEVsZW1lbnRTaWJsaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZsb2F0aW5nQmxvY2soKSB7XHJcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMpIHtcclxuICAgICAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZmxvYXRpbmctYmxvY2s9XCJtYWluXCJdJylcclxuXHJcbiAgICAgICAgaWYgKCFtYWluKSByZXR1cm5cclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHNjcm9sbGVkID49IDEwKSB7XHJcbiAgICAgICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaXhlZEhlYWRlcigpIHtcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cImhlYWRlclwiXScpXHJcblxyXG4gICAgaWYgKCFoZWFkZXIpIHJldHVyblxyXG5cclxuICAgIGxldCBmaXhlZENsYXNzXHJcblxyXG4gICAgd2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiAxMjAwcHgpXCIpLm1hdGNoZXMgPyBmaXhlZENsYXNzID0gJ2hlYWRlci0tZml4ZWQnIDogZml4ZWRDbGFzcyA9ICdoZWFkZXItLWZpeGVkLW1vYidcclxuXHJcbiAgICBjb25zdCBsb2dpYyA9IChzY3JvbGxlZCkgPT4ge1xyXG4gICAgICAgIGlmIChzY3JvbGxlZCA+PSAxMCkge1xyXG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZChmaXhlZENsYXNzKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKGZpeGVkQ2xhc3MpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxvZ2ljKHdpbmRvdy5wYWdlWU9mZnNldClcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuICAgICAgICBcclxuICAgICAgICBsb2dpYyhzY3JvbGxlZClcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluZm9CYXIoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcclxuXHJcbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpICYmIGVsLmNsb3Nlc3QoJ1tkYXRhLWluZm8tYmFyPVwiYnRuLWNsb3NlXCJdJykpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5mb0JhciA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWluZm8tYmFyPVwibWFpblwiXScpXHJcbiAgICAgICAgICAgIGluZm9CYXIuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXHJcblxyXG4gICAgICAgICAgICBjb25zdCBwYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGFnZT1cInBhZ2VcIl0nKVxyXG4gICAgICAgICAgICBpZiAocGFnZS5jbGFzc0xpc3QuY29udGFpbnMoJ21haW4tcGFnZScpKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlLnN0eWxlLm1hcmdpblRvcCA9ICcxNjhweCdcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gJzIzMHB4J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA1NzZweClcIikubWF0Y2hlcykge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4gbWFpbi5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJykpXHJcbiAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wYWdlPVwicGFnZVwiXScpXHJcbiAgICAgICAgICAgIGlmIChwYWdlLmNsYXNzTGlzdC5jb250YWlucygnbWFpbi1wYWdlJykpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2Uuc3R5bGUubWFyZ2luVG9wID0gJzE2OHB4J1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFnZS5zdHlsZS5tYXJnaW5Ub3AgPSAnMjMwcHgnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwMClcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2xpZGVyQ2FyZHNNb2IoKSB7XHJcbiAgICBjb25zdCBzbGlkZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyLWNhcmRzLW1vYj1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDU3NnB4KVwiKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgc2xpZGVycy5mb3JFYWNoKGl0ZW1TbGlkZXIgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzbGlkZXIgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHMtbW9iPVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0bk5leHQgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0blByZXYgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcy1tb2I9XCJidG4tcHJldlwiXScpXHJcblxyXG4gICAgICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNsaWRlckNhcmRzKCkge1xyXG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1jYXJkcz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxyXG5cclxuXHJcbiAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcz1cInBhZ2luYXRpb25cIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBpdGVtU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkcz1cImJ0bi1uZXh0XCJdJylcclxuICAgICAgICBjb25zdCBidG5QcmV2ID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZHM9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgbnVtYmVyTGluZXMgPSBzbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1jYXJkcy1saW5lcycpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICA5OTI6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNzY3OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgICAgICAgICBncmlkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3M6IG51bWJlckxpbmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gdGFicygpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IGxpcyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFicz1cImxpXCJdJylcclxuXHJcbiAgICAgICAgbGlzLmZvckVhY2goKGxpLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy1pbmRleCcsIGluZGV4KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcclxuXHJcbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXRhYnM9XCJtYWluXCJdJykpIHsgICBcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibWFpblwiXScpXHJcblxyXG4gICAgICAgICAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYnM9XCJsaVwiXScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwidGFiXCJdJylcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGxpcy5mb3JFYWNoKChsaSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIHRhYnNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9ICAgICBcclxuXHJcbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibGlcIl0nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBlbC5jbG9zZXN0KCdbZGF0YS10YWJzPVwibGlcIl0nKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSBsaS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy1pbmRleCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJzID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWJzPVwidGFiXCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIWxpLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmUoKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgdGFic1tpbmRleF0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZhcSgpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmFxPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3QgY2FyZHMgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZhcT1cImNhcmRcIl0nKVxyXG5cclxuICAgICAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZWFkID0gY2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJoZWFkXCJdJylcclxuICAgICAgICAgICAgY29uc3QgYm9keSA9IGNhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiYm9keVwiXScpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzbW9vdGhWaWV3KGhlYWQsIGJvZHkpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNsaWRlclJhbmdlKCkge1xyXG4gICAgY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1yYW5nZT1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghc2xpZGVycy5sZW5ndGgpIHJldHVyblxyXG4gICAgXHJcbiAgICBzbGlkZXJzLmZvckVhY2goaXRlbVNsaWRlciA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gaXRlbVNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItcmFuZ2U9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1zdGFydCcpXHJcbiAgICAgICAgY29uc3QgbWluID0gK2l0ZW1TbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlci1yYW5nZS1taW4nKVxyXG4gICAgICAgIGNvbnN0IG1heCA9ICtpdGVtU2xpZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZXItcmFuZ2UtbWF4JylcclxuXHJcbiAgICAgICAgbm9VaVNsaWRlci5jcmVhdGUoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgICAgICAgY29ubmVjdDogJ2xvd2VyJyxcclxuICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICdtaW4nOiBbbWluXSxcclxuICAgICAgICAgICAgICAgICdtYXgnOiBbbWF4XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb3VudGVyKCkge1xyXG4gICAgY29uc3QgcGFyZW50QmxvY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2RhdGEtY291bnRlcj1cImNvdW50ZXJcIl1gKVxyXG4gICAgaWYgKCFwYXJlbnRCbG9ja3MubGVuZ3RoKSByZXR1cm5cclxuICAgIHBhcmVudEJsb2Nrcy5mb3JFYWNoKGVsZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY291bnRlcj1cInJlbW92ZVwiXScpXHJcbiAgICAgICAgY29uc3QgYWRkID0gZWxlbS5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb3VudGVyPVwiYWRkXCJdJylcclxuICAgICAgICBjb25zdCBpbnB1dCA9IGVsZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtY291bnRlcj1cImlucHV0XCJdJylcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG1heCA9ICtpbnB1dC5nZXRBdHRyaWJ1dGUoJ21heCcpXHJcbiAgICAgICAgY29uc3QgbWluID0gK2lucHV0LmdldEF0dHJpYnV0ZSgnbWluJylcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IHZhbGlkSW5wdXQgPSAodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9ICt2YWx1ZVxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgaW5wdXRWYWx1ZSA8PSBtaW46XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBtaW5cclxuICAgICAgICAgICAgICAgICAgICByZW1vdmUuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgaW5wdXRWYWx1ZSA+PSBtYXg6XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBtYXhcclxuICAgICAgICAgICAgICAgICAgICBhZGQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICcnKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIGFkZC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXHJcbiAgICBcclxuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlucHV0LnZhbHVlKVxyXG4gICAgICAgICAgICB2YWxpZElucHV0KGlucHV0LnZhbHVlKVxyXG4gICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICBhZGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0LnZhbHVlKytcclxuICAgICAgICAgICAgdmFsaWRJbnB1dChpbnB1dC52YWx1ZSlcclxuICAgICAgICB9KVxyXG4gICAgXHJcbiAgICAgICAgcmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpbnB1dC52YWx1ZS0tXHJcbiAgICAgICAgICAgIHZhbGlkSW5wdXQoaW5wdXQudmFsdWUpXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNlcnRpZmljYXRlcygpIHtcclxuICAgIGNvbnN0IGNlcnRpZmljYXRlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNlcnRpZmljYXRlcz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghY2VydGlmaWNhdGVzLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKGNlcnRpZmljYXRlcylcclxuXHJcbiAgICBjZXJ0aWZpY2F0ZXMuZm9yRWFjaChjZXJ0aWZpY2F0ZSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gY2VydGlmaWNhdGUucXVlcnlTZWxlY3RvcignW2RhdGEtY2VydGlmaWNhdGVzPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gY2VydGlmaWNhdGUucXVlcnlTZWxlY3RvcignW2RhdGEtY2VydGlmaWNhdGVzPVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IGNlcnRpZmljYXRlLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNlcnRpZmljYXRlcz1cImJ0bi1uZXh0XCJdJylcclxuICAgICAgICBjb25zdCBidG5QcmV2ID0gY2VydGlmaWNhdGUucXVlcnlTZWxlY3RvcignW2RhdGEtY2VydGlmaWNhdGVzPVwiYnRuLXByZXZcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjMsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDk5Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAzMyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njc6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi41LFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc3BlY2lhbGlzdENhcmQoKSB7XHJcbiAgICBjb25zdCBzcGVjaWFsaXN0Q2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIXNwZWNpYWxpc3RDYXJkcy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIHNwZWNpYWxpc3RDYXJkcy5mb3JFYWNoKHNwZWNpYWxpc3RDYXJkID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXJTcGVjaWFsaXN0cyA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cInNsaWRlci1zcGVjaWFsaXN0c1wiXScpXHJcbiAgICAgICAgY29uc3Qgc2xpZGVySW5mb1NwZWNpYWxpc3RzID0gc3BlY2lhbGlzdENhcmQucXVlcnlTZWxlY3RvcignW2RhdGEtc3BlY2lhbGlzdC1jYXJkPVwic2xpZGVyLWluZm8tc3BlY2lhbGlzdHNcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBzcGVjaWFsaXN0Q2FyZC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zcGVjaWFsaXN0LWNhcmQ9XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IHNwZWNpYWxpc3RDYXJkLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNwZWNpYWxpc3QtY2FyZD1cImJ0bi1wcmV2XCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyU3BlY2lhbGlzdHMgPSBuZXcgU3dpcGVyKHNsaWRlclNwZWNpYWxpc3RzLCB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlckluZm9TcGVjaWFsaXN0cyA9IG5ldyBTd2lwZXIoc2xpZGVySW5mb1NwZWNpYWxpc3RzLCB7XHJcbiAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmYWxzZSxcclxuICAgICAgICAgICAgZWZmZWN0OiBcImZhZGVcIixcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBzd2lwZXJJbmZvU3BlY2lhbGlzdHMuY29udHJvbGxlci5jb250cm9sID0gc3dpcGVyU3BlY2lhbGlzdHNcclxuICAgICAgICBzd2lwZXJTcGVjaWFsaXN0cy5jb250cm9sbGVyLmNvbnRyb2wgPSBzd2lwZXJJbmZvU3BlY2lhbGlzdHNcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZlZWRiYWNrKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mZWVkYmFjaz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZmVlZGJhY2s9XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZlZWRiYWNrPVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZlZWRiYWNrPVwiYnRuLXByZXZcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZlZWRiYWNrPVwicGFnaW5hdGlvblwiXScpXHJcblxyXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogNDAsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gb3JkZXJXb3JrKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vcmRlci13b3JrPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci13b3JrPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBoZWlnaHRTbGlkZXIgPSBzbGlkZXIub2Zmc2V0SGVpZ2h0XHJcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW9yZGVyLXdvcms9XCJzbGlkZXJcIl0gLnN3aXBlci1zbGlkZScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtb3JkZXItd29yaz1cImJ0bi1uZXh0XCJdJylcclxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vcmRlci13b3JrPVwiYnRuLXByZXZcIl0nKVxyXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW9yZGVyLXdvcms9XCJwYWdpbmF0aW9uXCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDcyLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA5OTI6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHRTbGlkZXJ9cHhgKVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gY29udGFjdHMoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbnRhY3RzPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XHJcbiAgICAgICAgY29uc3QgYmxvY2tzSW5mbyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29udGFjdHM9XCJibG9jay1pbmZvXCJdJylcclxuXHJcbiAgICAgICAgYmxvY2tzSW5mby5mb3JFYWNoKGJsb2NrSW5mbyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlYWQgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtY29udGFjdHM9XCJoZWFkXCJdJylcclxuICAgICAgICAgICAgY29uc3QgYm9keSA9IGJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb250YWN0cz1cImJvZHlcIl0nKVxyXG5cclxuICAgICAgICAgICAgc21vb3RoVmlldyhoZWFkLCBib2R5KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZWxlY3QoKSB7XHJcbiAgICBjb25zdCBzZWxlY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2VsZWN0PVwic2VsZWN0XCJdJylcclxuXHJcbiAgICBpZiAoIXNlbGVjdHMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBjb25zdCBoaWRlQWxsID0gKCkgPT4ge1xyXG4gICAgICAgIHNlbGVjdHMuZm9yRWFjaChlbFNlbGVjdCA9PiB7XHJcbiAgICAgICAgICAgIGVsU2VsZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJzZWxlY3RcIl0nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3QgPSBlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJzZWxlY3RcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZWxlY3Q9XCJ0aXRsZVwiXScpXHJcblxyXG4gICAgICAgICAgICBjb25zdCByZW1vdmVDbGFzc1NlbGVjdGVkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdEl0ZW1zID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNlbGVjdD1cImxpc3RcIl0gPiBsaScpXHJcblxyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW1zLmZvckVhY2gobGlzdEl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdF9fbGktLXNlbGVjdGVkJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1zZWxlY3Q9XCJibG9jay10aXRsZVwiXScpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RzLmZvckVhY2goZWxTZWxlY3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbFNlbGVjdCAhPT0gc2VsZWN0KSBlbFNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxlY3QuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImxpc3RcIl0gPiBsaSBzcGFuJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZWwuY2xvc2VzdCgnW2RhdGEtc2VsZWN0PVwibGlzdFwiXSA+IGxpJylcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRleHRMaSA9IGVsLmNsb3Nlc3QoJ1tkYXRhLXNlbGVjdD1cImxpc3RcIl0gPiBsaSA+IHNwYW4nKVxyXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3NTZWxlY3RlZCgpXHJcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RfX2xpLS1zZWxlY3RlZCcpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaUNvbnRlbnQgPSB0ZXh0TGkudGV4dENvbnRlbnRcclxuICAgICAgICAgICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gbGlDb250ZW50XHJcbiAgICAgICAgICAgICAgICBzZWxlY3Quc2V0QXR0cmlidXRlKCdkYXRhLXNlbGVjdC12YWx1ZScsIGxpQ29udGVudClcclxuICAgICAgICAgICAgICAgIHNlbGVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGlkZUFsbCgpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gZXhhbXBsZXNXb3JrcygpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cInBhZ2luYXRpb25cIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwiYnRuLXByZXZcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWV4YW1wbGVzLXdvcmtzPVwiYnRuLW5leHRcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDI0LFxyXG4gICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgIHR5cGU6IFwiZnJhY3Rpb25cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDEyMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDk5Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnKS50ZXh0Q29udGVudFxyXG4gICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25Ub3RhbCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLXRvdGFsJykudGV4dENvbnRlbnRcclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudE51bWJlclNsaWRlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1leGFtcGxlcy13b3Jrcz1cImN1cnJlbnQtbnVtYmVyLXNsaWRlXCJdJylcclxuICAgICAgICBjb25zdCBhbGxRdWFudGl0eVNsaWRlcyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZXhhbXBsZXMtd29ya3M9XCJhbGwtcXVhbnRpdHktc2xpZGVzXCJdJylcclxuXHJcbiAgICAgICAgYWxsUXVhbnRpdHlTbGlkZXMudGV4dENvbnRlbnQgPSBzd2lwZXJQYWdpbmF0aW9uVG90YWxcclxuICAgICAgICBjdXJyZW50TnVtYmVyU2xpZGUudGV4dENvbnRlbnQgPSBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCAgXHJcblxyXG5cclxuICAgICAgICBsZXQgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihtdXRhdGlvblJlY29yZHMgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnKS50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICBjdXJyZW50TnVtYmVyU2xpZGUudGV4dENvbnRlbnQgPSBzd2lwZXJQYWdpbmF0aW9uQ3VycmVudCAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLCB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSwgXHJcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGFPbGRWYWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBiZXN0V29ya3MoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJlc3Qtd29ya3M9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxyXG59XHJcblxyXG5mdW5jdGlvbiB2aWRlb0NhcmQoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvLWNhcmQ9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbW9kYWxQaWN0dXJlKG1haW5zKVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcm9qZWN0Q2FyZCgpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJvamVjdC1jYXJkPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG4gICAgXHJcbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJpZ1JlcGFpckNhcmQoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtYmlnLXJlcGFpci1jYXJkPVwiYnRuLXByZXZcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWJpZy1yZXBhaXItY2FyZD1cImJ0bi1uZXh0XCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNCxcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gdG9vbHRpcCgpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdG9vbHRpcD1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XHJcblxyXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10b29sdGlwPVwibWFpblwiXScpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBlbC5jbG9zZXN0KCdbZGF0YS10b29sdGlwPVwibWFpblwiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IHRvb2x0aXAgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvb2x0aXA9XCJ0b29sdGlwXCJdJylcclxuXHJcbiAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10b29sdGlwPVwiYnRuLWNsb3NlXCJdJykpIHtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1haW5zLmZvckVhY2goaXRlbU1haW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtTWFpbiAhPT0gbWFpbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b29sdGlwID0gaXRlbU1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdG9vbHRpcD1cInRvb2x0aXBcIl0nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWFpbnMuZm9yRWFjaChpdGVtTWFpbiA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b29sdGlwID0gaXRlbU1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdG9vbHRpcD1cInRvb2x0aXBcIl0nKVxyXG4gICAgICAgICAgICAgICAgdG9vbHRpcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvcHVsYXJTZXJ2aWNlcygpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cInBhZ2luYXRpb25cIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBvcHVsYXItc2VydmljZXM9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1uZXh0XCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xyXG4gICAgICAgICAgICAgICAgOTkyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy4yLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDc2ODoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1NzY6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGJsb2NrVGFncyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJsb2NrLXRhZ3NcIl0nKVxyXG5cclxuICAgICAgICBpZiAoYmxvY2tUYWdzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJ0bk1vcmVUYWdzID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wb3B1bGFyLXNlcnZpY2VzPVwiYnRuLW1vcmUtdGFnc1wiXScpXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0bk1vcmVUYWdzVGV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcG9wdWxhci1zZXJ2aWNlcz1cImJ0bi1tb3JlLXRhZ3MtdGV4dFwiXScpXHJcblxyXG4gICAgICAgICAgICBidG5Nb3JlVGFncy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJsb2NrVGFncy5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUnKVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChibG9ja1RhZ3MuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0bk1vcmVUYWdzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1tb3JlJylcclxuICAgICAgICAgICAgICAgICAgICBidG5Nb3JlVGFnc1RleHQudGV4dENvbnRlbnQgPSAn0KHQstC10YDQvdGD0YLRjCdcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuTW9yZVRhZ3MuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlLW1vcmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bk1vcmVUYWdzVGV4dC50ZXh0Q29udGVudCA9ICfQn9C+0LrQsNC30LDRgtGMINCy0YHQtSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiB3YXJlaG91c2UoKSB7XHJcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXdhcmVob3VzZT1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtb2RhbFBpY3R1cmUobWFpbnMpXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdhcmVob3VzZT1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtd2FyZWhvdXNlPVwiYnRuLXByZXZcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXdhcmVob3VzZT1cImJ0bi1uZXh0XCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi41LFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDQsXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicHJvZ3Jlc3NiYXJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDk5Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDgsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy4yLFxyXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA1NzY6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBndWFyYW50ZWVzKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1ndWFyYW50ZWVzPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1vZGFsUGljdHVyZShtYWlucylcclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZ3VhcmFudGVlcz1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtZ3VhcmFudGVlcz1cInBhZ2luYXRpb25cIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNjb3VudCgpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZGlzY291bnQ9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc2NvdW50PVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kaXNjb3VudD1cInBhZ2luYXRpb25cIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc2NvdW50PVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRpc2NvdW50PVwiYnRuLXByZXZcIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjQsXHJcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTUsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwcm9ncmVzc2JhclwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGdyaWQ6IHtcclxuICAgICAgICAgICAgICAgIHJvd3M6IDIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XHJcbiAgICAgICAgICAgICAgICAxMjAwOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNS41LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDk5Mjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQuNSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICA3Njg6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLjUsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNTc2OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi41LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHZpZGVvU2xpZGVyKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12aWRlby1zbGlkZXI9XCJtYWluXCJdJylcclxuXHJcbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXHJcblxyXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcclxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXNsaWRlcj1cInNsaWRlclwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwicGFnaW5hdGlvblwiXScpXHJcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tc2xpZGVyPVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXNsaWRlcj1cImJ0bi1wcmV2XCJdJylcclxuXHJcbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcclxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDEyMDA6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLjQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgNzY4OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi40LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Njoge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gbGFyZ2VTZWN0aW9uKCkge1xyXG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1sYXJnZS1zZWN0aW9uPVwibWFpblwiXScpXHJcblxyXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxyXG5cclxuICAgIG1vZGFsUGljdHVyZShtYWlucylcclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IGJsb2Nrc1NsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbGFyZ2Utc2VjdGlvbj1cImJsb2NrLXNsaWRlclwiXScpXHJcblxyXG4gICAgICAgIGlmIChibG9ja3NTbGlkZXIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGJsb2Nrc1NsaWRlci5mb3JFYWNoKGJsb2NrU2xpZGVyID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsaWRlciA9IGJsb2NrU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxhcmdlLXNlY3Rpb249XCJzbGlkZXJcIl0nKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuTmV4dCA9IGJsb2NrU2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxhcmdlLXNlY3Rpb249XCJidG4tbmV4dFwiXScpXHJcbiAgICAgICAgICAgICAgICBjb25zdCBidG5QcmV2ID0gYmxvY2tTbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtbGFyZ2Utc2VjdGlvbj1cImJ0bi1wcmV2XCJdJylcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcclxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcXVpeigpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcXVpej1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHBlcmZvcm1hbmNlID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwicGVyZm9ybWFuY2VcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blN0YXJ0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLXN0YXJ0XCJdJylcclxuICAgICAgICBjb25zdCBxdWl6ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwicXVpelwiXScpXHJcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwic2xpZGVyXCJdJylcclxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwiYnRuLW5leHRcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXF1aXo9XCJidG4tcHJldlwiXScpXHJcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcXVpej1cInBhZ2luYXRpb25cIl0nKVxyXG5cclxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xyXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxyXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxyXG4gICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy8gc3dpcGVyTWFpbi5zbGlkZVRvKGluZGV4LCA0MDAsIHRydWUpXHJcblxyXG4gICAgICAgIGJ0blN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIHF1aXouY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1zbGlkZScpXHJcblxyXG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmFkaW9zID0gc2xpZGUucXVlcnlTZWxlY3RvckFsbCgnLnJhZGlvJylcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcclxuICAgICAgICAgICAgICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhZGlvcy5mb3JFYWNoKHJhZGlvMiA9PiByYWRpbzIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpXHJcbiAgICAgICAgICAgICAgICAgICAgcmFkaW8uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgbmF2TGlzdCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcXVpej1cIm5hdi1saXN0XCJdJylcclxuICAgICAgICBjb25zdCBjb3V0U2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItc2xpZGUnKVxyXG5cclxuICAgICAgICBpZiAoY291dFNsaWRlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gY291dFNsaWRlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpcnN0RWxlbVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVsZW0gPSB0cnVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0RWxlbSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuYXZMaXN0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxyXG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInF1aXpfX3NsaWRlci1uYXYtbGkgJHtmaXJzdEVsZW0gPyAnYWN0aXZlLWN1cnJlbnQnIDogJyd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJxdWl6X19zbGlkZXItbmF2LWxpLWNvbnRlbnRcIj4ke2l9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIGApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN3aXBlclBhZ2luYXRpb25DdXJyZW50ID0gK3BhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLnN3aXBlci1wYWdpbmF0aW9uLWN1cnJlbnQnKS50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICBjb25zdCBuYXZMaXN0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1xdWl6PVwibmF2LWxpc3RcIl0nKVxyXG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBuYXZMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJylcclxuICAgICAgICAgICAgbGlzdEl0ZW1zLmZvckVhY2goKGxpc3RJdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBpbmRleCArIDFcclxuICAgICAgICAgICAgICAgIGlmIChuZXdJbmRleCA8IHN3aXBlclBhZ2luYXRpb25DdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlLXBhc3NlZCcpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1wYXNzZWQnKVxyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1jdXJyZW50JylcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobmV3SW5kZXggPT09IHN3aXBlclBhZ2luYXRpb25DdXJyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlLWN1cnJlbnQnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcpLCB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogdHJ1ZSwgXHJcbiAgICAgICAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGFPbGRWYWx1ZTogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBwcmljZXNUeXBlV29yaygpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJpY2VzLXR5cGUtd29yaz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGNvbnN0IHdyYXBwZXJUYWJsZSA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJpY2VzLXR5cGUtd29yaz1cIndyYXBwZXItdGFibGVcIl0nKVxyXG4gICAgICAgIGNvbnN0IGJ0bk1vcmUgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByaWNlcy10eXBlLXdvcms9XCJidG4tbW9yZVwiXScpXHJcblxyXG4gICAgICAgIGJ0bk1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHdyYXBwZXJUYWJsZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICBidG5Nb3JlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcmV2aWV3cygpIHtcclxuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmV2aWV3cz1cIm1haW5cIl0nKVxyXG5cclxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cclxuXHJcbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xyXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDk5MnB4KVwiKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyYXBwZXJSZXZpZXdzID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwid3JhcHBlci1yZXZpZXdzXCJdJylcclxuICAgICAgICAgICAgY29uc3QgYnRuTW9yZSA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cImJ0bi1tb3JlXCJdJylcclxuICAgIFxyXG4gICAgICAgICAgICBidG5Nb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlclJldmlld3MuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgIGJ0bk1vcmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdyYXBJbm5lclJldmlld3MgPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJldmlld3M9XCJ3cmFwLWlubmVyLXJldmlld3NcIl0nKVxyXG5cclxuICAgICAgICAgICAgd3JhcElubmVyUmV2aWV3cy5mb3JFYWNoKHdyYXBJbm5lclJldmlldyA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbm5lclJldmlld3MgPSB3cmFwSW5uZXJSZXZpZXcucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cImlubmVyLXJldmlld3NcIl0nKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuQ29sdW1uTW9yZSA9IHdyYXBJbm5lclJldmlldy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiYnRuLWNvbHVtbi1tb3JlXCJdJylcclxuXHJcbiAgICAgICAgICAgICAgICBidG5Db2x1bW5Nb3JlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlubmVyUmV2aWV3cy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bkNvbHVtbk1vcmUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5oZWFkZXIoKVxyXG5mbG9hdGluZ0Jsb2NrKClcclxuZml4ZWRIZWFkZXIoKVxyXG5pbmZvQmFyKClcclxuc2xpZGVyQ2FyZHNNb2IoKVxyXG5zbGlkZXJDYXJkcygpXHJcbnRhYnMoKVxyXG5mYXEoKVxyXG5zbGlkZXJSYW5nZSgpXHJcbmNvdW50ZXIoKVxyXG5jZXJ0aWZpY2F0ZXMoKVxyXG5zcGVjaWFsaXN0Q2FyZCgpXHJcbmZlZWRiYWNrKClcclxub3JkZXJXb3JrKClcclxuY29udGFjdHMoKVxyXG5zZWxlY3QoKVxyXG5leGFtcGxlc1dvcmtzKClcclxuYmVzdFdvcmtzKClcclxucHJvamVjdENhcmQoKVxyXG5iaWdSZXBhaXJDYXJkKClcclxudG9vbHRpcCgpXHJcbnBvcHVsYXJTZXJ2aWNlcygpXHJcbndhcmVob3VzZSgpXHJcbmd1YXJhbnRlZXMoKVxyXG5kaXNjb3VudCgpXHJcbnZpZGVvU2xpZGVyKClcclxubGFyZ2VTZWN0aW9uKClcclxucXVpeigpXHJcbnByaWNlc1R5cGVXb3JrKClcclxucmV2aWV3cygpXHJcbm1vZGFsKClcclxucGhvbmVNYXNrKCkiXSwiZmlsZSI6Im1haW4uanMifQ==