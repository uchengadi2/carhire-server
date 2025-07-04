const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTIONS, shutting down ....");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  //.connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection is successful"));

const port = process.env.PORT || 9903;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//const server = app.listen(port, "0.0.0.0");

//To handle unhandled promised rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION, shutting down ....");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
