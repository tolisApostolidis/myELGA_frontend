<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { remoteDataAccess } from '@/composables/remotaDataAccess';
import { useApplicationStore } from '@/stores/application.js';
import useVuelidate from '@vuelidate/core';
import { required, minValue, maxValue, integer, helpers } from '@vuelidate/validators';
import { BOverlay } from 'bootstrap-vue-next';
import { useRouter } from 'vue-router';
import { formatFloatNumber } from '@/composables/formatFloatNumber.js';
import { formatIntegerNumber } from '@/composables/formatIntegerNumber';

const { formatFloatNumberInput } = formatFloatNumber();
const { formatIntegerInput } = formatIntegerNumber();

const router = useRouter();

const applicationStorage = useApplicationStore();

const formData = ref({
    "killedAnimals": "",
    "totalAnimals": "",
    "pricePerUnit": ""
});
const rules = computed(() => {
    return {
        killedAnimals: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(1)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(20000)),
            integer: helpers.withMessage("Η τιμή πρέπει να είναι ακέραιος", integer)
        },
        totalAnimals: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(1)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(20000)),
            integer: helpers.withMessage("Η τιμή πρέπει να είναι ακέραιος", integer)
        },
        pricePerUnit: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(0.01)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(99999.99))
        }
    }; 
});
const v$ = useVuelidate(rules, formData);

const auth = ref(true);
const url = ref('http://localhost:8080/services/breeder/new/' + applicationStorage.userData.id);    
const method = ref("POST");

const { loading, error, performRequest } = remoteDataAccess(url, auth, method, formData);

const onFormSubmit = async() => {
    const result = await v$.value.$validate();
    if (result) {
        await performRequest();
        if (error.value == false) {
            alert("Η αίτηση σας καταχωρήθηκε με επιτυχία!");

            router.push({ name: 'breeder-application' });
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
                        <RouterLink :to=" { name: 'submission_menu', query: { service: 'breeder' } } " class="breadcrumb-link"> Υπηρεσίες </RouterLink>
                    </div>
                    <div class="breadcrumb-column">
                        <div>></div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current">Υποβολή αίτησης κτηνοτροφίας</div>
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
                                    <span class="my-form-span">μονάδες</span>
                                    <input 
                                        v-model="formData.killedAnimals"
                                        type="text" 
                                        class="my-form-input" 
                                        id="killedAnimals"
                                        maxLength="5"
                                        @input="formatIntegerInput"
                                    />
                                    <label :class="{ 'on-text': formData.killedAnimals }" class="my-form-label" for="killedAnimals">Αριθμός ζημιωθέντων ζώων</label>
                                    <div v-for="error in v$.killedAnimals.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
                                </div>

                                <div class="my-form-group">
                                    <span class="my-form-span">μονάδες</span>
                                    <input 
                                        v-model="formData.totalAnimals"
                                        type="text" 
                                        class="my-form-input" 
                                        id="totalAnimals"
                                        maxLength="5"
                                        @input="formatIntegerInput"
                                    />
                                    <label :class="{ 'on-text': formData.totalAnimals }" class="my-form-label" for="totalAnimals">Συνολικός αριθμός ζώων</label>
                                    <div v-for="error in v$.totalAnimals.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
                                </div>

                                <div class="my-form-group">
                                    <span class="my-form-span">μονάδες</span>
                                    <input 
                                        v-model="formData.pricePerUnit"
                                        type="text" 
                                        class="my-form-input" 
                                        id="pricePerUnit"
                                        maxLength="8"
                                        @input="formatFloatNumberInput"
                                    />
                                    <label :class="{ 'on-text': formData.pricePerUnit }" class="my-form-label" for="pricePerUnit">Τιμή ανά μονάδα προϊόντος</label>
                                    <div v-for="error in v$.pricePerUnit.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
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