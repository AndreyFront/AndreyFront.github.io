<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>

<script>
import Header from "@/layouts/Header"
import Footer from "@/layouts/Footer"

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';
</style>
