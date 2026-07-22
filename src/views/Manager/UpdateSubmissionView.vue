<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import FullEditSubmission from '@/components/FullEditSubmission.vue';


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
                        <div class="breadcrumb-current"> Επεξεργασία αίτησης καλλιέργειας: {{ submissionId }} </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <FullEditSubmission />
            </section>  
        </div>  
    </main>
</template>