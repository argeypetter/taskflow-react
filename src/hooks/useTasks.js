import { useState, useEffect } from 'react';
import { task } from '../data/data.js';

export default function useTasks() {

    const [searchTerm, setSearchTerm] = useState('')

    const [statusFiltro, setStatusFiltro] = useState('todos')

    const [aux, setAux] = useState(() => {
        const datos = localStorage.getItem('tasks');

        // Si existen tareas guardadas, convierte el texto en un array.
        if (datos) {
            try {
                return JSON.parse(datos);
            } catch (error) {
                console.error("Error al recuperar las tareas:", error);
            }
        }

        // Si no existen datos guardados, utiliza las tareas iniciales.
        return task;
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(aux));
    }, [aux]);

    // Cambia el estado de una tarea según su identificador.
    const handleClick = (id) => {

        // Actualiza el estado con el nuevo array.
        setAux(prevTasks =>
            prevTasks.map(d => {
                // Tu lógica actual
                // Comprueba si la tarea actual coincide con el ID recibido.
                if (d.id === id) {
                    return {
                        ...d,

                        // Alterna entre Pendiente y Completada.
                        estado: d.estado === "Pendiente"
                            ? "Completada"
                            : "Pendiente"
                    };
                }

                // Mantiene las tareas que no coinciden con el ID.
                return d;
            })
        );
    };

    const handleUpdateTask = (id, nom, pr) => {
        // Actualiza el estado con el nuevo array.
        setAux(prevTasks =>
            prevTasks.map(d => {
                // Tu lógica actual
                // Comprueba si la tarea actual coincide con el ID recibido.
                if (d.id === id) {
                    return {
                        ...d,
                        // Actualiza el nombre y la prioridad.
                        nombre: nom,
                        prioridad: pr
                    };
                }

                // Mantiene las tareas que no coinciden con el ID.
                return d;
            })
        );
    };

    // Recibe una nueva tarea desde TaskModal y la agrega a la lista.
    const handleAddTask = (newTask) => {

        // Conserva las tareas anteriores y agrega la nueva.
        setAux(prevTasks => [
            ...prevTasks,
            newTask
        ]);
    };

    const onDelete = (id) => {
        setAux(prevTasks =>
            prevTasks.filter(d => d.id !== id)
        );
    };

    const onSearch = (texto) => {
        setSearchTerm(texto)
    }

    const onEstadoChange = (estado) => {
        setStatusFiltro(estado)
    }

    const resultado = aux.filter(dat => {

        const coincideNombre = dat.nombre.toLowerCase().includes(
            /* ¿Cómo compruebas si se seleccionó todos o coincide el estado? */
            searchTerm.toLowerCase()
        );

        const coincideEstado = statusFiltro === 'todos' || dat.estado === statusFiltro
        /* ¿Cómo compruebas si se seleccionó todos o coincide el estado? */;

        return coincideNombre && coincideEstado;
    });

    return {
        // Estado de las tareas
        aux,

        // Tareas filtradas
        resultado,

        // Funciones del CRUD
        handleClick,
        handleAddTask,
        onDelete,
        handleUpdateTask,

        // Búsqueda y filtros
        searchTerm,
        statusFiltro,
        onSearch,
        onEstadoChange
    };
}