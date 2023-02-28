<script setup lang="ts">
import ClientList from '@/clients/components/ClientList.vue';
import PaginationNumbers from '@/clients/components/PaginationNumbers.vue';
import useClients from '../composables/useClients';
import LoadingModal from '@/shared/components/LoadingModal.vue'
const { isLoading } = useClients();
</script>

<template>
    <div>
        <h1>Clients list</h1>

        <ClientList />

        <PaginationNumbers />

        <LoadingModal v-if="isLoading"/>
    </div>
</template>

<style scoped>

</style>