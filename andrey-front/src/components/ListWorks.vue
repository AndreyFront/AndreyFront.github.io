<template>
    <div class="list-works">
        <ProjectCard v-for="work in works" :key="work.id"
            :link="work.link"
            :image="work.image"
            :title="work.title"
            :year="work.year"
            :type="work.type"
            :description="work.description"
        />
    </div>
</template>

<script>
import ProjectCard from "@/components/ProjectCard.vue"

export default {
    name: 'ListWorks',
    components: {
        ProjectCard
    },
    props: {
        works: {
            type: Object,
            required: true
        },
    }
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';

    .list-works {}

    .project-card {

        &:first-child {
            padding: 0 0 30px 0;
        }
    }
</style>