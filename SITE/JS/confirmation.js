

function displayOrderIdAndPrice() {
  let produitPourLocalStorage = JSON.parse(localStorage.getItem("products")); // JSON parse pour créer le JS
  
  let formulaireStorage = JSON.parse(localStorage.getItem("contact")); // JSON parse pour créer le JS

  
    const totalConfirmation = document.querySelector(".display-price ");
    const orderId = document.querySelector(".orderid span");

    totalConfirmation.innerText = "CA MARCHE PAS !" //produitPourLocalStorage.getItem("Produit_price_total");
    
    orderId.innerText = " SNIF, ICI NON PLUS !"; //formulaireStorage.getItem("_Id");
    // console.log(formulaireStorage.getItem("Produit_Id"));  // vérification !!
    
    localStorage.clear();  // On vide le localStorage pour recommencer plus tard le processus d'achat
  }
  displayOrderIdAndPrice();
  // console.log(displayOrderIdAndPrice());
  