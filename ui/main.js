console.log('Loaded!');
//change the body conten

var pp=document.getElementById("body-text");

pp.innerHTML="<h1>HI how is this</h1>";
//slide the image 


var ppp=document.getElementById("img");
var marginRight=0;
function moveLeft(){
    
    marginRight=marginRight+'100';
    img.style.marginRight = marginRight +'px';
    
    
}
ppp.onclick =function(){
    
    var interaval=setInterval(moveLeft);
    
    ppp.style.marginLeft="100px";
};