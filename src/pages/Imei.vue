<template>
  <q-page class="flex flex-center">
    <div>IMEI: {{ imei }}</div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const imei = ref(window.device.uuid);
// export default {
//   name: "Imei",
// };
</script>
<style scoped></style>
