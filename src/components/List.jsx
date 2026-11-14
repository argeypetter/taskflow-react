
import TaskItem from './TaskItem.jsx';
import TaskModal from './TaskForm.jsx';
import TaskSearch from './TaskSearch.jsx';
import { useState} from 'react';
import useTasks from '../hooks/useTasks.js';

export default function List() {

    // Controla la visibilidad del modal.
    // false = cerrado, true = abierto.
    const [isModalOpen, setIsModalOpen] = useState(false);
    //

    const {
        // Aquí recuperas los datos y funciones de useTasks
        aux, 
        resultado,
        handleClick,
        handleAddTask,
        onDelete,

        // Búsqueda y filtros
        searchTerm,
        statusFiltro,
        onSearch,
        onEstadoChange} = useTasks();

    // Abre el modal actualizando su estado de visibilidad.
    const abrirModal = () => {
        setIsModalOpen(true);
    };

    // Cierra el modal actualizando su estado de visibilidad.
    const cerrarModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="task-toolbar">
                {/* Busquedad de tareas */}
                <TaskSearch
                    searchTerm={searchTerm}
                    onSearch={onSearch}
                    statusFiltro={statusFiltro}
                    onEstadoChange={onEstadoChange}
                />

                {/* Botón para abrir el formulario de nuevas tareas */}
                <button
                    className="btn-new-task"
                    onClick={abrirModal}>
                    + Nueva tarea
                </button>
            </div>
            {/* Renderiza la lista de tareas */}
            <ul className="task-list">
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
