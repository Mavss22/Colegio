const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});


class Carrera extends Model { }

Carrera.init({
    Id_Carrera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_carrera: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Carrera",
    tableName: 'Carrera',
    timestamps: false
});

module.exports = Carrera;


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Todo correcto");
    } catch (error) {
        console.error("No todo correcto ", error);
    }
}

testConnection();