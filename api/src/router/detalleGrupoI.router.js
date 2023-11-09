
const DetalleGrupoInvestigacion = require("../model/detalleGrupoI.model");
const express = require("express");
const router = express.Router();


router.get("/obtener", async (req, res) => {
    try {
        const detallesGrupoInvestigacion = await DetalleGrupoInvestigacion.findAll();
        res.status(200).json(detallesGrupoInvestigacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/guardar", async (req, res) => {
    try {
        const { Id_Grupo, Id_Estudiante } = req.body;

        const nuevoDetalleGrupoInvestigacion = await DetalleGrupoInvestigacion.create({
            Id_Grupo,
            Id_Estudiante
        });

        res.status(201).json(nuevoDetalleGrupoInvestigacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/obtener/por/:idDetalle", async (req, res) => {
    try {
        const { idDetalle } = req.params;

        const detalleGrupoInvestigacion = await DetalleGrupoInvestigacion.findByPk(idDetalle);

        if (!detalleGrupoInvestigacion) {
            return res.status(404).json({ message: "Detalle de grupo de investigación no encontrado" });
        }

        res.status(200).json(detalleGrupoInvestigacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put("/actualizar/:idDetalle", async (req, res) => {
    try {
        const { idDetalle } = req.params;
        const { Id_Grupo, Id_Estudiante } = req.body;

        const detalleGrupoInvestigacion = await DetalleGrupoInvestigacion.findByPk(idDetalle);

        if (!detalleGrupoInvestigacion) {
            return res.status(404).json({ message: "Detalle de grupo de investigación no encontrado" });
        }

        detalleGrupoInvestigacion.Id_Grupo = Id_Grupo;
        detalleGrupoInvestigacion.Id_Estudiante = Id_Estudiante;

        await detalleGrupoInvestigacion.save();

        res.status(200).json(detalleGrupoInvestigacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/eliminar/:idDetalle", async (req, res) => {
    try {
        const { idDetalle } = req.params;

        const detalleGrupoInvestigacion = await DetalleGrupoInvestigacion.findByPk(idDetalle);

        if (!detalleGrupoInvestigacion) {
            return res.status(404).json({ message: "Detalle de grupo de investigación no encontrado" });
        }

        await detalleGrupoInvestigacion.destroy();

        res.status(200).json({ message: "Detalle de grupo de investigación eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
