const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "Imei",
        component: () => import("pages/Imei.vue"),
      },
      {
        path: "Camara",
        component: () => import("pages/Camara.vue"),
      },
      {
        path: "Token",
        component: () => import("pages/TokenFCM.vue"),
      },
      {
        path: "SqLite",
        component: () => import("pages/SqLite.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
