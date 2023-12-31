const express = require("express");
const morgan = require("morgan")

const carreraRouter = require("../router/carrera.router")
const gradoAcademicoRouter = require("../router/gradoA.router");
const profesorRouter = require("../router/profesor.router");
const alumnoRouter = require("../router/alumno.router");
const tfcRouter = require("../router/tfc.router");
const HistorialRouter = require("../router/historialAsesoria.router")
const lugarEvRouter = require("../router/lugarEvaluacion.router");
const usuarioRouter = require("../router/usuarios.router");
const comiteRouter = require("../router/comite.router");
const detalleComiteRouter = require("../router/dellateComite.router");
const grupoInvestigacionRouter = require("../router/grupoInvestigacion.router");
const detalleGrupoInvestigacionRuter = require("../router/detalleGrupoI.router");

const app = express();
const cors = require('cors')

app.use(cors());
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
app.use("/api/v1/lugarEvaluacion", lugarEvRouter);
app.use("/api/v1/usuarios", usuarioRouter);
app.use("/api/v1/comites", comiteRouter);
app.use("/api/v1/detalleComite",detalleComiteRouter);
app.use("/api/v1/grupoInvestigacion", grupoInvestigacionRouter);
app.use("/api/v1/detalleGI",detalleGrupoInvestigacionRuter);

module.exports = app;
