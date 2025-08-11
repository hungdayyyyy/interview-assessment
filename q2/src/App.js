import "./App.css";
import Toogle from "./components/Toogle";
import AppRouter from "../src/router/AppRouter";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <AppRouter />
        </div>
      </header>
    </div>
  );
}

export default App;
