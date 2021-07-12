

function displayOrderIdAndPrice() {
  let produitPourLocalStorage = localStorage.getItem("produit_pour_panier"); // JSON parse pour créer de JS
  
  let formulaireStorage = localStorage.getItem("formulaireValues");
  
    const totalConfirmation = document.querySelector(".display-price ");
    const orderId = document.querySelector(".orderid span");
    // totalConfirmation.innerText = produitPourLocalStorage.getItem("Produit_price_total");
    
    // orderId.innerText = formulaireStorage.getItem("Produit_Id");
    // console.log(formulaireStorage.getItem("Produit_Id"));
    // On vide le localStorage pour recommencer plus tard le processus d'achat
    // localStorage.clear(); 
  }
  displayOrderIdAndPrice();
  console.log(displayOrderIdAndPrice());
  