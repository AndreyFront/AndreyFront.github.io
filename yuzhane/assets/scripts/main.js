const modal = new HystModal({
    linkAttributeName: "data-hystmodal",
    waitTransitions: false,
    afterClose: (modal) => {
        const window = modal.openedWindow
        const videos = window.querySelectorAll('iframe')
        if (videos.length) {
            videos.forEach(video => {
                const src = video.getAttribute('src')
                video.setAttribute('src', '')
                video.setAttribute('src', src)
            })
        }
    },
})

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

    if (!el.classList.contains('active')) {
        add()
        el.style.height = `${startHeight}px`
    } else {
        el.style.height = `${heightEl}px`
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

function runningLine() {
    Marquee3k.init()
}

function header() {
    const header = document.querySelector('[data-header="main"]')

    if (!header) return

    window.addEventListener('scroll', (event) => {
        const scrolled = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

        if (scrolled >= 1) {
            header.classList.add('header--fixed')
        } else {
            header.classList.remove('header--fixed')
        }
    })
}

function input() {
    const inputs = document.querySelectorAll('[data-input="input"]')

    if (!inputs.length) return

    inputs.forEach(input => {
        input.addEventListener('input', (event) => {
            if (event.target.value.length > 0) {
                input.classList.add('input--btn-cleaning')
            } else {
                input.classList.remove('input--btn-cleaning')
            }
        })
    })

    const removeCleaning = () => {
        inputs.forEach(input => {
            input.classList.remove('input--btn-cleaning')
        })
    }

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-input="input"]')) {
            const input = el.closest('[data-input="input"]')
            const field = input.querySelector('[data-input="field"]')

            if (field) {
                const fieldText = field.value

                removeCleaning()

                if (fieldText.length > 0) {
                    input.classList.add('input--btn-cleaning')
                } else {
                    input.classList.remove('input--btn-cleaning')
                }

                if (el.closest('[data-input="btn-cleaning"]')) {
    
                    if (fieldText.length > 0) {
                        field.value = ''
                        input.classList.remove('input--btn-cleaning')
                    }
                }
            }
        } else {
            removeCleaning()
        }
    })
}

function phoneMask() {
    const phoneMasks = document.querySelectorAll('[data-phone-mask]')

    if (!phoneMasks.length) return

    phoneMasks.forEach(phoneMask => {
        IMask(phoneMask, {
            mask: '+{7}(000)000-00-00'
        })
    })
}

function faq() {
    const main = document.querySelector('[data-faq="main"]')

    if (!main) return

    const blocksInfo = main.querySelectorAll('[data-faq="block-info"]')



    blocksInfo.forEach(blockInfo => {
        const infoHead = blockInfo.querySelector('[data-faq="info-head"]')
        const infoBody = blockInfo.querySelector('[data-faq="info-body"]')

        smoothView(infoHead, infoBody)

        infoHead.addEventListener('click', () => {
            blocksInfo.forEach(innerBlockInfo => {
                if (innerBlockInfo !== blockInfo) {
                    const infoHead = innerBlockInfo.querySelector('[data-faq="info-head"]')
                    const infoBody = innerBlockInfo.querySelector('[data-faq="info-body"]')

                    infoHead.classList.add('not-active')
                    infoBody.classList.add('not-active')
                    infoBody.style.height = 0
                }
            })
        })
    })
}

function simpleSlider() {
    const mains = document.querySelectorAll('[data-simple-slider="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-simple-slider="slider"]')
        const slides = slider.getAttribute('data-simple-slider-slides')

        const swiper = new Swiper(slider, {
            slidesPerView: 1.2,
            spaceBetween: 8,
            // freeMode: {
            //     momentumVelocityRatio: 2,
            //     momentumRatio: 0.6
            // },
            breakpoints: {
                1200: {
                    slidesPerView: slides || 4,
                    spaceBetween: 16,
                    autoHeight: true,
                    freeMode: {
                        momentumVelocityRatio: 2,
                        momentumRatio: 0.6
                    },
                },
                992: {
                    slidesPerView: 3.2,
                    spaceBetween: 16,
                    autoHeight: true,
                    freeMode: {
                        momentumVelocityRatio: 2,
                        momentumRatio: 0.6
                    },
                },
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 16,
                    autoHeight: true,
                },
            }
        })
    })
}

