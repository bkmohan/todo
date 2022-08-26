function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}


class Todos {
    randomDate(start, end, startHour, endHour) {
        var date = new Date(+start + Math.random() * (end - start));
        var hour = startHour + Math.random() * (endHour - startHour) | 0;
        date.setHours(hour);
        return date;
      }

    // projectsList = ['Inbox', 'Home', 'College', 'Creative', 'Work'];
    projectsList = ['Inbox'];
    todoList = [];

    // sampleData = [
    //     {project: 'Inbox', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'Home', title : 'new mail', dueDate : new Date(), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'Work', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:true},
    //     {project: 'Inbox', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'College', title : 'new mail', dueDate : new Date(), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'Inbox', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'Home', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'Inbox', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:true},
    //     {project: 'College', title : 'new mail', dueDate : new Date(), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'Work', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'Home', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'Inbox', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:true},
    //     {project: 'College', title : 'new mail', dueDate : new Date(), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'Work', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    //     {project: 'College', title : 'new mail', dueDate : this.randomDate(1, 30, 5, 16), details : 'djfhdsjkfhdsjkfh', priority:'high', done:false},
    // ].forEach(list => this.addTodo(list.project, list.title, list.dueDate, list.details, list.priority, list.done))

    constructor(){

        if (storageAvailable('localStorage')) {

            if (localStorage.getItem('todos')) {
                let storedTodos = JSON.parse(localStorage.getItem("todos"));
                storedTodos.forEach(element => this.addTodo(element.project, element.title, element.dueDate, element.details, element.priority, element.done))
            } 
            if (localStorage.getItem('todoProject')) {
                let storedProjects = JSON.parse(localStorage.getItem("todoProject"));
                this.projectsList = storedProjects;
            } 
          }
    }

    updateLocalStorageTodos(){
        if (storageAvailable('localStorage')){
            localStorage.setItem('todos' ,JSON.stringify(this.todoList));
        }
    }

    updateLocalStorageProjects(){
        if (storageAvailable('localStorage')){
            localStorage.setItem('todoProject' ,JSON.stringify(this.projectsList));
        }
    }

    getProjectsList (){
        return this.projectsList;
    };

    addNewProject(item){
        this.projectsList.push(item);
        this.updateLocalStorageProjects()
    };

    deleteProject(project){
        let idx = this.projectsList.indexOf(project);
        this.projectsList.splice(idx, 1);

        this.todoList = this.todoList.filter(item => item.project != project)
        this.updateLocalStorageProjects();
        this.updateLocalStorageTodos();
    };

    addTodo(project, title, dueDate, details, priority, done){
        this.todoList.push(this._createTodo(project, title, dueDate, details, priority, done));
        this.updateLocalStorageTodos()
    };

    getTodos(project){
        return this.todoList.filter(todo => todo.project == project);
    }

    getTodoById(id){
        for(let i = 0; i < this.todoList.length; i++){
            if(this.todoList[i].id == id){
                return this.todoList[i];
            }
        }
    }

    updateTodo(id, data){
        for(let i = 0; i < this.todoList.length; i++){
            if(this.todoList[i].id == id){
                this.todoList[i].project = data.project;
                this.todoList[i].title = data.title;
                this.todoList[i].dueDate = data.dueDate;
                this.todoList[i].details = data.details;
                this.todoList[i].priority = data.priority;
                this.todoList[i].done = data.done;

                this.updateLocalStorageTodos()
                break;
            }
        }
    }

    updateTaskStatus(id, status){
        for(let i = 0; i < this.todoList.length; i++){
            if(this.todoList[i].id == id){
                this.todoList[i].done = status;
                this.updateLocalStorageTodos()
                break;
            }
        }
    }

    getTodayTodos(){
        let today = new Date();
        return this.todoList.filter(todo => today.toDateString() == todo.dueDate.toDateString())
    }

    getAllTodos(){
        return this.todoList;
    }

    deleteTodo(id){
        let idx = -1;
        for(let i = 0; i < this.todoList.length; i++){
            if(id == this.todoList[i].id){
                idx = i;
                this.updateLocalStorageTodos()
                break;
            }
        }

        this.todoList.splice(idx, 1);
        this.updateLocalStorageTodos()
    }

    _createTodo(project, title, dueDate, details, priority, done){
        let id = Math.random().toString(16).slice(2);

        if(typeof dueDate === 'string' ){
            dueDate = new Date(dueDate);
        }
        return {id, project, title, dueDate, details, priority, done};
    }

}

export {Todos}