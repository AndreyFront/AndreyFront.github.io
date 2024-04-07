import { ref, onMounted } from 'vue'

export function useCheckTablet() {

    const isTablet = ref(false)

    onMounted(() => {
        if (window.innerWidth <= 991) isTablet.value = true
    })

    return isTablet
}