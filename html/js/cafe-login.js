/* ==========================================
   ECEM SMART ONLINE EXAMINATION PORTAL
   Version 9.0
   admin-login.js
========================================== */

// ==========================================
// Default Admin Account
// ==========================================

const defaultAdmin = {

    username: "admin",

    password: "admin123"

};

// Save Default Admin (First Time Only)

if(localStorage.getItem("adminAccount") === null){

    localStorage.setItem(

        "adminAccount",

        JSON.stringify(defaultAdmin)

    );

}

// ==========================================
// Admin Login Form
// ==========================================

const loginForm = document.getElementById("adminLoginForm");

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    const admin = JSON.parse(

        localStorage.getItem("adminAccount")

    );

    // ======================================
    // Login Success
    // ======================================

    if(

        username === admin.username &&

        password === admin.password

    ){

        // Admin Login Status

        localStorage.setItem(

            "adminLoggedIn",

            "true"

        );

        alert("Welcome Admin");

       window.location.href = "admin.html";

    }

    // ======================================
    // Login Failed
    // ======================================

    else{

        alert("Invalid Username or Password");

    }

});