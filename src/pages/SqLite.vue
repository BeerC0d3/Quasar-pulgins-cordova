<template>
  <q-table title="SQL" :rows="result" :columns="columns" row-key="id">
    <template v-slot:top>
      <span class="text-h5">Datos SQLite</span>
      <q-space />
      <q-btn color="primary" icon="fa-solid fa-plus" />
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td :props="props" class="q-gutter-sm">
        <q-btn icon="edit" color="warning" flat dense size="sm" />
        <q-btn icon="delete" color="negative" flat dense size="sm" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { useData } from "../helpers/SqLiteCrud";
import db from "boot/Sqlite";
import { useQuasar } from "quasar";
const $q = useQuasar();

const columns = [
  { name: "id", field: "id", label: "Id", sortable: true, align: "left" },
  {
    name: "nombre",
    field: "nombre",
    label: "Nombre",
    sortable: true,
    align: "left",
  },
  {
    name: "apellidos",
    field: "apellidos",
    label: "Apellidos",
    sortable: true,
    align: "left",
  },
  {
    name: "edad",
    field: "edad",
    label: "Edad",
    sortable: true,
    align: "left",
  },

  { name: "actions", field: "actions", label: "Acciones", align: "right" },
];

let result = ref([]);
// const { result, checkTable } = useData();
onMounted(() => {
  db.transaction(
    function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS persona (id Integer primary key autoincrement, nombre TEXT, apellidos TEXT, edad INTEGER)"
      );
    },
    function (error) {
      alert(error.message);
      console.log("Transaction ERROR: " + error.message);
      $q.notify(error.message);
    },
    function () {
      $q.notify("Created database OK");
      console.log("Created database OK");
      //  getData();
    }
  );

  //----INSERT----
  // db.transaction(
  //   function (tx) {
  //     tx.executeSql(
  //       "INSERT INTO persona (nombre,apellidos,edad) VALUES (?1, ?2, ?3)",
  //       ["Diego", "Luna OLEA", 41]
  //     );
  //   },
  //   function (error) {
  //     alert("Transaction ERROR: " + error.message);
  //   },
  //   function () {
  //     alert("Data Terimpan");
  //     resetPage();
  //     getData();
  //   }
  // );

  //----GET-----

  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM persona",
      [],
      function (tx, resultado) {
        var rows = resultado.rows;

        console.log(rows);
        for (var i = 0; i < rows.length; i++) {
          // result[i] = {
          //   id: rows[i].id,
          //   nombre: rows[i].nombre,
          //   apellidos: rows[i].apellidos,
          //   edad: rows[i].edad,
          // };
          //console.log(rows.item(i).id);
          result.value.push({
            id: rows.item(i).id,
            nombre: rows.item(i).nombre,
            apellidos: rows.item(i).apellidos,
            edad: rows.item(i).edad,
          });
        }

        console.log(result.value);
      },
      null
    );
  });
});
</script>
