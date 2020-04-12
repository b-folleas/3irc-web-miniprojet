/* Vérification formulaire */

// Store the regexes as globals so they're cached and not re-parsed on every call:
var onlyStringPattern = /^[a-zA-Z]+$/;
var visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
var masterCardPattern = /^(?:5[1-5][0-9]{14})$/;
var cvvPattern = /[0-9]\d\d/;
var dateCardPattern = /^(0[1-9]|10|11|12)(-)[0-9]{2}$/;
var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Check if the owner name is valid, if not then execute if block
window.addEventListener("load", function () {
    var ownerTab = document.getElementsByClassName("card-owner");

    for (i = 0; i < ownerTab.length; i++) {
        ownerTab[i].addEventListener("focusout", function (event) {
            if (!onlyStringPattern.test(event.target.value)) {
                alert("Le nom du propriétaire de la carte n'est pas valide.");
            }
        })
    }
});

// Check if the card number is valid, if not then execute if block
window.addEventListener("load", function () {
    var cardNumberTab = document.getElementsByClassName("card-number");

    for (i = 0; i < cardNumberTab.length; i++) {
        cardNumberTab[i].addEventListener("focusout", function (event) {
            if (!visaPattern.test(event.target.value || !masterCardPattern.test(event.target.value))) {
                //alert("Le numéro de carte n'est pas valide.");
            }
        })
    }
});

// Check if the card expire date is valid, if not then execute if block
window.addEventListener("load", function () {
    var cardExpTab = document.getElementsByClassName("card-exp");

    for (i = 0; i < cardExpTab.length; i++) {
        cardExpTab[i].addEventListener("focusout", function (event) {
            if (!dateCardPattern.test(event.target.value)) {
                //alert("Le date d'expiration n'est pas valide.");
            }
        })
    }
});

// Check if the card cvv is valid, if not then execute if block
window.addEventListener("load", function () {
    var cardCvvTab = document.getElementsByClassName("card-cvv");

    for (i = 0; i < cardCvvTab.length; i++) {
        cardCvvTab[i].addEventListener("focusout", function (event) {
            if (!cvvPattern.test(event.target.value)) {
                //alert("Le numéro CVV de la carte n'est pas valide.");
            }
        })
    }
});

// Check if the email address is valid, if not then execute if block
window.addEventListener("load", function () {
    var emailTab = document.getElementsByClassName("email");

    for (i = 0; i < emailTab.length; i++) {
        emailTab[i].addEventListener("focusout", function (event) {
            if (!emailPattern.test(String(event.target.value).toLowerCase())) {
                //alert("L'adresse email n'est pas valide.");
            }


        })
    }
});

console.log("toto");

// Check if the date is valid, if not then execute if block
window.addEventListener("load", function () {
    var dateTab = document.getElementsByClassName("date");

    for (i = 0; i < dateTab.length; i++) {
        console.log("Get in for");

        dateTab[i].addEventListener("focusout", function (event) {

            // convert current date to format to "YYYY-MM-DD"
            var currentDate = new Date().toJSON().slice(0, 10);

            // get date from input field, by default is "YYYY-MM-DD" format
            var inputDate = document.getElementById(dateTab[i].value);

            if (currentDate > inputDate) {
                alert("La date sélectionnée précède la date d'aujourd'hui");
            }

        })
    }



});

// Display Adding Cart Form
window.addEventListener("load", function () {
    document.getElementById("cardForm").addEventListener("onclick", function (event) {
        if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
            console.log("Les dates sont =");// Date equals today's date
        }

    });
});




function displayBookingForm() {
    document.getElementById("booking-form").style.display = 'block';
    document.getElementById("destination-btn").innerText = 'Ajouter au panier'
}

function hideBookingForm() {
    document.getElementById("booking-form").style.display = 'none';
    document.getElementById("destination-btn").innerText = 'Réserver'
}



