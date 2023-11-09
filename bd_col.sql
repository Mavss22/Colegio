-- Creación de la tabla Carrera
DROP TABLE carrera;  
CREATE TABLE Carrera (
    Id_Carrera INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Carrera VARCHAR(255)
);
--- Inserts de tabla
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (1, 'Ingeniería en Sistemas Computacionales');
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (2, 'Ingeniería Civil');
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (3, 'Licenciatura en Derecho');
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (4, 'Licenciatura en Administración de Empresas');
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (5, 'Ingeniería Industrial');
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (6, 'Ingeniería Mecánica');
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (7, 'Licenciatura en Psicología');
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (8, 'Ingeniería Electrónica');
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (9, 'Licenciatura en Contaduría Pública');
INSERT INTO Carrera (Id_Carrera, Nombre_Carrera) VALUES (10, 'Ingeniería en Biotecnología');

SELECT * FROM carrera;
-- Creación de la tabla Grado_Academico
DROP TABLE grado_academico;
CREATE TABLE Grado_Academico (
    Id_Grado INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Grado VARCHAR(255)
);

-- Inserts de tabla
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Bachiller');
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Licenciado');
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Ingeniero');
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Maestro');
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Doctor');
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Postdoctor');
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Profesor');
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Asociado');
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Titular');
INSERT INTO Grado_Academico (Nombre_Grado) VALUES ('Emérito');

SELECT * FROM grado_academico;

-- Creación de la tabla Profesor
DROP TABLE profesor;
CREATE TABLE Profesor (
    Id_Profesor INT AUTO_INCREMENT PRIMARY KEY,
    Id_Grado INT,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    Carnet VARCHAR(255) UNIQUE,
    Fecha_Nac DATE,
    DPI INT UNIQUE,
    Telefono INT,
    Dirección VARCHAR(255),
    FOREIGN KEY (Id_Grado) REFERENCES Grado_Academico(Id_Grado)
);

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (1, 'Juan', 'Pérez', 'AB123', '1970-05-21', 123456789, 12345678, 'Calle Falsa 123');

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (2, 'Ana', 'Gómez', 'CD456', '1980-11-11', 234567890, 23456789, 'Avenida Siempreviva 456');

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (3, 'Luis', 'Martínez', 'EF789', '1990-02-15', 345678901, 34567890, 'Bulevar de los Sueños 789');

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (1, 'Carlos', 'Rodríguez', 'GH012', '1975-07-30', 456789012, 45678901, 'Pasaje de la Esperanza 012');

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (2, 'María', 'López', 'IJ345', '1965-12-09', 567890123, 56789012, 'Camino del Sol 345');

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (3, 'Carmen', 'Hernández', 'KL678', '1985-03-22', 678901234, 67890123, 'Ruta de la Luna 678');

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (1, 'Fernando', 'Morales', 'MN901', '1978-08-17', 789012345, 78901234, 'Avenida de las Estrellas 901');

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (2, 'Patricia', 'Castillo', 'OP234', '1973-04-05', 890123456, 89012345, 'Calle de la Aventura 234');

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (3, 'Ricardo', 'Navarro', 'QR567', '1982-09-19', 901234567, 90123456, 'Paseo de la Victoria 567');

INSERT INTO Profesor (Id_Grado, Nombre, Apellido, Carnet, Fecha_Nac, DPI, Telefono, Dirección) 
VALUES (1, 'Sofía', 'Mendez', 'ST890', '1992-01-23', 123456788, 12345678, 'Avenida del Río 890');


SELECT * FROM profesor;

-- Creación de la tabla Alumno
DROP TABLE alumno;
CREATE TABLE Alumno (
    Id_Alumno INT AUTO_INCREMENT PRIMARY KEY,
    Id_Carrera INT,
    Nombre VARCHAR(255),
    Apellido VARCHAR(255),
    Carné VARCHAR(255) UNIQUE,
    Fecha_Nac DATE,
    Dpi INT,
    Telefono INT,
    Dirección VARCHAR(255),
    FOREIGN KEY (Id_Carrera) REFERENCES Carrera(Id_Carrera)
);


INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (1, 'Roberto', 'García', 'UNI123', '1998-03-12', 298765432, 50123456, 'Zona 1, Ciudad');

INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (2, 'Lucía', 'Fernández', 'UNI456', '1999-07-23', 398765432, 50234567, 'Zona 2, Ciudad');

INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (3, 'Carlos', 'Morales', 'UNI789', '2000-05-30', 498765432, 50345678, 'Zona 3, Ciudad');

INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (1, 'Ana', 'Pérez', 'UNI012', '1997-12-15', 598765432, 50456789, 'Zona 4, Ciudad');

INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (2, 'Fernando', 'Lopez', 'UNI345', '1998-08-09', 698765432, 50567890, 'Zona 5, Ciudad');

INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (3, 'Sofía', 'Castillo', 'UNI678', '2001-03-21', 798765432, 50678901, 'Zona 6, Ciudad');

INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (1, 'Jorge', 'Martinez', 'UNI901', '1996-11-30', 898765432, 50789012, 'Zona 7, Ciudad');

INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (2, 'María', 'Juárez', 'UNI234', '2000-01-26', 998765432, 50890123, 'Zona 8, Ciudad');

INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (3, 'Luis', 'González', 'UNI567', '1999-04-17', 108765432, 50901234, 'Zona 9, Ciudad');

INSERT INTO Alumno (Id_Carrera, Nombre, Apellido, Carné, Fecha_Nac, Dpi, Telefono, Dirección) 
VALUES (1, 'Patricia', 'Rodriguez', 'UNI890', '1997-06-05', 118765432, 50101234, 'Zona 10, Ciudad');


SELECT * FROM alumno;
-- Creación de la tabla TFC (Trabajo Final de Carrera)
DELETE FROM tfc;
	CREATE TABLE TFC (
	    Id_TFC INT AUTO_INCREMENT PRIMARY KEY,
	    Nombre_Tema VARCHAR(255) UNIQUE
	);


INSERT INTO TFC (Nombre_Tema) VALUES ('Innovación en Energías Renovables');
INSERT INTO TFC (Nombre_Tema) VALUES ('Desarrollo de Aplicaciones Móviles con Flutter');
INSERT INTO TFC (Nombre_Tema) VALUES ('Inteligencia Artificial para la Logística');
INSERT INTO TFC (Nombre_Tema) VALUES ('Blockchain y Seguridad de Datos');
INSERT INTO TFC (Nombre_Tema) VALUES ('Análisis Big Data para Marketing Digital');
INSERT INTO TFC (Nombre_Tema) VALUES ('Automatización Industrial con PLC');
INSERT INTO TFC (Nombre_Tema) VALUES ('Diseño de Experiencia de Usuario en Web');
INSERT INTO TFC (Nombre_Tema) VALUES ('Gestión de Proyectos con Metodologías Ágiles');
INSERT INTO TFC (Nombre_Tema) VALUES ('Ciberseguridad en Redes Corporativas');
INSERT INTO TFC (Nombre_Tema) VALUES ('Robótica Aplicada a la Medicina');


SELECT * FROM tfc;
-- Creación de la tabla Historial_Asesoria
DROP TABLE historial_asesoria;
CREATE TABLE Historial_Asesoria (
    Id_Asesoria INT AUTO_INCREMENT PRIMARY KEY,
    Id_Profesor INT,
    Id_Alumno INT,
    Id_TFC INT,
    Fecha_Inic DATE,
    Fecha_Fin DATE,
    FOREIGN KEY (Id_Profesor) REFERENCES Profesor(Id_Profesor),
    FOREIGN KEY (Id_Alumno) REFERENCES Alumno(Id_Alumno),
    FOREIGN KEY (Id_TFC) REFERENCES TFC(Id_TFC)
);

INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (1, 1, 1, '2022-02-01', '2022-06-01');
INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (2, 2, 2, '2022-03-01', '2022-07-01');
INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (3, 3, 3, '2022-04-01', '2022-08-01');
INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (4, 4, 4, '2022-05-01', '2022-09-01');
INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (5, 5, 5, '2022-06-01', '2022-10-01');
INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (6, 6, 6, '2022-07-01', '2022-11-01');
INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (7, 7, 7, '2022-08-01', '2022-12-01');
INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (8, 8, 8, '2022-09-01', '2023-01-01');
INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (9, 9, 9, '2022-10-01', '2023-02-01');
INSERT INTO Historial_Asesoria (Id_Profesor, Id_Alumno, Id_TFC, Fecha_Inic, Fecha_Fin) VALUES (14, 10, 10, '2022-11-01', '2023-03-01');


