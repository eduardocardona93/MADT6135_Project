//#region login, logout related functions

var getAllUsers = () => {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

var generateUniqueId = (idOfWhat) => {

    // generate User Id
    if(idOfWhat == "userId") {
        var idArr = [];
        getAllUsers().forEach(element => {
            idArr.push(element.id);
        });

        if(idArr.length > 0) {
            return idArr.length + 1;
        }
        else {
            return 1;
        }
    }

    // generate Project Id
    else if(idOfWhat == "projectId") {
        var idArr = [];
        getAllProjects().forEach(element => {
            idArr.push(element.id);
        });

        if(idArr.length > 0) {
            return idArr.length + 1;
        }
        else {
            return 1;
        }
    }

    // generate Task Id
    else if(idOfWhat == "taskId") {
        // todo: generate Id for Tasks

    }

    
}

var saveCurrentUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    updateUser(user);
}

var getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
}

var updateUser = (user) => {
    let users = getAllUsers();
    const userIndex = users.findIndex(x => x.id === user.id);
    users[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(users));
}

var addUser = (user) => {
    // fetching all users
    var users = getAllUsers();

    // logging the users
    console.log("# of users: " + users.length);
    users.forEach(function(user, index) {
        console.log("[" + index + "]: " + user.id);
    });

    users.push(user);
    console.log("Added user #" + user.id);

    // Saving
    localStorage.setItem("users", JSON.stringify(users));
};

var validateEmail = (email) => {
    var regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}

var loginUser = (unameOrEmail, password) => {

    var foundUser = null;
    console.log("user: " + unameOrEmail + ", pass: " + password);
    
    if(validateEmail(unameOrEmail)) {
        // email login
        console.log("user entered email");
        // let email = unameOrEmail;

        getAllUsers().forEach( user => {
            console.log(user);
            if(unameOrEmail == user.email && password == user.password) {
                // return logged in user
                foundUser = user;
            }
        });
    }
    else {
        // username login
        console.log("user entered username");
        // let uname = unameOrEmail

        getAllUsers().forEach( user => {
            console.log(user)
            console.log(unameOrEmail == user.name && password == user.password)
            if(unameOrEmail == user.name && password == user.password) {
                // return logged in user
                console.log(user);
                foundUser = user;
            }
        })
    }

    return foundUser;
    
}

var logoutCurrentUser = () => {
    localStorage.removeItem("currentUser");
    console.log("User Logout!");
}

var isUserLoggedIn = () => {
    var user = localStorage.getItem("currentUser");
    console.log(user);

    if(user != null && user != "") {
        return true;
    }
    else {
        return false;
    }

}

var getLoggedInUser = () => {
    var user = localStorage.getItem("currentUser");
    console.log(user);

    return user;
}

//#endregion

//#region Projects related functions

var addProject = (project) => {
    // fetching all projects
    var projects = getAllProjects();
    console.log("# of projects: " + projects.length);

    projects.push(project);
    console.log("Added project #" + project.id);

    // Saving
    localStorage.setItem("projects", JSON.stringify(projects));
};

var getAllProjects = () => {
    return JSON.parse(localStorage.getItem("projects") || "[]");
}

var getProjects = (userId) => {
    var userProjects = [];
    getAllProjects.forEach( project => {
        if(project.members.includes(userId)) {
            userProjects.push(project);
        }
    })

    return userProjects;
}

//#endregion

