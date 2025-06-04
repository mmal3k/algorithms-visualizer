export const PathfindingCode = (algorithm: string) => {
  const codes = {
    dijkstra: {
      javascript: `// Dijkstra's Algorithm: Finds shortest paths from start node to all other nodes
// Input: graph (adjacency list with weights), start node, end node
// Output: Object containing shortest distances and path
function dijkstra(graph, start, end) {
    // Keep track of distances from start to each node
    const distances = {};
    // Keep track of nodes we've already processed
    const visited = new Set();
    // Keep track of the previous node in the shortest path
    const previous = {};
    
    // Initialize all distances to infinity except start node
    for (let node in graph) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;
    
    while (true) {
        let minDistance = Infinity;
        let minNode = null;
        
        // Find the unvisited node with the smallest distance
        for (let node in distances) {
            if (!visited.has(node) && distances[node] < minDistance) {
                minDistance = distances[node];
                minNode = node;
            }
        }
        
        // If no more nodes to process or we reached the end, we're done
        if (minNode === null || minNode === end) break;
        visited.add(minNode);
        
        // Update distances to all neighbors of current node
        for (let neighbor in graph[minNode]) {
            let distance = distances[minNode] + graph[minNode][neighbor];
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = minNode;
            }
        }
    }
    
    // Reconstruct the path
    const path = [];
    let current = end;
    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }
    
    return {
        distance: distances[end],
        path: path
    };
}`,
      python: `# Dijkstra's Algorithm: Finds shortest paths from start node to all other nodes
# Input: graph (dictionary of dictionaries with weights), start node, end node
# Output: Dictionary containing shortest distance and path
def dijkstra(graph, start, end):
    # Initialize distances to infinity for all nodes except start
    distances = {node: float('infinity') for node in graph}
    distances[start] = 0
    visited = set()
    # Keep track of the previous node in the shortest path
    previous = {node: None for node in graph}
    
    while True:
        min_distance = float('infinity')
        min_node = None
        
        # Find unvisited node with minimum distance
        for node in graph:
            if node not in visited and distances[node] < min_distance:
                min_distance = distances[node]
                min_node = node
                
        # If no more nodes to process or we reached the end, we're done
        if min_node is None or min_node == end:
            break
            
        visited.add(min_node)
        
        # Update distances to all neighbors
        for neighbor, weight in graph[min_node].items():
            distance = distances[min_node] + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = min_node
                
    # Reconstruct the path
    path = []
    current = end
    while current is not None:
        path.insert(0, current)
        current = previous[current]
        
    return {
        'distance': distances[end],
        'path': path
    }`,
      java: `// Dijkstra's Algorithm: Finds shortest paths from start node to all other nodes
// Input: graph (Map of Maps with weights), start node, end node
// Output: Map containing shortest distance and path
public Map<String, Object> dijkstra(Map<String, Map<String, Integer>> graph, String start, String end) {
    // Keep track of distances and visited nodes
    Map<String, Integer> distances = new HashMap<>();
    Set<String> visited = new HashSet<>();
    // Keep track of the previous node in the shortest path
    Map<String, String> previous = new HashMap<>();
    
    // Initialize all distances to maximum value except start node
    for (String node : graph.keySet()) {
        distances.put(node, Integer.MAX_VALUE);
        previous.put(node, null);
    }
    distances.put(start, 0);
    
    while (true) {
        int minDistance = Integer.MAX_VALUE;
        String minNode = null;
        
        // Find unvisited node with minimum distance
        for (Map.Entry<String, Integer> entry : distances.entrySet()) {
            if (!visited.contains(entry.getKey()) && entry.getValue() < minDistance) {
                minDistance = entry.getValue();
                minNode = entry.getKey();
            }
        }
        
        // If no more nodes to process or we reached the end, we're done
        if (minNode == null || minNode.equals(end)) break;
        visited.add(minNode);
        
        // Update distances to all neighbors
        for (Map.Entry<String, Integer> neighbor : graph.get(minNode).entrySet()) {
            int distance = distances.get(minNode) + neighbor.getValue();
            if (distance < distances.get(neighbor.getKey())) {
                distances.put(neighbor.getKey(), distance);
                previous.put(neighbor.getKey(), minNode);
            }
        }
    }
    
    // Reconstruct the path
    List<String> path = new ArrayList<>();
    String current = end;
    while (current != null) {
        path.add(0, current);
        current = previous.get(current);
    }
    
    Map<String, Object> result = new HashMap<>();
    result.put("distance", distances.get(end));
    result.put("path", path);
    return result;
}`,
      cpp: `// Dijkstra's Algorithm: Finds shortest paths from start node to all other nodes
// Input: graph (map of maps with weights), start node, end node
// Output: Map containing shortest distance and path
map<string, variant<int, vector<string>>> dijkstra(map<string, map<string, int>>& graph, string start, string end) {
    // Keep track of distances and visited nodes
    map<string, int> distances;
    set<string> visited;
    // Keep track of the previous node in the shortest path
    map<string, string> previous;
    
    // Initialize all distances to maximum value except start node
    for (auto& node : graph) {
        distances[node.first] = INT_MAX;
        previous[node.first] = "";
    }
    distances[start] = 0;
    
    while (true) {
        int minDistance = INT_MAX;
        string minNode;
        
        // Find unvisited node with minimum distance
        for (auto& node : distances) {
            if (visited.find(node.first) == visited.end() && node.second < minDistance) {
                minDistance = node.second;
                minNode = node.first;
            }
        }
        
        // If no more nodes to process or we reached the end, we're done
        if (minNode.empty() || minNode == end) break;
        visited.insert(minNode);
        
        // Update distances to all neighbors
        for (auto& neighbor : graph[minNode]) {
            int distance = distances[minNode] + neighbor.second;
            if (distance < distances[neighbor.first]) {
                distances[neighbor.first] = distance;
                previous[neighbor.first] = minNode;
            }
        }
    }
    
    // Reconstruct the path
    vector<string> path;
    string current = end;
    while (!current.empty()) {
        path.insert(path.begin(), current);
        current = previous[current];
    }
    
    map<string, variant<int, vector<string>>> result;
    result["distance"] = distances[end];
    result["path"] = path;
    return result;
}`,
      c: `// Dijkstra's Algorithm: Finds shortest paths from start node to all other nodes
// Input: graph (2D array with weights), start node, end node, V (number of vertices)
// Output: Structure containing shortest distance and path
typedef struct {
    int distance;
    int* path;
    int pathLength;
} DijkstraResult;

DijkstraResult dijkstra(int graph[V][V], int start, int end) {
    // Keep track of distances and visited nodes
    int distances[V];
    bool visited[V];
    // Keep track of the previous node in the shortest path
    int previous[V];
    
    // Initialize distances to maximum value and visited to false
    for (int i = 0; i < V; i++) {
        distances[i] = INT_MAX;
        visited[i] = false;
        previous[i] = -1;
    }
    distances[start] = 0;
    
    // Process all nodes
    for (int count = 0; count < V - 1; count++) {
        int minDistance = INT_MAX;
        int minNode = -1;
        
        // Find unvisited node with minimum distance
        for (int v = 0; v < V; v++) {
            if (!visited[v] && distances[v] < minDistance) {
                minDistance = distances[v];
                minNode = v;
            }
        }
        
        // If no more nodes to process or we reached the end, we're done
        if (minNode == -1 || minNode == end) break;
        visited[minNode] = true;
        
        // Update distances to all neighbors
        for (int v = 0; v < V; v++) {
            if (!visited[v] && graph[minNode][v] && 
                distances[minNode] != INT_MAX &&
                distances[minNode] + graph[minNode][v] < distances[v]) {
                distances[v] = distances[minNode] + graph[minNode][v];
                previous[v] = minNode;
            }
        }
    }
    
    // Reconstruct the path
    int* path = (int*)malloc(V * sizeof(int));
    int pathLength = 0;
    int current = end;
    while (current != -1) {
        path[pathLength++] = current;
        current = previous[current];
    }
    
    // Reverse the path
    for (int i = 0; i < pathLength / 2; i++) {
        int temp = path[i];
        path[i] = path[pathLength - 1 - i];
        path[pathLength - 1 - i] = temp;
    }
    
    DijkstraResult result = {distances[end], path, pathLength};
    return result;
}`,
    },
    astar: {
      javascript: `// A* Algorithm: Finds shortest path from start to goal using heuristic
// Input: graph (adjacency list with weights), start node, goal node, heuristic function
// Output: Object containing path and cost
function astar(graph, start, goal, heuristic) {
    // Set of nodes to be evaluated
    const openSet = new Set([start]);
    // Cost from start to current node
    const gScore = new Map([[start, 0]]);
    // Estimated total cost from start to goal through current node
    const fScore = new Map([[start, heuristic(start, goal)]]);
    // Keep track of the previous node in the path
    const cameFrom = new Map();
    
    while (openSet.size > 0) {
        let current = null;
        let lowestFScore = Infinity;
        
        // Find node with lowest fScore in openSet
        for (let node of openSet) {
            if (fScore.get(node) < lowestFScore) {
                lowestFScore = fScore.get(node);
                current = node;
            }
        }
        
        // If we reached the goal, reconstruct and return the path
        if (current === goal) {
            const path = [];
            while (current !== start) {
                path.unshift(current);
                current = cameFrom.get(current);
            }
            path.unshift(start);
            return {
                path: path,
                cost: gScore.get(goal)
            };
        }
        
        openSet.delete(current);
        
        // Check all neighbors
        for (let neighbor of graph[current]) {
            // Calculate tentative gScore
            let tentativeGScore = gScore.get(current) + graph[current][neighbor];
            
            // If this path is better than previous one
            if (!gScore.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
                cameFrom.set(neighbor, current);
                gScore.set(neighbor, tentativeGScore);
                fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal));
                openSet.add(neighbor);
            }
        }
    }
    
    // No path found
    return null;
}`,
      python: `# A* Algorithm: Finds shortest path from start to goal using heuristic
# Input: graph (dictionary of dictionaries with weights), start node, goal node, heuristic function
# Output: Dictionary containing path and cost
def astar(graph, start, goal, heuristic):
    # Set of nodes to be evaluated
    open_set = {start}
    # Cost from start to current node
    g_score = {start: 0}
    # Estimated total cost from start to goal through current node
    f_score = {start: heuristic(start, goal)}
    # Keep track of the previous node in the path
    came_from = {}
    
    while open_set:
        # Find node with lowest fScore
        current = min(open_set, key=lambda x: f_score.get(x, float('inf')))
        
        # If we reached the goal, reconstruct and return the path
        if current == goal:
            path = []
            while current != start:
                path.insert(0, current)
                current = came_from[current]
            path.insert(0, start)
            return {
                'path': path,
                'cost': g_score[goal]
            }
            
        open_set.remove(current)
        
        # Check all neighbors
        for neighbor in graph[current]:
            # Calculate tentative gScore
            tentative_g_score = g_score[current] + graph[current][neighbor]
            
            # If this path is better than previous one
            if neighbor not in g_score or tentative_g_score < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = tentative_g_score + heuristic(neighbor, goal)
                open_set.add(neighbor)
    
    # No path found
    return None`,
      java: `// A* Algorithm: Finds shortest path from start to goal using heuristic
// Input: graph (Map of Maps with weights), start node, goal node, heuristic function
// Output: Map containing path and cost
public Map<String, Object> astar(Map<String, Map<String, Integer>> graph, String start, String goal, 
    BiFunction<String, String, Integer> heuristic) {
    // Set of nodes to be evaluated
    Set<String> openSet = new HashSet<>();
    openSet.add(start);
    // Cost from start to current node
    Map<String, Integer> gScore = new HashMap<>();
    // Estimated total cost from start to goal through current node
    Map<String, Integer> fScore = new HashMap<>();
    // Keep track of the previous node in the path
    Map<String, String> cameFrom = new HashMap<>();
    
    gScore.put(start, 0);
    fScore.put(start, heuristic.apply(start, goal));
    
    while (!openSet.isEmpty()) {
        // Find node with lowest fScore
        String current = openSet.stream()
            .min(Comparator.comparingInt(fScore::get))
            .orElse(null);
            
        // If we reached the goal, reconstruct and return the path
        if (current.equals(goal)) {
            List<String> path = new ArrayList<>();
            while (!current.equals(start)) {
                path.add(0, current);
                current = cameFrom.get(current);
            }
            path.add(0, start);
            
            Map<String, Object> result = new HashMap<>();
            result.put("path", path);
            result.put("cost", gScore.get(goal));
            return result;
        }
        
        openSet.remove(current);
        
        // Check all neighbors
        for (Map.Entry<String, Integer> neighbor : graph.get(current).entrySet()) {
            // Calculate tentative gScore
            int tentativeGScore = gScore.get(current) + neighbor.getValue();
            
            // If this path is better than previous one
            if (!gScore.containsKey(neighbor.getKey()) || 
                tentativeGScore < gScore.get(neighbor.getKey())) {
                cameFrom.put(neighbor.getKey(), current);
                gScore.put(neighbor.getKey(), tentativeGScore);
                fScore.put(neighbor.getKey(), 
                    tentativeGScore + heuristic.apply(neighbor.getKey(), goal));
                openSet.add(neighbor.getKey());
            }
        }
    }
    
    // No path found
    return null;
}`,
      cpp: `// A* Algorithm: Finds shortest path from start to goal using heuristic
// Input: graph (map of maps with weights), start node, goal node, heuristic function
// Output: Map containing path and cost
map<string, variant<vector<string>, int>> astar(map<string, map<string, int>>& graph, string start, string goal,
    function<int(string, string)> heuristic) {
    // Set of nodes to be evaluated
    set<string> openSet = {start};
    // Cost from start to current node
    map<string, int> gScore;
    // Estimated total cost from start to goal through current node
    map<string, int> fScore;
    // Keep track of the previous node in the path
    map<string, string> cameFrom;
    
    gScore[start] = 0;
    fScore[start] = heuristic(start, goal);
    
    while (!openSet.empty()) {
        // Find node with lowest fScore
        string current = *min_element(openSet.begin(), openSet.end(),
            [&fScore](const string& a, const string& b) {
                return fScore[a] < fScore[b];
            });
            
        // If we reached the goal, reconstruct and return the path
        if (current == goal) {
            vector<string> path;
            while (current != start) {
                path.insert(path.begin(), current);
                current = cameFrom[current];
            }
            path.insert(path.begin(), start);
            
            map<string, variant<vector<string>, int>> result;
            result["path"] = path;
            result["cost"] = gScore[goal];
            return result;
        }
        
        openSet.erase(current);
        
        // Check all neighbors
        for (auto& neighbor : graph[current]) {
            // Calculate tentative gScore
            int tentativeGScore = gScore[current] + neighbor.second;
            
            // If this path is better than previous one
            if (gScore.find(neighbor.first) == gScore.end() || 
                tentativeGScore < gScore[neighbor.first]) {
                cameFrom[neighbor.first] = current;
                gScore[neighbor.first] = tentativeGScore;
                fScore[neighbor.first] = tentativeGScore + 
                    heuristic(neighbor.first, goal);
                openSet.insert(neighbor.first);
            }
        }
    }
    
    // No path found
    return map<string, variant<vector<string>, int>>();
}`,
      c: `// A* Algorithm: Finds shortest path from start to goal using heuristic
// Input: graph (2D array with weights), start node, goal node, heuristic function, V (number of vertices)
// Output: Structure containing path and cost
typedef struct {
    int* path;
    int pathLength;
    int cost;
} AStarResult;

AStarResult astar(int graph[V][V], int start, int goal, int (*heuristic)(int, int)) {
    // Set of nodes to be evaluated
    int openSet[V];
    int openSetSize = 1;
    // Cost from start to current node
    int gScore[V];
    // Estimated total cost from start to goal through current node
    int fScore[V];
    // Keep track of the previous node in the path
    int cameFrom[V];
    
    openSet[0] = start;
    gScore[start] = 0;
    fScore[start] = heuristic(start, goal);
    
    while (openSetSize > 0) {
        // Find node with lowest fScore
        int current = openSet[0];
        int currentIndex = 0;
        
        for (int i = 1; i < openSetSize; i++) {
            if (fScore[openSet[i]] < fScore[current]) {
                current = openSet[i];
                currentIndex = i;
            }
        }
        
        // If we reached the goal, reconstruct and return the path
        if (current == goal) {
            int* path = (int*)malloc(V * sizeof(int));
            int pathLength = 0;
            
            while (current != start) {
                path[pathLength++] = current;
                current = cameFrom[current];
            }
            path[pathLength++] = start;
            
            // Reverse the path
            for (int i = 0; i < pathLength / 2; i++) {
                int temp = path[i];
                path[i] = path[pathLength - 1 - i];
                path[pathLength - 1 - i] = temp;
            }
            
            AStarResult result = {path, pathLength, gScore[goal]};
            return result;
        }
        
        // Remove current from openSet
        openSet[currentIndex] = openSet[--openSetSize];
        
        // Check all neighbors
        for (int i = 0; i < V; i++) {
            if (graph[current][i]) {
                // Calculate tentative gScore
                int tentativeGScore = gScore[current] + graph[current][i];
                
                // If this path is better than previous one
                if (gScore[i] == 0 || tentativeGScore < gScore[i]) {
                    cameFrom[i] = current;
                    gScore[i] = tentativeGScore;
                    fScore[i] = tentativeGScore + heuristic(i, goal);
                    openSet[openSetSize++] = i;
                }
            }
        }
    }
    
    // No path found
    AStarResult result = {NULL, 0, 0};
    return result;
}`,
    },
    bfs: {
      javascript: `// Breadth-First Search: Explores all nodes at present depth before moving deeper
// Input: graph (adjacency list), start node, end node
// Output: Object containing path
function bfs(graph, start, end) {
    // Keep track of visited nodes
    const visited = new Set();
    // Queue for BFS
    const queue = [start];
    // Keep track of the previous node in the path
    const previous = new Map();
    
    visited.add(start);
    
    while (queue.length > 0) {
        // Get the first node from queue
        const current = queue.shift();
        
        // If we reached the end, reconstruct and return the path
        if (current === end) {
            const path = [];
            while (current !== start) {
                path.unshift(current);
                current = previous.get(current);
            }
            path.unshift(start);
            return { path };
        }
        
        // Check all neighbors
        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                previous.set(neighbor, current);
                queue.push(neighbor);
            }
        }
    }
    
    // No path found
    return null;
}`,
      python: `# Breadth-First Search: Explores all nodes at present depth before moving deeper
# Input: graph (dictionary of lists), start node, end node
# Output: Dictionary containing path
def bfs(graph, start, end):
    # Keep track of visited nodes
    visited = set()
    # Queue for BFS
    queue = [start]
    # Keep track of the previous node in the path
    previous = {}
    
    visited.add(start)
    
    while queue:
        # Get the first node from queue
        current = queue.pop(0)
        
        # If we reached the end, reconstruct and return the path
        if current == end:
            path = []
            while current != start:
                path.insert(0, current)
                current = previous[current]
            path.insert(0, start)
            return {'path': path}
        
        # Check all neighbors
        for neighbor in graph[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                previous[neighbor] = current
                queue.append(neighbor)
    
    # No path found
    return None`,
      java: `// Breadth-First Search: Explores all nodes at present depth before moving deeper
// Input: graph (Map of Lists), start node, end node
// Output: Map containing path
public Map<String, List<String>> bfs(Map<String, List<String>> graph, String start, String end) {
    // Keep track of visited nodes
    Set<String> visited = new HashSet<>();
    // Queue for BFS
    Queue<String> queue = new LinkedList<>();
    // Keep track of the previous node in the path
    Map<String, String> previous = new HashMap<>();
    
    queue.add(start);
    visited.add(start);
    
    while (!queue.isEmpty()) {
        // Get the first node from queue
        String current = queue.poll();
        
        // If we reached the end, reconstruct and return the path
        if (current.equals(end)) {
            List<String> path = new ArrayList<>();
            while (!current.equals(start)) {
                path.add(0, current);
                current = previous.get(current);
            }
            path.add(0, start);
            
            Map<String, List<String>> result = new HashMap<>();
            result.put("path", path);
            return result;
        }
        
        // Check all neighbors
        for (String neighbor : graph.get(current)) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                previous.put(neighbor, current);
                queue.add(neighbor);
            }
        }
    }
    
    // No path found
    return null;
}`,
      cpp: `// Breadth-First Search: Explores all nodes at present depth before moving deeper
// Input: graph (map of vectors), start node, end node
// Output: Map containing path
map<string, vector<string>> bfs(map<string, vector<string>>& graph, string start, string end) {
    // Keep track of visited nodes
    set<string> visited;
    // Queue for BFS
    queue<string> q;
    // Keep track of the previous node in the path
    map<string, string> previous;
    
    q.push(start);
    visited.insert(start);
    
    while (!q.empty()) {
        // Get the first node from queue
        string current = q.front();
        q.pop();
        
        // If we reached the end, reconstruct and return the path
        if (current == end) {
            vector<string> path;
            while (current != start) {
                path.insert(path.begin(), current);
                current = previous[current];
            }
            path.insert(path.begin(), start);
            
            map<string, vector<string>> result;
            result["path"] = path;
            return result;
        }
        
        // Check all neighbors
        for (string neighbor : graph[current]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                previous[neighbor] = current;
                q.push(neighbor);
            }
        }
    }
    
    // No path found
    return map<string, vector<string>>();
}`,
      c: `// Breadth-First Search: Explores all nodes at present depth before moving deeper
// Input: graph (2D array), start node, end node, V (number of vertices)
// Output: Structure containing path
typedef struct {
    int* path;
    int pathLength;
} BFSResult;

BFSResult bfs(int graph[V][V], int start, int end) {
    // Keep track of visited nodes
    int visited[V] = {0};
    // Queue for BFS
    int queue[V];
    int front = 0, rear = 0;
    // Keep track of the previous node in the path
    int previous[V];
    
    queue[rear++] = start;
    visited[start] = 1;
    
    while (front < rear) {
        // Get the first node from queue
        int current = queue[front++];
        
        // If we reached the end, reconstruct and return the path
        if (current == end) {
            int* path = (int*)malloc(V * sizeof(int));
            int pathLength = 0;
            
            while (current != start) {
                path[pathLength++] = current;
                current = previous[current];
            }
            path[pathLength++] = start;
            
            // Reverse the path
            for (int i = 0; i < pathLength / 2; i++) {
                int temp = path[i];
                path[i] = path[pathLength - 1 - i];
                path[pathLength - 1 - i] = temp;
            }
            
            BFSResult result = {path, pathLength};
            return result;
        }
        
        // Check all neighbors
        for (int i = 0; i < V; i++) {
            if (graph[current][i] && !visited[i]) {
                visited[i] = 1;
                previous[i] = current;
                queue[rear++] = i;
            }
        }
    }
    
    // No path found
    BFSResult result = {NULL, 0};
    return result;
}`,
    },
    dfs: {
      javascript: `// Depth-First Search: Explores as far as possible along each branch before backtracking
// Input: graph (adjacency list), start node, end node
// Output: Object containing path
function dfs(graph, start, end) {
    // Keep track of visited nodes
    const visited = new Set();
    // Keep track of the previous node in the path
    const previous = new Map();
    
    // Helper function for recursive DFS
    function dfsHelper(node) {
        visited.add(node);
        
        // If we reached the end, we're done
        if (node === end) return true;
        
        // Check all neighbors
        for (const neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                previous.set(neighbor, node);
                if (dfsHelper(neighbor)) return true;
            }
        }
        
        return false;
    }
    
    // Start DFS from the start node
    if (dfsHelper(start)) {
        // Reconstruct the path
        const path = [];
        let current = end;
        while (current !== start) {
            path.unshift(current);
            current = previous.get(current);
        }
        path.unshift(start);
        return { path };
    }
    
    // No path found
    return null;
}`,
      python: `# Depth-First Search: Explores as far as possible along each branch before backtracking
# Input: graph (dictionary of lists), start node, end node
# Output: Dictionary containing path
def dfs(graph, start, end):
    # Keep track of visited nodes
    visited = set()
    # Keep track of the previous node in the path
    previous = {}
    
    # Helper function for recursive DFS
    def dfs_helper(node):
        visited.add(node)
        
        # If we reached the end, we're done
        if node == end:
            return True
        
        # Check all neighbors
        for neighbor in graph[node]:
            if neighbor not in visited:
                previous[neighbor] = node
                if dfs_helper(neighbor):
                    return True
        
        return False
    
    # Start DFS from the start node
    if dfs_helper(start):
        # Reconstruct the path
        path = []
        current = end
        while current != start:
            path.insert(0, current)
            current = previous[current]
        path.insert(0, start)
        return {'path': path}
    
    # No path found
    return None`,
      java: `// Depth-First Search: Explores as far as possible along each branch before backtracking
// Input: graph (Map of Lists), start node, end node
// Output: Map containing path
public Map<String, List<String>> dfs(Map<String, List<String>> graph, String start, String end) {
    // Keep track of visited nodes
    Set<String> visited = new HashSet<>();
    // Keep track of the previous node in the path
    Map<String, String> previous = new HashMap<>();
    
    // Helper function for recursive DFS
    private boolean dfsHelper(String node) {
        visited.add(node);
        
        // If we reached the end, we're done
        if (node.equals(end)) return true;
        
        // Check all neighbors
        for (String neighbor : graph.get(node)) {
            if (!visited.contains(neighbor)) {
                previous.put(neighbor, node);
                if (dfsHelper(neighbor)) return true;
            }
        }
        
        return false;
    }
    
    // Start DFS from the start node
    if (dfsHelper(start)) {
        // Reconstruct the path
        List<String> path = new ArrayList<>();
        String current = end;
        while (!current.equals(start)) {
            path.add(0, current);
            current = previous.get(current);
        }
        path.add(0, start);
        
        Map<String, List<String>> result = new HashMap<>();
        result.put("path", path);
        return result;
    }
    
    // No path found
    return null;
}`,
      cpp: `// Depth-First Search: Explores as far as possible along each branch before backtracking
// Input: graph (map of vectors), start node, end node
// Output: Map containing path
map<string, vector<string>> dfs(map<string, vector<string>>& graph, string start, string end) {
    // Keep track of visited nodes
    set<string> visited;
    // Keep track of the previous node in the path
    map<string, string> previous;
    
    // Helper function for recursive DFS
    bool dfsHelper(string node) {
        visited.insert(node);
        
        // If we reached the end, we're done
        if (node == end) return true;
        
        // Check all neighbors
        for (string neighbor : graph[node]) {
            if (visited.find(neighbor) == visited.end()) {
                previous[neighbor] = node;
                if (dfsHelper(neighbor)) return true;
            }
        }
        
        return false;
    }
    
    // Start DFS from the start node
    if (dfsHelper(start)) {
        // Reconstruct the path
        vector<string> path;
        string current = end;
        while (current != start) {
            path.insert(path.begin(), current);
            current = previous[current];
        }
        path.insert(path.begin(), start);
        
        map<string, vector<string>> result;
        result["path"] = path;
        return result;
    }
    
    // No path found
    return map<string, vector<string>>();
}`,
      c: `// Depth-First Search: Explores as far as possible along each branch before backtracking
// Input: graph (2D array), start node, end node, V (number of vertices)
// Output: Structure containing path
typedef struct {
    int* path;
    int pathLength;
} DFSResult;

DFSResult dfs(int graph[V][V], int start, int end) {
    // Keep track of visited nodes
    int visited[V] = {0};
    // Keep track of the previous node in the path
    int previous[V];
    
    // Helper function for recursive DFS
    bool dfsHelper(int node) {
        visited[node] = 1;
        
        // If we reached the end, we're done
        if (node == end) return true;
        
        // Check all neighbors
        for (int i = 0; i < V; i++) {
            if (graph[node][i] && !visited[i]) {
                previous[i] = node;
                if (dfsHelper(i)) return true;
            }
        }
        
        return false;
    }
    
    // Start DFS from the start node
    if (dfsHelper(start)) {
        // Reconstruct the path
        int* path = (int*)malloc(V * sizeof(int));
        int pathLength = 0;
        
        int current = end;
        while (current != start) {
            path[pathLength++] = current;
            current = previous[current];
        }
        path[pathLength++] = start;
        
        // Reverse the path
        for (int i = 0; i < pathLength / 2; i++) {
            int temp = path[i];
            path[i] = path[pathLength - 1 - i];
            path[pathLength - 1 - i] = temp;
        }
        
        DFSResult result = {path, pathLength};
        return result;
    }
    
    // No path found
    DFSResult result = {NULL, 0};
    return result;
}`,
    },
  };

  return codes[algorithm as keyof typeof codes];
};
