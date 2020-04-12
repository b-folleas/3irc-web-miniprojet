/* Clone des data json dans l'html */
let grid_template = document.querySelector("#grid-template");

//récupération des données du fichier JSON
var xhttp = [];
var tempTab = [];
var idcity;

fetch("http://127.0.0.1:5500/json/data.json")
    .then(function (resp) {
        resp.json().then(function (data) {
            for (const d in data.destinations) {

                cityId = data.destinations[d].idCity;
                xhttp[d] = new XMLHttpRequest();
                xhttp[d].onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var obj = JSON.parse(this.responseText);
                        tempTab[d] = obj.main.temp;
                        console.log(data.destinations[d].place);
                        console.log(tempTab.length);
                        if (tempTab.length == data.destinations.length && testTempTab()) {
                            for (i = 0; i < data.destinations.length; i++) {
                                let clone = document.importNode(grid_template.content, true);     

                                newContent = clone.firstElementChild.innerHTML
                                    .replace(/{{image}}/g, data.destinations[i].image)		// replace key by value from data (json)
                                    .replace(/{{place}}/g, data.destinations[i].place)				
                                    .replace(/{{price}}/g, data.destinations[i].price)
                                    .replace(/{{description}}/g, data.destinations[i].description)
                                    .replace(/{{currency}}/g, "$")
                                    .replace(/{{url}}/g, "/destination.html?id=" + data.destinations[i].id)
                                    .replace(/{{temp}}/g, Math.round(tempTab[i]) + "°")
                                    .replace(/{{tags}}/g, data.destinations[i].tags.map((a) => { return '<span class="tag">' + a + '</span>'; }).reduce((a, b, idx) => { return idx == 0 ? a : a + b; }));
                                //d.tags tableau tags
                                //Map sert à 'mapper' prendre indiv chaque elemdu tab et appliquer une fonction
                                //Reduce() permet de transformerle tab en un seul élément (concatène mes chaînes de caractères) sinon concatène a + b
                                //Permet au final de transformer le tableau en une seule chaîne de caractères.

                                clone.firstElementChild.innerHTML = newContent;
                                document.getElementById("grid-container").appendChild(clone);
                            }
                        }
                    }
                }
                xhttp[d].open("GET", `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=b8e89339dec32ca1b99bece160747eb5`, true);
                xhttp[d].send();
            }

        })
    })

    // Check if there is no temperature undefined
    function testTempTab() {
    for (const v of tempTab) {
        if (typeof v === 'undefined') {
            return false;
        }
    }
    return true;
}