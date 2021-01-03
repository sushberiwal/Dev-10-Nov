let pencil = document.querySelector("#pencil");
let pencilOptions = document.querySelector("#pencil-options");
let eraser = document.querySelector("#eraser");
let eraserOptions = document.querySelector("#eraser-options");

let red = document.querySelector(".red");
let blue = document.querySelector(".blue");
let yellow = document.querySelector(".yellow");
let black = document.querySelector(".black");

let pencilSize = document.querySelector('#pencil-size');
let eraserSize = document.querySelector('#eraser-size');


let lastPencilSize = 1;
let lastEraserSize = 1;



pencilSize.addEventListener("change" , function(){
    lastPencilSize = pencilSize.value;
    ctx.lineWidth = lastPencilSize;
})

eraserSize.addEventListener("change" , function(){
    lastEraserSize = eraserSize.value;
    ctx.lineWidth = lastEraserSize;
})



red.addEventListener("click" , function(){
    ctx.strokeStyle = "red";
})
blue.addEventListener("click" , function(){
    ctx.strokeStyle = "blue";
})
yellow.addEventListener("click" , function(){
    ctx.strokeStyle = "yellow";
})
black.addEventListener("click" , function(){
    ctx.strokeStyle = "black";
})





pencil.addEventListener("click", function () {
  if (pencil.classList.contains("active-tool")) {
    // pencil ke options open
    if (pencilOptions.classList.contains("hide")) {
      pencilOptions.classList.remove("hide");
    } else {
      pencilOptions.classList.add("hide");
    }
  } else {
      ctx.strokeStyle = "black";
      ctx.lineWidth = lastPencilSize;
    // pencil active nahi
    if (!eraserOptions.classList.contains("hide")) {
      eraserOptions.classList.add("hide");
    }
    pencil.classList.add("active-tool");
    eraser.classList.remove("active-tool");
  }
});

eraser.addEventListener("click", function () {
  if (eraser.classList.contains("active-tool")) {
    // eraser ke options open
    if (eraserOptions.classList.contains("hide")) {
      eraserOptions.classList.remove("hide");
    } else {
      eraserOptions.classList.add("hide");
    }
  } else {
    ctx.strokeStyle = "white";
    ctx.lineWidth = lastEraserSize;
    if (!pencilOptions.classList.contains("hide")) {
      pencilOptions.classList.add("hide");
    }
    eraser.classList.add("active-tool");
    pencil.classList.remove("active-tool");
  }
});
