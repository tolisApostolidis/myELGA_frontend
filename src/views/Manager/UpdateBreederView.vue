<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import FullEditBreeder from '@/components/FullEditBreeder.vue';


const route = useRoute();

const breederId = ref(null);

onMounted(() => {
    breederId.value = route.params.breederId;
});
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
                        <div class="breadcrumb-current"> Επεξεργασία αίτησης κτηνοτροφίας: {{ breederId }} </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <FullEditBreeder />
            </section>  
        </div>  
    </main>       
</template>