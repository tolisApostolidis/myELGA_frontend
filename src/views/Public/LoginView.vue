<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { BOverlay} from 'bootstrap-vue-next';
import eyeLogo from '@/assets/images/view-application.png';
import invisibleLogo from '@/assets/invisible-24.png';


const { setUserData, persistUserData, isAuthenticated } = useApplicationStore();
const router = useRouter();


const credentials = ref({
    username: '',
    password: ''
});
const rules = computed(() => {
    return {
        username: { required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required) }, 
        password: { required: helpers.withMessage("Το πεδίο είναι υποχρεωτικό", required) }
    }
});
const v$ = useVuelidate(rules, credentials);

const showPassword = ref(false);
const toggleShowPassword = () => {
    if (showPassword.value == true) {
        showPassword.value = false;
    }else {
        showPassword.value = true;
    }
}

const loading = ref(false);
const authenticationFailed = ref(null);

const onFormSubmit = async() => {
    const result = await v$.value.$validate();
    if(!result) {
        return;
    }
    loading.value = true;
    authenticationFailed.value = false;

    fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials.value)
    })
    .then((response) => {
        if (response.ok) {
            response.json().then((data) => {
                setUserData(data);
                persistUserData();
                router.push({ name: 'home'});
            })
        } else {
            authenticationFailed.value = true;
        }
    })
    .catch((error) => {
        console.warn(error);
        authenticationFailed.value = true;
    })
    .finally(() => {
        loading.value = false;
    });
};

onBeforeMount(() => {
    if (isAuthenticated === true) {
        router.push( {name: 'home'} );
    }
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
                        <div class="breadcrumb-current">Είσοδος</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <b-overlay :show="loading" opacity="0.6" spinner-large>
                    <div class="my-card">
                        <div class="my-card-inner">
                            <h2>Συνδέσου στο λογαριασμό σου</h2>
                            <p class="my-card-text">Καταχώρησε τα προσωπικά σου στοιχεία για να πραγματοποιήσεις σύνδεση στο λογαριασμό σου</p>

                            <div v-if="authenticationFailed">
                                <div class="alert alert-danger" role="alert">
                                    <p>Αποτυχία σύνδεσης!</p>
                                </div>
                            </div>
                            
                            <form class="my-form" @submit.prevent="onFormSubmit">
                                <div class="my-form-group">
                                    <input 
                                        v-model="credentials.username"
                                        type="text" 
                                        class="my-form-input" 
                                        id="username"
                                        maxLength="30"
                                    />
                                    <label :class="{ 'on-text': credentials.username }" class="my-form-label" for="username">Όνομα χρήστη</label>
                                    <div v-for="error in v$.username.$errors" :key="error.$uid" class="error-msg" >{{ error.$message }}</div>     
                                </div>

                                <div class="my-form-group">
                                    <input 
                                        v-model="credentials.password"
                                        class="my-form-input" name="password" 
                                        id="password"
                                        maxLength="30"
                                        :type="showPassword ? 'text' : 'password'"
                                    />
                                    <button @click.prevent="toggleShowPassword" type="button" class="my-form-password-btn">
                                        <img :src="showPassword ? invisibleLogo : eyeLogo">
                                    </button>                                               
                                    <label :class="{ 'on-text': credentials.password }" class="my-form-label" for="password">Κωδικός πρόσβασης</label>
                                    <div v-for="error in v$.password.$errors" :key="error.$uid" class="text-start error-msg">{{ error.$message }}</div>     
                                </div>

                                <button @click.prevent="onFormSubmit" type="submit" class="main-btn">
                                    <a class="btn-link">
                                        <span class="btn-text">Είσοδος</span>
                                    </a>            
                                </button>
                            </form>

                            <div class="login-forgot-password-wrap">
                                <RouterLink :to="{ name : 'forgot-password' }">Ξέχασες τον κωδικό πρόσβασης;</RouterLink>
                            </div>

                            <div class="line-breaker"></div>

                            <div class="flex-column">
                                <button class="main-btn offline">
                                    <RouterLink :to=" { name: 'signup' } " class="btn-link">
                                        <span class="btn-text bold">Εγγραφή</span>
                                    </RouterLink>                                        
                                </button>
                            </div>
                        </div>        
                    </div>
                </b-overlay>
            </section>
        </div>
    </main>
</template>