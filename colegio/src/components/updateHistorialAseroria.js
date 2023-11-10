import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import Navbar from './Navbar';

const UpdateProject = () => {
    const [profesores, setProfesores] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [inputFechaFin, setInputFechaFin] = useState('');
    const [inputFechaInicio, setInputFechaInicio] = useState('');
    const [selectedProyecto, setSelectedProyecto] = useState(null);
    const [inputIdAsesoria, setInputIdAsesoria] = useState('');
    const toast = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profesoresResponse = await axios.get('http://localhost:3001/api/v1/profesor/obtener');
                setProfesores(profesoresResponse.data);

                const alumnosResponse = await axios.get('http://localhost:3001/api/v1/alumno/obtener');
                setAlumnos(alumnosResponse.data);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!inputFechaFin || !inputFechaInicio) {
            showToast('error', 'Error', 'Completa todos los campos antes de registrar el tema');
            return;
        }

        try {
            const formattedFechaInicio = new Date(inputFechaInicio).toISOString().slice(0, 19).replace("T", " ");
            const formattedFechaFin = new Date(inputFechaFin).toISOString().slice(0, 19).replace("T", " ");


            const response = await axios.put(`http://localhost:3001/api/v1/historialAsesoria/${inputIdAsesoria}`, {
                Fecha_Inic: formattedFechaInicio,
                Fecha_Fin: formattedFechaFin,
            });

            showToast('success', 'Éxito', 'Tema actualizado exitosamente');
            console.log('Datos enviados exitosamente:', response.data);

            setSelectedProfesor(null);
            setSelectedAlumno(null);
            setInputFechaInicio(null);
            setInputFechaFin(null);
        } catch (error) {
            showToast('error', 'Error', 'Error al actualizar tema');
            console.error('Error al enviar los datos:', error);
        }
    };


    const buscarRelacion = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/historialAsesoria/obtener-relacion/${selectedProfesor}/${selectedAlumno}`);
            if (response.status === 200) {
                if (response.data.length > 0) {
                    const idTFC = response.data[0]?.Id_TFC;
                    const proyectoResponse = await axios.get(`http://localhost:3001/api/v1/tfc/obtener/por/${idTFC}`);
                    if (proyectoResponse.status === 200) {
                        setSelectedProyecto(proyectoResponse.data);
                    } else {
                        showToast('error', 'Error', 'Error al obtener el proyecto asociado al TFC');
                    }
                    setInputFechaFin(response.data[0]?.Fecha_Fin || '');
                    setInputFechaInicio(response.data[0]?.Fecha_Inic || '');
                    setInputIdAsesoria(response.data[0]?.Id_Asesoria || '');
                    showToast('success', 'Éxito', 'Relación encontrada exitosamente');
                } else {
                    showToast('error', 'Error', 'No se encontraron datos para la relación');
                }
            } else if (response.status === 404 || response.status === 304) {
                showToast('error', 'Error', 'La relación no fue encontrada o no ha sido modificada');
            } else {
                showToast('error', 'Error', `Error al buscar la relación. Estado: ${response.status}`);
            }

        } catch (error) {
            showToast('error', 'Error', 'La relación puede no existir');
            console.error('Error al buscar la relación:', error);
        }
    };

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    return (
        <div>
            <Navbar />
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Toast ref={toast} />
                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-10 flex flex-column align-items-center justify-content-center gap-3 py-5">
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
                            />
                        </div>

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
                            />
                        </div>

                        <div className="flex flex-wrap justify-content-center align-items-center gap-3">
                            <Button label="Buscar Relación" icon="pi pi-search" onClick={buscarRelacion} />
                        </div>

                        <div className="flex flex-wrap justify-content-center align-items-center gap-3">
                            <label htmlFor="fechaInicio">Fecha de Inicio</label>
                            <input
                                id="fechaInicio"
                                type="date"
                                value={inputFechaInicio}
                                onChange={(e) => setInputFechaInicio(e.target.value)}
                                style={{ borderRadius: '8px', padding: '8px' }}
                            />
                        </div>

                        <div className="flex flex-wrap justify-content-center align-items-center gap-3">
                            <label htmlFor="fechaFin">Fecha de Fin</label>
                            <input
                                id="fechaFin"
                                type="date"
                                value={inputFechaFin}
                                onChange={(e) => setInputFechaFin(e.target.value)}
                                style={{ borderRadius: '8px', padding: '8px' }}
                            />
                        </div>

                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="proyectoTextarea">Proyecto</label>
                            <InputTextarea
                                id="proyectoTextarea"
                                value={selectedProyecto ? selectedProyecto.Nombre_Tema : ''}
                                rows={5}
                                autoResize
                                readOnly
                                style={{ borderRadius: '8px', padding: '8px' }}
                            />
                        </div>

                        <Button label="Registrar" icon="pi pi-check" onClick={handleFormSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProject;
