// ==========================================
// ECEM ADMIN PANEL
// admin.js
// ==========================================


// ==========================================
// ADMIN LOGIN CHECK
// ==========================================

const adminLoggedIn =
localStorage.getItem("adminLoggedIn");


if(adminLoggedIn !== "true"){

    alert("Please Login First");

    window.location.href =
    "admin-login.html";

}


// ==========================================
// PAGE NAVIGATION
// ==========================================

window.goTo = function(page){

    if(!page){

        return;

    }

    window.location.href = page;

};


// ==========================================
// LOGOUT
// ==========================================

window.logout = function(){

    const confirmLogout = confirm(

        "Are you sure you want to logout?"

    );


    if(!confirmLogout){

        return;

    }


    localStorage.removeItem(

        "adminLoggedIn"

    );


    window.location.href =

    "admin-login.html";

};


// ==========================================
// CONSOLE
// ==========================================

console.log(

    "ECEM Admin Panel Loaded Successfully"

);