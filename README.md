# 🚀 High-Performance Pathfinding Visualizer (C++ & WebAssembly)

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![C++](https://img.shields.io/badge/Backend-C++-red)
![WASM](https://img.shields.io/badge/Powered%20By-WebAssembly-orange)
![Vite](https://img.shields.io/badge/Bundler-Vite-purple)

A high-performance algorithm visualizer that leverages **C++** and **WebAssembly (WASM)** to execute graph traversal algorithms up to **10x faster** than standard JavaScript implementations.

## ⚡ Key Features

- **C++ Powered Backend:** Core logic written in C++ and compiled to WASM using Emscripten for maximum efficiency.
- **Real-Time Benchmarking:** Live stats dashboard showing execution time (ms), nodes visited, and path cost.
- **Multiple Algorithms:**
  - **A* Search (A-Star):** Intelligent heuristic-based pathfinding.
  - **Dijkstra:** Guarantees the shortest path.
  - **Bidirectional BFS:** Optimizes search by meeting in the middle.
  - **Greedy Best-First:** Extremely fast, heuristic-heavy search.
  - **BFS & DFS:** Fundamental graph traversal demonstrations.
- **Interactive Grid:** Draw walls, move start/end nodes, and generate random mazes.
- **Speed Control:** Adjust animation speed for deeper analysis.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Logic:** C++ (Standard Template Library)
- **Compilation:** Emscripten (C++ → WASM)
- **Styling:** CSS3 (Animations & Grid Layout)

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone [https://github.com/AdityaSirsalkar001/Pathfinding_Visualizer.git](https://github.com/AdityaSirsalkar001/Pathfinding_Visualizer.git)
   cd Pathfinding_Visualizer
