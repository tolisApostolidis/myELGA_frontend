<script setup>
import logo from '@/assets/images/myElgaBanner.png';
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const router = useRouter();
const applicationStore = useApplicationStore();

const loading = ref(false);

const onSignOutSubmit = () => {
    loading.value = true;
    applicationStore.clearUserData();
    setTimeout(function () {}, 2000);
    router.push({ name : 'login'});
    loading.value = false;
}
</script>

<template>
    <header class="header">
        <div class="header-container">
            <a class="header-brand">
                <RouterLink :to="{ name : 'home' }">
                    <img :src="logo" alt="logo" />
                </RouterLink>
            </a>

            <div class="header-buttons-container">
                <template v-if="applicationStore.isAuthenticated === true">
                    <button @click="onSignOutSubmit" class="main-btn offline">
                        <a class="btn-link">
                            <span class="btn-text bold">
                                Έξοδος
                            </span>
                        </a>
                    </button>
                    <div v-if="loading" class="spinner-border" role="status">
                        <span class="visually-hidden">Περιμένετε...</span>
                    </div>
                </template>
                <template v-else>
                    <button @click="onSignOutSubmit" class="main-btn offline">
                        <RouterLink class="btn-link" :to="{ name: 'login' }">
                            <span class="btn-text bold">
                                Είσοδος
                            </span>
                        </RouterLink>
                    </button>
                </template>                
            </div>            
        </div>
    </header>
</template>