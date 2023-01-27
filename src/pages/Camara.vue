<template>
  <q-page class="flex flex-center">
    <q-btn color="primary" label="Get Picture" @click="captureImage" />

    <q-img style="min-width: 80vw; width: 80vw" :src="imageSrc" />
  </q-page>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
const $q = useQuasar();
const imageSrc = ref("");

const captureImage = () => {
  navigator.camera.getPicture(
    (data) => {
      // on success
      imageSrc.value = `data:image/jpeg;base64,${data}`;
    },
    () => {
      // on fail
      $q.notify("Could not access device camera.");
    },
    {
      // camera options
      destinationType: navigator.camera.DestinationType.DATA_URL,
    }
  );
};
</script>
