
 // rappel de la fonction permettant la connection au server
 loadConfig()
 // recuperation des données data
 .then(data => 
{config = data;
  fetch("http://localhost:3000/api/teddies")
    .then(data => data.json()) // transforme les data en json
    
    .catch((error) => {//si erreur de connection au server
        let productsContainer = document.querySelector(".produit");
        productsContainer.innerHTML =
          `<p class="text_error text-center text-uppercase font-weight-bold text-danger ">la connection au server n'a pas été possible</p>`
        
      })
      // le json est transformé en array//  =>  == Les fonctions fléchées (arrow)
      .then(jsonListArticle => 
        { //boucle FOR OF parcoure les valeurs de l'objet (variable OF iterable(array))
          for (let jsonArticle /*variable contenant chaque article*/ of jsonListArticle/*array contenant tout les articles*/) 
            {
                //crée un ARRAY Article dans la page ...
              let article /*variable contenant un array de chaque article*/ = new Article(jsonArticle);/*construit un tableau avec l'objet (classe Article)pour chaque article*/
              //insertion dans le DOM du code HTML pour chaque article du tableau Article grace au +=:
                document.querySelector(".produit").innerHTML += `<div class="col-12 pt-4 col-sm-6  col-lg-4">
                                                                      <div class="card article shadow p-3 mb-5 bg-white rounded border border-warning">
                                                                          <div class="card-header bg-warning ">
                                                                              <h5 class="card-title d-flex justify-content-between">${article.name}<span>${article.price/100 + "€"}</span></h5>
                                                                          </div>
                                                                          <img src="${article.imageUrl}" class="img-fluid card-img-top image_articles">
                                                                          <button type="button" class="button-choise" onclick="document.location.href ='JWDP5/SITE/HTML/produit.html?id=${article._id}'"><p class="align-middle">Choisis ta pelluche</p></button>
                                                                          <div class="card-body">
                                                                              <p class="card-text">${article.description}</p>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  `;
 
          // }
            // console.log(article); 
            // console.log(jsonListArticle); 
            // console.log(jsonArticle); 
            // console.log(Article);
                                                             
            }
        });
});

