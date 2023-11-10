import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import Navbar from './Navbar';

const SearchAjoinP = () => {
    const [profesores, setProfesores] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [detallesAlumnos, setDetallesAlumnos] = useState([]);
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
                if (selectedProfesor) {
                    const response = await axios.get(`http://localhost:3001/api/v1/historialAsesoria/obtener/profesor/${selectedProfesor}`);
                    const idAlumnos = response.data.map((item) => item.Id_Alumno);
                    const detallesAlumnos = await Promise.all(idAlumnos.map(async (idAlumno) => {
                        const respuestaAlumno = await axios.get(`http://localhost:3001/api/v1/alumno/obtener/por/${idAlumno}`);
                        return respuestaAlumno.data;
                    }));

                    setDetallesAlumnos(detallesAlumnos);
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
                {detallesAlumnos.length > 0 && (
                    <DataTable value={detallesAlumnos} paginator rows={5}>
                        <Column field="Nombre" header="Nombre" />
                        <Column field="Apellido" header="Apellido" />
                        <Column field="Carné" header="Carnet" />
                        <Column field="Fecha_Nac" header="Fecha Nacimiento" />
                        <Column field="Dpi" header="DPI" />
                        <Column field="Telefono" header="Telefono" />
                        <Column field="Dirección" header="Dirección" />
                    </DataTable>
                )}
            </div>
        </div>
    );
};

export default SearchAjoinP;

