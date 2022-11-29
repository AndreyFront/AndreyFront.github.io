<template>
    <div class="blog">
        <div class="main-container max-width">
            <div class="my-title-page">
                <h2 class="my-title-page__title my-title-page__title--h2">Blog</h2>
            </div>
            <div class="wrapper-posts">
                <PostCard v-for="post in listPosts" :key="post.id"
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
    name: 'BlogView',
    components: {
        PostCard
    },
    created() {
        this.$store.dispatch('uploadingPosts', 'http://localhost:3000/posts')
    },
    computed: {
        listPosts() {
            return this.$store.getters.getPosts
        }
    }
  }
  </script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';

    .blog {
        padding: 90px 0 58px;
    }

    .post-card {
        padding: 0 0 29px 0;
        box-shadow: none;
        border-radius: 0;
        border-bottom: 1px solid $color-8;

        &:not(:first-child) {
            padding: 32px 0 29px 0;
        }
    }

    @media screen and (max-width: 992px) {
        .blog {
            padding: 30px 0;
        }
    }
</style>