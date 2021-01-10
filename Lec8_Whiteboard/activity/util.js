function createSticky(){
    let sticky = document.createElement("div");
    sticky.classList.add("sticky");
    // <div class="sticky"></div>

    let stickyHeader = document.createElement("div");
    stickyHeader.classList.add("sticky-header");
    // <div class="sticky-header"></div>

    let minimize = document.createElement("div");
    minimize.classList.add("minimize");
    // <div class="minimize"></div>
    minimize.addEventListener("click" , function(){
        textArea.style.display = textArea.style.display == "none" ? "inline-block" : "none";
    })


    let close = document.createElement("div");
    close.classList.add("close");
    // <div class="close"></div>
    close.addEventListener("click" , function(){
        sticky.remove();
    })

    let stickyContent = document.createElement("div");
    stickyContent.classList.add("sticky-content");
    // <div class="sticky-content"></div>

    stickyHeader.append(minimize);
    stickyHeader.append(close);
    sticky.append(stickyHeader);
    sticky.append(stickyContent);
    document.body.append(sticky);

    // sticky move logic
    let initialX;
    let initialY;
    let isStickyHold = false;
    stickyHeader.addEventListener("mousedown" , function(e){
        initialX = e.clientX;
        initialY = e.clientY;
        // console.log(initialX , initialY);
        isStickyHold = true;
    })

    stickyHeader.addEventListener("mousemove" , function(e){
        if(isStickyHold){
            let finalX = e.clientX;
            let finalY = e.clientY;
            // console.log(finalX , finalY);
            let dx = finalX - initialX;
            let dy = finalY - initialY;
    
            let {top : stickyTop , left : stickyLeft} = sticky.getBoundingClientRect();
            sticky.style.top = stickyTop + dy+"px";
            sticky.style.left = stickyLeft + dx + "px";
            initialX = finalX;
            initialY = finalY;
        }
    })

    stickyHeader.addEventListener("mouseup" , function(e){
        isStickyHold  =false;
    })

    return stickyContent;
}