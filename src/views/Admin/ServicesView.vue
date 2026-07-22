<script setup>
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
    <main>
        <div class="breadcrumb-container">
            <div class="breadcrumb-container-inner">
                <div class="breadcrumb-row">
                    <div class="breadcrumb-column">
                        <RouterLink :to=" { name: 'admin-board' } " class="breadcrumb-link"> Αρχική (Διαχειριστικό περιβάλλον) </RouterLink>
                    </div>
                    <div class="breadcrumb-column">
                        <div>></div>
                    </div>
                    <div class="breadcrumb-column">
                        <div class="breadcrumb-current"> Υπηρεσίες </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="page">
            <section>
                <div class="section-sidebar-container">
                    <div class="section-sidebar">
                        <RouterLink :to="{ name: 'delete-user' }" :class="{ 'is-active': route.name === 'delete-user' }" class="section-sidebar-btn">Διαγραφή χρήστη</RouterLink>
                        <RouterLink :to="{ name: 'all-users' }" :class="{ 'is-active': route.name === 'all-users' }" class="section-sidebar-btn">Προβολή χρηστών</RouterLink>
                        <RouterLink :to="{ name: 'all-applications' }" :class="{ 'is-active': route.name === 'all-applications' }" class="section-sidebar-btn">Προβολή αιτήσεων</RouterLink>
                        <RouterLink :to="{ name: 'create-manager' }" :class="{ 'is-active': route.name === 'create-manager' }" class="section-sidebar-btn">Δημιουργία user</RouterLink>
                    </div>

                    <div class="section-sidebar-content">
                        <RouterView />
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>