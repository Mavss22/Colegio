import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import Navbar from './Navbar';

const NewAlumno = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [carne, setCarne] = useState('');
    const [fechaNac, setFechaNac] = useState(null);
    const [dpi, setDpi] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [idCarrera, setIdCarrera] = useState('');
    const toast = useRef(null);

    const handleFormSubmit = async () => {
        if (!nombre.trim() || !apellido.trim() || !carne.trim() || !fechaNac || !dpi.trim() || !telefono.trim() || !direccion.trim() || !idCarrera.trim()) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Todos los campos son requeridos' });
            return;
        }
        const formattedFechaNac = fechaNac.toISOString().slice(0, 10);

        try {
            const response = await axios.post('http://localhost:3001/api/v1/alumno/guardar', {
                Id_Carrera: idCarrera,
                Nombre: nombre,
                Apellido: apellido,
                Carné: carne,
                Fecha_Nac: formattedFechaNac,
                Dpi: dpi,
                Telefono: telefono,
                Dirección: direccion,
            });

            console.log(response);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Alumno registrado exitosamente' });
            setNombre('');
            setApellido('');
            setCarne('');
            setFechaNac(null);
            setDpi('');
            setTelefono('');
            setDireccion('');
            setIdCarrera('');
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al registrar alumno' });
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="card">
                <Toast ref={toast} />
                <div className="flex flex-column align-items-center justify-content-center gap-4 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="idCarrera">ID de Carrera</label>
                        <InputText id="idCarrera" value={idCarrera} onChange={(e) => setIdCarrera(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="nombre">Nombre</label>
                        <InputText id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="apellido">Apellido</label>
                        <InputText id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="carne">Carné</label>
                        <InputText id="carne" value={carne} onChange={(e) => setCarne(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="fechaNac">Fecha de Nacimiento</label>
                        <Calendar id="fechaNac" value={fechaNac} onChange={(e) => setFechaNac(e.value)} showIcon dateFormat="dd/mm/yy" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="dpi">DPI</label>
                        <InputText id="dpi" value={dpi} onChange={(e) => setDpi(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="telefono">Teléfono</label>
                        <InputText id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label htmlFor="direccion">Dirección</label>
                        <InputTextarea id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} rows={5} cols={30} />
                    </div>
                    <Button label="Registrar" onClick={handleFormSubmit} />
                </div>
            </div>
        </div>
    );
};

export default NewAlumno;
