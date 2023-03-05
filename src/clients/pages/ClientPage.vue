<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import LoadingModal from "@/shared/components/LoadingModal.vue";
import useClient from "@/clients/composables/useClient";
// import { useMutation } from "@tanstack/vue-query";
// import type { Client } from "@/clients/interfaces/client";
// import clientsApi from '@/api/clients-api';
import { watch } from "vue";

const route = useRoute();
const router = useRouter();
//const queryClient = useQueryClient();

//pasando un + lo convierte en un numero
const {
  client,
  isLoading,
  isError,
  clientMutation,
  updateClient,
  isUpdatingSuccess,
  isUpdating,
} = useClient(+route.params.id);

//Refrencia para uso de getQueryCache
// const updateClient = async (client: Client): Promise<Client> => {

//   await new Promise(resolve => {
//     setTimeout(() => resolve(true), 2000)
//   });

//   const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client);
//   const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false })
//   queries.forEach( query => query.reset());
//   queries.forEach( query => query.fetch());

//   return data;

// };

// const clientMutation = useMutation(updateClient,
//   {
//     onSuccess(data) {
//       console.log(data);

//     }
//   }
// );

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset();
  }, 2000);
});

watch(isError, () => {
  if (isError.value) router.replace("/clients");
});
</script>

<template>
  <h3 v-if="isUpdating">saving...</h3>
  <h3 v-if="isUpdatingSuccess">Saved</h3>

  <LoadingModal v-if="isLoading" />

  <div v-if="client">
    <h1>{{ client.name }}</h1>
    <form @submit.prevent="updateClient(client!)">
      <input type="text" placeholder="Client Name" v-model="client.name" />
      <input type="text" placeholder="Address" v-model="client.address" />
      <br />

      <button type="submit" :disabled="isUpdating">Save</button>
    </form>
  </div>

  <code> {{ client }} </code>
</template>

<style scoped>
input {
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 10px;
}

button {
  margin-bottom: 10px;
}
</style>
