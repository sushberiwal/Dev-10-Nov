// public , void , return type

// function body
function sayHi(name){
    console.log(name + " says Hiii !!");
    return 100;
}

// function call
// sayHi();
// let val = sayHi();
// console.log(val);
// let val = sayHi( "Steve" );
// console.log(val);

// ES6 => let and const


// fun();

// console.log(fun);


//callback functions

let fun = function(){
    console.log("Inside fun");
}


// hof => which accepts functions as a parameter
function hof(cb){
    console.log("Inside hof");
    cb();
    return 10;
}


// callback functions => functions which are sent in a function call
let val = hof(fun);
console.log(val);