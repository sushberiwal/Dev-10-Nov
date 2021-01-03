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


// ctx.beginPath();
// ctx.moveTo(20,50);
// ctx.lineTo(100,150);
// ctx.stroke();


let isPenDown = false;

canvas.addEventListener("mousedown" , function(e){
    isPenDown = true;
    let x = e.clientX;
    let y = e.clientY-canvasTop;
    // console.log(x,y);
    ctx.beginPath();
    ctx.moveTo(x,y);
})

canvas.addEventListener("mousemove" , function(e){
    if(isPenDown==true){
        let x = e.clientX;
        let y = e.clientY-canvasTop;
        // console.log(x,y);
        ctx.lineTo(x,y);
        ctx.stroke();
    }
})


canvas.addEventListener("mouseup" , function(e){
    isPenDown = false;
})



