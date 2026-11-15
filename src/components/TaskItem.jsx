export default function TaskItem({ dat, handleClick, onDelete, abrirModalEditar }) {
    return (
        <li className="task-card">
            <p className="task-name">{dat.nombre}</p>

            <p className="task-priority">
                Prioridad: {dat.prioridad}
            </p>

            <Item estado={dat.estado} />

            <div className="task-actions">
                <button
                    className="btn btn-primary"
                    onClick={() => handleClick(dat.id)}
                >
                    Cambiar estado
                </button>

                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(dat.id)}
                >
                    Eliminar
                </button>

                <button
                    className="btn btn-secondary"
                    onClick={() => abrirModalEditar(dat)}
                >
                    Actualizar
                </button>
            </div>
        </li>
    );
}

function Item({ estado }) {
    if (estado === "Completada") {
        return (
            <span className="item completed">
                Tarea finalizada ✅
            </span>
        );
    }

    return (
        <span className="item">
            Tarea por realizar
        </span>
    );
}