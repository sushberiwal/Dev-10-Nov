let imgUpload = document.querySelector("#photo-upload");

imgUpload.addEventListener("change" , function(e){
    let photo = e.target.files[0]; 
    let src = URL.createObjectURL(photo);
    let img = document.createElement("img");
    img.setAttribute("src" , src);
    document.body.append(img);
})