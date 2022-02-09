(function() {
    'use strict'
    insertNavBar();

    // REPLACE THIS FOR THE PROJECT LOGIC
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


    let projectList = document.getElementById("projectList")

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

        projectList.appendChild(projectItem)
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