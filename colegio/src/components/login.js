import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Password } from 'primereact/password';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';

export default function LoginComponent() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toast = useRef(null);

    const handleLogin = () => {
        if (username.trim() === '') {
            showToast('error', 'Error', 'El usuario es requerido');
        }
        if (password.trim() === '') {
            showToast('error', 'Error', 'La contraseña es requerida');
        }

        if (username.trim() !== '' && password.trim() !== '') {
            const userData = {
                usuario: username,
                contrasena: password,
            };

            axios.post('http://localhost:3001/api/v1/usuarios/login', userData)
                .then(response => {
                    localStorage.setItem('username', username);
                    navigate('/Dashboard');
                })
                .catch(error => {
                    showToast('error', 'Error', 'Usuario o contraseña incorrecta');
                });
        }
    };
    
    const handleSignup = () =>{

        navigate('/Signup');
    }

    const showToast = (severity, summary, detail) => {
        toast.current.show({ severity, summary, detail });
    };

    return (
        <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Toast ref={toast} />
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Usuario</label>
                        <InputText
                            id="username"
                            type="text"
                            className="w-18rem"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Contraseña</label>
                        <Password
                            feedback={false}
                            toggleMask={true}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button label="Ingresar" icon="pi pi-user" className="w-10rem mx-auto" onClick={handleLogin}></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>O</b>
                    </Divider>
                    <Divider layout="horizontal" className="flex md:hidden" align="center">
                        <b>O</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Button label="Crear" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={handleSignup}></Button>
                </div>
            </div>
        </div>

    );
}

