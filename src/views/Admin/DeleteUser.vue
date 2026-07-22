<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { BOverlay } from 'bootstrap-vue-next';
import { remoteDataAccess } from '@/composables/remotaDataAccess';
import useVuelidate from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';

const router = useRouter();

const formData = ref({
    "email": ""
});
const rules = computed(() => {
    return {
        email: {
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            email: helpers.withMessage("Εισάγεται έγκυρη διεύθυνση email", email)
        }
    }
})
const v$ = useVuelidate(rules, formData);


const method = ref('DELETE');
const auth = ref(true);
const url = computed(() => {
    return 'http://localhost:8080/api/auth/' + formData.value.email;
});
const { loading, error, performRequest } = remoteDataAccess(url, auth, method);

const onFormSubmit = async() => {
    const result = await v$.value.$validate();
    if (!result) {
        return;
    }

    performRequest();
    
    if (error.value == false) {
        router.push({ name: 'admin-board' });
    }
}
</script>

<template>
    <div class="my-card">
        <div class="my-card-inner">
            <b-overlay :show="loading" opacity="0.6" spinner-large>
                <h2 class="my-form-title">Διαγραφή χρήστη</h2>
                <p class="my-form-text">Πληκτρολόγησε το e-mail του χρήστη που θες για να τον διαγράψεις</p>

                <div v-if="error" class="row">
                    <div class="alert alert-danger" role="alert">
                        <p>Δυστυχώς κάτι πήγε στραβά. Προσπαθήστε ξανά αργότερα!</p>
                    </div>
                </div>

                <form class="my-form">
                    <div class="my-form-group">
                        <input 
                            v-model="formData.email"
                            type="text" 
                            class="my-form-input" 
                            id="email"
                            maxLength="100"                                 
                        />
                        <label :class="{ 'on-text': formData.email }" class="my-form-label" for="email">
                            Διεύθυνση e-mail
                        </label>
                        <div v-for="error in v$.email.$errors" :key="error.$uid" class="error-msg">
                            {{ error.$message }}
                        </div> 
                    </div>

                    <button @click.prevent="onFormSubmit()" type="submit" class="main-btn">
                        <a class="btn-link">
                            <span class="btn-text">
                                Διαγραφή
                            </span>
                        </a>
                    </button>
                </form>
            </b-overlay>
        </div>
    </div>        
</template>