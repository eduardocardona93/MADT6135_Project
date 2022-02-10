var getAllUsers = () => {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

var generateUniqueId = () => {
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

var saveCurrentUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
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

