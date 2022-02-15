// Récupération de l'id ETAPE 5
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let item = "";

getItem();

// Récupération des articles de l'API
function getItem() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
        return res.json();
    })

    // Répartition des données de l'API dans le DOM
    .then(async function (resultatAPI) {
        item = await resultatAPI;
        console.table(item);
        if (item){
            AfficheProduct(item);
        }
    })
    .catch((error) => {
        console.log('%c Problème au niveau de la requête API', 'color:purple');
    })
}

//Mise en place des éléments du canapé dans le DOM Etape 6
function AfficheProduct(item){
    // Insertion de l'image
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = item.imageUrl;
    productImg.alt = item.altTxt;

    // Modification du titre "h1"
    let productName = document.getElementById('title');
    productName.innerHTML = item.name;

    // Modification du prix
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = item.price;

    // Modification de la description
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = item.description;

    // Insertion des options de couleurs
    for (let colors of item.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
   
}
