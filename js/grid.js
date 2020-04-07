/* Clone des data json dans l'html */
let grid_template = document.querySelector("#grid-template");
	
//récupération des données du fichier JSON

fetch("http://127.0.0.1:5500/json/data.json")
  .then(function (resp) {
    resp.json().then(function (data) {
        for (const d of data.destinations) {					
            let clone = document.importNode(grid_template.content, true);      // clone template

            newContent = clone.firstElementChild.innerHTML
                .replace(/{{image}}/g, d.image)		// replace key by value from data (json)
                .replace(/{{place}}/g, d.place)				// et {{name}} par
                .replace(/{{price}}/g, d.price)
                .replace(/{{description}}/g, d.description)
                .replace(/{{currency}}/g,"$")
                .replace(/{{url}}/g,"/destination.html?id="+d.id)
                .replace(/{{tags}}/g, d.tags.map((a) => { return '<span class="btn tag">' + a + '</span>'; }).reduce((a, b, idx) => {return idx == 0 ? a : a + b;}));
                //d.tags tableau tags
                //Map sert à 'mapper' prendre indiv chaque elemdu tab et appliquer une fonction
                //Reduce() permet de transformerle tab en un seul élément (concatène mes chaînes de caractères) sinon concatène a + b
                //Permet au final de transformer le tableau en une seule chaîne de caractères.

                // Comment remplacer un élément avec une liste de valeurs du json



            clone.firstElementChild.innerHTML = newContent;
            document.getElementById("grid-container").appendChild(clone);
        }

    })
})