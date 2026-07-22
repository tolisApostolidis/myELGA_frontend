<script setup>
import { useApplicationStore } from '@/stores/application';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();

const applicationStore = useApplicationStore();

const managerId = applicationStore.userData.id;
</script>

<template>
    <main>
        <div class="breadcrumb-container">
            <div class="breadcrumb-container-inner">
                <div class="breadcrumb-row">
                    <div class="breadcrumb-column">
                        <RouterLink :to=" { name: 'manager-dashboard' } " class="breadcrumb-link"> Αρχική (Διαχειριστικό περιβάλλον) </RouterLink>
                    </div>
                    <div class="breadcrumb-column">
                        <div>></div>
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
                    <div class="section-sidebar manager">
                        <RouterLink :to="{ name: 'manager-profile', query: { id: managerId } }" :class="{ 'is-active': route.name === 'manager-profile' }" class="section-sidebar-btn">Το Προφίλ μου</RouterLink>
                        <RouterLink :to="{ name: 'manager-applications'}" :class="{ 'is-active': route.name === 'manager-applications' }" class="section-sidebar-btn">Προβολή αιτήσεων</RouterLink>
                    </div>

                    <div class="section-sidebar-content">
                        <RouterView />
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>