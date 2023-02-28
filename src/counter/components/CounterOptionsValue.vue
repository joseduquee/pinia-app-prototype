<script setup lang="ts">
import { useCounterOptionsStore } from '@/store/counter-options';

const counter = useCounterOptionsStore();
</script>

<template>
    <h1>El valor del counter es: {{ counter.count }}</h1>
    <h4>El ultimo cambio: {{ counter.lastChanged }}</h4>
</template>


<style scoped>

</style>