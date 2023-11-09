
const GrupoInvestigacion = require("../model/grupoInvestigacion.model");
const express = require("express");
const router = express.Router();


router.get("/obtener", async (req, res) => {
    try {
        const gruposInvestigacion = await GrupoInvestigacion.findAll();
        res.status(200).json(gruposInvestigacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/guardar", async (req, res) => {
    try {
        const { Nombre_Grupo } = req.body;

        const nuevoGrupoInvestigacion = await GrupoInvestigacion.create({
            Nombre_Grupo
        });

        res.status(201).json(nuevoGrupoInvestigacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/obtener/por/:idGrupo", async (req, res) => {
    try {
        const { idGrupo } = req.params;

        const grupoInvestigacion = await GrupoInvestigacion.findByPk(idGrupo);

        if (!grupoInvestigacion) {
            return res.status(404).json({ message: "Grupo de investigación no encontrado" });
        }

        res.status(200).json(grupoInvestigacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put("/actualizar/:idGrupo", async (req, res) => {
    try {
        const { idGrupo } = req.params;
        const { Nombre_Grupo } = req.body;

        const grupoInvestigacion = await GrupoInvestigacion.findByPk(idGrupo);

        if (!grupoInvestigacion) {
            return res.status(404).json({ message: "Grupo de investigación no encontrado" });
        }

        grupoInvestigacion.Nombre_Grupo = Nombre_Grupo;

        await grupoInvestigacion.save();

        res.status(200).json(grupoInvestigacion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/eliminar/:idGrupo", async (req, res) => {
    try {
        const { idGrupo } = req.params;

        const grupoInvestigacion = await GrupoInvestigacion.findByPk(idGrupo);

        if (!grupoInvestigacion) {
            return res.status(404).json({ message: "Grupo de investigación no encontrado" });
        }

        await grupoInvestigacion.destroy();

        res.status(200).json({ message: "Grupo de investigación eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
