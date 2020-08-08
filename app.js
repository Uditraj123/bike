//variables for access required DOM
const cartBtn=document.querySelector('.cart-btn');
const closeCartBtn=document.querySelector('.close-cart');
const clearCartBtn=document.querySelector('.clear-cart');
const cartDOM=document.querySelector('.cart');//select all cart over cart-overlay
const cartOverlay=document.querySelector('.cart-overlay');//select cart-overlay
const cartItems=document.querySelector('.cart-icon-items');//cart-icon ke upper home page me
const cartTotal=document.querySelector('.cart-total');//total cart prices
const cartContent=document.querySelector('.cart-content');
const productsDOM=document.querySelector('.products-center');
const cartFooter=document.querySelector('.cart-footer');
const removeCart=document.querySelector('.remove-item');
//products obje

//cart



/*function  getProducts(){
    var xmll=new XMLHttpRequest();
    xmll.open('GET','https://uditraj123.github.io/bike/products.json');
    xmll.send();
    xmll.onload= function(){

        object=JSON.parse(xmll.responseText);
        console.log(JSON.parse(xmll.responseText));
       // displayProducts(object);
        
    }
  

}
getProducts();
*/

 let cartitem=[];
 let cartPrice=0;
 

class cart {
    constructor(title,price,image){
        this.title=title;
        this.price=price;
        this.image=image;
    }
}
//class ui:getting product into cart
class UI{
    static addToCart(){
        productsDOM.addEventListener('click',(e)=>{
            if(e.target.classList.contains('bag-btn')){
               
               let image=e.target.previousElementSibling.src;
               image=image.slice(60);
               image=image.replace(image,"." + image)
               console.log(image);
               
               const title=e.target.parentElement.nextElementSibling.childNodes[1].innerHTML;
               const price=e.target.parentElement.nextElementSibling.childNodes[4].nextElementSibling.childNodes[1].data;
               const cartitem=new cart(title,price,image);
               console.log(cartitem);

            const   cartitems=JSON.parse(localStorage.getItem('cartitems'));
            if(cartitems!==null){
            cartitems.forEach(item=>{
                if( cartitem.title===item.title){
                    e.target.parentElement.childNodes[3].innerText='In Cart';
                   // document.querySelector('.cart-overlay').style.visibility="hidden";
                    
                    
                }
            
            });
        }
               console.log(cartitems);
        
               store.setCART(cartitem);
               UI.addedCartItemContent(cartitem)

              
              
               store.setCART(cartitem)
               
            
            

              
               const display =document.querySelector('.cart-overlay').style.visibility="visible";
        

        }
        
        });
       
        
       
        

        }

         static addedCartItemContent(cartitem){
             
             const cartContent=document.createElement('div');
             cartContent.classList.add("cart-content","row")
             cartContent.innerHTML= "<div class='cart-item col-4 '>" +
            "<img src=" +cartitem.image +" alt='bike1'>" +
        "</div>" +
        "<div class='col-4  my-auto'>" + 
        "<h4>" + cartitem.title + "</h4>" +
        "<h5>" + cartitem.price + "</h5>" +
        "<span class='remove-item'>remove</span>" +
        "</div>" +
        "<div class='col-4 '>" +
            "<i class='fas fa-chevron-up'></i>" +
            "<p class='item-amount m-0'>1</p>" +
            "<i class='fas fa-chevron-down'></i>" +
        "</div>";

        cartDOM.appendChild(cartContent);
        cartDOM.appendChild(cartFooter);

      UI.cartAmount(cartitem);
        
        
        }
        static setupCart(){

            cartitem=store.getCART();
           UI.populateCart(cartitem);
           
        }
       static populateCart(cartitem){
            cartitem.forEach(item => UI.addedCartItemContent(item));
        }



        //remove cart item
        static removeCartItem(){
            cartDOM.addEventListener('click',(e)=>{
                if(e.target.classList.contains('remove-item')){

                    e.target.parentElement.parentElement.remove();
                   store.removeCartItemStore(e.target.parentElement.parentElement.childNodes[1].childNodes[0].innerHTML);
                console.log(e.target.parentElement.childNodes[1].innerHTML);
                console.log(cartPrice-=Number(e.target.parentElement.childNodes[1].innerHTML));
                cartTotal.innerHTML=cartPrice;
                
                
                }
            if(e.target.classList.contains('clear-cart')){
                const datas=e.target.parentElement.parentElement.querySelectorAll('.cart-content');
                datas.forEach(data=>{
                    data.remove();
                    cartTotal.innerHTML=null;
                })
                
                
            }
                
            })

        
        }
        //UPDATE CART AMOUNT
        static cartAmount(cartitem){
            cartPrice+=Number(cartitem.price);
            cartTotal.innerHTML=cartPrice;
        }

}

//class storage
class store {
    static getCART() {
        let cartitems;
        if(localStorage.getItem('cartitems',cartitems)===null) {
        cartitems=[];
    
}
    else{
    cartitems=JSON.parse(localStorage.getItem('cartitems'));
    
    
   }
     return cartitems;
    }

    static setCART(cartitem){
        const cartitems=store.getCART();
        cartitems.push(cartitem);
        localStorage.setItem('cartitems',JSON.stringify(cartitems));
    }

    static  removeCartItemStore(title){
        const cartitems=store.getCART();
        cartitems.forEach((cartitem,index)=>
        {
            if(cartitem.title===title){
                cartitems.splice(index,2);
            }
        });
        localStorage.setItem('cartitems',JSON.stringify(cartitems));
          }
        


}

//class products :getting the products
document.addEventListener('DOMContentLoaded',UI.addToCart);

UI.setupCart();
//CART-OVERLAY
cancelCart();
 ///cancel CART OVERLAY
 function cancelCart(){
 

closeCartBtn.addEventListener('click',()=>{
    cartOverlay.style.visibility="hidden";
})
 }

 UI.removeCartItem(); 
