<template>
  <q-page class="flex flex-center">
    <div>token: {{ token }}</div>
    <q-input v-model="txtToken" label="token" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { copyToClipboard } from "quasar";
const token = ref(null);
// export default {
//   name: "Imei",
// };
const txtToken = ref("");
const androidToken = async () => {
  token.value = await FCM.getToken();
  txtToken.value = token.value;
  // this.txtToken = token.value;
  // copyToClipboard(token.value)
  //   .then(() => {
  //     alert("copiado");
  //   })
  //   .catch(() => {
  //     alert("fallo el copiado");
  //   });
  // alert(token.value);
  // console.log("token android: " + token.value);
};

onMounted(() => {
  androidToken();
});
</script>
<style scoped></style>
