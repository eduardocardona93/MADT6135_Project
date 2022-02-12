(function() {
    'use strict'

    /*var members = [
        'Clara Water','Angel Mala','Dyvia Sri','Jose Jose','Mangarret'];

    function makeUL(array) {
        var list = document.createElement('ul');
        members.forEach(member => {
            var item = document.createElement('li');

            item.innerText = member;

            list.appendChild(item);
        });
    console.log(list);
        document.getElementById('teams').appendChild(list);
    }

    makeUL(members);*/

    let projects = [
    {id:1, title:"Task #1", description: 'Order the boxes to deliver',  members: [1,2,3,4,6] ,progress: 'onProgress'},
    {id:1, title:"Task #2", description: 'Track orders',  members: [1,2,3,4,6] ,progress: 'onProgress'},
    {id:1, title:"Task #3", description: 'Charge customers',  members: [1,2,3,4,6] ,progress: 'onProgress'},
    ]

    let projectList = document.getElementById("taskList")

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
        p1.innerHTML = "<p><b>Task description: </b><span>"+ project.description+"</span></p>"

        let p2 = document.createElement('p');
        p2.innerHTML = "<p><b>Members assigned: </b><span>"+ project.members.length+"</span></p>"

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
