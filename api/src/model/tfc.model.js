const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});


class TFC extends Model { }


TFC.init({
    Id_TFC: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre_Tema: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'TFC',
    tableName: 'TFC',
    timestamps: false,
});


module.exports = TFC;

// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log("Todo correcto");
//     } catch (error) {
//         console.error("No todo correcto ", error);
//     }
// }

// testConnection();