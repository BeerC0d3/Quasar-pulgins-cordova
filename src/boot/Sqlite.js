let db;

db = window.sqlitePlugin.openDatabase({
  name: "test.db",
  location: "default",
});

export default db;
