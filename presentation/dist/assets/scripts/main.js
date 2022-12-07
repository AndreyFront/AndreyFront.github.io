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
    
        anchors.forEach(anchor => {
            anchor.addEventListener('click', (event) => {
                event.preventDefault()
                
                const blockID = anchor.getAttribute('data-smooth-scrolling').substr(1)
                
                document.querySelector(`[data-smooth-scrolling="${blockID}"]`).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            })
        })
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
    smoothScrolling()
    reviews()
    input()
    textarea()
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgZnVuY3Rpb24gcGFnZSgpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBhZ2U9XCJtYWluXCJdJylcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWFpblwiXScpXG4gICAgXG4gICAgICAgIGlmICghbWFpbiAmJiAhaGVhZGVyICkgcmV0dXJuXG4gICAgXG4gICAgICAgIG1haW4uc3R5bGUucGFkZGluZ1RvcCA9IGAke2hlYWRlci5vZmZzZXRIZWlnaHR9cHhgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZml4ZWRIZWFkZXIoKSB7ICAgICBcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWFpblwiXScpXG4gICAgXG4gICAgICAgIGlmICghaGVhZGVyKSByZXR1cm5cbiAgICBcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxlZCA+PSAyMCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxpbmcoKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbW9vdGgtc2Nyb2xsaW5nKj1cIiNcIl0nKVxuICAgIFxuICAgICAgICBpZiAoIWFuY2hvcnMubGVuZ3RoKSByZXR1cm5cbiAgICBcbiAgICAgICAgYW5jaG9ycy5mb3JFYWNoKGFuY2hvciA9PiB7XG4gICAgICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tJRCA9IGFuY2hvci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc21vb3RoLXNjcm9sbGluZycpLnN1YnN0cigxKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNtb290aC1zY3JvbGxpbmc9XCIke2Jsb2NrSUR9XCJdYCkuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmV2aWV3cygpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJtYWluXCJdJylcblxuICAgICAgICBpZiAoIW1haW4pIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiYnRuLXByZXZcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5OiB7XG4gICAgICAgICAgICAgIGRlbGF5OiA1MDAwLFxuICAgICAgICAgICAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlZmZlY3Q6IFwiZmFkZVwiLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlucHV0KCkge1xuICAgICAgICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1pbnB1dD1cImJsb2NrLWlucHV0XCJdJylcbiAgICBcbiAgICAgICAgaWYgKCFpbnB1dHMubGVuZ3RoKSByZXR1cm5cbiAgICBcbiAgICAgICAgY29uc3QgcmVtb3ZlQ2xhc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICBpbnB1dHMuZm9yRWFjaChlbElucHV0ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnB1dCA9IGVsSW5wdXQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5wdXQ9XCJpbnB1dFwiXScpXG4gICAgICAgICAgICAgICAgY29uc3QgYnRuQ2xlYXJpbmcgPSBlbElucHV0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlucHV0PVwiYnRuLWNsZWFyaW5nXCJdJylcbiAgICAgICAgICAgICAgICBlbElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LS12aWV3ZWQnKVxuICAgICAgICAgICAgICAgIGlmICghaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZWxJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdpbnB1dC0tZm9jdXMnKVxuICAgICAgICAgICAgICAgICAgICBidG5DbGVhcmluZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsSW5wdXQuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWZvY3VzJylcbiAgICAgICAgICAgICAgICAgICAgYnRuQ2xlYXJpbmcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGNvbnN0IGxvZ2ljID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWlucHV0PVwiYmxvY2staW5wdXRcIl0nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrSW5wdXQgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtaW5wdXQ9XCJibG9jay1pbnB1dFwiXScpXG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSBibG9ja0lucHV0LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWlucHV0PVwiaW5wdXRcIl0nKVxuICAgICAgICAgICAgICAgIGNvbnN0IGJ0bkNsZWFyaW5nID0gYmxvY2tJbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImJ0bi1jbGVhcmluZ1wiXScpXG4gICAgXG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoKVxuICAgIFxuICAgICAgICAgICAgICAgIGJsb2NrSW5wdXQuY2xhc3NMaXN0LmFkZCgnaW5wdXQtLWZvY3VzJylcbiAgICAgICAgICAgICAgICBibG9ja0lucHV0LmNsYXNzTGlzdC5hZGQoJ2lucHV0LS12aWV3ZWQnKVxuICAgIFxuICAgICAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlXG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnRuQ2xlYXJpbmcuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bkNsZWFyaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgICAgIGlmIChidG5DbGVhcmluZy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ0bkNsZWFyaW5nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgYnRuQ2xlYXJpbmcuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIFxuICAgICAgICBpbnB1dHMuZm9yRWFjaChlbElucHV0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZWxJbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImlucHV0XCJdJylcbiAgICAgICAgICAgIGlmIChpbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJ0bkNsZWFyaW5nID0gZWxJbnB1dC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1pbnB1dD1cImJ0bi1jbGVhcmluZ1wiXScpXG4gICAgXG4gICAgICAgICAgICAgICAgZWxJbnB1dC5jbGFzc0xpc3QuYWRkKCdpbnB1dC0tZm9jdXMnKVxuICAgICAgICAgICAgICAgIGJ0bkNsZWFyaW5nLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzaW4nLCAoZXZlbnQpID0+IGxvZ2ljKGV2ZW50KSlcbiAgICBcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgKGV2ZW50KSA9PiBsb2dpYyhldmVudCkpXG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIHRleHRhcmVhKCkge1xuICAgICAgICBjb25zdCB0ZXh0YXJlYXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10ZXh0YXJlYT1cImJsb2NrLXRleHRhcmVhXCJdJylcbiAgICBcbiAgICAgICAgaWYgKCF0ZXh0YXJlYXMubGVuZ3RoKSByZXR1cm5cbiAgICBcbiAgICAgICAgY29uc3QgcmVtb3ZlQ2xhc3MgPSAoKSA9PiB7XG4gICAgICAgICAgICB0ZXh0YXJlYXMuZm9yRWFjaChlbFRleHRhcmVhID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0YXJlYSA9IGVsVGV4dGFyZWEucXVlcnlTZWxlY3RvcignW2RhdGEtdGV4dGFyZWE9XCJ0ZXh0YXJlYVwiXScpXG4gICAgICAgICAgICAgICAgZWxUZXh0YXJlYS5jbGFzc0xpc3QucmVtb3ZlKCd0ZXh0YXJlYS0tdmlld2VkJylcbiAgICAgICAgICAgICAgICBpZiAoIXRleHRhcmVhLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsVGV4dGFyZWEuY2xhc3NMaXN0LnJlbW92ZSgndGV4dGFyZWEtLWZvY3VzJylcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS10ZXh0YXJlYT1cImJsb2NrLXRleHRhcmVhXCJdJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibG9ja1RleHRhcmVhID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXRleHRhcmVhPVwiYmxvY2stdGV4dGFyZWFcIl0nKVxuICAgIFxuICAgICAgICAgICAgICAgIHJlbW92ZUNsYXNzKClcbiAgICBcbiAgICAgICAgICAgICAgICBibG9ja1RleHRhcmVhLmNsYXNzTGlzdC5hZGQoJ3RleHRhcmVhLS1mb2N1cycpXG4gICAgICAgICAgICAgICAgYmxvY2tUZXh0YXJlYS5jbGFzc0xpc3QuYWRkKCd0ZXh0YXJlYS0tdmlld2VkJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHBhZ2UoKVxuICAgIGZpeGVkSGVhZGVyKClcbiAgICBzbW9vdGhTY3JvbGxpbmcoKVxuICAgIHJldmlld3MoKVxuICAgIGlucHV0KClcbiAgICB0ZXh0YXJlYSgpXG59Il0sImZpbGUiOiJtYWluLmpzIn0=