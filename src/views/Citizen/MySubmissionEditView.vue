<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { remoteDataAccess } from '@/composables/remotaDataAccess';
import useVuelidate from '@vuelidate/core';
import { minValue, maxValue, helpers } from '@vuelidate/validators';
import { BOverlay } from 'bootstrap-vue-next';
import { formatFloatNumber } from '@/composables/formatFloatNumber.js';
import { formatIntegerNumber } from '@/composables/formatIntegerNumber.js';
import { useApplicationStore } from '@/stores/application.js';


const applicationStore = useApplicationStore();

const { formatFloatNumberInput } = formatFloatNumber();
const { formatIntegerInput } = formatIntegerNumber();


const route = useRoute();
const router = useRouter();

const id = ref(null);

const formData = ref({
    "fieldArea": "",
    "averageProduction": "",
    "description": ""
});
const rules = computed(() => {
    return {
        fieldArea: { 
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(0.01)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(20000))
        },
        averageProduction: { 
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(0.01)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(9999.99))
        }
    }; 
});
const v$ = useVuelidate(rules, formData);

const submissionId = ref(null);
const url = computed(() => {
    return 'http://localhost:8080/services/farmer/' + submissionId.value;
});
const auth = ref(true);
const method = ref("POST");
const { loading, error, performRequest } = remoteDataAccess(url, auth, method, formData);

const onFormSubmit = async() => {
    const result = await v$.value.$validate();
    if (result) {
        await performRequest();
        if (error.value == false) {
            alert("Η αίτηση σας ενημερώθηκε με επιτυχία!");

            router.push({ name: 'my_submissions', params: { id: id.value } });
        }
    }
}
onMounted(() => {
    id.value = applicationStore.userData.id;
    submissionId.value = route.params.submissionId;
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
                        <RouterLink :to=" { name: 'my_submissions', params: {id: id } } " class="breadcrumb-link"> Το Προφίλ μου </RouterLink>
                    </div>
                    <div class="breadcrumb-column">
                        <div>></div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current"> Επεξεργασία αίτησης καλλιέργειας: {{ submissionId }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <b-overlay :show="loading" opacity="0.6" spinner-large>
                    <div class="my-card">
                        <div class="my-card-inner">
                            <h2 class="my-form-title">Επεξεργάσου την αίτηση <span class="bold">{{ submissionId }}</span> σου τώρα</h2>
                            <p>Μπορεις να αλλάξεις τα παρακάτω πεδία της αίτησης σου</p>
                            <p class="my-form-text"><b>Προσοχή!</b> Πατώντας το κουμπί οι τρέχουσες αλλαγές θα εφαρμοστούν και δεν θα υπάρχουν πλέον οι τιμές της προηγούμενης υποβολής.</p>

                            <form class="my-form">                                
                                <div class="my-form-group">
                                    <span class="my-form-span">κιλά</span>
                                    <input 
                                        v-model="formData.averageProduction"
                                        type="text" 
                                        class="my-form-input" 
                                        id="averageProduction"
                                        maxLength="8"
                                        @input="formatFloatNumberInput"
                                    />
                                    <label :class="{ 'on-text': formData.averageProduction }" class="my-form-label" for="averageProduction">Μέση παραγωγή</label>
                                    <div v-for="error in v$.averageProduction.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
                                </div>
                                <div class="my-form-group">
                                    <span class="my-form-span">στρέμματα</span>
                                    <input 
                                        v-model="formData.fieldArea"
                                        type="text" 
                                        class="my-form-input" 
                                        id="fieldArea"
                                        maxLength="8"
                                        @input="formatIntegerInput"
                                    />
                                    <label :class="{ 'on-text': formData.fieldArea }" class="my-form-label" for="fieldArea">Έκταση αγροτεμαχίου</label>
                                    <div v-for="error in v$.fieldArea.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
                                </div>
                                <div class="my-form-group">
                                    <textarea 
                                        v-model="formData.description"
                                        type="text" 
                                        class="my-form-input" 
                                        id="description"
                                        maxLength="150"
                                    ></textarea>
                                    <label :class="{ 'on-text': formData.description }" class="my-form-label text-area" for="description">Περιγραφή</label>   
                                </div>

                                <button @click.prevent="onFormSubmit" type="submit" class="main-btn">
                                    <a class="btn-link">
                                        <span class="btn-text">Υποβολή αλλαγών</span>
                                    </a>            
                                </button>
                            </form>
                        </div>                        
                    </div>
                </b-overlay>
            </section>
        </div>
    </main>
</template>