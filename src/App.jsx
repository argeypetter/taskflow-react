import Header from './components/Header.jsx';
import List from './components/List.jsx';
import './App.css';
function App() {
    return (
        <>
            <Header />
            <main>
                <h2>Mis tareas</h2>
                <List />
            </main>
        </>
    );
}

export default App;