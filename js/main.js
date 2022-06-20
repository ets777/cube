import App from '../node_modules/etsbox-canvas-lib/src/App.js';

const config = {
    width: 500,
    height: 450,
    period: 20
}
const app = new App(config);
const { context } = app;

let dots = [];
let lines = [
    [0, 1], [1, 2], [2, 3], [3, 0], 
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7]    
];

function generateDots() {
    dots = Array(8).fill().map((dot, i) => {
        return {
            angle: i * 90,
            anchorX: 250,
            anchorY: i > 3 ? 260 : 140,
            rotateX: 100,
            rotateY: 30
        };
    });
}

function drawDot(dot) {
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(dot.x, dot.y, 3, 0, Math.PI * 2, true);
    context.fill();
    context.closePath();
}

function drawLine(dot1, dot2) {
    context.beginPath();
    context.strokeStyle = 'grey';
    context.moveTo(dot1.x, dot1.y);
    context.lineTo(dot2.x, dot2.y);
    context.stroke();
}

function calculateCoordinates(dot) {
    dot.x = dot.anchorX + dot.rotateX * Math.cos(dot.angle * Math.PI * 2 / 360);
    dot.y = dot.anchorY + dot.rotateY * Math.sin(dot.angle * Math.PI * 2 / 360);
}

function drawCube() {
    dots.forEach(dot => {
        calculateCoordinates(dot);
        drawDot(dot);
    })

    lines.forEach(([dot1, dot2]) => {
        drawLine(dots[dot1], dots[dot2]);
    })
}

function rotateCube() {
    dots.map(dot => dot.angle++);
}

const appCycle = () => {
    app.clearBoard();
    rotateCube();
    drawCube();
}

generateDots();
app.start(appCycle);