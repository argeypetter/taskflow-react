export default function TaskSearch({ searchTerm, onSearch }) {
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
        </search>
    );
}