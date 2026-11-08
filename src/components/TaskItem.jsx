export default function TaskItem({ dat, handleClick }) {
    return (
        <li>
            {/* Nombre de la tarea */}
            <p>{dat.nombre}</p>

            {/* Prioridad */}
            <p>Prioridad: {dat.prioridad}</p>

            {/* Estado de la tarea */}
            <Item estado={dat.estado} />

            {/* Botón para cambiar el estado */}
            <button onClick={() => handleClick(dat.id)}>
                Cambiar estado
            </button>
        </li>
    );
}

function Item({ estado }) {
    if (estado === "Completada") {
        return <span className="item">Tarea finalizada ✅</span>;
    }

    return <span className="item">Tarea por realizar</span>;
}
