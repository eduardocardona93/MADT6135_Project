(function() {
    'use strict'

    var loggedInUser = getLoggedInUser();
    if(loggedInUser == null || loggedInUser == "") {
      console.log("logging out");
      location.href = "../index.html";
    }
    else {
      insertNavBar('tasks');
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const projectId = urlSearchParams.get('id');

    let tasks = getProjectTasks(projectId);    // getAllTasks();
    var projectUsers = getProjectUsers(projectId);
    
    
        let taskList = document.getElementById("taskList")
    
        // generate UI for showing all the tasks
        tasks.forEach(task => {
            let taskItem = document.createElement('li');
            taskItem.classList.add('taskItem');
            taskItem.classList.add(task.status);
            
            let title = document.createElement('span');
            title.classList.add('title');
            title.innerText = task.title;
    
            let itemContent = document.createElement('div');
            itemContent.classList.add('itemContent');
    
            let p1 = document.createElement('p');
            p1.innerHTML = "<p><b>Task description: </b><span>"+ task.description+"</span></p>";
            itemContent.appendChild(p1);

            let memberAsgnd = document.createElement('p');
            memberAsgnd.innerHTML = "<p><b>Member Asigned: </b>" + projectUsers[projectUsers.findIndex(x => x.id == task.members)].name + "</p>";
            itemContent.appendChild(memberAsgnd);

            let deadLine = document.createElement('p');
            deadLine.innerHTML = "<p><b>Start date and deadline: </b><br>"+task.startDate + "<b> to </b>" +task.endDate+"</p>";
            itemContent.appendChild(deadLine);

            let p3 = document.createElement('p');
            p3.classList = "endBtn"
            let editTaskBtn = document.createElement('button');
            editTaskBtn.className = "btn-action editTaskBtn";
            editTaskBtn.title = "Edit Task";
            editTaskBtn.innerHTML = '<i class="fa fa-pen fa-lg"></i>';
            editTaskBtn.addEventListener('click', ()=> {showTaskDialog(task);})

            let completeTaskBtn = document.createElement('button');
            completeTaskBtn.className = "btn-action completeTaskBtn";
            task.status === 'completed' ? completeTaskBtn.classList.add('completeTaskBtn-hidden') : "" ;
            completeTaskBtn.title = "Mark Complete";
            completeTaskBtn.innerHTML = '<i class="fa fa-solid fa-check fa-lg"></i>' // fa-circle-check 
            completeTaskBtn.addEventListener('click', ()=> {showHoursDialog(task);})

            p3.appendChild(completeTaskBtn);
            p3.appendChild(editTaskBtn);
        
            itemContent.appendChild(p3);
          
    
            taskItem.appendChild(title);
            taskItem.appendChild(itemContent);
    
            taskList.appendChild(taskItem);
     
            
        });

        function validateTaskForm(){
          let validForm = true;
          const tasksTitle = document.getElementById('tasksTitle');
          const tasksDescription = document.getElementById('tasksDescription');
          const tasksStartDate = document.getElementById('tasksStartDate');
          const tasksUser = document.getElementById('tasksUser');
          if(tasksTitle.value == ''){
            setInputError(tasksTitle,"Please enter a title");
            validForm = false;
          }else{
            clearInputError(tasksTitle);
            setInputSuccess(tasksTitle);
          }

          if(tasksDescription.value == ''){
            setInputError(tasksDescription,"Please enter a description");
            validForm = false;
          }else{
            clearInputError(tasksDescription);
            setInputSuccess(tasksDescription);
          }

          if(tasksStartDate.value == ''){
            setInputError(tasksStartDate,"Please enter a start date");
            validForm = false;
          }else{
            clearInputError(tasksStartDate);
            setInputSuccess(tasksStartDate);
          }

          if(tasksUser.value == ''){
            setInputError(tasksUser,"Please enter an user");
            validForm = false;
          }else{
            clearInputError(tasksUser);
            setInputSuccess(tasksUser);
          }
          return validForm;
        }

        function showTaskDialog(taskDataObject = null) {
          const title = taskDataObject ? 'Edit Task' : 'Create New Task';
          const buttons = [  
            { // SAVE BUTTON
              label: "Save Task",
              onClick: (modal) => {
                if(validateTaskForm()){
                  let taskObj = {
                    id: taskDataObject ? taskDataObject.id : generateUniqueId("taskId"),
                    projectId: projectId,
                    title: document.getElementById('tasksTitle').value,
                    description: document.getElementById('tasksDescription').value,
                    startDate: document.getElementById('tasksStartDate').value,
                    endDate: document.getElementById('tasksEndDate').value  || '',
                    members: document.getElementById('tasksUser').value,
                    status: taskDataObject ? taskDataObject.status : 'inProgress',
                    hours: 0
                  }

                  taskDataObject ? editTask(taskObj) : addTask(taskObj);
                  
                  document.body.removeChild(modal); // CLOSE WINDOWS
                  location.reload();
                }
              },
              triggerClose: false
            },
            { // CLOSE WINDOWS
              label: "Close",
              type: 'close',
              onClick: (modal) => {},
              triggerClose: true
            }
          ];
          
          var dataUserListObject = '';
          projectUsers.forEach(user => {
              dataUserListObject += ` <option value="${user.id}">${user.name}</option>`;
          });

          const divContainer = document.createElement("div");
          divContainer.innerHTML = `
              <form class ="form" id="formTask">
                  <div class="form__input-group">
                      <label for="tasksTitle">Task Title</label>
                      <input type="text" id="tasksTitle" class="form__input" autofocus >
                      <div class="form__input-error-message"></div>
                  </div>
                  <div class="form__input-group">
                      <label for="tasksDescription">Task Description</label>
                      <textarea id="tasksDescription" class="form__input" autofocus rows="4" cols="50"></textarea>  
                      <div class="form__input-error-message"></div>
                  </div>
                  <div class="form__input-group">
                      <label for="tasksStartDate">Task Start Date</label>
                       <input type="date" id="tasksStartDate" class="form__input" autofocus >
                      <div class="form__input-error-message"></div>
                  </div>
                  <div class="form__input-group">
                      <label for="tasksEndDate">Task End Date</label>
                       <input type="date" id="tasksEndDate" class="form__input" autofocus >
                      <div class="form__input-error-message"></div>
                  </div>
                  <input type="hidden" id="taskIdHidden">
                  <div class="form__input-group">
                      <label for="tasksUser">Task Assigned User</label>
                      <select class="form__input" id="tasksUser">${dataUserListObject}</select>
                      <div class="form__input-error-message"></div>
                  </div>
              </form>
            `;
    
          showModal(title, divContainer.innerHTML, buttons);

          if(taskDataObject !== null){
            console.log(taskDataObject);

            document.getElementById('tasksTitle').value = taskDataObject.title;
            document.getElementById('tasksDescription').value = taskDataObject.description;
            document.getElementById('tasksStartDate').value =taskDataObject.startDate;
            document.getElementById('tasksEndDate').value = taskDataObject.endDate;
            document.getElementById('tasksUser').value = taskDataObject.members;
            document.getElementById('taskIdHidden').value = taskDataObject.id;
          }

        }

        function validateHoursForm() {
          let validForm = true;
          const taskHours = document.getElementById('hoursWorked');

          if(taskHours.value == ''){
            setInputError(taskHours, "Please enter number of hours worked on this task!");
            validForm = false;
          }
          else{
            clearInputError(taskHours);
            setInputSuccess(taskHours);
          }

          return validForm;
        }

        function showHoursDialog(task) {
          const title = "Mark as Complete";

          const divContainer = document.createElement("div");
          divContainer.innerHTML = `
          <form class ="form" id="markDoneForm">
              
              <div class="form__input-group">
                  <label for="hoursWorked">Howmany hours have you worked on this task?</label>
                  <input type="number" id="hoursWorked" class="form__input" autofocus >
                  <div class="form__input-error-message"></div>
              </div>
              
          </form>`;

          const buttons = [  
            { // SAVE BUTTON
              label: "Mark Complete",
              onClick: (modal) => {
                if(validateHoursForm()){
                  task.hours = document.getElementById('hoursWorked').value;
                  task.status = 'completed';
                  editTask(task);
                  
                  document.body.removeChild(modal); // CLOSE WINDOWS
                  document.getElementsByClassName('completeTaskBtn')[0].classList.add('completeTaskBtn-hidden');
                  location.reload();
                }
              },
              triggerClose: false
            },
            { // CLOSE WINDOWS
              label: "Close",
              type: 'close',
              onClick: (modal) => {},
              triggerClose: true
            }
          ];

          showModal(title, divContainer.innerHTML, buttons);

        }
        

        document.addEventListener("DOMContentLoaded", () => {

          document.getElementById("createNewTask").addEventListener('click', () => {showTaskDialog()})
        })
}())


