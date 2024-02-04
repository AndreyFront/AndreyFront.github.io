window.onload = () => {
    function fixedHeader() {
        const header = document.querySelector('[data-header="main"]')

        if (!header) return

        if (window.matchMedia("(min-width: 992px)").matches) {
            window.addEventListener('scroll', (event) => {
                const scrolled = window.pageYOffset ? window.pageYOffset : document.body.scrollTop;

                if (scrolled >= 20) {
                    header.classList.add('scroll-active')
                } else {
                    header.classList.remove('scroll-active')
                }
            })
        }
    }

    function smoothScrolling() {
        const anchors = document.querySelectorAll('[data-smooth-scrolling*="#"]')

        if (!anchors.length) return

        document.addEventListener('click', (event) => {
            const el = event.target

            if (el.closest('[data-smooth-scrolling*="#"]')) {
                event.preventDefault()

                const anchor = el.closest('[data-smooth-scrolling*="#"]')
                const blockID = anchor.getAttribute('data-smooth-scrolling').substr(1)

                document.querySelector(`[data-smooth-scrolling="${blockID}"]`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
        })
    }

    function navigation() {
        const header = document.querySelector('[data-header="main"]')

        if (!header) return

        window.addEventListener('scroll', () => {
            const scrollDistance = window.scrollY
            const blockNav = header.querySelector('[data-header="nav"]')
            const navListItem = blockNav.querySelectorAll('li')
            const navLink = blockNav.querySelectorAll('a')

            const removeActive = () => {
                navLink.forEach((el) => {
                    if (el.classList.contains('active')) {
                        el.classList.remove('active')
                    }
                })
            }

            let replacementBlockNav


            if (window.matchMedia("(max-width: 992px)").matches) {
                replacementBlockNav = header
            } else {
                replacementBlockNav = blockNav
            }

            document.querySelectorAll('section[data-smooth-scrolling]').forEach((el, index) => {
                if (el.offsetTop - replacementBlockNav.clientHeight <= scrollDistance) {
                    removeActive()
                    // let localIndex = index
                    const dataValue = el.getAttribute('data-smooth-scrolling')
                    navListItem.forEach(elNavListItem => {
                        const anchor = elNavListItem.querySelector('[data-smooth-scrolling*="#"]')
                        const blockID = anchor.getAttribute('data-smooth-scrolling').substr(1)
                        if (blockID === dataValue) {
                            elNavListItem.querySelector('a').classList.add('active')
                        }
                    })
                }

                if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                    removeActive()
                    const dataValue = el.getAttribute('data-smooth-scrolling')
                    navListItem.forEach(elNavListItem => {
                        const anchor = elNavListItem.querySelector('[data-smooth-scrolling*="#"]')
                        const blockID = anchor.getAttribute('data-smooth-scrolling').substr(1)
                        if (blockID === dataValue) {
                            elNavListItem.querySelector('a').classList.add('active')
                        }
                    })
                }
            })
        })
    }

    function menu() {
        const header = document.querySelector('[data-header="main"]')

        if (!header) return

        if (window.matchMedia("(max-width: 992px)").matches) {
            const btnMenu = header.querySelector('[data-header="btn-menu"]')

            btnMenu.addEventListener('click', () => {
                header.classList.toggle('active-menu')
            })

            document.addEventListener('click', (event) => {
                const el = event.target

                if (el.closest('[data-header="nav"]')) {
                    if (el.closest('a[data-smooth-scrolling]')) {
                        header.classList.remove('active-menu')
                    }
                }
            })
        }
    }

    function reviews() {
        const main = document.querySelector('[data-reviews="main"]')

        if (!main) return

        const slider = main.querySelector('[data-reviews="slider"]')
        const btnNext = slider.querySelector('[data-reviews="btn-next"]')
        const btnPrev = slider.querySelector('[data-reviews="btn-prev"]')

        const swiper = new Swiper(slider, {
            centeredSlides: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            effect: "fade",
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
        })
    }

    function input() {
        const inputs = document.querySelectorAll('[data-input="block-input"]')

        if (!inputs.length) return

        const removeClass = () => {
            inputs.forEach(elInput => {
                const input = elInput.querySelector('[data-input="input"]')
                const btnClearing = elInput.querySelector('[data-input="btn-clearing"]')
                elInput.classList.remove('input--viewed')
                if (!input.value) {
                    elInput.classList.remove('input--focus')
                    btnClearing.classList.remove('active')
                } else {
                    elInput.classList.add('input--focus')
                    btnClearing.classList.add('active')
                }
            })
        }

        const logic = (event) => {
            if (event.target.closest('[data-input="block-input"]')) {
                const blockInput = event.target.closest('[data-input="block-input"]')
                const input = blockInput.querySelector('[data-input="input"]')
                const btnClearing = blockInput.querySelector('[data-input="btn-clearing"]')

                removeClass()

                blockInput.classList.add('input--focus')
                blockInput.classList.add('input--viewed')

                input.addEventListener('input', (event) => {
                    const value = event.target.value

                    if (value) {
                        btnClearing.classList.add('active')
                    } else {
                        btnClearing.classList.remove('active')
                    }
                })

                if (btnClearing.classList.contains('active')) {
                    btnClearing.addEventListener('click', () => {
                        input.value = ''
                        btnClearing.classList.remove('active')
                        removeClass()
                    })
                }
            } else {
                removeClass()
            }
        }

        inputs.forEach(elInput => {
            const input = elInput.querySelector('[data-input="input"]')
            if (input.value) {
                const btnClearing = elInput.querySelector('[data-input="btn-clearing"]')

                elInput.classList.add('input--focus')
                btnClearing.classList.add('active')
            }
        })

        document.addEventListener('focusin', (event) => logic(event))

        document.addEventListener('pointerup', (event) => logic(event))
    }

    function textarea() {
        const textareas = document.querySelectorAll('[data-textarea="block-textarea"]')

        if (!textareas.length) return

        const removeClass = () => {
            textareas.forEach(elTextarea => {
                const textarea = elTextarea.querySelector('[data-textarea="textarea"]')
                elTextarea.classList.remove('textarea--viewed')
                if (!textarea.value) {
                    elTextarea.classList.remove('textarea--focus')
                }
            })
        }

        document.addEventListener('click', (event) => {
            if (event.target.closest('[data-textarea="block-textarea"]')) {
                const blockTextarea = event.target.closest('[data-textarea="block-textarea"]')

                removeClass()

                blockTextarea.classList.add('textarea--focus')
                blockTextarea.classList.add('textarea--viewed')
            } else {
                removeClass()
            }
        })
    }

    function scrollParallax() {
        const items = document.querySelectorAll('[data-scroll-parallax]')

        if (!items.length) return

        new simpleParallax(items, {
            delay: .3,
            scale: 1.2,
            transition: 'cubic-bezier(0,0,0,1)'
        })
    }

    page()
    fixedHeader()
    menu()
    navigation()
    smoothScrolling()
    reviews()
    input()
    textarea()
    scrollParallax()
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgZnVuY3Rpb24gZml4ZWRIZWFkZXIoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIm1haW5cIl0nKVxuXG4gICAgICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWluLXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0ID8gd2luZG93LnBhZ2VZT2Zmc2V0IDogZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsZWQgPj0gMjApIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Njcm9sbC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGwtYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc21vb3RoU2Nyb2xsaW5nKCkge1xuICAgICAgICBjb25zdCBhbmNob3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtc21vb3RoLXNjcm9sbGluZyo9XCIjXCJdJylcblxuICAgICAgICBpZiAoIWFuY2hvcnMubGVuZ3RoKSByZXR1cm5cblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNtb290aC1zY3JvbGxpbmcqPVwiI1wiXScpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gZWwuY2xvc2VzdCgnW2RhdGEtc21vb3RoLXNjcm9sbGluZyo9XCIjXCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja0lEID0gYW5jaG9yLmdldEF0dHJpYnV0ZSgnZGF0YS1zbW9vdGgtc2Nyb2xsaW5nJykuc3Vic3RyKDEpXG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zbW9vdGgtc2Nyb2xsaW5nPVwiJHtibG9ja0lEfVwiXWApLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0J1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmF2aWdhdGlvbigpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWFpblwiXScpXG5cbiAgICAgICAgaWYgKCFoZWFkZXIpIHJldHVyblxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzY3JvbGxEaXN0YW5jZSA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICAgICAgICBjb25zdCBibG9ja05hdiA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJuYXZcIl0nKVxuICAgICAgICAgICAgY29uc3QgbmF2TGlzdEl0ZW0gPSBibG9ja05hdi5xdWVyeVNlbGVjdG9yQWxsKCdsaScpXG4gICAgICAgICAgICBjb25zdCBuYXZMaW5rID0gYmxvY2tOYXYucXVlcnlTZWxlY3RvckFsbCgnYScpXG5cbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUFjdGl2ZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBuYXZMaW5rLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHJlcGxhY2VtZW50QmxvY2tOYXZcblxuXG4gICAgICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50QmxvY2tOYXYgPSBoZWFkZXJcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVwbGFjZW1lbnRCbG9ja05hdiA9IGJsb2NrTmF2XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlY3Rpb25bZGF0YS1zbW9vdGgtc2Nyb2xsaW5nXScpLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbC5vZmZzZXRUb3AgLSByZXBsYWNlbWVudEJsb2NrTmF2LmNsaWVudEhlaWdodCA8PSBzY3JvbGxEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmUoKVxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgbG9jYWxJbmRleCA9IGluZGV4XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFWYWx1ZSA9IGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zbW9vdGgtc2Nyb2xsaW5nJylcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlzdEl0ZW0uZm9yRWFjaChlbE5hdkxpc3RJdGVtID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IGVsTmF2TGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignW2RhdGEtc21vb3RoLXNjcm9sbGluZyo9XCIjXCJdJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrSUQgPSBhbmNob3IuZ2V0QXR0cmlidXRlKCdkYXRhLXNtb290aC1zY3JvbGxpbmcnKS5zdWJzdHIoMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChibG9ja0lEID09PSBkYXRhVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbE5hdkxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnBhZ2VZT2Zmc2V0KSA+PSBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmUoKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhVmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc21vb3RoLXNjcm9sbGluZycpXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpc3RJdGVtLmZvckVhY2goZWxOYXZMaXN0SXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmNob3IgPSBlbE5hdkxpc3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNtb290aC1zY3JvbGxpbmcqPVwiI1wiXScpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBibG9ja0lEID0gYW5jaG9yLmdldEF0dHJpYnV0ZSgnZGF0YS1zbW9vdGgtc2Nyb2xsaW5nJykuc3Vic3RyKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmxvY2tJRCA9PT0gZGF0YVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxOYXZMaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCdhJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lbnUoKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIm1haW5cIl0nKVxuXG4gICAgICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgYnRuTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJidG4tbWVudVwiXScpXG5cbiAgICAgICAgICAgIGJ0bk1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZS1tZW51JylcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICAgICAgICAgIGlmIChlbC5jbG9zZXN0KCdbZGF0YS1oZWFkZXI9XCJuYXZcIl0nKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnYVtkYXRhLXNtb290aC1zY3JvbGxpbmddJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUtbWVudScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmV2aWV3cygpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJtYWluXCJdJylcblxuICAgICAgICBpZiAoIW1haW4pIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiYnRuLXByZXZcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB7XG4gICAgICAgICAgICAgICAgZGVsYXk6IDUwMDAsXG4gICAgICAgICAgICAgICAgZGlzYWJsZU9uSW50ZXJhY3Rpb246IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWZmZWN0OiBcImZhZGVcIixcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnB1dCgpIHtcbiAgICAgICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW5wdXQ9XCJibG9jay1pbnB1dFwiXScpXG5cbiAgICAgICAgaWYgKCFpbnB1dHMubGVuZ3RoKSByZXR1cm5cblxuICAgICAgICBjb25zdCByZW1vdmVDbGFzcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGlucHV0cy5mb3JFYWNoKGVsSW5wdXQgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZWxJbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImlucHV0XCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBidG5DbGVhcmluZyA9IGVsSW5wdXQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQ9XCJidG4tY2xlYXJpbmdcIl0nKVxuICAgICAgICAgICAgICAgIGVsSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLXZpZXdlZCcpXG4gICAgICAgICAgICAgICAgaWYgKCFpbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBlbElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS1mb2N1cycpXG4gICAgICAgICAgICAgICAgICAgIGJ0bkNsZWFyaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWxJbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZm9jdXMnKVxuICAgICAgICAgICAgICAgICAgICBidG5DbGVhcmluZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBsb2dpYyA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1pbnB1dD1cImJsb2NrLWlucHV0XCJdJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja0lucHV0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWlucHV0PVwiYmxvY2staW5wdXRcIl0nKVxuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gYmxvY2tJbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImlucHV0XCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBidG5DbGVhcmluZyA9IGJsb2NrSW5wdXQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQ9XCJidG4tY2xlYXJpbmdcIl0nKVxuXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoKVxuXG4gICAgICAgICAgICAgICAgYmxvY2tJbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZm9jdXMnKVxuICAgICAgICAgICAgICAgIGJsb2NrSW5wdXQuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLXZpZXdlZCcpXG5cbiAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnRuQ2xlYXJpbmcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkNsZWFyaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgaWYgKGJ0bkNsZWFyaW5nLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYnRuQ2xlYXJpbmcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICBidG5DbGVhcmluZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXRzLmZvckVhY2goZWxJbnB1dCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGVsSW5wdXQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpXG4gICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBidG5DbGVhcmluZyA9IGVsSW5wdXQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQ9XCJidG4tY2xlYXJpbmdcIl0nKVxuXG4gICAgICAgICAgICAgICAgZWxJbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZm9jdXMnKVxuICAgICAgICAgICAgICAgIGJ0bkNsZWFyaW5nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsIChldmVudCkgPT4gbG9naWMoZXZlbnQpKVxuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIChldmVudCkgPT4gbG9naWMoZXZlbnQpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRleHRhcmVhKCkge1xuICAgICAgICBjb25zdCB0ZXh0YXJlYXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10ZXh0YXJlYT1cImJsb2NrLXRleHRhcmVhXCJdJylcblxuICAgICAgICBpZiAoIXRleHRhcmVhcy5sZW5ndGgpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHJlbW92ZUNsYXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgdGV4dGFyZWFzLmZvckVhY2goZWxUZXh0YXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dGFyZWEgPSBlbFRleHRhcmVhLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHRhcmVhPVwidGV4dGFyZWFcIl0nKVxuICAgICAgICAgICAgICAgIGVsVGV4dGFyZWEuY2xhc3NMaXN0LnJlbW92ZSgndGV4dGFyZWEtLXZpZXdlZCcpXG4gICAgICAgICAgICAgICAgaWYgKCF0ZXh0YXJlYS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBlbFRleHRhcmVhLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHRhcmVhLS1mb2N1cycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXRleHRhcmVhPVwiYmxvY2stdGV4dGFyZWFcIl0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrVGV4dGFyZWEgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtdGV4dGFyZWE9XCJibG9jay10ZXh0YXJlYVwiXScpXG5cbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcygpXG5cbiAgICAgICAgICAgICAgICBibG9ja1RleHRhcmVhLmNsYXNzTGlzdC5hZGQoJ3RleHRhcmVhLS1mb2N1cycpXG4gICAgICAgICAgICAgICAgYmxvY2tUZXh0YXJlYS5jbGFzc0xpc3QuYWRkKCd0ZXh0YXJlYS0tdmlld2VkJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFBhcmFsbGF4KCkge1xuICAgICAgICBjb25zdCBpdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXNjcm9sbC1wYXJhbGxheF0nKVxuXG4gICAgICAgIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm5cblxuICAgICAgICBuZXcgc2ltcGxlUGFyYWxsYXgoaXRlbXMsIHtcbiAgICAgICAgICAgIGRlbGF5OiAuMyxcbiAgICAgICAgICAgIHNjYWxlOiAxLjIsXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAnY3ViaWMtYmV6aWVyKDAsMCwwLDEpJ1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHBhZ2UoKVxuICAgIGZpeGVkSGVhZGVyKClcbiAgICBtZW51KClcbiAgICBuYXZpZ2F0aW9uKClcbiAgICBzbW9vdGhTY3JvbGxpbmcoKVxuICAgIHJldmlld3MoKVxuICAgIGlucHV0KClcbiAgICB0ZXh0YXJlYSgpXG4gICAgc2Nyb2xsUGFyYWxsYXgoKVxufSJdLCJmaWxlIjoibWFpbi5qcyJ9