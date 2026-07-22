<script setup>
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const router = useRouter();
const applicationStore = useApplicationStore();

onMounted(() => {
    console.log("checking for redirection");
    if (applicationStore.isAuthenticated && applicationStore.userData.roles == 'ROLE_ADMIN') {
        console.log("redirecting to admin dashboard");
        router.push({ name: 'admin-board'});
    } else if (applicationStore.isAuthenticated && applicationStore.userData.roles == 'ROLE_MANAGER') {
        console.log("redirecting to manager dashboard");
        router.push({ name: 'manager-dashboard'});
    }
})
</script>

<template>
    <main>
        <div class="breadcrumb-container">
            <div class="breadcrumb-container-inner">
                <div class="breadcrumb-row">
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current">Αρχική</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section class="hero-section">
                <div class="hero-text-container">
                    <div class="hero-title">
                        <h1>Καλώς ορίσατε στο <span class="bold">myΕΛ.Γ.Α.</span>,</h1>
                        <h2>τη πλατφόρμα ηλεκτρονικής διαχείρισης αγροτικών αποζημιώσεων</h2>
                    </div>
                </div>
                <p class="hero-text">
                    Η πλατφόρμα δημιουργήθηκε το 2024 για ακαδημαϊκό σκοπό και αποτελεί ένα πλήρως λειτουργικό πληροφοριακό σύστημα διαχείρισης αιτήσεων. Στόχος της είναι η απλοποίηση και ο 
                    εκσυγχρονισμός της διαδικασίας υποβολής και επεξεργασίας αιτημάτων που σχετίζονται με τον ΕΛ.Γ.Α.
                </p>
                <p class="hero-text">
                    Οι πολίτες έχουν τη δυνατότητα να δημιουργήσουν τον προσωπικό τους λογαριασμό, να διατηρούν οργανωμένο το προφίλ τους με τα απαραίτητα στοιχεία και να υποβάλλουν αιτήσεις μέσα 
                    από ένα σύγχρονο και εύχρηστο περιβάλλον. Παράλληλα, μπορούν να παρακολουθούν το ιστορικό των αιτήσεών τους και την πορεία επεξεργασίας τους.
                </p>
                <div class="hero-buttons-container">
                    <div v-if="applicationStore.isAuthenticated === false" class="">
                        <button class="main-btn">
                            <RouterLink :to="{ name : 'login' }" class="btn-link">
                                <span class="btn-text">Είσοδος στην υπηρεσία</span>
                            </RouterLink>
                        </button>
                        
                    </div>
                    <div v-else class="">
                        <button class="main-btn">
                            <RouterLink :to="{ name : 'home' }" class="btn-link">
                                <span class="btn-text">Είσοδος στην υπηρεσία</span>
                            </RouterLink>
                        </button>
                    </div>
                    <div class="">
                        <button class="main-btn offline">
                            <RouterLink :to="{ name : 'signup' }" class="btn-link">
                                <span class="btn-text bold">
                                    Εγγραφή
                                </span>
                            </RouterLink>
                        </button>
                    </div>
                </div>
            </section>

            <section class="home-cards-container">
                <h2 class="section-title middle">Δες μία σύνοψη των παροχών μας</h2>
                <div class="home-cards-wrapper">

                    <div class="home-card">
                        <h3 class="home-card-title">Οι Υπηρεσίες μας</h3>
                        <p class="home-card-text">Ξεκίνα κάνοντας μία νέα αίτηση από αυτές που είναι διαθέσιμες</p>
                        <button class="main-btn home-card-btn offline">
                            <RouterLink :to="{ name : 'farmer-application' }" class="btn-link">
                                <span class="btn-text bold">
                                    Υπηρεσίες
                                </span> 
                            </RouterLink>
                        </button>
                    </div>

                    <div class="home-card middle">
                        <h3 class="home-card-title">Το Προφίλ μου</h3>
                        <p class="home-card-text">Δες και επεξεργάσου το Προφίλ σου και τα στοιχεία του</p>
                        <template v-if="applicationStore.isAuthenticated === true">
                            <button class="main-btn offline home-card-btn middle">                             
                                <RouterLink :to="{ name: 'profile_details', params: { id: applicationStore.userData.id } }" class="btn-link">
                                    <span class="btn-text bold">
                                        Το Προφίλ μου
                                    </span>
                                </RouterLink>
                            </button>
                        </template>
                        <template v-else>
                            <button class="main-btn offline home-card-btn">                             
                                <RouterLink :to="{ name: 'login'}" class="btn-link">
                                    <span class="btn-text bold">
                                        Το Προφίλ μου
                                    </span>
                                </RouterLink>
                            </button>
                        </template>
                    </div>
                    <div class="home-card">
                        <h3 class="home-card-title">Οι Αιτήσεις μου</h3>
                        <p class="home-card-text">Παρακολούθησε τις αιτήσεις σου και δες ενημερώσεις</p>
                        <template v-if="applicationStore.isAuthenticated === true">
                            <button class="main-btn home-card-btn offline">
                                <RouterLink :to="{ name: 'my_submissions', params: {id: applicationStore.userData.id } }" class="btn-link">
                                    <span class="btn-text bold">
                                        Οι Αιτήσεις μου
                                    </span>
                                </RouterLink>
                            </button>
                        </template>
                        <template v-else>
                            <button class="main-btn home-card-btn">                             
                                <RouterLink :to="{ name: 'login'}" class="btn-link">
                                    <span class="btn-text bold">
                                        Οι Αιτήσεις μου
                                    </span>
                                </RouterLink>
                            </button>
                        </template>
                    </div>
                </div>
            </section>

            <section>
                <div class="section-title-container">
                    <h2 class="section-title">Υπηρεσίες</h2>
                    <RouterLink :to="{ name: 'farmer-application' }">Δες όλες τις υπηρεσίες</RouterLink>
                </div>    
                <div class="home-services-container">
                    <div class="home-services-link-wrap">
                        <a class="home-services-link">
                            <RouterLink :to="{ name : 'farmer-application' }" class="">Αίτηση καλλιέργειας</RouterLink>
                        </a>
                        <p>Υποβολή αίτησης αποζημίωσης για απώλειες ζωικού κεφαλαίου ή ζημιές σε κτηνοτροφικές εγκαταστάσεις.</p>
                    </div>   
                    <div class="home-services-link-wrap">
                        <a class="home-services-link">
                            <RouterLink :to="{ name : 'breeder-application' }" class="">Αίτηση κτηνοτροφίας</RouterLink>
                        </a>
                        <p>Υποβολή αίτησης αποζημίωσης για ζημιές σε καλλιέργειες λόγω φυσικών φαινομένων ή άλλων έκτακτων περιστατικών.</p>
                    </div>                                 
                </div>
            </section>
        </div>  
    </main>
</template>