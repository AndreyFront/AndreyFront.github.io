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
            effect: "fade",
            navigation: {
                nextEl: btnNext,
                prevEl: btnPrev,
            },
        })
    }

    page()
    fixedHeader()
    smoothScrolling()
    reviews()
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgZnVuY3Rpb24gcGFnZSgpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBhZ2U9XCJtYWluXCJdJylcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWFpblwiXScpXG4gICAgXG4gICAgICAgIGlmICghbWFpbiAmJiAhaGVhZGVyICkgcmV0dXJuXG4gICAgXG4gICAgICAgIG1haW4uc3R5bGUucGFkZGluZ1RvcCA9IGAke2hlYWRlci5vZmZzZXRIZWlnaHR9cHhgXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZml4ZWRIZWFkZXIoKSB7ICAgICBcbiAgICAgICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaGVhZGVyPVwibWFpblwiXScpXG4gICAgXG4gICAgICAgIGlmICghaGVhZGVyKSByZXR1cm5cbiAgICBcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogOTkycHgpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldCA/IHdpbmRvdy5wYWdlWU9mZnNldCA6IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuICAgIFxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxlZCA+PSAyMCkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbC1hY3RpdmUnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzbW9vdGhTY3JvbGxpbmcoKSB7XG4gICAgICAgIGNvbnN0IGFuY2hvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zbW9vdGgtc2Nyb2xsaW5nKj1cIiNcIl0nKVxuICAgIFxuICAgICAgICBpZiAoIWFuY2hvcnMubGVuZ3RoKSByZXR1cm5cbiAgICBcbiAgICAgICAgYW5jaG9ycy5mb3JFYWNoKGFuY2hvciA9PiB7XG4gICAgICAgICAgICBhbmNob3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tJRCA9IGFuY2hvci5nZXRBdHRyaWJ1dGUoJ2RhdGEtc21vb3RoLXNjcm9sbGluZycpLnN1YnN0cigxKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNtb290aC1zY3JvbGxpbmc9XCIke2Jsb2NrSUR9XCJdYCkuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmV2aWV3cygpIHtcbiAgICAgICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJldmlld3M9XCJtYWluXCJdJylcblxuICAgICAgICBpZiAoIW1haW4pIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHNsaWRlciA9IG1haW4ucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cInNsaWRlclwiXScpXG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBzbGlkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtcmV2aWV3cz1cImJ0bi1uZXh0XCJdJylcbiAgICAgICAgY29uc3QgYnRuUHJldiA9IHNsaWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXZpZXdzPVwiYnRuLXByZXZcIl0nKVxuXG4gICAgICAgIGNvbnN0IHN3aXBlciA9IG5ldyBTd2lwZXIoc2xpZGVyLCB7XG4gICAgICAgICAgICBlZmZlY3Q6IFwiZmFkZVwiLFxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgICAgICAgIG5leHRFbDogYnRuTmV4dCxcbiAgICAgICAgICAgICAgICBwcmV2RWw6IGJ0blByZXYsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHBhZ2UoKVxuICAgIGZpeGVkSGVhZGVyKClcbiAgICBzbW9vdGhTY3JvbGxpbmcoKVxuICAgIHJldmlld3MoKVxufSJdLCJmaWxlIjoibWFpbi5qcyJ9