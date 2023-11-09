import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Navbar from './Navbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SearchProfesor = () => {
    const [profesores, setProfesores] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [profesorDetalles, setProfesorDetalles] = useState(null);
    const [gradoAcademico, setGradoAcademico] = useState(null);
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
                    const response = await axios.get(`http://localhost:3001/api/v1/profesor/obtener/por/${selectedProfesor}`);
                    setProfesorDetalles(response.data);
                    obtenerGradoAcademico(response.data.Id_Grado);
                }
            } catch (error) {
                console.error('Error al obtener detalles del profesor:', error);
            }
        };

        obtenerProfesorDetalle();
    }, [selectedProfesor]);

    const obtenerGradoAcademico = async (idGrado) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/gradoAcademico/obtener/${idGrado}`);
            setGradoAcademico(response.data.Nombre_Grado);
        } catch (error) {
            console.error('Error al obtener grado académico:', error);
        }
    };


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

                {gradoAcademico && (
                    <div className="p-mt-4">
                        <h4>Grado Académico:</h4>
                        <p>{gradoAcademico}</p>
                    </div>
                )}

                {profesorDetalles && (
                    <div className="p-mt-4">
                        <DataTable value={[profesorDetalles]} responsive="true">
                            <Column field="Id_Profesor" header="ID" />
                            <Column field="Nombre" header="Nombre" />
                            <Column field="Apellido" header="Apellido" />
                            <Column field="Carnet" header="Carnet" />
                            <Column field="DPI" header="DPI" />
                            <Column field="Fecha_Nac" header="Fecha Nacimiento" />
                            <Column field="Telefono" header="Telefono" />
                        </DataTable>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchProfesor;
