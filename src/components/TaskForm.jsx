
import { useState } from 'react';
import '../css/TaskModal.css';

export default function TaskModal({ onClose, onAddTask }) {

    // Almacena el nombre de la tarea escrita por el usuario.
    const [nombre, setNombre] = useState('');

    // Almacena la prioridad seleccionada.
    const [prioridad, setPrioridad] = useState('Media');

    // Procesa el envío del formulario.
    const handleSubmit = (e) => {

        // Evita que el formulario recargue la página.
        e.preventDefault();

        // Impide registrar tareas con nombres vacíos.
        if (!nombre.trim()) {
            return;
        }

        // Envía la nueva tarea al componente padre mediante props.
        onAddTask({
            id: Date.now(),
            nombre: nombre.trim(),
            prioridad,
            estado: 'Pendiente'
        });

        // Limpia los campos después de registrar la tarea.
        setNombre('');
        setPrioridad('Media');

        // Cierra el modal después de guardar.
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                <h2>Nueva tarea</h2>

                <form onSubmit={handleSubmit}>

                    <label>Nombre de la tarea</label>

                    {/* Campo controlado para escribir el nombre */}
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ej. Aprender React"
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
                            Guardar tarea
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}
