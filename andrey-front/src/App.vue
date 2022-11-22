<template>
  <Header/>
  <router-view/>
</template>

<script>
import Header from "@/layouts/Header"

export default {
    components: {
      Header
    }
}
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';
</style>
