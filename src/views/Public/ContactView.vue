<script setup>
import { RouterLink } from 'vue-router';
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
                        <div class="breadcrumb-current">Συχνές Ερωτήσεις</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <div class="contact-container">
                    <h2 class="section-title">Επικοινώνησε μαζί μας</h2>

                    <p class="contact-text">Σε περίπτωση που έχεις οποιαδήποτε απορία ή χρειάζεσαι επιπλέον πληροφορίες σχετικά με την πλατφόρμα myΕΛ.Γ.Α., μπορείς να 
                        επικοινωνήσεις μαζί μας μέσω ηλεκτρονικού ταχυδρομείου στη διεύθυνση:
                    </p>
                    <ul>
                        <li>noreply.myelga@gmail.com</li>
                    </ul>
                    <p class="contact-text">Εναλλακτικά, μπορείς να απευθυνθείς απευθείας στην ομάδα υποστήριξης:</p>
                    <ul>
                        <li>it2021010@hua.gr - Αποστολίδης Χρήστος</li>
                    </ul>

                    <p class="contact-text">Για τη διαγραφή του λογαριασμού σου, απαιτείται σχετικό αίτημα μέσω email. Η διαδικασία πραγματοποιείται 
                        αποκλειστικά από την ομάδα διαχείρισης, κατόπιν επιβεβαίωσης του αιτήματός σου.
                    </p>
                </div>
            </section>
        </div>
    </main>
</template>