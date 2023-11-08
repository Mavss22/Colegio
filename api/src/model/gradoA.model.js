const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});


class GradoAcademico extends Model { }

GradoAcademico.init({
    Id_Grado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre_Grado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'GradoAcademico',
    tableName: 'Grado_Academico',
    timestamps: false,
});

module.exports = GradoAcademico;







// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log("Todo correcto");
//     } catch (error) {
//         console.error("No todo correcto ", error);
//     }
// }

// testConnection();