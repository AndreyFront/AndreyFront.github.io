<script setup>
    import { onMounted, onUnmounted, reactive, ref } from 'vue'
    import { useCheckTablet } from '@/composables/checkTablet.js'

    const route = useRoute()

    const dataNav = [
        {
            name: 'Привет :)',
            link: {
                path: '/',
                hash: '#welcome'
            }
        },
        {
            name: 'Проекты',
            link: {
                path: '/',
                hash: '#projects'
            }
        },
        {
            name: 'Обо мне',
            link: {
                path: '/',
                hash: '#about'
            }
        },
        {
            name: 'Контакты',
            link: {
                path: '/',
                hash: '#contacts'
            }
        }
    ],
    activeLink = ref(0),
    isFixed = ref(false),
    navActive = ref(false),
    time = ref('00:00'),
    nav = ref(null),
    links = ref(null),
    activeMenu = ref(false),
    isTablet = useCheckTablet(),
    position = reactive({
        x: 0,
        width: 0,
        opacity: 0
    })

    function changeMenu() {
        activeMenu.value = !activeMenu.value
        navActive.value = activeMenu.value
    }

    function setCoords(el) {
        if (el) {
            const coords = el.getBoundingClientRect()
            position.x = el.offsetLeft
            position.width = coords.width
            position.opacity = '1'
        }
    }

    function getPosition(event) {
        const link = event.target.closest('a')

        setCoords(link)
    }

    function setPositionActive() {
        if (links.value.length) {
            links.value.forEach((link, index) => {
                if (index === activeLink.value) {
                    setCoords(link.$el)
                    position.opacity = '0'
                }
            })
        }
    }

    function getTime() {
        const moskowUtc = 3

        let localTime = new Date(),
        myTime = localTime.getUTCHours() + moskowUtc

        time.value = (myTime > 24 ? "0" : "") + (myTime > 24 ? myTime - 24 : myTime) + ":" + (localTime.getMinutes() < 10 ? '0' : '') + localTime.getMinutes()
    }

    function toggle() {
        if (window.pageYOffset > 200) {
            isFixed.value = true
        } else {
            isFixed.value = false
        }
    }

    function getActiveLink() {
        if (route.hash) {
            dataNav.forEach((link, index) => {
                if (link.link.hash === route.hash) activeLink.value = index
            })
        }
    }

    function setNavigation() {
        const scrollDistance = window.scrollY,
        sections = document.querySelectorAll('section[id]')

        sections.forEach((section, index) => {
            if (section.offsetTop - nav.value.clientHeight <= scrollDistance) {
                activeLink.value = index
                setPositionActive()
            }

            if ((window.innerHeight + window.pageYOffset + 200) >= document.body.offsetHeight) {
                activeLink.value = sections.length
                setPositionActive()
            }
        })
    }

    function anchor(event) {
        const target = event.target

        if (target.closest('[data-anchor]')) {
            const anchor = target.getAttribute('data-anchor'),
            section = document.querySelector(anchor)

            if (section) {
                const coords = section.getBoundingClientRect()

                let distance = 0,
                offset = 0

                if (isTablet.value) {
                    if (anchor === '#projects') offset = 100
                    if (anchor === '#about') offset = 20
                }

                distance = coords.top + window.pageYOffset - offset

                window.scrollTo({
                    top: distance,
                    left: 0,
                    behavior: 'smooth'
                })
            }
        }
    }

    function setActiveLink(index) {
        activeLink.value = index
        position.opacity = '0'

        if (isTablet.value) {
            changeMenu()
        }
    }

    onMounted(() => {
        if (!isTablet.value) {
            nav.value.addEventListener('mousemove', getPosition)
            nav.value.addEventListener('mouseleave', setPositionActive)
            window.addEventListener('scroll', setNavigation)

            getTime()
            toggle()
            getActiveLink()
            setPositionActive()

            setInterval(() => {
                getTime()
            }, 5000)

            setTimeout(() => {
                navActive.value = true
            }, 500)
            
            window.addEventListener('scroll', toggle)
        }

        document.addEventListener('click', anchor)
    })

    onUnmounted(() => {
        if (!isTablet.value) {
            nav.value.removeEventListener('mousemove', getPosition)
            nav.value.removeEventListener('mouseleave', setPositionActive)
            window.removeEventListener('scroll', setNavigation)
        }

        document.removeEventListener('click', anchor)
    })
</script>

