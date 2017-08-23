
var button =document.getElementById('counter');


button.onclick = function(){
var counter = 0;    
    
    //render the var in to the Correct span
    
    counter = counter + 1;
    
    var span = document.getElementById('count');
    
    span.innerHTML = counter.toString();
    
    
};