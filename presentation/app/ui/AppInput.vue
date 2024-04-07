<script setup>
    import { ref, defineEmits, defineProps, watch } from 'vue'

    const emit = defineEmits(['change']),
    props = defineProps({
        value: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        }
    })

    const inputValue = ref(props.value)

    watch(inputValue, (newValue) => {
        emit('change', newValue)
    })
</script>

<template>
    <div class="input">
        <input 
            class="input__field"
            :type="type"
            :placeholder="placeholder"
            v-model="inputValue"
        >
    </div>
</template>

<style lang="scss">
    .input {
        position: relative;

        &__field {
            font-size: 16px;
            outline: none;
            background-color: transparent;
            border: none;
            height: 48px;
            width: 100%;
            padding: 0 16px;
            border: 1px solid;
            color: $color-text-p;
            border-color: $color-text-p-03;
            border-radius: 5px;
            transition: border-color $tr-time-p;

            &:focus {
                border-color: $color-text-p;
            }

            &:focus::placeholder {
                color: $color-text-p;
            }

            &::placeholder {
                color: $color-text-p-03;
                font-size: 16px;
                transition: color $tr-time-p;
            }
        }
    }
</style>