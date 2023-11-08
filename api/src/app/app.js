const express = require("express");
const morgan = require("morgan")

const carreraRouter = require("../router/carrera.router")
const gradoAcademicoRouter = require("../router/gradoA.router");

const app = express();


app.use(morgan("dev"))

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola amigos");
});

app.use("/api/v1/carrera", carreraRouter);
app.use("/api/v1/gradoAcademico", gradoAcademicoRouter);

module.exports = app;
