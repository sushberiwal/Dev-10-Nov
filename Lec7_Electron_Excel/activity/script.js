const $ = require("jquery");

const dialog = require("electron").remote.dialog;
const fs = require("fs");

$(document).ready(function () {
  let sheetsDb = [];

  let db; // current db
  let lsc; // last selected cell

  // sheets add
  $(".sheets-add").on("click", function () {
    // remove active sheet
    $(".sheet.active-sheet").removeClass("active-sheet");
    // make a new sheet
    let sheet = `<div class="sheet active-sheet" sid=${sheetsDb.length}>Sheet ${
      sheetsDb.length + 1
    }</div>`;
    // append div to sheets content !!
    $(".sheets-content").append(sheet);

    $(".active-sheet").on("click", function () {
      if (!$(this).hasClass("active-sheet")) {
        let sheetId = $(this).attr("sid");
        $(".sheet.active-sheet").removeClass("active-sheet");
        $(this).addClass("active-sheet");
        db = sheetsDb[sheetId];
        // ui set
        for (let i = 0; i < 100; i++) {
          for (let j = 0; j < 26; j++) {
            let cellObject = db[i][j];
            $(`.cell[rowid=${i}][colid=${j}]`).html(cellObject.value);
          }
        }
      }
    });

    init(); // db new and push in sheetsDb;

    // ui new
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 26; j++) {
        $(`.cell[rowid=${i}][colid=${j}]`).html("");
      }
    }
  });

  $(".sheet").on("click", function () {
    if (!$(this).hasClass("active-sheet")) {
      let sheetId = $(this).attr("sid");
      $(".sheet.active-sheet").removeClass("active-sheet");
      $(this).addClass("active-sheet");
      db = sheetsDb[sheetId];
      // ui set
      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 26; j++) {
          let cellObject = db[i][j];
          $(`.cell[rowid=${i}][colid=${j}]`).html(cellObject.value);
        }
      }
    }
  });



  //bold // underline // italic
  $(".font-styling button").on("click" , function(){
    let id = $(this).attr("id");
    let rowId = $(lsc).attr("rowid");
    let colId = $(lsc).attr("colid");
    let cellObject = db[rowId][colId];
    if(id == "bold"){
      $(lsc).css("font-weight" , cellObject.fontStyle.bold ? "normal" : "bold");
      cellObject.fontStyle.bold = !cellObject.fontStyle.bold;
    }
    else if(id=="underline"){
      $(lsc).css("text-decoration" , cellObject.fontStyle.underline ? "none" : "underline");
      cellObject.fontStyle.underline = !cellObject.fontStyle.underline;
    }
    else{
      $(lsc).css("font-style" , cellObject.fontStyle.italic ? "normal" : "italic");
      cellObject.fontStyle.italic = !cellObject.fontStyle.italic;
    }
  })



  // text -align
  $(".menu3 button").on("click" , function(){
    let id = $(this).attr("id");
    $(lsc).css("text-align" , id);
    let rowId = $(lsc).attr("rowid");
    let colId = $(lsc).attr("colid");
    let cellObject = db[rowId][colId];
    cellObject.textAlign = id;
  })

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


  // font-size
  $("#font-size").on("change" , function(){
    let fontSize = $(this).val();
    $(lsc).css("font-size" , fontSize+"px");
    let rowId = $(lsc).attr("rowid");
    let colId = $(lsc).attr("colid");
    let cellObject = db[rowId][colId];
    cellObject.fontSize = fontSize+"px";
  })

  $(".file").on("click", function () {
    $(this).addClass("active-menu");
    $(".home").removeClass("active-menu");
    // filemenuOptions se hide remove
    $(".file-menu-options").removeClass("hide");
    // hide lag jae home-menu-options
    $(".home-menu-options").addClass("hide");
  });

  $(".home").on("click", function () {
    $(this).addClass("active-menu");
    $(".file").removeClass("active-menu");
    // filemenuOptions pe hide
    $(".file-menu-options").addClass("hide");
    // hide remove  home-menu-options
    $(".home-menu-options").removeClass("hide");
  });

  // new file
  $(".new").on("click", function () {
    db = [];
    $("#address").val('');
    $("#formula").val('');
    for (let i = 0; i < 100; i++) {
      let row = [];
      for (let j = 0; j < 26; j++) {
        $(`.cell[rowid=${i}][colid=${j}]`).html("");
        let name = String.fromCharCode(65 + j) + (i + 1);
        let cellObject = {
          name: name,
          value: "",
          formula: "",
          childrens: [],
          parents: [],
        };
        row.push(cellObject);
      }
      db.push(row);
    }
  });

  // open file
  $(".open").on("click", function () {
    let files = dialog.showOpenDialogSync();
    let data = fs.readFileSync(files[0]);
    db = JSON.parse(data);
    // database updated
    // ui ???
    let count = 0;
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 26; j++) {
        let cellObject = db[i][j];
        console.log(count);
        count++;
        $(`.cell[rowid=${i}][colid=${j}]`).text(cellObject.value);
      }
    }
  });

  // save file
  $(".save").on("click", function () {
    let filePath = dialog.showSaveDialogSync();
    if (filePath) {
      fs.writeFileSync(filePath, JSON.stringify(db));
      alert("FILE SAVED SUCCESFULLY !!!");
    } else {
      alert("FILE NOT SAVED");
    }
  });

  $(".cell").on("keypress , keydown", function () {
    console.log("key pressed !!!");
    let cellId = $(this).attr("rowid");
    let newHeight = $(this).height();
    $(`.left-col-cell[cellid=${cellId}]`).height(newHeight);
  });

  // scrolling
  $(".content").on("scroll", function () {
    let topOffSet = $(this).scrollTop();
    let leftOffSet = $(this).scrollLeft();

    $(".top-left-col").css("top", topOffSet + "px");
    $(".top-left-col").css("left", leftOffSet + "px");

    $(".top-row").css("top", topOffSet + "px");
    $(".left-col").css("left", leftOffSet + "px");
  });

  $(".cell").on("keypress", function () {
    console.log("key pressed !!");
  });

  $(".cell").on("blur", function () {
    lsc = this;
    let rowId = Number($(this).attr("rowid"));
    let colId = Number($(this).attr("colid"));
    let cellObject = db[rowId][colId];
    let value = $(this).html();
    if (value != cellObject.value) {
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
          parents: [],
          fontStyle : { bold : false , underline : false , italic : false },
          textAlign : "left",
          fontSize : "16px",
          color : {cellColor : "white" , fontColor:"black"}
        };
        row.push(cellObject);
      }
      db.push(row);
    }
    // db initialize
    sheetsDb.push(db);
    // console.log(db);
    console.log(sheetsDb);
  }
  init();
});
