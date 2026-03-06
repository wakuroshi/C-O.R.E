# C-O.R.E (Computed Object Relation Engine)

**C-O.R.E** is a retro-inspired website designed to simulate and visualize Graph Theory concepts. Built with a focus on logic and high-fidelity nostalgia, it combines a **FAMICOM-style interface** with an engine driven by **C and WebAssembly**.

## 🕹️ Features

* **Graph Simulator**: Add nodes and establish connections in real-time using an engine optimized for performance.
* **Interactive Theory**: A comprehensive guide to Graph Theory, from the Bridges of Königsberg to modern PageRank algorithms.
* **NES.css Aesthetic**: A fully immersive 8-bit user interface including custom scanlines, bloom effects, and color distortion via a toggleable CRT filter.
* **Persistent Audio**: A melancholic 8-bit background track that maintains its timestamp across page navigations using `localStorage`.
* **User Configuration**: Custom settings for CRT effects and music preferences that persist between sessions.

## 🛠️ Tech Stack

* **Logic**: C (Compiled to WebAssembly).
* **Frontend**: HTML5, CSS3 (NES.css Framework).
* **Styling**: Custom CSS for CRT emulation and responsive layouts.
* **State Management**: JavaScript `localStorage` for cross-page synchronization.

## 🚀 Installation & Local Development

1. **Clone the repository**:
 
```bash
git clone https://github.com/wakuroshi/C-O.R.E.git
```

2. **Navigate to the directory**:

```bash
cd C-O.R.E
```

3. **Run with a local server**:
Since the project uses WebAssembly and local resources, it is recommended to use a local server (like Live Server in VS Code or Python's `http.server`):

```bash
python -m http.server 8000
```


4. Open `http://localhost:8000` in your browser.

## 📁 Project Structure

* `index.html`: The configuration hub and landing page.
* `simulator.html`: The WebAssembly-driven graph engine.
* `theory.html`: Educational content with responsive scrollable containers.
* `about.html`: Developer bio and project inspiration.
* `style.css`: Custom CRT filters and layout overrides.
* `bgmusic.js`: Global audio controller with state persistence.

## 📜 License

This project is licensed under the **GNU GPL v3**.

> "You are free to use, modify, and redistribute this software, provided that all derivative works remain open-source under the same license."
