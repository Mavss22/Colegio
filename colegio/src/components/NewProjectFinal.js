import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import Navbar from './Navbar';
const NewProjectFinal = () => {
    const [nombreTema, setNombreTema] = useState('');
    const toast = useRef(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!nombreTema.trim()) {
            showToast('error', 'Error', 'Tema es requerido');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/v1/tfc/guardar', {
                Nombre_Tema: nombreTema,
            });

            showToast('success', 'Éxito', 'Tema registrado exitosamente');
            console.log('Datos enviados exitosamente:', response.data);

            setNombreTema('');
        } catch (error) {
            showToast('error', 'Error', 'Error al registrar tema');
            console.error('Error al enviar los datos:', error);
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
                    <div className="w-full md:w-10 flex flex-column align-items-center justify-content-center gap-5 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label htmlFor="nombreTema">Nombre del Tema</label>
                            <InputText id="nombreTema" type="text" value={nombreTema} onChange={(e) => setNombreTema(e.target.value)} />
                        </div>
                        <Button label="Registrar" icon="pi pi-check" onClick={handleFormSubmit} />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default NewProjectFinal;
