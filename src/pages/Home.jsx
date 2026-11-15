import { Link } from 'react-router-dom';

function Home() {
    return (
        <>
            <h1 className="header-title">Bienvenido a TaskFlow</h1>

            <p className="header-description">
                Gestión inteligente de proyectos
            </p>

            <Link to="/tasks">Sección de tareas</Link>
        </>
    );
}

export default Home;