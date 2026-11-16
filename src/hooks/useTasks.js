import { useState, useEffect } from 'react';
import { getTasks } from '../services/taskService';
import { createTask } from '../services/taskService';
// import {task} from '../data/data.js'

export default function useTasks() {

    const [searchTerm, setSearchTerm] = useState('')

    const [statusFiltro, setStatusFiltro] = useState('todos')

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const [aux, setAux] = useState(() => {
    //     const datos = localStorage.getItem('tasks');

    //     // Si existen tareas guardadas, convierte el texto en un array.
    //     if (datos) {
    //         try {
    //             return JSON.parse(datos);
    //         } catch (error) {
    //             console.error("Error al recuperar las tareas:", error);
    //         }
    //     }

    //     // Si no existen datos guardados, utiliza las tareas iniciales.
    //     return task;
    // });


    useEffect(() => {

        async function cargarTareas() {
            try {
                setLoading(true);

                const t = await getTasks();
                setTasks(t);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        cargarTareas();

    }, []);


    // useEffect(() => {
    //     localStorage.setItem('tasks', JSON.stringify(aux));
    // }, [aux]);

    // Cambia el estado de una tarea según su identificador.
    const handleClick = (id) => {

        // Actualiza el estado con el nuevo array.
        setTasks(prevTasks =>
            prevTasks.map(d => {
                // Tu lógica actual
                // Comprueba si la tarea actual coincide con el ID recibido.
                if (d.id === id) {
                    return {
                        ...d,

                        // Alterna entre Pendiente y Completada.
                        estado: d.estado === "1"
                            ? "2"
                            : "1"
                    };
                }

                // Mantiene las tareas que no coinciden con el ID.
                return d;
            })
        );
    };

    const handleUpdateTask = (id, nom, pr) => {
        // Actualiza el estado con el nuevo array.
        setTasks(prevTasks =>
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
    const handleAddTask = async (newTask) => {

        // Conserva las tareas anteriores y agrega la nueva.
        // setTasks(prevTasks => [
        //     ...prevTasks,
        //     newTask
        // ]);

        try {
            const taskData = await createTask(newTask)
            setTasks(prevTasks => [
                ...prevTasks,
                taskData
            ]);

        } catch (error) {
             // Manejo de errores si la promesa falla
        console.error('Ocurrió un error:', error);
        }

    };

    const onDelete = (id) => {
        setTasks(prevTasks =>
            prevTasks.filter(d => d.id !== id)
        );
    };

    const onSearch = (texto) => {
        setSearchTerm(texto)
    }

    const onEstadoChange = (estado) => {
        setStatusFiltro(estado)
    }

    const resultado = tasks.filter(dat => {

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
        onEstadoChange,

        //
        tasks,
        loading,
        error,

    };
}