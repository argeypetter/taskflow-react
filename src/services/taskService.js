// Declarar una función asíncrona
export async function getTasks() {
    try {
        // await pausa esta línea hasta que fetch responda
        const respuesta = await fetch('http://127.0.0.1:8000/api/tasks/');
        if (!respuesta.ok) {
            throw new Error('Error al consultar las tareas');
        } else {
            const task = await respuesta.json();
            console.log(task);
            return task
        }

    } catch (error) {
        // Manejo de errores si la promesa falla
        console.error('Ocurrió un error:', error);
    }
}


export async function createTask(taskData) {
    try {
        const respuesta = await fetch(
            'http://127.0.0.1:8000/api/tasks/',
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
    }
}
