const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});


class Alumno extends Model { }


Alumno.init({
    Id_Alumno: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Id_Carrera: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Carrera',
            key: 'Id_Carrera', 
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
    Carné: {
        type: DataTypes.STRING,
        unique: true
    },
    Fecha_Nac: {
        type: DataTypes.DATE
    },
    Dpi: {
        type: DataTypes.INTEGER
    },
    Telefono: {
        type: DataTypes.INTEGER
    },
    Dirección: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Alumno',
    tableName: 'Alumno',
    timestamps: false,
});

module.exports = Alumno;

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Todo correcto");
    } catch (error) {
        console.error("No todo correcto ", error);
    }
}

testConnection();