const express = require("express");
const morgan = require("morgan")

const carreraRouter = require("../router/carrera.router")
const gradoAcademicoRouter = require("../router/gradoA.router");
const profesorRouter = require("../router/profesor.router");
const alumnoRouter = require("../router/alumno.router");
const tfcRouter = require("../router/tfc.router");
const HistorialRouter = require("../router/historialAsesoria.router")

const app = express();


app.use(morgan("dev"))

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola amigos");
});

app.use("/api/v1/carrera", carreraRouter);
app.use("/api/v1/gradoAcademico", gradoAcademicoRouter);
app.use("/api/v1/profesor", profesorRouter);
app.use("/api/v1/alumno", alumnoRouter);
app.use("/api/v1/tfc", tfcRouter);
app.use("/api/v1/historialAsesoria", HistorialRouter);

module.exports = app;
