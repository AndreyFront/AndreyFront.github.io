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

    document.addEventListener('click', (event) => {
        const el = event.target

        if (el.closest('[data-input="input"]')) {
            const input = el.closest('[data-input="input"]')
            const field = input.querySelector('[data-input="field"]')

            if (field) {
                const fieldText = field.value

                if (el.closest('[data-input="btn-cleaning"]')) {
    
                    if (fieldText.length > 0) {
                        field.value = ''
                        input.classList.remove('input--btn-cleaning')
                    }
                }
            }
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
        const image = main.querySelector('[data-m-slider="image"]')

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

    modal()
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNtb290aFZpZXcoYnRuLCBlbCwgc3RhcnRIZWlnaHQgPSAwKSB7XG5cbiAgICBpZiAoIWJ0biAmJiAhZWwpIHJldHVyblxuXG4gICAgY29uc3QgYWRkID0gKCkgPT4ge1xuICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnbm90LWFjdGl2ZScpXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgIH1cblxuICAgIGNvbnN0IHJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ25vdC1hY3RpdmUnKVxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdub3QtYWN0aXZlJylcbiAgICB9XG4gICAgXG4gICAgbGV0IGhlaWdodEVsID0gZWwub2Zmc2V0SGVpZ2h0XG5cbiAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgYWRkKClcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3RhcnRIZWlnaHR9cHhgXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0SGVpZ2h0ID4gMCkge1xuICAgICAgICBpZiAoaGVpZ2h0RWwgPCBzdGFydEhlaWdodCkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5oZWlnaHQgPSAnYXV0bydcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBoZWlnaHRFbCA9IGVsLm9mZnNldEhlaWdodFxuICAgICAgICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0RWx9cHhgXG4gICAgICAgIH0sIDEwMClcbiAgICB9XG5cbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ25vdC1hY3RpdmUnKSkge1xuICAgICAgICAgICAgcmVtb3ZlKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodEVsfXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkKClcbiAgICAgICAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3N0YXJ0SGVpZ2h0fXB4YFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxldCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKG11dGF0aW9uUmVjb3JkcyA9PiB7XG4gICAgICAgIHVwZGF0ZSgpXG4gICAgfSlcblxuICAgIG9ic2VydmVyLm9ic2VydmUoZWwsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBjaGFyYWN0ZXJEYXRhT2xkVmFsdWU6IHRydWVcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBydW5uaW5nTGluZSgpIHtcbiAgICBNYXJxdWVlM2suaW5pdCgpXG59XG5cbmZ1bmN0aW9uIGhlYWRlcigpIHtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcblxuICAgICAgICBpZiAoc2Nyb2xsZWQgPj0gMSkge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWRlci0tZml4ZWQnKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gaW5wdXQoKSB7XG4gICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpXG5cbiAgICBpZiAoIWlucHV0cy5sZW5ndGgpIHJldHVyblxuXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWJ0bi1jbGVhbmluZycpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1idG4tY2xlYW5pbmcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IGV2ZW50LnRhcmdldFxuXG4gICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1pbnB1dD1cImlucHV0XCJdJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZWwuY2xvc2VzdCgnW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpXG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IGlucHV0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlucHV0PVwiZmllbGRcIl0nKVxuXG4gICAgICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZFRleHQgPSBmaWVsZC52YWx1ZVxuXG4gICAgICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLWlucHV0PVwiYnRuLWNsZWFuaW5nXCJdJykpIHtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkVGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC52YWx1ZSA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tYnRuLWNsZWFuaW5nJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIHBob25lTWFzaygpIHtcbiAgICBjb25zdCBwaG9uZU1hc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGhvbmUtbWFza10nKVxuXG4gICAgaWYgKCFwaG9uZU1hc2tzLmxlbmd0aCkgcmV0dXJuXG5cbiAgICBwaG9uZU1hc2tzLmZvckVhY2gocGhvbmVNYXNrID0+IHtcbiAgICAgICAgSU1hc2socGhvbmVNYXNrLCB7XG4gICAgICAgICAgICBtYXNrOiAnK3s3fSgwMDApMDAwLTAwLTAwJ1xuICAgICAgICB9KVxuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZhcSgpIHtcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwibWFpblwiXScpXG5cbiAgICBpZiAoIW1haW4pIHJldHVyblxuXG4gICAgY29uc3QgYmxvY2tzSW5mbyA9IG1haW4ucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZmFxPVwiYmxvY2staW5mb1wiXScpXG5cblxuXG4gICAgYmxvY2tzSW5mby5mb3JFYWNoKGJsb2NrSW5mbyA9PiB7XG4gICAgICAgIGNvbnN0IGluZm9IZWFkID0gYmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImluZm8taGVhZFwiXScpXG4gICAgICAgIGNvbnN0IGluZm9Cb2R5ID0gYmxvY2tJbmZvLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZhcT1cImluZm8tYm9keVwiXScpXG5cbiAgICAgICAgc21vb3RoVmlldyhpbmZvSGVhZCwgaW5mb0JvZHkpXG5cbiAgICAgICAgaW5mb0hlYWQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBibG9ja3NJbmZvLmZvckVhY2goaW5uZXJCbG9ja0luZm8gPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbm5lckJsb2NrSW5mbyAhPT0gYmxvY2tJbmZvKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZm9IZWFkID0gaW5uZXJCbG9ja0luZm8ucXVlcnlTZWxlY3RvcignW2RhdGEtZmFxPVwiaW5mby1oZWFkXCJdJylcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5mb0JvZHkgPSBpbm5lckJsb2NrSW5mby5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mYXE9XCJpbmZvLWJvZHlcIl0nKVxuXG4gICAgICAgICAgICAgICAgICAgIGluZm9IZWFkLmNsYXNzTGlzdC5hZGQoJ25vdC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICBpbmZvQm9keS5jbGFzc0xpc3QuYWRkKCdub3QtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgaW5mb0JvZHkuc3R5bGUuaGVpZ2h0ID0gMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gc2ltcGxlU2xpZGVyKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc2ltcGxlLXNsaWRlcj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zaW1wbGUtc2xpZGVyPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gc2xpZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1zaW1wbGUtc2xpZGVyLXNsaWRlcycpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuMixcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcbiAgICAgICAgICAgIGZyZWVNb2RlOiB0cnVlLFxuICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgMTIwMDoge1xuICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogc2xpZGVzIHx8IDQsXG4gICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA5OTI6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMy4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMi4yLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiBwcmltYXJ5U2xpZGVyKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcHJpbWFyeS1zbGlkZXI9XCJtYWluXCJdJylcblxuICAgIGlmICghbWFpbnMubGVuZ3RoKSByZXR1cm5cblxuICAgIG1haW5zLmZvckVhY2gobWFpbiA9PiB7XG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJpbWFyeS1zbGlkZXI9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBidG5QcmV2ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcmltYXJ5LXNsaWRlcj1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcHJpbWFyeS1zbGlkZXI9XCJidG4tbmV4dFwiXScpXG5cbiAgICAgICAgY29uc3Qgc3dpcGVyID0gbmV3IFN3aXBlcihzbGlkZXIsIHtcbiAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEuMixcbiAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgICAgYXV0b0hlaWdodDogdHJ1ZSxcbiAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogOCxcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgOTkyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDIsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAyLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS41LFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gdmlkZW9SZXZpZXdzKCkge1xuICAgIGNvbnN0IG1haW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdmlkZW8tcmV2aWV3cz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS12aWRlby1yZXZpZXdzPVwic2xpZGVyXCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tcmV2aWV3cz1cImJ0bi1wcmV2XCJdJylcbiAgICAgICAgY29uc3QgYnRuTmV4dCA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tcmV2aWV3cz1cImJ0bi1uZXh0XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMS42LFxuICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDgsXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgbmV4dEVsOiBidG5OZXh0LFxuICAgICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBicmVha3BvaW50czoge1xuICAgICAgICAgICAgICAgIDk5Mjoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogNCxcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgNzY4OiB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAzLFxuICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5mdW5jdGlvbiB2aWRlb1JldmlldygpIHtcbiAgICBjb25zdCBtYWlucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXZpZGVvLXJldmlldz1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3QgcHJldmlldyA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtdmlkZW8tcmV2aWV3PVwicHJldmlld1wiXScpXG4gICAgICAgIGNvbnN0IGNsb25lZFByZXZpZXcgPSBwcmV2aWV3LmNsb25lTm9kZSh0cnVlKVxuICAgICAgICBjbG9uZWRQcmV2aWV3LmNsYXNzTGlzdC5hZGQoJ3ZpZGVvLXJldmlld19fcHJldmlldy0tYmcnKVxuICAgICAgICBwcmV2aWV3LmFmdGVyKGNsb25lZFByZXZpZXcpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gbW9kYWwoKSB7XG4gICAgY29uc3QgbW9kYWwgPSBuZXcgSHlzdE1vZGFsKHtcbiAgICAgICAgbGlua0F0dHJpYnV0ZU5hbWU6IFwiZGF0YS1oeXN0bW9kYWxcIixcbiAgICAgICAgd2FpdFRyYW5zaXRpb25zOiB0cnVlLFxuICAgICAgICBhZnRlckNsb3NlOiAobW9kYWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvdyA9IG1vZGFsLm9wZW5lZFdpbmRvd1xuICAgICAgICAgICAgY29uc3QgdmlkZW9zID0gd2luZG93LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lmcmFtZScpXG4gICAgICAgICAgICBpZiAodmlkZW9zLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZpZGVvcy5mb3JFYWNoKHZpZGVvID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gdmlkZW8uZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgICAgICAgICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxuICAgICAgICAgICAgICAgICAgICB2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyYylcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pXG4gICAgcmV0dXJuIG1vZGFsXG59XG5cbmZ1bmN0aW9uIG1TbGlkZXIoKSB7XG4gICAgY29uc3QgbWFpbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1tLXNsaWRlcj1cIm1haW5cIl0nKVxuXG4gICAgaWYgKCFtYWlucy5sZW5ndGgpIHJldHVyblxuXG4gICAgbWFpbnMuZm9yRWFjaChtYWluID0+IHtcbiAgICAgICAgY29uc3Qgc2xpZGVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tLXNsaWRlcj1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW0tc2xpZGVyPVwiYnRuLXByZXZcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gbWFpbi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1tLXNsaWRlcj1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgcGFnaW5hdGlvbiA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtbS1zbGlkZXI9XCJwYWdpbmF0aW9uXCJdJylcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW0tc2xpZGVyPVwiaW1hZ2VcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBsYXp5OiB0cnVlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICAgICAgICBlbDogcGFnaW5hdGlvbixcbiAgICAgICAgICAgICAgY2xpY2thYmxlOiB0cnVlLFxuICAgICAgICAgICAgICB0eXBlOiBcInByb2dyZXNzYmFyXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgIHByZXZFbDogYnRuUHJldixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgfSlcbn1cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgICBoZWFkZXIoKVxuICAgIHJ1bm5pbmdMaW5lKClcbiAgICBpbnB1dCgpXG4gICAgcGhvbmVNYXNrKClcbiAgICBmYXEoKVxuICAgIHNpbXBsZVNsaWRlcigpXG4gICAgcHJpbWFyeVNsaWRlcigpXG4gICAgdmlkZW9SZXZpZXdzKClcbiAgICB2aWRlb1JldmlldygpXG4gICAgbVNsaWRlcigpXG5cbiAgICBtb2RhbCgpXG59XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
