let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
// object destructuring
let { top: canvasTop } = canvas.getBoundingClientRect();

canvas.height = window.innerHeight - canvasTop;
canvas.width = window.innerWidth;
window.addEventListener("resize", function () {
  canvas.height = window.innerHeight - canvasTop;
  canvas.width = window.innerWidth;
  //draw tha pehle se wo wapas draw ho jae
});

let db = [];
let redoDb = [];

ctx.lineCap = "round";

// ctx.beginPath();
// ctx.moveTo(20,50);
// ctx.lineTo(100,150);
// ctx.stroke();

let line = [];
let isMouseDown = false;
canvas.addEventListener("mousedown", function (e) {
  isMouseDown = true;
  let x = e.clientX;
  let y = e.clientY - canvasTop;
  // console.log(x,y);
  ctx.beginPath();
  ctx.moveTo(x, y);
  let pointObj = {
    id: "md",
    x: x,
    y: y,
    width: ctx.lineWidth,
    color: ctx.strokeStyle,
  };
  line.push(pointObj);
});

canvas.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    let x = e.clientX;
    let y = e.clientY - canvasTop;
    // console.log(x,y);
    ctx.lineTo(x, y);
    ctx.stroke();
    let pointObj = {
      id: "mm",
      x: x,
      y: y,
      width: ctx.lineWidth,
      color: ctx.strokeStyle,
    };
    line.push(pointObj);
  }
});

canvas.addEventListener("mouseup", function (e) {
  isMouseDown = false;
  db.push(line);
  line = [];
  console.log(db);
});
