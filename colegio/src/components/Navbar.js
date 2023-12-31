import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  const handleNPF = () => {
    navigate('/NewPF');
  };


  const handleNP = () => {
    navigate('/NewP');
  };

  const searchP = () => {
    navigate('/searchP');
  };

  const associationProject = () => {
    navigate('/AssociationProject');
  };

  const updateProfesor = () => {
    navigate('/updateProfesor');
  };

    const deleteProfesor = () => {
    navigate('/deleteProfesor');
  };

  const updateProject = () => {
    navigate('/updateProject');
  };

  const obtenerlist = () => {
    navigate('/obtenerlist');
  };

  
  const alumnoin = () =>{
    navigate ('/alumnoin');
  };
  
  const alumnolist = () => {
    navigate('/alumnolist');
  };

  const searchAJoinP = () => {
    navigate('/searchAlumnsJoinP');
  };

  const newA = () =>{
    navigate('/newA');
  };

  const deleteA = () =>{
    navigate ('/deleteA');
  };

  const upA = () => {
    navigate('/upA');
  };

  const NewComite = () =>{
    navigate ('/NewComite');
  };

  const ComiteIndiv = () =>{
    navigate ('/comiteIndiv');
  };

  const UpComite = () =>{
    navigate ('/UpComite');
  };

  const DeletComite = () =>{
    navigate ('/DeletComite');
  };
  
  const assocPandC = () =>{
    navigate ('/assocPandC');
  };

  const UpdatePandC = () =>{
    navigate ('/UpdatePandC');
  };

  const searchPandC = () =>{
    navigate ('/searchPandC');
  };

  const items = [
    {
      label: 'Proyecto Final',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: 'Nuevo',
          icon: 'pi pi-fw pi-plus',
          command: handleNPF
        },
        {
          label: 'Asociar Proyecto',
          icon: 'pi pi-fw pi-link',
          command: associationProject
        }
      ]
    },
    {
      label: 'Profesores',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Crear',
          icon: 'pi pi-fw pi-plus',
          command: handleNP
        },
        {
          label: 'Obtener',
          icon: 'pi pi-fw pi-eye',
          items: [
            {
              label: 'Individual',
              icon: 'pi pi-fw pi-user',
              command: searchP
            },
            {
              label: 'Por Lista',
              icon: 'pi pi-fw pi-bars',
              command: obtenerlist
            }
          ]
        },
        {
          label: 'Actualizar',
          icon: 'pi pi-fw pi-refresh',
          command:updateProfesor
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-fw pi-trash',
          command:deleteProfesor
        },

      ]
    },
    {
      label: 'Alumnos',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Crear',
          icon: 'pi pi-fw pi-user-plus',
          command: newA
        },
        {
          label: 'Buscar',
          icon: 'pi pi-fw pi-eye',
          items: [
            {
              label: 'Individual',
              icon: 'pi pi-fw pi-user',
              command: alumnoin 
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'Por Lista',
              command: alumnolist
            }
          ]
        },
        {
          label: 'Actualizar',
          icon: 'pi pi-fw pi-refresh',
          command : upA
        },

        {
          label: 'Eliminar',
          icon: 'pi pi-fw pi-user-minus',
          command: deleteA
        }
      ]
    },
    {
      label: 'Profesor-Alumnos',
      icon: 'pi pi-fw pi-users',
      items: [
        {
          label: 'Asociar Alumno-profesor',
          icon: 'pi pi-fw pi-link',
          command: associationProject
        },
        {
          label: 'Actualizar asociacion Alumno-profesor',
          icon: 'pi pi-fw pi-link',
          command:updateProject
        },
        {
          label: 'Buscar Alumnos asociados a profesor',
          icon: ' pi pi-fw pi-search',
          command:searchAJoinP
        }
      ]
    },
    {
      label: 'Comité',
      icon: 'pi pi-fw pi-sitemap',
      items: [
        {
          label: 'Crear',
          icon: 'pi pi-fw pi-user-plus',
        command : NewComite
        },
        {
          label: 'Buscar',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Individual',
              icon: 'pi pi-fw pi-user',
              command: ComiteIndiv
            }
          ]
        },
        {
          label: 'Actualizar',
          icon: 'pi pi-fw pi-refresh',
          command : UpComite
        },

        {
          label: 'Eliminar',
          icon: 'pi pi-fw pi-user-minus',
          command : DeletComite
        }
      ]

    },
    {
      label: 'Profesor-Comité',
      icon: 'pi pi-fw pi-user-plus',
      items: [
        {
          label: 'Asociar Profesor-Comité',
          icon: 'pi pi-fw pi-link',
          command : assocPandC
        },
        {
          label: 'Actualizar Profesores-Comité',
          icon: 'pi pi-fw pi-link',
          command : UpdatePandC
        },
        {
          label: 'Buscar Profesores-Comité',
          icon: 'pi pi-fw pi-search',
          command : searchPandC
        }
      ]
    },
    {
      label: 'Salir',
      icon: 'pi pi-fw pi-power-off',
      command: handleLogout
    }
  ];

  return (
    <div>
      <Menubar model={items} />
    </div>
  );
};

export default Navbar;