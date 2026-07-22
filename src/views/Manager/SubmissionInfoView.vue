<script setup>
import SubmissionInfo from '@/components/SubmissionInfo.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const submissionId = ref(null);

onMounted(() => {
    submissionId.value = route.params.submissionId;
})
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
                        <RouterLink :to="{ name: 'manager-applications' }" class="breadcrumb-link"> Υπηρεσίες </RouterLink>
                    </div>
                    <div class="breadcrumb-column">
                        <div>></div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current"> Αίτηση καλλιέργειας: {{ submissionId }} </div>
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