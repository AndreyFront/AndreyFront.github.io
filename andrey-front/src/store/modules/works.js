import getUrl from "@/api/getUrl"

export default {
    state: () => ({
        listWorks: null
    }),
    mutations: {
        // setListWorks
    },
    actions: {
        getWorks() {
            getUrl('http://localhost:3000/listWorks')
        }
    },
    getters: {}
}