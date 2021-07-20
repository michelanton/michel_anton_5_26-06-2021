const recupererChaineDeRequetteUrlId = window.location.search; // récupération de: ?ID
// console.log(recupererChaineDeRequetteUrlId);    // vérification !!
const urlSearchParams = new URLSearchParams(recupererChaineDeRequetteUrlId);
// pour récuperer SEULEMENT l' ID du produit sans le ? = URLSearchParams
const IdProduit = urlSearchParams.get("id"); // recuperation de l'ID en string
// console.log(IdProduit);    // vérification !!
const UrlApi = "http://localhost:3000/api/teddies/";
const urlProduit = IdProduit;
let productsContainer = document.querySelector(".contener1");

function getArticle() {
  // fonction pour fetch du produit selectioné
  fetch(UrlApi + urlProduit) // appel connection server  
    .then(function (response) {  // reponse eu format JSON "string"
      return response.json(); // transforme JSON en JS  //si erreur de connection au server
    })
    .catch((error) => {
        productsContainer.innerHTML =
          // affichage dans le DOM message erreur
        `
          <p class="text_error text-center text-uppercase font-weight-bold text-danger ">
          la connection au server n'a pas été possible</p>
        `;
      }
    )
    .then((resultatAPI) => {
      let article = resultatAPI;
      // console.log(article);     // vérification !!
      for (const property in article) { //ittere les prorpietés
        // console.log(`${property}: ${article[property]}`);   // vérification !!
        productsContainer.innerHTML = 
        `
          <div class="contener_art col-12 pt-4 col-sm-6  col-lg-4">
              <div class="cart-article card article shadow p-3 mb-5 bg-white rounded border border-warning">
                  <div class="card-header bg-warning ">
                      <h5 class="card-title d-flex justify-content-between">${article.name}
                      <span>${article.price / 100 + "€"}</span></h5>
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
                      <button type="button" id="button_envoyer_panier" class="button_envoyer_panier" >
                          <p class="align-middle">Ajouter au panier</p></button>
                  </div>
              </div>
          </div>
        `;
      }

      //--------------SELECTION DE LA COULEUR------------------
      // inserer les options dans le "select"(HTML) du DOM
      let colorOfArticle = article.colors; // tableau contenant les couleurs
      let colorSelect = document.querySelector("#color_select"); //sélection element DOM
      // console.log(colorOfArticle);    // vérification !!
      // console.log(colorSelect);       // vérification !!

      function optionColorSelect() {
        // affiche les option de couleur dans le "color_select"
        for (let i = 0; i < colorOfArticle.length; i++) {
          let option = document.createElement("option"); //crée pour chaque I un tag "option"
          option.innerText = colorOfArticle[i]; // insere le texte (article.colors) dans chaque "option"
          colorSelect.appendChild(option); //déplace l'option vers position tête de colorSelect
        }
      }
      optionColorSelect();
      // --------------SELECTION DE LA QUANTITE-----------------
      let Quantity = document.querySelector("#articleQuantity"); // sélection de l'input , type = number

      // ----------------- BOUTON PANIER-------------------
      const envoyerPanier = document.querySelector("#button_envoyer_panier"); // selectiondu bouton panier
      envoyerPanier.addEventListener("click", (e) => {// ecouter le click (event) sur bouton panier

        // -RÉCUPÉRATION DES VALEURS POUR LE PANIER -
        let productOptionPourPanier = {
          // objet des valeurs de l'article
          name: article.name,
          price_total: (article.price / 100) * Quantity.value,
          price_unit: article.price / 100,
          quantity: Quantity.value,
          color: colorSelect.value,
          _id: article._id,
        };
        // console.log(productOptionPourPanier); // vérifie ce qu'il y a dans le panier

        // -CONFIRMATION DU PANNIER-
        const popupConfirmationPanier = () => {    // comportement de la fenetre confirm
            if (window.confirm( "vous avez rajouté :" + Quantity.value + " " + article.name + " " 
                + colorSelect.value + " " + "à votre panier " + "pour un montant total de: " +
                  (article.price / 100) * Quantity.value + "€ \n" + 
                  "Pour consulter le panier : cliquez OK \n" +
                  "pour annuler et revenir a l'acceuil : cliquez ANNULER")) {
              window.location.href = "../HTML/panier.html"; // OK = redirection ver panier
            } else {
              window.location.href = "../../../index.html"; // ANNULER = redirection acceuil
            }
          };

        // AJOUTER UN PRODUIT au LOCAL STORAGE
        const ajoutProduitLocalStorage = () => {
          produitPourLocalStorage.push(productOptionPourPanier); // rajout au taleau pour localStorage
          localStorage.setItem("products",JSON.stringify(produitPourLocalStorage)); // envoie au localStorage JSON
        };

        let produitPourLocalStorage = JSON.parse(localStorage.getItem("products")); // stocke les valeurs du formulaire JS
        // console.log(produitPourLocalStorage);    // vérification !!

        //verfication qu'il n'y a pas DEJA des produit dans le LocalStorage
        if (produitPourLocalStorage) {
          //si il y a deja des produit
          ajoutProduitLocalStorage();
          popupConfirmationPanier();
        } // s'il y n'y a pas de produit dans le local Storage
        else {
          produitPourLocalStorage = []; //création du tableau initial
          ajoutProduitLocalStorage();
          popupConfirmationPanier();
        }
      });
    });
}
getArticle();
