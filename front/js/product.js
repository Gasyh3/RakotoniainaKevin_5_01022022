//ETAPE 5 : Récupération de l'id
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log("🚀 ~ file: product.js ~ line 5 ~ idProduct :", idProduct);
let item = "";

const COULEUR_CHOIX = document.querySelector("#colors");
const QUANTITE_CHOIX = document.querySelector("#quantity");

getItemForProduct();

/**
 * * ETAPE 6 : Récupération d'un élément de l'API avec l'id 
 */
function getItemForProduct() {
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then((response) => response.json())
    .then(async function(dataProduct) {
        item = await dataProduct;
        console.table(item);
        if (item) {
            displayItemOnProduct(item);    
        }
    })
    .catch((error) => console.error(error));
}

/**
 * * Manipulation du DOM afin d'afficher le produit séléctionner
 */
function displayItemOnProduct() {
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = item.imageUrl;
    productImg.alt = item.altTxt;

    let productName = document.getElementById('title');
    productName.innerHTML = item.name;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = item.price;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = item.description;

    for (let colors of item.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(item);
}

/**
 * * ETAPE 7 : Mise en place de la gestion du panier
 * @param {*} item 
 */
function addToCart(item) {
    const BTN_CART = document.querySelector("#addToCart");
    BTN_CART.addEventListener("click", (event)=>{
        importationInLocalStorage(); 
    });
}
/**
 * * Importation du produit (qtt, couleur) dans le Local Storage
 */
function importationInLocalStorage () {
    //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
    if (QUANTITE_CHOIX.value > 0 && QUANTITE_CHOIX.value <=100 && COULEUR_CHOIX.value != "") {
        let choixCouleur = COULEUR_CHOIX.value;
        let choixQuantite = QUANTITE_CHOIX.value;

        //Récupération des options de l'article à ajouter au panier
        let optionsProduit = {
            idProduit: idProduct,
            couleurProduit: choixCouleur,
            quantiteProduit: Number(choixQuantite),
            nomProduit: item.name,
            prixProduit: item.price,
            descriptionProduit: item.description,
            imgProduit: item.imageUrl,
            altImgProduit: item.altTxt
        };

        //Initialisation du local storage
        let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

        const POPUP_CONFIRMATION = popUpConfirmation(choixQuantite, item.name, choixCouleur);
       
        //Si le panier comporte déjà au moins 1 article
        if (produitLocalStorage) {
            const RESULT_FIND = produitLocalStorage.find(
            (result) => result.idProduit === idProduct && result.couleurProduit === choixCouleur);
            //Si le produit commandé est déjà dans le panier
            if (RESULT_FIND) {
                let newQuantite =
                parseInt(optionsProduit.quantiteProduit) + parseInt(RESULT_FIND.quantiteProduit);
                RESULT_FIND.quantiteProduit = newQuantite;
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                POPUP_CONFIRMATION();
            //Si le produit commandé n'est pas dans le panier
            } else {
                produitLocalStorage.push(optionsProduit);
                localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
                console.table(produitLocalStorage);
                POPUP_CONFIRMATION();
            }
        //Si le panier est vide
        } else {
            produitLocalStorage =[];
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
            console.table(produitLocalStorage);
            POPUP_CONFIRMATION();
        }
    } else {
        alert("Veuillez choisir une couleur ou le nombre d'article que vous désirez")
    }
}
/**
 * * Mise en place de la pop-up de confirmation de l'envoie au panier
 * @param {*} choixQuantite 
 * @param {*} nomProduit 
 * @param {*} choixCouleur 
 */
function popUpConfirmation(choixQuantite, nomProduit, choixCouleur) {
    if(window.confirm(`Votre commande de ${choixQuantite} ${nomProduit} ${choixCouleur} est ajoutée au panier
    Pour consulter votre panier, cliquez sur OK`)){
    window.location.href ="cart.html";
    }
}
