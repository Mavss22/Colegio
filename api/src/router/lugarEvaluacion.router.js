const router = require("express").Router();
const LugarEvaluacion = require("../model/lugarEvaluacion.model")


router.get('/obtener', async (req, res) => {
    try {
        const lugares = await LugarEvaluacion.findAll();
        res.status(200).json(lugares);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;