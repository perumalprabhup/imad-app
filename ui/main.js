
var button = document.getElementById('counter');

button.onclick = function(){
    
    //create a req object;
    var req=new XMLHttpRequest();
    
    //capture the response and store it in a variable
    
    req.onreadystatechange =function(){
        
    if(req.readyState == XMLHttpRequest.DONE){
        
        if(req.status===200){
            
            var counter =req.responceText;
                
                var span = document.getElementById('count');
    
                span.innerHTML = counter.toString();
    
            
        }
    }
        
        
    };
    
//make the req

req.open('GET','http://perumalprabhu92.imad.hasura-app.io/counter',true);
req.close('null');
    
};