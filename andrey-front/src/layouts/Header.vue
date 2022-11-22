<template>
    <header class="header">
        <div class="main-container max-width">
            <router-link :to="{ name: 'home' }" class="link-reset"><span class="logo">Andrey <span>FD</span></span></router-link>
            <nav class="nav">
                <ul class="list list-reset">
                    <li class="li">
                        <router-link to="/blog" class="link-reset"><span class="text">Blog</span></router-link>
                    </li>
                    <li class="li">
                        <router-link to="/works" class="link-reset"><span class="text">Works</span></router-link>
                    </li>
                    <li class="li">
                        <router-link to="/contact" class="link-reset"><span class="text">Contact</span></router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped lang="scss">
    @import '@/assets/styles/vars';
    @import '@/assets/styles/mixins';

    .header {
        padding: 27px 0;
    }

    .main-container {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        align-items: center;
        justify-content: space-between;
    }

    .logo,
    .text {
        font-weight: 600;
        @include adaptiv-font(20, 18);
    }

    .logo {
        display: grid;
        grid-template-columns: repeat(2, max-content);
        align-items: center;
        grid-column-gap: 5px;
        transition: color $transition-time;

        &:hover {
            color: $color-4;
        }

        span {
            display: grid;
            align-items: center;
            justify-content: center;
            padding: 2px;
            background-color: $color-4;
            color: $color-1;
            border-radius: 4px;
            font-weight: 500;
            @include adaptiv-font(20, 18);
        }
    }
    
    .nav {}

    .list {
        display: grid;
        grid-auto-columns: max-content;
        grid-auto-flow: column;
        grid-column-gap: 33px;
    }

    .li {

        a {
            color: $color-2;
            transition: color $transition-time;

            &:hover {
                color: $color-4;
            }
        }
    }
</style>