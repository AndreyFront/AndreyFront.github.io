<template>
  <div class="home">
    <Performance/>
    <RecentPosts/>
    <FeaturedWorks/>
  </div>
</template>

<script>
import Performance from "@/components/Performance"
import RecentPosts from "@/components/RecentPosts"
import FeaturedWorks from "@/components/FeaturedWorks"

export default {
  name: 'HomeView',
  components: {
    Performance,
    RecentPosts,
    FeaturedWorks
  }
}
</script>
