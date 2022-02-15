affichageCanapes();

//Récupération des éléments de l'API
async function getItemsAPI() {
    let itemsRecuperation = await fetch('http://localhost:3000/api/products')
    return await itemsRecuperation.json();
}

//Affichage des éléments de l'API dans le DOM
async function affichageCanapes () {
    let affichage = await getItemsAPI()
    .then(function (dataAPI) {
        const canapes = dataAPI;
        console.table(canapes);
        for (let canape in canapes) {

            //Mise en place de l'élément <a> ETAPE 4
            let canapeLien = document.createElement("a");
            document.querySelector(".items").appendChild(canapeLien);
            canapeLien.href = `product.html?id=${dataAPI[canape]._id}`;

            //Mise en place de l'élément <article>
            let canapeArticle = document.createElement("article");
            canapeLien.appendChild(canapeArticle);

            //Mise en place de l'élément <img>
            let canapeImg = document.createElement("img");
            canapeArticle.appendChild(canapeImg);
            canapeImg.src = dataAPI[canape].imageUrl;
            canapeImg.alt = dataAPI[canape].altTxt;

            //Mise en place de l'élément <h3>
            let canapeNom = document.createElement("h3");
            canapeArticle.appendChild(canapeNom);
            canapeNom.classList.add("productName");
            canapeNom.innerHTML = dataAPI[canape].name;

            //Mise en place de l'élément <p>
            let canapeDescription = document.createElement("p");
            canapeArticle.appendChild(canapeDescription);
            canapeDescription.classList.add("productDescription");
            canapeDescription.innerHTML = dataAPI[canape].description;
        }
    })
    .catch (function(error) {
        return error;
    });
}
