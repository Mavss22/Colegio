const express = require("express");
const morgan = require("morgan")
const router = require("../router/carrera.router")
const app = express();


app.use(morgan("dev"))

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola amigos");
});

app.use("/api/v1", router)

module.exports = app;
