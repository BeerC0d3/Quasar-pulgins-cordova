import db from "boot/Sqlite";
import { ref } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();

export const useData = () => {
  let result = ref([]);

  async function checkTable() {
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

    //   db.transaction(function (tx) {
    //     tx.executeSql(
    //       "CREATE TABLE IF NOT EXISTS persona (id Integer primary key autoincrement, nombre TEXT, apellidos TEXT, edad INTEGER)"
    //     );
    //   });
    // }, function(error) {
    // 		console.log('Transaction ERROR: ' + error.message);
  }

  async function Get() {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM persona",
        [],
        function (tx, resultado) {
          var rows = resultado.rows;
          var tr = "";
          for (var i = 0; i < rows.length; i++) {
            result[i] = {
              id: rows[i].id,
              nombre: rows[i].nombre,
              apellidos: rows[i].apellidos,
              edad: rows[i].edad,
            };
          }
        },
        null
      );
    });
  }

  return {
    result,
    Get,
    checkTable,
  };
};
