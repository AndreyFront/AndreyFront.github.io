<script setup>
    const socialNetworks = [
        {
            id: 1,
            name: 'Telegram',
            link: 'https://t.me/andreysev_fd'
        },
        {
            id: 2,
            name: 'Vkontakte',
            link: 'https://vk.com/andrey__sev'
        }
    ]
</script>

<template>
    <footer class="footer" id="contacts">
        <div class="container">
            <div class="footer__header">
                <span class="footer__info">Portfolio</span>
                <span class="footer__name">Andrey Sevostyanov</span>
                <span class="footer__info">2021 - 2024</span>
            </div>
            <div class="footer__body">
                <a href="https://t.me/andreysev_fd" target="_blank" class="footer__contact-link" data-hover>Поработаем вместе</a>
            </div>
            <div class="footer__footer">
                <span class="footer__info">&copy; Code by Andrey Sevostyanov</span>
                <ul class="footer__social-networks list-reset">
                    <li 
                        v-for="socialNetwork in socialNetworks"
                        :key="socialNetwork.id"
                    >
                        <AppBtn 
                            :name="socialNetwork.name" 
                            :link="socialNetwork.link"
                            target="_blank"
                            theme="primary-inverse"
                            type="default-link"
                            data-hover
                        />
                    </li>
                </ul>
                <a href="mailto:andrey-se-v@yandex.ru" class="footer__info" data-hover>andrey-se-v@yandex.ru</a>
            </div>
        </div>
    </footer>
</template>

<style lang="scss">
    .footer {
        margin-top: vw(-40);
        background-color: $color-base-bg-s;
        color: $color-text-t;

        .container {
            display: grid;
            align-content: space-between;
            height: vw(777);
            padding-top: clamp(64px, vw(124), vw(124));
            padding-bottom: clamp(32px, vw(38), vw(38));
        }


        &__header,
        &__footer {
            display: grid;
            grid-auto-flow: column;
            justify-content: space-between;
            align-items: center;
            grid-column-gap: clamp(20px, vw(20), vw(20));
        }

        &__info {
            font-size: clamp(11px, vw(14), vw(14));
            color: $color-text-t;

            &[href] {
                padding-bottom: 5px;
                border-bottom: 1px solid $color-base-border-t;
                transition: border-bottom-color $tr-time-p;

                &:hover {
                    border-bottom-color: transparent;
                }
            }
        }

        &__name {}

        &__body {
            text-align: center;
        }

        &__contact-link {
            font-size: clamp(56px, vw(56), vw(56));
            line-height: 1.3em;
            color: inherit;
        }

        &__social-networks {
            display: grid;
            grid-auto-flow: column;
            grid-column-gap: 12px;
        }
    }

    @media screen and (max-width: 991px) {
        .footer {

            .container {
                height: max-content;
            }

            &__body {
                padding: 64px 0;
            }

            &__footer {
                grid-row-gap: 56px;

                .footer__info,
                .footer__info[href] {
                    grid-row: 2 / 3;
                }
            }

            &__social-networks {
                grid-row: 1 / 2;
                grid-column: 1 / 3;
                justify-content: center;
            }
        }
    }

    @media screen and (max-width: 767px) {
        .footer {

            &__body {
                padding: 64px 0 40px 0;
            }

            &__footer {
                grid-row-gap: 72px;
            }
        }
    }

    @media screen and (max-width: 680px) {
        .footer {
            margin-top: -20px;

            &__contact-link {
                font-size: 42px;
            }
        }
    }
</style>