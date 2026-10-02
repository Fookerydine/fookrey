// ==========================================
// ECEM SMART ONLINE EXAMINATION PORTAL
// Version 9.0
// STABLE STUDENT LOGIN SYSTEM
// ==========================================


import { database } from "./firebase-config.js";


import {

    ref,

    get

} from

"https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";


// ==========================================
// LOGIN FORM
// ==========================================

const loginForm =

document.getElementById(

    "loginForm"

);


// ==========================================
// LOGIN BUTTON
// ==========================================

const loginButton =

loginForm

? loginForm.querySelector(

    'button[type="submit"]'

)

: null;


// ==========================================
// GET INPUT ELEMENTS
// ==========================================

const studentIdInput =

document.getElementById(

    "studentId"

);


const passwordInput =

document.getElementById(

    "password"

);


// ==========================================
// CHECK FORM
// ==========================================

if(!loginForm){

    console.error(

        "Login Form Not Found"

    );

}


// ==========================================
// FIREBASE RETRY FUNCTION
// ==========================================

async function getStudentData(

    studentId

){

    let lastError;


    for(

        let attempt = 1;

        attempt <= 3;

        attempt++

    ){

        try{

            const studentRef =

            ref(

                database,

                "students/" +

                studentId

            );


            const snapshot =

            await get(

                studentRef

            );


            return snapshot;

        }


        catch(error){

            lastError = error;


            console.warn(

                "Login Attempt " +

                attempt +

                " Failed",

                error

            );


            if(

                attempt < 3

            ){

                await new Promise(

                    resolve =>

                    setTimeout(

                        resolve,

                        1000

                    )

                );

            }

        }

    }


    throw lastError;

}


// ==========================================
// LOGIN SUBMIT
// ==========================================

if(loginForm){

    loginForm.addEventListener(

        "submit",

        async function(e){

            e.preventDefault();


            // ==================================
            // READ DATA
            // ==================================

            const studentId =

            studentIdInput.value

            .trim()

            .toUpperCase();


            const password =

            passwordInput.value

            .trim();


            // ==================================
            // VALIDATION
            // ==================================

            if(

                studentId === "" ||

                password === ""

            ){

                alert(

                    "Please enter Student ID and Password."

                );

                return;

            }


            // ==================================
            // PREVENT DOUBLE LOGIN
            // ==================================

            if(loginButton){

                loginButton.disabled = true;


                loginButton.dataset.oldText =

                loginButton.innerText;


                loginButton.innerText =

                "Logging In...";

            }


            try{


                // ==================================
                // CLEAR OLD SESSION
                // ==================================

                localStorage.removeItem(

                    "currentStudent"

                );


                localStorage.removeItem(

                    "loggedInStudent"

                );


                localStorage.removeItem(

                    "studentId"

                );


                // ==================================
                // LOAD STUDENT FROM FIREBASE
                // ==================================

                const snapshot =

                await getStudentData(

                    studentId

                );


                // ==================================
                // STUDENT NOT FOUND
                // ==================================

                if(

                    !snapshot.exists()

                ){

                    alert(

                        "Student ID Not Found."

                    );

                    return;

                }


                const student =

                snapshot.val();


                // ==================================
                // PASSWORD CHECK
                // ==================================

                if(

                    String(

                        student.password

                    )

                    !==

                    String(

                        password

                    )

                ){

                    alert(

                        "Incorrect Password."

                    );

                    return;

                }


                // ==================================
                // ENSURE STUDENT ID
                // ==================================

                if(

                    !student.studentId

                ){

                    student.studentId =

                    studentId;

                }


                // ==================================
                // SAVE BOTH LOGIN SESSIONS
                // ==================================

                localStorage.setItem(

                    "currentStudent",

                    JSON.stringify(

                        student

                    )

                );


                localStorage.setItem(

                    "loggedInStudent",

                    JSON.stringify(

                        student

                    )

                );


                // ==================================
                // SAVE STUDENT ID
                // ==================================

                localStorage.setItem(

                    "studentId",

                    student.studentId

                );


                // ==================================
                // SAVE LOGIN TIME
                // ==================================

                localStorage.setItem(

                    "loginTime",

                    new Date().toISOString()

                );


                // ==================================
                // SUCCESS MESSAGE
                // ==================================

                alert(

                    "Welcome " +

                    (

                        student.studentName ||

                        "Student"

                    ) +

                    "\n\nLogin Successful."

                );


                // ==================================
                // GO TO DASHBOARD
                // ==================================

                window.location.replace(

                    "dashboard.html"

                );

            }


            catch(error){

                console.error(

                    "Student Login Error:",

                    error

                );


                alert(

                    "Unable to load student data.\n\n" +

                    "Please check your internet connection and try again."

                );

            }


            finally{

                // ==============================
                // ENABLE LOGIN BUTTON
                // ==============================

                if(loginButton){

                    loginButton.disabled =

                    false;


                    loginButton.innerText =

                    loginButton.dataset.oldText ||

                    "Login";

                }

            }

        }

    );

}


// ==========================================
// CONSOLE
// ==========================================

console.log(

    "ECEM Stable Student Login Version 9.0 Loaded Successfully"

);