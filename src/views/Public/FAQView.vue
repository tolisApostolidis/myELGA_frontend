<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

function toggleAccordion(index) {
    openIndex.value = openIndex.value === index ? null : index
}
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
                <div class="faq-container">
                    <div class="my-accordion-item">
                        <div class="my-accordion-header" @click="toggleAccordion(0)">
                            <span>Μάθε τι είναι το myΕΛ.Γ.Α.</span>
                            <span>{{ openIndex === 0 ? '-' : '+' }}</span>
                        </div>

                        <div class="my-accordion-body" :class="{ open: openIndex === 0 }">
                            <div class="my-accordion-body-inner">
                                <p class="my-accordion-text">
                                    Το myΕΛ.Γ.Α. αποτελεί μια ηλεκτρονική πλατφόρμα για τη διαχείριση αιτήσεων αγροτικών αποζημιώσεων λόγω φυσικών 
                                    καταστροφών. Κάθε αγρότης, μετά την είσοδό του στο σύστημα, έχει τη δυνατότητα να υποβάλει αίτηση αποζημίωσης είτε 
                                    για ζημιές σε καλλιέργειες είτε για απώλειες ζωικού κεφαλαίου. Μέσω της προσωπικής του καρτέλας μπορεί να παρακολουθεί 
                                    την πορεία της αίτησης, να ενημερώνεται για την έγκριση ή απόρριψή της και, σε περίπτωση έγκρισης, να βλέπει το ακριβές 
                                    ποσό της αποζημίωσης.
                                </p>
                            </div>  
                        </div>
                    </div>

                    <div class="my-accordion-item">
                        <div class="my-accordion-header" @click="toggleAccordion(1)">
                            <span>Τι χρειάζεσαι για να χρησιμοποιήσεις την πλατφόρμα;</span>
                            <span>{{ openIndex === 1 ? '-' : '+' }}</span>
                        </div>

                        <div :class="{ open: openIndex === 1 }" class="my-accordion-body">
                            <div class="my-accordion-body-inner">
                                <p class="my-accordion-text">
                                    Για την πρόσβαση στις υπηρεσίες του myΕΛ.Γ.Α. απαιτείται η είσοδος στο σύστημα με τη χρήση ονόματος χρήστη και 
                                    συνθηματικού. Σε περίπτωση που ο χρήστης δεν διαθέτει λογαριασμό, παρέχεται η δυνατότητα δημιουργίας νέου μέσω
                                    της επιλογής εγγραφής (κάνοντας κλικ <RouterLink :to="{ name: 'signup' }">εδώ</RouterLink>).
                                </p>
                                <p class="my-accordion-text">
                                    Όσον αφορά τους επιθεωρητές του ΕΛ.Γ.Α., δεν προβλέπεται διαδικασία ηλεκτρονικής εγγραφής. Η πρόσβασή τους στην 
                                    πλατφόρμα πραγματοποιείται αποκλειστικά με τους προσωπικούς κωδικούς που τους έχουν χορηγηθεί από το σύστημα.
                                </p>
                            </div>  
                        </div>
                    </div>

                    <div class="my-accordion-item">
                        <div class="my-accordion-header" @click="toggleAccordion(2)">
                            <span>Πώς μπορώ να εγγραφώ στην πλατφόρμα;</span>
                            <span>{{ openIndex === 2 ? '-' : '+' }}</span>
                        </div>

                        <div :class="{ open: openIndex === 2 }" class="my-accordion-body">
                            <div class="my-accordion-body-inner">
                                <p class="my-accordion-text">
                                    Για να εγγραφείς στην πλατφόρμα myΕΛ.Γ.Α., μεταβείτε <RouterLink :to="{ name: 'signup' }">εδώ</RouterLink> και 
                                    συμπλήρωσε το επιθυμητό όνομα χρήστη, μία έγκυρη και ενεργή διεύθυνση ηλεκτρονικού ταχυδρομείου (e-mail), καθώς και 
                                    το συνθηματικό της επιλογής σου.
                                </p>
                                <p class="my-accordion-text">
                                    Πατώντας το κουμπί «Εγγραφή», το σύστημα θα ελέγξει τα στοιχεία που καταχώρισες και, εφόσον δεν υπάρχει ήδη 
                                    λογαριασμός με τα ίδια δεδομένα, η εγγραφή σου θα ολοκληρωθεί επιτυχώς.
                                </p>
                            </div>  
                        </div>
                    </div>

                    <div class="my-accordion-item">
                        <div class="my-accordion-header" @click="toggleAccordion(3)">
                            <span>Πώς να υποβάλλεις την πρώτη σου αίτηση;</span>
                            <span>{{ openIndex === 3 ? '-' : '+' }}</span>
                        </div>

                        <div :class="{ open: openIndex === 3 }" class="my-accordion-body">
                            <div class="my-accordion-body-inner">
                                <p class="my-accordion-text">
                                    Μετάβασε στη σελίδα επιλογής τύπου αίτησης κάνοντας κλικ <RouterLink :to="{ name: 'submission_menu' }">εδώ</RouterLink>.
                                </p>
                                <p class="my-accordion-text">
                                    Δες ποια είναι τα απαραίτητα στοιχεία για να υποβάλεις την αντίστοιχη αίτηση και, αφού βεβαιωθείς ότι τα γνωρίζεις 
                                    και τα διαθέτεις, προχώρησε στο στάδιο δημιουργίας της.  
                                </p>
                            </div>  
                        </div>
                    </div>

                    <div class="my-accordion-item">
                        <div class="my-accordion-header" @click="toggleAccordion(4)">
                            <span>Ποια είναι η διαδικασία επεξεργασίας υποβληθείσας αίτησης;</span>
                            <span>{{ openIndex === 4 ? '-' : '+' }}</span>
                        </div>

                        <div :class="{ open: openIndex === 4 }" class="my-accordion-body">
                            <div class="my-accordion-body-inner">
                                <p class="my-accordion-text">
                                    Αφού υποβάλεις μία αίτηση στο myΕΛ.Γ.Α., η κατάστασή της ορίζεται αρχικά ως «Υπό επεξεργασία». Όσο παραμένει σε 
                                    αυτή τη φάση, έχεις τη δυνατότητα να τροποποιήσεις τα στοιχεία που έχεις καταχωρίσει.
                                </p>
                                <p class="my-accordion-text">
                                    Στη συνέχεια, ο επιθεωρητής του ΕΛ.Γ.Α. προχωρά σε επιτόπιο έλεγχο στον χώρο όπου σημειώθηκε η ζημία και 
                                    συμπληρώνει τα απαραίτητα επιπλέον πεδία στο σύστημα. Μετά την ολοκλήρωση της αξιολόγησης, η αίτηση ενημερώνεται 
                                    είτε ως «Εγκεκριμένη» είτε ως «Απορριφθείσα».
                                </p>
                                <p class="my-accordion-text">
                                    Σε περίπτωση έγκρισης, το σύστημα υπολογίζει αυτόματα το ποσό της αποζημίωσης, το οποίο μπορείς να δεις στην 
                                    καρτέλα «Προβολή» της συγκεκριμένης αίτησης.
                                </p>
                            </div>  
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>