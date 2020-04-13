let expectPrice;
let currentPrice = 0;

const stringPrice = "Total : {{currentPrice}}{{currency}} TTC";

let bookingForm;
let arriveDate;
let leaveDate;
let numberKids;
let numberRooms;
let numberPeople;
let breakfast;

// Form Values
let arDate;
let leDate;
let nbPeople;
let nbKids;
let nbRooms;
let isBreakfast;

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

  document.getElementById("article").innerHTML = document.getElementById("article").innerHTML
    .replace(/{{image}}/g, data.destinations[idDestination - 1].image)
    .replace(/{{place}}/g, data.destinations[idDestination - 1].place)
    .replace(/{{country}}/g, data.destinations[idDestination - 1].country)
    .replace(/{{price}}/g, data.destinations[idDestination - 1].price)
    .replace(/{{details}}/g, data.destinations[idDestination - 1].details)
    .replace(/{{currency}}/g, "$")
    .replace(/{{tags}}/g, data.destinations[idDestination - 1].tags.map((a) => { return '<span class="btn tag">' + a + '</span>'; }).reduce((a, b, idx) => { return idx == 0 ? a : a + b; }));
  //d.tags tableau tags
  //Map sert à 'mapper' prendre indiv chaque elemdu tab et appliquer une fonction
  //Reduce() permet de transformerle tab en un seul élément (concatène mes chaînes de caractères) sinon concatène a + b
  //Permet au final de transformer le tableau en une seule chaîne de caractères.

  // Comment remplacer un élément avec une liste de valeurs du json

  var price = data.destinations[idDestination - 1].price;
  console.log(price);
}

// Update form functions 
window.addEventListener("load", function () {

  // Variables declaration

  // Get Buttons
  const showFormBtn = document.getElementById("show-form-btn");
  const closeFormBtn = document.getElementById("close-form-btn");
  const addToCartBtn = document.getElementById("add-cart-btn");
  const cancelBtn = document.getElementById("cancel-btn");
  expectPrice = document.getElementById("expect-price");


  // Form
  bookingForm = document.getElementById("booking-form");
  arriveDate = document.getElementById("arrive-date");
  leaveDate = document.getElementById("leave-date");
  numberKids = document.getElementById("number-kids");
  numberRooms = document.getElementById("number-rooms");
  numberPeople = document.getElementById("number-people");
  breakfast = document.getElementById("breakfast");

  // Display form listeners
  closeFormBtn.addEventListener("click", function () {
    console.log("close");
    bookingForm.style.display = "none";
    closeFormBtn.style.display = "none";
    showFormBtn.style.display = "block";
    addToCartBtn.style.display = "none";
    cancelBtn.style.display = "none";
  });

  showFormBtn.addEventListener("click", function () {
    console.log("display");
    bookingForm.style.display = "block";
    closeFormBtn.style.display = "block";
    showFormBtn.style.display = "none";
    addToCartBtn.style.display = "block";
    cancelBtn.style.display = "block";
  });

  // Onchange Listeners
  arriveDate.addEventListener("change", function (event) {
    arDate = arriveDate.value;
    console.log(arDate);
    localStorage.setItem("arriveDate", arDate);
    updatePrice();
  });

  leaveDate.addEventListener("change", function (event) {
    leDate = leaveDate.value;
    localStorage.setItem("leaveDate", leDate);
    updatePrice();
  });

  numberPeople.addEventListener("change", function (event) {
    nbPeople = 1*numberPeople.value;
    localStorage.setItem("nbPeople", nbPeople);
    updatePrice();
  });

  numberKids.addEventListener("change", function (event) {
    nbKids = 1*numberKids.value;
    localStorage.setItem("nbKids", nbKids);
    updatePrice();
  });

  numberRooms.addEventListener("change", function (event) {
    nbRooms = 1*event.target.value;
    localStorage.setItem("nbRooms", nbRooms);
    updatePrice();
  });

  breakfast.addEventListener("change", function (event) {
    isBreakfast = breakfast.value;
    localStorage.setItem("isBreakfast", isBreakfast);
    updatePrice();
  });

  // When the page is loaded up, the current price is not shown
  expectPrice.innerText = stringPrice
    .replace(/{{currentPrice}}/g, "")
    .replace(/{{currency}}/g, "");

});

// Check if the date is valid, if not then execute if block
window.addEventListener("load", function () {
  let dateTab = document.getElementsByClassName("date");
  console.log(dateTab);

  for (i = 0; i < dateTab.length; i++) {

      dateTab[i].addEventListener("change", function (event) {
          console.log("toto");
          // convert current date to format to "YYYY-MM-DD"
          let currentDate = new Date();

          // get date from input field, by default is "YYYY-MM-DD" format
          let inputDate = new Date(event.target.value);

          if (currentDate.getTime() > inputDate.getTime()) {
              console.log("La date sélectionnée précède la date d'aujourd'hui");
              event.target.style.border = "2px solid red";
          }
          else {
            event.target.style.border = "2px solid #32cd32";
          }

      })
  }
});

function updatePrice() {
  // Check if all the values are set
  // Add breakfast
  console.log(arDate + leDate + nbPeople + nbKids + nbRooms);

  if (arDate && leDate && nbPeople && (nbKids || nbKids == 0) && nbRooms && isBreakfast) {
  console.log("test");

    currentPrice = (nbPeople + nbKids) ;//formule de calcul des prix     
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
