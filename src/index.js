import { Todos } from "./todoObjects";
import { todoBody } from "./todos";

const content = document.querySelector('.content');
const addProject = document.querySelector('#add-project');
const addTodo = document.querySelector('#add-todo');
const modalWraper = document.querySelector('.modal-wrapper');
const addProjectModal = document.querySelector('.modal--new-project');
const addTodoModal = document.querySelector('.modal--add-task');
const projectsListElement = document.querySelector('.custom-projects');
const sidebarProjectItems = document.querySelectorAll('.project-name');
const homeBtn = document.querySelector('#home')
const menuBtn = document.querySelector('#menu')

const closeModal = document.querySelectorAll('.modal-close');
const closeButton = document.querySelectorAll('.modal-x');

const addNewProjectBtn = document.querySelector('#add-new-project');
const addNewTodoBtn = document.querySelector('#add-new-task');
const editModalTodoBtn = document.querySelector('#edit-task-btn');
let newProjectName = document.querySelector('#project-name');
let newTaskName = document.querySelector('#body-title');
let newTaskDate = document.querySelector('#body-date');
let newTaskDetail = document.querySelector('#body-desc');
let newTaskProject = document.querySelector('#body-project');
let newTaskPriority = document.querySelector('#body-priority');


let masterTodo = new Todos();


function addNewProjectToBody(newPro){
    let newLi = document.createElement('li');
    newLi.classList.add('project-name');
    newLi.textContent = newPro;
    projectsListElement.appendChild(newLi);

    newLi.addEventListener('click', displayTodos);
}

addProject.addEventListener('click', (e) => {
    modalWraper.style.display = 'block';
    addProjectModal.style.display = 'block';
    
})

addTodo.addEventListener('click', displayTodoModal)


function displayTodoModal(e) {
    if(e.target.id == 'add-todo'){
        document.querySelector('#editTask').style.display = 'none'
        document.querySelector('#edit-task-btn').style.display = 'none'

        document.querySelector('#newTask').style.display = 'block'
        document.querySelector('#add-new-task').style.display = 'inline-block'
    }
    else{
        document.querySelector('#editTask').style.display = 'block'
        document.querySelector('#edit-task-btn').style.display = 'inline-block'

        document.querySelector('#newTask').style.display = 'none'
        document.querySelector('#add-new-task').style.display = 'none'
    }

    modalWraper.style.display = 'block';
    addTodoModal.style.display = 'block';

    newTaskProject.innerHTML = '';
    masterTodo.getProjectsList().forEach(item => {
        let option = document.createElement('option');
        option.setAttribute('value', item);
        option.textContent = item;

        newTaskProject.appendChild(option);
    })
}

closeModal.forEach(ele => ele.addEventListener('click', (e) => {
    resetInput(e);
}));

closeButton.forEach(ele => ele.addEventListener('click', (e) => {
    resetInput(e);
}));


function resetInput(e) {
    modalWraper.style.display = 'none';

    e.target.parentElement.parentElement.style.display = 'none';

    let allInputs = document.querySelectorAll(`.${e.target.parentElement.parentElement.classList[0]} input`);
    let texarea = document.querySelector(`.${e.target.parentElement.parentElement.classList[0]} textarea`);
    let selections = document.querySelectorAll(`.${e.target.parentElement.parentElement.classList[0]} select`);
    

    allInputs.forEach(node => {
        node.value = '';
        node.style.borderColor  = '';
        node.style.boxShadow  = '';
    })

    if(texarea){
        texarea.value = '';
        texarea.style.borderColor  = '';
        texarea.style.boxShadow  = '';
    }

    selections.forEach(select => {
        select.selectedIndex = 0;
    })


    let allfeednack = document.querySelectorAll(`.${e.target.parentElement.parentElement.classList[0]} .invalid-feedback`);
    allfeednack.forEach(node => {
        node.style.display = 'none';
    })
}

function validateFeedback(feedbackNode, inputNode, valid) {
    if(valid){
        feedbackNode.style.display = 'none';
        inputNode.style.borderColor  = '#719ECE';
        inputNode.style.boxShadow  = '0 0 10px #719ECE';
    }
    else{
        feedbackNode.style.display = 'block';
        inputNode.style.borderColor  = '#dc3545';
        inputNode.style.boxShadow  = '0 0 10px #dc3545';
    }
}

newProjectName.addEventListener('input', e => {
    let feedback = document.querySelector('#project-name + div.invalid-feedback');
    newProjectName.validity.valueMissing ?  validateFeedback(feedback, newProjectName, false) : validateFeedback(feedback, newProjectName, true);
})

newTaskName.addEventListener('input', e => {
    let feedback = document.querySelector('#body-title + div.invalid-feedback');
    newTaskName.validity.valueMissing ?  validateFeedback(feedback, newTaskName, false) : validateFeedback(feedback, newTaskName, true);
})

newTaskDate.addEventListener('input', e => {
    let feedback = document.querySelector('#body-date + div.invalid-feedback');
    newTaskDate.validity.valueMissing ?  validateFeedback(feedback, newTaskDate, false) : validateFeedback(feedback, newTaskDate, true);
})

newTaskDetail.addEventListener('input', e => {
    let feedback = document.querySelector('#body-desc + div.invalid-feedback');
    newTaskDetail.validity.valueMissing ?  validateFeedback(feedback, newTaskDetail, false) : validateFeedback(feedback, newTaskDetail, true);
})


