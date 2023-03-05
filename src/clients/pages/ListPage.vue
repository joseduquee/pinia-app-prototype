<script setup lang="ts">
import ClientList from "@/clients/components/ClientList.vue";
import PaginationNumbers from "@/clients/components/PaginationNumbers.vue";
import useClients from "../composables/useClients";
import LoadingModal from "@/shared/components/LoadingModal.vue";

const { isLoading, clients, currentPage, totalPages, getPage } = useClients();
</script>

<template>
  <div>
    <h1>Clients list</h1>

    <ClientList :clients="clients" />

    <!-- @page-changed="(page) => getPage(page)"  -->
    <PaginationNumbers 
      :total-pages="totalPages" 
      :current-page="currentPage" 
      @page-changed="getPage" 
    />

    <LoadingModal v-if="isLoading" />
  </div>
</template>

<style scoped></style>