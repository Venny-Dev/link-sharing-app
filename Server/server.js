// const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const connectDB = require("./db");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION, Shutting down....");
  console.log(err.name, err.message);

  process.exit(1);
});

const app = require("./app");

connectDB();

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
// mongoose
//   .connect(DB)
//   .then(() => console.log("DB connection successful"))
//   .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION, Shutting down....");
  server.close(() => {
    // Doing this 0here is optional
    process.exit(1);
  });
});

module.exports = app;
