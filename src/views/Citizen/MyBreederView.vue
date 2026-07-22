<script setup>
import BreederInfo from '@/components/BreederInfo.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';


const applicationStore = useApplicationStore();

const route = useRoute();

const id = ref(null);
const breederId = ref(null);

onMounted(() => {
    id.value = applicationStore.userData.id;
    breederId.value = route.params.breederId
})
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
                        <RouterLink :to=" { name: 'my_submissions', params: {id: id } } " class="breadcrumb-link"> Το Προφίλ μου </RouterLink>
                    </div>
                    <div class="breadcrumb-column">
                        <div>></div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current"> Κτηνοτροφική αίτηση: {{ breederId }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page">
            <section>
                <h2 class="section-title submission-title">Κτηνοτροφική αίτηση με αναγνωριστικό: {{ breederId }}</h2>
                <BreederInfo />
            </section>  
        </div>                    
    </main>
</template>