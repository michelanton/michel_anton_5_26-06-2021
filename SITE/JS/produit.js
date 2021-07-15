// récuperer l'ID dans l'URL de la page
const recupererChaineDeRequetteUrlId = window.location.search; // à la consolle ?ID du produit
// console.log(recupererChaineDeRequetteUrlId); // vérification  !! 

const urlSearchParams = new URLSearchParams(recupererChaineDeRequetteUrlId); // pour récuperer SEULEMENT l' ID du produit sans le ?  utiliser URLSearchParams
const IdProduit = urlSearchParams.get("id");// recuperation de l'ID réel du produit
// console.log(IdProduit);   // vérification  !! 
const UrlApi = "http://localhost:3000/api/teddies/"; // mise en variable de l'URL 
const urlProduit = IdProduit;                       // mise en variable de l'ID produit

let productsContainer = document.querySelector(".contener1"); // mise en variable de l'element DOM ".contener1"

function getArticle()    // fonction d'appel fetch du produit selectioné 
{             
    fetch(UrlApi + urlProduit)
    .then(function (response)         // reponse eu format JSON "string"
    {
        return response.json();
        
    })
    .catch((error) => {                //si erreur de connection au server
        
        productsContainer.innerHTML =   // affichage dans le DOM
        `<p class="text_error text-center text-uppercase font-weight-bold text-danger ">
        la connection au server n'a pas été possible</p>`
        
    })  
    .then((resultatAPI) => {     
   
        let article = resultatAPI;      // mise en variable du résultat 
        // console.log(article);      // vérification !!
        
        for (const property in article) {      //pour placer les données reçues via l'API aux bons endroits sur la page
            // console.log(`${property}: ${article[property]}`);   // vérification !!

            productsContainer.innerHTML =  
            `<div class="contener_art col-12 pt-4 col-sm-6  col-lg-4">
                <div class="cart-article card article shadow p-3 mb-5 bg-white rounded border border-warning">
                    <div class="card-header bg-warning ">
                        <h5 class="card-title d-flex justify-content-between">${article.name}<span>${article.price/100 + "€"}</span></h5>
                    </div>
                        <img src="${article.imageUrl}" class="img-fluid card-img-top ">
                    <div class="card-body">
                        <p class="card-text">${article.description}</p>
                    </div>
                    <div class="product-card__infos__quantity">
                    <label for="articleQuantity">Quantité :</label>
                            
                        <input id="articleQuantity" type="number" name="articleQuantity" value="1" min="1" max="10">
                    
                    </div>
                    <div class="product-card__infos__color">
                    <label for="colorSelect">choisir couleur :</label>
                        <select name="color_select" id="color_select" value="">
                    
                        </select>
                        <button type="button" id="button_envoyer_panier" class="button_envoyer_panier" ><p class="align-middle">Ajouter au panier</p></button>
                
                    </div>
                </div>
            </div>`;
            
            
            
        }

        //SELECTION DE LA COULEUR
                // inserer les options dans le "select"
                let colorOfArticle = article.colors; // tableau contenant les couleurs  
                let colorSelect = document.getElementById("color_select");//variable qui renverra dans ID=color-select
                
                // console.log(colorOfArticle);    // vérification !!
                // console.log(colorSelect);       // vérification !!
        // SELECTION DE LA QUANTITE
        let Quantity = document.querySelector("#articleQuantity");  // input , type = number
                
        function optionColorSelect () // permet d'afficher les option de couleur dans le "color_select"
        {
            for (let i = 0; i<colorOfArticle.length; i++) {
                let option = document.createElement('option'); //option créra pour chaque I un tag option
                option.innerText = colorOfArticle[i]; // insere le texte (article.colors) dans chaque "option"
                colorSelect.appendChild(option);//déplace l'option vers position tête de colorSelect
                
            }   // console.log(colorSelect);      // vérification !!
            };
            optionColorSelect();
        

            //  ECOUTE BOUTON PANIER
            const envoyerPanier = document.querySelector("#button_envoyer_panier"); // selectiondu bouton panier
            envoyerPanier.addEventListener("click", (e)=>{  // ecouter le click (event) sur bouton panier et crée un evenement

            // RÉCUPÉRATION DES VALEURS POUR LE PANIER
        
            let productOptionPourPanier = {  // récupere les variable lorsqu'on clique sur le bouton panier : "#button_envoyer_panier"
                name :article.name,
                price_total : article.price / 100 * Quantity.value,
                price_unit : article.price / 100,
                quantity : Quantity.value,
                color : colorSelect.value,
                _id : article._id
                };
                // console.log(productOptionPourPanier); // vérifie ce qu'il y a dans le panier

            
        
            //----------------------------GESTION DU LOCAL STORAGE ---------------------------------
            // CONFIRMATION DU PANNIER
            const popupConfirmationPanier = () =>      // ce que doit faire et afficher la fenetre alert
            {

                if (window.confirm("vous avez rajouté :" + Quantity.value + " " + article.name + " " + colorSelect.value + " " + "à votre panier " + "pour un montant total de: " + article.price / 100 * Quantity.value +"€ \n" + 
                    "Pour consulter le panier : cliquez OK \n" +
                    "pour annuler et revenir a l'acceuil : cliquez ANNULER"))
                    {
                    document.location = "../HTML/panier.html";     // redirection ver panier
                }else{
                    
                    window.location.href = "../../../index.html";   // redirection acceuil
                }
            }

            const ajoutProduitLocalStorage = () =>{      // fonction pour ajouter un produit au LOCAL STORAGE
                produitPourLocalStorage.push(productOptionPourPanier);// rajout au taleau de local storage
                localStorage.setItem("products", JSON.stringify(produitPourLocalStorage));
            }


            let produitPourLocalStorage = JSON.parse(localStorage.getItem("products"));   
            // stocker la récupération des valeurs du formulaire dans le local storage 
            // console.log(produitPourLocalStorage);    // vérification !!

            //verfication qu'il n'y a pas DEJA des produit dans le LocalStorage

            if (produitPourLocalStorage)//si il y a deja des produit
            {
                ajoutProduitLocalStorage();
                // console.log(produitPourLocalStorage);   // vérification !!
                popupConfirmationPanier();
            } else // s'il y n'y a pas de produit dans le local Storage
            {
                produitPourLocalStorage = [];//création du tableau initial 
                ajoutProduitLocalStorage();
                // console.log(produitPourLocalStorage);    // vérification !!
                popupConfirmationPanier();

            }


        })    
    });       
}
getArticle();