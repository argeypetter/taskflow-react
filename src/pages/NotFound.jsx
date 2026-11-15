import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <>
            <h2 className="section-title">
                404 - Página no encontrada
            </h2>

            <p>La ruta solicitada no existe.</p>

            <Link to="/">Inicio</Link>
        </>
    );
}

export default NotFound;