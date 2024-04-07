<script setup>
    import { onMounted, ref } from 'vue'
    import { useCheckTablet } from '@/composables/checkTablet.js'

    const { $gsap: gsap } = useNuxtApp(),
    cursor = ref(null),
    heightPage = ref(0),
    isTablet = useCheckTablet()

    function getHeightPage() {
        const body = document.body,
        html = document.documentElement

        heightPage.value = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight)
    }

    function animation() {
        const scaleAnim = gsap.timeline({paused: true}),
        themeAnim = gsap.timeline({paused: true}),
        hideAnim = gsap.timeline({paused: true}),
        targets = ['[data-hover]'],
        targetsWhiteCursor = ['.footer', '.project-card'],
        targetsHideCursor = ['.header__nav a', '.about .title', '.company__list a']

        document.addEventListener('mousemove', mouseMove)

        const xDTo = gsap.quickTo(cursor.value, 'left', {
            duration: 0.6,
            ease: 'power3'
        })

        const yDTo = gsap.quickTo(cursor.value, 'top', {
            duration: 0.6,
            ease: 'power3'
        })

        function mouseMove(event) {

            const cursorPosition = {
                left: event.pageX,
                top: event.pageY
            }

            if (cursorPosition.left + 25 < window.innerWidth) xDTo(cursorPosition.left)
            if (cursorPosition.top + 10 < heightPage.value) yDTo(cursorPosition.top)
        }

        function processingTargets(targets, anim) {

            if (!targets.length) return

            targets.forEach(target => {
                const elems = document.querySelectorAll(target)

                if (elems.length) {
                    elems.forEach(elem => {
                        elem.addEventListener('mouseenter', () => {
                            anim.play()
                        })

                        elem.addEventListener('mouseleave', () => {
                            anim.reverse()
                        })
                    })
                }
            })
        }

        scaleAnim
        .to(
            cursor.value,
            {
                scale: 3,
                opacity: 0.4,
                duration: 0.35
            },
            0
        )

        themeAnim
        .to(
            cursor.value,
            {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                duration: 0.35
            },
            0
        )

        hideAnim
        .to(
            cursor.value,
            {
                scale: 0,
                duration: 0.35
            },
            0
        )

        processingTargets(targets, scaleAnim)
        processingTargets(targetsWhiteCursor, themeAnim)
        processingTargets(targetsHideCursor, hideAnim)
    }

    onMounted(() => {
        if (!isTablet.value) {
            getHeightPage()
            animation()
        }
    })
</script>

<template>
    <div class="cursor" :style="{ display: isTablet ? 'none' : 'block' }" ref="cursor">
        <!-- <span class="cursor__name">Открыть</span> -->
    </div>
</template>

<style lang="scss">
    .cursor {
        position: absolute;
        z-index: 11;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
        border-radius: 100px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        background-color: $color-base-bg-s;
        backdrop-filter: blur(5px);

        &__name {
            font-size: 18px;
            text-transform: uppercase;
        }
    }
</style>