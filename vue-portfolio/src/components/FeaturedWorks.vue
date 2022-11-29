<template>
    <div class="featured-works">
        <div class="main-container max-width">
            <div class="my-title">
                <span class="my-title__text">Featured works</span>
                <router-link :to="{ name: 'work' }" class="link-reset link">View all</router-link>
            </div>
            <ListWorks :works="listWorks"/>
        </div>
    </div>
</template>

<script >
import ListWorks from "@/components/ListWorks"

export default {
    name: 'FeaturedWorks',
    components: {
        ListWorks
    },
    data() {
        return {}
    },
    created() {
        this.$store.dispatch('getWorks', 'http://localhost:3000/works?_limit=3')
    },
    computed: {
        listWorks() {
            return this.$store.getters.getListWorks
        }
    }
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';

    .featured-works {
        padding: 32px 0;
    }

    .list-works {
        margin-top: 20px;
    }
</style>