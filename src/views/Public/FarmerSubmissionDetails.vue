<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <h2 class="section-content-title">Αίτηση καλλιέργειας</h2>

    <p>Κάνοντας κλικ στο παρακάτω κουμπί, μεταφέρεσαι στο στάδιο υποβολής της αίτησης για αγροτική αποζημίωση. Για να ολοκληρωθεί σωστά η διαδικασία και να είναι εφικτή η ορθή επεξεργασία της αίτησής σου, θα χρειαστεί να συμπληρώσεις τα απαιτούμενα στοιχεία.</p>

    <h4 class="section-content-sub">Απαραίτητα στοιχεία:</h4>

    <ul>
        <li>Έκταση αγροτεμαχίου</li>
        <li>Μέση παραγωγική διαδικασία</li>
        <li>Τιμή ανά μονάδα προϊόντος</li>
        <li>Τοποθεσία καλλιέργειας</li>
    </ul>

    <button class="main-btn">
        <RouterLink :to=" { name: 'farmer-submission' } " class="btn-link">
            <span class="btn-text">
                Μετάβαση στη φόρμα
            </span>
        </RouterLink>
    </button>
</template>