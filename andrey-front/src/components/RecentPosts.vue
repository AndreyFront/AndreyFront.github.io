<template>
    <div class="recent-posts">
        <div class="main-container max-width">
            <div class="my-title">
                <span class="my-title__text">Recent posts</span>
                <router-link to="/blog" class="link-reset link">View all</router-link>
            </div>
            <div class="wrapper-cards">
                <PostCard 
                    title="Making a design system from scratch"
                    date="12 Feb 2020"
                    tags="Design, Pattern"
                    description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
                />
                <PostCard 
                    title="Creating pixel perfect icons in Figma"
                    date="12 Feb 2020"
                    tags="Figma, Icon Design"
                    description="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
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