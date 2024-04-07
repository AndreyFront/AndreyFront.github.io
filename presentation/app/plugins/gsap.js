import { gsap } from 'gsap'

export default defineNuxtPlugin((nuxtApp) => {
    if (!process.client) return

    // gsap.registerPlugin()

    return {
        provide: {
            gsap
        },
    }
})