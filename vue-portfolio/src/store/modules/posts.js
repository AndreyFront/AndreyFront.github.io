import getUrl from "@/api/getUrl"

export default {
    state: () => ({
        posts: []
    }),
    getters: {
        getPosts(state) {
            return state.posts
        }
    },
    mutations: {
        SET_POSTS(state, payload) {
            state.posts = payload
        }
    },
    actions: {
        async uploadingPosts({ commit }, payload) {
            const data = await getUrl(payload)
            commit('SET_POSTS', data)
        }
    }
}