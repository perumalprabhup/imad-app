
var button = document.getElementById('counter');

button.onclick = function(){
    
    //create a req object;
    var request=new XMLHttpRequest();
    
    //capture the response and store it in a variable
    
    request.onreadystatechange =function(){
        
    if(request.readyState  == XMLHttpRequest.DONE){
        
        if(request.status === 200){
            
            var counter =request.responseText;
                
                var span = document.getElementById('count');
                
                span.innerHTML = counter .toString();
    
        }
    }
        
        
    };
    
//make the req

request.open('GET','http://perumalprabhu92.imad.hasura-app.io/counter',true);
request.send(null);
    
};

//capture the Namee
var nameInput = document.getElementById('name');
var submitbtn = document.getElementById('submit_btn');
var name = nameInput.value;

submitbtn.onclick = function(){
    
    //capture the list of names 
    
    
    var names =['name 1','name 2','name 3'];
    var list = '';
    
    for(i=0;i<names.length;i++){
        
        list += '<li>'+names[i]+'</li>';
    }
var ul =document.getElementById('nameList');  
ul.innerHTML = list;
};


