<template>
  <div class="home">
    <Performance/>
    <RecentPosts/>
  </div>
</template>

<script>
import Performance from "@/components/Performance"
import RecentPosts from "@/components/RecentPosts"

export default {
  name: 'HomeView',
  components: {
    Performance,
    RecentPosts
  }
}
</script>
