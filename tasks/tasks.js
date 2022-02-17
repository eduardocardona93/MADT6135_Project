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

    let projects = [
        {id:1,
          projectId: 1,
          title:"Task #1",
         description: 'Order the boxes to deliver',
         startDate: "01/01/2022",
         endDate: "20/01/2022",
          members: [1,2],
         status: 'inProgress'},
        {id:2, projectId: 1, title:"Task #2", description: 'create website', startDate: "15/01/2022", endDate: "25/01/2022",  members: [1,2], status: 'completed'},
        {id:3, projectId: 1, title:"Task #3", description: 'host the website online', startDate: "01/02/2022", endDate: "20/02/2022",  members: [1,2], status: 'inProgress'},
        ];
    
        let loggedMembers = [
          {id:1, memberName:"member 1"},{id:1, memberName:"member 2"},
        ]
    
        let projectList = document.getElementById("taskList")
    
        projects.forEach(project => {
            let projectItem = document.createElement('li');
            projectItem.classList.add('projectItem');
            projectItem.classList.add(project.status);
            
            let title = document.createElement('span');
            title.classList.add('title');
            title.innerText = project.title;
    
            let itemContent = document.createElement('div');
            itemContent.classList.add('itemContent');
    
            let p1 = document.createElement('p');
            p1.innerHTML = "<p><b>Task description: </b><span>"+ project.description+"</span></p>"
            
          
            itemContent.appendChild(p1);
    
    
            projectItem.appendChild(title);
            projectItem.appendChild(itemContent);
    
            projectList.appendChild(projectItem);
    
            loggedMembers.forEach(loggedMember => {
              let memberItem = document.createElement('li');
              memberItem.classList.add('memberItem');
              memberItem.classList.add(loggedMember.loggedMembers);
    
              let memberTasked = document.createElement('div');
              memberTasked.classList.add('chip');
              itemContent.appendChild(memberTasked);
    
              let memberTaskedname = document.createElement('span');
              //memberTaskedname.classList.add('memberName');//
              memberTaskedname.innerText = loggedMember.memberName;
    
              memberItem.appendChild(memberTaskedname);
            })
            
        });
        // const buttons = [  {
        //     label: "Got it!",
        //     onClick: (modal) => {
        //       console.log("The button was clicked!");
        //     },
        //     triggerClose: true
        //   },
        //   {
        //     label: "Decline",
        //     onClick: (modal) => {
        //       console.log("DECLINED.");
        //     },
        //     triggerClose: true
        //   }]
        // showModal('User edit', "<p>I am the content of this modal</p>", buttons)

        function validateTaskForm(){
          let validForm = true;
          const tasksTitle = document.getElementById('tasksTitle').value;
          const tasksDescription = document.getElementById('tasksDescription').value;
          const tasksStartDate = document.getElementById('tasksStartDate').value;
          const tasksEndDate = document.getElementById('tasksEndDate').value;
          const tasksUser = document.getElementById('tasksUser').value;
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

          if(tasksEndDate.value == ''){
            setInputError(tasksEndDate,"Please enter an end date");
            validForm = false;
          }else{
            clearInputError(tasksEndDate);
            setInputSuccess(tasksEndDate);
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
        function showTaskDialog(taskDataObject = null){
          const title = taskDataObject ? 'Edit Task' : 'Create New Task';
          const buttons = [  
            { // SAVE BUTTON
              label: "Save Task",
              onClick: (modal) => {
                if(validateTaskForm()){
                  let taskObj = {
                    id:1,
                    projectId: projectId,
                    title:document.getElementById('tasksTitle').value,
                    description:document.getElementById('tasksDescription').value,
                    startDate: document.getElementById('tasksStartDate').value,
                    endDate: document.getElementById('tasksEndDate').value,
                    members: document.getElementById('tasksUser').value,
                    status: 'inProgress'
                  }
                  if(document.getElementById('taskIdHidden').value){
                    
                  }else{
                    
                  }
                  document.body.removeChild(modal); // CLOSE WINDOWS
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
          getAllUsers().forEach(user => {
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
                       <input type="date" id="tasksTitle" class="form__input" autofocus >
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


        }
        

        document.addEventListener("DOMContentLoaded", () => {

          document.getElementById("createNewTask").addEventListener('click', () => {showTaskDialog()})
        })
}())


