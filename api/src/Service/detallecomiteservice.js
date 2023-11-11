
const DetalleComite = require("../model/detalleComite.model");

class DetalleComiteService {
    async obtenerDetallesPorIdComite(idComite) {
        try {
            const detalles = await DetalleComite.findAll({
                where: {
                    Id_Comite: idComite
                }
            });
            return detalles;
        } catch (error) {
            throw new Error(`Error al obtener detalles del comité: ${error.message}`);
        }
    }

}

module.exports = new DetalleComiteService();