function primarySlider() {
    const mains = document.querySelectorAll('[data-primary-slider="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-primary-slider="slider"]')
        const btnPrev = main.querySelector('[data-primary-slider="btn-prev"]')
        const btnNext = main.querySelector('[data-primary-slider="btn-next"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1.2,
            slidesPerGroup: 1,
            autoHeight: true,
            spaceBetween: 8,
            // freeMode: {
            //     momentumVelocityRatio: 2,
            //     momentumRatio: 0.6
            // },
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 16,
                    // freeMode: false,
                },
                768: {
                    slidesPerView: 1.5,
                    slidesPerGroup: 1,
                    spaceBetween: 16
                },
            }
        })
    })
}

function videoReviews() {
    const mains = document.querySelectorAll('[data-video-reviews="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-video-reviews="slider"]')
        const btnPrev = main.querySelector('[data-video-reviews="btn-prev"]')
        const btnNext = main.querySelector('[data-video-reviews="btn-next"]')

        const swiper = new Swiper(slider, {
            slidesPerView: 1.6,
            slidesPerGroup: 1,
            spaceBetween: 8,
            // freeMode: {
            //     momentumVelocityRatio: 2,
            //     momentumRatio: 0.6
            // },
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                992: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 16,
                    // freeMode: false,
                },
                768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 16
                },
            }
        })
    })
}

function videoReview() {
    const mains = document.querySelectorAll('[data-video-review="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const preview = main.querySelector('[data-video-review="preview"]')
        const clonedPreview = preview.cloneNode(true)
        clonedPreview.classList.add('video-review__preview--bg')
        preview.after(clonedPreview)
    })
}

function mSlider() {
    const mains = document.querySelectorAll('[data-m-slider="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-m-slider="slider"]')
        const btnPrev = main.querySelector('[data-m-slider="btn-prev"]')
        const btnNext = main.querySelector('[data-m-slider="btn-next"]')
        const pagination = main.querySelector('[data-m-slider="pagination"]')

        let swiper

        if (window.matchMedia("(min-width: 992px)").matches) {
            swiper = new Swiper(slider, {
                lazy: true,
                spaceBetween: 12,
                pagination: {
                  el: pagination,
                  clickable: true,
                },
                navigation: {
                  nextEl: btnNext,
                  prevEl: btnPrev,
                },
            })
        } else {
            swiper = new Swiper(slider, {
                lazy: true,
                spaceBetween: 12,
                effect: 'fade',
                pagination: {
                  el: pagination,
                },
                navigation: {
                  nextEl: btnNext,
                  prevEl: btnPrev,
                },
            })
        }

        if (window.matchMedia("(max-width: 992px)").matches) {
            swiper.on('slideChange', (event) => {
                const tabs = event.passedParams.pagination.el.childNodes
    
                let currentIndex = 0
    
                tabs.forEach((tab, index) => {
                    if (tab.classList.contains('swiper-pagination-bullet-active')) currentIndex = index
                })
                
                tabs.forEach((tab, index) => {
                    if (!tab.classList.contains('swiper-pagination-bullet-active') && index < currentIndex) {
                        tab.classList.add('swiper-pagination-bullet-active')
                    } else if (!tab.classList.contains('swiper-pagination-bullet-active')) {
                        tab.classList.remove('swiper-pagination-bullet-active')
                    }
                })
            })
    
            btnNext.addEventListener('click', (event) => {
                const isDisabled = JSON.parse(btnNext.getAttribute('aria-disabled'))
    
                if (isDisabled) {
                    btnNext.removeAttribute('disabled')
                    if (btnNext.hasAttribute('data-m-slider-disabled')) {
                        modal.close()
                        swiper.slideTo(0)
                        btnNext.removeAttribute('data-m-slider-disabled')
                    } else {
                        btnNext.setAttribute('data-m-slider-disabled', '')
                    }
                } else {
                    btnNext.removeAttribute('data-m-slider-disabled')
                }
            })
        }
    })
}

function sliderCard() {
    const mains = document.querySelectorAll('[data-slider-card="main"]')

    if (!mains.length) return

    mains.forEach(main => {
        const slider = main.querySelector('[data-slider-card="slider"]')
        const pagination = main.querySelector('[data-slider-card="pagination"]')

        const swiper = new Swiper(slider, {
            lazy: true,
            loop: true,
            effect: "fade",
            pagination: {
              el: pagination,
              clickable: true,
            },
        })

        main.addEventListener('mouseenter', (event) => {
            swiper.slideNext()
        })
        main.addEventListener('mouseleave', (event) => {
            swiper.slideNext()
        })
    })
}

