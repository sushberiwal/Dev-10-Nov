let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');

// object destructuring
let { top : canvasTop } = canvas.getBoundingClientRect();

canvas.height = window.innerHeight-canvasTop;
canvas.width = window.innerWidth;
window.addEventListener("resize" , function(){
    canvas.height = window.innerHeight-canvasTop;
    canvas.width = window.innerWidth;
    //draw tha pehle se wo wapas draw ho jae
})




ctx.beginPath();
ctx.moveTo(20,50);
ctx.lineTo(100,150);
ctx.stroke();


