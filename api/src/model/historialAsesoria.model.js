const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const sequelize = new Sequelize('bd_col', 'root', '0804', {
    host: "localhost",
    dialect: "mysql",
    port: 3307
});

class HistorialAsesoria extends Model { 

static async obtenerRelacion(idProfesor, idAlumno) {
    try {
        const relaciones = await this.findAll({
            attributes: [
                'Id_Profesor',
                'Id_Alumno',
                'Id_TFC', 
                'Fecha_Inic',
                'Fecha_Fin',
            ],
            where: {
                [Op.and]: [
                    { Id_Profesor: idProfesor },
                    { Id_Alumno: idAlumno }
                ]
            },
            group: ['Id_Profesor', 'Id_Alumno', 'Id_TFC', 'Fecha_Inic', 'Fecha_Fin'],
        });

        return relaciones;
    } catch (error) {
        throw new Error(`Error al obtener la relación: ${error.message}`);
    }
}
}


HistorialAsesoria.init({
    Id_Asesoria: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Id_Profesor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Profesor',
            key: 'Id_Profesor',
        }
    },
    Id_Alumno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Alumno',
            key: 'Id_Alumno',
        }
    },
    Id_TFC: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'TFC',
            key: 'Id_TFC',
        }
    },
    Fecha_Inic: {
        type: DataTypes.DATE
    },
    Fecha_Fin: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'HistorialAsesoria',
    tableName: 'Historial_Asesoria',
    timestamps: false,
});

module.exports = HistorialAsesoria;


// async function testConnection() {
//     try {
//         await sequelize.authenticate();
//         console.log("Todo correcto");
//     } catch (error) {
//         console.error("No todo correcto ", error);
//     }
// }

// testConnection();