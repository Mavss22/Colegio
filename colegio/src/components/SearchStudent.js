import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Navbar from './Navbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SearchAlumno = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [alumnoDetalles, setAlumnoDetalles] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        const obtenerAlumnos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/alumno/obtener');
                setAlumnos(response.data);
            } catch (error) {
                console.error('Error al obtener alumnos:', error);
            }
        };

        obtenerAlumnos();
    }, []);

    useEffect(() => {
        const obtenerAlumnoDetalle = async () => {
            try {
                if (selectedAlumno) {
                    const response = await axios.get(`http://localhost:3001/api/v1/alumno/obtener/por/${selectedAlumno}`);
                    setAlumnoDetalles(response.data);
                }
            } catch (error) {
                console.error('Error al obtener detalles del alumno:', error);
            }
        };

        obtenerAlumnoDetalle();
    }, [selectedAlumno]);

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
                            <label htmlFor="alumnoDropdown">Alumno</label>
                            <Dropdown
                                id="alumnoDropdown"
                                value={selectedAlumno}
                                options={alumnos}
                                optionLabel="Nombre"
                                optionValue="Id_Alumno"
                                onChange={(e) => setSelectedAlumno(e.value)}
                                placeholder="Selecciona un alumno"
                                showClear
                                filter
                                filterPlaceholder="Buscar alumno"
                                itemTemplate={customItemTemplate}
                            />
                        </div>
                    </div>
                </div>

                {alumnoDetalles && (
                    <div className="p-mt-4">
                        <DataTable value={[alumnoDetalles]} responsive="true">
                            <Column field="Id_Alumno" header="ID" />
                            <Column field="Nombre" header="Nombre" />
                            <Column field="Apellido" header="Apellido" />
                            <Column field="Carné" header="Carné" />
                            <Column field="Fecha_Nac" header="Fecha Nacimiento" />
                            <Column field="Dpi" header="DPI" />
                            <Column field="Telefono" header="Telefono" />
                            <Column field="Dirección" header="Dirección" />
                        </DataTable>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchAlumno;
