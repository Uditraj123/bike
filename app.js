const cartDOM=document.querySelector('.cart');//select all cart over cart-overlay
const cartFooter=document.querySelector('.cart-footer');
const cartTotal=document.querySelector('.cart-total');//total cart prices
const cartBtn=document.querySelector('.cart-btn');
const cartCount=document.querySelector('.cart-icon-items')
//console.log(cartCount);
const cart=[];
addToCart=document.getElementsByClassName('bag-btn');
//console.log(addToCart);

    
cartBtn.addEventListener('click',displayCart);
function displayCart(){
  //  console.log('a');
    document.querySelector('.cart-overlay').style.visibility="visible";
    
}
    
for(i=0; i<addToCart.length;i++){
    addToCart[i].addEventListener('click',updateCartContainer);
}
document.addEventListener('DOMContentLoaded',updateCartContainer);
function updateCartContainer(e){
    clickedAddToCartBtn=e.target;
    productContainer=clickedAddToCartBtn.parentElement.parentElement;
    //console.log(productContainer);
    
    productTitle=productContainer.getElementsByClassName('title')[0].innerText;
    //console.log(productTitle);
    productPrice=productContainer.getElementsByClassName('price')[0].innerText;
    //console.log(productPrice);
    productImage=productContainer.getElementsByClassName('product-img')[0].src;
    //console.log(productImage);

   const cartItem={price:productPrice,title:productTitle,image:productImage};
   //console.log(cartItem);
   
  
   STORECART(cartItem);
 

    const closeCartBtn=document.getElementsByClassName('close-cart')[0];
    //console.log(closeCartBtn);
    closeCartBtn.addEventListener('click',removeCARTALL)

    const clearCartBtn=document.getElementsByClassName('clear-cart')[0];
    //console.log(clearCartBtn);
  //  clearCartBtn.addEventListener('click',clearCartAll);
    

    cartTitle=cartDOM.getElementsByClassName('title');

    
    for(i=0;i<cartTitle.length;i++){
        //console.log(cartTitle[i].innerHTML);
        
        if(cartTitle[i].innerHTML==productTitle){
            e.target.innerText='In Cart';
            return
        }
    }
    
    addToRowInCart(productTitle,productPrice,productImage);//cart me load karo image,title,price jo click huwa btn uska

   // store.setCART(cartItem);
    cartPrices=cartDOM.getElementsByClassName('price');
    //console.log(cartPrices);
    totalPrice=0;
    for(i=0;i<cartPrices.length;i++){
        totalPrice+= Number(cartPrices[i].innerHTML);
        
        
        
    }
    cartTotal.innerHTML=totalPrice;
    

    const display =document.querySelector('.cart-overlay').style.visibility="visible";
    
    
}let count =0;
function addToRowInCart(productTitle,productPrice,productImage) {

    const cartContent=document.createElement('div');
    cartContent.classList.add("cart-content","row")
    cartContent.innerHTML= "<div class='cart-item col-4 '>" +
   "<img src=" + productImage + " alt='bike1'>" +
"</div>" +
"<div class='col-4  my-auto'>" + 
"<h4 class='title m-0'>" + productTitle + "</h4>" +
"<h5 class='m-0 price'>" + productPrice + "</h5>" +
"<span class='remove-item'>remove</span>" +
"</div>" +
"<div class='col-4 '>" +
   "<i class='fas fa-chevron-up'></i>" +
   "<p class='item-amount m-0'>1</p>" +
   "<i class='fas fa-chevron-down'></i>" +
"</div>";

cartDOM.appendChild(cartContent);
cartDOM.appendChild(cartFooter);

count++;
  //console.log(count);
  cartCount.innerHTML=count;
  

const removeCart=document.getElementsByClassName('remove-item');
for(i=0;i<removeCart.length;i++){
    removeCart[i].addEventListener('click',removedCartItem)
}
}
function removedCartItem(e){
    count--;
    cartCount.innerHTML=count;
    e.target.parentElement.parentElement.remove();
    updatePricesAfterRemove();
    REMOVEcartITEMstore(e.target.parentElement.getElementsByClassName('title')[0].innerText);
    
}
function updatePricesAfterRemove(){
 
    cartPrices=cartDOM.getElementsByClassName('price');
    //console.log(cartPrices[0]);
    totalPrice=0;
    for(i=0;i<cartPrices.length;i++){
        totalPrice+= Number(cartPrices[i].innerHTML);
        
        
        
    }
    cartTotal.innerHTML=totalPrice;
}
function removeCARTALL(e){
    e.target.parentElement.parentElement.style.visibility="hidden";
    //console.log('hello');
    
    
}
/*function clearCartAll(e){
    
        
    for(i=0;i<cartROW.length;i++){
        console.log(cartROW[i].innerHTML='');
        
    }
    REMOVEcartITEMstoreAll(cartROW);
    
}
function REMOVEcartITEMstoreAll(e){
    const cartitems=GETCART();
    cartitems.forEach((cartitem,index)=>
    {
        if(cartitem.title===title){
            cartitems.splice(index,1);
        }
    });
    localStorage.setItem('cart',JSON.stringify(cartitems));
      
}*/
function GETCART(){
    let cartItems;
    if(localStorage.getItem('cart',cartItems)===null){
        cartItems=[];
    }
    else{
        cartItems=JSON.parse(localStorage.getItem('cart'))
    }
    return cartItems
}

function STORECART(cartItem){
const cartItems=GETCART()
    cartItems.push(cartItem);
    localStorage.setItem('cart',JSON.stringify(cartItems));
}
function  REMOVEcartITEMstore(title){
    const cartitems=GETCART();
    cartitems.forEach((cartitem,index)=>
    {
        if(cartitem.title===title){
            cartitems.splice(index,1);
        }
    });
    localStorage.setItem('cart',JSON.stringify(cartitems));
      }
    

/*/CLASS OF CART ITEMS
class cart {
    constructor(productTitle,productPrice,productImage){
        this.title=productTitle;
        this.price=productPrice;
        this.image=productImage;
    }
}*/

/*//storage locally//
class store{
static getCART(){
    let cartItems;
    if(localstorage.getItem('CARTITEMS',cartItems)===null){
        cartItems=[];
    }
    else{
        cartItems.JSON.parse(localStorage.getItem('CARTITEMS'))
    }
    return cartItems;
}
static setCART(cartItem){

        const cartItems=store.getCART();
        cartItems.push(cartItem);
        localStorage.setItem('CARTITEMS',JSON.stringify(cartItems));
}
}
///storage locally/*/
function setupCart(){

    cartitem=GETCART();
   populateCart(cartitem);
   
}
function populateCart(cartitem){
    cartitem.forEach(item => addToRowInCart(item.title,item.price,item.image));
}
setupCart();