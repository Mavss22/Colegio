import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputSwitch } from 'primereact/inputswitch';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Navbar from './Navbar';

const UpdateProject = () => {
    const [profesores, setProfesores] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [tfcs, setTfcs] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [selectedTfc, setSelectedTfc] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [isAlumno, setisAlumno] = useState(false); // Nuevo estado para el switch
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

        const obtenerMaestros = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/maestro/obtener'); // Cambia la URL según tu API
                setAlumnos(response.data);
            } catch (error) {
                console.error('Error al obtener maestros:', error);
            }
        };

        const obtenerAlumnos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/alumno/obtener');
                setAlumnos(response.data);
            } catch (error) {
                console.error('Error al obtener alumnos:', error);
            }
        };

        const obtenerTfcs = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/tfc/obtener');
                setTfcs(response.data);
            } catch (error) {
                console.error('Error al obtener tfcs:', error);
            }
        };

        obtenerProfesores();
        obtenerMaestros(); // Agrega la función para obtener maestros
        obtenerAlumnos();
        obtenerTfcs();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if ((!isAlumno && !selectedProfesor) || (isAlumno && !selectedAlumno) || !selectedAlumno || !selectedTfc || !fechaInicio || !fechaFin) {
            showToast('error', 'Error', 'Completa todos los campos antes de registrar el tema');
            return;
        }

        try {
            const formattedFechaInicio = fechaInicio.toISOString().slice(0, 19).replace("T", " ");
            const formattedFechaFin = fechaFin.toISOString().slice(0, 19).replace("T", " ");

            // Utiliza el id correspondiente según si es maestro o profesor
            const idProfesorAlumno = isAlumno ? selectedAlumno : selectedProfesor;

            const response = await axios.post('http://localhost:3001/api/v1/historialAsesoria/guardar', {
                Id_Profesor: idProfesorAlumno,
                Id_Alumno: selectedAlumno,
                Id_TFC: selectedTfc,
                Fecha_Inic: formattedFechaInicio,
                Fecha_Fin: formattedFechaFin,
            });

            showToast('success', 'Éxito', 'Tema registrado exitosamente');
            console.log('Datos enviados exitosamente:', response.data);

            setisAlumno(false); 
            setSelectedProfesor(null);
            setSelectedAlumno(null);
            setSelectedTfc(null);
            setFechaInicio(null);
            setFechaFin(null);
        } catch (error) {
            showToast('error', 'Error', 'Error al registrar tema');
            console.error('Error al enviar los datos:', error);
        }
    };

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    const customProfesorItemTemplate = (option) => {
        return (
            <div>
                <div>{option.Nombre} {option.Apellido}</div>
            </div>
        );
    };


    const customAlumnoItemTemplate = (option) => {
        return (
            <div>
                <div>{option.Nombre} {option.Apellido}</div>
                <div>Carné: {option.Carné}</div>
            </div>
        );
    };

    const customTfcItemTemplate = (option) => {
        return (
            <div>
                <div>{option.Nombre_Tema}</div>
            </div>
        );
    };

    return (
        <div>
            <Navbar />
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Toast ref={toast} />
                <div className="flex flex-column md:flex-row">
                    <div className="w-full md:w-10 flex flex-column align-items-center justify-content-center gap-5 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="switchMaestroProfesor">Alumno/Profesor</label>
                            <InputSwitch
                                id="switchMaestroProfesor"
                                checked={isAlumno}
                                onChange={(e) => setisAlumno(e.value)}
                            />
                        </div>
                        {isAlumno ? (
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
                                    itemTemplate={customAlumnoItemTemplate}
                                />
                            </div>
                        ) : (
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
                                    itemTemplate={customProfesorItemTemplate}
                                />
                            </div>
                        )}

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
                                itemTemplate={customAlumnoItemTemplate}
                            />
                        </div>

                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="tfcDropdown">TFC</label>
                            <Dropdown
                                id="tfcDropdown"
                                value={selectedTfc}
                                options={tfcs}
                                optionLabel="Nombre_Tema"
                                optionValue="Id_TFC"
                                onChange={(e) => setSelectedTfc(e.value)}
                                placeholder="Selecciona un TFC"
                                showClear
                                filter
                                filterPlaceholder="Buscar TFC"
                                itemTemplate={customTfcItemTemplate}
                            />
                        </div>

                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="fechaInicio">Fecha de Inicio</label>
                            <Calendar
                                id="fechaInicio"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.value)}
                                showIcon
                                dateFormat="yy-mm-dd"
                            />
                        </div>

                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="fechaFin">Fecha de Fin</label>
                            <Calendar
                                id="fechaFin"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.value)}
                                showIcon
                                dateFormat="yy-mm-dd"
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
