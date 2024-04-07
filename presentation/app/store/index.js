import { computed, ref } from 'vue'
import { createPinia, defineStore } from 'pinia'
import axios from '@/assets/scripts/axios.js'

const pinia = createPinia(),
useStore = defineStore('store', () => {


    return {}
})

export { pinia, useStore }