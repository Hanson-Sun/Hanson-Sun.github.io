var ctx = document.getElementById("test");
var c = ctx.getContext("2d");
ctx.width = document.body.clientWidth;
ctx.height = document.body.clientHeight;

var g = [0, 1];
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
                console.warn("No accelerometer data — using random gravity.");
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
        console.warn("Accelerometer not available:", e);
        startRandomGravity();
    }
}

tryAccelerometer();

function startRandomGravity() {
    let target = [0, 0.3];
    const scale = 0.5;
    setInterval(() => {
        target = [(Math.random() - 0.5) * scale, (Math.random() - 0.5) * scale];
    }, 5000);
    setInterval(() => {
        g[0] += (target[0] - g[0]) * 0.01;
        g[1] += (target[1] - g[1]) * 0.01;
    }, 30);
}

var canvas = document.getElementById('test'),
    c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = 0.98 * window.innerHeight;

var particlelist = [];

var timestep = 0.7;
var nearlimit = 65;
var h = 70;
var restdensity = 4;
var stiffness = 0.6;
var nearstiffness = 1.1;
var radius = 6;
var visca = 0.01;
var viscb = 0.01;
var amount = 200;

c.strokeStyle = "#366aa2ff";

var particle = { x: null, y: null, vx: null, vy: null, prevx: null, prevy: null };
var startmouse = { x: 0, y: 0 };
endmouse = { x: 0, y: 0 };
mouseisdown = false;
hold = false;
var currentcirc;

function getMousePos(c, evt) {
    var rect = c.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
}

var avgFPS = 60;
const smoothing = 0.05;
let lastTime = performance.now();

function requestAnimFrame() {
    const now = performance.now();
    const delta = (now - lastTime) / 1000;
    lastTime = now;
    const fps = 1 / delta;
    avgFPS += (fps - avgFPS) * smoothing;
}

for (let col = 0; col < amount; col++) {
    let p = Object.create(particle);
    p.x = Math.random() * canvas.width / 1.5;
    p.y = Math.random() * (canvas.height / 2);
    p.vx = 0;
    p.vy = 0;
    p.prevx = 0;
    p.prevy = 0;
    particlelist.push(p);
}

requestAnimFrame();

function doubledensityrelaxation() {
    for (let p of particlelist) {
        var density = 0;
        var neardensity = 0;
        for (let p2 of particlelist) {
            if (p2 != p) {
                var d = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;
                var dsqrt = Math.sqrt(d);
                if ((d < nearlimit ** 2) && (d > 1)) {
                    var q = dsqrt / h;
                    if (q < 1) {
                        density += (1 - q) ** 2;
                        neardensity += (1 - q) ** 3;
                    }
                }
            }
        }

        var Density = stiffness * (density - restdensity);
        var DensityNear = nearstiffness * neardensity;
        var dx = 0, dy = 0;

        for (let p2 of particlelist) {
            if (p2 != p) {
                d = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2;
                var dsqrt = Math.sqrt(d);
                if ((d < nearlimit ** 2) && (d > 1)) {
                    var q = dsqrt / h;
                    if (q < 1) {
                        var D = timestep * timestep * (Density * (1 - q) + DensityNear * (1 - q) ** 2);
                        var diffx = p2.x - p.x;
                        var diffy = p2.y - p.y;
                        p2.x += D * diffx / 2 / dsqrt;
                        p2.y += D * diffy / 2 / dsqrt;
                        dx -= D * diffx / 2 / dsqrt;
                        dy -= D * diffy / 2 / dsqrt;
                    }
                }
            }
        }

        p.x += dx;
        p.y += dy;
    }
}

function render() {
    c.beginPath();
    for (const p of particlelist) {
        c.moveTo(p.x + radius, p.y);
        c.arc(p.x, p.y, radius, 0, 2 * Math.PI);
    }
    c.stroke();
}

let SIM_BASE = 800;
let SIM_HEIGHT = SIM_BASE;
let SIM_WIDTH = window.visualViewport.width / window.visualViewport.height * SIM_BASE;

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    let height1 = Math.max(window.visualViewport.height, SIM_BASE);
    let width1 = window.visualViewport.width / window.visualViewport.height * height1;

    let width2 = Math.max(window.visualViewport.width, SIM_BASE);
    let height2 = window.visualViewport.height / window.visualViewport.width * width2;

    if (width1 * height1 > width2 * height2) {
        SIM_WIDTH = width1;
        SIM_HEIGHT = height1;
    } else {
        SIM_WIDTH = width2;
        SIM_HEIGHT = height2;
    }

    canvas.width = SIM_WIDTH;
    canvas.height = SIM_HEIGHT;

    c.setTransform(1, 0, 0, 1, 0, 0);
    c.strokeStyle = "#366aa2ff";
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const drag = 0.9999;

