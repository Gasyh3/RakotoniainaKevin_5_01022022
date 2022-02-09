//Afficher tout les articles de manière dynamique

//url de l'API
let url = 'http://localhost:3000/api/products';

//Récupération des éléments de l'API et affichage des items
fetch(url)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    let affichage = '<section>';
    for (let canape of data) {
        affichage +=
        `<article>
        <img src="${canape.imageUrl}" alt="{canape.altTxt}" />
        <h3 class="productName">${canape.name}</h3> 
        <p class="productDescription">${canape.description}</p>
        </article>`
    }
    affichage += '</section>';
    document.querySelector("#items").innerHTML = affichage;
});



