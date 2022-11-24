<template>
    <div class="project-card">
        <div class="block-image">
            <img :src="image" class="image" alt="">
        </div>
        <div class="wrapper-info">
            <span class="title">{{ title }}</span>
            <div class="block-info">
                <span class="year">{{ year }}</span>
                <span class="type">{{ type }}</span>
            </div>
            <span class="description">{{ description }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProjectCard',
    props: {
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';

    .project-card {
        display: grid;
        grid-template-columns: 246px auto;
        grid-column-gap: 18px;
        padding: 30px 0;
        border-bottom: 1px solid $color-8;

        &:hover .image {
            filter: blur(1.5px);
            transform: scale(1.1);
        }
    }

    .block-image {
        overflow: hidden;
        height: 180px;
        border-radius: 6px;
    }

    .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transition: transform $transition-time, filter $transition-time;
    }

    .wrapper-info {
        display: grid;
        grid-row-gap: 20px;
    }

    .title {
        font-weight: 700;
        @include adaptiv-font(30, 24);
        line-height: 1.5em;
    }

    .block-info {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        grid-column-gap: 26px;
        align-items: center;
    }

    .year {
        display: grid;
        align-items: center;
        justify-content: center;
        padding: 2px 10px;
        background-color: $color-6;
        border-radius: 16px;
        @include adaptiv-font(18, 16);
        font-weight: 900;
        color: $color-1;
    }

    .type {
        color: $color-7;
        @include adaptiv-font(20, 16);
    }

    .description {
        font-size: 16px;
        line-height: 1.5em;
    }
</style>