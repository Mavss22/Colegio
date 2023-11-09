const router = require("express").Router();
const Alumno = require("../model/alumno.model");

router.get('/obtener', async (req, res) => {
    try {
        const alumnos = await Alumno.findAll();
        res.status(200).json(alumnos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.get('/obtener/por/:Id_Alumno', async (req, res) => {
    try {
        const { Id_Alumno } = req.params;
        const alumno = await Alumno.findByPk(Id_Alumno);
        if (!alumno) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }
        res.status(200).json(alumno);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/guardar', async (req, res) => {
    try {
        const nuevoAlumno = await Alumno.create({
            Id_Carrera: req.body.Id_Carrera,
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Carné: req.body.Carné,
            Fecha_Nac: req.body.Fecha_Nac,
            Dpi: req.body.Dpi,
            Telefono: req.body.Telefono,
            Dirección: req.body.Dirección
        });
        res.status(201).json(nuevoAlumno);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/eliminar/:Id_Alumno', async (req, res) => {
    const { Id_Alumno } = req.params;
    try {
        const cantidadEliminada = await Alumno.destroy({
            where: { Id_Alumno: Id_Alumno }
        });
        if (cantidadEliminada === 0) {
            return res.status(404).json({ message: "Alumno no encontrado" });
        }
        return res.status(200).json({ message: "Alumno eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;