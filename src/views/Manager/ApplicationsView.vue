<script setup>
import TableSubmissions from '@/components/TableSubmissions.vue';
import TableBreeders from '@/components/TableBreeder.vue';

</script>

<template>
    <div class="flex-column">
        <div class="flex-column">  
            <TableSubmissions :userRole="'ROLE_MANAGER'"></TableSubmissions>
        </div>
        <div class="line-breaker"></div>
        <div class="flex-column">                            
            <TableBreeders :userRole="'ROLE_MANAGER'"></TableBreeders> 
        </div>
    </div>
</template>