<script setup>
import { useScrollToSection } from "@/composables/scrollToSection.js";


const { scrollToSection } = useScrollToSection();
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
                        <div class="breadcrumb-current"> Όροι Χρήσης </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>            
                <h2 class="section-title middle">Όροι Χρήσης</h2>
                <div class="terms-links-container">
                    <a href="#genikes" @click.prevent="scrollToSection('genikes')">1. Γενικές πληροφορίες</a>
                    <a href="#apodoxi" @click.prevent="scrollToSection('apodoxi')">2. Αποδοχή όρων</a>
                    <a href="#logariasmos" @click.prevent="scrollToSection('logariasmos')">3. Εγγραφή και διαχείριση λογαριασμού</a>
                    <a href="#aitisis" @click.prevent="scrollToSection('aitisis')">4. Υποβολή και επεξεργασία αιτήσεων</a>
                    <a href="#roloi" @click.prevent="scrollToSection('roloi')">5. Ρόλοι και δικαιώματα πρόσβασης</a>
                    <a href="#epikoinonia" @click.prevent="scrollToSection('epikoinonia')">6. Ηλεκτρονική επικοινωνία</a>
                    <a href="#dedomena" @click.prevent="scrollToSection('dedomena')">7. Προστασία προσωπικών δεδομένων</a>
                    <a href="#idioktisia" @click.prevent="scrollToSection('idioktisia')">8. Πνευματική ιδιοκτησία</a>
                    <a href="#oroi" @click.prevent="scrollToSection('oroi')">9. Τροποποίηση όρων</a>
                    <a href="#dikaio" @click.prevent="scrollToSection('dikaio')">10. Εφαρμοστέο δίκαιο</a>            
                </div>
                <div class="terms-container">
                    <div class="terms-group" id="genikes">
                        <h4 class="terms-sub" >1. Γενικές Πληροφορίες</h4>
                        <p class="terms-text">Η παρούσα διαδικτυακή πλατφόρμα (εφεξής «Πλατφόρμα») αποτελεί πληροφοριακό σύστημα υποβολής, διαχείρισης και παρακολούθησης αιτήσεων πολιτών προς αρμόδιο φορέα. Η χρήση της Πλατφόρμας διέπεται από τους παρόντες Όρους Χρήσης, οι οποίοι είναι δεσμευτικοί για το σύνολο των χρηστών.</p>
                    </div>
                    <div class="terms-group">
                        <h4 class="terms-sub" id="apodoxi">2. Αποδοχή όρων</h4>
                        <p class="terms-text">Η πρόσβαση και χρήση της Πλατφόρμας προϋποθέτει την πλήρη και ανεπιφύλακτη αποδοχή των παρόντων Όρων. Σε περίπτωση μη αποδοχής, ο χρήστης οφείλει να απέχει από τη χρήση των υπηρεσιών.</p>
                    </div>
                    <div class="terms-group">
                        <h4 class="terms-sub" id="aitisis">3. Εγγραφή και διαχείριση λογαριασμού</h4>
                        <ul>
                            <li>Η δημιουργία λογαριασμού είναι υποχρεωτική για την υποβολή αιτήσεων.</li>
                            <li>Ο χρήστης υποχρεούται να καταχωρεί αληθή, ακριβή και πλήρη στοιχεία.</li>
                            <li>Ο χρήστης είναι αποκλειστικά υπεύθυνος για τη διαφύλαξη των στοιχείων σύνδεσης.</li>
                            <li>Κάθε ενέργεια που πραγματοποιείται μέσω του λογαριασμού θεωρείται ότι έχει γίνει από τον ίδιο τον χρήστη.</li>
                        </ul>
                        <p class="terms-text">Η Πλατφόρμα διατηρεί το δικαίωμα αναστολής ή διαγραφής λογαριασμού σε περίπτωση παραβίασης των παρόντων όρων ή διαπίστωσης ψευδών στοιχείων.</p>                    
                    </div>
                    <div class="terms-group">
                        <h4 class="terms-sub" id="logariasmos">4. Υποβολή και επεξεργασία αιτήσεων</h4>
                        <ul>
                            <li>Οι αιτήσεις υποβάλλονται ηλεκτρονικά μέσω της Πλατφόρμας.</li>
                            <li>Ο χρήστης φέρει την πλήρη ευθύνη για την ακρίβεια και νομιμότητα του περιεχομένου της αίτησης.</li>
                            <li>Η υποβολή αίτησης δεν συνεπάγεται αυτοδικαίως έγκριση.</li>
                            <li>Η εξέταση, έγκριση ή απόρριψη αιτήσεων πραγματοποιείται από εξουσιοδοτημένους διαχειριστές.</li>
                        </ul>
                        <p class="terms-text">Η απόφαση του αρμόδιου οργάνου καταχωρείται στο σύστημα και κοινοποιείται στον χρήστη μέσω ηλεκτρονικής ειδοποίησης.</p>
                    </div>
                    <div class="terms-group">
                        <h4 class="terms-sub" id="roloi">5. Ρόλοι και δικαιώματα πρόσβασης</h4>
                        <p class="terms-text">Η Πλατφόρμα υποστηρίζει διακριτούς ρόλους χρηστών:</p> 
                        <ul>
                            <li>Πολίτης/Χρήστης</li>
                            <li>Διαχειριστής</li>
                            <li>Διαχειριστής (Admin)</li>
                        </ul>                                       
                        <p>Η πρόσβαση στο διαχειριστικό περιβάλλον επιτρέπεται αποκλειστικά σε εξουσιοδοτημένα πρόσωπα.</p>
                    </div>
                    <div class="terms-group">
                        <h4 class="terms-sub" id="epikoinonia">6. Ηλεκτρονική επικοινωνία</h4>
                        <p class="terms-text">Η Πλατφόρμα αποστέλλει αυτοματοποιημένες ειδοποιήσεις σχετικά με:</p>
                        <ul>
                            <li>Επιβεβαίωση υποβολής αίτησης</li>
                            <li>Μεταβολή κατάστασης αίτησης</li>
                            <li>Διαχειριστικές ενέργειες</li>
                        </ul>   
                        <p class="terms-text">Η ηλεκτρονική επικοινωνία θεωρείται έγκυρη εφόσον αποσταλεί στη δηλωθείσα διεύθυνση email του χρήστη.</p>
                    </div>
                    <div class="terms-group">
                        <h4 class="terms-sub" id="dedomena">7. Προστασία προσωπικών δεδομένων</h4>
                        <p class="terms-text">Η επεξεργασία προσωπικών δεδομένων πραγματοποιείται αποκλειστικά για σκοπούς λειτουργίας της Πλατφόρμας και διαχείρισης αιτήσεων. Η επεξεργασία διενεργείται σύμφωνα με:</p>
                        <ul>
                            <li>Τον Γενικό Κανονισμό Προστασίας Δεδομένων (GDPR)</li>
                            <li>Την ισχύουσα ελληνική νομοθεσία</li>
                        </ul>
                        <p class="terms-text">Αναλυτικές πληροφορίες παρέχονται στην Πολιτική Απορρήτου.</p>
                    </div>
                    <div class="terms-group">
                        <h4 class="terms-sub" id="idioktisia">8. Πνευματική ιδιοκτησία</h4>
                        <p class="terms-text">Το σύνολο του περιεχομένου της Πλατφόρμας (κώδικας, δομή, σχεδιασμός, κείμενα) προστατεύεται από την ισχύουσα νομοθεσία περί πνευματικής ιδιοκτησίας. Απαγορεύεται η αναπαραγωγή ή εκμετάλλευση χωρίς προηγούμενη άδεια.</p>
                    </div>
                    <div class="terms-group">
                        <h4 class="terms-sub" id="oroi">9. Τροποποίηση όρων</h4>
                        <p class="terms-text">Η Πλατφόρμα διατηρεί το δικαίωμα τροποποίησης των παρόντων Όρων οποτεδήποτε. Οι τροποποιήσεις ισχύουν από τη δημοσίευσή τους.</p>
                    </div>
                    <div class="terms-group">
                        <h4 class="terms-sub" id="dikaio">10. Εφαρμοστέο δίκαιο</h4>
                        <p class="terms-text">Οι παρόντες Όροι διέπονται από το Ελληνικό Δίκαιο. Για κάθε διαφορά αρμόδια είναι τα Δικαστήρια της Ελληνικής Επικράτειας.</p>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>