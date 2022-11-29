<template>
  <Header ref="header"/>
  <div class="main-container main-container--app main-container--app-show" ref="mainContainer">
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
  mounted() {
    const header = document.querySelector('header')
    this.$refs.mainContainer.style.marginTop = `${header.offsetHeight}px`

    // window.addEventListener('hashchange', () => {
    //   console.log('hashchange')
    //   this.$refs.mainContainer.classList.remove('main-container--app-show')
    //   setTimeout(() => this.$refs.mainContainer.classList.add('main-container--app-show'), 500)
    // })
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/main.scss';

  .main-container {

    &--app {
      opacity: 0;
      transform: scale(0.9);

      &-show {
        opacity: 1;
        transform: scale(1);
        transition: opacity $transition-time, transform $transition-time;
      }
    }
  }
</style>
