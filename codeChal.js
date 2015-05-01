// event listener for scrolling past %100 and checks for login link

window.addEventListener('scroll',function(){

  if(((window.pageYOffset+window.innerHeight)/document.body.clientHeight >= 0.9 && !oSwitch)
  && (logInCheck.href != "http://www.arcteryx.com/&&PageName&&" && logInCheck.href != "http://arcteryx.com/&&PageName&&")){
    makeOver();
    oSwitch = true;
  }

  if((window.pageYOffset+window.innerHeight)/document.body.clientHeight < 0.9 && oActive === false){

    oSwitch = false;
  }

});

// grabs logout link
var logInCheck = document.getElementById('ecomLinksLogOut');
var oSwitch = false;
var oActive = false;



var cartItemsVal = document.getElementById('cartItems').innerText;
if(document.getElementById('summaryTotal') != null){
  var sumTotalCash = document.getElementById('summaryTotal').innerText;
}else{var sumTotalCash = '0';}



var makeOver = function(){

    oActive = true;


// create background

    var semiBack = document.createElement('div');
    var bod = document.querySelector('body');
    var first = bod.firstChild;

    semiBack.id = 'overlay';
    semiBack.style.cssText = 'color:black;background-color: rgba(0,0,0,0.7);position:fixed;width:100%;height:100%;left:0;z-index:1001;';

    bod.insertBefore(semiBack , first);

// create / append overlay to contain cart info
    var kCheck = document.createElement('div');
    kCheck.style.cssText = 'min-width:200px; max-width:300px; max-height:500px; overflow: scroll;padding-top:0px;position:static ; display:block; background-color: rgb(255,255,255); margin: 40px auto 0 auto; width:50%;'
    kCheck.innerHTML = '<div style="font-size:16px;color:white;background-color:black; width 100%;height:30px;padding:10px;">CART<br> INFO</div>';

    semiBack.appendChild(kCheck);


    // fill cart div
    var cart = document.querySelectorAll('#summaryCartActive img');
    var cartList = document.createElement("ul");

    cartList.style.paddingTop = '10px';
    cartList.style.listSyle = 'none';
    kCheck.appendChild(cartList);


    for(var i = 0; i < cart.length; i ++){
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.src = cart[i].src;
      li.style.textAlign = 'center';
      li.style.paddingTop = '10px';
      li.innerHTML = '<img src="' + cart[i].src + '"/>';
      cartList.appendChild(li);
    }

    // var cartItemsVal = document.getElementById('cartItems');
    // var sumTotalCash = document.getElementById('summaryTotal');
    var totalLi = document.createElement('li');
    totalLi.style.paddingLeft = '20px';

    totalLi.innerHTML = 'Items: ' + cartItemsVal + '<br>Total: ' + sumTotalCash;

    cartList.appendChild(totalLi);


    // create buttons
    var butStyle = document.createElement('style');
    var toCheckOut = document.createElement('button');
    var toShopping = document.createElement('button');

    toCheckOut.innerText = 'CHECK OUT';
    toCheckOut.style.cssText = 'background-color:black; color:white;font-size:14px; height:30px; width:40%; margin:10px 5%';


    toShopping.innerText = 'GO BACK';
    toShopping.style.cssText = 'background-color:black; color:white;font-size:14px; height:30px; width:40%; margin:10px 5%';

    var buttonLi = document.createElement('li');
    cartList.appendChild(buttonLi);
    buttonLi.appendChild(toCheckOut);
    buttonLi.appendChild(toShopping);

    toCheckOut.addEventListener('click' , function(){window.location='http://arcteryx.com/YourCart.aspx'});
    toShopping.addEventListener('click' , killOver);


};

// remove overlay

var killOver = function(){
  var bod = document.querySelector('body');
  var overlay = document.getElementById('overlay');
  bod.removeChild(overlay);
  oActive = false;

}








// console.log(window.pageYOffset+window.innerHeight);
// console.log(document.body.clientHeight);
// console.log((window.pageYOffset+window.innerHeight)/document.body.clientHeight  );
// junk
// cart.forEach(function(pic){
//   console.log(pic.src);
// });
//
// cart.forEach(function(pic){
//   var li = document.createElement('li');
//   li.innerHTML = cart[i];
//   ul.appendChild(li);
// });
//
//
// cart
//
//
//
//
// butStyle.innerText = '.kButton{background-color:black; color:white;font-size:14px; height:30px;}'
//
//
//
//
//
//
//
// var semiBack = document.createElement;
// var first = document.body.firstChild;
// semiBack.backgroundColor = 'rgba(10,10,10,.5)';
// semiBack.width = '100%';
// semiBack.height = '100%';
// semiBack.innerText = "HELLO";
// first.insertBefore(semiBack);
// semiBack.style.cssText = 'font-weight:bold; color:#22AAcc;
// font-size:22px;background-color: rgba(0,0,0,0.7);position:fixed;width:100%;height:100%;left:0;z-index:10;';
