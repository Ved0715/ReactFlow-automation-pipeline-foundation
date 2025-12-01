# ReactFlow Automation Pipeline Builder

A visual pipeline builder where you can drag-and-drop nodes, connect them, and validate your data workflows. Built for VectorShift's technical assessment.

## What It Does

Think of it like a visual programming tool - you drag nodes onto a canvas, connect them together, and the system validates whether your pipeline makes sense (no circular dependencies). It's similar to tools like Zapier or n8n, but built from scratch.

## Key Features

**Smart Node System** - I built a reusable node architecture, so creating new node types is just adding a config object. No need to write new React components for each node type.

**Variable Detection** - Type `{{variableName}}` in any text field, and the system automatically creates connection points and suggests available nodes. Pretty handy for linking data between steps.

**Pipeline Validation** - Uses Kahn's Algorithm to check if your pipeline is a valid DAG (Directed Acyclic Graph). Basically makes sure you don't have circular loops.

**Modern UI** - Clean interface with hover effects, smooth animations, and a color scheme that doesn't hurt your eyes.

## Tech Stack

**Frontend:**

- React + React Flow for the visual editor
- Zustand for state management (lighter than Redux)
- react-mentions for the variable system

**Backend:**

- FastAPI (Python) for the API
- Pydantic for data validation
- Uvicorn as the server

**DevOps:**

- Docker + Docker Compose for easy deployment

## Quick Start

### Running Locally

**Backend:**

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend:**

```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` and you're good to go.

### Using Docker

Easier option if you have Docker installed:

```bash
docker-compose up --build
```

That's it. Both frontend and backend will start automatically.

## How It Works

### The Node System

Instead of creating separate components for each node type, I made one `BaseNode` component that reads from a config file. Want a new node? Just add this to `nodeConfig.js`:

```javascript
myNode: {
  type: 'myNode',
  title: 'My Node',
  icon: FiStar,
  handles: [
    { type: 'target', position: Position.Left, id: 'input' },
    { type: 'source', position: Position.Right, id: 'output' }
  ],
  fields: [
    { type: 'text', name: 'name', label: 'Name:', defaultValue: (id) => id }
  ]
}
```

Then register it in a couple places and you're done. Much cleaner than copy-pasting components.

### Variable System

When you type `{{` in a text area, it shows a dropdown of available nodes. Select one, and it automatically:

1. Creates a connection point on the left side
2. Makes an edge between the nodes
3. Styles the variable reference nicely

Built with react-mentions library, which handles the heavy lifting.

### Backend Validation

When you hit Submit, the frontend sends your pipeline to the backend, which:

1. Counts nodes and edges
2. Checks if it's a valid DAG using Kahn's Algorithm
3. Returns the results

The algorithm is pretty straightforward - it tries to sort the graph topologically, and if it can visit all nodes, it's a DAG.

## Project Structure

```
├── backend/
│   ├── main.py              # FastAPI app with pipeline validation
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── baseNode.js      # Generic node component
│   │   │   └── nodeConfig.js    # Node definitions
│   │   ├── components/
│   │   │   └── NodeMentionsInput.js  # Variable mention system
│   │   ├── store.js             # Zustand state
│   │   └── ui.js                # Main canvas
│   ├── package.json
│   └── Dockerfile
│
└── docker-compose.yml
```

## Adding New Nodes

Here's what I included:

- **Input/Output** - Start and end points
- **LLM** - Language model processing
- **Text** - Text content with variable support
- **Filter** - Filter data by conditions
- **Transform** - Transform data
- **Condition** - Branch based on conditions
- **Aggregate** - Combine multiple inputs
- **API** - Make external API calls

Adding more is super easy with the config-based system.

## API

The backend has one main endpoint:

**POST /pipelines/parse**

```json
{
  "nodes": [...],
  "edges": [...]
}
```

Returns:

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

## What I Learned

This project was a great exercise in:

- Building reusable component systems (the node abstraction)
- Working with complex state management
- Implementing graph algorithms in a practical context
- Containerizing full-stack applications
- Creating clean APIs with FastAPI

The node abstraction pattern was particularly interesting - it's basically the Factory pattern applied to React components.

## Notes

Built as part of VectorShift's technical assessment. The goal was to demonstrate clean architecture, reusable patterns, and full-stack development skills.

---

**Author:** Vedant Narwade
