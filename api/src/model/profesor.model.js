const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});

class Profesor extends Model { }

Profesor.init({
    Id_Profesor: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Id_Grado: {
        type: DataTypes.INTEGER,
        references: {
            model: 'GradoAcademico', 
            key: 'Id_Grado', 
        }
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Carnet: {
        type: DataTypes.STRING,
        unique: true
    },
    Fecha_Nac: {
        type: DataTypes.DATE
    },
    DPI: {
        type: DataTypes.BIGINT,
        unique: true
    },
    Telefono: {
        type: DataTypes.INTEGER
    },
    Dirección: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Profesor',
    tableName: 'Profesor',
    timestamps: false,
});

module.exports = Profesor;


async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Todo correcto");
    } catch (error) {
        console.error("No todo correcto ", error);
    }
}

testConnection();