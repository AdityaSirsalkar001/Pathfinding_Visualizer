import { PathfindingVisualizer } from './PathfindingVisualizer/PathfindingVisualizer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>High-Performance Pathfinding</h1>
        <p>Powered by C++ & WebAssembly</p>
      </div>
      <PathfindingVisualizer />
    </div>
  );
}

export default App;