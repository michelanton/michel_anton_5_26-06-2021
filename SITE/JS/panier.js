// la récupération des valeurs des articles dans le local storage 
let produitPourLocalStorage = JSON.parse(localStorage.getItem("produit_pour_panier")); // JSON parse pour créer de JS
console.log(produitPourLocalStorage);

//--------------------- AFFICHAGE ARTICLES PANIERS-------------------

const panierContainer = document.querySelector(".article_panier");

// verifier si panier vide ou pas...
if (produitPourLocalStorage === null || produitPourLocalStorage == 0)// si panier vide :
{
    const panierVide = `
    <div class="panier_vide">
    <h3>Votre panier est vide</h3>
    </div>` 
    panierContainer.innerHTML = panierVide;
    // console.log("vide");
}else 
{                             // si articles dans panier

    for (let lesProduits of produitPourLocalStorage)
    {
        panierContainer.innerHTML+=   //insertion dans le DOM du code HTML pour chaque article du tableau "produitPourLocalStorage" grace au += :
            `
            <div class ="cadre_pour_produit">
                <div class="nom_article">
                <p> Nom : ${lesProduits.Produit_name}</p>
            </div>
            <div class="quantite_article">
                <p>quantié : ${lesProduits.Produit_quantity}</p>
            </div>
            <div class="prix_article">
                <p>prix unitaire: ${lesProduits.Produit_price_unit}€</p>
            </div>   
            <div class="prix_article">
                <p>prix total: ${lesProduits.Produit_price_total}€</p>
            </div>
            <button type="button" class="btn_suprimer" id="${lesProduits.Produit_Id}" name="button_clear"><p>supprimer l'article</p></button>
            </div>
            `;
            // console.log(lesProduits);
       

    }  
}
// 
//---------------------------SUPRIMER UN ARTICLE---------------------------
        let btn_suprimer = document.querySelectorAll(".btn_suprimer"); // variable qui recupere TOUT les "boutons suprimer"

    for( let l=0; l<btn_suprimer.length; l++) // boucle pour incrementer les "boutons suprimés"
    {
        btn_suprimer[l].addEventListener("click", (e) =>  //écoute du click pour chaques "bouton suprimer"
        { 
            produitPourLocalStorage.splice(l,1); // .splice( L= emplacement element du tableau --- 1= le nombre d'éleùment à suprimer)
            if (window.confirm("Cet article va être suprimé du panier !"))
            {
                produitPourLocalStorage.splice(l,1); // .splice( L= emplacement element du tableau --- 1= le nombre d'éleùment à suprimer)
                localStorage.setItem("produit_pour_panier", JSON.stringify(produitPourLocalStorage)); // envoie au local storage en JSON
                window.location.href = "panier.html"; // recharger la page
            }else{
                
            }

        })
        
    };
//------------------------  VIDER PANIER ------------------------------------
    const btnViderPanier = document.querySelector(".btn_vider_panier"); //const qui recupere le bouton "vider le panier"

    btnViderPanier.addEventListener("click", (e) =>{                    // ecoute du bouton
        produitPourLocalStorage = [];                                   // création d'un nouveau tableau des produit selectioné VIDE qui efface tout
        localStorage.setItem("produit_pour_panier", JSON.stringify(produitPourLocalStorage));// envoie au local storage en JSON du tableau vide
        window.location.href = "panier.html";                            // recharger la page
        // console.log(produitPourLocalStorage);
});
// -------------------------PRIX TOTAL DU PANIER -----------------------
let prixTotalPanier = [];
for (let m =0 ; m< produitPourLocalStorage.length; m++)
{
    let prixTotal = produitPourLocalStorage[m].Produit_price_total; // recupération de tout les prix dans le localStorage
    prixTotalPanier.push(prixTotal); // envoie de chaque prix "prixTotal" dans le tableau vide  "prixTotalPanier"
}
let total = prixTotalPanier.reduce((a,b)=> a+b,0);  // avec la méthode "REDUCE", on additione toutes les valeurs du tableau "prixTotalPanier"

document.querySelector(".total_panier").innerHTML = `Prix total de votre panier : `+ total +"€"; // envoie dans le DOM du résultat "total"

// ------------------------FORMULAIRE ------------------------
 
 const cadreFormulaire = document.querySelector(".cadre_formulaire"); //selection de l'emplacement dans le DOM
 cadreFormulaire.innerHTML =   //injection dans le DOM du formulaire
    `
    <form action="cadre_formulaire">
        <label for="Fname">prénom:</label><br>
        <input type="text" id="Fname" name="Fname" required="required" ><br>

        <label for="Sname">Nom:</label><br>
        <input type="text" id="Sname" name="Sname"required="required" ><br>

        <label for="adress">Adresse:</label><br>
        <input type="text" id="adress" name="adress" required="required" ><br>

        <label for="codepost">Code postal:</label><br>
        <input type="number" min="5" id="codepost" required="required" name="codepost" ><br>

        <label for="ville">ville:</label><br>
        <input type="text" id="ville" name="ville" required="required" ><br>

        <label for="mail" type="email">Adresse mail:</label><br>
        <input type="email" id="mail" name="mail" required="required" ><br>

        <label for="tel">téléphone:</label><br>
        <input type="tel" min="10" id="tel" name="tel" required="required" ><br>
        <br>
       <button type="button" class ="confirm_commande">Confirmation de la commande</button>
    </form> 
    `;
const btnSubmit = document.querySelector(".confirm_commande");
btnSubmit.addEventListener("click", (e) => 
{
    const formulaireValues = // création d'un Objet "formulaireValues" contenant les input du formulaire
    {
        prenom : document.querySelector("#Fname").value,
        nom : document.querySelector("#Sname").value,
        adresse : document.querySelector("#adress").value,
        code_postal : document.querySelector("#codepost").value,
        ville : document.querySelector("#ville").value,
        email : document.querySelector("#mail").value,
        telephone : document.querySelector("#tel").value
    } 
    // console.log(formulaireValues);
    localStorage.setItem("formulaireValues",  JSON.stringify(formulaireValues));  // envoie au LocalStrage en format JSON "stringify"
    //--------------------envoi au server-----------------------
    const aEnvoyer = 
    {
        produitPourLocalStorage,
        formulaireValues
    }; 
        fetch("http://localhost:3000/api/teddies/order", 
    {
        method: "POST",
        headers: 
        { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(aEnvoyer)
        
    })
    .then ((response) => response.json())
    .then((data) => {
        localStorage.clear();
        document.location.href = "./confirmation.html";
    })
    .catch((err) => {
        alert("Il y a eu une erreur : " + err);
    }) 
    .then(json => {
        orderConfirm.innerText = "Votre numéro de commande est le : " + JSON.stringify(json.orderId);
    });
});
