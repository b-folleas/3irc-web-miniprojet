let gridTemplate;
let gridContainer;
let filterSelector;
let value;

//récupération des données du fichier JSON
let xhttp = [];
let tempTab = [];
let idcity;

window.addEventListener("load", function () {
    /* Clone des data json dans l'html */
    filterSelector = document.getElementById("filter-selector");
    console.log(filterSelector);
    setOrderDestination();
});

// Check if there is no temperature undefined
function testTempTab() {
    for (const v of tempTab) {
        if (typeof v === 'undefined') {
            return false;
        }
    }
    return true;
}

// Called each time the grid has to be reloaded
function setOrderDestination() {
    gridTemplate = document.querySelector("#grid-template");
    gridContainer = document.getElementById("grid-container");

    fetch("http://127.0.0.1:5500/json/data.json")
        .then(function (resp) {
            resp.json().then(function (data) {
                setOrder(data);
                if (filterSelector) {
                    filterSelector.addEventListener("click", function () {
                        setOrder(data);

                    });
                }
            })
        })
}

// Function to compare prices between one another and set the lowest one first
function compareLowerFirst(a, b) {
    const destinationA = a.price;
    const destinationB = b.price;

    let comparison = 0;
    if (destinationA > destinationB) {
        comparison = 1;
    } else if (destinationA < destinationB) {
        comparison = -1;
    }
    return comparison;
}


// Function to compare prices between one another and set the highest one first
function compareHigherFirst(a, b) {
    const destinationA = a.price;
    const destinationB = b.price;

    let comparison = 0;
    if (destinationA > destinationB) {
        comparison = -1;
    } else if (destinationA < destinationB) {
        comparison = 1;
    }
    return comparison;
}

function setOrder(data) {
    value = filterSelector.options[filterSelector.selectedIndex].value
    let priceTab = [];
    if (value) {


        if (value == "1") {
            console.log("Sort by lower price first");
            data.destinations.sort(compareLowerFirst);
            // Here, the data.destinations is well sorted
        }

        else if (value == "2") {
            console.log("Sort by higher price first");
            data.destinations.sort(compareHigherFirst);

        }
    }
    for (const d in data.destinations) {
        cityId = data.destinations[d].idCity;
        xhttp[d] = new XMLHttpRequest();
        xhttp[d].onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(this.responseText);
                tempTab[d] = obj.main.temp;

                // Check the number of values in tempTab -> Must be equal to the total number of destinations
                if (tempTab.length == data.destinations.length && testTempTab()) {
                    // Create new elements in the HTML 
                    for (i = 0; i < data.destinations.length; i++) {
                        let clone = document.importNode(gridTemplate.content, true);
                        if (gridContainer.children.length > 6) {
                            gridContainer.innerHTML = `
                            <template id="grid-template">
                                <article class="grid-article">
                                    <a href={{url}}><figure><img class="grid-img" onclick="assignURLFunction()" src={{image}} alt={{image-alt}}></figure></a>
                                    <div class="grid-text">
                                        <h3 class="grid-place">{{place}}</h3>
                                        <h2 class="grid-right">{{temp}}</h2>
                                        <p class="grid-description">{{description}}</p>
                                        <p class="grid-right"><b>{{price}}{{currency}}</b></p>
                                        <a class="btn grid-btn" href={{url}}>Voir en détails</a>
                                        <div class="tag-template">{{tags}}</div>
                                    </div>
                                </article>
                            </template>`
                            //Yes, I know, it is a very shitty way to code but I spent so much time on it that I just wanted to get rid of it asap
                        }

                        clone.firstElementChild.innerHTML = clone.firstElementChild.innerHTML
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

                        gridContainer.appendChild(clone);
                    }
                }
            }

        }
        xhttp[d].open("GET", `http://api.openweathermap.org/data/2.5/weather?id=${cityId}&units=metric&appid=b8e89339dec32ca1b99bece160747eb5`, true);
        xhttp[d].send();
    }
}