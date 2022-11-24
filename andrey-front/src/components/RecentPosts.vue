<template>
    <div class="recent-posts">
        <div class="main-container max-width">
            <div class="my-title">
                <span class="my-title__text">Recent posts</span>
                <router-link to="/blog" class="link-reset link">View all</router-link>
            </div>
            <div class="wrapper-cards">
                <PostCard v-for="post in posts" :key="post.id"
                    :title="post.title"
                    :date="post.date"
                    :tags="post.tags"
                    :description="post.description"
                />
            </div>
        </div>
    </div>
</template>

<script>
import PostCard from "@/components/PostCard"

export default {
    name: 'RecentPosts',
    components: {
        PostCard
    },
    data() {
        return {}
    },
    created() {
        this.$store.dispatch('uploadingPosts', 'http://localhost:3000/posts')
    },
    computed: {
        posts() {
            console.log(this.$store.getters.getPosts)
            return this.$store.getters.getPosts
        }
    }
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';

    .recent-posts {
        padding: 32px 0;
        background-color: $color-5;
    }

    .wrapper-cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 20px;
        margin-top: 20px;
    }
</style>