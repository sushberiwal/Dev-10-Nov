const $ = require("jquery");

$(document).ready(function () {
  let db;
  let lsc; // last selected cell

  $(".cell").on("click", function () {
    console.log(this);
    let rowId = Number($(this).attr("rowid"));
    let colId = Number($(this).attr("colid"));
    let cellObject = db[rowId][colId];
    let formula = cellObject.formula;
    let address = String.fromCharCode(65 + colId) + (rowId + 1);
    $("#formula").val(formula);
    $("#address").val(address);
  });



  $(".cell").on("keypress , keydown" , function(){
    console.log("key pressed !!!");
    let cellId = $(this).attr("rowid");
    let newHeight = $(this).height();
    $(`.left-col-cell[cellid=${cellId}]`).height(newHeight);
  })


  // scrolling
  $(".content").on("scroll" , function(){
    let topOffSet = $(this).scrollTop();
    let leftOffSet =  $(this).scrollLeft();

    $(".top-left-col").css("top" , topOffSet+"px");
    $(".top-left-col").css("left" , leftOffSet+"px");

    $(".top-row").css("top" , topOffSet+"px");
    $(".left-col").css("left"  ,leftOffSet+"px");
  })


  $(".cell").on("keypress" , function(){
      console.log("key pressed !!");
  })

  $(".cell").on("blur", function () {
    lsc = this;
    let rowId = Number($(this).attr("rowid"));
    let colId = Number($(this).attr("colid"));
    let cellObject = db[rowId][colId];
    let value = $(this).html();
    if( value != cellObject.value ) {
      cellObject.value = value;
      if (cellObject.formula) {
        removeFormula(cellObject);
      }
      updateChildrens(cellObject);
    }

    console.log(db);
  });

  function removeFormula(cellObject) {
    for (let i = 0; i < cellObject.parents.length; i++) {
      let parentName = cellObject.parents[i];
      let { rowId, colId } = getRowIdColIdFromAddress(parentName);
      let parentCellObject = db[rowId][colId];
      let newChildrens = parentCellObject.childrens.filter(function (child) {
        return child != cellObject.name;
      });
      parentCellObject.childrens = newChildrens;
    }
    cellObject.parents = [];
    cellObject.formula = "";
  }

  function updateChildrens(cellObject) {
    // {
    //     name:"A1",
    //     value:"100",
    //     formula:"",
    //     childrens:["B1"]
    // }
    for (let i = 0; i < cellObject.childrens.length; i++) {
      let childrenName = cellObject.childrens[i]; // B1
      let { rowId, colId } = getRowIdColIdFromAddress(childrenName); // rowId , colId of B1
      let childrenCellObject = db[rowId][colId]; // cellobject of B1
      let updatedValue = solveFormula(childrenCellObject.formula); // get update value of B1
      childrenCellObject.value = updatedValue + ""; // update db of B1
      //.cell[rowid="0"][colid="1"]
      $(`.cell[rowid=${rowId}][colid=${colId}]`).html(updatedValue); // update ui of B1
      updateChildrens(childrenCellObject);
    }
  }

  $("#formula").on("click", function () {
    let rowId = Number($(lsc).attr("rowid"));
    let colId = Number($(lsc).attr("colid"));
    let cellObject = db[rowId][colId];
  });

  $("#formula").on("blur", function () {
    let formula = $(this).val(); // ( A1 + A2 )
    let rowId = Number($(lsc).attr("rowid"));
    let colId = Number($(lsc).attr("colid"));
    let cellObject = db[rowId][colId];
    if (cellObject.formula != formula) {
      console.log("Inside solve");
      removeFormula(cellObject); // case 4 ke lie
      cellObject.formula = formula; // niche tk case 2
      let value = solveFormula(formula, cellObject);
      //db updated
      cellObject.value = value + "";
      // ui update
      $(lsc).html(value);
      updateChildrens(cellObject);
    }
  });

  function solveFormula(formula, selfCellObject) {
    // formula = "( A1 + A2 )";
    let fComponents = formula.split(" ");
    // ["(" , "A1" , "+" , "A2" , ")"  ];
    for (let i = 0; i < fComponents.length; i++) {
      let fComp = fComponents[i];
      if (fComp[0] >= "A" && fComp[0] <= "Z") {
        // A1 => rowId , colId
        let { rowId, colId } = getRowIdColIdFromAddress(fComp);
        let cellObject = db[rowId][colId];
        // add self to childrens of A1 and A2
        if (selfCellObject) {
          addSelfToChildrensOfParent(cellObject, selfCellObject);
          addParentsToSelfObject(cellObject, selfCellObject);
        }
        let value = cellObject.value;
        formula = formula.replace(fComp, value);
      }
    }
    // formula = ( 10 + 20 ); => stack infix
    let value = eval(formula);
    return value;
  }

  function addSelfToChildrensOfParent(cellObject, selfCellObject) {
    cellObject.childrens.push(selfCellObject.name);
  }

  function addParentsToSelfObject(cellObject, selfCellObject) {
    selfCellObject.parents.push(cellObject.name);
  }

  function getRowIdColIdFromAddress(address) {
    // address => "B2"
    let colId = address.charCodeAt(0) - 65;
    let rowId = Number(address.substring(1)) - 1;
    return {
      rowId: rowId,
      colId: colId,
    };
  }

  function init() {
    db = [];
    for (let i = 0; i < 100; i++) {
      let row = [];
      for (let j = 0; j < 26; j++) {
        //i ==> j
        let name = String.fromCharCode(65 + j) + (i + 1);
        let cellObject = {
          name: name,
          value: "",
          formula: "",
          childrens: [],
          parents: []
        };
        row.push(cellObject);
      }
      db.push(row);
    }
    // db initialize
    console.log(db);
  }
  init();
});
