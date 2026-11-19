const API_URL = import.meta.env.VITE_API_URL;

// Declarar una función asíncrona
export async function getTasks() {
    try {
        const respuesta = await fetch(`${API_URL}/tasks/`);

        // if (!respuesta.ok) {
        //     throw new Error(
        //         `Error al consultar las tareas. Código: ${respuesta.status}`
        //     );
        // }
        // const tasks = await respuesta.json();
        // return tasks;

        return handleResponse(respuesta);

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

        // if (!respuesta.ok) {
        //     const detalle = await respuesta.json();
        //     console.error('Errores enviados por Django:', detalle);
        //     throw new Error('No se pudo crear la tarea');
        // }
        // const taskNew = await respuesta.json();
        // return taskNew;

        return handleResponse(respuesta);

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

        // if (!respuesta.ok) {
        //     const detalle = await respuesta.json();
        //     console.error('Errores enviados por Django:', detalle);
        //     throw new Error('No se pudo actualizar la tarea');
        // };
        // const taskUpdate = await respuesta.json();
        // return taskUpdate;

        return handleResponse(respuesta);

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

        // if (!respuesta.ok) {
        //     throw new Error('No se pudo eliminar la tarea');
        // }

        await handleResponse(respuesta);

        return true;

    } catch (error) {
        console.error('Ocurrió un error:', error);
        throw error;
    }
}

async function handleResponse(respuesta) {
    if (!respuesta.ok) {
        let detalle;

        try {
            detalle = await respuesta.json();
        } catch {
            detalle = 'No se pudo interpretar la respuesta del servidor';
        }

        throw new Error(JSON.stringify({
            status: respuesta.status,
            detalle: detalle
        }));
    }

    // Si Django devuelve 204 No Content
    if (respuesta.status === 204) {
        return null;
    }

    return respuesta.json();
}