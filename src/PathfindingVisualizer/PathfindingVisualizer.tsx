import { useState, useEffect, useRef } from 'react';
import './PathfindingVisualizer.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 40;
const GRID_ROWS = 20;
const GRID_COLS = 50;

declare global {
  interface Window {
    createPathfindingModule: any;
  }
}

export interface NodeType {
  col: number;
  row: number;
  isStart: boolean;
  isFinish: boolean;
  isVisited: boolean;
  isWall: boolean;
  id: number; 
}

export const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState<'dijkstra' | 'bfs' | 'dfs' | 'astar' | 'greedy' | 'bidirectional'>('dijkstra');
  const [isRunning, setIsRunning] = useState(false);
  const wasmModule = useRef<any>(null);

  useEffect(() => {
    setGrid(getInitialGrid());

    const script = document.createElement('script');
    script.src = "/pathfinding.js";
    script.async = true;
    script.onload = () => {
      if (window.createPathfindingModule) {
        window.createPathfindingModule().then((module: any) => {
          wasmModule.current = module;
          console.log("C++ Module Loaded");
        });
      }
    };
    document.body.appendChild(script);

    return () => { document.body.removeChild(script); }
  }, []);

  const handleMouseDown = (row: number, col: number) => {
    if (isRunning) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed || isRunning) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => setMouseIsPressed(false);

  const visualizeAlgorithm = () => {
    if (isRunning || !wasmModule.current) return;
    setIsRunning(true);
    
    // Clear old visited/path nodes from the DOM, but KEEP walls
    resetVisuals(); 

    const flatGrid = new wasmModule.current.VectorInt();
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        flatGrid.push_back(grid[r][c].isWall ? 1 : 0);
      }
    }

    const startIdx = START_NODE_ROW * GRID_COLS + START_NODE_COL;
    const finishIdx = FINISH_NODE_ROW * GRID_COLS + FINISH_NODE_COL;

    const result = wasmModule.current.solveGraph(
      flatGrid, 
      GRID_ROWS, 
      GRID_COLS, 
      startIdx, 
      finishIdx, 
      selectedAlgo
    );

    const visitedOrderIndices: number[] = [];
    const shortestPathIndices: number[] = [];
    
    const visitedSize = result.visitedOrder.size();
    for(let i=0; i<visitedSize; i++) visitedOrderIndices.push(result.visitedOrder.get(i));
    
    const pathSize = result.shortestPath.size();
    for(let i=0; i<pathSize; i++) shortestPathIndices.push(result.shortestPath.get(i));

    flatGrid.delete();

    animateAlgorithm(visitedOrderIndices, shortestPathIndices);
  };

  const animateAlgorithm = (visitedIndices: number[], pathIndices: number[]) => {
    const totalTime = visitedIndices.length * 10 + pathIndices.length * 40;

    for (let i = 0; i < visitedIndices.length; i++) {
      setTimeout(() => {
        const idx = visitedIndices[i];
        const r = Math.floor(idx / GRID_COLS);
        const c = idx % GRID_COLS;
        const nodeEl = document.getElementById(`node-${r}-${c}`);
        const isStart = r === START_NODE_ROW && c === START_NODE_COL;
        const isFinish = r === FINISH_NODE_ROW && c === FINISH_NODE_COL;
        
        // Ensure we don't color over walls or start/finish nodes
        if (nodeEl && !isStart && !isFinish && !grid[r][c].isWall) {
          nodeEl.className = 'node node-visited';
        }
      }, 10 * i);
    }

    setTimeout(() => {
      for (let i = 0; i < pathIndices.length; i++) {
        setTimeout(() => {
          const idx = pathIndices[i];
          const r = Math.floor(idx / GRID_COLS);
          const c = idx % GRID_COLS;
          const nodeEl = document.getElementById(`node-${r}-${c}`);
          const isStart = r === START_NODE_ROW && c === START_NODE_COL;
          const isFinish = r === FINISH_NODE_ROW && c === FINISH_NODE_COL;

          if (nodeEl && !isStart && !isFinish) {
            nodeEl.className = 'node node-shortest-path';
          }
        }, 40 * i);
      }
    }, 10 * visitedIndices.length);

    setTimeout(() => setIsRunning(false), totalTime);
  };

  const generateRandomMaze = () => {
    if (isRunning) return;
    const newGrid = getInitialGrid();
    for(let r=0; r<GRID_ROWS; r++){
        for(let c=0; c<GRID_COLS; c++){
            const node = newGrid[r][c];
            if(!node.isStart && !node.isFinish){
                node.isWall = Math.random() < 0.25;
            }
        }
    }
    setGrid(newGrid);
    // After setting grid state, we must manually update DOM classes too because we are bypassing React render in animation loop
    setTimeout(() => {
        for(let r=0; r<GRID_ROWS; r++){
            for(let c=0; c<GRID_COLS; c++){
                const nodeEl = document.getElementById(`node-${r}-${c}`);
                if(nodeEl && newGrid[r][c].isWall) {
                    nodeEl.className = 'node node-wall';
                } else if (nodeEl && !newGrid[r][c].isStart && !newGrid[r][c].isFinish) {
                    nodeEl.className = 'node';
                }
            }
        }
    }, 0);
  };

  const clearBoard = () => {
    if (isRunning) return;
    setGrid(getInitialGrid());
    
    // Reset all classes in DOM
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        if (nodeElement) {
          const isStart = row === START_NODE_ROW && col === START_NODE_COL;
          const isFinish = row === FINISH_NODE_ROW && col === FINISH_NODE_COL;
          if (isStart) nodeElement.className = 'node node-start';
          else if (isFinish) nodeElement.className = 'node node-finish';
          else nodeElement.className = 'node';
        }
      }
    }
  };

  const resetVisuals = () => {
    // This function clears the path/visited animations but PRESERVES walls
    for (let row = 0; row < GRID_ROWS; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        if (nodeElement) {
          const isStart = row === START_NODE_ROW && col === START_NODE_COL;
          const isFinish = row === FINISH_NODE_ROW && col === FINISH_NODE_COL;
          const isWall = grid[row][col].isWall; // Check the React state

          if (isStart) nodeElement.className = 'node node-start';
          else if (isFinish) nodeElement.className = 'node node-finish';
          else if (isWall) nodeElement.className = 'node node-wall'; // KEEP THE WALL
          else nodeElement.className = 'node';
        }
      }
    }
  }

  return (
    <>
      <div className="controls">
        <select 
          value={selectedAlgo} 
          onChange={(e) => setSelectedAlgo(e.target.value as any)}
          disabled={isRunning}
        >
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A* Search (Smart)</option>
          <option value="greedy">Greedy Best-First (Fast)</option>
          <option value="bidirectional">Bidirectional BFS (Optimized)</option>
          <option value="bfs">Breadth-First Search (BFS)</option>
          <option value="dfs">Depth-First Search (DFS)</option>
        </select>
        
        <button onClick={visualizeAlgorithm} disabled={isRunning}>Visualize</button>
        <button onClick={generateRandomMaze} disabled={isRunning}>Random Maze</button>
        <button onClick={clearBoard} disabled={isRunning}>Clear Board</button>
      </div>

      <div className="grid" onMouseLeave={handleMouseUp}>
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((node, nodeIdx) => {
              const { isFinish, isStart, isWall, row, col } = node;
              const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
              return (
                <div
                  id={`node-${row}-${col}`}
                  key={nodeIdx}
                  className={`node ${extraClassName}`}
                  onMouseDown={() => handleMouseDown(row, col)}
                  onMouseEnter={() => handleMouseEnter(row, col)}
                  onMouseUp={handleMouseUp}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

const getInitialGrid = (): NodeType[][] => {
  const grid = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < GRID_COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col: number, row: number): NodeType => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isVisited: false,
    isWall: false,
    id: row * GRID_COLS + col,
  };
};

const getNewGridWithWallToggled = (grid: NodeType[][], row: number, col: number) => {
  const newGrid = grid.slice().map(r => r.slice()); 
  const node = newGrid[row][col];
  if (!node.isStart && !node.isFinish) {
      node.isWall = !node.isWall;
  }
  return newGrid;
};