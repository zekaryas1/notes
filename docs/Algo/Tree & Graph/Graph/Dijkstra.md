---
title: Dijkstra
date created: Monday, January 22nd 2024, 8:36:44 pm
date modified: Sunday, June 16th 2024, 2:08:26 pm
---

# Dijkstra

## What is Dijkstra Algorithm

- Dijkstra's algorithm is used to find the shortest path between two nodes in a graph with non-negative edge weights.

### Properties of Dijkstra

1. **Shortest Paths:**
	- Dijkstra's algorithm is particularly designed for finding the shortest paths in weighted graphs.
2. **Optimality:**
	- It guarantees the optimality of the solution, meaning it finds the shortest path accurately.
3. **Non-Negative Weights:**
	- Dijkstra's algorithm works well when the graph has non-negative edge weights.
4. **Single Source:**
	- It is commonly used for finding the shortest paths from a single source to all other nodes in the graph.
	- It works in cyclic graphs

## Dijkstra Vs Breadth-First Search (BFS)

| Feature        | Dijkstra's Algorithm                                                                                 | Breadth-First Search (BFS)                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Objective      | Find the shortest path from a single source to all nodes in a graph.                                 | Explore all nodes in the graph starting from a given source.                                 |
| Use Cases      | Shortest path problems with weighted graphs.                                                         | Traversal problems, finding connected components, shortest unweighted paths.                 |
| Edge Weights   | Suitable for graphs with weighted edges (non-negative).                                              | Works with unweighted graphs or graphs with uniform edge weights.                            |
| Data structure | Typically uses a priority queue to efficiently choose the next node to explore.                      | Uses a FIFO (First-In-First-Out) queue to explore nodes level by level.                      |
| Optimality     | Guarantees the optimality of the solution; finds the shortest path accurately.                       | Does not guarantee the shortest path; suitable for exploring all nodes.                      |
| Complexity     | Time complexity is O((V + E) log V), where V is the number of vertices and E is the number of edges. | Time complexity is O(V + E), where V is the number of vertices and E is the number of edges. |
| Memory Usage   | Can use more memory due to the need for a priority queue.                                            | Typically uses less memory as it only requires a simple queue.                               |

## How the Algorithm Works

### 1. Initialization:

- **Distance Array:**
	- Initialize an array to store the shortest distance from the source to each node. Set the distance of the source to 0, and the distances to all other nodes to infinity.
- **Priority Queue:**
	- Create a priority queue to prioritize nodes based on their current distances.

### 2. Relaxation:

- **Iteration:**
	- Repeat the following steps until all nodes are visited.
- **Next Node:**
	- Choose the node with the smallest distance from the priority queue.
- **Relaxation:**
	- For each neighboring node, check if the path through the current node is shorter than the known path. If so, update the distance and enqueue the node.

### 3. Result:

- **Final Distances:**
	- The final distances array contains the shortest distances from the source to all other nodes.
- **Shortest Path:**
	- Reconstruct the shortest path by backtracking from the destination to the source using the recorded distances.

## Dijkstra Boilerplate

```python
import heapq

def dijkstra(graph, start):
    # Initialize distances with infinity for all nodes except the start node
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    # Priority queue to track the nodes and their distances
    min_heap = [(0, start)]
    
    while min_heap:
        current_distance, current_node = heapq.heappop(min_heap)
        
        # If the current distance is greater than the known distance, skip
        if current_distance > distances[current_node]:
            continue
        
        # Iterate through neighbors of the current node
        for neighbor, distance in graph[current_node]:
            new_distance = current_distance + distance
            
            # If a shorter path is found, update the distance and enqueue the neighbor
            if new_distance < distances[neighbor]:
                distances[neighbor] = new_distance
                heapq.heappush(min_heap, (new_distance, neighbor))
    
    return distances

# Example Usage:
# Representing a graph as an adjacency list
graph = {
    'A': [['B', 1], ['C', 4]],
    'B': [['A', 1], ['C', 2], ['D', 5]],
    'C': [['A', 4], ['B', 2], ['D', 1]],
    'D': [['B', 5], ['C', 1]]
}

start_node = 'A'
result = dijkstra(graph, start_node)
print("Shortest Distances from {}: {}".format(start_node, result))

```
