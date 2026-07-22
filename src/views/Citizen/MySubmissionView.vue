<script setup>
import SubmissionInfo from '@/components/SubmissionInfo.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';


const applicationStore = useApplicationStore();

const route = useRoute();

const id = ref(null);
const submissionId = ref(null);

onMounted(() => {
    id.value = applicationStore.userData.id;
    submissionId.value = route.params.submissionId
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
                        <div class="breadcrumb-current"> Αίτηση καλλιέργειας: {{ submissionId }}</div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="page">
            <section>
                <h2 class="section-title submission-title">Αίτηση καλλιέργειας με αναγνωριστικό: {{ submissionId }}</h2>
                <SubmissionInfo />
            </section>  
        </div>        
    </main>
</template>