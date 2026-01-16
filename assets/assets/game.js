const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let socket = new WebSocket("ws://YOUR_SERVER_IP:8080");
let players = {};
let me = { x: 150, y: 150 };

socket.onmessage = e => {
  players = JSON.parse(e.data);
};

document.addEventListener("touchmove", e => {
  me.x = e.touches[0].clientX;
  me.y = e.touches[0].clientY;
  socket.send(JSON.stringify(me));
});

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let id in players) {
    ctx.fillStyle = "red";
    ctx.fillRect(players[id].x, players[id].y, 30, 30);
  }
  requestAnimationFrame(draw);
}
draw();
