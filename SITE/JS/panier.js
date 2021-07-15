// la récupération des valeurs des articles dans le local storage 
let produitPourLocalStorage = JSON.parse(localStorage.getItem("products")); // JSON parse pour créer de JS
// console.log(produitPourLocalStorage);        //vérification !!
  
//--------------------- AFFICHAGE ARTICLES PANIERS-------------------

const panierContainer = document.querySelector(".article_panier");
function panierDisplay ()
{
    // verifier si panier vide ou pas...
    if (produitPourLocalStorage === null || produitPourLocalStorage == 0)// si panier vide :
    {
        const panierVide = `
        <div class="panier_vide">
        <h3>Vous n'avez rien selectionné </h3>
        </div>` 
        panierContainer.innerHTML = panierVide;
        document.querySelector(".text_contact").innerHTML = ` `;
        document.querySelector(".btn_vider_panier").innerHTML = ` `; 
    
    }else 
    {                             // si articles dans panier

        for (let lesProduits of produitPourLocalStorage)
        {
            panierContainer.innerHTML+=   //insertion dans le DOM du code HTML pour chaque article du tableau "produitPourLocalStorage" grace au += :
                `
                <div class ="cadre_pour_produit">
                    <div class="nom_article">
                    <p> Nom : ${lesProduits.name}</p>
                </div>
                <div class="quantite_article">
                    <p>quantié : ${lesProduits.quantity}</p>
                </div>
                <div class="prix_article">
                    <p>prix unitaire: ${lesProduits.price_unit}€</p>
                </div>   
                <div class="prix_article">
                    <p>prix total: ${lesProduits.price_total}€</p>
                </div>
                <button type="button" class="btn_suprimer" id="${lesProduits.Id}" name="button_clear"><p>supprimer l'article</p></button>
                </div>
                `; 
                // console.log(lesProduits);   //vérification !!

        }  
    }
};
panierDisplay ();
// 
//---------------------------SUPRIMER UN ARTICLE---------------------------
function supArticle (){
        let btn_suprimer = document.querySelectorAll(".btn_suprimer"); // variable qui recupere TOUT les "boutons suprimer"

    for( let l=0; l<btn_suprimer.length; l++) // boucle pour incrementer les "boutons suprimés"
    {
        btn_suprimer[l].addEventListener("click", (e) =>  //écoute du click pour chaques "bouton suprimer"
        { 
            if (window.confirm("Cet article va être suprimé du panier !"))
            {
                produitPourLocalStorage.splice(l,1); // .splice( L= emplacement element du tableau --- 1= le nombre d'éleùment à suprimer)
                localStorage.setItem("products", JSON.stringify(produitPourLocalStorage)); // envoie au local storage en JSON
                window.location.href = "panier.html"; // recharger la page
            }else{
                
            }

        })
        
    };
}
supArticle ();
//------------------------  VIDER PANIER ------------------------------------
function viderPanier ()
{
    const btnViderPanier = document.querySelector(".btn_vider_panier"); //const qui recupere le bouton "vider le panier"

    btnViderPanier.addEventListener("click", (e) => // ecoute du bouton
    {  
        if (window.confirm("Confirmer pour vider le panier va être vider !"))
                {
                    produitPourLocalStorage = localStorage.removeItem("products")
                    contact = localStorage.removeItem("contact")      // création d'un nouveau tableau des produit selectioné VIDE qui efface tout
                    // localStorage.setItem("products", JSON.stringify(produitPourLocalStorage));// envoie au local storage en JSON du tableau vide
                    window.location.href = "panier.html";                            // recharger la page

                }           
    });
};
viderPanier ();
// -------------------------PRIX TOTAL DU PANIER -----------------------
    let prixTotalPanier = [];
    function total ()
    {
        for (let m =0 ; m< produitPourLocalStorage.length; m++)
        {
            let prixTotal = produitPourLocalStorage[m].price_total; // recupération de tout les prix dans le localStorage
            prixTotalPanier.push(prixTotal);   // envoie de chaque prix "prixTotal" dans le tableau vide  "prixTotalPanier"
        }
        let total = prixTotalPanier.reduce((a,b)=> a+b,0);  // avec la méthode "REDUCE", on additione toutes les valeurs du tableau "prixTotalPanier"

        document.querySelector(".total_panier").innerHTML = `Prix total de votre panier : `+ total +"€"; // envoie dans le DOM du résultat "total"
       
    };
    
    total ();
// ------------------------FORMULAIRE ------------------------
 
function leFormulaire ()
{
   
    document.querySelector(".cadre_formulaire").innerHTML =   //injection dans le DOM du formulaire
    `
        <form>
            <label for="Fname">prénom:</label><br>
            <input type="text" pattern=".*[A-Za-z]{3,20}$" id="Fname" name="Fname"  placeholder="required" required/><br>
            <label for="Sname">Nom:</label><br>
            <input type="text" pattern="[A-Za-z]{3,20}" id="Sname" name="Sname"  placeholder="required" required/><br>
            <label for="adress">Adresse:</label><br>
            <input type="text" pattern="[A-Za-z0-9][" "]{5,30}" id="adress" name="adress" required placeholder="required" required/><br>
            <label for="city">ville:</label><br>
            <input type="text" pattern="[A-Za-z]{3,20}" id="city" name="city"  placeholder="required" required/><br>
            <label for="email" type="email">Adresse mail:</label><br>
            <input type="email" id="email" name="email"  placeholder="required" required/><br>
            <br>
            <input type="submit" class="confirm_commande" />
        </form>
    `;
};
    // const btnSubmit = document.querySelector(".confirm_commande");
leFormulaire ();

document.querySelector(".confirm_commande").addEventListener("click", (e) => 
{ 
    const contact = // création d'un Objet "contact" contenant les input du formulaire
    {
        firstName : document.querySelector("#Fname").value,
        lastName : document.querySelector("#Sname").value,
        address : document.querySelector("#adress").value,
        city : document.querySelector("#city").value,
        email : document.querySelector("#email").value
        
    } 
    
    
    localStorage.setItem("contact",  JSON.stringify(contact));  // envoie au LocalStrage en format JSON "stringify"
    // console.log("contact");
    // // console.log(contact);
    // console.log("produitPourLocalStorage");
    // console.log(produitPourLocalStorage);
    //--------------------envoi au server-----------------------
    const products = [];
    
    function tabAEnvoyer () 
    {
        
    }for (let n =0 ; n< produitPourLocalStorage.length; n++)
    {
        let idProd = produitPourLocalStorage[n]._id; 
        products.push(idProd);   // envoie de chaque prix "prixTotal" dans le tableau vide  "prixTotalPanier"
    
    }
    tabAEnvoyer();
    
    // console.log(produicts);
    e.preventDefault();
    const aEnvoyer = {
        contact,
        products
        
    }  
    console.log(contact);
    console.log(products);
    let orderID= []; 

    function  postOrder () 
    {   
        const optionPost = 
        {
            method: "POST",
            headers: 
            { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify((aEnvoyer))
        };
        fetch  ("http://localhost:3000/api/teddies/order" , optionPost)
        .then (function  (res) 
        {
            console.log(res);
                return res.json();
        })
        .then(function(data)
        { 
            console.log(data);
            orderID.push(data) ;
          
        })
        // localStorage.setItem("order_id", JSON.stringify(orderID));
   
        
    } 

   
    // window.location.href = "./confirmation.html"
    postOrder ();
});




