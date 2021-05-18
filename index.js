const Sekai = require("./Structures/Sekai");

const client = new Sekai();

process.on("rejectionHandled", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
});

process.on("uncaughtException", (err) => {
  console.error(err);
});

client.init();