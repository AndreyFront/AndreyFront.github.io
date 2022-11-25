<template>
  <Header/>
  <div class="main-container">
    <router-view/>
  </div>
  <Footer/>
</template>

<script>
import Header from "@/layouts/Header"
import Footer from "@/layouts/Footer"

export default {
  components: {
    Header,
    Footer
  },
  mounted: {
    fixedHeader() {
      const header = document.querySelector('.header')
      const mainContainer = document.querySelector('.main-container')

      mainContainer.style.marginTop = `${header.offsetHeight}px`
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';


</style>
