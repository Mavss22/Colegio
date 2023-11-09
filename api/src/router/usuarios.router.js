const router = require("express").Router();
const Usuario = require('../model/usuarios.model');
const bcrypt = require("bcrypt");

router.get('/obtener', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post("/login", async (req, res) => {
    const { usuario, contrasena } = req.body;

    try {
        const usuarioEncontrado = await Usuario.findOne({ where: { usuario } });
        if (usuarioEncontrado) {
            const contrasenaValida = bcrypt.compareSync(contrasena, usuarioEncontrado.contrasena);
            if (contrasenaValida === true) {
                res.status(200).json({ message: "Contraseña correcta" });
            } else {
                res.status(401).json({ error: "Contraseña incorrecta" });
            }
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error al autenticar usuario" });
    }

});


router.post('/encriptar', async (req, res) => {
    const { contrasena } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasena, saltRounds);
        res.json({ hashedPassword });
    } catch (error) {
        res.status(500).json({ error: 'Error al encriptar la contraseña' });
    }
});

module.exports = router;
