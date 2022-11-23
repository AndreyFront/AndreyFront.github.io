<template>
    <div class="featured-works">
        <div class="main-container max-width">
            <div class="my-title">
                <span class="my-title__text">Featured works</span>
                <router-link to="/works " class="link-reset link">View all</router-link>
            </div>
            <ListWorks :works="listWorks"/>
        </div>
    </div>
</template>

<script>
import ListWorks from "@/components/ListWorks"

export default {
    name: 'FeaturedWorks',
    components: {
        ListWorks
    },
    data() {
        return {
            listWorks: [
                {
                    id: 1,
                    image: 'https://threejs.org/files/projects/richardmattka.png',
                    title: 'Designing Dashboards 1',
                    year: '2018',
                    type: 'Dashboard',
                    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
                },
                {
                    id: 2,
                    image: 'https://threejs.org/files/projects/rainforest.png',
                    title: 'Designing Dashboards 2',
                    year: '2019',
                    type: 'Dashboard',
                    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
                },
                {
                    id: 3,
                    image: 'https://threejs.org/files/projects/enough.png',
                    title: 'Designing Dashboards 3',
                    year: '2019',
                    type: 'Dashboard',
                    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
                }
            ]
        }
    }
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';

    .featured-works {
        padding: 32px 0;
    }

    .list-works {
        margin-top: 20px;
    }
</style>