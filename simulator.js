const canvas = document.getElementById('graph_canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    if (typeof draw === 'function') draw();
}

window.addEventListener('resize', resizeCanvas);
setTimeout(resizeCanvas, 50); 

const nodePositions = {};

let initGraph, addNodeC, addEdgeC, getDegreeC, isNodeActiveC, areConnectedC;

Module.onRuntimeInitialized = () => {
    initGraph = Module.cwrap('init_graph', null, []);
    addNodeC = Module.cwrap('add_node_c', null, ['number']);
    addEdgeC = Module.cwrap('add_edge_c', null, ['number', 'number']);
    getDegreeC = Module.cwrap('get_node_degree', 'number', ['number']);
    isNodeActiveC = Module.cwrap('is_node_active', 'number', ['number']);
    areConnectedC = Module.cwrap('are_connected', 'number', ['number', 'number']);

    initGraph();
    
    requestAnimationFrame(draw);
};

function letterToIndex(letter) {
    return letter.toUpperCase().charCodeAt(0) - 65;
}

function indexToLetter(index) {
    return String.fromCharCode(index + 65);
}

document.getElementById('add_node_btn').addEventListener('click', () => {
    const idInput = document.getElementById('node_id').value.trim();
    const targetsInput = document.getElementById('node_targets').value.trim();

    if (!idInput) return;

    const mainNodeId = letterToIndex(idInput);
    
    addNodeC(mainNodeId);

    if (!nodePositions[mainNodeId]) {
        nodePositions[mainNodeId] = {
            x: Math.random() * (canvas.width - 100) + 50,
            y: Math.random() * (canvas.height - 100) + 50
        };
    }

    if (targetsInput) {
        const targets = targetsInput.split(',').map(t => t.trim());
        targets.forEach(target => {
            if (target) {
                const targetNodeId = letterToIndex(target);
                addNodeC(targetNodeId); 
                addEdgeC(mainNodeId, targetNodeId); 
                
                if (!nodePositions[targetNodeId]) {
                    nodePositions[targetNodeId] = {
                        x: Math.random() * (canvas.width - 100) + 50,
                        y: Math.random() * (canvas.height - 100) + 50
                    };
                }
            }
        });
    }

    document.getElementById('node_id').value = '';
    document.getElementById('node_targets').value = '';
});

function draw() {
    ctx.fillStyle = '#212529';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#92cc41'; 
    ctx.lineWidth = 2;
    for (let i = 0; i < 26; i++) {
        for (let j = i + 1; j < 26; j++) {
            if (areConnectedC(i, j) && nodePositions[i] && nodePositions[j]) {
                ctx.beginPath();
                ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
                ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
                ctx.stroke();
            }
        }
    }

    for (let i = 0; i < 26; i++) {
        if (isNodeActiveC(i) && nodePositions[i]) {
            let degree = getDegreeC(i);
            
            let size = 20 + (degree * 10);
            
            ctx.fillStyle = '#982828';
            ctx.fillRect(nodePositions[i].x - size/2, nodePositions[i].y - size/2, size, size);
            
            ctx.fillStyle = '#F7F3E8';
            ctx.font = '12px "Press Start 2P", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(indexToLetter(i), nodePositions[i].x, nodePositions[i].y);
        }
    }

    requestAnimationFrame(draw);
}
