export default defineNuxtConfig({
    devtools: { enabled: false },
    ssr: true,
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @import '@/assets/styles/_vars.scss';
                        @import '@/assets/styles/_mixins.scss';
                    `
                },
            }
        }
    },
    bridge: {
        vite: true,
        nitro: true
    },
    srcDir: 'app/',
    components: [
        '~/components',
        '~/sections',
        '~/components/icons',
        '~/ui',
    ],
    modules: [
        '@pinia/nuxt',
        '@nuxt/image',
        'nuxt-anchorscroll'
    ],
    css: [
        '/assets/styles/main.scss'
    ]
})