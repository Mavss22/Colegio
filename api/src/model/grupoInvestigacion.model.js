const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});

class GrupoInvestigacion extends Model { }

GrupoInvestigacion.init(
    {
        Id_Grupo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Nombre_Grupo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "GrupoInvestigacion",
        tableName: "Grupo_Investigacion",
        timestamps: false
    }
);

module.exports = GrupoInvestigacion;
