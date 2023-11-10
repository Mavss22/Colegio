import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Navbar from './Navbar';

const DeleteProfesor = () => {
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

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const confirmDelete = async () => {
        confirmDialog({
            message: '¿Estás seguro de que deseas eliminar este profesor?',
            header: 'Confirmar Eliminación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                try {
                    console.log(selectedProfesor);
                    const response = await axios.delete(`http://localhost:3001/api/v1/profesor/eliminar/${selectedProfesor.Id_Profesor}`);
                    console.log(response);
                    showToast('success', 'Eliminación Exitosa', 'El profesor ha sido eliminado con éxito');
                    setSelectedProfesor(null); 
                } catch (error) {
                    console.error('Error al eliminar profesor:', error);
                    showToast('error', 'Error', 'Error al eliminar profesor');
                }
            },
            reject: () => {
                showToast('warn', 'Eliminación Cancelada', 'Se canceló la eliminación del profesor');
                setSelectedProfesor(null); 
            }
        });
    };

    return (
        <div>
            <Navbar />
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Toast ref={toast} />
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label htmlFor="profesorDropdown">Profesor</label>
                    <Dropdown
                        id="profesorDropdown"
                        value={selectedProfesor}
                        options={profesores}
                        optionLabel="Nombre"
                        onChange={(e) => setSelectedProfesor(e.value)}
                        placeholder="Selecciona un profesor"
                        showClear
                        filter
                        filterPlaceholder="Buscar profesor"
                    />
                    {selectedProfesor && (
                        <Button onClick={confirmDelete} icon="pi pi-times" label="Eliminar" />
                    )}
                </div>

                <ConfirmDialog />
            </div>
        </div>
    );
};

export default DeleteProfesor;
