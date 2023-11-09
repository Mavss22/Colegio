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
              icon: 'pi pi-fw pi-bars'
            }
          ]
        },
        {
          label: 'Actualizar',
          icon: 'pi pi-fw pi-refresh'
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-fw pi-trash'
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

        },
        {
          label: 'Buscar',
          icon: 'pi pi-fw pi-eye',
          items: [
            {
              label: 'Individual',
              icon: 'pi pi-fw pi-user'
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'Por Lista'
            }
          ]
        },
        {
          label: 'Actualizar',
          icon: 'pi pi-fw pi-refresh'
        },

        {
          label: 'Eliminar',
          icon: 'pi pi-fw pi-user-minus'
        }
      ]
    },
    {
      label: 'Profesor-Alumnos',
      icon: 'pi pi-fw pi-users',
      items: [
        {
          label: 'Asociar Alumno-profesor',
          icon: 'pi pi-fw pi-link'
        },
        {
          label: 'Actualizar asociacion Alumno-profesor',
          icon: 'pi pi-fw pi-link'
        },
        {
          label: 'Buscar Alumnos asociados a profesor',
          icon: ' pi pi-fw pi-search'
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

        },
        {
          label: 'Buscar',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Individual',
              icon: 'pi pi-fw pi-user'
            }
          ]
        },
        {
          label: 'Actualizar',
          icon: 'pi pi-fw pi-refresh'
        },

        {
          label: 'Eliminar',
          icon: 'pi pi-fw pi-user-minus'
        }
      ]

    },
    {
      label: 'Profesor-Comité',
      icon: 'pi pi-fw pi-user-plus',
      items: [
        {
          label: 'Asociar Profesor-Comité',
          icon: 'pi pi-fw pi-link'
        },
        {
          label: 'Actualizar Profesores-Comité',
          icon: 'pi pi-fw pi-link'
        },
        {
          label: 'Buscar Profesores-Comité',
          icon: 'pi pi-fw pi-search'
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