let expectPrice;
let currentPrice;
let startingPrice;

const stringPrice = "Total : {{currentPrice}}{{currency}} TTC";

// Form Inputs
let bookingForm;
let arrivalDate;
let leaveDate;
let numberKids;
let numberRooms;
let numberPeople;
let breakfast;
let commentTextArea;

// Form Values
let arDate;
let leDate;
let nbDays;
let nbPeople;
let nbKids = 0; // Init at 0 to avoid over verification
let nbRooms;
let isBreakfast = false; // Init at 0 to avoid over verification
let comment;

/* Update page destination */
fetch("http://127.0.0.1:5500/json/data.json")
  .then(function (resp) {
    return resp.json();
  })
  .then(function (result) {
    var data = result;
    console.log("data", data);
    updateFunction(data);
  });

function updateFunction(data) {

  idDestination = new URLSearchParams(window.location.search).get("id");
  startingPrice = 1 * (data.destinations[idDestination - 1].price);

  document.getElementById("article").innerHTML = document.getElementById("article").innerHTML
    .replace(/{{image}}/g, data.destinations[idDestination - 1].image)
    .replace(/{{place}}/g, data.destinations[idDestination - 1].place)
    .replace(/{{country}}/g, data.destinations[idDestination - 1].country)
    .replace(/{{price}}/g, startingPrice)
    .replace(/{{details}}/g, data.destinations[idDestination - 1].details)
    .replace(/{{currency}}/g, "$")
    .replace(/{{tags}}/g, data.destinations[idDestination - 1].tags.map((a) => { return '<span class="btn tag">' + a + '</span>'; }).reduce((a, b, idx) => { return idx == 0 ? a : a + b; }));
  //d.tags tableau tags
  //Map sert à 'mapper' prendre indiv chaque elemdu tab et appliquer une fonction
  //Reduce() permet de transformerle tab en un seul élément (concatène mes chaînes de caractères) sinon concatène a + b
  //Permet au final de transformer le tableau en une seule chaîne de caractères.

}

