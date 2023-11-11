import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Navbar from './Navbar';

const DeleteEstudiante = () => {
    const [estudiantes, setEstudiantes] = useState([]);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const toast = useRef(null);

    useEffect(() => {
        const obtenerEstudiantes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/alumno/obtener');
                setEstudiantes(response.data);
            } catch (error) {
                console.error('Error al obtener estudiantes:', error);
            }
        };

        obtenerEstudiantes();
    }, []);

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const confirmDelete = async () => {
        confirmDialog({
            message: '¿Estás seguro de que deseas eliminar este estudiante?',
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    const response = await axios.delete(`http://localhost:3001/api/v1/alumno/eliminar/${selectedEstudiante.Id_Alumno}`);
                    showToast('success', 'Eliminación Exitosa', 'El estudiante ha sido eliminado con éxito');
                    setSelectedEstudiante(null); 
                } catch (error) {
                    console.error('Error al eliminar estudiante:', error);
                    showToast('error', 'Error', 'Error al eliminar estudiante');
                }
            },
            reject: () => {
                showToast('warn', 'Eliminación Cancelada', 'Se canceló la eliminación del estudiante');
                setSelectedEstudiante(null); 
            }
        });
    };

    return (
        <div>
            <Navbar />
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Toast ref={toast} />
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label htmlFor="estudianteDropdown">Estudiante</label>
                    <Dropdown
                        id="estudianteDropdown"
                        value={selectedEstudiante}
                        options={estudiantes}
                        optionLabel="Nombre"
                        onChange={(e) => setSelectedEstudiante(e.value)}
                        placeholder="Selecciona un estudiante"
                        showClear
                        filter
                        filterPlaceholder="Buscar estudiante"
                    />
                    {selectedEstudiante && (
                        <Button onClick={confirmDelete} icon="pi pi-times" label="Eliminar" />
                    )}
                </div>

                <ConfirmDialog />
            </div>
        </div>
    );
};

export default DeleteEstudiante;
