var loggedInUser = getLoggedInUser();

// This is to prevent user from opening home page if somehow he got logged out.
// Alternatively, this is to prevent user from opening home page without logging in.
(function() {
  // loggedInUser = getLoggedInUser();
  if(loggedInUser == null || loggedInUser == "") {
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
      description: "Sample description",
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

function showProjectDialog(projectDataObject = null){
  const title = projectDataObject ? 'Edit Project' : 'Create New Project';
  let selectedMembers = []

  // MODAL BUTTONS
  const buttons = [  
    { // SAVE BUTTON
      label: "Save Project",
      onClick: (modal) => {
        // SAVE PROJECT DATA
        const projectTitleEl = document.getElementById('projectTitle');
        const projectMembersEl = document.getElementById('container');
        const projectDescriptionEl = document.getElementById('projectDescription');

        // VALIDATIONS FOR THE MODAL FORM
        if (projectTitleEl.value == "" ) {
          setInputError(projectTitleEl,"Please enter a title")
        }else{
          clearInputError(projectTitleEl);
          setInputSuccess(projectTitleEl);
        }

        if(memberSelection.value.length == 0) {
          setInputError(projectMembersEl, "Please select at least one member");
        }
        else {
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
        if(projectTitleEl.value !== "" && memberSelection.value.length > 0 && projectDescriptionEl.value !== ""){
          let projectObj = {
            id: generateUniqueId("projectId"),
            title: projectTitleEl.value,
            description: projectDescriptionEl.value,
            leaderName: currentUser.name,
            leaderId: currentUser.id,
            members: memberSelection.value,
            status: "inProgress",
          }
          if(document.getElementById('projectIdHidden').value ){
            projectObj.id = document.getElementById('projectIdHidden').value;
            editProject(projectObj);
          }else{
            addProject(projectObj);
          }

         
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
  ]

  // GET ALL USERS BUT THE CURRENT USER

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
              <div id="container" style="width:50%; font: 500 1rem 'Quicksand', sans-serif;">
                <br>
                <!--element which is going to render the MultiSelect-->
                <input type="text" tabindex="1" id="select">
                <div class="form__input-error-message"></div>
              </div>
          </div>
          <input type="hidden" id="projectIdHidden">

          <div class="form__input-group">
              <label for="projectDescription">Project Description</label>
              <textarea id="projectDescription" class="form__input" autofocus rows="4" cols="50"></textarea>  
              <div class="form__input-error-message"></div>
          </div>
      </form>
    `;

  showModal(title, divContainer.innerHTML, buttons);
  if (projectDataObject !== null) {
    document.getElementById('projectTitle').value = projectDataObject.title;
    selectedMembers = projectDataObject.members;
    document.getElementById('projectDescription').value = projectDataObject.description;
    document.getElementById('projectIdHidden').value = projectDataObject.id ;
  }
  var ele = document.getElementById('container');
  if(ele) {
      ele.style.visibility = "visible";
  }

  var dataUserListObject = [];
  getAllUsers().forEach(user => {
      dataUserListObject.push( { name: user.name , id: user.id});
  });


  // initialize MultiSelect component
  var memberSelection = new ej.dropdowns.MultiSelect({
    // set the members data to dataSource property
    dataSource: dataUserListObject,
    // map the appropriate columns to fields property
    fields: { text: 'name', value: 'id' },

    // adding a default selected value to add the user who is creating the project
    value: selectedMembers,
    
    // set the placeholder to MultiSelect input element
    placeholder: 'Click to see list of members',
    // set the type of mode for how to visualized the selected items in input element.
    mode: 'Box',
    // bind the tagging event
    tagging: function (e) {
        // set the current selected item text as class to chip element.
        e.setClass(e.itemData[memberSelection.fields.text].toLowerCase().replace(' ', '_'));
    }
  });

  // render initialized multiSelect
  memberSelection.appendTo('#select');

}

// start execution when Content Loaded
document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("createNewProject").addEventListener('click', () => {showProjectDialog()})
  document.getElementById("checkCurrentUsers").addEventListener('click', showUsersDialog)

  // * uncomment this to generate dummy projects for testing purpose
  // generateDummyProjects().forEach( proj => {
  //   addProject(proj);
  // });
  
  let projects = getProjects(currentUser.id);

  projects.forEach(project => {
    let projectItem = document.createElement('li');
    projectItem.classList.add('projectItem');
    projectItem.classList.add(project.status);

    projectItem.setAttribute("data-project", JSON.stringify(project));
    
    let title = document.createElement('span');
    title.classList.add('title');
    title.innerText = project.title;

    let itemContent = document.createElement('div');
    itemContent.classList.add('itemContent');

    let p1 = document.createElement('p');
    p1.innerHTML = "<b>Manager: </b><span>"+ project.leaderName+"</span>"
    itemContent.appendChild(p1);
    
    let p2 = document.createElement('p');
    p2.innerHTML = "<b>Team members: </b><span>"+ project.members.length+"</span>";
    itemContent.appendChild(p2);

    let p3 = document.createElement('p');
    p3.classList = "endBtn"

    let editProjectBtn = document.createElement('button');
    editProjectBtn.className = "btn-action editProjectBtn";
    editProjectBtn.title = "Edit Project";
    editProjectBtn.innerHTML = '<i class="fa fa-pen fa-lg"></i>';
    editProjectBtn.addEventListener('click', ()=> {showProjectDialog(project);})
    let goToTasksBtn = document.createElement('button');
    goToTasksBtn.className = "btn-action blue goToTasksBtn";
    goToTasksBtn.title = "Project Tasks";
    goToTasksBtn.innerHTML = '<i class="fa fa-list-check fa-lg"></i>';
    goToTasksBtn.addEventListener('click', ()=> {location.href = "../tasks/tasks.html?id="+project.id;;})
    p3.appendChild(editProjectBtn);
    p3.appendChild(goToTasksBtn);

    itemContent.appendChild(p3);
    projectItem.appendChild(title);
    projectItem.appendChild(itemContent);

    projectList.appendChild(projectItem)
  });

  document.getElementById("logOutBtn").addEventListener("click", () => {
    console.log("logout called");
    logoutCurrentUser();
    location.href = "../index.html";
  });

  // * commenting because this cause logout even when user refreshes page
  // window.addEventListener('beforeunload', function(e) {
  //       var e = e || window.event;

  //       if(e) {
  //           logoutCurrentUser();
  //       }

  //   }, false);
  //#endregion

});

    


    

    

    

    
