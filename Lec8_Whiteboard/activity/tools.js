let pencil = document.querySelector("#pencil");
let eraser = document.querySelector("#eraser");


pencil.addEventListener("click", function () {  
  if (pencil.classList.contains("active-tool")) {
    // pencil ke options open
  } else {
    // pencil active nahi
    pencil.classList.add("active-tool");
    eraser.classList.remove("active-tool");
  }
});

eraser.addEventListener("click", function () {
  if (eraser.classList.contains("active-tool")) {
    // eraser ke options open
  } else {
    eraser.classList.add("active-tool");
    pencil.classList.remove("active-tool");
  }
});