// Update form functions 
window.addEventListener("load", function () {

  // Get Buttons
  const showFormBtn = document.getElementById("show-form-btn");
  const closeFormBtn = document.getElementById("close-form-btn");
  const addToCartBtn = document.getElementById("add-cart-btn");
  const resetBtn = document.getElementById("reset-btn");
  expectPrice = document.getElementById("expect-price");

  // Form
  bookingForm = document.getElementById("booking-form");
  arrivalDate = document.getElementById("arrival-date");
  leaveDate = document.getElementById("leave-date");
  numberKids = document.getElementById("number-kids");
  numberRooms = document.getElementById("number-rooms");
  numberPeople = document.getElementById("number-people");
  breakfast = document.getElementById("breakfast");
  commentTextArea = document.getElementById("comment-textarea");

  // Display form listeners
  closeFormBtn.addEventListener("click", function () {
    console.log("close");
    bookingForm.style.display = "none";
    closeFormBtn.style.display = "none";
    showFormBtn.style.display = "block";
    addToCartBtn.style.display = "none";
    resetBtn.style.display = "none";
  });

  showFormBtn.addEventListener("click", function () {
    console.log("display");
    bookingForm.style.display = "block";
    closeFormBtn.style.display = "block";
    showFormBtn.style.display = "none";
    addToCartBtn.style.display = "block";
    resetBtn.style.display = "block";
  });

  // Reset booking parameters
  resetBtn.addEventListener("click", function () {
    arrivalDate.value = null;
    leaveDate.value = null;
    numberPeople.value = null;
    numberKids.value = null;
    numberRooms.value = null;
    console.log("Breakfast previous value :" + breakfast.value);
    breakfast.checked = false;
    commentTextArea.value = null;
    console.log("Reset parameters");
  });

  // Onchange Listeners
  arrivalDate.addEventListener("change", function (event) {
    arDate = arrivalDate.value;
    localStorage.setItem("arrivalDate", arDate);
    updatePrice();
  });

  leaveDate.addEventListener("change", function (event) {
    leDate = leaveDate.value;
    localStorage.setItem("leaveDate", leDate);
    updatePrice();
  });

  numberPeople.addEventListener("change", function (event) {
    nbPeople = 1 * numberPeople.value;
    localStorage.setItem("nbPeople", nbPeople);
    updatePrice();
  });

  numberKids.addEventListener("change", function (event) {
    nbKids = 1 * numberKids.value;
    localStorage.setItem("nbKids", nbKids);
    updatePrice();
  });

  numberRooms.addEventListener("change", function (event) {
    nbRooms = 1 * numberRooms.value;
    localStorage.setItem("nbRooms", nbRooms);
    updatePrice();
  });

  breakfast.addEventListener("change", function (event) {
    isBreakfast = breakfast.value;
    localStorage.setItem("isBreakfast", isBreakfast);
    updatePrice();
  });

  commentTextArea.addEventListener("change", function (event) {
    comment = event.target.value;
    localStorage.setItem("comment", comment);
  });

  // Check if the date is valid (after current date), if not then execute if block
  let dateTab = document.getElementsByClassName("date");

  for (i = 0; i < dateTab.length; i++) {

    dateTab[i].addEventListener("change", function (event) {
      // convert current date to format to "YYYY-MM-DD"
      let currentDate = new Date();
      // get date from input field, by default is "YYYY-MM-DD" format
      let inputDate = new Date(event.target.value);
      if (currentDate.getTime() > inputDate.getTime()) {
        console.log("La date sélectionnée précède la date d'aujourd'hui");
        event.target.style.border = "2px solid red";
      }
      else if (arDate > leDate) {
        console.log("La date de départ précède la date d'arrivée");
        event.target.style.border = "2px solid red";
      }
      else {
        event.target.style.border = "2px solid #32cd32";

        //Get 1 day in milliseconds
        let oneDay = 1000 * 60 * 60 * 24;

        // Convert both dates to milliseconds
        let newArDate = new Date(arDate);
        let newLeDate = new Date(leDate);
        
        let arrivalDate_ms = newArDate.getTime();
        let leavingDate_ms = newLeDate.getTime();
        // milliseconds since Jan 1, 1970, 00:00:00.000 GMT

        // Calculate the difference in milliseconds
        let difference_ms = leavingDate_ms - arrivalDate_ms;
        console.log(difference_ms);
        nbDays = difference_ms / oneDay;
        console.log(nbDays);
      }
    })
  }

  addToCartBtn.addEventListener("click", function () {
    console.log("Adding to Cart");
    // Stock data of the destination in localStorage
  });

});

function updatePrice() {
  // Check if all the values are set
  // Minimum conditions are these ones, others are optionnals 
  if (arDate && leDate && nbPeople && nbRooms) {

    /* un enfant paie 40% du prix d’un adulte, quel que soit le séjour choisi. Un petit déjeuner ajoute un supplément de 
    12€ par personne et par jour. */
    console.log("Updating price");

    let breakfastAdd = 0; // Initialisaiton
    if (isBreakfast.checked == true) {
      breakfastAdd = 12;
    } 

    currentPrice = (nbDays * (startingPrice + (1 * breakfastAdd)) * (nbPeople + (0.4 * nbKids))) ;//startingPrice = 1 night for 1 adult for 1 room     

    console.log(nbDays + "*" + "(" + startingPrice + "+" + breakfastAdd + ")" + "*" + "(" + nbPeople + "+" + "(" + "0.4" + "*" + nbKids + ")" + ")") ;//startingPrice = 1 night for 1 adult for 1 room     
    console.log(currentPrice);


    expectPrice.innerText = stringPrice
      .replace(/{{currentPrice}}/g, currentPrice)
      .replace(/{{currency}}/g, "$");
  }
  else {
    expectPrice.innerText = stringPrice
      .replace(/{{currentPrice}}/g, "indéfini")
      .replace(/{{currency}}/g, "");
  }
}