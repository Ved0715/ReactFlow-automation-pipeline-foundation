from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = {}

class Edge(BaseModel):
    id: str
    source: str
    target: str

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    nodes = pipeline.nodes
    edges = pipeline.edges
    # print(nodes)
    # print(edges)
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    
    adj_list = {node.id: [] for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    
    for edge in edges:
        if edge.source in adj_list and edge.target in in_degree:
            adj_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1
            
    # Kahn's Algorithm for DAG check
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    visited_count = 0
    
    while queue:
        u = queue.pop(0)
        visited_count += 1
        
        for v in adj_list[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
                
    is_dag = visited_count == num_nodes
    
    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}
