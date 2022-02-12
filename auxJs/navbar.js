
let currentUser = getCurrentUser();

function insertNavBar(){
    const div = document.createElement("div");
    div.classList.add("topnav");
    div.innerHTML = `
        <div class="actions">
            <a class="home-title"  href="#">PJ Manager Pro</a>
            <button id="" class="menu-actions" title="Check current progress"  ><i class="fa fa-list-check fa-lg"></i></i></button>
            <button id="createNewProject" class="menu-actions"  title="Create new project" ><i class="fa fa-folder-plus fa-xl"></i></button>
            <button id="checkCurrentUsers" class="menu-actions"  title="Check current users" ><i class="fa fa-users fa-xl"></i></button>
        </div>
        
        
        <div class="actions">
            <button class="btn-action" id="profileBtn" title="My Profile"><i class="fa fa-user fa-lg"></i></button>
            <button class="btn-action" id="logOutBtn" title="Log out"><i class="fa-solid fa-right-from-bracket fa-lg"></i></button>
        </div>
    `

    document.body.insertBefore(div, document.body.firstChild);
    
    document.getElementById("createNewProject").addEventListener('click', showUsersDialog)
    document.getElementById("profileBtn").addEventListener('click', showProfileDialog)

}

function showUsersDialog(){

}

function validateProfileDialog(){
    let validForm = true;
    const profileUsernameEl = document.getElementById('profileUsername');
    const profileEmailEl = document.getElementById('profileEmail');
    const profileHourlyRateEl = document.getElementById('profileHourlyRate');
    const profilePassCheck = document.getElementById("profilePassCheck");
    const profilePassword = document.getElementById("profilePassword");
    const profileConfirmPassword = document.getElementById("profileConfirmPassword");
    if (profileUsernameEl.value == "" ) {
        setInputError(profileUsernameEl,"Please enter a title")
        validForm = false;
    }else{
        clearInputError(profileUsernameEl);
        setInputSuccess(profileUsernameEl);
    } 
    if (profileEmailEl.value == "" ) {
        setInputError(profileEmailEl,"Please select at least one member")
        validForm = false;
    }else {
        clearInputError(profileEmailEl);
        setInputSuccess(profileEmailEl);
    }
    if (profileHourlyRateEl.value == "" ) {
        setInputError(profileHourlyRateEl,"Please enter a description")
        validForm = false;
    }else{
        clearInputError(profileHourlyRateEl);
        setInputSuccess(profileHourlyRateEl);
    }
    if(profilePassCheck.checked){
        if (profilePassword.value == "" ) {
            setInputError(profilePassword,"Please enter a description")
            validForm = false;
        }else{
            clearInputError(profilePassword);
            setInputSuccess(profilePassword);
        }
        if (profileConfirmPassword.value == "" ) {
            setInputError(profileConfirmPassword,"Please enter a description")
            validForm = false;
        }else{
            clearInputError(profileConfirmPassword);
            setInputSuccess(profileConfirmPassword);
        }
    }
    return validForm;
}
function showProfileDialog(){
    const title = 'Edit Profile'
    const divContainer = document.createElement("div");
    divContainer.innerHTML = `
    <form class ="form id="editAccount">
        <div class="form__input-group">
            <label for="profileUsername">Username</label>
            <input type="text" id="profileUsername" class="form__input" autofocus value="${currentUser.name}">
            <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
            <label for="profileEmail">Email Address</label>
            <input type="email" id="profileEmail" class="form__input" autofocus  value="${currentUser.email}">
            <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
            <label for="profileHourlyRate">Hourly Rate</label>
            <input type="number" id="profileHourlyRate" class="form__input" autofocus  value="${currentUser.rate}">
            <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group">
            <input type="checkbox" id="profilePassCheck" name="profilePassCheck">
            <label for="profilePassCheck"> Change password ?</label><br>
        </div>
        <div class="form__input-group passGroup form__input-group_hidden">
            <label for="profilePassword">Password</label>
            <input type="password" id="profilePassword" class="form__input" autofocus value="">
            <div class="form__input-error-message"></div>
        </div>
        <div class="form__input-group passGroup form__input-group_hidden">
            <label for="profileConfirmPassword">Confirm Password</label>
            <input type="password" id="profileConfirmPassword" class="form__input" autofocus value="">
            <div class="form__input-error-message"></div>
        </div>
    </form>`;

    const buttons = [  
        { // SAVE BUTTON
          label: "Save Profile",
          onClick: (modal) => {
            // SAVE Profile DATA
            const profileUsernameEl = document.getElementById('profileUsername');
            const profileEmailEl = document.getElementById('profileEmail');
            const profileHourlyRateEl = document.getElementById('profileHourlyRate');
            const profilePassCheck = document.getElementById("profilePassCheck");
            const profilePassword = document.getElementById("profilePassword");
            // SAVE THE FORM
            if(validateProfileDialog()){
                if(profilePassCheck.checked ){
                    currentUser.password = profilePassword.value;
                }
                currentUser.name = profileUsernameEl.value;
                currentUser.email = profileEmailEl.value;
                currentUser.rate = profileHourlyRateEl.value;
                saveCurrentUser(currentUser);
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
    showModal(title, divContainer.innerHTML, buttons);
    document.getElementById("profilePassCheck").addEventListener('click', function(ev){
        if(ev.target.checked){
            document.querySelectorAll('.passGroup').forEach(element=> {element.classList.remove('form__input-group_hidden')});
        }else{
            document.querySelectorAll('.passGroup').forEach(element=> {element.classList.add('form__input-group_hidden')});
        }
    })
}