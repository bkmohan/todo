const getPriorityColor = (priority) => {
    switch(priority) {
        case 'low':
            return '#42a5f5'
        case 'medium':
            return '#ff6f00'
        case 'high':
            return '#d32f2f'
    }
}

const detail_dt_options = {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'}
const title_dt_options = {weekday: 'short', month: 'short', day: 'numeric'}
const today_dt_options = {hour: 'numeric', minute: 'numeric'}

const todoBody = (todos, projectName) => {
    let body = document.createElement('div');
    body.classList.add('todos');

    let headerDiv = document.createElement('div');
    headerDiv.classList.add('todo-list-header')

    let header = document.createElement('h2');
    header.classList.add('title');
    header.textContent = projectName;
    headerDiv.appendChild(header);


    if(projectName != 'Today' && projectName != 'Inbox'){
        let projectDeleteBtn = document.createElement('button');
        projectDeleteBtn.classList.add('delete-project');
        projectDeleteBtn.textContent = 'Delete'
        headerDiv.appendChild(projectDeleteBtn);
    }

    body.appendChild(headerDiv);

    if (todos.length == 0){
        return body;
    }

    

    for(let i = 0; i < todos.length; i++){
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.setAttribute('data-id', todos[i].id);

        let list = document.createElement('div');
        list.classList.add('todo-list')

        let div1 = document.createElement('div');
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('name', 'check');

        let todotitle = document.createElement('p');
        todotitle.classList.add('todo-title');
        todotitle.textContent = todos[i]['title']

        div1.appendChild(checkbox);
        div1.appendChild(todotitle);

        let div2 = document.createElement('div');
        let todoDate = document.createElement('p');
        todoDate.classList.add('todo-date');

        let dateInTitle = todos[i]['dueDate'].toLocaleDateString("en-US", title_dt_options)
        if(projectName == 'Today'){
            dateInTitle = 'Today ' + todos[i]['dueDate'].toLocaleTimeString("en-US", today_dt_options)
        }
        todoDate.textContent = dateInTitle

        let editImg = document.createElement('img');
        editImg.classList.add('edit-todo');
        editImg.setAttribute('src', './images/edit.svg')
        editImg.setAttribute('alt', 'edit-btn')

        let deleteImg = document.createElement('img');
        deleteImg.classList.add('delete-todo');
        deleteImg.setAttribute('src', './images/delete.svg');
        deleteImg.setAttribute('alt', 'delete-btn');

        div2.appendChild(todoDate);
        div2.appendChild(editImg);
        div2.appendChild(deleteImg);

        list.appendChild(div1);
        list.appendChild(div2);


        let details = document.createElement('div');
        details.classList.add('todo-details');

        let detailDiv1 = document.createElement('div');
        
        let detailTitle = document.createElement('p');
        detailTitle.innerHTML = `<p><span class="detail-head">Title:</span> ${todos[i]['title']}</p>`

        let detailDate = document.createElement('p');
        let dateInDetail = todos[i]['dueDate'].toLocaleDateString("en-US", detail_dt_options)
        detailDate.innerHTML = `<p><span class="detail-head">Due Date:</span> ${dateInDetail}</p>`

        let detailPriority = document.createElement('p');
        detailPriority.innerHTML = `<p><span class="detail-head">Priority:</span> ${todos[i]['priority'].toUpperCase()}</p>`


        detailDiv1.appendChild(detailTitle);
        detailDiv1.appendChild(detailDate);
        detailDiv1.appendChild(detailPriority);
        

        let detailDiv2 = document.createElement('div');
        detailDiv2.classList.add('description');

        let detailDescHead = document.createElement('p');
        detailDescHead.innerHTML = '<p><span class="detail-head">Description</span></p>'

        let detailDesc = document.createElement('p');
        detailDesc.textContent = todos[i]['details']

        detailDiv2.appendChild(detailDescHead)
        detailDiv2.appendChild(detailDesc)

        details.appendChild(detailDiv1);
        details.appendChild(detailDiv2);


        todoDiv.appendChild(list);
        todoDiv.appendChild(details);

        todoDiv.style = `
                        border: 1px solid #f0f0f0;
                        border-left: 4px solid ${getPriorityColor(todos[i]['priority'])};
                    `

        list.addEventListener('click', (e)=> {
            let det = document.querySelector(`div.todo[data-id="${todos[i].id}"] > div.todo-details`)
            if (det.style.display === "flex"){
                det.style.display = 'none';
            }
            else{
                det.style.display = 'flex';
            }
        })

        if(todos[i].done) {
            checkbox.checked = true;
            todoDiv.classList.add('finished')
        }
        body.appendChild(todoDiv);
    }

    return body;
}


export {todoBody}