const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});

class Usuario extends Model { }

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value) {
                const hash = bcrypt.hashSync(value, 10);
                this.setDataValue("contrasena", hash);
            },
        }
    },
    {
        sequelize,
        modelName: "Usuario",
        tableName: "usuarios", 
        timestamps: false
    }
);

module.exports = Usuario;
