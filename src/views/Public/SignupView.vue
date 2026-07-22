<script setup>
import { ref, computed, reactive } from 'vue'; 
import { useRouter, RouterLink } from 'vue-router';
import { BOverlay } from 'bootstrap-vue-next';
import useVuelidate from '@vuelidate/core';
import { required, email, sameAs, minLength, alpha, decimal, helpers, maxLength, minValue } from '@vuelidate/validators';
import protectDanger from '@/assets/images/password/danger.png';
import protectMedium from '@/assets/images/password/medium.png';
import protectSecure from '@/assets/images/password/secure.png';
import eyeLogo from '@/assets/images/view-application.png';
import invisibleLogo from '@/assets/invisible-24.png';
import { formatIntegerNumber } from '@/composables/formatIntegerNumber.js';


const { formatIntegerInput } = formatIntegerNumber();

const router = useRouter();

const loading = ref(false);

const formData = reactive({
    "username": "",
    "password": "",
    "email": "",
    "confirm": "",
    "firstName": "",
    "lastName": "",
    "address": "",
    "afm": "",
    "phoneNumber": "",
});
const rules = computed(() => {
    return {
        username: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            minLength: helpers.withMessage("Το όνομα χρήστη πρέπει να είναι τουλάχιστον 4 χαρακτήρων", minLength(4))
        },
        password: { required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required) },
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
        address: { required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required) },
        afm: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            decimal: helpers.withMessage("Επιτρέπονται μόνο αριθμοί", decimal),
            minLength: helpers.withMessage("Ο αριθμός δεν είναι ρεαλιστικός", minLength(9))
        },
        phoneNumber: { 
            required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required),
            decimal: helpers.withMessage("Επιτρέπονται μόνο αριθμοί", decimal),
            minValue: helpers.withMessage("Ο αριθμός δεν είναι ρεαλιστικός", minValue(6900000000)),
            maxLength: helpers.withMessage("Ο αριθμός είναι πολύ μεγάλος", maxLength(10))
        }
    }; 
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

const onFormSubmit = async () => {
    const result = await v$.value.$validate();
    
    if (!result) return

    loading.value = true;

    fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
            router.push({ name: 'success-signup' })
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
                        <div class="breadcrumb-current">Εγγραφή</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <b-overlay :show="loading" opacity="0.6" spinner-large>
                    <div class="my-card">
                        <div class="my-card-inner signup">
                            <h2>Κάνε την εγγραφή σου τώρα</h2>
                            <p class="my-card-text">Καταχώρησε τα προσωπικά σου στοιχεία και τα στοιχεία σύνδεσης για να εγγραφείς στην πλατφόρμα</p>

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
                                </div>

                                <div class="my-form-group-row">
                                    <div class="my-form-group">
                                        <input 
                                            v-model="formData.address"
                                            type="text" 
                                            class="my-form-input" 
                                            id="address"
                                            maxLength="50"
                                            @input="toUpper('address')"                                 
                                        />
                                        <label :class="{ 'on-text': formData.address }" class="my-form-label" for="address">Διεύθυνση</label>
                                        <div v-for="error in v$.address.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div> 
                                    </div>
                                    <div class="my-form-group"></div>
                                </div>

                                <button @click.prevent="onFormSubmit" type="submit" class="main-btn">
                                    <a class="btn-link">
                                        <span class="btn-text">Εγγραφή</span>
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