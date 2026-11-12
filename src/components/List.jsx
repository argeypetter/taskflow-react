
import { task } from '../data/data.js';
import TaskItem from './TaskItem.jsx';
import TaskModal from './TaskForm.jsx';
import TaskSearch from './TaskSearch.jsx';
import { useState, useEffect } from 'react';

export default function List() {

    // Controla la visibilidad del modal.
    // false = cerrado, true = abierto.
    const [isModalOpen, setIsModalOpen] = useState(false);
    //

    const [searchTerm, setSearchTerm] = useState('')

    const [statusFiltro, setStatusFiltro] = useState('todos')

    // Inicializa el estado recuperando las tareas de localStorage.
    // Esta función solo se ejecuta al inicializar el estado.
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

    // Sincroniza la lista de tareas con localStorage.
    // Se ejecuta al montar el componente y cada vez que cambia aux.
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

    // Recibe una nueva tarea desde TaskModal y la agrega a la lista.
    const handleAddTask = (newTask) => {

        // Conserva las tareas anteriores y agrega la nueva.
        setAux(prevTasks => [
            ...prevTasks,
            newTask
        ]);
    };

    // Abre el modal actualizando su estado de visibilidad.
    const abrirModal = () => {
        setIsModalOpen(true);
    };

    // Cierra el modal actualizando su estado de visibilidad.
    const cerrarModal = () => {
        setIsModalOpen(false);
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

    const tareasFiltradas = aux.filter(dat =>
        dat.nombre.toLowerCase().includes(
            searchTerm.toLowerCase()
        )
    );

    const resultado = aux.filter(dat => {

        const coincideNombre = dat.nombre.toLowerCase().includes(
            /* ¿Qué variable contiene el texto buscado? */
            searchTerm.toLowerCase()
        );

        const coincideEstado = statusFiltro === 'todos' || dat.estado === statusFiltro
        /* ¿Cómo compruebas si se seleccionó todos o coincide el estado? */;

        return coincideNombre && coincideEstado;
    });
    return (
        <>
            {/* Busquedad de tareas */}
            <TaskSearch
                searchTerm={searchTerm}
                onSearch={onSearch}
                statusFiltro={statusFiltro}
                onEstadoChange={onEstadoChange}
            />

            {/* Botón para abrir el formulario de nuevas tareas */}
            <button onClick={abrirModal}>
                Abrir Modal
            </button>

            {/* Renderiza la lista de tareas */}
            <ul>
                {resultado.map(dat => (
                    <TaskItem
                        key={dat.id}
                        dat={dat}
                        handleClick={handleClick}
                        onDelete={onDelete}
                    />
                ))}
            </ul>

            {/* Renderizado condicional del formulario */}
            {isModalOpen && (
                <TaskModal
                    onClose={cerrarModal}
                    onAddTask={handleAddTask}
                />
            )}
        </>
    );
}
