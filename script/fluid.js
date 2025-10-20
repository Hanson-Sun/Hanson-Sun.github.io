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
        }, 2000); // wait 2s for any readings

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


// Smoothly switch random gravity direction every few seconds
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
var amount = 180;

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

let avgFPS = 60;       
const smoothing = 0.05; 
let lastTime = performance.now();

function requestAnimFrame() {
    const now = performance.now();
    const delta = (now - lastTime) / 1000; // seconds
    lastTime = now;

    const fps = 1 / delta;

    // EMA update
    avgFPS += (fps - avgFPS) * smoothing;

    console.log(avgFPS.toFixed(2));

    // Use avgFPS for particle spawning
    if (avgFPS > 65 && particlelist.length < 400) {
        const p = Object.create(particle);
        p.x = Math.random() * canvas.width / 1.5;
        p.y = Math.random() * (canvas.height / 2);
        p.vx = 0;
        p.vy = 0;
        p.prevx = 0;
        p.prevy = 0;
        particlelist.push(p);
    } else if (particlelist.length > 180) {
        particlelist.pop();
    }
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

let SIM_BASE = 1080; // vertical simulation units
let SIM_HEIGHT = SIM_BASE;
let SIM_WIDTH = window.innerWidth / window.innerHeight * SIM_BASE;

function resizeCanvas() {
    SIM_WIDTH = window.innerWidth / window.innerHeight * SIM_BASE;

    canvas.width = SIM_WIDTH;
    canvas.height = SIM_HEIGHT;

    c.setTransform(1, 0, 0, 1, 0, 0);

    c.strokeStyle = "#366aa2ff";
}


window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const drag = 0.9999;

function animate() {
    requestAnimFrame();
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (p of particlelist) {
        p.vy += g[1] * timestep;
        p.vx += g[0] * timestep

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

        if (p.x >= canvas.width - radius) { p.x = canvas.width - radius; p.vx *= -0.9; }
        if (p.x <= radius) { p.x = radius; p.vx *= -0.9; }
        if (p.y >= canvas.height - radius) { p.y = canvas.height - radius; p.vy *= -0.9; }
        if (p.y <= radius) { p.y = radius; p.vy *= -0.9; }
    }

    render();

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);











// function callevent() {
//     if (mouseisdown) {
//         sign = Math.random() < 0.5 ? -1 : 1;
//         sign2 = Math.random() < 0.5 ? -1 : 1;
//         p = Object.create(particle);
//         p.x = endmouse.x;
//         p.y = endmouse.y;
//         p.vx = Math.random() * 1 * sign;
//         p.vy = Math.random() * 1 * sign2;
//         p.prevx = 0;
//         p.prevy = 0;
//         particlelist.push(p);
//         var i = setTimeout("callevent()", 1);
//     } else return;
// }

// canvas.addEventListener("mousedown", function (evt) {
//     var oldmousePos = getMousePos(canvas, evt);
//     startmouse.x = oldmousePos.x;
//     startmouse.y = oldmousePos.y;
//     mouseisdown = true;
//     callevent();
// }, false);

// canvas.addEventListener("mousemove", function (evt) {
//     var mousePos = getMousePos(canvas, evt);
//     endmouse.x = mousePos.x;
//     endmouse.y = mousePos.y;
// }, false);

// canvas.addEventListener("mouseup", function (evt) {
//     var newmousePos = getMousePos(canvas, evt);
//     endmouse.x = newmousePos.x;
//     endmouse.y = newmousePos.y;
//     mouseisdown = false;
// }, false);