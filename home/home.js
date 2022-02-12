(function() {
    'use strict'
    insertNavBar('projects');
    // REPLACE THIS FOR THE GET ALL PROJECTS LOGIC
    let projects = [
        {id:1, title:"Project 1", leaderName: 'Keval Langalia',  members: [1,2,3,4] ,progress: 'onProgress'},
        {id:1, title:"Project 2", leaderName: 'Keval Langalia',  members: [1,2,3,4,5] ,progress: 'success'},
        {id:1, title:"Project 3", leaderName: 'Eduardo Cardona', members: [3,4,6] , progress: 'onProgress'},
        {id:1, title:"Project 4", leaderName: 'Keval Langalia',  members: [1,2,3,4,7] ,progress: 'onProgress'},
        {id:1, title:"Project 5", leaderName: 'Lino Hernandez',  members: [1,2,5,8] ,progress: 'success'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
        {id:1, title:"Project 6", leaderName: 'Keval Langalia',  members: [1,2,3,4,6] ,progress: 'onProgress'},
    ]
    
    
    document.getElementById("createNewProject").addEventListener('click', showProjectDialog)
    document.getElementById("checkCurrentUsers").addEventListener('click', showUsersDialog)

    projects.forEach(project => {
        let projectItem = document.createElement('li');
        projectItem.classList.add('projectItem');
        projectItem.classList.add(project.progress);
        
        let title = document.createElement('span');
        title.classList.add('title');
        title.innerText = project.title;

        let itemContent = document.createElement('div');
        itemContent.classList.add('itemContent');

        let p1 = document.createElement('p');
        p1.innerHTML = "<p><b>Manager: </b><span>"+ project.leaderName+"</span></p>"

        let p2 = document.createElement('p');
        p2.innerHTML = "<p><b>Team members: </b><span>"+ project.members.length+"</span></p>"

        itemContent.appendChild(p1);
        itemContent.appendChild(p2);

        projectItem.appendChild(title);
        projectItem.appendChild(itemContent);

        document.getElementById("projectList").appendChild(projectItem)
    });

    function showUsersDialog(){
      const title = 'Users List';
      const buttons = [  
        { // CLOSE WINDOWS
          label: "Close",
          type: 'close',
          onClick: (modal) => {},
          triggerClose: true
        }
      ];
      let usersHtml = getAllUsers().reduce( (x,a) => {
        return x +=`<button type="button" class="collapsible">${a.name}</button>
                    <div class="content">
                      <p><b>Email: </b>${a.email}</p>
                      <p><b>Rate: </b> $ ${parseFloat(a.rate)}</p>
                    </div>`;
      } , "") ;
      const divContainer = document.createElement("div");
      divContainer.innerHTML = `
      <div class="form">${usersHtml}</div>
      `;
      showModal(title, divContainer.innerHTML, buttons);
      document.querySelectorAll(".collapsible").forEach(element => {
        element.addEventListener("click", function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.maxHeight){
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      });


      
    }
    function showProjectDialog(){
      const title = 'Create New Project'
      // MODAL BUTTONS
      const buttons = [  
        { // SAVE BUTTON
          label: "Save Project",
          onClick: (modal) => {
            // SAVE PROJECT DATA
            const projectTitleEl = document.getElementById('projectTitle');
            const projectMembersEl = document.getElementById('projectMembers');
            const projectDescriptionEl = document.getElementById('projectDescription');
            // VALIDATIONS FOR THE MODAL FORM
            if (projectTitleEl.value == "" ) {
              setInputError(projectTitleEl,"Please enter a title")
            }else{
              clearInputError(projectTitleEl);
              setInputSuccess(projectTitleEl);
            } 
            if (projectMembersEl.value == "" ) {
              setInputError(projectMembersEl,"Please select at least one member")
            }else {
              clearInputError(projectMembersEl);
              setInputSuccess(projectMembersEl);
            }
            if (projectDescriptionEl.value == "" ) {
              setInputError(projectDescriptionEl,"Please enter a description")
            }else{
              clearInputError(projectDescriptionEl);
              setInputSuccess(projectDescriptionEl);
            }
            // SAVE THE FORM
            if(projectTitleEl.value !== "" && projectMembersEl.value !== "" && projectDescriptionEl.value !== ""){
              const newProjectObj = {
                'id' : 0, // <--------------------- get id from local storage
                'title' :projectTitleEl.value , 
                'leaderName' : currentUser.name, 
                'leaderId' : currentUser.id, 
                'members' : projectMembersEl.value, 
                'progress' : projectDescriptionEl.value, 
              }
              console.log(newProjectObj)
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
      ]

      // GET ALL USERS BUT THE CURRENT USER
      let membersHtml = getAllUsers().reduce( (x,a) => {
        const currentUserLabel = (a.id === currentUser.id) ?  "(Me)" : "";
        return x +=`<option value="${a.id}">${a.name} ${currentUserLabel}</option>`;
      } , "") ;


      const divContainer = document.createElement("div");
        divContainer.innerHTML = `
          <form class ="form" id="formProject">
              <div class="form__input-group">
                  <label for="projectTitle">Project Title</label>
                  <input type="text" id="projectTitle" class="form__input" autofocus >
                  <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                  <label for="projectMembers">Project Members</label>
                  <select class="form__input" id="projectMembers" multiple autofocus>
                    ${membersHtml}
                  </select>
                  <div class="form__input-error-message"></div>
              </div>
              <div class="form__input-group">
                  <label for="projectDescription">Project Description</label>
                  <textarea id="projectDescription" class="form__input" autofocus rows="4" cols="50"></textarea>  
                  <div class="form__input-error-message"></div>
              </div>
          </form>
        `;
      showModal(title, divContainer.innerHTML, buttons)

    }
    
}())