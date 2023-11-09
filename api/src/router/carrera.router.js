const router = require("express").Router();
const Carrera = require("../model/carrera.model")

router.get("/obtener", async (req, res) => {
    try {
        const carreras = await Carrera.findAll()
        res.json(carreras)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.post("/guardar", async (req, res) => {
    const carrera = await Carrera.create({
        nombre_carrera: req.body.nombre_carrera
    });
    res.status(201).json({
        ok: true,
        status: 201,
        message: "Producto Creado exitosamente",
    });
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_carrera } = req.body;

        const carrera = await Carrera.findByPk(id);
        if (!carrera) {
            return res.status(404).json({ message: "Carrera no encontrada" });
        }
        await carrera.update({
            nombre_carrera
        });

        return res.status(200).json({ message: "Carrera actualizada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete("/eliminar/:Id_Carrera", async (req, res) => {
    try {
        const { Id_Carrera } = req.params;
        const result = await Carrera.destroy({
            where: { Id_Carrera }
        });
        if (result === 0) {
            return res.status(404).json({ message: "Carrera no encontrada" });
        }
        return res.status(200).json({ message: "Carrera eliminada con éxito" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


module.exports = router;
