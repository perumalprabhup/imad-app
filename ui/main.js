console.log('Loaded!');
//change the body conten

var pp=document.getElementById("body-text");

pp.innerHTML="<h1>HI how is this</h1>";
//slide the image 


var ppp=document.getElementById("img");
var marginRight=0;
function moveRight(){
    
    marginLeft=marginLeft+'100';
    img.style.marginLeft = marginLeft +'px';
    
    
}
ppp.onclick =function(){
    
    var interaval=setInterval(moveRight,100);
    
    ppp.style.marginLeft="100px";
};