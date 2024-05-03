const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();
const { APP_PORT } = require("./configs/configs");

// middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

// db
const instance = require("./databases/mongodb")
instance.checkOverload();

// routes
app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello World" });
});

// error handlers

// run server
const server = app.listen(APP_PORT, () => {
  console.log(`Server is running on port ${APP_PORT}`);
});

process.on("SIGINT", async () => {
  await instance.close();
  server.close();
  process.exit();
});
