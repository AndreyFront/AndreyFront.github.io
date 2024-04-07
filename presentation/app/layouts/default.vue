<script setup></script>

<template>
    <div class="main-layout">
        <app-cursor />
        <app-header />
        <div class="main-layout__page">
            <slot />
        </div>
        <app-footer />
    </div>
</template>

<style lang="scss">
    .main-layout {

        &__page {
            position: relative;
            padding-bottom: clamp(72px, vw(160), vw(160));
            border-radius: 0 0 clamp(20px, vw(38), vw(38)) clamp(20px, vw(38), vw(38));
            background-color: $color-base-bg;
        }
    }

    @media screen and (max-width: 680px) {
        .main-layout {

            &__page {
                padding-bottom: 64px;
            }
        }
    }
</style>