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
            autoHeight: true,
            breakpoints: {
                1200: {
                  slidesPerView: slides || 4,
                  spaceBetween: 16
                },
                992: {
                    slidesPerView: 3.2,
                    spaceBetween: 16
                },
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 16
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
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                992: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 16
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
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
            breakpoints: {
                992: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 16
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

        const swiper = new Swiper(slider, {
            lazy: true,
            pagination: {
              el: pagination,
              clickable: true,
              type: "progressbar",
            },
            navigation: {
              nextEl: btnNext,
              prevEl: btnPrev,
            },
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

window.onload = () => {
    header()
    runningLine()
    input()
    phoneMask()
    faq()
    simpleSlider()
    primarySlider()
    videoReviews()
    videoReview()
    mSlider()
    sliderCard()

    setTimeout(() => {
        message().toggle()

        // Для примера
    }, 2000)

    modal()
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XG5cbiAgICBpZiAoIWJ0biAmJiAhZWwpIHJldHVyblxuXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJylcbiAgICB9XG4gICAgXG4gICAgbGV0IGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgYWRkKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xuICAgICAgICBpZiAoaGVpZ2h0RWwgPCBzdGFydEhlaWdodCkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgIHVwZGF0ZSgpXG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZWwsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBydW5uaW5nTGluZSgpIHtcbiAgICBNYXJxdWVlM2suaW5pdCgpXG59XG5cbmZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcblxuICAgICAgICBpZiAoc2Nyb2xsZWQgPj0gMSkge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5wdXQoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpXG5cbiAgICBpZiAoIWlucHV0cy5sZW5ndGgpIHJldHVyblxuXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWJ0bi1jbGVhbmluZycpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1idG4tY2xlYW5pbmcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBjb25zdCByZW1vdmVDbGVhbmluZyA9ICgpID0+IHtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWJ0bi1jbGVhbmluZycpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpKSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGVsLmNsb3Nlc3QoJ1tkYXRhLWlucHV0PVwiaW5wdXRcIl0nKVxuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBpbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImZpZWxkXCJdJylcblxuICAgICAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGRUZXh0ID0gZmllbGQudmFsdWVcblxuICAgICAgICAgICAgICAgIHJlbW92ZUNsZWFuaW5nKClcblxuICAgICAgICAgICAgICAgIGlmIChmaWVsZFRleHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tYnRuLWNsZWFuaW5nJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tYnRuLWNsZWFuaW5nJylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaW5wdXQ9XCJidG4tY2xlYW5pbmdcIl0nKSkge1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoZmllbGRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLnZhbHVlID0gJydcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1idG4tY2xlYW5pbmcnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVtb3ZlQ2xlYW5pbmcoKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcGhvbmVNYXNrKCkge1xuICAgIGNvbnN0IHBob25lTWFza3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1waG9uZS1tYXNrXScpXG5cbiAgICBpZiAoIXBob25lTWFza3MubGVuZ3RoKSByZXR1cm5cblxuICAgIHBob25lTWFza3MuZm9yRWFjaChwaG9uZU1hc2sgPT4ge1xuICAgICAgICBJTWFzayhwaG9uZU1hc2ssIHtcbiAgICAgICAgICAgIG1hc2s6ICcrezd9KDAwMCkwMDAtMDAtMDAnXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZmFxKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbikgcmV0dXJuXG5cbiAgICBjb25zdCBibG9ja3NJbmZvID0gbWFpbi5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mYXE9XCJibG9jay1pbmZvXCJdJylcblxuXG5cbiAgICBibG9ja3NJbmZvLmZvckVhY2goYmxvY2tJbmZvID0+IHtcbiAgICAgICAgY29uc3QgaW5mb0hlYWQgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiaW5mby1oZWFkXCJdJylcbiAgICAgICAgY29uc3QgaW5mb0JvZHkgPSBibG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiaW5mby1ib2R5XCJdJylcblxuICAgICAgICBzbW9vdGhWaWV3KGluZm9IZWFkLCBpbmZvQm9keSlcblxuICAgICAgICBpbmZvSGVhZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGJsb2Nrc0luZm8uZm9yRWFjaChpbm5lckJsb2NrSW5mbyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlubmVyQmxvY2tJbmZvICE9PSBibG9ja0luZm8pIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mb0hlYWQgPSBpbm5lckJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJpbmZvLWhlYWRcIl0nKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmZvQm9keSA9IGlubmVyQmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImluZm8tYm9keVwiXScpXG5cbiAgICAgICAgICAgICAgICAgICAgaW5mb0hlYWQuY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb2R5LmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBpbmZvQm9keS5zdHlsZS5oZWlnaHQgPSAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBzaW1wbGVTbGlkZXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zaW1wbGUtc2xpZGVyPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNpbXBsZS1zbGlkZXI9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBzbGlkZXMgPSBzbGlkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLXNpbXBsZS1zbGlkZXItc2xpZGVzJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgZnJlZU1vZGU6IHRydWUsXG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICAxMjAwOiB7XG4gICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiBzbGlkZXMgfHwgNCxcbiAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAzLjIsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLjIsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHByaW1hcnlTbGlkZXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByaW1hcnktc2xpZGVyPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cImJ0bi1uZXh0XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS4yLFxuICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiA4LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMixcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDIsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIDc2ODoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjUsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB2aWRlb1Jldmlld3MoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS12aWRlby1yZXZpZXdzPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXZpZGVvLXJldmlld3M9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1yZXZpZXdzPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1yZXZpZXdzPVwiYnRuLW5leHRcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLjYsXG4gICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiA0LFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTZcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHZpZGVvUmV2aWV3KCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmlkZW8tcmV2aWV3PVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBwcmV2aWV3ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1yZXZpZXc9XCJwcmV2aWV3XCJdJylcbiAgICAgICAgY29uc3QgY2xvbmVkUHJldmlldyA9IHByZXZpZXcuY2xvbmVOb2RlKHRydWUpXG4gICAgICAgIGNsb25lZFByZXZpZXcuY2xhc3NMaXN0LmFkZCgndmlkZW8tcmV2aWV3X19wcmV2aWV3LS1iZycpXG4gICAgICAgIHByZXZpZXcuYWZ0ZXIoY2xvbmVkUHJldmlldylcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBtb2RhbCgpIHtcbiAgICBjb25zdCBtb2RhbCA9IG5ldyBIeXN0TW9kYWwoe1xuICAgICAgICBsaW5rQXR0cmlidXRlTmFtZTogXCJkYXRhLWh5c3Rtb2RhbFwiLFxuICAgICAgICB3YWl0VHJhbnNpdGlvbnM6IHRydWUsXG4gICAgICAgIGFmdGVyQ2xvc2U6IChtb2RhbCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2luZG93ID0gbW9kYWwub3BlbmVkV2luZG93XG4gICAgICAgICAgICBjb25zdCB2aWRlb3MgPSB3aW5kb3cucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJylcbiAgICAgICAgICAgIGlmICh2aWRlb3MubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmlkZW9zLmZvckVhY2godmlkZW8gPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcmMgPSB2aWRlby5nZXRBdHRyaWJ1dGUoJ3NyYycpXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXG4gICAgICAgICAgICAgICAgICAgIHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSlcbiAgICByZXR1cm4gbW9kYWxcbn1cblxuZnVuY3Rpb24gbVNsaWRlcigpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW0tc2xpZGVyPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW0tc2xpZGVyPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtbS1zbGlkZXI9XCJidG4tcHJldlwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW0tc2xpZGVyPVwiYnRuLW5leHRcIl0nKVxuICAgICAgICBjb25zdCBwYWdpbmF0aW9uID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tLXNsaWRlcj1cInBhZ2luYXRpb25cIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBsYXp5OiB0cnVlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2xpZGVyQ2FyZCgpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNsaWRlci1jYXJkPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW5zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBtYWlucy5mb3JFYWNoKG1haW4gPT4ge1xuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNsaWRlci1jYXJkPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtc2xpZGVyLWNhcmQ9XCJwYWdpbmF0aW9uXCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgbGF6eTogdHJ1ZSxcbiAgICAgICAgICAgIGxvb3A6IHRydWUsXG4gICAgICAgICAgICBlZmZlY3Q6IFwiZmFkZVwiLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBtYWluLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoKVxuICAgICAgICB9KVxuICAgICAgICBtYWluLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoKVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cbi8vINCS0YvQt9C+0LIg0YTRg9C90LrRhtC40LggbWVzc2FnZSgpLnRvZ2dsZSgpXG5mdW5jdGlvbiBtZXNzYWdlKCkge1xuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tZXNzYWdlPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW4pIHJldHVyblxuXG4gICAgY29uc3QgdG9nZ2xlID0gKCkgPT4ge1xuICAgICAgICBtYWluLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgIH0sIDUwMDApXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9nZ2xlXG4gICAgfVxufVxuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICAgIGhlYWRlcigpXG4gICAgcnVubmluZ0xpbmUoKVxuICAgIGlucHV0KClcbiAgICBwaG9uZU1hc2soKVxuICAgIGZhcSgpXG4gICAgc2ltcGxlU2xpZGVyKClcbiAgICBwcmltYXJ5U2xpZGVyKClcbiAgICB2aWRlb1Jldmlld3MoKVxuICAgIHZpZGVvUmV2aWV3KClcbiAgICBtU2xpZGVyKClcbiAgICBzbGlkZXJDYXJkKClcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBtZXNzYWdlKCkudG9nZ2xlKClcblxuICAgICAgICAvLyDQlNC70Y8g0L/RgNC40LzQtdGA0LBcbiAgICB9LCAyMDAwKVxuXG4gICAgbW9kYWwoKVxufVxuIl0sImZpbGUiOiJtYWluLmpzIn0=
