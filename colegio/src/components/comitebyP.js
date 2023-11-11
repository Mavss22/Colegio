import React, { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Navbar from './Navbar';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const ComiteByProfesor = () => {
    const [comites, setComites] = useState([]);
    const [selectedComite, setSelectedComite] = useState(null);
    const [detalleComite, setDetalleComite] = useState([]);
    const [profesorInfo, setProfesorInfo] = useState(null);

    useEffect(() => {
        // Lógica para obtener los comites desde la API
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/v1/comites/obtener');
                const data = await response.json();
                setComites(data);
            } catch (error) {
                console.error('Error al obtener los comites:', error);
            }
        };

        fetchData();
    }, []);

    const comiteTemplate = (comite) => {
        return (
            <div>
                <div>ID: {comite.Id_Comite}</div>
                <div>Fecha Creación: {comite.Fecha_Creacion}</div>
                <div>Lugar de Evaluación: {comite.lugarEvaluacion.Lugar}</div>
            </div>
        );
    };

    const fetchDetalleComite = async (comiteId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/detalleComite/obtener/por/id/${comiteId}`);
            const data = await response.json();
            setDetalleComite(data);
        } catch (error) {
            console.error('Error al obtener los detalles del comite:', error);
        }
    };

    const fetchProfesorInfo = async (profesorId) => {
        try {
            const response = await fetch(`http://localhost:3001/api/v1/profesor/obtener/por/${profesorId}`);
            const data = await response.json();
            setProfesorInfo(data);
        } catch (error) {
            console.error('Error al obtener la información del profesor:', error);
        }
    };

    const handleComiteChange = async (e) => {
        const selectedComite = e.value;
        setSelectedComite(selectedComite);

        if (selectedComite) {
            await fetchDetalleComite(selectedComite.Id_Comite);

            // Puedes ajustar esto dependiendo de la estructura de tu respuesta de detalleComite
            const profesorIds = detalleComite.map((detalle) => detalle.Id_Profesor);

            // Puedes mejorar esto utilizando Promise.all para hacer las llamadas de manera concurrente
            for (const profesorId of profesorIds) {
                await fetchProfesorInfo(profesorId);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-10 flex flex-column align-items-center justify-content-center gap-3 py-4">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <h3>Seleccionar Comité:</h3>
                        <Dropdown
                            value={selectedComite}
                            options={comites}
                            onChange={handleComiteChange}
                            optionLabel="Fecha_Creacion"
                            itemTemplate={comiteTemplate}
                            placeholder="Seleccione un comité"
                        />
                    </div>
                    {selectedComite && (
                        <div>
                            <h4>Información del Comité Seleccionado:</h4>
                            {comiteTemplate(selectedComite)}
                        </div>
                    )}
                </div>
                <div className="w-full md:w-10">
                    {detalleComite.length > 0 && (
                        <div>
                            <h4>Detalles del Comité:</h4>
                            <DataTable value={detalleComite}>
                                <Column field="Id_Detalle" header="ID Detalle" />
                                <Column field="Id_Comite" header="ID Comité" />
                                <Column field="Id_Profesor" header="ID Profesor" />
                                <Column
                                    header="Información del Profesor"
                                    body={(rowData) => (
                                        <span>
                                            {profesorInfo ? `${profesorInfo.Nombre} ${profesorInfo.Apellido}` : 'Cargando...'}
                                        </span>
                                    )}
                                />
                            </DataTable>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ComiteByProfesor;
