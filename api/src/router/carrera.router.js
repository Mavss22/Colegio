const router = require("express").Router();
const Carrera = require("../model/carrera.model")

router.get("/products", (req, res) => {
    res.send("I am a Router");
});


router.post("/carrera", async(req, res) => {
    const carrera = await Carrera.create({
        nombre_carrera: req.body.nombre_carrera
        // otros campos...
      });
    res.status(201).json({
        ok:true,
        status:201,
        message:"Producto Creado exitosamente",
    });
});

module.exports = router;
