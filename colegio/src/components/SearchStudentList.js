import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import Navbar from './Navbar';

const SearchAlumnoList = () => {
    const [alumnos, setAlumnos] = useState([]);

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

    return (
        <div>
            <Navbar />
            <div className="card">
                <DataTable value={alumnos} responsiveLayout="scroll">
                    <Column field="Id_Alumno" header="ID"></Column>
                    <Column field="Nombre" header="Nombre"></Column>
                    <Column field="Apellido" header="Apellido"></Column>
                    <Column field="Carné" header="Carné"></Column>
                    <Column field="Fecha_Nac" header="Fecha de Nacimiento"></Column>
                    <Column field="Dpi" header="DPI"></Column>
                    <Column field="Telefono" header="Teléfono"></Column>
                    <Column field="Dirección" header="Dirección"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default SearchAlumnoList;
