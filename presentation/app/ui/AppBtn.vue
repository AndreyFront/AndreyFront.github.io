<script setup>
    import { defineProps } from 'vue'

    const props = defineProps({
        name: {
            type: String
        },
        type: {
            type: String,
            default: 'button'
        },
        link: {
            type: String,
            default: '##'
        },
        target: {
            type: String,
            default: '_self'
        },
        theme: {
            type: String,
            default: 'primary'
        }
    })

    const themes = {
        'primary': 'btn--theme--p',
        'primary-inverse': 'btn--theme--p-inverse'
    }
</script>

<template>
    <button 
        v-if="props.type === 'button' || props.type === 'submit'"
        class="btn"
        :class="themes[props.theme]"
        :type="props.type"
        @click="$emit('click', $event)"
    >
        <span class="btn__name">{{ props.name }}</span>
        <slot />
    </button>
    <a 
        v-else-if="props.type === 'default-link'"
        class="btn"
        :class="themes[props.theme]"
        :href="props.link"
        :target="props.target"
    >
        <span class="btn__name">{{ props.name }}</span>
        <slot />
    </a>
    <nuxt-link
        v-else-if="props.type === 'nuxt-link'"
        class="btn"
        :class="themes[props.theme]"
        :to="props.link"
    >
        <span class="btn__name">{{ props.name }}</span>
        <slot />
    </nuxt-link>
</template>
  
<style lang="scss">
    .btn {
        position: relative;
        display: grid;
        justify-content: center;
        align-items: center;
        width: max-content;
        height: clamp(40px, vw(40), vw(40));
        padding: 0 clamp(20px, vw(20), vw(20));
        text-decoration: none;
        cursor: pointer;
        border: 1px solid;
        border-color: transparent;
        border-radius: 100px;
        transition: background-color $tr-time-p, border-color $tr-time-p;

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
        }

        &__name {
            color: $color-text-p;
            font-size: clamp(14px, vw(14), vw(14));
            font-weight: 400;
            line-height: 1em;
            transition: color $tr-time-p;
        }

        &--theme--p {
            border-color: $color-base-border;
            background-color: transparent;

            &:hover {
                background-color: $color-base-bg-s;

                .btn {

                    &__name {
                        color: $color-text-f;
                    }
                }
            }
        }

        &--theme--p-inverse {
            border-color: $color-base-border-t;

            &:hover {
                background-color: $color-base-bg-t;

                .btn {

                    &__name {
                        color: $color-text-p;
                    }
                }
            }

            .btn {

                &__name {
                    color: $color-text-t;
                }
            }
        }
    }
</style>