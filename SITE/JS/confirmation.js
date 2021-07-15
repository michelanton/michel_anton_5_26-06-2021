  
  let Order = localStorage.getItem("orderServer");
  let montantTotal =localStorage.getItem("products");
  let momo = montantTotal.price_total;
  console.log(montantTotal);
document.querySelector(".display-orderid").innerHTML = Order;
  console.log(Order);
  
 
  
  