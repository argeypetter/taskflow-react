export default function TaskSearch({ searchTerm, onSearch, statusFiltro, onEstadoChange }) {
    return (

        <search>
            <label htmlFor="campo-busqueda">
                Buscar tareas:
            </label>

            <input
                id="campo-busqueda"
                type="search"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Escribe el nombre de una tarea..."
            />
            <label>
                Elige un filtro:
                <select name="selectedTask"
                    value={statusFiltro} // ...fuerza al valor del select a coincidir con la variable de estado,...
                    onChange={e => onEstadoChange(e.target.value)} // ...¡y a actualizar la variable de estado con cualquier cambio!
                >
                    <option value="todos">Todas las tareas</option>
                    <option value="Pendiente">Pendientes</option>
                    <option value="Completada">Completadas</option>
                </select>
            </label>
        </search>
    );
}