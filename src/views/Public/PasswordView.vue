<script setup>
import { ref, computed, reactive } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { BOverlay } from 'bootstrap-vue-next';
import useVuelidate from '@vuelidate/core';
import { required, helpers, email } from '@vuelidate/validators';
import { useApplicationStore } from '@/stores/application';

const router = useRouter();

const phoneNumber = ref(null);

const formData = ref({
    "email": "",
    "phoneNumber": ""
});
const rules = computed(() => {
    return {
        email: { 
            required: helpers.withMessage("Παρακαλώ εισάγεται το email σας", required),
            email: helpers.withMessage("Eισάγεται ρεαλιστική διεύθυνση email", email)
        }
    }
});
const v$ = useVuelidate(rules, formData);

const loading = ref(null);
const error = ref(false);
const emailNotExists = ref(null);
const isDisabled = computed(() => {
    return emailNotExists.value === true ? true : false;
});

const onFormSubmit = async() => {
    const result = await v$.value.$validate();
    
    if (!result) {
        loading.value = false;
        return;
    }

    loading.value = true;
    emailNotExists.value = false;
    error.value = false;

    const url = 'http://localhost:8080/api/auth/' + formData.value.email;
    // Then fetch
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    phoneNumber.value = data;
                    formData.value.phoneNumber = phoneNumber.value.phoneNumber;
                    console.log(formData.value)
                    //// fetch gia na steilei sms kai an ola kala kane redirect gia post to password ////
                    fetch('http://localhost:8080/api/auth/sendOtp', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData.value)
                    })
                    .then((response) => {
                        if (response.ok) {
                            const { setVerifiedEmail, persistVerifiedEmail } = useApplicationStore();
                            //setVerifiedEmail(formData.value.email);
                            //persistVerifiedEmail();
                            router.push({ name: 'verification', params: { email: formData.value.email, phoneNumber: phoneNumber.value.phoneNumber }});
                        }else {
                            loading.value = false;
                            error.value = true;
                        }
                    })
                    .catch((err) => {
                        loading.value = false;
                        error.value = true;
                        console.log("error => " + err);
                    });

                    //router.push({ name : 'change-password', params: { email: formData.value.email } });
                });
            }else {
                emailNotExists.value = true;
                loading.value = false;
            }
        })
        .catch((err) => {
            console.log("error => " + err);
            error.value = true;
            emailNotExists.value = true;
            loading.value = false;
        })
}
</script>

<template>
    <main>
        <div class="container-fluid d-flex flex-column">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <b-overlay :show="loading">
                        <div class="card mt-5">
                            <div class="card-body">
                                <h2 class="display-6 mb-3">Αναζήτηση λογαριασμού</h2>
                                <hr />
                                <p class="lead">Εισάγεται τη διεύθυνση email του προφίλ σας, για την οποία ξεχάσατε το συνθηματικό. Πατώντας το κουμπί αναζήτησης
                                            θα σας σταλεί ένα μήνυμα κωδικού στο κινητό τηλέφωνο και αφού γίνει η ταυτοποίηση θα ανακατευθυνθείτε στη σελίδα για να 
                                            αλλάξετε τον κωδικό σας.
                                </p>
                                
                                <div v-if="emailNotExists === true" class="row mb-3">
                                    <div class="alert alert-danger" role="alert">
                                        Η διεύθυνση email δεν αντιστοιχεί σε κανέναν!
                                    </div>
                                </div>   
                                <div v-if="error === true" class="row mb-3">
                                    <div class="alert alert-danger" role="alert">
                                        Αδυναμία σύνδεσης. Προσπαθήστε αργότερα!
                                    </div>
                                </div>  
                                
                                <form>
                                    <div class="col-5 mx-auto">
                                        <label for="email" class="col-6 col-form-label col-form-label-lg">Διεύθυνση email</label>
                                        <input
                                            v-model="formData.email"
                                            class="form-control form-control-lg"
                                            type="text"
                                            id="email"
                                        />
                                        <div v-for="error in v$.email.$errors" :key="error.$uid" class="text-start error-msg">{{ error.$message }}</div>
                                    </div>                                            

                                    <div class="d-flex col-7 mx-auto mt-4 justify-content-around">
                                        <RouterLink :to="{ name: 'login' }" class="btn btn-outline-blue btn-lg">Ακύρωση</RouterLink>                                        
                                        <button
                                            @click="onFormSubmit"
                                            type="button"
                                            class="btn btn-blue btn-lg">
                                            Αναζήτηση
                                        </button>
                                    </div>
                                </form>                        
                            </div>
                        </div>
                    </b-overlay>
                </div>
            </div>
        </div>
    </main>
</template>