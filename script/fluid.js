const canvas = document.getElementById('test');
const c = canvas.getContext('2d');

let g = [0, 0.03];

function tryAccelerometer() {
    if (!('Accelerometer' in window)) {
        startRandomGravity();
        return;
    }

    let acl;
    let didRead = false;
    try {
        acl = new Accelerometer({ frequency: 60 });
        const timeout = setTimeout(() => {
            if (!didRead) {
                acl.stop();
                startRandomGravity();
            }
        }, 2000);

        acl.addEventListener('reading', () => {
            didRead = true;
            clearTimeout(timeout);
            g = [-acl.x / 10, acl.y / 10];
        });
        acl.start();
    } catch (e) {
        startRandomGravity();
    }
}

tryAccelerometer();

function startRandomGravity() {
    let target = [0, 0.03];
    const scale = 0.05;
    setInterval(() => {
        target = [(Math.random() - 0.5) * scale, (Math.random() - 0.5) * scale];
    }, 10000);
    setInterval(() => {
        g[0] += (target[0] - g[0]) * 0.01;
        g[1] += (target[1] - g[1]) * 0.01;
    }, 30);
}

const timestep = 0.7;
const nearlimit = 65;
const h = 70;
const restdensity = 4;
const stiffness = 0.6;
const nearstiffness = 1.1;
const radius = 6;
const amount = 200;

const nearlimitSq = nearlimit * nearlimit;
const invH = 1 / h;
const tsSq = timestep * timestep;
const invCell = 1 / nearlimit;
const PI2 = 2 * Math.PI;

const MAX_PARTICLES = 888;
const MIN_PARTICLES = 128;
const TARGET_FPS = 60;
const LOW_FPS = 55;
const CONTROL_MS = 200;
const ROUTINE_MS = 10000;
const COOLDOWN_MS = 3000;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.prevx = x;
        this.prevy = y;
    }
}

const particlelist = [];
let next = new Int32Array(MAX_PARTICLES);
let head = new Int32Array(0);
let gridCols = 0;
let gridRows = 0;

function setStrokeStyle() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    c.strokeStyle = isDark ? "#5592d3" : "#68b1ff";
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", setStrokeStyle);

let avgFPS = 60;
const smoothing = 0.05;
let lastTime = performance.now();

function requestAnimFrame() {
    const now = performance.now();
    const delta = (now - lastTime) / 1000;
    lastTime = now;
    if (delta > 0) {
        avgFPS += ((1 / delta) - avgFPS) * smoothing;
    }
}

for (let col = 0; col < amount; col++) {
    particlelist.push(new Particle(Math.random() * window.innerWidth / 1.5, Math.random() * (window.innerHeight / 2)));
}

function doubledensityrelaxation() {
    const len = particlelist.length;
    head.fill(-1);

    for (let i = 0; i < len; i++) {
        const p = particlelist[i];
        const cx = Math.max(0, Math.min(gridCols - 1, (p.x * invCell) | 0));
        const cy = Math.max(0, Math.min(gridRows - 1, (p.y * invCell) | 0));
        const cell = cx + cy * gridCols;
        next[i] = head[cell];
        head[cell] = i;
    }

    for (let i = 0; i < len; i++) {
        const p = particlelist[i];
        let density = 0;
        let neardensity = 0;

        const cx = Math.max(0, Math.min(gridCols - 1, (p.x * invCell) | 0));
        const cy = Math.max(0, Math.min(gridRows - 1, (p.y * invCell) | 0));
        
        const minX = Math.max(0, cx - 1);
        const maxX = Math.min(gridCols - 1, cx + 1);
        const minY = Math.max(0, cy - 1);
        const maxY = Math.min(gridRows - 1, cy + 1);

        for (let y = minY; y <= maxY; y++) {
            const row = y * gridCols;
            for (let x = minX; x <= maxX; x++) {
                let j = head[x + row];
                while (j !== -1) {
                    if (i !== j) {
                        const p2 = particlelist[j];
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const d = dx * dx + dy * dy;
                        if (d > 1 && d < nearlimitSq) {
                            const q1 = 1 - (Math.sqrt(d) * invH);
                            if (q1 > 0) {
                                density += q1 * q1;
                                neardensity += q1 * q1 * q1;
                            }
                        }
                    }
                    j = next[j];
                }
            }
        }

        const pressure = stiffness * (density - restdensity);
        const nearPressure = nearstiffness * neardensity;
        let p_dx = 0;
        let p_dy = 0;

        for (let y = minY; y <= maxY; y++) {
            const row = y * gridCols;
            for (let x = minX; x <= maxX; x++) {
                let j = head[x + row];
                while (j !== -1) {
                    if (i !== j) {
                        const p2 = particlelist[j];
                        const dx = p2.x - p.x;
                        const dy = p2.y - p.y;
                        const d = dx * dx + dy * dy;
                        if (d > 1 && d < nearlimitSq) {
                            const dsqrt = Math.sqrt(d);
                            const q1 = 1 - (dsqrt * invH);
                            if (q1 > 0) {
                                const D = tsSq * (pressure * q1 + nearPressure * q1 * q1);
                                const dispX = (D * dx) / (2 * dsqrt);
                                const dispY = (D * dy) / (2 * dsqrt);
                                p2.x += dispX;
                                p2.y += dispY;
                                p_dx -= dispX;
                                p_dy -= dispY;
                            }
                        }
                    }
                    j = next[j];
                }
            }
        }
        p.x += p_dx;
        p.y += p_dy;
    }
}

