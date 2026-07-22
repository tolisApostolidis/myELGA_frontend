<script setup>
import { RouterLink } from 'vue-router';
import logo from '@/assets/images/hua.png';

</script>

<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-category-container">
                <h4 class="footer-category-title">Γενικές Πληροφορίες</h4>
                <RouterLink :to=" { name: 'terms' } " class="footer-link">Όροι Χρήσης</RouterLink>
                <RouterLink :to=" { name: 'privacy' } " class="footer-link">Πολιτική Απορρήτου</RouterLink>
            </div>
            <div class="footer-category-container">
                <h4 class="footer-category-title">Υποστήριξη</h4>
                <RouterLink :to=" { name: 'contact' } " class="footer-link">Επικοινωνία</RouterLink>
                <RouterLink :to=" { name: 'faq' } " class="footer-link">Συχνές Ερωτήσεις</RouterLink> 
            </div>
            <div class="footer-img-wrap">
                <img v-bind:src="logo"/>
            </div>
        </div>
        <div class="copyright-container">
            <p class="copyright-text">&copy; 2026 myΕ.Λ.Γ.Α.  - All rights reserved.</p>
        </div>
    </footer>
</template>