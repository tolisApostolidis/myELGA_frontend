<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';


const route = useRoute();
</script>

<template>
    <main>
        <div class="breadcrumb-container">
            <div class="breadcrumb-container-inner">
                <div class="breadcrumb-row">
                    <div class="breadcrumb-column">
                        <RouterLink :to=" { name: 'home' } " class="breadcrumb-link"> Αρχική </RouterLink>
                    </div>
                    <div class="breadcrumb-column">
                        <div> > </div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current"> Υπηρεσίες </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <div class="section-sidebar-container">
                    <div class="section-sidebar">
                        <RouterLink :to="{ name: 'farmer-application' }" class="section-sidebar-btn" :class="{ 'is-active': route.name === 'farmer-application' }">Αίτηση καλλιέργειας</RouterLink>
                        <RouterLink :to="{ name: 'breeder-application' }" class="section-sidebar-btn" :class="{ 'is-active': route.name === 'breeder-application' }">Αίτηση κτηνοτροφίας</RouterLink>
                    </div>

                    <div class="section-sidebar-content">
                        <RouterView />
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>