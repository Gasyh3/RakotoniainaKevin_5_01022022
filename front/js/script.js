/**
 * * ETAPE 3 : Insérer les produits dans la page d'accueil
 */

getCanapes();

/**
 * * Récupération des éléments de l'API 
 */
function getCanapes () {
    fetch("http://localhost:3000/api/products/")
    .then((response) => response.json())
    .then((dataScript) => displayCanapesOnIndex(dataScript))
    .catch((error) => console.error(error));
}

/**
 * * Manipulation du DOM afin d'afficher les canapés de manière dynamique 
 * @param {*} dataScript 
 */
function displayCanapesOnIndex (dataScript) {
    const CANAPES = dataScript;
    for (let canape in CANAPES) {

        //ETAPE 4: Mise en place de l'élément <a> et du href
        let canapeLien = document.createElement("a");
        document.querySelector(".items").appendChild(canapeLien);
        canapeLien.href = `product.html?id=${dataScript[canape]._id}`;

        let canapeArticle = document.createElement("article");
        canapeLien.appendChild(canapeArticle);

        let canapeImg = document.createElement("img");
        canapeArticle.appendChild(canapeImg);
        canapeImg.src = dataScript[canape].imageUrl;
        canapeImg.alt = dataScript[canape].altTxt;

        let canapeNom = document.createElement("h3");
        canapeArticle.appendChild(canapeNom);
        canapeNom.classList.add("productName");
        canapeNom.innerHTML = dataScript[canape].name;

        let canapeDescription = document.createElement("p");
        canapeArticle.appendChild(canapeDescription);
        canapeDescription.classList.add("productDescription");
        canapeDescription.innerHTML = dataScript[canape].description;
    }
}