// Вызов функции message().toggle()
function message() {
    const main = document.querySelector('[data-message="main"]')

    if (!main) return

    const toggle = () => {
        main.classList.add('active')

        setTimeout(() => {
            main.classList.remove('active')
        }, 5000)
    }

    return {
        toggle
    }
}

function socialNetworks() {
    const main = document.querySelector('[data-social-networks="main"]')

    if (!main) return

    const clonedMain = main.cloneNode(true)
    document.body.append(clonedMain)
    main.remove()
}

function services() {
    const main = document.querySelector('[data-services="main"]')

    if (!main) return

    const slider = main.querySelector('.swiper')
    const slides = slider.querySelectorAll('.swiper-slide')
    const sliderHeight = slider.offsetHeight

    slides.forEach(slide => {
        slide.style.height = `${sliderHeight}px`
    })
}

function funcModal() {
    const mains = document.querySelectorAll('[data-modal="main"]')

    if (!mains.length) return

    if (window.matchMedia("(max-width: 992px)").matches) {
        mains.forEach(main => {
            const wrap = main.querySelector('[data-modal="wrap"]')
            const btnClose = main.querySelector('[data-modal="btn-close"]')
            const clonedBtnClose = btnClose.cloneNode(true)
            wrap.prepend(clonedBtnClose)
            btnClose.remove()
        })
    }
}

function tooltip() {
    const mains = document.querySelectorAll('[data-tooltip="main"]')

    if (!mains.length) return

    document.addEventListener('mouseover', (event) => {
        const el = event.target

        if (el.closest('[data-tooltip="main"]')) {
            const main = el.closest('[data-tooltip="main"]')
            const dropdown = main.querySelector('[data-tooltip="dropdown"]')
            const icon = main.querySelector('[data-tooltip="icon"]')

            icon.classList.add('active')

            const parameters = dropdown.getBoundingClientRect()
            if (parameters.top - 20 < 0) {
                main.classList.add('tooltip--orientation--bottom')
            } else {
                main.classList.remove('tooltip--orientation--bottom')
            }
        }
    })

    document.addEventListener('mouseout', (event) => {
        const el = event.target

        if (el.closest('[data-tooltip="main"]')) {
            const main = el.closest('[data-tooltip="main"]')
            const icon = main.querySelector('[data-tooltip="icon"]')
            icon.classList.remove('active')
        }
    })
}

