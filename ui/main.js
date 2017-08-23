
var button =document.getElementById('counter');

var counter = 0;
button.onclick = function(){
    
    
    //render the var in to the Correct span
    
    counter = counter + 1;
    
    var span = document.getElementById('count');
    
    span.innerHTML = counter.toString();
    
    
};