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
let cardOwnerTab;
let cardNumberTab;
let cardExpTab;
let cardCvvTab;
let trashIcon;

let cardsTab = [];
let currentCard;

// Cards validators 
let cardOwnerIsValid;
let cardNumberIsValid;
let cardExpDateIsValid;
let cardCvvIsValid;



// Store the regexes as globals so they're cached and not re-parsed on every call:
const onlyStringPattern = /^[a-zA-Z]+$/;
const visaPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const masterCardPattern = /^(?:5[1-5][0-9]{14})$/;
const cvvPattern = /[0-9]\d\d/;
const dateCardPattern = /^(0[1-9]|10|11|12)(-)[0-9]{2}$/;

window.addEventListener("load", function () {


    // Adding new card on click listener

    addCardBtn.addEventListener("click", function () {

        document.getElementById("card-form").innerHTML +=
            `<row class="card-row">
			<input type="text" class="card-owner" name="card-owner" placeholder="Titulaire de la carte">
			<input class="card-number long-input" type="text" name="card-number" placeholder="Numéro de carte">
			<input type="text" class="card-exp" name="date-expiration" title="Date d'expiration" placeholder="Date d'expiration">
			<i id="cvv-info" class="fa fa-info-circle" title="Au format MM-AA"></i>
			<input type="text" class="card-cvv" name="cvv-code" placeholder="Code CVV">
			<i id="cvv-info" class="fa fa-info-circle" title="Il s'agit du cryptogramme au dos de votre carte"></i>
			<i class="fas fa-trash" title="Supprimer cette carte"></i>		
			</row>
            `;

        // Refresh Listeners for Cards (Because we just added new cards, we have to re-affect the variables to their new lists of items)
        cardOwnerTab = document.getElementsByClassName("card-owner");
        cardNumberTab = document.getElementsByClassName("card-number");
        cardExpTab = document.getElementsByClassName("card-exp");
        cardCvvTab = document.getElementsByClassName("card-cvv");
        trashIcon = document.getElementsByClassName("fa-trash");
        // Display the value of cards if not null to user when the listof card is changed
        updateCardList();

        if (cardOwnerTab) {
            // Check if the owner name is valid, if not then execute if block
            for (i = 0; i < cardOwnerTab.length; i++) {
                cardOwnerTab[i].addEventListener("change", function (event) {
                    if (onlyStringPattern.test(event.target.value) && event.target.value) {
                        event.target.style.border = "2px solid green";
                        cardOwnerIsValid = true;
                    }
                    else {
                        console.log("Le nom du propriétaire de la carte n'est pas valide.");
                        event.target.style.border = "2px solid red";
                    }
                })
            }

        }

        // Check if the card number is valid, if not then execute if block
        for (i = 0; i < cardNumberTab.length; i++) {
            cardNumberTab[i].addEventListener("change", function (event) {
                if ((visaPattern.test(event.target.value) || masterCardPattern.test(event.target.value)) && event.target.value) {
                    event.target.style.border = "2px solid green";
                    cardNumberIsValid = true;
                }
                else {
                    event.target.style.border = "2px solid red";
                    console.log("Le numéro de carte n'est pas valide.");
                }
            })
        }



        if (cardExpTab) {
            // Check if the card expire date is valid, if not then execute if block
            for (i = 0; i < cardExpTab.length; i++) {
                cardExpTab[i].addEventListener("change", function (event) {
                    if (dateCardPattern.test(event.target.value) && event.target.value) {
                        event.target.style.border = "2px solid green";
                        cardExpDateIsValid = true;
                    }
                    else {
                        event.target.style.border = "2px solid red";
                        console.log("Le date d'expiration n'est pas valide.");
                    }
                })
            }

        }

        if (cardCvvTab) {
            // Check if the card cvv is valid, if not then execute if block
            for (i = 0; i < cardCvvTab.length; i++) {
                cardCvvTab[i].addEventListener("change", function (event) {
                    if (cvvPattern.test(event.target.value) && event.target.value) {
                        event.target.style.border = "2px solid green";
                        cardCvvIsValid = true;}
                    else {
                        event.target.style.border = "2px solid red";
                        console.log("Le numéro CVV de la carte n'est pas valide.");
                        }
                })
            }
        }

        // Also called on load for the first card
        updateCardList();
    });



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

    document.getElementById("save-btn").addEventListener("click", function (event) {
        console.log("Saving...");

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

        // Add user cards list to localStorage

        let cardsTab;
        let cardsTabItem;
        cardsTabItem = localStorage.getItem("cardsTab");
        if (cardsTabItem) {
            cardsTab = JSON.parse(cardsTabItem);
        }
        else {
            cardsTab = [];
        }

        // Add a list of cards in localStorage
        for (i = 0; i < cardOwnerTab.length; i++) { //Here we take cardOwnerTab for the length but it doesn't matter as long as we have the number of cards

            // We check if the card is valid first 
            if (cardOwnerIsValid && cardNumberIsValid && cardExpDateIsValid && cardCvvIsValid) {
                currentCard = {
                    "cardOwner": cardOwnerTab.item(i).value,
                    "cardNumber": cardNumberTab.item(i).value,
                    "cardExp": cardExpTab.item(i).value,
                    "cardCvv": cardCvvTab.item(i).value
                };
                cardsTab.push(currentCard);
                alert("La carte de paiement à été mis à jour");
            }
            else {
                alert("La carte de paiement n'a pas pu être ajoutée");
                console.log("cardOwnerIsValid" + cardOwnerIsValid + "cardNumberIsValid" + cardNumberIsValid + "cardExpDateIsValid" + cardExpDateIsValid + "cardCvvIsValid" + cardCvvIsValid);
            }
        }
        localStorage.setItem("cardsTab", JSON.stringify(cardsTab));
        console.log("Cards Tab :" + localStorage.getItem("cardsTab"));
    });


    // Password Verification
    document.getElementById("password-btn").addEventListener("click", function () {
        // Check if password are equals
        console.log("test mdp");
        if (newPasswd.value == confirmPasswd.value) {
            console.log("Les mdp sont bien égaux");
            localStorage.setItem("passwd", newPasswd.value);
            alert("Votre mot de passe à été mis à jour");
        }
    });

    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.clear();
        window.location.assign("./index.html");
        window.onload = function () {
            alert("Vous avez été déconnecté");
        };
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

    if (cardOwnerTab) {
        console.log(cardOwnerTab.length);
    }
});

// Display value of card if not null and add trash button listener
function updateCardList() {
    if (localStorage.getItem("cardsTab")) {
        console.log(cardsTab);
        let card = JSON.parse(localStorage.getItem("cardsTab"));
        if (card.length >= 1) {
            console.log(card[0].cardOwner);
            for (i = 0; i < cardOwnerTab.length; i++) { // Here we take cardOwnerTab for the length but it doesn't matter as long as we have the number of cards
                if (card[i]) {
                    cardOwnerTab[i].value = card[i].cardOwner;
                    cardNumberTab[i].value = card[i].cardNumber.replace(/.{12}$/, "-****-****-****"); // Change card field to hide it's value (Regex to improve)
                    cardExpTab[i].value = card[i].cardExp;
                    cardCvvTab[i].value = card[i].cardCvv;
                }
                trashIcon[i].addEventListener("click", function (event) {
                    var rowToRemove = event.currentTarget.parentNode;
                    rowToRemove.parentNode.removeChild(rowToRemove);
                })

            }
        }
    }
}