// Mouse gravity state
let mouseGravity = false;
let mousePos = { x: 0, y: 0 };

if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", evt => {
        const rect = canvas.getBoundingClientRect();
        mousePos.x = evt.clientX - rect.left;
        mousePos.y = evt.clientY - rect.top;
    });

    document.addEventListener("mousedown", () => { mouseGravity = true; });
    document.addEventListener("mouseup",   () => { mouseGravity = false; startRandomGravity(); });
}

function animate() {
    requestAnimFrame();
    c.clearRect(0, 0, canvas.width, canvas.height);

    for (p of particlelist) {
        if (mouseGravity) {
            const dx = mousePos.x - p.x;
            const dy = mousePos.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 30) {
                const strength = Math.min(1512 / (dist * dist), 2.0);
                p.vx += strength * dx / dist;
                p.vy += strength * dy / dist;
            }
        } else {
            p.vx += g[0] * timestep;
            p.vy += g[1] * timestep;
        }

        p.vy = Math.min(p.vy, 45);
        p.vx = Math.min(p.vx, 45);
    }

    for (p of particlelist) {
        p.prevx = p.x;
        p.prevy = p.y;
        p.x += p.vx * timestep;
        p.y += p.vy * timestep;
    }

    doubledensityrelaxation();

    for (p of particlelist) {
        p.vx = (p.x - p.prevx) / timestep;
        p.vy = (p.y - p.prevy) / timestep;
        p.x = p.prevx + p.vx * timestep * drag;
        p.y = p.prevy + p.vy * timestep * drag;

        if (p.x >= SIM_WIDTH - radius) { p.x = SIM_WIDTH - radius; p.vx *= -0.9; }
        if (p.x <= radius) { p.x = radius; p.vx *= -0.9; }
        if (p.y >= SIM_HEIGHT - radius) { p.y = SIM_HEIGHT - radius; p.vy *= -0.9; }
        if (p.y <= radius) { p.y = radius; p.vy *= -0.9; }
    }

    render();

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);

const TARGET_FPS = 60;
const LOW_FPS = 40;
const CONTROL_MS = 200;
const ROUTINE_MS = 10000;
const COOLDOWN_MS = 3000;
const MAX_PARTICLES = 400;
const MIN_PARTICLES = 150;

let routineActive = false;
let routineEnd = 0;
let lastTrigger = -Infinity;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const targetParticles = fps => {
    if (fps >= TARGET_FPS) return MAX_PARTICLES;
    const t = clamp((fps - 30) / (TARGET_FPS - 30), 0, 1);
    return Math.round(MIN_PARTICLES + t * (MAX_PARTICLES - MIN_PARTICLES));
};

function equalize(fps) {
    const target = targetParticles(fps);
    if (particlelist.length > target) {
        const n = Math.min(particlelist.length - target, 12);
        particlelist.splice(particlelist.length - n, n);
    } else {
        const toAdd = Math.min(target - particlelist.length, 12);
        for (let i = 0; i < toAdd && particlelist.length < MAX_PARTICLES; i++) {
            const p = Object.create(particle);
            p.x = Math.random() * (canvas.width / 1.5);
            p.y = Math.random() * (canvas.height / 1.5);
            p.vx = p.vy = p.prevx = p.prevy = 0;
            particlelist.push(p);
        }
    }
}

(function init() {
    const now = performance.now();
    routineActive = true;
    routineEnd = now + ROUTINE_MS;
    lastTrigger = now;
})();

setInterval(() => {
    const now = performance.now();
    if (routineActive) {
        equalize(avgFPS);
        if (now >= routineEnd) routineActive = false;
        return;
    }
    if (avgFPS < LOW_FPS && now - lastTrigger >= COOLDOWN_MS) {
        routineActive = true;
        routineEnd = now + ROUTINE_MS;
        lastTrigger = now;
    }
    if (particlelist.length > MAX_PARTICLES) particlelist.splice(MAX_PARTICLES);
}, CONTROL_MS);