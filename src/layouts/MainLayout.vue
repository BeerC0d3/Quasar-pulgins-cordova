<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Quasar App Diego </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { getMessaging, getToken } from "firebase/messaging";
import { useQuasar } from "quasar";

const $q = useQuasar();

const leftDrawerOpen = ref(false);
leftDrawerOpen.value = !leftDrawerOpen.value;

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

// const essentialLinks = linksList;

const linksList = [
  {
    title: "Inicio",
    caption: "Inicio de la App",
    icon: "home",
    link: "/",
  },
  {
    title: "Imei",
    caption: "Obtener ImeiX ",
    icon: "school",
    link: "/Imei",
  },
  {
    title: "Camara",
    caption: "Acceso a la camara ",
    icon: "school",
    link: "/Camara",
  },
  {
    title: "Token FMC",
    caption: "Obtener token ",
    icon: "school",
    link: "/Token",
  },
  {
    title: "SqLite",
    caption: "Storage con sqlite ",
    icon: "school",
    link: "/SqLite",
  },
];

const webToken = async () => {
  const messaging = getMessaging();
  getToken(messaging, {
    vapidKey:
      "BNdE1q3ajhzVzIwUMxmYfYErKzkBh9zgzhJLFTCXVE0jg0SC-3rdjX1b589zXw-jX5FDWUX-fjVe7bVshXKcWqg",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        // this.postFcmToken(currentToken)
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};

const androidToken = async () => {
  var fcmToken = await FCM.getToken();
  console.log(fcmToken);
};

onMounted(() => {
  if ($q.platform.is.desktop) {
    webToken();
  } else {
    androidToken();
  }
  //webToken();
});
</script>