SELECT * FROM historial_asesoria;
-- Creación de la tabla Lugar_Evaluacion
DROP TABLE lugar_evaluacion;
CREATE TABLE Lugar_Evaluacion (
    Id_Lugar INT AUTO_INCREMENT PRIMARY KEY,
    Lugar VARCHAR(255)
);
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Aula 101');
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Aula 102');
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Aula 103');
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Aula 201');
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Aula 202');
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Laboratorio de Computación 1');
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Laboratorio de Química');
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Laboratorio de Física');
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Biblioteca Central');
INSERT INTO Lugar_Evaluacion (Lugar) VALUES ('Salón de Actos');

SELECT * FROM lugar_evaluacion;

-- Creación de la tabla Comite
DROP TABLE comite;
CREATE TABLE Comite (
    Id_Comite INT AUTO_INCREMENT PRIMARY KEY,
    Fecha_Creacion DATE,
    Id_Lugar_Evaluacion INT,
    FOREIGN KEY (Id_Lugar_Evaluacion) REFERENCES Lugar_Evaluacion(Id_Lugar)
);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-01-15', 1);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-02-20', 2);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-03-25', 3);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-04-30', 4);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-05-05', 5);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-06-10', 6);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-07-15', 7);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-08-20', 8);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-09-25', 9);
INSERT INTO Comite (Fecha_Creacion, Id_Lugar_Evaluacion) VALUES ('2021-10-30', 10);

SELECT * FROM comite;
-- Creación de la tabla Detalle_Comite
DROP TABLE detalle_comite ;
CREATE TABLE Detalle_Comite (
    Id_Detalle INT AUTO_INCREMENT PRIMARY KEY,
    Id_Comite INT,
    Id_Profesor INT,
    FOREIGN KEY (Id_Comite) REFERENCES Comite(Id_Comite),
    FOREIGN KEY (Id_Profesor) REFERENCES Profesor(Id_Profesor)
);


INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (1, 1);
INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (2, 2);
INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (3, 3);
INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (4, 4);
INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (5, 5);
INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (6, 6);
INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (7, 7);
INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (8, 8);
INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (9, 9);
INSERT INTO Detalle_Comite (Id_Comite, Id_Profesor) VALUES (10, 14);


SELECT * FROM detalle_comite;
-- Creación de la tabla Grupo_Investigacion
DROP TABLE grupo_investigacion;
CREATE TABLE Grupo_Investigacion (
    Id_Grupo INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Grupo VARCHAR(255)
);
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Inteligencia Artificial');
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Nanotecnología');
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Energías Renovables');
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Robótica');
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Genética y Biología');
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Física Cuántica');
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Ciencias de Materiales');
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Ciencias Ambientales');
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Astronomía y Astrofísica');
INSERT INTO Grupo_Investigacion (Nombre_Grupo) VALUES ('Grupo de Química Sostenible');


SELECT * FROM grupo_investigacion;
-- Creación de la tabla Detalle_Grupo_Investigacion
DROP TABLE detalle_grupo_investigacion;
CREATE TABLE Detalle_Grupo_Investigacion (
    Id_Detalle INT AUTO_INCREMENT PRIMARY KEY,
    Id_Grupo INT,
    Id_Estudiante INT,
    FOREIGN KEY (Id_Grupo) REFERENCES Grupo_Investigacion(Id_Grupo),
    FOREIGN KEY (Id_Estudiante) REFERENCES Alumno(Id_Alumno)
);

INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (1, 1);
INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (2, 2);
INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (3, 3);
INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (4, 4);
INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (5, 5);
INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (6, 6);
INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (7, 7);
INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (8, 8);
INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (9, 9);
INSERT INTO Detalle_Grupo_Investigacion (Id_Grupo, Id_Estudiante) VALUES (10, 10);

SELECT * FROM detalle_grupo_investigacion ;

-- Creación de la tabla "usuarios"
DROP TABLE USUARIOS;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    hash_contrasena VARCHAR(64) NOT NULL 
);

-- Inserciones de ejemplo
INSERT INTO usuarios (usuario, hash_contrasena) VALUES ('usuario1', SHA2('contrasena1', 256));
INSERT INTO usuarios (usuario, hash_contrasena) VALUES ('usuario2', SHA2('contrasena2', 256));

SELECT * FROM usuarios;