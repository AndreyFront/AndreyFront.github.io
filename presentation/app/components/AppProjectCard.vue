<script setup>
    import { defineProps } from 'vue'

    const props = defineProps({
        link: {
            type: String,
            required: true
        },
        preview: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        labels: {
            type: Array,
            required: true
        }
    })
</script>

<template>
    <nuxt-link class="project-card" :to="link" target="_blank" data-hover>
        <NuxtImg class="project-card__preview" :src="preview" alt="Превью проекта"/>
        <div class="project-card__wrap-labels">
            <span class="project-card__label">{{ name }}</span>
            <div class="project-card__inner-labels">
                <span 
                    class="project-card__label"
                    v-for="label in labels"
                    :key="label.id"
                >{{ label.name }}</span>
            </div>
        </div>
    </nuxt-link>
</template>

<style lang="scss">
    .project-card {
        position: relative;
        display: grid;
        height: clamp(376px, vw(652), vw(652));
        padding: clamp(20px, vw(24), vw(24));
        border-radius: clamp(20px, vw(28), vw(28));
        overflow: hidden;
        will-change: transform;
        transition: transform $tr-time-s;

        &:hover {
            transform: scale(0.95);

            .project-card__wrap-labels {
                transform: translateY(0);
            }
        }

        &__preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }

        &__wrap-labels,
        &__inner-labels {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: max-content;
            grid-column-gap: clamp(8px, vw(10), vw(10));
        }

        &__wrap-labels {
            position: relative;
            justify-content: space-between;
            align-content: start;
            transform: translateY(vw(-100));
            transition: transform $tr-time-s;
        }

        &__inner-labels {}

        &__label {
            display: grid;
            align-items: center;
            height: clamp(36px, vw(36), vw(36));
            background-color: rgba(255, 255, 255, 0.15);
            border-radius: 50em;
            padding: 0 clamp(16px, vw(16), vw(16));
            font-size: clamp(12px, vw(14), vw(14));
            color: $color-text-t;
        }
    }

    @media screen and (max-width: 991px) {
        .project-card {

            &__wrap-labels {
                transform: translateY(0);
            }
        }
    }

    @media screen and (max-width: 767px) {
        .project-card {
            padding: 16px;
            height: 368px;
        }
    }

    @media screen and (max-width: 680px) {
        .project-card {
            height: 273px;

            &__inner-labels {
                position: absolute;
                bottom: 0;
                left: 0;
                justify-content: space-between;
                width: 100%;
            }
        }
    }
</style>