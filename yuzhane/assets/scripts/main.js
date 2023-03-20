const modal = new HystModal({
    linkAttributeName: "data-hystmodal",
    waitTransitions: true,
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
            freeMode: {
                momentumVelocityRatio: 2,
                momentumRatio: 0.6
            },
            breakpoints: {
                1200: {
                  slidesPerView: slides || 4,
                  spaceBetween: 16,
                  autoHeight: true,
                },
                992: {
                    slidesPerView: 3.2,
                    spaceBetween: 16,
                    autoHeight: true,
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
            freeMode: {
                momentumVelocityRatio: 2,
                momentumRatio: 0.6
            },
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 16,
                    freeMode: false,
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
            freeMode: {
                momentumVelocityRatio: 2,
                momentumRatio: 0.6
            },
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                992: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 16,
                    freeMode: false,
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
    videoReview()
    mSlider()
    sliderCard()
    input()
    phoneMask()

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vZGFsID0gbmV3IEh5c3RNb2RhbCh7XG4gICAgbGlua0F0dHJpYnV0ZU5hbWU6IFwiZGF0YS1oeXN0bW9kYWxcIixcbiAgICB3YWl0VHJhbnNpdGlvbnM6IHRydWUsXG4gICAgYWZ0ZXJDbG9zZTogKG1vZGFsKSA9PiB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IG1vZGFsLm9wZW5lZFdpbmRvd1xuICAgICAgICBjb25zdCB2aWRlb3MgPSB3aW5kb3cucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJylcbiAgICAgICAgaWYgKHZpZGVvcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZpZGVvcy5mb3JFYWNoKHZpZGVvID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzcmMgPSB2aWRlby5nZXRBdHRyaWJ1dGUoJ3NyYycpXG4gICAgICAgICAgICAgICAgdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcbiAgICAgICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxufSlcblxuZnVuY3Rpb24gc21vb3RoVmlldyhidG4sIGVsLCBzdGFydEhlaWdodCA9IDApIHtcblxuICAgIGlmICghYnRuICYmICFlbCkgcmV0dXJuXG5cbiAgICBjb25zdCBhZGQgPSAoKSA9PiB7XG4gICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3ZlID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZSgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgIH1cbiAgICBcbiAgICBsZXQgaGVpZ2h0RWwgPSBlbC5vZmZzZXRIZWlnaHRcblxuICAgIGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICBhZGQoKVxuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtzdGFydEhlaWdodH1weGBcbiAgICB9IGVsc2Uge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHRFbH1weGBcbiAgICB9XG5cbiAgICBpZiAoc3RhcnRIZWlnaHQgPiAwKSB7XG4gICAgICAgIGlmIChoZWlnaHRFbCA8IHN0YXJ0SGVpZ2h0KSB7XG4gICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmhlaWdodCA9ICdhdXRvJ1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHRFbH1weGBcbiAgICAgICAgfSwgMTAwKVxuICAgIH1cblxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygnbm90LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGQoKVxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgbGV0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIobXV0YXRpb25SZWNvcmRzID0+IHtcbiAgICAgICAgdXBkYXRlKClcbiAgICB9KVxuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCwge1xuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICAgIGNoYXJhY3RlckRhdGFPbGRWYWx1ZTogdHJ1ZVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHJ1bm5pbmdMaW5lKCkge1xuICAgIE1hcnF1ZWUzay5pbml0KClcbn1cblxuZnVuY3Rpb24gaGVhZGVyKCkge1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFoZWFkZXIpIHJldHVyblxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuXG4gICAgICAgIGlmIChzY3JvbGxlZCA+PSAxKSB7XG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnaGVhZGVyLS1maXhlZCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVhZGVyLS1maXhlZCcpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBpbnB1dCgpIHtcbiAgICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1pbnB1dD1cImlucHV0XCJdJylcblxuICAgIGlmICghaW5wdXRzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tYnRuLWNsZWFuaW5nJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWJ0bi1jbGVhbmluZycpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGNvbnN0IHJlbW92ZUNsZWFuaW5nID0gKCkgPT4ge1xuICAgICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tYnRuLWNsZWFuaW5nJylcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxuXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1pbnB1dD1cImlucHV0XCJdJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZWwuY2xvc2VzdCgnW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpXG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IGlucHV0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlucHV0PVwiZmllbGRcIl0nKVxuXG4gICAgICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZFRleHQgPSBmaWVsZC52YWx1ZVxuXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xlYW5pbmcoKVxuXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1idG4tY2xlYW5pbmcnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1idG4tY2xlYW5pbmcnKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1pbnB1dD1cImJ0bi1jbGVhbmluZ1wiXScpKSB7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWVsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQudmFsdWUgPSAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWJ0bi1jbGVhbmluZycpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVDbGVhbmluZygpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5mdW5jdGlvbiBwaG9uZU1hc2soKSB7XG4gICAgY29uc3QgcGhvbmVNYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBob25lLW1hc2tdJylcblxuICAgIGlmICghcGhvbmVNYXNrcy5sZW5ndGgpIHJldHVyblxuXG4gICAgcGhvbmVNYXNrcy5mb3JFYWNoKHBob25lTWFzayA9PiB7XG4gICAgICAgIElNYXNrKHBob25lTWFzaywge1xuICAgICAgICAgICAgbWFzazogJyt7N30oMDAwKTAwMC0wMC0wMCdcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBmYXEoKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWluKSByZXR1cm5cblxuICAgIGNvbnN0IGJsb2Nrc0luZm8gPSBtYWluLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZhcT1cImJsb2NrLWluZm9cIl0nKVxuXG5cblxuICAgIGJsb2Nrc0luZm8uZm9yRWFjaChibG9ja0luZm8gPT4ge1xuICAgICAgICBjb25zdCBpbmZvSGVhZCA9IGJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJpbmZvLWhlYWRcIl0nKVxuICAgICAgICBjb25zdCBpbmZvQm9keSA9IGJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJpbmZvLWJvZHlcIl0nKVxuXG4gICAgICAgIHNtb290aFZpZXcoaW5mb0hlYWQsIGluZm9Cb2R5KVxuXG4gICAgICAgIGluZm9IZWFkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgYmxvY2tzSW5mby5mb3JFYWNoKGlubmVyQmxvY2tJbmZvID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaW5uZXJCbG9ja0luZm8gIT09IGJsb2NrSW5mbykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmZvSGVhZCA9IGlubmVyQmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImluZm8taGVhZFwiXScpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZm9Cb2R5ID0gaW5uZXJCbG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiaW5mby1ib2R5XCJdJylcblxuICAgICAgICAgICAgICAgICAgICBpbmZvSGVhZC5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgaW5mb0JvZHkuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb2R5LnN0eWxlLmhlaWdodCA9IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNpbXBsZVNsaWRlcigpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNpbXBsZS1zbGlkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtc2ltcGxlLXNsaWRlcj1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2ltcGxlLXNsaWRlci1zbGlkZXMnKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjIsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgICAgICAgICBmcmVlTW9kZToge1xuICAgICAgICAgICAgICAgIG1vbWVudHVtVmVsb2NpdHlSYXRpbzogMixcbiAgICAgICAgICAgICAgICBtb21lbnR1bVJhdGlvOiAwLjZcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDEyMDA6IHtcbiAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IHNsaWRlcyB8fCA0LFxuICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcbiAgICAgICAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcbiAgICAgICAgICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHByaW1hcnlTbGlkZXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByaW1hcnktc2xpZGVyPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cImJ0bi1uZXh0XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgZnJlZU1vZGU6IHtcbiAgICAgICAgICAgICAgICBtb21lbnR1bVZlbG9jaXR5UmF0aW86IDIsXG4gICAgICAgICAgICAgICAgbW9tZW50dW1SYXRpbzogMC42XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDIsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTYsXG4gICAgICAgICAgICAgICAgICAgIGZyZWVNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB2aWRlb1Jldmlld3MoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12aWRlby1yZXZpZXdzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXJldmlld3M9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1yZXZpZXdzPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1yZXZpZXdzPVwiYnRuLW5leHRcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjYsXG4gICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcbiAgICAgICAgICAgIGZyZWVNb2RlOiB7XG4gICAgICAgICAgICAgICAgbW9tZW50dW1WZWxvY2l0eVJhdGlvOiAyLFxuICAgICAgICAgICAgICAgIG1vbWVudHVtUmF0aW86IDAuNlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiA0LFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgICAgICAgICBmcmVlTW9kZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHZpZGVvUmV2aWV3KCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmlkZW8tcmV2aWV3PVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBwcmV2aWV3ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1yZXZpZXc9XCJwcmV2aWV3XCJdJylcbiAgICAgICAgY29uc3QgY2xvbmVkUHJldmlldyA9IHByZXZpZXcuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIGNsb25lZFByZXZpZXcuY2xhc3NMaXN0LmFkZCgndmlkZW8tcmV2aWV3X19wcmV2aWV3LS1iZycpXG4gICAgICAgIHByZXZpZXcuYWZ0ZXIoY2xvbmVkUHJldmlldylcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBtU2xpZGVyKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbS1zbGlkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtbS1zbGlkZXI9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tLXNsaWRlcj1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtbS1zbGlkZXI9XCJidG4tbmV4dFwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW0tc2xpZGVyPVwicGFnaW5hdGlvblwiXScpXG5cbiAgICAgICAgbGV0IHN3aXBlclxuXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtaW4td2lkdGg6IDk5MnB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgICAgIGxhenk6IHRydWUsXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMixcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICAgICAgbGF6eTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDEyLFxuICAgICAgICAgICAgICAgIGVmZmVjdDogJ2ZhZGUnLFxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgICAgIGVsOiBwYWdpbmF0aW9uLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgc3dpcGVyLm9uKCdzbGlkZUNoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFicyA9IGV2ZW50LnBhc3NlZFBhcmFtcy5wYWdpbmF0aW9uLmVsLmNoaWxkTm9kZXNcblxuICAgICAgICAgICAgbGV0IGN1cnJlbnRJbmRleCA9IDBcblxuICAgICAgICAgICAgdGFicy5mb3JFYWNoKCh0YWIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnKSkgY3VycmVudEluZGV4ID0gaW5kZXhcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRhYnMuZm9yRWFjaCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGFiLmNsYXNzTGlzdC5jb250YWlucygnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZScpICYmIGluZGV4IDwgY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QuYWRkKCdzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCF0YWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5yZW1vdmUoJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgYnRuTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNEaXNhYmxlZCA9IEpTT04ucGFyc2UoYnRuTmV4dC5nZXRBdHRyaWJ1dGUoJ2FyaWEtZGlzYWJsZWQnKSlcblxuICAgICAgICAgICAgaWYgKGlzRGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICBidG5OZXh0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKVxuICAgICAgICAgICAgICAgIGlmIChidG5OZXh0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1tLXNsaWRlci1kaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGFsLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG8oMClcbiAgICAgICAgICAgICAgICAgICAgYnRuTmV4dC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbS1zbGlkZXItZGlzYWJsZWQnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ0bk5leHQuc2V0QXR0cmlidXRlKCdkYXRhLW0tc2xpZGVyLWRpc2FibGVkJywgJycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG5OZXh0LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1tLXNsaWRlci1kaXNhYmxlZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2xpZGVyQ2FyZCgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1jYXJkPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmQ9XCJwYWdpbmF0aW9uXCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgbGF6eTogdHJ1ZSxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBlZmZlY3Q6IFwiZmFkZVwiLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBtYWluLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoKVxuICAgICAgICB9KVxuICAgICAgICBtYWluLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoKVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbi8vINCS0YvQt9C+0LIg0YTRg9C90LrRhtC40LggbWVzc2FnZSgpLnRvZ2dsZSgpXG5mdW5jdGlvbiBtZXNzYWdlKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tZXNzYWdlPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW4pIHJldHVyblxuXG4gICAgY29uc3QgdG9nZ2xlID0gKCkgPT4ge1xuICAgICAgICBtYWluLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIH0sIDUwMDApXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzb2NpYWxOZXR3b3JrcygpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc29jaWFsLW5ldHdvcmtzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW4pIHJldHVyblxuXG4gICAgY29uc3QgY2xvbmVkTWFpbiA9IG1haW4uY2xvbmVOb2RlKHRydWUpXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoY2xvbmVkTWFpbilcbiAgICBtYWluLnJlbW92ZSgpXG59XG5cbmZ1bmN0aW9uIHNlcnZpY2VzKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZXJ2aWNlcz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWluKSByZXR1cm5cblxuICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignLnN3aXBlcicpXG4gICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItc2xpZGUnKVxuICAgIGNvbnN0IHNsaWRlckhlaWdodCA9IHNsaWRlci5vZmZzZXRIZWlnaHRcblxuICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgc2xpZGUuc3R5bGUuaGVpZ2h0ID0gYCR7c2xpZGVySGVpZ2h0fXB4YFxuICAgIH0pXG59XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xuICAgICAgICBoZWFkZXIoKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHNvY2lhbE5ldHdvcmtzKClcbiAgICB9XG4gICAgXG4gICAgcnVubmluZ0xpbmUoKVxuICAgIGZhcSgpXG4gICAgc2ltcGxlU2xpZGVyKClcbiAgICBwcmltYXJ5U2xpZGVyKClcbiAgICB2aWRlb1Jldmlld3MoKVxuICAgIHZpZGVvUmV2aWV3KClcbiAgICBtU2xpZGVyKClcbiAgICBzbGlkZXJDYXJkKClcbiAgICBpbnB1dCgpXG4gICAgcGhvbmVNYXNrKClcblxuICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDc2OHB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc2VydmljZXMoKVxuICAgICAgICB9LCAyMDAwKVxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtZXNzYWdlKCkudG9nZ2xlKClcblxuICAgICAgICAvLyDQlNC70Y8g0L/RgNC40LzQtdGA0LBcbiAgICB9LCAyMDAwKVxufVxuIl0sImZpbGUiOiJtYWluLmpzIn0=
