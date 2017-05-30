var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var mouse = {
        x: 0
        , y: 0
    } //make an object to hold mouse position
var scale = 1;
var img = new Image()
img.src = "http://magickcanoe.com/moths/io-moth-1-large.jpg";
setInterval(render, 100) // set the animation into motion
var isDown = false;
var startCoords = [];
var last = [0, 0];
var center = [canvas.width / 2, canvas.height / 2];
var lastDrag = [0, 0];
var currentDrag = [0, 0];
canvas.onmousedown = function (e) {
    isDown = true;
    startCoords = [
        e.offsetX - last[0]
        , e.offsetY - last[1]
   ];
    lastDrag = [e.offsetX, e.offsetY];
};
canvas.onmouseup = function (e) {
    isDown = false;
    last = [
        e.offsetX - startCoords[0], // set last coordinates
        e.offsetY - startCoords[1]
    ];
};
canvas.onmousemove = function (e) {
    if (!isDown) return;
    var x = e.offsetX;
    var y = e.offsetY;
    ctx.setTransform(1, 0, 0, 1, x - startCoords[0], y - startCoords[1]);
    render();
    currentDrag = [x, y];
    center[0] = center[0] + (lastDrag[0] - currentDrag[0]);
    center[1] = center[1] + (lastDrag[1] - currentDrag[1]);
    console.log(center, lastDrag, currentDrag);
    lastDrag = currentDrag;
}

function render() {
    ctx.beginPath();
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillRect(0, 0, canvas.width, canvas.height) //fill the background. color is default black
    ctx.restore();
    ctx.save();
    ctx.drawImage(img, 0, 0, img.width * scale, img.height * scale)
    ctx.restore()
    if (center[0] > img.width) {
        ctx.drawImage(img, img.width, 0, img.width * scale, img.height * scale)
        ctx.restore()
    }
}