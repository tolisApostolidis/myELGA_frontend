<script setup>
import { onMounted, ref } from 'vue';
import { remoteDataAccess } from '@/composables/remotaDataAccess.js';
import { useApplicationStore } from '@/stores/application.js';

const applicationStore = useApplicationStore();

const url = ref('http://localhost:8080/services/manager/' + applicationStore.userData.id);
const auth = ref(true);
const { data, loading, performRequest } = remoteDataAccess(url, auth);

onMounted(() => {
    performRequest(); 
});
</script>

<template>
    <h2 class="profile-title">Προσωπικά Στοιχεία</h2>
    <div v-if="loading" class="row">
        <div  class="spinner-border mx-auto" role="status" >
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>  
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
                <h4 class="details-sub">Α.Φ.Μ.</h4>
                <h4>{{ data.afm }}</h4>
            </div>
            <div class="details-group">
                <h4 class="details-sub">ΕΔΡΑ</h4>
                <h4>{{ data.jobAddress }}</h4>
            </div> 
        </div>
    </template>
</template>

