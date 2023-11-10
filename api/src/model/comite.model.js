const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});

class Comite extends Model { }

Comite.init({
    Id_Comite: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Fecha_Creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Id_Lugar_Evaluacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comite',
    tableName: 'Comite',
    timestamps: false,
});

const LugarEvaluacion = require('./lugarEvaluacion.model');

Comite.belongsTo(LugarEvaluacion, {
    foreignKey: 'Id_Lugar_Evaluacion',
    as: 'lugarEvaluacion',
})

module.exports = Comite;
