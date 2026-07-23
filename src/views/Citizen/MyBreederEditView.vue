<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { remoteDataAccess } from '@/composables/remotaDataAccess';
import useVuelidate from '@vuelidate/core';
import { minValue, helpers, maxValue } from '@vuelidate/validators';
import { BOverlay } from 'bootstrap-vue-next';
import { formatFloatNumber } from '@/composables/formatFloatNumber.js';
import { formatIntegerNumber } from '@/composables/formatIntegerNumber.js';
import { useApplicationStore } from '@/stores/application.js';


const applicationStore = useApplicationStore();

const { formatFloatNumberInput } = formatFloatNumber();
const { formatIntegerInput } = formatIntegerNumber();


const route = useRoute();
const router = useRouter();

const formData = ref({
    "killedAnimals": "",
    "totalAnimals": "",
    "pricePerUnit": ""
});
const rules = computed(() => {
    return {
        killedAnimals: { 
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(1)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(20000))
        },
        totalAnimals: { 
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(0.01)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(20000))
        },
        pricePerUnit: {
            minValue: helpers.withMessage("Η τιμή πρέπει να είναι θετική", minValue(0.01)),
            maxValue: helpers.withMessage("Η τιμή είναι πολύ μεγάλη", maxValue(99999.99))
        }
    }; 
});
const v$ = useVuelidate(rules, formData);

const id = ref(null);
const breederId = ref(null);
const url = computed(() => {
    return '/services/breeder/' + breederId.value;
});
const auth = ref(true);
const method = ref("POST");
const { loading, error, performRequest } = remoteDataAccess(url, auth, method, formData);

const onFormSubmit = async() => {
    const result = await v$.value.$validate();
    if (result) {
        console.log(formData);
        await performRequest();
        if (error.value == false) {
            alert("Η αίτηση σας ενημερώθηκε με επιτυχία!");

            router.push({ name: 'my_submissions', params: { id: id.value } });
        }
    }
}
onMounted(() => {
    id.value = applicationStore.userData.id;
    breederId.value = route.params.breederId;
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
                        <div class="breadcrumb-current"> Επεξεργασία κτηνοτροφικής αίτησης: {{ breederId }}</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <b-overlay :show="loading" opacity="0.6" spinner-large>
                    <div class="my-card">
                        <div class="my-card-inner">
                            <h2 class="my-form-title">Επεξεργάσου την αίτηση <span class="bold">{{ breederId }}</span> σου τώρα</h2>
                            <p>Μπορεις να αλλάξεις τα παρακάτω πεδία της αίτησης σου</p>
                            <p class="my-form-text"><b>Προσοχή!</b> Πατώντας το κουμπί οι τρέχουσες αλλαγές θα εφαρμοστούν και δεν θα υπάρχουν πλέον οι τιμές της προηγούμενης υποβολής.</p>

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
                                    <span class="my-form-span">€ (ευρώ)</span>
                                    <input 
                                        v-model="formData.pricePerUnit"
                                        type="text" 
                                        class="my-form-input" 
                                        id="pricePerUnit"
                                        maxlength="8"
                                        @input="formatFloatNumberInput"
                                    />
                                    <label :class="{ 'on-text': formData.pricePerUnit }" class="my-form-label" for="pricePerUnit">Τιμή ανά μονάδα προϊόντος</label>
                                    <div v-for="error in v$.pricePerUnit.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
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