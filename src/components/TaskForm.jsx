
import { useState, useEffect } from 'react';
import '../css/TaskModal.css';

export default function TaskModal({ onClose,
    onAddTask,
    onUpdateTask,
    taskToEdit }) {

    // Almacena el nombre de la tarea escrita por el usuario.
    const [nombre, setNombre] = useState('');

    // Almacena la prioridad seleccionada.
    const [prioridad, setPrioridad] = useState('2');

    // Almacena la descripcion de la tarea escrita por el usuario.
    const [descripcion, setDescripcion] = useState('')

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
                prioridad,
                descripcion
            );
        } else {
            onAddTask({
                nombre: nombre.trim(),
                descripcion: descripcion,
                prioridad: prioridad,
                estado: '1'
            });
        }

        onClose();
    };

    useEffect(() => {
        if (taskToEdit) {
            setNombre(taskToEdit.nombre);
            setDescripcion(taskToEdit.descripcion);
            setPrioridad(taskToEdit.prioridad);
        } else {
            setNombre('');
            setDescripcion('');
            setPrioridad('2');
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

                    {/*Campo controla la descripcion */}
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Describe la tarea..."
                    />

                    <label>Prioridad</label>

                    {/* Campo controlado para seleccionar prioridad */}
                    <select
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                    >
                        <option value="1">Alta</option>
                        <option value="2">Media</option>
                        <option value="3">Baja</option>
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
