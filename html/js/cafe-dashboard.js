/* ==========================================
   ECEM LIVE QUIZ SYSTEM
   Version 5.0
   admin-dashboard.js
========================================== */

// ==========================================
// Admin Login Check
// ==========================================

const adminLoggedIn = localStorage.getItem("adminLoggedIn");

if(adminLoggedIn !== "true"){

    alert("Please Login as Admin");

    window.location.href = "cafe-login.html";

}

// ==========================================
// Load Students
// ==========================================

const students =
JSON.parse(localStorage.getItem("students")) || [];

document.getElementById("totalStudents").innerHTML =
students.length;

// ==========================================
// Load Questions
// ==========================================

let totalQuestions = 0;

if(typeof questions !== "undefined"){

    totalQuestions = questions.length;

}

document.getElementById("totalQuestions").innerHTML =
totalQuestions;

// ==========================================
// Load Results
// ==========================================

const results =
JSON.parse(localStorage.getItem("resultHistory")) || [];

document.getElementById("totalResults").innerHTML =
results.length;

// ==========================================
// Quiz Status
// ==========================================

const quizStatus =
localStorage.getItem("contestStatus") || "LIVE";

document.getElementById("quizStatus").innerHTML =
quizStatus;

// ==========================================
// Dashboard Statistics
// ==========================================

console.log("Students :",students.length);

console.log("Questions :",totalQuestions);

console.log("Results :",results.length);

console.log("Quiz Status :",quizStatus);

// ==========================================
// Logout
// ==========================================

document.getElementById("logoutBtn")

.addEventListener("click",function(){

let confirmLogout = confirm(

"Do you really want to Logout?"

);

if(confirmLogout){

localStorage.removeItem(

"adminLoggedIn"

);

window.location.href="admin-login.html";

}

});

// ==========================================
// Live Refresh
// ==========================================

setInterval(function(){

location.reload();

},15000);

// ==========================================
// Welcome Message
// ==========================================

console.log(

"Welcome to ECEM Admin Dashboard"

);