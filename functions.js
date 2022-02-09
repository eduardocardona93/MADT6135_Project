var getAllUsers = () => {
    return JSON.parse(localStorage.getItem("users") || "[]");
}

var addUser = (user) => {
    // fetching all users
    var users = JSON.parse(localStorage.getItem("users") || "[]");

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
    
    if(validateEmail(unameOrEmail)) {
        // email login
        let email = unameOrEmail;

        getAllUsers().forEach( user => {
            if(email == user.email && password == user.password) {
                // return logged in user
                return user;
            }
        });
    }
    else {
        // username login
        let uname = unameOrEmail

        getAllUsers().forEach( user => {
            if(uname == user.name && password == user.password) {
                // return logged in user
                return user;
            }
        })
    }

    return null;
    
}

