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