<template>
    <div class="performance">
        <div class="main-container max-width">
            <div class="wrapper-info">
                <span class="title">Hi, I am John, Creative Technologist</span>
                <span class="description">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                </span>
                <a href="#" class="btn btn--size--md btn--theme--primary">
                    <span class="btn__text">Download Resume</span>
                </a>
            </div>
            <div class="block-image">
                <div class="decore-image"></div>
                <img src="@/assets/images/human.png" class="image" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Performance'
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';
    
    .performance {
        padding: 71px 0;
    }

    .main-container {
        display: grid;
        grid-template-columns: minmax(100px, 497px) 243px;
        justify-content: space-between;
        grid-column-gap: 50px;
    }

    .wrapper-info {
        display: grid;
        grid-row-gap: 38px
    }

    .title {
        @include adaptiv-font(40, 30);
        font-weight: 700;
        line-height: 1.38em;
    }

    .description {
        font-size: 16px;
        line-height: 1.49em;
    }

    .btn {}

    .block-image {
        position: relative;
        widows: 100%;
        height: 243px;
    }

    .image {
        position: relative;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }

    .decore-image {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 110%;
        height: 110%;
        background-color: $color-5;
        border-radius: 100%;
    }
</style>