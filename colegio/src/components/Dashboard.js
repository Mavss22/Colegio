import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './Dashboard.css';

export default function Dashboard() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const usernameStyle = {
        marginLeft: '2rem'
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="d-inline" style={usernameStyle}>¡Bienvenido, {username}!</h1>
                    </div>
                    <div className="col-md-4">
                        <img
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Imagen de perfil"
                            className="custom-responsive-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
