const router = require("express").Router();
const GradoAcademico = require("../model/gradoA.model")


router.get("/obtener", async (req, res) => {
    try {
        const gradosAcademico = await GradoAcademico.findAll()
        res.json(gradosAcademico)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.post('/guardar', async (req, res) => {
    try {
        const nuevoGradoAcademico = await GradoAcademico.create({
            Nombre_Grado: req.body.Nombre_Grado
        });
        res.status(201).json({
            ok: true,
            status: 201,
            message: "Grado Académico Creado exitosamente",
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:Id_Grado', async (req, res) => {
    const { Id_Grado } = req.params;
    const { Nombre_Grado } = req.body;

    try {
        const gradoAcademico = await GradoAcademico.findByPk(Id_Grado);
        if (!gradoAcademico) {
            return res.status(404).json({ message: 'Grado Académico no encontrado' });
        }
        const gradoActualizado = await gradoAcademico.update({
            Nombre_Grado
        });
        res.status(200).json({ message: 'Grado Académico actualizado con éxito', gradoActualizado });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/eliminar/:Id_Grado', async (req, res) => {
    const { Id_Grado } = req.params;
    try {
        const cantidadEliminada = await GradoAcademico.destroy({
            where: { Id_Grado: Id_Grado }
        });

        if (cantidadEliminada === 0) {
            return res.status(404).json({ message: "Grado académico no encontrado" });
        }
        return res.status(200).json({ message: "Grado académico eliminado con éxito" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;