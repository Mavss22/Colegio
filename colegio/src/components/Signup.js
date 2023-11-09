import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SignupComponent() {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const toast = useRef(null);


    const handleRegister = () => {
        if (usuario.trim() === '' || contrasena.trim() === '') {
            showToast('error', 'Error', 'Usuario y contraseña son requeridos');
        } else {
            axios.post('http://localhost:3001/api/v1/usuarios/guardar', { usuario, contrasena })
                .then(response => {
                    showToast('success', 'Éxito', 'Usuario registrado exitosamente');
                    setUsuario('');
                    setContrasena('');
                })
                .catch(error => {
                    showToast('error', 'Error', 'Error al registrar usuario');
                });
        }
    };

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    return (
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Toast ref={toast} />
        <div className="flex flex-column md:flex-row">
            <div className="w-full md:w-10 flex flex-column align-items-start justify-content-center gap-5 py-5">
                <Link to="/">
                    <Button className="p-button-secondary" icon="pi pi-arrow-left" style={{ alignSelf: 'flex-start' }} />
                </Link>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <label htmlFor="usuario">Usuario</label>
                    <InputText id="usuario" type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                </div>
                <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                    <span className="p-float-label">
                        <Password id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} toggleMask />
                        <label htmlFor="contrasena">Contraseña</label>
                    </span>
                </div>
                <Button label="Registrar" icon="pi pi-check" onClick={handleRegister} />
            </div>
        </div>
    </div>
    );
};



