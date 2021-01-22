const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];
// 할일 목록을 array로 저장한다 (여러개가 모일 수 있도록). 해야할 일을 생성할 때 여기에 저장됨.

function deleteToDo(event) {
    const btn = event.target;
    // 이벤트가 발생한 버튼이 무엇인지 알게 함 (target)
    const li = btn.parentNode;
    //  위의 target이 구분이 안가지만 그 부모요소이자 우리가 지워야할 li는 id값을 가지고 있으므로, 이를 파악하게 함
    toDoList.removeChild(li);
    // 위에서 특정한 값을 리스트에서 삭제하게 함. 그러나 새로고침시 초기화됨.
    const cleanToDos = toDos.filter(function(toDo) {
    // filter는 각각의 아이템들에 대해 함수를 실행함. forEach처럼. 그리고 그 함수의 결과값이 true인 것들만 모아서 새로운 배열을 만든다.
    // toDoList.removechild(li)를 통해서 삭제 버튼을 누른 값은 li에서 삭제를 했기 때문에, 삭제한 아이템의 id는 li에 존재하지 않는다.
    // 따라서 이 함수에서는 li에 없는 id가 뭐가 있는지를 체크해야 한다. 
        return toDo.id !== parseInt(li.id);
    }); 
        // 모든 toDos가 li의 id와 같지 않을 때 (모든 li는 id가 있다) 주의)숫자인지, string인지 확인. 비교하는 두 값의 데이터타입이 같아야 함.
        // parseInt는 string을 숫자로 바꾼다.
        
    toDos=cleanToDos;
    // 이렇게 구한 cleanToDos(삭제된 li값을 제외한 li array)로 toDos를 업데이트 한다.
    // 업데이트되어야 하므로 toDos는 let이어야 한다.
    saveToDos();
    // 그리고 업데이트된 리스트를 로컬에 저장한다. 비로소 새로고침시에도 삭제한 투두가 보이지 않게 된다.
          
}


function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
// toDos array를 로컬에 저장
// 그런데 로컬 스토리지에는 오직 string만 저장할수있다. 그래서 toDos array의 값들을 모두 string으로 만들어야 함.
// 이를 위해 사용하는 것이 JSON.stringify이다. 자바스크립트의 객체를 string으로 바꿔준다.

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId= toDos.length + 1;
    // toDo array에 저장되는 값들. id를 toDos.length 라고 하면 array안의 값들의 개수를 나타냄.
    // length는 0부터 시작하기에 +1을 해서 일반적으로 생각하는 1,2,3 순이 되게 함
    
    delBtn.innerText="❌";
    delBtn.addEventListener("click", deleteToDo);
    // delbtn을 클릭하는 이벤트가 발생시 deletetodo 함수를 호출

    span.innerText=text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newId;
    // 투두 리스트에도 아이디값을 부여하여 나중에 버튼을 클릭했을때 어떤 리스트가 반응할지 알 수 있게 함
     
    toDoList.appendChild(li);

    const toDoObj={
        text: text,
        id: newId        
    };
    
    toDos.push(toDoObj);
    //  todo aray 안에 todoobj를 넣는다.
    
    saveToDos();
    //  함수호출(실행)
}


function handleSubmit (event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos(){
    const loadedToDos=localStorage.getItem(TODOS_LS);
    // 새로고침에도 화면에 투두리스트가 남아있도록 로컬에서 toDos를 불러오는 작업들. 문제는 불러온 것이 string이라는 것
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        // JSON을 사용하여 해결한다. JSON은 데이터를 전달시 자바스크립트가 그걸 다룰 수 있도록 객체로 바꿔주는 기능
        parsedToDos.forEach(function(toDo) {
        // array가 가진 forEach는 기본적으로 함수를 실행, 배열에 담겨있는 것들 각각에 한번씩 함수를 실행시킴
            paintToDo(toDo.text);
        });
        // paintToDo함수를 배열에 담긴 것들 각각에 한번씩 실행함. 구체적으로는 toDo의 text값에 대해서만.
        // 이를 통해 로컬에서 가져온 값을 화면에 출력함
    }
}


function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