function render() {
    c.beginPath();
    const len = particlelist.length;
    for (let i = 0; i < len; i++) {
        const p = particlelist[i];
        c.moveTo(p.x + radius, p.y);
        c.arc(p.x, p.y, radius, 0, PI2);
    }
    c.stroke();
}

let SIM_WIDTH, SIM_HEIGHT;
function resizeCanvas() {
    SIM_WIDTH = window.innerWidth;
    SIM_HEIGHT = window.innerHeight * 0.98;
    canvas.width = SIM_WIDTH;
    canvas.height = SIM_HEIGHT;
    setStrokeStyle();
    gridCols = Math.ceil(SIM_WIDTH * invCell);
    gridRows = Math.ceil(SIM_HEIGHT * invCell);
    head = new Int32Array(gridCols * gridRows);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const drag = 0.9999;
let mouseGravity = false;
let mouseAttract = false;
let mousePos = { x: 0, y: 0 };

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", evt => {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = evt.clientX - rect.left;
        mousePos.y = evt.clientY - rect.top;
        mouseGravity = true;
    });

    document.addEventListener("click", () => { mouseAttract = !mouseAttract; });
}


function animate() {
    requestAnimFrame();
    c.clearRect(0, 0, canvas.width, canvas.height);

    const len = particlelist.length;
    const mX = mousePos.x;
    const mY = mousePos.y;

    for (let i = 0; i < len; i++) {
        const p = particlelist[i];
        const dx = mousePos.x - p.x, dy = mousePos.y - p.y;
        const dSq = dx * dx + dy * dy;
        
        if (dSq > 10) {
            const d = Math.sqrt(dSq);
            const f = (mouseAttract ? 1 : -1) * Math.min(1024 / dSq, 2.0);
            p.vx += dx / d * f * timestep;
            p.vy += dy / d * f * timestep;
        }

        p.vx += g[0] * timestep; p.vy += g[1] * timestep;
        p.vx = Math.max(-45, Math.min(p.vx, 45));
        p.vy = Math.max(-45, Math.min(p.vy, 45));

        p.prevx = p.x; p.prevy = p.y;
        p.x += p.vx * timestep; p.y += p.vy * timestep;
    }

    doubledensityrelaxation();

    for (let i = 0; i < len; i++) {
        const p = particlelist[i];
        p.vx = (p.x - p.prevx) / timestep;
        p.vy = (p.y - p.prevy) / timestep;
        p.x = p.prevx + p.vx * timestep * drag;
        p.y = p.prevy + p.vy * timestep * drag;

        if (p.x >= SIM_WIDTH - radius) { p.x = SIM_WIDTH - radius; p.vx *= -0.5; }
        else if (p.x <= radius) { p.x = radius; p.vx *= -0.5; }
        if (p.y >= SIM_HEIGHT - radius) { p.y = SIM_HEIGHT - radius; p.vy *= -0.5; }
        else if (p.y <= radius) { p.y = radius; p.vy *= -0.5; }
    }

    render();
    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

setInterval(() => {
    const target = targetParticles(avgFPS);
    if (particlelist.length > target) {
        particlelist.splice(target);
    } else if (particlelist.length < target) {
        const toAdd = Math.min(target - particlelist.length, 10);
        for (let i = 0; i < toAdd; i++) {
            particlelist.push(new Particle(Math.random() * SIM_WIDTH, Math.random() * (SIM_HEIGHT / 2)));
        }
    }
}, CONTROL_MS);

function targetParticles(fps) {
    if (fps >= TARGET_FPS) return MAX_PARTICLES;
    const t = Math.max(0, Math.min(1, (fps - 30) / (TARGET_FPS - 30)));
    return Math.round(MIN_PARTICLES + t * (MAX_PARTICLES - MIN_PARTICLES));
}