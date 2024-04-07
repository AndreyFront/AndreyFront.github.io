<script setup>
    import { ref, reactive, onMounted, onUnmounted } from 'vue'
    import { useCheckTablet } from '@/composables/checkTablet.js'

    const blockTitle = ref(null),
    { $gsap: gsap } = useNuxtApp(),
    decore = ref(null),
    active = ref(false),
    isTablet = useCheckTablet(),
    technologies = reactive([
        'Vue, Nuxt',
        'Git, Docker',
        'Webpack, Vite, Gulp',
        'Pug, Scss',
        'БЭМ'
    ]),
    showDecore = () => active.value = true,
    hideDecore = () => active.value = false

    function animation() {
        const scaleAnim = gsap.timeline({paused: true}),
        targets = ['.about .title']

        document.addEventListener('mousemove', mouseMove)

        const xDTo = gsap.quickTo(decore.value.$el, 'left', {
            duration: 0.6,
            ease: 'power3'
        })

        const yDTo = gsap.quickTo(decore.value.$el, 'top', {
            duration: 0.6,
            ease: 'power3'
        })

        function mouseMove(event) {

            const decorePosition = {
                left: event.pageX,
                top: event.pageY
            }

            if (decorePosition.left + 200 < window.innerWidth) xDTo(decorePosition.left)
            yDTo(decorePosition.top)
        }

        function processingTargets(targets, anim) {

            if (!targets.length) return

            targets.forEach(target => {
                const elems = document.querySelectorAll(target)

                if (elems.length) {
                    elems.forEach(elem => {
                        elem.addEventListener('mouseenter', () => {
                            showDecore()
                            anim.play()
                        })

                        elem.addEventListener('mouseleave', () => {
                            hideDecore()
                            anim.reverse()
                        })
                    })
                }
            })
        }

        scaleAnim
        .to(
            decore.value.$el,
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
    <section class="about section" id="about">
        <div class="container">
            <div class="about__block-technologies">
                <span class="about__title-technologies">Некоторые технологии:</span>
                <ul class="about__list-technologies list-reset">
                    <li
                        v-for="(technology, index) in technologies"
                        :key="index"
                    >{{ technology }}</li>
                </ul>
            </div>
            <div class="about__block-info">
                <div class="about__block-title" ref="blockTitle">
                    <app-title type="h2" modifiers="title--h2">Привет! Я Андрей создаю веб-приложения, которые улучшают присутствие компаний в&nbsp;интернете</app-title>
                    <nuxt-img 
                        class="about__decore" 
                        :class="{ 'active': active }"
                        src="/decore/cat-laptop.gif"
                        ref="decore"
                    />
                </div>
                <div class="about__desc">
                    <p>Мне всегда хотелось создавать что-то новое, получать уникальный опыт. Занятие веб-разработкой многое для меня изменило, и с тех пор я стараюсь вывести свою работу на новый уровень с каждым проектом, всегда ставя качество на первое место.</p>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    .about {

        .container {
            display: grid;
            grid-template-columns: clamp(180px, vw(180), vw(180)) minmax(vw(500), vw(1070));
            justify-content: space-between;
            align-items: start;
            grid-column-gap: clamp(50px, vw(50), vw(50));
        }

        .title {
            position: relative;
            z-index: 1;
        }

        &__block-technologies {
            display: grid;
            grid-row-gap: clamp(16px, vw(16), vw(16));
        }

        &__title-technologies {
            font-size: clamp(14px, vw(14), vw(14));
            color: $color-text-q;
        }

        &__list-technologies {
            display: grid;

            li {
                font-size: clamp(14px, vw(14), vw(14));
                line-height: 1.5em;
            }
        }

        &__block-info {
            display: grid;
            grid-row-gap: clamp(24px, vw(40), vw(40));
        }

        &__desc {
            position: relative;
            display: grid;
            grid-row-gap: clamp(5px, vw(10), vw(10));
            max-width: vw(600);

            p {
                margin: 0;
                font-size: clamp(16px, vw(16), vw(16));
                line-height: 1.5;
            }
        }

        &__block-title {}

        &__decore {
            position: absolute;
            top: 0;
            left: 0;
            width: vw(133);
            height: vw(133);
            border-radius: vw(100);
            opacity: 0;
            pointer-events: none;
            transform: scale(0);
            transition: opacity $tr-time-p;

            &.active {
                opacity: 1;
            }
        }
    }

    @media screen and (max-width: 767px) {
        .about {

            &__desc {
                max-width: 100%;
            }
        }
    }

    @media screen and (max-width: 680px) {
        .about {

            .container {
                grid-template-columns: 1fr;
                grid-row-gap: 48px;
            }

            &__block-info {
                grid-row: 1/2;
            }
        }
    }
</style>