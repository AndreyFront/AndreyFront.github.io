<template>
    <div class="post-card">
        <span class="title">{{ title }}</span>
        <div class="block-info">
            <span class="info-item">{{ date }}</span>
            <span class="info-item">{{ tags }}</span>
        </div>
        <span class="description">{{ description }}</span>
    </div>
</template>

<script>
export default {
    name: 'PostCard',
    props: {
        title: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        tags: {
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

    .post-card {
        display: grid;
        grid-row-gap: 20px;
        padding: 24px;
        background-color: $color-1;
        box-shadow: 0px 4px 10px rgba(187, 225, 250, 0.25);
        border-radius: 4px;
    }

    .title {
        @include adaptiv-font(24, 20);
        font-weight: 700;
        line-height: 1.5em;
    }

    .description {
        line-height: 1.4em;
    }

    .block-info {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        align-items: center;
    }

    .info-item {
        @include adaptiv-font(18, 16);

        &:first-child {
            position: relative;
            padding-right: 26px;

            &::after {
                content: '';
                position: absolute;
                top: 50%;
                right: 0;
                transform: translate(50%, -50%);
                height: 21px;
                width: 1px;
                background-color: $color-2;
            }
        }

        &:last-child {
            padding-left: 26px;
        }
    }

    @media screen and (max-width: 768px) {
        .post-card {
            grid-row-gap: 12px;
        }
    }
</style>