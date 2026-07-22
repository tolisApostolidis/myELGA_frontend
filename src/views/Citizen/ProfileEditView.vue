<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { remoteDataAccess } from '@/composables/remotaDataAccess.js';
import useVuelidate from '@vuelidate/core';
import { decimal, helpers, minValue, maxValue, minLength } from '@vuelidate/validators';
import { BOverlay} from 'bootstrap-vue-next';
import { formatIntegerNumber } from '@/composables/formatIntegerNumber.js';
import { useApplicationStore } from '@/stores/application.js';


const applicationStore = useApplicationStore();

const { formatIntegerInput } = formatIntegerNumber();

const router = useRouter();

const formData = ref({
    "address": "",
    "phoneNumber": ""
});
const rules = computed(() => {
    return {
        phoneNumber: { 
            decimal: helpers.withMessage("Επιτρέπονται μόνο αριθμοί", decimal),
            minValue: helpers.withMessage("Ο αριθμός δεν είναι ρεαλιστικός", minValue(6900000000)),
            maxValue: helpers.withMessage("Ο αριθμός δεν είναι ρεαλιστικός", maxValue(6999999999)) 
        },
        address: {
            minLength: helpers.withMessage("Η διεύθυνση είναι πολύ μικρή", minLength(3)),
        }
    }
});
const v$ = useVuelidate(rules, formData);

const id = ref(null);
const url = computed(() => {
    return 'http://localhost:8080/services/profile/' + id.value;
});
const method = ref("POST");
const auth = ref(true);

const { loading, error, performRequest } = remoteDataAccess(url, auth, method, formData);

const onFormSubmit = async() => {
    const result = await v$.value.$validate();
    if (!result) {
        return;
    }
    if (formData.value.address == '' && formData.value.phoneNumber == '') {
        return;
    }
    
    await performRequest();
    if (error.value == false) {
        router.push({name : 'profile_details'});
    }
};

onMounted(() => {
    id.value = applicationStore.userData.id;
});
</script>

<template>
    <h2 class="profile-title">Επεξεργασία Προσωπικών Στοιχείων</h2>
    <p>Μπορείτε να επεξεργαστείτε τα στοιχεία σας παρακάτω. Τροποποιήστε όποια πεδία θέλετε και τα υπόλοιπα θα παραμείνουν ως έχουν μετά την υποβολή.</p>
    <p>*Προσοχή: ύστερα από την υποβολή τα προηγούμενα πεδία δεν μπορούν να επαναφερθούν.</p>
    
    <b-overlay :show="loading" opacity="0.6" spinner-large>
        <div class="my-card">
            <div class="my-card-inner">
                <form class="my-form">
                    <div class="my-form-group">
                        <span class="my-form-phone">+30</span>
                        <input 
                            v-model="formData.phoneNumber"
                            type="text" 
                            class="my-form-input" 
                            id="phoneNumber"
                            maxLength="10"
                            @input="formatIntegerInput"                                 
                        />
                        <label :class="{ 'on-text': formData.phoneNumber }" class="my-form-label" for="phoneNumber">Κινητό τηλέφωνο</label>
                        <div v-for="error in v$.phoneNumber.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div> 
                    </div>

                    <div class="my-form-group">
                        <input 
                            v-model="formData.address"
                            type="text" 
                            class="my-form-input" 
                            id="address"
                            maxLength="100"                                 
                        />
                        <label :class="{ 'on-text': formData.address }" class="my-form-label" for="address">
                            Διεύθυνση
                        </label>
                        <div v-for="error in v$.address.$errors" :key="error.$uid" class="error-msg">
                            {{ error.$message }}
                        </div> 
                    </div>

                    <button @click.prevent="onFormSubmit" type="submit" class="main-btn">
                        <a class="btn-link">
                            <span class="btn-text">Αποθήκευση αλλαγών</span>
                        </a>                      
                    </button>
                </form>
            </div>
        </div>  
    </b-overlay>              
</template>