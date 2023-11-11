import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import axios from 'axios';
import Navbar from './Navbar';

const AssociationPC = () => {
    const [profesores, setProfesores] = useState([]);
    const [comites, setComites] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [selectedComite, setSelectedComite] = useState(null);
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
        const obtenerComites = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/comites/obtener');
                setComites(response.data);
            } catch (error) {
                console.error('Error al obtener comités:', error);
            }
        };

        obtenerComites();
    }, []);

    useEffect(() => {
        const obtenerProfesorDetalle = async () => {
            try {
                if (selectedProfesor && selectedComite) {

                }
            } catch (error) {
                console.error('Error al obtener detalles de profesor y comité:', error);
            }
        };

        obtenerProfesorDetalle();
    }, [selectedProfesor, selectedComite]);

    const customItemTemplate = (option) => {
        return (
            <div>
                <div>{option.Nombre}</div>
                <div>{option.Apellido}</div>
            </div>
        );
    };

    const handleGuardarClick = async () => {
        try {
            if (selectedProfesor && selectedComite) {

                setSelectedProfesor(null);
                setSelectedComite(null);

                console.log('Guardado exitoso');
                toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Guardado exitoso' });
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al guardar' });
        }
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

                        {/* Nuevo Dropdown para comités */}
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="comiteDropdown">Comité</label>
                            <Dropdown
                                id="comiteDropdown"
                                value={selectedComite}
                                options={comites}
                                optionLabel="lugarEvaluacion.Lugar"
                                optionValue="Id_Comite"
                                onChange={(e) => setSelectedComite(e.value)}
                                placeholder="Selecciona un comité"
                                showClear
                                filter
                                filterPlaceholder="Buscar comité"
                            />
                        </div>
                        <Button onClick={handleGuardarClick}>Guardar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssociationPC;
