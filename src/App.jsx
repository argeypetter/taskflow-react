import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Tasks from './pages/Tasks.jsx';
import NotFound from './pages/NotFound.jsx';
import { Route , Routes } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <>
            <Header />

            <main className="app-main">
                <Routes>
                    {/* Ruta principal */}
                    <Route path="/" element={<Home />} />

                    {/* Ruta de tareas */}
                    <Route path="/tasks" element={<Tasks />} />

                    {/* Ruta para páginas inexistentes */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
        </>
    );
}

export default App;