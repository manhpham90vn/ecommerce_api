const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

// middleware
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());

// db

// routes
app.get("/", (req, res) => {
    res.status(200).send({ message: "Hello World" });
});

// error handlers

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server is closed");
  });
});
