<script setup>
import { ref,computed } from 'vue';
import { RouterLink } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minValue, maxValue, integer, helpers } from '@vuelidate/validators';
import { remoteDataAccess } from '@/composables/remotaDataAccess';
import { useApplicationStore } from '@/stores/application.js'
import { BOverlay } from 'bootstrap-vue-next';
import router from '@/router';
import { formatIntegerNumber } from '@/composables/formatIntegerNumber';


const { formatIntegerInput } = formatIntegerNumber();

const applicationStorage = useApplicationStore();

const formData = ref({
    "fieldArea": "",
    "averageProduction": "",
    "description": ""
});
const rules = computed(() => {
    return {
        fieldArea: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(1)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(20000)),
            integer: helpers.withMessage("Η τιμή πρέπει να είναι ακέραιος", integer)
        },
        averageProduction: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(0.01)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(9999.99))
        },
        description: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required) 
        }
    }; 
});
const v$ = useVuelidate(rules, formData);


const auth = ref(true);
const url = ref('http://localhost:8080/services/farmer/new/' + applicationStorage.userData.id);    
   
const method = ref("POST");
const { loading, error, performRequest } = remoteDataAccess(url, auth, method, formData);

const onFormSubmit = async() => {
    const result = await v$.value.$validate();
    if (result) {
        await performRequest();
        if (error.value == false) {
            alert("Η αίτηση σας καταχωρήθηκε με επιτυχία!");

            router.push({ name: 'farmer-application' });
        }
    }
};
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
                        <RouterLink :to=" { name: 'submission_menu', query: { service: 'farmer' } } " class="breadcrumb-link"> Υπηρεσίες </RouterLink>
                    </div>
                    <div class="breadcrumb-column">
                        <div>></div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current">Υποβολή αίτησης καλλιέργειας</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <b-overlay :show="loading" opacity="0.6" spinner-large>
                    <div class="my-card">
                        <div class="my-card-inner">
                            <h2>Κάνε την αίτηση σου τώρα</h2>
                            <p class="my-card-text">Υπέβαλλε την αίτηση σου με τα στοιχεία που χρειάζονται για την υποβολή της</p>

                            <div v-if="error" class="row mb-3">
                                <div class="alert alert-danger" role="alert" >                        
                                    <p>Κάτι πήγε στραβά. Προσπαθήστε ξανά αργότερα!</p>
                                </div>
                            </div>

                            <form class="my-form">
                                <div class="my-form-group">
                                    <span class="my-form-span">στρέμματα</span>
                                    <input 
                                        v-model="formData.fieldArea"
                                        type="text" 
                                        class="my-form-input" 
                                        id="fieldArea"
                                        maxLength="5"
                                        @input="formatIntegerInput"
                                    />
                                    <label :class="{ 'on-text': formData.fieldArea }" class="my-form-label" for="fieldArea">Έκταση αγροτεμαχίου</label>
                                    <div v-for="error in v$.fieldArea.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
                                </div>

                                <div class="my-form-group">
                                    <span class="my-form-span">κιλά</span>
                                    <input 
                                        v-model="formData.averageProduction"
                                        type="text" 
                                        class="my-form-input" 
                                        id="averageProduction"
                                        maxLength="7"
                                        @input=""
                                    />
                                    <label :class="{ 'on-text': formData.averageProduction }" class="my-form-label" for="averageProduction">Μέση παραγωγή</label>
                                    <div v-for="error in v$.averageProduction.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
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
                                    <div v-for="error in v$.description.$errors" :key="error.$uid" class="text-start error-msg" >{{ error.$message }}</div> 
                                </div>


                                <button @click.prevent="onFormSubmit" type="submit" class="main-btn">
                                    <a class="btn-link">
                                        <span class="btn-text">Υποβολή</span>
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