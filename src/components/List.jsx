import { task } from '../data/data.js';
import TaskItem from './TaskItem.jsx';
import { useState } from 'react';

export default function List() {

    const [aux, setAux] = useState(task);

    const handleClick = (id) => {
        const listAux = aux.map(d => {
            if (d.id === id) {
                return {
                    ...d,
                    estado: d.estado === "Pendiente" ? "Completada" : "Pendiente"
                };
            }

            return d;
        });
        setAux(listAux)
    };

    return (
        <ul>
            {aux.map(dat => (
                <TaskItem
                    key={dat.id}
                    dat={dat}
                    handleClick={handleClick}
                />
            ))}
        </ul>
        
    );
}

