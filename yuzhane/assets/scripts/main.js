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
            freeMode: true,
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
            freeMode: true,
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
            freeMode: true,
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

function modal() {
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

    return modal
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

    modal()
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XG5cbiAgICBpZiAoIWJ0biAmJiAhZWwpIHJldHVyblxuXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJylcbiAgICB9XG4gICAgXG4gICAgbGV0IGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgYWRkKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xuICAgICAgICBpZiAoaGVpZ2h0RWwgPCBzdGFydEhlaWdodCkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgIHVwZGF0ZSgpXG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZWwsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBydW5uaW5nTGluZSgpIHtcbiAgICBNYXJxdWVlM2suaW5pdCgpXG59XG5cbmZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcblxuICAgICAgICBpZiAoc2Nyb2xsZWQgPj0gMSkge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5wdXQoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpXG5cbiAgICBpZiAoIWlucHV0cy5sZW5ndGgpIHJldHVyblxuXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWJ0bi1jbGVhbmluZycpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1idG4tY2xlYW5pbmcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBjb25zdCByZW1vdmVDbGVhbmluZyA9ICgpID0+IHtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWJ0bi1jbGVhbmluZycpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpKSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWlucHV0PVwiaW5wdXRcIl0nKVxuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBpbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImZpZWxkXCJdJylcblxuICAgICAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGRUZXh0ID0gZmllbGQudmFsdWVcblxuICAgICAgICAgICAgICAgIHJlbW92ZUNsZWFuaW5nKClcblxuICAgICAgICAgICAgICAgIGlmIChmaWVsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tYnRuLWNsZWFuaW5nJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tYnRuLWNsZWFuaW5nJylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaW5wdXQ9XCJidG4tY2xlYW5pbmdcIl0nKSkge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbHVlID0gJydcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1idG4tY2xlYW5pbmcnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlQ2xlYW5pbmcoKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcGhvbmVNYXNrKCkge1xuICAgIGNvbnN0IHBob25lTWFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1waG9uZS1tYXNrXScpXG5cbiAgICBpZiAoIXBob25lTWFza3MubGVuZ3RoKSByZXR1cm5cblxuICAgIHBob25lTWFza3MuZm9yRWFjaChwaG9uZU1hc2sgPT4ge1xuICAgICAgICBJTWFzayhwaG9uZU1hc2ssIHtcbiAgICAgICAgICAgIG1hc2s6ICcrezd9KDAwMCkwMDAtMDAtMDAnXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZmFxKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbikgcmV0dXJuXG5cbiAgICBjb25zdCBibG9ja3NJbmZvID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mYXE9XCJibG9jay1pbmZvXCJdJylcblxuXG5cbiAgICBibG9ja3NJbmZvLmZvckVhY2goYmxvY2tJbmZvID0+IHtcbiAgICAgICAgY29uc3QgaW5mb0hlYWQgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiaW5mby1oZWFkXCJdJylcbiAgICAgICAgY29uc3QgaW5mb0JvZHkgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiaW5mby1ib2R5XCJdJylcblxuICAgICAgICBzbW9vdGhWaWV3KGluZm9IZWFkLCBpbmZvQm9keSlcblxuICAgICAgICBpbmZvSGVhZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGJsb2Nrc0luZm8uZm9yRWFjaChpbm5lckJsb2NrSW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlubmVyQmxvY2tJbmZvICE9PSBibG9ja0luZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mb0hlYWQgPSBpbm5lckJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJpbmZvLWhlYWRcIl0nKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmZvQm9keSA9IGlubmVyQmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImluZm8tYm9keVwiXScpXG5cbiAgICAgICAgICAgICAgICAgICAgaW5mb0hlYWQuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb2R5LmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBpbmZvQm9keS5zdHlsZS5oZWlnaHQgPSAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzaW1wbGVTbGlkZXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGUtc2xpZGVyPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNpbXBsZS1zbGlkZXI9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZS1zbGlkZXItc2xpZGVzJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgZnJlZU1vZGU6IHRydWUsXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDEyMDA6IHtcbiAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IHNsaWRlcyB8fCA0LFxuICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcbiAgICAgICAgICAgICAgICAgIGF1dG9IZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2LFxuICAgICAgICAgICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIuMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcbiAgICAgICAgICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHByaW1hcnlTbGlkZXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByaW1hcnktc2xpZGVyPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cImJ0bi1uZXh0XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgZnJlZU1vZGU6IHRydWUsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMixcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcbiAgICAgICAgICAgICAgICAgICAgZnJlZU1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNSxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHZpZGVvUmV2aWV3cygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvLXJldmlld3M9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tcmV2aWV3cz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXJldmlld3M9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXJldmlld3M9XCJidG4tbmV4dFwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuNixcbiAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgZnJlZU1vZGU6IHRydWUsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogNCxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNixcbiAgICAgICAgICAgICAgICAgICAgZnJlZU1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAzLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB2aWRlb1JldmlldygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvLXJldmlldz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlldyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tcmV2aWV3PVwicHJldmlld1wiXScpXG4gICAgICAgIGNvbnN0IGNsb25lZFByZXZpZXcgPSBwcmV2aWV3LmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjbG9uZWRQcmV2aWV3LmNsYXNzTGlzdC5hZGQoJ3ZpZGVvLXJldmlld19fcHJldmlldy0tYmcnKVxuICAgICAgICBwcmV2aWV3LmFmdGVyKGNsb25lZFByZXZpZXcpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gbW9kYWwoKSB7XG4gICAgY29uc3QgbW9kYWwgPSBuZXcgSHlzdE1vZGFsKHtcbiAgICAgICAgbGlua0F0dHJpYnV0ZU5hbWU6IFwiZGF0YS1oeXN0bW9kYWxcIixcbiAgICAgICAgd2FpdFRyYW5zaXRpb25zOiB0cnVlLFxuICAgICAgICBhZnRlckNsb3NlOiAobW9kYWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvdyA9IG1vZGFsLm9wZW5lZFdpbmRvd1xuICAgICAgICAgICAgY29uc3QgdmlkZW9zID0gd2luZG93LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpXG4gICAgICAgICAgICBpZiAodmlkZW9zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZpZGVvcy5mb3JFYWNoKHZpZGVvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gdmlkZW8uZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgICAgICAgICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxuICAgICAgICAgICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pXG5cbiAgICByZXR1cm4gbW9kYWxcbn1cblxuZnVuY3Rpb24gbVNsaWRlcigpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW0tc2xpZGVyPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW0tc2xpZGVyPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtbS1zbGlkZXI9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW0tc2xpZGVyPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tLXNsaWRlcj1cInBhZ2luYXRpb25cIl0nKVxuXG4gICAgICAgIGxldCBzd2lwZXJcblxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgICAgICBsYXp5OiB0cnVlLFxuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTIsXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgICAgICBjbGlja2FibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgICAgIGxhenk6IHRydWUsXG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMixcbiAgICAgICAgICAgICAgICBlZmZlY3Q6ICdmYWRlJyxcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci5vbignc2xpZGVDaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRhYnMgPSBldmVudC5wYXNzZWRQYXJhbXMucGFnaW5hdGlvbi5lbC5jaGlsZE5vZGVzXG5cbiAgICAgICAgICAgIGxldCBjdXJyZW50SW5kZXggPSAwXG5cbiAgICAgICAgICAgIHRhYnMuZm9yRWFjaCgodGFiLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0YWIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlJykpIGN1cnJlbnRJbmRleCA9IGluZGV4XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0YWJzLmZvckVhY2goKHRhYiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRhYi5jbGFzc0xpc3QuY29udGFpbnMoJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldC1hY3RpdmUnKSAmJiBpbmRleCA8IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICB0YWIuY2xhc3NMaXN0LmFkZCgnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGFiLmNsYXNzTGlzdC5jb250YWlucygnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhYi5jbGFzc0xpc3QucmVtb3ZlKCdzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHNsaWRlckNhcmQoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbGlkZXItY2FyZD1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zbGlkZXItY2FyZD1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IHBhZ2luYXRpb24gPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkPVwicGFnaW5hdGlvblwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIGxhenk6IHRydWUsXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxuICAgICAgICAgICAgZWZmZWN0OiBcImZhZGVcIixcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgICAgICAgZWw6IHBhZ2luYXRpb24sXG4gICAgICAgICAgICAgIGNsaWNrYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG5cbiAgICAgICAgbWFpbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KClcbiAgICAgICAgfSlcbiAgICAgICAgbWFpbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KClcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG4vLyDQktGL0LfQvtCyINGE0YPQvdC60YbQuNC4IG1lc3NhZ2UoKS50b2dnbGUoKVxuZnVuY3Rpb24gbWVzc2FnZSgpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbWVzc2FnZT1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWluKSByZXR1cm5cblxuICAgIGNvbnN0IHRvZ2dsZSA9ICgpID0+IHtcbiAgICAgICAgbWFpbi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgbWFpbi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICB9LCA1MDAwKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHRvZ2dsZVxuICAgIH1cbn1cblxuZnVuY3Rpb24gc29jaWFsTmV0d29ya3MoKSB7XG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNvY2lhbC1uZXR3b3Jrcz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWluKSByZXR1cm5cblxuICAgIGNvbnN0IGNsb25lZE1haW4gPSBtYWluLmNsb25lTm9kZSh0cnVlKVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kKGNsb25lZE1haW4pXG4gICAgbWFpbi5yZW1vdmUoKVxufVxuXG5mdW5jdGlvbiBzZXJ2aWNlcygpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtc2VydmljZXM9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbikgcmV0dXJuXG5cbiAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXInKVxuICAgIGNvbnN0IHNsaWRlcyA9IHNsaWRlci5xdWVyeVNlbGVjdG9yQWxsKCcuc3dpcGVyLXNsaWRlJylcbiAgICBjb25zdCBzbGlkZXJIZWlnaHQgPSBzbGlkZXIub2Zmc2V0SGVpZ2h0XG5cbiAgICBzbGlkZXMuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgIHNsaWRlLnN0eWxlLmhlaWdodCA9IGAke3NsaWRlckhlaWdodH1weGBcbiAgICB9KVxufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgaGVhZGVyKClcbiAgICB9IGVsc2Uge1xuICAgICAgICBzb2NpYWxOZXR3b3JrcygpXG4gICAgfVxuICAgIFxuICAgIHJ1bm5pbmdMaW5lKClcbiAgICBmYXEoKVxuICAgIHNpbXBsZVNsaWRlcigpXG4gICAgcHJpbWFyeVNsaWRlcigpXG4gICAgdmlkZW9SZXZpZXdzKClcbiAgICB2aWRlb1JldmlldygpXG4gICAgbVNsaWRlcigpXG4gICAgc2xpZGVyQ2FyZCgpXG4gICAgaW5wdXQoKVxuICAgIHBob25lTWFzaygpXG5cbiAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA3NjhweClcIikubWF0Y2hlcykge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHNlcnZpY2VzKClcbiAgICAgICAgfSwgMjAwMClcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbWVzc2FnZSgpLnRvZ2dsZSgpXG5cbiAgICAgICAgLy8g0JTQu9GPINC/0YDQuNC80LXRgNCwXG4gICAgfSwgMjAwMClcblxuICAgIG1vZGFsKClcbn1cbiJdLCJmaWxlIjoibWFpbi5qcyJ9
