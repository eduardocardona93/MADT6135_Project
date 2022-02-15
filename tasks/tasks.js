(function () {
  "use strict";

  var loggedInUser = getLoggedInUser();
  if (loggedInUser == null || loggedInUser == "") {
    console.log("logging out");
    location.href = "../index.html";
  } else {
    insertNavBar("tasks");
  }

  const urlSearchParams = new URLSearchParams(window.location.search);

  const projectId = urlSearchParams.get("id");

  let dummyTasks = [
    {
      id: 1,
      projectId: 1,
      title: "Task #1",
      description: "Order the boxes to deliver",
      startDate: "01/01/2022",
      endDate: "20/01/2022",
      memberId: 1,
      memberName: "Keval",
      hours: 30,
      status: "inProgress",
    },
    {
      id: 2,
      projectId: 1,
      title: "Task #2",
      description: "create website ",
      startDate: "15/01/2022",
      endDate: "25/01/2022",
      memberId: 2,
      memberName: "Lino",
      hours: 30,
      status: "completed",
    },
    {
      id: 3,
      projectId: 1,
      title: "Task #3",
      description: "host the website online",
      startDate: "01/02/2022",
      endDate: "20/02/2022",
      hours: 30,
      memberId: 3,
      memberName: "Eduardo",
      status: "inProgress",
    },
  ];

  dummyTasks.forEach(task => {
    addTask(task);
  });

  var tasks = getProjectTasks(projectId);

  let taskList = document.getElementById("taskList");

  tasks.forEach((task) => {
    let taskItem = document.createElement("li");
    taskItem.classList.add("taskItem");
    taskItem.classList.add(task.status);

    let title = document.createElement("span");
    title.classList.add("title");
    title.innerText = task.title;

    let itemContent = document.createElement("div");
    itemContent.classList.add("itemContent");

    let p1 = document.createElement("p");
    p1.classList.add("taskDescription");
    p1.innerHTML =
      "<b>Description: </b><span>" + task.description + "</span>";

    let p2 = document.createElement("p");
    p2.classList.add("assignedMember");
    p2.innerHTML = "<p><b>Member: </b><span>" + task.memberName + "</span></p>";

    itemContent.appendChild(p1);
    itemContent.appendChild(p2);

    taskItem.appendChild(title);
    taskItem.appendChild(itemContent);

    taskList.appendChild(taskItem);

  });

})();
