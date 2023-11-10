import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import Navbar from './Navbar';

const SearchCjoinP = () => {
    const [comitesTotales, setComitesTotales] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        const obtenerProfesores = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/profesor/obtener');
                setProfesores(response.data);
            } catch (error) {
                console.error('Error al obtener profesores:', error);
            }
        };

        obtenerProfesores();
    }, []);

    useEffect(() => {
        const obtenerProfesorDetalle = async () => {
            try {
                // ...

                if (selectedProfesor) {
                    try {
                        const responseAsesorias = await axios.get(`http://localhost:3001/api/v1/historialAsesoria/obtener/profesor/${selectedProfesor}`);
                        const idAlumnos = responseAsesorias.data.map((item) => item.Id_Alumno);

                        const detallesComites = await Promise.all(idAlumnos.map(async (idAlumno) => {
                            const responseDetalleComite = await axios.get(`http://localhost:3001/api/v1/detalleComite/obtener/por/idprofesor/${idAlumno}`);
                            const idComites = responseDetalleComite.data.map((detalle) => detalle.Id_Comite);
                            const comites = await Promise.all(idComites.map(async (idComite) => {
                                const responseComite = await axios.get(`http://localhost:3001/api/v1/comites/obtener/por/${idComite}`);
                                return responseComite.data;
                            }));

                            return comites;
                        }));

                        const comitesTotales = detallesComites.flat();
                        setComitesTotales(comitesTotales);
                    } catch (error) {
                        console.error('Error al obtener detalles de comités:', error);
                    }
                }



            } catch (error) {
            }
        };

        obtenerProfesorDetalle();
    }, [selectedProfesor]);

    const customItemTemplate = (option) => {
        return (
            <div>
                <div>{option.Nombre}</div>
                <div>{option.Apellido}</div>
            </div>
        );
    };

    return (
        <div>
            <Navbar />
            <div className="card">
                <Toast ref={toast} />
                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-10 flex flex-column align-items-center justify-content-center gap-3 py-4">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="profesorDropdown">Profesor</label>
                            <Dropdown
                                id="profesorDropdown"
                                value={selectedProfesor}
                                options={profesores}
                                optionLabel="Nombre"
                                optionValue="Id_Profesor"
                                onChange={(e) => setSelectedProfesor(e.value)}
                                placeholder="Selecciona un profesor"
                                showClear
                                filter
                                filterPlaceholder="Buscar profesor"
                                itemTemplate={customItemTemplate}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="card">
                        <DataTable value={comitesTotales} paginator rows={5}>
                            <Column field="Id_Comite" header="ID Comité" />
                            <Column field="Fecha_Creacion" header="Fecha Creación" />
                            <Column field="Id_Lugar_Evaluacion" header="ID Lugar Evaluación" />
                            <Column field="lugarEvaluacion.Id_Lugar" header="ID Lugar" />
                            <Column field="lugarEvaluacion.Lugar" header="Lugar Evaluación" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchCjoinP;

