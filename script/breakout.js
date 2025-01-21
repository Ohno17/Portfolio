
const breakoutbutton = document.getElementById("breakoutbutton");
const brickcontainer = document.getElementById("projects");
const bcanvas = document.getElementById("bcanvas");
const ctx = bcanvas.getContext("2d");

let projectbricks;

var activated = false;
var cantoggle = true;

function toggleBreakout() {
    if (!cantoggle) return;

    if (activated) deactivateBreakout();
    else activateBreakout();

    cantoggle = false;
    breakoutbutton.className = "active";
    setTimeout(function () {
        cantoggle = true;
        breakoutbutton.className = "";
    }, 2000);
}

function activateBreakout() {
    activated = true;
    brickcontainer.className = "active";

    setFullBricks();
    ctx.clearRect(0, 0, bcanvas.width, bcanvas.height);

    setTimeout(function () {
        resetVariables();
        gameLoop();
    }, 2000);
}

function deactivateBreakout() {
    activated = false;
    brickcontainer.className = "";
}

function setFullBricks() {
    projectbricks = document.querySelectorAll(".brick");
    for (let i = 0; i < projectbricks.length; i++) {
        projectbricks[i].setAttribute("broken", false);
    }
}

// Breakout game

var brickcount;

var brickcontainerRect;
var brickRects;
resizeCanvas();
var mouseX = brickcontainerRect.left + (brickcontainerRect.width / 2);
var paddlePosition = mouseX - 50;

var ballX = brickcontainerRect.width / 2;
var ballY = bcanvas.height - 40;
var ballDx = 0;
var ballDy = -1;

var won = false;
var wonmessage = false;

function resetVariables() {
    resizeCanvas();

    won = false;
    wonmessage = false;
    mouseX = brickcontainerRect.width / 2;
    ballX = brickcontainerRect.width / 2;
    ballY = bcanvas.height - 40;
    ballDx = 3;
    ballDy = -3;
}

function resizeCanvas(event) {
    brickcontainerRect = brickcontainer.getBoundingClientRect();
    bcanvas.width = brickcontainerRect.width;
    bcanvas.height = brickcontainerRect.height;

    brickRects = [];
    bricks = document.querySelectorAll(".brick");
    brickcount = bricks.length;
    for (let i = 0; i < brickcount; i++) {
        brickRects.push(bricks[i].getBoundingClientRect());
    }
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", function (event) {
    mouseX = event.clientX - brickcontainerRect.left;
});

function rectCollision(a, b) {
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
}

function breakBrick(i) {
    projectbricks[i].setAttribute("broken", true);

    for (let b = 0; b < projectbricks.length; b++) {
        if (projectbricks[b].getAttribute("broken") == "false") return;
    }

    won = true;
}

function lerp(v1, v2, a) {
    return (1 - a) * v1 + a * v2;
}

function gameLoop() {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    ctx.clearRect(0, 0, bcanvas.width, bcanvas.height);

    paddlePosition = lerp(paddlePosition, mouseX - (bcanvas.width / 20), 0.2);

    // Draw paddle and ball
    ctx.fillRect(paddlePosition, bcanvas.height - 30, bcanvas.width / 10, 5);
    ctx.fillRect(ballX - 5, ballY - 5, 10, 10);

    // Check ball collision with bricks
    for (let i = 0; i < brickcount; i++) {
        if (projectbricks[i].getAttribute("broken") == "true") continue;

        if (rectCollision({
            x: brickRects[i].left - brickcontainerRect.left,
            y: brickRects[i].top - brickcontainerRect.top,
            width: brickRects[i].width,
            height: brickRects[i].height
        },
        {
            x: ballX - 5,
            y: ballY - 5,
            width: 10,
            height: 10
        })) {
            if (ballY > (brickRects[i].top - brickcontainerRect.top) + brickRects[i].height || ballY < brickRects[i].top - brickcontainerRect.top) {
                ballDy = -ballDy;
                breakBrick(i);
            }
            
            if (ballX > (brickRects[i].left - brickcontainerRect.left) + brickRects[i].width || ballX < brickRects[i].left - brickcontainerRect.left) {
                ballDx = -ballDx;
                breakBrick(i);
            }
        }
    }

    // Check ball collision with paddle
    if (rectCollision({
        x: paddlePosition,
        y: bcanvas.height - 30,
        width: bcanvas.width / 10,
        height: 5
    },
    {
        x: ballX - 5,
        y: ballY - 5,
        width: 10,
        height: 10
    })) {
        if (ballY > (bcanvas.height - 30) + 5 || ballY < bcanvas.height - 30) {
            ballDy = -ballDy;

            ballDx = (ballX - mouseX) / 8;
        }
        
        if (ballX > paddlePosition + bcanvas.width / 10 || ballX < paddlePosition) {
            ballDx = -ballDx;
        }
    }

    ballX += ballDx;
    ballY += ballDy;

    // If ball needs to bounce off walls
    if (ballY <= 5) {
        ballDy = -ballDy;
    }

    if (ballX <= 5) {
        ballDx = -ballDx;
    }

    if (ballX >= bcanvas.width - 5) {
        ballDx = -ballDx;
    }

    // If ball has left the screen downwards
    if (!won && ballY > bcanvas.height) {
        ctx.fillText("You Lose!", bcanvas.width / 2, bcanvas.height - 60);
        ballDx = 0;
        ballDy = 1;

        breakoutbutton.className = "active";
        cantoggle = false;
    } else if (won) {
        ctx.fillText("You Won!", bcanvas.width / 2, bcanvas.height - 60);
        if (!wonmessage) {
            ballY = bcanvas.height + 5;
            wonmessage = true;
        }
        ballDx = 0;
        ballDy = 1;
    }

    if (ballY > bcanvas.height + 120) {
        cantoggle = true;
        toggleBreakout();
    }

    if (!activated) return;
    requestAnimationFrame(gameLoop);
}
