<template>
    <div class="footer">
        <div class="main-container max-width">
            <div class="wrapper-links">
                <a href="#" class="link-reset link-social-network">
                    <img src="@/assets/icons/fb.svg" class="icon-social-network" alt="">
                </a>
                <a href="#" class="link-reset link-social-network">
                    <img src="@/assets/icons/insta.svg" class="icon-social-network" alt="">
                </a>
                <a href="#" class="link-reset link-social-network">
                    <img src="@/assets/icons/twitter.svg" class="icon-social-network" alt="">
                </a>
                <a href="#" class="link-reset link-social-network">
                    <img src="@/assets/icons/Linkedin.svg" class="icon-social-network" alt="">
                </a>
            </div>
            <span class="copyright">&copy; 2020 All rights reserved </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';

    .footer {
        padding: 54px 0;
    }

    .main-container {
        display: grid;
        align-items: center;
        justify-content: center;
        grid-row-gap: 26px;
    }

    .wrapper-links {
        display: grid;
        grid-auto-columns: max-content;
        grid-auto-flow: column;
        justify-content: center;
        grid-column-gap: 35px;
    }

    .link-social-network {
        transition: opacity $transition-time;

        &:hover {
            opacity: 0.6;
        }
    }

    .icon-social-network {
        width: 30px;
        height: 30px;
        object-fit: contain;
        object-position: center;
    }

    .copyright {
        font-size: 14px;
        text-align: center;
    }
</style>