const router = require("express").Router();
const Profesor = require("../model/profesor.model")

router.get('/obtener', async (req, res) => {
    try {
        const profesores = await Profesor.findAll();
        res.status(200).json(profesores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/obtener/por/:Id_Profesor', async (req, res) => {
    try {
        const { Id_Profesor } = req.params;
        const profesor = await Profesor.findByPk(Id_Profesor);
        if (!profesor) {
            return res.status(404).json({ message: "Profesor no encontrado" });
        }
        res.status(200).json(profesor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/guardar', async (req, res) => {
    try {
        const nuevoProfesor = await Profesor.create({
            Id_Grado: req.body.Id_Grado,
            Nombre: req.body.Nombre,
            Apellido: req.body.Apellido,
            Carnet: req.body.Carnet,
            Fecha_Nac: req.body.Fecha_Nac,
            DPI: req.body.DPI,
            Telefono: req.body.Telefono,
            Dirección: req.body.Dirección
        });
        res.status(201).json(nuevoProfesor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.delete('/eliminar/:Id_Profesor', async (req, res) => {
    const { Id_Profesor } = req.params; 

    try {
        const cantidadEliminada = await Profesor.destroy({
            where: { Id_Profesor: Id_Profesor }
        });

        if (cantidadEliminada === 0) {
            return res.status(404).json({ message: "Profesor no encontrado" });
        }
        return res.status(200).json({ message: "Profesor eliminado con éxito" });
    } catch (error) {

        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;