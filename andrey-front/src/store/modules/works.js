import getUrl from "@/api/getUrl"

export default {
    state: () => ({
        listWorks: []
    }),
    getters: {
        getListWorks(state) {
            return state.listWorks
        }
    },
    mutations: {
        SET_LISTWORKS(state, payload) {
            state.listWorks = payload
        }
    },
    actions: {
        async getWorks({ commit }, payload) {
            const data = await getUrl(payload)
            commit('SET_LISTWORKS', data)
        }
    }
}