// let formula = "( 10 + 20 )";


// let value = eval(formula);
// console.log(value);


// let address  = "B22"; 



// console.log(colId);
// console.log(rowId);


let childrens = ["A1" , "A2" , "B1" , "Z6"];

let me = "B1";

let newChildrens = childrens.filter( function(child){
    return child != me;
});

console.log(newChildrens);