// la récupération des valeurs des articles dans le local storage
let produitPourLocalStorage = JSON.parse(localStorage.getItem("products")); // JSON parse pour créer de JS
// console.log(produitPourLocalStorage);        //vérification !!

//--------------------- AFFICHAGE ARTICLES PANIERS-------------------

const panierContainer = document.querySelector(".article_panier"); // selection de l'element du DOM ou sera affiche le panier
function panierDisplay() {
  // affichage du panier
  // --------verifier si panier vide ou non...  ------------
  if (produitPourLocalStorage === null || produitPourLocalStorage == 0) {
    // si panier vide :
    const panierVide = `
                <div class="panier_vide">
                <h3>Vous n'avez rien selectionné </h3>
                </div>
            `;
    panierContainer.innerHTML = panierVide; // affichage dans le DOM
    document.querySelector(".text_contact").innerHTML = ` `; // efface "votre adresse de livraison"
    document.querySelector(".btn_vider_panier").innerHTML = ` `; // efface le bouton "vider panier"
  } // si articles dans panier
  else {
    for (let lesProduits of produitPourLocalStorage) { // FOR OF : indexe toutes les valeur du tableau
      panierContainer.innerHTML +=
        //insertion dans le DOM du code HTML pour chaque article du tableau "produitPourLocalStorage" grace au += :
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
}
panierDisplay();

//---------------------------SUPRIMER UN ARTICLE---------------------------
function supArticle() {
  let btn_suprimer = document.querySelectorAll(".btn_suprimer"); // variable qui recupere TOUT les "boutons suprimer"

  for (
    let l = 0;
    l < btn_suprimer.length;
    l++ // boucle pour incrementer les "boutons suprimés"
  ) {
    btn_suprimer[l].addEventListener(
      "click",
      (
        e //écoute du click pour chaques "bouton suprimer"
      ) => {
        if (window.confirm("Cet article va être suprimé du panier !")) {
          // popup de verfication : OK / ANNULER
          produitPourLocalStorage.splice(l, 1); // .splice( L= emplacement element du tableau --- 1= le nombre d'élement à suprimer)
          localStorage.setItem(
            "products",
            JSON.stringify(produitPourLocalStorage)
          ); // envoie au local storage en JSON
          window.location.href = "panier.html"; // recharger la page
        }
      }
    );
  }
}
supArticle();
//------------------------  VIDER PANIER ------------------------------------
function viderPanier() {
  const btnViderPanier = document.querySelector(".btn_vider_panier"); //const qui recupere le bouton "vider le panier"

  btnViderPanier.addEventListener(
    "click",
    (
      e // ecoute du bouton
    ) => {
      if (window.confirm("Confirmer pour vider le panier va être vider !")) {
        localStorage.clear(); // vide le localStorage
        window.location.href = "panier.html"; // recharger la page panier
      }
    }
  );
}
viderPanier();
// -------------------------PRIX TOTAL DU PANIER -----------------------
let prixTotalPanier = []; // création d'un tableau vide pour recevoir la valeur totale du panier
function total() {
  for (
    let m = 0;
    m < produitPourLocalStorage.length;
    m++ // indexe les valeurs des produits
  ) {
    let prixTotal = produitPourLocalStorage[m].price_total; // recupération de tout les prix
    prixTotalPanier.push(prixTotal); // envoie de chaque prix "prixTotal" dans le tableau vide  "prixTotalPanier"
  }

  // envoie dans le DOM du résultat "total"
}
total();
let totale = prixTotalPanier.reduce((a, b) => a + b, 0);
// avec la méthode "REDUCE", on additione toutes les valeurs du tableau "prixTotalPanier"
document.querySelector(".total_panier").innerHTML =
  "prix total du panier" + totale + `€`;
// envoie dans le DOM du résultat "total"
localStorage.setItem("totalPanier", totale); // envois au localStorage du prix total
console.log(prixTotalPanier); //vérification !!

// ------------------------AFFICHAGE DANS LE DOM DU FORMULAIRE ------------------------
function leFormulaire() {
  document.querySelector(".cadre_formulaire").innerHTML = `
        <form class="form1>
            <label for="Fname">prénom:</label><br>
            <input type="text" pattern="[A-Za-z\ \'\-]{3,}" id="Fname" name="Fname"  placeholder="required" required/><br>
            <label for="Sname">Nom:</label><br>
            <input type="text" pattern="[A-Za-z\ \'\-]{3,}" id="Sname" name="Sname"  placeholder="required" required/><br>
            <label for="adress">Adresse:</label><br>
            <input type="text" pattern="[A-Za-z0-9\ \'\-]{2,}" id="adress" name="adress" required placeholder="required" required/><br>
            <label for="city">ville:</label><br>
            <input type="text" pattern="[A-Za-z\ \'\-]{3,}" id="city" name="city"  placeholder="required" required/><br>
            <label for="email" type="email">Adresse mail:</label><br>
            <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}" id="email" name="email"  placeholder="required" required/><br>
            <br>
           <input type="button" value="Envoyer" disabled onclick="envoiAuClick()" class="confirm_commande" />
        </form>
    `;
}

leFormulaire();

let inputfirstName = document.querySelector("#Fname");
let inputlastName = document.querySelector("#Sname");
let inputaddress = document.querySelector("#adress");
let inputcity = document.querySelector("#city");
let inputemail = document.querySelector("#email");

document.addEventListener("input", function (e) {
  if (
    /^[A-Za-z\'\-]{3,}$/.test(inputfirstName.value) &&
    /^[A-Za-z\'\-]{3,}$/.test(inputlastName.value) &&
    /^[A-Za-z0-9\ \'\-]{2,}$/.test(inputaddress.value)&&
    /^[A-Za-z\'\-]{3,}$/.test(inputcity.value)&&
    /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/.test(inputemail.value))
    document.querySelector(".confirm_commande").removeAttribute("disabled");
  });

function envoiAuClick() {
  const contact =
    // création d'un Objet "contact" contenant les input du formulaire
    {
      firstName: inputfirstName.value,
      lastName: inputlastName.value,
      address: inputaddress.value,
      city: inputcity.value,
      email: inputemail.value,
    };
  localStorage.setItem("contact", JSON.stringify(contact)); // envoie au LocalStrage en format JSON "stringify"
  // console.log(contact);    //vérification !!

  // // --------------------ENVOIE AU SERVEUR-----------------------
  const products = []; // création d'un tableau vide pour recevoir les _id des produits
  function tabAEnvoyer() {
    for (let n = 0; n < produitPourLocalStorage.length; n++) {
      let idProd = produitPourLocalStorage[n]._id;
      products.push(idProd); // envoie de chaque _id dans le tableau "products"
    }
  }
  tabAEnvoyer();

  const aEnvoyer = {
    contact,
    products,
  };
  // console.log(contact); // vérification !!
  // console.log(products); // vérification !!
  function postOrder() {
    const optionPost = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aEnvoyer),
    };
    fetch("http://localhost:3000/api/teddies/order", optionPost)
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        let orderid = data;
        localStorage.setItem("orderServer", orderid.orderId);
      });
  }
  postOrder();
  window.location.href = "./confirmation.html";
}