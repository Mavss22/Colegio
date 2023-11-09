const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});

class DetalleGrupoInvestigacion extends Model { }

DetalleGrupoInvestigacion.init(
    {
        Id_Detalle: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Id_Grupo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Id_Estudiante: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "DetalleGrupoInvestigacion",
        tableName: "Detalle_Grupo_Investigacion",
        timestamps: false
    }
);

module.exports = DetalleGrupoInvestigacion;
