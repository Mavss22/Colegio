import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Navbar from './Navbar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const UpdateProfesor = () => {
    const [profesores, setProfesores] = useState([]);
    const [selectedProfesor, setSelectedProfesor] = useState(null);
    const [gradosAcademicos, setGradosAcademicos] = useState([]);
    const [selectedGradoAcademico, setSelectedGradoAcademico] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [carnet, setCarnet] = useState('');
    const [fechaNac, setFechaNac] = useState('');
    const [dpi, setDpi] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
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

        const obtenerGradosAcademicos = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/v1/gradoAcademico/obtener');
                setGradosAcademicos(response.data);
            } catch (error) {
                console.error('Error al obtener grados académicos:', error);
            }
        };

        obtenerProfesores();
        obtenerGradosAcademicos();
    }, []);

    useEffect(() => {
        const obtenerProfesorDetalle = async () => {
            try {
                if (selectedProfesor) {
                    const response = await axios.get(`http://localhost:3001/api/v1/profesor/obtener/por/${selectedProfesor}`);
                    const profesorDetalle = response.data;
                    setSelectedGradoAcademico(profesorDetalle.Id_Grado);
                    setNombre(profesorDetalle.Nombre);
                    setApellido(profesorDetalle.Apellido);
                    setCarnet(profesorDetalle.Carnet);
                    setFechaNac(new Date(profesorDetalle.Fecha_Nac));
                    setDpi(profesorDetalle.DPI);
                    setTelefono(profesorDetalle.Telefono);
                    setDireccion(profesorDetalle.Dirección);
                }
            } catch (error) {
                console.error('Error al obtener detalles del profesor:', error);
            }
        };

        obtenerProfesorDetalle();
    }, [selectedProfesor]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProfesor || !selectedGradoAcademico || !nombre.trim() || !apellido.trim() || !carnet.trim() || !fechaNac || !dpi.toString().trim() || !telefono.toString().trim() || !direccion.trim()) {
            showToast('error', 'Error', 'Todos los campos son requeridos');
            return;
        }        

        const formattedFechaNac = fechaNac.toISOString().slice(0, 19).replace("T", " ");

        try {
            const response = await axios.put(`http://localhost:3001/api/v1/profesor/actualizar/${selectedProfesor}`, {
                Id_Grado: selectedGradoAcademico.Id_Grado,
                Nombre: nombre,
                Apellido: apellido,
                Carnet: carnet,
                Fecha_Nac: formattedFechaNac,
                DPI: dpi,
                Telefono: telefono,
                Dirección: direccion,
            });

            console.log(response);
            showToast('success', 'Éxito', 'Profesor actualizado exitosamente');
            console.log('Datos enviados exitosamente:', response.data);

            setSelectedProfesor(null);
            setSelectedGradoAcademico(null);
            setNombre('');
            setApellido('');
            setCarnet('');
            setFechaNac('');
            setDpi('');
            setTelefono('');
            setDireccion('');
        } catch (error) {
            showToast('error', 'Error', 'Error al actualizar profesor');
            console.error('Error al enviar los datos:', error);
        }
    };

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
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

                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="gradoAcademico">Grado Académico</label>
                            <Dropdown
                                id="gradoAcademico"
                                value={selectedGradoAcademico}
                                options={gradosAcademicos}
                                optionLabel="Nombre_Grado"
                                onChange={(e) => setSelectedGradoAcademico(e.value)}
                                placeholder="Selecciona un grado académico"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-column align-items-center justify-content-center gap-2 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="nombre">Nombre</label>
                        <InputText id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="apellido">Apellido</label>
                        <InputText id="apellido" type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="carnet">Carnet</label>
                        <InputText id="carnet" type="text" value={carnet} onChange={(e) => setCarnet(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="fechaNac">Fecha de Nacimiento</label>
                        <Calendar
                            id="fechaNac"
                            value={fechaNac}
                            onChange={(e) => setFechaNac(e.value)}
                            showIcon={true}
                            dateFormat="dd/mm/yy"
                        />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="dpi">DPI</label>
                        <InputText
                            id="dpi"
                            type="number"
                            value={dpi}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue.length <= 9) {
                                    setDpi(inputValue);
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="telefono">Teléfono</label>
                        <InputText
                            id="telefono"
                            type="number"
                            value={telefono}
                            onChange={(e) => {
                                const inputValue = e.target.value;
                                if (inputValue.length <= 8) {
                                    setTelefono(inputValue);
                                }
                            }}
                        />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="direccion">Dirección</label>
                        <InputTextarea
                            id="direccion"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            rows={5}
                            cols={30}
                        />
                    </div>
                    <Button label="Actualizar Profesor" icon="pi pi-check" onClick={handleFormSubmit} />
                </div>
            </div>
        </div>
    );
};

export default UpdateProfesor;
