let photo =  document.querySelector("#photo");
let imgUpload = document.querySelector("#photo-upload");


photo.addEventListener("click" , function(){
    imgUpload.click();
})

imgUpload.addEventListener("change" , function(e){
    let photo = e.target.files[0]; 
    let src = URL.createObjectURL(photo);
    let img = document.createElement("img");
    img.setAttribute("src" , src);
    let stickyContent = createSticky();
    stickyContent.append(img);
})