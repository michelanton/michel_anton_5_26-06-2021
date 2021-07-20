//-----------------------FONCTION DE RÉCUPÉRATION DE L'API SERVEUR-----------------

let teddiesData = []; // preparation d'un tableau vide pour recevoir les données articles
async function loadConfig ()
  //"assyn" déclare la fonction assyncrone =  on peut mettre un await!
  {
    await fetch("http://localhost:3000/api/teddies") //"await" : attend la connection a l'URL
      .then((res) => res.json()) //  transforme JSON en JS

      .catch(
        (
          err //si erreur de connection au server
        ) => {
          document.querySelector(".produit").innerHTML =
            //insertion dans le DOM message erreur
          `
            <p class="text_error text-center text-uppercase font-weight-bold text-danger ">
            la connection au server n'a pas été possible</p>
          `;
        }
      )
      .then((data) => (teddiesData = data)); //envoi dans le tableau "teddiesData"
    // console.log(teddiesData);     // vérification !!
  };

//------------------ FONCTION D'AFFICHAGE DANS LE DOM --------------------------
const articleDisplay = async () =>
  // fonction d'affichage dans le DOM + déclaration de ASSYNC
  {
    await loadConfig(); // appelle fetch et attend quelle soit entierement executé
    document.querySelector(".produit").innerHTML = teddiesData.map((teddies ) =>  
                      //array.MAP = crée un nouveau tableau       
      `
        <div class="contener_art col-12 pt-4 col-sm-6  col-lg-3"> 
            <div class="cart-article card shadow p-3 bg-white rounded border border-warning">
                <div class="card-header bg-warning ">
                    <h5 class="card-title d-flex justify-content-between">${
                      teddies.name
                    }<span>${teddies.price / 100 + "€"}</span></h5>
                </div>
                <img src="${teddies.imageUrl}" class=" image  ">
                <button type="button" class="button-choise" onclick="document.location.href =
                'SITE/HTML/produit.html?id=${
                  teddies._id
                }'"><p class="align-middle">Choisis ta pelluche</p></button>
                <div class="card-body">
                    <p class="card-text">${teddies.description}</p>
                </div>
            </div>
        </div>        
      `
    );
  };
articleDisplay(); // appel de la fonction d'affichage
