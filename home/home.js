var loggedInUser = null;

(function() {
  loggedInUser = getLoggedInUser();
  if(loggedInUser == null || loggedInUser == "") {
    console.log("logging out");
    location.href = "../index.html";
  }
  else {
    insertNavBar('projects');
  }

})();


// variable declaration
let projectList = document.getElementById("projectList")

// REPLACE THIS FOR THE PROJECT LOGIC
function generateDummyProjects() {
  var projects = [];

  function randomLeader() {
    var leaders = ["Keval Langalia", "Eduardo Cardona", "Lino Hernandez"];
    return leaders[Math.floor(Math.random() * 3)];
  }

  function randomStatus() {
    var statuses = ["inProgress", "completed"];
    return statuses[Math.floor(Math.random() * 2)];
  }

  for(let i = 1; i <= 15; i++) {
    var proj = {
      id: i,
      title: "Project " + i,
      leaderName: randomLeader(),
      leaderId: Math.floor(Math.random() * 3),
      members: [1, 2, 3, 4, 5, 6],
      status: randomStatus()
    }

    projects.push(proj);
  }

  return projects;
}

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

// start execution when Content Loaded
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("createNewProject").addEventListener('click', showProjectDialog)
  document.getElementById("checkCurrentUsers").addEventListener('click', showUsersDialog)

  // generateDummyProjects().forEach( proj => {
  //   addProject(proj);
  // });

  let projects = getAllProjects();

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
    p1.innerHTML = "<p><b>Manager: </b><span>"+ project.leaderName+"</span></p>"

    let p2 = document.createElement('p');
    p2.innerHTML = "<p><b>Team members: </b><span>"+ project.members.length+"</span></p>"

    itemContent.appendChild(p1);
    itemContent.appendChild(p2);

    projectItem.appendChild(title);
    projectItem.appendChild(itemContent);

    projectList.appendChild(projectItem)
  });

  document.getElementById("logOutBtn").addEventListener("click", () => {
    console.log("logout called");
    logoutCurrentUser();
    location.href = "../index.html";
  });

  // todo: commenting because this cause logout even when user refreshes page
  // window.addEventListener('beforeunload', function(e) {
  //       var e = e || window.event;

  //       if(e) {
  //           // logout
  //           logoutCurrentUser();
  //       }

  //   }, false);
  //#endregion

  // Code to show Modal
  const buttons = [  {
    label: "Got it!",
    onClick: (modal) => {
      console.log("The button was clicked!");
    },
    triggerClose: true
  },
  {
    label: "Decline",
    onClick: (modal) => {
      console.log("DECLINED.");
    },
    triggerClose: true
  }];

  // todo: use this to show modal
  // showModal('User edit', "<p>I am the content of this modal</p>", buttons)

});

    


    

    

    

    
