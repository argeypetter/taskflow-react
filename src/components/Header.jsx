export default function Header() {
    return (
        <header>
            <Name />
            <Description />
        </header>
    );
}

function Description() {
    return (
        <p>Gestión inteligente de proyectos</p>
    );
}

function Name() {
    return (
        <h1>TaskFlow</h1>
    );
}