let photo =  document.querySelector("#photo");
let imgUpload = document.querySelector("#photo-upload");
let download = document.querySelector("#download");

photo.addEventListener("click" , function(){
    imgUpload.click();
})

imgUpload.addEventListener("change" , function(e){
    let photo = e.target.files[0];
    console.log(photo); 
    let src = URL.createObjectURL(photo);
    // console.log(src);
    let img = document.createElement("img");
    // <img src="" />
    img.setAttribute("src" , src);
    let stickyContent = createSticky();
    stickyContent.append(img);
})


download.addEventListener("click" , function(){
    
    let image = canvas.toDataURL("image/png");
    let aTag = document.createElement("a");
    aTag.download = "canvas.png";
    aTag.href = image;
    aTag.click();

    // <a download="canvas.png" href="akjsfajkbsfiahkjsbgab"/>
})