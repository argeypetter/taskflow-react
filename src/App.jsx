import Header from './components/Header.jsx';
import List from './components/List.jsx';
import './App.css';

function App() {
    return (
        <>
            <Header />

            <main className="app-main">
                <h2 className="section-title">Mis tareas</h2>
                <List />
            </main>
        </>
    );
}

export default App;