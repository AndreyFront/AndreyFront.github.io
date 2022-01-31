// My lib
export default class Slider {
    constructor(slider, options = {}) {
        this.settings = {
            coutShowSlide: options.coutShowSlide || 0,
            countFlipSlide: options.countFlipSlide || 0,
            indentBetweenSlides: options.indentBetweenSlides || 0,
            autoFlip: options.autoFlip || false,
            timeAutoFlip: options.timeAutoFlip || 0
        }

        this.slider = slider
        this.sliderLine = this.slider.querySelector('.slider__line')
        this.sliderSlides = this.slider.querySelectorAll('.slider__slide')
        this.sliderBtnPrev = this.slider.querySelector('.slider__btn--prev') || false
        this.sliderBtnNext = this.slider.querySelector('.slider__btn--next') || false
        this.sliderTimeLine = this.slider.querySelector('.slider__time-line') || false
        this.sliderWrapperLine = this.slider.querySelector('.slider__wrapper-line') || false

        this.init = this.init.bind(this)
        this.setEvents = this.setEvents.bind(this)
        this.resizeSlider = this.resizeSlider.bind(this)
        this.setPosition = this.setPosition.bind(this)
        this.movePrev = this.movePrev.bind(this)
        this.moveNext = this.moveNext.bind(this)
        this.swipeStart = this.swipeStart.bind(this)
        this.swipeEnd = this.swipeEnd.bind(this)
        this.motionСheck = this.motionСheck.bind(this)
        this.autoFlip = this.autoFlip.bind(this)
        
        this.init()
        this.setEvents()
        if (this.settings.autoFlip) this.autoFlip()
    }

    init() {
        const slider = this.slider.getBoundingClientRect()
        console.log(slider)
        this.widthBetween = this.settings.indentBetweenSlides / this.settings.coutShowSlide
        this.width = slider.width
        this.valueMove = 0
        this.autoStart = true
        this.widthSlide = this.width / this.settings.coutShowSlide + this.widthBetween - this.settings.indentBetweenSlides
        this.sliderSlides.forEach((slide, index) => {
            slide.style.width = `${this.widthSlide}px`
            if (index !== this.sliderSlides.length - 1) slide.style.marginRight = `${this.settings.indentBetweenSlides}px`
        })
    }

    setEvents() {
        this.debounceResizeSlider = debounce(this.resizeSlider, 100)
        window.addEventListener('resize', this.debounceResizeSlider)

        this.sliderLine.addEventListener('pointerdown', (evt) => {
            this.swipeStart(evt)
            if (this.settings.autoFlip) this.autoFlip(evt)
        })

        if (this.sliderBtnPrev) {
            this.sliderBtnPrev.addEventListener('pointerdown', (evt) => {
                if (this.settings.autoFlip) this.autoFlip(evt)
                this.movePrev(evt)
            })
        }

        if (this.sliderBtnNext) {
            this.sliderBtnNext.addEventListener('pointerdown', (evt) => {
                if (this.settings.autoFlip) this.autoFlip(evt)
                this.moveNext(evt)
            })
        }
    }

    destroyEvents() {
        window.removeEventListener('resize', this.debounceResizeSlider)
        this.sliderLine.removeEventListener('pointerdown', (evt) => {
            this.swipeStart(evt)
            if (this.settings.autoFlip) this.autoFlip(evt)
        })
        this.sliderBtnPrev.removeEventListener('pointerdown', (evt) => {
            if (this.settings.autoFlip) this.autoFlip(evt)
            this.movePrev(evt)
        })
        this.sliderBtnNext.removeEventListener('pointerdown', (evt) => {
            if (this.settings.autoFlip) this.autoFlip(evt)
            this.moveNext(evt)
        })
    }

    resizeSlider() {
        this.init()
    }

    setPosition(position) {
        this.valueMove = position
        this.sliderLine.style.transform = `translate3d(${position}px, 0, 0)`
    }

    movePrev() {
        this.valueMove = this.valueMove + (this.widthSlide + this.settings.indentBetweenSlides) * this.settings.countFlipSlide
        const valueMove = this.motionСheck(this.valueMove)
        this.setPosition(valueMove.valueMove)
    }

    moveNext() {
        this.valueMove = this.valueMove - (this.widthSlide + this.settings.indentBetweenSlides) * this.settings.countFlipSlide
        const valueMove = this.motionСheck(this.valueMove)
        this.setPosition(valueMove.valueMove)
    }

    swipeStart(evt) {
        this.swipeStartX = evt.clientX
        window.addEventListener('pointermove', this.swipeEnd)
    }

    swipeEnd(evt) {
        this.swipeEndX = evt.clientX
        const swipeValue = this.swipeStartX - this.swipeEndX
        
        if (swipeValue > 0) this.moveNext()

        if (swipeValue < 0) this.movePrev()

        window.removeEventListener('pointermove', this.swipeEnd)
    }

    motionСheck(valueMove = 0) {
        const leftEdge = 0
        const rightEdge = -(this.sliderSlides.length - this.settings.coutShowSlide) * (this.widthSlide + this.settings.indentBetweenSlides)
        if (valueMove <= leftEdge && valueMove >= rightEdge) {
            // unlocking prev button and next button
            return {
                valueMove: valueMove
            }
        }

        if (valueMove >= leftEdge) {
            // Block prev button
            return {
                valueMove: rightEdge
            }
        }

        if (valueMove <= rightEdge) {
            // Block next button
            return {
                valueMove: leftEdge
            }
        }
    }

    autoFlip(slider) {
        if (!slider) {
            this.auto = setInterval(() => {
                this.moveNext()
                if (this.sliderTimeLine) {
                    this.sliderTimeLine.animate([
                        { width: '0' },
                        { width: '100%' }
                        ], {
                        duration: this.settings.timeAutoFlip,
                    })
                }
            }, this.settings.timeAutoFlip)
        } else {
            clearInterval(this.auto)
            if (this.autoStart) {
                this.autoStart = false
                if (this.sliderTimeLine) {
                    this.sliderTimeLine.animate([
                        { width: '100%' },
                        { width: '0' }
                        ], {
                        duration: 9000
                    })
                }
                setTimeout(() => {
                    this.autoStart = true
                    if (this.settings.autoFlip) this.autoFlip()
                }, 5000);
            }
        }
    }
}

// Helpers

const debounce = (fn, ms) => {
    let timeout;
    return function () {
      const fnCall = () => { fn.apply(this, arguments) }
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    };
}