const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});

class DetalleComite extends Model { }

DetalleComite.init(
    {
        Id_Detalle: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Id_Comite: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Id_Profesor: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "DetalleComite",
        tableName: "Detalle_Comite",
        timestamps: false
    }
);

module.exports = DetalleComite;
