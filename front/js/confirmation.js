/**
 * * ETAPE 11 : Fonction main 
 */

function main(){
    const ID_NODE = document.getElementById("orderId");
    ID_NODE.innerText = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"))
    localStorage.clear();
}

main();