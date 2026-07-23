<script setup>
import { computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import useVuelidate from '@vuelidate/core';
import { required, email, sameAs, minLength, alpha, helpers } from '@vuelidate/validators';
import { BOverlay } from 'bootstrap-vue-next';
import protectDanger from '@/assets/images/password/danger.png';
import protectMedium from '@/assets/images/password/medium.png';
import protectSecure from '@/assets/images/password/secure.png';
import invisibleLogo from '@/assets/invisible-24.png';
import eyeLogo from '@/assets/images/view-application.png';
import { formatIntegerNumber } from '@/composables/formatIntegerNumber.js';
import { useApplicationStore } from '@/stores/application.js';


const applicationStorage = useApplicationStore();

const { formatIntegerInput } = formatIntegerNumber();

const router = useRouter();

const formData = reactive({
    "username": "",
    "email": "",
    "password": "",
    "confirm": "",
    "firstName": "",
    "lastName": "",
    "afm": "",
    "jobAddress": ""
});

const rules = computed(() => {
    return {
        username: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required) 
        },
        password: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required) 
        },
        email: {
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            email: helpers.withMessage("Εισάγεται έγκυρη διεύθυνση email", email)
        },
        confirm: { 
            sameAs: helpers.withMessage("Το συνθηματικό δεν ταιριάζει", sameAs(formData.password)),
        },
        firstName: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            alpha: helpers.withMessage("Επιτρέπονται μόνο γράμματα της αλφαβήτου", alpha)
        },
        lastName: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            alpha: helpers.withMessage("Επιτρέπονται μόνο γράμματα της αλφαβήτου", alpha)
        },
        afm: {
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            minLength: helpers.withMessage("Ο αριθμός δεν είναι ρεαλιστικός", minLength(9))
        }, 
        jobAddress: {
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required)
        }
    }
});
const v$ = useVuelidate(rules, formData);


const toUpper = (field) => {
    const val = formData[field];
    formData[field] = (val ?? '').toUpperCase();
}

const showPassword = ref(false);

const passwordLogo = ref(null);
const passwordMessage = ref(null);
const passwordLength = ref(null);

const passwordSecurity = () => {
    passwordLength.value = formData.password.length;
    if (passwordLength.value <= 4) {
        passwordLogo.value = protectDanger;
        passwordMessage.value = "Αδύναμο συνθηματικό";
    }else if (passwordLength.value <= 7) {
        passwordLogo.value = protectMedium;
        passwordMessage.value = "Μέτρια-ασφαλές συνθηματικό";
    }else {
        passwordLogo.value = protectSecure;
        passwordMessage.value = "Ασφαλές συνθηματικό";
    }
};


const loading = ref(false);

const onFormSubmit = async() => {
    const result = await v$.value.$validate();

    if (!result) return

    loading.value = true;

    fetch('/services/manager/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + applicationStorage.userData.accessToken
        },
        body: JSON.stringify(formData)
    })
    .then((response) => {
        return response.json()
        .then((data) => ({ response, data }))
        .catch(() => ({ response, data: null }))
    })
    .then(({ response, data }) => {
        if (response.ok) {
            router.push({ name: 'admin-board'});
            return
        }
    })
    .catch((err) => {
        // network/server down
        console.log(err);
    })
    .finally(() => {
        loading.value = false;
    });  
}
</script>

