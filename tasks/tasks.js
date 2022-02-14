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
        {id:1, title:"Task #1", description: 'Order the boxes to deliver', startDate: "01/01/2022", endDate: "20/01/2022",  members: [1,2], status: 'inProgress'},
        {id:2, title:"Task #2", description: 'create website', startDate: "15/01/2022", endDate: "25/01/2022",  members: [1,2], status: 'completed'},
        {id:3, title:"Task #3", description: 'host the website online', startDate: "01/02/2022", endDate: "20/02/2022",  members: [1,2], status: 'inProgress'},
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
          }]
        showModal('User edit', "<p>I am the content of this modal</p>", buttons)

}())