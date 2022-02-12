var loggedInUser = null;

(function() {
  user = getLoggedInUser();
  if(loggedInUser == null || loggedInUser == "") {
    console.log("logging out");
    location.href = "../index.html";
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

// start execution when Content Loaded
document.addEventListener("DOMContentLoaded", () => {

  generateDummyProjects().forEach( proj => {
    addProject(proj);
  });

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

    


    

    

    

    