<script setup>
import { useApplicationStore } from '@/stores/application.js';

const applicationStore = useApplicationStore();
</script>

<template>
    <main>
        <div class="breadcrumb-container">
            <div class="breadcrumb-container-inner">
                <div class="breadcrumb-row">
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current">Αρχική (Διαχειριστικό περιβάλλον)</div>
                    </div>
                </div>
            </div>
        </div>  

        <div class="page">
            <section>
                <h1 class="section-title middle">Καλώς ήρθες στο <span class="bold">διαχειριστικό περιβάλλον</span> του myΕΛ.Γ.Α.</h1>
                <div class="dashboard-container">
                    <div class="my-card dashboard">
                        <h2>Όλες οι υπηρεσίες</h2>
                        <p class="my-card-text">Δες όλες τις παρεχόμενες υπηρεσίες οργανωμένες σε ένα σημείο</p>

                        <button class="main-btn">
                            <RouterLink :to="{ name: 'manager-profile', query: { id: applicationStore.userData.id } }" class="btn-link">
                                <span class="btn-text">Υπηρεσίες</span>
                            </RouterLink>
                        </button>
                    </div>
                    <div class="my-card dashboard">
                        <h2>Το Προφίλ μου</h2>
                        <p class="my-card-text">Δες το προφίλ σου και τα προσωπικά σου στοιχεία</p>

                        <button class="main-btn">
                            <RouterLink :to="{ name: 'manager-profile', query: { id: applicationStore.userData.id } }" class="btn-link">
                                <span class="btn-text">Το Προφίλ μου</span>
                            </RouterLink>
                        </button>
                    </div>
                </div>

                <div class="dashboard-container">
                    <div class="my-card dashboard">
                        <h2>Προβολή αιτήσεων</h2>
                        <p class="my-card-text">Δες όλες τις αιτήσεις των πολιτών και επεξεργάσου τις.</p>

                        <button class="main-btn">
                            <RouterLink :to="{ name: 'manager-applications' }" class="btn-link">
                                <span class="btn-text">Προβολή αιτήσεων</span>
                            </RouterLink>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>