<template>
    <b-overlay :show="loading" opacity="0.6" spinner-large>
        <div class="my-card">
            <div class="my-card-inner signup">
                <h2>Δημιούργησε έναν διαχειριστή ΕΛ.Γ.Α.</h2>
                <p class="my-card-text">Καταχώρησε τα προσωπικά του στοιχεία και τα στοιχεία σύνδεσης για να εγγραφείς στην πλατφόρμα</p>

                <form class="signup-form">
                    <h4 class="form-category-title">Στοιχεία σύνδεσης</h4>

                    <div class="my-form-group-row">
                        <div class="my-form-group">
                            <input 
                                v-model="formData.username"
                                type="text" 
                                class="my-form-input" 
                                id="username"
                                maxLength="30"                                   
                            />
                            <label :class="{ 'on-text': formData.username }" class="my-form-label" for="username">Όνομα χρήστη</label>
                            <div v-for="error in v$.username.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div> 
                        </div>      
                            
                        <div class="my-form-group">
                            <input 
                                v-model="formData.email"
                                type="text" 
                                class="my-form-input" 
                                id="email"
                                maxLength="50"                                   
                            />
                            <label :class="{ 'on-text': formData.email }" class="my-form-label" for="email">Διεύθυνση e-mail</label>
                            <div v-for="error in v$.email.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>                                         
                        </div>
                    </div>

                    <div class="my-form-group-row">
                        <div class="my-form-group">
                            <input 
                                v-model="formData.password"                                        
                                class="my-form-input" 
                                id="password"
                                maxLength="30"
                                :type="showPassword ? 'text' : 'password'"
                                @input="passwordSecurity()"                                   
                            />
                            <button @click.prevent="showPassword = !showPassword" class="my-form-password-btn">
                                <img :src="showPassword ? invisibleLogo : eyeLogo">
                            </button>                                                                                                    
                            <label :class="{ 'on-text': formData.password }" class="my-form-label" for="password">Κωδικός πρόσβασης</label>
                            <div v-for="error in v$.password.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>                                         
                            <div class="error-msg-password">
                                <img :src="passwordLogo"/> {{ passwordMessage }}
                            </div> 
                        </div>
                        <div class="my-form-group">
                            <input 
                                v-model="formData.confirm"                                        
                                class="my-form-input" 
                                id="confirm"
                                maxLength="30"
                                :type="showPassword ? 'text' : 'password'"                                  
                            />                                                                                                                                         
                            <label :class="{ 'on-text': formData.confirm }" class="my-form-label" for="confirm">Επιβέβαιωση κωδικού πρόσβασης</label>
                            <div v-for="error in v$.confirm.$errors" :key="error.$uid" class="error-msg">
                                {{ error.$message }}
                            </div>
                        </div>
                    </div>     

                    <div class="line-breaker"></div>

                    <h4 class="form-category-title">Προσωπικά στοιχεία</h4>

                    <div class="my-form-group-row">
                        <div class="my-form-group">
                            <input 
                                v-model="formData.firstName"
                                type="text" 
                                class="my-form-input" 
                                id="firstName"
                                maxLength="20"  
                                @input="toUpper('firstName')"                                 
                            />
                            <label :class="{ 'on-text': formData.firstName }" class="my-form-label" for="firstName">Όνομα</label>
                            <div v-for="error in v$.firstName.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div> 
                        </div>      
                            
                        <div class="my-form-group">
                            <input 
                                v-model="formData.lastName"
                                type="text" 
                                class="my-form-input" 
                                id="lastName"
                                maxLength="25"    
                                @input="toUpper('lastName')"                                  
                            />
                            <label :class="{ 'on-text': formData.lastName }" class="my-form-label" for="lastName">Επώνυμο</label>
                            <div v-for="error in v$.lastName.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>                                         
                        </div>
                    </div>

                    <div class="my-form-group-row">
                        <div class="my-form-group">
                            <input 
                                v-model="formData.afm"
                                type="text" 
                                class="my-form-input" 
                                id="afm"
                                maxLength="9"  
                                @input="formatIntegerInput"                                 
                            />
                            <label :class="{ 'on-text': formData.afm }" class="my-form-label" for="afm">Α.Φ.Μ.</label>
                            <div v-for="error in v$.afm.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div> 
                        </div>      
                            
                        <div class="my-form-group">
                            <input 
                                v-model="formData.jobAddress"
                                type="text" 
                                class="my-form-input" 
                                id="jobAddress"
                                maxLength="25"    
                                @input="toUpper('jobAddress')"                                  
                            />
                            <label :class="{ 'on-text': formData.jobAddress }" class="my-form-label" for="jobAddress">Έδρα επιθεωρητή</label>
                            <div v-for="error in v$.jobAddress.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>                                         
                        </div>
                    </div>

                    <button @click.prevent="onFormSubmit" type="submit" class="main-btn">
                        <a class="btn-link">
                            <span class="btn-text">Δημιουργία διαχειριστή</span>
                        </a>            
                    </button> 
                </form>
            </div>
        </div>
    </b-overlay>
</template>