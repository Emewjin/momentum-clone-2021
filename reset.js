const reset = document.querySelector(".reset");
const toDoDelete = document.querySelector(".todoDelete");


function resetAll(){
  localStorage.removeItem("currentUser");
  localStorage.removeItem("toDos");
  window.location.reload();
}

function deleteAllToDos(){
    localStorage.removeItem("toDos");
    window.location.reload();
}

function init(){
    reset.addEventListener("click", resetAll);
    toDoDelete.addEventListener("click", deleteAllToDos);
}

init();