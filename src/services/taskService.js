const API_URL = import.meta.env.VITE_API_URL;

// Declarar una función asíncrona
export async function getTasks() {
    try {
        const respuesta = await fetch(`${API_URL}/tasks/`);

        if (!respuesta.ok) {
            throw new Error(
                `Error al consultar las tareas. Código: ${respuesta.status}`
            );
        }

        const tasks = await respuesta.json();

        return tasks;

    } catch (error) {
        console.error('Ocurrió un error:', error);
        throw error;
    }
}


export async function createTask(taskData) {
    try {
        const respuesta = await fetch(
            `${API_URL}/tasks/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            }
        );

        if (!respuesta.ok) {
            const detalle = await respuesta.json();

            console.error('Errores enviados por Django:', detalle);

            throw new Error('No se pudo crear la tarea');
        }

        const taskNew = await respuesta.json();

        return taskNew;

    } catch (error) {
        console.error('Ocurrió un error:', error);
        throw error;
    };
}

export async function updateTask(taskData) {
    try {
        const respuesta = await fetch(
            `${API_URL}/tasks/${taskData.id}/`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            }
        );

        if (!respuesta.ok) {
            const detalle = await respuesta.json();

            console.error('Errores enviados por Django:', detalle);

            throw new Error('No se pudo actualizar la tarea');
        };

        const taskUpdate = await respuesta.json();

        return taskUpdate;

    } catch (error) {
        console.error('Ocurrió un error:', error);
        throw error;
    };
}


export async function deleteTask(id) {
    try {
        const respuesta = await fetch(
            `${API_URL}/tasks/${id}/`,
            {
                method: 'DELETE'
            }
        );

        if (!respuesta.ok) {
            throw new Error('No se pudo eliminar la tarea');
        }

        return true;

    } catch (error) {
        console.error('Ocurrió un error:', error);
        throw error;
    }
}