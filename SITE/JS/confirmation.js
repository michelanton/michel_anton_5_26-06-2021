  
  let Order = localStorage.getItem("orderServer");
  let montantTotal =localStorage.getItem("totalPanier");
  
  document.querySelector(".display-orderid").innerHTML = Order;
  document.querySelector(".display-price").innerHTML = `${montantTotal}€`;

  localStorage.clear();

  // console.log(Order);    // vérification !!
  // console.log(montantTotal);  // vérification !!
   
 
  
  