import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Navbar from './Navbar';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';

const UpdateAlumno = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [carnet, setCarnet] = useState('');
    const [fechaNac, setFechaNac] = useState('');
    const [dpi, setDpi] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const toast = useRef(null);

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

    useEffect(() => {
        const obtenerAlumnoDetalle = async () => {
            try {
                if (selectedAlumno) {
                    const response = await axios.get(`http://localhost:3001/api/v1/alumno/obtener/por/${selectedAlumno}`);
                    const alumnoDetalle = response.data;
                    setNombre(alumnoDetalle.Nombre);
                    setApellido(alumnoDetalle.Apellido);
                    setCarnet(alumnoDetalle.Carnet);
                    setFechaNac(new Date(alumnoDetalle.Fecha_Nac));
                    setDpi(alumnoDetalle.DPI);
                    setTelefono(alumnoDetalle.Telefono);
                    setDireccion(alumnoDetalle.Dirección);
                }
            } catch (error) {
                console.error('Error al obtener detalles del alumno:', error);
            }
        };

        obtenerAlumnoDetalle();
    }, [selectedAlumno]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAlumno || !nombre.trim() || !apellido.trim() || !carnet.trim() || !fechaNac || !dpi.toString().trim() || !telefono.toString().trim() || !direccion.trim()) {
            showToast('error', 'Error', 'Todos los campos son requeridos');
            return;
        }

        const formattedFechaNac = fechaNac.toISOString().slice(0, 19).replace("T", " ");

        try {
            const response = await axios.put(`http://localhost:3001/api/v1/alumno/actualizar/${selectedAlumno}`, {
                Nombre: nombre,
                Apellido: apellido,
                Carnet: carnet,
                Fecha_Nac: formattedFechaNac,
                DPI: dpi,
                Telefono: telefono,
                Dirección: direccion,
            });

            showToast('success', 'Éxito', 'Alumno actualizado exitosamente');
            setSelectedAlumno(null);
            setNombre('');
            setApellido('');
            setCarnet('');
            setFechaNac('');
            setDpi('');
            setTelefono('');
            setDireccion('');
        } catch (error) {
            showToast('error', 'Error', 'Error al actualizar alumno');
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
                                itemTemplate={customItemTemplate}
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
    <Button label="Actualizar Alumno" icon="pi pi-check" onClick={handleFormSubmit} />
</div>

            </div>
        </div>
    );
};

export default UpdateAlumno;
