/**
 * * Initialisation du localStorage
 */
let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(produitLocalStorage);
const POSITION_EMPTY_CART = document.querySelector("#cart__items");

/**
 * * Manipulation du DOM pour notifier que le panier est vide
 */
function emptyCart() {
    const EMPTY_CART = `<p>Votre panier est vide</p>`;
    POSITION_EMPTY_CART.innerHTML = EMPTY_CART;
}

/**
 * * Manipulation du DOM pour afficher le(s) produit(s) dans le panier
 */
function noEmptyCart() {
    for (let produit in produitLocalStorage){
        let cartArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(cartArticle);
        cartArticle.className = "cart__item";
        cartArticle.setAttribute('data-id', produitLocalStorage[produit].idProduit);

        let cartDivImg = document.createElement("div");
        cartArticle.appendChild(cartDivImg);
        cartDivImg.className = "cart__item__img";
    
        let cartImg = document.createElement("img");
        cartDivImg.appendChild(cartImg);
        cartImg.src = produitLocalStorage[produit].imgProduit;
        cartImg.alt = produitLocalStorage[produit].altImgProduit;
        
        let cartItemContent = document.createElement("div");
        cartArticle.appendChild(cartItemContent);
        cartItemContent.className = "cart__item__content";
  
        let cartItemContentTitlePrice = document.createElement("div");
        cartItemContent.appendChild(cartItemContentTitlePrice);
        cartItemContentTitlePrice.className = "cart__item__content__titlePrice";
 
        let cartTitle = document.createElement("h2");
        cartItemContentTitlePrice.appendChild(cartTitle);
        cartTitle.innerHTML = produitLocalStorage[produit].nomProduit;

        let cartColor = document.createElement("p");
        cartTitle.appendChild(cartColor);
        cartColor.innerHTML = produitLocalStorage[produit].couleurProduit;
        cartColor.style.fontSize = "20px";

        let cartPrice = document.createElement("p");
        cartItemContentTitlePrice.appendChild(cartPrice);
        cartPrice.innerHTML = produitLocalStorage[produit].prixProduit + " €";

        let cartItemContentSettings = document.createElement("div");
        cartItemContent.appendChild(cartItemContentSettings);
        cartItemContentSettings.className = "cart__item__content__settings";
    
        let cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
        cartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        let cartQte = document.createElement("p");
        cartItemContentSettingsQuantity.appendChild(cartQte);
        cartQte.innerHTML = "Qté : ";

        let cartQuantity = document.createElement("input");
        cartItemContentSettingsQuantity.appendChild(cartQuantity);
        cartQuantity.value = produitLocalStorage[produit].quantiteProduit;
        cartQuantity.className = "itemQuantity";
        cartQuantity.setAttribute("type", "number");
        cartQuantity.setAttribute("min", "1");
        cartQuantity.setAttribute("max", "100");
        cartQuantity.setAttribute("name", "itemQuantity");
    
        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        cartItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        let cartSupprimer = document.createElement("p");
        cartItemContentSettingsDelete.appendChild(cartSupprimer);
        cartSupprimer.className = "deleteItem";
        cartSupprimer.innerHTML = "Supprimer";
    }
}

/**
 * * ETAPE 8: Fonction permettant d'afficher les produits séléctionner dans le panier
 */
function getCart(){
if (produitLocalStorage === null || produitLocalStorage == 0) {
    emptyCart();
} else {
    noEmptyCart();
}}
getCart();

/**
 * * Récupération du total des quantités et des prix
 */
function getTotals(){

    // Récupération du total des quantités
    var elementsQuantity = document.getElementsByClassName('itemQuantity');
    var myCartLength = elementsQuantity.length,
    totalQuantity = 0;

    for (let i = 0; i < myCartLength; ++i) {
        totalQuantity += elementsQuantity[i].valueAsNumber;
    }

    let cartTotalQuantity = document.getElementById('totalQuantity');
    cartTotalQuantity.innerHTML = totalQuantity;
    console.log("🚀 ~ file: cart.js ~ line 112 ~ getTotals ~ totalQuantity", totalQuantity)

    // Récupération du prix total
    totalPrice = 0;

    for (let i = 0; i < myCartLength; ++i) {
        totalPrice += (elementsQuantity[i].valueAsNumber * produitLocalStorage[i].prixProduit);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;
    console.log("🚀 ~ file: cart.js ~ line 123 ~ getTotals ~ totalPrice", totalPrice)
}
getTotals();

/**
 * * Modification de la quantité de canapé commander 
 */
function modifyQuantity() {
    let quantityOptions = document.querySelectorAll(".itemQuantity");

    for (let i = 0; i < quantityOptions.length; i++){
        quantityOptions[i].addEventListener("change" , (event) => {
            event.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = produitLocalStorage[i].quantiteProduit;
            let quantityOptionsValue = quantityOptions[i].valueAsNumber;
            
            const resultFind = produitLocalStorage.find((el) => el.quantityOptionsValue !== quantityModif);

            resultFind.quantiteProduit = quantityOptionsValue;
            produitLocalStorage[i].quantiteProduit = resultFind.quantiteProduit;

            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        
            // refresh rapide
            location.reload();
        })
    }
}
modifyQuantity();

/**
 * * ETAPE 9: Suppression d'un canapé dans le panier
 */
function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btn_supprimer.length; i++){
        btn_supprimer[i].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = produitLocalStorage[i].idProduit;
            let colorDelete = produitLocalStorage[i].couleurProduit;

            produitLocalStorage = produitLocalStorage.filter( element => element.idProduit !== idDelete || element.couleurProduit !== colorDelete );
            
            localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

            alert("Le produit a bien été retiré du panier");
            location.reload();
        })
    }
}
deleteProduct();

/**
 * * Récupération des données du client
 */
function getForm() {
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
   // let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

    form.firstName.addEventListener('change', function() {
        VALID_FIRST_NAME(this);
    });

    form.lastName.addEventListener('change', function() {
        VALID_LAST_NAME(this);
    });

    form.address.addEventListener('change', function() {
        VALIS_ADDRESS(this);
    });

    form.city.addEventListener('change', function() {
        VALID_CITY(this);
    });

    form.email.addEventListener('change', function() {
        VALID_EMAIL(this);
    });

    const VALID_FIRST_NAME = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    const VALID_LAST_NAME = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    const VALID_ADDRESS = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    const VALID_CITY = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    //validation de l'email
    const VALID_EMAIL = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

/**
 * * ETAPE 10 : Envoie des informations client au local storage
 */
function postForm(){
    const BTN_COMMAND = document.getElementById("order");
    BTN_COMMAND.addEventListener("click", (event)=>{
 
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        let idProducts = [];
        for (let i = 0; i<produitLocalStorage.length;i++) {
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log("🚀 ~ file: cart.js ~ line 291 ~ BTN_COMMAND.addEventListener ~ idProducts", idProducts)
        
        const ORDER = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        } 

        const OPTIONS = {
            method: 'POST',
            body: JSON.stringify(ORDER),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", OPTIONS)
        .then((response) => response.json())
        .then((dataCart) => {
            console.log(dataCart);
            localStorage.clear();
            localStorage.setItem("orderId", dataCart.orderId);
            document.location.href = "confirmation.html";
        })
        .catch((error) => {
            alert ("Problème avec fetch : " + error.message);
        });
        })
}
postForm();
