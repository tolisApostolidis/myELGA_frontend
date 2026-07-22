<script setup>
import TableSubmissions from '@/components/TableSubmissions.vue';
import TableBreeders from '@/components/TableBreeder.vue';

</script>

<template>
    <main>
        <div class="submissions-container">
            <div class="submissions-table-wrap">  
                <TableSubmissions :userRole="'ROLE_CITIZEN'"></TableSubmissions>
            </div>
            <div class="line-breaker"></div>
            <div class="submissions-table-wrap">                            
                <TableBreeders :userRole="'ROLE_CITIZEN'"></TableBreeders> 
            </div>
        </div>
    </main>
</template>