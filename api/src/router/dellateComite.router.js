const express = require("express");
const router = express.Router();
const DetalleComite = require("../model/detalleComite.model");

router.get("/obtener", async (req, res) => {
    try {
        const detallesComite = await DetalleComite.findAll();
        res.status(200).json(detallesComite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/guardar", async (req, res) => {
    try {
        const { Id_Comite, Id_Profesor } = req.body;

        const nuevoDetalleComite = await DetalleComite.create({
            Id_Comite,
            Id_Profesor
        });

        res.status(201).json(nuevoDetalleComite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/obtener/por/:idDetalle", async (req, res) => {
    try {
        const { idDetalle } = req.params;

        const detalleComite = await DetalleComite.findByPk(idDetalle);

        if (!detalleComite) {
            return res.status(404).json({ message: "Detalle de comité no encontrado" });
        }

        res.status(200).json(detalleComite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/actualizar/:idDetalle", async (req, res) => {
    try {
        const { idDetalle } = req.params;
        const { Id_Comite, Id_Profesor } = req.body;

        const detalleComite = await DetalleComite.findByPk(idDetalle);

        if (!detalleComite) {
            return res.status(404).json({ message: "Detalle de comité no encontrado" });
        }

        detalleComite.Id_Comite = Id_Comite;
        detalleComite.Id_Profesor = Id_Profesor;

        await detalleComite.save();

        res.status(200).json(detalleComite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/eliminar/:idDetalle", async (req, res) => {
    try {
        const { idDetalle } = req.params;

        const detalleComite = await DetalleComite.findByPk(idDetalle);

        if (!detalleComite) {
            return res.status(404).json({ message: "Detalle de comité no encontrado" });
        }

        await detalleComite.destroy();

        res.status(200).json({ message: "Detalle de comité eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/obtener/por/idprofesor/:idProfesor", async (req, res) => {
    try {
        const { idProfesor } = req.params;

        const detallesComite = await DetalleComite.findAll({
            where: {
                Id_Profesor: idProfesor
            }
        });

        if (detallesComite.length === 0) {
            return res.status(404).json({ message: "Detalles de comité no encontrados para el Id_Profesor proporcionado" });
        }

        res.status(200).json(detallesComite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
