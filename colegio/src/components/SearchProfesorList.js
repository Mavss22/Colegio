import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import Navbar from './Navbar';

const SearchProfesorList = () => {
    const [profesores, setProfesores] = useState([]);

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

    return (
        <div>
            <Navbar/>
            <div className="card">
                <DataTable value={profesores} responsiveLayout="scroll">
                    <Column field="Id_Profesor" header="ID"></Column>
                    <Column field="Nombre" header="Nombre"></Column>
                    <Column field="Apellido" header="Apellido"></Column>
                    <Column field="Carnet" header="Carnet"></Column>
                    <Column field="Fecha_Nac" header="Fecha de Nacimiento"></Column>
                    <Column field="DPI" header="DPI"></Column>
                    <Column field="Telefono" header="Teléfono"></Column>
                    <Column field="Dirección" header="Dirección"></Column>
                </DataTable>
            </div>
        </div>
    );
};

export default SearchProfesorList;
