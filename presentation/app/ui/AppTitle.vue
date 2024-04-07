<script>
    import { defineComponent, h } from 'vue'
    
    export default defineComponent({
        name: 'MyTitle',
        props: {
            type: {
                type: String,
                required: true,
            },
            modifiers: {
                type: String
            }
        },
        render() {
            return h(this.type, { class: `title ${this.modifiers}` }, this.$slots)
        }
    })
</script>

<style lang="scss">
    .title {
        margin: 0;
        font-weight: 400;

        &--biggest {
            letter-spacing: -.03em;
            font-size: clamp(55px, vw(107), vw(107));
            line-height: 1.1em;
        }

        &--h1 {
            letter-spacing: -.03em;
            font-size: vw(76);
            line-height: 1.1em;
        }

        &--h2 {
            font-size: clamp(28px, vw(48), vw(48));
            line-height: 1.2em;
        }

        &--h6 {
            font-size: clamp(18px, vw(18), vw(18));
            line-height: 1.4em;
        }
    }

    @media screen and (max-width: 767px) {
        .title {
            
            &--biggest {
                font-size: 53px;
            }
        }
    }

    @media screen and (max-width: 680px) {
        .title {
            
            &--biggest {
                font-size: 45px;
            }
        }
    }
</style>