addNewProjectBtn.addEventListener('click', e => {

    if(newProjectName.value){
        masterTodo.addNewProject(newProjectName.value);
        addNewProjectToBody(newProjectName.value);
        resetInput(e)
    }
    else{
        newProjectName.dispatchEvent(new Event("input"));
    }
})

addNewTodoBtn.addEventListener('click', e => {
    if(newTaskName.value && newTaskDate.value && newTaskDetail.value){
        masterTodo.addTodo(newTaskProject.value, newTaskName.value, new Date(newTaskDate.value),
                            newTaskDetail.value, newTaskPriority.value);

        
        resetInput(e)

        let projectNode = document.querySelector('.sidebar .active');
        UpdateTodos(projectNode)
    }
    else{
        newTaskName.dispatchEvent(new Event("input"));
        newTaskDate.dispatchEvent(new Event("input"));
        newTaskDetail.dispatchEvent(new Event("input"));
    }
})


sidebarProjectItems.forEach(element => element.addEventListener('click', displayTodos))

function displayTodos(event){
    UpdateTodos(event.target)
}

function UpdateTodos(projectNode){
    let project = projectNode.textContent.trim()
    document.querySelectorAll('.sidebar .project-name').forEach(element => {
        element.classList.remove('active');
    })
    
    projectNode.classList.add('active');


    content.innerHTML = '';

    if(project == 'Today'){
        content.appendChild(todoBody(masterTodo.getTodayTodos(project), 'Today'))
    }
    else{
        content.appendChild(todoBody(masterTodo.getTodos(project), project))
    }

    if(project != 'Today' && project != 'Inbox') {
        document.querySelector('.delete-project').addEventListener('click', deleteProject)
    }

    document.querySelectorAll('.delete-todo').forEach(element => {
        element.addEventListener('click', deleteTodo)
    })

    document.querySelectorAll('.edit-todo').forEach(element => {
        element.addEventListener('click', editTodo)
    })

    document.querySelectorAll('input[name="check"]').forEach(element => {
        element.addEventListener('change', chnageTaskStatus);
    })

}

function chnageTaskStatus(e){
    let id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
    if(e.target.checked){
        masterTodo.updateTaskStatus(id, true);
        e.target.parentElement.parentElement.parentElement.classList.add('finished')
    }
    else{
        masterTodo.updateTaskStatus(id, false);
        e.target.parentElement.parentElement.parentElement.classList.remove('finished')
    }
}

function deleteTodo(e){
    masterTodo.deleteTodo(e.target.parentElement.parentElement.parentElement.getAttribute('data-id'))    
    let selectedProject = document.querySelector('.project-name.active')
    UpdateTodos(selectedProject);
}

function editTodo(e){
    let id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');

    displayTodoModal(e);
    updateTodoModalInputs(id);
}


function updateTodoModalInputs(id){
    let data = masterTodo.getTodoById(id);

    newTaskName.value = data.title
    newTaskDate.value = data.dueDate.toISOString().substring(0, 16)
    newTaskDetail.value = data.details

    for(let i = 0; i < newTaskProject.options.length; i++){
        if(newTaskProject.options[i].value == data.project){
            newTaskProject.options[i].selected = true;
            break;
        }
    }

    for(let i = 0; i < newTaskPriority.options.length; i++){
        if(newTaskPriority.options[i].value == data.priority){
            newTaskPriority.options[i].selected = true;
            break;
        }
    }

    editModalTodoBtn.setAttribute('data-id', id);
}


editModalTodoBtn.addEventListener('click', (e) => {
    if(newTaskName.value && newTaskDate.value && newTaskDetail.value){
        let data = {
                    project : newTaskProject.value,
                    title : newTaskName.value,
                    dueDate : new Date(newTaskDate.value),
                    details : newTaskDetail.value,
                    priority : newTaskPriority.value
        }

        let id = e.target.getAttribute('data-id');
        masterTodo.updateTodo(id, data);

        e.target.setAttribute('data-id', '');
        resetInput(e)

        let projectNode = document.querySelector('.sidebar .active');
        UpdateTodos(projectNode)
    }
    else{
        newTaskName.dispatchEvent(new Event("input"));
        newTaskDate.dispatchEvent(new Event("input"));
        newTaskDetail.dispatchEvent(new Event("input"));
    }
})

function deleteProject(e) {
    let project = document.querySelector('h2.title').textContent;
    masterTodo.deleteProject(project);

    let today = document.querySelector('.today')

    UpdateTodos(today);

    document.querySelector('.custom-projects').innerHTML = '';
    masterTodo.getProjectsList().forEach(project => addNewProjectToBody(project));
}


homeBtn.addEventListener('click', (e) => {
    let today = document.querySelector('.today')
    UpdateTodos(today);
})


let menuOpened = true;
menuBtn.addEventListener('click', (e) => {
    if(menuOpened){
        document.querySelector(".sidebar").style.width = "0";
        menuOpened = false
    }
    else{
        document.querySelector(".sidebar").style.width = "20%";
        menuOpened = true
    }
})

// INIT

function init(){
    masterTodo.getProjectsList().forEach(project => {
        if(project != 'Inbox') addNewProjectToBody(project);
    })

    let today = document.querySelector('.today')
    UpdateTodos(today);
}

init()
