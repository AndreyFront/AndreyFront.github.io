<script setup></script>

<template>
    <section class="welcome" id="welcome">
        <div class="container">
            <div class="welcome__wrap-desc">
                <div class="welcome__desc">
                    <p>Разработчик с опытом 3+ лет. За свою карьеру выполнил более 25 проектов разных масштабов и сложностей.</p>
                </div>
                <span class="welcome__contact">Telegram <a href="https://t.me/andreysev_fd" target="_blank" data-hover>@andreysev_fd</a></span>
            </div>
            <app-title type="h1" modifiers="title--biggest">Front-end разработчик на vue.js</app-title>
        </div>
    </section>
</template>

<style lang="scss">
    .welcome {
        display: grid;
        align-content: end;
        min-height: 100dvh;

        .container {
            display: grid;
            grid-template-columns: clamp(200px, vw(200), vw(200)) minmax(vw(500), vw(1070));
            justify-content: space-between;
            grid-column-gap: vw(50);
            padding-bottom: vw(80);
        }

        &__wrap-desc {
            display: grid;
            grid-row-gap: vw(20);
            align-content: space-between;
            padding-top: vw(24);
        }

        &__desc {
            display: grid;
            grid-row-gap: vw(5);

            p {
                margin: 0;
                font-size: clamp(14px, vw(14), vw(14));
                line-height: 1.5;
            }
        }

        &__contact,
        &__contact a {
            font-size: clamp(14px, vw(14), vw(14));
            line-height: 1em;
        }

        &__contact {
            
            a {
                border-bottom: 1px solid $color-base-border;
                transition: border-bottom $tr-time-p;

                &:hover {
                    border-bottom-color: transparent;
                }
            }
        }
    }

    @media screen and (max-width: 991px) {
        .welcome {
            min-height: max-content;

            .container {
                padding-top: 132px;
                padding-bottom: 48px;
            }
        }
    }

    @media screen and (max-width: 767px) {
        .welcome {

            .container {
                padding-top: 104px;
            }
        }
    }

    @media screen and (max-width: 680px) {
        .welcome {

            .container {
                grid-template-columns: 1fr;
                grid-row-gap: 16px;
            }

            .title {
                grid-row: 1/2;
            }

            &__wrap-desc {
                grid-row-gap: 16px;
            }
        }
    }
</style>