import './main.scss'
import Slider from './scripts/slider'

window.onload = loaded()

function loaded() {
    const slider = document.querySelector('.slider')

    if (window.matchMedia('(min-width: 767px)').matches) {
        new Slider(slider, {
            coutShowSlide: 4,
            countFlipSlide: 1,
            indentBetweenSlides: 40,
            autoFlip: true,
            timeAutoFlip: 4000
        })
    }
    
    if (window.matchMedia('(max-width: 767px)').matches) {
        new Slider(slider, {
            coutShowSlide: 2,
            countFlipSlide: 1,
            indentBetweenSlides: 40,
            autoFlip: true,
            timeAutoFlip: 4000
        })
    }
    
    if (window.matchMedia('(max-width: 421px)').matches) {
        new Slider(slider, {
            coutShowSlide: 1,
            countFlipSlide: 1,
            indentBetweenSlides: 20,
            autoFlip: true,
            timeAutoFlip: 4000
        })
    }
}