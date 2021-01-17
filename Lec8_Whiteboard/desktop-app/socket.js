socket.on("md" , function(lineObject){
    // save current settings of pen
    let currentStrokeStyle = ctx.strokeStyle;
    let currentPenWidth = ctx.lineWidth;

    // set pen color and width according tio lineobject
    ctx.strokeStyle = lineObject.color;
    ctx.lineWidth = lineObject.width;

    ctx.beginPath();
    ctx.moveTo(lineObject.x , lineObject.y);

    // again set pen settings to orginal settings
    ctx.strokeStyle = currentStrokeStyle;
    ctx.lineWidth = currentPenWidth;
})


socket.on("mm" , function(lineObject){
    let currentStrokeStyle = ctx.strokeStyle;
    let currentPenWidth = ctx.lineWidth;
    ctx.strokeStyle = lineObject.color;
    ctx.lineWidth = lineObject.width;

    ctx.lineTo(lineObject.x , lineObject.y);
    ctx.stroke();

    ctx.strokeStyle = currentStrokeStyle;
    ctx.lineWidth = currentPenWidth;

})