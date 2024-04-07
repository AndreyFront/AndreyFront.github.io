<script setup></script>

<template>
    <div class="preloader">
        <div class="preloader__loader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<style lang="scss">
    .preloader {
        position: fixed;
        z-index: 10;
        display: grid;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.5);
        opacity: 0;
        pointer-events: none;
        transition: opacity $tr-time-p;

        &.active {
            opacity: 1;
            pointer-events: auto;
        }

        &__loader {
            position: relative;
            display: block;
            width: 80px;
            height: 80px;
        }

        span {
            display: block;
            animation: preloader-anime 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            transform-origin: 40px 40px;

            &::after {
                content: " ";
                display: block;
                position: absolute;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                background-color: $color-text-p;
                margin: -4px 0 0 -4px;
            }

            &:nth-child(1) {
                animation-delay: -0.036s;

                &:after {
                    top: 63px;
                    left: 63px;
                }
            }

            &:nth-child(2) {
                animation-delay: -0.072s;

                &:after {
                    top: 68px;
                    left: 56px;
                }
            }

            &:nth-child(3) {
                animation-delay: -0.108s;

                &:after {
                    top: 71px;
                    left: 48px;
                }
            }

            &:nth-child(4) {
                animation-delay: -0.144s;

                &:after {
                    top: 72px;
                    left: 40px;
                }
            }

            &:nth-child(5) {
                animation-delay: -0.18s;

                &:after {
                    top: 71px;
                    left: 32px;
                }
            }

            &:nth-child(6) {
                animation-delay: -0.216s;

                &:after {
                    top: 68px;
                    left: 24px;
                }
            }

            &:nth-child(7) {
                animation-delay: -0.252s;

                &:after {
                    top: 63px;
                    left: 17px;
                }
            }

            &:nth-child(8) {
                animation-delay: -0.288s;

                &:after {
                    top: 56px;
                    left: 12px;
                }
            }
        }
    }

    @keyframes preloader-anime {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>