
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


window.addEventListener("load", function () {

  let bookingBtn = document.getElementById("booking-btn");
  const arriveDate = document.getElementById("arrive-date");
  const leaveDate = document.getElementById("leave-date");
  const numberPeople = document.getElementById("number-people");
  const numberKids = document.getElementById("number-kids");
  const numberRooms = document.getElementById("number-rooms");


// Nathan
    bookingBtn.onclick = function () {

      if (bookingBtn.innerText == "Réserver ce voyage".toLowerCase) {
        document.getElementById("booking-form").style.display = "block";
        bookingBtn.innerText = "Ajouter au panier";
      }
      else if (bookingBtn.innerText == "Ajouter au panier") {
        if (!arriveDate.value) {
        }
        if (!leaveDate.value) {
        }
        if (!numberPeople.value == null) {
          localStorage.setItem("numberPeople", numberPeople.value);
        }
        if (!numberKids.value == null) {
          localStorage.setItem("numberKids", numberKids.value);
        }
        if (!numberRooms.value == null) {
          localStorage.setItem("numberRooms", numberRooms.value);
        }
      }
    };

  document.getElementById("close-booking-btn").onclick = function () {
    document.getElementById("booking-form").style.display = 'none';
    bookingBtn.innerText = 'Réserver ce voyage';
  };







}); 