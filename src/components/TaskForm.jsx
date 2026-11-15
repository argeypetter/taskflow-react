
import { useState, useEffect } from 'react';
import '../css/TaskModal.css';

export default function TaskModal({ onClose,
    onAddTask,
    onUpdateTask,
    taskToEdit }) {

    // Almacena el nombre de la tarea escrita por el usuario.
    const [nombre, setNombre] = useState('');

    // Almacena la prioridad seleccionada.
    const [prioridad, setPrioridad] = useState('Media');

    // Procesa el envío del formulario.
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nombre.trim()) {
            return;
        }

        if (taskToEdit) {
            onUpdateTask(
                taskToEdit.id,
                nombre.trim(),
                prioridad
            );
        } else {
            onAddTask({
                id: Date.now(),
                nombre: nombre.trim(),
                prioridad,
                estado: 'Pendiente'
            });
        }

        onClose();
    };

    useEffect(() => {
        if (taskToEdit) {
            setNombre(taskToEdit.nombre);
            setPrioridad(taskToEdit.prioridad);
        } else {
            setNombre('');
            setPrioridad('Media');
        }
    }, [taskToEdit]);

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                <h2>{taskToEdit ? 'Editar tarea' : 'Nueva tarea'}</h2>

                <form onSubmit={handleSubmit}>

                    <label>Nombre de la tarea</label>

                    {/* Campo controlado para escribir el nombre */}
                    <input
                        type="text" required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej. Aprender React"
                        maxLength={100}
                    />

                    <label>Prioridad</label>

                    {/* Campo controlado para seleccionar prioridad */}
                    <select
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                    >
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>

                    <div className="modal-actions">

                        {/* Cierra el modal sin registrar la tarea */}
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>

                        {/* Ejecuta handleSubmit */}
                        <button type="submit">
                            {taskToEdit ? 'Guardar cambios' : 'Crear tarea'}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}
