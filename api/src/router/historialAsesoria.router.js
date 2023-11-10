const router = require("express").Router();
const HistorialAsesoria = require("../model/historialAsesoria.model")

router.get('/obtener', async (req, res) => {
    try {
        const asesorias = await HistorialAsesoria.findAll();
        res.status(200).json(asesorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/obtener/alumno/:Id_Alumno', async (req, res) => {
    try {
        const { Id_Alumno } = req.params;
        const asesorias = await HistorialAsesoria.findAll({
            where: {
                Id_Alumno: Id_Alumno
            }
        });
        if (!asesorias || asesorias.length === 0) {
            return res.status(404).json({ message: "No se encontraron asesorías para el alumno especificado" });
        }
        res.status(200).json(asesorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/obtener/profesor/:idProfesor', async (req, res) => {
    try {
        const { idProfesor } = req.params;
        const asesorias = await HistorialAsesoria.findAll({
            where: {
                Id_Profesor: idProfesor
            }
        });
        if (!asesorias || asesorias.length === 0) {
            return res.status(404).json({ message: "No se encontraron asesorías para el profesor especificado" });
        }
        res.status(200).json(asesorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/:Id_Asesoria', async (req, res) => {
    const { Id_Asesoria } = req.params;
    const { Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin } = req.body;

    try {
        const asesoria = await HistorialAsesoria.findByPk(Id_Asesoria);
        if (!asesoria) {
            return res.status(404).json({ message: "Asesoría no encontrada" });
        }
        await asesoria.update({
            Id_Profesor,
            Id_Alumno,
            Id_TFC,
            Fecha_Inic,
            Fecha_Fin
        });

        res.status(200).json({ message: 'Asesoría actualizada con éxito', asesoria });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/guardar', async (req, res) => {
    try {
        const { Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin } = req.body;
        const nuevaAsesoria = await HistorialAsesoria.create({
            Id_Profesor,
            Id_Alumno,
            Id_TFC,
            Fecha_Inic,
            Fecha_Fin
        });
        res.status(201).json(nuevaAsesoria);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/obtener-relacion/:idProfesor/:idAlumno', async (req, res) => {
    try {
        const { idProfesor, idAlumno } = req.params;

        const relaciones = await HistorialAsesoria.obtenerRelacion(idProfesor, idAlumno);

        res.status(200).json(relaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;