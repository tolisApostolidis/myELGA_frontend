<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { BOverlay } from 'bootstrap-vue-next';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { useApplicationStore } from '@/stores/application';


const { setVerifiedEmail, persistUserData } = useApplicationStore();

const route = useRoute();
const router = useRouter();

const phoneNumber = ref(null);
const email = ref(null);

const formData = ref({
    "code": ""
});
const rules = computed(() => {
    return {
        code: { required: helpers.withMessage("Παρακαλώ εισάγεται το κωδικό επαλήθευσης", required)}
    }
});
const v$ = useVuelidate(rules, formData);

const loading = ref(null);
const error = ref(false);

const onFormSubmit = async() => {
    const result = await v$.value.$validate();

    if (!result) {
        loading.value = false;
        return;
    }

    loading.value = true;
    
    const validateOtpData = {
        "phoneNumber": phoneNumber.value,
        "verificationCode": formData.value.code
    }
    console.log(validateOtpData)

     fetch('http://localhost:8080/api/auth/validateOtp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validateOtpData)
    })
    .then((response) => {
        if (response.ok) {
            setVerifiedEmail(email.value);
            persistUserData();
            //redirect password change
            router.push({ name: 'change-password' });    
        }else {
            error.value = true;
            loading.value = false;
        }
    })
    .catch((err) => {
        console.log("error => " + err);
        error.value = true;
        loading.value = false;
    });
}

onMounted(() => {
    phoneNumber.value = route.params.phoneNumber;
    email.value = route.params.email;
});
</script>

<template>
    <main>
        <div class="container-fluid d-flex flex-column">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <b-overlay :show="loading">
                        <div class="card mt-5">
                            <div class="card-body">
                                <h2 class="display-6"><b>Επαλήθευση ταυτότητας</b></h2>
                                <hr />
                                <p class="lead">Εισάγεται τον κωδικό επαλήθευσης που σας στάλθηκε παρακάτω.</p>

                                <div class="row mb-3" v-if="error">
                                    <div class="alert alert-danger" role="alert">
                                        Αποτυχία επαλήθευσης! Ο κωδικός που πληκτρολογήσατε είναι λάθος.
                                    </div>
                                </div>  

                                <form>
                                    <div class="col-5 mx-auto">
                                        <label for="code" class="col-6 col-form-label col-form-label-lg">Κωδικός</label>
                                        <input
                                            v-model="formData.code"
                                            class="form-control form-control-lg"
                                            type="text"
                                            id="code"
                                        />   
                                        <div v-for="error in v$.code.$errors" :key="error.$uid" class="text-start error-msg">{{ error.$message }}</div>                                 
                                    </div>

                                    <div class="d-grid col-lg-2 mx-auto mt-4">                                                                         
                                        <button
                                            @click="onFormSubmit"
                                            type="button"
                                            class="btn btn-outline-blue btn-lg">
                                            Υποβολή
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