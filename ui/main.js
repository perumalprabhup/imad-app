
var button = document.getElementById('counter');

button.onclick = function(){
    
    //create a req object;
    var request=new XMLHttpRequest();
    
    //capture the response and store it in a variable
    
    request.onreadystatechange =function(){
        
    if(request.readyState  == XMLHttpRequest.DONE){
        
        if(request.status === 200){
            
            var counter =req.responseText;
                
                var span = document.getElementById('count');
    
        }
    }
        
        
    };
    
//make the req

request.open('GET','http://perumalprabhu92.imad.hasura-app.io/counter',true);
request.send(null);
    
};