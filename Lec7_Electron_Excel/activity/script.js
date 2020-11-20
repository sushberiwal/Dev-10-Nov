const $ = require("jquery");


$(document).ready(function(){

    let db;

    $(".cell").on("click" , function(){
        console.log(this);
        let rowId = Number($(this).attr("rowid")) + 1;
        let colId = Number($(this).attr("colid")) ;
        let address = String.fromCharCode(65+colId) + rowId;  
        console.log(address);
        $("#address").val(address);
    })

    $(".cell").on("blur" , function(){
        let rowId = Number($(this).attr("rowid"));
        let colId = Number($(this).attr("colid"));
        let cellObject = db[rowId][colId];
        let value = $(this).html();
        cellObject.value = value;
        console.log(db);
    })




    function init(){
        db = [];
        for(let i=0 ; i<100 ; i++){
            let row = [];
            for(let j=0 ; j<26 ; j++){
                //i ==> j
                let name = String.fromCharCode(65+j) + (i+1);  
                let cellObject = {
                    name : name,
                    value : ""
                }
                row.push(cellObject);
            }
            db.push(row);
        }
        // db initialize
        console.log(db);
    }
    init();

})

