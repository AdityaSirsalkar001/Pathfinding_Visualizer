# 🚀 High-Performance Pathfinding Visualizer (C++ & WebAssembly)

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![C++](https://img.shields.io/badge/Backend-C++-red)
![WASM](https://img.shields.io/badge/Powered%20By-WebAssembly-orange)
![Vite](https://img.shields.io/badge/Bundler-Vite-purple)

A high-performance algorithm visualizer that leverages **C++** and **WebAssembly (WASM)** to execute graph traversal algorithms exceptionally faster than standard JavaScript implementations.

## ⚡ Key Features

- **C++ Powered Backend:** Core logic written in C++ and compiled to WASM using Emscripten for maximum computational efficiency.
- **Massive Scale:** Seamlessly handles and visualizes pathfinding across a dense 2,500-node grid (25x50).
- **Real-Time Benchmarking:** Live UI dashboard displaying highly accurate sub-millisecond execution latency, utilizing a 50-run background stress test to demonstrate true WASM speed.
- **Multiple Algorithms:**
  - **A* Search (A-Star):** Intelligent heuristic-based pathfinding.
  - **Dijkstra:** Guarantees the shortest path.
  - **Bidirectional BFS:** Optimizes search by meeting in the middle.
  - **Greedy Best-First:** Extremely fast, heuristic-heavy search.
  - **BFS & DFS:** Fundamental graph traversal demonstrations.
- **Interactive Grid:** Draw custom wall configurations with click-and-drag mechanics, or instantly generate randomized obstacle distributions to test algorithm efficiency.

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Logic:** C++ (Standard Template Library)
- **Compilation:** Emscripten (C++ → WASM)
- **Styling:** Tailwind CSS

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone [https://github.com/AdityaSirsalkar001/Pathfinding_Visualizer.git](https://github.com/AdityaSirsalkar001/Pathfinding_Visualizer.git)
   cd Pathfinding_Visualizer

2. **Install dependencies**
   ```bash
   npm install

3. **Run the development server**
   ```bash
<<<<<<< HEAD
   npm run dev
=======
   npm run dev
>>>>>>> 77c0bbbc3b3168d96a37e9d2f03bb3f24cda101d
