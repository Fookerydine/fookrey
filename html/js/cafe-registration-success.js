// ==========================================
// ECEM Online Examination Portal
// Version 7.1
// registration-success.js (Part 1)
// ==========================================

// Get Student Data from Local Storage

const studentData = JSON.parse(

    localStorage.getItem("registrationData")

);

// If No Data Found

if (!studentData) {

    alert("Registration data not found.");

    window.location.href = "register.html";

}

// ==========================================
// Show Student Details
// ==========================================

document.getElementById("studentName").textContent =
studentData.studentName;

document.getElementById("studentId").textContent =
studentData.studentId;

document.getElementById("studentPassword").textContent =
studentData.password;

document.getElementById("course").textContent =
studentData.course;

document.getElementById("mobile").textContent =
studentData.mobile;

document.getElementById("regDate").textContent =
studentData.registrationDate;

// ==========================================
// Print Button
// ==========================================

document.getElementById("printBtn").addEventListener("click", () => {

    window.print();

});

// ==========================================
// PDF Button
// ==========================================

document.getElementById("pdfBtn").addEventListener("click", () => {

    window.print();

});

// ==========================================
// Login Button
// ==========================================

const loginBtn = document.querySelector(".login-btn");

if(loginBtn){

    loginBtn.addEventListener("click", () => {

        localStorage.removeItem("registeredStudent");

    });

}

// ==========================================
// Show Student Photo
// ==========================================

console.log(studentData);
console.log("Photo =", studentData.photo);

if(studentData.photo){

    document.getElementById("studentPhoto").src = studentData.photo;

}

// ==========================================
// Registration Date
// ==========================================

if(!studentData.registrationDate){

    const today = new Date();

    document.getElementById("regDate").textContent =
    today.toLocaleDateString("en-IN");

}

// ==========================================
// Security
// ==========================================

history.pushState(null, null, location.href);

window.onpopstate = function () {

    history.go(1);

};

// ==========================================
// End
// ==========================================
