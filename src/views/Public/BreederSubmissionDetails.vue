<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <h2 class="section-content-title">Αίτηση κτηνοτροφίας</h2>

    <p>Κάνοντας κλικ στο παρακάτω κουμπί, μεταφέρεσαι στο στάδιο υποβολής της αίτησης για κτηνοτροφική αποζημίωση. Για να ολοκληρωθεί σωστά η διαδικασία και να είναι εφικτή η ορθή επεξεργασία της αίτησής σου, θα χρειαστεί να συμπληρώσεις τα απαιτούμενα στοιχεία.</p>

    <h4 class="section-content-sub">Απαραίτητα στοιχεία:</h4>

    <ul>
        <li>Αριθμός ζημιωθέντων ζώων αυτοτελούς εκτροφής</li>
        <li>Συνολικός αριθμός ζώων αυτοτελούς εκτροφής</li>
        <li>Ποσοστό κάλυψης ζημιών</li>
        <li>Συντελεστής αποζημίωσης</li>
        <li>Τιμή ανά μονάδα προϊόντος</li>
        <li>Υπολειμματική αξία</li>
    </ul>

    <button class="main-btn">
        <RouterLink :to=" { name: 'breeder-submission' } " class="btn-link">
            <span class="btn-text">
                Μετάβαση στη φόρμα
            </span>
        </RouterLink>
    </button>
</template>