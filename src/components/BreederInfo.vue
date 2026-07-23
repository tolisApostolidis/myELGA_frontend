<script setup>
import { onMounted, ref, computed } from 'vue';
import { remoteDataAccess } from '@/composables/remotaDataAccess';
import { useRoute } from 'vue-router';
import { formatDamagesNumber } from "@/composables/formatDamagesNumber.js";


const { formatDamages } = formatDamagesNumber("en-US");

const route = useRoute();

const applicationId = ref(null);

const url = computed(()=>{
    return '/services/breeder/' + applicationId.value;
});
const auth = ref(true);
const { data, loading, performRequest } = remoteDataAccess(url, auth);

onMounted(() => {
    applicationId.value = route.params.breederId;
    performRequest();
});
</script>

<template>
    <div v-if="loading" class="row">
        <div class="spinner-border mx-auto" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <template v-if="data">
        <div class="submission-state-container">
            <h4 v-if="data.state == 'CREATED'">Υπο-επεξεργασία</h4>
            <h4 v-if="data.state == 'ACCEPTED'">Εγκεκριμένη</h4>
            <h4 v-if="data.state == 'REJECTED'">Απορρίφθηκε</h4>
        </div>
        <div class="submission-info-container">
            <div class="submission-info-wrap">
                <h3 class="submission-info-title">Στοιχεία αίτησης χρήστη</h3>

                <div class="submission-info-group">
                    <h4 class="submission-info-sub">Ημερομηνία δημιουργίας</h4>
                    <h4>{{ data.creationDate }}</h4>
                </div>
                <div class="submission-info-group">
                    <h4 class="submission-info-sub">Αριθμός ζημιωθέντων ζώων</h4>
                    <h4>{{ data.numberOfKilledAnimals }}</h4>
                </div>
                <div class="submission-info-group">
                    <h4 class="submission-info-sub">Συνολικός αριθμός ζώων</h4>
                    <h4>{{ data.totalAnimals }}</h4>
                </div>
                <div class="submission-info-group">
                    <h4 class="submission-info-sub">Τιμή ανά μονάδα προϊόντος</h4>
                    <h4>{{ data.pricePerUnit }}</h4>
                </div>
            </div>
            
            <div class="submission-info-wrap">
                <h3 class="submission-info-title">Στοιχεία αίτησης διαχειριστή</h3>

                <!-- Below fields checked if null because there are fields that get updated by elga manager -->
                <div class="submission-info-group">
                    <h4 class="submission-info-sub">Συντελεστής αποζημίωσης</h4>
                    <h4 v-if="data.compensationFactor != 0">{{ data.compensationFactor }}</h4>
                    <h4 v-else>Δεν έχει οριστεί</h4>
                </div>
                <div class="submission-info-group">
                    <h4 class="submission-info-sub">Ποσοστό κάλυψης ζημιών</h4>
                    <h4 v-if="data.coveragePercentage != 0">{{ data.coveragePercentage }}</h4>
                    <h4 v-else>Δεν έχει οριστεί</h4>
                </div>
                <div class="submission-info-group">
                    <h4 class="submission-info-sub">Υπολειμματική αξία</h4>
                    <h4 v-if="data.residualValue != null">{{ data.residualValue }}</h4>
                    <h4 v-else>Δεν έχει οριστεί</h4>
                </div>           
            </div>
        </div>
        <div class="submission-damages-container">
            <h4 class="submission-damages-sub">Ποσό αποζημίωσης</h4>
            <h3 v-if="data.damages >= 0">{{ formatDamages(data.damages) }} <span class="application-damages-symbol">€</span></h3>
            <h3 v-else>Δεν έχει οριστεί</h3>
        </div>
    </template>        
</template>