<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, minValue, maxValue, helpers } from '@vuelidate/validators';
import { BOverlay } from 'bootstrap-vue-next';
import { remoteDataAccess } from '@/composables/remotaDataAccess.js';
import { formatPercentage } from '@/composables/formatPercentage.js'
import { formatFloatNumber } from '@/composables/formatFloatNumber.js';

const { formatPercentageInput } = formatPercentage();
const { formatFloatNumberInput } = formatFloatNumber();

const route = useRoute();
const router = useRouter();


const formData = ref({
    "damagePercentage": "",
    "compensationFactor": "",
    "residualValue": "",
    "state": "ACCEPTED"
});
const rules = computed(() => {
    return {
        damagePercentage: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(0.01)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(100))  
        },
        compensationFactor: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(0.01)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(100))
        },
        residualValue: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(99999.99))
        },
        state: { required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required)}
    };
});
const v$ = useVuelidate(rules, formData);


const stateSelection = ref(null);
const overlayRef = ref(null);

const stateSelectionChange = (value) => {
    if (value == 'ACCEPTED') {
        // Move overlay
        overlayRef.value.style.transform = 'translateX(0)';

        stateSelection.value = false;
        formData.value.state = 'ACCEPTED';
    }else if (value == 'REJECTED') {
        // Move overlay
        overlayRef.value.style.transform = 'translateX(100%)';

        // Clear inputs possibly filled
        formData.value.damagePercentage = ""; 
        formData.value.compensationFactor = "";
        formData.value.compensationFactor = "";

        stateSelection.value = true;
        formData.value.state = 'REJECTED';
    }   
}

const applicationId = ref(null);
const auth = ref(true);
const url = computed(() => {
    return 'http://localhost:8080/services/manager/' + applicationId.value + '/breeder';
});
const method = ref("POST");
const { loading, error, performRequest } = remoteDataAccess(url, auth, method, formData);

const onFormSubmit = async() => {
    if (formData.value.state == 'REJECTED') {
        formData.value.compensationFactor = "";
        formData.value.damagePercentage = "";
        formData.value.residualValue = "";
        await performRequest();
        if (error.value == false) {
            router.push({ name: 'manager-applications'});
        }
    }else {
        const result = await v$.value.$validate();
        if (result) {
            await performRequest();
            if (error.value == false) {
                router.push({ name: 'manager-applications'});
            }
        }
    }
}
onMounted(() => {
    applicationId.value = route.params.breederId;
});
</script>

<template>
    <b-overlay :show="loading" opacity="0.6" spinner-large>
        <div class="my-card">
            <div class="my-card-inner">
                <h2>Επεξεργάσου την αίτηση τώρα</h2>
                <p class="login-text">Πρόσθεσε τιμές στα πεδία σύμφωνα με τις παρατηρήσεις που έκανες</p>

                <div v-if="error" class="row mb-3">
                    <div class="alert alert-danger" role="alert" >                        
                        <p>Κάτι πήγε στραβά. Προσπαθήστε ξανά αργότερα!</p>
                    </div>
                </div>

                <div class="applications-edit-radio-btn-container">
                    <button :class="{ active: formData.state === 'ACCEPTED' }" class="applications-edit-radio-btn" @click="stateSelectionChange('ACCEPTED')">ΕΓΚΡΙΣΗ</button>
                    <button :class="{ active: formData.state === 'REJECTED' }" class="applications-edit-radio-btn" @click="stateSelectionChange('REJECTED')">ΑΠΟΡΡΙΨΗ</button>
                    <div ref="overlayRef" class="applications-edit-radio-btn-overlay"></div>
                </div>

                <form class="my-form">
                    <div class="my-form-group">
                        <span class="my-form-span">%</span>
                        <input 
                            v-model="formData.damagePercentage"
                            type="text" 
                            class="my-form-input" 
                            id="damagePercentage"
                            maxLength="5"
                            @input="formatPercentageInput"
                        />
                        <label :class="{ 'on-text': formData.damagePercentage }" class="my-form-label" for="damagePercentage">Ποσοστό κάλυψης ζημιών</label>
                        <div v-for="error in v$.damagePercentage.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
                    </div>

                    <div class="my-form-group">
                        <span class="my-form-span">%</span>
                        <input 
                            v-model="formData.compensationFactor"
                            type="text" 
                            class="my-form-input" 
                            id="compensationFactor"
                            maxLength="5"
                            @input="formatPercentageInput"
                        />
                        <label :class="{ 'on-text': formData.compensationFactor }" class="my-form-label" for="compensationFactor">Συντελεστής αποζημίωσης</label>
                        <div v-for="error in v$.compensationFactor.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
                    </div>

                    <div class="my-form-group">
                        <span class="my-form-span">€ (ευρώ)</span>
                        <input 
                            v-model="formData.residualValue"
                            type="text" 
                            class="my-form-input" 
                            id="residualValue"
                            maxLength="8"
                            @input="formatFloatNumberInput"
                        />
                        <label :class="{ 'on-text': formData.residualValue }" class="my-form-label" for="residualValue">Υπολειμματική αξία</label>
                        <div v-for="error in v$.residualValue.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
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
</template>