<script setup>
import { onBeforeMount } from 'vue';
import { RouterView } from 'vue-router'
import { useApplicationStore } from '@/stores/application.js';
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const { loadUserData, loadVerifiedEmail } = useApplicationStore();

onBeforeMount(() => {
    // If this method is non-blocking, add a loader.
    loadUserData();
    loadVerifiedEmail();
});
</script>

<template>
  <AppHeader />
  <div class="full-page">
    <RouterView />
  </div>
  <AppFooter />
</template>