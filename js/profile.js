// Get general infos and address form fields
const uname = document.getElementById("uname");
const email = document.getElementById("email");
const lname = document.getElementById("lname");
const fname = document.getElementById("fname");
const addrRoad = document.getElementById("address-road");
const addrCp = document.getElementById("address-cp");
const city = document.getElementById("city");
const country = document.getElementById("country");
const addCardBtn = document.getElementById("add-card-btn");
const oldPasswd = document.getElementById("old-passwd");
const newPasswd = document.getElementById("new-passwd");
const confirmPasswd = document.getElementById("confirm-passwd");

// Get card infos fields
let cardOwnerTab = document.getElementsByClassName("card-owner");
let cardNumberTab = document.getElementsByClassName("card-number");
let cardExpTab = document.getElementsByClassName("card-exp");
let cardCvvTab = document.getElementsByClassName("card-cvv");

let cardsTab = [];
let currentCard;

let trashIcon = document.getElementsByClassName("fa-trash");

// Store the regexes as globals so they're cached and not re-parsed on every call:
const onlyStringPattern = /^[a-zA-Z]+$/;
const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const masterCardPattern = /^(?:5[1-5][0-9]{14})$/;
const cvvPattern = /[0-9]\d\d/;
const dateCardPattern = /^(0[1-9]|10|11|12)(-)[0-9]{2}$/;

window.addEventListener("load", function () {

    // Check if the owner name is valid, if not then execute if block
    for (i = 0; i < cardOwnerTab.length; i++) {
        cardOwnerTab[i].addEventListener("change", function (event) {
            if (!onlyStringPattern.test(event.target.value)) {
                console.log("Le nom du propriétaire de la carte n'est pas valide.");
                event.target.style.border = "2px solid red";
            }
            else {
                event.target.style.border = "2px solid green";
            }
        })
    }

    // Check if the card number is valid, if not then execute if block
    for (i = 0; i < cardNumberTab.length; i++) {
        cardNumberTab[i].addEventListener("change", function (event) {
            if (!visaPattern.test(event.target.value || !masterCardPattern.test(event.target.value))) {
                event.target.style.border = "2px solid red";
                console.log("Le numéro de carte n'est pas valide.");
            }
            else {
                event.target.style.border = "2px solid green";
            }
        })
    }

    // Check if the card expire date is valid, if not then execute if block
    for (i = 0; i < cardExpTab.length; i++) {
        cardExpTab[i].addEventListener("change", function (event) {
            if (!dateCardPattern.test(event.target.value)) {
                event.target.style.border = "2px solid red";
                console.log("Le date d'expiration n'est pas valide.");
            }
            else {
                event.target.style.border = "2px solid green";
            }
        })
    }

    // Check if the card cvv is valid, if not then execute if block
    for (i = 0; i < cardCvvTab.length; i++) {
        cardCvvTab[i].addEventListener("change", function (event) {
            if (!cvvPattern.test(event.target.value)) {
                console.log(cardCvvTab[i]);
                event.target.style.border = "2px solid red";
                console.log("Le numéro CVV de la carte n'est pas valide.");
            }
            else {
                event.target.style.border = "2px solid green";
            }
        })
    }

    // Adding new card on click listener
    
    addCardBtn.addEventListener("click", function () {

        document.getElementById("card-form").innerHTML +=
            `<row class="card-row">
			<input type="text" class="card-owner" name="card-owner" placeholder="Titulaire de la carte">
			<input class="card-number long-input" type="text" name="card-number" placeholder="Numéro de carte">
			<input type="text" class="card-exp" name="date-expiration" title="Date d'expiration" placeholder="Date d'expiration">
			<input type="text" class="card-cvv" name="cvv-code" placeholder="Code CVV">
			<i id="cvv-info" class="fa fa-info-circle" title="Il s'agit du cryptogramme au dos de votre carte"></i>
			<i class="fa fa-trash" title="Supprimer cette carte"></i>		
			</row>
            `;

        // Refresh Listeners for Cards (Because we just added new cards, we have to re-affect the variables to their new lists of items)
        cardOwnerTab = document.getElementsByClassName("card-owner");
        cardNumberTab = document.getElementsByClassName("card-number");
        cardExpTab = document.getElementsByClassName("card-exp");
        cardCvvTab = document.getElementsByClassName("card-cvv");


        // Add the trash icon to the list of trash buttons for cards
        for (i = 0; i < trashIcon.length; i++) {
            trashIcon[i].addEventListener("click", function (event) {
                var rowToRemove = event.currentTarget.parentNode;
                rowToRemove.parentNode.removeChild(rowToRemove);
            })
        }
    });

    // Add the trash icon to the list of trash buttons for the first card (so index 0)
    trashIcon[0].addEventListener("click", function (event) {
        var rowToRemove = event.currentTarget.parentNode;
        rowToRemove.parentNode.removeChild(rowToRemove);
    })
});

