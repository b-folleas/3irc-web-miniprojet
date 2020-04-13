/* Vérification formulaire */


const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


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








