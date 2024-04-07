<script setup>
    const projects = [
        {
            id: 1,
            link: 'https://centringen.ru',
            preview: '/images/projects/centringen.png',
            name: 'Центр Инженеринг',
            labels: [
                {
                    id: 1,
                    name: 'Корпоративный сайт'
                },
                {
                    id: 2,
                    name: 2021
                },
            ]
        },
        {
            id: 2,
            link: 'https://prootel.pro',
            preview: '/images/projects/prootel.png',
            name: 'Про отель',
            labels: [
                {
                    id: 1,
                    name: 'Корпоративный сайт'
                },
                {
                    id: 2,
                    name: 2021
                },
            ]
        },
        {
            id: 3,
            link: 'https://bandl.ru',
            preview: '/images/projects/bandl.png',
            name: 'Bandl',
            labels: [
                {
                    id: 1,
                    name: 'Интернет-магазин'
                },
                {
                    id: 2,
                    name: 2021
                },
            ]
        },
        {
            id: 4,
            link: 'https://biodoc.pro',
            preview: '/images/projects/biodoc.png',
            name: 'Biodoc',
            labels: [
                {
                    id: 1,
                    name: 'Промо-сайт'
                },
                {
                    id: 2,
                    name: 2021
                },
            ]
        },
        {
            id: 5,
            link: 'https://millennium-architects.ru',
            preview: '/images/projects/millennium-architects.png',
            name: 'Millennium Architects',
            labels: [
                {
                    id: 1,
                    name: 'Личный сайт'
                },
                {
                    id: 2,
                    name: 2021
                },
            ]
        },
    ]
</script>

<template>
    <section class="projects section" id="projects">
        <div class="container">
            <app-project-card 
                v-for="project in projects"
                :key="project.id"
                :link="project.link" 
                :preview="project.preview"
                :name="project.name"
                :labels="project.labels"
            />
            <!-- <app-btn 
                name="Посмотреть еще"
                theme="primary"
            /> -->
        </div>
    </section>
</template>

<style lang="scss">
    .projects {
        padding-top: 40px;

        .container {
            display: grid;
            grid-row-gap: clamp(16px, vw(28), vw(28));
        }

        .btn {
            margin-top: clamp(12px, vw(12), vw(12));
        }
    }

    @media screen and (max-width: 991px) {
        .projects {
            padding-top: 0;
        }
    }

    @media screen and (max-width: 767px) {
        .projects {
            
            .btn {
                margin-top: 8px;
            }
        }
    }
</style>