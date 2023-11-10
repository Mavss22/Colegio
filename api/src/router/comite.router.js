const express = require("express");
const router = express.Router();
const Comite = require("../model/comite.model");
const LugarEvaluacion = require("../model/lugarEvaluacion.model");

router.get("/obtener", async (req, res) => {
    try {
        const comites = await Comite.findAll({
            include: [
                {
                    model: LugarEvaluacion,
                    attributes: ["Id_Lugar", "Lugar"],
                    as: "lugarEvaluacion", 
                },
            ],
        });
        res.status(200).json(comites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get("/obtener/por/:idComite", async (req, res) => {
    try {
        const { idComite } = req.params;

        const comite = await Comite.findByPk(idComite, {
            include: [
                {
                    model: LugarEvaluacion,
                    attributes: ["Id_Lugar", "Lugar"],
                    as: "lugarEvaluacion", 
                },
            ],
        });

        if (!comite) {
            return res.status(404).json({ message: "Comité no encontrado" });
        }

        res.status(200).json(comite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/guardar", async (req, res) => {
    try {
        const { Fecha_Creacion, Id_Lugar_Evaluacion } = req.body;

        const nuevoComite = await Comite.create({
            Fecha_Creacion,
            Id_Lugar_Evaluacion,
        });

        res.status(201).json({ message: "Comité creado exitosamente", comite: nuevoComite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put("/actualizar/:idComite", async (req, res) => {
    try {
        const { idComite } = req.params;
        const { Fecha_Creacion, Id_Lugar_Evaluacion } = req.body;
        const comite = await Comite.findByPk(idComite);

        if (!comite) {
            return res.status(404).json({ message: "Comité no encontrado" });
        }

        comite.Fecha_Creacion = Fecha_Creacion;
        comite.Id_Lugar_Evaluacion = Id_Lugar_Evaluacion;

        await comite.save();

        res.status(200).json({ message: "Comité actualizado exitosamente", comite });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete("/eliminar/:idComite", async (req, res) => {
    try {
        const { idComite } = req.params;

        const comite = await Comite.findByPk(idComite);

        if (!comite) {
            return res.status(404).json({ message: "Comité no encontrado" });
        }

        await comite.destroy();

        res.status(200).json({ message: "Comité eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
