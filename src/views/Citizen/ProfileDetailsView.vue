<script setup>
import { onMounted, ref } from 'vue';
import { remoteDataAccess } from '@/composables/remotaDataAccess.js';
import { useApplicationStore } from '@/stores/application.js';
import { BOverlay } from 'bootstrap-vue-next';


const applicationStore = useApplicationStore();

const id = ref(null);

const url = ref('/services/profile/' + applicationStore.userData.email);
const auth = ref(true);
const { data, loading, performRequest } = remoteDataAccess(url, auth);

onMounted(() => {
    performRequest(); // get user's details
    id.value = applicationStore.userData.id; // get user's current id
});
</script>

<template>
    <h2 class="profile-title">Προσωπικά Στοιχεία</h2>
    <b-overlay :show="loading" opacity="0.6" spinner-large spinner-variant="dark">
        <template v-if="data">   
            <div class="details-container">
                <div class="details-group">
                    <h4 class="details-sub">ΟΝΟΜΑ</h4>
                    <h4>{{ data.firstName }}</h4>
                </div>
                <div class="details-group">
                    <h4 class="details-sub">ΕΠΩΝΥΜΟ</h4>
                    <h4>{{ data.lastName }}</h4>
                </div>
                <div class="details-group">
                    <h4 class="details-sub">ΚΙΝΗΤΟ ΤΗΛΕΦΩΝΟ</h4>
                    <h4>{{ data.phoneNumber }}</h4>
                </div>
                <div class="details-group">
                    <h4 class="details-sub">Α.Φ.Μ.</h4>
                    <h4>{{ data.afm }}</h4>
                </div>
                <div class="details-group">
                    <h4 class="details-sub">ΔΙΕΥΘΥΝΣΗ</h4>
                    <h4>{{ data.address }}</h4>
                </div> 
            </div>
        </template>
    </b-overlay>
</template>