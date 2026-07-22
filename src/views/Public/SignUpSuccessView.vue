<script setup>
import { RouterLink } from 'vue-router';
import success from '@/assets/images/success.png';

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
                        <RouterLink :to=" { name: 'signup' } " class="breadcrumb-link"> Εγγραφή </RouterLink>
                    </div>
                    <div class="breadcrumb-column">
                        <div>></div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current">Εγγραφή με επιτυχία</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section class="page-message-section">
                <div class="page-message-container">
                    <img :src="success" alt="logo">
                    <h2 class="section-title">Η εγγραφή σου πραγματοποιήθηκε με επιτυχία!</h2>
                    <p>Συνδέσου στο λογαριασμό σου ή επέστρεψε στην αρχική.</p>
                    <div class="page-message-btn-wrap">
                        <button class="main-btn offline">
                            <RouterLink :to="{ name: 'home' } " class="btn-link">
                                <span class="btn-text bold">
                                    Πίσω στην Αρχική
                                </span>
                            </RouterLink>
                        </button>
                        <button class="main-btn">
                            <RouterLink :to="{ name: 'login' } " class="btn-link">
                                <span class="btn-text">
                                    Είσοδος
                                </span>
                            </RouterLink>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>