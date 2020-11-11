// top to down 
// left to right

// cout<<
// System.out.println();

console.log("Hello world !!");

// datatypes => int , float , boolean , double

// datatypes=> Number , boolean , undefined , null , object , String

// variables declaration

// ES6 Syntax => let , const

// let keyword => block scoped variable and 

let a = 10;
console.log(a);

let b = "hey i am string";
let c = 'hey i am also a string';
let d = true;
let e = false;
let f = 124.576;
let g; // by default value taken by variable is undefined
// console.log(b , c ,d ,e , f , g);
let h = "i am outside if block";
h = "i am new value"; // this is possible

// == will only check value // === == check value and datatype also

// console.log();


// Global object
// i ="akjsdfa";


if(true){
    // let h = "i am inside if block !!";
    if(true){
        console.log(h);
    }
}




// const => block scoped
// constant => 

const pi = 3.14;

// this is not allowed ? 
// pi = 10;



// objects => key values pair
// keys always unique and values need not to be
let obj = {
    "name":"Steve Rogers",
    "age" : 12,
    "place" : "Queens",
    "Nick Name" : "Captain America"
};

obj.movies = "captain america";

// dot notation => literal
console.log(obj.name);
console.log(obj.age);

let key = "place";

console.log(obj.key);

// bracket notation
console.log(obj[key]);
console.log(obj["Nick Name"]);


// arrays -> 1D , 2D

let values = [  true , false , 123213 , {
    "name":"Steve Rogers",
    "age" : 12,
    "place" : "Queens",
    "Nick Name" : "Captain America"
} , [ 1 , 2 , 3 , 5 , false , "hey i am string"] , 1 , 2 , 6 , 9  ];

console.log(values[4]);

// push pop

values.push("hey i am pushed");
console.log(values);

let poppedValue = values.pop();
console.log(values);




