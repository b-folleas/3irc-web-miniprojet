/* Vérification formulaire */

// Store the regexes as globals so they're cached and not re-parsed on every call:
const onlyStringPattern = /^[a-zA-Z]+$/;
const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const masterCardPattern = /^(?:5[1-5][0-9]{14})$/;
const cvvPattern = /[0-9]\d\d/;
const dateCardPattern = /^(0[1-9]|10|11|12)(-)[0-9]{2}$/;
const unamePattern = /^.{4,}$/; // At least 4 caracters username
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
/*
/^
(?=.*\d)          // should contain at least one digit
(?=.*[a-z])       // should contain at least one lower case
(?=.*[A-Z])       // should contain at least one upper case
[a-zA-Z0-9]{8,}   // should contain at least 8 from the mentioned characters
$/  
*/

// Check if the owner name is valid, if not then execute if block
window.addEventListener("load", function () {
    let ownerTab = document.getElementsByClassName("card-owner");

    for (i = 0; i < ownerTab.length; i++) {
        ownerTab[i].addEventListener("focusout", function (event) {
            if (!onlyStringPattern.test(event.target.value)) {
                alert("Le nom du propriétaire de la carte n'est pas valide.");
                event.target.style.border = "2px solid red";
            }
        })
    }
});

// Check if the card number is valid, if not then execute if block
window.addEventListener("load", function () {
    let cardNumberTab = document.getElementsByClassName("card-number");

    for (i = 0; i < cardNumberTab.length; i++) {
        cardNumberTab[i].addEventListener("focusout", function (event) {
            if (!visaPattern.test(event.target.value || !masterCardPattern.test(event.target.value))) {
                event.target.style.border = "2px solid red";
                //console.log("Le numéro de carte n'est pas valide.");
            }
        })
    }
});

// Check if the card expire date is valid, if not then execute if block
window.addEventListener("load", function () {
    let cardExpTab = document.getElementsByClassName("card-exp");

    for (i = 0; i < cardExpTab.length; i++) {
        cardExpTab[i].addEventListener("focusout", function (event) {
            if (!dateCardPattern.test(event.target.value)) {
                event.target.style.border = "2px solid red";
                //console.log("Le date d'expiration n'est pas valide.");
            }
        })
    }
});

// Check if the card cvv is valid, if not then execute if block
window.addEventListener("load", function () {
    let cardCvvTab = document.getElementsByClassName("card-cvv");

    for (i = 0; i < cardCvvTab.length; i++) {
        cardCvvTab[i].addEventListener("focusout", function (event) {
            if (!cvvPattern.test(event.target.value)) {
                event.target.style.border = "2px solid red";
                //console.log("Le numéro CVV de la carte n'est pas valide.");
            }
        })
    }
});

// Check if the username is valid, if not then execute if block
window.addEventListener("load", function () {
    let username = document.getElementById("uname");

        username.addEventListener("focusout", function (event) {
            if (!unamePattern.test(String(event.target.value).toLowerCase())) {
                event.target.style.border = "2px solid red";
                console.log("Le nom d'utilisateur n'est pas valide.");
            }


        })
    
});

// Check if the email address is valid, if not then execute if block
window.addEventListener("load", function () {
    let emailTab = document.getElementsByClassName("email");

    for (i = 0; i < emailTab.length; i++) {
        emailTab[i].addEventListener("focusout", function (event) {
            if (!emailPattern.test(String(event.target.value).toLowerCase())) {
                event.target.style.border = "2px solid red";
                //console.log("L'adresse email n'est pas valide.");
            }


        })
    }
});

//Password Verification
window.addEventListener("load", function () {

    let oldPasswd = this.document.getElementById("old-passwd");
    let newPasswd = document.getElementById("new-passwd");
    let confirmPasswd = document.getElementById("confirm-passwd");

    let passwdTab = document.getElementsByClassName("input-passwd");

    for (i = 0; i < passwdTab.length; i++) {
        passwdTab[i].addEventListener("focusout", function (event) {
            console.log("Check passwd");
            if (!passwdPattern.test(String(event.target.value))) {
                console.log("Le mot de passe n'est pas valide.");
                event.target.style.border = "2px solid red";
            }
        })
    }

    document.getElementById("password-btn").onclick = function () {
        // Check if password are equals
        console.log("test mdp");
        if (newPasswd.value == confirmPasswd.value) {
            console.log("Les mdp sont bien égaux");
            localStorage.setItem("passwd", newPasswd.value);
            console.log(localStorage);
        }
    };

    this.document.getElementById("eye-passwd").onclick = function () {
        if (oldPasswd.getAttribute("type") == "password") {
            oldPasswd.setAttribute("type", "text");
            newPasswd.setAttribute("type", "text");
            confirmPasswd.setAttribute("type", "text");
        }
        else {
            oldPasswd.setAttribute("type", "password");
            newPasswd.setAttribute("type", "password");
            confirmPasswd.setAttribute("type", "password");
        }
    }


});






// Check if the date is valid, if not then execute if block
window.addEventListener("load", function () {
    let dateTab = document.getElementsByClassName("date");

    for (i = 0; i < dateTab.length; i++) {
        console.log("Get in for");

        dateTab[i].addEventListener("focusout", function (event) {

            // convert current date to format to "YYYY-MM-DD"
            let currentDate = new Date().toJSON().slice(0, 10);

            // get date from input field, by default is "YYYY-MM-DD" format
            let inputDate = document.getElementById(dateTab[i].value);

            if (currentDate > inputDate) {
                alert("La date sélectionnée précède la date d'aujourd'hui");
            }

        })
    }
});

window.addEventListener("load", function () {
    document.getElementById("card-form").addEventListener("onclick", function (event) {
        if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
            console.log("Les dates sont =");// Date equals today's date
        }

    });
});




