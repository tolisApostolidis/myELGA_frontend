<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute, RouterView } from 'vue-router';
import { remoteDataAccess } from '@/composables/remotaDataAccess.js';
import { useApplicationStore } from '@/stores/application.js';

const route = useRoute();
const applicationStore = useApplicationStore();

const id = ref(null);

const url = ref('/services/profile/' + applicationStore.userData.email);
const auth = ref(true);
const { data, loading, performRequest } = remoteDataAccess(url, auth);

onMounted(() => {
    performRequest();
    id.value = applicationStore.userData.id;
});
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
                        <div>></div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current">Το Προφίλ μου</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page">            
            <section>
                <div class="section-sidebar-container">
                    <div class="section-sidebar">
                        <RouterLink :to="{ name: 'profile_details', params: { id: id } }" class="section-sidebar-btn" :class="{ 'is-active': route.name === 'profile_details' }">Προσωπικά Στοιχεία</RouterLink>
                        <RouterLink :to="{ name: 'profile_edit', params: { id: id } }" class="section-sidebar-btn" :class="{ 'is-active': route.name === 'profile_edit' }">Επεξεργασία Στοιχείων</RouterLink>
                        <RouterLink :to="{ name: 'my_submissions', params: { id: id } }" class="section-sidebar-btn" :class="{ 'is-active': route.name === 'my_submissions' }">Οι Αιτήσεις μου</RouterLink>
                    </div>

                    <div class="section-sidebar-content">
                        <RouterView />
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>