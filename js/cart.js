let totalPrice = 0;
let cartList = document.getElementById("cart-list");


// LocalStorage 
console.log("Welcome to cart script");
if (localStorage.getItem("destinationsTab")) {
    let allDest = localStorage.getItem("destinationsTab");

    let destObj = JSON.parse(allDest);

    console.log("destObj.length :" + destObj.length)

    for (i = 0; i < destObj.length; i++) {
        let clone = document.importNode(cartList.content, true);
        console.log("destObj :" + destObj[i].id)

        clone.firstElementChild.innerHTML = clone.firstElementChild.innerHTML
            .replace(/{{place}}/g, destObj[i].place)
            .replace(/{{country}}/g, destObj[i].country)
            .replace(/{{price}}/g, destObj[i].price)
            .replace(/{{currency}}/g, "$")
            .replace(/{{arDate}}/g, destObj[i].arDate)
            .replace(/{{leDate}}/g, destObj[i].leDate)
            .replace(/{{nbPeople}}/g, destObj[i].nbPeople)
            .replace(/{{nbKids}}/g, destObj[i].nbKids)
            .replace(/{{nbRooms}}/g, destObj[i].nbRooms)
            .replace(/{{url}}/g, "/destination.html?id=" + destObj[i].id);

        document.getElementById("cart-container").appendChild(clone);

        totalPrice += destObj[i].price;
    }
}

window.addEventListener("load", function (){
    let total = document.getElementById("cart-total");
    total.innerHTML = total.innerHTML
    .replace(/{{totalPrice}}/g, totalPrice)
    .replace(/{{currency}}/g, "$");


    document.getElementById("payment-btn").addEventListener("click", function(){
        console.log("checking payment info");
        if (localStorage.getItem("cardsTab")){
            alert("La commande a bien pu être effectuée");
        }
        else if (localStorage.getItem("email")){
            alert("Il nous manque des informations");
            window.location.assign("./profile.html");
        }
        else{
            openModalFunction();
            }
    });


});

