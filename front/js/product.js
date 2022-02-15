//Récupération de l'id ETAPE 5
const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
let item = "";

//afficher l'id du produit selectionné sur la console
console.log(idProduct); 

//Appel de la fonction
getItem();

//Récupération des éléments de l'API
function getItem() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    .then(async function(resAPI) {
        item = await resAPI;
        console.table(item);
        if (item) {
            getProduct(item);
        }
    })
    .catch((error) => {
        console.log('%c Problème au niveau de la requête API', 'color:purple');
    })
}

function getProduct(item) { 
    //Mise en place de l'image
    let productImg = document.createElement("img");
    document.querySelector("item__img").appendChild(productImg);
    productImg.src = item.imageUrl;
    productImg.alt = item.altTxt;

    //Modification du title <h1>
    let productTitre = document.getElementById('title');
    productTitre.innerHTML = item.name;

    //Modification du Prix
    let productPrix = document.getElementById('price');
    productPrix.innerHTML = item.price;

    //Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = item.description;

    //Mise en place de la selection de couleurs
    for (let colors of item.colors) {
        console.table(colors);
        let productCouleurs = document.createElement("option");
        document.querySelector("#colors").appendChild(productCouleurs);
        productCouleurs.value = colors;
        productCouleurs.innerHTML = colors;
    }
}