
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




function displayBookingForm() {
  document.getElementById("booking-form").style.display = 'block';
  document.getElementById("destination-btn").innerText = 'Ajouter au panier'
}

function hideBookingForm() {
  document.getElementById("booking-form").style.display = 'none';
  document.getElementById("destination-btn").innerText = 'Réserver'
}