window.addEventListener("load", function () {

    // Display the value if not null to user
    if (localStorage.getItem("uname")) {
        uname.setAttribute("value", this.localStorage.getItem("uname"));
    }
    if (localStorage.getItem("email")) {
        email.setAttribute("value", this.localStorage.getItem("email"));
    }
    if (localStorage.getItem("lname")) {
        lname.setAttribute("value", this.localStorage.getItem("lname"));
    }
    if (localStorage.getItem("fname")) {
        fname.setAttribute("value", this.localStorage.getItem("fname"));
    }
    if (localStorage.getItem("addrRoad")) {
        addrRoad.setAttribute("value", this.localStorage.getItem("addrRoad"));
    }
    if (localStorage.getItem("addrCp")) {
        addrCp.setAttribute("value", this.localStorage.getItem("addrCp"));
    }
    if (localStorage.getItem("city")) {
        city.setAttribute("value", this.localStorage.getItem("city"));
    }
    if (localStorage.getItem("country")) {
        country.setAttribute("value", this.localStorage.getItem("country"));
    }

    // Display the value of cards if not null to user
    if (localStorage.getItem("cardsTab")) {
        console.log(cardsTab);
        let card = JSON.parse(localStorage.getItem("cardsTab"));

        console.log(card.cardOwner);
    }


    document.getElementById("save-btn").addEventListener("click", function (event) {
        console.log("save");

        // Add user general data to localStorage
        if (uname.value) {
            localStorage.setItem("uname", uname.value);
        }
        if (email.value) {
            localStorage.setItem("email", email.value);
        }
        if (lname.value) {
            localStorage.setItem("lname", lname.value);
        }
        if (fname.value) {
            localStorage.setItem("fname", fname.value);
        }

        // Add user address data to localStorage
        if (addrRoad.value) {
            localStorage.setItem("addrRoad", addrRoad.value);
        }
        if (addrCp.value) {
            localStorage.setItem("addrCp", addrCp.value);
        }
        if (city.value) {
            localStorage.setItem("city", city.value);
        }
        if (country.value) {
            localStorage.setItem("country", country.value);
        }

        // Add a list of cards in localStorage
        for (i = 0; i < cardOwnerTab.length; i++) { //Here we take cardOwnerTab for the length but it doesn't matter as long as we have the number of cards
            currentCard = { "cardOwner": cardOwnerTab.item(i).value, "cardNumber": cardNumberTab.item(i).value, "cardExp": cardExpTab.item(i).value, "cardCvv": cardCvvTab.item(i).value };
            cardsTab.push(currentCard);
            // We assume that the card is valid due to previous validation
            console.log("Cards Tab :" + JSON.stringify(cardsTab[i]));
        }
        localStorage.setItem("cardsTab", cardsTab);
    });


    // Password Verification
    document.getElementById("password-btn").addEventListener("click", function () {
        // Check if password are equals
        console.log("test mdp");
        if (newPasswd.value == confirmPasswd.value) {
            console.log("Les mdp sont bien égaux");
            localStorage.setItem("passwd", newPasswd.value);
            console.log(localStorage);
        }
    });

    // Change vision of password field
    document.getElementById("eye-passwd").addEventListener("click", function () {
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
    });


});