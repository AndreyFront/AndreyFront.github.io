<template>
    <header class="header" ref="header">
        <div class="main-container max-width">
            <router-link :to="{ name: 'home' }" class="link-reset"><span class="logo">John <span>FD</span></span></router-link>
            <nav class="nav">
                <ul class="list list-reset">
                    <li class="li">
                        <router-link :to="{ name: 'home' }" class="link-reset"><span class="text">Home</span></router-link>
                    </li>
                    <li class="li">
                        <router-link :to="{ name: 'blog' }" class="link-reset"><span class="text">Blog</span></router-link>
                    </li>
                    <li class="li">
                        <router-link :to="{ name: 'work' }" class="link-reset"><span class="text">Works</span></router-link>
                    </li>
                </ul>
            </nav>
            <div class="burger" data-header="btn-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        mobMenu() {
            const header = this.$refs.header
            
            const show = () => {
                header.classList.add('active')
                this.isOpen = true
            }

            const hide = () => {
                header.classList.remove('active')
                this.isOpen = false
            }
            
            document.addEventListener('click', (event) => {
                const el = event.target
                if (el.closest('.burger')) {
                    if (this.isOpen) {
                        hide()
                    } else {
                        show()
                    }
                }

                if (el.closest('.li')) { 
                    hide()
                }

                if (!el.closest('.nav') && !el.closest('.burger')) {
                    hide()
                }
            })
        }
    },
    mounted() {
        this.mobMenu()
    }
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';

    .header {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        padding: 27px 0;
        background-color: $color-1;
    }

    .main-container {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        align-items: center;
        justify-content: space-between;
    }

    .logo,
    .text {
        font-weight: 600;
        @include adaptiv-font(20, 18);
    }

    .logo {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        align-items: center;
        grid-column-gap: 5px;
        transition: color $transition-time;

        &:hover {
            color: $color-4;
        }

        span {
            display: grid;
            align-items: center;
            justify-content: center;
            padding: 2px;
            background-color: $color-4;
            color: $color-1;
            border-radius: 4px;
            font-weight: 500;
            @include adaptiv-font(20, 18);
        }
    }
    
    .nav {}

    .list {
        display: grid;
        grid-auto-columns: max-content;
        grid-auto-flow: column;
        grid-column-gap: 33px;
    }

    .li {

        a {
            color: $color-2;
            transition: color $transition-time;

            &:hover {
                color: $color-4;
            }
        }
    }

    .burger {
        display: none;
        width: 36px;
        height: 36px;
        position: relative;
        cursor: pointer;
        transition: .5s ease-in-out;

        span {
            display: block;
            position: absolute;
            height: 2px;
            width: 85%;
            background: $main-color;
            border-radius: 4px;
            opacity: 1;
            right: 0;
            transform: rotate(0deg);
            transition: $transition-time ease-in-out;

            &:nth-child(1) {
                top: 7px;
                transform-origin: left center;
            }

            &:nth-child(2) {
                top: 17px;
                transform-origin: left center;
            }

            &:nth-child(3) {
                top: 27px;
                transform-origin: left center;
            }
        }
    }

    @media screen and (max-width: 768px) {
        .header {
            padding: 10px 0;

            &.active {
                .nav {
                    opacity: 1;
                    visibility: visible;
                    pointer-events: auto;
                    transform: translateY(0);
                }
                .burger span {
                    &:nth-child(1) {
                        transform: rotate(45deg);
                        top: 3px;
                        left: 5px;
                    }

                    &:nth-child(2) {
                        width: 0%;
                        opacity: 0;
                    }

                    &:nth-child(3) {
                        transform: rotate(-45deg);
                        top: 25px;
                        left: 5px;
                    }
                }
            }
        }
        .burger {
            display: grid;
        }

        .nav {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            padding: 20px;
            background-color: $color-1;
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform: translateY(-15px);
            transition: transform $transition-time, opacity $transition-time, visibility $transition-time;
        }
    }
</style>