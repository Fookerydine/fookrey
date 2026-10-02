// ==========================================
// ECEM SMART ONLINE EXAMINATION PORTAL
// Version 9.1
// register.js
// Student Registration System
// ==========================================

import { database } from "./firebase-config.js";

import {
    ref,
    get,
    set,
    runTransaction
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";


// ==========================================
// REGISTRATION FORM
// ==========================================

const registerForm =
document.getElementById("registerForm");


// ==========================================
// GENERATE STUDENT ID + COUNTER
// ==========================================

async function generateStudentId(){

    const counterRef =
    ref(database, "settings/studentCounter");

    const result =
    await runTransaction(

        counterRef,

        currentValue => {

            return (currentValue || 0) + 1;

        }

    );


    const counter =
    result.snapshot.val();


    const year =
    new Date().getFullYear().toString().slice(-2);


    const studentId =

    "ECEM" +

    year +

    String(counter)

    .padStart(4, "0");


    return {

        studentId,

        counter

    };

}


// ==========================================
// GENERATE PASSWORD
// ==========================================

function generatePassword(){

    return Math.floor(

        100000 +

        Math.random() * 900000

    ).toString();

}


// ==========================================
// PHOTO TO BASE64
// ==========================================

function convertImageToBase64(file){

    return new Promise(

        (resolve, reject) => {

            const reader =
            new FileReader();


            reader.onload = function(){

                resolve(

                    reader.result

                );

            };


            reader.onerror = reject;


            reader.readAsDataURL(file);

        }

    );

}


// ==========================================
// REGISTRATION SUBMIT
// ==========================================

registerForm.addEventListener(

"submit",

async function(e){

    e.preventDefault();


    try{


        // ==================================
        // READ FORM DATA
        // ==================================

        const studentName =

        document.getElementById(

            "studentName"

        ).value.trim();


        const fatherName =

        document.getElementById(

            "fatherName"

        ).value.trim();


        const motherName =

        document.getElementById(

            "motherName"

        )?.value.trim() || "";


        const mobile =

        document.getElementById(

            "mobile"

        ).value.trim();


        const email =

        document.getElementById(

            "email"

        )?.value.trim() || "";


        const dob =

        document.getElementById(

            "dob"

        )?.value || "";


        const gender =

        document.getElementById(

            "gender"

        )?.value || "";


        const course =

        document.getElementById(

            "course"

        ).value;


        const batch =

        document.getElementById(

            "batch"

        )?.value || "";


        const address =

        document.getElementById(

            "address"

        )?.value.trim() || "";


        const state =

        document.getElementById(

            "state"

        )?.value || "";


        const district =

        document.getElementById(

            "district"

        )?.value || "";


        const pincode =

        document.getElementById(

            "pincode"

        )?.value.trim() || "";


        const photoInput =

        document.getElementById(

            "photo"

        );


        // ==================================
        // BASIC VALIDATION
        // ==================================

        if(

            studentName === "" ||

            fatherName === "" ||

            mobile === "" ||

            course === ""

        ){

            alert(

                "Please fill all required fields."

            );

            return;

        }


        // ==================================
        // CHECK EXISTING STUDENTS
        // ==================================

        const studentsSnapshot =

        await get(

            ref(

                database,

                "students"

            )

        );


        if(

            studentsSnapshot.exists()

        ){

            const students =

            studentsSnapshot.val();


            for(

                const id in students

            ){

                const student =

                students[id];


                if(

                    student.mobile ===

                    mobile

                ){

                    alert(

                        "This mobile number is already registered."

                    );

                    return;

                }


                if(

                    email !== "" &&

                    student.email ===

                    email

                ){

                    alert(

                        "This email is already registered."

                    );

                    return;

                }

            }

        }


        // ==================================
        // GENERATE STUDENT ID
        // ==================================

        const idData =

        await generateStudentId();


        const studentId =

        idData.studentId;


        // ==================================
        // GENERATE ROLL NUMBER
        // ==================================

        const rollNumber =

        "ECEM-" +

        String(

            idData.counter

        )

        .padStart(

            4,

            "0"

        );


        // ==================================
        // GENERATE PASSWORD
        // ==================================

        const password =

        generatePassword();


        // ==================================
        // PHOTO
        // ==================================

        let photo = "";


        if(

            photoInput &&

            photoInput.files.length > 0

        ){

            photo =

            await convertImageToBase64(

                photoInput.files[0]

            );

        }


        // ==================================
        // STUDENT DATA
        // ==================================

        const studentData = {


            studentId,


            rollNumber,


            password,


            studentName,


            fatherName,


            motherName,


            mobile,


            email,


            dob,


            gender,


            course,


            batch,


            address,


            state,


            district,


            pincode,


            photo,


            registrationDate:

            new Date().toLocaleString(

                "en-IN"

            ),


            examStatus:

            "Not Attempted",


            marks: 0,


            correct: 0,


            wrong: 0,


            percentage: 0,


            rank: "-"

        };


        // ==================================
        // SAVE STUDENT
        // ==================================

        await set(

            ref(

                database,

                "students/" +

                studentId

            ),

            studentData

        );


        // ==================================
        // SUCCESS
        // ==================================

        alert(

            "🎉 Registration Successful!\n\n" +

            "Student ID: " +

            studentId +

            "\n\n" +

            "Roll Number: " +

            rollNumber +

            "\n\n" +

            "Password: " +

            password

        );


        // ==================================
        // RESET FORM
        // ==================================

        registerForm.reset();


        // ==================================
        // OPTIONAL LOGIN PAGE
        // ==================================

        window.location.href =

        "login.html";


    }


    catch(error){


        console.error(

            "Registration Error:",

            error

        );


        alert(

            "Registration Failed.\n\n" +

            error.message

        );

    }

});


// ==========================================
// CONSOLE
// ==========================================

console.log(

    "ECEM Student Registration System Loaded Successfully"

);