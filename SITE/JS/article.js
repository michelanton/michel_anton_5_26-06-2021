
// créeation d'une classe OBJET qui represente le format de chaque article... voir console.table
class Article{
    constructor (jsonArticle){
        jsonArticle && Object.assign(this, jsonArticle);
        
        //Objet.assign (cible, ...sources): copie les valeurs de toutes les propriétés directes (non héritées) d'un objet 
        //qui sont énumérables sur un autre objet cible. 
        // Cette méthode renvoie l'objet cible. 

        //est comparable à:
        // this._id = jsonArticle._id;
        // this.namne = jsonArticle.name;
        // this.img = jsonArticle.mageUrl;
        // this.price = jsonArticle.price;
        // this.color = jsonArticle.color;

        // console.table(jsonArticle);
    }
}
