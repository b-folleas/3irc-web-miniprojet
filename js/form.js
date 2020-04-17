// Get general infos and address form fields
let unameTab;  
let emailTab;
let passwdTab;

// Store the regexes as globals so they're cached and not re-parsed on every call:

const unamePattern = /^.{4,}$/; // At least 4 caracters username
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

//const passwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})$/;

/*
/^
(?=.*\d)          // should contain at least one digit
(?=.*[a-z])       // should contain at least one lower case
(?=.*[A-Z])       // should contain at least one upper case
[a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
$/  
*/

window.addEventListener("load", function () {


    unameTab = document.getElementsByClassName("uname");
    emailTab = document.getElementsByClassName("email");
    passwdTab = document.getElementsByClassName("input-passwd");
    

    // Check if the username is valid, if not then execute if block
        for (i = 0; i < unameTab.length; i++) {
            unameTab[i].addEventListener("change", function (event) {
                if (!unamePattern.test(String(event.target.value))) {
                    event.target.style.border = "2px solid red";
                    console.log("Le nom d'utilisateur n'est pas valide.");
                }
                else {
                    event.target.style.border = "2px solid green";
                }
            })
        }

    // Check if the email is valid, if not then execute if block
    for (i = 0; i < emailTab.length; i++) {
        emailTab[i].addEventListener("change", function (event) {
            if (!emailPattern.test(String(event.target.value).toLowerCase())) {
                event.target.style.border = "2px solid red";
                console.log("L'adresse email n'est pas valide.");
            }
            else {
                event.target.style.border = "2px solid green";
            }
        })
    }

    // Check if the password is valid, if not then execute if block
    for (i = 0; i < passwdTab.length; i++) {
        passwdTab[i].addEventListener("change", function (event) {
            console.log("Checking passwd");
            if (!passwdPattern.test(String(event.target.value))) {
                event.target.style.border = "2px solid red";
                console.log(event.target.value);
                console.log("Le mot de passe n'est pas valide.");
            }
            else {
                event.target.style.border = "2px solid green";
            }
        })
    }
});