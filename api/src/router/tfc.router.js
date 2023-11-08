const router = require("express").Router();
const TFC = require("../model/tfc.model")

router.get('/obtener', async (req, res) => {
    try {
        const tfcList = await TFC.findAll();
        res.status(200).json(tfcList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get('/obtener/por/:Id_TFC', async (req, res) => {
    try {
        const { Id_TFC } = req.params;
        const tfc = await TFC.findByPk(Id_TFC);
        if (!tfc) {
            return res.status(404).json({ message: "TFC no encontrado" });
        }
        res.status(200).json(tfc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/guardar', async (req, res) => {
    try {
        const { Nombre_Tema } = req.body;
        const nuevoTFC = await TFC.create({ Nombre_Tema });
        res.status(201).json(nuevoTFC);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;