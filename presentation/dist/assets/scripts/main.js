window.onload = () => {
    function page() {
        const main = document.querySelector('[data-page="main"]')
        const header = document.querySelector('[data-header="main"]')
    
        if (!main && !header ) return
    
        main.style.paddingTop = `${header.offsetHeight}px`
    }

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
    
            let heightValue,
                replacementBlockNav
    
            if (window.matchMedia("(max-width: 992px)").matches) {
                heightValue = 400
                replacementBlockNav = header
            } else {
                heightValue = 700
                replacementBlockNav = blockNav
            }
    
            if (window.pageYOffset <= heightValue) {
                removeActive()
                navLink[0].classList.add('active')
            } else {
                navLink[0].classList.remove('active')
            }
    
            document.querySelectorAll('section[data-smooth-scrolling]').forEach((el, index) => {
                if (el.offsetTop - replacementBlockNav.clientHeight <= scrollDistance) {
                    removeActive()
                    let localIndex = index
                    navListItem[localIndex + 1].querySelector('a').classList.add('active')
                }

                if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
                    removeActive()
                    navListItem[navListItem.length - 1].querySelector('a').classList.add('active')
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

    page()
    fixedHeader()
    menu()
    navigation()
    smoothScrolling()
    reviews()
    input()
    textarea()
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgZnVuY3Rpb24gcGFnZSgpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBhZ2U9XCJtYWluXCJdJylcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWFpblwiXScpXG4gICAgXG4gICAgICAgIGlmICghbWFpbiAmJiAhaGVhZGVyICkgcmV0dXJuXG4gICAgXG4gICAgICAgIG1haW4uc3R5bGUucGFkZGluZ1RvcCA9IGAke2hlYWRlci5vZmZzZXRIZWlnaHR9cHhgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZml4ZWRIZWFkZXIoKSB7ICAgICBcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWFpblwiXScpXG4gICAgXG4gICAgICAgIGlmICghaGVhZGVyKSByZXR1cm5cbiAgICBcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxlZCA+PSAyMCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxpbmcoKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbW9vdGgtc2Nyb2xsaW5nKj1cIiNcIl0nKVxuICAgIFxuICAgICAgICBpZiAoIWFuY2hvcnMubGVuZ3RoKSByZXR1cm5cblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWwgPSBldmVudC50YXJnZXRcblxuICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ1tkYXRhLXNtb290aC1zY3JvbGxpbmcqPVwiI1wiXScpKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gZWwuY2xvc2VzdCgnW2RhdGEtc21vb3RoLXNjcm9sbGluZyo9XCIjXCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja0lEID0gYW5jaG9yLmdldEF0dHJpYnV0ZSgnZGF0YS1zbW9vdGgtc2Nyb2xsaW5nJykuc3Vic3RyKDEpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc21vb3RoLXNjcm9sbGluZz1cIiR7YmxvY2tJRH1cIl1gKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5hdmlnYXRpb24oKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWhlYWRlcj1cIm1haW5cIl0nKVxuXG4gICAgICAgIGlmICghaGVhZGVyKSByZXR1cm5cblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsRGlzdGFuY2UgPSB3aW5kb3cuc2Nyb2xsWVxuICAgICAgICAgICAgY29uc3QgYmxvY2tOYXYgPSBoZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibmF2XCJdJylcbiAgICAgICAgICAgIGNvbnN0IG5hdkxpc3RJdGVtID0gYmxvY2tOYXYucXVlcnlTZWxlY3RvckFsbCgnbGknKVxuICAgICAgICAgICAgY29uc3QgbmF2TGluayA9IGJsb2NrTmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKVxuICAgIFxuICAgICAgICAgICAgY29uc3QgcmVtb3ZlQWN0aXZlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIG5hdkxpbmsuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgbGV0IGhlaWdodFZhbHVlLFxuICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50QmxvY2tOYXZcbiAgICBcbiAgICAgICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDk5MnB4KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0VmFsdWUgPSA0MDBcbiAgICAgICAgICAgICAgICByZXBsYWNlbWVudEJsb2NrTmF2ID0gaGVhZGVyXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhlaWdodFZhbHVlID0gNzAwXG4gICAgICAgICAgICAgICAgcmVwbGFjZW1lbnRCbG9ja05hdiA9IGJsb2NrTmF2XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0IDw9IGhlaWdodFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlKClcbiAgICAgICAgICAgICAgICBuYXZMaW5rWzBdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5hdkxpbmtbMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlY3Rpb25bZGF0YS1zbW9vdGgtc2Nyb2xsaW5nXScpLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbC5vZmZzZXRUb3AgLSByZXBsYWNlbWVudEJsb2NrTmF2LmNsaWVudEhlaWdodCA8PSBzY3JvbGxEaXN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVBY3RpdmUoKVxuICAgICAgICAgICAgICAgICAgICBsZXQgbG9jYWxJbmRleCA9IGluZGV4XG4gICAgICAgICAgICAgICAgICAgIG5hdkxpc3RJdGVtW2xvY2FsSW5kZXggKyAxXS5xdWVyeVNlbGVjdG9yKCdhJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoKHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5wYWdlWU9mZnNldCkgPj0gZG9jdW1lbnQuYm9keS5vZmZzZXRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlQWN0aXZlKClcbiAgICAgICAgICAgICAgICAgICAgbmF2TGlzdEl0ZW1bbmF2TGlzdEl0ZW0ubGVuZ3RoIC0gMV0ucXVlcnlTZWxlY3RvcignYScpLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZW51KCkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJtYWluXCJdJylcbiAgICBcbiAgICAgICAgaWYgKCFoZWFkZXIpIHJldHVyblxuICAgIFxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIobWF4LXdpZHRoOiA5OTJweClcIikubWF0Y2hlcykge1xuICAgICAgICAgICAgY29uc3QgYnRuTWVudSA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1oZWFkZXI9XCJidG4tbWVudVwiXScpXG4gICAgXG4gICAgICAgICAgICBidG5NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QudG9nZ2xlKCdhY3RpdmUtbWVudScpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gZXZlbnQudGFyZ2V0XG5cbiAgICAgICAgICAgICAgICBpZiAoZWwuY2xvc2VzdCgnW2RhdGEtaGVhZGVyPVwibmF2XCJdJykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLmNsb3Nlc3QoJ2FbZGF0YS1zbW9vdGgtc2Nyb2xsaW5nXScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlLW1lbnUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJldmlld3MoKSB7XG4gICAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwibWFpblwiXScpXG5cbiAgICAgICAgaWYgKCFtYWluKSByZXR1cm5cblxuICAgICAgICBjb25zdCBzbGlkZXIgPSBtYWluLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJzbGlkZXJcIl0nKVxuICAgICAgICBjb25zdCBidG5OZXh0ID0gc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJidG4tbmV4dFwiXScpXG4gICAgICAgIGNvbnN0IGJ0blByZXYgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cImJ0bi1wcmV2XCJdJylcblxuICAgICAgICBjb25zdCBzd2lwZXIgPSBuZXcgU3dpcGVyKHNsaWRlciwge1xuICAgICAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheToge1xuICAgICAgICAgICAgICBkZWxheTogNTAwMCxcbiAgICAgICAgICAgICAgZGlzYWJsZU9uSW50ZXJhY3Rpb246IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWZmZWN0OiBcImZhZGVcIixcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcbiAgICAgICAgICAgICAgICBuZXh0RWw6IGJ0bk5leHQsXG4gICAgICAgICAgICAgICAgcHJldkVsOiBidG5QcmV2LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnB1dCgpIHtcbiAgICAgICAgY29uc3QgaW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtaW5wdXQ9XCJibG9jay1pbnB1dFwiXScpXG4gICAgXG4gICAgICAgIGlmICghaW5wdXRzLmxlbmd0aCkgcmV0dXJuXG4gICAgXG4gICAgICAgIGNvbnN0IHJlbW92ZUNsYXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgaW5wdXRzLmZvckVhY2goZWxJbnB1dCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBlbElucHV0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlucHV0PVwiaW5wdXRcIl0nKVxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0bkNsZWFyaW5nID0gZWxJbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImJ0bi1jbGVhcmluZ1wiXScpXG4gICAgICAgICAgICAgICAgZWxJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tdmlld2VkJylcbiAgICAgICAgICAgICAgICBpZiAoIWlucHV0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtLWZvY3VzJylcbiAgICAgICAgICAgICAgICAgICAgYnRuQ2xlYXJpbmcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbElucHV0LmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1mb2N1cycpXG4gICAgICAgICAgICAgICAgICAgIGJ0bkNsZWFyaW5nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBjb25zdCBsb2dpYyA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1pbnB1dD1cImJsb2NrLWlucHV0XCJdJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja0lucHV0ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWlucHV0PVwiYmxvY2staW5wdXRcIl0nKVxuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gYmxvY2tJbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImlucHV0XCJdJylcbiAgICAgICAgICAgICAgICBjb25zdCBidG5DbGVhcmluZyA9IGJsb2NrSW5wdXQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQ9XCJidG4tY2xlYXJpbmdcIl0nKVxuICAgIFxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKClcbiAgICBcbiAgICAgICAgICAgICAgICBibG9ja0lucHV0LmNsYXNzTGlzdC5hZGQoJ2lucHV0LS1mb2N1cycpXG4gICAgICAgICAgICAgICAgYmxvY2tJbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tdmlld2VkJylcbiAgICBcbiAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkNsZWFyaW5nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidG5DbGVhcmluZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgICAgICBpZiAoYnRuQ2xlYXJpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgICBidG5DbGVhcmluZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gJydcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkNsZWFyaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVDbGFzcygpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgaW5wdXRzLmZvckVhY2goZWxJbnB1dCA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dCA9IGVsSW5wdXQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpXG4gICAgICAgICAgICBpZiAoaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBidG5DbGVhcmluZyA9IGVsSW5wdXQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQ9XCJidG4tY2xlYXJpbmdcIl0nKVxuICAgIFxuICAgICAgICAgICAgICAgIGVsSW5wdXQuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWZvY3VzJylcbiAgICAgICAgICAgICAgICBidG5DbGVhcmluZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgKGV2ZW50KSA9PiBsb2dpYyhldmVudCkpXG4gICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIChldmVudCkgPT4gbG9naWMoZXZlbnQpKVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiB0ZXh0YXJlYSgpIHtcbiAgICAgICAgY29uc3QgdGV4dGFyZWFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGV4dGFyZWE9XCJibG9jay10ZXh0YXJlYVwiXScpXG4gICAgXG4gICAgICAgIGlmICghdGV4dGFyZWFzLmxlbmd0aCkgcmV0dXJuXG4gICAgXG4gICAgICAgIGNvbnN0IHJlbW92ZUNsYXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgdGV4dGFyZWFzLmZvckVhY2goZWxUZXh0YXJlYSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dGFyZWEgPSBlbFRleHRhcmVhLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHRhcmVhPVwidGV4dGFyZWFcIl0nKVxuICAgICAgICAgICAgICAgIGVsVGV4dGFyZWEuY2xhc3NMaXN0LnJlbW92ZSgndGV4dGFyZWEtLXZpZXdlZCcpXG4gICAgICAgICAgICAgICAgaWYgKCF0ZXh0YXJlYS52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBlbFRleHRhcmVhLmNsYXNzTGlzdC5yZW1vdmUoJ3RleHRhcmVhLS1mb2N1cycpXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtdGV4dGFyZWE9XCJibG9jay10ZXh0YXJlYVwiXScpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tUZXh0YXJlYSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS10ZXh0YXJlYT1cImJsb2NrLXRleHRhcmVhXCJdJylcbiAgICBcbiAgICAgICAgICAgICAgICByZW1vdmVDbGFzcygpXG4gICAgXG4gICAgICAgICAgICAgICAgYmxvY2tUZXh0YXJlYS5jbGFzc0xpc3QuYWRkKCd0ZXh0YXJlYS0tZm9jdXMnKVxuICAgICAgICAgICAgICAgIGJsb2NrVGV4dGFyZWEuY2xhc3NMaXN0LmFkZCgndGV4dGFyZWEtLXZpZXdlZCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwYWdlKClcbiAgICBmaXhlZEhlYWRlcigpXG4gICAgbWVudSgpXG4gICAgbmF2aWdhdGlvbigpXG4gICAgc21vb3RoU2Nyb2xsaW5nKClcbiAgICByZXZpZXdzKClcbiAgICBpbnB1dCgpXG4gICAgdGV4dGFyZWEoKVxufSJdLCJmaWxlIjoibWFpbi5qcyJ9