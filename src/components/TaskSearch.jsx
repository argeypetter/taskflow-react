export default function TaskSearch({
    searchTerm,
    onSearch,
    statusFiltro,
    onEstadoChange
}) {
    return (
        <div className="task-search">

            <div className="search-field">
                <label htmlFor="campo-busqueda">
                    Buscar tareas
                </label>

                <input
                    id="campo-busqueda"
                    type="search"
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Escribe el nombre de una tarea..."
                />
            </div>

            <div className="filter-field">
                <label htmlFor="filtro-estado">
                    Filtrar por estado
                </label>

                <select
                    id="filtro-estado"
                    name="selectedTask"
                    value={statusFiltro}
                    onChange={(e) => onEstadoChange(e.target.value)}
                >
                    <option value="todos">Todas las tareas</option>
                    <option value="Pendiente">Pendientes</option>
                    <option value="Completada">Completadas</option>
                </select>
            </div>

        </div>
    );
}