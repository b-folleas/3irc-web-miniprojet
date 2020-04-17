let expectPrice;
let currentPrice;
let startingPrice;

// Init variables tostock data
let currentPlace;
let currentCountry;
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

//récupération des données du fichier JSON
var xhttp = [];
var tempTab = [];
var idcity;


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
  currentPlace = data.destinations[idDestination - 1].place;
  currentCountry = data.destinations[idDestination - 1].country;



  cityId = data.destinations[idDestination - 1].idCity; //destination -1 because index start at 0 but id at 1

  xhttp[data] = new XMLHttpRequest(); // Create XMLHttpRequest
  console.log(xhttp[data]);
  xhttp[data].open("GET", `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=b8e89339dec32ca1b99bece160747eb5`, true); // GET method, API url and true for asynchronous
  xhttp[data].send();


  xhttp[data].onreadystatechange = function () { // Called each time readyState change, min 4 times

    if (this.readyState == 4 && this.status == 200) { // 4 when the response is ready, 200 status is OK
      var obj = JSON.parse(this.responseText); // Response as a Text parsed to return object
      tempTab[data] = obj.main.temp;

      document.getElementById("article").innerHTML = document.getElementById("article").innerHTML
        .replace(/{{image}}/g, data.destinations[idDestination - 1].image)
        .replace(/{{place}}/g, currentPlace)
        .replace(/{{country}}/g, currentCountry)
        .replace(/{{price}}/g, startingPrice)
        .replace(/{{details}}/g, data.destinations[idDestination - 1].details)
        .replace(/{{temp}}/g, Math.round(tempTab[data]) + "°")
        .replace(/{{currency}}/g, "$")
        .replace(/{{tags}}/g, data.destinations[idDestination - 1].tags.map((a) => { return '<span class="btn tag">' + a + '</span>'; }).reduce((a, b, idx) => { return idx == 0 ? a : a + b; }));
      //d.tags tableau tags
      //Map sert à 'mapper' prendre indiv chaque elemdu tab et appliquer une fonction
      //Reduce() permet de transformerle tab en un seul élément (concatène mes chaînes de caractères) sinon concatène a + b
      //Permet au final de transformer le tableau en une seule chaîne de caractères.
    }
  }
}


// Check if there is no temperature undefined
function testTempTab() {
  for (const v of tempTab) {
    if (typeof v === 'undefined') {
      return false;
    }
  }
  return true;
}

// Update form functions 
window.addEventListener("load", function () {

  // Get Buttons
  let showFormBtn = document.getElementById("show-form-btn");
  let closeFormBtn = document.getElementById("close-form-btn");
  let addToCartBtn = document.getElementById("add-cart-btn");
  let resetBtn = document.getElementById("reset-btn");
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
    //localStorage.setItem("arrivalDate", arDate);
    updatePrice();
  });

  leaveDate.addEventListener("change", function (event) {
    leDate = leaveDate.value;
    //localStorage.setItem("leaveDate", leDate);
    updatePrice();
  });

  numberPeople.addEventListener("change", function (event) {
    nbPeople = 1 * numberPeople.value;
    //localStorage.setItem("nbPeople", nbPeople);
    updatePrice();
  });

  numberKids.addEventListener("change", function (event) {
    nbKids = 1 * numberKids.value;
    //localStorage.setItem("nbKids", nbKids);
    updatePrice();
  });

  numberRooms.addEventListener("change", function (event) {
    nbRooms = 1 * numberRooms.value;
    //localStorage.setItem("nbRooms", nbRooms);
    updatePrice();
  });

  breakfast.addEventListener("change", function (event) {
    isBreakfast = breakfast.value;
    //localStorage.setItem("isBreakfast", isBreakfast);
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
        event.target.style.border = "2px solid green";

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

  // Stock data of the destination in localStorage
  addToCartBtn.addEventListener("click", function (event) {
    // Add Verification
    
    let destinationsTab;
    let destinationsTabItem = localStorage.getItem("destinationsTab");
    if (destinationsTabItem) {
      destinationsTab = JSON.parse(destinationsTabItem);
    }
    else {
      destinationsTab = [];
    }

    alert("La destination à été ajoutée au panier");

    currentDestination = {
      "place": currentPlace,
      "country": currentCountry,
      "price": currentPrice,
      "arDate": arDate,
      "leDate": leDate,
      "nbDays": nbDays,
      "nbPeople": nbPeople,
      "nbKids": nbKids,
      "nbRooms": nbRooms,
      "isBreakfast": isBreakfast,
      "commment": comment,
      "id": idDestination
    };

    destinationsTab.push(currentDestination);

    // Only one element here as the destinationsTab must not be refreshed
    localStorage.setItem("destinationsTab", JSON.stringify(destinationsTab));

    console.log("Destination Tab :" + localStorage.getItem("destinationsTab"));
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

    currentPrice = (nbDays * (startingPrice + (1 * breakfastAdd)) * (nbPeople + (0.4 * nbKids)));//startingPrice = 1 night for 1 adult for 1 room     
    //ex: currentPrice = 55.6845;
    round = currentPrice * 100;          // 556.845
    round = Math.round(round);   // 556
    round = round / 100;          //5.56
    currentPrice = round;



    console.log(nbDays + "*" + "(" + startingPrice + "+" + breakfastAdd + ")" + "*" + "(" + nbPeople + "+" + "(" + "0.4" + "*" + nbKids + ")" + ")");//startingPrice = 1 night for 1 adult for 1 room     
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