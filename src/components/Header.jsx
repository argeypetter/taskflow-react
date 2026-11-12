export default function Header() {
    return (
        <header className="app-header">
            <div className="header-content">
                <div className="brand">
                    <div className="brand-icon">T</div>

                    <div>
                        <Name />
                        <Description />
                    </div>
                </div>

                <span className="header-label">
                    Panel de proyectos
                </span>
            </div>
        </header>
    );
}

function Description() {
    return (
        <p className="header-description">
            Gestión inteligente de proyectos
        </p>
    );
}

function Name() {
    return <h1 className="header-title">TaskFlow</h1>;
}