<template>
    <header class="header" :class="{ 'header--fixed': isFixed }">
        <div class="container">
            <div class="header__block-about">
                <span class="header__name">Andrey Sevostyanov</span>
                <span class="header__activity">Front-end developer</span>
            </div>
            <nav class="header__nav" :class="{ 'active': navActive }" ref="nav">
                <div 
                    class="header__nav-decore" 
                    :style="{
                        opacity: position.opacity, 
                        transform: `translateX(${position.x}px)`, 
                        width: `${position.width}px` 
                    }"></div>
                <ul class="list-reset">
                    <li 
                        v-for="(link, index) in dataNav"
                        :key="index"
                    >
                        <nuxt-link
                            @click="setActiveLink(index)"
                            :to="{ path: link.link.path }"
                            :class="{ 'active': index === activeLink }"
                            ref="links"
                            :data-anchor="link.link.hash"
                        >{{ link.name }}</nuxt-link>
                    </li>
                </ul>
            </nav>
            <div class="header__block-location">
                <span class="header__location">Краснодар</span>
                <span class="header__time">{{ time }}</span>
            </div>
            <button 
                class="header__btn-menu" 
                :class="{ 'active': activeMenu }" 
                type="button"
                @click="changeMenu"
            >
                <span></span>
                <span></span>
            </button>
        </div>
    </header>
</template>

<style lang="scss">
    .header {
        position: fixed;
        z-index: 10;
        top:0;
        left: 0;
        width: 100vw;
        padding: clamp(24px, vw(24), vw(24)) 0;

        &--fixed {
            pointer-events: none;

            .header {

                &__block-about,
                &__block-location {
                    opacity: 0;
                    pointer-events: none;
                }

                &__nav {
                    pointer-events: auto;
                }
            }
        }

        .container {
            display: grid;
            grid-auto-flow: column;
            justify-content: space-between;
            align-items: center;
        }

        &__btn-menu {
            display: none;
            align-content: center;
            width: 48px;
            height: 48px;
            padding: 0;
            background: none;
            border: none;

            &.active {

                span {

                    &:first-child {
                        transform: rotate(-45deg);
                    }

                    &:last-child {
                        transform: rotate(45deg);
                    }
                }
            }

            span {
                height: 1px;
                background-color: $color-base-bg-s;
                transition: transform $tr-time-p;

                &:last-child {
                    margin-top: -1px;
                }
            }
        }

        &__block-about {
            display: grid;
            grid-row-gap: clamp(2px, vw(2), vw(2));
            transition: opacity $tr-time-p;
        }

        &__name {
            font-weight: 600;
        }

        &__activity {
            font-size: clamp(10px, vw(14), vw(14));
            color: $color-text-s;
        }

        &__nav {
            position: relative;
            overflow: hidden;
            border-radius: 50em;
            transform: translateY(-160%);
            transition: transform $tr-time-p;

            &.active {
                transform: translateY(0);
            }

            ul {
                display: grid;
                grid-auto-flow: column;
                justify-content: center;
                padding: clamp(4px, vw(4), vw(4));
                backdrop-filter: blur(12px);
                background-color: rgba(255, 255, 255, .5);
                border-radius: 50em;
            }

            a {
                display: grid;
                align-content: center;
                justify-content: center;
                padding: 0 clamp(16px, vw(16), vw(16));
                height: clamp(36px, vw(36), vw(36));
                font-size: clamp(14px, vw(14), vw(14));
                border-radius: 50em;
                transition: color $tr-time-p, background-color $tr-time-p;

                &.active {
                    color: $color-text-t;
                    background-color: $color-base-bg-nav;
                }
            }
        }

        &__nav-decore {
            position: absolute;
            z-index: 1;
            top: clamp(4px, vw(4), vw(4));
            left: 0;
            width: 0;
            height: clamp(36px, vw(36), vw(36));
            border-radius: 50em;
            background-color: $color-base-decore-nav;
            opacity: 0;
            pointer-events: none;
            transition: width $tr-time-p, transform $tr-time-p, opacity $tr-time-p;
        }

        &__block-location {
            display: grid;
            grid-auto-flow: column;
            align-content: center;
            justify-content: end;
            grid-column-gap: clamp(4px, vw(4), vw(4)); 
            transition: opacity $tr-time-p;
        }

        &__location {
            color: $color-text-s;
        }

        &__time {}
    }

    @media screen and (max-width: 991px) {
        .header {
            padding: 8px 0;
            background-color: $color-base-bg;

            &__block-location {
                display: none;
            }

            &__name {
                font-size: 16px;
            }

            &__btn-menu,
            &__block-about {
                z-index: 1;
            }

            &__btn-menu {
                display: grid;
            }

            &__nav {
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100dvh;
                border-radius: 0;
                transform: translateY(-100%);
                transition: transform $tr-time-t;

                &.active {
                    transform: translateY(0%);
                }

                ul {
                    grid-auto-flow: row;
                    grid-row-gap: 8px;
                    justify-content: center;
                    align-content: center;
                    border-radius: 0;
                    height: inherit;
                    backdrop-filter: none;
                    background-color: $color-base-bg;
                }

                a {
                    height: 44px;
                    padding: 0 20px;
                    font-size: 20px;
                }
            }

            &__nav-decore {
                display: none;
            }
        }
    }
</style>