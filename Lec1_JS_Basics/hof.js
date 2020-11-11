// callback function

function getFirstName(fullName){
    // "STEVE ROGERS"
    fullName = fullName.split(" ");
    // [ "STEVE" , "ROGERS" ];
    return fullName[0];
}


function getLastName(fullName){
    fullName = fullName.split(" ");
    return fullName[1];
}


// hof
function fun( fullName , fn  ){
    let name = fn(fullName);
    console.log(name);
}



fun("Steve Rogers" , getFirstName);
fun("Tony Stark" , getLastName);