<template>
    <div class="work">
        <div class="main-container max-width">
            <div class="my-title-page">
                <h2 class="my-title-page__title my-title-page__title--h2">Work</h2>
            </div>
            <ListWorks :works="listWorks"/>
        </div>
    </div>
  </template>
  
  <script>
  import ListWorks from "@/components/ListWorks"
  
  export default {
    name: 'WorkView',
    components: {
        ListWorks
    },
    created() {
        this.$store.dispatch('getWorks', 'http://localhost:3000/works')
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

    .main-container {
        padding: 90px 0 58px;
    }
</style>