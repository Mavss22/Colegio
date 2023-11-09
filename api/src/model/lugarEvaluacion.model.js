const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});

class LugarEvaluacion extends Model { }

LugarEvaluacion.init({
    Id_Lugar: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Lugar: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'LugarEvaluacion',
    tableName: 'Lugar_Evaluacion',
    timestamps: false,
});

module.exports = LugarEvaluacion;
