function insertNavBar(){
    const div = document.createElement("div");
    div.classList.add("topnav");
    div.innerHTML = `
        <div class="actions">
            <a class="home-title"  href="#">Home</a>
            <button class="menu-actions" title="Check current progress"  ><i class="fa fa-list-check fa-lg"></i></i></button>
            <button class="menu-actions"  title="Create new project" ><i class="fa fa-folder-plus fa-xl"></i></button>
            <button class="menu-actions"  title="Check current users" ><i class="fa fa-users fa-xl"></i></button>
        </div>
        
        
        <div class="actions">
            <button class="btn-action" id="profileBtn" title="My Profile"><i class="fa fa-user fa-lg"></i></button>
            <button class="btn-action" id="logOutBtn" title="Log out"><i class="fa-solid fa-right-from-bracket fa-lg"></i></button>
        </div>
    `
    document.body.insertBefore(div, document.body.firstChild);
}