window.onload = () => {

    if (window.matchMedia("(min-width: 992px)").matches) {
        header()
    } else {
        socialNetworks()
    }
    
    runningLine()
    faq()
    simpleSlider()
    primarySlider()
    videoReviews()
    mSlider()
    sliderCard()
    videoReview()
    input()
    phoneMask()
    funcModal()
    // tooltip()

    if (window.matchMedia("(max-width: 768px)").matches) {
        setTimeout(() => {
            services()
        }, 2000)
    }

    setTimeout(() => {
        message().toggle()

        // Для примера
    }, 2000)
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vZGFsID0gbmV3IEh5c3RNb2RhbCh7XG4gICAgbGlua0F0dHJpYnV0ZU5hbWU6IFwiZGF0YS1oeXN0bW9kYWxcIixcbiAgICB3YWl0VHJhbnNpdGlvbnM6IGZhbHNlLFxuICAgIGFmdGVyQ2xvc2U6IChtb2RhbCkgPT4ge1xuICAgICAgICBjb25zdCB3aW5kb3cgPSBtb2RhbC5vcGVuZWRXaW5kb3dcbiAgICAgICAgY29uc3QgdmlkZW9zID0gd2luZG93LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpXG4gICAgICAgIGlmICh2aWRlb3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB2aWRlb3MuZm9yRWFjaCh2aWRlbyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gdmlkZW8uZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgICAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXG4gICAgICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBzcmMpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcbn0pXG5cbmZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XG5cbiAgICBpZiAoIWJ0biAmJiAhZWwpIHJldHVyblxuXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJylcbiAgICB9XG4gICAgXG4gICAgbGV0IGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgYWRkKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xuICAgICAgICBpZiAoaGVpZ2h0RWwgPCBzdGFydEhlaWdodCkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgIHVwZGF0ZSgpXG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZWwsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBydW5uaW5nTGluZSgpIHtcbiAgICBNYXJxdWVlM2suaW5pdCgpXG59XG5cbmZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcblxuICAgICAgICBpZiAoc2Nyb2xsZWQgPj0gMSkge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5wdXQoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpXG5cbiAgICBpZiAoIWlucHV0cy5sZW5ndGgpIHJldHVyblxuXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWJ0bi1jbGVhbmluZycpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1idG4tY2xlYW5pbmcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBjb25zdCByZW1vdmVDbGVhbmluZyA9ICgpID0+IHtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWJ0bi1jbGVhbmluZycpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpKSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWlucHV0PVwiaW5wdXRcIl0nKVxuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBpbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImZpZWxkXCJdJylcblxuICAgICAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGRUZXh0ID0gZmllbGQudmFsdWVcblxuICAgICAgICAgICAgICAgIHJlbW92ZUNsZWFuaW5nKClcblxuICAgICAgICAgICAgICAgIGlmIChmaWVsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tYnRuLWNsZWFuaW5nJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tYnRuLWNsZWFuaW5nJylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaW5wdXQ9XCJidG4tY2xlYW5pbmdcIl0nKSkge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbHVlID0gJydcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1idG4tY2xlYW5pbmcnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlQ2xlYW5pbmcoKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcGhvbmVNYXNrKCkge1xuICAgIGNvbnN0IHBob25lTWFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1waG9uZS1tYXNrXScpXG5cbiAgICBpZiAoIXBob25lTWFza3MubGVuZ3RoKSByZXR1cm5cblxuICAgIHBob25lTWFza3MuZm9yRWFjaChwaG9uZU1hc2sgPT4ge1xuICAgICAgICBJTWFzayhwaG9uZU1hc2ssIHtcbiAgICAgICAgICAgIG1hc2s6ICcrezd9KDAwMCkwMDAtMDAtMDAnXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZmFxKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbikgcmV0dXJuXG5cbiAgICBjb25zdCBibG9ja3NJbmZvID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mYXE9XCJibG9jay1pbmZvXCJdJylcblxuXG5cbiAgICBibG9ja3NJbmZvLmZvckVhY2goYmxvY2tJbmZvID0+IHtcbiAgICAgICAgY29uc3QgaW5mb0hlYWQgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiaW5mby1oZWFkXCJdJylcbiAgICAgICAgY29uc3QgaW5mb0JvZHkgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiaW5mby1ib2R5XCJdJylcblxuICAgICAgICBzbW9vdGhWaWV3KGluZm9IZWFkLCBpbmZvQm9keSlcblxuICAgICAgICBpbmZvSGVhZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGJsb2Nrc0luZm8uZm9yRWFjaChpbm5lckJsb2NrSW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlubmVyQmxvY2tJbmZvICE9PSBibG9ja0luZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mb0hlYWQgPSBpbm5lckJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJpbmZvLWhlYWRcIl0nKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmZvQm9keSA9IGlubmVyQmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImluZm8tYm9keVwiXScpXG5cbiAgICAgICAgICAgICAgICAgICAgaW5mb0hlYWQuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb2R5LmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBpbmZvQm9keS5zdHlsZS5oZWlnaHQgPSAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzaW1wbGVTbGlkZXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGUtc2xpZGVyPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNpbXBsZS1zbGlkZXI9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZS1zbGlkZXItc2xpZGVzJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgLy8gZnJlZU1vZGU6IHtcbiAgICAgICAgICAgIC8vICAgICBtb21lbnR1bVZlbG9jaXR5UmF0aW86IDIsXG4gICAgICAgICAgICAvLyAgICAgbW9tZW50dW1SYXRpbzogMC42XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAxMjAwOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IHNsaWRlcyB8fCA0LFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmcmVlTW9kZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50dW1WZWxvY2l0eVJhdGlvOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50dW1SYXRpbzogMC42XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBmcmVlTW9kZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50dW1WZWxvY2l0eVJhdGlvOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50dW1SYXRpbzogMC42XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcHJpbWFyeVNsaWRlcigpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXByaW1hcnktc2xpZGVyPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByaW1hcnktc2xpZGVyPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJpbWFyeS1zbGlkZXI9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByaW1hcnktc2xpZGVyPVwiYnRuLW5leHRcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjIsXG4gICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgICAgICAgICAvLyBmcmVlTW9kZToge1xuICAgICAgICAgICAgLy8gICAgIG1vbWVudHVtVmVsb2NpdHlSYXRpbzogMixcbiAgICAgICAgICAgIC8vICAgICBtb21lbnR1bVJhdGlvOiAwLjZcbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcbiAgICAgICAgICAgICAgICAgICAgLy8gZnJlZU1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHZpZGVvUmV2aWV3cygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvLXJldmlld3M9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tcmV2aWV3cz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXJldmlld3M9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXJldmlld3M9XCJidG4tbmV4dFwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNixcbiAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgLy8gZnJlZU1vZGU6IHtcbiAgICAgICAgICAgIC8vICAgICBtb21lbnR1bVZlbG9jaXR5UmF0aW86IDIsXG4gICAgICAgICAgICAvLyAgICAgbW9tZW50dW1SYXRpbzogMC42XG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNCxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXG4gICAgICAgICAgICAgICAgICAgIC8vIGZyZWVNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMyxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gdmlkZW9SZXZpZXcoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12aWRlby1yZXZpZXc9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHByZXZpZXcgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXJldmlldz1cInByZXZpZXdcIl0nKVxuICAgICAgICBjb25zdCBjbG9uZWRQcmV2aWV3ID0gcHJldmlldy5jbG9uZU5vZGUodHJ1ZSlcbiAgICAgICAgY2xvbmVkUHJldmlldy5jbGFzc0xpc3QuYWRkKCd2aWRlby1yZXZpZXdfX3ByZXZpZXctLWJnJylcbiAgICAgICAgcHJldmlldy5hZnRlcihjbG9uZWRQcmV2aWV3KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIG1TbGlkZXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tLXNsaWRlcj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tLXNsaWRlcj1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW0tc2xpZGVyPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tLXNsaWRlcj1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtbS1zbGlkZXI9XCJwYWdpbmF0aW9uXCJdJylcblxuICAgICAgICBsZXQgc3dpcGVyXG5cbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICAgICAgbGF6eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEyLFxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgICAgICBsYXp5OiB0cnVlLFxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTIsXG4gICAgICAgICAgICAgICAgZWZmZWN0OiAnZmFkZScsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgc3dpcGVyLm9uKCdzbGlkZUNoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhYnMgPSBldmVudC5wYXNzZWRQYXJhbXMucGFnaW5hdGlvbi5lbC5jaGlsZE5vZGVzXG4gICAgXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IDBcbiAgICBcbiAgICAgICAgICAgICAgICB0YWJzLmZvckVhY2goKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnKSkgY3VycmVudEluZGV4ID0gaW5kZXhcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRhYnMuZm9yRWFjaCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnKSAmJiBpbmRleCA8IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5hZGQoJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0YWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QucmVtb3ZlKCdzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgYnRuTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBKU09OLnBhcnNlKGJ0bk5leHQuZ2V0QXR0cmlidXRlKCdhcmlhLWRpc2FibGVkJykpXG4gICAgXG4gICAgICAgICAgICAgICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuTmV4dC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJylcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJ0bk5leHQuaGFzQXR0cmlidXRlKCdkYXRhLW0tc2xpZGVyLWRpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGFsLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKDApXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5OZXh0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1tLXNsaWRlci1kaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidG5OZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1tLXNsaWRlci1kaXNhYmxlZCcsICcnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuTmV4dC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbS1zbGlkZXItZGlzYWJsZWQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzbGlkZXJDYXJkKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2xpZGVyLWNhcmQ9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmQ9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZD1cInBhZ2luYXRpb25cIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBsYXp5OiB0cnVlLFxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgICAgICAgIGVmZmVjdDogXCJmYWRlXCIsXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuXG4gICAgICAgIG1haW4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpXG4gICAgICAgIH0pXG4gICAgICAgIG1haW4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuLy8g0JLRi9C30L7QsiDRhNGD0L3QutGG0LjQuCBtZXNzYWdlKCkudG9nZ2xlKClcbmZ1bmN0aW9uIG1lc3NhZ2UoKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1lc3NhZ2U9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbikgcmV0dXJuXG5cbiAgICBjb25zdCB0b2dnbGUgPSAoKSA9PiB7XG4gICAgICAgIG1haW4uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgfSwgNTAwMClcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0b2dnbGVcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNvY2lhbE5ldHdvcmtzKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zb2NpYWwtbmV0d29ya3M9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbikgcmV0dXJuXG5cbiAgICBjb25zdCBjbG9uZWRNYWluID0gbWFpbi5jbG9uZU5vZGUodHJ1ZSlcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZChjbG9uZWRNYWluKVxuICAgIG1haW4ucmVtb3ZlKClcbn1cblxuZnVuY3Rpb24gc2VydmljZXMoKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNlcnZpY2VzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW4pIHJldHVyblxuXG4gICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyJylcbiAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1zbGlkZScpXG4gICAgY29uc3Qgc2xpZGVySGVpZ2h0ID0gc2xpZGVyLm9mZnNldEhlaWdodFxuXG4gICAgc2xpZGVzLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICBzbGlkZS5zdHlsZS5oZWlnaHQgPSBgJHtzbGlkZXJIZWlnaHR9cHhgXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZnVuY01vZGFsKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbW9kYWw9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDk5MnB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgICAgICBjb25zdCB3cmFwID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tb2RhbD1cIndyYXBcIl0nKVxuICAgICAgICAgICAgY29uc3QgYnRuQ2xvc2UgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW1vZGFsPVwiYnRuLWNsb3NlXCJdJylcbiAgICAgICAgICAgIGNvbnN0IGNsb25lZEJ0bkNsb3NlID0gYnRuQ2xvc2UuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgICAgICB3cmFwLnByZXBlbmQoY2xvbmVkQnRuQ2xvc2UpXG4gICAgICAgICAgICBidG5DbG9zZS5yZW1vdmUoKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdG9vbHRpcCgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRvb2x0aXA9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxuXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS10b29sdGlwPVwibWFpblwiXScpKSB7XG4gICAgICAgICAgICBjb25zdCBtYWluID0gZWwuY2xvc2VzdCgnW2RhdGEtdG9vbHRpcD1cIm1haW5cIl0nKVxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRvb2x0aXA9XCJkcm9wZG93blwiXScpXG4gICAgICAgICAgICBjb25zdCBpY29uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b29sdGlwPVwiaWNvblwiXScpXG5cbiAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcblxuICAgICAgICAgICAgY29uc3QgcGFyYW1ldGVycyA9IGRyb3Bkb3duLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy50b3AgLSAyMCA8IDApIHtcbiAgICAgICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5hZGQoJ3Rvb2x0aXAtLW9yaWVudGF0aW9uLS1ib3R0b20nKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ3Rvb2x0aXAtLW9yaWVudGF0aW9uLS1ib3R0b20nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XG5cbiAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXRvb2x0aXA9XCJtYWluXCJdJykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBlbC5jbG9zZXN0KCdbZGF0YS10b29sdGlwPVwibWFpblwiXScpXG4gICAgICAgICAgICBjb25zdCBpY29uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS10b29sdGlwPVwiaWNvblwiXScpXG4gICAgICAgICAgICBpY29uLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgaGVhZGVyKClcbiAgICB9IGVsc2Uge1xuICAgICAgICBzb2NpYWxOZXR3b3JrcygpXG4gICAgfVxuICAgIFxuICAgIHJ1bm5pbmdMaW5lKClcbiAgICBmYXEoKVxuICAgIHNpbXBsZVNsaWRlcigpXG4gICAgcHJpbWFyeVNsaWRlcigpXG4gICAgdmlkZW9SZXZpZXdzKClcbiAgICBtU2xpZGVyKClcbiAgICBzbGlkZXJDYXJkKClcbiAgICB2aWRlb1JldmlldygpXG4gICAgaW5wdXQoKVxuICAgIHBob25lTWFzaygpXG4gICAgZnVuY01vZGFsKClcbiAgICAvLyB0b29sdGlwKClcblxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc2VydmljZXMoKVxuICAgICAgICB9LCAyMDAwKVxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtZXNzYWdlKCkudG9nZ2xlKClcblxuICAgICAgICAvLyDQlNC70Y8g0L/RgNC40LzQtdGA0LBcbiAgICB9LCAyMDAwKVxufVxuIl0sImZpbGUiOiJtYWluLmpzIn0=
