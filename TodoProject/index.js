//* Selctors
const inputTodo = document.querySelector('.todo-input');
const btninputTodo = document.querySelector('.todo-button');
const containerTodo = document.querySelector('.todo-container');
const listTodo = document.querySelector('.todo-list');
const filterToDo = document.querySelector('.filter-todo');
const enterValues = document.querySelector('.enterValues');

//* Event listeners
btninputTodo.addEventListener('click', addITem);
listTodo.addEventListener('click', deleteOrCheck);
filterToDo.addEventListener('click', filterToDos)
enterValues.addEventListener('click', enterNewValues);

//* Functions

function addITem(event) {
    console.log(event);
    event.preventDefault()
    const creatDiv = document.createElement('div');
    creatDiv.classList.add("todo");
    listTodo.append(creatDiv)
    const creatLi = document.createElement('li');
    creatLi.classList.add('todo-item')
    creatLi.innerText = inputTodo.value;
    creatDiv.append(creatLi);
    //* enter values to local storage
    saveLocalTodos(inputTodo.value)
    const creatBtnChecked = document.createElement('button');
    creatBtnChecked.classList.add('checked-btn');
    creatBtnChecked.innerHTML = `<i class='fas fa-check'></i>`;
    creatDiv.append(creatBtnChecked)
    const creatBtnDelete = document.createElement('button');
    creatBtnDelete.classList.add('delete-btn');
    creatBtnDelete.innerHTML = `<i class='fas fa-trash'></i>`;
    creatDiv.append(creatBtnDelete)
    inputTodo.value = '';
}


function deleteOrCheck(e) {
    console.log(e.target);
    const item = e.target
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall')
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
    }
    if (item.classList[0] === 'checked-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}

function filterToDos(e) {
    const todos = listTodo.childNodes;
    console.log(e.target);
    console.log(e.target.value);
    console.log(todos);
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function enterNewValues(e) {
    for (let i = 1; i <= 10; i++) {
        inputTodo.value = `${i}`
        addITem(event);
    }
}

//* Saving to LocalStorage
function saveLocalTodos(item) {
    let localStorageArrOfTodos;
    //*Check if i have already somthing on localstorage
    if (localStorage.getItem('localStorageArrOfTodos') === null) {
        localStorageArrOfTodos = [];
    } else {
        localStorageArrOfTodos = JSON.parse(localStorage.getItem('localStorageArrOfTodos'));
    }
    localStorageArrOfTodos.push(item);
    localStorage.setItem('localStorageArrOfTodos', JSON.stringify(localStorageArrOfTodos))
    console.log(localStorage.key(0));

}