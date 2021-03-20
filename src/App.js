import './App.css';
import BreadSessionList from "./component/BreadSessionList";

function App() {
  return (

    <div className="App">
        <div className="jumbotron bg-light">
            <h2 className="display-4">bread watcher</h2>
        </div>
        <BreadSessionList />
        <p className="mt-5">🍞 Jan Berger</p>
    </div>
  );
}

export default App;
