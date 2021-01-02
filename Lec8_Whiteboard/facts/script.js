// javascript
let addBtn = document.querySelector(".add");
let todos = document.querySelector(".todos");
let todoInput = document.querySelector("#todo");

// get input element from dom
// jquery 
// let addBtn = $('.add');
// $(".add").on("click" , function(){
// })

addBtn.addEventListener("click" , function(){
    let todo = todoInput.value;
    if(todo){
        let newTodo = document.createElement("li");
        // <li></li>
        let pTag = document.createElement("p");
        pTag.innerHTML = todo;
        // <p>Learn HTML</p>

        let close = document.createElement("button");
        close.innerHTML = "X";

        close.addEventListener("click" , function(){
            close.parentElement.remove();
        })

        // <button>X</button>
        newTodo.append(pTag);
        newTodo.append(close);
        // <li>
            //  <p>Learn HTML</p>
            //  <button>X</button>
        //  </li>
        todos.append(newTodo);
        todoInput.value = "";
    }
})







