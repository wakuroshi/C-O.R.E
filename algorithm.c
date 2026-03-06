#include <emscripten.h>
#include <stdint.h>

#define MAX_NODES 26 

uint8_t active_nodes[MAX_NODES];              
uint8_t adjacency_matrix[MAX_NODES][MAX_NODES]; 

EMSCRIPTEN_KEEPALIVE
void init_graph() {
    for (int i = 0; i < MAX_NODES; i++) {
        active_nodes[i] = 0;
        for (int j = 0; j < MAX_NODES; j++) {
            adjacency_matrix[i][j] = 0;
        }
    }
}

EMSCRIPTEN_KEEPALIVE
void add_node_c(int id) {
    if (id >= 0 && id < MAX_NODES) {
        active_nodes[id] = 1;
    }
}

EMSCRIPTEN_KEEPALIVE
void add_edge_c(int from, int to) {
    if (from >= 0 && from < MAX_NODES && to >= 0 && to < MAX_NODES) {
        active_nodes[from] = 1;
        active_nodes[to] = 1;
        adjacency_matrix[from][to] = 1;
        adjacency_matrix[to][from] = 1; 
    }
}

EMSCRIPTEN_KEEPALIVE
void remove_node_c(int id) {
    if (id >= 0 && id < MAX_NODES) {
        active_nodes[id] = 0;
        for (int i = 0; i < MAX_NODES; i++) {
            adjacency_matrix[id][i] = 0;
            adjacency_matrix[i][id] = 0;
        }
    }
}

EMSCRIPTEN_KEEPALIVE
int get_node_degree(int id) {
    if (id < 0 || id >= MAX_NODES || !active_nodes[id]) return 0;
    
    int degree = 0;
    for (int i = 0; i < MAX_NODES; i++) {
        if (adjacency_matrix[id][i] == 1) degree++;
    }
    return degree;
}

EMSCRIPTEN_KEEPALIVE
int is_node_active(int id) {
    return active_nodes[id];
}

EMSCRIPTEN_KEEPALIVE
int are_connected(int from, int to) {
    return adjacency_matrix[from][to];
}
