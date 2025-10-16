var ctx = document.getElementById("test");
var c = ctx.getContext("2d");
ctx.width = document.body.clientWidth;
ctx.height = document.body.clientHeight;

var g = [0, 1];
if ('Accelerometer' in window && 'permissions' in navigator) {
    navigator.permissions.query({ name: 'accelerometer' }).then(result => {
        if (result.state === 'granted') {
            isAccelerometerActive = true;
            const acl = new Accelerometer({ frequency: 60 });
            acl.addEventListener('reading', () => {
                g = [-acl.x / 10, acl.y / 10];
            });
            acl.start();
        } else {
            startRandomGravity();
        }
    }).catch(() => startRandomGravity());
} else {
    startRandomGravity();
}

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
canvas.height = 0.95 * window.innerHeight;

var lastCalledTime;
var fps;
var prevfps = 100;
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
var amount = 167;

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

function callevent() {
    if (mouseisdown) {
        sign = Math.random() < 0.5 ? -1 : 1;
        sign2 = Math.random() < 0.5 ? -1 : 1;
        p = Object.create(particle);
        p.x = endmouse.x;
        p.y = endmouse.y;
        p.vx = Math.random() * 1 * sign;
        p.vy = Math.random() * 1 * sign2;
        p.prevx = 0;
        p.prevy = 0;
        particlelist.push(p);
        var i = setTimeout("callevent()", 1);
    } else return;
}

canvas.addEventListener("mousedown", function (evt) {
    var oldmousePos = getMousePos(canvas, evt);
    startmouse.x = oldmousePos.x;
    startmouse.y = oldmousePos.y;
    mouseisdown = true;
    callevent();
}, false);

canvas.addEventListener("mousemove", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    endmouse.x = mousePos.x;
    endmouse.y = mousePos.y;
}, false);

canvas.addEventListener("mouseup", function (evt) {
    var newmousePos = getMousePos(canvas, evt);
    endmouse.x = newmousePos.x;
    endmouse.y = newmousePos.y;
    mouseisdown = false;
}, false);

function requestAnimFrame() {
    if (!lastCalledTime) {
        lastCalledTime = Date.now();
        fps = 0;
        return;
    }
    let delta = (Date.now() - lastCalledTime) / 1000;
    lastCalledTime = Date.now();
    fps = 1 / delta;

    // console.log(fps);

    if (fps > 65 && particlelist.length < 400) {
        let p = Object.create(particle);
        p.x = Math.random() * canvas.width / 1.5;
        p.y = Math.random() * (canvas.height / 2);
        p.vx = 0;
        p.vy = 0;
        p.prevx = 0;
        p.prevy = 0;
        particlelist.push(p);
    } else if (particlelist.length > 150) {
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

const drag = 0.9999;

function animate() {
    requestAnimFrame();
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (p of particlelist) {
        p.vy += g[1] * timestep;
        p.vx += g[0] * timestep

        p.vy = Math.min(p.vy, 50);
        p.vx = Math.min(p.vx, 50);
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

        c.beginPath();
        c.arc(p.x, p.y, radius, 0, 2 * Math.PI);
        c.stroke();
    }

    window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);