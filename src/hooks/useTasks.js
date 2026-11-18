import { useState, useEffect } from 'react';
import { deleteTask, getTasks, updateTask } from '../services/taskService';
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
    const handleClick = async (dat) => {
        try {
            // Calculamos el nuevo estado.
            const nuevoEstado = dat.estado === "1" ? "2" : "1";

            // Enviamos el nuevo estado a Django.
            const taskU = await updateTask({
                ...dat,
                estado: nuevoEstado
            });

            // Actualizamos React con la respuesta del servidor.
            setTasks(prevTasks =>
                prevTasks.map(d =>
                    d.id === taskU.id
                        ? { ...d, ...taskU }
                        : d
                )
            );

        } catch (error) {
            console.error('Error al cambiar el estado:', error);
        }
    };

    const handleUpdateTask = async (taskUpdate) => {
        try {
            const taskU = await updateTask(taskUpdate);

            setTasks(prevTasks =>
                prevTasks.map(d =>
                    d.id === taskU.id
                        ? { ...d, ...taskU }
                        : d
                )
            );

        } catch (error) {
            console.error('Error al actualizar la tarea:', error);
        }
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

    const onDelete = async (id) => {
        try {
            await deleteTask(id);

            setTasks(prevTasks =>
                prevTasks.filter(d => d.id !== id)
            );

        } catch (error) {
            console.error('Ocurrió un error:', error);
        }
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