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
                        <div class="breadcrumb-current"> Πολιτική Απορρήτου </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>            
                <h2 class="section-title middle">Πολιτική Απορρήτου</h2>
                <div class="privacy-links-container">
                    <a href="#first" @click.prevent="scrollToSection('first')">1. Εισαγωγή</a> 
                    <a href="#second" @click.prevent="scrollToSection('second')">2. Υπεύθυνος Επεξεργασίας</a>  
                    <a href="#third" @click.prevent="scrollToSection('third')">3. Κατηγορίες Δεδομένων που Συλλέγονται</a>
                    <a href="#fourth" @click.prevent="scrollToSection('fourth')">4. Σκοποί Επεξεργασίας</a>
                    <a href="#fifth" @click.prevent="scrollToSection('fifth')">5. Νομική Βάση Επεξεργασίας</a>
                    <a href="#sixth" @click.prevent="scrollToSection('sixth')">6. Διαβίβαση Δεδομένων</a>
                    <a href="#seventh" @click.prevent="scrollToSection('seventh')">7. Δικαιώματα Υποκειμένων Δεδομένων</a>
                    <a href="#eight" @click.prevent="scrollToSection('eight')">8. Μέτρα Ασφάλειας</a>   
                    <a href="#ninth" @click.prevent="scrollToSection('ninth')">9. Τροποποιήσεις Πολιτικής</a>           
                </div>


                <div class="privacy-container">
                    <div class="privacy-group" id="first">
                        <h4 class="privacy-sub" >1. Εισαγωγή</h4>
                        <p class="privacy-text">Η παρούσα Πολιτική Απορρήτου περιγράφει τον τρόπο με τον οποίο η Πλατφόρμα συλλέγει, χρησιμοποιεί και προστατεύει τα προσωπικά δεδομένα των χρηστών της. Η προστασία των προσωπικών δεδομένων αποτελεί βασική προτεραιότητα και η επεξεργασία τους πραγματοποιείται σύμφωνα με τον Γενικό Κανονισμό Προστασίας Δεδομένων (ΕΕ) 2016/679 (GDPR) και την ισχύουσα ελληνική νομοθεσία.</p>
                    </div>

                    <div class="privacy-group" id="second">
                        <h4 class="privacy-sub" >2. Υπεύθυνος Επεξεργασίας</h4>
                        <p class="privacy-text">Υπεύθυνος Επεξεργασίας των δεδομένων είναι ο φορέας διαχείρισης της Πλατφόρμας. Για θέματα που αφορούν την επεξεργασία προσωπικών δεδομένων, οι χρήστες μπορούν να επικοινωνούν μέσω της επίσημης διεύθυνσης ηλεκτρονικού ταχυδρομείου της Πλατφόρμας.</p>
                    </div>

                    <div class="privacy-group">
                        <h4 class="privacy-sub" id="third">3. Κατηγορίες Δεδομένων που Συλλέγονται</h4>
                        <p class="privacy-text">Η Πλατφόρμα ενδέχεται να συλλέγει τις ακόλουθες κατηγορίες προσωπικών δεδομένων:</p>
                        <ul>
                            <li>Στοιχεία ταυτοποίησης (όνομα, επώνυμο)</li>
                            <li>Στοιχεία επικοινωνίας (διεύθυνση email, τηλέφωνο)</li>
                            <li>Στοιχεία λογαριασμού (όνομα χρήστη)</li>
                            <li>Περιεχόμενο αιτήσεων που υποβάλλονται μέσω της Πλατφόρμας</li>
                        </ul>
                        <p class="privacy-text">Η συλλογή πραγματοποιείται αποκλειστικά για σκοπούς λειτουργίας και ασφάλειας της Πλατφόρμας.</p>                    
                    </div>

                    <div class="privacy-group">
                        <h4 class="privacy-sub" id="fourth">4. Σκοποί Επεξεργασίας</h4>
                        <p class="privacy-text">Τα προσωπικά δεδομένα υποβάλλονται σε επεξεργασία για τους εξής σκοπούς:</p> 
                        <ul>
                            <li>Δημιουργία και διαχείριση λογαριασμού χρήστη</li>
                            <li>Υποβολή και αξιολόγηση αιτήσεων</li>
                            <li>Επικοινωνία με τον χρήστη</li>
                            <li>Αποστολή ειδοποιήσεων σχετικά με την κατάσταση αιτήσεων</li>
                            <li>Διασφάλιση της ασφάλειας και ορθής λειτουργίας του συστήματος</li>
                        </ul>
                        <p class="privacy-text">Η επεξεργασία περιορίζεται αυστηρά στους ανωτέρω σκοπούς.</p>                    
                    </div>

                    <div class="privacy-group">
                        <h4 class="privacy-sub" id="fifth">5. Νομική Βάση Επεξεργασίας</h4>
                        <p class="privacy-text">Η επεξεργασία προσωπικών δεδομένων βασίζεται:</p> 
                        <ul>
                            <li>Στην εκτέλεση σύμβασης (παροχή υπηρεσιών μέσω της Πλατφόρμας)</li>
                            <li>Στη συμμόρφωση με νομικές υποχρεώσεις</li>
                            <li>Στο έννομο συμφέρον για τη διασφάλιση της ασφάλειας του συστήματος</li>                         
                        </ul>                   
                    </div>

                    <div class="privacy-group">
                        <h4 class="privacy-sub" id="sixth">6. Διαβίβαση Δεδομένων</h4>
                        <p class="privacy-text">Τα προσωπικά δεδομένα δεν διαβιβάζονται σε τρίτους, εκτός εάν:</p> 
                        <ul>
                            <li>Απαιτείται από τον νόμο</li>
                            <li>Είναι απαραίτητο για τη λειτουργία τεχνικών υπηρεσιών (π.χ. πάροχος φιλοξενίας)</li>
                            <li>Υπάρχει ρητή συγκατάθεση του χρήστη</li>
                        </ul>
                        <p class="privacy-text">Σε κάθε περίπτωση λαμβάνονται τα κατάλληλα τεχνικά και οργανωτικά μέτρα προστασίας.</p>                    
                    </div>

                    <div class="privacy-group">
                        <h4 class="privacy-sub" id="seventh">7. Δικαιώματα Υποκειμένων Δεδομένων</h4>
                        <p class="privacy-text">Οι χρήστες έχουν τα εξής δικαιώματα:</p> 
                        <ul>
                            <li>Δικαίωμα πρόσβασης στα δεδομένα τους</li>
                            <li>Δικαίωμα διόρθωσης ανακριβών στοιχείων</li>
                            <li>Δικαίωμα διαγραφής («δικαίωμα στη λήθη»)</li>
                            <li>Δικαίωμα περιορισμού επεξεργασίας</li>
                            <li>Δικαίωμα εναντίωσης</li>
                            <li>Δικαίωμα φορητότητας δεδομένων</li>
                        </ul>
                        <p class="privacy-text">Για την άσκηση των δικαιωμάτων αυτών, οι χρήστες μπορούν να υποβάλουν σχετικό αίτημα μέσω της Πλατφόρμας.</p>                    
                    </div>

                    <div class="privacy-group">
                        <h4 class="privacy-sub" id="eight">8. Μέτρα Ασφάλειας</h4>
                        <p class="privacy-text">Η Πλατφόρμα εφαρμόζει κατάλληλα τεχνικά και οργανωτικά μέτρα για την προστασία των προσωπικών δεδομένων, συμπεριλαμβανομένων:</p> 
                        <ul>
                            <li>Ελέγχου πρόσβασης βάσει ρόλων</li>
                            <li>Κρυπτογράφησης επικοινωνίας (HTTPS)</li>
                            <li>Καταγραφής ενεργειών διαχειριστών</li>
                            <li>Περιοδικών ελέγχων ασφαλείας</li>
                        </ul>
                        <p class="privacy-text"></p>                    
                    </div>

                    <div class="privacy-group" id="ninth">
                        <h4 class="privacy-sub" >9. Τροποποιήσεις Πολιτικής</h4>
                        <p class="privacy-text">Η παρούσα Πολιτική Απορρήτου δύναται να τροποποιείται οποτεδήποτε. Οι αλλαγές τίθενται σε ισχύ από τη δημοσίευσή τους στην Πλατφόρμα.</p>
                    </div>                    
                </div>
            </section>
        </div>
    </main>
</template>