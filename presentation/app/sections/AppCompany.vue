<script setup>
    import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue'
    import { useCheckTablet } from '@/composables/checkTablet.js'
    import 'swiper/css'

    const swiperInstance = ref(null),
    { $gsap: gsap } = useNuxtApp(),
    slider = ref(null),
    listCompany = ref(null),
    active = ref(false),
    isTablet = useCheckTablet(),
    company = [
        {
            id: 1,
            name: 'Доктис',
            timeInterval: '2024 - н.в.',
            link: 'https://www.doctis.ru/',
            logo: '/images/company-logos/doctis.svg'
        },
        {
            id: 2,
            name: 'ФАКТ',
            timeInterval: '2024',
            link: 'https://fact.digital/',
            logo: '/images/company-logos/fact.svg'
        },
        {
            id: 3,
            name: 'Kompot',
            timeInterval: '2023 - 2024',
            link: 'https://kompot.bz/',
            logo: '/images/company-logos/kompot.svg'
        },
        {
            id: 4,
            name: 'Russian Robiticts',
            timeInterval: '2023',
            link: 'https://rusrobots.ru/',
            logo: '/images/company-logos/russian-robotics.svg'
        },
        {
            id: 5,
            name: 'Affetta',
            timeInterval: '2022 - 2023',
            link: 'https://affetta.ru/',
            logo: '/images/company-logos/affetta.svg'
        },
        {
            id: 6,
            name: 'It-format',
            timeInterval: '2021 - 2022',
            link: 'https://it-format.site/',
            logo: '/images/company-logos/it-format.svg'
        }
    ],
    showSlider = () => active.value = true,
    hideSlider = () => active.value = false

    function onSwiper(swiper) {
        swiperInstance.value = swiper
    }

    function getCompany(company) {
        swiperInstance.value.slideTo(company.id - 1, 600, true)
    }

    function animation() {
        const scaleAnim = gsap.timeline({paused: true}),
        targets = ['.company__list']

        document.addEventListener('mousemove', mouseMove)

        const xDTo = gsap.quickTo(slider.value.$el, 'left', {
            duration: 0.6,
            ease: 'power3'
        })

        const yDTo = gsap.quickTo(slider.value.$el, 'top', {
            duration: 0.6,
            ease: 'power3'
        })

        function mouseMove(event) {

            const sliderPosition = {
                left: event.pageX,
                top: event.pageY
            }
            
            if (sliderPosition.left + 260 < window.innerWidth) xDTo(sliderPosition.left)
            yDTo(sliderPosition.top)
        }

        function processingTargets(targets, anim) {

            if (!targets.length) return

            targets.forEach(target => {
                const elems = document.querySelectorAll(target)

                if (elems.length) {
                    elems.forEach(elem => {
                        elem.addEventListener('mouseenter', () => {
                            showSlider()
                            anim.play()
                        })

                        elem.addEventListener('mouseleave', () => {
                            hideSlider()
                            anim.reverse()
                        })
                    })
                }
            })
        }

        scaleAnim
        .to(
            slider.value.$el,
            {
                scale: 1,
                duration: 0.35
            },
            0
        )

        processingTargets(targets, scaleAnim)
    }

    onMounted(() => {
        if (!isTablet.value) {
            animation()
        }
    })
</script>

<template>
    <section class="company section">
        <div class="container">
            <app-title type="h2" modifiers="title--h6">Опыт в компаниях</app-title>
            <ul class="company__list list-reset" ref="listCompany">
                <li 
                    v-for="itemCompany in company" 
                    :key="itemCompany.id"
                >
                    <a 
                        @mouseenter="getCompany(itemCompany)"
                        :href="itemCompany.link" 
                        target="_blank"
                    >
                        <span class="company__name">{{ itemCompany.name }}</span>
                        <span class="company__time-interval">{{ itemCompany.timeInterval }}</span>
                    </a>
                </li>
            </ul>
            <swiper 
                @swiper="onSwiper"
                class="company__slider"
                :direction="'vertical'"
                :class="{ 'active': active }"
                ref="slider"
            >
                <swiper-slide v-for="itemCompany in company" :key="itemCompany.id">
                    <nuxt-img 
                        class="company__slide-image"
                        :src="itemCompany.logo"
                    />
                </swiper-slide>
            </swiper>
        </div>
    </section>
</template>

<style lang="scss">
    .company {

        .container {
            display: grid;
            grid-template-columns: clamp(180px, vw(180), vw(180)) minmax(vw(500), vw(1070));
            justify-content: space-between;
            align-items: start;
            grid-column-gap: clamp(50px, vw(50), vw(50));
        }

        &__slider {
            position: absolute;
            top: 0;
            left: 0;
            width: vw(200);
            height: vw(200);
            opacity: 0;
            pointer-events: none;
            background-color: $color-base-bg-s;
            border-radius: clamp(20px, vw(24), vw(24));
            transform: scale(0);
            transition: opacity $tr-time-p;

            &.active {
                opacity: 1;
            }
        }

        &__list {

            li {

                a {
                    display: grid;
                    grid-template-columns: 1fr max-content;
                    justify-content: space-between;
                    grid-column-gap: clamp(20px, vw(20), vw(20));
                }

                &:not(:first-child) a {
                    border-top: 1px solid $color-base-border-s;
                    padding-top: clamp(18px, vw(28), vw(28));
                }

                &:not(:last-child) a {
                    padding-bottom: clamp(18px, vw(28), vw(28));
                }
            }
        }

        &__name,
        &__time-interval {
            font-size: clamp(16px, vw(24), vw(24));
            line-height: 1.5em;
            transition: transform $tr-time-p, opacity $tr-time-p;
        }

        &__slide-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }

    @media (hover: hover) {
        .company {

            &__list {

                li {

                    a {
                        &:hover {

                            .company {

                                &__name,
                                &__time-interval {
                                    opacity: 0.6;
                                }

                                &__name {
                                    transform: translateX(10px);
                                }

                                &__time-interval {
                                    transform: translateX(-10px);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 767px) {
        .company {

            &__list {

                li {

                    a {
                        grid-template-columns: 1fr;
                        grid-row-gap: 16px;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 680px) {
        .company {

            .container {
                grid-template-columns: 1fr;
                grid-row-gap: 34px;
            }
        }
    }
</style>