<script setup>
import BreederInfo from '@/components/BreederInfo.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const breederId = ref(null);

onMounted(() => {
    breederId.value = route.params.breederId;
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
                        <div class="breadcrumb-current"> Αίτηση καλλιέργειας: {{ breederId }} </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <h2 class="section-title submission-title">Αίτηση κτηνοτροφίας με αναγνωριστικό: {{ breederId }}</h2>
                <BreederInfo />
            </section>  
        </div>  
    </main>
</template>