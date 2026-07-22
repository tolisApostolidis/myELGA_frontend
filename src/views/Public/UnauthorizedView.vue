<script setup>
import forbiddenLogo from '@/assets/images/forbidden.png';

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
                        <div>&gt;</div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current">Μη προσβάσιμο...</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section class="page-message-section">
                <div class="page-message-container">
                    <img :src="forbiddenLogo" alt="logo">
                    <h2 class="section-title">Η σελίδα απαιτεί επαλήθευση ταυτότητας!</h2>
                    <p>Η σελίδα που αναζητείς δεν είναι προσβάσιμη με τα παρόντα στοιχεία σύνδεσης, επέστρεψε στην αρχικη και ξανα προσπάθησε.</p>
                    <button class="main-btn">
                        <RouterLink :to="{ name: 'home' } " class="btn-link">
                            <span class="btn-text">
                                Πίσω στην Αρχική
                            </span>
                        </RouterLink>
                    </button>
                </div>
            </section>
        </div>
    </main>
</template>