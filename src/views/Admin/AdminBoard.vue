<script setup>
import { RouterLink } from 'vue-router';

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
                            <RouterLink :to="{ name: 'delete-user' }" class="btn-link">
                                <span class="btn-text">Υπηρεσίες</span>
                            </RouterLink>
                        </button>
                    </div>
                    <div class="my-card dashboard">
                        <h2>Διαγραφή χρήστη</h2>
                        <p class="my-card-text">Διέγραψε το χρήστη που θες βάσει της διεύθυνσης e-mail του</p>

                        <button class="main-btn">
                            <RouterLink :to="{ name: 'delete-user' }" class="btn-link">
                                <span class="btn-text">Διαγραφή χρήστη</span>
                            </RouterLink>
                        </button>
                    </div>
                </div>

                <div class="dashboard-container">
                    <div class="my-card dashboard">
                        <h2>Προβολή χρηστών</h2>
                        <p class="my-card-text">Δες όλους τους χρήστες, τα στοιχεία τους και τους ρόλους τους</p>

                        <button class="main-btn">
                            <RouterLink :to="{ name: 'all-users' }" class="btn-link">
                                <span class="btn-text">Προβολή χρηστών</span>
                            </RouterLink>
                        </button>
                    </div>
                    <div class="my-card dashboard">
                        <h2>Προβολή αιτήσεων</h2>
                        <p class="my-card-text">Δες όλες τις αιτήσεις των πολιτών και επεξεργάσου τις.</p>

                        <button class="main-btn">
                            <RouterLink :to="{ name: 'all-applications' }" class="btn-link">
                                <span class="btn-text">Προβολή αιτήσεων</span>
                            </RouterLink>
                        </button>
                    </div>
                </div>

                <div class="dashboard-container">
                    <div class="my-card dashboard">
                        <h2>Δημιουργία διαχειριστή</h2>
                        <p class="my-card-text">Συμπλήρωσε τη φόρμα δημιουργίας χρήστη - διαχειριστή</p>

                        <button class="main-btn">
                            <RouterLink :to="{ name: 'create-manager' }" class="btn-link">
                                <span class="btn-text">Δημιουργία user</span>
                            </RouterLink>
                        </button>
                    </div>                
                </div>
            </section>
        </div>        
    </main>
</template>