//url de l'API
let url = 'http://localhost:3000/api/products';

//Récupération des éléments de l'API
async function getItemsAPI() {
    let itemsRecuperation = await fetch(url)
    return await itemsRecuperation.json();
}


