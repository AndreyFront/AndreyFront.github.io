import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {

    const pageX = ref(0),
    pageY = ref(0),
    clientY = ref(0)

    function update(event) {
        pageX.value = event.pageX
        pageY.value = event.pageY
        clientY.value = event.clientY
    }

    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))

    return { pageX, pageY, clientY }
}